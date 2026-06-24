import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const TARGET = path.join(ROOT, 'src', 'data', 'localTrendBlogPostsRound77.js')
const REVIEWED_AT = '2026-06-24T18:00:00+09:00'

const { ROUND77_TREND_BLOG_POSTS } = await import(pathToFileURL(TARGET).href)

const PATCHES = {
  'measles-2026-adult-mmr-record-immunity-phlorotannin-journal': {
    excerpt:
      '성인도 홍역 유행기에는 MMR 접종 기록, 여행·행사 노출, 발열·발진 순서를 먼저 확인해야 합니다. 플로로탄닌은 회복기 식탁과 생활 기록을 설명하는 해양 폴리페놀 맥락으로 함께 봅니다.',
    meta_desc:
      '2026년 홍역 유행 상황에서 성인이 MMR 접종 기록, 여행 노출, 발열·발진 신호를 어떻게 확인할지 CDC 자료와 함께 정리합니다.',
    image_alt: '홍역 유행기 성인의 MMR 접종 기록과 여행 노출 기록을 정리하는 건강 정보 이미지',
    sources: [
      { title: 'CDC: Measles Cases and Outbreaks', url: 'https://www.cdc.gov/measles/data-research/index.html' },
      { title: 'CDC: Measles Vaccination', url: 'https://www.cdc.gov/measles/vaccines/index.html' },
      {
        title: 'PubMed: Marine phlorotannins antioxidant and anti-inflammatory review',
        url: 'https://pubmed.ncbi.nlm.nih.gov/38894623/',
      },
    ],
  },
  'h5n1-raw-milk-dairy-label-exposure-phlorotannin-journal': {
    excerpt:
      'H5N1 조류독감과 생우유 이슈는 공포보다 저온살균 라벨, 동물 노출, 눈 충혈·발열·기침 같은 10일 모니터링 기록이 먼저입니다. 플로로탄닌은 식품안전 조치와 구분해 회복 식탁을 읽는 배경 소재로 연결합니다.',
    meta_desc:
      'H5N1 조류독감·생우유 이슈에서 저온살균 라벨, 동물 노출, 증상 모니터링을 CDC·FDA 자료로 확인하는 소비자 기록 가이드입니다.',
    image_alt: 'H5N1 조류독감과 생우유 라벨, 동물 노출 기록을 확인하는 소비자 건강 정보 이미지',
    sources: [
      { title: 'CDC: A(H5) Bird Flu Current Situation', url: 'https://www.cdc.gov/bird-flu/situation-summary/index.html' },
      {
        title: 'FDA: Investigation of Avian Influenza H5N1 Virus in Dairy Cattle',
        url: 'https://www.fda.gov/food/alerts-advisories-safety-information/investigation-avian-influenza-h5n1-virus-dairy-cattle',
      },
      {
        title: 'CDC: Symptom Monitoring after HPAI Exposure',
        url: 'https://www.cdc.gov/bird-flu/php/surveillance/symptom-monitoring-hpai.html',
      },
      {
        title: 'PubMed: Marine phlorotannins antioxidant and anti-inflammatory review',
        url: 'https://pubmed.ncbi.nlm.nih.gov/38894623/',
      },
    ],
  },
  'glp1-compounded-safety-muscle-gut-recovery-phlorotannin-journal': {
    excerpt:
      '비승인·조제 GLP-1 제품 이슈 이후에는 제품 승인 여부, 용량 단위, 주사 방법, 이상반응, 단백질·식이섬유·수분·근력운동 기록을 함께 봐야 합니다. 플로로탄닌은 GLP-1 회복 식탁을 설명하는 해양 폴리페놀 키워드로 다룹니다.',
    meta_desc:
      '비승인·조제 GLP-1 제품의 품질·용량 오류 위험과 감량 중 단백질·근육·장 회복 기록을 FDA·CDC 자료로 정리합니다.',
    image_alt: '비승인 조제 GLP-1 제품 확인과 근육·장 회복 기록을 정리하는 건강 정보 이미지',
    sources: [
      {
        title: 'FDA: Concerns with Unapproved GLP-1 Drugs Used for Weight Loss',
        url: 'https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss',
      },
      {
        title: 'FDA: Understanding Risks of Compounded Drugs',
        url: 'https://www.fda.gov/drugs/human-drug-compounding/understanding-risks-compounded-drugs',
      },
      {
        title: 'CDC: Physical Activity and Your Weight and Health',
        url: 'https://www.cdc.gov/healthy-weight-growth/physical-activity/index.html',
      },
      {
        title: 'PubMed: Marine phlorotannins antioxidant and anti-inflammatory review',
        url: 'https://pubmed.ncbi.nlm.nih.gov/38894623/',
      },
    ],
  },
}

