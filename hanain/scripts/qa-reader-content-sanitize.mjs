import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const QA_PATHS = [
  path.join(ROOT, 'public', 'qa.json'),
  path.join(ROOT, 'src', 'data', 'qa.json'),
]

const REPLACERS = [
  [/\bCTA\b|CTA_/g, '핵심 안내'],
  [/SEO\s*방향|검색\s*의도|상위노출|선점/g, '정보 탐색'],
  [/사업계획|내부\s*전략|작업\s*지시/g, '관리 계획'],
  [/제품\s*권유/g, '정보 안내'],
  [/병원정보\s*글/g, '의료정보 글'],
  [/구매보다/g, '선택보다'],
  [/내\s*상황\s*정리/g, '개인 상태 점검'],
  [/자료\s*요청으로\s*연결/g, '상담 준비에 활용'],
  [/추가\s*정보는\s*문의\s*주세요/g, '추가 정보는 공신력 있는 자료를 확인하세요'],
  [/자료\s*요청/g, '상담 준비'],
  [/연락\s*주세요/g, '전문가 상담을 권장합니다'],
  [/자연스럽게\s*만나게\s*되는\s*소재/g, '함께 검토할 수 있는 성분'],
  [/보완적으로\s*활용될\s*수\s*있는\s*해양\s*폴리페놀/g, '연구 맥락에서 참고되는 해양 폴리페놀'],
  [/주목받는\s*천연\s*소재가\s*바로/g, '연구되는 천연 소재 중 하나로'],
  [/자연\s*유래\s*소재인\.?/g, '해양 유래 성분인'],
  [/자연\s*소재\s*플로로탄닌의\s*역할/g, '플로로탄닌 관련 연구 맥락'],
  [/플로로탄닌\s*파트너스에서/g, '관련 아카이브에서'],
  [/MOP\s*공정으로\s*추출한/g, '정제 공정으로 추출한'],
  [/MOP\s*공정에\s*대한/g, '정제 공정 관련'],
  [/진료\s*전\s*먼저\s*정리할\s*것/g, '진료 전 확인할 항목'],
  [/건강식품원료는\s*이렇게\s*말하면\s*안전합니다/g, '건강식품 원료 정보는 안전한 표현 기준을 따릅니다'],
]

function applyReplacers(value) {
  let text = String(value ?? '')
  for (const [pattern, replacement] of REPLACERS) {
    text = text.replace(pattern, replacement)
  }
  return text
}

function walkAndSanitize(node) {
  if (typeof node === 'string') return applyReplacers(node)
  if (Array.isArray(node)) return node.map(walkAndSanitize)
  if (!node || typeof node !== 'object') return node
  const out = {}
  for (const [k, v] of Object.entries(node)) out[k] = walkAndSanitize(v)
  return out
}

function run() {
  for (const qaPath of QA_PATHS) {
    const before = fs.readFileSync(qaPath, 'utf8')
    const data = JSON.parse(before)
    const sanitized = walkAndSanitize(data)
    const after = `${JSON.stringify(sanitized, null, 2)}\n`
    fs.writeFileSync(qaPath, after, 'utf8')
    console.log(JSON.stringify({
      file: path.relative(ROOT, qaPath),
      changed: before !== after,
    }, null, 2))
  }
}

run()
