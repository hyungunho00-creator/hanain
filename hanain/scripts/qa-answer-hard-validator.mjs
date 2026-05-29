import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
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
  '이 질문의 핵심은',
  '실전 답은',
  '작은 루틴',
  '관리형 질문',
]

const BAD_GRAMMAR = [
  /\?에 대한/g,
  /은\?에 대한/g,
  /는\?에 대한/g,
  /요\?에 대한/g,
  /방법은\?에 대한/g,
  /치료하나요\?에 대한/g,
]

const CATEGORY_START_PATTERNS = [
  '근골격 질문은',
  '대사질환 질문은',
  '항암·면역 질문은',
  '정신건강/수면 문제 질문은',
  '소화·간 질문은',
  '심혈관 질문은',
  '뇌·인지 질문은',
  '피부/모발 질문은',
  '이 질문의 핵심은',
  '현재 상태를 구조화',
  '무엇을 먼저 확인할지',
]

const PHLORO_CLAIM_RE = /플로로탄닌.{0,40}(치료|예방|개선|완치|회복|재생|낫게|없애|대체|식욕|항암|혈당|통증)/g
const PHLORO_SAFE_NEGATIONS = [
  '치료한다는 의미는 아니',
  '예방 목적이 아님',
  '개선을 보장하지 않',
  '약을 대신하지 않',
]
const MEDICAL_TONE_RE = /(치료|수술|검사|진료|재활|응급|약물|항암|증후군|합병증)/i
const SMOKE_IDS = ['ms_076', 'ms_053', 'ms_071', 'ms_057', 'ms_022', 'qa200-20260527-136']

function stripHtml(text) {
  return String(text || '').replace(/<[^>]+>/g, ' ')
}

function norm(text) {
  return stripHtml(text).replace(/\s+/g, ' ').trim()
}

function firstParagraphText(text) {
  const m = String(text || '').match(/<p>([\s\S]*?)<\/p>/i)
  return norm(m ? m[1] : text).slice(0, 300)
}

function tokenizeTitle(title) {
  const stop = new Set(['무엇인가요', '무엇인가', '어떻게', '인가요', '할까요', '있나요', '좋나요', '나요'])
  return String(title || '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2 && !stop.has(t))
    .slice(0, 8)
}

function includesAny(text, tokens) {
  return tokens.some((token) => String(text || '').includes(token))
}

function hasTherapeuticClaim(text) {
  const src = String(text || '')
  const matches = src.match(PHLORO_CLAIM_RE) || []
  if (matches.length === 0) return false
  return !PHLORO_SAFE_NEGATIONS.some((neg) => src.includes(neg))
}

function getPreferredAnswer(q) {
  const v2 = q.answerV2
  if (!v2 || v2.status !== 'approved') return null

  const parts = []
  if (typeof v2.shortAnswer === 'string') parts.push(v2.shortAnswer)
  if (typeof v2.detailedAnswer === 'string') parts.push(v2.detailedAnswer)

  if (Array.isArray(v2.sections)) {
    for (const sec of v2.sections) {
      if (!sec || typeof sec !== 'object') continue
      if (typeof sec.heading === 'string') parts.push(sec.heading)
      if (typeof sec.body === 'string') parts.push(sec.body)
    }
  }

  const listFields = ['checkFirst', 'whenToSeeDoctor', 'avoidList', 'lifestyleTips']
  for (const field of listFields) {
    if (Array.isArray(v2[field])) parts.push(v2[field].join(' '))
  }

  if (typeof v2.phlorotanninBridge === 'string') parts.push(v2.phlorotanninBridge)
  if (typeof v2.disclaimer === 'string') parts.push(v2.disclaimer)

  const text = norm(parts.join('\n'))
  return text.length > 0 ? text : null
}

function run() {
  const qa = JSON.parse(fs.readFileSync(QA_PATH, 'utf8'))
  const rows = qa.questions || []
  const failures = []
  const warnings = []

  let scannedApproved = 0
  let skippedLegacy = 0

  for (const q of rows) {
    const id = String(q.id || '')
    const title = String(q.question || '')
    const approvedText = getPreferredAnswer(q)

    if (!approvedText) {
      skippedLegacy += 1
      continue
    }

    scannedApproved += 1
    const first300 = approvedText.slice(0, 300)
    const firstPara = firstParagraphText(approvedText)
    const titleTokens = tokenizeTitle(title)
    const sourceStatus = String(q.sourceStatus || q.source_status || '').toLowerCase()

    if (includesAny(approvedText, BAD_PHRASES) || includesAny(title, BAD_PHRASES)) {
      failures.push(`${id} bad phrase detected`)
    }
    if (BAD_GRAMMAR.some((re) => re.test(`${title}\n${approvedText}`))) {
      failures.push(`${id} bad grammar pattern detected`)
    }
    if (CATEGORY_START_PATTERNS.some((p) => firstPara.startsWith(p))) {
      failures.push(`${id} starts with category/template phrase`)
    }
    if (titleTokens.length > 0 && !includesAny(first300, titleTokens)) {
      failures.push(`${id} title-body mismatch in first 300 chars`)
    }
    if (!title.includes('플로로탄닌') && first300.includes('플로로탄닌')) {
      failures.push(`${id} phlorotannin appears in first 300 chars`)
    }
    if (hasTherapeuticClaim(approvedText)) {
      failures.push(`${id} phlorotannin therapeutic claim detected`)
    }

    const hasMedicalTone = MEDICAL_TONE_RE.test(first300)
    if ((sourceStatus === 'source_gap' || sourceStatus === 'needs_medical_review') && hasMedicalTone) {
      failures.push(`${id} approved medical answer with source gap`)
    }
    if (!/일반 건강정보|진단|치료를 대신하지/.test(approvedText)) {
      warnings.push(`${id} approved answer missing explicit disclaimer phrase`)
    }
  }

  for (const id of SMOKE_IDS) {
    const item = rows.find((q) => q.id === id)
    if (!item) {
      failures.push(`${id} missing from dataset`)
      continue
    }
    if (!getPreferredAnswer(item)) {
      failures.push(`${id} does not have approved answerV2`)
    }
  }

  const status = failures.length === 0 ? 'PASS' : 'FAIL'
  const lines = [
    '# QA Answer Hard Validator Result',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- totalQuestions: ${rows.length}`,
    `- scannedApprovedAnswerV2: ${scannedApproved}`,
    `- skippedLegacyFallback: ${skippedLegacy}`,
    `- failures: ${failures.length}`,
    `- warnings: ${warnings.length}`,
    `- status: ${status}`,
    '',
    '## Failures',
    '',
    ...(failures.length ? failures.map((f) => `- ${f}`) : ['- none']),
    '',
    '## Warnings',
    '',
    ...(warnings.length ? warnings.slice(0, 120).map((w) => `- ${w}`) : ['- none']),
  ]

  fs.writeFileSync(OUT_PATH, `${lines.join('\n')}\n`, 'utf8')
  console.log(
    JSON.stringify(
      {
        totalQuestions: rows.length,
        scannedApprovedAnswerV2: scannedApproved,
        skippedLegacyFallback: skippedLegacy,
        failures: failures.length,
        warnings: warnings.length,
        status,
      },
      null,
      2,
    ),
  )
  if (failures.length > 0) process.exit(2)
}

run()
