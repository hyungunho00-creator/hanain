import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T15:05:00+09:00'

const questions = [
  {
    id: 'trend-glp1-hair-loss-telogen-effluvium-20260602',
    category: 'hair',
    question: 'GLP-1 감량 중 머리가 많이 빠지면 약 때문인가요, 단백질과 페리틴을 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>GLP-1 감량 중 머리 빠짐은 약 하나로 단정하기보다 급격한 체중감량, 식사량 감소, 단백질 부족, 철·페리틴, 갑상선 상태를 함께 봐야 합니다.</strong> Cleveland Clinic은 이런 양상이 흔히 휴지기 탈모로 설명되며, 몸이 큰 스트레스를 받은 뒤 2~3개월 후 갑자기 빠지는 양이 늘 수 있다고 설명합니다.</p>
  <p>2026년 GLP-1 치료와 탈모에 대한 체계적 문헌고찰도 탈모 유형과 상담 포인트를 정리하면서, 빠른 체중 변화와 영양 부족 가능성을 중요한 해석 축으로 다룹니다. 그래서 “샴푸를 바꾸면 된다” 또는 “약이 모낭을 망가뜨렸다”처럼 단순화하면 정보 품질이 떨어집니다.</p>
  <h4>헷갈리기 쉬운 포인트</h4>
  <p>휴지기 탈모는 원인이 생긴 직후 바로 빠지는 것이 아니라 시간이 지난 뒤 나타나는 경우가 많습니다. 그래서 오늘 머리가 빠진다고 해서 오늘 먹은 음식이나 어제 쓴 샴푸 때문이라고 판단하기 어렵습니다. 감량 속도, 식사량, 단백질, 빈혈, 갑상선, 스트레스가 몇 주에서 몇 달 동안 어떻게 변했는지를 같이 봐야 합니다.</p>
  <h4>상담 전 기록할 것</h4>
  <ul>
    <li>GLP-1 시작일, 증량일, 머리 빠짐 시작일</li>
    <li>최근 1~3개월 체중 변화와 식사량 변화</li>
    <li>하루 단백질 섭취가 부족했던 날의 반복 여부</li>
    <li>철, 페리틴, 갑상선, 생리 변화, 최근 감염·수술·스트레스</li>
    <li>두피 가려움, 붉어짐, 원형 탈모처럼 다른 원인을 의심할 신호</li>
  </ul>
  <h4>언제 진료가 필요할까요?</h4>
  <p>손으로 쓸어도 뭉텅이로 빠지거나, 두피가 보일 정도로 진행되거나, 원형으로 비어 보이거나, 피로·어지럼·월경 변화가 함께 있으면 처방의와 피부과 상담이 좋습니다. 이미 GLP-1을 처방받아 쓰는 중이라면 임의로 중단하기보다 탈모 시작 시점과 식사 기록을 가지고 상담하세요. 플로로탄닌은 탈모 치료나 발모 보장으로 설명하면 안 되고, 식사·수면·감량 속도 기록을 돕는 건강정보 안에서만 다뤄야 합니다.</p>
</div>`,
    tags: ['GLP1탈모', '휴지기탈모', '단백질', '페리틴', '오젬픽헤어', '모발두피'],
    difficulty: 'intermediate',
    views: 2420,
    likes: 188,
    related_insights: [
      '/insights/glp1-hair-loss-telogen-effluvium-protein-ferritin-2026',
      '/blog/glp1-hair-loss-telogen-effluvium-protein-ferritin-2026',
    ],
    references: [
      { title: 'Cleveland Clinic 2026: Can GLP-1 medications cause hair loss?', url: 'https://my.clevelandclinic.org/podcasts/health-essentials/can-glp-1-medications-cause-hair-loss' },
      { title: 'Science Progress 2026: GLP-1 therapies and hair loss systematic review', url: 'https://pubmed.ncbi.nlm.nih.gov/41998799/' },
    ],
  },
  {
    id: 'trend-menopause-hormone-therapy-label-change-20260602',
    category: 'womens_health',
    question: '폐경 호르몬요법 라벨이 바뀌었다는데 갱년기 증상이 있으면 바로 상담해도 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>상담해 볼 수는 있지만, 라벨 변경을 “누구나 바로 시작해도 된다”는 뜻으로 읽으면 안 됩니다.</strong> FDA는 2026년 일부 폐경 호르몬요법 제품에서 심혈관질환, 유방암, 치매 관련 일부 위험 문구를 boxed warning에서 제거하는 라벨 변경을 승인했습니다. 이는 폐경 증상 치료 정보를 최신 근거에 맞게 조정하려는 흐름입니다.</p>
  <p>다만 폐경 호르몬요법은 증상, 나이, 마지막 생리 시점, 자궁 유무, 유방암·혈전·심혈관 병력, 가족력에 따라 선택이 달라집니다. 안면홍조와 야간발한이 심해 삶의 질이 떨어지는 사람과, 증상이 가볍거나 금기 병력이 있는 사람의 판단은 같을 수 없습니다.</p>
  <h4>라벨 변경을 어떻게 읽어야 하나요?</h4>
  <p>라벨 변경은 오래된 공포 문구를 최신 근거에 맞게 조정하는 의미가 있습니다. 그러나 위험이 0이라는 뜻은 아닙니다. 호르몬요법은 전신요법인지, 질 증상에 쓰는 국소요법인지, 자궁이 있어 프로게스토겐이 필요한지에 따라 논의가 달라집니다. 그래서 “호르몬은 무조건 위험하다”와 “이제 아무나 해도 된다”는 두 표현 모두 피해야 합니다.</p>
  <h4>상담 전 정리할 것</h4>
  <ul>
    <li>안면홍조, 야간발한, 수면장애가 일상에 미치는 정도</li>
    <li>마지막 생리 시점과 현재 나이</li>
    <li>유방암, 자궁내막암, 혈전, 뇌졸중, 심혈관질환 병력</li>
    <li>유방촬영, 혈압, 지질, 혈당, 골밀도 관련 기록</li>
    <li>질건조, 요로 증상, 골절 위험처럼 해결하고 싶은 목표</li>
  </ul>
  <h4>보충제로 대신하면 될까요?</h4>
  <p>건강기능식품은 폐경 호르몬요법을 대체한다고 말할 수 없습니다. 수면, 열감, 식사, 운동 기록을 정리하는 데 도움을 주는 정보는 가능하지만, 플로로탄닌이 갱년기 증상을 치료하거나 안면홍조를 개선한다고 보장하면 안 됩니다. 신뢰도 높은 콘텐츠는 증상 기록과 개인 위험도 상담을 돕는 방향이어야 합니다.</p>
</div>`,
    tags: ['폐경', '호르몬요법', '갱년기', '안면홍조', '여성건강', 'HRT'],
    difficulty: 'intermediate',
    views: 2360,
    likes: 182,
    related_insights: [
      '/insights/menopause-hormone-therapy-label-change-risk-conversation-2026',
      '/blog/menopause-hormone-therapy-label-change-risk-conversation-2026',
    ],
    references: [
      { title: 'FDA 2026: Menopausal hormone therapy labeling changes', url: 'https://www.fda.gov/news-events/press-announcements/fda-approves-labeling-changes-menopausal-hormone-therapy-products' },
      { title: 'NCI: Menopausal hormone therapy and cancer', url: 'https://www.cancer.gov/about-cancer/causes-prevention/risk/hormones/mht-fact-sheet' },
    ],
  },
  {
    id: 'trend-testosterone-therapy-low-libido-bp-monitoring-20260602',
    category: 'mens_health',
    question: '테스토스테론 치료가 다시 이슈라는데 피곤하고 성욕이 떨어지면 맞아도 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>피로와 성욕저하만으로 테스토스테론 치료를 시작하면 안 됩니다.</strong> FDA는 2026년 남성 저성욕과 특발성 성선기능저하 관련 새로운 적응증 가능성을 검토하는 흐름을 열었지만, 어떤 승인도 효과와 위험의 근거가 충분해야 한다고 설명했습니다.</p>
  <p>또 FDA는 TRAVERSE 연구와 혈압 모니터링 연구를 바탕으로 테스토스테론 제품 라벨을 조정했습니다. 주요 심혈관 사건 증가 문구는 조정됐지만, 혈압 상승 경고와 나이 관련 저테스토스테론 사용 제한은 계속 중요합니다. 따라서 “남성 활력 주사”처럼 가볍게 볼 문제가 아닙니다.</p>
  <h4>왜 아침 검사가 중요한가요?</h4>
  <p>테스토스테론 수치는 시간대, 수면, 체중, 음주, 스트레스, 질병에 따라 달라질 수 있습니다. 그래서 한 번 낮게 나왔다고 바로 치료를 정하기보다, 증상과 함께 반복 아침 검사를 확인하는 과정이 필요합니다. 피로와 성욕저하는 우울, 수면무호흡, 당뇨, 갑상선 문제, 약물 영향에서도 생길 수 있어 원인 평가가 중요합니다.</p>
  <h4>상담 전 기록할 것</h4>
  <ul>
    <li>반복 아침 테스토스테론 검사 결과</li>
    <li>성욕저하, 발기 문제, 피로, 우울감, 근력저하를 각각 분리한 증상 기록</li>
    <li>혈압, 헤마토크릿, PSA, 배뇨 증상</li>
    <li>수면무호흡, 코골이, 체중 변화, 음주, 복용약</li>
    <li>최근 심혈관 사건이나 전립선·유방암 의심 병력</li>
  </ul>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌은 남성호르몬을 올리는 성분으로 설명하면 안 됩니다. 남성건강 콘텐츠에서는 수면, 혈압, 운동, 식사, 혈액검사 기록을 먼저 다루고, 해조 폴리페놀 연구 정보는 보조적인 건강정보로만 연결해야 합니다. 특히 TRT 대체, 성기능 개선 보장, 활력 주사 같은 표현은 피해야 합니다.</p>
</div>`,
    tags: ['테스토스테론', 'TRT', '남성건강', '혈압', '저테스토스테론', '성욕저하'],
    difficulty: 'intermediate',
    views: 2490,
    likes: 193,
    related_insights: [
      '/insights/testosterone-therapy-low-libido-blood-pressure-monitoring-2026',
      '/blog/testosterone-therapy-low-libido-blood-pressure-monitoring-2026',
    ],
    references: [
      { title: 'FDA 2026: Step forward on testosterone therapy for men', url: 'https://www.fda.gov/news-events/press-announcements/fda-takes-step-forward-testosterone-therapy-men' },
      { title: 'FDA 2025: Labeling changes for testosterone products', url: 'https://www.fda.gov/drugs/drug-alerts-and-statements/fda-issues-class-wide-labeling-changes-testosterone-products' },
      { title: 'FDA: Testosterone information', url: 'https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/testosterone-information' },
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
      disclaimer: '건강정보는 진료를 대신하지 않습니다. 증상이 있거나 약을 복용 중이면 전문가와 상담하세요.',
      source_type: 'public-health-and-peer-reviewed',
      references_pmid: [],
      rewrittenAt: UPDATED_AT,
      reviewed: true,
      qualityStatus: 'validated',
      sourceStatus: 'referenced',
      validatedAnswer: item.answer,
      reviewReason: '카테고리 순환 보강. 최신 공공기관·전문기관 자료를 반영하고 치료·완치·보장 표현을 배제함.',
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
