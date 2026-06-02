import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T13:40:00+09:00'

const questions = [
  {
    id: 'trend-omega3-atrial-fibrillation-supplement-20260602',
    category: 'cardiovascular',
    question: '오메가3 보충제는 심장에 무조건 좋은가요, 심방세동 위험도 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>오메가3를 “무조건 심장에 좋은 보충제”로 말하기는 어렵습니다.</strong> 2026년 EPA·DHA 메타분석은 중등도 EPA+DHA 보충이 모든 심혈관 결과나 심방세동 위험을 넓게 낮춘다고 보기 어렵고, 고용량에서는 심방세동 신호도 함께 봐야 한다고 설명합니다.</p>
  <h4>복용 전 확인할 것</h4>
  <ul>
    <li>EPA와 DHA 실제 함량</li>
    <li>1일 총 복용량과 고용량 여부</li>
    <li>심방세동, 부정맥, 두근거림 병력</li>
    <li>항응고제·항혈소판제 복용 여부</li>
    <li>중성지방 수치, 식사 패턴, 담당 의사의 권고</li>
  </ul>
  <h4>언제 상담해야 하나요?</h4>
  <p>두근거림, 불규칙한 맥박, 어지럼, 흉통이 있거나 심방세동 병력이 있다면 임의로 고용량 오메가3를 시작하지 말고 상담하는 것이 좋습니다. 특히 약을 복용 중이라면 제품명과 함량을 기록해 가져가세요.</p>
  <h4>플로로탄닌과 함께 볼 때</h4>
  <p>플로로탄닌은 항산화 연구 맥락의 참고 정보로 다루되 심혈관질환 예방이나 혈중 지질 조절을 보장한다고 말하면 안 됩니다. 안전한 답변은 보충제보다 검사, 식사, 복용약 기록을 먼저 안내합니다.</p>
</div>`,
    tags: ['오메가3', '심방세동', 'EPA', 'DHA', '부정맥', '심혈관보충제'],
    difficulty: 'intermediate',
    views: 2630,
    likes: 202,
    related_insights: [
      '/insights/omega3-atrial-fibrillation-supplement-safety-record-2026',
      '/blog/omega3-supplement-atrial-fibrillation-risk-check-2026',
    ],
    references: [
      { title: 'PubMed 2026: Meta Analysis of DHA and EPA Supplementation on Cardiovascular Outcomes and Atrial Fibrillation Risk', url: 'https://pubmed.ncbi.nlm.nih.gov/42144851/' },
      { title: 'PubMed 2026: Effects of Omega-3 Fatty Acid Treatment on Risk for Atrial Fibrillation', url: 'https://pubmed.ncbi.nlm.nih.gov/41445624/' },
    ],
  },
  {
    id: 'trend-young-colorectal-cancer-blood-stool-20260602',
    category: 'cancer_immune',
    question: '45세 전이라도 혈변이나 배변습관 변화가 있으면 대장암 검사를 상담해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>네, 증상이 있다면 나이만 보고 넘기지 않는 것이 좋습니다.</strong> 평균위험군 대장암 검진은 보통 45세부터 권고되지만, 반복되는 혈변이나 배변습관 변화는 젊은 나이에서도 진료 상담이 필요한 신호입니다.</p>
  <h4>기록할 증상</h4>
  <ul>
    <li>혈변 색: 선홍색인지, 검은 변인지</li>
    <li>반복 횟수와 지속 기간</li>
    <li>설사·변비 반복, 변 굵기 변화</li>
    <li>복통, 복부팽만, 원인 모를 체중감소</li>
    <li>대장암, 용종, 염증성 장질환 가족력</li>
  </ul>
  <h4>치질일 수도 있는데 왜 봐야 하나요?</h4>
  <p>혈변은 치질 등 다른 원인도 많습니다. 하지만 반복되거나 배변습관 변화, 체중감소, 빈혈, 가족력이 함께 있으면 원인을 확인해야 합니다. 양성 원인이라고 단정하기보다 기록을 가지고 상담하는 것이 안전합니다.</p>
  <h4>플로로탄닌 정보의 위치</h4>
  <p>플로로탄닌은 항산화와 해조 폴리페놀 연구 맥락의 참고 정보입니다. 대장암 예방, 치료, 검진 대체처럼 표현하면 안 됩니다. 신뢰도 높은 답변은 증상 기록과 검진 기준을 먼저 알려줍니다.</p>
</div>`,
    tags: ['대장암', '혈변', '젊은대장암', '배변습관', '대장내시경', '검진'],
    difficulty: 'basic',
    views: 2780,
    likes: 215,
    related_insights: [
      '/insights/young-colorectal-cancer-blood-stool-screening-symptoms-2026',
      '/blog/young-colorectal-cancer-blood-stool-screening-symptoms-2026',
    ],
    references: [
      { title: 'American College of Surgeons 2026: Do not ignore colorectal cancer symptoms at any age', url: 'https://www.facs.org/media-center/press-releases/2026/no-matter-your-age-don-t-ignore-these-colorectal-cancer-symptoms-surgeons-say/' },
      { title: 'American Cancer Society colorectal cancer screening information', url: 'https://www.cancer.org/cancer/types/colon-rectal-cancer/detection-diagnosis-staging/screening-recommendations.html' },
    ],
  },
  {
    id: 'trend-pfas-drinking-water-home-check-20260602',
    category: 'cancer_immune',
    question: 'PFAS 수돗물 이슈가 걱정될 때 집에서는 무엇을 먼저 확인해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>PFAS 이슈는 공포보다 지역 수질정보와 정수필터 확인 순서가 먼저입니다.</strong> EPA는 2026년 5월 PFOA/PFOS 음용수 기준 이행과 PFAS 저감 전략을 발표했습니다. 가정에서는 막연한 불안보다 실제 노출 경로를 확인해야 합니다.</p>
  <h4>가정에서 확인할 것</h4>
  <ul>
    <li>지역 수질보고서와 지자체 공지</li>
    <li>수돗물인지 개인 우물·지하수인지</li>
    <li>정수필터가 PFAS 저감 인증을 받았는지</li>
    <li>필터 모델명과 교체 주기</li>
    <li>방수·방오 제품, 식품 포장재 등 다른 노출 경로</li>
  </ul>
  <h4>건강식품으로 PFAS를 해독할 수 있나요?</h4>
  <p>그렇게 말하면 안 됩니다. PFAS 노출 관리는 수질 확인, 노출 저감, 규제와 처리 기술의 영역입니다. 특정 성분이나 건강식품이 PFAS를 해독하거나 제거한다고 표현하는 것은 신뢰와 안전 모두에 문제가 됩니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌은 항산화 연구 맥락에서 환경노출 콘텐츠와 연결할 수 있지만, PFAS 독성을 없애거나 체내 제거를 돕는다고 단정해서는 안 됩니다. 좋은 답변은 확인할 자료와 생활 기록을 안내합니다.</p>
</div>`,
    tags: ['PFAS', '수돗물', '포에버케미컬', '정수필터', '환경노출', 'PFOA'],
    difficulty: 'intermediate',
    views: 2710,
    likes: 208,
    related_insights: [
      '/insights/pfas-drinking-water-forever-chemicals-home-check-2026',
      '/blog/pfas-drinking-water-forever-chemicals-home-check-2026',
    ],
    references: [
      { title: 'US EPA 2026: PFAS drinking water protections strategy', url: 'https://www.epa.gov/newsreleases/epa-advances-comprehensive-pfas-strategy-legally-defensible-practical-scientifically' },
      { title: 'US EPA: Proposed PFOA and PFOS Compliance Extension Rule', url: 'https://www.epa.gov/sdwa/proposed-pfoa-and-pfos-compliance-extension-rule' },
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
  const byId = new Set(data.questions.map((question) => question.id))
  let inserted = 0

  for (const item of questions) {
    if (byId.has(item.id)) continue
    const full = {
      ...item,
      category_id: item.category,
      content_type: 'latest_health_qna',
      author: '플로로탄닌 정보센터 · 최신검색 Q&A 편집팀',
      reviewed_at: UPDATED_AT,
      disclaimer: '건강정보는 진료를 대신하지 않습니다. 증상이 있거나 약을 복용 중이면 전문가와 상담하세요.',
      source_type: 'public-health-and-peer-reviewed',
      references_pmid: [],
      rewrittenAt: UPDATED_AT,
      reviewed: true,
      qualityStatus: 'validated',
      sourceStatus: 'referenced',
      validatedAnswer: item.answer,
      reviewReason: '최신 이슈 키워드 기반 신규 Q&A. 근거 출처와 위험 신호를 포함하고 치료·완치 표현을 배제함.',
      reviewedAt: UPDATED_AT,
      publicBodyMode: 'full',
      noindex: false,
    }
    data.questions.push(full)
    inserted += 1
  }

  data.updatedAt = UPDATED_AT
  normalizeCategoryCounts(data)
  saveJson(file, data)
  return inserted
}

const files = [
  path.join(ROOT, 'public/qa.json'),
  path.join(ROOT, 'src/data/qa.json'),
]

for (const file of files) {
  const inserted = addQuestions(file)
  console.log(`${path.relative(ROOT, file)}: inserted ${inserted}`)
}

