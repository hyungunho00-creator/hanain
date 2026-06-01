import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import crypto from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { LOCAL_CATEGORY_BLOG_POSTS } from '../src/data/localCategoryBlogPosts.js'
import { LOCAL_FUNCTIONAL_INGREDIENT_POSTS } from '../src/data/localFunctionalIngredientPosts.js'
import { LOCAL_SEO_EXPANSION_POSTS } from '../src/data/localSeoExpansionPosts.js'
import { LOCAL_TREND_BLOG_POSTS } from '../src/data/localTrendBlogPosts.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outDir = path.join(rootDir, 'tmp', 'supabase-local-posts')

const DEFAULT_SUPABASE_URL = 'https://rlfxuyeoluoeaxuujtly.supabase.co'
const DEFAULT_BATCH_SIZE = 10

function parseArgs() {
  const args = process.argv.slice(2)
  const getValue = (name) => {
    const index = args.indexOf(name)
    return index >= 0 ? args[index + 1] : null
  }

  return {
    batchSize: Number(getValue('--batch-size')) || DEFAULT_BATCH_SIZE,
    limit: Number(getValue('--limit')) || 0,
    publicJson: args.includes('--public-json'),
  }
}

async function readEnvFile(filePath) {
  try {
    const text = await import('node:fs/promises').then((fs) => fs.readFile(filePath, 'utf8'))
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
      if (!match || process.env[match[1]]) continue
      process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '')
    }
  } catch {
    // Optional local env files are ignored when absent.
  }
}

async function loadLocalEnv() {
  await readEnvFile(path.join(rootDir, '.env.local'))
  await readEnvFile(path.join(rootDir, '.env.vercel.local'))
  await readEnvFile(path.join(rootDir, '.env'))
}

function toSourcePosts(source, posts) {
  return posts.map((post) => ({ ...post, __source: source }))
}

function normalizePost(post) {
  const publishedAt = post.published_at || post.created_at || post.date || '2026-05-30T09:00:00+09:00'
  const title = String(post.title || '').trim()
  const slug = String(post.slug || '').trim()

  return {
    slug,
    title,
    excerpt: post.excerpt || '',
    content: post.content || '',
    category: post.category || 'general',
    tags: Array.isArray(post.tags) ? post.tags.map(String) : [],
    meta_title: post.meta_title || post.metaTitle || title,
    meta_desc: post.meta_desc || post.metaDescription || post.excerpt || '',
    og_image: post.og_image || post.ogImage || '/og-image.png',
    status: post.status || 'published',
    published_at: publishedAt,
    created_at: post.created_at || publishedAt,
    updated_at: post.updated_at || publishedAt,
    source: post.__source,
  }
}

function getLocalPosts() {
  return [
    ...toSourcePosts('trend', LOCAL_TREND_BLOG_POSTS),
    ...toSourcePosts('functional', LOCAL_FUNCTIONAL_INGREDIENT_POSTS),
    ...toSourcePosts('category', LOCAL_CATEGORY_BLOG_POSTS),
    ...toSourcePosts('seo', LOCAL_SEO_EXPANSION_POSTS),
  ].map(normalizePost)
}

