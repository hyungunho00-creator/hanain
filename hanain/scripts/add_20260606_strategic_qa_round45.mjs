import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-06T10:05:00+09:00'
const REVIEW_DATE = '2026-06-06'

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
  return `<div class="qa-structured qa-strategic-20260606">\n${body}\n</div>`
}

const items = [
  {
    id: 'strategic-qa-hair-seborrheic-dermatitis-dandruff-itch-flake-shampoo-record-20260606',
    category: 'hair',
    question: '비듬처럼 보이는데 가렵고 기름진 각질이 반복되면 두피 지루피부염 상담 기록은 어떻게 준비하나요?',
    tags: ['두피지루피부염', '비듬', '두피가려움', '기름진각질', '항비듬샴푸', '두피염증', '탈모상담', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['25995822', '31234405'],
    seoTitle: '두피 지루피부염 의심 비듬·가려움·기름진 각질 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '비듬처럼 보이지만 두피 가려움, 기름진 각질, 붉은기, 반복 재발이 있을 때 지루피부염 상담 전 사진, 샴푸 사용, 제품 반응, 탈모 양상을 어떻게 기록할지 정리합니다.',
    keywords: ['두피 지루피부염', '비듬', '두피 가려움', '기름진 각질', '항비듬 샴푸', '플로로탄닌'],
    lead:
      '비듬처럼 보이는데 두피가 가렵고, 노란빛 또는 기름진 각질이 붙고, 귀 뒤·눈썹·콧볼 주변까지 붉거나 벗겨지고, 좋아졌다가 다시 반복된다면 두피 지루피부염 가능성을 포함해 기록해야 합니다. 준비할 것은 각질 사진, 가려움 점수, 붉은기, 진물·통증, 샴푸 종류와 사용 빈도, 두피에 바른 오일·앰플·염색약, 스트레스와 수면, 계절 변화, 면역저하, 얼굴·가슴 병변, 머리 빠짐 양상입니다.',
    context: [
      'MedlinePlus는 지루피부염이 기름샘이 많은 부위에 생길 수 있고, 두피에 생기면 비듬이나 cradle cap 형태로 보일 수 있다고 설명합니다. AAD도 지루피부염이 두피, 얼굴, 귀 주변, 가슴 등에 비늘과 발진을 만들 수 있으며, 두피에서는 dandruff shampoo와 국소 약제가 상담될 수 있다고 안내합니다. 따라서 “비듬이 많다”는 말만으로는 부족하고, 부위와 반복 양상을 적어야 합니다.',
      '두피 지루피부염은 건조한 비듬, 두피 건선, 접촉피부염, 곰팡이 감염, 모낭염과 헷갈릴 수 있습니다. 은백색의 두꺼운 판인지, 기름지고 노란 각질인지, 여드름처럼 고름이 있는지, 염색이나 새 샴푸 뒤 따가움이 시작됐는지에 따라 상담 방향이 달라집니다. 그래서 사진은 정수리보다 헤어라인, 귀 뒤, 목덜미, 가르마, 눈썹 주변까지 남기는 편이 좋습니다.',
      '샴푸 기록은 핵심입니다. ketoconazole, selenium sulfide, zinc pyrithione, coal tar, salicylic acid 같은 성분이 든 제품을 썼는지, 몇 분 두었다가 헹궜는지, 주 몇 회 사용했는지, 모발이 건조해졌는지, 두피 따가움이 늘었는지 적어야 합니다. 같은 날 여러 제품을 바꾸면 무엇이 영향을 줬는지 알기 어려우므로, 제품명과 날짜를 표로 만들면 상담이 훨씬 명확해집니다.',
      '탈모가 함께 느껴질 때는 양상을 나누어 적어야 합니다. 지루피부염 자체보다 긁기, 염증, 수면 부족, 스트레스, 다른 탈모가 겹쳐 빠짐이 커 보일 수 있습니다. 샤워 때 빠지는 양, 가르마가 넓어지는지, 특정 염증 부위 주변만 빠지는지, 원형으로 비는지, 비듬이 심한 날과 빠짐이 같은지 기록해야 합니다.',
      '악화 요인도 중요합니다. 겨울과 건조한 날씨, 스트레스, 수면 부족, 음주, 땀, 모자 착용, 헬멧, 운동 뒤 세정 지연, 진한 헤어제품, 오일 사용, 염색과 펌, 면역저하 상태가 반복 악화와 관련될 수 있습니다. “늘 있다”보다 언제 심해지는지가 상담에 더 도움이 됩니다.',
      '바로 상담을 앞당길 신호는 통증, 고름, 넓게 번지는 붉은기, 딱지가 심하게 앉는 병변, 탈모 부위가 반짝이는 흉터처럼 보이는 경우, 눈썹·수염·가슴까지 심한 염증이 반복되는 경우입니다. 단순 비듬 관리로 버티기보다 피부과 평가가 필요한 신호를 따로 표시해야 합니다.',
    ],
    recordTitle: '두피 지루피부염 상담 전 기록 항목',
    records: [
      '사진: 헤어라인, 가르마, 귀 뒤, 목덜미, 눈썹·콧볼 주변, 각질과 붉은기',
      '증상 점수: 가려움, 따가움, 통증, 수면 방해, 긁은 뒤 출혈·진물',
      '각질 양상: 건조한 흰 비듬, 기름진 노란 각질, 두꺼운 판, 고름·딱지',
      '샴푸 기록: 성분, 제품명, 주당 횟수, 두는 시간, 반응, 모발 건조감',
      '제품·시술: 오일, 두피 앰플, 스프레이, 염색, 펌, 헤어토닉, 모자·헬멧',
      '탈모 양상: 전체 빠짐, 염증 부위 주변 빠짐, 가르마 변화, 원형 탈모 여부',
      '악화 요인: 스트레스, 수면, 계절, 땀, 음주, 운동 뒤 세정 지연',
      '위험 신호: 고름, 통증, 광범위한 홍반, 흉터성 변화, 빠르게 커지는 병변',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “지루피부염인지 건선·접촉피부염·모낭염과 어떻게 구분하는지”, “샴푸 성분과 사용 빈도를 어떻게 조절할지”, “국소 약제가 필요한 상황인지”, “탈모가 다른 원인과 겹쳤는지”, “반복 재발을 어떻게 기록하고 관리할지”를 물어볼 수 있습니다.',
      '기록 예시는 “3개월째 귀 뒤와 헤어라인에 기름진 노란 각질, 가려움 8점, ketoconazole 샴푸 주 2회 사용하면 3일 호전 후 재발, 염색 뒤 따가움 증가, 정수리 숱 변화는 크지 않지만 샤워 때 빠짐 증가”처럼 쓰면 됩니다. 이런 문장은 증상, 제품 반응, 탈모 걱정을 한 번에 보여줍니다.',
      '사진은 같은 조명과 같은 위치에서 주 1회 정도면 충분합니다. 매일 확대 사진을 찍으면 불안이 커질 수 있습니다. 제품은 한 번에 하나씩 바꾸고, 새 제품을 시작한 날짜와 반응을 적으면 상담 때 “무엇이 도움인지, 무엇이 자극인지”를 구분하기 쉽습니다.',
      '머리 빠짐이 함께 있으면 두피 염증 사진과 모발 사진을 분리해 보관하세요. 두피 사진은 각질과 홍반을 보여주고, 모발 사진은 가르마와 헤어라인 변화를 보여줍니다. 이렇게 나누면 두피 문제와 탈모 패턴을 따로 평가하기 쉬워집니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 두피 지루피부염 문항에서는 피부 장벽, 각질세포, 산화 스트레스 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 Ecklonia cava 유래 dieckol이 인간 각질세포의 염증 관련 신호를 다룬 연구와, 미세먼지 노출 각질세포의 산화 스트레스 지표를 살핀 연구가 등재되어 있습니다.',
      '중심은 두피 사진, 가려움 점수, 각질 양상, 샴푸 사용 기록, 제품 반응, 위험 신호입니다. 플로로탄닌은 감태 기반 연구 소재로 소개하고, 두피 지루피부염 상담에서는 MedlinePlus와 AAD의 두피 관리 정보와 피부과 평가가 앞에 와야 합니다.',
      '파트너 Q&A에서는 “비듬이 심하다”는 막연한 표현을 사진, 제품명, 날짜, 악화 요인으로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 과장 없는 두피 건강 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '사진: 헤어라인 / 귀 뒤 / 가르마 / 눈썹 / 날짜',
      '증상: 가려움 / 따가움 / 통증 / 진물 / 수면 방해',
      '샴푸: 제품명 / 성분 / 횟수 / 두는 시간 / 반응',
      '탈모: 빠짐 양 / 가르마 / 염증 부위 주변 / 원형 여부',
      '질문: 지루피부염 구분 / 샴푸 조절 / 약제 / 재발 관리',
    ],
    references: [
      {
        title: 'MedlinePlus: Seborrheic dermatitis',
        url: 'https://medlineplus.gov/ency/article/000963.htm',
      },
      {
        title: 'AAD: Seborrheic dermatitis signs and symptoms',
        url: 'https://www.aad.org/public/diseases/a-z/seborrheic-dermatitis-symptoms',
      },
      {
        title: 'AAD: Seborrheic dermatitis diagnosis and treatment',
        url: 'https://www.aad.org/public/diseases/a-z/seborrheic-dermatitis-treatment',
      },
      {
        title: 'PubMed: Dieckol and human keratinocyte inflammatory signaling',
        url: 'https://pubmed.ncbi.nlm.nih.gov/25995822/',
      },
      {
        title: 'PubMed: Ecklonia cava and particulate matter skin keratinocyte research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31234405/',
      },
    ],
  },
  {
    id: 'strategic-qa-mens-erectile-dysfunction-cardiovascular-risk-nitrates-sildenafil-record-20260606',
    category: 'mens_health',
    question: '발기부전이 새로 생겼을 때 심혈관 위험·질산염 약·실데나필 상담 기록은 어떻게 준비하나요?',
    tags: ['발기부전', '심혈관위험', '실데나필', '질산염', '당뇨', '혈압', '남성건강', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['32215011'],
    seoTitle: '발기부전 새 증상과 심혈관 위험·질산염 약 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '발기부전이 새로 생겼을 때 당뇨, 혈압, 흡연, 심장병, 질산염 약, 실데나필 안전, 아침 발기, 스트레스와 약물 이력을 어떻게 기록할지 정리합니다.',
    keywords: ['발기부전', '심혈관 위험', '실데나필', '질산염', '당뇨', '혈압', '플로로탄닌'],
    lead:
      '발기부전이 새로 생기거나 갑자기 악화되면 성기능 문제만으로 보지 말고 심혈관 위험, 당뇨, 혈압, 흡연, 고지혈증, 수면무호흡, 우울·불안, 복용약, 질산염 약, 실데나필·타다라필 사용 여부를 기록해야 합니다. NIDDK는 발기부전이 다른 건강 문제의 증상일 수 있고, 혈관·신경·호르몬·약물·생활습관 요인이 함께 작용할 수 있다고 설명합니다.',
    context: [
      'NIDDK는 발기부전의 원인으로 당뇨, 만성질환, 심장과 혈관 질환, 고혈압, 뇌졸중, 호르몬 문제, 신경 손상, 전립선 관련 문제, 약물, 스트레스와 우울, 흡연과 음주를 안내합니다. 그래서 상담 전에는 “약만 처방받고 싶다”보다 왜 생겼는지, 안전하게 사용할 수 있는지, 심혈관 평가가 필요한지 기록해야 합니다.',
      'MedlinePlus도 발기부전이 혈관 문제나 당뇨, 심장질환의 신호일 수 있다고 설명합니다. 특히 새로 생긴 발기부전이 운동 시 흉통, 숨참, 다리 통증, 고혈압, 당뇨 조절 악화와 함께 있다면 남성건강 상담과 심혈관 위험 평가가 함께 필요할 수 있습니다. 성기능 기록은 부끄러운 정보가 아니라 혈관 건강을 보여주는 단서가 될 수 있습니다.',
      '약물 안전 기록은 필수입니다. MedlinePlus의 sildenafil 정보는 nitrate가 들어 있는 약이나 poppers 같은 질산염 계열 물질을 사용할 때 의료진에게 말해야 한다고 안내합니다. 흉통 때문에 nitroglycerin을 쓰는 사람, 협심증 약을 가진 사람, alpha blocker, 혈압약, 간·신장질환, 심근경색·뇌졸중 병력이 있는 사람은 임의 복용을 피하고 반드시 상담해야 합니다.',
      '증상 기록은 시간과 상황을 나눠야 합니다. 아침 발기가 있는지, 성관계 때만 어려운지, 자위 때도 어려운지, 발기는 되지만 유지가 어려운지, 성욕 저하가 함께 있는지, 사정 문제나 통증, 음경 만곡, 골반 통증이 있는지 적어야 합니다. 갑작스러운 문제와 몇 년에 걸친 악화는 상담 방향이 다를 수 있습니다.',
      '검사와 위험요인 기록도 중요합니다. 최근 혈압, HbA1c, 공복혈당, 지질검사, 체중, 허리둘레, 수면무호흡 의심, 운동량, 흡연, 음주, 우울·불안, 테스토스테론 검사 이력, 전립선 수술·방사선 이력을 가져가면 좋습니다. 발기부전은 성생활과 혈관·대사 건강을 동시에 보는 주제입니다.',
      '응급 신호는 따로 구분해야 합니다. 성관계나 운동 중 흉통, 심한 숨참, 실신감, 새로 생긴 신경 증상, 심한 음경 통증이나 지속 발기, 외상 뒤 붓기와 변형은 일반 상담보다 빠른 평가가 필요할 수 있습니다. 발기부전 약을 이미 복용 중이라면 복용 시간, 용량, 효과, 부작용, 함께 먹은 약까지 적어야 합니다.',
    ],
    recordTitle: '발기부전 상담 전 기록 항목',
    records: [
      '증상 양상: 시작일, 갑작스러운 변화, 아침 발기, 유지 어려움, 성욕 저하',
      '상황 차이: 성관계, 자위, 특정 파트너, 스트레스, 피로, 음주 뒤 변화',
      '심혈관 위험: 혈압, 당뇨, 고지혈증, 흡연, 비만, 운동 부족, 가족력',
      '약물 안전: 질산염 약, nitroglycerin, poppers, alpha blocker, 혈압약',
      '복용 이력: sildenafil, tadalafil, 보충제, 에너지 제품, 효과와 부작용',
      '검사 이력: HbA1c, 지질검사, testosterone, 신장·간 수치, 수면무호흡 평가',
      '동반 증상: 흉통, 숨참, 다리 통증, 우울·불안, 골반 통증, 음경 만곡',
      '위험 신호: 성관계 중 흉통, 실신감, 지속 발기, 외상 뒤 통증·부종',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “내 발기부전이 심혈관 위험 평가와 연결되는지”, “PDE5 억제제를 써도 안전한지”, “질산염 약이나 혈압약과의 위험은 무엇인지”, “당뇨·지질·테스토스테론 검사가 필요한지”, “심리 요인과 혈관 요인을 어떻게 나누어 볼지”를 물어볼 수 있습니다.',
      '기록 예시는 “54세, 6개월 전부터 유지 어려움, 아침 발기 감소, 고혈압약 복용, nitroglycerin 없음, HbA1c 7.2, 흡연 20년, 운동 시 흉통 없음, sildenafil을 친구에게 받아 먹은 적 있음”처럼 쓰면 됩니다. 이런 문장은 원인 평가, 약물 안전, 검사 필요성을 한 번에 보여줍니다.',
      '온라인 보충제나 성기능 제품을 썼다면 숨기지 말고 기록해야 합니다. 제품명, 복용량, 복용 시간, 두근거림·어지럼·두통 같은 반응을 적어야 합니다. 일부 제품은 표시되지 않은 성분 문제나 약물 상호작용 가능성이 있어, 안전 상담에 매우 중요합니다.',
      '파트너와의 관계, 스트레스, 수면, 우울감도 의료 정보입니다. 단순히 “마음 문제”로 치부하자는 뜻이 아니라 혈관·호르몬·심리 요인이 서로 영향을 줄 수 있기 때문입니다. 기록은 부끄러움을 줄이고 상담을 실제 해결 가능한 질문으로 바꾸는 도구입니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 발기부전 문항에서는 약물 선택을 바꾸는 요소가 아니라 산화 스트레스와 혈관 건강 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 phlorotannin-rich Ecklonia cava extract가 염증 관련 표지와 대사 반응을 다룬 연구가 등재되어 있습니다.',
      '중심은 심혈관 위험, 당뇨·혈압·지질 검사, 질산염 약 확인, sildenafil 계열 약물 안전, 증상 시간표입니다. 플로로탄닌은 감태 기반 연구 소재로만 소개하고, 발기부전 상담에서는 NIDDK와 MedlinePlus의 안전 정보와 의료진 평가가 앞에 와야 합니다.',
      '파트너 Q&A에서는 “성기능 문제”를 숨기는 대신 혈관·대사·약물 안전 기록으로 정리하게 돕는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 과장 없는 남성건강 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '증상: 시작일 / 아침 발기 / 유지 어려움 / 성욕 / 통증',
      '위험: 혈압 / 당뇨 / 지질 / 흡연 / 운동 / 가족력',
      '약물: 질산염 / 혈압약 / sildenafil·tadalafil / 보충제',
      '검사: HbA1c / 지질 / testosterone / 신장·간 / 수면무호흡',
      '질문: 약물 안전 / 심혈관 평가 / 검사 / 심리 요인 / 응급 신호',
    ],
    references: [
      {
        title: 'NIDDK: Symptoms and Causes of Erectile Dysfunction',
        url: 'https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/symptoms-causes',
      },
      {
        title: 'NIDDK: Treatment for Erectile Dysfunction',
        url: 'https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/treatment',
      },
      {
        title: 'MedlinePlus: Erectile Dysfunction',
        url: 'https://medlineplus.gov/erectiledysfunction.html',
      },
      {
        title: 'MedlinePlus: Sildenafil',
        url: 'https://medlineplus.gov/druginfo/meds/a699015.html',
      },
      {
        title: 'PubMed: Phlorotannin-rich Ecklonia cava extract and inflammation research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32215011/',
      },
    ],
  },
  {
    id: 'strategic-qa-womens-pcos-irregular-period-hirsutism-insulin-resistance-fertility-record-20260606',
    category: 'womens_health',
    question: '생리가 불규칙하고 털·여드름이 늘면 PCOS 상담 전 인슐린저항성·임신 계획 기록은 어떻게 준비하나요?',
    tags: ['PCOS', '다낭성난소증후군', '불규칙생리', '다모증', '여드름', '인슐린저항성', '임신계획', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['32215011'],
    seoTitle: 'PCOS 의심 불규칙 생리·다모증·인슐린저항성 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '불규칙 생리, 얼굴 털, 여드름, 체중 변화, 임신 계획이 있을 때 PCOS 상담 전 주기표, 안드로겐 증상, 혈당·지질검사, 배란 기록을 어떻게 준비할지 정리합니다.',
    keywords: ['PCOS', '다낭성난소증후군', '불규칙 생리', '다모증', '인슐린저항성', '임신 계획', '플로로탄닌'],
    lead:
      '생리가 불규칙하고 얼굴·턱·가슴 털이 늘거나 여드름, 체중 증가, 탈모, 임신이 잘 안 되는 느낌이 있으면 PCOS 가능성을 포함해 기록해야 합니다. 준비할 것은 생리 시작일과 주기 길이, 무월경 기간, 출혈량, 배란검사, 임신 계획, 체중·허리둘레, 여드름과 다모증 사진, 탈모 패턴, 혈당·인슐린·지질검사, 갑상선·프로락틴 검사 이력, 복용 중인 피임약·호르몬제·스테로이드입니다.',
    context: [
      'NICHD는 PCOS가 불규칙하거나 없는 생리, 높은 안드로겐 수치 또는 그 징후, 난소의 여러 작은 follicle 양상 등 다양한 특징과 관련될 수 있다고 설명합니다. ACOG도 PCOS에서 불규칙 생리, 다모증, 여드름, 난임, 대사 위험이 상담 주제가 될 수 있다고 안내합니다. 한 가지 증상만으로 단정하기보다 여러 단서를 모아야 합니다.',
      'FDA Office of Women’s Health 자료는 PCOS가 호르몬 불균형과 관련되어 불규칙한 생리, 얼굴·가슴·복부·허벅지 털 증가, 여드름, 기름진 피부, 임신 어려움 같은 증상을 만들 수 있다고 설명합니다. 또한 진단에는 병력, 신체진찰, 검사 등이 사용될 수 있습니다. 그래서 상담 전에는 증상 사진과 주기표가 큰 도움이 됩니다.',
      '생리 기록은 가장 중요한 자료입니다. 마지막 6~12개월의 생리 시작일, 주기 길이, 출혈 기간, 출혈량, 중간 출혈, 90일 이상 생리가 없던 기간, 피임약을 중단한 날짜를 적어야 합니다. 생리 앱이 있다면 캡처보다 표로 요약해 가면 진료실에서 빠르게 볼 수 있습니다.',
      '안드로겐 증상은 부끄러워 숨기기 쉽지만 중요한 단서입니다. 턱·윗입술·가슴·배·허벅지의 굵은 털, 성인 여드름, 두피 정수리 탈모, 피부가 어두워지는 목 주름이나 겨드랑이 변화, 급격한 목소리 변화나 근육 증가 같은 단서를 적습니다. 특히 급격하고 심한 변화는 다른 원인 평가가 필요할 수 있습니다.',
      '대사 기록도 필요합니다. CDC는 PCOS가 인슐린저항성과 관련될 수 있고 당뇨 위험과도 연결될 수 있다고 안내합니다. 공복혈당, HbA1c, 지질검사, 혈압, 체중 변화, 가족력, 임신성 당뇨 이력, 수면무호흡 의심, 운동과 식사 패턴을 정리하면 생리 상담과 장기 건강 상담이 함께 진행됩니다.',
      '임신 계획이 있으면 질문이 달라집니다. 피임이 필요한지, 생리 조절이 목표인지, 배란 확인과 난임 상담이 목표인지, 메트포르민이나 배란유도제 상담이 필요한지, 체중과 혈당 관리가 먼저인지 달라질 수 있습니다. 같은 PCOS 의심이라도 목표가 생리 조절인지 임신인지에 따라 기록의 우선순위가 다릅니다.',
    ],
    recordTitle: 'PCOS 상담 전 기록 항목',
    records: [
      '생리표: 6~12개월 시작일, 주기 길이, 무월경 기간, 출혈량, 중간 출혈',
      '피임·호르몬: 피임약, 호르몬제, 중단일, 스테로이드, 여드름약, 탈모약',
      '안드로겐 단서: 얼굴·가슴 털, 여드름, 정수리 탈모, 피부 어두워짐',
      '대사 기록: 체중, 허리둘레, 혈압, 공복혈당, HbA1c, 지질검사',
      '임신 계획: 임신 시도 기간, 배란검사, 유산 이력, 파트너 검사 여부',
      '배제 질문: 갑상선 증상, 유즙 분비, 급격한 남성화, 쿠싱 의심 증상',
      '가족력: 당뇨, PCOS, 난임, 심혈관질환, 조기 폐경, 자궁내막암',
      '상담 목표: 생리 조절, 여드름·다모증, 체중·혈당, 임신, 장기 위험 관리',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “내 기록이 PCOS 평가 기준에 어떻게 맞는지”, “갑상선·프로락틴·부신 문제 같은 다른 원인을 어떻게 확인할지”, “혈당·지질검사를 해야 하는지”, “임신 계획이 있으면 배란 확인을 어떻게 할지”, “피임약·메트포르민·생활관리의 목표가 무엇인지”를 물어볼 수 있습니다.',
      '기록 예시는 “최근 1년 생리 6회, 주기 45~80일, 턱 털과 여드름 증가, 체중 7kg 증가, 목 주름 어두워짐, HbA1c 검사 없음, 임신 계획은 1년 뒤, 피임약은 6개월 전 중단”처럼 쓰면 됩니다. 이런 문장은 생리, 안드로겐, 대사, 임신 계획을 한 번에 보여줍니다.',
      '검사 결과는 날짜와 단위를 함께 가져가야 합니다. testosterone, DHEA-S, LH/FSH, TSH, prolactin, fasting glucose, HbA1c, lipid panel, ultrasound 결과가 있다면 캡처보다 표로 정리하세요. 약을 복용 중이면 검사 해석이 달라질 수 있어 복용 시작일도 중요합니다.',
      '다모증과 여드름은 사진을 남기면 상담이 쉬워집니다. 다만 매일 사진을 찍기보다 한 달 단위로 같은 조명에서 기록하세요. 임신 계획이 있으면 여드름약이나 호르몬제 일부는 선택이 달라질 수 있으므로, 목표를 먼저 말하는 것이 안전합니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, PCOS 문항에서는 호르몬 평가를 바꾸는 요소가 아니라 산화 스트레스와 대사 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 phlorotannin-rich Ecklonia cava extract가 염증 관련 표지와 대사 반응을 다룬 연구가 등재되어 있습니다.',
      '중심은 생리표, 안드로겐 증상, 혈당·지질검사, 임신 계획, 다른 원인 배제 기록입니다. 플로로탄닌은 감태 기반 연구 소재로만 소개하고, PCOS 상담에서는 NICHD·ACOG·FDA·CDC 자료와 의료진 평가가 앞에 와야 합니다.',
      '파트너 Q&A에서는 “생리가 들쑥날쑥하다”는 표현을 주기표, 증상 사진, 검사 질문으로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 과장 없는 여성건강 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '생리: 시작일 / 주기 / 무월경 / 출혈량 / 중간 출혈',
      '증상: 털 / 여드름 / 탈모 / 피부 어두워짐 / 체중',
      '검사: HbA1c / 지질 / TSH / prolactin / androgen / 초음파',
      '목표: 생리 조절 / 임신 / 여드름·다모증 / 혈당·체중',
      '질문: PCOS 기준 / 다른 원인 / 검사 / 약제 / 장기 위험',
    ],
    references: [
      {
        title: 'NICHD: Polycystic Ovary Syndrome (PCOS)',
        url: 'https://www.nichd.nih.gov/health/topics/factsheets/pcos',
      },
      {
        title: 'ACOG: Polycystic Ovary Syndrome (PCOS)',
        url: 'https://www.acog.org/womens-health/faqs/polycystic-ovary-syndrome-pcos',
      },
      {
        title: 'FDA: Polycystic Ovary Syndrome (PCOS)',
        url: 'https://www.fda.gov/consumers/womens-health-topics/polycystic-ovary-syndrome-pcos',
      },
      {
        title: 'CDC: Diabetes and Polycystic Ovary Syndrome',
        url: 'https://www.cdc.gov/diabetes/risk-factors/pcos-polycystic-ovary-syndrome.html',
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
        '2026년 6월 6일 최신 공식 자료와 PubMed/PMC 연구 맥락 기반 전략 Q&A 추가 보강. 부족 카테고리 순환, 3,000자 이상 본문, 플로로탄닌 긍정 연결, 과장 금지 원칙 적용.',
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
