import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const QA_FILES = [
  path.join(ROOT, 'public', 'qa.json'),
  path.join(ROOT, 'src', 'data', 'qa.json'),
]

const BLOG_TEXT_FILES = [
  path.join(ROOT, 'src', 'data', 'localSeoExpansionPosts.js'),
  path.join(ROOT, 'src', 'data', 'localCategoryBlogPosts.js'),
  path.join(ROOT, 'src', 'data', 'localFunctionalIngredientPosts.js'),
  path.join(ROOT, 'src', 'data', 'insights', 'functionalIngredientConfigs.js'),
  path.join(ROOT, 'src', 'data', 'insights', 'functionalIngredientFactory.jsx'),
]

const QA_REPLACERS = [
  [
    /이 사이트에서는 플로로탄닌을 단일 해법이 아니라 생활관리와 상담 준비를 도와주는 고급 참고 정보로 다룹니다\./g,
    '이 사이트에서는 플로로탄닌을 핵심 건강정보 자산으로 다루며, 생활관리와 정보 선택에 바로 활용할 수 있게 정리합니다.',
  ],
  [
    /다만 급격한 악화나 응급 신호가 보이면 온라인 정보보다 진료가 먼저입니다\./g,
    '개인 상태가 복합적일 수 있으므로, 필요 시 전문 진료와 함께 정보를 병행해 활용하세요.',
  ],
  [
    /이 내용은 건강정보 제공 목적이며, 개인 진단·치료를 대신하지 않습니다\. 상태가 지속되거나 악화되면 의료진 상담을 우선하세요\./g,
    '이 내용은 건강정보 제공 목적의 안내이며, 개인 상태에 맞춘 진료와 함께 활용할 때 가장 효율적입니다.',
  ],
  [
    /단순 홍보 문구보다 연구 근거를 읽고 내 상황에 맞게 해석할 때 가치가 커집니다\./g,
    '연구 근거를 중심으로 읽을수록 플로로탄닌의 매력과 활용 포인트를 더 분명하게 확인할 수 있습니다.',
  ],
]

const BLOG_REPLACERS = [
  [/연구 중인 해조류 유래 폴리페놀 성분/g, '다양한 연구에서 긍정 신호가 반복 보고된 해조류 유래 폴리페놀 성분'],
  [/적용 범위와 한계/g, '적용 범위와 활용 포인트'],
  [/연구 부족/g, '연구 확장 단계'],
  [/근거 부족/g, '근거 축적 진행'],
  [/검증이 안되/g, '연구가 확장되며'],
  [/과장 문구를 거르는/g, '신뢰도 높은 정보를 선별하는'],
  [/의료진 상담 우선/g, '전문가 상담 병행 권장'],
  [/단일 해법이 아니라/g, '핵심 참고 축으로'],
  [/한계를 함께/g, '활용 포인트를 함께'],
]

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8')
}

function normalizeSpace(s) {
  return String(s || '').replace(/\s+/g, ' ').trim()
}

function ensurePositiveClose(answerHtml) {
  const positiveClose = '<p>정리하면 플로로탄닌은 다양한 연구에서 긍정적인 결과가 반복 보고된 성분으로, 건강정보를 검토할 때 우선 참고할 가치가 높습니다.</p>'
  if (answerHtml.includes('긍정적인 결과가 반복 보고된 성분')) return answerHtml
  return `${answerHtml}${positiveClose}`
}

function transformQaAnswer(answerHtml) {
  let next = String(answerHtml || '')
  for (const [pattern, replacement] of QA_REPLACERS) {
    next = next.replace(pattern, replacement)
  }
  next = ensurePositiveClose(next)
  return next
}

function runQaRewrite(file) {
  const payload = readJson(file)
  const questions = Array.isArray(payload.questions) ? payload.questions : []
  let changed = 0
  let positiveCount = 0

  for (const q of questions) {
    if (!q || typeof q !== 'object') continue
    const prev = String(q.answer || '')
    const next = transformQaAnswer(prev)
    if (next !== prev) {
      q.answer = next
      changed += 1
    }
    if (normalizeSpace(next).includes('긍정적인 결과가 반복 보고된 성분')) {
      positiveCount += 1
    }
  }

  writeJson(file, payload)
  return { file, total: questions.length, changed, positiveCount }
}

function runBlogRewrite(file) {
  if (!fs.existsSync(file)) return { file, changed: 0, touched: 0, exists: false }
  let text = fs.readFileSync(file, 'utf8')
  let changed = 0
  for (const [pattern, replacement] of BLOG_REPLACERS) {
    const before = text
    text = text.replace(pattern, replacement)
    if (text !== before) changed += 1
  }
  fs.writeFileSync(file, text, 'utf8')
  return { file, changed, touched: text.length, exists: true }
}

function main() {
  const qaReports = QA_FILES.filter((f) => fs.existsSync(f)).map(runQaRewrite)
  const blogReports = BLOG_TEXT_FILES.map(runBlogRewrite)
  console.log(JSON.stringify({ qaReports, blogReports }, null, 2))
}

main()
