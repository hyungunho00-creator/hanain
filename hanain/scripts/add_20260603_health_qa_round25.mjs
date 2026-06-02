import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-03T06:35:00+09:00'

const common = {
  content_type: 'latest_health_qna',
  author: '플로로탄닌 건강정보센터 · 카테고리 순환 Q&A 편집부',
  disclaimer:
    '건강정보는 진료를 대체하지 않습니다. 증상이 지속되거나 약을 복용 중이라면 의료진과 상담하세요.',
  source_type: 'official-public-health-and-specialty-society',
  references_pmid: [],
  reviewed: true,
  qualityStatus: 'validated',
  sourceStatus: 'referenced',
  publicBodyMode: 'full',
  noindex: false,
}

const questions = [
  {
    id: 'trend-wildfire-smoke-aqi-n95-asthma-copd-action-record-20260603',
    category: 'respiratory',
    question: '산불 연기와 PM2.5가 심한 날 천식이나 COPD가 있으면 무엇을 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>AQI 숫자, 노출 시간, 증상 시작 시점, 흡입제 사용 변화를 함께 기록해야 합니다.</strong> CDC는 천식, COPD, 심장질환, 당뇨, 만성콩팥병, 임신 중인 사람은 산불 연기에 특히 주의해야 한다고 안내합니다.</p>
  <p>기침이 시작된 뒤에만 대응하면 늦을 수 있습니다. AQI가 높은 날 무엇을 했고, 실내 공기를 어떻게 관리했는지 적어두면 의료진 상담에서 악화 요인을 더 잘 찾을 수 있습니다.</p>
  <h4>기록할 것</h4>
  <ul>
    <li>AQI 또는 PM2.5가 높았던 날짜와 시간대</li>
    <li>야외 운동, 환기, 운전, 조리처럼 노출이 늘어난 상황</li>
    <li>기침, 쌕쌕거림, 가슴 답답함, 호흡곤란 시작 시점</li>
    <li>천식 흡입제, COPD 약, 알레르기약 사용 횟수 변화</li>
    <li>공기청정기, 필터, 창문 밀폐, 실내 대피 공간 사용 여부</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 산불 연기 해독, 미세먼지 보호막, 천식 예방 성분처럼 설명하면 안 됩니다. 산불 연기 대응은 AQI 확인, 노출 줄이기, 실내공기 관리, 기존 약물 행동계획이 중심입니다.</p>
</div>`,
    tags: ['산불연기', 'PM2.5', 'AQI', '천식', 'COPD', 'N95', '호흡기'],
    difficulty: 'intermediate',
    views: 2576,
    likes: 178,
    related_insights: [
      '/insights/wildfire-smoke-aqi-n95-asthma-copd-action-record-2026',
      '/blog/wildfire-smoke-aqi-n95-asthma-copd-action-record-2026',
    ],
    references: [
      {
        title: 'CDC: Wildfires and Your Safety',
        url: 'https://www.cdc.gov/wildfires/about/index.html',
      },
      {
        title: 'CDC: Wildfire Smoke and People with Chronic Conditions',
        url: 'https://www.cdc.gov/wildfires/risk-factors/wildfire-smoke-and-people-with-chronic-conditions.html',
      },
    ],
  },
  {
    id: 'trend-dengue-chikungunya-travel-fever-joint-pain-record-20260603',
    category: 'infection_inflammation',
    question: '여행 후 발열과 관절통이 있으면 뎅기와 치쿤구니야를 어떻게 구분해서 상담해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>증상 이름보다 여행지, 모기 노출, 발열 시작일, 출혈 신호 기록이 먼저입니다.</strong> CDC는 치쿤구니야가 의심되는 경우에도 뎅기가 배제될 때까지 뎅기 가능성을 함께 고려해야 한다고 안내합니다.</p>
  <p>두 감염은 초기에 발열, 두통, 근육통, 관절통이 겹칠 수 있습니다. 특히 뎅기 가능성이 있으면 출혈 위험 때문에 NSAID 사용을 조심해야 하므로, 여행 후 발열을 단순 몸살처럼 넘기지 않는 것이 중요합니다.</p>
  <h4>상담 전 기록할 것</h4>
  <ul>
    <li>방문 국가, 도시, 체류 날짜와 숙소 환경</li>
    <li>모기 물림이 많았던 날짜, 기피제·긴팔·모기장 사용 여부</li>
    <li>발열 시작일, 최고 체온, 두통, 눈 뒤 통증</li>
    <li>심한 관절통, 발진, 복통, 구토, 코피·잇몸출혈·검은 변</li>
    <li>귀국 후 주변 모기에 다시 물리지 않도록 한 기간</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 뎅기 예방, 치쿤구니야 회복, 항바이러스 성분처럼 설명하면 안 됩니다. 감염병 콘텐츠는 모기 회피, 여행 전후 상담, 검사와 위험 신호 확인이 핵심입니다.</p>
</div>`,
    tags: ['뎅기', '치쿤구니야', '모기매개감염', '여행감염', '발열', '관절통'],
    difficulty: 'advanced',
    views: 2572,
    likes: 177,
    related_insights: [
      '/insights/dengue-chikungunya-travel-fever-joint-pain-mosquito-record-2026',
      '/blog/dengue-chikungunya-travel-fever-joint-pain-mosquito-record-2026',
    ],
    references: [
      {
        title: 'CDC: Treatment and Prevention of Chikungunya Virus Disease',
        url: 'https://www.cdc.gov/chikungunya/hcp/treatment-prevention/',
      },
      {
        title: 'CDC: Public Health Considerations for Dengue',
        url: 'https://www.cdc.gov/dengue/php/public-health-considerations/index.html',
      },
      {
        title: 'CDC: Preventing Dengue',
        url: 'https://www.cdc.gov/dengue/prevention/',
      },
    ],
  },
  {
    id: 'trend-tattoo-ink-contamination-skin-cancer-mole-monitoring-record-20260603',
    category: 'skin',
    question: '문신을 하기 전후에 피부 안전을 위해 어떤 기록을 남겨야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>시술 부위의 점, 피부질환, 잉크 색상, 시술 후 변화 기록이 중요합니다.</strong> FDA는 문신 잉크와 영구화장 제품에서 미생물 오염 등 피부에 해가 될 수 있는 상황을 안내하고, AAD는 문신이 점이나 병변 변화를 관찰하기 어렵게 만들 수 있다고 설명합니다.</p>
  <p>문신은 디자인 선택이지만 피부에는 장기적으로 남는 기록입니다. 점 위에 문신을 하거나, 감염·알레르기 신호를 놓치면 나중에 상담이 어려워질 수 있습니다.</p>
  <h4>기록할 것</h4>
  <ul>
    <li>시술 날짜, 부위, 잉크 브랜드와 색상</li>
    <li>시술 전 점, 색소반점, 흉터, 습진·건선 병변 사진</li>
    <li>붉어짐, 부기, 통증, 열감, 고름, 발열 시작일</li>
    <li>특정 색상 부위에서 반복되는 가려움·두드러기·딱지</li>
    <li>레이저 제거 전 기존 색상, 흉터, 켈로이드, 피부색 변화 이력</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 문신 후 염증 치료, 알레르기 예방, 흉터 회복 성분처럼 설명하면 안 됩니다. 피부 콘텐츠는 오염, 위생, 감염, 알레르기, 점 변화 관찰 기준을 알려줄 때 신뢰도가 높습니다.</p>
</div>`,
    tags: ['문신', '타투잉크', '피부안전', '알레르기', '피부암관찰', '감염'],
    difficulty: 'intermediate',
    views: 2568,
    likes: 176,
    related_insights: [
      '/insights/tattoo-ink-contamination-skin-cancer-mole-monitoring-record-2026',
      '/blog/tattoo-ink-contamination-skin-cancer-mole-monitoring-record-2026',
    ],
    references: [
      {
        title: 'FDA: Tattoos, Temporary Tattoos & Permanent Makeup',
        url: 'https://www.fda.gov/cosmetics/cosmetic-products/tattoos-temporary-tattoos-permanent-makeup',
      },
      {
        title: 'AAD: Do tattoos cause skin cancer?',
        url: 'https://www.aad.org/public/diseases/skin-cancer/find/do-tattoos-cause-skin-cancer',
      },
      {
        title: 'AAD: Caring for tattooed skin',
        url: 'https://www.aad.org/public/skin-hair-nails/skin-care/tattoos',
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
        '카테고리 순환 최신 보강. 공식 공중보건 자료와 전문학회 자료를 반영하고 치료·예방 보장 표현을 배제함.',
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
