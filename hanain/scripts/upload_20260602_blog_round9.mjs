import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const ROOT = process.cwd()
const PUBLISHED_AT = '2026-06-02T15:41:00+09:00'

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

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL/key is missing. Check .env.vercel.local or local env vars.')
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
})

function sourceList(items) {
  return items.map(([label, url]) => `- [${label}](${url})`).join('\n')
}

function buildHearingPost() {
  const sources = [
    ['Neurology 2026, Treating Hearing Loss With Hearing Aids for the Prevention of Cognitive Decline and Dementia', 'https://www.neurology.org/doi/10.1212/WNL.0000000000214572'],
    ['Frontiers in Dementia 2026, Dementia and hearing loss: from risk to mechanisms and management', 'https://www.frontiersin.org/journals/dementia/articles/10.3389/frdem.2026.1736003/full'],
    ['Frontiers in Epidemiology 2026, Hearing loss and incident dementia', 'https://www.frontiersin.org/journals/epidemiology/articles/10.3389/fepid.2026.1798451/full'],
  ]

  return `## 난청은 귀만의 문제가 아니라 생활 반경의 문제입니다

난청과 치매위험은 2026년에도 계속 검색량이 커지는 주제입니다. 이유는 단순합니다. 가족이 TV 소리를 크게 틀거나, 전화 통화를 어려워하거나, 모임을 피하기 시작하면 많은 사람이 “기억력이 떨어진 걸까”라고 걱정하기 때문입니다. 하지만 이 주제는 조심해서 설명해야 합니다. 보청기는 기억력 약이 아니고, 난청을 관리한다고 치매가 예방된다고 단정할 수 없습니다. 그래도 난청을 방치하지 않는 것이 뇌건강 관리에서 중요하다는 근거는 점점 더 쌓이고 있습니다.

2026년 Neurology 연구는 중등도 난청이 있는 고령자에서 보청기 처방과 치매위험 감소가 관련될 수 있음을 다뤘습니다. 동시에 연구진은 직접적인 예방 효과를 단정하지 않습니다. Frontiers의 2026년 리뷰도 난청이 인지 기능과 연결될 수 있는 경로를 정리하지만, 개인에게 “보청기를 쓰면 기억력이 좋아진다”고 말할 수 있는 수준은 아니라고 봐야 합니다.

## 왜 난청이 기억력 문제처럼 보일까

대화를 듣기 어려우면 뇌는 말소리를 이해하기 위해 더 많은 집중력을 씁니다. 같은 모임에 있어도 대화 참여가 줄고, 모임을 피하게 되며, 사회적 고립과 우울감이 겹칠 수 있습니다. 이런 변화가 쌓이면 주변 사람은 “깜빡한다”, “대화 내용을 잘 못 따라온다”, “예전 같지 않다”고 느낍니다. 실제 인지 저하인지, 청력 문제로 인한 대화 단절인지, 수면과 우울감이 겹친 것인지는 기록과 평가 없이는 구분하기 어렵습니다.

그래서 좋은 콘텐츠는 보청기 제품 이야기로 바로 뛰어가면 안 됩니다. 먼저 청력검사, 착용 순응도, 생활 변화, 가족의 관찰 기록을 정리하게 해야 합니다. 특히 보청기는 처음 착용하면 불편하거나 소리가 낯설 수 있습니다. 조정 과정을 거치지 않으면 서랍 속에 들어가고, 그러면 “효과가 없다”는 결론만 남습니다.

## 상담 전에 확인할 기록

- 최근 청력검사 날짜와 좌우 청력 차이
- TV 소리 크기, 전화 통화 어려움, 말소리를 되묻는 빈도
- 보청기 착용시간, 불편감, 소음 많은 장소에서의 어려움
- 모임 회피, 대화 피로, 우울감, 수면 변화
- 기억력 변화, 복용약, 혈압·당뇨·심혈관질환 같은 기저질환

갑자기 한쪽 청력이 떨어지거나 귀 먹먹함, 심한 이명, 어지럼이 동반되면 생활관리보다 이비인후과 진료가 먼저입니다. 기억력 저하가 일상 기능을 방해하거나 길을 잃는 일이 생긴다면 신경과나 정신건강의학과 상담도 필요합니다.

가족이 도울 수 있는 부분도 분명합니다. “왜 못 알아듣느냐”고 지적하기보다 조용한 자리에서 얼굴을 보고 말하고, 중요한 일정은 문자로 다시 남기며, 보청기 조정 일정을 함께 챙기는 방식이 실제 생활에 도움이 됩니다. 난청 관리는 한 번의 구매가 아니라 적응과 조정의 과정입니다. 착용을 포기한 날짜와 이유를 적어 두면 다음 상담에서 소리 크기, 울림, 착용감, 배터리 문제를 더 구체적으로 해결할 수 있습니다.

## 플로로탄닌 콘텐츠에서는 어떻게 연결해야 하나

플로로탄닌을 치매 예방, 난청 개선, 기억력 치료로 설명하면 안 됩니다. 이 주제에서 플로로탄닌닷컴이 해야 할 일은 해조 유래 성분을 과장하는 것이 아니라, 뇌건강을 볼 때 청력·수면·혈압·운동·사회활동을 함께 기록하라는 기준을 제공하는 것입니다. 이렇게 해야 소비자도 정보를 신뢰하고, 검색엔진도 페이지를 단순 광고가 아니라 건강정보 자산으로 이해할 수 있습니다.

## 참고한 자료

${sourceList(sources)}

이 글은 일반 건강정보입니다. 진단, 처방, 치료 결정을 대신하지 않습니다.`
}

