import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-03T06:20:00+09:00'

const common = {
  content_type: 'latest_health_qna',
  author: '플로로탄닌 건강정보센터 · 카테고리 순환 Q&A 편집부',
  disclaimer:
    '건강정보는 진료를 대체하지 않습니다. 증상이 지속되거나 약을 복용 중이라면 의료진과 상담하세요.',
  source_type: 'official-guideline-and-peer-reviewed',
  references_pmid: [],
  reviewed: true,
  qualityStatus: 'validated',
  sourceStatus: 'referenced',
  publicBodyMode: 'full',
  noindex: false,
}

const questions = [
  {
    id: 'trend-alopecia-areata-jak-inhibitor-safety-record-20260603',
    category: 'hair',
    question: '원형탈모 JAK 억제제를 상담하기 전에 어떤 안전 기록을 준비해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>탈모 범위 사진보다 먼저 봐야 할 것은 감염, 결핵, 간염, 혈전, 심혈관 위험 기록입니다.</strong> JAK 억제제는 중증 원형탈모에서 의미 있는 치료 선택지가 되었지만, FDA 라벨에는 감염, 악성종양, 주요 심혈관 사건, 혈전과 관련된 boxed warning이 함께 제시됩니다.</p>
  <p>이 경고는 치료를 무조건 피하라는 뜻이 아닙니다. 내 위험요인을 정리해 의료진이 더 정확하게 위험-편익을 판단하도록 돕는 체크리스트에 가깝습니다.</p>
  <h4>상담 전 준비할 것</h4>
  <ul>
    <li>탈모 시작 시점, 넓어진 속도, 눈썹·속눈썹 침범 여부</li>
    <li>두피 사진, 탈모 범위, 기존 치료 반응</li>
    <li>결핵 검사, B형·C형 간염 검사, 최근 감염 병력</li>
    <li>대상포진·독감·코로나·폐렴구균 등 백신 접종 이력</li>
    <li>흡연, 혈전, 고혈압, 당뇨, 고지혈증, 심근경색·뇌졸중 병력</li>
  </ul>
  <h4>플로로탄닌 콘텐츠에서 지켜야 할 선</h4>
  <p>플로로탄닌을 원형탈모 치료제, 모발 재생 성분, JAK 억제제 대체물처럼 설명하면 안 됩니다. 이 주제에서는 성분 홍보보다 진단, 사진 기록, 검사, 안전성 상담 기준을 알려주는 것이 더 신뢰도 높은 정보입니다.</p>
</div>`,
    tags: ['원형탈모', 'JAK억제제', '탈모치료', '리틀풀로', '안전성', '모발두피'],
    difficulty: 'advanced',
    views: 2588,
    likes: 181,
    related_insights: [
      '/insights/alopecia-areata-jak-inhibitor-boxed-warning-safety-record-2026',
      '/blog/alopecia-areata-jak-inhibitor-boxed-warning-safety-record-2026',
    ],
    references: [
      {
        title: 'FDA: LITFULO prescribing information',
        url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/215830s000lbl.pdf',
      },
      {
        title: 'FDA: Drug Trials Snapshot - LEQSELVI',
        url: 'https://www.fda.gov/drugs/drug-trials-snapshots/drug-trials-snapshots-leqselvi',
      },
      {
        title: 'AAD: Alopecia areata diagnosis and treatment',
        url: 'https://www.aad.org/public/diseases/hair-loss/types/alopecia/treatment',
      },
    ],
  },
  {
    id: 'trend-menopause-hormone-therapy-label-update-record-20260603',
    category: 'womens_health',
    question: '폐경 호르몬치료 라벨이 바뀌었다면 이제 안심하고 시작해도 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>라벨 변경은 모든 사람에게 같은 결론을 주는 소식이 아닙니다.</strong> FDA는 2026년 일부 폐경 호르몬치료 제품의 라벨 변경을 승인했지만, 치료 판단은 증상, 나이, 폐경 후 기간, 자궁 여부, 혈전·암·심혈관 병력을 함께 봐야 합니다.</p>
  <p>전신 호르몬치료와 저용량 질 국소요법은 목적과 위험 맥락이 다릅니다. 안면홍조와 야간발한이 주된 문제인지, 질건조와 반복 요로증상이 주된 문제인지부터 구분해야 합니다.</p>
  <h4>상담 전 기록할 것</h4>
  <ul>
    <li>마지막 월경 시점과 폐경 후 경과 기간</li>
    <li>안면홍조, 야간발한, 수면장애, 기분 변화의 빈도</li>
    <li>질건조, 성교통, 반복 요로증상 여부</li>
    <li>자궁 절제 여부, 비정상 출혈, 자궁내막 질환 이력</li>
    <li>유방암, 자궁내막암, 혈전, 뇌졸중, 심근경색 병력</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌이나 감태 성분을 호르몬 대체, 안면홍조 치료, 골절 예방 성분처럼 설명하면 안 됩니다. 여성건강 콘텐츠에서는 수면, 혈압, 혈당, 근육량, 식사 기록처럼 생활 관리와 연결하는 편이 안전합니다.</p>
</div>`,
    tags: ['폐경', '호르몬치료', 'HRT', 'MHT', '갱년기', '여성건강'],
    difficulty: 'advanced',
    views: 2584,
    likes: 180,
    related_insights: [
      '/insights/menopause-hormone-therapy-boxed-warning-label-update-record-2026',
      '/blog/menopause-hormone-therapy-boxed-warning-label-update-record-2026',
    ],
    references: [
      {
        title: 'FDA: Menopausal hormone therapy labeling changes',
        url: 'https://content.govdelivery.com/accounts/USFDA/bulletins/4099195',
      },
      {
        title: 'JAMA: FDA approves menopausal hormone therapy labeling changes',
        url: 'https://jamanetwork.com/journals/jama/fullarticle/2846272',
      },
    ],
  },
  {
    id: 'trend-male-fertility-home-sperm-test-dna-fragmentation-20260603',
    category: 'mens_health',
    question: '가정용 정자검사와 DNA fragmentation 검사 결과는 어떻게 해석해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>가정용 정자검사는 출발점일 수 있지만 난임 평가 전체를 대신하지는 못합니다.</strong> 정액검사는 금욕 기간, 채취 조건, 최근 발열, 검사실 방법에 따라 달라질 수 있어 한 번의 숫자로 난임 여부를 확정하면 안 됩니다.</p>
  <p>AUA/ASRM 남성 난임 가이드라인은 평가가 단계적으로 이뤄져야 한다고 설명합니다. DNA fragmentation 검사는 반복 유산 등 특정 맥락에서 고려될 수 있지만 모든 남성에게 첫 번째 검사라고 단정할 수 없습니다.</p>
  <h4>상담 전 기록할 것</h4>
  <ul>
    <li>검사 전 금욕 기간과 채취 조건</li>
    <li>최근 3개월 안의 고열, 코로나·독감, 항생제 사용</li>
    <li>사우나, 고온 작업, 온열기 사용, 꽉 끼는 속옷 습관</li>
    <li>테스토스테론, 탈모약, 스테로이드, 근육 보충제 사용 여부</li>
    <li>정계정맥류 의심 증상, 고환 통증, 수술·감염 병력</li>
  </ul>
  <h4>플로로탄닌 연결 기준</h4>
  <p>산화스트레스 연구 배경을 소개할 수는 있지만, 정자 수 증가, 임신 성공, DNA 손상 회복을 보장하는 표현은 피해야 합니다. 남성건강 콘텐츠는 반복 검사와 원인 평가를 정확히 안내할 때 신뢰도가 올라갑니다.</p>
</div>`,
    tags: ['남성난임', '정자검사', '정액검사', 'DNA손상', '정계정맥류', '남성건강'],
    difficulty: 'advanced',
    views: 2580,
    likes: 179,
    related_insights: [
      '/insights/male-fertility-at-home-sperm-test-dna-fragmentation-record-2026',
      '/blog/male-fertility-at-home-sperm-test-dna-fragmentation-record-2026',
    ],
    references: [
      {
        title: 'AUA/ASRM: Diagnosis and treatment of infertility in men',
        url: 'https://www.asrm.org/practice-guidance/practice-committee-documents/diagnosis-and-treatment-of-infertility-in-men-auaasrm-guideline-part-i-2020/',
      },
      {
        title: 'FDA: Direct-to-Consumer Tests',
        url: 'https://www.fda.gov/medical-devices/in-vitro-diagnostics/direct-consumer-tests',
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
        '카테고리 순환 최신 보강. 공식 라벨과 가이드라인을 반영하고 치료·예방 보장 표현을 배제함.',
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
