import fs from 'fs'

const QA_PATH = 'public/qa.json'

const payload = JSON.parse(fs.readFileSync(QA_PATH, 'utf8'))
let changed = 0

for (const item of payload.questions || []) {
  if (typeof item.answer !== 'string') continue
  const next = item.answer
    .replace(/\s*<div class="qa-asset-block">[\s\S]*?<\/div>\s*/gi, ' ')
    .replace(/\s*<div class="qa-context-depth">[\s\S]*?<\/div>\s*/gi, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
  if (next !== item.answer) {
    item.answer = next
    changed += 1
  }
}

fs.writeFileSync(QA_PATH, JSON.stringify(payload, null, 2), 'utf8')
console.log(JSON.stringify({ changed, total: (payload.questions || []).length }))
