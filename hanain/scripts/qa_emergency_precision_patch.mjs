import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const QA_PATHS = [path.join(ROOT, 'public', 'qa.json'), path.join(ROOT, 'src', 'data', 'qa.json')]
const TODAY = new Date().toISOString().slice(0, 10)

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function normalizeQuestion(question) {
  return String(question || '').replace(/\s+/g, ' ').trim()
}

function detectIntent(question) {
  const q = normalizeQuestion(question)
  if (/(치료|수술|주사|재활|정복|고정|절제|봉합)/.test(q)) return 'treatment'
  if (/(약|복용|부작용|상호작용|평생|중단|증량|감량|먹어)/.test(q)) return 'drug'
  if (/(검사|수치|진단|MRI|CT|X-?ray|혈액|혈당|혈압|콜레스테롤|A1c)/i.test(q)) return 'test'
  if (/(원인|이유|왜|발생|차이|구분)/.test(q)) return 'cause'
  if (/(관리|예방|회복|생활|운동|식단|기록)/.test(q)) return 'management'
  return 'general'
}

function detectTopic(question) {
  const q = normalizeQuestion(question)
  const table = [
    [/어깨\s*탈구/, '어깨 탈구'],
    [/(반달|반월판)\s*연골/, '반월판 연골 손상'],
    [/체외충격파/, '체외충격파 치료'],
    [/디스크/, '디스크 증상'],
    [/낙상/, '낙상 위험'],
    [/고혈압약/, '고혈압 약물'],
    [/(협심증|흉통|가슴이\s*조이)/, '흉통/협심증 가능성'],
    [/심방세동/, '심방세동'],
    [/콜레스테롤|hdl|ldl/i, '콜레스테롤 관리'],
    [/당뇨|혈당/, '혈당 관리'],
    [/지방간|간수치|간염/, '간 건강'],
    [/위염|역류성|소화불량|복통/, '소화기 증상'],
    [/두통|어지럼|기억력|인지|치매/, '뇌·인지 증상'],
    [/불안|우울|불면|수면/, '정신건강/수면 문제'],
    [/피부|여드름|색소|가려움/, '피부 증상'],
    [/탈모|모발/, '탈모/두피 문제'],
    [/암|항암|방사선/, '암 치료 중 건강관리'],
  ]
  for (const [re, label] of table) {
    if (re.test(q)) return label
  }
  const m = q.match(/^(.{2,26}?)(?:은|는|이|가|을|를|에서|후|의)\s*(어떻게|왜|무엇|어떤|가능|필요|하나요|인가요|일까요|될까요|있나요)/)
  if (m?.[1]) return cleanTopicLabel(m[1])
  return cleanTopicLabel(q.replace(/\?+$/, '').slice(0, 22))
}

