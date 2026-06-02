import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T15:20:00+09:00'

const questions = [
  {
    id: 'trend-measles-mmr-vitamin-a-outbreak-20260602',
    category: 'infection_inflammation',
    question: '홍역 유행 때 비타민A를 먹으면 예방이 되나요, MMR 접종 기록을 먼저 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>홍역 예방은 비타민A가 아니라 MMR 접종 기록 확인이 핵심입니다.</strong> 홍역은 전염력이 매우 강한 감염병이고, CDC는 예방을 위해 MMR 백신 접종을 안내합니다. 유행 지역 노출이 있거나 접종 기록이 불확실하면 보건소나 의료진에게 본인 상황을 확인하는 것이 먼저입니다.</p>
  <p>비타민A는 홍역에 걸린 뒤 의료진 판단 아래 쓰일 수 있는 보조 처치로 이해해야 합니다. American Academy of Pediatrics도 비타민A가 홍역을 예방하지 못하며, MMR 백신이 예방의 핵심이라고 설명합니다. 집에서 고용량 비타민A를 임의로 먹이는 정보는 위험할 수 있습니다.</p>
  <h4>왜 연락 후 방문해야 하나요?</h4>
  <p>홍역은 전염력이 높아 대기실, 학교, 가족 모임에서 추가 노출이 생길 수 있습니다. 발열과 발진이 있으면서 홍역 노출 가능성이 있으면 병원에 그냥 들어가기보다 먼저 전화해 이동 동선과 진료 방식을 안내받는 것이 안전합니다. 특히 영유아, 임신부, 면역저하자가 주변에 있으면 노출 기록이 더 중요합니다.</p>
  <h4>가정에서 착각하기 쉬운 점</h4>
  <p>홍역은 일반 감기 발진처럼 가볍게 넘길 수 있는 질환이 아닙니다. 발진이 보이기 전부터 전파 가능성이 있고, 같은 공간에 머문 사람에게도 노출 문제가 생길 수 있습니다. 그래서 “열이 떨어졌으니 괜찮다”보다 접종력, 노출 장소, 증상 순서를 정리하는 것이 중요합니다.</p>
  <h4>먼저 확인할 것</h4>
  <ul>
    <li>본인과 아이의 MMR 접종 횟수와 접종 기록</li>
    <li>유행 지역 방문, 학교·지역사회 노출 가능성</li>
    <li>발열, 기침, 콧물, 결막염, 발진 시작일</li>
    <li>영유아, 임신부, 면역저하자 같은 고위험 여부</li>
    <li>의심 증상이 있을 때 의료기관 방문 전 연락 여부</li>
  </ul>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌은 홍역 예방이나 치료를 보장한다고 설명하면 안 됩니다. 감염/염증 콘텐츠에서는 백신 기록, 노출 기록, 증상 시작일, 의료기관 연락 기준을 먼저 안내해야 사이트 신뢰도가 지켜집니다. “면역을 올리면 홍역을 막는다” 같은 표현도 피해야 합니다. 소비자가 바로 행동할 수 있는 정보는 접종 확인과 노출 관리입니다.</p>
</div>`,
    tags: ['홍역', 'MMR', '비타민A', '감염예방', '백신기록', '발열발진'],
    difficulty: 'intermediate',
    views: 2310,
    likes: 177,
    related_insights: [
      '/insights/measles-mmr-vitamin-a-outbreak-check-2026',
      '/blog/measles-mmr-vitamin-a-outbreak-check-2026',
    ],
    references: [
      { title: 'CDC: Measles vaccination', url: 'https://www.cdc.gov/measles/vaccines/index.html' },
      { title: 'AAP: Vitamin A does not prevent measles', url: 'https://www.aap.org/en/news-room/fact-checked/fact-checked-vitamin-a-does-not-prevent-measles/' },
    ],
  },
  {
    id: 'trend-rsv-vaccine-older-adults-risk-20260602',
    category: 'respiratory',
    question: 'RSV 백신은 75세 이상만 맞는 건가요, 50대도 폐질환이 있으면 상담해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>RSV 백신은 나이만으로 끝나는 문제가 아니라 중증 RSV 위험을 함께 봐야 합니다.</strong> CDC는 성인 RSV 백신 안내에서 75세 이상 모든 성인과, 중증 RSV 위험이 높은 50~74세 성인에게 RSV 백신 1회 접종을 권고합니다.</p>
  <p>RSV는 감기처럼 시작할 수 있지만 고령자, 만성폐질환자, 심장질환자, 면역저하자에게는 폐렴과 입원 위험으로 이어질 수 있습니다. 그래서 50대라도 COPD, 천식, 심부전, 관상동맥질환, 면역억제 치료, 요양시설 거주 같은 위험요인이 있으면 상담할 이유가 있습니다.</p>
  <h4>감기와 무엇이 다르게 위험한가요?</h4>
  <p>RSV는 건강한 성인에게는 가볍게 지나갈 수 있지만, 폐와 심장이 약한 사람에게는 숨참, 쌕쌕거림, 산소포화도 저하, 기저질환 악화로 이어질 수 있습니다. 이미 증상이 있는 상태에서 백신을 맞는 문제가 아니라, 중증 위험을 줄이기 위해 시즌 전에 접종 여부를 상담하는 것이 핵심입니다.</p>
  <h4>같이 맞는 백신 일정도 정리하세요</h4>
  <p>고령자와 기저질환자는 RSV뿐 아니라 독감, 코로나, 폐렴구균 백신 일정도 함께 관리하는 경우가 많습니다. 어떤 백신을 언제 맞았는지 모르면 상담이 길어지고 중복 걱정도 커집니다. 접종 날짜와 부작용 경험을 적어두면 의료진이 더 정확히 판단할 수 있습니다.</p>
  <h4>상담 전 기록할 것</h4>
  <ul>
    <li>나이와 이전 RSV 백신 접종 여부</li>
    <li>COPD, 천식, 심부전, 관상동맥질환 같은 기저질환</li>
    <li>면역억제제, 항암치료, 장기이식, 고용량 스테로이드 사용 여부</li>
    <li>최근 호흡기 감염 때 호흡곤란, 쌕쌕거림, 산소포화도 저하 여부</li>
    <li>독감·코로나 백신 일정과 같은 날 접종 상담 필요성</li>
  </ul>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌은 RSV 감염을 예방하거나 치료한다고 말하면 안 됩니다. 호흡기 콘텐츠는 백신 대상자, 위험요인, 증상 악화 신호를 정확히 안내하는 쪽이 안전합니다. 해조 폴리페놀 정보는 일반 건강정보로만 연결해야 합니다. 기침이 오래가거나 숨참이 생긴 사람에게는 제품보다 진료 판단 기준을 먼저 알려야 합니다.</p>
</div>`,
    tags: ['RSV', '호흡기', '백신', '고위험군', '만성폐질환', '심장질환'],
    difficulty: 'intermediate',
    views: 2240,
    likes: 171,
    related_insights: [
      '/insights/rsv-vaccine-older-adults-risk-record-2026',
      '/blog/rsv-vaccine-older-adults-risk-record-2026',
    ],
    references: [
      { title: 'CDC 2026: RSV vaccine guidance for adults', url: 'https://www.cdc.gov/rsv/hcp/vaccine-clinical-guidance/adults.html' },
      { title: 'CDC: ACIP RSV vaccine recommendations', url: 'https://www.cdc.gov/acip-recs/hcp/vaccine-specific/rsv.html' },
    ],
  },
  {
    id: 'trend-glp1-knee-osteoarthritis-muscle-bone-20260602',
    category: 'musculoskeletal',
    question: 'GLP-1 감량으로 무릎 통증이 줄면 골관절염이 좋아진 건가요, 근손실도 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>무릎 통증이 줄었다고 골관절염이 치료됐다고 단정하면 안 됩니다.</strong> 비만과 무릎 골관절염이 함께 있는 사람에서 GLP-1 계열 치료로 체중과 통증이 줄었다는 연구가 있지만, 이것은 관절 재생이나 완치를 의미하지 않습니다.</p>
  <p>2026년 리뷰들도 사람 대상 자료는 주로 체중감량을 통한 통증과 기능 개선을 강하게 지지한다고 설명합니다. 직접적인 연골 재생, 구조 개선, 질병수정 효과는 아직 단정하기 어렵습니다. 또 빠른 감량 과정에서는 근손실과 골밀도 위험을 놓치지 않아야 합니다.</p>
  <h4>통증이 줄어도 왜 근육과 뼈를 봐야 하나요?</h4>
  <p>체중이 줄면 무릎 부담이 줄어 통증이 완화될 수 있습니다. 하지만 감량이 빠르게 진행되면 근육량과 골밀도 관리가 함께 필요합니다. 허벅지 근육이 약해지면 무릎 안정성이 떨어지고, 낙상 위험이 커질 수 있습니다. 따라서 통증 점수와 함께 단백질, 저항운동, 보행량, 낙상 여부를 같이 기록해야 합니다.</p>
  <h4>운동을 늘릴 때도 순서가 필요합니다</h4>
  <p>통증이 줄었다고 바로 오래 걷기나 계단 운동을 늘리면 무릎 주변 조직이 다시 자극될 수 있습니다. 먼저 의자에서 일어나기, 짧은 걷기, 가벼운 저항운동처럼 무릎이 버틸 수 있는 범위를 확인하고, 통증이 다음 날까지 남는지 기록하는 방식이 더 안전합니다.</p>
  <h4>함께 기록할 것</h4>
  <ul>
    <li>체중, 허리둘레, 감량 속도</li>
    <li>무릎 통증 점수, 계단 오르내리기, 보행 시간</li>
    <li>단백질 섭취, 근력운동, 허벅지 둘레, 악력</li>
    <li>낙상, 골밀도 위험, 비타민D 상태, 스테로이드 사용 여부</li>
    <li>통증이 줄어 운동량을 갑자기 늘린 뒤 악화되는지</li>
  </ul>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌은 무릎 관절염 치료나 연골 재생을 보장한다고 말하면 안 됩니다. 근골격 콘텐츠에서는 체중, 근력, 보행, 통증 기록을 먼저 안내하고 해조 폴리페놀 정보는 보조 자료로만 다뤄야 합니다. “관절이 회복된다”는 식의 표현은 피해야 합니다. 통증 완화와 구조적 회복을 구분하는 것이 신뢰도 높은 설명입니다. 검사 결과와 운동 기록을 함께 보는 습관이 중요합니다.</p>
</div>`,
    tags: ['GLP1', '무릎골관절염', '근골격', '근손실', '골밀도', '보행기록'],
    difficulty: 'intermediate',
    views: 2390,
    likes: 184,
    related_insights: [
      '/insights/glp1-knee-osteoarthritis-muscle-bone-record-2026',
      '/blog/glp1-knee-osteoarthritis-muscle-bone-record-2026',
    ],
    references: [
      { title: 'NEJM: Once-weekly semaglutide in obesity and knee osteoarthritis', url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2403664' },
      { title: 'Frontiers in Pharmacology 2026: GLP-1 receptor agonists in obesity-related knee osteoarthritis', url: 'https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2026.1856307/full' },
      { title: 'AAOS 2026: GLP-1 receptor agonists and long-term musculoskeletal health', url: 'https://aaos-annualmeeting-presskit.org/2026/research-news/studies-explore-glp-1-receptor-agonist-use-and-its-impact-on-long-term-musculoskeletal-health/' },
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