async function fetchAllDbPosts() {
  const supabaseUrl = DEFAULT_SUPABASE_URL
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY
  if (!anonKey) {
    throw new Error('VITE_SUPABASE_ANON_KEY is required to audit existing posts.')
  }

  const url = new URL('/rest/v1/posts', supabaseUrl)
  url.searchParams.set('select', 'slug,title,category,meta_title,meta_desc,og_image,status')
  url.searchParams.set('limit', '10000')
  url.searchParams.set('order', 'slug.asc')

  const response = await fetch(url, {
    headers: {
      'accept-profile': 'public',
      apikey: anonKey,
      authorization: `Bearer ${anonKey}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Supabase REST audit failed: ${response.status} ${await response.text()}`)
  }

  return response.json()
}

function compactForInsert(post) {
  const { source: _source, ...insertable } = post
  return insertable
}

function sourceCounts(posts) {
  return posts.reduce((acc, post) => {
    acc[post.source] = (acc[post.source] || 0) + 1
    return acc
  }, {})
}

function changedFields(local, db) {
  return ['title', 'category', 'meta_title', 'meta_desc', 'og_image'].filter((field) => {
    return String(local[field] || '') !== String(db[field] || '')
  })
}

function sqlForBatch(batch, index) {
  const delimiter = `local_posts_${String(index).padStart(3, '0')}_json`
  const json = JSON.stringify(batch.map(compactForInsert))
  if (json.includes(`$${delimiter}$`)) {
    throw new Error(`SQL dollar-quote delimiter collision in batch ${index}`)
  }

  return `with incoming as (
  select *
  from jsonb_to_recordset($${delimiter}$${json}$${delimiter}$::jsonb) as p(
    slug text,
    title text,
    excerpt text,
    content text,
    category text,
    tags text[],
    meta_title text,
    meta_desc text,
    og_image text,
    status text,
    published_at timestamptz,
    created_at timestamptz,
    updated_at timestamptz
  )
),
inserted as (
  insert into public.posts (
    slug,
    title,
    excerpt,
    content,
    category,
    tags,
    meta_title,
    meta_desc,
    og_image,
    status,
    published_at,
    created_at,
    updated_at
  )
  select
    incoming.slug,
    incoming.title,
    incoming.excerpt,
    incoming.content,
    incoming.category,
    incoming.tags,
    incoming.meta_title,
    incoming.meta_desc,
    incoming.og_image,
    incoming.status,
    incoming.published_at,
    incoming.created_at,
    incoming.updated_at
  from incoming
  where not exists (
    select 1
    from public.posts existing
    where existing.slug = incoming.slug
  )
  on conflict (slug) do nothing
  returning id, slug
)
select count(*)::int as inserted_count, coalesce(array_agg(slug order by slug), '{}') as inserted_slugs
from inserted;`
}

async function main() {
  await loadLocalEnv()
  const args = parseArgs()
  const localPosts = getLocalPosts()
  const localSlugCounts = localPosts.reduce((acc, post) => {
    acc[post.slug] = (acc[post.slug] || 0) + 1
    return acc
  }, {})
  const localDuplicates = Object.entries(localSlugCounts)
    .filter(([, count]) => count > 1)
    .map(([slug, count]) => ({ slug, count }))

  if (localDuplicates.length > 0) {
    throw new Error(`Local duplicate slugs found: ${localDuplicates.map((item) => item.slug).join(', ')}`)
  }

  const dbPosts = await fetchAllDbPosts()
  const dbBySlug = new Map(dbPosts.map((post) => [post.slug, post]))
  const localOnly = localPosts.filter((post) => !dbBySlug.has(post.slug))
  const alreadyInDb = localPosts.filter((post) => dbBySlug.has(post.slug))
  const fieldConflicts = alreadyInDb
    .map((post) => ({
      slug: post.slug,
      source: post.source,
      changed: changedFields(post, dbBySlug.get(post.slug)),
    }))
    .filter((item) => item.changed.length > 0)

  const migrationCandidates = args.limit > 0 ? localOnly.slice(0, args.limit) : localOnly
  await mkdir(outDir, { recursive: true })
  for (const file of await readdir(outDir)) {
    if (/^insert-local-posts-batch-\d+\.sql$/.test(file) || file === 'summary.json') {
      await rm(path.join(outDir, file), { force: true })
    }
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    localTotal: localPosts.length,
    dbTotal: dbPosts.length,
    localOnlyCount: localOnly.length,
    localOnlyBySource: sourceCounts(localOnly),
    alreadyInDbCount: alreadyInDb.length,
    fieldConflictCount: fieldConflicts.length,
    fieldConflictSample: fieldConflicts.slice(0, 20),
    migrationCandidateCount: migrationCandidates.length,
    batchSize: args.batchSize,
    batches: [],
  }

  if (args.publicJson) {
    const payload = migrationCandidates.map(compactForInsert)
    const digest = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex').slice(0, 16)
    const publicFileName = `${digest}${digest}.txt`
    const publicPath = path.join(rootDir, 'public', publicFileName)
    await writeFile(publicPath, `${JSON.stringify(payload)}\n`, 'utf8')
    summary.publicJson = {
      file: `public/${publicFileName}`,
      urlPath: `/${publicFileName}`,
      sha256: digest,
      count: payload.length,
    }
  }

  for (let i = 0; i < migrationCandidates.length; i += args.batchSize) {
    const batch = migrationCandidates.slice(i, i + args.batchSize)
    const batchNumber = summary.batches.length + 1
    const fileName = `insert-local-posts-batch-${String(batchNumber).padStart(3, '0')}.sql`
    const filePath = path.join(outDir, fileName)
    await writeFile(filePath, `${sqlForBatch(batch, batchNumber)}\n`, 'utf8')
    summary.batches.push({
      file: path.relative(rootDir, filePath).replace(/\\/g, '/'),
      count: batch.length,
      firstSlug: batch[0]?.slug,
      lastSlug: batch.at(-1)?.slug,
    })
  }

  await writeFile(
    path.join(outDir, 'summary.json'),
    `${JSON.stringify(summary, null, 2)}\n`,
    'utf8',
  )

  console.log(JSON.stringify(summary, null, 2))
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
