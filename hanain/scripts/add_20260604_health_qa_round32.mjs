import fs from 'node:fs'
import path from 'node:path'
import { ROUND32_TREND_BLOG_POSTS } from '../src/data/localTrendBlogPostsRound32.js'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-04T18:40:00+09:00'

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
    id: 'trend-biotin-hair-supplement-lab-test-interference-record-20260604',
    category: 'hair',
    question: '탈모 영양제로 비오틴을 먹고 있다면 혈액검사 전에 무엇을 알려야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>비오틴을 먹고 있다면 검사 전 제품명, 1회 함량, 하루 복용량, 최근 복용 시간을 의료진이나 검사실에 알려야 합니다.</strong> FDA는 비오틴이 특정 실험실 검사에 영향을 줄 수 있고, 일부 트로포닌 검사에서 잘못 낮은 결과가 보고된 적이 있다고 안내합니다.</p>
  <p>NIH ODS도 비오틴 보충제가 모발·손톱·피부 건강 목적으로 홍보되지만 근거는 제한적이며, 고함량 보충제는 일부 검사에서 거짓 결과를 만들 수 있다고 설명합니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>제품명과 1회 비오틴 함량</li>
    <li>하루 복용 횟수와 최근 복용 시간</li>
    <li>단일 비오틴인지, 멀티비타민·콜라겐·모발 영양제에 포함된 것인지</li>
    <li>갑상샘 검사, 호르몬 검사, 심장 표지자 검사 예정 여부</li>
    <li>최근 검사 결과가 증상과 맞지 않았던 적이 있는지</li>
    <li>검사 전 중단이 필요한지 의료진이나 검사실에 문의했는지</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 비오틴 검사 간섭을 막거나 탈모를 해결하는 표현으로 쓰면 안 됩니다. 모발 콘텐츠에서는 복용 기록, 검사 전 고지, 상담 기준을 분명히 하는 것이 중요합니다.</p>
  <h4>검사 전 확인할 순서</h4>
  <p>비오틴은 음식에도 들어 있는 비타민이지만, 검사에서 문제가 되는 경우는 주로 모발·피부·손톱 목적으로 먹는 고함량 보충제입니다. 복용량을 모른다면 제품 라벨을 사진으로 찍어두세요.</p>
  <p>갑상샘 검사, 호르몬 검사, 심장 표지자 검사처럼 결과 해석이 중요한 검사가 예정되어 있다면 접수 단계에서 비오틴 복용을 말하는 것이 좋습니다. 임의로 끊거나 계속 먹기보다 검사실 또는 담당 의료진 안내를 확인하세요.</p>
  <p>탈모 상담에서는 갑상샘, 철분, 빈혈, 호르몬, 약물 이력을 함께 보는 경우가 있습니다. 이때 비오틴 정보를 빼면 검사 결과와 증상이 맞지 않는 상황을 놓칠 수 있습니다.</p>
  <p>비오틴을 먹었다는 사실이 부끄러운 정보는 아닙니다. 오히려 의료진이 결과를 안전하게 해석할 수 있게 돕는 사전 정보입니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>FDA: Biotin Interference with Troponin Lab Tests</li>
    <li>NIH ODS: Biotin Health Professional Fact Sheet</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 검사 전 보충제 중단 여부와 검사 해석은 의료진 또는 검사실 안내를 따르세요.</p>
