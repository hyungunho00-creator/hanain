import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T15:40:00+09:00'

const questions = [
  {
    id: 'trend-hearing-loss-dementia-hearing-aid-20260602',
    category: 'neuro_cognitive',
    question: '난청이 있으면 치매위험이 높아진다는데 보청기를 쓰면 기억력이 좋아지나요?',
    answer: `<div class="qa-structured">
  <p><strong>보청기는 기억력을 올려주는 약이 아닙니다. 다만 난청을 방치하지 않는 일은 뇌건강 관리에서 점점 더 중요하게 다뤄지고 있습니다.</strong> 2026년 Neurology 연구 보도는 중등도 난청이 있는 고령자에서 보청기 처방군의 치매 발생 위험이 낮게 관찰됐다고 설명했습니다. 하지만 이 결과를 “보청기를 쓰면 치매가 예방된다”거나 “기억력이 좋아진다”로 받아들이면 안 됩니다. 관찰된 관련성은 의미가 있지만, 개인별 원인과 효과를 단정하려면 청력 상태, 착용 순응도, 건강상태, 사회활동 변화까지 함께 봐야 합니다.</p>
  <p>난청이 오래가면 대화를 듣기 위해 더 많은 집중력을 쓰게 되고, 모임을 피하거나 대화 피로가 커질 수 있습니다. 그러면 사회적 고립, 우울감, 수면저하가 겹치면서 가족이 보기에는 “기억력이 떨어진 것 같다”고 느낄 수 있습니다. 그래서 핵심은 보청기 구입 자체가 아니라 청력검사 후 적절한 조정, 실제 착용시간, 소음 환경에서의 어려움, 대화 참여 변화까지 생활 기록으로 남기는 것입니다.</p>
  <h4>상담 전에 기록할 것</h4>
  <ul>
    <li>청력검사 결과와 검사 날짜, 좌우 청력 차이</li>
    <li>TV 소리 크기, 전화 통화 어려움, 말소리를 되묻는 빈도</li>
    <li>보청기 착용시간, 불편감, 소음 많은 장소에서의 어려움</li>
    <li>모임 회피, 대화 피로, 우울감, 수면 변화</li>
    <li>기억력 변화, 복용약, 혈압·당뇨·심혈관질환 같은 기저질환</li>
  </ul>
  <h4>언제 진료가 우선인가요?</h4>
  <p>갑자기 한쪽 청력이 떨어지거나 귀 먹먹함, 어지럼, 이명, 심한 두통이 동반되면 생활관리보다 이비인후과 진료가 먼저입니다. 기억력 저하가 일상 기능을 방해하거나 길을 잃는 일이 생긴다면 신경과·정신건강의학과 상담도 필요합니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌을 치매 예방, 난청 개선, 기억력 치료로 설명하면 안 됩니다. 이 주제에서는 청력·수면·운동·사회활동 기록을 먼저 안내하고, 해조 유래 성분은 건강정보를 이해하는 보조 자료로만 연결하는 것이 신뢰도를 지키는 방식입니다.</p>
</div>`,
    tags: ['난청', '치매위험', '보청기', '인지건강', '사회적고립', '청력검사'],
    difficulty: 'intermediate',
    views: 2470,
    likes: 190,
    related_insights: [
      '/insights/hearing-loss-dementia-risk-hearing-aid-record-2026',
      '/blog/hearing-loss-dementia-risk-hearing-aid-record-2026',
    ],
    references: [
      { title: 'Neurology 2026: Treating hearing loss with hearing aids', url: 'https://www.neurology.org/doi/10.1212/WNL.0000000000214572' },
      { title: 'Frontiers 2026: Dementia and hearing loss', url: 'https://www.frontiersin.org/journals/dementia/articles/10.3389/frdem.2026.1736003/full' },
      { title: 'Frontiers 2026: Hearing loss and incident dementia', url: 'https://www.frontiersin.org/journals/epidemiology/articles/10.3389/fepid.2026.1798451/full' },
    ],
  },
  {
    id: 'trend-screen-time-sleep-anxiety-digital-behavior-20260602',
    category: 'mental_health',
    question: '스크린타임이 많으면 불안이 심해지나요, 밤 사용과 수면을 먼저 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>스크린타임이 많다고 곧바로 불안장애가 생긴다고 단정하면 안 됩니다. 하지만 밤 사용, 짧은 수면, 소셜미디어 후 비교감이 같이 있으면 생활 기록이 필요합니다.</strong> 2026년 Frontiers in Public Health 연구는 스크린타임과 소셜미디어 사용이 불안 수준과 관련되고, 수면시간은 보호 요인처럼 나타났다고 보고했습니다. OECD의 2026년 청소년·청년 정신건강 보고서도 디지털 사용, 수면, 신체활동, 사회적 환경을 함께 봐야 한다는 흐름을 보여줍니다.</p>
  <p>중요한 것은 “스마트폰이 원인이다”라고 단순화하지 않는 것입니다. 불안해서 더 오래 스크롤할 수도 있고, 밤 사용이 수면을 줄여 다음 날 불안을 키울 수도 있습니다. 또 사용 시간은 같아도 어떤 콘텐츠를 보는지, 알림이 얼마나 자주 끊는지, 사용 후 마음이 안정되는지 초조해지는지에 따라 영향이 달라집니다. 그래서 검색엔진과 독자가 신뢰할 답변은 화면시간 숫자 하나가 아니라 수면·감정·일상 기능을 묶어 설명해야 합니다.</p>
  <h4>먼저 확인할 것</h4>
  <ul>
    <li>잠들기 전 2시간 스마트폰 사용량과 사용 목적</li>
    <li>총 수면시간, 잠드는 데 걸린 시간, 중간 각성, 아침 피로</li>
    <li>소셜미디어 사용 후 비교감, 초조감, 우울감, 분노감</li>
    <li>업무·학업·관계가 방해받는지 여부</li>
    <li>카페인, 음주, 운동 부족, 식사 불규칙, 가족 갈등 같은 동반 요인</li>
  </ul>
  <h4>현실적인 조정 방법</h4>
  <p>처음부터 모든 앱을 끊으려고 하면 실패하기 쉽습니다. 잠들기 60~90분 전 알림을 줄이고, 침대 밖에서 충전하며, 불안을 키우는 계정은 숨기거나 팔로우를 정리하는 것부터 시작하는 편이 현실적입니다. 단, 불안이 업무·학업·관계·수면을 지속적으로 방해하거나 공황, 자해 생각이 있으면 디지털 디톡스보다 전문가 상담이 우선입니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌을 불안 치료나 수면 개선 보장으로 설명하면 안 됩니다. 이 주제에서는 수면과 생활 리듬을 기록하게 돕고, 해조 유래 성분은 일반 건강정보 맥락에서만 다루는 것이 안전합니다.</p>
</div>`,
    tags: ['스크린타임', '불안', '수면부족', '소셜미디어', '정신건강', '디지털행동'],
    difficulty: 'intermediate',
    views: 2510,
    likes: 194,
    related_insights: [
      '/insights/screen-time-sleep-anxiety-digital-behavior-record-2026',
      '/blog/screen-time-sleep-anxiety-digital-behavior-record-2026',
    ],
    references: [
      { title: 'Frontiers 2026: Digital behavior and anxiety', url: 'https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2026.1766808/full' },
      { title: 'OECD 2026: Child, adolescent and youth mental health', url: 'https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/05/child-adolescent-and-youth-mental-health-in-the-21st-century_81743169/1092c3cb-en.pdf' },
    ],
  },
  {
    id: 'trend-sunscreen-vitamin-d-uv-index-myth-20260602',
    category: 'skin',
    question: '자외선차단제를 바르면 비타민D가 부족해지니 햇빛을 오래 쬐는 게 좋나요?',
    answer: `<div class="qa-structured">
  <p><strong>비타민D를 이유로 자외선차단을 줄이는 것은 좋은 선택이 아닙니다.</strong> CDC는 UV 지수 3 이상이면 그늘, 보호복, 챙 넓은 모자, 선글라스, 광범위 자외선차단제를 함께 사용하라고 안내합니다. 자외선은 비타민D 합성에 관여하지만 동시에 피부 세포 손상, 일광화상, 조기 노화, 색소 변화, 피부암 위험을 높일 수 있습니다.</p>
  <p>Cleveland Clinic은 자외선차단제가 비타민D 생성을 완전히 막는 것으로 보기 어렵고, 비타민D를 얻기 위해 일부러 장시간 햇빛을 쬐는 방식은 필요하지 않다고 설명합니다. 미국피부과학회도 비타민D는 음식, 강화식품, 필요 시 보충제와 상담을 통해 관리하는 편이 더 안전하다는 입장입니다. 특히 실내생활이 많거나 고령, 특정 약 복용, 간·신장 질환, 흡수장애가 있으면 햇빛 시간을 늘리기보다 검사를 통해 확인하는 것이 낫습니다.</p>
  <h4>야외 활동 전 확인할 것</h4>
  <ul>
    <li>UV 지수 3 이상이면 피부보호 전략을 먼저 세웁니다.</li>
    <li>10시~16시 강한 햇빛은 가능한 피하고 그늘을 활용합니다.</li>
    <li>모자, 긴팔, 선글라스, 자외선차단제를 함께 사용합니다.</li>
    <li>땀, 물놀이, 장시간 야외활동 후에는 자외선차단제를 다시 바릅니다.</li>
    <li>새로 생긴 점, 모양이 변하는 점, 낫지 않는 상처는 기록합니다.</li>
  </ul>
  <h4>오해하기 쉬운 부분</h4>
  <p>“선크림을 바르면 무조건 비타민D가 부족해진다”도 과장이고, “햇빛은 자연이라 오래 쬐어도 괜찮다”도 위험한 말입니다. 건강정보 콘텐츠에서는 극단적인 표현보다 UV 지수, 노출 시간, 피부 타입, 가족력, 검사 결과를 함께 보게 해야 합니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌을 자외선 손상 차단, 피부암 예방, 기미 치료를 보장한다고 말하면 안 됩니다. 피부 카테고리에서는 자외선차단 습관과 피부 변화 기록을 먼저 안내하고, 해조 유래 성분은 근거를 조심스럽게 소개하는 보조 정보로만 다루는 것이 안전합니다.</p>
</div>`,
    tags: ['자외선차단제', '비타민D', 'UV지수', '피부암예방', '선크림오해', '피부건강'],
    difficulty: 'intermediate',
    views: 2450,
    likes: 187,
    related_insights: [
      '/insights/sunscreen-vitamin-d-uv-index-myth-check-2026',
      '/blog/sunscreen-vitamin-d-uv-index-myth-check-2026',
    ],
    references: [
      { title: 'CDC 2026: Reducing risk for skin cancer', url: 'https://www.cdc.gov/skin-cancer/prevention/index.html' },
      { title: 'Cleveland Clinic 2026: Safely get vitamin D from the sun', url: 'https://health.clevelandclinic.org/vitamin-d-from-the-sun' },
      { title: 'American Academy of Dermatology: Vitamin D and UV exposure', url: 'https://www.aad.org/media-resources/stats-and-facts/prevention-and-care/vitamin-d-and-uv-exposure' },
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
      reviewReason: '카테고리 순환 보강. 최신 공공기관·전문기관·학술 자료를 반영하고 치료·완치·보장 표현을 배제함.',
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
