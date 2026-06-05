import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-05T12:55:00+09:00'
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
    id: 'strategic-qa-hair-oral-minoxidil-edema-heart-rate-blood-pressure-record-20260605',
    category: 'hair',
    question: '저용량 경구 미녹시딜을 탈모로 상담할 때 부종·심박·혈압·다모증 기록은 어떻게 준비하나요?',
    tags: ['경구미녹시딜', '저용량미녹시딜', '탈모약', '부종', '심박수', '혈압', '다모증', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['24252083'],
    seoTitle: '저용량 경구 미녹시딜 탈모 상담 전 부종·심박·혈압 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '탈모 때문에 저용량 경구 미녹시딜을 상담할 때 부종, 심박수, 혈압, 어지럼, 다모증, 심장 병력, 임신 계획을 어떻게 기록해야 하는지 공식 자료와 플로로탄닌 모발 연구 맥락으로 정리합니다.',
    keywords: ['경구 미녹시딜', '저용량 미녹시딜', '탈모약', '부종', '심박수', '혈압', '다모증', '플로로탄닌'],
    lead:
      '저용량 경구 미녹시딜을 탈모로 상담할 때는 “먹는 약이 더 편한가”만 묻지 말고, 기저 혈압, 심박수, 발목·눈가 부종, 어지럼, 두근거림, 체중 증가, 다모증, 심장·신장 병력, 혈압약·이뇨제 복용, 임신 가능성, 이전 미녹시딜 사용 반응을 기록해야 합니다. 경구 미녹시딜은 고혈압 약제로 알려진 성분이고, 탈모 목적의 저용량 사용은 상황별 상담이 필요한 영역입니다.',
    context: [
      'MedlinePlus는 미녹시딜 정제가 혈압 약으로 쓰이며 흉통 증가나 심장 관련 문제가 생길 수 있어 의료진 지시와 추적이 중요하다고 안내합니다. DailyMed의 미녹시딜 정제 정보도 심낭염, 심낭삼출, 체액 저류 같은 경고를 포함합니다. 피부과 영역에서는 저용량 경구 미녹시딜이 탈모에 오프라벨로 사용되는 사례가 늘었지만, 개인별 심혈관 위험과 병력 확인이 먼저입니다.',
      '최근 저용량 경구 미녹시딜 관련 연구와 리뷰에서는 다모증, 발목 부종, 눈가 부종, 어지럼, 두근거림, 심박 변화, 두통, 불면 같은 이상반응이 보고됩니다. 대다수는 선택된 환자에서 비교적 관리 가능한 수준으로 설명되지만, 심장병, 신장질환, 혈압약 복용, 부종 경향, 고령, 임신 가능성이 있으면 상담의 무게가 달라집니다. 그래서 시작 전 기록과 시작 후 기록이 모두 필요합니다.',
      '탈모 상담에서는 효과 기대만큼 안전 기록이 중요합니다. 혈압이 원래 낮은 사람, 기립성 어지럼이 있는 사람, 심장이 두근거리는 경험이 잦은 사람, 부종이 잘 생기는 사람은 시작 전 상태를 명확히 적어야 합니다. 복용 뒤 생긴 증상인지 원래 있던 증상인지 구분하려면 최소 1~2주 기초 기록이 도움이 됩니다.',
      '다모증도 실질적인 상담 항목입니다. 얼굴, 팔, 손등, 몸통 털이 늘어나는 것을 어떤 사람은 가볍게 느끼지만 어떤 사람에게는 중단 사유가 될 수 있습니다. 여성, 청소년, 다낭성난소증후군이 의심되는 사람, 기존 체모가 많은 사람은 기대치와 불편 기준을 미리 정해 두는 것이 좋습니다.',
      '또한 경구 미녹시딜은 단독으로만 논의되지 않을 수 있습니다. 피나스테리드, 두타스테리드, 스피로노락톤, 호르몬제, 혈압약, 이뇨제, 항우울제, 보충제와 함께 쓰는 경우가 있어 약물 목록을 정확히 가져가야 합니다. 특히 임신 중이거나 임신을 계획 중이라면 일반적인 탈모 상담과 다른 안전 대화가 필요합니다.',
    ],
    recordTitle: '상담 전·후 기록 항목',
    records: [
      '시작 전 기초값: 아침 혈압, 저녁 혈압, 안정 시 심박수, 기립성 어지럼 여부',
      '부종: 발목, 손가락, 눈가 붓기, 체중 변화, 양말 자국',
      '심장 신호: 두근거림, 흉통, 숨참, 운동 시 피로, 실신감',
      '다모증: 얼굴, 팔, 손등, 몸통 털 변화와 불편 정도',
      '복용 목록: 혈압약, 이뇨제, 심장약, 호르몬제, 탈모약, 보충제',
      '병력: 심장질환, 신장질환, 저혈압, 부정맥, 임신 가능성, 수유',
      '탈모 기록: 사진, 쉐딩 시점, 미녹시딜 외용제 반응, 중단 경험',
      '연락 기준: 급격한 부종, 흉통, 심한 숨참, 빠른 심박, 실신감',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “내 혈압과 심박 상태에서 경구 미녹시딜이 적절한지”, “시작 전 어떤 검사나 기초 기록이 필요한지”, “부종과 두근거림이 생기면 어떻게 연락해야 하는지”, “기존 혈압약이나 이뇨제와 시간 조정이 필요한지”, “다모증이 생기면 용량 조정이나 중단 기준은 무엇인지”를 물어볼 수 있습니다.',
      '기록 예시는 “아침 혈압 104/68, 안정 심박 82, 원래 기립성 어지럼 있음, 시작 10일 뒤 발목 양말 자국과 눈가 붓기, 심박 95까지 증가, 얼굴 잔털 증가”처럼 쓰면 됩니다. 이런 문장은 약제 반응, 위험 신호, 생활 불편을 한 번에 보여줍니다.',
      '탈모 사진은 같은 조명과 같은 각도로 남기고, 부작용 기록은 날짜와 용량을 함께 적어야 합니다. 효과가 늦게 보인다고 임의로 증량하거나, 부종이 있는데도 참는 방식은 피해야 합니다. 기록은 약을 무조건 피하자는 뜻이 아니라, 내 몸에 맞는 선택인지 확인하기 위한 안전 장치입니다.',
      '상담 후에도 기록은 계속 의미가 있습니다. 시작일, 용량, 복용 시간, 수면, 음주, 운동량, 염분 섭취, 체중 변화를 같이 적으면 부종이나 심박 변화가 약제와 관련 있는지, 생활 요인이 겹쳤는지 더 차분하게 볼 수 있습니다. 의료진이 용량 조정, 관찰 기간, 중단 기준을 설명할 때도 “느낌”보다 날짜별 표가 훨씬 도움이 됩니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 이 문항에서는 모발 생물학과 두피 환경 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 Ecklonia cava 성분이 모유두세포와 모발 관련 신호를 다룬 연구가 등재되어 있습니다. 이 자료는 약제 안전 판단을 대신하지 않으며, 해양 폴리페놀 연구가 모발 건강 콘텐츠에서 관심을 받는 이유를 설명하는 보조 정보입니다.',
      '중심은 혈압, 심박, 부종, 약물 목록, 사진 기록입니다. 플로로탄닌은 감태 기반 연구 소재로만 배치해야 합니다. 먹는 탈모약 상담에서는 성분 소개보다 안전 기록과 의료진 대화가 먼저이며, 해양 폴리페놀 정보는 그 뒤에 놓일 때 신뢰가 높아집니다.',
      '파트너 Q&A에서는 “효과 기대”와 “안전 기록”을 같은 무게로 다루는 것이 중요합니다. 그 위에서 플로로탄닌을 모발 환경 연구 배경으로 소개하면 과장 없이 전문적인 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '기초 기록: 혈압, 심박수, 어지럼, 부종, 체중',
      '복용 기록: 용량, 시작일, 시간, 함께 먹는 약',
      '이상반응: 발목·눈가 붓기, 두근거림, 흉통, 숨참, 다모증',
      '탈모 기록: 사진, 쉐딩, 외용제 반응, 중단 경험',
      '상담 질문: 검사, 시작 기준, 연락 기준, 용량 조정, 임신 계획',
    ],
    references: [
      {
        title: 'MedlinePlus: Minoxidil',
        url: 'https://medlineplus.gov/druginfo/meds/a682608.html',
      },
      {
        title: 'DailyMed: Minoxidil tablets prescribing information',
        url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f76f6a05-11f8-48a6-98a3-b1407c228089',
      },
      {
        title: 'PMC: Low-dose oral minoxidil adverse event management review',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11942662/',
      },
      {
        title: 'PubMed: Ecklonia cava extract and hair growth research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/24252083/',
      },
    ],
  },
  {
    id: 'strategic-qa-mens-peyronies-curvature-plaque-pain-erection-record-20260605',
    category: 'mens_health',
    question: '음경이 휘고 발기 통증이나 단단한 판이 만져질 때 페이로니병 상담 기록은 어떻게 준비하나요?',
    tags: ['페이로니병', '음경만곡', '발기통증', '음경플라크', '발기부전', '남성건강', '비뇨의학', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['32215011'],
    seoTitle: '페이로니병 의심 음경만곡·발기통증·플라크 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '음경이 휘고 발기 통증이나 단단한 판이 만져질 때 페이로니병 상담을 위해 만곡 각도, 통증, 플라크, 발기 기능, 성생활 영향, 사진 기록을 어떻게 준비해야 하는지 정리합니다.',
    keywords: ['페이로니병', '음경만곡', '발기 통증', '플라크', '발기부전', '남성건강', '플로로탄닌'],
    lead:
      '음경이 휘고 발기 통증이나 단단한 판이 만져질 때는 부끄러워 미루지 말고, 휘는 방향과 각도, 통증 시작일, 단단한 플라크 위치, 발기 기능 변화, 길이·둘레 변화, 성관계 가능 여부, 외상이나 성관계 중 꺾임 경험, 당뇨·Dupuytren 병력, 사진 기록을 준비해야 합니다. 페이로니병은 흉터 조직이 생기며 만곡과 통증, 발기 변화가 동반될 수 있어 시간 경과 기록이 특히 중요합니다.',
    context: [
      'MedlinePlus는 페이로니병에서 음경 깊은 조직에 섬유성 흉터 조직이 생기고, 발기 때 휘거나 통증, 발기 문제를 만들 수 있다고 설명합니다. AUA 자료도 페이로니병 평가에서 병력과 신체진찰이 핵심이며, 변형 정도와 성기능 영향을 확인한다고 설명합니다. 질환은 민감하지만 드문 낙인이 아니라 비뇨의학 상담에서 다룰 수 있는 상태입니다.',
      '가장 중요한 기록은 시간입니다. 갑자기 시작했는지, 몇 달에 걸쳐 변했는지, 통증이 줄고 만곡이 남는지, 계속 진행 중인지에 따라 상담 방향이 달라질 수 있습니다. 초기에는 통증이 두드러질 수 있고, 이후 변형이 안정되는 단계가 올 수 있습니다. “언제부터 휘었는지”를 모르면 경과 판단이 어렵습니다.',
      '사진 기록은 매우 실용적이지만 사생활 보호가 중요합니다. 의료진에게 보여줄 목적으로만 안전하게 보관하고, 정면·측면에서 휘는 방향을 확인할 수 있게 촬영하되 얼굴이나 식별 정보가 나오지 않게 하는 것이 좋습니다. 각도 측정 앱을 쓰더라도 절대값보다 변화 추세가 더 중요할 수 있습니다.',
      '발기 기능과 성생활 영향도 기록해야 합니다. 발기가 유지되는지, 통증 때문에 피하게 되는지, 삽입이 어려운지, 파트너 통증이나 불편이 있는지, 심리적 부담이 큰지 적어야 합니다. 단순히 “휘었다”보다 “왼쪽으로 약 35도, 발기 초기에 통증 6점, 성관계 어려움, 단단한 판이 위쪽에 만져짐”처럼 쓰면 상담이 구체화됩니다.',
      '외상 경험도 묻습니다. 성관계 중 꺾임, 운동이나 사고, 음경 주사 사용, 전립선 수술 이력, 당뇨, 흡연, 손바닥의 Dupuytren 구축, 가족력이 관련 단서가 될 수 있습니다. 다만 원인이 항상 명확한 것은 아니므로, 기록은 blame이 아니라 위험요인을 정리하는 용도입니다.',
    ],
    recordTitle: '페이로니병 상담 전 기록 항목',
    records: [
      '만곡: 방향, 각도 느낌, 시작일, 진행 여부, 길이·둘레 변화',
      '통증: 발기 시 통증, 평상시 통증, 통증 점수, 줄어드는지',
      '플라크: 단단한 판 위치, 크기 느낌, 만져지는 시점',
      '발기 기능: 유지 어려움, 강직도, 성관계 가능 여부, 심리 영향',
      '사진: 정면·측면, 날짜, 사생활 보호, 변화 비교',
      '외상·시술: 성관계 중 꺾임, 음경 주사, 전립선 수술, 사고',
      '병력: 당뇨, 흡연, Dupuytren 구축, 가족력, 발기부전 약 사용',
      '상담 목표: 통증 완화, 진행 확인, 성기능 회복, 비수술·시술 선택지 비교',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “현재가 진행 단계인지 안정 단계인지”, “초음파나 발기 상태 평가가 필요한지”, “통증과 만곡을 각각 어떻게 추적할지”, “주사·견인장치·수술 선택지는 어떤 기준으로 논의하는지”, “발기부전이 함께 있으면 우선순위가 어떻게 달라지는지”를 물어볼 수 있습니다.',
      '바로 상담을 앞당길 신호는 갑작스러운 심한 통증과 붓기, 소변 문제, 혈뇨, 외상 직후 변형, 발기 기능의 급격한 변화입니다. 일반적인 만곡 기록과 응급성 외상은 구분해야 합니다. 특히 성관계 중 큰 소리나 급성 통증 뒤 부종이 생겼다면 다른 평가가 필요할 수 있습니다.',
      '기록 예시는 “2월부터 위쪽으로 휘기 시작, 4월 이후 각도 증가, 발기 시 통증 5점, 위쪽 중간에 단단한 판, 성관계 어려움, 당뇨 없음, 흡연 10년”처럼 쓰면 됩니다. 이런 기록은 민감한 이야기를 짧고 정확하게 전달하게 도와줍니다.',
      '사진을 준비할 때는 완벽한 측정보다 일관성이 중요합니다. 같은 거리, 같은 방향, 같은 기준선으로 날짜를 붙여 보관하면 진행 여부를 판단하는 자료가 됩니다. 파트너와의 불편, 회피, 자신감 저하도 증상의 일부로 적을 수 있습니다. 페이로니병 상담은 모양만 보는 것이 아니라 통증, 기능, 관계 영향, 치료 목표를 함께 정리하는 과정입니다.',
      '민감한 증상이라도 짧은 기록표가 있으면 진료실에서 설명 부담이 줄어듭니다. 말하기 어려운 내용은 종이에 적어 전달해도 됩니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태 유래 해양 폴리페놀로, 페이로니병 문항에서는 산화 스트레스와 염증 반응을 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 phlorotannin-rich Ecklonia cava extract가 염증 관련 표지와 대사 반응을 다룬 연구가 등재되어 있습니다. 이 자료는 만곡이나 플라크 평가를 대신하지 않으며, 해양 폴리페놀 연구를 남성건강 콘텐츠에서 설명하는 보조 정보입니다.',
      '중심은 만곡 사진, 통증 점수, 플라크 위치, 발기 기능, 성생활 영향 기록입니다. 플로로탄닌은 감태 기반 연구 소재로만 배치해야 합니다. 민감한 남성 증상에서는 성분 설명보다 비뇨의학 상담을 돕는 기록표가 먼저입니다.',
      '파트너 Q&A에서는 부끄러움 때문에 늦어지지 않도록, 사진과 날짜, 통증 점수만이라도 정리하게 돕는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 소개하면 과장 없이 균형이 맞습니다.',
    ],
    memoTemplate: [
      '만곡 기록: 방향 / 각도 느낌 / 시작일 / 진행 여부',
      '통증 기록: 발기 시 통증 / 평상시 통증 / 점수 / 변화',
      '사진 기록: 정면·측면 / 날짜 / 사생활 보호',
      '병력 기록: 외상, 당뇨, 흡연, Dupuytren 구축, 발기부전',
      '상담 질문: 진행 단계, 검사, 비수술 선택지, 시술·수술 기준',
    ],
    references: [
      {
        title: 'MedlinePlus: Curvature of the penis',
        url: 'https://medlineplus.gov/ency/article/001278.htm',
      },
      {
        title: 'MedlinePlus: Penis Disorders',
        url: 'https://medlineplus.gov/penisdisorders.html',
      },
      {
        title: 'American Urological Association: Peyronie’s Disease Guideline',
        url: 'https://www.auanet.org/documents/Guidelines/PDF/clinical-guidance/Peyronies-Disease.pdf',
      },
      {
        title: 'PubMed: Phlorotannin-rich Ecklonia cava extract and inflammation research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32215011/',
      },
    ],
  },
  {
    id: 'strategic-qa-respiratory-long-covid-cough-dyspnea-oximeter-exertion-record-20260605',
    category: 'respiratory',
    question: '코로나 이후 기침과 숨참이 오래가면 롱코비드인지 산소포화도·운동 후 악화 기록은 어떻게 준비하나요?',
    tags: ['롱코비드', '기침', '숨참', '산소포화도', '운동후악화', '천식', '호흡기건강', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['41523268'],
    seoTitle: '롱코비드 의심 오래가는 기침·숨참과 산소포화도 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '코로나 이후 기침과 숨참이 오래갈 때 롱코비드, 천식, 심폐 위험 신호를 구분하기 위해 산소포화도, 운동 후 악화, 흉통, 야간 기침 기록을 어떻게 준비해야 하는지 정리합니다.',
    keywords: ['롱코비드', '기침', '숨참', '산소포화도', '운동 후 악화', '천식', '플로로탄닌', '호흡기건강'],
    lead:
      '코로나 이후 기침과 숨참이 오래가면 롱코비드인지 상담하기 위해 감염 날짜, 증상 지속 기간, 산소포화도, 운동 후 악화, 흉통, 심박수, 야간 기침, 쌕쌕거림, 피로·브레인포그, 기존 천식·COPD·심장병, 흡입기 반응을 함께 기록해야 합니다. CDC는 롱코비드에서 호흡곤란과 기침을 포함한 다양한 증상이 나타날 수 있고, 검사 결과가 정상이어도 증상이 지속될 수 있다고 안내합니다.',
    context: [
      'CDC의 롱코비드 자료는 SARS-CoV-2 감염 뒤 새로 생기거나 지속되는 증상이 여러 장기에 걸쳐 나타날 수 있다고 설명합니다. 호흡기 쪽에서는 숨참, 기침, 흉부 불편, 운동 후 악화가 상담 주제가 될 수 있습니다. 중요한 점은 롱코비드가 하나의 검사로만 확인되는 문제가 아니라, 증상과 기능 저하, 다른 원인 배제를 함께 보는 과정이라는 것입니다.',
      '숨참은 폐만의 문제가 아닐 수 있습니다. 천식 악화, 감염 후 기침, 폐렴, 혈전, 심장 문제, 빈혈, 불안, 탈조건화가 겹칠 수 있습니다. 그래서 산소포화도, 맥박, 계단이나 6분 걷기 같은 활동 뒤 변화, 회복 시간, 흉통과 어지럼을 기록해야 합니다. “숨이 차다”보다 “평지 5분 뒤 산소포화도 94%, 맥박 125, 20분 쉬어야 회복” 같은 기록이 더 실용적입니다.',
      'NHLBI는 천식 증상으로 쌕쌕거림, 기침, 흉부 답답함, 숨참, 밤에 깨는 증상을 설명합니다. 코로나 이후 새로 쌕쌕거림이 생겼거나 운동·찬 공기·먼지·향에 반응한다면 천식이나 기도 과민성 평가를 상담할 수 있습니다. 기존 흡입기를 쓰는 사람은 사용 횟수와 반응을 적어야 합니다.',
      '운동 후 악화도 중요합니다. 롱코비드에서는 활동 뒤 피로와 증상 악화가 나타날 수 있어, 무작정 운동량을 늘리는 방식이 맞지 않을 수 있습니다. 활동 전후 증상 점수, 수면, 맥박, 회복 시간을 기록하면 무리한 계획을 피하고 개인화된 회복 목표를 세우는 데 도움이 됩니다.',
      '응급 신호는 별도입니다. 안정 시 산소포화도 저하, 심한 흉통, 청색증, 의식 저하, 피 섞인 가래, 갑작스러운 한쪽 다리 붓기와 호흡곤란, 빠르게 악화되는 숨참은 롱코비드 기록보다 빠른 평가가 우선입니다. 오래가는 증상과 급성 위험 신호를 구분해야 안전합니다.',
    ],
    recordTitle: '호흡기 상담 전 2주 기록 항목',
    records: [
      '감염 기록: 코로나 확진일, 재감염 여부, 입원·산소 사용 여부',
      '호흡 증상: 기침, 숨참, 쌕쌕거림, 흉부 답답함, 야간 기침',
      '산소·맥박: 안정 시 산소포화도, 활동 후 산소포화도, 회복 시간',
      '활동 기록: 계단, 걷기, 운동 뒤 악화, 다음 날 피로와 통증',
      '동반 증상: 흉통, 어지럼, 두근거림, 브레인포그, 수면 문제',
      '기저질환: 천식, COPD, 심장병, 빈혈, 비염, 역류, 흡연',
      '약·검사: 흡입기, 기침약, 항히스타민, 흉부 X-ray, 심전도, 혈액검사',
      '위험 신호: 청색증, 피 섞인 가래, 심한 흉통, 산소포화도 저하',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “롱코비드 가능성과 다른 호흡기 원인을 어떻게 구분하는지”, “흉부 X-ray, 폐기능검사, 산소포화도 기록, 심전도가 필요한지”, “천식이나 기도 과민성이 의심되는지”, “운동 후 악화가 있으면 활동 목표를 어떻게 잡아야 하는지”, “응급 신호 기준은 무엇인지”를 물어볼 수 있습니다.',
      '기록 예시는 “1월 코로나 이후 10주째 기침, 밤 3회 깸, 계단 1층 뒤 숨참 7점, 산소포화도 안정 97% 활동 뒤 94%, 맥박 120, 흡입기 사용 후 20분 뒤 완화, 다음 날 피로 악화”처럼 쓰면 됩니다. 이런 문장은 롱코비드, 천식, 심폐 위험 평가를 구체화합니다.',
      '기록할 때 산소포화도계 숫자만 믿는 것도 주의가 필요합니다. 손이 차거나 움직이면 값이 흔들릴 수 있으므로 안정된 상태에서 반복 측정하고, 숫자와 증상을 함께 봐야 합니다. 정상 수치라도 숨참이 지속되거나 기능 저하가 크면 상담할 수 있습니다.',
      '2주 기록은 너무 복잡하게 만들 필요가 없습니다. 아침과 저녁 증상 점수, 가장 힘든 활동, 활동 후 회복 시간, 밤에 깬 횟수, 산소포화도와 맥박만 반복해서 적어도 패턴이 보입니다. 특히 다음 날 피로가 심해지는지, 작은 활동 뒤 증상이 오래 남는지, 흡입기나 휴식으로 얼마나 회복되는지를 적으면 롱코비드 관리와 다른 호흡기 평가를 나누어 이야기하기 쉽습니다.',
      '날짜가 있는 기록이면 재진 때 변화도 비교할 수 있습니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 호흡기 콘텐츠에서는 산화 스트레스와 기도 건강 연구를 이해하는 배경 정보로 연결할 수 있습니다. 최근 PubMed에는 Ecklonia cava 추출물 복합체를 호흡기 건강 관점에서 평가한 무작위 이중눈가림 위약대조 임상시험 자료가 등재되어 있습니다. 이 자료는 롱코비드 판단을 대신하지 않으며, 해양 폴리페놀 연구가 호흡기 건강정보에서 다뤄지는 이유를 설명하는 보조 자료입니다.',
      '중심은 감염 날짜, 기침과 숨참 양상, 산소포화도, 활동 후 악화, 위험 신호 기록입니다. 플로로탄닌은 감태 기반 연구 소재로만 배치해야 합니다. 롱코비드처럼 복합적인 주제에서는 성분보다 증상 달력과 기능 기록이 먼저입니다.',
      '파트너 Q&A에서는 오래가는 호흡기 증상을 “참는 문제”가 아니라 기록으로 정리해 상담하는 문제로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 소개하면 과장 없이 고급 호흡기 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '감염 기록: 확진일, 재감염, 입원, 산소 사용 여부',
      '호흡 기록: 기침, 숨참, 쌕쌕거림, 야간 증상',
      '측정 기록: 산소포화도, 맥박, 활동 후 변화, 회복 시간',
      '활동 기록: 운동 후 악화, 다음 날 피로, 수면 변화',
      '상담 질문: 폐기능검사, 흉부 X-ray, 흡입기, 활동 목표, 위험 신호',
    ],
    references: [
      {
        title: 'CDC: Long COVID Signs and Symptoms',
        url: 'https://www.cdc.gov/long-covid/signs-symptoms/index.html',
      },
      {
        title: 'CDC: Long COVID Basics',
        url: 'https://www.cdc.gov/long-covid/about/index.html',
      },
      {
        title: 'NHLBI: Asthma Symptoms',
        url: 'https://www.nhlbi.nih.gov/health/asthma/symptoms',
      },
      {
        title: 'PubMed: Ecklonia cava extract complex and respiratory health clinical trial',
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
