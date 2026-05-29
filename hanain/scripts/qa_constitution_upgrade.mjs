import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

if (process.env.ALLOW_LEGACY_QA_GENERATOR !== '1') {
  console.error('[blocked] qa_constitution_upgrade.mjs is disabled by site-wide content recall policy.')
  console.error('Use scripts/content_recall_rewrite_qa.mjs instead.')
  process.exit(1)
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const QA_PATH = path.join(ROOT, 'public', 'qa.json')
const SRC_QA_PATH = path.join(ROOT, 'src', 'data', 'qa.json')
const REPORT_DIR = path.join(ROOT, 'reports')
const MIN_CHARS = 2000

const STOPWORDS = new Set([
  '무엇', '뭔가요', '무슨', '왜', '어떻게', '방법', '차이', '기준', '정리', '필요', '좋은',
  '질문', '답변', '관련', '정보', '건강', '증상', '질환', '원인', '이유', '관리',
])

const SEOQ_LABELS = [
  '기본편', '핵심편', '실전편', '초보자편', '상세편',
  '검증편', '적용편', '점검편', '상담준비편', '한눈정리편', '확장편', '심화편',
]

const CATEGORY_GUIDE = {
  cardiovascular: {
    label: '심혈관',
    lens: '혈압 추세, 염분 섭취, 수면/활동 패턴',
    checks: ['아침/저녁 혈압', '주간 염분 섭취 패턴', '수면 시간과 중간 각성', '운동 강도와 빈도', '어지럼·두근거림 발생 시간'],
    context: [
      '심혈관 이슈는 하루 수치보다 같은 조건에서의 반복 추세가 더 중요합니다.',
      '혈압, 심박, 부종 체감은 식사와 수면의 영향을 함께 받기 때문에 단일 원인으로 단정하기 어렵습니다.',
    ],
  },
  neuro_cognitive: {
    label: '뇌·인지',
    lens: '수면 질, 집중 지속시간, 일상 기능 변화',
    checks: ['집중 저하 시작 시점', '수면 시간/중간 각성', '업무·학습 몰입 시간', '두통·어지럼 동반 여부', '최근 복용 성분 변화'],
    context: [
      '인지 관련 불편은 갑작스러운 결론보다 주간 단위의 변화를 보는 접근이 안전합니다.',
      '수면과 스트레스가 인지 체감에 크게 영향을 주므로 생활 기록이 해석 정확도를 높입니다.',
    ],
  },
  metabolism: {
    label: '대사질환',
    lens: '공복/식후 수치, 체중·허리둘레, 식사 리듬',
    checks: ['공복/식후 2시간 수치', '주간 체중·허리둘레', '식사 시간·양·간식', '수면 시간', '주 3회 이상 활동 기록'],
    context: [
      '대사 지표는 1회 측정값보다 2~8주 추세에서 의미가 더 분명해집니다.',
      '식사/수면/활동 변화가 수치 체감과 함께 움직이는지 같이 봐야 정보 해석 오류를 줄일 수 있습니다.',
    ],
  },
  digestive: {
    label: '소화·간',
    lens: '증상 발생 시간, 식사 패턴, 배변 패턴',
    checks: ['식후 악화 음식', '복부 불편 위치/강도', '배변 횟수·형태', '속쓰림·역류 발생 시점', '체중 변화'],
    context: [
      '소화·간 이슈는 증상 강도보다 악화 조건과 반복 빈도를 먼저 파악하는 것이 실무적입니다.',
      '같은 불편감도 식사 속도, 섬유소, 수분, 스트레스 조건에서 해석이 달라질 수 있습니다.',
    ],
  },
  musculoskeletal: {
    label: '근골격',
    lens: '통증 유발 동작, 회복 시간, 활동 범위',
    checks: ['통증 유발 동작', '아침 경직 시간', '부종·열감 여부', '보행 거리 변화', '회복 소요 시간'],
    context: [
      '근골격 질문은 통증 자체보다 어떤 동작에서 악화되는지 기록할수록 맞춤 조정이 쉬워집니다.',
      '운동량을 줄이기만 하기보다 통증 없는 범위에서 단계적으로 복귀하는 기준이 중요합니다.',
    ],
  },
  respiratory: {
    label: '호흡기',
    lens: '기침/가래 패턴, 야간 악화, 환경 노출',
    checks: ['기침 지속 기간', '야간 악화 여부', '가래 색·양 변화', '운동 시 호흡곤란', '실내 공기/흡연 노출'],
    context: [
      '호흡기 증상은 시간대와 환경 조건을 같이 봐야 원인 추정의 정확도가 올라갑니다.',
      '특히 야간 악화, 운동 시 악화 여부는 진료 우선순위를 정할 때 중요합니다.',
    ],
  },
  skin: {
    label: '피부',
    lens: '악화 트리거, 수면/스트레스, 제품 사용 패턴',
    checks: ['악화 시점 제품/음식', '가려움 강도와 시간대', '수면 방해 여부', '새 제품 사용 시작일', '주간 사진 기록'],
    context: [
      '피부 이슈는 단일 제품 효과보다 악화 요인 제거와 생활 리듬 조정에서 실익이 큰 경우가 많습니다.',
      '주간 사진 기록이 있으면 체감 편향을 줄이고 상담 정확도를 높일 수 있습니다.',
    ],
  },
  hair: {
    label: '모발',
    lens: '탈모 시작 시점, 두피 상태, 생활 스트레스',
    checks: ['탈모 시작 시점', '두피 가려움/각질', '체중 변화', '수면 시간', '가족력 여부'],
    context: [
      '모발 질문은 빠른 결론보다 4~8주 추세 확인이 실제 의사결정에 더 유리합니다.',
      '영양·수면·스트레스 축을 같이 정리하면 정보 과잉을 줄이고 상담 포인트가 명확해집니다.',
    ],
  },
  mental_health: {
    label: '정신건강',
    lens: '기분 추세, 수면 질, 일상 기능 변화',
    checks: ['기분 점수(0~10)', '수면 시간/질', '식사·활동 변화', '업무·학습 집중 시간', '위기 신호 유무'],
    context: [
      '정신건강 질문은 하루 기분보다 주간 추세를 기록하는 편이 안전하고 정확합니다.',
      '신체 리듬(수면·식사·활동)과 함께 봐야 과도한 단정과 정보 오판을 줄일 수 있습니다.',
    ],
  },
  infection_inflammation: {
    label: '감염·염증',
    lens: '발열 패턴, 통증 위치, 동반 증상',
    checks: ['체온 변화와 시간대', '통증·부종 위치', '호흡기/소화기 동반 증상', '기저질환·복용약', '최근 노출력'],
    context: [
      '감염·염증 맥락에서는 응급 신호 선별이 모든 정보 해석보다 우선입니다.',
      '수치 해석은 단일 값보다 반복 검사 추세와 임상 증상을 함께 봐야 정확합니다.',
    ],
  },
  womens_health: {
    label: '여성건강',
    lens: '주기 변화, 통증 패턴, 수면/스트레스',
    checks: ['주기 길이 변화', '출혈 양상', '통증 강도·부위', '수면/스트레스 변화', '복용 성분 목록'],
    context: [
      '여성건강 질문은 주기 기록과 증상 일지를 같이 볼 때 판단 정확도가 높아집니다.',
      '강한 홍보 문구보다 기간·조건·동반 증상 기준으로 정보를 읽는 방식이 안전합니다.',
    ],
  },
  mens_health: {
    label: '남성건강',
    lens: '배뇨/수면 패턴, 활동량, 카페인/수분 습관',
    checks: ['야간 각성 횟수', '수분·카페인 섭취 시간', '배뇨 증상 시간대', '혈압·혈당 기록', '체중·허리둘레 변화'],
    context: [
      '남성건강 질문은 체감 증상만으로 결론 내리기보다 생활 패턴 기록이 우선입니다.',
      '수면과 스트레스가 함께 작동하므로 하나의 성분만 강조하는 접근은 오해를 만들 수 있습니다.',
    ],
  },
  cancer_immune: {
    label: '항암·면역',
    lens: '치료 일정, 체력 추세, 감염 위험 신호',
    checks: ['최근 진료 일정', '체중/식사량 변화', '피로·수면 질', '발열·감염 신호', '현재 복용 성분 목록'],
    context: [
      '항암·면역 관심층은 어떤 성분이든 치료 계획과 충돌 가능성 점검이 우선입니다.',
      '정보는 치료 대체가 아니라 상담 준비 자료로 활용할 때 가장 안전하고 실용적입니다.',
    ],
  },
}

const DEFAULT_GUIDE = {
  label: '건강',
  lens: '증상 추세, 생활 리듬, 검사 기록',
  checks: ['증상 시작 시점', '악화·완화 조건', '수면·식사 패턴', '복용 성분 목록', '최근 검사 결과'],
  context: [
    '건강 질문은 단발성 체감보다 반복 가능한 기록 기반 해석이 안전합니다.',
    '생활 리듬과 검사 추세를 함께 볼 때 정보 선택의 정확도가 높아집니다.',
  ],
}

const RED_FLAGS = [
  '갑작스러운 흉통·호흡곤란·실신',
  '고열이 지속되거나 의식 저하가 동반되는 경우',
  '혈변·흑색변·지속 구토처럼 즉시 평가가 필요한 신호',
  '신경학적 결손(한쪽 마비, 발음 이상, 시야 이상)',
  '통증이 급격히 악화되어 일상 기능이 급감한 경우',
]

const BASE_PARAGRAPHS = [
  '검색으로 얻은 정보는 방향을 잡는 데 유용하지만, 개인 병력·복용약·검사 맥락과 맞지 않으면 오해가 생길 수 있습니다.',
  '정답을 한 번에 찾기보다 1~2주 기록-점검-조정 루프를 돌리는 방식이 실제 생활 적용에 훨씬 강합니다.',
  '같은 키워드라도 연구 대상, 기간, 측정 지표가 다르면 결론 해석이 달라집니다. 제목보다 본문의 조건을 먼저 확인하세요.',
  '상담 전 질문 2~3개를 정리해 가면 진료실에서 필요한 설명을 더 구체적으로 받을 수 있습니다.',
  '보조 성분 정보는 생활관리와 의료진 상담을 보완할 때 의미가 큽니다. 생활 리듬이 흔들리면 어떤 정보도 체감이 불안정해집니다.',
  '성분 비교 글을 읽을 때는 “무엇이 더 좋다”보다 “무엇을 어떤 목적으로 측정했는가”를 먼저 보는 습관이 중요합니다.',
  '같은 성분명이라도 추출 방식, 표준화 지표, 함량 표기가 다르면 연구 해석과 실제 선택 기준이 달라질 수 있습니다.',
  '태그 페이지를 볼 때는 조회 수보다 최근 업데이트 시점과 연결된 참고 글의 질을 함께 확인하는 편이 유리합니다.',
  '기록은 길게 쓸 필요가 없습니다. 날짜, 시간, 식사, 수면, 증상 강도만 일정하게 남겨도 해석 품질이 크게 올라갑니다.',
  '과장 문구는 대개 조건이 생략되어 있습니다. 대상군, 제외 기준, 관찰 기간이 빠졌는지 먼저 확인하세요.',
  '생활관리에서 가장 먼저 고정할 항목은 수면 시작 시간과 아침 기상 시간입니다. 리듬이 맞아야 다른 조정도 효과를 보기 쉽습니다.',
  '식사 조정은 “완벽한 식단”보다 “유지 가능한 식단”이 실제 결과를 만듭니다. 유지 가능성이 가장 중요한 품질 기준입니다.',
  '운동은 강도보다 빈도가 먼저입니다. 무리한 강도보다 주당 실행 횟수를 안정화하는 편이 체감과 안전성 모두에 유리합니다.',
  '복용 성분이 여러 개인 경우 한 번에 바꾸지 말고, 변경 간격을 두어야 어떤 변화가 무엇 때문인지 해석할 수 있습니다.',
  '검색 상위 결과라도 최신성 검토가 필요합니다. 발행일과 업데이트일, 참고 문헌 연도를 함께 확인하면 오류를 줄일 수 있습니다.',
  '증상이 좋아졌다 나빠지는 파동이 있으면 평균값만 보지 말고 변동폭을 함께 기록하세요. 변동폭은 상담에서 매우 중요한 단서입니다.',
  '“천연”이라는 표현은 안전성의 보증이 아닙니다. 개인 병력과 병용약 여부를 먼저 확인하는 접근이 현실적입니다.',
  '논문이 있다는 사실과 내 상황에 맞는 근거라는 사실은 다릅니다. 적용 가능성은 대상군 유사성에서 결정됩니다.',
  '정보를 읽을 때 결론 문장만 보지 말고 한계 문단을 확인하세요. 한계 문단이 실제 적용 범위를 가장 정확히 설명합니다.',
  '보호자와 함께 정보를 정리한다면 질문지를 공유해 같은 기준으로 관찰하세요. 기록 기준이 통일되면 상담 효율이 높아집니다.',
  '검사 결과 해석은 단일 이상치보다 추세가 우선입니다. 재검 타이밍과 검사 전후 생활 변화까지 함께 적어두세요.',
  '성분명과 브랜드명을 섞어 쓰면 검색 정확도가 떨어집니다. 성분명 중심으로 정리하면 자료 비교가 훨씬 쉬워집니다.',
  '정보 탐색의 목표를 “정답 찾기”에서 “현재 상태 점검”으로 바꾸면 과도한 기대와 불안 모두를 줄일 수 있습니다.',
  '불편 증상이 있을 때는 완화 요인도 함께 기록해야 합니다. 악화 요인만 적으면 관리 전략이 편향될 수 있습니다.',
  '한 번에 많은 정보를 적용하기보다 우선순위 1~2개만 선택하면 실행률이 높아지고 결과 해석도 쉬워집니다.',
]

const PHL_PARAGRAPHS = [
  '플로로탄닌은 해조류 유래 폴리페놀 연구에서 항산화·염증 조절 관련 긍정 신호가 반복 보고된 성분입니다. 그래서 정보 채널 관점에서 충분히 매력적인 주제입니다.',
  '매력 포인트는 과장이 아니라 근거 읽기입니다. 연구 대상, 용량, 기간, 평가 지표를 같이 보면 “왜 주목받는지”를 훨씬 명확하게 이해할 수 있습니다.',
  '특히 감태추출물, 씨놀, 디에콜, 에콜처럼 이름이 다양한 축에서는 성분명과 제품명, 연구 데이터와 광고 문구를 분리해서 보는 습관이 신뢰도를 높입니다.',
  '이 사이트에서는 플로로탄닌을 단일 해법이 아니라 생활관리와 상담 준비를 도와주는 고급 참고 정보로 다룹니다. 이 관점이 장기적으로 가장 현실적이고 안전합니다.',
]

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

function detectIntent(question) {
  const q = String(question || '')
  if (/(차이|비교|vs|대비)/i.test(q)) return 'compare'
  if (/(검사|수치|진단|정상|결과|지표)/.test(q)) return 'test'
  if (/(원인|이유|왜|발생)/.test(q)) return 'cause'
  if (/(관리|방법|어떻게|식단|운동|생활|루틴|기록)/.test(q)) return 'manage'
  if (/(위험|경고|응급|신호|심각|악화)/.test(q)) return 'risk'
  return 'general'
}

function getTokens(question, tags = []) {
  const base = `${question} ${Array.isArray(tags) ? tags.join(' ') : ''}`
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .map((w) => w.replace(/(은|는|이|가|을|를|과|와|의|에|도|만|차이|차이는|인가요|나요|까요)$/g, ''))
    .filter((w) => w.length >= 2 && !STOPWORDS.has(w))
  return [...new Set(base)].slice(0, 8)
}

function parseComparePair(question) {
  const m = String(question || '').match(/(.+?)(?:와|과)\s*(.+?)의\s*차이/)
  if (!m) return null
  const left = normalizeSpace(m[1]).slice(-20)
  const right = normalizeSpace(m[2]).slice(0, 20)
  if (!left || !right) return null
  return { left, right }
}

function normalizeQuestion(item) {
  let q = normalizeSpace(item.question || '')
  q = q.replace(/\s*[\(\[]\d{1,3}[\)\]]\s*$/, '')
  q = q.replace(/\s*-\s*(기본편|핵심편|실전편|초보자편|상세편|검증편|적용편|점검편|상담준비편|한눈정리편|확장편|심화편)\s*$/, '')
  if (q && !/[?？]$/.test(q)) q += '?'

  const id = String(item.id || '')
  const seo = id.match(/^seoqa-[a-z_]+-(\d+)$/)
  if (seo) {
    const idx = Number(seo[1] || '1')
    const label = SEOQ_LABELS[(idx - 1) % SEOQ_LABELS.length]
    q = `${q.replace(/[?？]$/, '?')} - ${label}`
  }
  return q
}

function introByIntent(question, intent, pair) {
  if (intent === 'compare' && pair) {
    return `${pair.left}/${pair.right} 관련 질문은 같은 주제로 묶이기 쉬워도 적용 기준과 확인 포인트가 다릅니다. 이 질문에서는 차이를 단정하기보다 어떤 상황에서 무엇을 먼저 확인해야 하는지부터 잡는 게 정확합니다.`
  }
  if (intent === 'test') {
    return `${question}에 답할 때는 한 번의 숫자보다 같은 조건에서 반복된 추세를 먼저 봐야 합니다. 검사값은 측정 조건에 따라 크게 달라질 수 있기 때문입니다.`
  }
  if (intent === 'cause') {
    return `${question}처럼 원인을 묻는 질문은 하나의 이유로 단정하지 않는 것이 핵심입니다. 생활 패턴, 기저질환, 복용 성분이 동시에 작용할 가능성을 같이 보셔야 정확도가 올라갑니다.`
  }
  if (intent === 'manage') {
    return `${question}에 대한 실전 답은 거창한 계획보다 지속 가능한 작은 루틴부터 정하는 것입니다. 기록 가능한 방식으로 시작하면 조정이 쉬워지고 실제 체감도 빨라집니다.`
  }
  if (intent === 'risk') {
    return `${question}과 같이 위험도를 묻는 경우에는 관리 팁보다 먼저 응급 신호를 선별해야 합니다. 안전 구간을 확인한 뒤에야 생활관리 판단이 의미를 갖습니다.`
  }
  return `${question}에 답할 때 가장 중요한 기준은 지금 상태를 기록으로 확인하고, 해석 범위를 과장하지 않는 것입니다.`
}

function intentParagraph(intent, guide) {
  if (intent === 'compare') return `비교형 질문은 우열을 고르는 방식보다 ${guide.lens}처럼 관찰 기준을 맞춰서 읽는 편이 오해를 줄입니다.`
  if (intent === 'test') return `검사·수치형 질문은 같은 시간대, 같은 조건에서 재측정된 데이터가 있어야 해석 신뢰도가 올라갑니다.`
  if (intent === 'cause') return `원인형 질문은 “무엇이 달라졌는가”를 시간순으로 정리하면 답이 빨라집니다. 시작 시점과 악화 계기를 함께 적어두세요.`
  if (intent === 'manage') return `관리형 질문은 실천률이 핵심이라서, 1~2개 루틴만 먼저 고정하고 일주일 뒤 조정하는 방식이 가장 효율적입니다.`
  if (intent === 'risk') return `위험형 질문에서는 증상 강도뿐 아니라 지속 시간과 동반 증상 여부가 우선 지표입니다.`
  return `${guide.label} 영역에서는 단발성 체감보다 주간 추세 기록이 의사결정에 더 도움이 됩니다.`
}

function buildChecks(guide, tokens, intent) {
  const keywordChecks = tokens.slice(0, 3).map((t) => `${t} 관련 변화 시점`)
  const intentChecks = intent === 'test'
    ? ['측정 시간대 통일', '재측정 간격(최소 1~2주)', '검사 전후 생활 변화']
    : intent === 'manage'
      ? ['오늘 바로 시작할 루틴 1개', '루틴 실행 시간 고정', '일주일 후 조정 기준']
      : intent === 'risk'
        ? ['급격한 악화 여부', '동반 증상 발생 여부', '즉시 진료 필요 신호']
        : ['증상 시작 시점', '악화·완화 요인', '최근 생활 변화']
  return [...guide.checks, ...keywordChecks, ...intentChecks].slice(0, 8)
}

function buildAnswer(item) {
  const id = String(item.id || '')
  const seed = hash(id || String(item.question || ''))
  const question = normalizeQuestion(item)
  const category = item.category || ''
  const guide = CATEGORY_GUIDE[category] || DEFAULT_GUIDE
  const intent = detectIntent(question)
  const tags = Array.isArray(item.tags) ? item.tags.slice(0, 8) : []
  const tokens = getTokens(question, tags)
  const refs = Array.isArray(item.references_pmid) ? item.references_pmid.slice(0, 8) : []
  const pair = parseComparePair(question)

  const intro = introByIntent(question, intent, pair)

  const checks = buildChecks(guide, tokens, intent)
  const focusWords = tokens.slice(0, 3).join(', ')
  const referencesLine = refs.length
    ? `참고 문헌 ID는 ${refs.join(', ')} 입니다. 문헌 제목만 보지 말고 대상·기간·평가 지표까지 함께 확인하세요.`
    : '문헌 ID가 비어 있는 항목은 공신력 있는 가이드라인/학술 자료로 교차 확인하는 습관이 안전합니다.'

  let html = ''
  html += `<p>${intro}</p>`
  html += `<p>${intentParagraph(intent, guide)}</p>`
  html += `<p>${pick(guide.context, seed, 0)} ${pick(guide.context, seed, 1)}</p>`
  html += `<p>실제로 도움이 되도록 아래 항목을 1~2주만 기록해 보세요. 기록이 있으면 상담 정확도가 확실히 올라갑니다.</p>`
  html += `<ul>${checks.map((x) => `<li>${x}</li>`).join('')}</ul>`
  html += `<p>이번 질문의 핵심 키워드는 ${focusWords || guide.label} 입니다. 키워드별로 “언제 시작됐는지, 무엇과 함께 악화되는지”를 적어두면 다음 판단이 훨씬 쉬워집니다.</p>`
  html += `<p>${pick(PHL_PARAGRAPHS, seed, 0)} ${pick(PHL_PARAGRAPHS, seed, 1)}</p>`
  html += `<p>${pick(PHL_PARAGRAPHS, seed, 2)} ${pick(PHL_PARAGRAPHS, seed, 3)}</p>`
  html += '<p>즉, 플로로탄닌 정보는 단순 홍보 문구보다 연구 근거를 읽고 내 상황에 맞게 해석할 때 가치가 커집니다.</p>'
  html += '<p>다만 급격한 악화나 응급 신호가 보이면 온라인 정보보다 진료가 먼저입니다.</p>'
  html += `<ul>${RED_FLAGS.map((x) => `<li>${x}</li>`).join('')}</ul>`
  html += `<p>${referencesLine}</p>`
  html += '<p>이 내용은 건강정보 제공 목적이며, 개인 진단·치료를 대신하지 않습니다. 상태가 지속되거나 악화되면 의료진 상담을 우선하세요.</p>'

  let plainLen = normalizeSpace(stripHtml(html)).length
  let i = 0
  while (plainLen < MIN_CHARS && i < 20) {
    const extra = pick(BASE_PARAGRAPHS, seed, i)
    html += `<p>${extra}</p>`
    plainLen = normalizeSpace(stripHtml(html)).length
    i += 1
  }

  item.question = question
  return html
}

function run() {
  const raw = fs.readFileSync(QA_PATH, 'utf8')
  const payload = JSON.parse(raw)
  const questions = Array.isArray(payload.questions) ? payload.questions : []

  fs.mkdirSync(REPORT_DIR, { recursive: true })
  const backup = path.join(REPORT_DIR, `qa_before_constitution_${nowStamp()}.json`)
  fs.writeFileSync(backup, raw, 'utf8')

  let changed = 0
  let minLen = Infinity
  let maxLen = 0
  let questionTouched = 0

  for (const item of questions) {
    if (!item || typeof item !== 'object') continue
    const beforeQuestion = String(item.question || '')
    const beforeAnswer = String(item.answer || '')
    const next = buildAnswer(item)
    item.answer = next
    if (item.question !== beforeQuestion) questionTouched += 1
    if (beforeAnswer !== next || item.question !== beforeQuestion) changed += 1

    const size = normalizeSpace(stripHtml(next)).length
    minLen = Math.min(minLen, size)
    maxLen = Math.max(maxLen, size)
  }

  const nextRaw = JSON.stringify(payload, null, 2)
  fs.writeFileSync(QA_PATH, nextRaw, 'utf8')
  if (fs.existsSync(SRC_QA_PATH)) fs.writeFileSync(SRC_QA_PATH, nextRaw, 'utf8')

  console.log(JSON.stringify({
    changed,
    questions_touched: questionTouched,
    total: questions.length,
    min_plain_length: Number.isFinite(minLen) ? minLen : 0,
    max_plain_length: maxLen,
    backup,
  }))
}

run()
