import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-03T00:15:00+09:00'

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
    id: 'trend-pickleball-overuse-achilles-wrist-injury-20260603',
    category: 'musculoskeletal',
    question: '피클볼을 하다가 손목이나 아킬레스가 아프면 어떤 부상 신호를 먼저 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>피클볼 통증은 손목 골절만 보지 말고 아킬레스, 무릎, 어깨까지 함께 기록해야 합니다.</strong> 코트가 작고 라켓이 가벼워도 피클볼은 급정지, 방향 전환, 낙상, 비틀어 치는 동작이 반복됩니다. AAOS는 피클볼 인기가 커지면서 골절과 부상 위험을 함께 언급했고, 최신 응급실 기반 연구들도 피클볼 관련 부상 증가를 보고합니다.</p>
  <p>상담 전에는 “어디가 아픈가”보다 “어떤 동작 뒤에 시작됐고 24시간 뒤에도 남는가”를 기록하는 것이 좋습니다. 손목을 짚고 넘어졌는데 엄지 쪽 통증이 계속되거나, 아킬레스 뒤쪽에 갑작스러운 통증과 절뚝거림이 있거나, 무릎이 붓고 잠기는 느낌이 있으면 다음 경기를 이어가기보다 진료 확인이 먼저입니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>운동 날짜, 총 게임 수, 쉬는 시간</li>
    <li>통증 시작 동작: 낙상, 급정지, 방향 전환, 오버헤드 스윙</li>
    <li>통증 부위: 손목 엄지 쪽, 아킬레스 뒤쪽, 무릎 안쪽, 어깨 앞쪽</li>
    <li>붓기, 멍, 열감, 절뚝거림, 손을 짚기 어려움</li>
    <li>운동 후 24시간 뒤 통증이 줄었는지 또는 더 심해졌는지</li>
  </ul>
  <h4>운동을 멈추고 확인해야 할 신호</h4>
  <p>손목 변형, 심한 붓기, 보행 장애, 아킬레스 뒤쪽의 갑작스러운 통증, 무릎 잠김, 어깨 힘 빠짐은 “쉬면 낫겠지”로 넘기기 어렵습니다. 특히 골다공증, 과거 골절, 항응고제 복용, 최근 운동 공백이 있으면 더 조심해야 합니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 피클볼 부상 치료나 회복 보장 성분처럼 설명하면 안 됩니다. 근골격 콘텐츠에서는 통증 기록, 운동량 조절, 진료 기준을 중심에 두고 해양 폴리페놀 연구는 배경 정보로만 제한하는 것이 안전합니다.</p>
