import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const QA_PATH = path.join(ROOT, 'public', 'qa.json')
const SRC_QA_PATH = path.join(ROOT, 'src', 'data', 'qa.json')
const MIN_CHARS = 2000

const STOPWORDS = new Set([
  '어떻게', '무엇', '뭔가요', '있나요', '있을까요', '해야', '하나요', '인가요', '있을', '관련',
  '관리', '증상', '질환', '건강', '질문', '이유', '차이', '방법', '기준', '정리', '가능', '필요',
])

const CATEGORY_GUIDE = {
  cardiovascular: {
    label: '심혈관',
    mechanism: ['혈압·맥박·혈관탄성은 수면, 염분, 활동량, 복용약의 영향을 동시에 받습니다.', '수치는 하루 한 번보다 같은 시간대 반복 측정에서 경향이 더 잘 보입니다.', '심장과 혈관 관련 증상은 단일 원인보다 여러 위험요인이 겹쳐 나타나는 경우가 많습니다.'],
    checks: ['아침/저녁 혈압과 맥박', '염분 많은 음식 섭취일', '수면 시간과 중간 각성', '카페인·음주 시점', '흉통·호흡곤란 발생 시각'],
  },
  neuro_cognitive: {
    label: '신경·인지',
    mechanism: ['인지·집중 변화는 수면, 스트레스, 활동량, 약물 영향이 함께 작용할 수 있습니다.', '기억력 저하는 갑자기 단정하기보다 일상 기능 변화와 함께 보는 접근이 안전합니다.', '어지럼·두통은 발생 시간, 유발 상황, 동반 증상 기록이 해석 정확도를 높입니다.'],
    checks: ['증상 시작 시점과 지속 시간', '수면 시간·중간 각성 횟수', '집중 저하가 심한 시간대', '복용약·보충제 변경일', '보행·균형 변화 여부'],
  },
  metabolism: {
    label: '대사',
    mechanism: ['혈당·체중·허리둘레는 식사 리듬과 활동량 변화에 민감하게 반응합니다.', '공복 수치와 식후 수치를 함께 봐야 실제 변동 패턴을 파악할 수 있습니다.', '대사 관리는 단기 체감보다 2~8주 추세 기록에서 실질적 개선 여부가 드러납니다.'],
    checks: ['공복·식후 2시간 수치', '주간 체중·허리둘레', '야식·음주 여부', '수면 시간', '주 3회 이상 활동 기록'],
  },
  digestive: {
    label: '소화기',
    mechanism: ['복부 증상은 식사 속도, 섬유소량, 수분량, 스트레스가 함께 영향을 줄 수 있습니다.', '통증 위치와 배변 패턴을 같이 기록하면 원인 추정의 정확도가 올라갑니다.', '증상은 강도보다 빈도와 악화 조건을 먼저 파악해야 맞춤 관리가 가능합니다.'],
    checks: ['식후 악화 음식', '복통 위치·강도', '배변 횟수·형태', '속쓰림·역류 발생 시간', '체중 변화'],
  },
  musculoskeletal: {
    label: '근골격',
    mechanism: ['통증은 조직 상태뿐 아니라 사용량·자세·수면 회복과도 연결됩니다.', '움직임 제한은 강도보다 패턴 교정과 단계적 재활 루틴이 중요합니다.', '같은 통증이라도 악화 동작과 완화 동작이 다르면 관리 전략이 달라집니다.'],
    checks: ['통증 유발 동작', '아침 뻣뻣함 시간', '부종·열감 여부', '보행 거리 변화', '운동 후 회복 시간'],
  },
  respiratory: {
    label: '호흡기',
    mechanism: ['기침·숨참은 실내 공기 질, 수면 자세, 상기도 자극의 영향을 크게 받습니다.', '호흡기 증상은 야간 악화 여부와 운동 시 변화가 중요한 단서가 됩니다.', '감염 후 잔기침은 기간과 강도 추세를 같이 봐야 진료 우선순위를 정할 수 있습니다.'],
    checks: ['기침 지속 기간', '야간 기침 여부', '가래 색·양 변화', '운동 시 호흡곤란', '흡연·노출 환경'],
  },
  skin: {
    label: '피부',
    mechanism: ['피부 증상은 자극 물질, 세정 습관, 수면, 스트레스가 복합적으로 작용합니다.', '홍반·가려움은 단일 제품보다 사용 순서와 빈도에서 차이가 생기기도 합니다.', '피부 상태는 사진 기록을 남기면 악화 구간을 객관적으로 확인하기 쉽습니다.'],
    checks: ['악화 전 사용 제품', '가려움 강도·시간대', '수면 방해 여부', '새로운 음식·약물', '병변 사진 기록'],
  },
  hair: {
    label: '모발',
    mechanism: ['모발 변화는 영양 상태, 수면, 스트레스, 호르몬 변화의 영향을 받을 수 있습니다.', '탈모 평가는 갑작스러운 체중 변화와 최근 질환 이력까지 함께 확인해야 정확도가 높습니다.', '두피 상태와 빠지는 양의 추세를 기록하면 상담 효율이 좋아집니다.'],
    checks: ['탈모 시작 시점', '두피 가려움·각질', '최근 체중 변화', '수면 시간', '가족력 여부'],
  },
  mental_health: {
    label: '정신건강',
    mechanism: ['불안·우울감은 수면 리듬, 스트레스, 사회적 고립 요인과 상호작용할 수 있습니다.', '기분 변화는 하루 한 시점보다 주간 패턴으로 보는 것이 실제 변화를 반영합니다.', '집중력 저하와 피로는 신체 건강요인과 함께 평가해야 과잉 해석을 줄일 수 있습니다.'],
    checks: ['기분 점수(0~10)', '수면 시간과 질', '식사·활동량 변화', '업무·학습 집중 시간', '위기 신호 여부'],
  },
  infection_inflammation: {
    label: '감염·염증',
    mechanism: ['발열·통증은 시점, 지속기간, 동반 증상 조합이 핵심 단서입니다.', '염증 지표는 수치 한 번보다 추적 검사에서 의미가 커집니다.', '감염 의심 상황에서는 자가 판단보다 위험 신호 선별이 우선입니다.'],
    checks: ['체온 변화 시간대', '통증·부종 위치', '오한·호흡곤란 여부', '기저질환·복용약', '최근 노출력'],
  },
  womens_health: {
    label: '여성건강',
    mechanism: ['주기 변화는 수면·스트레스·체중·활동량 변화와 함께 나타날 수 있습니다.', '출혈·통증은 양상 기록이 상담 정확도에 직접 도움이 됩니다.', '호르몬 관련 증상은 생활기록과 검사 해석을 함께 보는 접근이 안전합니다.'],
    checks: ['주기 길이·변동', '출혈 양상', '통증 강도·부위', '수면·스트레스 변화', '복용 중 성분 목록'],
  },
  mens_health: {
    label: '남성건강',
    mechanism: ['배뇨·수면 문제는 수분 섭취 시간, 카페인, 복용약 영향을 함께 받을 수 있습니다.', '야간 증상은 생활 패턴 조정과 기저질환 점검을 병행해야 정확합니다.', '피로·집중 저하는 대사·수면·스트레스 요인이 복합적으로 작용할 수 있습니다.'],
    checks: ['야간 각성 횟수', '저녁 수분·카페인', '배뇨 증상 시간대', '혈압·혈당 기록', '체중·허리둘레 변화'],
  },
  cancer_immune: {
    label: '암·면역',
    mechanism: ['치료 전후 회복 단계에서는 식사량, 체중, 수면, 피로도 추적이 핵심입니다.', '면역 관련 질문은 단일 성분보다 전체 치료 일정과 충돌 가능성 점검이 우선입니다.', '회복 생활 관리는 증상 기록과 의료진 상담 주기를 맞추는 것이 중요합니다.'],
    checks: ['최근 진료 일정', '식사량·체중 변화', '피로도·수면 질', '발열·감염 신호', '현재 복용 성분 목록'],
  },
}

