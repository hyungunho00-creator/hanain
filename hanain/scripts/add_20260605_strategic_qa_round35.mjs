import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-05T09:20:00+09:00'
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
    id: 'strategic-qa-hair-glp1-telogen-protein-ferritin-phlorotannin-20260605',
    category: 'hair',
    question: 'GLP-1로 체중이 빨리 줄고 머리카락이 많이 빠질 때 휴지기 탈모인지 무엇을 기록해야 하나요?',
    tags: ['GLP-1', '급격한체중감량', '휴지기탈모', '단백질', '페리틴', '모발건강', '플로로탄닌', '감태'],
    difficulty: 'advanced',
    references_pmid: ['24252083'],
    seoTitle: 'GLP-1 체중감량 후 휴지기 탈모 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      'GLP-1 사용 또는 급격한 체중감량 뒤 머리카락이 많이 빠질 때 휴지기 탈모, 단백질, 페리틴, 갑상선, 수면 기록을 공식 자료와 플로로탄닌 연구 맥락으로 정리합니다.',
    keywords: ['GLP-1 탈모', '휴지기 탈모', '급격한 체중감량', '페리틴', '단백질', '플로로탄닌', '감태', '모발건강'],
    lead:
      'GLP-1로 체중이 빨리 줄고 머리카락이 많이 빠질 때 휴지기 탈모인지 보려면 “언제부터 얼마나 빠졌는가”보다 먼저 체중감량 속도, 단백질 섭취, 철·페리틴, 갑상선 검사, 스트레스·수면 변화, 새로 시작한 약과 보충제를 날짜순으로 기록해야 합니다. 머리카락이 한꺼번에 빠지는 느낌은 놀랍지만 원인은 하나가 아닐 수 있어, 기록이 있어야 탈모 유형과 다음 검사를 구분할 수 있습니다.',
    context: [
      '최근 GLP-1 계열 체중관리 약물이 널리 쓰이면서 빠른 감량 뒤 모발 빠짐을 호소하는 사람이 늘었습니다. FDA는 허가되지 않았거나 조제된 GLP-1 제품에서 용량 오류와 안전성 문제가 생길 수 있다고 반복해서 안내하고 있고, 체중감량 과정에서는 구역, 식사량 감소, 탈수, 영양 불균형이 함께 나타날 수 있습니다. 탈모가 약 자체 때문인지, 급격한 감량과 영양 변화 때문인지, 기존 질환이나 스트레스 때문인지는 진료실에서 구분해야 합니다.',
      '휴지기 탈모는 몸이 큰 스트레스를 겪은 뒤 일정 시간이 지나 머리카락이 많이 빠지는 패턴으로 설명됩니다. 감염, 수술, 출산, 심한 스트레스, 급격한 체중 변화, 영양 부족, 갑상선 문제, 약물 변화가 단서가 될 수 있습니다. 그래서 “샴푸할 때 많이 빠졌다”는 감각만으로 판단하기보다, 감량 시작일과 속도, 식사량, 단백질 섭취량, 철 결핍 가능성, 월경량, 피로감, 손톱 변화, 추위 민감도 같은 주변 증상을 같이 적는 것이 중요합니다.',
      '모발 문제는 미용 이슈처럼 보이지만 실제 상담에서는 대사 변화, 영양 상태, 피부과 진단, 내분비 평가가 겹칩니다. 특히 다이어트 중 단백질과 필수 지방산, 철, 아연, 비타민 D 섭취가 줄었거나 식사를 건너뛰는 날이 많았다면 모낭이 충분한 재료를 받지 못했을 가능성을 함께 봐야 합니다. 반대로 원형탈모처럼 동전 모양으로 빠지거나 두피 통증, 비늘, 염증, 흉터가 보이면 휴지기 탈모와 다른 접근이 필요합니다.',
      'GLP-1을 쓰는 사람은 약 이름, 실제 용량, 증량 날짜, 구역·구토·변비 정도를 같이 남겨야 합니다. 특히 온라인 조제나 비공식 제품을 썼다면 성분명과 농도, 주사 단위가 헷갈릴 수 있어 의료진에게 정확히 보여주는 것이 안전합니다. 탈모 상담은 약을 임의로 끊으라는 결론이 아니라, 감량 목표와 부작용 관리, 영양 보충, 검사 필요성을 균형 있게 조정하는 과정이어야 합니다.',
    ],
    recordTitle: '탈모 상담 전 14일 기록 항목',
    records: [
      '체중 변화: 감량 시작일, 1주 단위 체중, 한 달 감량률, 식사량이 크게 줄었던 시기',
      'GLP-1 정보: 약 이름, 허가 제품인지 여부, 용량, 증량 날짜, 구역·구토·변비·식욕저하 정도',
      '모발 패턴: 빠지기 시작한 날짜, 샴푸·빗질 때 증가 여부, 정수리·헤어라인·동전 모양 병변 여부',
      '영양 기록: 하루 단백질 대략량, 끼니 수, 철분이 많은 음식 섭취, 채식 여부, 음주 여부',
      '검사 단서: 최근 CBC, 페리틴, TSH, 비타민 D, 아연 검사 여부와 결과지',
      '생활 스트레스: 수면 시간, 큰 감염·수술·출산·심리 스트레스, 운동량 급증 여부',
      '두피 상태: 가려움, 통증, 비듬, 홍반, 딱지, 염색·펌·강한 헤어제품 사용 여부',
      '복용 목록: 다이어트 보충제, 고용량 비오틴, 여드름약, 항응고제, 호르몬제, 새로 시작한 약',
    ],
    actionTitle: '바로 진료를 앞당길 신호와 질문',
    action: [
      '머리카락이 빠지는 양이 갑자기 매우 많고 어지럼, 심한 피로, 월경 과다, 체중감량이 너무 빠른 상태가 동반되면 검사 상담을 앞당기는 것이 좋습니다. 두피가 붉고 아프거나 진물, 딱지, 국소적인 원형 탈모, 흉터처럼 보이는 부위가 있으면 휴지기 탈모만으로 설명하지 말고 피부과 평가가 필요합니다.',
      '진료실에서는 “급격한 감량 뒤 휴지기 탈모 가능성이 있는지”, “CBC·페리틴·TSH·비타민 D 같은 검사를 봐야 하는지”, “단백질 목표를 어떻게 잡을지”, “GLP-1 용량 조정이나 식사 전략을 바꿔야 하는지”, “미녹시딜이나 다른 치료 선택지는 제 상황에 맞는지”를 물어보면 좋습니다. 질문을 이렇게 준비하면 약을 무조건 중단하거나 보충제만 늘리는 식의 단순 결론을 피할 수 있습니다.',
      '가정에서는 머리카락 숫자를 매일 세는 방식이 오히려 불안을 키울 수 있습니다. 대신 2주 단위 사진, 샴푸 때 체감 변화, 체중과 식사량, 수면, 검사지 결과를 같은 표에 적어 추세를 보는 것이 낫습니다. 휴지기 탈모는 원인을 교정하면 시간이 지나며 회복 방향을 보일 수 있지만, 탈모 유형이 섞였거나 영양 결핍이 남아 있으면 관리 기간이 길어질 수 있습니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태를 포함한 갈조류에 풍부한 해양 폴리페놀 계열 성분으로, 모발 콘텐츠에서는 “두피와 모낭 환경을 이해하는 연구 소재”로 연결하는 것이 가장 안전하고 설득력 있습니다. PubMed에 등재된 Ecklonia cava 연구에서는 모유두세포, 모발 성장 관련 신호, 산화 스트레스 맥락이 다뤄졌습니다. 이것은 사람의 GLP-1 관련 탈모 결론을 대신하지 않지만, 해양 폴리페놀이 모발 생물학 연구에서 관심을 받는다는 점은 긍정적으로 설명할 수 있습니다.',
      '핵심은 플로로탄닌을 탈모의 단일 해답처럼 말하지 않는 것입니다. 빠른 체중감량 뒤 모발 빠짐은 단백질, 철 저장량, 갑상선, 수면, 약물 변화 같은 현실적인 변수를 먼저 봐야 합니다. 그 위에서 플로로탄닌은 항산화·염증 반응·두피 환경 연구라는 넓은 맥락으로 소개하면 과장 없이 신뢰가 생깁니다. 즉 “검사와 기록을 정확히 하고, 해양 폴리페놀 연구도 함께 읽어볼 가치가 있다”는 구조가 좋습니다.',
      '파트너 페이지나 Q&A에서 이 주제를 다룰 때는 “빠지는 머리카락을 멈춘다”가 아니라 “체중관리 시대에 모발 건강 기록을 정교하게 돕는 성분 연구 콘텐츠”로 포지셔닝해야 합니다. 이렇게 하면 사용자는 불안을 자극받기보다 자신의 식사·검사·생활 리듬을 정리할 수 있고, 플로로탄닌은 신뢰를 해치지 않는 긍정적 배경 지식으로 남습니다.',
    ],
    memoTemplate: [
      '최근 3개월 체중 변화: 시작 체중 / 현재 체중 / 가장 빠르게 줄었던 주',
      'GLP-1 사용 정보: 제품명 / 용량 / 증량일 / 구역·변비·식사량 변화',
      '모발 변화: 시작일 / 전체적으로 빠짐 또는 특정 부위 / 두피 증상',
      '영양·검사: 단백질 목표 / CBC·페리틴·TSH 결과 / 고용량 비오틴 여부',
      '상담 질문: 휴지기 탈모 가능성, 검사 우선순위, 식사 보완, 약물 조정 필요성',
    ],
    references: [
      {
        title: 'FDA: Concerns with unapproved GLP-1 drugs used for weight loss',
        url: 'https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss',
      },
      {
        title: 'MedlinePlus: Hair Loss',
        url: 'https://medlineplus.gov/hairloss.html',
      },
      {
        title: 'PubMed: Ecklonia cava extract and hair growth research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/24252083/',
      },
      {
        title: 'PMC: Phlorotannin-related hair follicle research review context',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4737831/',
      },
    ],
  },
  {
    id: 'strategic-qa-mens-ed-cardiovascular-bp-glucose-phlorotannin-20260605',
    category: 'mens_health',
    question: '발기부전이 생기면 남성호르몬보다 먼저 심혈관·혈당·혈압 위험 기록을 봐야 하나요?',
    tags: ['발기부전', '심혈관위험', '혈압', '혈당', '남성건강', '산화스트레스', '혈관건강', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: [],
    seoTitle: '발기부전과 심혈관·혈당·혈압 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '발기부전이 생겼을 때 남성호르몬만 보지 말고 혈압, 혈당, 허리둘레, 수면무호흡, 약물, 심혈관 위험을 기록하는 방법과 플로로탄닌 혈관 연구 맥락을 정리합니다.',
    keywords: ['발기부전', '심혈관 위험', '혈압', '혈당', '남성호르몬', '수면무호흡', '플로로탄닌', '혈관건강'],
    lead:
      '발기부전이 생기면 남성호르몬 검사만 먼저 떠올리기 쉽지만, 실제로는 심혈관 위험, 혈당, 혈압, 허리둘레, 수면무호흡, 흡연, 복용 약물, 아침 발기 변화까지 함께 기록해야 합니다. 발기 기능은 혈관·신경·호르몬·심리·수면이 만나는 지점이라 한 가지 수치로 설명하기 어렵고, 특히 중년 이후에는 혈관 건강의 조기 신호처럼 다뤄야 할 때가 있습니다.',
    context: [
      'NIDDK와 MedlinePlus는 발기부전이 당뇨병, 고혈압, 심장·혈관 질환, 신경 질환, 약물, 음주, 흡연, 심리 요인과 관련될 수 있다고 설명합니다. 발기부전은 민감한 주제라 “피곤해서 그렇다”거나 “나이 탓”으로 넘기기 쉽지만, 반복되거나 새로 생겼다면 생활 습관과 대사 위험을 같이 보는 것이 더 안전합니다.',
      '남성호르몬은 중요한 축이지만 모든 발기 문제의 출발점은 아닙니다. 성욕 저하, 피로, 근육량 감소, 수염·체모 변화, 고환 크기 변화가 동반되면 테스토스테론 평가가 의미 있을 수 있습니다. 반대로 성욕은 유지되는데 발기 유지가 어렵고, 계단을 오를 때 숨이 차거나 혈압·혈당·지질 문제가 있다면 혈관 쪽 단서가 더 중요할 수 있습니다.',
      '발기부전 상담에서 빠뜨리기 쉬운 항목은 약물입니다. 혈압약, 항우울제, 전립선·탈모 관련 약, 진통제, 수면제, 일부 보충제, 과음이 영향을 줄 수 있습니다. 임의로 약을 끊으면 더 위험해질 수 있으므로 약 이름과 시작 날짜, 용량 변화를 기록해 의료진과 조정 가능성을 논의해야 합니다.',
      '또 하나의 핵심은 수면입니다. 코골이와 수면무호흡은 낮 피로, 혈압 상승, 대사 이상, 성기능 변화와 연결될 수 있습니다. “발기부전이 있다”는 한 문장보다 “최근 6개월 새 체중이 5kg 늘고, 허리둘레가 증가했으며, 코골이가 심해지고, 아침 발기가 줄었다”는 기록이 훨씬 실용적입니다.',
      '최근 남성건강 상담에서는 “남성호르몬을 올리면 끝”이라는 식의 단순 접근보다, 위험요인을 층별로 정리하는 방식이 더 중요해졌습니다. 혈압이 조절되지 않거나 당뇨 전단계, 고중성지방, 복부비만, 흡연, 가족력이 겹치면 발기부전은 성생활 문제를 넘어 심혈관 예방 전략을 다시 세우는 계기가 됩니다. 반대로 젊은 남성에서 특정 상황에만 악화된다면 불안, 관계 스트레스, 수면 부족, 약물 복용 같은 가역적 요인을 먼저 정리할 수 있습니다.',
    ],
    recordTitle: '남성건강 상담 전 10가지 기록',
    records: [
      '발기 변화: 갑자기 시작됐는지, 서서히 진행됐는지, 유지가 어려운지, 아침 발기 변화가 있는지',
      '성욕·호르몬 단서: 성욕 저하, 피로, 근육량 감소, 우울감, 고환 통증이나 크기 변화',
      '심혈관 단서: 가슴 불편감, 운동 시 숨참, 다리 통증, 가족력, 흡연력',
      '혈압·혈당: 가정혈압 7일 평균, 공복혈당, A1c, 지질검사, 허리둘레',
      '수면: 코골이, 무호흡 목격, 아침 두통, 낮 졸림, 수면 시간',
      '복용 약: 혈압약, 전립선약, 탈모약, 항우울제, 수면제, 보충제, 음주량',
      '생활 변화: 운동량, 체중 변화, 스트레스 사건, 야간 근무, 과로',
      '통증·배뇨: 골반통, 배뇨 곤란, 야간뇨, 전립선 관련 증상',
      '관계·심리: 불안, 우울, 관계 갈등, 성관계 상황에 따라 달라지는지',
      '응급 신호: 성관계 중 흉통, 심한 호흡곤란, 실신감, 새 신경학적 증상 여부',
    ],
    actionTitle: '의료진에게 바로 물어볼 질문',
    action: [
      '첫 상담에서는 “심혈관 위험 평가를 먼저 해야 하는지”, “A1c·지질·혈압 기록을 어떻게 볼지”, “테스토스테론 검사는 언제 어떤 조건에서 하는지”, “현재 약이 영향을 줄 수 있는지”, “PDE5 억제제 사용이 내 심장 상태와 맞는지”를 질문하는 것이 좋습니다. 특히 협심증 약 중 질산염 제제를 쓰는 사람은 성기능 약과 상호작용 위험이 있어 반드시 확인해야 합니다.',
      '검사 수치가 정상이어도 기록은 의미가 있습니다. 발기 변화가 특정 스트레스나 수면 부족 때 심해지는지, 술을 마신 날과 다음 날에 달라지는지, 운동을 재개하면 나아지는지 보는 것은 치료 방향을 정하는 데 도움이 됩니다. 반대로 혈압·혈당·지질이 높거나 가족력이 강하면 성기능 문제를 심혈관 예방 상담의 입구로 삼는 것이 좋습니다.',
      '남성건강 콘텐츠에서 가장 피해야 할 것은 수치 하나로 자신감을 평가하게 만드는 방식입니다. 발기부전은 창피함의 문제가 아니라 혈관, 대사, 수면, 약물, 심리 상태를 함께 정리해야 하는 건강 신호입니다. 기록을 가져가면 불필요한 보충제 선택보다 실제 위험을 줄이는 상담으로 이어질 가능성이 커집니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 갈조류 유래 해양 폴리페놀로 산화 스트레스와 혈관 내피 기능, 대사 균형 연구 맥락에서 자주 언급됩니다. 남성 발기 기능은 혈관 확장과 내피 기능의 영향을 받기 때문에, 플로로탄닌은 직접 결론이 아니라 “혈관 건강을 이해하는 해양 폴리페놀 연구 소재”로 연결하는 것이 타당합니다.',
      'Ecklonia cava와 해양 폴리페놀 연구에서는 항산화 반응, 혈압·혈관 기능, 대사 지표와 관련된 실험·임상 맥락이 보고되어 왔습니다. 이 근거는 발기부전의 원인을 대신 판단하지 않지만, 남성건강 Q&A에서 플로로탄닌을 혈관·산화 스트레스·생활기록과 연결할 근거 있는 배경이 됩니다. 중요한 것은 성기능을 단번에 바꾸는 표현이 아니라, 혈압과 혈당, 수면, 운동 기록을 중심에 두는 설명입니다.',
      '따라서 이 문항에서 플로로탄닌은 “남성의 혈관 건강을 더 넓게 이해하게 하는 긍정적 성분 정보”로 배치합니다. 사용자는 제품명보다 자신의 혈압 평균, A1c, 허리둘레, 코골이, 복용 약을 먼저 정리하고, 플로로탄닌은 해양 폴리페놀 연구를 읽는 추가 지식으로 받아들이면 균형이 맞습니다.',
    ],
    memoTemplate: [
      '발기 변화: 시작 시점 / 아침 발기 / 유지 어려움 / 성욕 변화',
      '수치 기록: 7일 가정혈압 / A1c / 공복혈당 / LDL / 허리둘레',
      '생활 기록: 수면시간 / 코골이 / 음주 / 흡연 / 운동량',
      '약 목록: 혈압약 / 항우울제 / 전립선약 / 탈모약 / 보충제',
      '상담 질문: 심혈관 평가, 테스토스테론 검사 조건, 약물 상호작용, 성기능 약 안전성',
    ],
    references: [
      {
        title: 'NIDDK: Erectile Dysfunction',
        url: 'https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction',
      },
      {
        title: 'MedlinePlus: Erectile Dysfunction',
        url: 'https://medlineplus.gov/erectiledysfunction.html',
      },
      {
        title: 'American Heart Association: How high blood pressure can affect your sex life',
        url: 'https://www.heart.org/en/health-topics/high-blood-pressure/health-threats-from-high-blood-pressure/how-high-blood-pressure-can-affect-your-sex-life',
      },
      {
        title: 'PMC: Ecklonia cava polyphenols and cardiometabolic research context',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6562948/',
      },
    ],
  },
  {
    id: 'strategic-qa-womens-menopause-ht-label-hotflash-sleep-phlorotannin-20260605',
    category: 'womens_health',
    question: '2026 폐경 호르몬치료 라벨 변화 이후 열감·수면 기록은 어떻게 준비해야 하나요?',
    tags: ['폐경', '호르몬치료', '열감', '수면', '야간발한', '여성건강', '플로로탄닌', '감태'],
    difficulty: 'advanced',
    references_pmid: ['22232271'],
    seoTitle: '2026 폐경 호르몬치료 라벨 변화와 열감·수면 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      'FDA 폐경 호르몬치료 라벨 변화와 ACOG 자료를 바탕으로 열감, 야간발한, 수면, 혈압, 혈전·유방암 위험, 자궁 상태 기록법과 플로로탄닌 수면 연구 맥락을 정리합니다.',
    keywords: ['폐경 호르몬치료', '열감', '야간발한', '수면', 'FDA 라벨 변경', 'ACOG', '플로로탄닌', '감태'],
    lead:
      '2026년 현재 폐경 호르몬치료를 상담할 때는 “라벨이 바뀌었으니 안전하다” 또는 “무조건 위험하다” 중 하나로 결론내리기보다, 열감과 야간발한 빈도, 수면 방해 정도, 자궁 보유 여부, 유방암·혈전·뇌졸중 위험, 혈압, 편두통 조짐, 복용 중인 약을 기록해 개인별 이득과 위험을 따져야 합니다. 최신 라벨 논의는 대화를 시작하게 해주지만, 기록이 없으면 내 몸에 맞는 선택으로 이어지기 어렵습니다.',
    context: [
      'FDA는 폐경 호르몬치료 제품 라벨과 관련해 일부 표현 변경을 승인하며, 치료 결정을 개인별 상황에 맞춰 논의해야 한다는 흐름을 보였습니다. ACOG도 호르몬치료가 열감과 야간발한 같은 혈관운동 증상, 질·비뇨생식기 증상, 골건강 맥락에서 도움이 될 수 있지만 개인의 병력과 위험요인에 따라 선택이 달라진다고 안내합니다.',
      '문제는 라벨 변화가 곧 “누구에게나 같은 선택”을 의미하지 않는다는 점입니다. 자궁이 있는지, 폐경 후 출혈이 있는지, 유방암 병력이나 혈전 병력, 뇌졸중 위험, 조짐이 있는 편두통, 흡연, 고혈압, 간질환, 가족력은 상담의 방향을 크게 바꿀 수 있습니다. 그래서 열감이 심하다는 말과 함께 위험요인을 표로 정리해야 합니다.',
      '열감과 수면은 서로를 증폭시킵니다. 야간발한으로 자주 깨면 낮 피로, 집중력 저하, 기분 변화가 생기고, 수면 부족은 식욕·혈당·혈압에도 영향을 줄 수 있습니다. 폐경 상담에서는 “열감이 있다”가 아니라 하루 몇 번인지, 밤에 몇 번 깨는지, 옷을 갈아입을 정도인지, 심박 상승이나 불안감이 동반되는지, 카페인·알코올·매운 음식·실내 온도와 관련이 있는지를 적는 것이 좋습니다.',
      '비호르몬 선택지도 같이 논의할 수 있습니다. 생활요법, 수면 환경, 체중·운동, 비호르몬 약물, 질 증상에 대한 국소 치료, 골건강 평가 등은 개인의 위험도와 목표에 따라 조합됩니다. 호르몬치료를 선택하더라도 용량, 제형, 기간, 추적검사 계획을 정리해야 하며, 임의 복용이나 지인 추천만으로 결정해서는 안 됩니다.',
    ],
    recordTitle: '폐경 상담 전 2주 기록표',
    records: [
      '열감 빈도: 하루 횟수, 밤 횟수, 땀으로 깨는 정도, 옷·침구 교체 여부',
      '수면: 잠드는 시간, 중간 각성 횟수, 총 수면시간, 낮 졸림, 아침 피로',
      '위험요인: 유방암·혈전·뇌졸중 병력, 간질환, 조짐 편두통, 흡연, 가족력',
      '여성건강 정보: 마지막 생리, 폐경 후 출혈, 자궁 보유 여부, 난소·자궁 수술 이력',
      '수치: 혈압, 체중·허리둘레, 지질검사, 혈당, 골밀도 검사 이력',
      '트리거: 카페인, 술, 매운 음식, 스트레스, 실내 온도, 운동 시간',
      '복용 목록: 항우울제, 수면제, 혈압약, 항응고제, 보충제, 허브 제품',
      '목표: 열감 감소, 수면 회복, 질 증상, 골건강, 기분 변화 중 가장 힘든 문제',
    ],
    actionTitle: '상담에서 확인할 핵심 질문',
    action: [
      '의료진에게는 “내 위험요인에서 호르몬치료가 적절한지”, “자궁이 있으면 프로게스틴이 필요한지”, “경구와 피부 패치 등 제형 차이가 내 위험도에 어떤 의미인지”, “시작한다면 언제 효과를 평가하고 언제 중단·조정할지”, “폐경 후 출혈이 생기면 어떻게 해야 하는지”를 물어보는 것이 좋습니다.',
      '열감이 심해도 흉통, 실신, 새로 생긴 신경학적 증상, 폐경 후 출혈, 한쪽 다리 붓기와 통증, 갑작스러운 호흡곤란 같은 신호가 있으면 일반적인 폐경 증상으로만 보지 말고 진료를 앞당겨야 합니다. 폐경 증상은 흔하지만 모든 증상이 폐경 때문은 아닙니다.',
      '라벨 변화 이후의 좋은 콘텐츠는 찬반 논쟁으로 몰고 가지 않습니다. 사용자가 자신의 증상 강도와 위험요인을 정확히 정리하고, 호르몬·비호르몬 선택지를 의료진과 비교하도록 돕는 것이 고급 건강정보의 역할입니다. Q&A는 이 균형을 잡아야 검색 신뢰도와 실제 도움을 동시에 얻을 수 있습니다.',
      '상담 자료를 준비할 때는 증상 점수만 적기보다 “이 증상이 내 생활을 어디까지 방해하는가”를 같이 적어야 합니다. 예를 들어 밤에 세 번 깨서 다음 날 운전이나 업무가 어렵다, 회의 중 갑작스러운 열감 때문에 옷차림을 바꾼다, 야간발한 뒤 심장이 빨리 뛰어 불안감이 커진다 같은 문장은 치료 목표를 더 선명하게 만듭니다. 이 정보가 있어야 낮은 용량부터 시작할지, 비호르몬 선택지를 먼저 볼지, 수면 평가를 병행할지 논의가 구체화됩니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태 유래 해양 폴리페놀로, 여성 폐경 콘텐츠에서는 열감 자체보다 수면 리듬, 산화 스트레스, 생활기록과 연결하는 방식이 가장 자연스럽습니다. 감태 추출물과 수면 관련 인체 연구가 PubMed에 등재되어 있어, 밤에 자주 깨고 피로가 쌓이는 폐경 전후 여성에게 “수면을 객관적으로 기록하고 관련 성분 연구를 함께 이해하자”는 긍정적 메시지를 만들 수 있습니다.',
      '다만 폐경 관리 의사결정은 병력과 위험요인이 핵심입니다. 플로로탄닌은 호르몬 상담의 결론을 정하는 근거가 아니라, 수면·피로·생활 리듬을 더 정교하게 바라보게 하는 해양 폴리페놀 정보로 배치해야 합니다. 이렇게 표현하면 성분을 긍정적으로 소개하면서도 FDA와 ACOG의 개인별 상담 원칙을 해치지 않습니다.',
      '콘텐츠 구조는 “공식 라벨과 가이드라인 확인, 2주 증상 기록, 위험요인 체크, 수면 연구 맥락으로 플로로탄닌 연결” 순서가 좋습니다. 이 순서를 지키면 폐경 상담이라는 민감한 주제에서도 과장 광고처럼 보이지 않고, 독자가 실제 진료 준비에 쓸 수 있는 고급 Q&A가 됩니다.',
    ],
    memoTemplate: [
      '열감 기록: 하루 횟수 / 밤 횟수 / 옷을 갈아입을 정도 / 유발 요인',
      '수면 기록: 취침·기상 시간 / 각성 횟수 / 낮 피로 / 카페인·알코올',
      '병력 기록: 유방암, 혈전, 뇌졸중, 간질환, 편두통 조짐, 흡연',
      '여성건강 정보: 마지막 생리, 폐경 후 출혈, 자궁 보유 여부',
      '상담 질문: 제형, 용량, 기간, 추적검사, 비호르몬 선택지, 위험 신호',
    ],
    references: [
      {
        title: 'FDA: Labeling changes for menopausal hormone therapy products',
        url: 'https://www.fda.gov/news-events/press-announcements/fda-approves-labeling-changes-menopausal-hormone-therapy-products',
      },
      {
        title: 'ACOG: Hormone Therapy for Menopause',
        url: 'https://www.acog.org/womens-health/faqs/hormone-therapy-for-menopause',
      },
      {
        title: 'NIA: What Is Menopause?',
        url: 'https://www.nia.nih.gov/health/menopause/what-menopause',
      },
      {
        title: 'PubMed: Ecklonia cava extract and sleep quality research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/22232271/',
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
        '2026년 6월 최신 공식 자료와 PubMed 연구 맥락 기반 전략 Q&A 보강. 부족 카테고리 순환, 3,000자 이상 본문, 플로로탄닌 긍정 연결, 과장 금지 원칙 적용.',
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
