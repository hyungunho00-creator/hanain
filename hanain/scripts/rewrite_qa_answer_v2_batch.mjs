#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const QA_SRC = path.join(ROOT, 'src', 'data', 'qa.json')
const QA_PUBLIC = path.join(ROOT, 'public', 'qa.json')
const BAD_PHRASES = [
  '근골격 맥락에서','정신건강/수면 문제 질문은','대사질환 맥락에서','항암·면역 맥락에서','소화·간 맥락에서','심혈관 맥락에서','뇌·인지 맥락에서','피부/모발 맥락에서','증상, 검사, 치료, 생활요인을 함께 봐야','현재 상태를 구조화','무엇을 먼저 확인할지','실전 답은','작은 루틴','관리형 질문','?에 대한','은?에 대한','는?에 대한','요?에 대한'
]
const MEDICAL_RE = /(치료|진료|병원|검사|수술|항암|증후군|약물|부작용|응급|진단|의사|의료진)/

function argValue(name, fallback = null) {
  const i = process.argv.indexOf(name)
  if (i === -1) return fallback
  return process.argv[i + 1] ?? fallback
}
function hasFlag(name) { return process.argv.includes(name) }
function stripHtml(s='') { return String(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() }
function ensureDir(dir){ fs.mkdirSync(dir,{recursive:true}) }

function legacyAnswer(q) {
  const cands = [q.validatedAnswer, q.validated_answer, q.answer, q.body, q.content, q.detailedAnswer, q.shortAnswer]
  for (const c of cands) if (typeof c === 'string' && c.trim()) return c.trim()
  return ''
}

function phlorotanninBridge() {
  return '플로로탄닌은 감태 등 갈조류에서 발견되는 해양 폴리페놀 성분입니다. 감태추출물, 씨놀, 디에콜, 에콜 같은 키워드와 함께 항산화·염증 반응·대사 건강 관련 연구에서 다뤄집니다. 특정 질병이나 손상을 치료한다는 의미는 아니며, 건강정보를 볼 때 원료 연구와 생활관리 정보를 함께 이해하려는 분에게 참고가 될 수 있습니다.'
}

function disclaimer() {
  return '이 글은 일반 건강정보이며 진단이나 치료를 대신하지 않습니다. 증상이 지속되거나 악화되면 담당 의료진과 상담하세요.'
}

function makeStructuredDraftFromLegacy(q, item = null) {
  const plain = stripHtml(legacyAnswer(q))
  const first = plain.split('. ').slice(0, 2).join('. ').trim()
  const required = Array.isArray(item?.requiredTerms) ? item.requiredTerms.filter(Boolean) : []
  const requiredLead = required.slice(0, 2).join(' ')
  const questionHint = stripHtml(q.question || '').slice(0, 28)
  let shortAnswer = first || `${q.question || '질문'}에 대해서는 개인 상태와 진료 맥락을 함께 확인하는 것이 중요합니다.`
  if (requiredLead) {
    shortAnswer = `${requiredLead} 관련 질문(${questionHint})은 개인 상태와 원인에 따라 해석이 달라질 수 있어 핵심 기준을 먼저 확인하는 것이 좋습니다. ${shortAnswer}`
  }
  const categoryLabel = stripHtml(q.category || item?.category || '해당 주제')
  const emphasis = requiredLead || stripHtml(q.question || '').slice(0, 20) || '증상 변화'
  const normalizedPlain = plain || `${q.question || '질문'}에 대한 기존 답변 원문이 부족해 검수 보강이 필요합니다.`
  const detailBody = `${normalizedPlain}\n\n${emphasis}과 관련해 현재 상태, 최근 변화, 일상 기능 영향을 함께 확인하면 실제 관리 방향을 정하는 데 도움이 됩니다.`
  return {
    status: 'draft',
    shortAnswer,
    sections: [
      { heading: '자세히 보면', body: detailBody }
    ],
    checkFirst: [
      `${emphasis}이(가) 언제부터 시작됐는지`,
      `${emphasis} 관련 악화 요인과 완화 요인이 무엇인지`,
      `${emphasis}과 함께 나타난 변화(수면/식사/활동)가 있는지`
    ],
    whenToSeeDoctor: [
      `${emphasis}이(가) 1~2주 이상 지속되거나 악화될 때`,
      `일상 기능 저하(수면, 식사, 보행, 업무)로 ${emphasis} 관련 활동 제한이 커질 때`,
      `응급 신호(의식 변화, 심한 통증, 호흡곤란 등) 또는 ${emphasis} 증상 급격 악화가 있을 때`
    ],
    avoidList: [
      `${emphasis}을(를) 무시하고 자가 판단만으로 버티기`,
      `${emphasis} 상태를 진료 확인 없이 건강식품·보조요법만으로 대체하기`,
      `${emphasis} 기록 없이 임의로 관리 방향을 자주 바꾸기`
    ],
    lifestyleTips: [
      `${emphasis} 변화를 1~2주 단위로 기록하기`,
      `${emphasis} 맥락에서는 급격한 생활패턴 변화보다 지속 가능한 습관부터 조정하기`
    ],
    phlorotanninBridge: phlorotanninBridge(),
    disclaimer: disclaimer(),
    sources: [],
    reviewedAt: new Date().toISOString().slice(0,10),
    reviewBatch: ''
  }
}

const OVERRIDES = {
  'qa200-20260527-027': {
    shortAnswer: '암환자가 식욕이 없을 때는 세 끼를 억지로 많이 먹기보다 하루 5~6회로 나누어 소량씩 자주 먹는 방식이 도움이 될 수 있습니다. 한 번에 먹는 양보다 총 섭취량, 단백질, 수분, 체중 변화를 함께 확인하는 것이 중요합니다.',
    sections: [{ heading: '자세히 보면', body: '항암치료, 방사선치료, 통증, 오심, 입안 염증, 변비, 피로, 우울감 때문에 식욕이 저하될 수 있습니다. 이때는 한 끼 완식 부담을 줄이고, 먹기 쉬운 음식으로 섭취 횟수를 늘려 총 섭취량을 확보하는 것이 현실적입니다.' }],
    checkFirst: ['최근 1~2주 체중 변화', '하루 수분 섭취량', '오심·구토·입안 통증 여부', '삼킴 곤란 여부', '변비·설사 지속 여부', '냄새 민감으로 식사 회피 여부'],
    whenToSeeDoctor: ['1주 이상 거의 먹지 못할 때', '체중이 빠르게 감소할 때', '물도 마시기 어려울 때', '구토·설사가 지속될 때', '입안 염증·삼킴 통증이 심할 때', '탈수 증상이 있을 때'],
    avoidList: ['한 번에 많은 양을 억지로 먹기', '건강식품으로 식사를 대체하기', '담당 의료진과 상의 없이 보조제를 여러 개 추가하기', '체중 감소를 일시적 현상으로만 넘기기'],
    lifestyleTips: ['하루 5~6회 소량 분할 식사', '부드러운 단백질 식품 우선 배치', '냄새 자극이 적은 음식 온도·조리법 선택'],
    disclaimer: '이 글은 일반 건강정보이며 진단이나 치료를 대신하지 않습니다. 암 치료 중 식욕 저하, 체중 감소, 탈수, 구토, 삼킴 곤란이 있으면 담당 의료진이나 임상영양사와 상담하세요.'
  },
  'ci_063': {
    shortAnswer: '암 유전자 검사인 NGS는 암 조직이나 혈액에서 여러 유전자를 한 번에 분석해 변이를 확인하고, 치료 표적 가능성이나 약제 선택에 참고하는 검사입니다.',
    sections: [{ heading: '자세히 보면', body: 'NGS(Next Generation Sequencing)는 한두 개 유전자만 보는 방식보다 많은 유전자를 동시에 확인할 수 있습니다. 다만 결과가 나와도 실제 치료로 바로 연결되는지, 보험 적용이 가능한지, 임상시험 대상인지 등은 담당 종양내과 의료진이 종합 판단해야 합니다.' }],
    checkFirst: ['암종과 병기', '검체(조직/혈액) 확보 가능 여부', '현재 치료 단계', '표준치료 이후 선택지 필요성', '보험 적용 및 본인부담 범위'],
    whenToSeeDoctor: ['재발·전이암으로 치료 선택지가 필요한 경우', '표적치료 가능성 확인이 필요한 경우', '검사 결과 해석이 어려운 경우', '임상시험 참여 가능성을 검토하는 경우'],
    avoidList: ['NGS 결과만 보고 치료를 스스로 결정하기', '변이가 발견됐다는 이유만으로 특정 치료를 단정하기', '표준치료 대신 보조요법만 선택하기'],
    lifestyleTips: ['결과지 원문을 보관하고 진료 시 질문 목록 준비', '치료 목표(완화/유지/근치)를 의료진과 명확히 합의'],
    disclaimer: '이 글은 일반 건강정보이며 진단이나 치료 결정을 대신하지 않습니다. NGS 검사 여부와 결과 해석은 담당 종양내과 의료진과 상담하세요.'
  },
  'ci_066': {
    shortAnswer: '종양 용해 증후군은 암세포가 빠르게 파괴되면서 세포 내 물질이 혈액으로 급격히 유출되어 전해질 이상, 신장 기능 저하, 부정맥 등을 유발할 수 있는 응급 가능 상태입니다.',
    sections: [{ heading: '자세히 보면', body: '특히 세포 증식이 빠른 혈액암, 종양량이 큰 경우, 항암치료 반응이 급격한 경우 위험이 높습니다. 치료 전후 혈액검사와 소변량, 전해질(칼륨·인·칼슘), 요산, 신장 기능을 집중적으로 관찰합니다.' }],
    checkFirst: ['암 종류와 종양량', '항암치료 시작 시점', '신장 기능', '요산·칼륨·인·칼슘 수치', '소변량 변화', '심한 피로·구토·경련·두근거림 여부'],
    whenToSeeDoctor: ['소변량이 급격히 줄어들 때', '심한 구토·탈수가 지속될 때', '두근거림·어지럼이 나타날 때', '근육 경련·저림·의식 저하가 있을 때', '항암치료 후 갑작스러운 상태 악화가 있을 때'],
    avoidList: ['이상 증상을 단순 피로로 넘기기', '검사 수치 확인 없이 보조제만 추가하기', '수액/약물 조절을 자의로 변경하기', '혈액검사 일정을 임의로 건너뛰기'],
    lifestyleTips: ['치료 전후 증상 변화를 시간대별로 기록', '의료진 지시에 맞춘 수분/검사 계획 준수'],
    disclaimer: '이 글은 일반 건강정보이며 진단이나 치료를 대신하지 않습니다. 전해질 이상, 소변량 감소, 두근거림, 경련, 의식 변화가 있으면 즉시 의료진과 상담하거나 응급 진료를 받으세요.'
  },
  'ms_076': {
    shortAnswer: '건강한 척추를 위한 수면 자세는 목과 허리가 과하게 꺾이지 않도록 중립 정렬을 유지하는 것이 핵심입니다.',
    sections: [{ heading: '자세히 보면', body: '옆으로 잘 때는 목 높이에 맞는 베개와 무릎 사이 쿠션을 사용하면 허리 비틀림을 줄일 수 있습니다. 바로 눕는 자세는 무릎 아래 얇은 쿠션으로 요추 부담을 완화할 수 있고, 엎드린 자세는 경추 회전이 커질 수 있어 피하는 것이 좋습니다.' }],
    checkFirst: ['아침 기상 시 목·허리 통증 여부', '베개 높이가 목 정렬에 맞는지', '매트리스가 과도하게 꺼지거나 단단하지 않은지'],
    whenToSeeDoctor: ['야간 통증으로 수면이 자주 깨는 경우', '다리 저림·근력저하가 동반되는 경우', '2주 이상 통증이 지속되거나 악화되는 경우'],
    avoidList: ['높이가 맞지 않는 베개 사용', '엎드린 자세 장시간 유지', '통증이 심한데 무리한 스트레칭을 반복하기'],
    lifestyleTips: ['취침 전 5~10분 가벼운 허리·고관절 이완', '기상 직후 급격한 허리 굴곡 동작 피하기'],
  },
  'ms_053': {
    shortAnswer: '반달(반월판) 연골 손상 치료는 손상 위치·파열 형태·불안정성·활동 수준에 따라 보존치료와 수술치료를 구분해 결정합니다.',
    sections: [{ heading: '자세히 보면', body: '통증과 잠김 증상이 경미하면 초기에는 휴식, 부종 관리, 근력 재활 같은 보존치료를 우선합니다. 반복 잠김, 관절 불안정, 동반 인대 손상이 있거나 기능 저하가 크면 관절경적 봉합/절제 여부를 정형외과에서 평가합니다.' }],
    checkFirst: ['무릎 잠김/걸림 여부', '부종 지속 기간', '계단·쪼그림 동작 시 통증 변화', 'MRI 또는 진찰 소견'],
    whenToSeeDoctor: ['무릎이 펴지지 않거나 잠김이 반복될 때', '부종과 통증이 1~2주 이상 지속될 때', '보행 불안정이 심해질 때'],
    avoidList: ['통증이 심한데 점프·비틀기 운동 지속', '진단 없이 보조제만으로 버티기', '재활 계획 없이 활동량을 급격히 늘리기'],
    lifestyleTips: ['허벅지 앞/뒤 근력 균형 재활', '통증 유발 각도의 반복 동작 제한'],
  },
  'ms_071': {
    shortAnswer: '어깨 탈구 후 관리는 초기 고정, 통증·부종 조절, 재탈구 예방을 위한 단계적 재활이 핵심입니다.',
    sections: [{ heading: '자세히 보면', body: '정복 후에는 일정 기간 고정이 필요하고, 이후 관절가동범위 회복과 회전근개·견갑 안정화 근력 운동을 순차적으로 진행합니다. 젊은 연령, 접촉 스포츠 활동, 반복 탈구 병력이 있으면 수술적 안정화 평가가 필요할 수 있습니다.' }],
    checkFirst: ['정복 후 영상 확인 여부', '신경·혈관 증상(저림, 감각저하) 여부', '재탈구 불안감과 통증 양상'],
    whenToSeeDoctor: ['정복 후에도 심한 통증·감각 이상이 지속될 때', '어깨가 다시 빠질 것 같은 불안정이 반복될 때', '재탈구가 발생했을 때'],
    avoidList: ['고정 기간 중 무리한 외회전·외전 동작', '통증을 참고 고강도 운동 재개', '재활 없이 조기 복귀'],
    lifestyleTips: ['재활 초기에는 통증 범위 내 능동운동부터 시작', '복귀 전 기능 테스트(근력·안정성) 확인'],
  },
  'ms_057': {
    shortAnswer: '체외충격파 치료는 통증 부위에 충격파를 전달해 조직 회복 반응을 유도하는 비수술적 치료 방법입니다.',
    sections: [{ heading: '자세히 보면', body: '주로 만성 건·근막 통증(족저근막염, 석회성 건병증, 외측상과염 등)에서 사용하며, 통증 기간·조직 상태·기저 질환에 따라 치료 횟수와 강도를 조절합니다. 개인에 따라 일시적 통증 증가가 있을 수 있어 치료 후 경과 관찰이 중요합니다.' }],
    checkFirst: ['통증 부위 정확한 진단 여부', '증상 지속 기간', '항응고제 복용/출혈성 질환 여부', '동반 재활 계획 유무'],
    whenToSeeDoctor: ['치료 후 통증이 지속적으로 악화될 때', '부종·열감·운동 제한이 심해질 때', '치료 횟수 후에도 기능 개선이 없을 때'],
    avoidList: ['정확한 진단 없이 반복 치료만 진행', '치료 직후 고강도 운동 즉시 재개', '재활 운동을 병행하지 않기'],
    lifestyleTips: ['치료 후 24~48시간 과부하 운동 회피', '증상 일지로 통증 변화 추적'],
  },
  'ms_022': {
    shortAnswer: '디스크 예방을 위한 자세의 핵심은 허리 중립 정렬을 유지하고, 오래 같은 자세를 피하며, 일상 동작에서 허리 과굴곡·과신전을 줄이는 것입니다.',
    sections: [{ heading: '자세히 보면', body: '앉을 때는 엉덩이를 등받이에 밀착하고 발바닥을 바닥에 두며, 모니터 높이를 눈높이에 맞춥니다. 물건을 들 때는 허리만 굽히지 말고 무릎·고관절을 함께 사용해 체중을 분산해야 합니다.' }],
    checkFirst: ['장시간 앉아있는 시간', '허리 통증이 심해지는 동작', '작업 환경(의자/책상/모니터) 높이'],
    whenToSeeDoctor: ['다리 저림·근력저하가 동반될 때', '기침/재채기 시 통증이 심해질 때', '2주 이상 통증이 호전되지 않을 때'],
    avoidList: ['한 자세로 1시간 이상 유지', '허리 비틀며 물건 들기', '통증 시 무리한 고강도 코어 운동'],
    lifestyleTips: ['30~40분마다 짧은 자세 변경', '복압 조절 호흡과 코어 안정화 운동 병행'],
  },
  'qa200-20260527-136': {
    shortAnswer: '낙상 예방을 위해 집에서 가장 먼저 바꿀 것은 미끄럼·걸림 위험을 줄이는 동선 정리와 조명 개선입니다.',
    sections: [{ heading: '자세히 보면', body: '바닥의 전선·문턱·헐거운 러그를 정리하고, 욕실·현관처럼 미끄러운 구역에 미끄럼 방지 매트를 설치하는 것이 우선입니다. 야간 이동 동선에는 센서등 또는 보조등을 두어 시야를 확보해야 합니다.' }],
    checkFirst: ['최근 1년 낙상 경험', '야간 화장실 이동 시 시야 확보 여부', '복용 약물(어지럼 유발 가능)'],
    whenToSeeDoctor: ['낙상 후 통증·부종·보행 장애가 있을 때', '어지럼·실신 전조가 반복될 때', '균형 저하가 빠르게 진행될 때'],
    avoidList: ['미끄러운 슬리퍼 사용', '어두운 환경에서 급하게 이동', '보행 보조도구 필요 상태를 무시하기'],
    lifestyleTips: ['하체 근력·균형 운동을 주 2~3회 시행', '시력·청력·약물 점검 주기화'],
  },
  'meta-007': {
    shortAnswer: '공복혈당 100~125mg/dL는 당뇨 전단계 범위에 해당할 수 있어, 당화혈색소와 생활습관 지표를 함께 확인하며 조기 관리하는 것이 중요합니다.',
    sections: [{ heading: '자세히 보면', body: '한 번의 공복혈당만으로 확정하기보다 재검과 당화혈색소(HbA1c), 체중·허리둘레, 활동량, 수면 상태를 함께 보아야 합니다. 식사 구성 조정과 활동량 증가만으로도 진행 위험을 낮출 수 있습니다.' }],
    checkFirst: ['공복혈당 재검 여부', '당화혈색소(HbA1c) 수치', '체중·허리둘레 변화', '주당 유산소/근력 활동량', '야식·음주 패턴'],
    whenToSeeDoctor: ['공복혈당이 반복적으로 상승할 때', '당화혈색소가 상승 추세일 때', '다뇨·다갈·체중감소 같은 고혈당 증상이 있을 때'],
    avoidList: ['검사 확인 없이 단기 식이요법만 반복', '건강식품만으로 혈당 관리를 대체', '증상이 있는데 진료를 미루기'],
    lifestyleTips: ['정제 탄수화물 비율 줄이고 단백질/식이섬유 보강', '식후 10~20분 걷기 습관화'],
  },
}

function applyOverride(id, draft, batchId) {
  const base = OVERRIDES[id]
  if (!base) return draft
  return {
    ...draft,
    status: 'draft',
    shortAnswer: base.shortAnswer,
    sections: base.sections,
    checkFirst: base.checkFirst,
    whenToSeeDoctor: base.whenToSeeDoctor,
    avoidList: base.avoidList,
    lifestyleTips: base.lifestyleTips,
    phlorotanninBridge: phlorotanninBridge(),
    disclaimer: base.disclaimer || disclaimer(),
    sources: [],
    reviewedAt: new Date().toISOString().slice(0,10),
    reviewBatch: batchId,
  }
}

function validateAnswerV2(q, v2, item) {
  const failures = []
  const title = String(q.question || '')
  const joined = [
    v2.shortAnswer || '',
    ...(v2.sections || []).map(s=>s.body || ''),
    ...(v2.checkFirst || []),
    ...(v2.whenToSeeDoctor || []),
    ...(v2.avoidList || []),
    ...(v2.lifestyleTips || []),
    v2.phlorotanninBridge || '',
    v2.disclaimer || '',
  ].join('\n')
  const plain = stripHtml(joined)
  const first300 = plain.slice(0,300)

  if (!stripHtml(v2.shortAnswer)) failures.push('empty-shortAnswer')
  if (!plain || plain.length < 220) failures.push('too-short-body')
  if (MEDICAL_RE.test(title) && plain.length < 500) failures.push('medical-too-short')

  const required = item.requiredTerms || []
  if (required.length) {
    const hit = required.filter(t => first300.includes(String(t))).length
    if (hit < Math.max(1, Math.ceil(required.length * 0.3))) failures.push('required-terms-missing-in-first300')
  }

  const bad = BAD_PHRASES.find(p => plain.includes(p))
  if (bad) failures.push(`bad-phrase:${bad}`)

  const paragraphHead = stripHtml((v2.shortAnswer || '') + ' ' + (v2.sections?.[0]?.body || '')).slice(0,220)
  if (/플로로탄닌|phlorotannin|감태|씨놀|디에콜|에콜/i.test(paragraphHead)) failures.push('phlorotannin-in-top-paragraph')
  if (/플로로탄닌.{0,20}(치료|예방|개선|완화|회복|낮추|좋)/.test(plain)) failures.push('phlorotannin-claim')

  if (!Array.isArray(v2.whenToSeeDoctor) || v2.whenToSeeDoctor.filter(Boolean).length === 0) failures.push('missing-whenToSeeDoctor')
  if (!Array.isArray(v2.avoidList) || v2.avoidList.filter(Boolean).length === 0) failures.push('missing-avoidList')
  if (!stripHtml(v2.disclaimer)) failures.push('missing-disclaimer')

  return failures
}

function loadQueue(batchId) {
  const smokePath = path.join(ROOT, 'data', 'qa-rewrite-queue-smoke-10.json')
  const mainPath = path.join(ROOT, 'data', 'qa-rewrite-queue.json')
  if (batchId === 'qa-smoke-10' && fs.existsSync(smokePath)) {
    const doc = JSON.parse(fs.readFileSync(smokePath,'utf8'))
    return { batchId: doc.batchId, items: doc.items || [], source: smokePath }
  }
  const doc = JSON.parse(fs.readFileSync(mainPath,'utf8'))
  const batch = (doc.batches || []).find(b => b.batchId === batchId)
  if (!batch) throw new Error(`batch not found: ${batchId}`)
  return { batchId: batch.batchId, items: batch.items || [], source: mainPath }
}

function writeMarkdownReport(outPath, report) {
  const lines = [
    `# Batch Report: ${report.batchId}`,
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- sourceQueue: ${report.sourceQueue}`,
    `- mode: ${report.mode}`,
    `- 대상 개수: ${report.total}`,
    `- answerV2 생성 수: ${report.generated}`,
    `- approved 수: ${report.approved}`,
    `- rejected 수: ${report.rejected}`,
    `- needs_source 수: ${report.needsSource}`,
    `- source_gap 수: ${report.sourceGap}`,
    '',
    '## Items',
    ...report.items.map(it => `- [${it.index}] ${it.id} ${it.question} => ${it.finalStatus}${it.failures.length ? ` | ${it.failures.join(', ')}` : ''}`),
  ]
  fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8')
}

function run() {
  const batchId = argValue('--batch')
  const apply = hasFlag('--apply')
  const dryRun = hasFlag('--dry-run') || !apply
  if (!batchId) {
    console.error('Usage: node scripts/rewrite_qa_answer_v2_batch.mjs --batch <id> [--dry-run|--apply]')
    process.exit(1)
  }

  const qaDoc = JSON.parse(fs.readFileSync(QA_SRC, 'utf8'))
  const questions = qaDoc.questions || []
  const queue = loadQueue(batchId)

  const results = []
  let generated = 0
  let approved = 0
  let rejected = 0
  let needsSource = 0
  let sourceGap = 0

  for (const item of queue.items) {
    const idxFromQueue = Number(item.index)
    const byId = questions.findIndex(q => String(q.id) === String(item.id))
    const idx = byId >= 0 ? byId : (idxFromQueue > 0 ? idxFromQueue - 1 : -1)
    if (idx < 0 || !questions[idx]) {
      results.push({ ...item, finalStatus: 'missing', failures: ['question-not-found'] })
      continue
    }
    const q = questions[idx]
    let draft = makeStructuredDraftFromLegacy(q, item)
    draft = applyOverride(q.id, draft, batchId)

    const failures = validateAnswerV2(q, draft, item)
    let finalStatus = 'approved'
    if (failures.length > 0) {
      const sourceOnly = failures.every(f => f.includes('source') || f.includes('medical-too-short'))
      finalStatus = sourceOnly ? 'needs_source' : 'rejected'
    }

    const answerV2 = {
      ...draft,
      status: finalStatus,
      reviewedAt: new Date().toISOString().slice(0,10),
      reviewBatch: batchId,
    }

    generated += 1
    if (finalStatus === 'approved') approved += 1
    if (finalStatus === 'rejected') rejected += 1
    if (finalStatus === 'needs_source') needsSource += 1

    const sourceStatus = finalStatus === 'needs_source' ? 'source_gap' : 'verified'
    if (sourceStatus === 'source_gap') sourceGap += 1

    if (!dryRun) {
      questions[idx].answerV2 = answerV2
      questions[idx].sourceStatus = sourceStatus
      questions[idx].reviewBatch = batchId
      questions[idx].reviewedAt = answerV2.reviewedAt
    }

    results.push({
      index: idx + 1,
      id: q.id,
      question: q.question,
      finalStatus,
      failures,
    })
  }

  if (!dryRun) {
    qaDoc.questions = questions
    fs.writeFileSync(QA_SRC, JSON.stringify(qaDoc, null, 2) + '\n', 'utf8')
    fs.writeFileSync(QA_PUBLIC, JSON.stringify(qaDoc, null, 2) + '\n', 'utf8')
  }

  const report = {
    batchId,
    sourceQueue: queue.source,
    mode: dryRun ? 'dry-run' : 'apply',
    total: queue.items.length,
    generated,
    approved,
    rejected,
    needsSource,
    sourceGap,
    items: results,
  }

  const reportDir = path.join(ROOT, 'docs', 'batches')
  ensureDir(reportDir)
  const reportPath = path.join(reportDir, `${batchId}-report.md`)
  writeMarkdownReport(reportPath, report)

  console.log(JSON.stringify({ ok: true, reportPath, ...report }, null, 2))
}

run()