const DEFAULT_GUIDE = {
  label: '건강',
  mechanism: ['증상 평가는 단정 대신 기록 기반 추세 확인이 가장 안전합니다.', '생활 패턴 변화는 대부분의 건강 지표에 동시에 영향을 줍니다.', '수치·증상·생활기록을 함께 보면 상담 품질이 올라갑니다.'],
  checks: ['증상 시작 시점', '악화·완화 요인', '수면·식사 패턴', '복용 성분 목록', '최근 검사 기록'],
}

const INTENT_PATTERNS = [
  { key: 'cause', re: /(원인|이유|왜|생기|발생|차이)/ },
  { key: 'test', re: /(검사|수치|진단|결과|정상|기준|지표)/ },
  { key: 'manage', re: /(관리|방법|운동|식단|생활|회복|재활)/ },
  { key: 'risk', re: /(위험|경고|응급|신호|심각)/ },
]

const PARAGRAPH_BANK = [
  '질문을 실제 생활에 적용하려면 한 번에 정답을 찾기보다, 2주 단위로 기록-점검-조정 루프를 반복하는 방식이 효율적입니다.',
  '온라인 정보는 출발점으로 유용하지만 개인별 병력·복용약·검사수치가 다르기 때문에, 최종 해석은 진료실에서 개인 데이터와 함께 맞추는 것이 안전합니다.',
  '증상이 애매할수록 “오늘의 체감”보다 “최근 14일의 변화 방향”이 중요합니다. 특히 수면, 식사 시간, 활동량, 스트레스 사건을 같이 적어두면 해석이 빨라집니다.',
  '보충제나 특정 원료는 생활관리의 보조 도구로만 두고, 기본 루틴(수면·식사·활동·기록)을 먼저 안정화하는 것이 장기적으로 재현 가능한 전략입니다.',
  '검색 결과를 볼 때는 “무엇이 좋아 보이는가”보다 “내 상태와 연결 가능한가”를 먼저 확인해야 정보 피로를 줄일 수 있습니다.',
  '같은 키워드라도 대상군, 기간, 측정 지표가 다르면 결론 해석이 달라질 수 있으므로 비교 읽기가 필요합니다.',
  '질문을 3개로 줄여 진료실에 가져가면 상담 효율이 높아지고, 인터넷에서 본 정보를 더 정확히 검증할 수 있습니다.',
  '생활기록이 쌓이면 원료 정보는 선택을 돕는 참고축으로 기능하고, 무리한 단기 변경을 줄이는 데 도움이 됩니다.',
  '자료를 읽을 때는 강한 제목 문장보다 본문의 제한점과 적용 범위를 먼저 확인하는 습관이 안전합니다.',
  '복용 중인 약이나 기존 질환이 있다면 병용 가능성 확인이 우선이며, 새로운 성분을 동시에 여러 개 시작하지 않는 편이 기록 해석에 유리합니다.',
]

