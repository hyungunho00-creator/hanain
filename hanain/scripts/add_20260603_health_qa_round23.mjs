import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-03T06:05:00+09:00'

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
    id: 'trend-knee-osteoarthritis-prp-conservative-care-record-20260603',
    category: 'musculoskeletal',
    question: '무릎 골관절염 PRP 주사를 상담하기 전에 어떤 기록을 준비해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>PRP 주사 상담 전에는 “재생치료” 광고보다 통증 위치, 영상검사, 보존치료 이력, 기존 주사 이력을 먼저 정리해야 합니다.</strong> AAPM&R은 2026년 무릎 골관절염 PRP 가이던스에서 보존치료에도 증상이 남는 경도에서 중등도 환자에게 PRP를 고려할 수 있다고 설명했습니다.</p>
  <p>다만 PRP는 준비 방법, 주입 횟수, 백혈구 포함 여부, 병원 프로토콜이 다양합니다. 같은 PRP라는 이름이어도 실제 내용이 다를 수 있습니다.</p>
  <h4>상담 전 기록할 것</h4>
  <ul>
    <li>통증 위치와 기간, 최근 3개월 변화</li>
    <li>X-ray, MRI, 초음파 결과와 골관절염 단계</li>
    <li>물리치료, 근력운동, 체중 변화, 보행 보조기 사용 여부</li>
    <li>스테로이드, 히알루론산, PRP 주사 이력</li>
    <li>항응고제, 당뇨 조절, 감염 여부</li>
  </ul>
  <h4>주의할 점</h4>
  <p>플로로탄닌을 관절 재생, 연골 회복, PRP 효과 상승 성분처럼 설명하면 안 됩니다. 근골격 콘텐츠는 통증 기록과 재활 기준을 먼저 안내해야 합니다.</p>
</div>`,
    tags: ['무릎골관절염', 'PRP', '관절주사', '보존치료', '운동치료', '근골격'],
    difficulty: 'advanced',
    views: 2612,
    likes: 186,
    related_insights: [
      '/insights/knee-osteoarthritis-prp-injection-conservative-care-record-2026',
      '/blog/knee-osteoarthritis-prp-injection-conservative-care-record-2026',
    ],
    references: [
      {
        title: 'AAPM&R: Guidance Statement on PRP for Knee Osteoarthritis',
        url: 'https://www.aapmr.org/members-publications/newsroom/member-news/member-news-details/2026/04/16/aapm-r-guidance-statement-on-prp-for-knee-osteoarthritis-released',
      },
      {
        title: 'AAOS: Platelet-Rich Plasma for Knee Osteoarthritis Technology Overview',
        url: 'https://www.aaos.org/globalassets/quality-and-practice-resources/biologics/technology-overview_prp-for-knee-oa.pdf',
      },
    ],
  },
  {
    id: 'trend-psychological-self-help-digital-burnout-support-record-20260603',
    category: 'mental_health',
    question: '심리적 자가도움 앱이나 번아웃 관리 콘텐츠는 혼자 해도 괜찮은가요?',
    answer: `<div class="qa-structured">
  <p><strong>심리적 자가도움은 혼자 버티라는 뜻이 아니라, 안전한 지원 구조와 연결될 때 의미가 있습니다.</strong> WHO는 2026년 심리적 자가도움 확산 가이드를 발표하며, 우울과 불안 등에서 자가도움 접근이 도움이 될 수 있지만 검증된 구조와 지원이 중요하다고 설명했습니다.</p>
  <p>CDC는 번아웃이 오래 지속되면 일상 대응 능력과 정신건강에 영향을 줄 수 있고, 개인뿐 아니라 업무환경과 조직 변화도 중요하다고 안내합니다.</p>
  <h4>상담 전 기록할 것</h4>
  <ul>
    <li>피로, 냉소감, 집중력 저하가 언제부터 시작됐는지</li>
    <li>수면시간, 야근, 교대근무, 업무량, 휴식 가능 시간</li>
    <li>불안, 우울감, 공황, 무기력의 빈도</li>
    <li>술, 카페인, 수면제, 에너지음료 사용 변화</li>
    <li>앱, 운동, 상담, 휴가 등 시도한 방법과 반응</li>
  </ul>
  <h4>즉시 도움을 받아야 하는 신호</h4>
  <p>자해 생각, 죽음 생각, 공황으로 일상 기능이 무너지는 경우에는 자가도움 앱보다 즉시 전문 도움을 받아야 합니다. 플로로탄닌을 우울·불안·번아웃 회복 성분처럼 설명하면 안 됩니다.</p>
