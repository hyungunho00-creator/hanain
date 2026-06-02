import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-03T00:35:00+09:00'

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
    id: 'trend-exosome-scalp-injection-hair-loss-fda-safety-20260603',
    category: 'hair',
    question: '탈모 엑소좀 두피주사 광고를 볼 때 FDA 승인 여부와 부작용 기록은 어떻게 확인해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>탈모 엑소좀 두피주사 광고는 먼저 실제 제품명, FDA 승인 여부, 사용 목적, 부작용 대응 절차를 확인해야 합니다.</strong> FDA는 재생의료 제품 소비자 경고에서 엑소좀 제품도 규제 대상이며, 현재 FDA 승인 엑소좀 제품은 없다고 안내합니다. 연구 중인 소재와 승인 치료는 같은 뜻이 아닙니다.</p>
  <p>AAD는 탈모 치료가 원인 확인에서 시작된다고 설명합니다. 남성형 탈모, 원형탈모, 휴지기 탈모, 두피염, 영양 결핍은 접근이 다릅니다. 원인 평가 없이 “모낭 재생”, “몇 회 회복”, “부작용 없음”처럼 말하는 광고는 주의해야 합니다.</p>
  <h4>시술 전 확인할 것</h4>
  <ul>
    <li>시술명과 실제 사용 제품명</li>
    <li>FDA 승인 제품이라고 설명했는지, 연구용 표현인지</li>
    <li>주사 위치, 횟수, 비용, 병행 치료</li>
    <li>통증, 붓기, 감염 의심, 두피 열감 발생 시 대응</li>
    <li>전후 사진의 조명, 각도, 모발 길이 조건</li>
  </ul>
  <h4>광고에서 조심할 표현</h4>
  <p>부작용이 전혀 없다, 모낭이 살아난다, 병원 독점 재생기술, 줄기세포급 효과처럼 단정적인 문구는 근거와 승인 상태를 문서로 확인해야 합니다. 비용이 크고 반복 시술을 권한다면 더 신중해야 합니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 엑소좀 대체나 탈모 치료 성분처럼 설명하면 안 됩니다. 탈모 콘텐츠에서는 원인 평가, 사진 기록, 승인 치료와 미승인 광고의 구분, 부작용 신고 기준을 중심에 둬야 합니다.</p>
