import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'
import { ROUND29_TREND_BLOG_POSTS } from '../src/data/localTrendBlogPostsRound29.js'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-04T16:15:00+09:00'

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
    id: 'trend-summer-scalp-sunburn-thinning-hair-uv-record-20260604',
    category: 'hair',
    question: '여름에 가르마와 정수리가 따가우면 탈모보다 무엇을 먼저 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>먼저 두피 자외선 노출 기록을 봐야 합니다.</strong> 가르마와 정수리가 빨갛고 따갑고 며칠 뒤 벗겨진다면 탈모라고 단정하기보다 야외 노출 시간, UV 지수, 모자 착용 여부, 수영·운동 후 두피 자극을 함께 기록해야 합니다.</p>
  <p>CDC는 자외선 노출이 흐린 날에도 영향을 줄 수 있고 물·모래·시멘트 같은 표면에서 반사될 수 있다고 안내합니다. FDA는 자외선차단제의 SPF, broad spectrum, 재도포 조건을 확인하라고 설명합니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>가르마와 정수리의 붉어짐, 따가움, 벗겨짐</li>
    <li>야외 노출 시간, UV 지수, 모자 착용, 그늘 이용 여부</li>
    <li>수영장·바닷물·땀 이후 세정 시간과 두피 자극감</li>
    <li>최근 다이어트, 수면 부족, 스트레스, 새로 시작한 약</li>
    <li>한 부위가 비는지, 전체적으로 얇아지는지, 통증·진물이 있는지</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌은 해양 폴리페놀의 항산화 연구 맥락에서 소개할 수 있지만, 두피 화상이나 탈모를 해결하는 표현으로 쓰면 안 됩니다. 이 주제의 중심은 자외선 노출 기록과 두피 변화 관찰입니다.</p>
  <h4>집에서 확인할 순서</h4>
  <p>같은 조명, 같은 거리, 같은 가르마로 주 1회 사진을 남기세요. 매일 빠진 머리카락 숫자에 집착하기보다, 두피가 붉어진 날의 외출 시간과 수영·운동·염색·스크럽 같은 자극을 함께 적는 편이 더 도움이 됩니다.</p>
  <p>두피가 벗겨지는 동안 강한 스크럽, 염색, 뜨거운 드라이를 바로 반복하면 자극이 커질 수 있습니다. 한 부위가 동그랗게 비거나 진물, 통증, 심한 비듬이 함께 있으면 의료진 상담 기준으로 보는 것이 좋습니다.</p>
  <p>외출 전에는 얼굴 자외선차단제만 확인하지 말고 가르마와 정수리가 얼마나 드러나는지 보세요. 스프레이형 제품을 쓰더라도 충분히 덮였는지 확인하기 어렵다면 모자와 그늘이 더 안정적인 선택입니다. 특히 머리숱이 얇아진 사람, 야외 근무자, 골프·등산·해변 활동이 긴 사람은 노출 시간을 따로 적어두는 것이 좋습니다.</p>
  <p>머리 빠짐이 함께 느껴질 때는 햇빛 노출만 보지 말고 최근 체중 감량, 단백질 섭취 감소, 수면 부족, 고열, 약물 변화도 같이 적어야 합니다. 두피 자극과 전신 변화가 겹치면 원인을 하나로 단정하기 어렵기 때문입니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>CDC: Sun Safety Facts</li>
    <li>FDA: Sunscreen: How to Help Protect Your Skin from the Sun</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 두피 통증, 진물, 급격한 탈모 변화가 있으면 의료진과 상담하세요.</p>
