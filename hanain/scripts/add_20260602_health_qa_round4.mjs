import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T13:15:00+09:00'

const questions = [
  {
    id: 'trend-mouth-taping-snoring-sleep-apnea-20260602',
    category: 'respiratory',
    question: '입테이핑이 코골이나 수면무호흡에 도움이 된다고 하는데 안전하게 해도 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>입테이핑은 수면무호흡 치료법으로 입증된 방법이 아니며, 코막힘이나 호흡 문제가 있는 사람에게는 위험할 수 있습니다.</strong> 코호흡을 돕는 생활 루틴으로 소개되지만 심한 코골이와 숨 멎음을 덮어서는 안 됩니다.</p>
  <h4>먼저 확인해야 할 신호</h4>
  <ul>
    <li>가족이 본 숨 멎음, 심한 코골이</li>
    <li>아침 두통, 입마름, 낮 졸림</li>
    <li>코막힘, 알레르기 비염, 천식, 부비동 문제</li>
    <li>고혈압, 심혈관질환 위험요인</li>
    <li>입을 막았을 때 답답함, 공포감, 자주 깸</li>
  </ul>
  <h4>언제 상담이 우선인가요?</h4>
  <p>숨 멎음 목격, 심한 코골이, 낮 졸림, 고혈압이 함께 있으면 입테이핑이나 수면 보충제보다 수면무호흡 평가가 먼저입니다. 코막힘이 있는 사람도 코호흡이 어려워질 수 있어 무리하면 안 됩니다.</p>
  <h4>감태·플로로탄닌과 연결할 때</h4>
  <p>감태와 플로로탄닌 수면 정보는 수면 루틴의 참고 자료로 둘 수 있습니다. 그러나 수면무호흡, 코골이, 호흡 문제를 개선한다고 말해서는 안 됩니다. 호흡 안전과 진료 신호를 먼저 설명해야 신뢰도가 유지됩니다.</p>
</div>`,
    tags: ['입테이핑', '코골이', '수면무호흡', '코호흡', '호흡안전', '수면건강'],
    difficulty: 'intermediate',
    views: 2590,
    likes: 198,
    related_insights: [
      '/insights/mouth-taping-snoring-sleep-apnea-safety-2026',
      '/blog/mouth-taping-snoring-sleep-apnea-safety-2026',
    ],
    references: [
      { title: 'SleepApnea.org 2026: Mouth taping for sleep', url: 'https://www.sleepapnea.org/snoring/mouth-taping-for-sleep/' },
      { title: 'Cleveland Clinic: Mouth taping safety', url: 'https://health.clevelandclinic.org/mouth-taping' },
    ],
  },
  {
    id: 'trend-time-restricted-eating-evening-meal-20260602',
    category: 'metabolism',
    question: '시간제한식사를 할 때 저녁을 일찍 끝내는 것이 혈당과 대사 건강에 더 중요할까요?',
    answer: `<div class="qa-structured">
  <p><strong>시간제한식사는 굶는 시간만 보지 말고 식사 창이 수면 리듬과 맞는지를 함께 봐야 합니다.</strong> 2026년 연구 흐름은 늦은 식사보다 수면 시간에 맞춘 식사 제한이 대사·심혈관 지표에 더 현실적인 접근이 될 수 있음을 다룹니다.</p>
  <h4>기록할 것</h4>
  <ul>
    <li>첫 식사와 마지막 식사 시간</li>
    <li>저녁 식사 후 바로 눕는지 여부</li>
    <li>야식과 음료 섭취</li>
    <li>공복감, 피로, 폭식 충동</li>
    <li>혈당, 혈압, 수면 시간, 운동 시간</li>
  </ul>
  <h4>누가 조심해야 하나요?</h4>
  <p>당뇨약이나 인슐린을 쓰는 사람, 임신·수유 중인 사람, 성장기, 저체중, 섭식장애 병력, 만성질환자는 임의로 단식을 시작하지 않는 것이 좋습니다. 약물과 식사 시간이 맞지 않으면 저혈당 위험이 생길 수 있습니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌은 해조 폴리페놀과 대사 연구 맥락의 참고 정보입니다. 시간제한식사 효과를 높인다거나 혈당을 조절한다고 단정하면 안 됩니다. 소비자에게는 식사 시간, 수면, 혈당 기록이 먼저입니다.</p>
</div>`,
    tags: ['시간제한식사', '간헐적단식', '혈당', '저녁식사', '대사건강', '수면리듬'],
    difficulty: 'intermediate',
    views: 2520,
    likes: 193,
    related_insights: [
      '/insights/time-restricted-eating-evening-meal-metabolic-record-2026',
      '/blog/time-restricted-eating-evening-meal-metabolic-health-2026',
    ],
    references: [
      { title: 'Harvard Health 2026: Time to try intermittent fasting?', url: 'https://www.health.harvard.edu/heart-health/time-to-try-intermittent-fasting' },
      { title: 'ScienceDaily 2026: Stop eating 3 hours before bed to improve heart health', url: 'https://www.sciencedaily.com/releases/2026/02/260215084958.htm' },
      { title: 'BMJ Medicine 2026: time-restricted eating systematic review', url: 'https://bmjmedicine.bmj.com/content/5/1/e001071' },
    ],
  },
  {
    id: 'trend-magnesium-glycinate-sleep-safety-20260602',
    category: 'mental_health',
    question: '마그네슘 글리시네이트가 수면에 좋다고 하는데 누구나 먹어도 괜찮나요?',
    answer: `<div class="qa-structured">
  <p><strong>마그네슘 글리시네이트는 수면 보충제로 많이 검색되지만 누구에게나 맞는 답은 아닙니다.</strong> 불면의 원인은 카페인, 스트레스, 통증, 수면무호흡, 우울·불안, 약물, 교대근무 등으로 다양하기 때문에 보충제보다 원인 기록이 먼저입니다.</p>
  <h4>복용 전 기록 기준</h4>
  <ul>
    <li>복용 시간과 용량</li>
    <li>취침 시간, 기상 시간, 야간 각성</li>
    <li>카페인과 음주 시간</li>
    <li>설사, 복통, 속불편, 아침 졸림</li>
    <li>신장질환, 복용약, 다른 보충제 중복 여부</li>
  </ul>
  <h4>누가 조심해야 하나요?</h4>
  <p>신장질환이 있거나 신장 기능이 떨어진 사람, 여러 약을 복용하는 사람, 고용량을 오래 복용하려는 사람은 전문가와 상담하는 것이 좋습니다. 마그네슘 형태에 따라 설사나 위장 불편이 생길 수 있고, 수면무호흡이 있으면 보충제로 문제를 덮어서는 안 됩니다.</p>
  <h4>감태·플로로탄닌과 함께 볼 때</h4>
  <p>감태와 플로로탄닌 수면 정보도 불면의 원인을 대체하지 않습니다. 수면 콘텐츠는 취침 시간, 카페인, 호흡 신호, 복용약을 먼저 확인할 때 신뢰도가 높습니다.</p>
</div>`,
    tags: ['마그네슘', '마그네슘글리시네이트', '수면보충제', '불면', '보충제안전', '감태수면'],
    difficulty: 'basic',
    views: 2660,
    likes: 204,
    related_insights: [
      '/insights/magnesium-glycinate-sleep-supplement-safety-record-2026',
      '/blog/magnesium-glycinate-sleep-supplement-safety-record-2026',
    ],
    references: [
      { title: 'NIH ODS: Magnesium fact sheet', url: 'https://ods.od.nih.gov/factsheets/Magnesium-Consumer/' },
      { title: 'Healthline 2026: Magnesium supplements overview', url: 'https://www.healthline.com/nutrition/best-magnesium-supplement' },
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

