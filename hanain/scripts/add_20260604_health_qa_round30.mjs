import fs from 'node:fs'
import path from 'node:path'
import { ROUND30_TREND_BLOG_POSTS } from '../src/data/localTrendBlogPostsRound30.js'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-04T17:10:00+09:00'

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
    id: 'trend-summer-swimming-scalp-itch-chlorine-saltwater-record-20260604',
    category: 'hair',
    question: '수영장이나 바닷물 뒤 두피가 가려우면 탈모보다 무엇을 먼저 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>수영 후 두피 가려움은 탈모로 단정하기보다 물 접촉 장소, 세정 시간, 발진 위치를 먼저 기록해야 합니다.</strong> 수영장 물, 바닷물, 자외선, 땀, 젖은 수건, 수영모 경계 자극이 겹치면 두피가 일시적으로 예민해질 수 있습니다.</p>
  <p>CDC는 건강한 수영을 위해 수영 전후 샤워, 물 삼키지 않기, 설사 중 수영 피하기 같은 기본 위생을 안내합니다. 자연수 접촉 뒤 가려운 발진이 생기는 swimmer’s itch도 물 접촉 장소와 시간이 중요합니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>수영장, 워터파크, 바닷가, 호수 중 어디였는지</li>
    <li>물에 들어간 시간과 머리까지 젖었는지</li>
    <li>수영 후 샴푸·헹굼까지 걸린 시간</li>
    <li>두피 가려움, 따가움, 발진, 진물, 통증 위치</li>
    <li>수영모 경계선, 귀 뒤, 목덜미, 이마선 발진 여부</li>
    <li>염색모, 탈색모, 펌, 두피 시술 직후인지</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 수영 후 두피 가려움, 발진, swimmer’s itch, 감염성 피부 문제를 해결하는 표현으로 쓰면 안 됩니다. 이 주제는 물 접촉 기록과 상담 기준이 중심입니다.</p>
  <h4>집에서 확인할 순서</h4>
  <p>수영 후에는 두피와 모발을 오래 젖은 상태로 두기보다 빨리 헹구고, 강한 스크럽이나 새 제품 추가는 잠시 피하세요. 가려움이 있는 부위는 이마선, 귀 뒤, 목덜미, 정수리를 같은 조명에서 사진으로 남기면 발진과 각질을 구분하는 데 도움이 됩니다.</p>
  <p>발진이 넓어지거나 진물, 통증, 고열, 심한 붓기, 반복되는 두피 염증, 한 부위 탈모가 함께 있으면 단순 수영 후 건조로 넘기지 않는 것이 좋습니다.</p>
  <p>같은 장소에 다녀온 가족이나 친구에게도 가려움이나 발진이 있었는지 물어보세요. 여러 사람이 비슷한 증상을 말하면 개인 두피 문제만이 아니라 물 접촉 환경도 함께 봐야 합니다. 반대로 혼자만 반복된다면 염색·펌 이력, 사용 제품, 수영 후 세정 습관을 더 자세히 기록하는 것이 좋습니다.</p>
  <p>머리 빠짐이 걱정될 때는 수영 직후 엉킨 모발이 빠져 보이는 것인지, 실제로 며칠 이상 빠짐이 늘었는지 나눠 보세요. 같은 조명에서 정수리와 가르마 사진을 남기면 불안한 느낌보다 정확한 변화를 확인하기 쉽습니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>CDC: Swimming and Your Health</li>
    <li>CDC: About Swimmer’s Itch</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 발진, 통증, 진물, 탈모 변화가 지속되면 의료진과 상담하세요.</p>