</div>`,
    tags: ['엑소좀', '두피주사', '탈모광고', '재생의료', 'FDA미승인', '두피건강'],
    difficulty: 'advanced',
    views: 2559,
    likes: 176,
    related_insights: [
      '/insights/exosome-scalp-injection-hair-loss-fda-safety-record-2026',
      '/blog/exosome-scalp-injection-hair-loss-fda-safety-record-2026',
    ],
    references: [
      {
        title: 'FDA: Consumer Alert on Regenerative Medicine Products Including Stem Cells and Exosomes',
        url: 'https://www.fda.gov/vaccines-blood-biologics/consumers-biologics/consumer-alert-regenerative-medicine-products-including-stem-cells-and-exosomes',
      },
      {
        title: 'FDA: Public Safety Alert Due to Marketing of Unapproved Stem Cell and Exosome Products',
        url: 'https://www.fda.gov/safety/medical-product-safety-information/public-safety-alert-due-marketing-unapproved-stem-cell-and-exosome-products',
      },
      {
        title: 'AAD: Hair loss diagnosis and treatment',
        url: 'https://www.aad.org/public/diseases/hair-loss/treatment/diagnosis-treat',
      },
    ],
  },
  {
    id: 'trend-dense-breast-mammogram-notification-supplemental-screening-20260603',
    category: 'womens_health',
    question: '치밀유방 알림을 받으면 맘모그램 뒤 초음파나 MRI를 꼭 추가해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>치밀유방 알림은 추가검사를 무조건 하라는 뜻이 아니라 개인 위험도와 검사 결과를 들고 상담하라는 신호입니다.</strong> FDA MQSA 개정 규정에 따라 유방촬영 시설은 치밀유방 여부를 환자와 의료진에게 알려야 합니다. 치밀유방은 맘모그램에서 작은 병변을 더 찾기 어렵게 만들 수 있고 유방암 위험도와도 관련됩니다.</p>
  <p>다만 USPSTF는 치밀유방인 여성이 음성 맘모그램 뒤 초음파나 MRI를 추가로 받을 때 이득과 위해의 균형을 평가하기에는 현재 근거가 충분하지 않다고 봅니다. 즉, 추가검사 자체를 금지하는 것이 아니라 모두에게 일괄 적용하기 어렵다는 뜻입니다.</p>
  <h4>상담 전에 준비할 것</h4>
  <ul>
    <li>최근 맘모그램 결과와 BI-RADS 분류</li>
    <li>치밀유방 단계: heterogeneously dense 또는 extremely dense</li>
    <li>이전 유방촬영과 비교했을 때 변화가 있었는지</li>
    <li>가족력, 과거 조직검사, 유전자 검사 여부</li>
    <li>추가 초음파나 MRI를 권유받은 이유와 비용·보험 조건</li>
  </ul>
  <h4>검진 주기와 별개로 진료가 필요한 신호</h4>
  <p>멍울, 혈성 분비물, 피부 함몰, 유두 변화, 새 통증, 한쪽만 지속되는 변화가 있으면 정기검진 결과와 별개로 진료를 받아야 합니다. 치밀유방 알림은 불안을 키우기보다 상담 질문을 정리하는 데 쓰는 것이 좋습니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 유방암 검진이나 치밀유방 문제의 해결책처럼 설명하면 안 됩니다. 여성건강 콘텐츠에서는 검진 결과 해석, 위험도 기록, 의료진 상담 질문을 중심에 둬야 합니다.</p>
</div>`,
    tags: ['치밀유방', '맘모그램', '유방촬영', '유방초음파', '유방MRI', '여성건강', '검진'],
    difficulty: 'advanced',
    views: 2554,
    likes: 175,
    related_insights: [
      '/insights/dense-breast-mammogram-notification-supplemental-screening-record-2026',
      '/blog/dense-breast-mammogram-notification-supplemental-screening-record-2026',
    ],
    references: [
      {
        title: 'FDA: Final Rule to Amend the Mammography Quality Standards Act',
        url: 'https://www.fda.gov/radiation-emitting-products/mammography-quality-standards-act-mqsa-and-mqsa-program/important-information-final-rule-amend-mammography-quality-standards-act-mqsa',
      },
      {
        title: 'FDA: Frequently Asked Questions About MQSA',
        url: 'https://www.fda.gov/radiation-emitting-products/mammography-information-patients/frequently-asked-questions-about-mqsa',
      },
      {
        title: 'USPSTF: Breast Cancer Screening Recommendation',
        url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/breast-cancer-screening',
      },
    ],
  },
  {
    id: 'trend-testosterone-therapy-fertility-sperm-count-20260603',
    category: 'mens_health',
    question: 'TRT를 시작하기 전에 임신 계획이 있으면 정자수와 호르몬 검사를 먼저 해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>네. 임신 계획이 있거나 향후 자녀 계획이 있다면 TRT 시작 전 정액검사와 호르몬 기록을 먼저 확인해야 합니다.</strong> ASRM은 임신을 시도하는 남성에서 외부 테스토스테론 사용을 피해야 한다고 설명합니다. 외부 테스토스테론은 LH·FSH 축을 억제해 정자 생성이 줄거나 무정자증에 가까워질 수 있습니다.</p>
  <p>Endocrine Society도 가까운 시기에 fertility를 계획하는 남성에게 테스토스테론 치료 시작을 권하지 않는다고 안내합니다. 피로, 성욕 저하, 근력 저하가 있다고 해서 모두 TRT 대상은 아닙니다. 수면 부족, 비만, 당뇨, 우울, 약물, 수면무호흡도 비슷한 증상을 만들 수 있습니다.</p>
  <h4>상담 전에 기록할 것</h4>
  <ul>
    <li>임신 계획 시점: 지금, 6개월 안, 1년 안, 향후 가능성</li>
    <li>정액검사 결과: 농도, 운동성, 형태, 총 운동 정자수</li>
    <li>아침 총 테스토스테론 반복 측정 여부</li>
    <li>LH, FSH, 프로락틴, 혈색소·헤마토크릿, PSA</li>
    <li>TRT 주사·젤·펠렛, 스테로이드, 탈모약, 보충제 사용 여부</li>
  </ul>
  <h4>끊으면 바로 회복된다고 단정하면 안 됩니다</h4>
  <p>일부 남성은 시간이 지나며 회복할 수 있지만 회복 속도와 정도는 사용 기간, 용량, 나이, 기존 정액검사 상태, 고환 기능에 따라 달라집니다. 시작 전 기록이 있어야 나중에 판단하기 쉽습니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 남성호르몬 개선이나 fertility 회복 성분처럼 설명하면 안 됩니다. 남성건강 콘텐츠에서는 정액검사, 호르몬 검사, 혈압, 수면, 약물 사용 기록을 안내해야 합니다.</p>
</div>`,
    tags: ['TRT', '테스토스테론', '남성난임', '정자수', 'LH', 'FSH', '남성건강'],
    difficulty: 'advanced',
    views: 2551,
    likes: 174,
    related_insights: [
      '/insights/testosterone-therapy-fertility-sperm-count-record-2026',
      '/blog/testosterone-therapy-fertility-sperm-count-record-2026',
    ],
    references: [
      {
        title: 'ASRM: Sexual dysfunction in the male partner in infertility',
        url: 'https://www.asrm.org/practice-guidance/practice-committee-documents/diagnostic-evaluation-of-sexual-dysfunction-in-the-male-partner-in-the-setting-of-infertility-a-committee-opinion-2018/',
      },
      {
        title: 'Endocrine Society: Testosterone Therapy for Hypogonadism Guideline',
        url: 'https://www.endocrine.org/clinical-practice-guidelines/testosterone-therapy',
      },
      {
        title: 'FDA: Testosterone Information',
        url: 'https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/testosterone-information',
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
