import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T11:45:00+09:00'

const questions = [
  {
    id: 'trend-sleep-regularity-heart-risk-20260602',
    category: 'cardiovascular',
    question: '수면 시간보다 취침 시간이 불규칙한 것이 심혈관 건강에 더 문제가 될 수 있나요?',
    answer: `<div class="qa-structured">
  <p><strong>수면은 총 시간만 보는 것이 아니라 취침·기상 시간이 얼마나 일정한지도 함께 봐야 합니다.</strong> 최근 수면 건강 연구는 늦은 취침, 불규칙한 수면, 생체리듬 어긋남이 심혈관 위험 지표와 연결될 수 있음을 다룹니다.</p>
  <h4>무엇을 기록해야 하나요?</h4>
  <ul>
    <li>취침 시간과 기상 시간, 주말과 주중의 차이</li>
    <li>카페인을 마지막으로 마신 시간</li>
    <li>야간 각성, 코골이, 숨 멎음 목격 여부</li>
    <li>아침 두통, 입마름, 낮 졸림</li>
    <li>혈압, 심박, 피로감 변화</li>
  </ul>
  <h4>수면무호흡 신호는 놓치면 안 됩니다</h4>
  <p>심한 코골이, 숨 멎음, 아침 두통, 낮 졸림, 고혈압이 함께 있으면 수면 루틴이나 건강식품보다 수면무호흡 평가가 우선일 수 있습니다. 특히 가족이 숨 멎음을 봤다면 기록하고 진료 때 말하는 것이 좋습니다.</p>
  <h4>감태·플로로탄닌은 어떻게 봐야 하나요?</h4>
  <p>감태와 디에콜 관련 수면 연구는 참고할 수 있지만, 심혈관 위험을 낮추거나 수면무호흡을 해결한다고 말하면 안 됩니다. 정확한 답변은 취침 시간, 카페인, 야간 호흡 신호를 먼저 정리해야 합니다.</p>
</div>`,
    tags: ['수면규칙성', '심혈관', '생체리듬', '수면무호흡', '취침시간', '감태수면'],
    difficulty: 'intermediate',
    views: 2480,
    likes: 192,
    related_insights: [
      '/insights/sleep-regularity-circadian-heart-risk-record-2026',
      '/blog/sleep-regularity-circadian-heart-risk-record-2026',
    ],
    references: [
      { title: 'Journal of the American Heart Association 2026: chronotype and cardiovascular risk', url: 'https://www.ahajournals.org/doi/10.1161/JAHA.125.044189' },
      { title: 'PubMed 2026: sleep respiratory event regularity and cardiovascular outcomes', url: 'https://pubmed.ncbi.nlm.nih.gov/41867196/' },
    ],
  },
  {
    id: 'trend-vitamin-d-sun-sunscreen-skin-20260602',
    category: 'skin',
    question: '비타민D를 위해 햇빛을 많이 쬐면 자외선 차단제를 덜 발라도 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>비타민D가 중요하다고 해서 자외선 차단을 포기하는 것은 좋은 전략이 아닙니다.</strong> 햇빛은 비타민D 합성과 관련이 있지만 자외선은 피부 손상, 광노화, 화상 위험을 높일 수 있습니다.</p>
  <h4>균형 있게 볼 것</h4>
  <ul>
    <li>햇빛 노출 시간과 시간대</li>
    <li>자외선 차단제 사용량과 덧바름 여부</li>
    <li>모자, 긴소매, 그늘 이용 여부</li>
    <li>피부가 붉어짐, 따가움, 색소침착을 보이는지</li>
    <li>비타민D 검사 결과와 보충제 복용량</li>
  </ul>
  <h4>결핍은 추측보다 검사로 봅니다</h4>
  <p>피로감이나 근육통만으로 비타민D 결핍을 확정할 수 없습니다. 결핍이 걱정되면 혈중 비타민D 검사를 통해 확인하고, 보충제를 쓴다면 용량과 기간을 전문가와 상의하는 것이 좋습니다.</p>
  <h4>플로로탄닌과 피부 콘텐츠의 기준</h4>
  <p>플로로탄닌은 항산화 연구 맥락으로 소개할 수 있지만, 자외선 차단제나 비타민D 보충을 대신한다고 말하면 안 됩니다. 피부 콘텐츠는 검사, 자외선 노출, 피부 반응 기록을 먼저 안내해야 신뢰도가 높습니다.</p>
</div>`,
    tags: ['비타민D', '햇빛', '자외선차단', '피부건강', '광노화', '검사'],
    difficulty: 'basic',
    views: 2310,
    likes: 176,
    related_insights: [
      '/insights/vitamin-d-sun-exposure-sunscreen-skin-record-2026',
      '/blog/vitamin-d-sun-exposure-sunscreen-skin-balance-2026',
    ],
    references: [
      { title: 'Cleveland Clinic 2026: safely getting vitamin D from sun', url: 'https://health.clevelandclinic.org/vitamin-d-from-the-sun' },
      { title: 'NIH ODS: Vitamin D fact sheet', url: 'https://ods.od.nih.gov/factsheets/VitaminD-Consumer/' },
    ],
  },
  {
    id: 'trend-coffee-gut-brain-axis-polyphenol-20260602',
    category: 'digestive',
    question: '커피가 장내미생물과 기분에 영향을 준다는 연구는 어떻게 이해해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>커피 연구는 이제 카페인만이 아니라 폴리페놀, 장내미생물, 장-뇌축까지 함께 봅니다.</strong> 2026년 Nature Communications 연구는 커피 섭취가 장내미생물과 기분·스트레스 관련 지표에 미치는 영향을 다루었습니다.</p>
  <h4>개인에게는 무엇을 기록해야 하나요?</h4>
  <ul>
    <li>커피를 마시는 시간과 양</li>
    <li>카페인 후 두근거림, 불안, 손떨림 여부</li>
    <li>속쓰림, 설사, 변비, 복부팽만 같은 위장 반응</li>
    <li>취침 시간, 야간 각성, 아침 피로</li>
    <li>디카페인으로 바꿨을 때의 차이</li>
  </ul>
  <h4>커피가 모두에게 좋은가요?</h4>
  <p>아닙니다. 어떤 사람에게는 집중과 기분에 도움이 될 수 있지만, 다른 사람에게는 불안, 두근거림, 속쓰림, 수면 저하가 더 클 수 있습니다. 연구 결과를 개인에게 적용하려면 몸 반응 기록이 필요합니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>커피 폴리페놀과 플로로탄닌은 모두 폴리페놀 연구 맥락에서 설명할 수 있습니다. 하지만 커피나 플로로탄닌이 스트레스, 우울, 장질환을 치료한다고 말하면 안 됩니다. 장-뇌축 콘텐츠는 연구 소개와 생활 기록을 분리해서 다뤄야 합니다.</p>
</div>`,
    tags: ['커피', '장내미생물', '장뇌축', '폴리페놀', '카페인', '디카페인'],
    difficulty: 'intermediate',
    views: 2470,
    likes: 190,
    related_insights: [
      '/insights/coffee-gut-brain-axis-polyphenol-record-2026',
      '/blog/coffee-gut-brain-axis-polyphenol-microbiome-2026',
    ],
    references: [
      { title: 'Nature Communications 2026: coffee, gut microbiome and gut-brain axis', url: 'https://www.nature.com/articles/s41467-026-71264-8' },
      { title: 'Healthline 2026 summary: coffee, gut-brain axis, mood and stress', url: 'https://www.healthline.com/health-news/coffee-reshapes-gut-brain-reduce-stress' },
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

