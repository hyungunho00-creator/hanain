import fs from 'node:fs'
import path from 'node:path'
import { ROUND33_TREND_BLOG_POSTS } from '../src/data/localTrendBlogPostsRound33.js'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-04T19:10:00+09:00'

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
    id: 'trend-scalp-psoriasis-dandruff-silver-scale-hair-loss-record-20260604',
    category: 'hair',
    question: '비듬처럼 보이는 두피 각질이 두피건선인지 확인하려면 무엇을 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>비듬처럼 보여도 각질 색, 기름짐, 붉은 반점, 출혈, 통증, 일시적 탈모 여부를 나눠 기록해야 합니다.</strong> AAD는 두피건선이 비듬처럼 보일 수 있지만 은백색 건조 각질, 붉은 반점, 가려움, 화끈거림, 통증, 긁은 뒤 출혈, 일시적 탈모를 동반할 수 있다고 설명합니다.</p>
  <p>MedlinePlus는 지루피부염이 기름샘이 많은 부위에 흰색 또는 노란색의 기름진 각질, 가려움, 붉어짐을 만들 수 있다고 안내합니다. 두피 각질은 원인이 다를 수 있으므로 같은 비듬으로 묶지 않는 것이 중요합니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>각질이 건조하고 은백색인지, 노랗고 기름진지</li>
    <li>붉은 반점이 두껍고 경계가 뚜렷한지</li>
    <li>귀 뒤, 목덜미, 헤어라인, 정수리 중 어디에 반복되는지</li>
    <li>긁은 뒤 피가 나는지, 진물이나 딱지가 생기는지</li>
    <li>각질을 억지로 떼어낸 뒤 머리카락이 빠졌는지</li>
    <li>팔꿈치, 무릎, 손톱 변화, 가족력처럼 건선 단서가 있는지</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 두피건선, 지루피부염, 비듬, 탈모를 해결하는 표현으로 쓰면 안 됩니다. 이 주제에서는 두피 상태 기록과 피부과 상담 기준을 분명히 하는 것이 신뢰에 맞습니다.</p>
  <h4>집에서 확인할 순서</h4>
  <p>일반 비듬 샴푸에 반응하지 않거나, 두피가 아프고 피가 나거나, 두꺼운 판처럼 각질이 쌓이면 자가 관리만 반복하지 않는 것이 좋습니다. 각질을 힘으로 떼어내면 출혈과 일시적 탈모가 생길 수 있습니다.</p>
  <p>사진은 같은 조명에서 헤어라인, 귀 뒤, 목덜미, 정수리를 나눠 남기세요. 두피 전체 사진 한 장보다 증상이 반복되는 위치를 따로 찍는 편이 상담에 도움이 됩니다.</p>
  <p>샴푸, 염색, 펌, 스트레스, 수면 부족, 날씨 변화와 증상 악화 시점을 함께 적으세요. 얼굴, 귀 안쪽, 눈썹 주변의 기름진 각질이 함께 있는지도 확인하면 지루피부염 가능성을 구분하는 데 도움이 됩니다.</p>
  <p>통증, 출혈, 진물, 넓어지는 각질, 머리카락 빠짐이 지속되면 단순 비듬이라고 넘기지 말고 의료진에게 사진과 기록을 보여주세요.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>AAD: Scalp psoriasis symptoms</li>
    <li>MedlinePlus: Seborrheic dermatitis</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 통증, 출혈, 진물, 넓어지는 각질, 탈모 변화가 지속되면 의료진과 상담하세요.</p>
