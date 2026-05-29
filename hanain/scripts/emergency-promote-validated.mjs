import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const FILES = [
  path.join(ROOT, 'public', 'qa.json'),
  path.join(ROOT, 'src', 'data', 'qa.json'),
]

if (process.env.ALLOW_QA_EMERGENCY !== '1') {
  console.error(
    '[emergency-promote] blocked by default. Set ALLOW_QA_EMERGENCY=1 to run intentionally.'
  )
  process.exit(1)
}

function normalizeSpace(text) {
  return String(text || '').replace(/\s+/g, ' ').trim()
}

function pickLegacy(row) {
  const candidates = [row.validatedAnswer, row.answer, row.body, row.content, row.detailedAnswer]
  for (const value of candidates) {
    const text = normalizeSpace(value)
    if (text) return text
  }
  return ''
}

for (const file of FILES) {
  const payload = JSON.parse(fs.readFileSync(file, 'utf8'))
  const questions = Array.isArray(payload.questions) ? payload.questions : []

  let promoted = 0
  let empty = 0
  for (const q of questions) {
    const answer = pickLegacy(q)
    if (!answer) {
      q.qualityStatus = 'needs_review'
      q.validatedAnswer = ''
      q.publicBodyMode = 'review_notice'
      empty += 1
      continue
    }

    q.validatedAnswer = answer
    q.qualityStatus = 'validated'
    q.publicBodyMode = 'validated'
    q.reviewReason = ''
    promoted += 1
  }

  fs.writeFileSync(file, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  console.log(
    JSON.stringify(
      {
        file: path.relative(ROOT, file),
        total: questions.length,
        promoted,
        empty,
      },
      null,
      2
    )
  )
}
