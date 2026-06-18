import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import zlib from 'zlib'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'
import { canonicalQuestionSlug } from '../src/lib/qaSlug.js'
import { LOCAL_TREND_BLOG_POSTS } from '../src/data/localTrendBlogPosts.js'
import { LOCAL_FUNCTIONAL_INGREDIENT_POSTS } from '../src/data/localFunctionalIngredientPosts.js'
import { LOCAL_CATEGORY_BLOG_POSTS } from '../src/data/localCategoryBlogPosts.js'
import { LOCAL_SEO_EXPANSION_POSTS } from '../src/data/localSeoExpansionPosts.js'

const __filename = fileURLToPath(import.meta.url)
export const ROOT = path.resolve(path.dirname(__filename), '..')
export const STATE_DIR = path.join(ROOT, '.content-refinement')
export const REPORTS_DIR = path.join(STATE_DIR, 'reports')
export const BACKUPS_DIR = path.join(STATE_DIR, 'backups')
export const LOGS_DIR = path.join(STATE_DIR, 'logs')
export const MANIFEST_PATH = path.join(STATE_DIR, 'manifest.jsonl')
export const STATE_PATH = path.join(STATE_DIR, 'state.json')
export const PROJECT_ANALYSIS_PATH = path.join(STATE_DIR, 'project-analysis.json')

const SITE = 'https://phlorotannin.com'
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rlfxuyeoluoeaxuujtly.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck'

export function ensureStateDirs() {
  for (const dir of [STATE_DIR, REPORTS_DIR, BACKUPS_DIR, LOGS_DIR]) fs.mkdirSync(dir, { recursive: true })
}

export function sha256(value) {
  return crypto.createHash('sha256').update(String(value ?? ''), 'utf8').digest('hex')
}

export function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`
  }
  return JSON.stringify(value)
}

export function textOf(value) {
  if (value == null) return ''
  const raw = typeof value === 'string' ? value : stableStringify(value)
  return raw
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function headingSnapshot(content) {
  const raw = String(content || '')
  return [
    ...[...raw.matchAll(/^#{2,3}\s+(.+)$/gm)].map((m) => m[1].trim()),
    ...[...raw.matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => textOf(m[2])),
    ...[...raw.matchAll(/<H([23])(?:\s[^>]*)?>([\s\S]*?)<\/H\1>/g)].map((m) => textOf(m[2])),
  ].filter(Boolean)
}

function linkSnapshot(content) {
  const raw = String(content || '')
  return [
    ...[...raw.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)].map((m) => ({ text: m[1], url: m[2] })),
    ...[...raw.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].map((m) => ({ text: textOf(m[2]), url: m[1] })),
    ...[...raw.matchAll(/<RelLink\s+[^>]*to=["']([^"']+)["'][^>]*>([\s\S]*?)<\/RelLink>/g)].map((m) => ({ text: textOf(m[2]), url: m[1] })),
  ]
}

export function protectedAssetSnapshot(record) {
  const content = record.content || record.body || record.answer || record.validatedAnswer || ''
  const faqs = Array.isArray(record.faqs) ? record.faqs.map((faq, index) => ({ index, q: faq.q || faq.question || '', id: faq.id || null })) : []
  return {
    type: record.type,
    id: record.id,
    slug: record.slug,
    url: record.url,
    title: record.title,
    h2h3: headingSnapshot(content),
    excerpt: record.excerpt || record.description || '',
    meta_title: record.meta_title || record.metaTitle || '',
    meta_desc: record.meta_desc || record.metaDesc || record.description || '',
    category: record.category || record.category_id || '',
    tags: record.tags || [],
    published_at: record.published_at || record.publishedAt || record.created_at || '',
    canonical: record.canonical || record.url || '',
    faq_questions: faqs,
    links: linkSnapshot(content),
    images: [
      ...(record.og_image ? [{ path: record.og_image, alt: record.image_alt || '' }] : []),
      ...(record.image ? [{ path: record.image, alt: record.image_alt || record.alt || '' }] : []),
    ],
    citations: record.references || record.referenceIds || record.references_pmid || [],
  }
}

export function protectedFingerprint(record) {
  return sha256(stableStringify(protectedAssetSnapshot(record)))
}

function qaRecords() {
  const qa = JSON.parse(fs.readFileSync(path.join(ROOT, 'public', 'qa.json'), 'utf8'))
  const categories = new Map((qa.categories || []).map((cat) => [cat.id, cat]))
  return (qa.questions || []).map((q, index) => {
    const slug = q.slug || canonicalQuestionSlug(q.question)
    const originalId = q.id || `qa-${index + 1}`
    return {
      type: 'qa',
      id: originalId,
      post_id: `qa:${originalId}:${slug || index + 1}`,
      slug,
      url: `${SITE}/q/${slug}`,
      title: q.question || '',
      excerpt: textOf(q.answer || q.validatedAnswer || '').slice(0, 180),
      content: q.answer || q.validatedAnswer || q.body || q.content || '',
      answer: q.answer || '',
      validatedAnswer: q.validatedAnswer || q.validated_answer || '',
      category: q.category || q.category_id || '',
      category_name: categories.get(q.category)?.name || '',
      tags: q.tags || [],
      references: q.references || [],
      references_pmid: q.references_pmid || [],
      created_at: q.created_at || q.published_at || q.reviewed_at || '',
      updated_at: q.updated_at || q.rewrittenAt || q.reviewedAt || '',
      source_location: `public/qa.json#questions[${index}]`,
      mirror_location: `src/data/qa.json#questions[${index}]`,
      storage: 'json',
    }
  })
}