function buildScreenPost() {
  const sources = [
    ['Frontiers in Public Health 2026, Digital behavior and anxiety in the post-pandemic era', 'https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2026.1766808/full'],
    ['OECD 2026, Child, Adolescent and Youth Mental Health in the 21st Century', 'https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/05/child-adolescent-and-youth-mental-health-in-the-21st-century_81743169/1092c3cb-en.pdf'],
    ['Nature Humanities and Social Sciences Communications 2026, Excessive screen time and youth mental health', 'https://www.nature.com/articles/s41599-026-06609-1'],
  ]

  return `## 화면시간보다 먼저 봐야 할 것은 밤 사용과 수면입니다

스크린타임과 불안은 요즘 건강정보에서 가장 검색이 많은 주제 중 하나입니다. 하지만 이 주제는 쉽게 과장됩니다. “스마트폰이 불안을 만든다”라고 단정하면 읽기엔 편하지만, 실제 사람의 생활을 설명하기엔 부족합니다. 불안해서 더 오래 스크롤할 수도 있고, 밤 사용이 수면을 줄여 다음 날 불안을 키울 수도 있습니다. 사용 시간이 같아도 보는 콘텐츠, 알림 빈도, 비교감, 잠드는 시간은 완전히 다릅니다.

2026년 Frontiers in Public Health 연구는 디지털 행동, 스크린타임, 소셜미디어 사용, 수면시간, 불안 수준의 관계를 분석했습니다. 연구에서는 화면 사용과 불안 수준이 관련되고, 수면시간은 보호 요인처럼 나타났습니다. OECD의 2026년 청소년·청년 정신건강 보고서도 디지털 사용을 수면, 신체활동, 사회적 환경과 함께 봐야 한다는 점을 강조합니다.

## 왜 단순한 앱 차단으로 해결되지 않을까

불안한 사람은 정보를 더 확인하려고 하고, 확인할수록 더 불안해질 수 있습니다. 밤에는 판단력이 낮아지고, 짧은 영상과 알림은 잠드는 시간을 뒤로 밀 수 있습니다. 수면이 부족하면 다음 날 감정 조절이 어려워지고, 다시 화면에 의존하는 순환이 생깁니다. 그래서 핵심은 “몇 시간 썼느냐”보다 “언제, 왜, 어떤 기분으로 썼느냐”입니다.

특히 잠들기 전 2시간은 기록 가치가 큽니다. 뉴스, 건강검색, 쇼핑, 소셜미디어 비교 콘텐츠, 업무 메신저는 모두 다른 영향을 줍니다. 이 차이를 기록하지 않으면 상담에서도 해결책이 흐려집니다.

## 먼저 확인할 기록

- 잠들기 전 2시간 스마트폰 사용량과 사용 목적
- 총 수면시간, 잠드는 데 걸린 시간, 중간 각성, 아침 피로
- 소셜미디어 사용 후 비교감, 초조감, 우울감, 분노감
- 업무·학업·관계가 방해받는지 여부
- 카페인, 음주, 운동 부족, 식사 불규칙, 가족 갈등 같은 동반 요인

현실적인 조정은 작게 시작하는 편이 낫습니다. 잠들기 60~90분 전 알림을 줄이고, 침대 밖에서 충전하며, 불안을 키우는 계정은 숨기거나 팔로우를 정리합니다. 처음부터 모든 앱을 끊으려 하면 실패하기 쉽습니다.

가정이나 직장에서 적용할 때도 “하루 0시간” 같은 극단적인 목표보다 방해를 줄이는 기준이 더 오래 갑니다. 예를 들어 업무 메신저와 휴식용 앱을 같은 화면에 두지 않고, 밤에는 건강검색을 다음 날 오전으로 미루며, 잠자리에서는 짧은 영상 대신 종이 메모로 걱정거리를 적는 식입니다. 중요한 것은 화면을 없애는 것이 아니라 불안을 키우는 반복 행동을 알아차리는 것입니다.

아이와 청소년의 경우에는 사용시간만 감시하기보다 수면시간, 학교 생활, 친구 관계, 운동량을 함께 봐야 합니다. 성인도 마찬가지입니다. 화면 사용을 줄였는데도 불안이 계속되면 원인이 화면 밖에 있을 수 있습니다.

## 상담이 우선인 경우

불안이 업무, 학업, 관계, 수면을 지속적으로 방해하거나 공황 증상, 자해 생각이 있으면 디지털 디톡스보다 전문가 상담이 먼저입니다. 이때 건강기능식품이나 생활습관 정보가 치료를 대신할 수 없습니다.

## 플로로탄닌 콘텐츠에서는 어떻게 연결해야 하나

플로로탄닌을 불안 치료나 수면 개선 보장으로 설명하면 안 됩니다. 이 주제에서 사이트가 할 일은 수면과 생활 리듬을 기록하게 돕고, 해조 유래 성분은 일반 건강정보 맥락에서 조심스럽게 소개하는 것입니다. 정확한 경계가 있어야 소비자도 믿고 읽습니다.

## 참고한 자료

${sourceList(sources)}

이 글은 일반 건강정보입니다. 진단, 처방, 치료 결정을 대신하지 않습니다.`
}

