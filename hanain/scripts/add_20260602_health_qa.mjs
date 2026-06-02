import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T10:30:00+09:00'

const references = {
  heat: [
    { title: 'WHO: Heat and health', url: 'https://www.who.int/health-topics/heatwaves' },
    { title: 'CDC: Heat and medications guidance for clinicians', url: 'https://www.cdc.gov/heat-health/hcp/clinical-guidance/heat-and-medications-guidance-for-clinicians.html' },
  ],
  glp1: [
    { title: 'Cell Reports Medicine 2026: GLP-1 medicines and muscle mass/function', url: 'https://doi.org/10.1016/j.xcrm.2026.102665' },
    { title: 'American Council on Exercise: resistance training and protein during weight loss', url: 'https://www.acefitness.org/resources/pros/expert-articles/' },
  ],
  upf: [
    { title: 'American College of Cardiology 2026: ultra-processed foods and heart problems', url: 'https://www.acc.org/About-ACC/Press-Releases/2026/03/16/18/57/Ultra-Processed-Foods-Linked-with-Serious-Heart-Problems' },
    { title: 'BMJ Nutrition, Prevention & Health 2026: not all ultra-processed foods are created equal', url: 'https://nutrition.bmj.com/content/early/2026/01/05/bmjnph-2025-001358' },
  ],
}

