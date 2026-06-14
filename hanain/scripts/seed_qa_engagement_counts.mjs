import fs from 'node:fs'

const TARGET_FILES = ['src/data/qa.json', 'public/qa.json']
const MINIMUM = 1000

function hashSeed(value) {
  const text = String(value || '')
  let hash = 2166136261
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function baseline(question, index, base, range, salt) {
  const seed = hashSeed(`${question.id || question.question || index}:${salt}`)
  return base + ((seed + index * 97) % range)
}

function currentNumber(...values) {
  for (const value of values) {
    const n = Number(value)
    if (Number.isFinite(n) && n > 0) return n
  }
  return 0
}

function normalizeQuestion(question, index) {
  const views = currentNumber(question.views, question.view_count)
  const likes = currentNumber(question.likes, question.like_count, question.helpful_count)
  const nextViews = views >= MINIMUM ? views : baseline(question, index, 1400, 6200, 'views')
  const nextLikes = likes >= MINIMUM ? likes : baseline(question, index, 1000, 2800, 'helpful')

  return {
    ...question,
    views: nextViews,
    likes: nextLikes,
    view_count: nextViews,
    like_count: nextLikes,
    helpful_count: nextLikes,
  }
}

let changedTotal = 0

for (const file of TARGET_FILES) {
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'))
  const questions = Array.isArray(raw) ? raw : raw.questions
  if (!Array.isArray(questions)) {
    throw new Error(`${file}: questions array not found`)
  }

  let changed = 0
  const normalized = questions.map((question, index) => {
    const next = normalizeQuestion(question, index)
    if (
      next.views !== question.views ||
      next.likes !== question.likes ||
      next.view_count !== question.view_count ||
      next.like_count !== question.like_count ||
      next.helpful_count !== question.helpful_count
    ) {
      changed += 1
    }
    return next
  })

  const output = Array.isArray(raw)
    ? normalized
    : { ...raw, questions: normalized, updatedAt: new Date().toISOString().slice(0, 10) }

  fs.writeFileSync(file, `${JSON.stringify(output, null, 2)}\n`, 'utf8')
  changedTotal += changed
  console.log(`${file}: normalized ${changed} / ${questions.length} questions`)
}

console.log(`Q&A engagement baseline complete. Changed records: ${changedTotal}`)
