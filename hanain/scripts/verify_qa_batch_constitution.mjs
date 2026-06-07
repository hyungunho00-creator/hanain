import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const POLICY_PATH = path.join(ROOT, 'data', 'qa', 'qa-addition-constitution.json')
const SRC_QA_PATH = path.join(ROOT, 'src', 'data', 'qa.json')
const PUBLIC_QA_PATH = path.join(ROOT, 'public', 'qa.json')
const OUT_PATH = path.join(ROOT, 'docs', 'qa-batch-constitution-result.md')

const OFFICIAL_HOST_PATTERNS = [
  /(^|\.)fda\.gov$/i,
  /(^|\.)cdc\.gov$/i,
  /(^|\.)nih\.gov$/i,
  /(^|\.)niddk\.nih\.gov$/i,
  /(^|\.)nia\.nih\.gov$/i,
  /(^|\.)medlineplus\.gov$/i,
  /(^|\.)cancer\.gov$/i,
  /(^|\.)uspreventiveservicestaskforce\.org$/i,
  /(^|\.)acog\.org$/i,
  /(^|\.)heart\.org$/i,
  /(^|\.)ncbi\.nlm\.nih\.gov$/i,
  /(^|\.)pubmed\.ncbi\.nlm\.nih\.gov$/i,
  /(^|\.)pmc\.ncbi\.nlm\.nih\.gov$/i,
]

const FORBIDDEN_NEAR_PHLOROTANNIN_RE =
  /플로로탄닌.{0,100}(치료|완치|예방을 보장|보장|대체|낫게|부작용 없이|검사 결과를 바꾼다|검사 결과를 바꿀 수 있다)/g

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function stripHtml(value) {
  return String(value || '').replace(/<[^>]+>/g, ' ')
}

function normalize(value) {
  return stripHtml(value).replace(/\s+/g, ' ').trim()
}

function hostFromUrl(value) {
  try {
    return new URL(value).hostname
  } catch {
    return ''
  }
}

function hasOfficialReference(item) {
  return (item.references || []).some((ref) => {
    const host = hostFromUrl(ref.url)
    return OFFICIAL_HOST_PATTERNS.some((pattern) => pattern.test(host))
  })
}

function hasResearchOrPhlorotanninReference(item) {
  const refs = item.references || []
  const text = `${item.answer || ''} ${item.validatedAnswer || ''} ${JSON.stringify(refs)}`
  return /플로로탄닌|감태|Ecklonia|phlorotannin|polyphenol|PubMed|PMC/i.test(text)
}

function itemDateKey(item) {
  const candidates = [item.published_at, item.created_at, item.updated_at, item.reviewed_at, item.id]
  for (const candidate of candidates) {
    const match = String(candidate || '').match(/20\d{2}[-/]?\d{2}[-/]?\d{2}|20\d{6}/)
    if (match) return match[0].replace(/[-/]/g, '')
  }
  return ''
}

function identityRuleApplies(item, policy) {
  const from = String(policy.identityRule?.applyToNewItemsFromDate || '').replace(/[-/]/g, '')
  if (!from) return false
  const dateKey = itemDateKey(item)
  return Boolean(dateKey && dateKey >= from)
}

function strategicItems(qa) {
  return (qa.questions || []).filter((item) =>
    String(item.content_type || '') === 'strategic_health_qna' ||
    String(item.id || '').startsWith('strategic-qa-')
  )
}

