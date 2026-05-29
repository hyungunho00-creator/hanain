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
  '현재 상태를 구조화해',
  '무엇을 먼저 확인할지',
  '이 질문의 핵심은',
  '실전 답은',
  '작은 루틴',
  '관리형 질문',
]

const BAD_GRAMMAR = [/\?에 대한/g, /은\?에 대한/g, /는\?에 대한/g, /요\?에 대한/g]

const CATEGORY_START_PATTERNS = [
  '근골격 질문은',
  '대사질환 질문은',
  '항암·면역 질문은',
  '소화·간 질문은',
  '심혈관 질문은',
  '뇌·인지 질문은',
  '정신건강/수면 문제 질문은',
  '피부/모발 질문은',
  '이 질문의 핵심은',
  '현재 상태를 구조화해',
  '무엇을 먼저 확인할지',
  '치료 방향을 정할 수 있습니다',
]

const CLAIM_RE = /플로로탄닌.{0,40}(치료|예방|개선|완치|회복|재생|낫게|없앤|대체)/g

const TOPIC_RULES = [
  {
    titleIncludes: ['척추'],
    first300RequiresAny: ['척추', '허리', '목', '자세'],
  },
  {
    titleIncludes: ['반월판', '반달'],
    first300RequiresAny: ['반월판', '무릎', '연골', '파열'],
  },
  {
    titleIncludes: ['어깨 탈구'],
    first300RequiresAny: ['탈구', '정복', '고정', '재활'],
  },
  {
    titleIncludes: ['당뇨'],
    first300RequiresAny: ['혈당', '검사', '식사', '운동'],
  },
  {
    titleIncludes: ['간수치'],
    first300RequiresAny: ['ast', 'alt', '간수치', '음주', '약물'],
  },
]

const SMOKE_IDS = ['ms_076', 'ms_053', 'ms_071', 'ms_057', 'ms_022', 'qa200-20260527-136']

function stripHtml(text) {
  return String(text || '').replace(/<[^>]+>/g, ' ')
}

function norm(text) {
  return stripHtml(text).replace(/\s+/g, ' ').trim()
}

function firstParagraphText(html) {
  const m = String(html || '').match(/<p>([\s\S]*?)<\/p>/i)
  return norm(m ? m[1] : html).slice(0, 300)
}

function getStatus(q) {
  return String(q.qualityStatus || q.quality_status || '').toLowerCase()
}

function getValidatedAnswer(q) {
  const answer = q.validatedAnswer || q.validated_answer || ''
  return typeof answer === 'string' ? answer.trim() : ''
}

function isValidated(q) {
  return getStatus(q) === 'validated' && getValidatedAnswer(q).length > 0
}

function mustContain(title, first300) {
  for (const rule of TOPIC_RULES) {
    if (rule.titleIncludes.some((token) => title.includes(token))) {
      return rule.first300RequiresAny.some((token) => first300.toLowerCase().includes(token.toLowerCase()))
    }
  }
  return true
}

function hasAny(text, list) {
  return list.some((token) => String(text || '').includes(token))
}

function run() {
  const qa = JSON.parse(fs.readFileSync(QA_PATH, 'utf8'))
  const rows = qa.questions || []

  const failures = []
  const warnings = []

  let validatedCount = 0
  let hiddenCount = 0

  for (const q of rows) {
    const status = getStatus(q)
    const answer = getValidatedAnswer(q)
    const validated = isValidated(q)
    const title = String(q.question || '')
    const allText = `${title}\n${answer}\n${q.answer || ''}`

    if (validated) {
      validatedCount += 1
      const first300 = norm(answer).slice(0, 300)
      const firstPara = firstParagraphText(answer)

      if (hasAny(answer, BAD_PHRASES) || hasAny(title, BAD_PHRASES)) {
        failures.push(`${q.id} bad phrase detected`)
      }
      if (BAD_GRAMMAR.some((re) => re.test(allText))) {
        failures.push(`${q.id} bad grammar pattern detected`)
      }
      if (CATEGORY_START_PATTERNS.some((p) => firstPara.startsWith(p))) {
        failures.push(`${q.id} starts with category/template phrase`)
      }
      if (!mustContain(title, first300)) {
        failures.push(`${q.id} title-body mismatch in first 300 chars`)
      }
      if (!title.includes('플로로탄닌') && first300.includes('플로로탄닌')) {
        failures.push(`${q.id} phlorotannin appears in first 300 chars`)
      }
      if (CLAIM_RE.test(answer)) {
        failures.push(`${q.id} phlorotannin therapeutic claim detected`)
      }

      const sourceStatus = String(q.sourceStatus || q.source_status || '').toLowerCase()
      const hasMedicalTone = /(치료|수술|검사|진료|재활|염증)/.test(first300)
      if ((sourceStatus === 'missing' || sourceStatus === 'source_gap' || sourceStatus === 'needs_medical_review') && hasMedicalTone) {
        failures.push(`${q.id} validated medical answer with source gap`)
      }
    } else {
      hiddenCount += 1
      if (answer.length > 0) {
        failures.push(`${q.id} has validatedAnswer but status is not validated`)
      }
      if (status !== 'needs_review') {
        warnings.push(`${q.id} non-validated status is ${status || '(empty)'}`)
      }
    }
  }

  for (const id of SMOKE_IDS) {
    const item = rows.find((q) => q.id === id)
    if (!item) {
      failures.push(`${id} missing from dataset`)
      continue
    }
    if (!isValidated(item)) {
      failures.push(`${id} is not validated`)
    }
  }

  const status = failures.length === 0 ? 'PASS' : 'FAIL'
  const lines = [
    '# QA Answer Hard Validator Result',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- scanned: ${rows.length}`,
    `- validated: ${validatedCount}`,
    `- hidden(needs_review): ${hiddenCount}`,
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
  console.log(JSON.stringify({ scanned: rows.length, validated: validatedCount, hidden: hiddenCount, failures: failures.length, status }, null, 2))
  if (failures.length > 0) process.exit(2)
}

run()
