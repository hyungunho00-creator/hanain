import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const QA_PATH = path.join(ROOT, 'public', 'qa.json')
const OUT_PATH = path.join(ROOT, 'docs', 'qa-no-blank-answer-audit-result.md')

function normalizeSpace(text) {
  return String(text || '').replace(/\s+/g, ' ').trim()
}

function pickAnswer(row) {
  const candidates = [
    row.validatedAnswer,
    row.validated_answer,
    row.answer,
    row.body,
    row.content,
    row.detailedAnswer,
  ]
  for (const value of candidates) {
    const text = normalizeSpace(value)
    if (text) return text
  }
  return ''
}

function auditQuestions(questions) {
  const failures = []
  let publicCount = 0
  let blankPublic = 0

  for (const q of questions) {
    const status = String(q.qualityStatus || q.quality_status || '').toLowerCase()
    const answer = pickAnswer(q)

    if (status === 'validated' || answer) {
      publicCount += 1
    }

    if ((status === 'validated' || answer) && !answer) {
      blankPublic += 1
      failures.push(`${q.id}: public answer is blank`)
    }

    if (status === 'validated' && !normalizeSpace(q.validatedAnswer || q.validated_answer)) {
      failures.push(`${q.id}: validated status without validatedAnswer`)
    }
  }

  return { failures, publicCount, blankPublic }
}

function main() {
  const payload = JSON.parse(fs.readFileSync(QA_PATH, 'utf8'))
  const questions = Array.isArray(payload.questions) ? payload.questions : []
  const { failures, publicCount, blankPublic } = auditQuestions(questions)
  const status = failures.length === 0 ? 'PASS' : 'FAIL'

  const lines = [
    '# QA No-Blank-Answer Audit Result',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- scanned: ${questions.length}`,
    `- publicCount: ${publicCount}`,
    `- blankPublicAnswers: ${blankPublic}`,
    `- failures: ${failures.length}`,
    `- status: ${status}`,
    '',
    '## Failures',
    '',
    ...(failures.length ? failures.slice(0, 200).map((x) => `- ${x}`) : ['- none']),
  ]

  fs.writeFileSync(OUT_PATH, `${lines.join('\n')}\n`, 'utf8')
  console.log(
    JSON.stringify(
      {
        scanned: questions.length,
        publicCount,
        blankPublicAnswers: blankPublic,
        failures: failures.length,
        status,
      },
      null,
      2
    )
  )

  if (status !== 'PASS') process.exit(2)
}

main()
