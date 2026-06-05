import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-05T19:25:00+09:00'
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
    id: 'strategic-qa-hair-telogen-effluvium-fever-diet-stress-shedding-record-20260605',
    category: 'hair',
    question: '고열·감염·다이어트 뒤 머리카락이 한꺼번에 빠지면 휴지기 탈모 상담 기록은 어떻게 준비하나요?',
    tags: ['휴지기탈모', '탈모상담', '고열후탈모', '다이어트탈모', '스트레스탈모', '철분', '갑상선', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['24252083', '26848214'],
    seoTitle: '고열·감염·다이어트 후 휴지기 탈모 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '고열, 감염, 급격한 체중감량, 출산, 스트레스 뒤 머리카락이 한꺼번에 빠질 때 휴지기 탈모 상담 전 사건 날짜, 빠짐 양, 혈액검사, 두피 사진을 어떻게 기록할지 정리합니다.',
    keywords: ['휴지기 탈모', '고열 후 탈모', '다이어트 탈모', '스트레스 탈모', '철분', '갑상선', '플로로탄닌'],
    lead:
      '고열, 코로나·독감 같은 감염, 수술, 출산, 급격한 다이어트, 심한 스트레스 뒤 2~4개월쯤 지나 머리카락이 한꺼번에 빠진다면 휴지기 탈모 가능성을 포함해 기록해야 합니다. 준비할 것은 사건 날짜, 체중 변화, 식사 제한, 생리·출산 이력, 복용약, 샤워·빗질 때 빠지는 양, 두피 사진, 가르마 변화, 피로·냉증·두근거림, 철분·갑상선·비타민D 같은 검사 이력입니다.',
    context: [
      'MedlinePlus는 신체적 또는 정서적 스트레스가 두피 모발의 상당 부분을 빠지게 할 수 있고, 이런 형태를 telogen effluvium이라고 설명합니다. 머리카락이 샴푸, 빗질, 손으로 쓸어 넘길 때 한 움큼씩 빠질 수 있으며, 대개 의학적 병력과 두피·모발 진찰이 원인 평가의 출발점이 됩니다. 따라서 “오늘 많이 빠졌다”보다 몇 달 전 몸에 어떤 일이 있었는지가 중요합니다.',
      'AAD는 hair shedding과 hair loss를 구분해 설명하면서, 출산, 고열, 수술, 체중감량, 심한 스트레스 뒤 과도한 빠짐이 생길 수 있다고 안내합니다. 휴지기 탈모는 모낭이 사라졌다는 뜻이 아니라 많은 모발이 동시에 휴지기에 들어갔다가 빠지는 패턴일 수 있습니다. 하지만 남성형·여성형 탈모, 원형탈모, 흉터성 탈모, 갑상선질환, 철 결핍이 겹칠 수 있어 기록이 필요합니다.',
      '상담의 핵심은 시간표입니다. 감염일, 열이 난 기간, 항생제나 항바이러스제 사용, 수술일, 출산일, 체중이 줄어든 속도, 단백질 섭취 감소, 수면 부족, 새 약 시작일을 한 줄로 정리해야 합니다. 휴지기 탈모는 사건 직후가 아니라 몇 달 뒤 보이는 경우가 많아, 진료실에서 날짜를 말하지 못하면 원인 연결이 흐려질 수 있습니다.',
      '빠지는 양은 숫자를 완벽히 세기보다 같은 조건으로 기록하면 됩니다. 샤워 배수구 사진을 매일 찍는 방식은 불안을 키울 수 있으므로, 주 1~2회 정도 같은 시간대와 같은 세정 조건에서 “평소보다 2배”, “손으로 쓸 때 20올 이상”, “베개에 눈에 띄게 남음”처럼 적는 편이 현실적입니다. 동시에 가르마, 정수리, 앞머리 라인 사진을 한 달 간격으로 남기면 전체 숱 변화를 볼 수 있습니다.',
      '검사 기록도 중요합니다. 피로, 어지럼, 생리 과다, 채식·절식, 갑상선 증상, 최근 임신·출산, 만성질환이 있다면 혈액검사 상담이 필요할 수 있습니다. 이미 검사한 ferritin, CBC, TSH, 비타민D, 간·신장 수치가 있다면 수치와 날짜를 가져가야 합니다. “영양제를 먹고 있다”보다 제품명, 용량, 시작일, 중단일을 적는 것이 더 좋습니다.',
      '바로 상담을 앞당길 신호는 원형으로 빠지는 부위, 두피 통증·화끈거림·고름, 흉터처럼 반짝이는 두피, 눈썹·속눈썹 빠짐, 갑작스러운 체중감소, 심한 피로와 두근거림, 손발 차가움, 생리 변화입니다. 휴지기 탈모처럼 보여도 다른 원인이 있을 수 있어, 패턴과 위험 신호를 나누어 기록해야 합니다.',
    ],
    recordTitle: '휴지기 탈모 상담 전 기록 항목',
    records: [
      '사건 날짜: 고열, 감염, 수술, 출산, 다이어트 시작, 스트레스 사건',
      '빠짐 양상: 샤워·빗질·베개·손으로 쓸 때 빠짐, 시작일과 절정 시점',
      '사진: 정수리, 가르마, 앞머리 라인, 양쪽 측두부를 같은 조명으로 촬영',
      '식사·체중: 체중 변화, 단백질 섭취, 절식, 식욕 저하, 영양제',
      '동반 증상: 피로, 어지럼, 냉증, 두근거림, 생리 변화, 산후 상태',
      '검사 이력: CBC, ferritin, TSH, 비타민D, 간·신장 수치, 최근 검사 날짜',
      '약물·질환: 새 약, 항응고제, 여드름약, 호르몬제, 갑상선질환, 자가면역질환',
      '위험 신호: 원형 탈모, 두피 통증·고름, 흉터성 변화, 눈썹·속눈썹 빠짐',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “휴지기 탈모인지 다른 탈모가 겹쳤는지”, “어떤 혈액검사가 필요한지”, “회복을 관찰할 기간은 어느 정도인지”, “미녹시딜이나 다른 약제를 고려할 상황인지”, “단백질·철분·갑상선 문제를 어떻게 확인할지”를 물어볼 수 있습니다.',
      '기록 예시는 “2월 독감으로 39도 열 4일, 3월부터 다이어트로 6kg 감량, 5월 중순부터 샤워 때 평소의 3배 빠짐, 정수리 사진상 가르마 넓어짐은 뚜렷하지 않음, 피로와 생리량 증가, ferritin 검사 없음”처럼 쓰면 됩니다. 이런 문장은 사건, 시간차, 빠짐 양, 검사 필요성을 한 번에 보여줍니다.',
      '머리카락이 빠질 때는 제품을 여러 개 바꾸기 쉽지만, 상담 전에는 변수를 줄이는 것이 좋습니다. 샴푸, 두피 앰플, 영양제를 동시에 바꾸면 무엇이 도움이 됐고 무엇이 자극이 됐는지 알기 어렵습니다. 새 제품은 한 번에 하나씩, 시작일과 반응을 적고, 두피 따가움이나 발진이 생기면 중단 여부를 상담해야 합니다.',
      '회복 기록도 중요합니다. 빠짐이 줄어드는 시점, 짧은 잔머리, 가르마 사진 변화, 체중 안정, 식사 회복을 한 달 단위로 보면 불필요한 공포를 줄일 수 있습니다. 반대로 6개월 이상 빠짐이 계속되거나 점점 얇아지는 부위가 뚜렷하면 재평가가 필요합니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 휴지기 탈모 문항에서는 모발 생물학과 두피 환경 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 Ecklonia cava와 그 폴리페놀 성분이 모유두세포, 모낭 배양, 모발 성장 신호를 다룬 연구가 등재되어 있습니다.',
      '중심은 사건 날짜, 빠짐 양상, 두피 사진, 영양·검사 기록입니다. 플로로탄닌은 감태 기반 연구 소재로 소개하고, 휴지기 탈모 상담에서는 원인 사건과 회복 흐름을 확인하는 것이 먼저입니다. 이 순서를 지키면 성분 이야기가 과장되지 않고 모발 건강 연구 배경으로 자연스럽게 놓입니다.',
      '파트너 Q&A에서는 “한 움큼 빠진다”는 불안을 날짜와 사진, 검사 질문으로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 신뢰도 높은 모발 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '사건: 고열 / 감염 / 수술 / 출산 / 다이어트 / 스트레스 날짜',
      '빠짐: 시작일 / 샤워·빗질 양 / 베개 / 손으로 쓸 때',
      '사진: 정수리 / 가르마 / 앞머리 / 같은 조명 월 1회',
      '검사: CBC / ferritin / TSH / 비타민D / 최근 검사 날짜',
      '질문: 휴지기 탈모 여부 / 회복 기간 / 검사 / 약제 / 위험 신호',
    ],
    references: [
      {
        title: 'MedlinePlus: Hair loss',
        url: 'https://medlineplus.gov/ency/article/003246.htm',
      },
      {
        title: 'AAD: Do you have hair loss or hair shedding?',
        url: 'https://www.aad.org/public/diseases/hair-and-scalp-problems/alopecia-areata',
      },
      {
        title: 'MedlinePlus: Hair Loss',
        url: 'https://medlineplus.gov/hairloss.html',
      },
      {
        title: 'PubMed: Ecklonia cava promotes hair growth',
        url: 'https://pubmed.ncbi.nlm.nih.gov/24252083/',
      },
      {
        title: 'PubMed: Enhancement of Human Hair Growth Using Ecklonia cava Polyphenols',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26848214/',
      },
    ],
  },
  {
    id: 'strategic-qa-mens-psa-screening-family-history-bph-prostatitis-shared-decision-record-20260605',
    category: 'mens_health',
    question: 'PSA 전립선암 검사를 받을지 고민할 때 가족력·배뇨증상·검사 전 조건은 어떻게 기록하나요?',
    tags: ['PSA검사', '전립선암검진', '전립선특이항원', '가족력', '배뇨증상', '전립선비대증', '남성건강', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['37260154'],
    seoTitle: 'PSA 전립선암 검진 상담 전 가족력·배뇨증상 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      'PSA 검사를 받을지 고민할 때 나이, 가족력, 흑인 혈통, 배뇨증상, 전립선염 가능성, 최근 사정·자전거·시술 이력을 어떻게 정리할지 공식 자료 중심으로 설명합니다.',
    keywords: ['PSA 검사', '전립선암 검진', '가족력', '배뇨증상', '전립선비대증', '전립선염', '플로로탄닌'],
    lead:
      'PSA 전립선암 검사를 받을지 고민할 때는 “수치 하나로 암 여부를 알 수 있나”보다 나이, 가족력, 이전 PSA 수치, 배뇨증상, 전립선비대증·전립선염 병력, 최근 사정·자전거·요로감염·도뇨·전립선 시술, 복용약, 검사 목적을 기록해야 합니다. PSA는 전립선암 검진에 쓰이지만 암에만 특이적인 수치가 아니므로, 검사 전후 상담이 중요합니다.',
    context: [
      'CDC는 55~69세 남성이 PSA 검진의 이득과 위해를 의료진과 상의해 개인적으로 결정하도록 권고된다고 설명합니다. 70세 이상은 일상적인 검진을 권하지 않는다는 USPSTF 권고도 함께 안내합니다. 이 말은 PSA 검사가 무의미하다는 뜻이 아니라, 조기 발견 가능성과 과진단·불필요한 검사·치료 부담을 같이 따져야 한다는 뜻입니다.',
      'NCI는 PSA가 전립선특이항원이지만, 전립선암이 아닌 전립선비대증, 전립선염, 나이, 일부 시술이나 상태에서도 올라갈 수 있다고 설명합니다. 따라서 한 번의 숫자만 보고 결론을 내리기보다 이전 수치와 변화, 증상, 위험요인을 함께 봐야 합니다. 검사 전 조건을 기록하면 불필요한 불안을 줄이고 재검 여부를 더 차분하게 논의할 수 있습니다.',
      '위험도 기록은 상담의 출발점입니다. 아버지·형제·아들의 전립선암, 진단 나이, 전이성 또는 고위험 전립선암 여부, 유방암·난소암·췌장암 가족력, BRCA 등 유전자 검사, 흑인 혈통, 과거 전립선 조직검사나 MRI 이력, 이전 PSA 수치를 적어야 합니다. 특히 가족 중 젊은 나이에 진단된 경우는 상담의 무게가 달라질 수 있습니다.',
      '배뇨증상도 따로 적어야 합니다. 소변 줄기가 약한지, 밤에 몇 번 일어나는지, 잔뇨감, 급박뇨, 통증, 혈뇨, 발열, 골반 통증이 있는지 기록합니다. 전립선비대증이나 전립선염은 PSA 해석에 영향을 줄 수 있고, 혈뇨나 감염 증상은 검진 상담과 별도 평가가 필요할 수 있습니다. “PSA를 찍을까요”보다 “증상이 있는지 없는지”가 먼저입니다.',
      '검사 전 조건도 중요합니다. 최근 요로감염, 전립선염 의심, 도뇨관 삽입, 방광경 검사, 전립선 마사지, 격한 자전거, 사정, 일부 약물은 상담에서 언급해야 합니다. 의료기관마다 안내가 다를 수 있으므로 검사 전 피해야 할 행동이나 재검 시점을 확인하는 것이 좋습니다. 검사를 이미 했다면 검사 전 며칠간의 상황을 뒤늦게라도 적어야 합니다.',
      '검사 결과가 높게 나와도 바로 암 확정은 아닙니다. 반복 PSA, 자유 PSA 비율, PSA density, 전립선 MRI, 바이오마커, 조직검사 여부는 개인 상황에 따라 논의될 수 있습니다. 반대로 정상 범위처럼 보여도 가족력과 증상이 있으면 상담이 필요할 수 있습니다. 숫자 하나보다 질문표가 더 중요합니다.',
    ],
    recordTitle: 'PSA 상담 전 기록 항목',
    records: [
      '기본 정보: 나이, 이전 PSA 날짜와 수치, 이전 전립선 MRI·조직검사',
      '가족력: 전립선암, 유방암, 난소암, 췌장암, 진단 나이, 고위험 여부',
      '배뇨증상: 야간뇨, 약한 소변줄기, 잔뇨감, 급박뇨, 통증, 혈뇨',
      '감염·염증 단서: 발열, 골반 통증, 요로감염, 최근 항생제',
      '검사 전 조건: 사정, 자전거, 도뇨, 방광경, 전립선 시술, 전립선염',
      '복용약: 5알파환원효소억제제, 테스토스테론, 항응고제, 보충제',
      '상담 목표: 처음 검진, 추적 검사, 높은 PSA 재평가, 가족력 때문에 상담',
      '결정 기준: 검진 이득, 과진단 부담, MRI·조직검사 가능성, 추적 간격',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “내 나이와 가족력에서 PSA 검진을 시작하거나 반복할 기준은 무엇인지”, “이전 PSA와 비교해 변화가 의미 있는지”, “검사 전 조건이 수치에 영향을 줄 수 있는지”, “높게 나오면 바로 조직검사인지 재검·MRI·추가 지표를 먼저 볼지”를 물어볼 수 있습니다.',
      '기록 예시는 “58세, 아버지 62세 전립선암, 이전 PSA 2024년 2.1, 2026년 3.8, 검사 전 주말 장거리 자전거, 야간뇨 2회, 통증·혈뇨 없음, 피나스테리드 복용 없음, 재검과 MRI 기준 상담 원함”처럼 쓰면 됩니다. 이런 문장은 위험도, 수치 변화, 해석 변수, 상담 목표를 한 번에 보여줍니다.',
      'PSA 결과를 받으면 숫자만 캡처하지 말고 검사 날짜, 검사실, 단위, 함께 검사한 항목, 전립선 크기 정보가 있는지까지 보관하세요. 같은 사람도 검사실과 상황에 따라 해석이 달라질 수 있습니다. 추적이 필요한 경우 표로 모아 가면 의료진이 변화 흐름을 더 빨리 볼 수 있습니다.',
      '배뇨증상이 있으면 전립선암 검진과 전립선비대증 상담이 섞일 수 있습니다. 소변 증상은 삶의 질 문제이고, PSA는 암 위험 평가 도구입니다. 두 질문을 분리해서 적어야 “암 검진”과 “증상 관리”가 동시에 정리됩니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, PSA 문항에서는 검진 판단을 바꾸는 성분이 아니라 산화 스트레스와 세포 연구를 이해하는 배경 정보로 연결할 수 있습니다. 해양 폴리페놀과 Ecklonia cava 연구는 항산화·염증 반응·세포 신호를 다루는 자료가 축적되어 있으며, 이런 맥락은 남성건강 콘텐츠의 연구 배경을 설명할 때 도움이 됩니다.',
      '중심은 PSA 수치, 가족력, 배뇨증상, 검사 전 조건, 재검·MRI·조직검사 상담 기록입니다. 플로로탄닌은 감태 기반 연구 소재로만 배치하고, 전립선암 검진 의사결정은 CDC와 NCI 같은 공식 정보와 의료진 상담이 앞에 와야 합니다.',
      '파트너 Q&A에서는 “수치가 높다 낮다”의 공포를 “왜 검사했고 어떻게 해석할지”로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 소개하면 긍정적이면서도 과장 없는 남성건강 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      'PSA 이력: 날짜 / 수치 / 검사실 / 이전 MRI·조직검사',
      '가족력: 누구 / 진단 나이 / 고위험·전이 여부 / 관련 암',
      '증상: 야간뇨 / 약한 줄기 / 혈뇨 / 통증 / 발열',
      '검사 전 조건: 사정 / 자전거 / 감염 / 도뇨·시술 / 약물',
      '질문: 검진 필요성 / 재검 간격 / MRI / 조직검사 / 과진단 부담',
    ],
    references: [
      {
        title: 'CDC: Should I Get Screened for Prostate Cancer?',
        url: 'https://www.cdc.gov/prostate-cancer/screening/get-screened.html',
      },
      {
        title: 'CDC: Screening for Prostate Cancer',
        url: 'https://www.cdc.gov/prostate-cancer/screening/',
      },
      {
        title: 'NCI: Prostate-Specific Antigen (PSA) Test',
        url: 'https://www.cancer.gov/types/prostate/psa-fact-sheet',
      },
      {
        title: 'NCI: Prostate Cancer Screening',
        url: 'https://www.cancer.gov/types/prostate/patient/prostate-screening-pdq',
      },
      {
        title: 'PMC: Early Detection of Prostate Cancer AUA/SUO Guideline Part I',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11060750/',
      },
    ],
  },
  {
    id: 'strategic-qa-respiratory-rsv-vaccine-adult-risk-pregnancy-abrysvo-record-20260605',
    category: 'respiratory',
    question: 'RSV 백신을 맞아야 하는지 상담할 때 나이·위험질환·임신 주수 기록은 어떻게 준비하나요?',
    tags: ['RSV백신', '호흡기세포융합바이러스', '고령자백신', '임신RSV백신', 'Abrysvo', 'Arexvy', '호흡기건강', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['41523268'],
    seoTitle: 'RSV 백신 상담 전 나이·위험질환·임신 주수 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '성인 RSV 백신 상담 전 75세 이상, 50~74세 고위험군, 임신 32~36주 Abrysvo 여부, 만성 폐·심장질환과 이전 접종 이력을 어떻게 정리할지 설명합니다.',
    keywords: ['RSV 백신', '성인 RSV 백신', '임신 RSV 백신', 'Abrysvo', 'Arexvy', '만성폐질환', '플로로탄닌'],
    lead:
      'RSV 백신을 맞아야 하는지 상담할 때는 나이만 보지 말고 만성 폐질환, 심혈관질환, 당뇨 합병증, 면역저하, 신장·간질환, 요양시설 거주, 허약 상태, 이전 RSV 백신 접종, 다른 백신 동시 접종 계획, 임신 32~36주 여부, 출산 예정일, 이전 임신 때 RSV 백신 접종 여부를 기록해야 합니다. CDC의 2026년 성인 안내는 75세 이상 전체와, 중증 RSV 위험이 높은 50~74세 성인에게 RSV 백신 1회 접종을 권고합니다.',
    context: [
      'CDC는 성인 RSV 백신 안내에서 75세 이상 모든 성인과 중증 RSV 위험이 높은 50~74세 성인에게 FDA 허가 RSV 백신 1회 접종을 권고한다고 설명합니다. 중증 위험에는 만성 폐질환, 심혈관질환, 중등도 또는 중증 면역저하, 요양시설 거주, 여러 만성질환과 허약 상태 등이 포함될 수 있습니다. 따라서 상담 전에는 단순히 “60대라 맞나요”보다 내 위험질환 목록을 정리해야 합니다.',
      '임신 중 RSV 백신은 별도 기록이 필요합니다. CDC는 임신 32주 0일에서 36주 6일 사이, 대체로 9월부터 1월 사이에 Pfizer Abrysvo 1회 접종을 안내합니다. 또한 영아 보호는 임신 중 maternal RSV vaccine 또는 출생 후 RSV 항체 중 하나의 전략으로 설명됩니다. 임신 주수, 출산 예정일, 계절, 이전 임신 때 접종 여부, 아기의 출생 시점이 상담에서 중요합니다.',
      '백신 이름도 기록해야 합니다. 성인용 RSV 백신에는 여러 제품이 있고, 임신 중 권고되는 제품은 Pfizer Abrysvo로 구분됩니다. 약국이나 의료기관 예약 때 임신 여부와 주수를 정확히 말해야 하며, 다른 RSV 백신을 임신 중 접종 대상으로 혼동하지 않도록 제품명을 확인해야 합니다. 이전 접종 기록이 있으면 날짜와 제품명을 적어야 합니다.',
      '위험질환 기록은 구체적일수록 좋습니다. COPD, 천식, 간질성 폐질환, 심부전, 관상동맥질환, 당뇨 합병증, 말기 신장질환, 만성 간질환, 혈액질환, 신경근육질환, 면역억제제, 암 치료, 장기이식, BMI 40 이상, 요양시설 거주, 최근 입원, 산소 사용 여부를 적어야 합니다. “몸이 약하다”보다 진단명과 약 이름이 더 도움이 됩니다.',
      '동시 접종 계획도 상담 주제입니다. CDC는 RSV 백신을 다른 성인 백신과 같은 방문에 맞을 수 있지만 주사 부위 통증, 발열, 두통, 근육통 같은 흔한 반응 빈도가 늘 수 있다고 설명합니다. 독감, 코로나19, 폐렴구균, 대상포진 백신을 언제 맞았거나 맞을 예정인지 적으면 접종 순서와 일정 상담이 쉬워집니다.',
      '접종 뒤 기록도 중요합니다. 접종일, 제품명, 접종 부위, 발열·근육통·두통, 알레르기 반응, 호흡기 증상, 다음 진료 예정일을 적어두면 이후 백신 이력 관리가 쉬워집니다. RSV 백신은 매년 반복 접종하는 인플루엔자 백신과 다르게 안내되는 부분이 있어, “작년에 맞았는지”가 매우 중요합니다.',
    ],
    recordTitle: 'RSV 백신 상담 전 기록 항목',
    records: [
      '나이와 대상: 75세 이상, 50~74세 고위험군, 임신 32~36주 여부',
      '위험질환: 만성 폐질환, 심장질환, 면역저하, 신장·간질환, 당뇨 합병증',
      '생활·기능: 요양시설 거주, 최근 입원, 산소 사용, 허약, 활동 제한',
      '임신 기록: 임신 주수, 출산 예정일, 계절, 이전 임신 RSV 백신 여부',
      '접종 이력: 이전 RSV 백신 제품명과 날짜, 독감·코로나·폐렴구균 백신',
      '복용약: 면역억제제, 항암제, 스테로이드, 항응고제, 알레르기 이력',
      '상담 목표: 접종 대상 여부, 제품 확인, 동시 접종, 부작용 대응',
      '접종 후 기록: 제품명, 날짜, 반응, 발열, 호흡기 증상, 의료기관 연락 기준',
    ],
    actionTitle: '의료진·약사에게 물어볼 질문',
    action: [
      '상담에서는 “내 나이와 질환에서 RSV 백신 권고 대상인지”, “이전에 RSV 백신을 맞았다면 다시 맞아야 하는지”, “독감·코로나19 백신과 같은 날 맞아도 되는지”, “임신 중이라면 Abrysvo 대상 주수와 계절에 해당하는지”, “접종 뒤 어떤 증상이 있으면 연락해야 하는지”를 물어볼 수 있습니다.',
      '기록 예시는 “72세, COPD와 심부전, 작년 독감 백신 접종, RSV 백신 이력 없음, 산소 사용 없음, 최근 겨울 호흡기 입원 1회, 코로나 백신도 예정, 동시 접종 가능성과 이상반응 상담 원함”처럼 쓰면 됩니다. 임신부라면 “임신 33주 2일, 출산 예정일 2026년 1월, 이전 임신 RSV 백신 없음, Abrysvo 제품 확인 필요”처럼 적으면 됩니다.',
      'RSV 백신 상담은 제품 선택보다 대상 확인이 먼저입니다. 나이가 기준에 걸쳐 있거나 50~74세 위험군인지 애매하다면 진단명, 약물, 입원력, 요양시설 여부를 적어 가야 합니다. 임신 중에는 제품명과 주수 확인이 특히 중요하므로 예약 단계에서부터 임신 주수를 말하는 편이 안전합니다.',
      '접종 뒤에는 흔한 반응과 위험 신호를 나눠 적어야 합니다. 주사 부위 통증, 피로, 근육통은 흔한 범주일 수 있지만, 호흡곤란, 얼굴·입술 부종, 심한 두드러기, 지속되는 고열, 신경학적 증상이 있으면 빠른 상담이 필요합니다. 백신 기록은 다음 접종 판단에도 남는 건강 자산입니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, RSV 백신 문항에서는 백신 결정을 바꾸는 요소가 아니라 호흡기 건강 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 Ecklonia cava 추출물 복합체를 호흡기 건강 관점에서 평가한 무작위 이중눈가림 위약대조 다기관 임상시험 자료가 등재되어 있습니다.',
      '중심은 나이, 위험질환, 임신 주수, 제품명, 이전 접종 이력, 동시 접종 계획 기록입니다. 플로로탄닌은 감태 기반 연구 소재로 소개하고, RSV 위험 감소와 영아 보호 전략은 CDC의 백신·면역화 안내와 의료진 상담이 앞에 와야 합니다.',
      '파트너 Q&A에서는 “RSV 백신이 누구에게 필요한가”라는 질문을 기록표로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 백신 정보를 흐리지 않는 호흡기 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '대상: 나이 / 50~74세 위험질환 / 75세 이상 / 임신 주수',
      '질환: 폐·심장·면역·신장·간질환 / 당뇨 합병증 / 요양시설',
      '접종: RSV 제품명·날짜 / 독감·코로나·폐렴구균 일정',
      '임신: 32~36주 / 출산 예정일 / Abrysvo 확인 / 이전 임신 접종',
      '질문: 권고 대상 / 동시 접종 / 이상반응 / 다시 맞는지 / 연락 기준',
    ],
    references: [
      {
        title: 'CDC: RSV Vaccine Guidance for Adults',
        url: 'https://www.cdc.gov/rsv/hcp/vaccine-clinical-guidance/adults.html',
      },
      {
        title: 'CDC: RSV Vaccine Guidance for Pregnant Women',
        url: 'https://www.cdc.gov/rsv/hcp/vaccine-clinical-guidance/pregnant-people.html',
      },
      {
        title: 'CDC: Clinical Guidance for RSV Immunizations and Vaccines',
        url: 'https://www.cdc.gov/rsv/hcp/vaccine-clinical-guidance/index.html',
      },
      {
        title: 'CDC: RSV Vaccine Safety',
        url: 'https://www.cdc.gov/vaccine-safety/vaccines/rsv.html',
      },
      {
        title: 'FDA: ABRYSVO',
        url: 'https://www.fda.gov/vaccines-blood-biologics/abrysvo',
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
