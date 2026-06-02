import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T23:25:00+09:00'

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
    id: 'trend-indoor-co2-ventilation-hepa-respiratory-virus-20260602',
    category: 'respiratory',
    question: '실내 CO2 수치가 높으면 감기나 독감 같은 호흡기 감염 위험도 높다고 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>CO2 수치는 바이러스 수치를 직접 재는 검사가 아니라, 실내 환기가 충분한지 가늠하는 신호로 봐야 합니다.</strong> CDC와 EPA는 호흡기 바이러스가 실내·밀집·공기 흐름이 나쁜 공간에서 더 쉽게 퍼질 수 있고, 외부 공기 유입, 공기정화, HEPA 공기청정기, HVAC 필터 관리가 위험을 낮추는 데 도움이 된다고 설명합니다. 다만 환기 하나만으로 감염을 완전히 막는다는 뜻은 아닙니다.</p>
  <p>소비자가 자주 하는 오해는 “CO2가 낮으면 안전하다” 또는 “공기청정기만 켜면 충분하다”입니다. 실제로는 사람 수, 머무는 시간, 창문·문 개방, 환기 설비, 필터 등급, 기침하는 사람이 있는지, 지역 호흡기 유행 정도를 같이 봐야 합니다. CO2 측정기는 의사결정을 돕는 도구이지 진단 장비가 아닙니다.</p>
  <h4>집·사무실·교실에서 기록할 것</h4>
  <ul>
    <li>사람 수와 머무는 시간</li>
    <li>CO2가 올라가는 시간대와 환기 후 내려가는 속도</li>
    <li>창문 개방, 배기팬, 환기장치, 공기청정기 사용 여부</li>
    <li>필터 교체일, HEPA 공기청정기 위치, 문을 닫은 회의 시간</li>
    <li>기침·발열자가 있었는지, 지역 호흡기 유행이 높은 시기인지</li>
  </ul>
  <h4>우선순위</h4>
  <p>가능하면 외부 공기를 들이고, 실내 활동 시간을 줄이며, 사람이 많은 방은 HEPA 공기청정기나 HVAC 필터를 보강합니다. CDC는 조직이 5회/시간 이상의 깨끗한 공기 교환을 목표로 삼을 수 있다고 안내합니다. 단, 미세먼지·폭염·한파·습도가 심한 날에는 무조건 창문을 여는 방식보다 공기정화와 필터 보강이 더 현실적일 수 있습니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 호흡기 감염 예방 성분처럼 설명하면 안 됩니다. 이 주제에서는 산화스트레스와 해양 폴리페놀 연구 흐름을 배경 정보로만 두고, 실제 행동은 환기·필터·손위생·증상 시 휴식·의료 상담을 중심에 둡니다.</p>
