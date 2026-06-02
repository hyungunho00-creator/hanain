import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T16:12:00+09:00'

const questions = [
  {
    id: 'trend-cgm-prediabetes-a1c-postprandial-spike-20260602',
    category: 'metabolism',
    question: '연속혈당측정기(CGM)를 차면 전당뇨나 혈당 스파이크를 진단할 수 있나요?',
    answer: `<div class="qa-structured">
  <p><strong>CGM은 식후 혈당 패턴을 이해하는 데 도움이 될 수 있지만, 전당뇨나 당뇨를 진단하는 도구로 단독 사용하면 안 됩니다.</strong> ADA 2026 Standards of Care는 전당뇨와 당뇨 진단에는 A1C, 공복혈당, 경구당부하검사 같은 표준 검사가 필요하며, 현재로서는 CGM을 전당뇨·당뇨 선별 또는 진단 목적으로 사용할 근거가 충분하지 않다고 설명합니다.</p>
  <p>다만 2026년 CGM 메타분석에서는 전당뇨군이 정상혈당군보다 평균혈당, 혈당 변동폭, 목표범위 초과 시간이 높게 나타나는 경향이 관찰됐습니다. 그래서 CGM은 “진단서”라기보다 식사, 수면, 운동, 스트레스가 혈당 패턴에 어떤 영향을 주는지 기록하는 도구로 이해하는 편이 안전합니다.</p>
  <h4>기록할 것</h4>
  <ul>
    <li>A1C, 공복혈당, 필요 시 경구당부하검사 날짜와 수치</li>
    <li>식후 1~3시간 혈당 변화와 식사 구성</li>
    <li>수면 부족, 야식, 음주, 스트레스가 있던 날</li>
    <li>식후 걷기, 단백질·섬유질 섭취, 식사 순서 변화 후 반응</li>
    <li>저혈당 증상, 어지럼, 식은땀, 심한 피로감</li>
  </ul>
  <h4>오해하기 쉬운 부분</h4>
  <p>한 번의 식후 상승만 보고 “나는 당뇨다”라고 판단하면 안 됩니다. 반대로 A1C가 정상이라고 해서 모든 식후 패턴이 괜찮다고 단정할 수도 없습니다. CGM 값은 혈액이 아니라 간질액 기준이라 지연과 오차가 있을 수 있고, 기기·부착상태·압박에 따라 달라질 수 있습니다.</p>
  <p>가장 도움이 되는 사용법은 같은 식사를 반복해 비교하는 것입니다. 예를 들어 흰쌀밥만 먹은 날, 단백질과 채소를 먼저 먹은 날, 식후 10~20분 걸은 날을 따로 기록하면 개인에게 맞는 조정점을 찾기 쉽습니다. 숫자가 불안만 키운다면 사용 기간을 줄이고 검사 결과와 함께 의료진에게 해석을 맡기는 편이 낫습니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌을 혈당 치료나 당뇨 예방 보장으로 설명하면 안 됩니다. 이 주제에서는 검사 수치, 식사 기록, 운동 반응을 먼저 정리하고, 해조 유래 성분은 식후 대사와 관련된 일반 건강정보의 보조 맥락으로만 다뤄야 합니다.</p>
</div>`,
    tags: ['CGM', '전당뇨', '혈당스파이크', 'A1C', '식후혈당', '대사건강'],
    difficulty: 'intermediate',
    views: 2540,
    likes: 198,
    related_insights: [
      '/insights/cgm-prediabetes-a1c-postprandial-spike-record-2026',
      '/blog/cgm-prediabetes-a1c-postprandial-spike-record-2026',
    ],
    references: [
      { title: 'ADA 2026 Standards of Care: Diagnosis and Classification of Diabetes', url: 'https://diabetesjournals.org/care/article/49/Supplement_1/S27/163926/2-Diagnosis-and-Classification-of-Diabetes' },
      { title: 'ADA 2026 Standards of Care resources', url: 'https://professional.diabetes.org/standards-of-care/practice-guidelines-resources' },
      { title: 'J Diabetes Sci Technol 2026: CGM metrics in prediabetes and normoglycemia', url: 'https://pubmed.ncbi.nlm.nih.gov/41773692/' },
    ],
  },
  {
    id: 'trend-diet-microbiome-ibs-upf-fermented-food-20260602',
    category: 'digestive',
    question: '장내미생물에 좋다며 발효식품과 식이섬유를 많이 먹으면 과민성장증후군에도 도움이 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>장내미생물에 좋은 식단이 모두에게 같은 방식으로 편안하게 작용하지는 않습니다.</strong> 2026년 Nature Reviews Gastroenterology & Hepatology가 소개한 대규모 식이-마이크로바이옴 연구 흐름은 최소가공, 영양밀도 높은 식단이 장내미생물 다양성과 긍정적으로 연결되고 초가공식품은 부정적 예측요인으로 나타났다고 정리합니다. 그러나 IBS처럼 복부팽만, 통증, 설사·변비가 반복되는 사람에게는 갑작스러운 섬유질 증가가 오히려 불편을 키울 수 있습니다.</p>
  <p>2026년 Scientific Reports 연구는 장 건강 식단지수와 IBS 위험·증상 심각도 관계를 다뤘습니다. 이런 연구는 식단의 질을 보게 해주지만, 개인별 유발식품을 바로 알려주는 검사는 아닙니다. 발효식품도 마찬가지입니다. 요구르트, 김치, 케피어가 어떤 사람에게는 도움이 될 수 있지만, 어떤 사람에게는 가스와 복부팽만을 늘릴 수 있습니다.</p>
  <h4>먼저 확인할 것</h4>
  <ul>
    <li>증상: 복통, 팽만, 설사, 변비, 배변 후 호전 여부</li>
    <li>유발식품: 유제품, 밀, 양파·마늘, 콩류, 탄산, 인공감미료</li>
    <li>갑자기 늘린 식이섬유·발효식품·프로바이오틱스</li>
    <li>초가공식품, 야식, 음주, 수면 부족, 스트레스</li>
    <li>체중감소, 혈변, 발열, 야간 설사 같은 경고 신호</li>
  </ul>
  <h4>현실적인 접근</h4>
  <p>좋은 식품을 많이 먹는 것보다 한 번에 하나씩 바꾸는 것이 더 안전합니다. 1~2주 단위로 식품을 늘리거나 줄이고 증상을 기록해야 원인을 구분할 수 있습니다. 혈변, 체중감소, 빈혈, 야간 통증, 가족력 같은 경고 신호가 있으면 장내미생물 관리보다 진료가 먼저입니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌을 IBS 치료나 장내미생물 개선 보장으로 설명하면 안 됩니다. 소화/간 건강 콘텐츠에서는 식사 패턴과 증상 기록을 우선 안내하고, 해조 유래 폴리페놀은 연구가 진행 중인 보조 정보로 조심스럽게 소개해야 합니다.</p>
</div>`,
    tags: ['장내미생물', 'IBS', '과민성장증후군', '발효식품', '식이섬유', '초가공식품'],
    difficulty: 'intermediate',
    views: 2490,
    likes: 192,
    related_insights: [
      '/insights/diet-microbiome-ibs-upf-fermented-food-record-2026',
      '/blog/diet-microbiome-ibs-upf-fermented-food-record-2026',
    ],
    references: [
      { title: 'Nature Reviews Gastroenterology & Hepatology 2026: Diet-microbiome associations', url: 'https://www.nature.com/articles/s41575-026-01205-9' },
      { title: 'Scientific Reports 2026: Dietary index for gut microbiota and IBS', url: 'https://www.nature.com/articles/s41598-026-50647-3' },
      { title: 'Life 2026: Processed diets, food additives, and gut microbiota', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13027645/' },
    ],
  },
  {
    id: 'trend-dyslipidemia-prevent-ldl-apob-lpa-risk-20260602',
    category: 'cardiovascular',
    question: '2026년 콜레스테롤 가이드라인이 바뀌었다는데 LDL만 보면 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>LDL 콜레스테롤은 여전히 중요하지만, 2026년 ACC/AHA 다학회 이상지질혈증 가이드라인은 위험평가를 더 넓게 보도록 업데이트됐습니다.</strong> 새 가이드라인은 성인 30~79세의 1차 예방에서 PREVENT 방정식을 사용해 10년 위험뿐 아니라 30년 위험도 함께 보도록 권고하고, 필요할 때 ApoB, Lp(a), 관상동맥석회화(CAC) 같은 추가 정보를 활용할 수 있다고 설명합니다.</p>
  <p>즉 “LDL 수치 하나가 높다/낮다”만으로 끝나는 주제가 아닙니다. 나이, 혈압, 흡연, 당뇨, 신장기능, 가족력, 비만, 여성 특이 위험요인, 과거 심혈관질환 여부가 함께 들어갑니다. LDL이 낮아 보여도 Lp(a)가 높거나 가족력이 강하면 상담 기준이 달라질 수 있고, LDL이 약간 높아도 전체 위험이 낮으면 생활습관 조정과 추적이 우선일 수 있습니다.</p>
  <h4>검사표에서 확인할 것</h4>
  <ul>
    <li>LDL-C, non-HDL-C, 중성지방, HDL-C</li>
    <li>혈압, A1C·공복혈당, 신장기능, 흡연 여부</li>
    <li>조기 심근경색·뇌졸중 가족력</li>
    <li>ApoB, Lp(a), CAC 검사가 필요한지 상담</li>
    <li>식사, 체중, 운동, 수면, 음주 기록</li>
  </ul>
  <h4>주의할 점</h4>
  <p>건강기능식품이나 특정 식품으로 스타틴, 에제티미브, PCSK9 억제제 같은 약물 치료 결정을 대신하면 안 됩니다. 가이드라인은 개인의 위험도와 검사 결과를 놓고 의료진과 결정하도록 만든 도구입니다. 약을 이미 복용 중이면 임의로 중단하지 말고 부작용과 수치를 함께 상담해야 합니다.</p>
  <p>상담할 때는 “LDL이 몇이면 위험한가요?”만 묻기보다 “제 10년·30년 위험도는 어느 정도인지, ApoB나 Lp(a)를 한 번 확인할 필요가 있는지, 생활습관 조정 후 몇 개월 뒤 재검할지”를 함께 물어보는 것이 더 실용적입니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌을 콜레스테롤 치료나 심혈관질환 예방 보장으로 설명하면 안 됩니다. 심혈관 콘텐츠에서는 검사표를 읽는 법, 위험요인 기록, 의료진 상담 기준을 우선 제공하고 해조 유래 성분은 일반 건강정보 범위에서만 다뤄야 합니다.</p>
</div>`,
    tags: ['콜레스테롤', 'LDL', 'ApoB', 'Lp(a)', 'PREVENT', '심혈관위험'],
    difficulty: 'intermediate',
    views: 2570,
    likes: 201,
    related_insights: [
      '/insights/dyslipidemia-prevent-ldl-apob-lpa-risk-record-2026',
      '/blog/dyslipidemia-prevent-ldl-apob-lpa-risk-record-2026',
    ],
    references: [
      { title: 'ACC 2026: Updated guideline for managing lipids and cholesterol', url: 'https://www.acc.org/about-acc/press-releases/2026/03/13/18/01/accaha-issue-updated-guideline-for-managing-lipids-cholesterol' },
      { title: 'Circulation 2026: ACC/AHA multisociety dyslipidemia guideline', url: 'https://www.ahajournals.org/doi/abs/10.1161/CIR.0000000000001423' },
      { title: 'ACC 2026: JACC Spotlight Issue on dyslipidemia guideline', url: 'https://www.acc.org/latest-in-cardiology/articles/2026/05/19/15/49/jacc-spotlight-issue-2026-dyslipidemia-guideline' },
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
      reviewReason: '카테고리 순환 보강. 최신 가이드라인·전문기관·학술 자료를 반영하고 치료·완치·보장 표현을 배제함.',
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
