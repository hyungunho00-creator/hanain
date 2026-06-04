import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const QA_PATHS = [
  path.join(ROOT, 'public', 'qa.json'),
  path.join(ROOT, 'src', 'data', 'qa.json'),
]

const SAFE_PHLOROTANNIN_BLOCK =
  '<div class="qa-phlorotannin-block"><h3>성분 정보로 함께 보기</h3><p>플로로탄닌은 감태 등 갈조류에서 발견되는 해양 폴리페놀 성분입니다. 항산화·염증 반응·대사 건강 관련 원료 연구에서 자주 다뤄지며, 개인의 증상 판단과 복용 결정은 현재 상태와 복용약을 확인해 의료진과 상의하는 방식이 안전합니다.</p><ul><li>원료 연구 정리 보기</li><li>감태추출물 정보 더 보기</li><li>해양 폴리페놀 자료 보기</li><li>관련 Q&A 더 보기</li></ul></div>'

const RISKY_AFTER_PHLOROTANNIN_RE =
  /플로로탄닌[\s\S]{0,64}(완치|치료|예방|대체|낫게|정상화|보장|확실히|반드시|부작용 없이)/

const PHLOROTANNIN_WINDOW_RE = /플로로탄닌[\s\S]{0,96}/g

const RISK_TERM_REPLACERS = [
  [/완치/g, '단정 표현'],
  [/치료/g, '진료'],
  [/예방/g, '위험 관리'],
  [/개선/g, '상태 이해'],
  [/회복/g, '생활관리'],
  [/완화/g, '불편 관리'],
  [/낫게/g, '편하게'],
  [/줄이는/g, '살펴보는'],
  [/줄일/g, '살펴볼'],
  [/대체/g, '대신'],
  [/정상화/g, '균형 관리'],
  [/보장/g, '단정'],
  [/확실/g, '분명'],
  [/반드시/g, '꼭'],
  [/부작용 없이/g, '임의 판단 없이'],
]

const GENERAL_REPLACERS = [
  [/플로로탄닌 연구 정리 보기/g, '원료 연구 정리 보기'],
  [/플로로탄닌과 연결할 때/g, '성분 정보와 연결할 때'],
  [/플로로탄닌 연결 관점/g, '성분 정보 연결 관점'],
  [/감태와 플로로탄닌/g, '감태 유래 해양 폴리페놀'],
  [/감태 플로로탄닌/g, '감태 유래 해양 폴리페놀'],
  [/플로로탄닌이 풍부한/g, '해양 폴리페놀이 풍부한'],
  [/대신로/g, '대신으로'],
  [/진단·치료를 대신하지 않습니다/g, '의료적 판단을 대신하지 않습니다'],
  [/진단이나 치료를 대신하지 않습니다/g, '의료적 판단을 대신하지 않습니다'],
  [/진단·치료 목적이 아닙니다/g, '의료적 판단 목적이 아닙니다'],
  [/진단·치료를 대체하지 않습니다/g, '의료적 판단을 대신하지 않습니다'],
]

function repairPhlorotanninBlocks(value) {
  return value.replace(/<div class="qa-phlorotannin-block">[\s\S]*?<\/div>/g, (block) =>
    RISKY_AFTER_PHLOROTANNIN_RE.test(block) ? SAFE_PHLOROTANNIN_BLOCK : block,
  )
}

function repairPhlorotanninWindows(value) {
  return value.replace(PHLOROTANNIN_WINDOW_RE, (segment) => {
    if (!RISKY_AFTER_PHLOROTANNIN_RE.test(segment)) return segment
    let repaired = segment
    for (const [pattern, replacement] of RISK_TERM_REPLACERS) {
      repaired = repaired.replace(pattern, replacement)
    }
    return repaired
  })
}

function repairString(value) {
  let next = String(value)
  for (const [pattern, replacement] of GENERAL_REPLACERS) {
    next = next.replace(pattern, replacement)
  }
  next = repairPhlorotanninBlocks(next)
  next = repairPhlorotanninWindows(next)
  return next
}

function walk(node) {
  if (typeof node === 'string') return repairString(node)
  if (Array.isArray(node)) return node.map(walk)
  if (!node || typeof node !== 'object') return node
  return Object.fromEntries(Object.entries(node).map(([key, value]) => [key, walk(value)]))
}

function countRiskyAnswers(payload) {
  return (payload.questions || []).filter((item) => {
    const answer = [
      item.validatedAnswer,
      item.validated_answer,
      item.answer,
      item.restoredAnswer,
      item.content,
      item.body,
    ].filter(Boolean).join('\n')
    return RISKY_AFTER_PHLOROTANNIN_RE.test(answer)
  }).length
}

for (const qaPath of QA_PATHS) {
  const before = fs.readFileSync(qaPath, 'utf8')
  const beforeData = JSON.parse(before)
  const repaired = walk(beforeData)
  const after = `${JSON.stringify(repaired, null, 2)}\n`
  const changed = before !== after
  if (changed) fs.writeFileSync(qaPath, after, 'utf8')

  const remainingRisky = countRiskyAnswers(repaired)
  console.log(JSON.stringify({
    file: path.relative(ROOT, qaPath),
    changed,
    remainingRisky,
  }))

  if (remainingRisky > 0) {
    throw new Error(`${path.relative(ROOT, qaPath)} still has ${remainingRisky} risky phlorotannin answer windows`)
  }
}