</div>`,
    tags: ['실내공기', 'CO2', '환기', 'HEPA', '호흡기감염', '공기청정기', '플로로탄닌'],
    difficulty: 'intermediate',
    views: 2664,
    likes: 201,
    related_insights: [
      '/insights/indoor-co2-ventilation-hepa-respiratory-virus-record-2026',
      '/blog/indoor-co2-ventilation-hepa-respiratory-virus-record-2026',
    ],
    references: [
      {
        title: 'CDC: Taking Steps for Cleaner Air for Respiratory Virus Prevention',
        url: 'https://www.cdc.gov/respiratory-viruses/prevention/air-quality.html',
      },
      {
        title: 'EPA: Ventilation and Respiratory Viruses',
        url: 'https://www.epa.gov/indoor-air-quality-iaq/ventilation-and-respiratory-viruses',
      },
    ],
  },
  {
    id: 'trend-norovirus-handwashing-bleach-hydration-outbreak-20260602',
    category: 'infection_inflammation',
    question: '노로바이러스는 손소독제로 안 잡힌다던데, 가족끼리 계속 옮을 때 무엇부터 해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>노로바이러스가 의심될 때는 손소독제보다 비누와 물로 20초 이상 손씻기가 우선입니다.</strong> CDC는 손소독제를 손씻기에 추가로 쓸 수는 있지만 대체할 수 없다고 설명합니다. 노로바이러스는 구토·설사 전후로 퍼질 수 있고, 증상이 나아진 뒤에도 대변에서 2주 이상 바이러스가 나올 수 있어 가족 내 재전파가 흔합니다.</p>
  <p>핵심은 “누가 아팠는지”보다 “구토·설사 후 어느 표면과 세탁물이 오염됐는지”를 빠르게 정리하는 것입니다. CDC는 구토나 설사가 있던 곳을 즉시 닦고 소독하며, 염소계 표백제 용액 또는 노로바이러스에 등록된 EPA 소독제를 사용하라고 안내합니다. 아픈 사람은 증상이 멈춘 뒤 최소 48시간 동안 음식 준비나 돌봄을 피하는 것이 좋습니다.</p>
  <h4>가정에서 바로 할 일</h4>
  <ul>
    <li>화장실 사용·기저귀 교체·식사 준비 전후 비누와 물로 손씻기</li>
    <li>구토·설사 오염 부위는 장갑을 끼고 닦은 뒤 소독</li>
    <li>오염된 옷·침구는 흔들지 말고 세제와 가능한 뜨거운 물로 세탁</li>
    <li>증상 종료 후 48시간 동안 음식 준비, 어린이·고령자 돌봄 피하기</li>
    <li>소변량 감소, 어지럼, 입마름, 고열, 혈변, 지속 구토는 의료 상담</li>
  </ul>
  <h4>탈수 기록이 중요합니다</h4>
  <p>노로바이러스는 대부분 며칠 안에 좋아지지만, 어린이·고령자·기저질환자는 탈수가 더 위험합니다. 물만 억지로 많이 마시기보다 소량씩 자주, 구토가 잦으면 경구수분보충액을 고려하고, 소변량·맥박·어지럼·입마름을 기록해 의료 상담 시 보여주는 것이 좋습니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 노로바이러스 예방·치료 성분처럼 설명하면 안 됩니다. 이 콘텐츠에서는 감염 전파 차단, 손씻기, 표면 소독, 수분 보충을 우선으로 안내하고, 해양 폴리페놀은 일반적인 건강소재 배경 정도로만 다룹니다.</p>
</div>`,
    tags: ['노로바이러스', '손씻기', '표면소독', '탈수', '구토', '설사', '감염관리'],
    difficulty: 'intermediate',
    views: 2656,
    likes: 199,
    related_insights: [
      '/insights/norovirus-handwashing-bleach-hydration-outbreak-record-2026',
      '/blog/norovirus-handwashing-bleach-hydration-outbreak-record-2026',
    ],
    references: [
      {
        title: 'CDC: How to Prevent Norovirus',
        url: 'https://www.cdc.gov/norovirus/prevention/index.html',
      },
      {
        title: 'CDC Yellow Book 2026: Norovirus',
        url: 'https://www.cdc.gov/yellow-book/hcp/travel-associated-infections-diseases/norovirus.html',
      },
    ],
  },
  {
    id: 'trend-fermented-food-probiotics-gut-microbiome-safety-20260602',
    category: 'digestive',
    question: '김치나 요거트를 먹으면 프로바이오틱스 영양제를 안 먹어도 장 건강에 충분한가요?',
    answer: `<div class="qa-structured">
  <p><strong>발효식품과 프로바이오틱스는 겹치는 부분이 있지만 같은 말은 아닙니다.</strong> ISAPP 합의문은 발효식품이 미생물 성장과 효소 전환을 통해 만들어진 식품이라고 정리하지만, 모든 발효식품이 프로바이오틱스라고 보기는 어렵습니다. 프로바이오틱스는 살아 있는 미생물이 충분한 양으로 들어 있고, 특정 균주 수준에서 건강효과 근거가 있어야 합니다.</p>
  <p>김치, 요거트, 케피어, 된장, 사워도우처럼 발효 과정을 거친 식품은 식단 다양성과 장내미생물 연구 흐름에서 관심이 큽니다. 하지만 가열, 살균, 저장 방식에 따라 살아 있는 미생물 수가 달라질 수 있고, 어떤 균주가 얼마나 들어 있는지 소비자가 알기 어려운 경우도 많습니다. 반대로 영양제도 제품별 균주·용량·근거가 제각각이라 “무조건 좋다”고 말할 수 없습니다.</p>
  <h4>구분해서 볼 것</h4>
  <ul>
    <li>제품에 살아 있는 균이 표시돼 있는지</li>
    <li>균주명이 종 이름을 넘어 strain 수준까지 적혀 있는지</li>
    <li>가열·살균 처리로 미생물이 사라진 제품인지</li>
    <li>당류, 나트륨, 매운맛, 히스타민 반응이 내 장에 맞는지</li>
    <li>면역저하, 중증 질환, 미숙아, 항암치료 중이면 의료진 상담이 필요한지</li>
  </ul>
  <h4>실제 식단에서는 이렇게 접근합니다</h4>
  <p>장 건강은 특정 제품 하나보다 식이섬유, 채소·콩·통곡물, 수면, 스트레스, 항생제 사용, 규칙적인 식사와 함께 움직입니다. 발효식품은 소량부터 시작하고, 복부팽만·설사·두드러기·속쓰림이 반복되면 종류와 양을 바꾸거나 상담해야 합니다. 프로바이오틱스 영양제는 목적, 균주, 복용 기간을 정해 보는 편이 좋습니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 장 질환 치료제처럼 설명하면 안 됩니다. 해양 폴리페놀과 장내미생물·대사 연구는 흥미로운 배경이지만, 소비자에게는 “균주·식이섬유·발효식품·안전성 기록”을 구분해 안내하는 것이 신뢰에 더 중요합니다.</p>
</div>`,
    tags: ['발효식품', '프로바이오틱스', '장내미생물', '장건강', '김치', '요거트', '안전성'],
    difficulty: 'intermediate',
    views: 2648,
    likes: 197,
    related_insights: [
      '/insights/fermented-food-probiotics-gut-microbiome-safety-record-2026',
      '/blog/fermented-food-probiotics-gut-microbiome-safety-record-2026',
    ],
    references: [
      {
        title: 'ISAPP: Consensus statement on fermented foods',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7925329/',
      },
      {
        title: 'NIH NCCIH: Probiotics usefulness and safety',
        url: 'https://www.nccih.nih.gov/health/probiotics-usefulness-and-safety',
      },
      {
        title: 'NIH ODS: Probiotics fact sheet for health professionals',
        url: 'https://ods.od.nih.gov/factsheets/Probiotics-HealthProfessional/',
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