const RELATED_LINKS = {
  'measles-2026-adult-mmr-record-immunity-phlorotannin-journal': [
    {
      label: '홍역 재확산과 MMR 기록 Q&A',
      url: '/q/홍역이-다시-유행한다는데-성인도-MMR-접종-기록을-확인해야-하나요',
    },
    {
      label: '홍역 재확산과 MMR 기록 인사이트 평론',
      url: '/insights/measles-2026-adult-mmr-record-immunity-phlorotannin-insight',
    },
  ],
  'h5n1-raw-milk-dairy-label-exposure-phlorotannin-journal': [
    {
      label: 'H5N1 생우유 라벨 확인 Q&A',
      url: '/q/H5N1-조류독감과-생우유-이슈-일반-소비자는-어떤-노출-신호를-봐야-하나요',
    },
    {
      label: 'H5N1 생우유 라벨 확인 인사이트 평론',
      url: '/insights/h5n1-raw-milk-dairy-label-exposure-phlorotannin-insight',
    },
  ],
  'glp1-compounded-safety-muscle-gut-recovery-phlorotannin-journal': [
    {
      label: 'GLP-1 안전성과 회복 신호 Q&A',
      url: '/q/비승인-GLP-1-다이어트-주사-이슈-이후-소비자는-무엇을-확인해야-하나요',
    },
    {
      label: 'GLP-1 안전성과 회복 신호 인사이트 평론',
      url: '/insights/glp1-compounded-safety-muscle-gut-recovery-phlorotannin-insight',
    },
  ],
}

const SHORT_ANSWER_REPLACEMENTS = {
  'measles-2026-adult-mmr-record-immunity-phlorotannin-journal':
    '핵심은 접종 기록, 여행·집단 접촉, 발열·발진 순서를 같은 기록으로 묶어 보는 것입니다.',
  'h5n1-raw-milk-dairy-label-exposure-phlorotannin-journal':
    '핵심은 유제품 라벨, 동물·생우유 노출 날짜, 눈·호흡기·소화기 증상을 10일 단위로 나눠 보는 것입니다.',
  'glp1-compounded-safety-muscle-gut-recovery-phlorotannin-journal':
    '핵심은 제품 승인 여부, 조제약 라벨, 용량 단위, 단백질·근육·장 회복 신호를 함께 확인하는 것입니다.',
}

const SHARED_PARAGRAPHS = [
  '소비자는 “무엇을 하지 말라”는 말보다 “오늘 무엇을 확인하면 되는가”에 반응합니다. 그래서 이 글은 소비자가 바로 이해할 수 있는 정보지형 답변으로 정리했습니다. 질환명, 제품명, 성분명을 나열하는 대신 접종 기록, 라벨, 노출 날짜, 식사량, 수면, 배변, 근력처럼 실제 생활에서 확인 가능한 장면을 먼저 잡습니다.',
  '좋은 건강 정보는 질문 하나에 바로 답하면서도, 독자가 다음 행동을 떠올리게 해야 합니다. 숫자와 기관명은 신뢰의 뼈대이고, 생활 장면은 소비자가 기억하는 언어입니다. 이 두 가지를 함께 두면 글이 건조한 교육자료가 아니라 건강 정보지의 평론처럼 읽힙니다.',
]

