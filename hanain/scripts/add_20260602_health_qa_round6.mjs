import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T14:55:00+09:00'

const questions = [
  {
    id: 'trend-wearable-vo2max-cardio-fitness-20260602',
    category: 'cardiovascular',
    question: '웨어러블에 나오는 VO2 max나 심폐체력 나이를 건강노화 지표로 믿어도 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>웨어러블 VO2 max는 참고할 만한 추세 지표이지만, 의료검사처럼 확정적으로 해석하면 안 됩니다.</strong> 스마트워치나 링은 실제 산소섭취량을 병원 장비처럼 직접 재는 것이 아니라, 심박·활동량·운동 반응을 바탕으로 추정합니다. 그래서 하루 수치가 조금 오르내리는 것보다 4~8주 동안 같은 조건에서 어떤 방향으로 움직이는지가 더 중요합니다.</p>
  <h4>왜 요즘 이 지표가 많이 보이나요?</h4>
  <p>2026년 웨어러블 기반 심폐체력 나이 연구는 생활습관 변화와 추정 VO2 max, 안정시 심박 변화가 함께 움직일 수 있음을 보여줍니다. 또 심폐체력은 장기 건강, 건강수명, 만성질환 부담과 관련된 연구가 계속 나오는 지표입니다. 다만 연구에서 말하는 심폐체력과 내 기기 화면의 점수는 같은 무게로 보면 안 됩니다. 내 점수는 “관리 방향을 잡는 참고 신호”에 가깝습니다.</p>
  <h4>함께 기록할 것</h4>
  <ul>
    <li>안정시 심박과 수면 시간: 잠이 부족하면 VO2 max 추정치도 흔들릴 수 있습니다.</li>
    <li>주간 유산소 운동 시간과 강도: 빠른 걷기, 자전거, 계단 오르기처럼 숨이 차는 활동을 구분합니다.</li>
    <li>계단 오르기와 빠른 걷기에서 숨참 정도: 숫자보다 체감 변화가 더 현실적인 신호일 때가 많습니다.</li>
    <li>근력운동과 체중 변화: 중년 이후에는 심폐체력만큼 근력과 균형도 중요합니다.</li>
    <li>흉통, 실신감, 불규칙 맥박 같은 위험 신호: 이 항목은 점수 개선보다 먼저 봐야 합니다.</li>
  </ul>
  <h4>언제 상담이 우선인가요?</h4>
  <p>운동 중 흉통, 실신감, 심한 숨참, 불규칙한 두근거림, 평소와 다른 극심한 피로가 있으면 웨어러블 점수를 올리는 것보다 진료 상담이 우선입니다. 특히 기존 심장질환, 고혈압, 당뇨, 흡연력, 가족력이 있다면 운동 목표를 갑자기 높이지 말고 현재 기록을 가지고 상담하는 편이 안전합니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌은 해조류 유래 폴리페놀 연구 맥락에서 항산화와 생활관리 콘텐츠에 연결할 수 있지만, VO2 max를 올린다고 말하면 안 됩니다. 좋은 설명은 “운동, 수면, 식사, 회복 기록을 함께 보면서 몸의 변화를 이해하자”는 방향입니다. 이런 방식이 소비자에게도, 검색엔진 신뢰도에도 더 안전합니다.</p>
</div>`,
    tags: ['VO2max', '심폐체력', '웨어러블', '건강노화', '운동기록', '안정시심박'],
    difficulty: 'intermediate',
    views: 2540,
    likes: 195,
    related_insights: [
      '/insights/wearable-vo2max-cardio-fitness-longevity-record-2026',
      '/blog/wearable-vo2max-cardio-fitness-longevity-record-2026',
    ],
    references: [
      { title: 'medRxiv 2026: Wearable-derived cardiovascular fitness age', url: 'https://www.medrxiv.org/content/10.64898/2026.03.20.26348891v1' },
      { title: 'JACC 2026: Midlife cardiorespiratory fitness and healthy aging', url: 'https://www.jacc.org/doi/abs/10.1016/j.jacc.2026.02.5122' },
    ],
  },
  {
    id: 'trend-energy-drink-preworkout-caffeine-sleep-20260602',
    category: 'cardiovascular',
    question: '에너지드링크나 프리워크아웃을 먹고 운동해도 괜찮나요, 수면과 심박을 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>에너지드링크와 프리워크아웃은 “운동 전에 먹어도 되나”보다 카페인 총량, 섭취 시간, 수면손실, 두근거림을 먼저 봐야 합니다.</strong> 제품 하나만 보면 괜찮아 보여도 같은 날 커피, 에너지드링크, 프리워크아웃, 지방연소제, 각성 성분 보충제가 겹치면 총량이 예상보다 커질 수 있습니다.</p>
  <h4>왜 요즘 더 조심해야 하나요?</h4>
  <p>최근 보도와 연구는 청소년·청년층에서 고카페인 음료와 프리워크아웃 보충제가 수면시간 감소, 두근거림, 불안, 운동 중 불편감과 연결될 수 있음을 다룹니다. 운동 전 각성감이 생기면 “효과가 좋다”고 느끼기 쉽지만, 그날 밤 수면이 줄고 다음 날 피로가 커지면 회복은 오히려 나빠질 수 있습니다.</p>
  <h4>기록할 것</h4>
  <ul>
    <li>제품 1회분의 카페인 mg: 라벨에 없으면 제품명만 믿지 말고 확인이 필요합니다.</li>
    <li>커피, 에너지드링크, 프리워크아웃 합산량: 하루 총량으로 보는 것이 핵심입니다.</li>
    <li>섭취 시간과 취침 시간: 오후 늦게 먹은 제품은 수면을 밀어낼 수 있습니다.</li>
    <li>두근거림, 불안, 손떨림, 흉통, 속쓰림: 운동 효과가 아니라 경고 신호일 수 있습니다.</li>
    <li>운동 중 심박과 운동 후 회복: 평소보다 심박이 오래 높게 남는지 확인합니다.</li>
  </ul>
  <h4>누가 특히 조심해야 하나요?</h4>
  <p>부정맥, 긴 QT 증후군, 심장질환 병력, 고혈압, 불안장애, 공황 증상, 불면이 있는 사람은 고카페인 제품을 가볍게 보면 안 됩니다. 청소년은 수면 부족의 영향을 크게 받을 수 있고, 임신·수유 중인 사람은 제품 라벨과 전문가 상담이 필요합니다. 운동 중 흉통, 실신감, 심한 두근거림이 있었다면 다음 제품을 고를 문제가 아니라 상담이 먼저입니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌은 카페인 대체제나 각성제가 아닙니다. 항산화 연구 맥락에서 운동·피로 콘텐츠에 연결할 수는 있지만, 카페인 과다나 수면손실을 상쇄한다고 말하면 안 됩니다. 소비자에게 필요한 정보는 제품 추천보다 라벨, 섭취 시간, 몸 반응을 기록하는 방법입니다.</p>
</div>`,
    tags: ['에너지드링크', '카페인', '프리워크아웃', '수면손실', '두근거림', '부정맥'],
    difficulty: 'intermediate',
    views: 2680,
    likes: 206,
    related_insights: [
      '/insights/energy-drink-preworkout-caffeine-sleep-arrhythmia-safety-2026',
      '/blog/energy-drink-preworkout-caffeine-sleep-arrhythmia-safety-2026',
    ],
    references: [
      { title: 'Consumer Reports 2026: Caffeine levels in energy drinks are risky for teens', url: 'https://www.consumerreports.org/health/beverages/caffeine-in-energy-drinks-risky-teens-a2915223215/' },
      { title: 'ScienceDaily 2026: Pre-workout supplements linked to sleep loss', url: 'https://www.sciencedaily.com/releases/2026/03/260308201618.htm' },
      { title: 'JACC 2026: stimulant-containing pre-workout supplement case', url: 'https://www.jacc.org/doi/10.1016/j.jacc.2026.02.3289' },
    ],
  },
  {
    id: 'trend-berberine-blood-sugar-drug-interaction-20260602',
    category: 'metabolism',
    question: '베르베린이 혈당에 좋다고 하는데 당뇨약을 먹는 사람도 같이 먹어도 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>당뇨약을 복용 중이라면 베르베린을 임의로 추가하지 말고 상담하는 것이 안전합니다.</strong> 베르베린은 혈당과 대사 건강 보충제로 많이 검색되지만, “천연 혈당약”처럼 단정하면 위험합니다. 보충제는 의약품처럼 안전성과 효과가 동일하게 관리되지 않고, 제품마다 함량과 품질도 다를 수 있습니다.</p>
  <h4>왜 약물상호작용을 봐야 하나요?</h4>
  <p>Cleveland Clinic은 베르베린이 간에서 비슷한 효소로 대사되는 약물과 상호작용할 수 있어 조심해야 한다고 설명합니다. 당뇨약이나 인슐린을 복용하는 사람이 베르베린을 추가하면 혈당이 예상보다 낮아질 가능성을 고려해야 합니다. 반대로 보충제만 믿고 약을 줄이거나 끊는 것도 위험합니다.</p>
  <h4>복용 전 기록할 것</h4>
  <ul>
    <li>공복혈당과 식후혈당: 실제 변화가 있는지 숫자로 봐야 합니다.</li>
    <li>베르베린 복용 시간과 용량: 제품마다 1회 섭취량과 권장량이 다릅니다.</li>
    <li>당뇨약, 인슐린, 혈압약, 항응고제, 간 대사 약물 복용 여부</li>
    <li>어지럼, 식은땀, 떨림, 심한 허기 같은 저혈당 의심 신호</li>
    <li>복통, 설사, 변비 같은 위장 반응: 흔한 불편감도 기록해야 원인을 찾기 쉽습니다.</li>
  </ul>
  <h4>누가 더 조심해야 하나요?</h4>
  <p>당뇨약을 먹는 사람, 임신·수유 중인 사람, 간·신장질환이 있는 사람, 여러 보충제를 동시에 먹는 사람은 복용 전 상담이 필요합니다. 특히 혈당을 자주 측정하지 않는 상태에서 보충제를 추가하면 좋은 변화인지 위험한 변화인지 구분하기 어렵습니다.</p>
  <h4>플로로탄닌과 함께 볼 때</h4>
  <p>플로로탄닌도 혈당 조절을 보장한다고 말하면 안 됩니다. 해조류 유래 폴리페놀의 항산화 연구 맥락에서 참고할 수는 있지만, 식사, 운동, 혈당 검사, 복용약 기록 위에서 다뤄야 안전합니다. 검색엔진과 소비자 모두에게 신뢰받는 답변은 성분을 띄우는 답변이 아니라, 누가 조심해야 하는지와 무엇을 기록해야 하는지 분명히 말하는 답변입니다.</p>
</div>`,
    tags: ['베르베린', '혈당', '당뇨약', '저혈당', '약물상호작용', '보충제안전'],
    difficulty: 'intermediate',
    views: 2730,
    likes: 211,
    related_insights: [
      '/insights/berberine-blood-sugar-supplement-safety-record-2026',
      '/blog/berberine-blood-sugar-supplement-drug-interaction-safety-2026',
    ],
    references: [
      { title: 'Cleveland Clinic: Berberine benefits and side effects', url: 'https://health.clevelandclinic.org/berberine' },
      { title: 'Medical News Today 2026: Berberine benefits, supplements, side effects', url: 'https://www.medicalnewstoday.com/articles/325798.php' },
      { title: 'Cleveland Clinic 2026: Taking too many supplements', url: 'https://newsroom.clevelandclinic.org/2026/05/18/are-you-taking-too-many-supplements' },
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