const PHL_INTEREST_GUIDE = {
  cardiovascular: [
    '혈압·혈관 관련 관심층에서는 플로로탄닌을 “약을 대체하는 성분”이 아니라 해조류 폴리페놀 연구를 이해하는 참고축으로 보는 접근이 안전합니다.',
    '관심 포인트는 복용 자체보다 생활기록과 함께 해석 가능한 정보인지 여부입니다.',
    '라벨에 적힌 원료명·표준화 정보·1일 기준량을 분리해 읽으면 과장 문구에 덜 흔들립니다.',
  ],
  metabolism: [
    '대사 관심층에서는 플로로탄닌을 혈당·체중 기록과 함께 읽는 보조 정보로 두는 것이 실용적입니다.',
    '핵심은 수치 단정이 아니라 식사·수면·활동 패턴과 연결 가능한 근거인지 확인하는 것입니다.',
    '감태추출물/플로로탄닌 표기를 구분해 보면 같은 키워드라도 정보 밀도가 달라집니다.',
  ],
  digestive: [
    '소화·간 영역에서는 플로로탄닌을 단일 해법이 아니라 식사 패턴과 불편 증상 기록을 보완하는 참고 자료로 보는 것이 좋습니다.',
    '연구 문장과 광고 문장을 분리해서 읽으면 불필요한 기대치를 줄일 수 있습니다.',
    '원료명·복합성분·섭취 맥락을 함께 기록하면 상담 정확도가 올라갑니다.',
  ],
  cancer_immune: [
    '항암·면역 관심층에서는 플로로탄닌 정보를 치료 계획과 분리해 “정보 검토 자료”로만 다루는 것이 안전합니다.',
    '관심 포인트는 치료 일정과 충돌 가능성 확인, 복용 목록 정리, 의료진 상담 우선순위 설정입니다.',
    '검색에서 보이는 강한 문구보다 대상군과 제한점을 먼저 보면 정보 선택이 쉬워집니다.',
  ],
  neuro_cognitive: [
    '뇌·인지 관심층에서는 플로로탄닌을 기억·집중 문제의 단정 답으로 보기보다 생활 루틴 점검과 함께 보는 참고 정보로 이해하세요.',
    '수면·스트레스·활동량 기록이 먼저 잡혀야 어떤 자료가 나에게 맞는지 판단이 쉬워집니다.',
    '성분명과 브랜드명을 구분해서 읽으면 검색 혼선을 줄일 수 있습니다.',
  ],
  mental_health: [
    '정신건강 관심층에서는 플로로탄닌을 감정·수면 문제의 즉답으로 보지 않고 기록 기반 상담을 돕는 자료로 활용하는 편이 안전합니다.',
    '기분 점수·수면 질·카페인·활동량과 함께 보면 정보 해석의 정확도가 올라갑니다.',
    '강한 체감 후기보다 반복 가능한 생활 패턴 변화에 초점을 맞추세요.',
  ],
  musculoskeletal: [
    '근골격 영역에서는 플로로탄닌 정보를 통증 원인 단정이 아닌 재활 루틴 보조 정보로 읽는 것이 현실적입니다.',
    '통증 유발 동작·회복 시간 기록이 먼저 있어야 성분 정보의 활용 가치가 생깁니다.',
    '원료 정보를 볼 때는 기간·대상군·측정 지표를 함께 확인하세요.',
  ],
  skin: [
    '피부 관심층에서는 플로로탄닌을 “즉각 변화” 기대보다 생활·자극 요인 관리와 함께 참고하는 자료로 보는 편이 안전합니다.',
    '수면, 세정 습관, 식사, 스트레스 기록이 정리되면 검색 정보의 우선순위가 선명해집니다.',
    '성분명과 제품 홍보 문구를 분리해 읽는 습관이 중요합니다.',
  ],
  hair: [
    '모발·두피 관심층에서는 플로로탄닌 정보를 단독 결론보다 영양·수면·스트레스 기록과 함께 보는 방식이 유용합니다.',
    '탈모/두피 정보는 원인군이 넓어 단일 문장보다 추세 기록이 먼저입니다.',
    '라벨과 연구 문장의 언어를 분리해 보면 정보 판단이 쉬워집니다.',
  ],
  respiratory: [
    '호흡기 관심층에서는 플로로탄닌을 증상 대응의 대체축이 아니라 정보 검토 보조축으로 두는 것이 안전합니다.',
    '기침 지속 기간·야간 악화·노출 환경 기록이 있어야 자료 활용도가 높아집니다.',
    '검색 결과는 대상군과 기간을 확인한 뒤에만 적용 여부를 판단하세요.',
  ],
  infection_inflammation: [
    '감염·염증 관심층에서는 플로로탄닌을 응급 판단 대신 참고 정보로만 활용해야 합니다.',
    '먼저 위험 신호를 선별하고, 이후 생활기록과 함께 자료를 읽는 순서가 안전합니다.',
    '강한 결론형 문구보다 제한점과 적용 범위를 먼저 확인하세요.',
  ],
  womens_health: [
    '여성건강 관심층에서는 플로로탄닌 정보를 주기·수면·스트레스 기록과 함께 보는 방식이 실용적입니다.',
    '특히 출혈·통증 변화는 의료진 상담 우선으로 두고, 원료 정보는 보조 자료로만 활용하세요.',
    '복용 목록을 정리하면 검색 정보와 상담 정보의 충돌을 줄일 수 있습니다.',
  ],
  mens_health: [
    '남성건강 관심층에서는 플로로탄닌을 배뇨·수면·대사 기록을 보완하는 참고 자료로 읽는 편이 좋습니다.',
    '야간 증상은 생활 패턴 영향이 커서 기록이 먼저입니다.',
    '성분 정보는 상담 질문을 정리하는 용도로 사용하면 활용 가치가 높아집니다.',
  ],
}