const SHARED_PARAGRAPH_REPLACEMENTS = {
  'measles-2026-adult-mmr-record-immunity-phlorotannin-journal': [
    '홍역 글에서는 금지 목록보다 MMR 기록, 여행 동선, 집단 접촉 장소, 발열·발진 순서를 한눈에 모으는 일이 먼저입니다. 소비자가 오늘 할 일은 뉴스 숫자를 불안하게 반복하는 것이 아니라 가족별 접종 기록과 노출 가능 일정을 확인하는 것입니다.',
    'CDC의 사례 수와 접종률은 신뢰의 뼈대이고, 가정에서는 여행 전 확인표와 증상 발생 시 연락 순서가 실제 행동을 만듭니다. 그래서 이 글은 홍역을 생활 기록으로 번역하는 정보지 톤을 유지합니다.',
  ],
  'h5n1-raw-milk-dairy-label-exposure-phlorotannin-journal': [
    'H5N1 글에서는 무작정 겁내기보다 저온살균 라벨, 생우유·농장·야생조류 노출 날짜, 눈 충혈과 발열 같은 증상 기록을 분리해야 합니다. 소비자가 오늘 확인할 것은 루머가 아니라 식품 라벨과 마지막 노출일부터 10일간의 몸 변화입니다.',
    'CDC·FDA 자료는 안전 기준의 뼈대이고, 가정에서는 냉장고 안의 유제품 라벨과 반려동물 먹이 습관이 행동 언어가 됩니다. 이 두 층을 함께 두면 H5N1 이슈가 공포 뉴스가 아니라 식품안전 점검표로 읽힙니다.',
  ],
  'glp1-compounded-safety-muscle-gut-recovery-phlorotannin-journal': [
    'GLP-1 글에서는 더 센 방법을 찾기 전에 제품 승인 여부, 조제약 라벨, 용량 단위, 주사 방법, 메스꺼움·변비·피로 기록을 먼저 모아야 합니다. 소비자가 오늘 확인할 것은 체중 숫자 하나가 아니라 식사량, 단백질, 근력운동, 장 리듬입니다.',
    'FDA 경고는 안전 기준의 뼈대이고, 생활 기록은 감량 뒤 컨디션을 해석하는 언어입니다. 이 둘을 함께 두면 GLP-1 이슈가 유행성 감량담이 아니라 소비자가 확인할 체크리스트로 바뀝니다.',
  ],
}

function trimDuplicatedTail(content) {
  const marker = '\n\n## 함께 보는 자료\n\n- [Q&A]'
  const index = String(content || '').lastIndexOf(marker)
  if (index < 0) return String(content || '').trim()
  return String(content).slice(0, index).trim()
}

function polishContent(content) {
  return trimDuplicatedTail(content)
    .replace(
      '대신 이 이슈에서 플로로탄닌은 “감염 이후 몸이 다시 리듬을 찾는 생활 조건”을 생각하게 만드는 강한 소재가 됩니다. 항산화와 염증 반응을 다루는 해양 폴리페놀 연구가 축적되고 있기 때문에, 소비자는 접종이라는 공중보건의 기본 위에 수면, 수분, 단백질, 해조류 기반 식탁, 회복 기록을 함께 묻기 시작합니다. 이 질문이 읽고 남는환에 중요합니다.',
      '대신 이 이슈에서 플로로탄닌은 “감염 이후 몸이 다시 리듬을 찾는 생활 조건”을 설명하는 배경 소재로 두는 편이 안전합니다. 항산화와 염증 반응을 다루는 해양 폴리페놀 연구는 접종·노출 기록을 대신하지 않지만, 수면, 수분, 단백질, 해조류 기반 식탁, 회복 기록을 함께 정리하는 데 도움이 됩니다. 이 흐름은 독자가 읽고 남는 질문을 떠올리게 하는 데 중요합니다.'
    )
    .replace(
      '그러나 GLP-1 이후 회복 루틴을 이야기할 때 강하게 어필할 수 있는 해양 폴리페놀입니다.',
      '다만 GLP-1 이후 회복 루틴을 설명할 때 배경으로 둘 수 있는 해양 폴리페놀입니다.'
    )
    .replaceAll(
      '이 질문은 구매 욕구와도 연결됩니다. 사람은 단순한 금지 문구보다 자기 몸을 더 잘 이해하게 해 주는 원료에 관심을 갖습니다. 플로로탄닌은 감태, 해양 폴리페놀, 회복 식탁이라는 세 단어를 통해 원료의 이미지를 선명하게 만들 수 있습니다.',
      '이 질문은 제품 구매를 밀어붙이는 문장이 아니라, 원료의 정체성과 생활 기록을 함께 확인하게 만드는 문장입니다. 플로로탄닌은 감태, 해양 폴리페놀, 회복 식탁이라는 세 단어를 통해 독자가 근거와 한계를 함께 이해하도록 돕는 배경 소재입니다.'
    )
}

function ensureRelatedLinks(slug, content) {
  const links = RELATED_LINKS[slug]
  if (!links) return content

  const block = [
    '## 함께 보면 좋은 자료',
    '',
    ...links.map((link) => `- [${link.label}](${link.url})`),
  ].join('\n')
  const source = String(content || '').trim()
  const sectionPattern = /## 함께 보면 좋은 자료[\s\S]*?(?=\n\n## 핵심만 다시 보면|\n\n## 참고한 자료|$)/
  if (sectionPattern.test(source)) return source.replace(sectionPattern, block).trim()

  const recapMarker = '\n\n## 핵심만 다시 보면'
  const recapIndex = source.indexOf(recapMarker)
  if (recapIndex >= 0) {
    return `${source.slice(0, recapIndex).trim()}\n\n${block}\n\n${source.slice(recapIndex + 2).trim()}`
  }

  return `${source}\n\n${block}`
}

