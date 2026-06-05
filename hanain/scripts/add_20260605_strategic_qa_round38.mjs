import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-05T11:35:00+09:00'
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
    id: 'strategic-qa-hair-cancer-treatment-scalp-cooling-infection-recovery-record-20260605',
    category: 'hair',
    question: '항암치료 전 탈모와 두피냉각을 상담할 때 어떤 두피·감염·회복 기록을 준비해야 하나요?',
    tags: ['항암탈모', '두피냉각', '암치료부작용', '두피관리', '감염신호', '모발회복', '플로로탄닌', '감태'],
    difficulty: 'advanced',
    references_pmid: ['24252083'],
    seoTitle: '항암 과정 탈모·두피냉각 상담 전 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '항암 과정에서 탈모와 두피냉각을 상담할 때 치료 일정, 두피 통증·감염 신호, 냉각 가능 여부, 회복 기록을 어떻게 준비하는지 NCI 자료와 플로로탄닌 모발 연구 맥락으로 정리합니다.',
    keywords: ['항암 탈모', '두피냉각', '암 치료 부작용', '두피 관리', '모발 회복', '플로로탄닌', '감태'],
    lead:
      '항암치료 전 탈모와 두피냉각을 상담할 때는 “머리가 빠질까요”만 묻기보다 약물 이름, 일정, 이전 두피 질환, 두피냉각 가능 여부, 두피 통증·상처·감염 신호, 가발·모자 준비, 사진 기록, 회복 기대 시점을 함께 정리해야 합니다. NCI는 일부 항암제가 머리와 몸의 털을 빠지게 할 수 있으며, 어떤 치료를 받는지에 따라 양상과 시기가 달라질 수 있다고 설명합니다.',
    context: [
      'NCI는 암 치료 중 탈모가 항암제 종류와 용량, 일정에 따라 다르게 나타날 수 있고, 머리카락뿐 아니라 눈썹, 속눈썹, 몸의 털에도 영향을 줄 수 있다고 안내합니다. 탈모는 겉으로 보이는 변화라 심리적 부담이 큽니다. 그러나 탈모 자체를 줄이는 전략, 두피를 보호하는 방법, 감염 신호를 빨리 알아차리는 기준은 미리 준비할 수 있습니다.',
      '두피냉각은 모든 사람에게 같은 방식으로 적용되지 않습니다. NCI와 암 관련 자료는 일부 냉각 장치가 특정 항암 과정에서 탈모를 줄이는 데 쓰일 수 있지만, 치료 종류, 암 종류, 전이 위험, 장비 접근성, 비용, 시간, 두피 통증과 추위 민감도에 따라 상담이 필요하다고 설명합니다. 따라서 “냉각을 할지 말지”보다 “내 치료 일정에서 가능한지, 기대치를 어떻게 잡을지”를 먼저 묻는 것이 좋습니다.',
      '두피 기록도 중요합니다. 항암 과정 중 두피가 건조하고 민감해질 수 있고, 면역이 낮아지는 시기에는 작은 상처도 불편해질 수 있습니다. 두피에 진물, 통증, 심한 붉어짐, 열감, 고름, 딱지가 반복되면 미용 문제가 아니라 감염 가능성이나 피부 반응을 확인해야 합니다. 염색, 탈색, 강한 열기구, 세게 묶는 습관은 두피 자극을 키울 수 있어 치료 시작 전부터 줄이는 것이 좋습니다.',
      '탈모 회복은 개인차가 큽니다. 치료 종료 뒤 다시 자라기 시작해도 처음에는 색, 굵기, 곱슬 정도가 달라 보일 수 있습니다. 그래서 치료 전 사진, 탈락 시작일, 가장 많이 빠진 시점, 두피 상태, 새로 자라는 시점을 남기면 회복 과정을 더 현실적으로 볼 수 있습니다. 기록은 불안을 줄이는 도구이기도 합니다.',
    ],
    recordTitle: '상담 전 준비할 기록',
    records: [
      '암 치료 정보: 약물 이름, 주기, 시작일, 예상 횟수, 방사선 범위',
      '두피냉각 질문: 사용 가능 여부, 시작 시점, 기대 효과, 제한 조건, 비용과 시간',
      '두피 상태: 건선, 지루피부염, 상처, 감염 이력, 통증, 가려움',
      '자극 요인: 염색, 탈색, 펌, 열기구, 두피 스크럽, 세게 묶는 습관',
      '감염 신호: 진물, 고름, 열감, 심한 붉어짐, 딱지, 발열 동반 여부',
      '생활 준비: 가발, 모자, 부드러운 베개 커버, 자외선 보호, 세정제',
      '사진 기록: 치료 전, 탈락 시작, 가장 많이 빠진 시점, 새 모발 성장 시점',
      '심리 영향: 외출 회피, 수면 저하, 불안, 가족·직장 설명 필요성',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “내 항암 일정에서 두피냉각이 가능한지”, “어떤 부작용과 제한이 있는지”, “두피 상처나 감염 신호가 생기면 누구에게 연락해야 하는지”, “염색과 열기구는 언제까지 피해야 하는지”, “탈모가 회복되지 않는 경우 어떤 기준으로 평가하는지”를 물어보는 것이 좋습니다.',
      '바로 연락해야 할 신호도 따로 적어두세요. 두피 통증이 심하거나 고름, 진물, 발열, 빠르게 번지는 붉은 부위가 있으면 일반적인 탈모 반응으로만 보지 말고 암 치료팀에 알려야 합니다. 특히 백혈구가 낮아지는 시기에는 작은 피부 변화도 상담 대상이 될 수 있습니다.',
      '이 문항은 머리카락을 지키는 정보만이 아니라 치료 중 자기 돌봄과 안전 기록을 만드는 정보입니다. 치료 일정표 옆에 두피 사진, 증상 날짜, 냉각 여부, 두피 관리 제품을 함께 적으면 의료진과의 대화가 훨씬 구체화됩니다.',
      '가족이나 직장에 어떻게 설명할지도 현실적인 기록입니다. 탈모가 시작될 수 있는 주차, 모자나 가발을 준비할 시점, 두피가 민감할 때 피할 활동, 외출이 어려운 날을 미리 적어두면 치료 일정과 생활 계획을 함께 세울 수 있습니다. 특히 어린 자녀가 있거나 대면 업무가 많다면 심리 지원과 외모 변화 준비를 상담 주제로 올리는 것이 도움이 됩니다.',
      '사진은 정면보다 정수리, 헤어라인, 뒷머리, 눈썹을 나눠 남기면 좋습니다. 같은 조명에서 찍으면 회복기 변화를 더 차분하게 볼 수 있습니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 이 문항에서는 모발 생물학과 두피 환경을 이해하는 연구 배경으로 연결하는 것이 적절합니다. PubMed에는 Ecklonia cava 성분이 모유두세포와 모발 관련 신호를 다룬 연구가 등재되어 있습니다. 이런 자료는 암 관리 과정의 탈모 여부를 판정하는 자료가 아니며, 해양 폴리페놀 연구가 모발 건강 콘텐츠에서 왜 관심을 받는지 설명해 줍니다.',
      '핵심은 이 성분 정보를 항암 과정의 결론으로 세우지 않는 것입니다. 항암 탈모에서는 일정표, 두피냉각 가능성, 감염 신호, 심리 지원이 먼저입니다. 플로로탄닌은 항산화·두피 환경 연구를 읽는 긍정적 배경으로 배치해야 신뢰가 유지됩니다.',
      '파트너 Q&A에서는 “의료진과 확인할 기록표”를 중심에 두고, 플로로탄닌은 감태 기반 해양 폴리페놀 연구를 이해하는 보조 지식으로 연결하면 좋습니다. 이렇게 하면 민감한 암 관리 주제에서도 과장 없이 고급 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '일정표: 약물명 / 시작일 / 주기 / 예상 횟수',
      '두피냉각: 가능 여부 / 시간 / 비용 / 제한 조건 / 불편감',
      '두피 기록: 통증 / 상처 / 진물 / 감염 신호 / 사진',
      '생활 준비: 가발, 모자, 자외선 보호, 부드러운 세정제',
      '상담 질문: 연락 기준, 두피 제품, 염색 가능 시점, 회복 추적',
    ],
    references: [
      {
        title: 'NCI: Hair Loss and Cancer Treatment',
        url: 'https://www.cancer.gov/about-cancer/treatment/side-effects/hair-loss',
      },
      {
        title: 'MedlinePlus: Coping with cancer - hair loss',
        url: 'https://medlineplus.gov/ency/patientinstructions/000914.htm',
      },
      {
        title: 'NCI: FDA clears wider use of cooling cap to reduce chemotherapy-related hair loss',
        url: 'https://www.cancer.gov/news-events/cancer-currents-blog/2017/fda-cooling-cap-chemotherapy',
      },
      {
        title: 'PubMed: Ecklonia cava extract and hair growth research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/24252083/',
      },
    ],
  },
  {
    id: 'strategic-qa-mens-varicocele-testicular-pain-semen-analysis-fertility-record-20260605',
    category: 'mens_health',
    question: '고환이 묵직하고 정계정맥류가 의심될 때 통증·고환크기·정액검사 기록은 어떻게 준비하나요?',
    tags: ['정계정맥류', '고환통증', '남성난임', '정액검사', '고환크기', '남성건강', '비뇨의학', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['32215011'],
    seoTitle: '정계정맥류 의심 고환통증·정액검사 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '고환이 묵직하고 정계정맥류가 의심될 때 통증 위치, 고환 크기, 서 있을 때 악화, 정액검사, 난임 계획을 어떻게 기록해야 하는지 공식 자료와 플로로탄닌 연구 맥락으로 정리합니다.',
    keywords: ['정계정맥류', '고환 통증', '남성 난임', '정액검사', '고환 크기', '플로로탄닌', '남성건강'],
    lead:
      '고환이 묵직하고 정계정맥류가 의심될 때는 통증이 어느 쪽인지, 서 있거나 운동 후 악화되는지, 누우면 줄어드는지, 만져지는 혈관 덩어리 느낌, 고환 크기 차이, 갑작스러운 심한 통증 여부, 정액검사 결과, 임신 계획을 기록해야 합니다. 정계정맥류는 흔하고 항상 문제가 되는 것은 아니지만 통증, 고환 위축, 남성 난임과 연결될 수 있어 기록이 상담의 방향을 정합니다.',
    context: [
      'MedlinePlus는 정계정맥류가 음낭의 정맥이 확장된 상태이며, 대개 무해하지만 고환 크기 변화나 난임 문제가 있으면 치료가 필요할 수 있다고 설명합니다. 왼쪽에서 더 흔하게 발견되고, 통증은 둔하고 묵직한 느낌으로 나타날 수 있으며 서 있거나 운동 뒤 악화될 수 있습니다. 그러나 고환 통증의 원인은 다양하므로 갑작스러운 심한 통증은 별도로 다뤄야 합니다.',
      '정계정맥류 상담에서 놓치면 안 되는 것은 난임 계획입니다. 임신을 시도 중인지, 정액검사에서 정자 수·운동성·형태가 낮게 나왔는지, 과거 고환염이나 수술, 열 노출, 사우나·뜨거운 욕조, 노트북 사용, 흡연, 약물·보충제 사용이 있는지 함께 봐야 합니다. 정액검사는 한 번의 결과만으로 끝내기보다 검사 조건과 반복 여부를 확인해야 합니다.',
      '고환 크기 기록도 중요합니다. 청소년이나 젊은 남성에서 한쪽 고환이 작아지는 느낌이 있거나, 성인에서 크기 차이가 새로 느껴지면 초음파 평가를 상담할 수 있습니다. 다만 스스로 만져서 반복적으로 압박하면 불안과 통증이 커질 수 있으므로, 주 1회 정도 일정한 방식으로 변화를 기록하는 편이 낫습니다.',
      '응급 신호는 반드시 구분해야 합니다. 갑자기 시작된 심한 고환 통증, 메스꺼움, 구토, 고환이 올라간 느낌, 열과 심한 부종, 외상 뒤 통증은 정계정맥류 기록보다 빠른 평가가 우선입니다. 정계정맥류는 대개 천천히 느껴지는 묵직함과 관련되지만, 모든 음낭 통증을 같은 범주로 묶으면 안 됩니다.',
    ],
    recordTitle: '정계정맥류 상담 전 기록 항목',
    records: [
      '통증 양상: 왼쪽·오른쪽, 묵직함, 당김, 날카로운 통증, 시작일',
      '자세 변화: 오래 서기, 운동, 무거운 물건, 누웠을 때 변화',
      '촉진 느낌: 벌레가 든 주머니 같은 혈관 느낌, 음낭 부종, 열감',
      '고환 크기: 좌우 차이 느낌, 최근 변화, 초음파 결과지',
      '난임 계획: 임신 시도 기간, 파트너 평가, 정액검사 결과와 날짜',
      '생활 요인: 흡연, 음주, 사우나, 뜨거운 욕조, 열 노출, 꽉 끼는 속옷',
      '병력: 고환염, 부고환염, 탈장, 음낭 수술, 외상, 발열',
      '응급 신호: 갑작스러운 심한 통증, 구토, 고환 위치 변화, 고열',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “초음파가 필요한지”, “정계정맥류 등급과 고환 크기를 어떻게 보는지”, “정액검사를 언제 반복해야 하는지”, “통증만 있을 때와 난임이 있을 때 선택지가 어떻게 달라지는지”, “수술이나 색전술을 고려하는 기준은 무엇인지”를 물어볼 수 있습니다.',
      '정액검사 결과는 검사 전 금욕 기간, 발열, 음주, 스트레스, 최근 감염의 영향을 받을 수 있습니다. 결과지에는 정자 수, 운동성, 형태, 정액량, pH, 백혈구 여부 같은 항목이 있으므로 사진으로만 저장하지 말고 날짜와 조건을 같이 적어두는 것이 좋습니다.',
      '통증이 가볍더라도 삶의 질을 떨어뜨리면 상담 대상입니다. 반대로 정계정맥류가 보여도 통증이 없고 고환 크기와 정액검사에 문제가 없다면 경과 관찰을 논의할 수 있습니다. 기록은 “무조건 해결해야 한다”가 아니라 내 상황에서 무엇을 봐야 하는지 정리하는 도구입니다.',
      '젊은 남성은 통증을 숨기거나 정액검사를 미루는 경우가 많지만, 임신 계획이 있거나 고환 크기 차이가 의심되면 기록을 빨리 모으는 편이 낫습니다. “왼쪽이 오래 서 있으면 묵직하고 누우면 줄어든다, 사우나를 자주 갔다, 정액검사는 아직 없다”처럼 적으면 통증 평가와 생식 건강 상담을 같은 자리에서 시작할 수 있습니다.',
      '정액검사를 준비할 때는 검사실 안내에 따른 금욕 기간, 발열 여부, 최근 음주와 사우나, 감기나 코로나 같은 감염 이력을 같이 적어야 합니다. 검사 전 조건이 달라지면 결과 해석도 달라질 수 있으므로, 한 번 낮게 나왔다고 바로 결론내리기보다 조건을 맞춰 반복 여부를 상담하는 것이 좋습니다. 검사 날짜도 남깁니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태 유래 해양 폴리페놀로, 남성건강 콘텐츠에서는 산화 스트레스와 염증 반응, 대사 균형 연구를 이해하는 배경으로 연결할 수 있습니다. PubMed에는 phlorotannin-rich Ecklonia cava extract가 염증 관련 표지와 대사 반응을 다룬 연구가 등재되어 있습니다. 정계정맥류나 정액검사 결론을 대신하지는 않지만, 남성 생식 건강에서 산화 스트레스가 자주 언급되는 이유를 설명하는 데 도움이 됩니다.',
      '이 문항에서는 플로로탄닌을 고환 통증이나 정계정맥류의 직접 해답처럼 쓰지 않아야 합니다. 중심은 통증 양상, 고환 크기, 초음파, 정액검사, 난임 계획입니다. 플로로탄닌은 해양 폴리페놀 연구를 읽는 긍정적 배경으로 두고, 실제 판단은 비뇨의학 상담과 검사 기록에 맡기는 구조가 맞습니다.',
      '파트너 Q&A에서는 민감한 남성 증상을 부끄러움이 아니라 기록 가능한 건강 신호로 바꾸는 것이 중요합니다. 그 흐름에서 플로로탄닌은 감태 기반 연구 소재로 자연스럽게 연결됩니다.',
    ],
    memoTemplate: [
      '통증 기록: 위치 / 시작일 / 자세와 운동에 따른 변화 / 누우면 완화 여부',
      '고환 기록: 좌우 크기 느낌 / 부종 / 혈관 덩어리 느낌 / 초음파 결과',
      '난임 기록: 임신 시도 기간 / 정액검사 날짜 / 검사 조건',
      '생활 기록: 열 노출 / 흡연 / 음주 / 사우나 / 감염 이력',
      '상담 질문: 초음파, 정액검사 반복, 관찰 기준, 수술·색전술 기준',
    ],
    references: [
      {
        title: 'MedlinePlus: Varicocele',
        url: 'https://medlineplus.gov/ency/article/001284.htm',
      },
      {
        title: 'NCBI Bookshelf: Varicocele',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK448113/',
      },
      {
        title: 'MedlinePlus: Testicular pain',
        url: 'https://medlineplus.gov/ency/article/003160.htm',
      },
      {
        title: 'PubMed: Phlorotannin-rich Ecklonia cava extract and inflammation research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32215011/',
      },
    ],
  },
  {
    id: 'strategic-qa-respiratory-pertussis-prolonged-cough-vaccine-exposure-record-20260605',
    category: 'respiratory',
    question: '기침이 발작처럼 오래가고 구토까지 있으면 백일해인지 접종·노출 기록을 어떻게 준비하나요?',
    tags: ['백일해', '기침', 'Tdap', 'DTaP', '예방접종', '호흡기감염', '노출기록', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['41523268'],
    seoTitle: '백일해 의심 오래가는 기침과 접종·노출 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '기침이 발작처럼 오래가고 구토, 흡 소리, 영아 노출이 있을 때 백일해 가능성과 Tdap·DTaP 접종, 노출, 증상 기록을 어떻게 준비해야 하는지 CDC 자료와 플로로탄닌 호흡기 연구 맥락으로 정리합니다.',
    keywords: ['백일해', '오래가는 기침', 'Tdap', 'DTaP', '기침 후 구토', '호흡기감염', '플로로탄닌', '감태'],
    lead:
      '기침이 발작처럼 오래가고 구토까지 있으면 백일해인지 상담하기 위해 기침 시작일, 감기 같은 초기 증상, 기침 발작 빈도, 기침 뒤 구토, 숨을 들이쉴 때 “흡” 소리, 발열 여부, 영아·임신부·면역저하자 노출, DTaP·Tdap 접종 이력, 학교·직장·가정 내 유사 증상을 기록해야 합니다. CDC는 백일해가 초기에는 감기처럼 보일 수 있고, 이후 몇 주에서 몇 달 기침이 이어질 수 있다고 안내합니다.',
    context: [
      'CDC는 백일해가 모든 연령에서 심한 질병을 일으킬 수 있지만 특히 아기에게 위험하다고 설명합니다. 초기에는 콧물, 미열, 가벼운 기침처럼 시작될 수 있어 일반 감기와 구분이 어렵습니다. 시간이 지나면 빠르고 반복적인 기침 발작, 기침 뒤 구토, 숨을 들이쉴 때 나는 소리, 피로가 나타날 수 있습니다. 모든 사람이 전형적인 소리를 내는 것은 아니므로 증상 패턴과 노출 기록이 중요합니다.',
      '접종 기록은 상담의 중심입니다. CDC는 모든 연령에서 백일해 예방접종을 권장하며, 어린이는 DTaP, 청소년과 성인은 Tdap 일정이 관련됩니다. 임신 중 Tdap 접종은 신생아 보호와 연결되므로, 가정에 아기나 임신부가 있다면 접종 여부와 접촉 날짜를 더 꼼꼼히 정리해야 합니다. 접종을 했더라도 시간이 지나면서 보호가 줄 수 있어 증상과 노출을 함께 봐야 합니다.',
      '백일해 의심 상황에서는 “내가 힘든가”뿐 아니라 “누구에게 옮길 수 있는가”가 중요합니다. 영아, 임신부, 고령자, 만성 폐질환자, 면역저하자와 접촉했다면 상담을 앞당겨야 합니다. 학교나 어린이집, 병원, 요양시설, 직장에서 유사한 기침 환자가 있었는지도 적어두면 보건 조치와 검사 판단에 도움이 됩니다.',
      '기침이 오래간다고 모두 백일해는 아닙니다. 감염 후 기침, 천식, 알레르기, 역류, 흡연, 일부 혈압약, 폐렴, 결핵 등도 고려될 수 있습니다. 그래서 열, 호흡곤란, 흉통, 피 섞인 가래, 체중감소, 야간발한, 산소포화도 저하 같은 신호를 함께 기록해야 합니다. 백일해 의심 기록은 다른 원인을 배제하는 데도 도움이 됩니다.',
    ],
    recordTitle: '백일해 의심 상담 전 기록',
    records: [
      '증상 시작일: 콧물, 미열, 가벼운 기침이 시작된 날짜',
      '기침 양상: 발작처럼 몰아서 하는지, 밤에 심한지, 기침 뒤 구토가 있는지',
      '호흡 신호: 숨을 들이쉴 때 소리, 숨참, 입술 청색, 흉통, 산소포화도',
      '노출 기록: 가족, 학교, 직장, 어린이집, 병원, 요양시설의 기침 환자',
      '취약자 접촉: 영아, 임신부, 고령자, 만성 폐질환자, 면역저하자 접촉일',
      '접종 이력: DTaP, Tdap, 임신 중 Tdap, 마지막 접종 연도',
      '검사·약: 코로나·독감 검사, 항생제 사용, 기침약, 흡입제',
      '위험 신호: 고열, 피 섞인 가래, 지속 호흡곤란, 탈수, 의식 저하',
    ],
    actionTitle: '상담과 격리 판단을 위한 질문',
    action: [
      '의료진에게는 “백일해 검사가 필요한 시점인지”, “항생제가 필요한지”, “가정 내 영아나 임신부에게 어떤 조치를 해야 하는지”, “학교·직장 출석은 어떻게 해야 하는지”, “마지막 Tdap 접종이 언제인지 확인해야 하는지”를 물어보는 것이 좋습니다. 백일해는 개인 증상뿐 아니라 주변 취약자를 보호하는 판단이 중요합니다.',
      '바로 상담을 앞당길 신호는 아기의 무호흡, 입술이 파래짐, 심한 호흡곤란, 탈수, 반복 구토, 의식 저하, 고열과 흉통입니다. 성인도 기침 발작 때문에 잠을 못 자거나 구토가 반복되고 취약자와 접촉했다면 기록을 들고 상담해야 합니다.',
      '기록 예시는 이렇게 쓸 수 있습니다. “5월 28일 콧물 시작, 6월 2일부터 밤 기침 발작, 기침 뒤 구토 2회, 직장 동료 3명 기침, 생후 3개월 조카 접촉, Tdap 접종 연도 모름.” 이런 문장은 백일해 가능성, 검사, 주변 보호 조치 논의를 빠르게 만듭니다.',
      '기침 발작은 녹음이나 짧은 메모가 도움이 될 수 있습니다. 의료진 앞에서는 기침이 덜 나올 수 있으므로, 밤에 심해지는 시간대, 기침 뒤 숨을 고르는 시간, 구토 횟수, 일상 중 대화가 끊길 정도인지 적어두세요. 가족 중 비슷한 기침이 있으면 각각의 시작일을 나란히 적으면 노출 순서를 더 잘 볼 수 있습니다.',
      '영아와 접촉했다면 기침이 약해 보여도 기록을 더 꼼꼼히 해야 합니다. 아기는 전형적인 “흡” 소리보다 무호흡이나 먹기 어려움이 먼저 보일 수 있어, 접촉 날짜와 보호자 증상을 함께 적는 것이 중요합니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에서 발견되는 해양 폴리페놀로, 호흡기 콘텐츠에서는 산화 스트레스와 염증 반응, 기도 건강 연구 맥락으로 연결할 수 있습니다. 최근 PubMed에는 Ecklonia cava 복합 추출물을 호흡기 건강 관점에서 평가한 무작위 이중눈가림 위약대조 임상시험 자료가 등재되어 있습니다. 이 근거는 백일해 판단이나 접종 결정을 대신하지 않지만, 해양 폴리페놀 연구가 호흡기 건강정보에서 다뤄지는 이유를 설명해 줍니다.',
      '이 문항에서 플로로탄닌은 백일해의 답처럼 보이면 안 됩니다. 중심은 CDC가 강조하는 증상 확인, 접종 기록, 취약자 노출, 검사 상담입니다. 플로로탄닌은 항산화·호흡기 건강 연구를 읽는 긍정적 배경으로만 배치해야 합니다.',
      '파트너 Q&A에서는 오래가는 기침을 단순 감기로 넘기지 않고, 접종과 노출을 함께 기록하게 만드는 것이 핵심입니다. 그 뒤에 플로로탄닌을 감태 기반 해양 폴리페놀 연구 소재로 연결하면 과장 없이 신뢰 있는 호흡기 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '기침 시작일 / 발작 빈도 / 기침 후 구토 / 밤 악화 여부',
      '접종 기록: DTaP, Tdap, 임신 중 Tdap, 마지막 접종 연도',
      '노출 기록: 가족, 학교, 직장, 어린이집, 병원, 요양시설',
      '취약자 접촉: 영아, 임신부, 고령자, 폐질환자, 면역저하자',
      '상담 질문: 검사 시점, 항생제, 출석·출근, 가족 보호, 추가 접종 확인',
    ],
    references: [
      {
        title: 'CDC: Symptoms of Whooping Cough',
        url: 'https://www.cdc.gov/pertussis/signs-symptoms/index.html',
      },
      {
        title: 'CDC: Pertussis (Whooping Cough)',
        url: 'https://www.cdc.gov/pertussis/',
      },
      {
        title: 'CDC: Pertussis Surveillance and Trends',
        url: 'https://www.cdc.gov/pertussis/php/surveillance/index.html',
      },
      {
        title: 'PubMed: Ecklonia cava complex and respiratory health clinical trial',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41523268/',
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