function buildSunscreenPost() {
  const sources = [
    ['CDC 2026, Reducing Risk for Skin Cancer', 'https://www.cdc.gov/skin-cancer/prevention/index.html'],
    ['Cleveland Clinic 2026, How to Safely Get Vitamin D From the Sun', 'https://health.clevelandclinic.org/vitamin-d-from-the-sun'],
    ['American Academy of Dermatology, Vitamin D and UV Exposure', 'https://www.aad.org/media-resources/stats-and-facts/prevention-and-care/vitamin-d-and-uv-exposure'],
  ]

  return `## 선크림과 비타민D 논쟁은 “둘 중 하나”의 문제가 아닙니다

자외선차단제를 바르면 비타민D가 부족해진다는 말은 매년 반복됩니다. 특히 여름이 가까워지면 “햇빛을 많이 봐야 건강하다”는 콘텐츠와 “무조건 피해야 한다”는 콘텐츠가 동시에 올라옵니다. 하지만 소비자가 실제로 필요한 정보는 극단적인 주장보다 기준입니다. 언제 자외선차단을 해야 하는지, 비타민D가 걱정될 때 무엇을 확인해야 하는지, 피부 변화는 어떻게 기록해야 하는지를 알려줘야 합니다.

CDC는 UV 지수 3 이상이면 그늘, 보호복, 챙 넓은 모자, 선글라스, 광범위 자외선차단제를 함께 사용하라고 안내합니다. 자외선은 비타민D 합성에 관여하지만 동시에 피부 세포 손상, 일광화상, 조기 노화, 색소 변화, 피부암 위험을 높일 수 있습니다.

## 비타민D가 걱정된다고 오래 쬐는 방식은 답이 아닙니다

Cleveland Clinic은 자외선차단제가 비타민D 생성을 완전히 막는 것으로 보기 어렵고, 비타민D를 위해 일부러 장시간 햇빛을 쬐는 방식은 필요하지 않다고 설명합니다. 미국피부과학회도 비타민D는 음식, 강화식품, 필요 시 보충제와 상담을 통해 관리하는 편이 더 안전하다는 입장입니다.

특히 실내생활이 많거나, 고령이거나, 특정 약을 복용 중이거나, 간·신장 질환이나 흡수장애가 있다면 햇빛 시간을 늘리기보다 검사를 통해 확인하는 편이 좋습니다. “선크림을 바르면 무조건 부족해진다”도 과장이고, “햇빛은 자연이라 오래 쬐어도 괜찮다”도 위험한 말입니다.

## 야외 활동 전 확인할 것

- UV 지수 3 이상이면 피부보호 전략을 먼저 세웁니다.
- 10시~16시 강한 햇빛은 가능한 피하고 그늘을 활용합니다.
- 모자, 긴팔, 선글라스, 자외선차단제를 함께 사용합니다.
- 땀, 물놀이, 장시간 야외활동 후에는 다시 바릅니다.
- 새로 생긴 점, 모양이 변하는 점, 낫지 않는 상처는 기록합니다.

피부암 예방 콘텐츠에서 가장 위험한 표현은 “괜찮다”입니다. 피부 타입, 가족력, 직업적 야외노출, 과거 화상 경험, 면역저하 여부에 따라 위험은 달라집니다. 검은 점의 모양이 바뀌거나 낫지 않는 상처가 있으면 미루지 말고 진료가 우선입니다.

자외선차단제는 바르는 양과 다시 바르는 시간이 중요합니다. 아주 얇게 바르면 표시된 보호 수준에 못 미칠 수 있고, 땀이나 물놀이 후에는 보호막이 줄어듭니다. 야외 운동, 등산, 골프, 해변 활동처럼 노출 시간이 긴 날에는 선크림 하나만 믿기보다 모자와 옷, 그늘을 함께 쓰는 편이 안전합니다. 비타민D가 걱정된다면 햇빛 시간을 늘리기보다 검사 결과와 식사, 보충제 필요성을 상담하는 방식이 더 명확합니다.

피부 변화 기록은 사진 한 장으로도 시작할 수 있습니다. 같은 조명에서 점의 크기, 색, 경계, 모양을 한 달 간격으로 비교하고, 피가 나거나 딱지가 반복되는 부위는 날짜를 적습니다. 특히 얼굴, 귀, 목, 손등처럼 햇빛 노출이 많은 부위는 자주 놓칩니다. 가족 중 피부암 병력이 있거나 면역억제제를 복용 중인 사람은 “조금 더 지켜보자”보다 빠른 상담이 더 안전합니다.

비타민D 수치는 느낌으로 판단하기 어렵습니다. 피로감만으로 결핍을 단정하지 말고, 필요하면 혈액검사와 복용 중인 약, 식사 패턴을 함께 확인해야 합니다.

## 플로로탄닌 콘텐츠에서는 어떻게 연결해야 하나

플로로탄닌을 자외선 손상 차단, 피부암 예방, 기미 치료를 보장한다고 말하면 안 됩니다. 피부 카테고리에서는 자외선차단 습관과 피부 변화 기록을 먼저 안내하고, 해조 유래 성분은 근거를 조심스럽게 소개하는 보조 정보로만 다루는 것이 안전합니다.

## 참고한 자료

${sourceList(sources)}

이 글은 일반 건강정보입니다. 진단, 처방, 치료 결정을 대신하지 않습니다.`
}