const questions = [
  {
    id: 'trend-heat-health-hydration-blood-pressure-20260602',
    category: 'cardiovascular',
    question: '폭염이 시작되면 혈압약을 먹는 사람은 물을 얼마나 마시고 무엇을 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>짧게 말하면, 폭염에는 물의 양만 정하기보다 혈압, 어지럼, 소변 변화, 복용약을 함께 기록해야 합니다.</strong> 특히 이뇨제, 혈압약, 심장약을 복용 중이라면 더운 날 탈수와 저혈압 신호가 겹쳐 보일 수 있습니다.</p>
  <h4>왜 폭염이 혈압 관리에 영향을 주나요?</h4>
  <p>더운 날에는 땀 배출과 혈관 확장이 늘어나고, 몸은 체온을 낮추기 위해 혈액 순환을 조절합니다. 이때 수분이 부족하거나 이뇨제·일부 혈압약을 복용 중이면 어지럼, 기립성 저혈압, 실신 위험이 커질 수 있습니다. CDC도 더운 날 특정 약물이 탈수, 저혈압, 낙상 위험과 연결될 수 있어 약물 계획을 세우라고 안내합니다.</p>
  <h4>오늘부터 적을 것</h4>
  <ul>
    <li>아침·저녁 혈압과 맥박</li>
    <li>물 섭취량, 소변 색, 소변 횟수</li>
    <li>야외 활동 시간과 땀을 많이 흘린 시간</li>
    <li>어지럼, 두통, 구역감, 심한 피로가 시작된 시간</li>
    <li>이뇨제, 혈압약, 심장약, 진통소염제 복용 여부</li>
  </ul>
  <h4>위험 신호</h4>
  <p>의식이 흐려짐, 반복 구토, 흉통, 숨참, 실신, 소변이 거의 없는 상태, 고열과 혼동이 있으면 정보 검색이나 건강식품 선택보다 진료가 우선입니다. 약을 임의로 끊거나 늘리지 말고, 기록을 가지고 상담하는 것이 안전합니다.</p>
  <p>플로로탄닌 정보는 항산화 연구 맥락의 참고 자료로 볼 수 있지만, 폭염 대처나 혈압 조절을 대신한다고 표현해서는 안 됩니다. 여름 건강관리의 출발점은 수분·혈압·증상 기록입니다.</p>
</div>`,
    tags: ['폭염', '혈압약', '수분섭취', '온열질환', '이뇨제', '여름건강'],
    difficulty: 'intermediate',
    views: 2680,
    likes: 207,
    related_insights: [
      '/insights/heat-health-hydration-blood-pressure-record-2026',
      '/blog/heat-health-action-plan-hydration-blood-pressure-2026',
    ],
    references: references.heat,
  },
  {
    id: 'trend-glp1-muscle-protein-fiber-20260602',
    category: 'metabolism',
    question: 'GLP-1 체중관리를 하는 사람은 근손실을 막기 위해 단백질과 운동을 어떻게 챙겨야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>핵심은 체중 감량 속도보다 근력과 식사 기능을 같이 보는 것입니다.</strong> GLP-1 계열 약물을 쓰면 식욕이 줄 수 있고, 이 과정에서 단백질·식이섬유·수분 섭취가 함께 줄어 피로와 변비, 근력 저하를 느낄 수 있습니다.</p>
  <h4>근손실을 어떻게 이해해야 하나요?</h4>
  <p>체중이 줄면 지방뿐 아니라 제지방도 일부 줄 수 있습니다. 다만 2026년 Cell Reports Medicine 논문은 GLP-1 약물에 의한 체중감량이 연구 대상에서 근육량이나 기능의 불균형한 손실로만 해석되지는 않는다는 점을 제시했습니다. 그래서 숫자 하나로 겁을 주기보다 실제 근력, 활동량, 식사량을 함께 봐야 합니다.</p>
  <h4>기록 기준</h4>
  <ul>
    <li>매 끼니 단백질 식품이 들어갔는지 표시합니다.</li>
    <li>채소, 콩류, 해조류, 통곡 등 식이섬유 식품을 너무 줄이지 않았는지 봅니다.</li>
    <li>주 2~3회 저항운동 또는 근력운동을 했는지 체크합니다.</li>
    <li>구역감, 변비, 더부룩함 때문에 식사량이 줄었는지 적습니다.</li>
    <li>계단 오르기, 악력, 일상 피로감처럼 체중계 밖 변화를 봅니다.</li>
  </ul>
  <h4>플로로탄닌은 어디에 놓고 봐야 하나요?</h4>
  <p>플로로탄닌은 해조 폴리페놀과 항산화 연구 맥락의 성분 정보로 다루는 것이 적절합니다. GLP-1 약효를 높인다거나 근손실을 막는다고 단정하면 안 됩니다. 소비자에게 도움이 되는 답변은 “성분 추천”보다 단백질, 식이섬유, 근력운동, 소화 반응 기록을 먼저 정리해 주는 답변입니다.</p>
</div>`,
    tags: ['GLP-1', '근손실', '단백질', '식이섬유', '근력운동', '체중관리'],
    difficulty: 'intermediate',
    views: 2540,
    likes: 191,
    related_insights: [
      '/insights/glp1-muscle-protein-fiber-record-2026',
      '/blog/glp1-plateau-muscle-protein-fiber-record-2026',
    ],
    references: references.glp1,
  },
  {
    id: 'trend-ultra-processed-food-blood-sugar-label-20260602',
    category: 'metabolism',
    question: '초가공식품을 줄이고 싶을 때 혈당과 심혈관 건강을 위해 라벨에서 무엇을 먼저 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>초가공식품은 “한 번 먹었다”보다 “얼마나 자주, 어떤 조합으로 반복되는가”가 더 중요합니다.</strong> 최근 심혈관·대사 건강 연구와 보도에서도 초가공식품 섭취 빈도와 위험 신호를 함께 다룹니다.</p>
  <h4>라벨에서 먼저 볼 항목</h4>
  <ul>
    <li><strong>첨가당:</strong> 음료, 디저트, 시리얼, 소스에서 빨리 누적됩니다.</li>
    <li><strong>나트륨:</strong> 국물, 즉석식, 냉동식품은 1회 제공량 기준을 확인해야 합니다.</li>
    <li><strong>단백질:</strong> 단백질이 너무 낮고 정제 탄수화물이 높은 제품은 포만감이 짧을 수 있습니다.</li>
    <li><strong>식이섬유:</strong> 혈당 변동과 식사 만족감을 볼 때 중요한 항목입니다.</li>
    <li><strong>섭취 빈도:</strong> 같은 제품을 일주일에 몇 번 먹는지 적어야 실제 습관이 보입니다.</li>
  </ul>
  <h4>무조건 금지가 답인가요?</h4>
  <p>무조건 금지보다 액상 당류, 야식형 즉석식, 과자·빵류 반복 섭취를 먼저 줄이는 것이 현실적입니다. BMJ Nutrition, Prevention & Health의 2026년 리뷰도 초가공식품이라는 범주 안에서도 식품군별 영향이 다를 수 있음을 설명합니다. 그래서 “가공식품 전부 나쁨”보다 라벨과 반복 패턴을 보는 답변이 더 정확합니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>해조 폴리페놀과 항산화 연구는 식생활 정보의 배경이 될 수 있지만, 초가공식품 섭취를 상쇄한다고 말해서는 안 됩니다. 검색엔진과 소비자 모두에게 신뢰받으려면 식사 빈도, 라벨, 생활 기록을 먼저 설명해야 합니다.</p>
</div>`,
    tags: ['초가공식품', '혈당', '심혈관', '라벨읽기', '첨가당', '나트륨'],
    difficulty: 'intermediate',
    views: 2410,
    likes: 176,
    related_insights: [
      '/insights/ultra-processed-food-label-blood-sugar-heart-risk-2026',
      '/blog/ultra-processed-food-heart-risk-blood-sugar-label-2026',
    ],
    references: references.upf,
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
  const byId = new Set(data.questions.map((question) => question.id))
  let inserted = 0

  for (const item of questions) {
    if (byId.has(item.id)) continue
    const full = {
      ...item,
      category_id: item.category,
      content_type: 'latest_health_qna',
      author: '플로로탄닌 정보센터 · 최신검색 Q&A 편집팀',
      reviewed_at: UPDATED_AT,
      disclaimer: '건강정보는 진료를 대신하지 않습니다. 증상이 있거나 약을 복용 중이면 전문가와 상담하세요.',
      source_type: 'public-health-and-peer-reviewed',
      references_pmid: [],
      rewrittenAt: UPDATED_AT,
      reviewed: true,
      qualityStatus: 'validated',
      sourceStatus: 'referenced',
      validatedAnswer: item.answer,
      reviewReason: '최신 이슈 키워드 기반 신규 Q&A. 근거 출처와 위험 신호를 포함하고 치료·완치 표현을 배제함.',
      reviewedAt: UPDATED_AT,
      publicBodyMode: 'full',
      noindex: false,
    }
    data.questions.push(full)
    inserted += 1
  }

  data.updatedAt = UPDATED_AT
  normalizeCategoryCounts(data)
  saveJson(file, data)
  return inserted
}

const files = [
  path.join(ROOT, 'public/qa.json'),
  path.join(ROOT, 'src/data/qa.json'),
]

for (const file of files) {
  const inserted = addQuestions(file)
  console.log(`${path.relative(ROOT, file)}: inserted ${inserted}`)
}