</div>`,
    tags: ['피클볼', '손목골절', '아킬레스건', '무릎통증', '근골격건강', '운동부상'],
    difficulty: 'intermediate',
    views: 2579,
    likes: 181,
    related_insights: [
      '/insights/pickleball-overuse-achilles-wrist-injury-prevention-record-2026',
      '/blog/pickleball-overuse-achilles-wrist-injury-prevention-record-2026',
    ],
    references: [
      {
        title: 'AAOS: Reduce the Risk for Pickleball Injuries',
        url: 'https://www.aaos.org/aaos-home//newsroom/press-releases/experts-available-reduce-the-risk-for-pickleball-injuries/',
      },
      {
        title: 'PubMed: The Epidemiology of Pickleball Injuries Presenting to US Emergency Departments',
        url: 'https://pubmed.ncbi.nlm.nih.gov/40653665/',
      },
      {
        title: 'PubMed: Pickleball injury prevalence and prevention review',
        url: 'https://pubmed.ncbi.nlm.nih.gov/39079099/',
      },
    ],
  },
  {
    id: 'trend-teen-social-media-sleep-mental-health-boundary-20260603',
    category: 'mental_health',
    question: '청소년 SNS 사용은 하루 몇 시간보다 잠들기 전 사용을 먼저 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>네. 청소년 SNS 사용은 하루 총량보다 잠들기 전 90분, 알림 반응, 사용 뒤 기분 변화를 먼저 보는 것이 현실적입니다.</strong> HHS는 소셜미디어가 청소년에게 이익과 위험을 모두 줄 수 있으며 충분히 안전하다고 단정할 수 없다고 안내합니다. AAP도 가족 미디어 계획을 통해 수면, 식사, 운동, 가족 시간을 함께 조정하라고 권합니다.</p>
  <p>같은 2시간이라도 친구와 대화한 시간인지, 비교감을 키우는 짧은 영상만 본 시간인지, 침대에서 알림에 계속 반응한 시간인지에 따라 영향이 다릅니다. 그래서 “몇 시간까지 괜찮다”는 숫자보다 생활 기능이 흔들리는지 확인해야 합니다.</p>
  <h4>집에서 먼저 기록할 것</h4>
  <ul>
    <li>잠들기 전 90분 동안 보는 앱과 콘텐츠</li>
    <li>알림 때문에 침대에서 휴대폰을 다시 집는 횟수</li>
    <li>사용 뒤 외모 비교, 성적 비교, 관계 불안이 커지는지</li>
    <li>다음 날 피로, 지각, 집중력 저하</li>
    <li>휴대폰을 어디에서 충전하고 자는지</li>
  </ul>
  <h4>무조건 금지보다 경계선이 필요합니다</h4>
  <p>청소년에게 온라인은 친구 관계, 취미, 정보 탐색의 공간이기도 합니다. 처음부터 전면 금지로 가면 오래 지속되기 어렵습니다. 침대 밖 충전, 잠들기 전 알림 끄기, 식사 중 휴대폰 내려두기, 비교감을 심하게 만드는 계정 정리처럼 가족이 합의할 수 있는 경계선부터 시작하는 편이 좋습니다.</p>
  <h4>전문가 연결이 필요한 신호</h4>
  <p>자해 생각, 극심한 불안, 식사 문제, 학교생활 저하, 수면 붕괴가 있으면 생활습관 조언만으로 해결하려 해서는 안 됩니다. 보호자, 학교 상담, 정신건강 전문가 도움을 연결해야 하며 위기 상황은 즉시 응급 도움을 받아야 합니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 불안이나 수면 문제 해결 성분처럼 설명하면 안 됩니다. 정신건강 콘텐츠에서는 수면, 관계, 운동, 식사, 디지털 습관, 위기 신호를 나누어 안내해야 신뢰가 유지됩니다.</p>
</div>`,
    tags: ['청소년정신건강', 'SNS', '수면부족', '소셜미디어', '불안', '디지털습관'],
    difficulty: 'intermediate',
    views: 2571,
    likes: 179,
    related_insights: [
      '/insights/teen-social-media-sleep-mental-health-boundary-record-2026',
      '/blog/teen-social-media-sleep-mental-health-boundary-record-2026',
    ],
    references: [
      {
        title: 'HHS: Social Media and Youth Mental Health',
        url: 'https://www.hhs.gov/surgeongeneral/reports-and-publications/youth-mental-health/social-media/index.html',
      },
      {
        title: 'AAP: Center of Excellence on Social Media and Youth Mental Health',
        url: 'https://www.aap.org/socialmedia',
      },
      {
        title: 'Pew Research Center: Teens’ Experiences on TikTok, Instagram and Snapchat',
        url: 'https://www.pewresearch.org/internet/2026/04/15/teens-experiences-on-tiktok-instagram-and-snapchat/',
      },
    ],
  },
  {
    id: 'trend-glp1-compounded-dosing-error-gi-side-effect-20260603',
    category: 'digestive',
    question: 'GLP-1 복합조제 제품을 쓰는 사람이 구토나 복통이 있으면 무엇을 먼저 확인해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>제품명, 승인 제품 여부, 농도, 처방 용량, 실제 주사기 눈금, mg·mL·유닛 표기를 먼저 확인해야 합니다.</strong> FDA는 복합조제 세마글루타이드 주사 제품에서 용량 오류와 관련된 이상반응 보고를 안내했습니다. 일부는 의료적 처치나 입원이 필요했고, 오류는 환자가 잘못 측정하거나 의료진이 용량을 잘못 계산하는 과정에서 생길 수 있다고 설명했습니다.</p>
  <p>구역감은 GLP-1 계열 약물에서 자주 이야기되지만 모든 위장관 증상을 가볍게 넘기면 안 됩니다. 반복 구토, 심한 복통, 물을 마시기 어려움, 소변량 감소, 어지러움이나 실신은 진료 확인이 필요한 신호입니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>제품명과 승인 제품 또는 복합조제 제품 여부</li>
    <li>처방 용량의 mg, mL, 유닛 표기</li>
    <li>실제 주사한 날짜, 시간, 주사기 눈금</li>
    <li>구역, 구토, 복통, 설사, 변비, 어지러움</li>
    <li>물을 마실 수 있는지, 소변량이 줄었는지</li>
  </ul>
  <h4>바로 확인해야 할 신호</h4>
  <p>NIDDK는 위 배출 지연과 관련된 증상에서 심한 복통, 한 시간 이상 지속되는 구토, 극심한 약함이나 실신, 탈수 신호가 있으면 도움을 받아야 한다고 안내합니다. GLP-1 제품 사용 중 이런 신호가 있으면 스스로 용량을 조절하기보다 처방한 의료진에게 확인해야 합니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 GLP-1 대체 성분이나 위장관 부작용 해결책처럼 설명하면 안 됩니다. 이 주제에서는 약물과 건강기능식품 정보를 구분하고, 용량 단위와 이상반응 기록 기준을 알려주는 것이 핵심입니다.</p>
</div>`,
    tags: ['GLP-1', '세마글루타이드', '티르제파타이드', '복합조제', '위장관증상', '구토', '탈수'],
    difficulty: 'advanced',
    views: 2566,
    likes: 178,
    related_insights: [
      '/insights/glp1-compounded-dosing-error-gi-side-effect-record-2026',
      '/blog/glp1-compounded-dosing-error-gi-side-effect-record-2026',
    ],
    references: [
      {
        title: 'FDA: Dosing errors with compounded injectable semaglutide products',
        url: 'https://www.fda.gov/drugs/human-drug-compounding/fda-alerts-health-care-providers-compounders-and-patients-dosing-errors-associated-compounded',
      },
      {
        title: 'FDA: Concerns with unapproved GLP-1 drugs used for weight loss',
        url: 'https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss',
      },
      {
        title: 'NIDDK: Symptoms and causes of gastroparesis',
        url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/gastroparesis/symptoms-causes',
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
        '카테고리 순환 최신 보강. 공식기관 및 학술 근거를 반영하고 치료·예방 보장 표현을 배제함.',
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