const posts = [
  {
    slug: 'hearing-loss-dementia-risk-hearing-aid-record-2026',
    title: '난청과 치매위험: 보청기는 기억력 약이 아니라 생활 기록에서 시작합니다',
    excerpt: '2026년 난청과 치매위험 연구를 근거로 보청기, 청력검사, 사회적 고립, 기억력 변화를 어떻게 기록해야 하는지 정리했습니다.',
    content: buildHearingPost(),
    category: 'neuro_cognitive',
    tags: ['난청', '치매위험', '보청기', '인지건강', '사회적고립', '청력검사', '플로로탄닌'],
    meta_title: '난청과 치매위험, 보청기 전에 기록할 것 | 플로로탄닌 건강정보',
    meta_desc: '난청과 치매위험 연구를 과장 없이 해석하고 청력검사, 보청기 착용시간, 사회적 고립, 기억력 변화를 기록하는 방법을 안내합니다.',
    og_image: '/og-card/v20260602/hearing-loss-dementia-risk-hearing-aid-record-2026.png',
    status: 'published',
    view_count: 0,
    published_at: PUBLISHED_AT,
    created_at: PUBLISHED_AT,
    updated_at: PUBLISHED_AT,
  },
  {
    slug: 'screen-time-sleep-anxiety-digital-behavior-record-2026',
    title: '스크린타임과 불안: 화면시간보다 밤 사용과 수면 기록이 먼저입니다',
    excerpt: '2026년 디지털 행동과 불안 연구를 바탕으로 스크린타임, 수면 부족, 소셜미디어 비교감, 상담이 필요한 신호를 정리했습니다.',
    content: buildScreenPost(),
    category: 'mental_health',
    tags: ['스크린타임', '불안', '수면부족', '소셜미디어', '정신건강', '디지털행동', '플로로탄닌'],
    meta_title: '스크린타임과 불안, 밤 사용과 수면 기록법 | 플로로탄닌 건강정보',
    meta_desc: '스크린타임과 불안을 단정하지 않고 수면, 밤 사용, 소셜미디어 후 감정 변화, 상담이 필요한 신호를 근거 중심으로 정리합니다.',
    og_image: '/og-card/v20260602/screen-time-sleep-anxiety-digital-behavior-record-2026.png',
    status: 'published',
    view_count: 0,
    published_at: '2026-06-02T15:42:00+09:00',
    created_at: '2026-06-02T15:42:00+09:00',
    updated_at: '2026-06-02T15:42:00+09:00',
  },
  {
    slug: 'sunscreen-vitamin-d-uv-index-myth-check-2026',
    title: '자외선차단제와 비타민D 오해: UV 지수 3 이상이면 피부보호가 먼저입니다',
    excerpt: '자외선차단제, 비타민D, UV 지수 논쟁을 CDC와 피부과 자료 기준으로 정리하고 피부 변화 기록 기준을 제시합니다.',
    content: buildSunscreenPost(),
    category: 'skin',
    tags: ['자외선차단제', '비타민D', 'UV지수', '피부암예방', '선크림오해', '피부건강', '플로로탄닌'],
    meta_title: '자외선차단제와 비타민D 오해, UV 지수 기준 | 플로로탄닌 건강정보',
    meta_desc: '자외선차단제를 바르면 비타민D가 부족해진다는 오해를 CDC, Cleveland Clinic, 피부과 자료 기준으로 정리합니다.',
    og_image: '/og-card/v20260602/sunscreen-vitamin-d-uv-index-myth-check-2026.png',
    status: 'published',
    view_count: 0,
    published_at: '2026-06-02T15:43:00+09:00',
    created_at: '2026-06-02T15:43:00+09:00',
    updated_at: '2026-06-02T15:43:00+09:00',
  },
]

function visibleLength(content) {
  return String(content || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/[^\s)]+/g, '')
    .replace(/\s+/g, '').length
}

const badClaims = /(완치|치료됩니다|예방됩니다|개선됩니다|효과가 있습니다|보장합니다)/
for (const post of posts) {
  const length = visibleLength(post.content)
  if (length < 1500) throw new Error(`${post.slug}: content too short (${length})`)
  if (badClaims.test(post.content)) throw new Error(`${post.slug}: risky claim found`)
}

const { data, error } = await supabase
  .from('posts')
  .upsert(posts, { onConflict: 'slug' })
  .select('slug,title,category,status,published_at,updated_at')

if (error) {
  console.error(error)
  process.exit(1)
}

console.log(JSON.stringify(data, null, 2))