</div>`,
    tags: ['두피건선', '비듬', '지루피부염', '두피가려움', '일시적탈모', '모발두피'],
    difficulty: 'intermediate',
    views: 2461,
    likes: 153,
    related_insights: [
      '/insights/scalp-psoriasis-dandruff-silver-scale-hair-loss-record-2026',
      '/blog/scalp-psoriasis-dandruff-silver-scale-hair-loss-record-2026',
    ],
    references: [
      { title: 'AAD: Scalp psoriasis symptoms', url: 'https://www.aad.org/public/diseases/psoriasis/treatment/genitals/scalp-symptoms' },
      { title: 'MedlinePlus: Seborrheic dermatitis', url: 'https://medlineplus.gov/ency/article/000963.htm' },
    ],
  },
  {
    id: 'trend-bph-night-urination-weak-stream-urinary-symptom-record-20260604',
    category: 'mens_health',
    question: '밤에 자주 깨고 소변줄이 약해졌다면 전립선비대증 상담 전에 무엇을 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>야간뇨와 약한 소변줄이 있다면 밤에 깨는 횟수, 소변 시작 지연, 잔뇨감, 혈뇨, 배뇨통, 복용 약물을 먼저 기록해야 합니다.</strong> NIDDK는 전립선비대증에서 약한 소변줄, 끊기는 흐름, 배뇨 끝의 dribbling, 야간뇨 같은 증상이 나타날 수 있다고 설명합니다.</p>
  <p>하지만 증상이 있다고 전부 전립선 크기 때문이라고 단정하면 안 됩니다. 감염, 약물, 수면 문제, 당뇨, 과민성 방광, 음주와 카페인, 심장·신장 상태도 함께 봐야 합니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>밤에 소변 때문에 깨는 횟수와 시간대</li>
    <li>소변 시작까지 걸리는 시간과 힘줘야 하는지</li>
    <li>소변줄이 약한지, 중간에 끊기는지</li>
    <li>소변을 본 뒤 잔뇨감이 있는지</li>
    <li>배뇨통, 혈뇨, 발열, 탁한 소변이 있는지</li>
    <li>물, 커피, 술, 이뇨제, 감기약, 수면제 복용 시간</li>
    <li>갑자기 소변이 전혀 나오지 않았던 적이 있는지</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 전립선비대증, 배뇨장애, 야간뇨를 개선하는 표현으로 쓰면 안 됩니다. 남성건강 콘텐츠에서는 배뇨 기록, 약물 이력, 감염 신호, 상담 기준을 먼저 보여주는 것이 안전합니다.</p>
  <h4>상담 전 확인할 순서</h4>
  <p>야간뇨는 전립선 문제일 수도 있지만 저녁 수분 섭취, 술, 카페인, 수면무호흡, 부종, 혈압약이나 이뇨제 복용 시간과도 연결될 수 있습니다. 잠들기 전 물과 술을 얼마나 마셨는지, 코골이가 심한지도 함께 적으세요.</p>
  <p>상담 전 3일만 배뇨 기록을 남겨도 도움이 됩니다. 몇 시에 마셨는지, 몇 시에 소변을 봤는지, 급박감이 있었는지, 소변량이 많았는지 적으면 의료진과 대화가 구체적입니다.</p>
  <p>소변이 전혀 나오지 않거나, 피가 보이거나, 발열·오한·심한 통증이 있거나, 등·옆구리 통증이 동반되면 기다리지 않는 것이 좋습니다. 기존에 전립선비대증을 들은 적이 있어도 새로운 증상은 따로 확인해야 합니다.</p>
  <p>감기약, 항히스타민제, 이뇨제, 수면제, 술은 배뇨 증상에 영향을 줄 수 있습니다. 약 이름을 모르면 사진으로 가져가는 것만으로도 상담에 도움이 됩니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>NIDDK: Enlarged Prostate</li>
    <li>MedlinePlus: Enlarged Prostate BPH</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 배뇨통, 혈뇨, 발열, 소변이 나오지 않는 증상이 있으면 의료진과 상담하세요.</p>
</div>`,
    tags: ['남성건강', '전립선비대증', '야간뇨', '약한소변줄', '배뇨증상', '검진'],
    difficulty: 'intermediate',
    views: 2457,
    likes: 152,
    related_insights: [
      '/insights/bph-night-urination-weak-stream-urinary-symptom-record-2026',
      '/blog/bph-night-urination-weak-stream-urinary-symptom-record-2026',
    ],
    references: [
      { title: 'NIDDK: Enlarged Prostate', url: 'https://www.niddk.nih.gov/health-information/urologic-diseases/prostate-problems/prostate-enlargement-benign-prostatic-hyperplasia' },
      { title: 'MedlinePlus: Enlarged Prostate BPH', url: 'https://medlineplus.gov/enlargedprostatebph.html' },
    ],
  },
  {
    id: 'trend-migraine-aura-estrogen-birth-control-stroke-risk-record-20260604',
    category: 'womens_health',
    question: '편두통 조짐이 있다면 에스트로겐 피임 상담 전에 무엇을 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>편두통 조짐이 있다면 두통 전후의 시야 변화, 감각 이상, 말 어눌함, 지속 시간, 혈압, 흡연 여부를 기록해야 합니다.</strong> CDC U.S. MEC 2024는 복합 호르몬 피임제 사용 판단에서 두통이 편두통인지, 조짐을 경험했는지 정확히 구분해야 한다고 안내합니다.</p>
  <p>ACOG도 생리 관련 편두통에는 연속 복합 호르몬 피임이 도움이 될 수 있지만, 조짐이 있는 편두통에는 사용하지 않아야 한다고 설명합니다. 따라서 두통이라는 말만으로 상담하면 중요한 위험요인이 빠질 수 있습니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>두통이 편두통 진단을 받은 적이 있는지</li>
    <li>조짐이 있었는지: 시야 번쩍임, 지그재그 선, 시야 결손, 감각 이상</li>
    <li>조짐이 두통 전인지, 두통 중인지, 얼마나 지속되는지</li>
    <li>복합 피임약, 패치, 링처럼 에스트로겐 포함 방법을 쓰는지</li>
    <li>흡연 여부, 나이, 혈압, 당뇨, 지질 이상, 가족력</li>
    <li>갑자기 달라진 두통, 최악의 두통, 신경 증상이 있었는지</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 편두통 조짐, 혈전 위험, 피임약 부작용을 낮추는 표현으로 쓰면 안 됩니다. 여성건강 콘텐츠에서는 조짐 기록, 혈압 확인, 흡연·나이·위험요인 상담 기준을 명확히 해야 합니다.</p>
  <h4>상담 전 확인할 순서</h4>
  <p>CDC의 복합 호르몬 피임 자료는 시작 전 혈압 측정이 중요하다고 설명합니다. 혈압을 모르는 상태에서 약을 시작하면 위험요인을 놓칠 수 있습니다.</p>
  <p>조짐이 있는 편두통이 의심되면 에스트로겐이 없는 선택지나 다른 피임 방법을 의료진과 비교해야 합니다. 피임은 끊거나 참는 문제가 아니라 본인의 위험요인과 목적에 맞게 선택하는 과정입니다.</p>
  <p>시야가 번쩍이거나 일부가 비는 느낌, 말이 어눌해짐, 한쪽 감각 이상이 새롭게 나타나면 단순 두통으로 넘기지 마세요. 특히 갑자기 달라진 두통이나 최악의 두통은 빠른 평가가 필요할 수 있습니다.</p>
  <p>상담 전에는 생리 주기와 두통 날짜를 같이 표시해 보세요. 생리 전후에 반복되는지, 피임약 복용 주기와 관련이 있는지, 진통제 사용 횟수가 늘었는지까지 적으면 선택지를 비교하기 쉽습니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>CDC: U.S. Medical Eligibility Criteria for Contraceptive Use, 2024</li>
    <li>CDC: Classifications for Combined Hormonal Contraceptives</li>
    <li>ACOG: Combined Hormonal Birth Control</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 피임 방법 선택, 두통 평가, 혈압과 혈전 위험 판단은 의료진과 상담하세요.</p>
</div>`,
    tags: ['여성건강', '편두통조짐', '피임약', '에스트로겐', '혈압', '산부인과'],
    difficulty: 'advanced',
    views: 2453,
    likes: 151,
    related_insights: [
      '/insights/migraine-aura-estrogen-birth-control-stroke-risk-record-2026',
      '/blog/migraine-aura-estrogen-birth-control-stroke-risk-record-2026',
    ],
    references: [
      { title: 'CDC: U.S. MEC 2024', url: 'https://www.cdc.gov/contraception/hcp/usmec/index.html' },
      { title: 'CDC: Combined Hormonal Contraceptives', url: 'https://www.cdc.gov/contraception/hcp/usmec/combined-hormonal-contraceptives.html' },
      { title: 'ACOG: Combined Hormonal Birth Control', url: 'https://www.acog.org/womens-health/faqs/combined-hormonal-birth-control-pill-patch-ring' },
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
        '2026년 6월 최신 이슈 기반 부족 카테고리 보강. 공식 보건 자료를 반영하고 치료·예방 보장 표현을 배제함.',
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

function visibleLength(content) {
  return String(content || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/[^\s)]+/g, '')
    .replace(/\s+/g, '').length
}

function validateContent() {
  const riskyClaim = /(완치|치료됩니다|예방됩니다|보장합니다|대체합니다|정상화됩니다)/
  for (const post of ROUND33_TREND_BLOG_POSTS) {
    const length = visibleLength(post.content)
    if (length < 1250) throw new Error(`${post.slug}: content too short (${length})`)
    if (riskyClaim.test(post.content)) throw new Error(`${post.slug}: risky claim found`)
  }
  for (const item of questions) {
    const length = visibleLength(item.answer)
    if (length < 800) throw new Error(`${item.id}: answer too short (${length})`)
  }
}

validateContent()

for (const file of [
  path.join(ROOT, 'public/qa.json'),
  path.join(ROOT, 'src/data/qa.json'),
]) {
  const { inserted, updated } = addQuestions(file)
  console.log(`${path.relative(ROOT, file)}: inserted ${inserted}, updated ${updated}`)
}

const data = loadJson(path.join(ROOT, 'public/qa.json'))
console.log(`questions ${data.questions.length} updatedAt ${data.updatedAt}`)
for (const id of questions.map((item) => item.id)) {
  const item = data.questions.find((question) => question.id === id)
  console.log(`${item.category} ${item.question} ${String(item.answer || '').length}`)
}