</div>`,
    tags: ['두피자외선', '두피화상', '가르마', '모발건강', '자외선차단제', '모발두피'],
    difficulty: 'intermediate',
    views: 2508,
    likes: 165,
    related_insights: [
      '/insights/summer-scalp-sunburn-thinning-hair-uv-record-2026',
      '/blog/summer-scalp-sunburn-thinning-hair-uv-record-2026',
    ],
    references: [
      { title: 'CDC: Sun Safety Facts', url: 'https://www.cdc.gov/skin-cancer/sun-safety/index.html' },
      { title: 'FDA: Sunscreen: How to Help Protect Your Skin from the Sun', url: 'https://www.fda.gov/drugs/understanding-over-counter-medicines/sunscreen-how-help-protect-your-skin-sun' },
    ],
  },
  {
    id: 'trend-mens-health-month-blood-pressure-waist-snoring-screening-record-20260604',
    category: 'mens_health',
    question: '6월 남성 건강 체크는 전립선 검사보다 어떤 기록을 먼저 준비해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>전립선 검사 하나보다 혈압, 허리둘레, 코골이, 배변 변화, 소변 증상, 가족력을 함께 준비해야 합니다.</strong> 남성 건강 상담은 검사를 무조건 정하는 일이 아니라 나이와 위험요인, 생활 기록을 놓고 의료진과 대화하는 과정입니다.</p>
  <p>CDC는 고혈압 위험요인과 대장암 검진의 중요성을 안내하고, USPSTF는 55~69세 남성의 PSA 기반 전립선암 선별검사는 개인별 이득과 해를 논의해 결정하라고 권고합니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>집 혈압: 아침·저녁, 같은 자세, 같은 팔, 날짜와 함께 기록</li>
    <li>허리둘레와 체중 변화, 음주·야식 패턴</li>
    <li>코골이, 숨 멎음, 낮 졸림, 아침 두통</li>
    <li>소변 줄기 약화, 밤중 배뇨, 혈뇨, 통증 여부</li>
    <li>혈변, 배변 습관 변화, 대장암 가족력</li>
    <li>당뇨, 고혈압, 이상지질혈증, 심혈관질환 가족력</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 혈압, 전립선, 대장암 검진, 수면무호흡을 대신하는 표현으로 쓰면 안 됩니다. 남성 건강 카테고리에서는 혈압·허리둘레·수면·검진 대화 기록을 먼저 보여주는 것이 신뢰를 만듭니다.</p>
  <h4>집에서 확인할 순서</h4>
  <p>진료 전 1주일 동안 아침·저녁 혈압을 기록하고, 가족에게 코골이와 숨 멎는 소리가 있는지 물어보세요. 45세 이상이면 대장암 검진 이력을 확인하고, 55~69세라면 PSA 검사의 장단점을 질문 목록으로 준비하는 것이 좋습니다.</p>
  <p>혈뇨, 흉통, 숨참, 실신, 갑작스러운 체중 감소, 변에 피가 보이는 증상은 남성 건강검진을 기다리기보다 상담 기준으로 봐야 합니다.</p>
  <p>운동 보충제, 에너지드링크, 고카페인 커피, 야근과 수면 부족도 같이 적어두세요. 남성 건강 상담에서 두근거림, 혈압 변화, 피로가 나왔을 때 생활 패턴 기록이 있으면 원인을 좁히기 쉽습니다. 허리둘레와 체중도 숫자로 남기면 복부비만과 대사 위험을 더 현실적으로 볼 수 있습니다.</p>
  <p>전립선 관련 질문은 소변 증상만으로 결론 내리지 말고 나이, 가족력, PSA 검사 경험, 약 복용 이력을 함께 준비하세요. 검진은 불안을 키우는 이벤트가 아니라 내 위험도를 이해하기 위한 대화가 되어야 합니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>CDC: High Blood Pressure Risk Factors</li>
    <li>CDC: Screening for Colorectal Cancer</li>
    <li>USPSTF: Prostate Cancer Screening</li>
    <li>NHLBI: Sleep Apnea</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 검진 시기와 약물 조정은 의료진과 상담하세요.</p>
</div>`,
    tags: ['남성건강', '혈압', '허리둘레', '전립선검사', '코골이', '검진'],
    difficulty: 'advanced',
    views: 2504,
    likes: 164,
    related_insights: [
      '/insights/mens-health-month-blood-pressure-waist-snoring-screening-record-2026',
      '/blog/mens-health-month-blood-pressure-waist-snoring-screening-record-2026',
    ],
    references: [
      { title: 'CDC: High Blood Pressure Risk Factors', url: 'https://www.cdc.gov/high-blood-pressure/risk-factors/index.html' },
      { title: 'CDC: Screening for Colorectal Cancer', url: 'https://www.cdc.gov/colorectal-cancer/screening/index.html' },
      { title: 'USPSTF: Prostate Cancer Screening', url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/prostate-cancer-screening' },
      { title: 'NHLBI: Sleep Apnea', url: 'https://www.nhlbi.nih.gov/health/sleep-apnea' },
    ],
  },
  {
    id: 'trend-summer-uti-women-hydration-urination-symptom-record-20260604',
    category: 'womens_health',
    question: '여름에 방광염이 의심될 때 물을 많이 마시기보다 어떤 증상을 먼저 기록해야 하나요?',
    answer: `<div class="qa-structured">
  <p><strong>배뇨통, 빈뇨, 혈뇨, 발열, 옆구리 통증을 먼저 기록해야 합니다.</strong> 여름에는 여행, 수영, 땀, 장시간 이동, 배뇨 참기 때문에 요로감염 검색이 늘지만, 물을 많이 마시는 조언만으로 끝내면 중요한 신호를 놓칠 수 있습니다.</p>
  <p>Office on Women’s Health는 요로감염이 여성에게 흔하고, 배뇨통·잦은 소변·하복부 압박감·탁하거나 냄새 나는 소변·혈뇨·발열 같은 증상이 나타날 수 있다고 안내합니다.</p>
  <h4>먼저 기록할 것</h4>
  <ul>
    <li>배뇨 시 통증이나 화끈거림이 시작된 날짜와 시간</li>
    <li>소변을 자주 보지만 양이 적은지, 급하게 마려운지</li>
    <li>하복부 압박감, 냄새, 탁한 소변, 혈뇨 여부</li>
    <li>발열, 오한, 옆구리·등 통증, 메스꺼움</li>
    <li>임신 가능성, 당뇨, 폐경 이후 변화, 요로결석 병력</li>
    <li>최근 여행, 수영, 장시간 이동, 배뇨 참은 시간</li>
  </ul>
  <h4>주의할 표현</h4>
  <p>플로로탄닌을 요로감염, 방광염, 항생제 관리를 대신하는 방식으로 설명하면 안 됩니다. 여성 건강 콘텐츠에서는 배뇨 증상 기록과 상담 기준을 분명히 보여주는 것이 중요합니다.</p>
  <h4>집에서 확인할 순서</h4>
  <p>증상 날짜와 함께 여행·수영·장시간 이동·수분 감소를 적어보세요. 반복되는 경우에는 지난번 항생제 이름, 복용 기간, 검사 여부를 함께 기록하면 상담이 더 정확해집니다.</p>
  <p>발열, 혈뇨, 옆구리 통증, 임신 중 증상, 당뇨가 있는 상태의 증상은 빨리 상담하는 것이 안전합니다. 증상이 조금 나아졌다는 이유로 약을 임의로 중단한 경험이 있다면 그 내용도 기록하세요.</p>
  <p>소변을 본 횟수와 통증 위치도 함께 적으세요. 배뇨 시작부터 아픈지, 끝에 찌릿한지, 하복부가 묵직한지, 옆구리까지 아픈지에 따라 상담에서 확인할 내용이 달라질 수 있습니다. 냄새나 색 변화는 주관적일 수 있으므로 혈뇨처럼 눈에 띄는 변화는 날짜와 함께 남기는 것이 좋습니다.</p>
  <p>여름에는 수영복을 오래 젖은 상태로 입거나, 이동 중 화장실을 피하거나, 카페인 음료를 많이 마시는 상황이 겹칠 수 있습니다. 이런 생활 장면을 증상과 같이 적으면 단순한 불편감인지 반복되는 요로감염 위험인지 더 분명하게 볼 수 있습니다.</p>
  <h4>참고한 건강정보</h4>
  <ul>
    <li>Office on Women’s Health: Urinary tract infections</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보입니다. 발열, 혈뇨, 옆구리 통증, 임신 중 증상은 의료진과 상담하세요.</p>
</div>`,
    tags: ['여성건강', '방광염', '요로감염', '배뇨통', '혈뇨', '여름건강'],
    difficulty: 'intermediate',
    views: 2500,
    likes: 163,
    related_insights: [
      '/insights/summer-uti-women-hydration-urination-symptom-record-2026',
      '/blog/summer-uti-women-hydration-urination-symptom-record-2026',
    ],
    references: [
      { title: 'Office on Women’s Health: Urinary tract infections', url: 'https://womenshealth.gov/a-z-topics/urinary-tract-infections' },
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
  for (const post of ROUND29_TREND_BLOG_POSTS) {
    const length = visibleLength(post.content)
    if (length < 1250) throw new Error(`${post.slug}: content too short (${length})`)
    if (riskyClaim.test(post.content)) throw new Error(`${post.slug}: risky claim found`)
  }
  for (const item of questions) {
    const length = visibleLength(item.answer)
    if (length < 800) throw new Error(`${item.id}: answer too short (${length})`)
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

  const rows = ROUND29_TREND_BLOG_POSTS.map((post) => ({
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
