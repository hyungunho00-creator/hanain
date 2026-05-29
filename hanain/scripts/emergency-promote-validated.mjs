import fs from 'node:fs'

const FILES = ['public/qa.json', 'src/data/qa.json']

function pickLegacy(q) {
  const candidates = [q.validatedAnswer, q.answer, q.body, q.content, q.detailedAnswer]
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) return c.trim()
  }
  return ''
}

for (const file of FILES) {
  const raw = fs.readFileSync(file, 'utf8')
  const data = JSON.parse(raw)
  const questions = Array.isArray(data.questions) ? data.questions : []

  let promoted = 0
  let empty = 0
  for (const q of questions) {
    const legacy = pickLegacy(q)
    if (!legacy) {
      q.qualityStatus = 'needs_review'
      q.validatedAnswer = ''
      q.publicBodyMode = 'review_notice'
      empty += 1
      continue
    }

    q.validatedAnswer = legacy
    q.qualityStatus = 'validated'
    q.publicBodyMode = 'validated'
    q.reviewReason = ''
    promoted += 1
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log(`${file}: total=${questions.length}, promoted=${promoted}, empty=${empty}`)
}
