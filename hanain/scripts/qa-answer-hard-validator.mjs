import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getRenderableQAAnswer, answerPlainTextForMeta } from '../src/lib/qaAnswer.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const QA_PATH = path.join(ROOT, 'public', 'qa.json')
const OUT_PATH = path.join(ROOT, 'docs', 'qa-answer-hard-validator-result.md')

const BAD_EXACT_PHRASES = [
  '정보가 없습니다',
  '답변 준비 중입니다',
  '추후 업데이트 예정입니다',
]

const CATEGORY_PREFIXES = [
  '대사질환',
  '항암/면역',
  '소화/간 건강',
  '심혈관',
  '뇌/인지',
  '정신건강',
  '근골격',
  '피부',
  '모발',
  '호흡기',
  '감염/염증',
  '여성건강',
  '남성건강',
]

const THERAPEUTIC_CLAIM_RE =
  /플로로탄닌.{0,48}(완치|치료|예방|대체|낫게|정상화|보장|확실히|반드시|부작용 없이)/gi

const NEGATION_RE = /(안 됩니다|안됩니다|말하면 안|설명하면 안|표현하면 안|단정하면 안|대체하지 않습니다|보장하지 않습니다)/

function stripHtml(text) {
  return String(text || '').replace(/<[^>]+>/g, ' ')
}

function norm(text) {
  return stripHtml(text).replace(/\s+/g, ' ').trim()
}

function firstParagraph(html) {
  const match = String(html || '').match(/<p[^>]*>([\s\S]*?)<\/p>/i)
  return norm(match ? match[1] : html)
}

function tokenizeQuestion(question) {
  return String(question || '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .map((x) => x.trim())
    .filter((x) => x.length >= 2)
    .slice(0, 7)
}

function hasKeywordInFirst300(question, answerText) {
  const tokens = tokenizeQuestion(question)
  if (!tokens.length) return true
  const first300 = norm(answerText).slice(0, 300)
  return tokens.some((token) => first300.includes(token))
}

function hasUnsafeTherapeuticClaim(answerText) {
  const text = String(answerText || '')
  const matches = [...text.matchAll(THERAPEUTIC_CLAIM_RE)]
  for (const match of matches) {
    const start = Math.max(0, match.index - 70)
    const end = Math.min(text.length, match.index + match[0].length + 90)
    const context = text.slice(start, end)
    if (!NEGATION_RE.test(context)) return true
  }
  return false
}

function main() {
  const qa = JSON.parse(fs.readFileSync(QA_PATH, 'utf8'))
  const rows = qa.questions || []

  let publicCount = 0
  let hiddenCount = 0
  const failures = []
  const warnings = []

  for (const item of rows) {
    const renderable = getRenderableQAAnswer(item)
    const status = String(item.qualityStatus || item.quality_status || '').toLowerCase()
    const validatedAnswer = item.validatedAnswer || item.validated_answer || ''

    if (renderable.mode === 'missing_answer') {
      hiddenCount += 1
      if (status && status !== 'missing_answer') {
        warnings.push(`${item.id}: missing answer but qualityStatus=${status}`)
      }
      continue
    }

    publicCount += 1
    const answerHtml = renderable.html
    const answerText = answerPlainTextForMeta(item)
    const normalized = norm(answerText)
    const first = firstParagraph(answerHtml)

    if (!norm(answerHtml)) failures.push(`${item.id}: public answer is blank`)
    if (status === 'validated' && !norm(validatedAnswer)) {
      failures.push(`${item.id}: qualityStatus=validated but validatedAnswer missing`)
    }
    if (BAD_EXACT_PHRASES.some((phrase) => normalized.includes(phrase))) {
      failures.push(`${item.id}: bad placeholder phrase detected`)
    }
    if (CATEGORY_PREFIXES.some((prefix) => first.startsWith(prefix))) {
      warnings.push(`${item.id}: first paragraph starts with category label`)
    }
    if (!hasKeywordInFirst300(item.question, answerText)) {
      warnings.push(`${item.id}: title keyword missing in first 300 chars`)
    }
    if (hasUnsafeTherapeuticClaim(answerText)) {
      failures.push(`${item.id}: unsafe phlorotannin therapeutic claim detected`)
    }
  }

  const status = failures.length === 0 ? 'PASS' : 'FAIL'
  const lines = [
    '# QA Answer Hard Validator Result',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- scanned: ${rows.length}`,
    `- publicAnswers: ${publicCount}`,
    `- hiddenMissingAnswer: ${hiddenCount}`,
    `- failures: ${failures.length}`,
    `- warnings: ${warnings.length}`,
    `- status: ${status}`,
    '',
    '## Failures',
    '',
    ...(failures.length ? failures : ['none']).map((item) => `- ${item}`),
    '',
    '## Warnings',
    '',
    ...(warnings.length ? warnings : ['none']).map((item) => `- ${item}`),
  ]

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
  fs.writeFileSync(OUT_PATH, `${lines.join('\n')}\n`, 'utf8')
  console.log(JSON.stringify({
    scanned: rows.length,
    publicAnswers: publicCount,
    hidden: hiddenCount,
    failures: failures.length,
    warnings: warnings.length,
    status,
  }, null, 2))

  if (status !== 'PASS') process.exit(2)
}

main()
