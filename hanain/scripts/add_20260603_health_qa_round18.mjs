import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-03T00:05:00+09:00'

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
    id: 'trend-pollen-thunderstorm-asthma-action-plan-20260603',
    category: 'respiratory',
    question: '꽃가루 알레르기가 심한데 기침과 숨참이 생기면 천식 행동계획을 확인해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>재채기와 콧물만 있으면 알레르기 비염일 수 있지만, 쌕쌕거림·숨참·야간 기침·흡입기 사용 증가가 있으면 천식 악화 신호로 봐야 합니다.</strong> CDC는 꽃가루 노출이 천식 발작과 호흡기 입원 증가와 연결될 수 있다고 설명합니다. 또 천식 유발 요인에는 꽃가루, 대기오염, 산불 연기, 뇌우, 높은 습도, 감염 등이 포함될 수 있습니다.</p>
  <p>꽃가루 시즌에는 증상이 매년 반복된다고 가볍게 넘기기 쉽습니다. 하지만 밤에 기침으로 깨거나, 운동 뒤 숨이 차거나, 평소보다 빠른 완화 흡입기를 자주 쓰게 된다면 개인별 천식 행동계획을 의료진과 확인해야 합니다.</p>
  <h4>기록할 것</h4>
  <ul>
    <li>꽃가루·미세먼지·오존·산불 연기 예보</li>
    <li>기침, 쌕쌕거림, 가슴 답답함, 야간 각성 횟수</li>
    <li>빠른 완화 흡입기 사용 횟수와 효과</li>
    <li>뇌우, 높은 습도, 찬 공기, 향료·청소제 노출</li>
    <li>학교·직장·운동 중 증상이 줄었는지 늘었는지</li>
  </ul>
  <h4>바로 진료가 필요한 신호</h4>
  <p>말하기 어려울 정도로 숨이 차거나, 입술이 푸르거나, 흉통이 있거나, 흡입기 반응이 평소보다 약하면 즉시 진료가 필요합니다. 천식 진단을 받은 사람은 악화 시 어떤 약을 언제 쓰고 언제 응급실로 갈지 문서로 확인해야 합니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 천식이나 알레르기 치료 성분처럼 설명하면 안 됩니다. 호흡기 콘텐츠에서는 공기질, 꽃가루 예보, 흡입기 사용 기록, 천식 행동계획, 실내 HEPA·환기 관리가 중심입니다.</p>
