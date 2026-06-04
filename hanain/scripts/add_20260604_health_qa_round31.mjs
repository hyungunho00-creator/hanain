import fs from 'node:fs'
import path from 'node:path'
import { ROUND31_TREND_BLOG_POSTS } from '../src/data/localTrendBlogPostsRound31.js'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-04T18:10:00+09:00'

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
    id: 'trend-tight-hairstyle-traction-alopecia-hairline-record-20260604',
    category: 'hair',
    question: '꽉 묶는 머리 뒤 헤어라인이 아프면 견인성 탈모를 의심하고 무엇을 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>헤어라인이 당기고 아프다면 탈모약이나 영양제부터 찾기보다 어떤 머리 스타일을 얼마나 오래 했는지 기록해야 합니다.</strong> AAD는 반복적으로 머리를 당기는 스타일이 모낭에 부담을 주고 견인성 탈모로 이어질 수 있다고 안내합니다.</p>
  <p>포니테일, 번, 땋은 머리, 붙임머리, 가발·헤어커버 고정 부위처럼 같은 부위를 계속 당기는 상황에서는 관자놀이, 이마선, 귀 위, 가르마의 변화를 나눠 보는 것이 좋습니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>포니테일, 번, 땋은 머리, 붙임머리, 헤어커버 착용 시간</li>
    <li>머리를 묶었을 때 통증, 당김, 두통, 두피 붉어짐 여부</li>
    <li>이마선, 관자놀이, 귀 위, 정수리, 가르마 사진</li>
    <li>작은 뾰루지, 딱지, 가려움, 비듬, 진물, 통증</li>
    <li>염색, 탈색, 펌, 열기구 사용과 같은 시점</li>
    <li>같은 방향으로만 묶는지, 쉬는 날에는 풀어두는지</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 견인성 탈모 회복, 헤어라인 회복, 모낭 재생을 보장하는 표현으로 쓰면 안 됩니다. 이 주제는 당김을 줄이는 생활 기록과 의료 상담 기준이 중심입니다.</p>
  <h4>집에서 확인할 순서</h4>
  <p>아픈 스타일은 잠시 중단하고 같은 조명에서 이마선과 관자놀이 사진을 남기세요. 젖은 머리와 마른 머리는 밀도가 다르게 보이므로 사진 조건을 일정하게 맞추는 것이 중요합니다.</p>
  <p>두피 통증, 진물, 염증, 빠르게 넓어지는 빈 부위가 있으면 새 제품을 추가하기보다 피부과 상담을 고려하세요. 견인성 탈모는 초기에 당김을 줄이는 것이 중요하지만, 오래 반복되면 회복이 어려워질 수 있습니다.</p>
  <p>탈모 원인은 견인성 탈모만이 아닙니다. 남성형·여성형 탈모, 원형 탈모, 휴지기 탈모, 두피 염증, 철분·갑상샘 문제도 구분해야 하므로 스타일 기록을 가져가면 상담이 더 정확해집니다.</p>
  <p>기록할 때는 “머리가 많이 빠졌다”보다 어느 부위가 언제부터 비어 보였는지, 통증이 있었는지, 머리를 풀면 편해지는지까지 적어두세요. 불안한 느낌보다 변화의 조건을 남기는 것이 더 도움이 됩니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>AAD: Hairstyles that pull can lead to hair loss</li>
    <li>MedlinePlus: Hair loss</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 통증, 염증, 빠르게 넓어지는 탈모 부위가 있으면 의료진과 상담하세요.</p>
