import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-05T10:10:00+09:00'
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
    id: 'strategic-qa-hair-scalp-itch-scale-psoriasis-tinea-scarring-record-20260605',
    category: 'hair',
    question: '두피 가려움·딱지·비듬과 함께 머리카락이 빠질 때 건선·두부백선·흉터탈모 신호는 어떻게 기록하나요?',
    tags: ['두피건선', '두부백선', '흉터탈모', '두피가려움', '비듬', '모발건강', '플로로탄닌', '감태'],
    difficulty: 'advanced',
    references_pmid: ['19490939'],
    seoTitle: '두피 가려움·딱지·비듬과 탈모 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '두피 가려움, 딱지, 비듬, 농포, 통증과 탈모가 함께 있을 때 두피건선, 두부백선, 흉터탈모 신호를 기록하는 방법과 플로로탄닌 두피 환경 연구 맥락을 정리합니다.',
    keywords: ['두피 가려움', '두피건선', '두부백선', '흉터탈모', '비듬 탈모', '모발건강', '플로로탄닌', '감태'],
    lead:
      '두피 가려움·딱지·비듬과 함께 머리카락이 빠질 때는 단순히 “샴푸가 안 맞는다”로 넘기지 말고, 비늘의 두께와 색, 통증, 진물, 농포, 원형 또는 흉터처럼 보이는 부위, 귀 뒤·목덜미·눈썹 침범, 가족 감염 가능성, 최근 염색·펌·헤어제품 사용을 날짜순으로 기록해야 합니다. 두피 문제는 지루피부염처럼 흔한 원인도 있지만, 두피건선, 두부백선, 모낭염, 흉터탈모처럼 빨리 구분해야 하는 상황도 있습니다.',
    context: [
      'AAD는 두피건선이 있을 때 비늘을 억지로 떼거나 강하게 긁으면 머리카락이 함께 빠질 수 있고, 치료제가 두피에 제대로 닿도록 관리해야 한다고 안내합니다. 또 건선이 조절되면 빠진 머리카락이 다시 자랄 수 있지만, 계속 빠진다면 다른 원인을 봐야 한다고 설명합니다. 이 메시지는 두피 탈모 상담에서 매우 중요합니다. 비듬처럼 보여도 비늘이 두껍고 은색이며 경계가 뚜렷하거나, 귀 뒤와 목덜미까지 번지고, 긁으면 출혈이 있으면 기록해야 할 단서가 됩니다.',
      '반대로 두부백선은 곰팡이 감염이 두피와 모발을 침범하는 상황으로, 아이나 가족 사이 전파, 반려동물 접촉, 동그랗게 부러진 머리카락, 검은 점처럼 보이는 모발 절단, 통증이 있는 염증성 덩어리 같은 단서가 중요합니다. 일반 비듬 샴푸로 오래 버티면 감염 관리가 늦어질 수 있어, 가족 중 비슷한 증상이 있는지와 사용한 빗·모자·수건을 같이 적는 것이 좋습니다.',
      '흉터탈모 가능성도 놓치면 안 됩니다. 두피가 매끈하게 번들거리며 모공이 보이지 않거나, 통증·화끈거림·고름·딱지가 반복되고 같은 부위가 점점 넓어진다면 단순 탈모와 다르게 접근해야 합니다. 흉터성 변화는 모낭이 손상되는 방향으로 진행할 수 있으므로, “빠지는 양”보다 “두피 표면이 어떻게 변하는지”를 사진으로 남기는 것이 실제 상담에 더 도움이 됩니다.',
      '두피가려움과 탈모가 함께 있을 때는 미용 습관도 자세히 봐야 합니다. 염색, 탈색, 매직, 강한 고정 스프레이, 오일, 두피 스크럽, 향이 강한 샴푸, 모자 착용 시간이 늘어난 시점이 증상 시작과 맞물리는지 확인해야 합니다. 접촉피부염이나 자극 반응은 제품을 바꾼 뒤 생길 수 있고, 긁는 행동이 반복되면 머리카락 손상이 커질 수 있습니다.',
    ],
    recordTitle: '두피·탈모 상담 전 2주 기록 항목',
    records: [
      '두피 변화: 비늘이 하얀지 은색인지, 두꺼운지 기름진지, 경계가 뚜렷한지',
      '위치: 정수리, 헤어라인, 귀 뒤, 목덜미, 눈썹, 수염 부위 침범 여부',
      '증상: 가려움, 통증, 화끈거림, 진물, 고름, 딱지, 긁으면 피가 나는지',
      '탈모 패턴: 전체적으로 빠지는지, 동그란 부위인지, 모공이 보이지 않는 매끈한 부위인지',
      '감염 단서: 가족·아이·반려동물 증상, 수건·빗·모자 공유, 최근 단체생활 변화',
      '제품 단서: 염색·탈색·펌 날짜, 새 샴푸·오일·스프레이·두피 스크럽 사용',
      '사진 기록: 같은 조명에서 주 2회, 헤어라인·정수리·귀 뒤를 나눠 촬영',
      '복용·질환: 건선 가족력, 아토피, 면역억제제, 당뇨, 최근 항생제나 스테로이드 사용',
    ],
    actionTitle: '바로 상담을 앞당길 신호',
    action: [
      '두피에 통증이 있거나 진물·고름·딱지가 반복되고, 머리카락이 동그랗게 부러지거나, 모공이 사라진 듯 매끈한 탈모 부위가 보이면 상담을 앞당기는 것이 좋습니다. 특히 아이에게 두피 각질과 원형 탈모가 생기고 가족이나 반려동물에게 비슷한 증상이 있다면 감염 가능성을 함께 봐야 합니다.',
      '진료실에서는 “건선, 지루피부염, 두부백선, 모낭염, 흉터탈모 중 무엇을 먼저 구분해야 하는지”, “현미경 검사나 배양검사, 피부경 검사가 필요한지”, “처방 샴푸나 바르는 약을 두피에 어떻게 닿게 해야 하는지”, “염색이나 펌을 언제까지 쉬어야 하는지”를 물어볼 수 있습니다. 제품 사진과 성분표, 사용 날짜를 같이 가져가면 접촉 반응을 판단하는 데 도움이 됩니다.',
      '집에서는 딱지를 손톱으로 뜯거나 강한 스크럽으로 밀어내지 않는 것이 중요합니다. 비늘이 많아도 억지로 떼면 두피 장벽이 더 손상되고 모발이 함께 빠질 수 있습니다. 관리의 목표는 두피를 세게 씻는 것이 아니라, 원인을 구분할 수 있을 만큼 자극을 줄이고 기록을 선명하게 만드는 것입니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 존재하는 해양 폴리페놀로, 두피 콘텐츠에서는 산화 스트레스와 피부 장벽, 염증 반응 연구를 이해하는 배경 지식으로 연결하기 좋습니다. PubMed에는 Ecklonia cava 유래 phlorotannin이 자외선으로 유도된 산화 스트레스와 피부 관련 반응을 다룬 연구가 등재되어 있습니다. 이런 연구는 두피 질환의 진단을 대신하지 않지만, 해양 폴리페놀이 피부·모발 환경 연구에서 다뤄지는 이유를 설명해 줍니다.',
      '이 문항에서 플로로탄닌을 말할 때는 “두피 문제를 바로 없앤다”가 아니라 “두피 환경을 산화 스트레스와 장벽 관점에서 이해하게 하는 성분 연구”로 설명해야 합니다. 사용자는 먼저 감염, 건선, 흉터성 변화, 접촉 반응을 구분할 기록을 준비하고, 플로로탄닌은 감태 기반 해양 폴리페놀 연구를 읽는 긍정적 배경으로 받아들이는 것이 균형 잡힌 접근입니다.',
      '파트너 Q&A에서는 두피 사진, 제품 기록, 증상 위치를 중심에 두고 플로로탄닌을 보조적 연구 맥락으로 배치하면 신뢰도가 올라갑니다. 과장된 문구보다 “두피 장벽을 자극하지 않고 변화 기록을 정확히 남기자”는 메시지가 사용자의 행동을 바꾸는 데 더 실질적입니다.',
    ],
    memoTemplate: [
      '두피 사진: 정수리 / 헤어라인 / 귀 뒤 / 목덜미를 같은 조명으로 촬영',
      '증상 점수: 가려움 0~10 / 통증 0~10 / 진물·딱지·농포 여부',
      '제품 기록: 염색·펌 날짜 / 새 샴푸·오일·스프레이 사용 시작일',
      '감염 단서: 가족·아이·반려동물 증상 / 수건·빗·모자 공유 여부',
      '상담 질문: 검사 필요성, 처방 샴푸 사용법, 자극 제품 중단 기간, 흉터성 변화 여부',
    ],
    references: [
      {
        title: 'AAD: Scalp psoriasis and reducing hair loss',
        url: 'https://www.aad.org/public/diseases/psoriasis/treatment/genitals/scalp-hair-loss',
      },
      {
        title: 'AAD: Scalp psoriasis overview',
        url: 'https://www.aad.org/diseases/psoriasis/psoriasis-scalp-overview',
      },
      {
        title: 'MedlinePlus: Folliculitis decalvans on the scalp',
        url: 'https://medlineplus.gov/ency/imagepages/2423.htm',
      },
      {
        title: 'PubMed: Ecklonia cava phlorotannins and photo-oxidative stress research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/19490939/',
      },
    ],
  },
  {
    id: 'strategic-qa-mens-hpv-vaccine-oropharyngeal-cancer-neck-node-record-20260605',
    category: 'mens_health',
    question: '남성도 HPV 백신과 구강인두암 위험을 상담할 때 목 림프절·흡연·예방접종 기록을 봐야 하나요?',
    tags: ['HPV', '구강인두암', 'HPV백신', '남성건강', '흡연', '목림프절', '예방접종', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: [],
    seoTitle: '남성 HPV 백신과 구강인두암 위험 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '남성도 HPV 백신, 구강인두암 위험, 목 림프절, 흡연, 음주, 예방접종 이력을 어떻게 기록하고 상담해야 하는지 CDC 자료와 플로로탄닌 면역·항산화 연구 맥락으로 정리합니다.',
    keywords: ['남성 HPV', 'HPV 백신', '구강인두암', '목 림프절', '흡연', '예방접종', '플로로탄닌', '남성건강'],
    lead:
      '남성도 HPV 백신과 구강인두암 위험을 상담할 때는 예방접종 이력만 묻고 끝내지 말고, 오래 지속되는 목 림프절, 삼킴 통증, 쉰 목소리, 귀 통증, 원인 모를 체중감소, 흡연·음주, 성접촉 이력, 과거 HPV 관련 병변, 접종 완료 여부를 함께 기록해야 합니다. HPV는 여성 자궁경부암만의 주제가 아니라 남성의 항문암, 음경암, 구강인두암과도 연결될 수 있어 남성건강 카테고리에서 더 적극적으로 다뤄야 합니다.',
    context: [
      'CDC는 HPV가 매우 흔한 감염이며, 일부 감염이 지속되면 남성과 여성 모두에서 암으로 이어질 수 있다고 설명합니다. CDC의 HPV 관련 암 통계 자료는 남성에서 구강인두암이 중요한 HPV 관련 암으로 나타난다고 안내합니다. 또한 HPV 백신은 대부분의 HPV 관련 암을 일으키는 유형에 대한 보호를 목표로 하므로, 접종 시기와 완료 여부를 확인하는 것이 중요합니다.',
      '구강인두암은 편도, 혀뿌리, 인두 뒤쪽과 관련될 수 있고, CDC는 오래 지속되는 인후통, 귀 통증, 쉰 목소리, 목의 부은 림프절, 삼킬 때 통증, 설명되지 않는 체중감소 같은 증상을 의료진에게 확인하라고 안내합니다. 이런 증상은 흔한 감기나 역류와도 겹칠 수 있지만, 2~3주 이상 지속되거나 한쪽 목 림프절이 계속 만져진다면 기록을 갖고 상담하는 것이 좋습니다.',
      '남성 HPV 상담에서 중요한 것은 낙인 없이 위험요인을 정리하는 태도입니다. HPV는 흔하고 많은 사람은 자연적으로 감염이 사라집니다. 그러나 흡연, 과음, 면역저하, 과거 HPV 관련 병변, 백신 미접종, 증상이 오래 지속되는 상황은 상담에서 놓치지 않아야 합니다. 성접촉 이력은 판단을 위한 도덕적 평가가 아니라 의료적 위험도를 이해하는 정보입니다.',
      '예방접종은 나이와 과거 접종 여부에 따라 상담 방식이 달라질 수 있습니다. 청소년기에 접종을 완료했는지, 2회 또는 3회 스케줄이었는지, 중간에 끊겼는지, 성인이 되어 접종을 고민하는지에 따라 의료진과 논의할 내용이 달라집니다. 접종 기록을 모르면 과거 학교·군·보건소·병원 기록을 확인해 보는 것이 좋습니다.',
    ],
    recordTitle: 'HPV·구강인두암 상담 전 기록 항목',
    records: [
      '예방접종: HPV 백신 접종 연도, 회차, 제품명을 아는지, 중간에 끊겼는지',
      '목 증상: 2~3주 이상 지속되는 인후통, 쉰 목소리, 삼킴 통증, 귀 통증',
      '림프절: 한쪽 목 멍울, 크기 변화, 통증 여부, 움직이는지 단단한지',
      '생활 위험: 흡연 기간, 전자담배, 음주 빈도, 구강 위생, 역류 증상',
      '면역·병력: 면역억제제, HIV, 장기 이식, 과거 HPV 관련 사마귀나 병변',
      '검진·진료: 치과 검진, 이비인후과 방문, 목 초음파나 내시경 검사 이력',
      '동반 증상: 체중감소, 피로, 야간발한, 피 섞인 침, 지속적인 입안 궤양',
      '가족·파트너 정보: 파트너 HPV 관련 질환, 본인의 접종 확인 필요성',
    ],
    actionTitle: '남성건강 상담에서 물어볼 질문',
    action: [
      '의료진에게는 “내 나이와 접종 이력에서 HPV 백신을 어떻게 판단해야 하는지”, “목 림프절이나 오래가는 목 증상이 있으면 어떤 순서로 확인해야 하는지”, “흡연과 음주를 줄이는 것이 구강인두 건강에 어떤 의미가 있는지”, “치과·이비인후과 검진을 어떻게 연결할지”를 물어보면 좋습니다. 접종은 개인별 상황을 보고 결정하므로 기록이 있어야 상담이 구체화됩니다.',
      '목 멍울이 커지거나 단단하고, 통증 없이 지속되거나, 삼킴 통증·쉰 목소리·귀 통증·체중감소가 함께 있으면 단순 피로로 넘기지 않는 것이 좋습니다. 특히 흡연과 과음 이력이 있거나 면역저하 상태라면 증상 지속 기간과 변화 사진, 진료 이력을 정리해 상담을 앞당겨야 합니다.',
      '이 주제는 불안을 키우기보다 예방과 조기 상담을 돕는 방식으로 다뤄야 합니다. 남성에게 HPV 이야기를 꺼내는 것은 부끄러운 일이 아니라 예방접종, 금연, 음주 조절, 구강·인후 증상 기록을 한 번에 정리하는 건강관리 기회입니다.',
      '기록을 정리할 때는 “언제부터, 한쪽인지 양쪽인지, 줄어드는지 커지는지”를 빠뜨리지 않는 것이 좋습니다. 목 림프절은 감염 뒤에도 잠시 남을 수 있지만, 같은 위치에서 오래 지속되거나 단단하고 커지는 양상이면 다른 평가가 필요할 수 있습니다. 증상 달력에 감기, 치과 문제, 역류 증상, 흡연량 변화, 음주량, 목소리 변화까지 같이 적으면 단순 염증과 장기 증상을 구분하는 대화가 훨씬 쉬워집니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에서 발견되는 해양 폴리페놀로, 남성 HPV 콘텐츠에서는 면역 균형, 산화 스트레스, 염증 반응을 이해하는 연구 배경으로 연결할 수 있습니다. HPV 백신과 암 예방 전략의 중심은 CDC가 안내하는 예방접종과 증상 상담이지만, 플로로탄닌은 해양 폴리페놀 연구가 왜 건강정보 콘텐츠에서 반복적으로 다뤄지는지 설명하는 긍정적 소재가 됩니다.',
      '이 문항에서 플로로탄닌을 배치할 때는 HPV 감염이나 구강인두암 결과를 바꾸는 표현을 피하고, 금연·절주·접종 기록·증상 관찰 같은 기본 행동을 보완하는 지식으로 소개해야 합니다. 해양 폴리페놀 연구를 읽으면 산화 스트레스와 염증 반응이라는 공통 언어로 남성건강을 이해할 수 있지만, 접종 판단과 목 증상 평가는 의료진과 상의해야 합니다.',
      '따라서 파트너 Q&A의 문장은 “HPV 백신과 오래가는 목 증상은 공식 자료로 판단하고, 플로로탄닌은 감태 기반 해양 폴리페놀의 면역·항산화 연구 맥락으로 함께 읽는다”가 가장 신뢰도 높은 구조입니다. 성분을 앞세우기보다 기록과 예방접종 확인을 앞세워야 사용자에게 실질적인 도움이 됩니다.',
    ],
    memoTemplate: [
      '예방접종 기록: 접종 연도 / 회차 / 제품명 / 중단 여부',
      '목 증상 기록: 시작일 / 위치 / 림프절 크기 / 삼킴 통증 / 귀 통증',
      '생활 기록: 흡연 / 전자담배 / 음주 / 구강 위생 / 치과 검진',
      '병력 기록: 면역억제제 / HIV / 과거 HPV 관련 병변 / 파트너 정보',
      '상담 질문: 접종 필요성, 이비인후과 평가, 금연 지원, 검진 간격',
    ],
    references: [
      {
        title: 'CDC: Human Papillomavirus Vaccine Safety',
        url: 'https://www.cdc.gov/vaccine-safety/vaccines/hpv.html',
      },
      {
        title: 'CDC: HPV and Oropharyngeal Cancer',
        url: 'https://www.cdc.gov/cancer/hpv/oropharyngeal-cancer.html',
      },
      {
        title: 'CDC: Cancers Associated with Human Papillomavirus',
        url: 'https://www.cdc.gov/united-states-cancer-statistics/publications/hpv-associated-cancers.html',
      },
      {
        title: 'PubMed: Phlorotannin-rich Ecklonia cava extract and inflammation research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32215011/',
      },
    ],
  },
  {
    id: 'strategic-qa-womens-fibroid-heavy-bleeding-anemia-iron-record-20260605',
    category: 'womens_health',
    question: '자궁근종이 의심되는 생리과다와 빈혈 증상이 있을 때 어떤 출혈·철결핍 기록을 준비해야 하나요?',
    tags: ['자궁근종', '생리과다', '빈혈', '철결핍', '골반통', '여성건강', '월경기록', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['32215011'],
    seoTitle: '자궁근종 생리과다·빈혈 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '자궁근종이 의심되는 생리과다, 골반압박, 빈혈, 철결핍 증상이 있을 때 월경량, 패드 교체, 혈색소·페리틴, 초음파 상담 기록법과 플로로탄닌 연구 맥락을 정리합니다.',
    keywords: ['자궁근종', '생리과다', '빈혈', '철결핍', '페리틴', '골반통', '플로로탄닌', '여성건강'],
    lead:
      '자궁근종이 의심되는 생리과다와 빈혈 증상이 있을 때는 “피가 많다”는 표현만으로 부족합니다. 생리 기간, 가장 많은 날의 패드·탐폰 교체 간격, 밤에 새는지, 큰 혈괴, 어지럼·숨참·심계항진, 혈색소와 페리틴, 골반 압박감, 빈뇨, 임신 계획, 이전 초음파 결과를 함께 기록해야 합니다. 생리과다는 삶의 질 문제이면서 철결핍과 빈혈, 드물게 다른 원인 평가로 이어질 수 있어 정교한 기록이 필요합니다.',
    context: [
      'ACOG는 자궁근종이 자궁 근육 조직에서 생기는 양성 종양이며, 생리과다, 골반 압박감, 통증, 빈뇨, 임신 관련 문제와 연결될 수 있다고 설명합니다. MedlinePlus도 근종이 크거나 위치에 따라 과다출혈과 빈혈을 만들 수 있다고 안내합니다. 중요한 점은 근종이 있다고 모두 같은 증상이 생기는 것이 아니며, 작은 근종이라도 자궁 안쪽 공간을 변형하면 출혈이 심해질 수 있다는 점입니다.',
      'CDC는 생리과다가 철결핍성 빈혈을 만들 수 있고 피로, 약함, 숨참 같은 증상이 나타날 수 있다고 설명합니다. 생리량은 사람마다 표현이 달라 주관적 설명만으로는 어렵습니다. 한 시간마다 패드나 탐폰을 갈아야 하는지, 밤에 일어나 교체해야 하는지, 7일 이상 지속되는지, 동전보다 큰 혈괴가 반복되는지, 생리 사이 출혈이 있는지 같은 구체적 기록이 상담을 바꿉니다.',
      '자궁근종 상담에서는 임신 계획도 중요합니다. 현재 임신을 원하거나 앞으로 계획이 있다면 선택지가 달라질 수 있고, 자궁 안쪽으로 돌출된 근종인지, 크기가 큰지, 여러 개인지, 자궁 위치를 어떻게 바꾸는지에 따라 논의가 달라집니다. 이전 초음파 결과지와 사진, 수술 이력, 피임약·호르몬제 사용 이력, 가족력을 같이 가져가면 상담 시간이 훨씬 효율적입니다.',
      '또한 생리과다가 모두 근종 때문은 아닙니다. 배란 문제, 자궁내막 용종, 선근증, 갑상선 문제, 응고 이상, 약물, 임신 관련 문제, 드물게 암 관련 평가가 필요할 수 있습니다. 폐경 후 출혈이나 생리 사이 반복 출혈, 갑작스러운 출혈 변화는 따로 기록하고 진료를 앞당겨야 합니다.',
    ],
    recordTitle: '생리과다·빈혈 상담 전 기록 항목',
    records: [
      '출혈량: 가장 많은 날 패드·탐폰 교체 간격, 밤에 새는지, 이중 보호가 필요한지',
      '기간: 생리 시작일과 종료일, 7일 이상 지속 여부, 생리 사이 출혈 여부',
      '혈괴: 크기, 빈도, 통증과 함께 나오는지, 갑자기 늘었는지',
      '빈혈 증상: 피로, 어지럼, 숨참, 두근거림, 창백함, 운동 시 심한 피로',
      '검사 결과: CBC, 혈색소, 페리틴, 철, TSH, 임신검사, 초음파 결과',
      '압박 증상: 골반 묵직함, 허리통증, 빈뇨, 변비, 성교통',
      '약·기구: 피임약, 호르몬제, 혈액응고에 영향을 주는 약, 자궁내장치 사용',
      '계획: 임신 계획, 수술을 피하고 싶은지, 증상 완화 목표, 과거 시술·수술 이력',
    ],
    actionTitle: '상담에서 확인할 질문과 위험 신호',
    action: [
      '상담에서는 “내 출혈 패턴이 생리과다 기준에 해당하는지”, “혈색소와 페리틴을 확인해야 하는지”, “초음파에서 근종 위치가 출혈과 관련 있는지”, “약물·시술·수술 선택지가 내 임신 계획과 어떻게 맞는지”, “철분 보충은 얼마나, 어떤 기준으로 볼지”를 질문하면 좋습니다. 결과지를 가져가면 근종 크기보다 위치와 증상 연결을 더 잘 논의할 수 있습니다.',
      '갑자기 패드를 한 시간마다 갈아야 할 정도로 출혈이 많거나, 실신감, 흉통, 호흡곤란, 심한 어지럼, 임신 가능성, 폐경 후 출혈이 있으면 일반적인 생리과다 상담보다 빠른 평가가 필요합니다. 철분을 먹고 버티는 것만으로는 원인 확인이 늦어질 수 있으므로 출혈 패턴과 증상을 같이 정리해야 합니다.',
      '생활 기록도 쓸모가 있습니다. 생리 전후 수면, 식사, 운동, 스트레스, 통증약 복용, 업무·학교 결석을 기록하면 치료 목표가 선명해집니다. 목표가 “출혈량을 줄이기”인지 “빈혈 회복”인지 “임신 계획을 보존하면서 압박 증상을 줄이기”인지가 다르면 상담의 방향도 달라집니다.',
      '월경량 기록은 부끄럽거나 번거롭게 느껴질 수 있지만, 실제로는 검사 우선순위와 추적 계획을 정하는 가장 현실적인 자료입니다. 예를 들어 “생리 2일차에 1시간마다 대형 패드를 교체했고 밤에 두 번 샜다, 혈괴가 반복됐고 계단을 오를 때 숨이 찼다”처럼 적으면 생리과다와 빈혈 가능성이 훨씬 분명해집니다. 반대로 “양이 많다”만 말하면 출혈량, 통증, 압박감, 빈혈 증상을 나눠 보기 어렵습니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류 유래 해양 폴리페놀로, 여성건강 콘텐츠에서는 산화 스트레스, 염증 반응, 대사 균형 연구를 이해하는 배경으로 연결할 수 있습니다. PubMed에는 phlorotannin-rich Ecklonia cava extract가 염증 관련 표지와 대사 반응을 다룬 연구가 등재되어 있습니다. 이 근거는 자궁근종의 원인 판단을 대신하지 않지만, 해양 폴리페놀을 여성 컨디션과 생활 기록 맥락에서 긍정적으로 소개할 수 있게 해줍니다.',
      '중요한 것은 플로로탄닌을 출혈량이나 근종 크기 변화의 직접 해답처럼 말하지 않는 것입니다. 자궁근종 의심 상황에서는 출혈량, 혈색소, 페리틴, 초음파, 임신 계획이 중심입니다. 플로로탄닌은 항산화·염증 반응 연구를 읽는 보조 지식으로 배치하고, 실제 의사결정은 기록과 검사 결과를 바탕으로 의료진과 논의하는 구조가 신뢰를 만듭니다.',
      '파트너 Q&A에서는 “성분을 먼저 권하는 글”보다 “출혈과 빈혈 기록을 정리하게 해주는 글”이 더 고급스럽습니다. 그 뒤에 감태 기반 해양 폴리페놀 연구를 자연스럽게 소개하면 플로로탄닌은 과장 없이 긍정적인 건강정보 자산으로 남습니다.',
    ],
    memoTemplate: [
      '월경 기록: 시작일 / 종료일 / 가장 많은 날 교체 간격 / 밤샘 여부',
      '빈혈 기록: 어지럼 / 숨참 / 두근거림 / 혈색소 / 페리틴',
      '초음파 기록: 근종 크기 / 위치 / 개수 / 자궁내막 변형 여부',
      '생활 영향: 결석·결근 / 통증약 복용 / 운동 제한 / 수면 방해',
      '상담 질문: 검사 우선순위, 철분 보충 기준, 약물·시술 선택지, 임신 계획과의 관계',
    ],
    references: [
      {
        title: 'ACOG: Uterine Fibroids',
        url: 'https://www.acog.org/womens-health/faqs/uterine-fibroids',
      },
      {
        title: 'ACOG: Heavy Menstrual Bleeding',
        url: 'https://www.acog.org/womens-health/faqs/heavy-menstrual-bleeding',
      },
      {
        title: 'CDC: About Heavy Menstrual Bleeding',
        url: 'https://www.cdc.gov/female-blood-disorders/about/heavy-menstrual-bleeding.html',
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