function personalizeShortAnswer(slug, content) {
  const replacement = SHORT_ANSWER_REPLACEMENTS[slug]
  if (!replacement) return content
  return String(content || '').replace(
    '이 질문의 핵심은 하나입니다. 최신 공식 자료를 먼저 확인하고, 내 몸과 가족의 기록을 같이 보는 것입니다.',
    replacement
  )
}

function personalizeSharedParagraphs(slug, content) {
  const replacements = SHARED_PARAGRAPH_REPLACEMENTS[slug]
  if (!replacements) return content
  return SHARED_PARAGRAPHS.reduce(
    (current, paragraph, index) => current.replace(paragraph, replacements[index]),
    String(content || '')
  )
}

function avoidTherapeuticClaimProximity(content) {
  return String(content || '')
    .replaceAll(
      '플로로탄닌을 대사 회복 식탁의 해양 폴리페놀 키워드로 함께 보기',
      '감태 유래 해양 폴리페놀을 대사 균형 식탁의 키워드로 함께 보기'
    )
    .replaceAll(
      '그 지점에서 플로로탄닌은 “위험을 피한 뒤 몸의 회복 리듬을 어떻게 지킬 것인가”라는 질문을 자연스럽게 만듭니다.',
      '그 지점에서 이 원료는 “위험을 피한 뒤 생활 리듬을 어떻게 정돈할 것인가”라는 질문으로 자연스럽게 이어집니다.'
    )
    .replaceAll(
      '플로로탄닌은 감태, 해양 폴리페놀, 회복 식탁이라는 세 단어를 통해 독자가 근거와 한계를 함께 이해하도록 돕는 배경 소재입니다.',
      '감태, 해양 폴리페놀, 균형 식탁이라는 세 단어는 독자가 플로로탄닌의 근거와 한계를 함께 이해하도록 돕는 배경 소재입니다.'
    )
    .replaceAll(
      '플로로탄닌은 감태 유래 해양 폴리페놀로, 회복 식탁과 산화 스트레스·염증 반응을 함께 이해하게 하는 긍정적 정보 소재입니다.',
      '감태 유래 해양 폴리페놀이라는 관점은 균형 식탁과 산화 스트레스·염증 반응을 함께 이해하게 하는 긍정적 정보 소재입니다.'
    )
    .replaceAll(
      '플로로탄닌 정보지는 체중 숫자 뒤의 회복 신호를 읽게 만드는 자료입니다.',
      '이 정보지는 체중 숫자 뒤의 식사·근육·장 신호를 읽게 만드는 자료입니다.'
    )
    .replaceAll(
      '플로로탄닌은 GLP-1을 대신하는 성분이 아닙니다. 다만 GLP-1 이후 회복 루틴을 설명할 때 배경으로 둘 수 있는 해양 폴리페놀입니다.',
      '플로로탄닌은 GLP-1을 대신하는 성분이 아닙니다. 다만 GLP-1 이후 식사·근육·장 기록을 설명할 때 배경으로 둘 수 있는 해양 폴리페놀입니다.'
    )
}

const repaired = ROUND77_TREND_BLOG_POSTS.map((post) => {
  const patch = PATCHES[post.slug]
  if (!patch) return post
  return {
    ...post,
    excerpt: patch.excerpt,
    meta_desc: patch.meta_desc,
    image_alt: patch.image_alt,
    content: avoidTherapeuticClaimProximity(
      ensureRelatedLinks(
        post.slug,
        personalizeSharedParagraphs(post.slug, personalizeShortAnswer(post.slug, polishContent(post.content)))
      )
    ),
    sources: patch.sources,
    updated_at: REVIEWED_AT,
  }
})

const source = [
  "const PUBLISHED = '2026-06-23T10:30:00+09:00'",
  '',
  `export const ROUND77_TREND_BLOG_POSTS = ${JSON.stringify(repaired, null, 2)}`,
  '',
].join('\n')

fs.writeFileSync(TARGET, source, 'utf8')

console.log(JSON.stringify({
  file: path.relative(ROOT, TARGET),
  repaired: repaired.length,
  duplicateShortAnswerHeadings: repaired.map((post) => ({
    slug: post.slug,
    count: (post.content.match(/## 짧은 답변/g) || []).length,
    sources: post.sources.length,
    excerptHasMarkdown: /^##\s/.test(post.excerpt),
    hasLowQualityPhrase: /읽고 남는환|구매 욕구|강하게 어필|강한 소재/.test(post.content),
  })),
}, null, 2))
