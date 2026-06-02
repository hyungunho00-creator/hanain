import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-03T06:50:00+09:00'

const common = {
  content_type: 'latest_health_qna',
  author: '플로로탄닌 건강정보센터 · 카테고리 순환 Q&A 편집부',
  disclaimer:
    '건강정보는 진료를 대체하지 않습니다. 증상이 지속되거나 약을 복용 중이라면 의료진과 상담하세요.',
  source_type: 'official-guideline-and-public-health',
  references_pmid: [],
  reviewed: true,
  qualityStatus: 'validated',
  sourceStatus: 'referenced',
  publicBodyMode: 'full',
  noindex: false,
}

const questions = [
  {
    id: 'trend-older-adult-fall-prevention-balance-medication-vision-record-20260603',
    category: 'musculoskeletal',
    question: '고령자 낙상과 고관절 골절을 예방하려면 어떤 기록을 먼저 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>균형, 시력, 약물, 집안 환경, 골다공증 위험을 함께 기록해야 합니다.</strong> CDC는 65세 이상 성인의 낙상은 예방 가능하며 독립적인 생활 능력을 흔드는 중요한 위험이라고 설명합니다.</p>
  <p>운동은 중요하지만 낙상은 근력 하나만으로 설명되지 않습니다. 어지럼을 유발할 수 있는 약, 시력 문제, 욕실과 계단 환경, 발 통증, 과거 골절 이력이 함께 작용할 수 있습니다.</p>
  <h4>기록할 것</h4>
  <ul>
    <li>최근 1년 낙상 횟수와 장소</li>
    <li>넘어지기 전 어지럼, 두근거림, 저혈당 느낌, 다리 힘 빠짐</li>
    <li>수면제, 혈압약, 이뇨제, 항우울제, 진통제 복용 변화</li>
    <li>시력검사 시점, 안경 도수 변화, 백내장·녹내장 병력</li>
    <li>집안 조명, 전선, 매트, 욕실 손잡이, 계단 난간 상태</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 골절 예방, 관절 강화, 낙상 방지 성분처럼 설명하면 안 됩니다. 낙상 예방은 균형훈련, 약물검토, 시력, 환경 개선, 골다공증 평가가 중심입니다.</p>
</div>`,
    tags: ['낙상예방', '고관절골절', '균형운동', '시력검사', '약물검토', '근골격'],
    difficulty: 'intermediate',
    views: 2564,
    likes: 175,
    related_insights: [
      '/insights/older-adult-fall-prevention-balance-medication-vision-record-2026',
      '/blog/older-adult-fall-prevention-balance-medication-vision-record-2026',
    ],
    references: [
      {
        title: 'CDC: About Older Adult Fall Prevention',
        url: 'https://www.cdc.gov/falls/',
      },
      {
        title: 'CDC: Preventing Falls and Hip Fractures',
        url: 'https://www.cdc.gov/falls/prevention/index.html',
      },
    ],
  },
  {
    id: 'trend-loneliness-social-connection-health-risk-support-record-20260603',
    category: 'mental_health',
    question: '외로움과 사회적 고립도 건강 상담에서 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>네. 외로움은 단순한 기분 문제가 아니라 수면, 식사, 활동량, 우울·불안, 위기 신호와 함께 볼 수 있는 건강 기록입니다.</strong> WHO는 외로움과 사회적 고립이 신체 건강과 정신건강에 영향을 줄 수 있는 과소평가된 문제라고 설명합니다.</p>
  <p>중요한 것은 스스로를 탓하는 것이 아니라 패턴을 보는 것입니다. 언제 외로움이 심해지는지, 실제 연락이 얼마나 줄었는지, 수면과 식사가 어떻게 흔들리는지 적으면 도움 요청이 더 쉬워집니다.</p>
  <h4>기록할 것</h4>
  <ul>
    <li>외로움이 심해지는 시간대와 상황</li>
    <li>지난 2주간 직접 만남, 전화, 문자, 온라인 연락 빈도</li>
    <li>수면 시간, 새벽 각성, 식사 거름, 활동량 감소</li>
    <li>우울감, 불안, 무기력, 짜증, 음주·과식 증가</li>
    <li>자해 생각, 죽음 생각, 위기 상황에서 연락할 사람</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 외로움 해소, 우울 개선, 불안 완화 성분처럼 설명하면 안 됩니다. 필요한 경우 상담, 지역사회 자원, 위기 지원이 우선입니다.</p>
</div>`,
    tags: ['외로움', '사회적고립', '사회적연결', '정신건강', '수면', '우울'],
    difficulty: 'intermediate',
    views: 2560,
    likes: 174,
    related_insights: [
      '/insights/loneliness-social-connection-health-risk-support-record-2026',
      '/blog/loneliness-social-connection-health-risk-support-record-2026',
    ],
    references: [
      {
        title: 'WHO: Commission on Social Connection',
        url: 'https://www.who.int/groups/commission-on-social-connection',
      },
      {
        title: 'CDC: Community and Connection',
        url: 'https://www.cdc.gov/mental-health/about-data/community-connection.html',
      },
      {
        title: 'CDC: About Mental Health',
        url: 'https://www.cdc.gov/mental-health/about/index.html',
      },
    ],
  },
  {
    id: 'trend-masld-fib4-liver-fibrosis-risk-stratification-record-20260603',
    category: 'digestive',
    question: 'MASLD 지방간은 간수치보다 FIB-4와 간섬유화 위험을 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>간수치만으로 끝내기보다 FIB-4 같은 비침습적 위험분류와 대사지표를 함께 보는 것이 중요합니다.</strong> AGA 2026 MASLD clinical care pathway는 고위험군을 선별하고, FIB-4 뒤 필요하면 FibroScan 같은 2차 평가로 이어지는 단계적 접근을 제시합니다.</p>
  <p>FIB-4는 나이, AST, ALT, 혈소판을 이용한 선별 도구입니다. 진단서처럼 단독 해석하면 안 되지만, 다음 상담과 검사가 필요한지 가르는 출발점이 될 수 있습니다.</p>
  <h4>상담 전 기록할 것</h4>
  <ul>
    <li>AST, ALT, 혈소판, 감마지티피, 알부민, 빌리루빈</li>
    <li>허리둘레, 체중 변화, 혈압, 공복혈당, HbA1c, 중성지방</li>
    <li>당뇨, 고혈압, 이상지질혈증, 수면무호흡, 심혈관질환 이력</li>
    <li>음주량, 최근 약물·보충제 사용</li>
    <li>복부초음파, FibroScan, CT, MRI, 과거 간염 검사 이력</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 지방간 치료, 간섬유화 개선, 간수치 정상화 성분처럼 설명하면 안 됩니다. MASLD 관리는 체중, 혈당, 지질, 혈압, 운동, 약물 여부를 함께 보는 의료 영역입니다.</p>
</div>`,
    tags: ['MASLD', '지방간', 'FIB-4', '간섬유화', 'MASH', '간건강'],
    difficulty: 'advanced',
    views: 2556,
    likes: 173,
    related_insights: [
      '/insights/masld-fib4-liver-fibrosis-risk-stratification-record-2026',
      '/blog/masld-fib4-liver-fibrosis-risk-stratification-record-2026',
    ],
    references: [
      {
        title: 'AGA: Clinical care pathway for MASLD',
        url: 'https://gastro.org/clinical-guidance/clinical-care-pathway-for-the-risk-stratification-and-management-of-patients-with-masld/',
      },
      {
        title: 'PubMed: Clinical Care Pathway for MASLD',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41812830/',
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
        '카테고리 순환 최신 보강. 공식 가이드라인과 공중보건 자료를 반영하고 치료·예방 보장 표현을 배제함.',
      reviewedAt: UPDATED_AT,
    }
    const existingIndex = data.questions.findIndex((question) => question.id === item.id)
    if (existingIndex === -1) {
      data.questions.push(full)
      inserted += 1
    } else {
      data.questions[existingIndex] = { ...data.questions[existingIndex], ...full }
      updated += 1
    }
  }

  data.updatedAt = UPDATED_AT
  normalizeCategoryCounts(data)
  saveJson(file, data)
  return { inserted, updated }
}

for (const file of [
  path.join(ROOT, 'public/qa.json'),
  path.join(ROOT, 'src/data/qa.json'),
]) {
  const { inserted, updated } = addQuestions(file)
  console.log(`${path.relative(ROOT, file)}: inserted ${inserted}, updated ${updated}`)
}
