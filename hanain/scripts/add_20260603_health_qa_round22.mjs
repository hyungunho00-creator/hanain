import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-03T05:40:00+09:00'

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
    id: 'trend-respiratory-virus-vaccine-covid-flu-rsv-record-20260603',
    category: 'respiratory',
    question: '2025-26 시즌 코로나·독감·RSV 백신 상담 전에 무엇을 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>호흡기 백신 상담은 “무엇을 맞을까”보다 나이, 기저질환, 이전 접종일, 최근 감염일을 한 장에 정리하는 것에서 시작합니다.</strong> CDC는 2025-26 호흡기 바이러스 시즌에서 코로나19, 독감, RSV 보호 전략을 각각의 위험도에 맞춰 안내합니다.</p>
  <p>독감은 생후 6개월 이상에서 계절 접종이 기본이고, 코로나19와 RSV는 연령, 임신 여부, 중증 위험도, 이전 접종 이력에 따라 상담 내용이 달라질 수 있습니다.</p>
  <h4>상담 전 기록할 것</h4>
  <ul>
    <li>작년 독감, 코로나19, RSV 백신 접종일</li>
    <li>최근 코로나19 감염일과 회복 상태</li>
    <li>천식, COPD, 심부전, 당뇨, 만성콩팥병, 면역저하 여부</li>
    <li>임신 여부, 영아·고령 가족 동거 여부</li>
    <li>이전 백신 후 알레르기 반응이나 실신 경험</li>
  </ul>
  <h4>주의할 점</h4>
  <p>플로로탄닌을 감기, 독감, 코로나19, RSV 예방 성분처럼 설명하면 안 됩니다. 백신과 치료 판단은 의료진 상담이 우선입니다.</p>
</div>`,
    tags: ['호흡기백신', '코로나19', '독감', 'RSV', 'CDC', '접종기록'],
    difficulty: 'intermediate',
    views: 2604,
    likes: 184,
    related_insights: [
      '/insights/respiratory-virus-vaccine-2025-2026-covid-flu-rsv-record-2026',
      '/blog/respiratory-virus-vaccine-2025-2026-covid-flu-rsv-record-2026',
    ],
    references: [
      {
        title: 'CDC: Clinical Overview of Respiratory Illnesses',
        url: 'https://www.cdc.gov/respiratory-viruses/hcp/clinical-overview/index.html',
      },
      {
        title: 'CDC: 2025-2026 COVID-19 Vaccination Guidance',
        url: 'https://www.cdc.gov/covid/hcp/vaccine-considerations/routine-guidance.html',
      },
    ],
  },
  {
    id: 'trend-candida-auris-hospital-infection-resistance-record-20260603',
    category: 'infection_inflammation',
    question: '칸디다 아우리스는 왜 병원 감염과 항진균제 내성 이슈로 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>칸디다 아우리스는 건강식품이나 개인 위생만으로 해결할 주제가 아니라 의료기관 감염관리와 항진균제 감수성 판단이 중요한 진균입니다.</strong> CDC는 C. auris가 의료기관에서 전파될 수 있고 일부 환자에게 심각한 감염을 일으킬 수 있다고 안내합니다.</p>
  <p>특히 장기 입원, 중환자실, 요양시설, 중심정맥관, 기관절개, 최근 항생제·항진균제 사용 이력이 있으면 더 주의해야 합니다.</p>
  <h4>보호자와 환자가 기록할 것</h4>
  <ul>
    <li>최근 장기 입원, 중환자실, 요양시설 이용 여부</li>
    <li>중심정맥관, 도뇨관, 기관절개, 상처 드레싱 여부</li>
    <li>최근 항생제·항진균제 사용 이력</li>
    <li>C. auris 양성 또는 접촉자 통보 여부</li>
    <li>퇴원 후 다른 병원이나 시설로 이동할 예정인지</li>
  </ul>
  <h4>주의할 점</h4>
  <p>플로로탄닌을 C. auris 억제, 항진균 치료, 병원감염 예방 성분처럼 설명하면 안 됩니다. 감염관리는 의료기관 지침을 따라야 합니다.</p>
</div>`,
    tags: ['칸디다아우리스', 'Candida auris', '병원감염', '항진균제내성', '감염관리'],
    difficulty: 'advanced',
    views: 2601,
    likes: 183,
    related_insights: [
      '/insights/candida-auris-hospital-infection-antifungal-resistance-record-2026',
      '/blog/candida-auris-hospital-infection-antifungal-resistance-record-2026',
    ],
    references: [
      {
        title: 'CDC: Clinical Overview of Candida auris',
        url: 'https://www.cdc.gov/candida-auris/hcp/clinical-overview/index.html',
      },
      {
        title: 'CDC EID 2026: Updated Genomic Epidemiologic Description of Candida auris',
        url: 'https://wwwnc.cdc.gov/eid/article/32/5/25-0760_article',
      },
    ],
  },
  {
    id: 'trend-home-led-red-light-mask-fda-cleared-skin-safety-20260603',
    category: 'skin',
    question: '홈 LED·레드라이트 마스크는 FDA cleared라고 쓰여 있으면 효과가 보장되나요?',
    answer: `<div class="qa-structured">
  <p><strong>아닙니다. FDA approved, cleared, registered는 같은 말이 아니며, “cleared”가 모든 피부 효과를 보장한다는 뜻도 아닙니다.</strong> AAD는 레드라이트 치료가 일부 피부 문제에서 연구되고 있지만, 모든 사람에게 같은 결과가 나는 방식으로 이해하면 안 된다고 설명합니다.</p>
  <p>소비자는 후기보다 제품명, 모델명, 표시된 적응증, 파장, 사용 시간, 피부 반응을 먼저 기록해야 합니다.</p>
  <h4>사용 전 확인할 것</h4>
  <ul>
    <li>제품명, 모델명, 제조사, FDA cleared 여부와 적응증</li>
    <li>파장 정보: red, near-infrared, blue light 등</li>
    <li>사용 시간, 주당 사용 횟수, 피부 반응</li>
    <li>레티노이드, AHA/BHA, 여드름약, 광과민 약물 사용 여부</li>
    <li>기미, 색소침착, 주사피부염, 피부암 병력</li>
  </ul>
  <h4>주의할 점</h4>
  <p>플로로탄닌을 LED 효과 강화, 색소침착 치료, 피부 노화 회복 성분처럼 설명하면 안 됩니다. 피부 반응과 자극 기록이 먼저입니다.</p>
</div>`,
    tags: ['LED마스크', '레드라이트', 'FDA cleared', '광생체조절', '피부안전'],
    difficulty: 'intermediate',
    views: 2598,
    likes: 182,
    related_insights: [
      '/insights/home-led-red-light-mask-fda-cleared-skin-safety-record-2026',
      '/blog/home-led-red-light-mask-fda-cleared-skin-safety-record-2026',
    ],
    references: [
      {
        title: 'AAD: Is red light therapy right for your skin?',
        url: 'https://www.aad.org/public/cosmetic/safety/red-light-therapy',
      },
      {
        title: 'FDA: Are There FDA Registered or FDA Certified Medical Devices?',
        url: 'https://www.fda.gov/medical-devices/consumers-medical-devices/are-there-fda-registered-or-fda-certified-medical-devices-how-do-i-know-what-fda-approved',
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
        '카테고리 순환 최신 보강. 공식기관 근거를 반영하고 치료·예방 보장 표현을 배제함.',
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