async function supabaseBlogRecords() {
  const client = createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false, autoRefreshToken: false } })
  const rows = []
  for (let from = 0; ; from += 1000) {
    const { data, error } = await client
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: true })
      .range(from, from + 999)
    if (error) break
    rows.push(...(data || []))
    if (!data || data.length < 1000) break
  }
  return rows.map((post, index) => ({
    ...post,
    type: 'blog',
    post_id: `blog:supabase:${post.id || post.slug}`,
    id: post.id || post.slug,
    url: `${SITE}/blog/${post.slug}`,
    content: post.content || '',
    source_location: `supabase.posts#${post.id || index}`,
    storage: 'supabase:posts',
  }))
}

function localBlogRecords() {
  const groups = [
    ['localTrendBlogPosts', LOCAL_TREND_BLOG_POSTS],
    ['localFunctionalIngredientPosts', LOCAL_FUNCTIONAL_INGREDIENT_POSTS],
    ['localCategoryBlogPosts', LOCAL_CATEGORY_BLOG_POSTS],
    ['localSeoExpansionPosts', LOCAL_SEO_EXPANSION_POSTS],
  ]
  const rows = []
  for (const [name, posts] of groups) {
    posts.forEach((post, index) => rows.push({
      ...post,
      type: 'blog',
      post_id: `blog:local:${post.slug}`,
      id: post.id || post.slug,
      url: `${SITE}/blog/${post.slug}`,
      content: post.content || '',
      source_location: `src/data/${name}.js#${post.slug || index}`,
      storage: 'local-js',
    }))
  }
  return rows
}

function extractLiteral(source, key) {
  const match = source.match(new RegExp(`${key}\\s*:\\s*(['"\`])([\\s\\S]*?)\\1\\s*,`))
  return match ? match[2] : ''
}

function extractLiterals(source, key) {
  return [...source.matchAll(new RegExp(`${key}\\s*:\\s*(['"\`])([\\s\\S]*?)\\1\\s*,`, 'g'))].map((m) => m[2])
}

function extractArray(source, key) {
  const match = source.match(new RegExp(`${key}\\s*:\\s*\\[([\\s\\S]*?)\\]\\s*,`))
  if (!match) return []
  return [...match[1].matchAll(/['"`]([^'"`]+)['"`]/g)].map((m) => m[1])
}

function insightRecords() {
  const dir = path.join(ROOT, 'src', 'data', 'insights', 'posts')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((name) => /\.(jsx?|tsx?)$/.test(name)).sort().flatMap((file, index) => {
    const fullPath = path.join(dir, file)
    const source = fs.readFileSync(fullPath, 'utf8')
    let slugs = extractLiterals(source, 'slug')
    if (!slugs.length) {
      const factorySlug = source.match(/create(?:FunctionalIngredient|Hospital)InsightPost\s*\(\s*['"]([\w-]+)['"]\s*\)/) ||
        source.match(/create(?:FunctionalIngredient|Hospital)Post\s*\(\s*['"]([\w-]+)['"]\s*\)/)
      slugs = factorySlug ? [factorySlug[1]] : [file.replace(/\.[^.]+$/, '')]
    }
    const titles = extractLiterals(source, 'title')
    const descriptions = extractLiterals(source, 'description')
    const categories = extractLiterals(source, 'category')
    return slugs.map((slug, slugIndex) => ({
      type: 'insight',
      post_id: `insight:${slug}`,
      id: slug,
      slug,
      url: `${SITE}/insights/${slug}`,
      title: titles[slugIndex] || titles[0] || slug,
      excerpt: descriptions[slugIndex] || descriptions[0] || '',
      description: descriptions[slugIndex] || descriptions[0] || '',
      keywords: extractLiteral(source, 'keywords'),
      category: categories[slugIndex] || categories[0] || '',
      tags: extractArray(source, 'tags'),
      referenceIds: extractArray(source, 'referenceIds'),
      publishedAt: extractLiteral(source, 'publishedAt') || extractLiteral(source, 'PUB'),
      updatedAt: extractLiteral(source, 'updatedAt'),
      content: source,
      source_location: `src/data/insights/posts/${file}#${slug}`,
      storage: 'jsx-file',
      sequence_hint: index + 1,
    }))
  })
}

