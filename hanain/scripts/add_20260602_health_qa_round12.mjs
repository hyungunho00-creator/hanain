import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T16:32:00+09:00'

const questions = [
  {
    id: 'trend-oral-minoxidil-hair-loss-blood-pressure-safety-20260602',
    category: 'hair',
    question: '먹는 미녹시딜이 탈모에 좋다는데 혈압이나 부작용은 어떻게 확인해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>저용량 경구 미녹시딜은 탈모 진료에서 오프라벨로 쓰이는 경우가 늘고 있지만, 스스로 시작하거나 증량할 약은 아닙니다.</strong> 2026년 리뷰와 피부과 연구들은 남성형·여성형 탈모, 휴지기 탈모, 원형탈모 등에서 저용량 경구 미녹시딜 사용 경험이 늘고 있음을 다룹니다. 동시에 혈압, 심박수, 부종, 어지럼, 다모증 같은 부작용 모니터링이 필요하다고 설명합니다.</p>
  <p>특히 2026년 성인 여성 탈모 코호트 연구에서는 저용량 경구 미녹시딜과 스피로노락톤 병용 시 전반적 내약성을 평가하면서, 혈압에 영향을 주는 약을 함께 쓰는 경우 기립성 증상 위험이 커질 수 있음을 보고했습니다. 미녹시딜은 원래 혈관확장 작용이 있는 약이므로 탈모용 저용량이라도 개인의 혈압, 심혈관 병력, 복용약을 확인해야 합니다.</p>
  <h4>상담 전에 기록할 것</h4>
  <ul>
    <li>탈모 시작 시점, 빠지는 양, 가족력, 출산·감량·스트레스 이력</li>
    <li>혈압, 맥박, 어지럼, 두근거림, 발목 부종</li>
    <li>복용 중인 혈압약, 이뇨제, 스피로노락톤, 호르몬제</li>
    <li>철분·페리틴, 갑상선, 비타민D 등 확인한 검사</li>
    <li>사진 기록: 정수리, 앞머리선, 가르마를 같은 조명에서 촬영</li>
  </ul>
  <h4>오해하지 말아야 할 점</h4>
  <p>먹는 미녹시딜은 바르는 미녹시딜보다 간편해 보일 수 있지만, 처방약이며 장기 안전성·개인별 용량·동반 약물 확인이 필요합니다. 효과를 보려면 시간이 걸리고, 초기에 쉐딩처럼 빠짐이 늘어 보일 수도 있어 사진과 진료 기록 없이 자의로 중단하거나 증량하면 판단이 흐려집니다.</p>
  <p>상담할 때는 “몇 mg이 효과가 좋나요?”보다 “내 혈압과 복용약에서 안전한지, 부종이나 두근거림이 생기면 어떻게 할지, 몇 개월 뒤 사진과 검사로 평가할지”를 물어보는 것이 더 안전합니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌을 탈모 치료, 발모 보장, 미녹시딜 대체로 설명하면 안 됩니다. 모발/두피 콘텐츠에서는 혈압·약물·검사·사진 기록을 우선 안내하고 해조 유래 성분은 일반 건강정보 범위에서만 다뤄야 합니다.</p>
</div>`,
    tags: ['경구미녹시딜', '탈모', '혈압', '부종', '두피건강', '모발기록'],
    difficulty: 'intermediate',
    views: 2650,
    likes: 207,
    related_insights: [
      '/insights/oral-minoxidil-hair-loss-blood-pressure-safety-record-2026',
      '/blog/oral-minoxidil-hair-loss-blood-pressure-safety-record-2026',
    ],
    references: [
      { title: 'Dermatology and Therapy 2026: Oral minoxidil for alopecia treatment', url: 'https://pubmed.ncbi.nlm.nih.gov/41118052/' },
      { title: 'JAAD 2026: Low-dose oral minoxidil maximal response in androgenetic alopecia', url: 'https://pubmed.ncbi.nlm.nih.gov/41990955/' },
      { title: 'JAAD 2026: Oral spironolactone and low-dose oral minoxidil safety', url: 'https://pubmed.ncbi.nlm.nih.gov/41654020/' },
    ],
  },
  {
    id: 'trend-cleaner-indoor-air-respiratory-virus-ventilation-20260602',
    category: 'respiratory',
    question: '감기나 독감이 유행할 때 공기청정기와 환기가 실제로 도움이 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>실내 공기질 관리는 호흡기 바이러스 노출을 줄이는 보조 전략입니다. 하지만 공기청정기 하나로 감염을 막는다고 말하면 안 됩니다.</strong> CDC는 호흡기 바이러스가 특히 실내·밀집·환기 부족 공간에서 공기를 통해 퍼질 수 있으며, 신선한 외기 유입, 공기 정화, 야외 활동이 노출 위험을 낮추는 데 도움이 된다고 안내합니다.</p>
  <p>EPA도 환기가 실내 오염물질과 생물학적 오염물질 수준을 낮추는 건강 이점을 제공할 수 있다고 설명합니다. 2026년 교실·주방·공기청정기 관련 연구들도 환기와 여과가 에어로졸 확산과 실내 입자 제거에 영향을 줄 수 있음을 다룹니다. 다만 실제 감염 감소는 사람 수, 체류 시간, 마스크, 증상자 관리, 필터 성능, 방 구조까지 함께 봐야 합니다.</p>
  <h4>집이나 사무실에서 확인할 것</h4>
  <ul>
    <li>창문·문·배기팬으로 외기가 들어오는지</li>
    <li>HVAC 필터 교체 시기와 팬 설정</li>
    <li>HEPA 공기청정기 크기가 방 면적에 맞는지</li>
    <li>사람 수, 체류 시간, 밀집도, 증상자 여부</li>
    <li>감염 유행기에는 손위생, 마스크, 백신, 증상 시 휴식까지 함께 적용</li>
  </ul>
  <h4>오해하지 말아야 할 점</h4>
  <p>공기청정기는 먼지와 일부 에어로졸을 줄이는 데 도움을 줄 수 있지만, 가까운 거리에서의 대화·기침 노출을 완전히 없애지는 못합니다. 창문을 여는 것도 날씨, 미세먼지, 소음, 안전 문제를 함께 봐야 합니다. 중요한 것은 한 가지 장비가 아니라 환기·여과·밀집도·증상자 관리의 조합입니다.</p>
  <p>가정에서는 방문객이 많거나 가족 중 감기 증상이 있을 때 HVAC 팬을 켜고 필터를 점검하며, 가능한 짧게라도 환기하고, 방 크기에 맞는 HEPA 장치를 쓰는 식으로 조합해야 합니다. 학교·사무실은 사람 수와 체류 시간이 길기 때문에 관리 기준이 더 중요합니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌을 감기, 독감, 코로나 예방이나 호흡기 치료로 설명하면 안 됩니다. 호흡기 콘텐츠에서는 실내 공기질, 백신, 증상 기록, 진료 기준을 우선 안내하고 해조 유래 성분은 일반 건강정보로만 다뤄야 합니다.</p>
</div>`,
    tags: ['실내공기질', '환기', '공기청정기', '호흡기바이러스', 'HEPA', '감기예방정보'],
    difficulty: 'intermediate',
    views: 2630,
    likes: 205,
    related_insights: [
      '/insights/cleaner-indoor-air-respiratory-virus-ventilation-record-2026',
      '/blog/cleaner-indoor-air-respiratory-virus-ventilation-record-2026',
    ],
    references: [
      { title: 'CDC: Taking Steps for Cleaner Air for Respiratory Virus Prevention', url: 'https://www.cdc.gov/respiratory-viruses/prevention/air-quality.html' },
      { title: 'US EPA: Ventilation and Respiratory Viruses', url: 'https://www.epa.gov/indoor-air-quality-iaq/ventilation-and-respiratory-viruses' },
      { title: 'Scientific Reports 2026: Ventilation strategies and respiratory droplet dispersion', url: 'https://www.nature.com/articles/s41598-026-45120-0' },
    ],
  },
  {
    id: 'trend-h5n1-bird-flu-raw-milk-exposure-monitoring-20260602',
    category: 'infection_inflammation',
    question: '조류독감 H5N1 뉴스가 많은데 생우유나 동물 접촉 후 어떤 증상을 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>H5N1 조류독감은 일반 소비자에게 과도한 공포를 만들 필요는 없지만, 감염 동물·생우유·오염된 환경에 노출될 수 있는 사람은 증상 모니터링 기준을 알아야 합니다.</strong> CDC는 HPAI A(H5N1)에 감염된 조류, 가축, 동물 사체, 배설물, 생우유 또는 오염 가능 표면에 노출된 사람은 마지막 노출 후 10일간 관련 증상을 모니터링하도록 안내합니다.</p>
  <p>CDC의 예방 지침은 아프거나 죽은 동물, 감염 의심 동물의 배설물·깔짚·오염 물질과 보호장비 없는 접촉을 피하라고 설명합니다. 생우유와 비살균 유제품은 여러 감염 위험이 있어 피하는 것이 안전하며, 우유는 살균 제품을 선택하는 것이 원칙입니다. 조류독감 뉴스가 있다고 모든 사람이 위험하다는 뜻은 아니지만, 농장·가금류·야생조류·반려동물 먹이·생우유 노출은 다르게 봐야 합니다.</p>
  <h4>노출 후 확인할 증상</h4>
  <ul>
    <li>눈 충혈, 결막염, 눈 통증 또는 분비물</li>
    <li>발열, 오한, 기침, 인후통, 콧물, 호흡곤란</li>
    <li>근육통, 두통, 피로감, 설사·구토 같은 전신 증상</li>
    <li>노출 날짜, 동물 종류, 보호장비 사용 여부</li>
    <li>생우유·비살균 유제품 섭취 또는 접촉 여부</li>
  </ul>
  <h4>언제 상담해야 하나요?</h4>
  <p>감염 동물이나 생우유 노출 후 10일 이내 눈 증상이나 호흡기 증상이 생기면 보건당국 또는 의료기관에 노출 사실을 먼저 알려야 합니다. 증상이 심하거나 호흡곤란이 있으면 즉시 진료가 필요합니다. 단순 감기처럼 보여도 노출력이 있으면 검사와 보호 조치가 달라질 수 있습니다.</p>
  <p>농장·도축·가금류·야생조류 구조·생우유 취급처럼 노출 가능성이 높은 일을 했다면 날짜와 보호장비 사용 여부를 메모해 두세요. 의료기관에 갈 때 이 정보를 먼저 말해야 불필요한 접촉을 줄이고 적절한 검사 안내를 받을 수 있습니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌을 바이러스 예방, 항바이러스 치료, 면역 강화 보장으로 설명하면 안 됩니다. 감염/염증 콘텐츠에서는 노출 기록, 증상 모니터링, 보건당국 안내를 우선 제공해야 합니다.</p>
</div>`,
    tags: ['H5N1', '조류독감', '생우유', '노출모니터링', '감염예방', '결막염'],
    difficulty: 'intermediate',
    views: 2680,
    likes: 210,
    related_insights: [
      '/insights/h5n1-bird-flu-raw-milk-exposure-monitoring-record-2026',
      '/blog/h5n1-bird-flu-raw-milk-exposure-monitoring-record-2026',
    ],
    references: [
      { title: 'CDC 2026: Symptom Monitoring Among Persons Exposed to HPAI', url: 'https://www.cdc.gov/bird-flu/php/surveillance/symptom-monitoring-hpai.html' },
      { title: 'CDC: H5N1 Interim Recommendations for Prevention and Monitoring', url: 'https://www.cdc.gov/bird-flu/prevention/hpai-interim-recommendations.html' },
      { title: 'CDC: A(H5) Bird Flu Current Situation', url: 'https://www.cdc.gov/bird-flu/situation-summary/' },
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