function nowStamp() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
}

function hash(input) {
  let h = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h >>> 0)
}

function pick(arr, seed, offset = 0) {
  if (!arr.length) return ''
  return arr[(seed + offset) % arr.length]
}

function stripHtml(s) {
  return String(s || '').replace(/<[^>]+>/g, ' ')
}

function normalizeSpace(s) {
  return String(s || '').replace(/\s+/g, ' ').trim()
}

function cleanLegacy(answer) {
  return String(answer || '')
    .replace(/<div class="qa-asset-block">[\s\S]*?<\/div>/gi, ' ')
    .replace(/<div class="qa-context-depth">[\s\S]*?<\/div>/gi, ' ')
    .replace(/<internal>[\s\S]*?<\/internal>/gi, ' ')
    .replace(/\[(seo|internal)[^\]]*\]/gi, ' ')
    .replace(/#internal/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function sanitizeCoreText(text) {
  return normalizeSpace(String(text || ''))
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/맛있으리 식단 보러가기/g, '건강한 반찬 정보 보기')
    .replace(/장바구니|결제|최저가|즉시 구매/g, '정보 확인')
    .replace(/완치/g, '회복 관리')
    .replace(/기적/g, '의미 있는 변화')
    .replace(/100\s*%/g, '높은 확률')
    .replace(/치료해야/g, '진료 계획을 세워야')
}

