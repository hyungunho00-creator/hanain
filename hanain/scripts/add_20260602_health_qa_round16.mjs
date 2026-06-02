import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T23:45:00+09:00'

const common = {
  content_type: 'latest_health_qna',
  author: '플로로탄닌 건강정보센터 · 카테고리 순환 Q&A 편집팀',
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
    id: 'trend-ai-chatbot-mental-health-crisis-safety-20260602',
    category: 'mental_health',
    question: 'AI 챗봇에게 불안이나 우울 상담을 해도 괜찮나요, 어디까지 믿어야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>AI 챗봇은 감정 정리나 질문 정리에는 도움이 될 수 있지만, 정신건강 전문가나 위기상담을 대체할 수 없습니다.</strong> 2026년 AMA는 AI 정신건강 도구가 접근성을 넓힐 가능성이 있지만, 정서적 의존, 잘못된 정보, 위기 대응 부족, 아동·청소년 안전 문제 같은 위험을 일관되게 관리할 장치가 필요하다고 경고했습니다. 특히 사용자가 자해·자살 생각을 직접 말하지 않고 돌려 말할 때, 도구가 위험 신호를 놓칠 수 있습니다.</p>
  <p>가장 위험한 패턴은 “AI가 내 마음을 제일 잘 안다”, “의사나 가족보다 AI 말을 믿겠다”, “잠을 줄이면서 계속 대화한다”처럼 의존이 커지는 경우입니다. AI는 공감처럼 보이는 문장을 만들 수 있지만, 사용자의 병력, 약물, 조증·정신증 위험, 자해 위험, 가정폭력, 중독, 섭식장애 같은 맥락을 책임 있게 평가하지 못할 수 있습니다.</p>
  <h4>AI에 묻기 전에 먼저 적을 것</h4>
  <ul>
    <li>최근 2주간 수면, 식욕, 일·학업 기능 변화</li>
    <li>불안, 우울, 분노, 무기력, 공황 증상이 어느 정도인지</li>
    <li>자해 생각, 죽고 싶다는 생각, 구체적 계획이나 수단이 있는지</li>
    <li>술·약물 사용, 카페인, 수면부족, 조증처럼 들뜨는 기간</li>
    <li>가족·친구·의료진에게 공유할 수 있는 사람 목록</li>
  </ul>
  <h4>즉시 사람에게 연결해야 하는 신호</h4>
  <p>자해나 자살 생각이 있거나, 구체적인 방법을 찾고 있거나, 환청·망상·극심한 불면·조증 의심, 폭력 위험, 식사를 거의 못 하는 상태라면 AI 대화를 이어가는 것이 아니라 즉시 주변 사람, 의료진, 지역 위기상담, 응급 서비스를 이용해야 합니다. 미국은 988 Suicide & Crisis Lifeline을 이용할 수 있고, 한국에서는 지역 정신건강복지센터·응급실·119 등 실제 사람 연결이 우선입니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 불안·우울 치료 성분처럼 설명하면 안 됩니다. 정신건강 콘텐츠에서는 수면, 식사, 운동, 상담 연결, 위기 신호 기록을 중심에 두고, 해양 폴리페놀은 일반 건강소재 배경으로만 다룹니다.</p>
</div>`,
    tags: ['AI챗봇', '정신건강', '불안', '우울', '위기상담', '자살예방', '상담연결'],
    difficulty: 'advanced',
    views: 2641,
    likes: 195,
    related_insights: [
      '/insights/ai-chatbot-mental-health-crisis-safety-record-2026',
      '/blog/ai-chatbot-mental-health-crisis-safety-record-2026',
    ],
    references: [
      {
        title: 'AMA 2026: Strengthen safeguards for AI chatbots',
        url: 'https://www.ama-assn.org/press-center/ama-press-releases/ama-urges-congress-strengthen-safeguards-ai-chatbots',
      },
      {
        title: 'NIMH: Suicide prevention',
        url: 'https://www.nimh.nih.gov/health/topics/suicide-prevention',
      },
      {
        title: '988 Suicide & Crisis Lifeline',
        url: 'https://988lifeline.org/',
      },
    ],
  },
  {
    id: 'trend-weighted-vest-rucking-bone-joint-safety-20260602',
    category: 'musculoskeletal',
    question: '가중조끼나 러킹이 골밀도와 근력에 좋다는데, 무릎·허리에 부담은 없나요?',
    answer: `<div class="qa-structured">
  <p><strong>가중조끼와 러킹은 걷기에 외부 부하를 더하는 방식이라 근력·균형·뼈 건강 관점에서 관심이 커지고 있지만, “무겁게 메고 오래 걸으면 좋다”는 방식은 위험합니다.</strong> 2026년 노년층 가중조끼 미니리뷰는 효과 가능성과 함께 착용 난이도, 낙상, 통증, 심박·피로도, 점진적 부하 조절의 중요성을 강조했습니다. 특히 고령자나 관절질환자는 처음부터 높은 무게를 쓰면 보행 자세가 흔들릴 수 있습니다.</p>
  <p>가중조끼를 운동처럼 쓰려면 “무게”보다 “기술과 반응”이 먼저입니다. 몸통이 앞으로 숙여지거나, 보폭이 줄거나, 무릎 통증이 늘거나, 발목이 불안하면 무게가 과한 것입니다. 골다공증, 척추압박골절, 무릎관절염, 허리디스크, 어지럼, 낙상 이력이 있으면 시작 전에 의료진이나 운동전문가 상담이 필요할 수 있습니다.</p>
  <h4>처음 시작할 때 기록</h4>
  <ul>
    <li>현재 체중 대비 몇 % 무게인지</li>
    <li>걷는 시간, 거리, 경사, 계단 여부</li>
    <li>무릎·허리·발목 통증이 운동 중 또는 다음 날 늘었는지</li>
    <li>심박, 숨참, 어지럼, 피로도</li>
    <li>자세가 앞으로 숙여지거나 보폭이 줄어드는지</li>
  </ul>
  <h4>현실적인 시작법</h4>
  <p>처음에는 체중의 1~5% 정도처럼 보수적으로 시작하고, 통증과 자세가 안정적일 때만 천천히 늘리는 편이 안전합니다. 운동 목적이라면 단순히 오래 착용하기보다 짧은 걷기, 스텝업, 앉았다 일어서기 같은 기능적 움직임을 정확히 수행하는 것이 더 낫습니다. 무릎이나 허리 통증이 생기면 무게를 줄이고 쉬어야 합니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 관절·골밀도 개선 성분처럼 설명하면 안 됩니다. 근골격 콘텐츠에서는 운동 부하, 단백질, 비타민 D, 낙상 예방, 통증 기록을 먼저 다루고, 해양 폴리페놀은 산화스트레스 연구 배경으로만 연결합니다.</p>
</div>`,
    tags: ['가중조끼', '러킹', '골밀도', '근력운동', '무릎통증', '허리통증', '낙상예방'],
    difficulty: 'intermediate',
    views: 2633,
    likes: 193,
    related_insights: [
      '/insights/weighted-vest-rucking-bone-joint-safety-record-2026',
      '/blog/weighted-vest-rucking-bone-joint-safety-record-2026',
    ],
    references: [
      {
        title: 'Frontiers in Public Health 2026: Weighted vest interventions in older adults',
        url: 'https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2026.1811712/full',
      },
      {
        title: 'PubMed 2025: Weighted vest use or resistance exercise to offset weight-loss-associated bone loss',
        url: 'https://pubmed.ncbi.nlm.nih.gov/40540267/',
      },
      {
        title: 'CDC: Physical activity basics',
        url: 'https://www.cdc.gov/physical-activity-basics/',
      },
    ],
  },
  {
    id: 'trend-cold-plunge-sauna-blood-pressure-arrhythmia-safety-20260602',
    category: 'cardiovascular',
    question: '냉수욕이나 사우나를 번갈아 하면 혈압과 심장 건강에 정말 좋은가요?',
    answer: `<div class="qa-structured">
  <p><strong>냉수욕·사우나 루틴은 회복과 스트레스 관리 트렌드로 커지고 있지만, 심혈관 질환이나 부정맥 위험이 있는 사람에게는 자극이 될 수 있습니다.</strong> AHA는 차가운 물에 갑자기 들어가면 호흡, 심박, 혈압이 급격히 올라가는 cold shock response가 생길 수 있다고 설명합니다. 2026년 AHA의 추운 날씨 심장건강 안내도 추위가 혈관을 수축시켜 혈압을 높이고 심장 부담을 키울 수 있다고 강조합니다.</p>
  <p>사우나도 마찬가지입니다. 더위와 탈수, 음주, 과격한 운동 직후, 혈압약·이뇨제·심장약 복용 상황이 겹치면 어지럼, 실신, 심박 이상 위험이 올라갈 수 있습니다. “인플루언서 루틴”을 그대로 따라 하기보다 내 혈압, 심박, 어지럼, 흉통, 숨참 기록을 기준으로 봐야 합니다.</p>
  <h4>시작 전 확인할 것</h4>
  <ul>
    <li>고혈압, 협심증, 심근경색, 뇌졸중, 심부전, 부정맥 이력</li>
    <li>혈압약, 이뇨제, 베타차단제, 항부정맥제 복용 여부</li>
    <li>운동 직후, 음주 후, 수면부족 상태에서 시도하는지</li>
    <li>냉수욕 중 과호흡, 흉통, 심한 두근거림, 어지럼이 있었는지</li>
    <li>사우나 후 탈수, 두통, 실신 느낌, 심박 이상이 있었는지</li>
  </ul>
  <h4>안전한 접근</h4>
  <p>처음부터 얼음물에 오래 들어가거나 사우나와 냉수욕을 여러 번 반복하지 않는 것이 좋습니다. 짧게 시작하고, 혼자 하지 않으며, 음주 후에는 피하고, 흉통·호흡곤란·실신 느낌·불규칙한 심박이 있으면 즉시 중단해야 합니다. 심장질환 이력이 있으면 시작 전 의료진 상담이 우선입니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 혈압 안정이나 부정맥 예방 성분처럼 설명하면 안 됩니다. 심혈관 콘텐츠에서는 생활습관 기록, 혈압·심박 모니터링, 약물 복용, 위험 신호를 먼저 안내하고, 해양 폴리페놀은 일반적인 항산화 연구 배경으로만 다룹니다.</p>
</div>`,
    tags: ['냉수욕', '사우나', '혈압', '부정맥', '심박', '심혈관', '안전'],
    difficulty: 'advanced',
    views: 2625,
    likes: 191,
    related_insights: [
      '/insights/cold-plunge-sauna-blood-pressure-arrhythmia-safety-record-2026',
      '/blog/cold-plunge-sauna-blood-pressure-arrhythmia-safety-record-2026',
    ],
    references: [
      {
        title: 'AHA: Cold water plunge risks',
        url: 'https://www.heart.org/en/news/2022/12/09/youre-not-a-polar-bear-the-plunge-into-cold-water-comes-with-risks',
      },
      {
        title: 'AHA 2026: Cold weather heart health',
        url: 'https://newsroom.heart.org/news/hot-tips-for-cold-weather-heart-health',
      },
      {
        title: 'AHA: Arrhythmia',
        url: 'https://www.heart.org/en/health-topics/arrhythmia',
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
        '카테고리 순환 최신 보강. 공공기관·학술 근거를 반영하고 치료·예방 보장 표현을 배제함.',
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