function assertItem(item, policy, sourceName, failures) {
  const min = policy.qualityMinimums
  const answer = item.validatedAnswer || item.validated_answer || item.answer || ''
  const plain = normalize(answer)
  const refs = Array.isArray(item.references) ? item.references : []
  const tags = Array.isArray(item.tags) ? item.tags : []
  const id = item.id || '(missing-id)'

  if (String(item.qualityStatus || '').toLowerCase() !== policy.seoRule.qualityStatus) {
    failures.push(`${sourceName}:${id}: qualityStatus must be ${policy.seoRule.qualityStatus}`)
  }
  if (String(item.sourceStatus || '').toLowerCase() !== policy.seoRule.sourceStatus) {
    failures.push(`${sourceName}:${id}: sourceStatus must be ${policy.seoRule.sourceStatus}`)
  }
  if (String(item.publicBodyMode || '') !== policy.seoRule.publicBodyMode) {
    failures.push(`${sourceName}:${id}: publicBodyMode must be ${policy.seoRule.publicBodyMode}`)
  }
  if (item.noindex !== false) {
    failures.push(`${sourceName}:${id}: noindex must be false`)
  }
  if (!item.category && !item.category_id) {
    failures.push(`${sourceName}:${id}: category missing`)
  }
  if (!item.question || normalize(item.question).length < 20) {
    failures.push(`${sourceName}:${id}: question is too short or missing`)
  }
  if (plain.length < min.plainAnswerCharsEach) {
    failures.push(`${sourceName}:${id}: answer plain length ${plain.length} < ${min.plainAnswerCharsEach}`)
  }
  if (tags.length < min.tagsEach) {
    failures.push(`${sourceName}:${id}: tags ${tags.length} < ${min.tagsEach}`)
  }
  if (refs.length < min.referencesEach) {
    failures.push(`${sourceName}:${id}: references ${refs.length} < ${min.referencesEach}`)
  }
  if (!hasOfficialReference(item)) {
    failures.push(`${sourceName}:${id}: official reference missing`)
  }
  if (!hasResearchOrPhlorotanninReference(item)) {
    failures.push(`${sourceName}:${id}: phlorotannin/research reference missing`)
  }
  if (!plain.includes('플로로탄닌')) {
    failures.push(`${sourceName}:${id}: phlorotannin bridge missing`)
  }
  if (FORBIDDEN_NEAR_PHLOROTANNIN_RE.test(plain)) {
    failures.push(`${sourceName}:${id}: forbidden therapeutic wording near phlorotannin`)
  }
  FORBIDDEN_NEAR_PHLOROTANNIN_RE.lastIndex = 0
  if (identityRuleApplies(item, policy)) {
    for (const phrase of policy.identityRule?.mustInclude || []) {
      if (phrase && !plain.includes(phrase)) {
        failures.push(`${sourceName}:${id}: identityRule phrase missing: ${phrase}`)
      }
    }
    if (!/(회복|생활 리듬|전신|컨디션|균형)/.test(plain)) {
      failures.push(`${sourceName}:${id}: recovery frame missing`)
    }
  }
}

function run() {
  const policy = readJson(POLICY_PATH)
  const srcQa = readJson(SRC_QA_PATH)
  const publicQa = readJson(PUBLIC_QA_PATH)
  const srcItems = strategicItems(srcQa)
  const publicItems = strategicItems(publicQa)
  const failures = []

  const srcIds = new Set(srcItems.map((item) => item.id))
  const publicIds = new Set(publicItems.map((item) => item.id))

  if (srcItems.length < policy.qualityMinimums.itemsPerBatch) {
    failures.push(`src/data/qa.json: strategic item count ${srcItems.length} < ${policy.qualityMinimums.itemsPerBatch}`)
  }
  if (publicItems.length < policy.qualityMinimums.itemsPerBatch) {
    failures.push(`public/qa.json: strategic item count ${publicItems.length} < ${policy.qualityMinimums.itemsPerBatch}`)
  }

  for (const id of srcIds) {
    if (!publicIds.has(id)) failures.push(`${id}: missing from public/qa.json`)
  }
  for (const id of publicIds) {
    if (!srcIds.has(id)) failures.push(`${id}: missing from src/data/qa.json`)
  }

  for (const item of srcItems) assertItem(item, policy, 'src', failures)
  for (const item of publicItems) assertItem(item, policy, 'public', failures)

  const status = failures.length ? 'FAIL' : 'PASS'
  const lines = [
    '# QA Batch Constitution Result',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- policy: ${policy.version}`,
    `- srcStrategicItems: ${srcItems.length}`,
    `- publicStrategicItems: ${publicItems.length}`,
    `- status: ${status}`,
    '',
    '## Failures',
    '',
    ...(failures.length ? failures : ['none']).map((item) => `- ${item}`),
  ]

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
  fs.writeFileSync(OUT_PATH, `${lines.join('\n')}\n`, 'utf8')
  console.log(JSON.stringify({
    policy: policy.version,
    srcStrategicItems: srcItems.length,
    publicStrategicItems: publicItems.length,
    failures: failures.length,
    status,
  }, null, 2))

  if (failures.length) process.exit(2)
}

run()
