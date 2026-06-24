import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { LOCAL_TREND_BLOG_POSTS } from '../src/data/localTrendBlogPosts.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_PATH = path.join(ROOT, 'docs', 'blog-insight-duplicate-section-audit-result.md')
const QA_PATHS = [
  {
    label: 'src',
    path: path.join(ROOT, 'src', 'data', 'qa.json'),
  },
  {
    label: 'public',
    path: path.join(ROOT, 'public', 'qa.json'),
  },
]

const REVIEWED_CONNECTIONS = [
  {
    blogSlug: 'measles-2026-adult-mmr-record-immunity-phlorotannin-journal',
    insightSlug: 'measles-2026-adult-mmr-record-immunity-phlorotannin-insight',
    qSlug: '홍역이-다시-유행한다는데-성인도-MMR-접종-기록을-확인해야-하나요',
  },
  {
    blogSlug: 'h5n1-raw-milk-dairy-label-exposure-phlorotannin-journal',
    insightSlug: 'h5n1-raw-milk-dairy-label-exposure-phlorotannin-insight',
    qSlug: 'H5N1-조류독감과-생우유-이슈-일반-소비자는-어떤-노출-신호를-봐야-하나요',
  },
  {
    blogSlug: 'glp1-compounded-safety-muscle-gut-recovery-phlorotannin-journal',
    insightSlug: 'glp1-compounded-safety-muscle-gut-recovery-phlorotannin-insight',
    qSlug: '비승인-GLP-1-다이어트-주사-이슈-이후-소비자는-무엇을-확인해야-하나요',
  },
]

const REVIEWED_BLOG_SLUGS = new Set(REVIEWED_CONNECTIONS.map((item) => item.blogSlug))
const REVIEWED_INSIGHT_SLUGS = new Set(REVIEWED_CONNECTIONS.map((item) => item.insightSlug))

function hasEncodingCorruption(text) {
  return /[\uFFFD\uF900-\uFAFF]/u.test(String(text || ''))
}

function hasLowQualityPhrase(text) {
  return /읽고 남는환|구매 욕구|강하게 어필|강한 소재/.test(String(text || ''))
}