</div>`,
    tags: ['심리적자가도움', '번아웃', '디지털멘탈헬스', '우울', '불안', '상담기록'],
    difficulty: 'intermediate',
    views: 2609,
    likes: 185,
    related_insights: [
      '/insights/psychological-self-help-digital-burnout-support-record-2026',
      '/blog/psychological-self-help-digital-burnout-support-record-2026',
    ],
    references: [
      {
        title: 'WHO: New guide to help scale psychological self-help',
        url: 'https://www.who.int/news/item/01-06-2026-who-launches-new-guide-to-help-scale-psychological-self-help',
      },
      {
        title: 'CDC: Providing Support for Worker Mental Health',
        url: 'https://www.cdc.gov/mental-health/caring/providing-support-for-workers-and-professionals.html',
      },
    ],
  },
  {
    id: 'trend-at-home-gut-microbiome-test-dtc-stool-report-record-20260603',
    category: 'digestive',
    question: '가정용 장내미생물 검사 결과로 내 장 건강과 식단을 바로 판단해도 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>바로 판단하면 안 됩니다. 가정용 장내미생물 검사는 흥미로운 참고 자료일 수 있지만, 개인 진단 도구처럼 쓰면 위험합니다.</strong> 2026년 Communications Biology 연구는 7개 직접소비자용 장내미생물 검사 서비스를 표준화된 분변 물질로 평가했고, 분석과 해석이 서비스마다 달라질 수 있음을 보여줬습니다.</p>
  <p>FDA도 직접소비자 검사가 모두 같은 수준으로 검토되는 것은 아니며, 일반 웰니스 목적 검사는 제공 전 FDA 검토를 받지 않는 경우가 있다고 안내합니다.</p>
  <h4>검사보다 먼저 기록할 것</h4>
  <ul>
    <li>복통, 설사, 변비, 가스, 복부팽만 시작 시점</li>
    <li>혈변, 체중 감소, 발열, 야간 설사, 빈혈 여부</li>
    <li>최근 항생제, 위산억제제, 변비약, 건강기능식품 사용</li>
    <li>식사 패턴과 유제품, 밀가루, 매운 음식 반응</li>
    <li>스트레스, 수면, 여행, 감염 후 변화</li>
  </ul>
  <h4>주의할 점</h4>
  <p>플로로탄닌을 마이크로바이옴 정상화, IBS 치료, 장누수 개선 성분처럼 설명하면 안 됩니다. 혈변, 체중 감소, 빈혈, 야간 설사는 진료가 우선입니다.</p>
</div>`,
    tags: ['장내미생물검사', '마이크로바이옴', 'DTC검사', 'stool test', 'IBS', '장건강'],
    difficulty: 'advanced',
    views: 2606,
    likes: 184,
    related_insights: [
      '/insights/at-home-gut-microbiome-test-dtc-stool-report-record-2026',
      '/blog/at-home-gut-microbiome-test-dtc-stool-report-record-2026',
    ],
    references: [
      {
        title: 'Communications Biology: Evaluating analytical performance of DTC gut microbiome testing services',
        url: 'https://www.nature.com/articles/s42003-025-09301-3',
      },
      {
        title: 'FDA: Direct-to-Consumer Tests',
        url: 'https://www.fda.gov/medical-devices/in-vitro-diagnostics/direct-consumer-tests',
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
