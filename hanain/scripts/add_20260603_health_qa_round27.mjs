import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-03T07:05:00+09:00'

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
    id: 'trend-renal-denervation-resistant-hypertension-home-bp-abpm-record-20260603',
    category: 'cardiovascular',
    question: '저항성 고혈압에서 신장신경차단술을 상담하기 전에 어떤 기록이 필요한가요?',
    answer: `<div class="qa-structured">
  <p><strong>신장신경차단술을 상담하기 전에는 “시술 가능성”보다 먼저 혈압이 정말 조절되지 않는지 확인하는 기록이 필요합니다.</strong> 진료실 혈압 한두 번만으로 판단하면 백의고혈압, 측정 자세 오류, 복약 누락, 수면무호흡, 진통소염제 사용 같은 원인을 놓칠 수 있습니다.</p>
  <p>ACC는 신장신경차단술이 과거의 논란을 지나 더 엄격한 연구와 기기 발전 속에서 다시 논의되고 있다고 설명합니다. FDA도 Paradise Ultrasound Renal Denervation System을 생활습관 교정과 약물치료로 충분히 조절되지 않는 고혈압 환자에게 쓰는 보조 치료 선택지로 승인했습니다. 즉, 약을 대신하는 간단한 시술이 아니라 “정말 필요한 사람인지”를 먼저 확인해야 하는 영역입니다.</p>
  <h4>상담 전에 가져가면 좋은 기록</h4>
  <ul>
    <li>1~2주간 아침·저녁 가정혈압: 앉아서 5분 안정 후, 같은 팔과 같은 커프로 측정</li>
    <li>가능하다면 24시간 활동혈압검사(ABPM): 밤 혈압, 새벽 상승, 진료실 혈압과의 차이를 확인</li>
    <li>복용 중인 혈압약 이름, 용량, 실제 복용 시간, 빠뜨린 날짜</li>
    <li>진통소염제, 감기약, 스테로이드, 카페인·에너지 음료, 건강식품 사용 여부</li>
    <li>코골이, 주간 졸림, 새벽 두통, 체중 변화, 염분 섭취, 음주 패턴</li>
    <li>신장질환, 갑상선질환, 알도스테론 문제, 당뇨·지질 이상 평가 이력</li>
  </ul>
  <h4>왜 기록이 중요한가요?</h4>
  <p>혈압은 하루 중에도 크게 변합니다. 같은 사람도 잠을 못 잔 날, 짠 음식을 먹은 날, 통증이 있는 날, 약을 늦게 먹은 날에는 수치가 달라집니다. 기록이 없으면 “시술을 해야 하는 혈압”인지, 약 조합과 생활요인을 다시 조정해야 하는 혈압인지 구분하기 어렵습니다.</p>
  <p>특히 저항성 고혈압은 단순히 수치가 높다는 뜻이 아니라, 적절한 약물 조합과 생활요법을 했는데도 조절되지 않는 상태를 가리킵니다. 그래서 상담 전 기록은 시술 여부를 결정하기 위한 근거이자, 불필요한 시술 논의를 줄이는 안전장치입니다.</p>
  <h4>플로로탄닌 정보와 연결할 때 주의할 점</h4>
  <p>플로로탄닌은 감태 등 갈조류 유래 해양 폴리페놀로 항산화 연구에서 다뤄지지만, 혈압약이나 신장신경차단술을 대체하는 성분으로 설명하면 안 됩니다. 고혈압 콘텐츠에서는 혈압 기록, 복약 순응도, 2차성 원인 확인, 심혈관 위험 평가가 중심이어야 합니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>American College of Cardiology: Renal Denervation in Hypertension Care</li>
    <li>FDA: Paradise Ultrasound Renal Denervation System</li>
    <li>FDA PMA database: P220023</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 혈압약 조정, 2차성 고혈압 평가, 신장신경차단술 적합성은 담당 의료진과 결정해야 합니다.</p>
</div>`,
    tags: ['저항성고혈압', '신장신경차단술', 'RDN', '가정혈압', 'ABPM', '심혈관'],
    difficulty: 'advanced',
    views: 2552,
    likes: 172,
    related_insights: [
      '/insights/renal-denervation-resistant-hypertension-home-bp-abpm-record-2026',
      '/blog/renal-denervation-resistant-hypertension-home-bp-abpm-record-2026',
    ],
    references: [
      {
        title: 'ACC: Renal Denervation in Hypertension Care',
        url: 'https://www.acc.org/latest-in-cardiology/articles/2026/04/01/01/cover-story-renal-denervation',
      },
      {
        title: 'FDA: Paradise Ultrasound Renal Denervation System',
        url: 'https://www.fda.gov/medical-devices/recently-approved-devices/paradise-ultrasound-renal-denervation-system-p220023',
      },
      {
        title: 'FDA PMA: Paradise Ultrasound Renal Denervation System',
        url: 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P220023',
      },
    ],
  },
  {
    id: 'trend-tia-mini-stroke-fast-warning-symptom-time-record-20260603',
    category: 'neuro_cognitive',
    question: 'TIA 미니뇌졸중 증상이 사라졌다면 그래도 응급 상담이 필요한가요?',
    answer: `<div class="qa-structured">
  <p><strong>네. 증상이 사라졌더라도 TIA는 다음 뇌졸중을 알리는 경고 신호일 수 있어 응급 평가가 필요합니다.</strong> “잠깐 그랬다가 괜찮아졌다”는 이유로 기다리면, 실제 뇌졸중 예방에 필요한 시간을 놓칠 수 있습니다.</p>
  <p>CDC는 얼굴 처짐, 팔 힘 빠짐, 말 어눌함 같은 증상이 나타나면 빠르게 도움을 요청하라고 안내합니다. NINDS도 TIA를 뇌졸중과 같은 응급 신호로 보아야 한다고 설명합니다. 중요한 것은 지금 증상이 남아 있는지뿐 아니라, 언제 시작했고 언제 사라졌는지를 정확히 기억하는 것입니다.</p>
  <h4>FAST로 먼저 확인하세요</h4>
  <ul>
    <li><strong>Face:</strong> 한쪽 얼굴이 처지거나 웃을 때 비대칭이 있었는지</li>
    <li><strong>Arm:</strong> 한쪽 팔이나 다리에 힘이 빠졌는지, 물건을 떨어뜨렸는지</li>
    <li><strong>Speech:</strong> 말이 어눌했는지, 단어가 생각나지 않았는지, 말을 이해하기 어려웠는지</li>
    <li><strong>Time:</strong> 증상이 처음 시작된 시각, 마지막으로 정상으로 보였던 시각</li>
  </ul>
  <h4>응급 상담 때 도움이 되는 기록</h4>
  <ul>
    <li>증상이 시작된 시간과 사라진 시간</li>
    <li>한쪽 얼굴·팔·다리, 시야, 말, 균형 중 어느 부분이 문제였는지</li>
    <li>혈압, 혈당, 심방세동 또는 심장질환 이력</li>
    <li>항응고제·항혈소판제 복용 여부와 마지막 복용 시간</li>
    <li>최근 수술, 출혈, 머리 외상, 심한 두통 동반 여부</li>
    <li>같은 증상이 이전에도 반복됐는지</li>
  </ul>
  <h4>왜 “사라진 증상”도 위험한가요?</h4>
  <p>TIA는 혈류 장애가 일시적으로 회복되어 증상이 없어질 수 있습니다. 하지만 원인이 남아 있으면 다시 막히거나 더 큰 뇌졸중으로 이어질 수 있습니다. 검사에서는 뇌영상, 혈관 평가, 심전도, 심장 리듬, 혈액검사, 약물 조정이 필요할 수 있습니다.</p>
  <p>집에서 건강식품을 먹거나 휴식을 취하며 지켜보는 방식은 이 상황에 맞지 않습니다. 특히 갑자기 한쪽 힘이 빠지거나 말이 어눌해진 경우, 증상이 없어졌더라도 응급 평가를 받는 쪽이 안전합니다.</p>
  <h4>플로로탄닌 정보와 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 뇌졸중 예방, TIA 회복, 응급치료 대체 성분처럼 설명하면 안 됩니다. 뇌·인지 카테고리에서는 FAST, 증상 시작 시간, 혈압·혈당·심장 리듬 관리, 응급 진료 기준을 분명히 안내하는 것이 우선입니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>CDC: Signs and Symptoms of Stroke</li>
    <li>NINDS: Stroke Overview</li>
    <li>FDA: Stroke</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 뇌졸중 의심 증상은 사라졌더라도 즉시 응급 의료 상담이 필요할 수 있습니다.</p>
</div>`,
    tags: ['TIA', '미니뇌졸중', 'FAST', '뇌졸중', '고혈압', '뇌인지'],
    difficulty: 'advanced',
    views: 2548,
    likes: 171,
    related_insights: [
      '/insights/tia-mini-stroke-fast-warning-symptom-time-record-2026',
      '/blog/tia-mini-stroke-fast-warning-symptom-time-record-2026',
    ],
    references: [
      {
        title: 'CDC: Signs and Symptoms of Stroke',
        url: 'https://www.cdc.gov/stroke/signs-symptoms/index.html',
      },
      {
        title: 'NINDS: Stroke Overview',
        url: 'https://www.ninds.nih.gov/health-information/stroke/stroke-overview',
      },
      {
        title: 'FDA: Stroke',
        url: 'https://www.fda.gov/consumers/health-education-resources/stroke',
      },
    ],
  },
  {
    id: 'trend-immune-checkpoint-inhibitor-side-effect-organ-inflammation-record-20260603',
    category: 'cancer_immune',
    question: '면역항암제 치료 중 어떤 부작용 신호를 바로 기록하고 알려야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>면역항암제 치료 중에는 피부 발진만 보지 말고, 설사·기침·숨참·피로·체중 변화·황달·검사 수치 변화까지 함께 기록해야 합니다.</strong> 면역관문억제제는 면역 반응이 암뿐 아니라 정상 조직에도 영향을 줄 수 있어, 여러 장기의 염증 신호가 나타날 수 있습니다.</p>
  <p>NCI는 면역치료 부작용이 치료 중은 물론 치료 후에도 생길 수 있으며, 어떤 신호를 봐야 하는지 의료진과 미리 상의하라고 안내합니다. 장기 염증 자료에서는 대장염, 간염, 갑상선염, 폐렴, 심근염, 신장염, 신경계 염증처럼 다양한 장기가 영향을 받을 수 있다고 설명합니다.</p>
  <h4>바로 적어둘 신호</h4>
  <ul>
    <li>설사 횟수, 복통, 혈변 또는 검은 변, 발열</li>
    <li>새로 생긴 기침, 숨참, 흉통, 산소포화도 변화</li>
    <li>발진 범위, 물집, 가려움, 입안 통증, 피부 벗겨짐</li>
    <li>심한 피로, 추위 민감, 체중 증가·감소, 두근거림</li>
    <li>눈이나 피부가 노래짐, 진한 소변, 오른쪽 윗배 통증</li>
    <li>소변량 감소, 붓기, 심한 근육통·관절통, 손발 저림</li>
    <li>최근 검사에서 간수치, 갑상선수치, 혈당, 신장기능 변화가 있었는지</li>
  </ul>
  <h4>왜 기록이 치료에 도움이 되나요?</h4>
  <p>면역 관련 이상반응은 감염, 일반 항암 부작용, 기존 질환 악화와 겹쳐 보일 수 있습니다. 증상이 언제 시작됐는지, 몇 번째 투여 후였는지, 점점 심해지는지, 스테로이드나 항생제 사용 후 어떻게 변했는지 기록하면 의료진이 원인을 구분하는 데 도움이 됩니다.</p>
  <p>특히 하루 여러 번의 설사, 새로 생긴 숨참, 심한 발진이나 물집, 고열, 혼돈, 심한 복통, 흉통은 “다음 진료 때 말하기”로 미루지 않는 것이 안전합니다. 치료를 임의로 중단하거나 민간요법으로 버티기보다, 해당 종양내과 팀에 먼저 연락해야 합니다.</p>
  <h4>플로로탄닌 정보와 연결할 때 주의할 점</h4>
  <p>플로로탄닌은 해양 폴리페놀로 항산화·염증 반응 연구에서 다뤄지지만, 면역항암제 효과를 높이거나 면역 관련 부작용을 예방·치료하는 성분처럼 설명하면 안 됩니다. 항암·면역 콘텐츠에서는 증상 기록, 치료팀 연락 기준, 약물 상호작용 확인이 핵심입니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>NCI: Side Effects of Immunotherapy</li>
    <li>NCI: Immunotherapy and Organ-Related Inflammation</li>
    <li>ASCO: Management of Immune-Related Adverse Events Guideline Update</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 면역항암제 치료 중 새 증상이 생기면 담당 종양내과 의료진에게 알려야 합니다.</p>
</div>`,
    tags: ['면역항암제', '면역관문억제제', 'irAE', '부작용기록', '장기염증', '항암면역'],
    difficulty: 'advanced',
    views: 2544,
    likes: 170,
    related_insights: [
      '/insights/immune-checkpoint-inhibitor-side-effect-organ-inflammation-record-2026',
      '/blog/immune-checkpoint-inhibitor-side-effect-organ-inflammation-record-2026',
    ],
    references: [
      {
        title: 'NCI: Side Effects of Immunotherapy',
        url: 'https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/side-effects',
      },
      {
        title: 'NCI: Immunotherapy and Organ-Related Inflammation',
        url: 'https://www.cancer.gov/about-cancer/treatment/side-effects/organ-inflammation',
      },
      {
        title: 'ASCO: Management of Immune-Related Adverse Events Guideline Update',
        url: 'https://ascopubs.org/doi/10.1200/JCO.21.01440',
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
        '카테고리 순환 최신 보강. 공식 가이드라인과 공중보건 자료를 반영하고 치료·예방 보장 표현을 배제함.',
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

const data = loadJson(path.join(ROOT, 'public/qa.json'))
console.log(`questions ${data.questions.length} updatedAt ${data.updatedAt}`)
for (const id of questions.map((item) => item.id)) {
  const item = data.questions.find((question) => question.id === id)
  console.log(`${item.category} ${item.question} ${String(item.answer || '').length}`)
}
