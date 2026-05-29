import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getRenderableQAAnswer, answerPlainTextForMeta } from '../src/lib/qaAnswer.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const QA_PATH = path.join(ROOT, 'public', 'qa.json')
const OUT_PATH = path.join(ROOT, 'docs', 'qa-answer-hard-validator-result.md')

const BAD_PHRASES = [
  '정신건강/수면 문제 질문은',
  '근골격 맥락에서',
  '대사질환 맥락에서',
  '항암·면역 맥락에서',
  '소화·간 맥락에서',
  '심혈관 맥락에서',
  '뇌·인지 맥락에서',
  '피부/모발 맥락에서',
  '증상, 검사, 치료, 생활요인을 함께 봐야',
  '현재 상태를 구조화',
  '무엇을 먼저 확인할지',
  '보존치료·재활치료·수술치료 가능성을 단계적으로 설명',
  '이 질문의 핵심은',
  '실전 답은',
  '작은 루틴',
  '관리형 질문',
  '?에 대한',
  '은?에 대한',
  '는?에 대한',
  '요?에 대한',
  '방법은?에 대한',
  '치료하나요?에 대한',
]

const BAD_GRAMMAR = [
  /\?에 대한/g,
  /은\?에 대한/g,
  /는\?에 대한/g,
  /요\?에 대한/g,
  /방법은\?에 대한/g,
  /치료하나요\?에 대한/g,
]

const CATEGORY_START_WORDS = [
  '근골격',
  '대사질환',
  '항암',
  '소화',
  '심혈관',
  '뇌',
  '인지',
  '정신건강',
  '피부',
  '모발',
]

const THERAPEUTIC_CLAIM_RE = /플로로탄닌.{0,40}(치료|예방|개선|회복|완화|통증을 줄|혈당을 낮|암에 좋|식욕을 회복|약 대신)/i

function stripHtml(text) {
  return String(text || '').replace(/<[^>]+>/g, ' ')
}

function norm(text) {
  return stripHtml(text).replace(/\s+/g, ' ').trim()
}

function firstParagraph(html) {
  const m = String(html || '').match(/<p[^>]*>([\s\S]*?)<\/p>/i)
  return norm(m ? m[1] : html)
}

function tokenizeQuestion(question) {
  return String(question || '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .map((x) => x.trim())
    .filter((x) => x.length >= 2)
    .slice(0, 6)
}

function hasKeywordInFirst300(question, answerText) {
  const tokens = tokenizeQuestion(question)
  if (!tokens.length) return true
  const first300 = norm(answerText).slice(0, 300)
  return tokens.some((t) => first300.includes(t))
}

function main() {
  const qa = JSON.parse(fs.readFileSync(QA_PATH, 'utf8'))
  const rows = qa.questions || []

  let publicCount = 0
  let hiddenCount = 0
  const failures = []
  const warnings = []

  for (const q of rows) {
    const renderable = getRenderableQAAnswer(q)
    const status = String(q.qualityStatus || q.quality_status || '').toLowerCase()
    const validatedAnswer = q.validatedAnswer || q.validated_answer || ''

    if (renderable.mode === 'review_notice') {
      hiddenCount += 1
      if (status !== 'needs_review') {
        warnings.push(`${q.id}: review_notice but status=${status || '(empty)'}`)
      }
      continue
    }

    publicCount += 1
    const answerHtml = renderable.html
    const answerText = answerPlainTextForMeta(q)
    const first = firstParagraph(answerHtml)

    if (!norm(answerHtml)) failures.push(`${q.id}: public answer is blank`)
    if (status === 'validated' && !norm(validatedAnswer)) failures.push(`${q.id}: qualityStatus=validated but validatedAnswer missing`)
    if (BAD_PHRASES.some((p) => answerText.includes(p))) failures.push(`${q.id}: bad phrase detected`)
    if (BAD_GRAMMAR.some((re) => re.test(answerText))) failures.push(`${q.id}: bad grammar pattern detected`)
    if (CATEGORY_START_WORDS.some((w) => first.startsWith(w))) failures.push(`${q.id}: first sentence starts with category label`)
    if (!hasKeywordInFirst300(q.question, answerText)) failures.push(`${q.id}: title keyword missing in first 300 chars`)
    if (/플로로탄닌/i.test(first)) failures.push(`${q.id}: phlorotannin appears in first paragraph`)
    if (THERAPEUTIC_CLAIM_RE.test(answerText)) failures.push(`${q.id}: phlorotannin therapeutic claim detected`)
  }

  const status = failures.length === 0 ? 'PASS' : 'FAIL'
  const lines = [
    '# QA Answer Hard Validator Result',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- scanned: ${rows.length}`,
    `- publicAnswers: ${publicCount}`,
    `- hidden(needs_review): ${hiddenCount}`,
    `- failures: ${failures.length}`,
    `- warnings: ${warnings.length}`,
    `- status: ${status}`,
    '',
    '## Failures',
    '',
    ...(failures.length ? failures : ['none']).map((x) => `- ${x}`),
    '',
    '## Warnings',
    '',
    ...(warnings.length ? warnings : ['none']).map((x) => `- ${x}`),
  ]

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
