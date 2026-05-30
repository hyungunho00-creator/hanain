import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getRenderableQAAnswer, answerPlainTextForMeta } from '../src/lib/qaAnswer.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const QA_PATH = path.join(ROOT, 'public', 'qa.json')
const OUT_PATH = path.join(ROOT, 'docs', 'qa-answer-hard-validator-result.md')

const BAD_PHRASES = [
  '?뺤떊嫄닿컯/?섎㈃ 臾몄젣 吏덈Ц?',
  '洹쇨낏寃?留λ씫?먯꽌',
  '??ъ쭏??留λ씫?먯꽌',
  '??븫쨌硫댁뿭 留λ씫?먯꽌',
  '?뚰솕쨌媛?留λ씫?먯꽌',
  '?ы삁愿 留λ씫?먯꽌',
  '?뙿룹씤吏 留λ씫?먯꽌',
  '?쇰?/紐⑤컻 留λ씫?먯꽌',
  '利앹긽, 寃?? 移섎즺, ?앺솢?붿씤???④퍡 遊먯빞',
  '?꾩옱 ?곹깭瑜?援ъ“??,
  '臾댁뾿??癒쇱? ?뺤씤?좎?',
  '蹂댁〈移섎즺쨌?ы솢移섎즺쨌?섏닠移섎즺 媛?μ꽦???④퀎?곸쑝濡??ㅻ챸',
  '??吏덈Ц???듭떖?',
  '?ㅼ쟾 ?듭?',
  '?묒? 猷⑦떞',
  '愿由ы삎 吏덈Ц',
  '??????,
  '???????,
  '???????,
  '???????,
  '諛⑸쾿???????,
  '移섎즺?섎굹???????,
]

const BAD_GRAMMAR = [
  /\??????g,
  /?\??????g,
  /????????g,
  /????????g,
  /諛⑸쾿?\??????g,
  /移섎즺?섎굹????????g,
]

const CATEGORY_START_WORDS = [
  '洹쇨낏寃?,
  '??ъ쭏??,
  '??븫',
  '?뚰솕',
  '?ы삁愿',
  '??,
  '?몄?',
  '?뺤떊嫄닿컯',
  '?쇰?',
  '紐⑤컻',
]

const THERAPEUTIC_CLAIM_RE = /?뚮줈濡쒗깂??{0,40}(移섎즺|?덈갑|媛쒖꽑|?뚮났|?꾪솕|?듭쬆??以??덈떦?????붿뿉 醫??앹슃???뚮났|?????/i

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

    if (renderable.mode === 'missing_answer') {
      hiddenCount += 1
      if (status !== 'missing_answer') {
        warnings.push(`${q.id}: missing_answer but status=${status || '(empty)'}`)
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
    if (/?뚮줈濡쒗깂??i.test(first)) failures.push(`${q.id}: phlorotannin appears in first paragraph`)
    if (THERAPEUTIC_CLAIM_RE.test(answerText)) failures.push(`${q.id}: phlorotannin therapeutic claim detected`)
  }

  const status = failures.length === 0 ? 'PASS' : 'FAIL'
  const lines = [
    '# QA Answer Hard Validator Result',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- scanned: ${rows.length}`,
    `- publicAnswers: ${publicCount}`,
    `- hidden(missing_answer): ${hiddenCount}`,
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

