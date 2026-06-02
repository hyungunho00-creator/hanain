import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T23:55:00+09:00'

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
    id: 'trend-finasteride-dutasteride-hair-loss-safety-warning-20260602',
    category: 'hair',
    question: '탈모약 피나스테리드나 두타스테리드를 시작하기 전에 어떤 부작용을 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>탈모약은 효과를 보기 전에 복용 전 상태를 기록해야 합니다.</strong> 피나스테리드와 두타스테리드는 5알파 환원효소 억제제 계열로, 남성형 탈모와 전립선비대증 영역에서 사용됩니다. 2026년 5월 영국 MHRA는 피나스테리드 1mg 탈모 용량의 성기능·기분 변화 경고를 강화했고, 두타스테리드에도 같은 계열 약물로서 기분 변화 관련 주의가 필요하다고 안내했습니다.</p>
  <p>복용 전 성욕, 발기 기능, 사정 변화, 고환 통증, 우울감, 불안, 수면 상태, 피로감, 집중력 저하를 간단히 적어두면 이후 변화가 약과 관련 있는지 의료진이 판단하는 데 도움이 됩니다. 특히 온라인 복합 조제 제품이나 topical finasteride 제품은 승인 경로와 성분, 농도, 병용 성분을 확인해야 합니다.</p>
  <h4>복용 전후 체크리스트</h4>
  <ul>
    <li>복용 시작일, 제품명, 용량, 처방 경로</li>
    <li>성욕·발기·사정 변화와 시작 시점</li>
    <li>우울감, 불안, 자살 생각, 심한 불면 여부</li>
    <li>탈모 사진은 같은 조명·각도·거리로 월 1회 기록</li>
    <li>중단 뒤 증상이 좋아졌는지, 남았는지</li>
  </ul>
  <h4>바로 상담해야 하는 경우</h4>
  <p>우울감이 심해지거나 자살 생각, 성기능 변화, 고환 통증, 심한 불면이 생기면 참지 말고 처방 의료진과 상담해야 합니다. 정신건강 위기 신호가 있으면 주변 사람 또는 응급 지원망과 즉시 연결하세요.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 탈모 치료제나 탈모약 부작용 완화 성분처럼 설명하면 안 됩니다. 이 주제에서는 약물 안전성, 두피 사진 기록, 단백질·철분·갑상샘·수면 같은 기본 평가를 먼저 다루고 해양 폴리페놀은 항산화 연구 배경 정도로만 언급해야 합니다.</p>