export async function collectContentInventory() {
  const localBlogs = localBlogRecords()
  const supabaseBlogs = await supabaseBlogRecords()
  const bySlug = new Map()
  for (const post of [...supabaseBlogs, ...localBlogs]) {
    if (post.slug && !bySlug.has(post.slug)) bySlug.set(post.slug, post)
  }
  return [...qaRecords(), ...Array.from(bySlug.values()), ...insightRecords()]
    .map((record) => ({
      ...record,
      original_checksum: sha256(record.content || record.body || record.answer || record.validatedAnswer || stableStringify(record)),
      protected_asset_fingerprint: protectedFingerprint(record),
    }))
    .sort((a, b) =>
      String(a.type).localeCompare(String(b.type)) ||
      String(a.published_at || a.publishedAt || a.created_at || '').localeCompare(String(b.published_at || b.publishedAt || b.created_at || '')) ||
      String(a.post_id).localeCompare(String(b.post_id))
    )
    .map((record, index) => ({ ...record, sequence: index + 1 }))
}

export function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

export function readJson(filePath, fallback = null) {
  if (!fs.existsSync(filePath)) return fallback
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

export function writeJsonl(filePath, rows) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, rows.map((row) => JSON.stringify(row)).join('\n') + '\n', 'utf8')
}

export function readJsonl(filePath) {
  if (!fs.existsSync(filePath)) return []
  return fs.readFileSync(filePath, 'utf8').split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line))
}

export function writeGzipJsonl(filePath, rows) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, zlib.gzipSync(Buffer.from(rows.map((row) => JSON.stringify(row)).join('\n') + '\n', 'utf8')))
}

export function readGzipJsonl(filePath) {
  return zlib.gunzipSync(fs.readFileSync(filePath)).toString('utf8').split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line))
}

export function timestamp() {
  return new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
}

export function projectAnalysis(records) {
  const byType = records.reduce((acc, row) => ({ ...acc, [row.type]: (acc[row.type] || 0) + 1 }), {})
  const byStorage = records.reduce((acc, row) => ({ ...acc, [row.storage]: (acc[row.storage] || 0) + 1 }), {})
  return {
    generatedAt: new Date().toISOString(),
    framework: 'Vite + React Router',
    contentRoot: 'hanain/hanain',
    contentStores: {
      qa: ['public/qa.json', 'src/data/qa.json'],
      blog: ['Supabase posts table', 'src/data/local*BlogPosts*.js'],
      insights: ['src/data/insights/posts/*.jsx'],
    },
    routePatterns: { qa: '/q/:slug', blog: '/blog/:slug', insight: '/insights/:slug' },
    sitemapGenerator: 'generate_sitemap_rss.py + scripts/update_static_routes.mjs',
    existingAudits: ['audit:links', 'audit:blog-images', 'audit:consumer-language', 'audit:qa-category-exposure', 'audit:related-qa', 'verify:checkpoint'],
    totals: { all: records.length, byType, byStorage },
  }
}

export function manifestRows(records, status = 'BACKED_UP') {
  return records.map((record) => ({
    sequence: record.sequence,
    post_id: record.post_id,
    slug: record.slug,
    URL: record.url,
    title: record.title,
    source_location: record.source_location,
    original_checksum: record.original_checksum,
    protected_asset_fingerprint: record.protected_asset_fingerprint,
    processing_status: status,
    current_strategy: 'LEVEL_1',
    attempt_count: 0,
    completed_at: null,
  }))
}

export function latestBackupPath() {
  if (!fs.existsSync(BACKUPS_DIR)) return null
  const backups = fs.readdirSync(BACKUPS_DIR).filter((name) => /^content-before-refinement-.*\.jsonl\.gz$/.test(name)).sort()
  return backups.length ? path.join(BACKUPS_DIR, backups[backups.length - 1]) : null
}