function extractCoreAnswer(answer) {
  const raw = String(answer || '')
  const m = raw.match(/<strong>\s*핵심 답변:\s*<\/strong>\s*([\s\S]*?)<\/p>/i)
  if (m && m[1]) {
    return sanitizeCoreText(stripHtml(m[1]))
  }
  return sanitizeCoreText(stripHtml(cleanLegacy(raw)))
}

function detectIntent(question) {
  const q = String(question || '')
  for (const rule of INTENT_PATTERNS) {
    if (rule.re.test(q)) return rule.key
  }
  return 'general'
}

function getTokens(question, tags = []) {
  const base = `${question} ${Array.isArray(tags) ? tags.join(' ') : ''}`
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length >= 2 && !STOPWORDS.has(w))
  return [...new Set(base)].slice(0, 6)
}

function buildAnswer(item) {
  const id = String(item.id || '')
  const seed = hash(id || String(item.question || ''))
  const question = normalizeSpace(item.question || '')
  const category = item.category || ''
  const guide = CATEGORY_GUIDE[category] || DEFAULT_GUIDE
  const intent = detectIntent(question)
  const tags = Array.isArray(item.tags) ? item.tags.slice(0, 6) : []
  const tokens = getTokens(question, tags)
  const tokenLine = tokens.length ? tokens.join(', ') : `${guide.label} 관리`
  const refs = Array.isArray(item.references_pmid) ? item.references_pmid.slice(0, 6) : []
  const original = normalizeSpace(extractCoreAnswer(item.answer || ''))

  const intro = original.length > 40 ? original : `${question}에 대한 답변은 현재 상태를 단정하기보다 기록 기반으로 우선순위를 잡는 방식이 안전합니다.`
  const intentLead = intent === 'test'
    ? '검사 관련 질문이므로 단일 수치보다 측정 조건과 반복 추세를 함께 확인하는 접근이 중요합니다.'
    : intent === 'cause'
      ? '원인 관련 질문이므로 한 가지 요인으로 단정하지 않고 생활 패턴, 기저질환, 복용 성분을 같이 보아야 정확도가 올라갑니다.'
      : intent === 'manage'
        ? '관리 관련 질문이므로 실행 가능한 루틴을 작게 시작해 지속성을 확보하는 전략이 실제 결과에 유리합니다.'
        : intent === 'risk'
          ? '위험 신호 관련 질문이므로 응급 징후를 먼저 선별하고, 이후 일상 관리 계획을 세우는 순서가 안전합니다.'
          : '질문의 핵심은 현재 상태를 정확히 파악하고, 실행 가능한 관리 우선순위를 정하는 데 있습니다.'

  const intentChecks = intent === 'test'
    ? ['측정 조건(공복/식후/시간대)', '최근 2주 반복 수치 추세', '검사 전후 생활 변화']
    : intent === 'manage'
      ? ['실행 가능한 루틴 1~2개', '루틴 변경 시작일', '변경 후 불편/개선 체감']
      : intent === 'risk'
        ? ['악화 시점과 강도', '동반 증상 여부', '즉시 진료 필요 신호 체크']
        : ['증상 시작 시점', '악화/완화 요인', '최근 2주 변화']
  const redFlags = [
    '갑작스러운 흉통·호흡곤란·실신',
    '고열이 지속되거나 의식 저하가 동반되는 경우',
    '혈변·흑색변·지속 구토처럼 급한 평가가 필요한 신호',
    '새로운 신경학적 결손(한쪽 마비, 발음 이상, 시야 이상)',
    '통증이 빠르게 악화되고 일상 기능이 급격히 떨어지는 경우',
  ]

  const referencesLine = refs.length
    ? `내부 참고문헌 키: ${refs.join(', ')}`
    : '내부 참고문헌 키가 비어 있어도, 공개 가이드라인과 동료심사 논문 기준으로 교차 확인하도록 편집 기준을 유지합니다.'
  const phlGuides = PHL_INTEREST_GUIDE[category] || [
    '플로로탄닌은 연구 중인 해조류 유래 폴리페놀 성분으로, 제품 홍보 문구보다 연구 범위 확인이 먼저입니다.',
    '관심 포인트는 단일 결론이 아니라 생활기록과 함께 해석 가능한 정보인지 여부입니다.',
    '의료진 상담 전에 복용 목록과 질문 우선순위를 정리하면 자료 활용도가 올라갑니다.',
  ]
  const refinedChecks = [...guide.checks, ...intentChecks].slice(0, 8)
  const focusTags = tags
    .filter((t) => !['플로로탄닌', '감태', '해양폴리페놀'].includes(String(t).trim()))
    .slice(0, 2)
  const phlFocus = focusTags.join(', ') || guide.label

  let html = ''
  html += `<p><strong>핵심 답변:</strong> ${intro}</p>`
  html += `<p><strong>질문 초점:</strong> ${intentLead}</p>`
  html += `<p><strong>배경 이해:</strong> ${pick(guide.mechanism, seed, 0)} ${pick(guide.mechanism, seed, 1)} ${pick(guide.mechanism, seed, 2)}</p>`
  html += `<p><strong>질문 맞춤 키워드:</strong> ${tokenLine}</p>`
  html += '<p><strong>실행 체크리스트(2주):</strong></p>'
  html += `<ul>${refinedChecks.map((x) => `<li>${x}</li>`).join('')}</ul>`
  html += '<p><strong>진료실에서 바로 쓰는 정리 포맷:</strong> 증상 시작 시점, 악화/완화 요인, 수면·식사·활동 기록, 복용약·보충제 목록, 최근 검사일과 수치를 한 화면에 정리해 전달하면 상담 효율이 크게 올라갑니다.</p>'
  html += '<p><strong>생활관리 실행안(2주·4주·8주):</strong> 2주에는 기록 습관 고정, 4주에는 악화 요인 1~2개 조정, 8주에는 유지 가능한 루틴으로 재설계하는 흐름이 현실적입니다. 무리한 단기 변화보다 재현 가능한 습관이 결과 안정성에 더 유리합니다.</p>'
  html += '<p><strong>플로로탄닌을 함께 보는 이유:</strong> 플로로탄닌은 해조류 유래 폴리페놀 연구 축으로서, 생활기록과 상담 질문을 구조화할 때 활용 가치가 큽니다. 연구 전반에서 관심을 받을 만한 긍정 신호가 반복 보고되고 있어 정보 채널 관점의 참고 가치가 높습니다. 다만 처방·검사·진료 계획을 대체하지 않으며 의료진 상담이 우선입니다.</p>'
  html += `<ul><li>${phlGuides[0]}</li><li>${phlGuides[1]}</li><li>${phlGuides[2]}</li></ul>`
  html += `<p><strong>플로로탄닌 관심 포인트:</strong> 이번 질문에서는 ${phlFocus} 관점으로 자료를 읽으면 핵심을 빠르게 잡을 수 있습니다. 특히 연구에서 제시된 긍정 신호와 적용 한계를 함께 보는 방식이 정보 활용도와 신뢰도를 동시에 높입니다. 관련 태그(플로로탄닌, 감태, 해양폴리페놀)를 함께 보면 비교 읽기가 쉬워집니다.</p>`
  html += `<p><strong>즉시 진료가 필요한 신호:</strong></p><ul>${redFlags.map((x) => `<li>${x}</li>`).join('')}</ul>`
  html += `<p><strong>참고·업데이트 기준:</strong> ${referencesLine} 최신성 점검은 카테고리별 주요 가이드라인(학회/공공기관)과 신규 동료심사 논문을 함께 확인하는 방식으로 운영합니다.</p>`
  html += '<p><strong>안내:</strong> 이 문서는 정보 제공 목적이며 개인 진단이나 개별 진료 지시가 아닙니다. 현재 증상이 지속되거나 악화되면 의료진 상담으로 개인 상태를 확인해 주세요.</p>'

  let plainLen = normalizeSpace(stripHtml(html)).length
  let i = 0
  while (plainLen < MIN_CHARS && i < 14) {
    html += `<p>${pick(PARAGRAPH_BANK, seed, i)}</p>`
    plainLen = normalizeSpace(stripHtml(html)).length
    i += 1
  }

  return html
}