</div>`,
    tags: ['피나스테리드', '두타스테리드', '탈모약', '성기능', '기분변화', '부작용기록', '모발두피'],
    difficulty: 'advanced',
    views: 2617,
    likes: 190,
    related_insights: [
      '/insights/finasteride-dutasteride-hair-loss-safety-warning-record-2026',
      '/blog/finasteride-dutasteride-hair-loss-safety-warning-record-2026',
    ],
    references: [
      {
        title: 'MHRA 2026: finasteride and dutasteride safety warnings',
        url: 'https://www.gov.uk/government/news/mhra-strengthens-safety-warnings-for-finasteride-and-dutasteride',
      },
      {
        title: 'FDA: Compounding risk alerts',
        url: 'https://www.fda.gov/drugs/human-drug-compounding/compounding-risk-alerts',
      },
      {
        title: 'MedlinePlus: Finasteride',
        url: 'https://medlineplus.gov/druginfo/meds/a698016.html',
      },
    ],
  },
  {
    id: 'trend-hpv-self-collection-cervical-screening-20260602',
    category: 'womens_health',
    question: 'HPV 자가채취 검사가 가능해지면 자궁경부암 검진을 병원에서 안 받아도 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>자가채취는 검진 접근성을 높이는 선택지이지, 모든 상황에서 병원 평가를 없애는 방법은 아닙니다.</strong> 2026년 HRSA는 평균 위험군 30~65세 여성에서 고위험 HPV 검사를 선호 선별 방식으로 제시했고, 환자 자가채취를 새로운 선택지로 안내했습니다. American Cancer Society도 자가채취가 진료실 또는 가정에서 검체를 채취하는 방식으로 검진 장벽을 낮출 수 있다고 설명합니다.</p>
  <p>그러나 자가채취는 HPV를 확인하는 선별검사입니다. 결과가 양성이거나 과거 자궁경부 세포검사 이상 소견이 있거나 비정상 출혈, 성교 후 출혈, 골반통 같은 증상이 있으면 의료진의 추가 평가가 필요합니다.</p>
  <h4>자가채취 전 확인할 것</h4>
  <ul>
    <li>내가 평균 위험군인지, 과거 이상 소견이 있는지</li>
    <li>현재 비정상 출혈이나 골반통 같은 증상이 있는지</li>
    <li>FDA 승인 검사와 채취 키트를 의료진 경로로 사용하는지</li>
    <li>음성 결과 뒤 다음 검사 간격은 어떻게 잡는지</li>
    <li>양성 결과 뒤 질확대경·세포검사 등 추적검사 경로가 있는지</li>
  </ul>
  <h4>오해하지 말아야 할 점</h4>
  <p>자가채취가 편하다는 이유로 아무 키트를 구매해 검사하거나, 양성 결과를 방치하거나, 증상이 있는데 자가검사만 반복하는 것은 안전하지 않습니다. 자가채취는 검진 장벽을 줄이는 도구이고, 결과 해석과 추적검사는 의료 시스템 안에서 이어져야 합니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 HPV 예방이나 자궁경부암 예방 성분처럼 설명하면 안 됩니다. 이 주제에서는 정기 검진, HPV 백신, 추적검사, 비정상 증상 상담을 먼저 안내하고 해양 폴리페놀은 일반적인 항산화 연구 배경으로만 제한합니다.</p>
</div>`,
    tags: ['HPV', '자가채취', '자궁경부암', '선별검사', '여성건강', '추적검사', 'HPV검사'],
    difficulty: 'advanced',
    views: 2609,
    likes: 188,
    related_insights: [
      '/insights/hpv-self-collection-cervical-screening-home-test-record-2026',
      '/blog/hpv-self-collection-cervical-screening-home-test-record-2026',
    ],
    references: [
      {
        title: 'HRSA 2026: cervical cancer screening guidelines',
        url: 'https://www.hrsa.gov/about/news/press-releases/new-cervical-cancer-screening-guidelines',
      },
      {
        title: 'American Cancer Society: self-collection for cervical cancer screening',
        url: 'https://www.cancer.org/cancer/latest-news/what-is-self-collection-for-cervical-cancer-screening.html',
      },
    ],
  },
  {
    id: 'trend-erectile-dysfunction-cardiovascular-risk-20260602',
    category: 'mens_health',
    question: '발기부전이 심혈관질환 위험 신호일 수 있다는데, 어떤 검사를 확인해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>발기부전은 삶의 질 문제이면서 혈관 건강을 다시 확인해야 하는 신호일 수 있습니다.</strong> NIDDK는 발기부전이 당뇨, 심장질환, 비만 위험과 연결될 수 있다고 설명합니다. ACC의 Princeton IV 합의 해설도 발기부전을 심혈관질환의 위험 표지자로 보고 혈압, 혈당, 지질, 운동능력, 복용약을 함께 확인해야 한다고 정리합니다.</p>
  <p>특히 젊은 남성에서 갑자기 발기 기능이 떨어졌거나, 흡연·복부비만·수면 부족·고혈압 가족력이 있고 혈액검사를 오래 하지 않았다면 단순히 약만 찾기보다 혈관 위험 평가를 먼저 상담하는 편이 안전합니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>최근 3~6개월 발기 유지, 아침 발기, 성욕 변화</li>
    <li>혈압, 공복혈당 또는 A1C, LDL 콜레스테롤, 중성지방</li>
    <li>흡연, 음주, 수면 부족, 복부비만, 운동 부족</li>
    <li>항우울제, 혈압약, 탈모약, 전립선약 등 복용약</li>
    <li>흉통, 호흡곤란, 운동 시 어지러움 같은 심혈관 신호</li>
  </ul>
  <h4>약 복용 전 주의할 점</h4>
  <p>발기부전 치료제는 도움이 될 수 있지만 니트레이트 계열 약을 복용하거나 불안정 협심증, 조절되지 않는 고혈압, 고위험 부정맥, 최근 심근경색 이력이 있다면 의료진 평가가 우선입니다.</p>
  <h4>플로로탄닌과 연결할 때 주의할 점</h4>
  <p>플로로탄닌을 발기부전 치료나 혈관 확장 성분처럼 설명하면 안 됩니다. 남성건강 콘텐츠에서는 혈압·혈당·지질·수면·운동·복용약 점검을 중심에 두고 해양 폴리페놀은 산화스트레스 연구 배경 정도로만 연결합니다.</p>
</div>`,
    tags: ['발기부전', '심혈관', '혈압', '혈당', '지질', '남성건강', '복용약'],
    difficulty: 'advanced',
    views: 2603,
    likes: 187,
    related_insights: [
      '/insights/erectile-dysfunction-cardiovascular-risk-blood-pressure-record-2026',
      '/blog/erectile-dysfunction-cardiovascular-risk-blood-pressure-record-2026',
    ],
    references: [
      {
        title: 'ACC: Erectile dysfunction as an ASCVD risk-enhancing factor',
        url: 'https://www.acc.org/Latest-in-Cardiology/Articles/2024/09/23/10/45/Erectile-Disfunction-as-an-ASCVD-Risk-Enhancing-Factor',
      },
      {
        title: 'NIDDK: Erectile dysfunction',
        url: 'https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction',
      },
      {
        title: 'American Heart Association: high blood pressure',
        url: 'https://www.heart.org/en/health-topics/high-blood-pressure',
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
        '카테고리 순환 최신 보강. 공공기관·학회 근거를 반영하고 치료·예방 보장 표현을 배제함.',
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