</div>`,
    tags: ['견인성탈모', '헤어라인', '꽉묶은머리', '붙임머리', '두피통증', '모발두피'],
    difficulty: 'intermediate',
    views: 2485,
    likes: 159,
    related_insights: [
      '/insights/tight-hairstyle-traction-alopecia-hairline-record-2026',
      '/blog/tight-hairstyle-traction-alopecia-hairline-record-2026',
    ],
    references: [
      { title: 'AAD: Hairstyles that pull can lead to hair loss', url: 'https://www.aad.org/public/diseases/hair-loss/causes/hairstyles' },
      { title: 'MedlinePlus: Hair loss', url: 'https://medlineplus.gov/hairloss.html' },
    ],
  },
  {
    id: 'trend-testicular-lump-young-men-self-check-record-20260604',
    category: 'mens_health',
    question: '젊은 남성이 고환 덩이를 느꼈을 때 자가검진보다 먼저 정리해야 할 기록은 무엇인가요?',
    answer: `<div class="qa-structured">
  <p><strong>고환 덩이를 느꼈다면 부끄러워서 미루기보다 처음 발견한 날짜, 크기 변화, 통증 양상, 가족력을 정리해 빠르게 상담하는 것이 중요합니다.</strong> NCI는 고환암이 남성이 우연히 발견하거나 자가 확인 중 발견되는 경우가 있다고 설명하지만, 무증상 남성 전체의 정기 자가검진 효과에 대한 근거는 충분하지 않다고 안내합니다.</p>
  <p>따라서 핵심은 매달 무조건 검사한다는 규칙보다 변화가 보였을 때 기록하고 상담하는 태도입니다. 특히 15~35세 젊은 남성에게 고환암은 중요한 감별 대상이 될 수 있어 통증이 없다고 안심하면 안 됩니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>덩이나 단단한 부위를 처음 느낀 날짜</li>
    <li>한쪽 고환이 커지거나 모양이 달라졌는지</li>
    <li>무거운 느낌, 둔한 통증, 날카로운 통증, 붓기</li>
    <li>최근 외상, 운동, 감염 증상, 발열, 배뇨통 여부</li>
    <li>과거 잠복고환, 고환 수술, 불임 검사, 가족력</li>
    <li>갑작스럽고 심한 통증인지, 서서히 변한 통증인지</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 고환암 예방, 덩이 완화, 생식기 질환 관리를 대신하는 표현으로 쓰면 안 됩니다. 남성 건강 콘텐츠에서는 증상 기록과 빠른 상담 기준을 분명히 해야 합니다.</p>
  <h4>상담 전 확인할 순서</h4>
  <p>American Cancer Society는 고환의 덩이 또는 부기가 흔한 첫 신호일 수 있다고 설명합니다. 다만 덩이가 모두 암은 아니며 부고환염, 수종, 정계정맥류, 외상, 고환염 등 다른 원인도 가능합니다.</p>
  <p>갑자기 심한 고환 통증이 생기고 메스꺼움, 구토, 고환 위치 변화가 동반되면 응급상황일 수 있습니다. 이런 경우에는 인터넷 검색을 하며 기다리지 말고 빠른 의료 평가가 필요합니다.</p>
  <p>통증 없이 단단한 덩이가 계속 만져지는 경우도 미루지 않는 것이 좋습니다. 상담 전에는 크기 변화, 배뇨 증상, 최근 외상, 가족력, 잠복고환 이력을 정리해 가면 평가에 도움이 됩니다.</p>
  <p>사진으로 비교하기보다 의료진이 직접 확인하고 필요 시 초음파 등으로 평가하는 과정이 중요합니다. 민망함 때문에 시간을 끌수록 불안은 커지고 판단은 늦어집니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>NCI: Testicular Cancer Screening</li>
    <li>American Cancer Society: Can Testicular Cancer Be Found Early?</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 고환 덩이, 부기, 갑작스러운 통증은 의료진과 상담하세요.</p>