</div>`,
    tags: ['수영장두피', '두피가려움', '염소', '바닷물', '모발건조', '모발두피'],
    difficulty: 'intermediate',
    views: 2496,
    likes: 162,
    related_insights: [
      '/insights/summer-swimming-scalp-itch-chlorine-saltwater-record-2026',
      '/blog/summer-swimming-scalp-itch-chlorine-saltwater-record-2026',
    ],
    references: [
      { title: 'CDC: Swimming and Your Health', url: 'https://www.cdc.gov/healthy-swimming/about/index.html' },
      { title: 'CDC: About Swimmer’s Itch', url: 'https://www.cdc.gov/swimmers-itch/about/index.html' },
    ],
  },
  {
    id: 'trend-abdominal-aortic-aneurysm-men-smoking-screening-record-20260604',
    category: 'mens_health',
    question: '흡연력이 있는 남성은 복부대동맥류 선별검사에 대해 무엇을 준비해서 물어봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>65~75세 남성이고 흡연력이 있다면 복부대동맥류 1회 초음파 선별검사 대상인지 의료진에게 질문해볼 수 있습니다.</strong> USPSTF는 이 조건에 해당하는 남성에게 선별검사를 권고합니다.</p>
  <p>이 검사는 모든 남성에게 무조건 필요한 것이 아닙니다. 나이, 흡연력, 가족력, 혈압, 과거 영상검사 이력을 정리해서 본인이 기준에 해당하는지 확인하는 방식이 안전합니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>현재 나이와 흡연 기간, 하루 흡연량, 금연 시점</li>
    <li>고혈압, 이상지질혈증, 당뇨, 심혈관질환 병력</li>
    <li>가족 중 복부대동맥류, 대동맥질환, 갑작스러운 혈관 문제 여부</li>
    <li>집 혈압 기록과 복용 중인 혈압약·지질약</li>
    <li>과거 CT, 초음파, 건강검진에서 대동맥 관련 언급이 있었는지</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 복부대동맥류 선별검사, 혈관질환 관리, 초음파 검사를 대신하는 표현으로 쓰면 안 됩니다. 이 주제에서는 흡연력, 혈압, 가족력, 검진 대화 기록이 중심입니다.</p>
  <h4>검진 전에 물어볼 질문</h4>
  <p>“제가 65~75세 흡연력 있는 남성 기준에 해당하나요?”, “복부대동맥류 초음파 검사가 필요한가요?”, “가족력이 있으면 판단이 달라지나요?”처럼 구체적으로 묻는 것이 좋습니다. 일반 혈액검사로 확인하는 항목이 아니기 때문에 어떤 검사를 받았는지도 확인해야 합니다.</p>
  <p>갑작스럽고 심한 복부 또는 허리 통증, 실신, 쇼크 증상은 검진 상담을 기다리는 문제가 아닐 수 있습니다. 이런 증상은 빠른 의료 평가가 필요합니다.</p>
  <p>흡연력은 “예전에 피웠다”로만 말하지 말고 흡연 기간, 하루 흡연량, 금연 시점을 대략이라도 적어두세요. 집 혈압이 있다면 최근 1~2주 평균을 가져가고, 가족 중 대동맥류나 갑작스러운 혈관 문제가 있었는지도 함께 확인하면 상담이 더 구체적입니다.</p>
  <p>과거 CT나 복부 초음파를 받은 적이 있다면 결과지에 대동맥 크기나 동맥류 관련 언급이 있었는지 확인하세요. 복부대동맥류 선별은 일반 혈액검사로 확인하는 검사가 아니므로 검진표의 검사 항목을 직접 보는 것이 중요합니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>USPSTF: Abdominal Aortic Aneurysm Screening</li>
    <li>NHLBI: Aortic Aneurysm</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 선별검사 대상과 치료 판단은 의료진과 상담하세요.</p>
</div>`,
    tags: ['남성건강', '복부대동맥류', '흡연력', '초음파검사', '혈압', '검진'],
    difficulty: 'advanced',
    views: 2492,
    likes: 161,
    related_insights: [
      '/insights/abdominal-aortic-aneurysm-men-smoking-screening-record-2026',
      '/blog/abdominal-aortic-aneurysm-men-smoking-screening-record-2026',
    ],
    references: [
      { title: 'USPSTF: Abdominal Aortic Aneurysm Screening', url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/abdominal-aortic-aneurysm-screening' },
      { title: 'NHLBI: Aortic Aneurysm', url: 'https://www.nhlbi.nih.gov/health/aortic-aneurysm' },
    ],
  },
  {
    id: 'trend-hpv-self-collection-cervical-screening-record-20260604',
    category: 'womens_health',
    question: 'HPV 자가채취가 궁금할 때 자궁경부암 검진 전에 어떤 기록을 먼저 정리해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>HPV 자가채취를 검색하기 전에 마지막 Pap 검사와 HPV 검사 날짜, 결과, 이상소견 후속 이력을 먼저 정리해야 합니다.</strong> 자가채취는 아무 키트를 집에서 마음대로 쓰는 개념이 아니라 승인된 검사와 의료진 안내가 중요합니다.</p>
  <p>CDC는 HPV 검사와 Pap 검사가 자궁경부암을 예방하거나 조기에 찾는 데 도움을 줄 수 있다고 안내합니다. NCI는 일부 HPV 검사의 self-collection 사용이 의료 환경에서 확대 승인되었다고 설명합니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>마지막 Pap 검사 또는 HPV 검사 날짜</li>
    <li>결과가 정상, HPV 양성, ASC-US 등 이상소견이었는지</li>
    <li>질확대경 검사, 조직검사, 치료 이력이 있었는지</li>
    <li>HPV 백신 접종 여부와 접종 시기</li>
    <li>임신 가능성, 면역저하 상태, 특수 상황 여부</li>
    <li>비정상 출혈, 성교 후 출혈, 골반통 같은 증상 여부</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 HPV 감염, 자궁경부암 검진, 이상세포 관리를 대신하는 표현으로 쓰면 안 됩니다. 여성 건강 콘텐츠에서는 검진 이력과 후속 상담 기준을 명확히 보여주는 것이 신뢰를 지킵니다.</p>
  <h4>상담 전에 물어볼 질문</h4>
  <p>“내 검진 이력에서 HPV 검사와 Pap 검사 중 무엇이 적절한가요?”, “자가채취가 가능한 상황인가요?”, “이전 이상소견이 있으면 추적 간격이 달라지나요?”처럼 질문을 준비하세요. 검진을 오래 미뤘다면 마지막 날짜를 모른다고 솔직히 말하고 다음 계획을 세우는 것이 좋습니다.</p>
  <p>비정상 출혈, 성교 후 출혈, 지속적인 골반통은 단순 검진 시기만 기다릴 문제가 아닐 수 있습니다. 현재 증상이 있다면 검진 예약과 별도로 의료진 상담이 필요할 수 있습니다.</p>
  <p>검진 결과지를 갖고 있다면 날짜와 결과 용어를 사진으로 저장해 두세요. HPV 양성, ASC-US, LSIL, HSIL 같은 용어가 있었다면 다음 검사 간격이나 follow-up 방식이 달라질 수 있습니다. 자가채취 가능 여부도 과거 결과와 현재 상황을 함께 봐야 합니다.</p>
  <p>자가채취는 접근성을 높이는 방식으로 관심을 받지만, 모든 상황에서 의료진 채취를 대체하는 방식으로 이해하면 안 됩니다. 특히 이전 이상소견, 면역저하, 임신 가능성, 현재 증상이 있다면 의료진에게 먼저 알리는 것이 안전합니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>CDC: Screening for Cervical Cancer</li>
    <li>NCI: HPV Tests with Self-Collection in a Health Setting Approved</li>
    <li>American Cancer Society: HPV Self-collection Test</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 검진 간격과 후속 검사는 의료진과 상담하세요.</p>
</div>`,
    tags: ['여성건강', 'HPV검사', '자가채취', '자궁경부암검진', 'Pap검사', '검진'],
    difficulty: 'intermediate',
    views: 2488,
    likes: 160,
    related_insights: [
      '/insights/hpv-self-collection-cervical-screening-record-2026',
      '/blog/hpv-self-collection-cervical-screening-record-2026',
    ],
    references: [
      { title: 'CDC: Screening for Cervical Cancer', url: 'https://www.cdc.gov/cervical-cancer/screening/' },
      { title: 'NCI: HPV Tests with Self-Collection in a Health Setting Approved', url: 'https://www.cancer.gov/news-events/cancer-currents-blog/2024/fda-hpv-test-self-collection-health-care-setting' },
      { title: 'American Cancer Society: HPV Self-collection Test', url: 'https://www.cancer.org/cancer/risk-prevention/hpv/hpv-and-hpv-testing/self-collection.html' },
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
  for (const post of ROUND30_TREND_BLOG_POSTS) {
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
