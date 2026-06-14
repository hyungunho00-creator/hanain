import fs from 'node:fs'

const TARGET_FILES = ['src/data/qa.json', 'public/qa.json']
const MINIMUM = 1000

function currentNumber(...values) {
  for (const value of values) {
    const n = Number(value)
    if (Number.isFinite(n) && n > 0) return n
  }
  return 0
}

let failed = false

for (const file of TARGET_FILES) {
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'))
  const questions = Array.isArray(raw) ? raw : raw.questions
  if (!Array.isArray(questions)) {
    throw new Error(`${file}: questions array not found`)
  }

  const bad = questions
    .map((question, index) => ({
      index,
      id: question.id,
      views: currentNumber(question.views, question.view_count),
      helpful: currentNumber(question.likes, question.like_count, question.helpful_count),
    }))
    .filter(item => item.views < MINIMUM || item.helpful < MINIMUM)

  if (bad.length > 0) {
    failed = true
    console.error(`${file}: ${bad.length} questions below ${MINIMUM}`)
    for (const item of bad.slice(0, 10)) {
      console.error(`  #${item.index} ${item.id}: views=${item.views}, helpful=${item.helpful}`)
    }
  } else {
    console.log(`${file}: PASS (${questions.length} questions, views/helpful >= ${MINIMUM})`)
  }
}

if (failed) process.exit(1)
