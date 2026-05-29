import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DOCS_DIR = path.join(ROOT, 'docs')
const DATA_DIR = path.join(ROOT, 'data')
const QA_PATH = path.join(ROOT, 'public', 'qa.json')
const TAG_INDEX_PATH = path.join(ROOT, 'public', 'tagIndex.json')

const BAD_PHRASES = [
  '거창한 계획보다',
  '지속 가능한 작은 루틴',
  '작은 루틴부터',
  '관리형 질문',
  '실천률',
  '체감도 빨라집니다',
  '상담 정확도',
  '이번 질문의 핵심 키워드',
  '키워드별로',
  '성분명과 제품명',
  '연구 데이터와',
  '에 대한 실전 답은',
]

const BAD_GRAMMAR = [/\?에 대한/g, /은\?에 대한/g, /는\?에 대한/g, /요\?에 대한/g]

const MEDICAL_OVERCLAIM = [
  /플로로탄닌.{0,18}(치료|완치|예방|개선|회복|재생|없앤다|낮춘다)/,
  /(약|병원)\s*대신/,
  /부작용\s*없/,
]

const STOPWORDS = new Set([
  '어떻게',
  '무엇',
  '뭔가요',
  '있나요',
  '인가요',
  '일까요',
  '해야',
  '하나요',
  '방법',
  '관리',
  '질문',
  '관련',
  '대한',
])

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true })
}

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch {
    return ''
  }
}

function stripHtml(text) {
  return String(text || '').replace(/<[^>]+>/g, ' ')
}

function normalize(text) {
  return stripHtml(text).replace(/\s+/g, ' ').trim()
}