function headingCount(text, heading) {
  return (String(text || '').match(new RegExp(`^## ${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'gm')) || []).length
}

function startsWithMarkdownHeading(text) {
  return /^#{1,6}\s+/m.test(String(text || '').trim())
}

function hasReferenceSection(text) {
  return /^## (참고한 자료|출처|참고문헌|References)$/m.test(String(text || ''))
}

function inspectBlogPosts() {
  return LOCAL_TREND_BLOG_POSTS.map((post) => {
    const content = String(post.content || '')
    const shortAnswers = headingCount(content, '짧은 답변')
    const referenceSection = hasReferenceSection(content)
    const sourcesCount = Array.isArray(post.sources) ? post.sources.length : 0
    const issues = []
    if (shortAnswers > 1) issues.push(`duplicate-short-answer-heading:${shortAnswers}`)
    if (startsWithMarkdownHeading(post.excerpt)) issues.push('markdown-heading-in-excerpt')
    if (startsWithMarkdownHeading(post.meta_desc)) issues.push('markdown-heading-in-meta-desc')
    if (referenceSection && sourcesCount === 0) issues.push('reference-section-with-empty-sources')
    if (hasEncodingCorruption(content)) issues.push('encoding-corruption-marker')
    if (REVIEWED_BLOG_SLUGS.has(post.slug) && hasLowQualityPhrase(content)) issues.push('reviewed-low-quality-phrase')
    if (REVIEWED_BLOG_SLUGS.has(post.slug) && sourcesCount < 3) issues.push('reviewed-missing-official-sources')
    if (REVIEWED_BLOG_SLUGS.has(post.slug)) {
      const connection = REVIEWED_CONNECTIONS.find((item) => item.blogSlug === post.slug)
      if (connection && !content.includes(`/insights/${connection.insightSlug}`)) {
        issues.push('reviewed-blog-missing-related-insight')
      }
      if (connection && !content.includes(`/q/${connection.qSlug}`)) {
        issues.push('reviewed-blog-missing-related-qa')
      }
    }
    return {
      type: 'blog',
      id: post.id,
      slug: post.slug,
      title: post.title,
      shortAnswers,
      sourcesCount,
      issues,
    }
  })
}

function inspectInsightPosts() {
  const dir = path.join(ROOT, 'src', 'data', 'insights', 'posts')
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((name) => name.endsWith('.jsx')) : []
  return files.map((file) => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8')
    const shortAnswers = headingCount(content, '짧은 답변')
    const slug = file.replace(/\.jsx$/, '')
    const issues = []
    if (shortAnswers > 1) issues.push(`duplicate-short-answer-heading:${shortAnswers}`)
    if (hasEncodingCorruption(content)) issues.push('encoding-corruption-marker')
    if (REVIEWED_INSIGHT_SLUGS.has(slug) && hasLowQualityPhrase(content)) issues.push('reviewed-low-quality-phrase')
    if (REVIEWED_INSIGHT_SLUGS.has(slug) && !/href=\{source\.url\}|https:\/\/(www\.)?(cdc|fda)\.gov/.test(content)) {
      issues.push('reviewed-missing-rendered-sources')
    }
    return {
      type: 'insight',
      id: file,
      slug,
      title: slug,
      shortAnswers,
      sourcesCount: null,
      issues,
    }
  })
}

function inspectReviewedQa() {
  return QA_PATHS.flatMap((qaPath) => {
    const data = JSON.parse(fs.readFileSync(qaPath.path, 'utf8'))
    return REVIEWED_CONNECTIONS.map((connection) => {
      const item = data.questions.find((question) => question.slug === connection.qSlug)
      const issues = []
      const body = JSON.stringify(item || {})
      if (!item) issues.push('reviewed-qa-missing')
      if (item && item.noindex !== false) issues.push('reviewed-qa-noindex-not-false')
      if (item && item.sourceStatus !== 'verified') issues.push('reviewed-qa-source-not-verified')
      if (item && hasLowQualityPhrase(body)) issues.push('reviewed-qa-low-quality-phrase')
      if (item && hasEncodingCorruption(body)) issues.push('reviewed-qa-encoding-corruption-marker')
      if (item && !String(item.answer || '').includes('https://')) issues.push('reviewed-qa-missing-source-links')
      if (item && !(item.related_insights || []).includes(`/insights/${connection.insightSlug}`)) {
        issues.push('reviewed-qa-missing-related-insight')
      }
      if (item && !(item.related_blogs || []).includes(`/blog/${connection.blogSlug}`)) {
        issues.push('reviewed-qa-missing-related-blog')
      }
      return {
        type: `qa:${qaPath.label}`,
        id: connection.qSlug,
        slug: connection.qSlug,
        title: item?.question || connection.qSlug,
        shortAnswers: null,
        sourcesCount: null,
        issues,
      }
    })
  })
}

const rows = [...inspectBlogPosts(), ...inspectInsightPosts(), ...inspectReviewedQa()]
const failures = rows.filter((row) => row.issues.length > 0)
const status = failures.length ? 'FAIL' : 'PASS'

const lines = [
  '# Blog/Insight Duplicate Section Audit Result',
  '',
  `- generatedAt: ${new Date().toISOString()}`,
  `- blogScanned: ${LOCAL_TREND_BLOG_POSTS.length}`,
  `- insightScanned: ${rows.filter((row) => row.type === 'insight').length}`,
  `- reviewedQaScanned: ${rows.filter((row) => row.type.startsWith('qa')).length}`,
  `- failures: ${failures.length}`,
  `- status: ${status}`,
  '',
  '## Failures',
  '',
  ...(failures.length
    ? failures.map((row) => `- [${row.type}] ${row.slug} | ${row.issues.join(', ')}`)
    : ['- none']),
]

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
fs.writeFileSync(OUT_PATH, `${lines.join('\n')}\n`, 'utf8')
console.log(JSON.stringify({
  blogScanned: LOCAL_TREND_BLOG_POSTS.length,
  insightScanned: rows.filter((row) => row.type === 'insight').length,
  reviewedQaScanned: rows.filter((row) => row.type.startsWith('qa')).length,
  failures: failures.length,
  report: path.relative(ROOT, OUT_PATH),
  status,
}, null, 2))

if (failures.length) process.exit(2)