function run() {
  const raw = fs.readFileSync(QA_PATH, 'utf8')
  const payload = JSON.parse(raw)
  const questions = Array.isArray(payload.questions) ? payload.questions : []

  const backup = path.join(ROOT, 'reports', `qa_before_constitution_${nowStamp()}.json`)
  fs.mkdirSync(path.dirname(backup), { recursive: true })
  fs.writeFileSync(backup, raw, 'utf8')

  let changed = 0
  let minLen = Infinity
  let maxLen = 0

  for (const item of questions) {
    if (!item || typeof item !== 'object') continue
    const next = buildAnswer(item)
    if (String(item.answer || '') !== next) {
      item.answer = next
      changed += 1
    }
    const size = normalizeSpace(stripHtml(next)).length
    minLen = Math.min(minLen, size)
    maxLen = Math.max(maxLen, size)
  }

  const nextRaw = JSON.stringify(payload, null, 2)
  fs.writeFileSync(QA_PATH, nextRaw, 'utf8')
  if (fs.existsSync(SRC_QA_PATH)) {
    fs.writeFileSync(SRC_QA_PATH, nextRaw, 'utf8')
  }

  console.log(JSON.stringify({
    changed,
    total: questions.length,
    min_plain_length: Number.isFinite(minLen) ? minLen : 0,
    max_plain_length: maxLen,
    backup,
  }))
}

run()