</div>`,
    tags: ['꽃가루', '천식', '알레르기비염', '뇌우천식', '흡입기', '공기질', '호흡기'],
    difficulty: 'advanced',
    views: 2597,
    likes: 185,
    related_insights: [
      '/insights/pollen-thunderstorm-asthma-action-plan-record-2026',
      '/blog/pollen-thunderstorm-asthma-action-plan-record-2026',
    ],
    references: [
      {
        title: 'CDC: Allergens and pollen',
        url: 'https://www.cdc.gov/climate-health/php/effects/allergens-and-pollen.html',
      },
      {
        title: 'CDC: Controlling asthma',
        url: 'https://www.cdc.gov/asthma/control/index.html',
      },
      {
        title: 'EPA: Wildland fires and public health effects',
        url: 'https://www.epa.gov/wildfires/wildland-fires-and-public-health-effects',
      },
    ],
  },
  {
    id: 'trend-tick-bite-lyme-alpha-gal-syndrome-20260603',
    category: 'infection_inflammation',
    question: '진드기에 물린 뒤 라임병과 알파갈 증후군은 어떤 증상을 따로 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>진드기 물림은 물린 장소, 제거 시간, 발열·발진 변화, 음식 알레르기 반응 시간표를 함께 기록해야 합니다.</strong> CDC는 라임병 예방에서 야외활동 뒤 몸·옷·장비·반려동물을 확인하고 붙은 진드기를 가능한 빨리 제거하라고 안내합니다. 일부 라임병 유행 지역에서는 특정 조건에서 물림 후 항생제 예방요법을 의료진과 논의할 수 있습니다.</p>
  <p>또 하나 주목할 이슈는 알파갈 증후군입니다. CDC는 알파갈 증후군이 진드기 물림 뒤 생길 수 있는 심각한 알레르기이며, 붉은 고기나 유제품 섭취 뒤 2~6시간 늦게 두드러기, 복통, 호흡곤란, 아나필락시스가 나타날 수 있다고 설명합니다.</p>
  <h4>물린 뒤 기록할 것</h4>
  <ul>
    <li>물린 날짜, 장소, 야외활동 종류</li>
    <li>진드기를 발견한 시간과 제거한 시간</li>
    <li>발열, 두통, 근육통, 피로, 림프절 부종</li>
    <li>원형 또는 퍼지는 발진 사진과 크기 변화</li>
    <li>붉은 고기·유제품 섭취 뒤 2~6시간 반응</li>
  </ul>
  <h4>바로 진료가 필요한 경우</h4>
  <p>고열, 심한 두통, 목 경직, 넓어지는 발진, 얼굴 마비, 심한 관절통, 호흡곤란, 전신 두드러기, 어지러움이 있으면 의료진 상담이 필요합니다. 진드기를 태우거나 손으로 으깨는 방식은 피하고, 끝이 가는 핀셋으로 피부 가까이 잡아 똑바로 당겨 제거하세요.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 진드기 감염 예방이나 알레르기 치료 성분처럼 설명하면 안 됩니다. 이 주제의 핵심은 노출 예방, 진드기 제거, 발열·발진 사진, 알레르기 반응 시간표, 의료진 상담입니다.</p>
</div>`,
    tags: ['진드기', '라임병', '알파갈증후군', '발진', '알레르기', '야외활동', '감염염증'],
    difficulty: 'advanced',
    views: 2591,
    likes: 184,
    related_insights: [
      '/insights/tick-bite-lyme-alpha-gal-syndrome-summer-record-2026',
      '/blog/tick-bite-lyme-alpha-gal-syndrome-summer-record-2026',
    ],
    references: [
      {
        title: 'CDC: Preventing Lyme disease',
        url: 'https://www.cdc.gov/lyme/prevention/',
      },
      {
        title: 'CDC: Managing alpha-gal syndrome',
        url: 'https://www.cdc.gov/alpha-gal-syndrome/managing/index.html',
      },
      {
        title: 'FDA: Ticks and Lyme disease',
        url: 'https://www.fda.gov/consumers/consumer-updates/ticks-and-lyme-disease-symptoms-treatment-and-prevention',
      },
    ],
  },
  {
    id: 'trend-melasma-tinted-sunscreen-visible-light-iron-oxide-20260603',
    category: 'skin',
    question: '기미와 색소침착이 있으면 선스크린을 SPF만 보고 고르면 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>기미가 있다면 SPF 숫자만 보지 말고 broad-spectrum, 충분한 도포량, 틴티드 여부, 철산화물 포함 여부를 함께 확인해야 합니다.</strong> AAD는 기미 self-care에서 가시광선이 특히 어두운 피부톤의 기미를 악화시킬 수 있으며, SPF 30 이상과 함께 철산화물이 포함된 틴티드 선스크린을 권합니다.</p>
  <p>기미는 햇빛, 열, 호르몬 변화, 피임약, 임신, 스트레스, 자극적인 스킨케어가 모두 영향을 줄 수 있습니다. 그래서 제품명보다 실제로 충분히 바르는지, 땀과 마스크 마찰 뒤 다시 바르는지, 따갑거나 붉어지는 제품을 계속 쓰는지 기록하는 것이 중요합니다.</p>
  <h4>제품 선택과 사용 기록</h4>
  <ul>
    <li>SPF 30 이상과 broad-spectrum 표시</li>
    <li>zinc oxide, titanium dioxide, iron oxides 포함 여부</li>
    <li>피부색에 맞는 틴트와 충분한 도포량</li>
    <li>향료·강한 각질제거제 사용 뒤 따가움 여부</li>
    <li>야외활동, 열 노출, 마스크 마찰 뒤 색 변화</li>
  </ul>
  <h4>광고에서 조심할 표현</h4>
  <p>기미를 한 번에 없앤다거나 먹는 항산화제로 사라진다고 말하는 표현은 조심해야 합니다. AAD는 기미 치료 결과가 보통 3~12개월 이상 걸릴 수 있고, 처방 치료와 시술은 피부 상태에 맞게 조정되어야 한다고 안내합니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 기미 치료나 미백 성분처럼 설명하면 안 됩니다. 피부 콘텐츠에서는 자외선·가시광선 차단, 자극 없는 스킨케어, 사진 기록, 피부과 상담 기준을 먼저 안내해야 합니다.</p>
</div>`,
    tags: ['기미', '색소침착', '틴티드선스크린', '철산화물', 'SPF', '가시광선', '피부'],
    difficulty: 'intermediate',
    views: 2585,
    likes: 182,
    related_insights: [
      '/insights/melasma-tinted-sunscreen-visible-light-iron-oxide-record-2026',
      '/blog/melasma-tinted-sunscreen-visible-light-iron-oxide-record-2026',
    ],
    references: [
      {
        title: 'AAD: Melasma self-care',
        url: 'https://www.aad.org/public/diseases/a-z/melasma-self-care',
      },
      {
        title: 'AAD: Melasma diagnosis and treatment',
        url: 'https://www.aad.org/public/diseases/a-z/melasma-treatment',
      },
      {
        title: 'PubMed: Photoprotection beyond ultraviolet radiation',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32335182/',
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
        '카테고리 순환 최신 보강. 공식기관·학회 근거를 반영하고 치료·예방 보장 표현을 배제함.',
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
