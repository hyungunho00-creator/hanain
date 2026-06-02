import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T20:45:00+09:00'

const common = {
  content_type: 'latest_health_qna',
  author: '플로로탄닌 건강정보센터 · 카테고리 순환 Q&A 편집팀',
  disclaimer:
    '건강정보는 진료를 대체하지 않습니다. 증상이 지속되거나 약을 복용 중이라면 의료진과 상담하세요.',
  source_type: 'public-health-and-peer-reviewed',
  references_pmid: [],
  reviewed: true,
  qualityStatus: 'validated',
  sourceStatus: 'referenced',
  publicBodyMode: 'full',
  noindex: false,
}

const questions = [
  {
    id: 'trend-rosemary-oil-hair-loss-scalp-irritation-20260602',
    category: 'hair',
    question: '로즈마리오일을 바르면 탈모가 좋아진다는데, 미녹시딜 대신 써도 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>로즈마리오일은 탈모 커뮤니티에서 많이 언급되지만, 미녹시딜을 그대로 대체한다고 말하기에는 근거가 아직 좁습니다.</strong> 가장 자주 인용되는 2015년 연구는 남성형 탈모 환자 100명을 로즈마리오일군과 2% 미녹시딜군으로 나누어 6개월 관찰한 연구입니다. 3개월에는 두 군 모두 뚜렷한 모발 수 변화가 없었고, 6개월에 개선 신호가 관찰됐습니다. 이 결과는 흥미롭지만 대상이 제한적이고, 현재 흔히 쓰이는 5% 미녹시딜이나 다양한 여성 탈모·원형탈모·휴지기 탈모 전체에 그대로 적용하기 어렵습니다.</p>
  <p>그래서 실제 상담에서는 “써도 되나요?”보다 “내 탈모가 어떤 종류인지, 두피가 버틸 수 있는지, 6개월 동안 어떻게 기록할지”가 먼저입니다. 갑자기 머리카락이 많이 빠지거나, 동전 모양으로 빠지거나, 두피가 붉고 따갑거나, 산후·다이어트·감염·약물 변경 뒤에 시작됐다면 오일을 바르기 전에 원인 평가가 우선입니다.</p>
  <h4>먼저 확인할 것</h4>
  <ul>
    <li>정수리·가르마·헤어라인 중 어디가 얇아지는지</li>
    <li>최근 3개월 안에 체중감량, 고열, 수술, 출산, 심한 스트레스가 있었는지</li>
    <li>두피 가려움, 따가움, 비듬, 진물, 붉은 반점이 있는지</li>
    <li>철분, 갑상선, 비타민 D, 호르몬 관련 검사가 필요한 상황인지</li>
    <li>미녹시딜, 피나스테리드, 스피로노락톤 등 기존 치료를 사용 중인지</li>
  </ul>
  <h4>로즈마리오일을 쓴다면 기록 방식이 핵심입니다</h4>
  <p>원액을 두피에 바로 바르는 방식은 자극성·알레르기성 접촉피부염 위험을 키울 수 있습니다. 반드시 희석 제품인지 확인하고, 작은 부위 테스트를 먼저 하며, 가려움이나 붉어짐이 심해지면 중단해야 합니다. 판단은 최소 3~6개월 같은 조명·각도·거리에서 찍은 사진, 빠지는 양, 두피 증상, 병행 치료 여부를 같이 봐야 합니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 “발모 성분”처럼 설명하면 과장입니다. 이 콘텐츠에서는 해양 폴리페놀과 산화스트레스 연구 흐름을 배경 지식으로만 다루고, 탈모 판단은 원인 진단·두피 상태·검사·사진 기록을 우선으로 안내합니다.</p>
</div>`,
    tags: ['탈모', '로즈마리오일', '두피자극', '미녹시딜', '남성형탈모', '사진기록', '플로로탄닌'],
    difficulty: 'intermediate',
    views: 2688,
    likes: 207,
    related_insights: [
      '/insights/rosemary-oil-hair-loss-scalp-irritation-record-2026',
      '/blog/rosemary-oil-hair-loss-scalp-irritation-record-2026',
    ],
    references: [
      {
        title: 'Panahi et al. 2015: Rosemary oil vs minoxidil 2% for androgenetic alopecia',
        url: 'https://www.unboundmedicine.com/medline/citation/25842469/Rosemary_oil_vs_minoxidil_2_for_the_treatment_of_androgenetic_alopecia%3A_a_randomized_comparative_trial.',
      },
      {
        title: 'Mayo Clinic: Hair loss symptoms and causes',
        url: 'https://www.mayoclinic.org/diseases-conditions/hair-loss/symptoms-causes/syc-20372926',
      },
      {
        title: 'AAD: Hair loss causes',
        url: 'https://www.aad.org/public/diseases/hair-loss/causes/18-causes',
      },
    ],
  },
  {
    id: 'trend-pcos-glp1-insulin-resistance-pregnancy-planning-20260602',
    category: 'womens_health',
    question: 'PCOS가 있고 GLP-1 약을 고민 중이면 임신 계획과 인슐린저항성은 어떻게 같이 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>PCOS에서 GLP-1 계열 약은 “살 빼는 약” 하나로만 보면 안 됩니다. 월경, 인슐린저항성, 혈당, 혈압, 임신 계획, 피임 여부를 한 장의 기록으로 묶어야 안전하게 상담할 수 있습니다.</strong> 2023 국제 PCOS 가이드라인은 성인 PCOS에서 높은 체중 관리가 필요할 때 생활중재와 함께 리라글루타이드·세마글루타이드 같은 GLP-1 수용체 작용제를 고려할 수 있다고 설명합니다. 동시에 임신 가능성이 있으면 효과적인 피임을 함께 확인해야 한다고 강조합니다. 임신 중 안전성 자료가 충분하지 않기 때문입니다.</p>
  <p>PCOS는 생리불순만의 문제가 아니라 대사 위험이 함께 움직이는 경우가 많습니다. 같은 가이드라인은 PCOS가 10~13% 정도로 흔하고, 당대사 이상·심혈관 위험·수면 문제·임신 합병증 위험과도 연결될 수 있다고 봅니다. 그래서 “GLP-1을 쓸까 말까”보다 먼저 임신을 언제 원하는지, 혈당과 지질은 어떤지, 월경 주기가 어떤지부터 정리해야 합니다.</p>
  <h4>상담 전에 적어가면 좋은 정보</h4>
  <ul>
    <li>최근 6개월 월경 시작일, 주기 길이, 무월경 기간</li>
    <li>공복혈당, 당화혈색소, 필요 시 경구당부하검사 결과</li>
    <li>혈압, 지질검사, 체중 변화, 허리둘레 변화</li>
    <li>임신을 바로 원하는지, 6~12개월 뒤 원하는지, 현재 피임 중인지</li>
    <li>메트포르민, 이노시톨, 피임약, 항안드로겐제 등 복용 이력</li>
  </ul>
  <h4>임신 계획이 있다면 질문이 달라집니다</h4>
  <p>임신을 당장 시도할 계획이 있으면 GLP-1 시작·중단 시점을 의료진과 정해야 합니다. 임신 가능성이 있는 동안에는 피임, 중단 후 체중·혈당 안정, 엽산, 혈압, 정신건강, 수면, 운동을 함께 정리해야 합니다. 반대로 임신 계획이 아직 멀다면 장기 사용 필요성, 중단 후 체중 재증가 가능성, 위장관 부작용, 비용과 지속 가능성을 현실적으로 봐야 합니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌이나 감태추출물을 PCOS 치료제, 배란 유도제, GLP-1 대체제로 설명하면 안 됩니다. 이 주제에서는 해양 폴리페놀과 대사·산화스트레스 연구 흐름을 참고 정보로만 두고, 핵심은 진단 기준, 혈당 평가, 임신 계획, 의료진 상담입니다.</p>
</div>`,
    tags: ['PCOS', 'GLP-1', '세마글루타이드', '인슐린저항성', '임신계획', '피임', '여성건강'],
    difficulty: 'advanced',
    views: 2679,
    likes: 205,
    related_insights: [
      '/insights/pcos-glp1-insulin-resistance-pregnancy-planning-record-2026',
      '/blog/pcos-glp1-insulin-resistance-pregnancy-planning-record-2026',
    ],
    references: [
      {
        title: 'ASRM: 2023 International evidence-based PCOS guideline',
        url: 'https://www.asrm.org/practice-guidance/practice-committee-documents/recommendations-from-the-2023-international-evidence-based-guideline-for-the-assessment-and-management-of-polycystic-ovary-syndrome/',
      },
      {
        title: 'Endocrine Society/ESE: Preexisting diabetes and pregnancy guideline',
        url: 'https://www.endocrine.org/clinical-practice-guidelines/preexisting-diabetes-in-pregnancy',
      },
    ],
  },
  {
    id: 'trend-phthalates-male-fertility-semen-quality-exposure-20260602',
    category: 'mens_health',
    question: '프탈레이트 같은 환경호르몬이 남성 난임에 영향을 준다는데, 정액검사 전에 무엇을 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>프탈레이트와 남성 난임은 검색량이 늘어나는 주제지만, 한 가지 화학물질만 지목해서 “이것 때문에 난임”이라고 단정하면 정확하지 않습니다.</strong> EPA는 프탈레이트가 PVC 제품, 포장재, 바닥재, 일부 화장품·헤어·스킨케어 제품 등 여러 소비재에 쓰일 수 있고, 강하게 결합하지 않아 음식·공기·접촉을 통해 노출될 수 있다고 설명합니다. 일부 프탈레이트는 호르몬 교란 가능성이 있어 생식 건강 연구에서 계속 관찰되고 있습니다.</p>
  <p>하지만 실제 난임 상담에서는 노출 추정만으로 결론을 내리지 않습니다. CDC는 남성 요인 평가에서 정액검사, 병력, 신체진찰이 기본이며, 정액검사는 정자의 수, 운동성, 형태를 평가한다고 설명합니다. 약간 비정상이라는 결과가 곧바로 “불임”을 뜻하는 것도 아닙니다. 그래서 노출 기록은 정액검사를 대체하는 것이 아니라, 원인 평가를 더 정교하게 만드는 보조 자료입니다.</p>
  <h4>정액검사 전 8~12주 기록</h4>
  <ul>
    <li>고열, 독감, 코로나, 사우나·찜질방·노트북 무릎 사용 등 고온 노출</li>
    <li>흡연, 음주, 대마·아나볼릭 스테로이드·테스토스테론 사용 여부</li>
    <li>업무 중 용제, 플라스틱 가공, 살충제, 접착제, 고열 환경 노출</li>
    <li>향수, 헤어제품, 스킨케어, 플라스틱 식품 포장 사용 패턴</li>
    <li>잠, 체중, 운동, 복용약, 과거 정계정맥류·고환 손상·수술 이력</li>
  </ul>
  <h4>생활에서 줄여볼 수 있는 노출</h4>
  <p>뜨거운 음식을 플라스틱 용기에 담아 전자레인지에 돌리는 습관, 향이 강한 제품을 여러 개 겹쳐 쓰는 습관, 오래된 PVC 제품과 밀폐 공간 노출, 고온 환경을 줄이는 것부터 시작할 수 있습니다. 다만 모든 플라스틱을 공포의 대상으로 만들 필요는 없습니다. 실제 변화는 “노출 줄이기 + 정액검사 + 의료진 상담 + 생활요인 조정”이 함께 갈 때 의미가 있습니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 남성 난임 개선제처럼 말하면 안 됩니다. 이 콘텐츠에서는 산화스트레스와 폴리페놀 연구 흐름을 배경으로 설명하되, 난임 판단은 정액검사, 병력, 호르몬·유전·정계정맥류 평가 같은 표준 진료를 중심에 둡니다.</p>
</div>`,
    tags: ['남성난임', '정액검사', '프탈레이트', '환경호르몬', '정자건강', '노출기록', '남성건강'],
    difficulty: 'advanced',
    views: 2671,
    likes: 203,
    related_insights: [
      '/insights/phthalates-male-fertility-semen-quality-exposure-record-2026',
      '/blog/phthalates-male-fertility-semen-quality-exposure-record-2026',
    ],
    references: [
      {
        title: 'EPA: Biomonitoring - Phthalates',
        url: 'https://www.epa.gov/americaschildrenenvironment/biomonitoring-phthalates',
      },
      {
        title: 'CDC: Infertility frequently asked questions',
        url: 'https://www.cdc.gov/reproductive-health/infertility-faq/index.html',
      },
      {
        title: 'AUA/ASRM: Diagnosis and treatment of infertility in men',
        url: 'https://www.auanet.org/guidelines-and-quality/guidelines/male-infertility',
      },
    ],
  },
]

function loadJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function saveJson(file, data) {
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function normalizeCategoryCounts(data) {
  for (const category of data.categories || []) {
    category.count = data.questions.filter((question) => question.category === category.id).length
  }
}

function addQuestions(file) {
  const data = loadJson(file)
  let inserted = 0
  let updated = 0

  for (const item of questions) {
    const full = {
      ...common,
      ...item,
      category_id: item.category,
      reviewed_at: UPDATED_AT,
      rewrittenAt: UPDATED_AT,
      validatedAnswer: item.answer,
      reviewReason:
        '카테고리 순환 최신 보강. 검색 이슈와 공공기관·학술 근거를 반영하고 치료·예방 보장 표현을 배제함.',
      reviewedAt: UPDATED_AT,
    }
    const existingIndex = data.questions.findIndex((question) => question.id === item.id)
    if (existingIndex === -1) {
      data.questions.push(full)
      inserted += 1
    } else {
      data.questions[existingIndex] = {
        ...data.questions[existingIndex],
        ...full,
      }
      updated += 1
    }
  }

  data.updatedAt = UPDATED_AT
  normalizeCategoryCounts(data)
  saveJson(file, data)
  return { inserted, updated }
}

const files = [
  path.join(ROOT, 'public/qa.json'),
  path.join(ROOT, 'src/data/qa.json'),
]

for (const file of files) {
  const { inserted, updated } = addQuestions(file)
  console.log(`${path.relative(ROOT, file)}: inserted ${inserted}, updated ${updated}`)
}
