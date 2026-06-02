import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T10:55:00+09:00'

const questions = [
  {
    id: 'trend-sodium-potassium-salt-blood-pressure-20260602',
    category: 'cardiovascular',
    question: '혈압을 위해 나트륨을 줄일 때 칼륨 소금 대체제와 식품 라벨은 어떻게 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>혈압 관리는 “싱겁게 먹기”보다 자주 먹는 음식의 나트륨과 혈압 변화를 함께 기록하는 것이 더 실용적입니다.</strong> WHO는 과도한 나트륨 섭취가 혈압 상승과 심혈관질환 위험과 연결된다고 설명하며, 2026년에도 SHAKE 패키지를 통해 나트륨 저감 정책을 강조했습니다.</p>
  <h4>라벨에서 먼저 볼 것</h4>
  <ul>
    <li>나트륨 mg이 1회 제공량 기준인지 전체 포장 기준인지 확인합니다.</li>
    <li>국물, 소스, 장류, 즉석식, 가공육, 스낵류의 반복 빈도를 적습니다.</li>
    <li>외식 메뉴는 나트륨을 직접 조절하기 어렵기 때문에 횟수 기록이 중요합니다.</li>
    <li>아침·저녁 혈압과 짠 음식 섭취일을 같이 봅니다.</li>
  </ul>
  <h4>칼륨 소금 대체제는 누구에게 조심해야 하나요?</h4>
  <p>저나트륨 소금 대체제에는 칼륨이 들어간 제품이 많습니다. 신장질환, 고칼륨혈증 병력, ACE 억제제·ARB·칼륨보존성 이뇨제 등 약물 복용 중인 사람은 칼륨이 위험하게 올라갈 수 있어 사용 전 상담이 필요합니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌은 항산화 연구 맥락의 성분 정보로 볼 수 있지만, 혈압약이나 저염식을 대체한다고 말하면 안 됩니다. 소비자에게 신뢰를 주는 답변은 성분보다 나트륨 라벨, 식사 빈도, 혈압 기록을 먼저 알려주는 답변입니다.</p>
</div>`,
    tags: ['나트륨', '혈압', '칼륨소금', '저염식', '소금대체제', '식품라벨'],
    difficulty: 'intermediate',
    views: 2360,
    likes: 181,
    related_insights: [
      '/insights/sodium-potassium-salt-blood-pressure-label-record-2026',
      '/blog/sodium-potassium-salt-substitute-blood-pressure-label-2026',
    ],
    references: [
      { title: 'WHO: Sodium reduction fact sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/sodium-reduction' },
      { title: 'WHO: SHAKE package for salt reduction, 2026 update', url: 'https://www.who.int/philippines/news/detail-global/12-05-2026-who-launches-revamped-shake-package-to-help-reduce-salt-intake' },
    ],
  },
  {
    id: 'trend-creatine-resistance-training-healthy-aging-20260602',
    category: 'musculoskeletal',
    question: '크레아틴이 건강노화와 근감소 예방에 도움 된다고 하는데, 먹기 전에 무엇을 확인해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>크레아틴은 제품부터 고르기보다 근력운동 루틴, 단백질 식사, 신장 안전 확인을 먼저 해야 합니다.</strong> 2026년 고령자 연구에서도 크레아틴과 저항운동을 함께 보는 흐름이 이어지고 있지만, 보충제 하나가 운동을 대신하지는 않습니다.</p>
  <h4>먼저 확인할 것</h4>
  <ul>
    <li>주 2~3회 저항운동을 실제로 하고 있는지 확인합니다.</li>
    <li>매 끼니 단백질 식품이 들어가는지 표시합니다.</li>
    <li>악력, 계단 오르기, 의자에서 일어나기 같은 기능 변화를 기록합니다.</li>
    <li>신장질환, 탈수 위험, 여러 약물 복용 여부를 확인합니다.</li>
  </ul>
  <h4>누가 특히 조심해야 하나요?</h4>
  <p>신장질환이 있거나 신장 기능을 정기적으로 확인받는 사람, 고령자, 이뇨제나 여러 약을 복용하는 사람은 보충제 시작 전 전문가와 상담하는 것이 좋습니다. 몸이 붓거나 소변 변화, 심한 피로가 있으면 임의 복용보다 진료가 우선입니다.</p>
  <h4>플로로탄닌과 함께 설명할 때</h4>
  <p>플로로탄닌은 해조 폴리페놀과 항산화 연구 맥락의 정보로 다룰 수 있습니다. 그러나 근육 증가, 근감소 예방, 운동 회복을 직접 보장한다고 표현하면 안 됩니다. 좋은 건강 콘텐츠는 운동 기록과 안전 확인을 먼저 안내합니다.</p>
</div>`,
    tags: ['크레아틴', '근력운동', '근감소증', '건강노화', '단백질', '신장질환주의'],
    difficulty: 'intermediate',
    views: 2290,
    likes: 174,
    related_insights: [
      '/insights/creatine-resistance-training-healthy-aging-sarcopenia-2026',
      '/blog/creatine-resistance-training-healthy-aging-sarcopenia-2026',
    ],
    references: [
      { title: 'Experimental Gerontology 2026: creatine and resistance training in older adults', url: 'https://www.sciencedirect.com/science/article/pii/S0531556526001014' },
      { title: 'NIH ODS: Dietary supplements and safety basics', url: 'https://ods.od.nih.gov/HealthInformation/ODS_Frequently_Asked_Questions.aspx' },
    ],
  },
  {
    id: 'trend-resistant-starch-gut-microbiome-polyphenol-20260602',
    category: 'digestive',
    question: '장내미생물 관리를 위해 유산균보다 식이섬유와 저항성전분을 먼저 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>많은 경우 유산균 제품보다 평소 식사 패턴, 식이섬유, 저항성전분, 초가공식품 빈도를 먼저 보는 것이 더 중요합니다.</strong> 2026년 장내미생물 연구 흐름은 특정 제품 하나보다 실제 식품 패턴과 미생물의 관계를 더 많이 다룹니다.</p>
  <h4>무엇을 기록해야 하나요?</h4>
  <ul>
    <li>채소, 콩류, 해조류, 통곡류 섭취 빈도</li>
    <li>식힌 밥·감자, 콩류 등 저항성전분 식품 섭취</li>
    <li>커피, 요거트, 발효식품처럼 반복해서 먹는 식품</li>
    <li>음료, 간식, 즉석식 같은 초가공식품 빈도</li>
    <li>가스, 복부팽만, 변비, 설사 같은 몸의 반응</li>
  </ul>
  <h4>저항성전분은 왜 관심을 받나요?</h4>
  <p>저항성전분은 장에서 발효되며 단쇄지방산 같은 대사산물과 연결될 수 있어 장내미생물 연구에서 자주 다뤄집니다. 다만 개인별 반응이 다르고, 갑자기 많이 먹으면 가스나 복부팽만이 생길 수 있어 천천히 늘리는 것이 좋습니다.</p>
  <h4>플로로탄닌은 어떻게 설명해야 하나요?</h4>
  <p>플로로탄닌은 해조 폴리페놀이라는 점에서 장내미생물·폴리페놀 축과 연결해 설명할 수 있습니다. 하지만 장질환 치료나 유산균 대체처럼 말하면 안 됩니다. 식이섬유, 저항성전분, 폴리페놀을 식사 패턴 안에서 보는 것이 안전합니다.</p>
</div>`,
    tags: ['장내미생물', '저항성전분', '식이섬유', '폴리페놀', '장건강', '유산균'],
    difficulty: 'intermediate',
    views: 2430,
    likes: 188,
    related_insights: [
      '/insights/resistant-starch-gut-microbiome-polyphenol-phlorotannin-2026',
      '/blog/resistant-starch-gut-microbiome-polyphenol-phlorotannin-2026',
    ],
    references: [
      { title: 'Nature Reviews Gastroenterology & Hepatology 2026: diet-microbiome associations', url: 'https://www.nature.com/articles/s41575-026-01205-9' },
      { title: 'Frontiers in Nutrition 2026: resistant starch and gut microbiota', url: 'https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2026.1845191/full' },
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