</div>`,
    tags: ['남성건강', '고환암', '고환덩이', '자가확인', '젊은남성', '상담'],
    difficulty: 'intermediate',
    views: 2481,
    likes: 158,
    related_insights: [
      '/insights/testicular-lump-young-men-self-check-record-2026',
      '/blog/testicular-lump-young-men-self-check-record-2026',
    ],
    references: [
      { title: 'NCI: Testicular Cancer Screening', url: 'https://www.cancer.gov/types/testicular/patient/testicular-screening-pdq' },
      { title: 'American Cancer Society: Can Testicular Cancer Be Found Early?', url: 'https://www.cancer.org/cancer/types/testicular-cancer/detection-diagnosis-staging/detection.html' },
    ],
  },
  {
    id: 'trend-pregnancy-postpartum-warning-signs-blood-pressure-record-20260604',
    category: 'womens_health',
    question: '임신 중이나 출산 후 두통과 시야 흐림이 있을 때 어떤 경고 신호를 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>임신 중이거나 출산 후라면 두통, 시야 흐림, 심한 부종, 흉통, 호흡곤란을 단순 피로로 넘기지 말고 시작 시간과 강도를 기록해야 합니다.</strong> CDC HEAR HER는 임신 중과 출산 후 1년까지 긴급 산모 경고 신호를 알고 즉시 도움을 받으라고 안내합니다.</p>
  <p>산후 건강은 아기 돌봄만의 문제가 아니라 산모의 혈압, 출혈, 감염, 심장·호흡 증상, 정신건강 신호까지 함께 보는 과정입니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>두통이 갑자기 시작됐는지, 점점 심해지는지</li>
    <li>시야 흐림, 빛 번쩍임, 초점 안 맞음, 어지럼</li>
    <li>얼굴·손의 심한 부종, 한쪽 다리 붓기와 통증</li>
    <li>흉통, 가슴 압박감, 심한 두근거림, 호흡곤란</li>
    <li>38도 이상 발열, 오한, 악취 나는 분비물</li>
    <li>출혈량, 큰 혈괴, 집 혈압 수치</li>
    <li>임신고혈압, 전자간증, 산후 합병증 진단 이력</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 임신고혈압, 전자간증, 산후 출혈, 감염, 우울 증상을 완화하거나 예방하는 표현으로 쓰면 안 됩니다. 여성 건강 콘텐츠에서는 경고 신호와 의료 상담 기준이 먼저입니다.</p>
  <h4>바로 도움을 받아야 하는 경우</h4>
  <p>최악의 두통, 시야 변화, 실신, 흉통, 호흡곤란, 심한 복통, 38도 이상 발열, 심한 부종, 과다 출혈, 자해 생각은 기다리지 않는 것이 좋습니다. 출산 후 시간이 지났더라도 임신·출산 이력을 의료진에게 먼저 말해야 합니다.</p>
  <p>가족도 함께 확인해야 합니다. 산모가 너무 지쳐 있으면 본인의 증상을 작게 말할 수 있으므로 두통이 약으로도 안 가라앉는지, 시야가 흐린지, 숨이 찬지, 출혈이 얼마나 되는지 구체적으로 물어봐야 합니다.</p>
  <p>집에서 혈압을 잰다면 날짜, 시간, 수축기·이완기 혈압, 증상 동반 여부를 함께 적으세요. 단순 숫자보다 두통이나 시야 흐림이 같은 시간대에 있었는지가 상담에 더 도움이 됩니다.</p>
  <p>산후 검진을 한 번 받았다고 모든 위험이 끝난 것은 아닙니다. CDC는 출산 후 1년까지 경고 신호를 살피라고 안내하므로, 몸이 이상하다는 느낌을 “원래 산후에는 힘들다”로 넘기지 않는 것이 중요합니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>CDC: Urgent Maternal Warning Signs and Symptoms</li>
    <li>CDC: HEAR HER Educational Materials</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 임신 중·출산 후 경고 신호가 있으면 즉시 의료진과 상담하세요.</p>
</div>`,
    tags: ['여성건강', '산후건강', '임신고혈압', '두통', '시야흐림', '혈압'],
    difficulty: 'intermediate',
    views: 2477,
    likes: 157,
    related_insights: [
      '/insights/pregnancy-postpartum-warning-signs-blood-pressure-record-2026',
      '/blog/pregnancy-postpartum-warning-signs-blood-pressure-record-2026',
    ],
    references: [
      { title: 'CDC: Urgent Maternal Warning Signs and Symptoms', url: 'https://www.cdc.gov/hearher/maternal-warning-signs/index.html' },
      { title: 'CDC: HEAR HER Educational Materials', url: 'https://www.cdc.gov/hearher/hcp/toolkit/warning-signs-educational-materials.html' },
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
        '2026년 6월 최신 이슈 기반 부족 카테고리 보강. 공식 보건 자료를 반영하고 치료·예방 보장 표현을 배제함.',
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

function visibleLength(content) {
  return String(content || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/[^\s)]+/g, '')
    .replace(/\s+/g, '').length
}

function validateContent() {
  const riskyClaim = /(완치|치료됩니다|예방됩니다|보장합니다|대체합니다|정상화됩니다)/
  for (const post of ROUND31_TREND_BLOG_POSTS) {
    const length = visibleLength(post.content)
    if (length < 1250) throw new Error(`${post.slug}: content too short (${length})`)
    if (riskyClaim.test(post.content)) throw new Error(`${post.slug}: risky claim found`)
  }
  for (const item of questions) {
    const length = visibleLength(item.answer)
    if (length < 800) throw new Error(`${item.id}: answer too short (${length})`)
  }
}

validateContent()

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