function tokenize(text) {
  return normalize(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .map((x) => x.trim())
    .filter((x) => x.length >= 2 && !STOPWORDS.has(x))
}

function makeSlug(text) {
  return String(text || '')
    .replace(/[^\w\s가-힣]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

function hasBadPhrase(text) {
  const s = String(text || '')
  return BAD_PHRASES.some((p) => s.includes(p))
}

function hasBadGrammar(text) {
  const s = String(text || '')
  return BAD_GRAMMAR.some((re) => re.test(s))
}

function detectMedicalRisk(text) {
  const plain = normalize(text)
  if (MEDICAL_OVERCLAIM.some((re) => re.test(plain))) return 'high'
  if (/(치료|수술|진단|검사|약물|재활)/.test(plain)) return 'medium'
  return 'low'
}

function detectPhlorotanninPlacement(text) {
  const plain = normalize(text)
  const idx = plain.indexOf('플로로탄닌')
  if (idx < 0) return 'none'
  const ratio = idx / Math.max(plain.length, 1)
  if (ratio <= 0.2) return 'top'
  if (ratio <= 0.7) return 'middle'
  return 'bottom'
}

function scoreTopicMatch(title, body) {
  const titleTokens = [...new Set(tokenize(title))]
  if (titleTokens.length === 0) return 0
  const bodyTokens = new Set(tokenize(body))
  const hits = titleTokens.filter((t) => bodyTokens.has(t)).length
  return Math.max(0, Math.min(5, Math.round((hits / titleTokens.length) * 5)))
}

function inferPriority({ topicMatchScore, badPhrase, badGrammar, plainLength }) {
  if (badPhrase || badGrammar) return 'critical'
  if (plainLength < 900) return 'high'
  if (topicMatchScore === 0) return 'critical'
  if (topicMatchScore <= 1) return 'high'
  if (topicMatchScore <= 2) return 'medium'
  return 'low'
}

function getAction(priority) {
  if (priority === 'critical' || priority === 'high') return 'rewrite'
  if (priority === 'medium') return 'manual-review'
  return 'keep'
}

function auditQa() {
  const qa = readJson(QA_PATH)
  const audits = []
  const queue = []

  for (const item of qa.questions || []) {
    const text = String(item.answer || '')
    const plain = normalize(text)
    const topicScore = scoreTopicMatch(item.question || '', plain)
    const badPhrase = hasBadPhrase(text)
    const badGrammar = hasBadGrammar(`${item.question || ''} ${text}`)
    const priority = inferPriority({
      topicMatchScore: topicScore,
      badPhrase,
      badGrammar,
      plainLength: plain.length,
    })
    const action = getAction(priority)

    const row = {
      id: item.id || '',
      slug: makeSlug(item.question),
      type: 'qa',
      title: item.question || '',
      category: item.category || '',
      tags: Array.isArray(item.tags) ? item.tags : [],
      currentSummary: plain.slice(0, 180),
      currentBodyFirst300: plain.slice(0, 300),
      isGenericTemplate: badPhrase,
      hasBadPhrase: badPhrase || badGrammar,
      doesAnswerTitle: topicScore >= 1,
      topicMatchScore: topicScore,
      medicalRisk: detectMedicalRisk(plain),
      phlorotanninPlacement: detectPhlorotanninPlacement(plain),
      rewritePriority: priority,
      action,
    }
    audits.push(row)

    if (action === 'rewrite') {
      queue.push({
        slug: row.slug,
        type: 'qa',
        title: row.title,
        category: row.category,
        tags: row.tags,
        priority,
        reason: badPhrase || badGrammar ? 'bad template phrase/grammar detected' : `low topic match score: ${topicScore}`,
        requiredTopicTerms: tokenize(row.title).slice(0, 6),
        bannedCurrentPhrases: BAD_PHRASES.filter((p) => plain.includes(p)),
        rewriteRequired: true,
      })
    }
  }

  return { audits, queue, categories: qa.categories || [] }
}

function auditBlogLike() {
  const files = [
    path.join(ROOT, 'src', 'data', 'localCategoryBlogPosts.js'),
    path.join(ROOT, 'src', 'data', 'localFunctionalIngredientPosts.js'),
    path.join(ROOT, 'src', 'data', 'localSeoExpansionPosts.js'),
  ]
  const rows = []

  for (const file of files) {
    const txt = readFileSafe(file)
    if (!txt) continue
    const titleMatches = [...txt.matchAll(/title:\s*['"`]([^'"`]+)['"`]/g)]
    const slugMatches = [...txt.matchAll(/slug:\s*['"`]([^'"`]+)['"`]/g)]
    const excerptMatches = [...txt.matchAll(/excerpt:\s*['"`]([^'"`]+)['"`]/g)]
    const catMatches = [...txt.matchAll(/category:\s*['"`]([^'"`]+)['"`]/g)]
    const n = Math.min(titleMatches.length, slugMatches.length, Math.max(1, excerptMatches.length))
    for (let i = 0; i < n; i += 1) {
      const title = titleMatches[i]?.[1] || ''
      const excerpt = excerptMatches[i]?.[1] || ''
      const topicScore = scoreTopicMatch(title, excerpt)
      const badPhrase = hasBadPhrase(`${title} ${excerpt}`) || hasBadGrammar(`${title} ${excerpt}`)
      rows.push({
        id: `${path.basename(file)}:${i + 1}`,
        slug: slugMatches[i]?.[1] || '',
        type: 'blog',
        title,
        category: catMatches[i]?.[1] || '',
        tags: [],
        currentSummary: normalize(excerpt).slice(0, 180),
        currentBodyFirst300: normalize(excerpt).slice(0, 300),
        isGenericTemplate: badPhrase,
        hasBadPhrase: badPhrase,
        doesAnswerTitle: topicScore >= 1,
        topicMatchScore: topicScore,
        medicalRisk: detectMedicalRisk(excerpt),
        phlorotanninPlacement: detectPhlorotanninPlacement(excerpt),
        rewritePriority: inferPriority({
          topicMatchScore: topicScore,
          badPhrase,
          badGrammar: false,
          plainLength: normalize(excerpt).length,
        }),
        action: badPhrase ? 'rewrite' : 'keep',
      })
    }
  }

  return rows
}

function auditInsights() {
  const postsDir = path.join(ROOT, 'src', 'data', 'insights', 'posts')
  const files = fs.existsSync(postsDir) ? fs.readdirSync(postsDir).filter((f) => f.endsWith('.jsx')) : []
  const rows = []

  for (const file of files) {
    const full = path.join(postsDir, file)
    const txt = readFileSafe(full)
    const title = txt.match(/title:\s*['"`]([^'"`]+)['"`]/)?.[1] || file.replace(/\.jsx$/, '')
    const desc = txt.match(/description:\s*['"`]([^'"`]+)['"`]/)?.[1] || ''
    const body = `${title} ${desc}`
    const topicScore = scoreTopicMatch(title, body)
    const badPhrase = hasBadPhrase(body) || hasBadGrammar(body)
    rows.push({
      id: file,
      slug: file.replace(/^\d+-/, '').replace(/\.jsx$/, ''),
      type: 'insight',
      title,
      category: '',
      tags: [],
      currentSummary: normalize(desc).slice(0, 180),
      currentBodyFirst300: normalize(desc).slice(0, 300),
      isGenericTemplate: badPhrase,
      hasBadPhrase: badPhrase,
      doesAnswerTitle: topicScore >= 1,
      topicMatchScore: topicScore,
      medicalRisk: detectMedicalRisk(body),
      phlorotanninPlacement: detectPhlorotanninPlacement(body),
      rewritePriority: badPhrase ? 'high' : 'low',
      action: badPhrase ? 'rewrite' : 'keep',
    })
  }

  return rows
}

function auditCategoryAndTags(categories) {
  const catRows = (categories || []).map((c) => ({
    id: c.id,
    slug: c.id,
    type: 'category',
    title: c.name,
    category: c.id,
    tags: [],
    currentSummary: normalize(c.description || ''),
    currentBodyFirst300: normalize(c.description || '').slice(0, 300),
    isGenericTemplate: false,
    hasBadPhrase: false,
    doesAnswerTitle: true,
    topicMatchScore: 5,
    medicalRisk: 'low',
    phlorotanninPlacement: detectPhlorotanninPlacement(c.description || ''),
    rewritePriority: 'low',
    action: 'keep',
  }))

  const tagIndex = readJson(TAG_INDEX_PATH)
  const tags = Object.keys(tagIndex.tags || {})
  const tagRows = tags.map((tag) => ({
    id: `tag:${tag}`,
    slug: encodeURIComponent(tag),
    type: 'tag',
    title: tag,
    category: '',
    tags: [tag],
    currentSummary: `tag ${tag}`,
    currentBodyFirst300: '',
    isGenericTemplate: false,
    hasBadPhrase: false,
    doesAnswerTitle: true,
    topicMatchScore: 5,
    medicalRisk: 'low',
    phlorotanninPlacement: 'none',
    rewritePriority: 'low',
    action: 'keep',
  }))
  return { catRows, tagRows, tagCount: tags.length }
}

function writeMainReport({ rows, qaCount, blogCount, insightCount, catCount, tagCount, rewriteCount }) {
  const critical = rows.filter((r) => r.rewritePriority === 'critical').slice(0, 80)
  const high = rows.filter((r) => r.rewritePriority === 'high').slice(0, 80)

  const lines = [
    '# Site-wide Content Quality Audit',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- QA scanned: ${qaCount}`,
    `- Blog-like scanned: ${blogCount}`,
    `- Insight scanned: ${insightCount}`,
    `- Category description scanned: ${catCount}`,
    `- Tag description scanned: ${tagCount}`,
    `- rewriteRequired total: ${rewriteCount}`,
    '',
    '## Critical (Top 80)',
    '',
    ...critical.map(
      (r) =>
        `- [${r.type}] ${r.id} | ${r.title} | category=${r.category} | topicMatch=${r.topicMatchScore} | bad=${r.hasBadPhrase} | action=${r.action}`,
    ),
    '',
    '## High (Top 80)',
    '',
    ...high.map(
      (r) =>
        `- [${r.type}] ${r.id} | ${r.title} | category=${r.category} | topicMatch=${r.topicMatchScore} | bad=${r.hasBadPhrase} | action=${r.action}`,
    ),
  ]
  fs.writeFileSync(path.join(DOCS_DIR, 'site-wide-content-quality-audit.md'), `${lines.join('\n')}\n`, 'utf8')
}

function writeResultReport({ qaRows, fail }) {
  const bad = qaRows.filter((r) => r.hasBadPhrase)
  const criticalOrHigh = qaRows.filter((r) => r.rewritePriority === 'critical' || r.rewritePriority === 'high')
  const lines = [
    '# Site-wide Content Quality Audit Result',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- qaScanned: ${qaRows.length}`,
    `- qaCriticalOrHigh: ${criticalOrHigh.length}`,
    `- qaBadPhrase: ${bad.length}`,
    `- status: ${fail ? 'FAIL' : 'PASS'}`,
    '',
    '## Top Issues (First 80)',
    '',
    ...criticalOrHigh.slice(0, 80).map((r) => `- ${r.id} | ${r.title} | priority=${r.rewritePriority} | topicMatch=${r.topicMatchScore}`),
  ]
  fs.writeFileSync(path.join(DOCS_DIR, 'site-wide-content-quality-audit-result.md'), `${lines.join('\n')}\n`, 'utf8')
}

function main() {
  ensureDir(DOCS_DIR)
  ensureDir(DATA_DIR)

  const qaRes = auditQa()
  const blogRows = auditBlogLike()
  const insightRows = auditInsights()
  const { catRows, tagRows, tagCount } = auditCategoryAndTags(qaRes.categories)
  const allRows = [...qaRes.audits, ...blogRows, ...insightRows, ...catRows, ...tagRows]

  const rewriteCount =
    qaRes.queue.length + blogRows.filter((r) => r.action === 'rewrite').length + insightRows.filter((r) => r.action === 'rewrite').length

  writeMainReport({
    rows: allRows,
    qaCount: qaRes.audits.length,
    blogCount: blogRows.length,
    insightCount: insightRows.length,
    catCount: catRows.length,
    tagCount,
    rewriteCount,
  })

  fs.writeFileSync(path.join(DATA_DIR, 'content-rewrite-queue.json'), `${JSON.stringify(qaRes.queue, null, 2)}\n`, 'utf8')

  const qaBadPhrase = qaRes.audits.filter((r) => r.hasBadPhrase)
  const fail = qaBadPhrase.length > 0
  writeResultReport({ qaRows: qaRes.audits, fail })

  const summary = {
    scanned: allRows.length,
    qa: qaRes.audits.length,
    blog: blogRows.length,
    insight: insightRows.length,
    categoryDescriptions: catRows.length,
    tagDescriptions: tagRows.length,
    rewriteQueue: qaRes.queue.length,
    report: 'docs/site-wide-content-quality-audit.md',
    queue: 'data/content-rewrite-queue.json',
    status: fail ? 'FAIL' : 'PASS',
  }
  console.log(JSON.stringify(summary, null, 2))
  if (fail) process.exit(2)
}

main()