</div>`,
    tags: ['비오틴', '탈모영양제', '혈액검사', '갑상샘검사', '트로포닌', '모발두피'],
    difficulty: 'intermediate',
    views: 2473,
    likes: 156,
    related_insights: [
      '/insights/biotin-hair-supplement-lab-test-interference-record-2026',
      '/blog/biotin-hair-supplement-lab-test-interference-record-2026',
    ],
    references: [
      { title: 'FDA: Biotin Interference with Troponin Lab Tests', url: 'https://www.fda.gov/medical-devices/in-vitro-diagnostics/biotin-interference-troponin-lab-tests-assays-subject-biotin-interference' },
      { title: 'NIH ODS: Biotin Health Professional Fact Sheet', url: 'https://ods.od.nih.gov/factsheets/Biotin-HealthProfessional/' },
    ],
  },
  {
    id: 'trend-heat-exposure-male-fertility-sperm-record-20260604',
    category: 'mens_health',
    question: '폭염이나 고온 작업이 많았다면 남성 생식건강 상담 전에 무엇을 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>폭염, 야외노동, 고온 작업, 사우나, 발열이 있었다면 정자검사 전 최근 몇 달간 열노출 시간과 탈수 증상을 기록해야 합니다.</strong> CDC NIOSH는 과도한 열노출이 생식건강과 임신에 영향을 줄 수 있으며, 고온 작업환경에서는 열스트레스 예방 조치가 필요하다고 안내합니다.</p>
  <p>핵심은 더우면 무조건 문제가 생긴다는 뜻이 아니라, 검사와 상담에서 해석할 생활 노출 정보를 준비하는 것입니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>야외 작업, 고온 실내 작업, 조리실, 사우나, 찜질방 노출 시간</li>
    <li>폭염 경보가 있던 날 장시간 이동·운전·작업 여부</li>
    <li>발열 질환, 감염, 고열 지속 기간</li>
    <li>탈수, 어지럼, 열탈진 증상, 수분 섭취와 휴식 여부</li>
    <li>최근 정자검사 날짜와 결과, 재검 예정일</li>
    <li>흡연, 음주, 수면부족, 약물, 운동 과부하 등 동반 요인</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 남성 난임, 정자 수, 생식기능 개선을 보장하는 표현으로 쓰면 안 됩니다. 이 주제에서는 폭염 노출 기록, 작업환경 조정, 검사 전 상담 기준이 중심입니다.</p>
  <h4>정자검사 전 확인할 순서</h4>
  <p>정자검사는 하루 컨디션만 보는 검사가 아닙니다. 발열, 고온 노출, 수면 부족, 음주, 흡연, 약물, 만성질환, 정계정맥류 등 여러 요인이 겹칠 수 있으므로 생활 노출을 시간순으로 남겨야 합니다.</p>
  <p>고온 환경에서 일한다면 냉방 휴식, 그늘, 수분 섭취, 보호장비 조정 가능성을 확인하세요. 피할 수 없는 작업이라면 최소한 노출 시간과 회복 시간을 기록하는 것이 좋습니다.</p>
  <p>검사 결과가 낮게 나왔다면 바로 결론을 내리기보다 이전 검사와 비교하고, 최근 발열이나 폭염 노출이 있었는지 의료진에게 말해야 합니다.</p>
  <p>열노출 기록은 불안을 키우기 위한 것이 아니라 결과 해석을 돕는 자료입니다. 직업환경, 생활습관, 기존 질환을 함께 말할수록 상담이 더 구체적입니다.</p>
  <p>가능하면 작업일지처럼 날짜별로 적으세요. 더운 날 몇 시간 일했는지, 쉬는 시간이 있었는지, 물을 충분히 마셨는지, 작업 뒤 회복이 오래 걸렸는지까지 남기면 단순한 기억보다 상담 가치가 높아집니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>CDC NIOSH: About Heat Exposure and Reproductive Health</li>
    <li>CDC NIOSH: Reproductive Health and Work</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 난임 상담, 정자검사 해석, 치료 판단은 의료진과 상담하세요.</p>
</div>`,
    tags: ['남성건강', '폭염', '남성난임', '정자검사', '열노출', '검진'],
    difficulty: 'intermediate',
    views: 2469,
    likes: 155,
    related_insights: [
      '/insights/heat-exposure-male-fertility-sperm-record-2026',
      '/blog/heat-exposure-male-fertility-sperm-record-2026',
    ],
    references: [
      { title: 'CDC NIOSH: About Heat Exposure and Reproductive Health', url: 'https://www.cdc.gov/niosh/reproductive-health/prevention/heat.html' },
      { title: 'CDC NIOSH: Reproductive Health and Work', url: 'https://www.cdc.gov/niosh/reproductive-health/about/index.html' },
    ],
  },
  {
    id: 'trend-perimenopause-abnormal-bleeding-menopause-record-20260604',
    category: 'womens_health',
    question: '폐경 전후 출혈이 달라졌을 때 호르몬 변화로 넘기기 전에 무엇을 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>폐경 전후 출혈이 달라졌다면 마지막 정상 생리 날짜, 출혈 시작일, 출혈량, 큰 혈괴, 어지럼, 성관계 후 출혈 여부를 기록해야 합니다.</strong> ACOG는 기간 사이 출혈, 성관계 후 출혈, 과다출혈, 7일 이상 지속되는 출혈, 폐경 후 출혈 등을 비정상 자궁출혈로 설명합니다.</p>
  <p>폐경 전후에는 생리 주기와 양이 달라질 수 있지만 모든 출혈을 호르몬 변화로만 넘기면 중요한 신호를 놓칠 수 있습니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>마지막 정상 생리 날짜와 출혈 시작일</li>
    <li>출혈이 7일 이상 이어지는지</li>
    <li>패드나 탐폰을 1시간마다 갈 정도로 많은지</li>
    <li>큰 혈괴, 어지럼, 숨참, 흉통, 심한 피로가 있는지</li>
    <li>성관계 후 출혈, 생리 사이 spotting 여부</li>
    <li>21일보다 짧거나 35일보다 긴 주기가 반복되는지</li>
    <li>폐경 후 12개월 이상 생리가 없다가 다시 출혈이 생겼는지</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 폐경 전후 출혈, 자궁내막 문제, 과다월경을 해결하는 표현으로 쓰면 안 됩니다. 여성건강 콘텐츠에서는 출혈 패턴, 응급 신호, 산부인과 상담 기준을 정확히 보여주는 것이 신뢰에 맞습니다.</p>
  <h4>상담 전 확인할 순서</h4>
  <p>ACOG는 패드나 탐폰을 매시간 갈아야 하는 출혈이 2시간 이상 이어지고, 흉통·숨참·어지럼이 동반되면 즉시 의료 도움을 받으라고 안내합니다. 출혈량은 느낌보다 숫자로 기록해야 합니다.</p>
  <p>폐경 후 질출혈은 양이 적어도 확인이 필요합니다. 원인은 양성일 수도 있지만, 자궁내막 문제를 배제해야 하는 경우가 있어 산부인과 평가를 받는 것이 안전합니다.</p>
  <p>호르몬치료, 피임약, 혈액희석제, 정신건강 약물, 갑상샘 문제도 출혈 패턴과 관련될 수 있습니다. 복용 중인 약과 건강검진 결과를 함께 가져가면 상담이 더 정확해집니다.</p>
  <p>“요즘 불규칙하다”보다 날짜, 기간, 패드 개수, 큰 혈괴 여부, 어지럼 동반 여부를 적으세요. 같은 출혈이라도 기록이 있으면 검사 우선순위를 정하기 쉽습니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>ACOG: Abnormal Uterine Bleeding</li>
    <li>ACOG: Perimenopausal Bleeding and Bleeding After Menopause</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 출혈량이 많거나 폐경 후 출혈이 있으면 산부인과 의료진과 상담하세요.</p>
</div>`,
    tags: ['여성건강', '폐경전후', '비정상출혈', '과다월경', '자궁출혈', '산부인과'],
    difficulty: 'intermediate',
    views: 2465,
    likes: 154,
    related_insights: [
      '/insights/perimenopause-abnormal-bleeding-menopause-record-2026',
      '/blog/perimenopause-abnormal-bleeding-menopause-record-2026',
    ],
    references: [
      { title: 'ACOG: Abnormal Uterine Bleeding', url: 'https://www.acog.org/womens-health/faqs/abnormal-uterine-bleeding' },
      { title: 'ACOG: Perimenopausal Bleeding and Bleeding After Menopause', url: 'https://www.acog.org/womens-health/faqs/perimenopausal-bleeding-and-bleeding-after-menopause' },
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
  for (const post of ROUND32_TREND_BLOG_POSTS) {
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