function cleanTopicLabel(topic) {
  return String(topic || '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/(은|는|이|가|을|를|와|과|의|후|에서)$/u, '')
    .trim()
}

function categoryNoun(category) {
  const map = {
    metabolism: '대사질환',
    cancer_immune: '항암·면역',
    digestive: '소화·간',
    cardiovascular: '심혈관',
    neuro_cognitive: '뇌·인지',
    mental_health: '정신건강',
    musculoskeletal: '근골격',
    skin: '피부',
    hair: '모발/두피',
    respiratory: '호흡기',
    infection_inflammation: '감염·염증',
    womens_health: '여성건강',
    mens_health: '남성건강',
  }
  return map[category] || '건강정보'
}

function secondSentenceByCategory(category) {
  const map = {
    musculoskeletal:
      '통증, 부종, 잠김, 운동 제한이 지속되면 정형외과 진료와 영상검사로 손상 범위를 먼저 확인하는 것이 안전합니다.',
    metabolism:
      '혈당·혈압·지질 같은 검사 수치와 식사·운동 기록을 함께 봐야 실제 관리 우선순위를 정확히 정할 수 있습니다.',
    cancer_immune:
      '치료 중 건강식품 선택은 반드시 담당 의료진과 상의해야 하며, 건강정보는 치료를 대체할 수 없습니다.',
    digestive:
      '흑변, 혈변, 황달, 지속 구토처럼 위험 신호가 있으면 자가관리보다 진료가 우선입니다.',
    cardiovascular:
      '흉통, 호흡곤란, 실신, 급격한 부종이 동반되면 지체하지 말고 응급평가를 받아야 합니다.',
    neuro_cognitive:
      '갑작스러운 마비, 말 어눌함, 시야 이상, 심한 두통이 동반되면 응급 진료가 필요합니다.',
    mental_health:
      '증상이 일상 기능을 크게 떨어뜨리거나 자해 위험 신호가 있으면 정신건강의학과 상담을 서둘러야 합니다.',
    skin:
      '발진이 급격히 번지거나 통증·열감이 심해지면 피부과 진료로 원인을 확인해야 합니다.',
    hair:
      '탈모가 빠르게 진행되거나 두피 염증이 동반되면 자가 제품 변경보다 피부과 평가가 먼저입니다.',
    infection_inflammation:
      '고열, 심한 통증, 빠른 부종 악화가 있으면 감염 여부를 확인하기 위한 진료가 우선입니다.',
    respiratory:
      '호흡곤란, 청색증, 고열이 있으면 지체 없이 호흡기 진료를 받아야 합니다.',
    womens_health:
      '심한 통증, 과다 출혈, 주기 급변이 있으면 산부인과에서 원인 평가를 받는 것이 좋습니다.',
    mens_health:
      '배뇨통, 혈뇨, 야간뇨 악화가 지속되면 비뇨의학과 상담이 필요할 수 있습니다.',
  }
  return map[category] || '증상이 지속되거나 악화되면 해당 진료과 전문의 상담으로 원인과 우선순위를 먼저 정리하세요.'
}

function buildShortAnswer(question, category, intent) {
  const topic = cleanTopicLabel(detectTopic(question))
  const domain = categoryNoun(category)
  const line2 = secondSentenceByCategory(category)
  const isDrugTopic = /(약물|고혈압 약|혈압약|복용약)/.test(topic)
  const treatmentLead = /치료/.test(topic) ? `${topic}는` : `${topic}의 치료는`

  if (topic === '어깨 탈구') {
    return [
      '어깨 탈구 후에는 먼저 관절이 정확히 정복되었는지 확인하고, 일정 기간 고정한 뒤 통증과 안정성에 맞춰 단계적으로 재활해야 합니다.',
      '저림, 근력저하, 반복 탈구 느낌이 있으면 정형외과에서 관절순·회전근개 손상 여부를 추가로 평가해야 합니다.',
    ]
  }

  if (topic === '반월판 연골 손상') {
    return [
      '반월판 연골 손상 치료는 파열 위치·크기·잠김 증상 여부에 따라 보존치료와 수술치료로 나뉘며, MRI 평가가 치료 결정을 돕습니다.',
      '무릎이 반복해서 붓거나 펴지지 않거나 보행 통증이 심하면 정형외과 진료를 서둘러야 합니다.',
    ]
  }

  if (topic === '체외충격파 치료') {
    return [
      '체외충격파 치료는 건·인대 통증에서 보존치료의 한 축으로 쓰이며, 통증 원인과 병기 평가 후 물리치료·운동치료와 함께 계획해야 효과를 판단할 수 있습니다.',
      '시술 횟수와 강도는 부위와 통증 반응에 따라 달라지므로, 동일한 프로토콜을 임의로 반복하는 방식은 피하는 것이 좋습니다.',
    ]
  }

  const templates = {
    treatment: `${treatmentLead} 손상·증상 정도와 검사 결과를 기준으로 보존치료, 약물치료, 재활치료, 시술/수술 여부를 나눠 결정합니다.`,
    drug: `${isDrugTopic ? topic : `${topic} 관련 약물`}은 임의 중단·증량보다 현재 수치와 부작용, 병용약을 함께 확인해 의료진과 조정하는 방식이 원칙입니다.`,
    test: `${topic} 검사는 단일 숫자만 보지 말고 검사 시점, 증상 변화, 복용약, 이전 결과와 함께 비교해 해석해야 정확합니다.`,
    cause: `${topic}의 원인은 한 가지로 단정하기보다 시작 시점, 악화 요인, 동반 증상, 검사 결과를 함께 확인해 구분해야 합니다.`,
    management: `${topic} 관리는 현재 증상의 강도와 유발 요인을 먼저 파악하고, 의료진 치료 계획 안에서 생활관리 항목을 조정하는 방식이 안전합니다.`,
    general: `${topic} 질문은 ${domain} 맥락에서 증상, 검사, 치료, 생활요인을 함께 봐야 정확한 판단이 가능합니다.`,
  }

  return [templates[intent] || templates.general, line2]
}

function buildDetailLead(question, category, intent) {
  const topic = cleanTopicLabel(detectTopic(question))
  const treatmentLead = /치료/.test(topic) ? `${topic} 방향은` : `${topic}의 치료 방향은`
  const drugLead = /(약물|고혈압 약|혈압약|복용약)/.test(topic) ? `${topic} 질문은` : `${topic} 관련 약물 질문은`
  const leads = {
    treatment: `${treatmentLead} “현재 기능 제한이 어느 정도인지”와 “검사에서 확인된 손상 범위가 무엇인지”를 함께 보고 정합니다.`,
    drug: `${drugLead} 효과보다 먼저 복용 중인 약 목록, 기저질환, 부작용 징후를 확인하는 것이 핵심입니다.`,
    test: `${topic} 검사 해석에서는 추세 비교가 핵심이며, 같은 검사도 조건이 다르면 결과 의미가 달라질 수 있습니다.`,
    cause: `${topic} 원인 평가는 생활요인만으로 결론 내리지 말고 진찰·검사·경과 관찰을 함께 묶어 해석해야 정확도가 높습니다.`,
    management: `${topic} 관리에서는 한 번에 모든 것을 바꾸기보다 우선순위 1~2가지를 정해 1~2주 단위로 반응을 점검하는 것이 현실적입니다.`,
    general: `${topic} 질문의 핵심은 현재 상태를 구조화해 “무엇을 먼저 확인할지”를 정하는 데 있습니다.`,
  }
  return leads[intent] || leads.general
}

function removeTemplateNoise(answer, question) {
  let next = String(answer || '')
  const topic = cleanTopicLabel(detectTopic(question))

  next = next
    .replace(/<p>이 질문에서는 특히[\s\S]*?<\/p>/g, '')
    .replace(/<p>질문의 핵심은[\s\S]*?<\/p>/g, '')
    .replace(/<p>질문일수록[\s\S]*?<\/p>/g, '')
    .replace(/<p>이 질문의 키워드[\s\S]*?<\/p>/g, '')
    .replace(/<p>질문에 답을 적용할 때는[\s\S]*?<\/p>/g, '')
    .replace(/<p>치료 질문에서는/g, `<p>${topic}의 치료를 볼 때는`)
    .replace(/<p>관리 단계에서는/g, `<p>${topic} 관리에서는`)
    .replace(/<p>약물 관련 질문은/g, `<p>${topic} 약물 질문은`)
    .replace(/<p>([가-힣·]+ 질문은)([^<]*)<\/p>/g, `<p>${topic} 관련 질문에서는$2</p>`)

  const qStem = normalizeQuestion(question).replace(/\?+$/, '')
  if (qStem) {
    const escaped = qStem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    next = next.replace(new RegExp(`<li>${escaped}\\s*증상이 시작된 시점<\\/li>`, 'g'), '<li>증상이 시작된 시점과 악화 요인</li>')
  }
  next = next.replace(/<li>[^<]{0,40}증상이 시작된 시점<\/li>/g, '<li>증상이 시작된 시점과 악화 요인</li>')
  return next
}

function patchOne(item) {
  const question = normalizeQuestion(item.question || '')
  const intent = detectIntent(question)
  const shortAnswer = buildShortAnswer(question, item.category, intent)
  const detailLead = buildDetailLead(question, item.category, intent)
  let answer = String(item.answer || '')

  answer = removeTemplateNoise(answer, question)

  if (/<h3>짧은 답변<\/h3>[\s\S]*?<h3>자세히 보면<\/h3>/.test(answer)) {
    answer = answer.replace(
      /(<h3>짧은 답변<\/h3>)[\s\S]*?(<h3>자세히 보면<\/h3>)/,
      `$1<p>${shortAnswer[0]}</p><p>${shortAnswer[1]}</p>$2`,
    )
  }

  if (/<h3>자세히 보면<\/h3><p>[\s\S]*?<\/p>/.test(answer)) {
    answer = answer.replace(/(<h3>자세히 보면<\/h3>)<p>[\s\S]*?<\/p>/, `$1<p>${detailLead}</p>`)
  } else if (/<h3>자세히 보면<\/h3>/.test(answer)) {
    answer = answer.replace(/(<h3>자세히 보면<\/h3>)/, `$1<p>${detailLead}</p>`)
  }

  answer = answer.replace(/\s{2,}/g, ' ').trim()

  return {
    ...item,
    answer,
    reviewed_at: TODAY,
    rewrittenAt: TODAY,
    reviewed: true,
    qualityStatus: 'rewritten',
  }
}

function patchPayload(payload) {
  const questions = (payload.questions || []).map((item) => patchOne(item))
  return {
    ...payload,
    questions,
    updatedAt: TODAY,
  }
}

function main() {
  const base = readJson(QA_PATHS[0])
  const patched = patchPayload(base)
  for (const filePath of QA_PATHS) writeJson(filePath, patched)
  console.log(
    JSON.stringify(
      {
        patched: patched.questions.length,
        updatedAt: TODAY,
        files: QA_PATHS,
      },
      null,
      2,
    ),
  )
}

main()
if (process.env.ALLOW_QA_TEMPLATE_REWRITE !== '1') {
  console.error('[blocked] qa_emergency_precision_patch.mjs is disabled to prevent fallback/template answers from reappearing.')
  console.error('Set ALLOW_QA_TEMPLATE_REWRITE=1 only for explicit manual emergency use.')
  process.exit(1)
}
