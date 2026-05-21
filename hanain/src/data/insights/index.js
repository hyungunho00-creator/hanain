/**
 * insights/index.js — Insights 콘텐츠 자동 등록
 *
 * Vite의 import.meta.glob을 사용해 ./posts/*.js 의 모든 포스트를
 * 빌드 시점에 자동 수집·번들링한다. 새 포스트 추가는 파일만 떨어뜨리면 끝.
 *
 * 각 포스트 모듈은 default export 로 다음 형태의 객체를 반환:
 *   {
 *     slug: 'phlorotannin-blood-pressure-mechanism',
 *     title: 'string',
 *     description: 'string (≤160자, meta description)',
 *     keywords: 'comma,separated,keywords',
 *     publishedAt: 'YYYY-MM-DD',
 *     updatedAt: 'YYYY-MM-DD',
 *     category: 'cardiovascular | metabolic | neuro | ... ',
 *     tags: ['plain', 'tags'],
 *     readingMinutes: 8,
 *     referenceIds: ['shrestha-2021-review', ...],
 *     tldr: ['3~5개 핵심 요약 bullet'],
 *     faqs: [{ q, a }],
 *     body: <React 노드 — 본문 JSX>,
 *   }
 *
 * 모든 포스트는 자동으로 sitemap에 포함되며, JSON-LD Article 스키마가 부착된다.
 */

// Vite 빌드 시 자동 수집 (eager=true → 코드 스플릿 없이 즉시 트리쉐이커)
const modules = import.meta.glob('./posts/*.{js,jsx}', { eager: true })

// posts 객체 (slug → post)
export const INSIGHTS = {}
for (const path in modules) {
  const post = modules[path]?.default
  if (post?.slug) INSIGHTS[post.slug] = post
}

/** publishedAt 내림차순 정렬된 배열 */
export const INSIGHTS_LIST = Object.values(INSIGHTS).sort(
  (a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || '')
)

/** slug로 포스트 조회 */
export function getInsight(slug) {
  return INSIGHTS[slug] || null
}

/** 같은 카테고리 다른 포스트 (현재 제외) */
export function relatedInsights(slug, limit = 4) {
  const cur = INSIGHTS[slug]
  if (!cur) return []
  const same = INSIGHTS_LIST.filter(
    (p) => p.slug !== slug && p.category === cur.category
  )
  // 태그 겹침으로 추가 보강
  const byTags = INSIGHTS_LIST.filter(
    (p) =>
      p.slug !== slug &&
      p.category !== cur.category &&
      (p.tags || []).some((t) => (cur.tags || []).includes(t))
  )
  return [...same, ...byTags].slice(0, limit)
}

/** 카테고리별 목록 (허브용) */
export const INSIGHTS_BY_CATEGORY = INSIGHTS_LIST.reduce((acc, p) => {
  (acc[p.category] = acc[p.category] || []).push(p)
  return acc
}, {})

export const INSIGHT_CATEGORIES = [
  { id: 'mechanism',    name: '작용기전·근거',  desc: '플로로탄닌의 신체 작용 원리' },
  { id: 'metabolic',    name: '대사·당뇨',      desc: '혈당·LDL·대사증후군 근거' },
  { id: 'cardiovascular', name: '심혈관·혈압',  desc: '혈압·동맥경화·심장 보호' },
  { id: 'neuro',        name: '뇌·인지',        desc: '알츠하이머·기억력·신경보호' },
  { id: 'skin-hair',    name: '피부·모발',      desc: '자외선·노화·콜라겐·탈모' },
  { id: 'immune',       name: '면역·염증',      desc: '염증반응·알레르기·면역조절' },
  { id: 'cancer',       name: '항암 보조',      desc: '예방·치료보조·부작용 완화' },
  { id: 'lifestyle',    name: '생활·복용',      desc: '복용 시간·병용·식이' },
  { id: 'safety',       name: '안전성·금기',    desc: '부작용·약물 상호작용' },
  { id: 'comparison',   name: '성분 비교',      desc: '레스베라트롤·커큐민·녹차 비교' },
  { id: 'research',     name: '연구 동향',      desc: '최신 PubMed 트렌드' },
  { id: 'long-term',    name: '장기 복용',      desc: '안전성·축적·내성' },
  // ── Phase E — 트렌드 건강식품 원료 SEO 자산화 (2026-05) ──
  { id: 'ingredient-marine',    name: '해양 원료',      desc: '후코이단·후코잔틴·아스타잔틴·해조류' },
  { id: 'ingredient-longevity', name: '항노화·장수',    desc: 'NMN·스퍼미딘·우로리틴 A·PQQ·CoQ10' },
  { id: 'ingredient-clinical',  name: '임상 이슈 원료', desc: '베르베린·콜라겐·MSM·락토페린·프로바이오틱' },
]
