import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getRenderableQAAnswer, extractLegacyCandidates, shouldEmitQASchema } from '../src/lib/qaAnswer.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const QA_PATH = path.join(ROOT, 'public', 'qa.json')
const OUT_PATH = path.join(ROOT, 'docs', 'qa-no-blank-answer-audit-result.md')

const RENDER_PATHS = [
  'src/pages/QAPage.jsx',
  'src/pages/QuestionDetailPage.jsx',
  'src/pages/QATagPage.jsx',
  'src/pages/CategoryPage.jsx',
  'src/pages/HomePage.jsx',
]

function readText(p) {
  return fs.readFileSync(path.join(ROOT, p), 'utf8')
}

function normalizeSpace(text) {
  return String(text || '').replace(/\s+/g, ' ').trim()
}

function auditDataset(questions) {
  const failures = []
  const warnings = []

  let publicCount = 0
  let reviewCount = 0
  let blankPublic = 0

  for (const q of questions) {
    const renderable = getRenderableQAAnswer(q)
    const html = normalizeSpace(renderable.html)
    const status = String(q.qualityStatus || q.quality_status || '').toLowerCase()
    const validated = normalizeSpace(q.validatedAnswer || q.validated_answer || '')
    const legacyCandidates = extractLegacyCandidates(q)

    if (renderable.mode === 'missing_answer') reviewCount += 1
    else publicCount += 1

    if (renderable.mode !== 'missing_answer' && !html) {
      blankPublic += 1
      failures.push(`${q.id}: public answer is blank`)
    }

    if (status === 'validated' && !validated) {
      failures.push(`${q.id}: qualityStatus=validated but validatedAnswer missing`)
    }

    if (validated && renderable.mode === 'missing_answer') {
      failures.push(`${q.id}: validatedAnswer exists but renderer hides answer`)
    }

    if (legacyCandidates.length > 0 && renderable.mode === 'missing_answer') {
      warnings.push(`${q.id}: legacy answer exists but blocked to missing_answer`)
    }

    if (!shouldEmitQASchema(q) && renderable.mode !== 'missing_answer') {
      failures.push(`${q.id}: schema eligibility mismatch`)
    }
  }

  return { failures, warnings, publicCount, reviewCount, blankPublic }
}

function auditRenderPaths() {
  const findings = []
  for (const rel of RENDER_PATHS) {
    const text = readText(rel)
    const hasResolverUse =
      text.includes('getRenderableQAAnswer') ||
      text.includes('shouldEmitQASchema') ||
      text.includes('answerPlainTextForMeta')
    if (!hasResolverUse) {
      findings.push(`${rel}: qaAnswer resolver usage not found`)
    }
    if (text.includes('getValidatedAnswerHtml')) {
      findings.push(`${rel}: legacy validated-only helper still present`)
    }
  }
  return findings
}

function main() {
  const qa = JSON.parse(fs.readFileSync(QA_PATH, 'utf8'))
  const questions = qa.questions || []
  const dataset = auditDataset(questions)
  const pathFindings = auditRenderPaths()
  const failures = [...dataset.failures, ...pathFindings]
  const status = failures.length === 0 ? 'PASS' : 'FAIL'

  const lines = [
    '# QA No-Blank-Answer Audit Result',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- scanned: ${questions.length}`,
    `- publicCount: ${dataset.publicCount}`,
    `- reviewNoticeCount: ${dataset.reviewCount}`,
    `- blankPublicAnswers: ${dataset.blankPublic}`,
    `- failures: ${failures.length}`,
    `- warnings: ${dataset.warnings.length}`,
    `- status: ${status}`,
    '',
    '## Failures',
    '',
    ...(failures.length ? failures.map((x) => `- ${x}`) : ['- none']),
    '',
    '## Warnings',
    '',
    ...(dataset.warnings.length ? dataset.warnings.slice(0, 200).map((x) => `- ${x}`) : ['- none']),
  ]

  fs.writeFileSync(OUT_PATH, `${lines.join('\n')}\n`, 'utf8')
  console.log(JSON.stringify({
    scanned: questions.length,
    publicCount: dataset.publicCount,
    reviewNoticeCount: dataset.reviewCount,
    blankPublicAnswers: dataset.blankPublic,
    failures: failures.length,
    warnings: dataset.warnings.length,
    status,
  }, null, 2))

  if (status !== 'PASS') process.exit(2)
}

main()

