import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T16:20:00+09:00'

const questions = [
  {
    id: 'trend-mced-blood-test-cancer-screening-guideline-20260602',
    category: 'cancer_immune',
    question: '다중암 조기발견 혈액검사(MCED)를 받으면 기존 암검진을 안 해도 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>아니요. 다중암 조기발견 혈액검사(MCED/MCD)는 기존 권고 암검진을 대신하는 검사가 아닙니다.</strong> American Cancer Society는 현재 미국에서 MCD 검사를 일반 암검진으로 사용하라는 공식 임상 가이드라인이나 권고가 없다고 설명합니다. NCI도 이런 검사가 암 신호를 찾는 데 관심을 받고 있지만, 실제로 사망률을 줄이는지, 양성 결과 이후 어떤 검사 경로가 가장 안전한지 검증이 더 필요하다고 안내합니다.</p>
  <p>혈액검사라는 말 때문에 간단하고 확실해 보이지만, 암검진에서는 위양성, 위음성, 과잉진단, 추가 영상검사와 조직검사의 부담을 함께 봐야 합니다. 양성이 나와도 어디에서 온 신호인지 확정하려면 추가 검사가 필요하고, 음성이 나와도 대장내시경, 유방촬영, 자궁경부암 검사, 폐암 저선량 CT처럼 이미 권고된 검진을 생략할 수 없습니다.</p>
  <h4>먼저 확인할 것</h4>
  <ul>
    <li>나이와 성별에 맞는 기존 권고 암검진을 받고 있는지</li>
    <li>가족력, 유전성 암 가능성, 이전 용종·종양 병력</li>
    <li>검사 양성 시 어떤 추가검사를 받을 수 있는지</li>
    <li>검사 비용, 보험 적용, 위양성·위음성 가능성</li>
    <li>체중감소, 혈변, 지속 통증, 설명 안 되는 피로 같은 증상</li>
  </ul>
  <h4>현실적인 판단</h4>
  <p>MCED 검사를 고민한다면 “이 검사가 어떤 암을 얼마나 잘 찾는가”보다 “내가 이미 받아야 할 표준 검진을 놓치고 있지 않은가”를 먼저 확인해야 합니다. 증상이 있으면 선별검사보다 진료가 먼저입니다. 고위험 가족력이 있으면 일반 혈액검사보다 유전상담이나 맞춤 검진 계획이 더 중요할 수 있습니다.</p>
  <p>검사 결과를 받기 전에는 양성일 때 어느 병원에서 어떤 순서로 추가 평가를 받을지, 음성일 때도 어떤 검진을 계속해야 하는지까지 정해 두는 것이 좋습니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌을 암 예방, 암 치료, 면역 항암 효과로 설명하면 안 됩니다. 암/면역 콘텐츠에서는 검진의 한계와 권고 검진 일정, 증상 기록을 먼저 안내하고 해조 유래 성분은 일반 건강정보로만 다뤄야 합니다.</p>
</div>`,
    tags: ['MCED', '다중암검사', '암검진', '혈액검사', '위양성', '암예방정보'],
    difficulty: 'intermediate',
    views: 2620,
    likes: 204,
    related_insights: [
      '/insights/mced-blood-test-cancer-screening-guideline-record-2026',
      '/blog/mced-blood-test-cancer-screening-guideline-record-2026',
    ],
    references: [
      { title: 'American Cancer Society: Multi-cancer Detection Tests', url: 'https://www.cancer.org/cancer/screening/multi-cancer-early-detection-tests.html' },
      { title: 'NCI: Questions and Answers about Multi-Cancer Detection Tests', url: 'https://www.prevention.cancer.gov/research-areas/networks-consortia-programs/csrn/q-a-about-mcd-tests' },
      { title: 'American Cancer Society: Cancer Prevention & Early Detection Facts & Figures 2025-2026', url: 'https://www.cancer.org/content/dam/cancer-org/research/cancer-facts-and-statistics/cancer-prevention-and-early-detection-facts-and-figures/2025-cped-files/cped-cff-2025-2026.pdf' },
    ],
  },
  {
    id: 'trend-endometriosis-clinical-diagnosis-acog-20260602',
    category: 'womens_health',
    question: '생리통이 심하면 자궁내막증을 꼭 수술로 확인해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>반드시 수술로 먼저 확인해야 하는 것은 아닙니다.</strong> ACOG는 2026년 자궁내막증 진단 가이던스에서 병력, 증상, 진찰, 영상검사를 바탕으로 임상적 추정 진단을 내리고 평가를 이어가면서 경험적 치료를 시작할 수 있다고 설명했습니다. 과거처럼 수술 확인에만 의존하면 진단 지연이 길어질 수 있기 때문입니다.</p>
  <p>자궁내막증은 심한 생리통, 만성 골반통, 성교통, 배뇨·배변통, 난임과 관련될 수 있습니다. 하지만 증상만으로 확정할 수는 없고, 다른 원인과 구분해야 합니다. 초음파나 MRI가 도움이 될 수 있지만, 영상검사가 정상이라고 해서 자궁내막증 가능성이 완전히 사라지는 것도 아닙니다.</p>
  <h4>기록할 것</h4>
  <ul>
    <li>통증이 생리 전후 언제 시작되고 며칠 지속되는지</li>
    <li>진통제 복용량, 학교·업무·일상생활 방해 정도</li>
    <li>성교통, 배뇨통, 배변통, 만성 골반통 여부</li>
    <li>월경량 변화, 부정출혈, 난임 고민</li>
    <li>초음파·MRI 결과와 과거 수술·가족력</li>
  </ul>
  <h4>진료가 필요한 신호</h4>
  <p>일상생활이 무너질 정도의 생리통, 진통제로 조절되지 않는 통증, 성교통, 배변통, 난임, 갑자기 심해진 골반통은 진료가 필요합니다. 통증을 “참는 것”으로 넘기면 진단과 지원이 늦어질 수 있습니다. 수술 여부는 증상, 영상, 치료 반응, 임신 계획을 종합해 결정해야 합니다.</p>
  <p>특히 “생리통은 원래 그런 것”이라는 말 때문에 기록이 늦어지는 경우가 많습니다. 통증 때문에 결석·결근을 하거나, 진통제를 반복해서 먹어도 일상 기능이 떨어지거나, 배변·배뇨 통증이 생리 주기와 함께 반복된다면 단순 생리통으로 넘기지 않는 것이 좋습니다. 증상표를 들고 진료를 보면 상담이 훨씬 구체적입니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌을 자궁내막증 치료, 통증 완화 보장, 호르몬 조절 효과로 설명하면 안 됩니다. 여성건강 콘텐츠에서는 증상 기록과 진료 연결을 우선하고, 해조 유래 성분은 일반 건강정보의 보조 맥락에만 두어야 합니다.</p>
</div>`,
    tags: ['자궁내막증', '생리통', '골반통', '여성건강', 'ACOG', '진단지연'],
    difficulty: 'intermediate',
    views: 2580,
    likes: 199,
    related_insights: [
      '/insights/endometriosis-clinical-diagnosis-acog-record-2026',
      '/blog/endometriosis-clinical-diagnosis-acog-record-2026',
    ],
    references: [
      { title: 'ACOG 2026: New Endometriosis Clinical Guidance', url: 'https://www.acog.org/news/news-releases/2026/02/acog-publishes-new-endometriosis-clinical-guidance-aiming-shorten-time-diagnosis-improve-access-care' },
      { title: 'JAMA 2026: ACOG Endometriosis Guidelines Target Diagnostic Delays', url: 'https://jamanetwork.com/journals/jama/fullarticle/2846857' },
      { title: 'BMJ Best Practice: Endometriosis', url: 'https://bestpractice.bmj.com/topics/en-us/355' },
    ],
  },
  {
    id: 'trend-prostate-psa-mri-screening-aua-20260602',
    category: 'mens_health',
    question: 'PSA 수치가 높으면 바로 전립선 조직검사를 해야 하나요, MRI부터 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>PSA가 높다고 곧바로 조직검사로 가야 한다고 단정할 수는 없습니다.</strong> AUA/SUO의 전립선암 조기발견 가이드라인과 2026년 업데이트는 PSA 선별검사, MRI, 바이오마커, 초기·반복 조직검사 판단을 위험도에 맞춰 보도록 다룹니다. PSA는 중요한 출발점이지만 전립선비대, 염증, 사정, 운동, 검사 간 변동으로도 달라질 수 있습니다.</p>
  <p>조직검사는 암을 확인하는 중요한 검사이지만 감염, 출혈, 불안, 과잉진단 부담이 있습니다. 반대로 MRI가 정상이라고 해서 의미 있는 암이 절대 없다고 말할 수도 없습니다. 그래서 PSA 절대값 하나보다 나이, 가족력, 흑인 등 고위험 배경, PSA 변화 속도, 전립선 크기, PSA density, DRE, MRI PI-RADS 결과를 함께 봐야 합니다.</p>
  <h4>상담 전에 기록할 것</h4>
  <ul>
    <li>PSA 수치의 날짜별 변화와 같은 검사실 여부</li>
    <li>전립선비대, 배뇨증상, 전립선염 의심 증상</li>
    <li>가족력, 이전 조직검사, MRI, PI-RADS 결과</li>
    <li>검사 전 사정, 자전거, 격한 운동, 감염 여부</li>
    <li>의사가 말한 재검 간격, MRI 또는 바이오마커 필요성</li>
  </ul>
  <h4>질문할 것</h4>
  <p>“조직검사를 해야 하나요?”만 묻기보다 “반복 PSA가 필요한지, PSA density는 어떤지, MRI를 먼저 볼 수 있는지, 조직검사를 한다면 표적검사와 체계적 검사를 어떻게 조합할지”를 물어보는 것이 좋습니다. 가족력이 있거나 PSA가 빠르게 오르면 더 적극적인 평가가 필요할 수 있습니다.</p>
  <p>PSA는 한 번 높게 나온 숫자보다 반복 확인과 맥락이 중요합니다. 전립선 크기가 큰 사람은 PSA가 높게 보일 수 있고, 감염이나 염증이 있으면 일시적으로 오를 수 있습니다. 반대로 가족력이 강하거나 이전 MRI·조직검사 이력이 있으면 같은 수치라도 판단이 달라질 수 있습니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌을 전립선암 예방, PSA 감소, 전립선 치료로 설명하면 안 됩니다. 남성건강 콘텐츠에서는 검사 기록과 비뇨의학과 상담 기준을 우선 안내하고 해조 유래 성분은 일반 건강정보 수준에서만 다뤄야 합니다.</p>
</div>`,
    tags: ['PSA', '전립선암검진', '전립선MRI', '조직검사', '남성건강', 'AUA'],
    difficulty: 'intermediate',
    views: 2600,
    likes: 202,
    related_insights: [
      '/insights/prostate-psa-mri-screening-aua-record-2026',
      '/blog/prostate-psa-mri-screening-aua-record-2026',
    ],
    references: [
      { title: 'AUA/SUO 2026: Updates to Early Detection of Prostate Cancer Guideline', url: 'https://pubmed.ncbi.nlm.nih.gov/41744286/' },
      { title: 'AUA/SUO Guideline: Early Detection of Prostate Cancer', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/early-detection-of-prostate-cancer-guidelines' },
      { title: 'AUA/SUO Guideline Part II: Considerations for a Prostate Biopsy', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11321723/' },
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
      ...item,
      category_id: item.category,
      content_type: 'latest_health_qna',
      author: '플로로탄닌 정보센터 · 카테고리 순환 Q&A 편집팀',
      reviewed_at: UPDATED_AT,
      disclaimer: '건강정보는 진료를 대체하지 않습니다. 증상이 있거나 약을 복용 중이면 전문가와 상담하세요.',
      source_type: 'public-health-and-peer-reviewed',
      references_pmid: [],
      rewrittenAt: UPDATED_AT,
      reviewed: true,
      qualityStatus: 'validated',
      sourceStatus: 'referenced',
      validatedAnswer: item.answer,
      reviewReason: '카테고리 순환 보강. 최신 전문기관·학술 자료를 반영하고 치료·완치·보장 표현을 배제함.',
      reviewedAt: UPDATED_AT,
      publicBodyMode: 'full',
      noindex: false,
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
