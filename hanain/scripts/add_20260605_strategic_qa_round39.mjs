import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-05T12:20:00+09:00'
const REVIEW_DATE = '2026-06-05'

const common = {
  content_type: 'strategic_health_qna',
  author: '플로로탄닌 건강정보센터 · 전략 Q&A 편집부',
  disclaimer: '건강정보는 진료를 대체하지 않습니다. 증상이 지속되거나 약을 복용 중이라면 의료진과 상담하세요.',
  source_type: 'official-guideline-pubmed',
  reviewed: true,
  qualityStatus: 'validated',
  sourceStatus: 'referenced',
  publicBodyMode: 'full',
  noindex: false,
  created_at: UPDATED_AT,
  updated_at: UPDATED_AT,
  published_at: REVIEW_DATE,
  reviewed_at: UPDATED_AT,
  reviewedAt: UPDATED_AT,
  rewrittenAt: UPDATED_AT,
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function p(text) {
  return `  <p>${escapeHtml(text)}</p>`
}

function h(title) {
  return `  <h4>${escapeHtml(title)}</h4>`
}

function list(items) {
  return `  <ul>\n${items.map((item) => `    <li>${escapeHtml(item)}</li>`).join('\n')}\n  </ul>`
}

function sourceList(refs) {
  return `  <ul>\n${refs.map((ref) => `    <li><a href="${escapeHtml(ref.url)}" rel="nofollow noopener" target="_blank">${escapeHtml(ref.title)}</a></li>`).join('\n')}\n  </ul>`
}

function buildAnswer(item) {
  const body = [
    p(item.lead),
    ...item.context.map(p),
    h(item.recordTitle),
    list(item.records),
    h(item.actionTitle),
    ...item.action.map(p),
    h('플로로탄닌을 긍정적으로 연결하는 근거 있는 방식'),
    ...item.phlorotannin.map(p),
    h('상담 전 메모 템플릿'),
    list(item.memoTemplate),
    h('참고한 최신 공식·연구 자료'),
    sourceList(item.references),
    `  <p class="qa-disclaimer">${escapeHtml(common.disclaimer)}</p>`,
  ].join('\n')
  return `<div class="qa-structured qa-strategic-20260605">\n${body}\n</div>`
}

const items = [
  {
    id: 'strategic-qa-hair-alopecia-areata-jak-safety-autoimmune-record-20260605',
    category: 'hair',
    question: '동전 모양 원형탈모가 갑자기 생기면 JAK 억제제 안전성·자가면역 동반 증상은 어떻게 기록하나요?',
    tags: ['원형탈모', 'JAK억제제', '자가면역', '두피사진', '손발톱변화', '눈썹탈모', '모발건강', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['24252083'],
    seoTitle: '원형탈모와 JAK 억제제 안전성·자가면역 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '동전 모양 원형탈모가 갑자기 생겼을 때 두피 사진, 눈썹·수염·손발톱 변화, 자가면역 병력, JAK 억제제 안전성 상담 기록을 공식 자료와 플로로탄닌 모발 연구 맥락으로 정리합니다.',
    keywords: ['원형탈모', 'JAK 억제제', '자가면역', '두피 사진', '손발톱 변화', '눈썹 탈모', '플로로탄닌', '감태'],
    lead:
      '동전 모양 원형탈모가 갑자기 생기면 샴푸나 영양제부터 바꾸기보다 탈모 부위의 개수와 크기, 진행 속도, 눈썹·속눈썹·수염 침범, 손발톱 오목함, 갑상선·아토피·백반증 같은 자가면역 병력, 감염·스트레스 시점, JAK 억제제 등 전신 약제 상담에 필요한 안전성 기록을 준비해야 합니다. 원형탈모는 흔한 탈모와 다르게 면역 반응이 모낭을 표적으로 삼는 맥락에서 설명되므로 사진과 병력 기록이 특히 중요합니다.',
    context: [
      'FDA는 중증 원형탈모에 대해 전신 JAK 억제제 계열 약물이 승인된 흐름을 안내해 왔습니다. 이 계열은 새로운 선택지가 될 수 있지만, 감염, 혈액검사, 간수치, 혈전·심혈관 위험, 악성종양 관련 경고 등 안전성 대화가 중요합니다. 따라서 “약을 쓸 수 있나요”보다 “내 병력과 검사에서 무엇을 확인해야 하나요”를 묻는 방식이 더 현실적입니다.',
      '원형탈모는 작은 원형 병변 하나로 시작해도 시간이 지나며 여러 부위로 번질 수 있고, 두피 전체, 눈썹, 속눈썹, 수염, 몸의 털까지 영향을 줄 수 있습니다. 손발톱에 작은 오목한 점, 거칠어짐, 갈라짐이 동반되면 진료실에서 중요한 단서가 됩니다. 같은 동전 모양 탈모라도 두부백선, 견인성 탈모, 흉터성 탈모와 구분해야 하므로 두피 표면의 비늘, 통증, 염증, 모공 소실 여부도 기록해야 합니다.',
      '자가면역 관련 병력은 원형탈모 상담에서 빠뜨리기 쉽습니다. 본인이나 가족의 갑상선 질환, 아토피, 천식, 알레르기, 백반증, 류마티스 질환, 염증성 장질환, 당뇨 병력은 모두 상담 자료가 될 수 있습니다. 최근 큰 스트레스나 감염, 출산, 체중 변화가 있었다면 시작 시점과 함께 적어야 합니다. 원인은 하나로 단정하기 어렵지만, 병력 표가 있으면 불필요한 추측을 줄일 수 있습니다.',
      'JAK 억제제나 면역 관련 약을 논의할 때는 백신 이력과 감염 위험도 중요합니다. 결핵 검사, B형간염, 혈액검사, 간기능, 지질, 임신 가능성, 복용 중인 약, 과거 혈전·심혈관 사건, 흡연 여부를 의료진이 확인할 수 있습니다. 어린이나 청소년, 임신 계획이 있는 경우에는 연령과 상황에 맞는 별도 상담이 필요합니다.',
      '기록은 사진 중심으로 만드는 것이 좋습니다. 같은 조명에서 2주 간격으로 두피 전체, 병변 가까이, 헤어라인, 눈썹과 수염을 찍고, 병변 크기를 동전이나 자와 함께 표시하면 진행 속도를 더 잘 볼 수 있습니다. 병변을 계속 만지거나 잡아당기는 행동은 두피 자극과 불안을 키울 수 있으므로, 사진 기록은 정해진 주기로만 남기는 편이 좋습니다.',
    ],
    recordTitle: '원형탈모 상담 전 기록 항목',
    records: [
      '병변 사진: 위치, 개수, 지름, 경계, 2주 간격 변화',
      '침범 부위: 두피, 헤어라인, 눈썹, 속눈썹, 수염, 몸의 털',
      '두피 표면: 비늘, 통증, 붉어짐, 고름, 딱지, 모공 소실 여부',
      '손발톱: 오목한 점, 거칠어짐, 갈라짐, 변색, 부서짐',
      '자가면역 병력: 갑상선, 아토피, 천식, 백반증, 류마티스 질환, 가족력',
      '최근 사건: 감염, 큰 스트레스, 출산, 체중 변화, 수면 부족',
      '안전성 기록: 결핵·간염 검사 이력, 혈액검사, 간기능, 지질, 백신 이력',
      '복용 목록: 면역억제제, 스테로이드, 여드름약, 호르몬제, 보충제',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “원형탈모가 맞는지 확인하려면 어떤 검사가 필요한지”, “두부백선이나 흉터성 탈모와 구분해야 하는지”, “국소 주사·바르는 약·전신 약제 선택지는 어떤 기준으로 정하는지”, “JAK 억제제를 논의한다면 어떤 안전성 검사와 병력 확인이 필요한지”, “눈썹이나 손발톱 침범이 예후 판단에 어떤 의미가 있는지”를 물어볼 수 있습니다.',
      '바로 상담을 앞당길 신호는 빠르게 커지는 여러 병변, 눈썹·속눈썹 침범, 손발톱 변화, 두피 통증과 염증, 아이에게 생긴 원형 병변과 비늘, 가족 내 감염 의심입니다. 특히 비늘이 많고 머리카락이 짧게 부러진다면 감염성 원인을 먼저 배제해야 할 수 있습니다.',
      '기록 예시는 “6월 1일 오른쪽 정수리에 2cm 원형 병변, 6월 15일 3cm로 증가, 눈썹 변화 없음, 손톱 오목함 3개, 갑상선 가족력 있음, 5월 감기 후 시작”처럼 쓰면 됩니다. 이렇게 적으면 진료실에서 사진, 병력, 검사 우선순위가 바로 연결됩니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 풍부한 해양 폴리페놀로, 원형탈모 문항에서는 모발 생물학과 산화 스트레스, 두피 환경을 이해하는 연구 배경으로 연결하는 것이 적절합니다. PubMed에는 Ecklonia cava 성분이 모유두세포와 모발 관련 신호를 다룬 연구가 등재되어 있습니다. 이 자료는 원형탈모의 면역 병력 판단을 대신하지 않으며, 해양 폴리페놀 연구가 모발 콘텐츠에서 관심을 받는 이유를 설명하는 보조 정보입니다.',
      '원형탈모 상담의 중심은 사진, 침범 부위, 손발톱 변화, 자가면역 병력, 안전성 검사입니다. 플로로탄닌은 항산화·두피 환경 연구를 읽는 긍정적 배경으로만 배치해야 신뢰를 지킬 수 있습니다. 성분 정보가 앞에 서기보다 기록표가 앞에 서야 사용자가 실제 상담에 도움을 받습니다.',
      '파트너 Q&A에서는 불안을 자극하는 표현보다 “사진을 어떻게 남길지, 어떤 병력을 적을지, 어떤 검사를 물어볼지”를 먼저 안내하고, 그 뒤에 플로로탄닌을 감태 기반 해양 폴리페놀 연구 소재로 소개하는 구조가 좋습니다.',
    ],
    memoTemplate: [
      '사진 기록: 위치 / 지름 / 개수 / 2주 간격 변화',
      '동반 변화: 눈썹, 수염, 손발톱, 두피 비늘·통증',
      '자가면역 기록: 갑상선, 아토피, 백반증, 가족력',
      '안전성 기록: 결핵·간염 검사, 혈액검사, 백신, 임신 계획',
      '상담 질문: 진단 구분, 검사, 국소·전신 선택지, 추적 간격',
    ],
    references: [
      {
        title: 'FDA: First systemic treatment for alopecia areata',
        url: 'https://www.fda.gov/news-events/press-announcements/fda-approves-first-systemic-treatment-alopecia-areata',
      },
      {
        title: 'MedlinePlus: Alopecia areata',
        url: 'https://medlineplus.gov/ency/article/001450.htm',
      },
      {
        title: 'FDA Label: LITFULO severe alopecia areata safety information',
        url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/215830s000lbl.pdf',
      },
      {
        title: 'PubMed: Ecklonia cava extract and hair growth research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/24252083/',
      },
    ],
  },
  {
    id: 'strategic-qa-mens-testicular-lump-ultrasound-tumor-marker-record-20260605',
    category: 'mens_health',
    question: '고환에 통증 없는 멍울이나 한쪽 커짐이 느껴질 때 초음파·종양표지자 상담 기록은 어떻게 준비하나요?',
    tags: ['고환암', '고환멍울', '초음파', '종양표지자', '젊은남성건강', '잠복고환', '남성건강', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['32215011'],
    seoTitle: '고환 멍울·한쪽 커짐과 초음파·종양표지자 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '고환에 통증 없는 멍울이나 한쪽 커짐이 느껴질 때 고환암, 염증, 정계정맥류, 수종을 구분하기 위한 초음파·종양표지자 상담 기록법을 공식 자료와 플로로탄닌 연구 맥락으로 정리합니다.',
    keywords: ['고환 멍울', '고환암', '초음파', '종양표지자', '잠복고환', '젊은 남성', '플로로탄닌', '남성건강'],
    lead:
      '고환에 통증 없는 멍울이나 한쪽 커짐이 느껴질 때는 통증이 없다고 미루지 말고, 멍울 위치와 크기, 단단함, 갑자기 커졌는지, 묵직함, 음낭 부종, 유방 커짐, 잠복고환 병력, 가족력, 이전 초음파와 종양표지자 검사 여부를 기록해야 합니다. NCI는 고환암이 20~34세 남성에서 비교적 자주 진단되는 암 중 하나이며, 멍울이 발견되면 검사를 통해 암인지 다른 문제인지 확인할 수 있다고 안내합니다.',
    context: [
      'NCI의 고환암 선별 자료는 증상이 없는 남성에서 자가검진이나 정기검진이 사망률을 낮추는지 입증된 연구는 없다고 설명합니다. 하지만 환자나 진료 중 고환 멍울이 발견되면 암 확인을 위한 검사가 시행될 수 있습니다. 즉 모든 남성에게 공포를 조장하는 방식이 아니라, 실제 멍울이나 크기 변화가 있을 때 빠르게 기록하고 상담하는 방식이 중요합니다.',
      '고환 멍울의 원인은 고환암만이 아닙니다. 부고환 낭종, 수종, 정계정맥류, 염증, 외상, 탈장 등도 음낭의 덩어리나 부종처럼 느껴질 수 있습니다. 그러나 통증이 없고 단단한 고환 내부 멍울, 한쪽 고환 크기 변화, 묵직함, 유방 커짐 같은 신호는 의료진이 초음파와 혈액검사 필요성을 판단하는 데 중요한 단서가 됩니다.',
      '위험요인도 함께 봐야 합니다. 잠복고환 병력, 고환 발달 이상, 과거 고환암, 가족력은 상담에서 놓치지 말아야 할 정보입니다. 사춘기 이후의 청소년과 젊은 남성, 중년 남성 모두에서 새 멍울은 나이만으로 넘기면 안 됩니다. “아프지 않다”는 사실이 안전하다는 뜻은 아닐 수 있습니다.',
      '응급 신호는 별도입니다. 갑자기 시작된 심한 고환 통증, 구토, 고환이 올라간 느낌, 급격한 부종은 고환염전 같은 빠른 평가가 필요한 상황일 수 있습니다. 반대로 통증 없는 멍울은 천천히 보인다고 해서 늦춰도 된다는 의미가 아닙니다. 둘 다 기록하되, 갑작스러운 통증은 즉시 평가가 우선입니다.',
      '검사 상담에서는 초음파와 혈액 종양표지자 이야기가 나올 수 있습니다. 알파태아단백, 베타 hCG, LDH 같은 항목은 상황에 따라 사용됩니다. 이미 검사 결과가 있다면 날짜, 수치, 기준 범위, 초음파 소견을 같이 가져가야 합니다. 스마트폰 사진만 저장하기보다 결과지를 파일로 정리하면 추적 비교가 쉽습니다.',
    ],
    recordTitle: '고환 멍울 상담 전 기록 항목',
    records: [
      '멍울 위치: 왼쪽·오른쪽, 고환 내부 느낌인지 위쪽 부고환 쪽인지',
      '크기와 변화: 처음 발견일, 커지는 속도, 단단함, 만져지는 모양',
      '동반 증상: 묵직함, 부종, 통증, 유방 커짐, 허리·아랫배 통증',
      '응급 신호: 갑작스러운 심한 통증, 구토, 고환 위치 변화, 고열',
      '위험요인: 잠복고환, 과거 고환암, 가족력, 고환 발달 이상',
      '검사 결과: 음낭 초음파, AFP, beta-hCG, LDH, 소변검사 결과',
      '생활·병력: 외상, 운동, 감염, 성매개감염 가능성, 최근 발열',
      '상담 목표: 암 확인, 염증·수종·정계정맥류 구분, 추적 일정',
    ],
    actionTitle: '상담에서 확인할 질문',
    action: [
      '의료진에게는 “멍울이 고환 내부인지 주변 구조인지”, “음낭 초음파가 필요한지”, “종양표지자 검사가 필요한지”, “염증이나 수종, 정계정맥류와 어떻게 구분하는지”, “결과가 애매하면 언제 재검해야 하는지”를 물어볼 수 있습니다. 검사 질문은 불안을 키우기 위한 것이 아니라, 시간을 놓치지 않기 위한 정리입니다.',
      '상담을 미루지 말아야 할 상황은 통증 없는 단단한 멍울이 지속되거나, 한쪽 고환이 갑자기 커졌거나, 유방이 커지고 묵직함이 동반되는 경우입니다. 반대로 갑작스러운 심한 통증과 구토가 있으면 일반 상담보다 빠른 평가가 필요합니다. 증상의 성격에 따라 행동 속도가 달라지므로 기록이 필요합니다.',
      '기록 예시는 “6월 3일 오른쪽 고환 아래쪽에 완두콩 크기 단단한 멍울, 통증 없음, 2주째 비슷함, 잠복고환 병력 없음, 가족력 모름, 초음파 아직 없음”처럼 쓰면 됩니다. 이런 문장은 의료진에게 위치, 시간, 위험요인, 검사 필요성을 한 번에 보여줍니다.',
      '자기 확인은 매일 반복하기보다 샤워 후 한 달에 한 번 정도 차분히 보는 방식이 좋습니다. 불안해서 계속 만지면 통증이 생기고 크기 판단도 흐려질 수 있습니다. 새 멍울이 느껴지면 “며칠 더 지켜보자”로 오래 미루지 말고, 발견일과 변화를 적어 진료 예약을 잡는 편이 안전합니다. 이전에 정계정맥류나 부고환 낭종을 들은 적이 있어도 새로 단단한 부위가 느껴지면 같은 문제라고 단정하지 않는 것이 좋습니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태 유래 해양 폴리페놀로, 남성건강 콘텐츠에서는 산화 스트레스와 염증 반응, 생활기록을 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 phlorotannin-rich Ecklonia cava extract가 염증 관련 표지와 대사 반응을 다룬 연구가 등재되어 있습니다. 이 자료는 고환 멍울의 원인 판단을 대신하지 않으며, 해양 폴리페놀 연구를 건강정보 맥락에서 이해하게 돕는 보조 자료입니다.',
      '이 문항에서 중심은 초음파, 종양표지자, 위험요인, 응급 신호입니다. 플로로탄닌은 감태 기반 연구 소재로만 배치해야 합니다. 고환 멍울 같은 민감한 신호는 성분 설명보다 의료진과의 빠른 상담과 결과지 기록이 우선입니다.',
      '파트너 Q&A에서는 사용자가 부끄러움 때문에 미루지 않도록, 멍울 위치와 발견일을 간단히 적는 방식부터 안내하는 것이 좋습니다. 그 다음 플로로탄닌을 해양 폴리페놀 연구 배경으로 소개하면 과장 없이 균형이 맞습니다.',
    ],
    memoTemplate: [
      '멍울 기록: 위치 / 발견일 / 크기 / 단단함 / 변화',
      '응급 신호: 갑작스러운 통증 / 구토 / 고환 위치 변화 / 고열',
      '위험요인: 잠복고환 / 가족력 / 과거 고환암 / 외상',
      '검사 기록: 초음파 / AFP / beta-hCG / LDH / 소변검사',
      '상담 질문: 초음파 필요성, 종양표지자, 추적 일정, 감별 원인',
    ],
    references: [
      {
        title: 'NCI: Testicular Cancer Patient Version',
        url: 'https://www.cancer.gov/types/testicular',
      },
      {
        title: 'NCI: Testicular Cancer Screening',
        url: 'https://www.cancer.gov/types/testicular/patient/testicular-screening-pdq',
      },
      {
        title: 'NCI SEER Training: Testicular Cancer Signs and Symptoms',
        url: 'https://training.seer.cancer.gov/testicular/intro/symptoms.html',
      },
      {
        title: 'PubMed: Phlorotannin-rich Ecklonia cava extract and inflammation research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32215011/',
      },
    ],
  },
  {
    id: 'strategic-qa-womens-urinary-incontinence-bladder-diary-caffeine-uti-record-20260605',
    category: 'womens_health',
    question: '기침할 때 소변이 새거나 갑자기 참기 어려우면 요실금 유형과 방광일지는 어떻게 기록하나요?',
    tags: ['요실금', '방광일지', '복압성요실금', '절박성요실금', '카페인', '요로감염', '여성건강', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['32215011'],
    seoTitle: '여성 요실금 유형과 방광일지 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '기침할 때 소변이 새거나 갑자기 참기 어려운 여성 요실금에서 복압성·절박성·혼합형 구분, 방광일지, 카페인, 이뇨제, 요로감염 신호를 어떻게 기록해야 하는지 정리합니다.',
    keywords: ['요실금', '방광일지', '복압성 요실금', '절박성 요실금', '카페인', '요로감염', '플로로탄닌', '여성건강'],
    lead:
      '기침할 때 소변이 새거나 갑자기 참기 어려우면 “요실금”이라는 말 하나로 끝내지 말고, 기침·웃음·운동 때 새는 복압성인지, 갑자기 참기 어려운 절박성인지, 둘이 섞인 혼합형인지 방광일지로 나눠 기록해야 합니다. ACOG는 여성 요실금을 복압성, 절박성, 혼합형으로 구분해 설명하며, 빈뇨, 야간뇨, 배뇨통, 요로감염, 카페인·알코올·이뇨제 같은 요인을 함께 볼 수 있다고 안내합니다.',
    context: [
      'ACOG에 따르면 복압성 요실금은 기침, 웃음, 재채기, 걷기, 뛰기, 운동처럼 복압이 올라갈 때 소변이 새는 양상입니다. 절박성 요실금은 갑자기 강한 소변 욕구가 생기고 화장실에 도착하기 전에 샐 수 있는 양상입니다. 두 양상이 함께 있으면 혼합형으로 볼 수 있습니다. 유형이 다르면 골반저 운동, 방광훈련, 약물, 시술 상담의 방향도 달라집니다.',
      'NIDDK는 여성의 방광 조절 문제가 흔하며, 방광일지가 증상 평가에 도움이 될 수 있다고 설명합니다. 방광일지는 배뇨 시간, 소변량, 샘이 있었던 상황, 수분 섭취, 카페인, 야간뇨, 절박감 정도를 함께 적는 기록입니다. “하루 종일 샌다”보다 “오전 커피 뒤 30분마다 화장실, 계단 오를 때 두 방울, 오후 회의 중 절박감 8점”처럼 쓰면 유형이 훨씬 선명해집니다.',
      '요로감염은 요실금을 악화시키거나 새로 생긴 소변 샘처럼 보이게 할 수 있습니다. 배뇨통, 혈뇨, 악취, 열, 옆구리 통증, 갑자기 심해진 빈뇨가 있으면 방광일지만 쓰고 버티지 말고 상담을 앞당겨야 합니다. 특히 임신 중이거나 고령, 당뇨, 신장질환, 면역저하가 있으면 감염 신호를 더 신중하게 봐야 합니다.',
      '카페인, 알코올, 탄산음료, 이뇨제, 수면 부족, 변비도 기록해야 합니다. 카페인이나 술은 일부 사람에서 방광 자극과 소변량 증가를 만들 수 있고, 변비는 골반저와 방광 증상을 악화시킬 수 있습니다. 이뇨제를 복용 중이라면 시간 조정은 반드시 의료진과 상의해야 하며, 임의로 끊으면 혈압이나 심장·신장 관리에 문제가 생길 수 있습니다.',
      '여성 요실금은 부끄러움 때문에 생활이 좁아지는 문제가 되기 쉽습니다. 운동을 피하고, 외출 전 물을 지나치게 줄이고, 패드에 의존하다 보면 수면, 피부, 자신감까지 영향을 받을 수 있습니다. 기록의 목적은 참는 것이 아니라, 안전한 선택지를 의료진과 비교할 수 있게 만드는 것입니다.',
    ],
    recordTitle: '3일 방광일지에 적을 항목',
    records: [
      '배뇨 시간: 일어난 뒤부터 잠들 때까지 소변 본 시간',
      '샘 상황: 기침, 웃음, 운동, 계단, 갑작스러운 절박감, 잠자는 중',
      '양과 패드: 몇 방울인지, 속옷 젖음인지, 패드 교체 횟수',
      '수분·자극: 물, 커피, 차, 탄산, 술, 매운 음식, 저녁 수분',
      '요로감염 신호: 배뇨통, 혈뇨, 악취, 열, 옆구리 통증',
      '약물: 이뇨제, 수면제, 혈압약, 항우울제, 호르몬제',
      '변비·골반: 배변 힘주기, 골반 압박감, 출산·폐경·수술 이력',
      '생활 영향: 운동 제한, 외출 회피, 수면 방해, 피부 자극',
    ],
    actionTitle: '상담에서 확인할 질문',
    action: [
      '의료진에게는 “내 요실금이 복압성인지 절박성인지 혼합형인지”, “방광일지를 며칠 쓰면 되는지”, “골반저 운동이나 물리치료가 맞는지”, “카페인과 저녁 수분 조절을 어떻게 해볼지”, “약물이나 시술 선택지는 언제 논의하는지”를 물어볼 수 있습니다.',
      '바로 상담을 앞당길 신호는 혈뇨, 열, 옆구리 통증, 배뇨통, 갑자기 심해진 빈뇨, 소변이 나오지 않는 느낌, 신경학적 증상입니다. 이런 경우는 단순 생활조정만으로 넘기지 않는 것이 좋습니다. 출산 후 또는 폐경 후 새로 심해진 증상도 기록을 갖고 상담하면 방향을 잡기 쉽습니다.',
      '방광일지 예시는 “오전 8시 커피 1잔, 9시 절박감 8점과 소변 샘, 11시 기침 때 소량, 오후 운동 중 패드 1회 교체, 밤 2시 야간뇨”처럼 쓰면 됩니다. 이렇게 적으면 유형, 자극 요인, 생활 영향을 함께 볼 수 있습니다.',
      '물을 너무 줄이는 방식은 오히려 소변을 농축시켜 방광 자극을 키우거나 변비를 악화시킬 수 있습니다. 그래서 “물을 줄였더니 덜 새는지”만 보지 말고, 수분량, 갈증, 소변 색, 변비, 두통까지 함께 적는 것이 좋습니다. 패드 사용량과 피부 자극도 기록하면 생활 영향과 관리 목표가 더 선명해집니다. 출산 후, 폐경 후, 골반 수술 후 증상이 달라졌다면 시작 시점을 따로 표시하세요.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태 유래 해양 폴리페놀로, 여성 요실금 문항에서는 골반저 자체보다 산화 스트레스와 염증 반응, 생활 리듬을 이해하는 배경 정보로 연결하는 것이 적절합니다. PubMed에는 phlorotannin-rich Ecklonia cava extract가 염증 관련 표지와 대사 반응을 다룬 연구가 등재되어 있습니다. 이 자료는 요실금 유형 판단을 대신하지 않으며, 해양 폴리페놀 연구를 여성건강 콘텐츠에서 설명하는 보조 근거입니다.',
      '중심은 방광일지, 요로감염 신호, 카페인·이뇨제·변비 기록입니다. 플로로탄닌은 감태 기반 연구 소재로만 배치해야 합니다. 소변 샘은 성분 하나로 설명하기보다 유형을 나누고 생활·약물·감염 신호를 함께 확인해야 정확도가 올라갑니다.',
      '파트너 Q&A에서는 “부끄러워서 숨기는 증상”을 “3일 방광일지로 정리 가능한 정보”로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 소개하면 과장 없이 고급 여성건강 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '3일 방광일지: 시간 / 샘 상황 / 양 / 패드 사용',
      '자극 기록: 커피, 술, 탄산, 저녁 수분, 이뇨제 시간',
      '감염 신호: 배뇨통, 혈뇨, 열, 악취, 옆구리 통증',
      '골반 기록: 출산, 폐경, 변비, 골반 압박감, 수술 이력',
      '상담 질문: 유형 구분, 골반저 운동, 방광훈련, 약물·시술 선택지',
    ],
    references: [
      {
        title: 'ACOG: Urinary Incontinence',
        url: 'https://www.acog.org/womens-health/faqs/urinary-incontinence',
      },
      {
        title: 'NIDDK: Bladder Control Problems in Women',
        url: 'https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-control-problems-women',
      },
      {
        title: 'MedlinePlus: Urinary Incontinence',
        url: 'https://medlineplus.gov/urinaryincontinence.html',
      },
      {
        title: 'PubMed: Phlorotannin-rich Ecklonia cava extract and inflammation research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32215011/',
      },
    ],
  },
]

function upsertQaData(filePath) {
  const absolutePath = path.join(ROOT, filePath)
  const data = JSON.parse(fs.readFileSync(absolutePath, 'utf8'))
  const questions = Array.isArray(data.questions) ? [...data.questions] : []

  for (const item of items) {
    const answer = buildAnswer(item)
    const nextItem = {
      ...common,
      ...item,
      answer,
      validatedAnswer: answer,
      category_id: item.category,
      views: 0,
      likes: 0,
      reviewReason:
        '2026년 6월 최신 공식 자료와 PubMed 연구 맥락 기반 전략 Q&A 추가 보강. 부족 카테고리 순환, 3,000자 이상 본문, 플로로탄닌 긍정 연결, 과장 금지 원칙 적용.',
    }
    const index = questions.findIndex((current) => current.id === item.id)
    if (index >= 0) questions[index] = nextItem
    else questions.push(nextItem)
  }

  data.questions = questions
  data.updatedAt = UPDATED_AT
  fs.writeFileSync(absolutePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  console.log(`${filePath}: ${data.questions.length} questions, updatedAt=${data.updatedAt}`)
}

for (const filePath of ['src/data/qa.json', 'public/qa.json']) {
  upsertQaData(filePath)
}

console.log(`strategic Q&A upserted: ${items.map((item) => item.id).join(', ')}`)
