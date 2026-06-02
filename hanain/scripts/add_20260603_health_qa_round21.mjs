import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-03T00:55:00+09:00'

const common = {
  content_type: 'latest_health_qna',
  author: '플로로탄닌 건강정보센터 · 카테고리 순환 Q&A 편집부',
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
    id: 'trend-lpa-once-lifetime-test-family-heart-risk-20260603',
    category: 'cardiovascular',
    question: 'Lp(a)는 왜 평생 한 번 검사하라는 말이 나오고, 가족력이 있으면 무엇을 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>Lp(a)는 대부분 유전적으로 결정되는 지질 입자라서, 가족력과 함께 한 번 확인해 볼 수 있는 심혈관 위험 기록입니다.</strong> AHA는 Lp(a)가 높으면 심장질환과 뇌졸중 위험이 높아질 수 있고, 표준 콜레스테롤 검사에 자동 포함되지 않는 경우가 많다고 안내합니다.</p>
  <p>중요한 것은 “Lp(a)를 낮추는 특정 건강식품”을 찾는 것이 아닙니다. 수치가 높다면 LDL, 혈압, 혈당, 흡연, 체중, 가족력을 함께 보며 전체 위험을 줄이는 계획을 세워야 합니다.</p>
  <h4>상담 전 기록할 것</h4>
  <ul>
    <li>부모·형제·자녀의 이른 심근경색, 뇌졸중, 협심증, 스텐트 병력</li>
    <li>최근 LDL, HDL, 중성지방, ApoB 검사 결과</li>
    <li>고혈압, 당뇨, 만성콩팥병, 갑상선질환 여부</li>
    <li>흡연, 수면부족, 운동부족, 야간근무 같은 생활 위험</li>
    <li>가족성 고콜레스테롤혈증을 들은 적이 있는지</li>
  </ul>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 Lp(a)를 낮추는 성분처럼 말하면 안 됩니다. 해양 폴리페놀과 항산화·염증 연구 배경은 소개할 수 있지만, Lp(a) 판단은 검사와 의료진 상담이 우선입니다.</p>
</div>`,
    tags: ['Lp(a)', '리포단백a', '심혈관위험', '가족력', '콜레스테롤', 'ApoB'],
    difficulty: 'advanced',
    views: 2588,
    likes: 181,
    related_insights: [
      '/insights/lpa-once-lifetime-test-family-heart-risk-record-2026',
      '/blog/lpa-once-lifetime-test-family-heart-risk-record-2026',
    ],
    references: [
      {
        title: 'American Heart Association: Lipoprotein(a)',
        url: 'https://www.heart.org/en/health-topics/cholesterol/genetic-conditions/lipoprotein-a',
      },
      {
        title: 'American Heart Association: Understanding Cholesterol and Lipids',
        url: 'https://www.heart.org/en/health-topics/cholesterol/your-complete-guide-to-understanding-cholesterol-and-lipids',
      },
    ],
  },
  {
    id: 'trend-alzheimers-blood-biomarker-memory-clinic-record-20260603',
    category: 'neuro_cognitive',
    question: '알츠하이머 혈액검사가 나온다는데 기억력이 떨어지면 바로 검사부터 해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>기억력 저하가 있다면 혈액검사 이름부터 찾기보다, 증상 기록을 정리해 전문 진료에서 검사 필요성을 판단하는 것이 좋습니다.</strong> 알츠하이머협회 가이드라인은 혈액 기반 바이오마커를 전문 진료 환경에서 인지 저하가 있는 사람의 진단 과정에 활용하는 방향으로 설명합니다.</p>
  <p>혈액 바이오마커는 빠르게 발전하고 있지만, 혼자 검사 결과를 해석하는 방식은 위험합니다. 수면 부족, 우울감, 청력 저하, 약물 부작용, 갑상선·비타민 문제도 기억력 저하처럼 보일 수 있습니다.</p>
  <h4>상담 전에 기록할 것</h4>
  <ul>
    <li>언제부터 변화가 시작됐는지</li>
    <li>같은 질문 반복, 길 찾기 어려움, 돈 관리 실수, 약 복용 실수 여부</li>
    <li>수면장애, 코골이, 우울감, 불안감</li>
    <li>수면제, 항히스타민제, 진통제, 정신건강 약물 복용 여부</li>
    <li>청력 저하, 사회활동 감소, 최근 감염·입원 여부</li>
  </ul>
  <h4>주의할 점</h4>
  <p>플로로탄닌을 알츠하이머 예방이나 치료 성분처럼 설명하면 안 됩니다. 산화스트레스와 해양 폴리페놀 연구 배경으로 제한하고, 기억력 변화는 의료진 평가를 우선해야 합니다.</p>
</div>`,
    tags: ['알츠하이머', '혈액바이오마커', '기억력', '치매검사', 'p-tau217', '인지기능'],
    difficulty: 'advanced',
    views: 2579,
    likes: 179,
    related_insights: [
      '/insights/alzheimers-blood-biomarker-memory-clinic-test-record-2026',
      '/blog/alzheimers-blood-biomarker-memory-clinic-test-record-2026',
    ],
    references: [
      {
        title: 'Alzheimer’s Association: Blood-Based Biomarkers in Specialty Care',
        url: 'https://pro.alz.org/hub/care-pathway/detection-and-diagnosis/blood-based-biomarkers-guideline',
      },
      {
        title: 'PubMed: Alzheimer’s Association Clinical Practice Guideline on Blood-Based Biomarkers',
        url: 'https://pubmed.ncbi.nlm.nih.gov/40729527/',
      },
    ],
  },
  {
    id: 'trend-personalized-cancer-vaccine-ctdna-neoantigen-trial-20260603',
    category: 'cancer_immune',
    question: '개인맞춤 암 백신은 암 예방주사인가요, 아니면 임상시험 치료인가요?',
    answer: `<div class="qa-structured">
  <p><strong>개인맞춤 암 백신은 일반적인 예방주사로 이해하면 안 됩니다. 많은 경우 이미 암 진단과 표준치료가 진행된 환자에서 종양 유전정보를 바탕으로 연구되는 치료 임상시험입니다.</strong></p>
  <p>NCI 임상시험 자료를 보면 개인맞춤 암 백신은 ctDNA 양성, 분자잔존질환, 특정 암종과 병기 같은 세부 기준을 둡니다. 기사 제목만 보고 “암이 백신으로 해결된다”고 이해하면 위험합니다.</p>
  <h4>기사나 광고를 볼 때 확인할 것</h4>
  <ul>
    <li>예방 백신인지 치료 백신인지</li>
    <li>일반 접종인지 환자 맞춤 임상시험인지</li>
    <li>ctDNA 양성 또는 분자잔존질환 기준이 있는지</li>
    <li>표준치료를 대신하는지 함께 연구되는지</li>
    <li>1상, 2상, 3상 중 어느 단계인지</li>
  </ul>
  <h4>플로로탄닌과 건강기능식품 병용</h4>
  <p>플로로탄닌을 암 백신, 면역항암제, ctDNA 감소와 직접 연결하면 안 됩니다. 암 치료 또는 임상시험 중에는 복용 중인 건강기능식품의 성분명과 복용량을 담당 의료진에게 알려야 합니다.</p>
</div>`,
    tags: ['개인맞춤암백신', '암백신', 'ctDNA', '신생항원', 'mRNA백신', '임상시험'],
    difficulty: 'advanced',
    views: 2594,
    likes: 182,
    related_insights: [
      '/insights/personalized-cancer-vaccine-ctdna-neoantigen-trial-record-2026',
      '/blog/personalized-cancer-vaccine-ctdna-neoantigen-trial-record-2026',
    ],
    references: [
      {
        title: 'NCI: Personalized Cancer Vaccine Trial NCI-2025-00334',
        url: 'https://www.cancer.gov/research/participate/clinical-trials-search/v?id=NCI-2025-00334&r=1',
      },
      {
        title: 'NCI: mRNA-Based Personalized Cancer Vaccine Against Neoantigens',
        url: 'https://www.cancer.gov/clinicaltrials/NCI-2018-03656',
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
        '카테고리 순환 최신 보강. 공식기관 및 학회 근거를 반영하고 치료·예방 보장 표현을 배제함.',
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
