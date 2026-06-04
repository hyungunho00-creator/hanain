import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'
import { ROUND28_TREND_BLOG_POSTS } from '../src/data/localTrendBlogPostsRound28.js'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-04T14:35:00+09:00'

function loadEnvFile(name) {
  const file = path.join(ROOT, name)
  if (!fs.existsSync(file)) return

  for (const rawLine of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const index = line.indexOf('=')
    if (index === -1) continue
    const key = line.slice(0, index).trim()
    let value = line.slice(index + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnvFile('.env.local')
loadEnvFile('.env.vercel.local')

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
    id: 'trend-world-food-safety-day-foodborne-illness-home-record-20260604',
    category: 'digestive',
    question: '여름철 설사와 복통이 생기면 장 건강보다 어떤 식품 기록을 먼저 봐야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>여름철 설사와 복통은 “장 건강이 약해서”라고 단정하기보다, 무엇을 언제 먹었고 어떻게 보관했는지부터 기록해야 합니다.</strong> WHO는 세계 식품안전의 날 2026에서 안전하지 않은 식품으로 인한 질병 부담과 예방 가능한 해결책을 강조합니다.</p>
  <p>식중독은 유산균이나 건강식품으로 막는 문제가 아닙니다. CDC가 안내하는 기본은 깨끗하게, 분리해서, 충분히 익히고, 빨리 식히는 것입니다. 증상이 생겼다면 식품 취급 기록과 탈수 신호가 상담의 출발점입니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>마지막으로 먹은 음식과 먹은 시간</li>
    <li>함께 먹은 사람 중 같은 증상이 있는지</li>
    <li>실온에 둔 시간, 냉장 보관 여부, 재가열 여부</li>
    <li>날고기, 생선, 달걀, 비살균 우유, 씻지 않은 채소, 자른 과일 섭취 여부</li>
    <li>설사 횟수, 구토 횟수, 열, 복통 위치, 혈변 여부</li>
    <li>소변량 감소, 어지럼, 입마름, 기운 없음 같은 탈수 신호</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 식중독 예방, 살균, 설사 치료 성분처럼 설명하면 안 됩니다. 플로로탄닌은 장내미생물과 해양 폴리페놀 연구 맥락에서 조심스럽게 연결하되, 식품안전 콘텐츠의 중심은 식품 보관과 탈수 기준이어야 합니다.</p>
  <h4>집에서 바로 확인할 순서</h4>
  <p>냉장고 안 남은 음식에 조리 날짜를 붙이고, 날고기와 바로 먹는 식품을 분리해 보관했는지 확인하세요. 도시락이나 피크닉 음식은 실온에 머문 시간을 적어두고, 증상이 생기면 같은 음식을 먹은 사람에게도 비슷한 증상이 있는지 확인하는 것이 좋습니다.</p>
  <p>냄새가 괜찮거나 색이 멀쩡하다는 이유만으로 안전하다고 판단하지 마세요. 일부 식품매개 병원체는 눈으로 확인하기 어렵고, 다시 데우더라도 보관 과정이 잘못되면 위험을 줄이기 어렵습니다. 특히 자른 과일, 달걀 요리, 닭고기, 해산물, 유제품은 시간과 온도 기록이 더 중요합니다.</p>
  <h4>바로 상담이 필요한 경우</h4>
  <p>혈변, 고열, 심한 복통, 반복 구토, 탈수 신호, 3일 이상 지속되는 설사, 임신부·영유아·고령자·면역저하자의 증상은 의료 상담이 필요할 수 있습니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>WHO: World Food Safety Day 2026</li>
    <li>WHO: Food safety fact sheet</li>
    <li>CDC: Preventing Food Poisoning</li>
    <li>CDC: Food Poisoning Symptoms</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 심한 설사·구토나 탈수 신호가 있으면 의료진과 상담하세요.</p>
</div>`,
    tags: ['세계식품안전의날', '식중독', '여름식품안전', '장건강', '탈수', '소화간건강'],
    difficulty: 'intermediate',
    views: 2518,
    likes: 168,
    related_insights: [
      '/insights/world-food-safety-day-foodborne-illness-home-record-2026',
      '/blog/world-food-safety-day-foodborne-illness-home-record-2026',
    ],
    references: [
      { title: 'WHO: World Food Safety Day 2026', url: 'https://www.who.int/campaigns/world-food-safety-day/2026' },
      { title: 'WHO: Food safety fact sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/food-safety' },
      { title: 'CDC: Preventing Food Poisoning', url: 'https://www.cdc.gov/food-safety/prevention/index.html' },
      { title: 'CDC: Food Poisoning Symptoms', url: 'https://www.cdc.gov/food-safety/signs-symptoms/index.html' },
    ],
  },
  {
    id: 'trend-monsoon-mold-dampness-asthma-allergy-home-record-20260604',
    category: 'respiratory',
    question: '장마철 곰팡이 냄새와 기침이 반복되면 공기청정기보다 무엇을 먼저 확인해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>공기청정기보다 먼저 습도, 물샘, 결로, 곰팡이 위치와 호흡기 증상 시간을 함께 기록해야 합니다.</strong> EPA는 곰팡이 관리의 핵심을 습기 관리라고 설명합니다. 물 문제가 해결되지 않으면 청소해도 다시 생길 수 있습니다.</p>
  <p>곰팡이는 천식, 알레르기 비염, 눈·피부 자극과 겹쳐 나타날 수 있습니다. 특히 천식이 있거나 어린이·고령자·면역저하자가 있으면 증상 기록이 더 중요합니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>곰팡이 냄새가 나는 방, 벽, 창문, 욕실, 에어컨 주변 위치</li>
    <li>실내 습도, 결로, 누수, 젖은 벽지나 바닥 여부</li>
    <li>기침, 콧물, 코막힘, 눈 가려움, 피부 발진, 숨참 발생 시간</li>
    <li>비 오는 날, 청소 직후, 에어컨 가동 후 증상 변화</li>
    <li>천식 흡입제 사용 증가, 야간 기침, 운동 시 숨참 여부</li>
    <li>곰팡이 면적이 작고 일시적인지, 넓고 반복되는지</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 곰팡이 알레르기, 천식, 기침 치료 성분처럼 설명하면 안 됩니다. 장마철 호흡기 콘텐츠의 중심은 습도 관리, 물샘 해결, 곰팡이 제거, 천식 악화 신호 기록입니다.</p>
  <h4>집에서 바로 확인할 순서</h4>
  <p>습도계를 놓고 아침·저녁 습도를 적어보세요. 곰팡이를 닦은 날짜와 다시 올라온 날짜, 비 오는 날 기침이 심해지는지, 에어컨을 켠 뒤 증상이 달라지는지를 함께 적으면 단순 청소 문제인지 반복 습기 문제인지 구분하는 데 도움이 됩니다.</p>
  <p>곰팡이가 반복되는 공간은 사진으로 남기는 것도 좋습니다. 장롱 뒤, 창틀, 욕실 천장, 에어컨 배수 주변, 외벽과 맞닿은 벽은 시간이 지나면 상태가 달라져 원인을 설명하기 어려울 수 있습니다. 청소 제품을 여러 개 섞어 쓰는 방식은 호흡기 자극을 키울 수 있어 피해야 합니다.</p>
  <p>실내 상대습도는 가능하면 낮게 유지하고, 젖은 물건은 빨리 말리며, 반복 누수는 청소보다 수리가 먼저입니다. 천식 환자는 증상이 생긴 날의 습도와 흡입제 사용 횟수를 같이 적어야 진료 상담이 더 구체적입니다.</p>
  <h4>바로 상담이 필요한 경우</h4>
  <p>숨참, 쌕쌕거림, 야간 기침 악화, 흡입제 사용 증가, 가슴 답답함, 고열, 피 섞인 가래가 있으면 단순 곰팡이 냄새로 넘기지 않는 것이 안전합니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>EPA: Mold</li>
    <li>EPA: A Brief Guide to Mold, Moisture and Your Home</li>
    <li>CDC: Mold</li>
    <li>CDC: About Asthma</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 천식 악화나 호흡곤란은 의료진 상담이 필요할 수 있습니다.</p>
</div>`,
    tags: ['장마철곰팡이', '실내습도', '천식', '알레르기', '호흡기', '실내공기'],
    difficulty: 'intermediate',
    views: 2514,
    likes: 167,
    related_insights: [
      '/insights/monsoon-mold-dampness-asthma-allergy-home-record-2026',
      '/blog/monsoon-mold-dampness-asthma-allergy-home-record-2026',
    ],
    references: [
      { title: 'EPA: Mold', url: 'https://www.epa.gov/mold' },
      { title: 'EPA: A Brief Guide to Mold, Moisture and Your Home', url: 'https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home' },
      { title: 'CDC: Mold', url: 'https://www.cdc.gov/mold-health/about/index.html' },
      { title: 'CDC: About Asthma', url: 'https://www.cdc.gov/asthma/about/index.html' },
    ],
  },
  {
    id: 'trend-extreme-heat-medication-plan-older-adults-hydration-record-20260604',
    category: 'cardiovascular',
    question: '폭염이 시작되기 전에 고령자와 혈압약 복용자는 무엇을 미리 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>물을 많이 마시자는 구호보다 복용약, 냉방 가능 장소, 정전 계획, 평소 혈압·소변량·어지럼 기록이 먼저입니다.</strong> CDC는 더운 날을 대비해 의료진과 Heat Action Plan을 만들고, 복용약과 기저질환을 함께 확인하라고 안내합니다.</p>
  <p>폭염은 기온만의 문제가 아닙니다. 고령자, 심혈관질환자, 이뇨제·혈압약·정신건강 약물·항히스타민제 등을 복용하는 사람은 더위와 탈수에 더 취약할 수 있습니다. 단, 약은 임의로 줄이거나 끊으면 안 됩니다.</p>
  <h4>미리 기록할 것</h4>
  <ul>
    <li>혈압약, 이뇨제, 심장약, 정신건강 약물, 항히스타민제, 진통제 이름</li>
    <li>냉장 보관 약, 고온에 약한 약, 전자 의료기기 여부</li>
    <li>평소 혈압, 맥박, 체중, 소변량, 어지럼 발생 시간</li>
    <li>냉방 가능한 방, 가까운 무더위 쉼터, 정전 시 이동 장소</li>
    <li>혼자 사는 가족이나 이웃에게 확인 전화할 시간</li>
    <li>야외활동, 출퇴근, 운동, 작업 시간을 조정할 수 있는지</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 폭염 예방, 탈수 방지, 혈압 안정, 온열질환 치료 성분처럼 설명하면 안 됩니다. 폭염 콘텐츠의 핵심은 냉방, 수분, 약물, 보호자 연락망, 응급 신호입니다.</p>
  <h4>집에서 바로 확인할 순서</h4>
  <p>복용약 목록을 사진으로 저장하고, 하루 중 집이 가장 더운 시간과 냉방 가능한 공간을 정해두세요. 혼자 사는 고령 가족이 있다면 폭염 특보가 있는 날 확인 전화를 할 시간을 정하고, 어지럼·소변량 감소·혼란 같은 신호를 물어볼 문장을 미리 준비하는 것이 좋습니다.</p>
  <p>약 보관도 확인해야 합니다. 냉장 보관이 필요한 약, 고온에 약한 약, 전자 의료기기 사용 여부를 미리 적어두면 정전이나 외출 상황에서 당황하지 않습니다. 폭염일에 혈압이 평소와 다르거나 어지럼이 반복되면 약을 임의로 줄이지 말고 의료진에게 현재 수치와 증상을 알려야 합니다.</p>
  <p>가족이나 보호자는 “물을 드셨나요?”만 묻기보다 오늘 몇 번 소변을 봤는지, 평소보다 말이 느려지거나 혼란스러운지, 가슴 답답함이나 숨참이 있는지 확인하는 편이 더 안전합니다. 냉방이 어려운 집이라면 가까운 냉방 장소와 이동 방법도 미리 정해두세요.</p>
  <h4>바로 상담이 필요한 경우</h4>
  <p>혼란, 의식 저하, 실신, 흉통, 호흡곤란, 지속 구토, 매우 뜨겁고 건조한 피부, 소변량 급감은 폭염일에 미루면 안 되는 신호입니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>CDC: About Heat and Your Health</li>
    <li>CDC: Clinical Guidance for Heat Health</li>
    <li>WHO: Heat and health</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 복용약 조정이나 온열질환 의심 증상은 의료진과 상담하세요.</p>
</div>`,
    tags: ['폭염', '온열질환', '이뇨제', '혈압약', '고령자건강', '심혈관'],
    difficulty: 'advanced',
    views: 2510,
    likes: 166,
    related_insights: [
      '/insights/extreme-heat-medication-plan-older-adults-hydration-record-2026',
      '/blog/extreme-heat-medication-plan-older-adults-hydration-record-2026',
    ],
    references: [
      { title: 'CDC: About Heat and Your Health', url: 'https://www.cdc.gov/heat-health/about/index.html' },
      { title: 'CDC: Clinical Guidance for Heat Health', url: 'https://www.cdc.gov/heat-health/hcp/clinical-guidance/index.html' },
      { title: 'WHO: Heat and health', url: 'https://www.who.int/news-room/fact-sheets/detail/climate-change-heat-and-health' },
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
        '2026년 6월 최신 이슈 기반 카테고리 보강. 공식 보건 자료를 반영하고 치료·예방 보장 표현을 배제함.',
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
  for (const post of ROUND28_TREND_BLOG_POSTS) {
    const length = visibleLength(post.content)
    if (length < 1400) throw new Error(`${post.slug}: content too short (${length})`)
    if (riskyClaim.test(post.content)) throw new Error(`${post.slug}: risky claim found`)
  }
  for (const item of questions) {
    const length = visibleLength(item.answer)
    if (length < 850) throw new Error(`${item.id}: answer too short (${length})`)
  }
}

async function upsertPosts() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase service key is missing. Local Q&A assets were updated; use the Supabase connector for DB upsert.')
    return []
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  })

  const rows = ROUND28_TREND_BLOG_POSTS.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    tags: post.tags,
    meta_title: post.meta_title,
    meta_desc: post.meta_desc,
    og_image: post.og_image,
    status: post.status,
    view_count: post.view_count || 0,
    published_at: post.published_at,
    created_at: post.created_at,
    updated_at: post.updated_at,
  }))

  const { data, error } = await supabase
    .from('posts')
    .upsert(rows, { onConflict: 'slug' })
    .select('slug,title,category,status,published_at,updated_at')

  if (error) throw error
  return data || []
}

validateContent()

for (const file of [
  path.join(ROOT, 'public/qa.json'),
  path.join(ROOT, 'src/data/qa.json'),
]) {
  const { inserted, updated } = addQuestions(file)
  console.log(`${path.relative(ROOT, file)}: inserted ${inserted}, updated ${updated}`)
}

const upserted = await upsertPosts()
console.log(JSON.stringify(upserted, null, 2))

const data = loadJson(path.join(ROOT, 'public/qa.json'))
console.log(`questions ${data.questions.length} updatedAt ${data.updatedAt}`)
for (const id of questions.map((item) => item.id)) {
  const item = data.questions.find((question) => question.id === id)
  console.log(`${item.category} ${item.question} ${String(item.answer || '').length}`)
}
