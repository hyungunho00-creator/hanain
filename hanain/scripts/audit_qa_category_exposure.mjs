import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC_QA = path.join(ROOT, 'src', 'data', 'qa.json')
const PUBLIC_QA = path.join(ROOT, 'public', 'qa.json')
const OUT = path.join(ROOT, 'docs', 'qa-category-exposure-audit-result.md')

const REQUIRED_CATEGORIES = [
  'metabolism',
  'cancer_immune',
  'digestive',
  'cardiovascular',
  'neuro_cognitive',
  'mental_health',
  'musculoskeletal',
  'skin',
  'hair',
  'respiratory',
  'infection_inflammation',
  'womens_health',
  'mens_health',
]

function readQa(file) {
  const payload = JSON.parse(fs.readFileSync(file, 'utf8'))
  return {
    categories: Array.isArray(payload.categories) ? payload.categories : [],
    questions: Array.isArray(payload.questions) ? payload.questions : [],
  }
}

function isPublicQa(item) {
  if (!item || typeof item !== 'object') return false
  if (item.noindex === true) return false
  const answer = item.validatedAnswer || item.validated_answer || item.answer || ''
  return Boolean(item.id && item.question && answer)
}

function countByCategory(questions) {
  const counts = Object.fromEntries(REQUIRED_CATEGORIES.map((id) => [id, 0]))
  for (const item of questions) {
    const category = item.category || item.category_id
    if (category in counts && isPublicQa(item)) counts[category] += 1
  }
  return counts
}

function assertCategoryFile(name, qa, failures) {
  const categoryIds = new Set(qa.categories.map((item) => item.id))
  const counts = countByCategory(qa.questions)

  for (const category of REQUIRED_CATEGORIES) {
    if (!categoryIds.has(category)) failures.push(`${name}: category metadata missing: ${category}`)
    if (counts[category] <= 0) failures.push(`${name}: no public Q&A exposed for category: ${category}`)
  }

  return counts
}

function run() {
  const src = readQa(SRC_QA)
  const pub = readQa(PUBLIC_QA)
  const failures = []

  const srcCounts = assertCategoryFile('src/data/qa.json', src, failures)
  const publicCounts = assertCategoryFile('public/qa.json', pub, failures)

  for (const category of REQUIRED_CATEGORIES) {
    if (srcCounts[category] !== publicCounts[category]) {
      failures.push(
        `${category}: src/public category count mismatch (${srcCounts[category]} !== ${publicCounts[category]})`,
      )
    }
  }

  const status = failures.length ? 'FAIL' : 'PASS'
  const lines = [
    '# QA Category Exposure Audit',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    '- sourceOfTruth: src/data/qa.json and public/qa.json',
    `- categories: ${REQUIRED_CATEGORIES.length}`,
    `- status: ${status}`,
    '',
    '## Counts',
    '',
    '| category | src | public |',
    '|---|---:|---:|',
    ...REQUIRED_CATEGORIES.map((category) => `| ${category} | ${srcCounts[category]} | ${publicCounts[category]} |`),
    '',
    '## Failures',
    '',
    ...(failures.length ? failures : ['none']).map((item) => `- ${item}`),
  ]

  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, `${lines.join('\n')}\n`, 'utf8')
  console.log(JSON.stringify({ status, categories: REQUIRED_CATEGORIES.length, failures: failures.length }, null, 2))
  if (failures.length) process.exit(1)
}

run()
