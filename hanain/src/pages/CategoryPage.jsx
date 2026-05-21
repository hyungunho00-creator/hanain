import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Eye, Heart, ChevronRight } from 'lucide-react'
import { getQaCategories, getQaQuestions, getQaPopular } from '../lib/supabase'
import SEOHead from '../components/common/SEOHead'
import CategoryHeroBanner from '../components/common/CategoryHeroBanner'
import CategoryGrid from '../components/common/CategoryGrid'
import { getCategoryMeta } from '../data/qaCategoryMeta'

// URL slug → category_id 매핑 (DB qa_categories 기준)
// [2026-05-21 D6 보강] skin/hair 단독 슬러그 추가 — sitemap·qa.json 정합성 확보
const SLUG_TO_ID = {
  'metabolism': 'metabolism', 'cancer-immune': 'cancer_immune',
  'digestive': 'digestive', 'cardiovascular': 'cardiovascular',
  'neuro-cognitive': 'neuro_cognitive', 'mental-health': 'mental_health',
  'musculoskeletal': 'musculoskeletal',
  'skin-hair': 'skin_hair', 'skin-hair-care': 'skin_hair',
  'skin': 'skin', 'hair': 'hair',
  'respiratory': 'respiratory', 'infection-inflammation': 'infection_inflammation',
  'womens-health': 'womens_health', 'mens-health': 'mens_health',
}

// category_id → URL slug 역매핑 (Supabase skin_hair → qa.json skin/hair 분리 대응)
// 우선순위가 높은 dash-case 슬러그를 canonical 로 사용
const ID_TO_PRIMARY_SLUG = {
  metabolism: 'metabolism', cancer_immune: 'cancer-immune',
  digestive: 'digestive', cardiovascular: 'cardiovascular',
  neuro_cognitive: 'neuro-cognitive', mental_health: 'mental-health',
  musculoskeletal: 'musculoskeletal',
  skin_hair: 'skin-hair', skin: 'skin', hair: 'hair',
  respiratory: 'respiratory', infection_inflammation: 'infection-inflammation',
  womens_health: 'womens-health', mens_health: 'mens-health',
}

const PAGE_SIZE = 20

// [2026-05-21 D6 보강] qa.json fallback — Supabase 장애 시에도 콘텐츠 노출 유지
// QuestionDetailPage.jsx 의 ensureQaFallback / getFallback* 패턴을 카테고리 페이지에 동일 적용.
let QA_FALLBACK = null
function slugifyKoLocal(s) {
  return String(s || '').replace(/[^\w\s가-힣]/g, '').replace(/\s+/g, '-').slice(0, 60)
}
async function ensureQaFallback() {
  if (!QA_FALLBACK) {
    try {
      const r = await fetch('/qa.json')
      QA_FALLBACK = await r.json()
    } catch {
      QA_FALLBACK = { categories: [], questions: [] }
    }
  }
  return QA_FALLBACK
}
async function getFallbackCategory(catId) {
  const data = await ensureQaFallback()
  const cat = data.categories.find(c => c.id === catId)
  if (!cat) return null
  const total = data.questions.filter(q => q.category === catId).length
  return {
    id: cat.id, name: cat.name, name_en: cat.name_en || '',
    description: cat.description || '',
    color: cat.color || '#00B4D8',
    icon: cat.icon || '',
    _fallback: true,
    _total: total,
  }
}
async function getFallbackQuestions(catId, { page = 1, limit = PAGE_SIZE, sort = 'popular' } = {}) {
  const data = await ensureQaFallback()
  let arr = data.questions.filter(q => q.category === catId)
  if (sort === 'latest') {
    arr = arr.sort((a, b) => String(b.created_at || b.id).localeCompare(String(a.created_at || a.id)))
  } else if (sort === 'likes') {
    arr = arr.sort((a, b) => (b.likes || 0) - (a.likes || 0))
  } else {
    arr = arr.sort((a, b) => (b.views || 0) - (a.views || 0))
  }
  const start = (page - 1) * limit
  const slice = arr.slice(start, start + limit)
  return {
    data: slice.map(q => ({
      id: q.id,
      slug: slugifyKoLocal(q.question),
      title: q.question,
      category_id: q.category,
      tags: q.tags || [],
      view_count: q.views || 0,
      like_count: q.likes || 0,
      difficulty: q.difficulty,
    })),
    count: arr.length,
  }
}
async function getFallbackPopular(catId, limit = 5) {
  const data = await ensureQaFallback()
  return data.questions
    .filter(q => q.category === catId)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit)
    .map(q => ({
      id: q.id,
      slug: slugifyKoLocal(q.question),
      title: q.question,
    }))
}

// [2026-05-21] 질문 카드 — 카테고리 무관 통일 디자인 (cyan-hana 시그니처)
// 과거: 카테고리별 catColor 가 순번 배지에 적용되어 카테고리마다 색이 다름 → 통일감 깨짐
// 현재: 모든 카테고리에서 동일한 cyan-hana + ocean-deep 컬러로 통일
function QuestionRow({ q, rank }) {
  const slug = q.slug || q.id
  return (
    <Link
      to={`/q/${slug}`}
      className="flex items-start gap-3 p-4 hover:bg-gray-50/70 transition-colors group"
    >
      {rank && (
        <span className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ring-1 ${
          rank <= 3
            ? 'bg-cyan-hana text-white ring-cyan-hana/30'
            : 'bg-gray-50 text-gray-500 ring-gray-200'
        }`}>
          {rank}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-ocean-deep group-hover:text-cyan-hana transition-colors leading-snug mb-1.5">
          {q.title}
        </p>
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-gray-400">
          {q.tags?.slice(0, 2).map(t => (
            <span key={t} className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{t}</span>
          ))}
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{(q.view_count || 0).toLocaleString()}</span>
          <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{q.like_count || 0}</span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-cyan-hana transition-colors shrink-0 mt-1" />
    </Link>
  )
}

export default function CategoryPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [category, setCategory] = useState(null)
  const [questions, setQuestions] = useState([])
  const [popular, setPopular] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('popular')
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const totalPages = Math.ceil(total / PAGE_SIZE)

  useEffect(() => {
    async function loadCat() {
      const catId = SLUG_TO_ID[slug] || slug
      let cat = null
      try {
        const cats = await getQaCategories()
        cat = cats.find(c => c.id === catId)
      } catch {
        cat = null
      }
      // [2026-05-21 D6] Supabase 미스 또는 qa.json-only 카테고리(skin/hair)는 fallback 시도
      if (!cat) {
        cat = await getFallbackCategory(catId)
      }
      if (!cat) { setNotFound(true); setLoading(false); return }
      setCategory(cat)
    }
    loadCat()
  }, [slug])

  const loadQuestions = useCallback(async () => {
    if (!category) return
    setLoading(true)
    let result = { data: [], count: 0 }
    // skin / hair 는 Supabase 에 없으므로 fallback 강제
    const fallbackOnly = category._fallback || category.id === 'skin' || category.id === 'hair'
    if (!fallbackOnly) {
      try {
        result = await getQaQuestions({ categoryId: category.id, page, limit: PAGE_SIZE, sort })
      } catch {
        result = { data: [], count: 0 }
      }
    }
    // Supabase 응답이 비어 있으면 qa.json 으로 보강
    if (!result.data || result.data.length === 0) {
      result = await getFallbackQuestions(category.id, { page, limit: PAGE_SIZE, sort })
    }
    setQuestions(result.data.map(q => ({
      id: q.id,
      slug: q.slug || slugifyKoLocal(q.question || q.title),
      title: q.question || q.title,
      category_id: q.category_id,
      tags: q.tags || [],
      view_count: q.views || q.view_count || 0,
      like_count: q.likes || q.like_count || 0,
      difficulty: q.difficulty,
    })))
    setTotal(result.count || 0)
    setLoading(false)
  }, [category, page, sort])

  useEffect(() => { loadQuestions() }, [loadQuestions])

  useEffect(() => {
    if (!category) return
    async function loadExtras() {
      let pop = []
      const fallbackOnly = category._fallback || category.id === 'skin' || category.id === 'hair'
      if (!fallbackOnly) {
        try {
          pop = await getQaPopular(category.id, 5)
        } catch {
          pop = []
        }
      }
      if (!pop || pop.length === 0) {
        const fp = await getFallbackPopular(category.id, 5)
        setPopular(fp)
        return
      }
      setPopular(pop.map(q => ({
        id: q.id,
        slug: slugifyKoLocal(q.question || q.title),
        title: q.question || q.title,
      })))
    }
    loadExtras()
  }, [category])

  if (notFound) return (
    <div className="pt-16 min-h-screen bg-gray-hana flex flex-col items-center justify-center gap-4">
      <div className="text-5xl">🔍</div>
      <p className="text-gray-600 text-lg">카테고리를 찾을 수 없습니다.</p>
      <Link to="/qa" className="text-cyan-hana hover:underline text-sm">← 전체 Q&A 보기</Link>
    </div>
  )

  if (!category) return (
    <div className="pt-16 min-h-screen bg-gray-hana flex items-center justify-center">
      <div className="text-gray-400 animate-pulse">로딩 중...</div>
    </div>
  )

  // [2026-05-21] 카테고리 메타데이터 통합 — 헤더 배너 전용 (본문 인터랙티브는 cyan-hana 통일)
  const meta = getCategoryMeta(category.id)

  // [2026-05-21 D6 보강] 구조화 데이터 — BreadcrumbList + CollectionPage + ItemList
  // 검색엔진/AI 에게 카테고리 페이지가 "Q&A 컬렉션 허브"임을 명확히 알리는 3종 세트.
  // 빌더 패턴으로 빈 데이터 대응 (questions 미로드 시 ItemList 제외).
  const pageUrl = `https://phlorotannin.com/category/${slug}`
  const primarySlug = ID_TO_PRIMARY_SLUG[category.id] || slug
  const canonicalUrl = `https://phlorotannin.com/category/${primarySlug}`
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://phlorotannin.com/" },
      { "@type": "ListItem", "position": 2, "name": "건강 Q&A", "item": "https://phlorotannin.com/qa" },
      { "@type": "ListItem", "position": 3, "name": category.name, "item": canonicalUrl },
    ]
  }
  const itemListLd = (questions && questions.length > 0) ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#itemlist`,
    "name": `${category.name} 인기 질문`,
    "numberOfItems": Math.min(questions.length, 10),
    "itemListOrder": "https://schema.org/ItemListOrderDescending",
    "itemListElement": questions.slice(0, 10).map((q, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `https://phlorotannin.com/q/${q.slug || q.id}`,
      "name": q.title,
    })),
  } : null
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    "url": canonicalUrl,
    "name": `${category.name} 건강정보 Q&A`,
    "description": `${category.name} 관련 연구기반 Q&A 아카이브 — 플로로탄닌·감태추출물·해양 폴리페놀 종합 건강정보 데이터센터`,
    "inLanguage": "ko-KR",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://phlorotannin.com/#website",
      "url": "https://phlorotannin.com/",
      "name": "플로로탄닌 종합 건강정보 데이터센터"
    },
    "breadcrumb": { "@id": `${pageUrl}#breadcrumb` },
    ...(itemListLd ? { "mainEntity": { "@id": `${pageUrl}#itemlist` } } : {}),
    ...(total ? { "about": { "@type": "Thing", "name": category.name } } : {}),
  }
  const jsonLd = itemListLd ? [breadcrumbLd, collectionLd, itemListLd] : [breadcrumbLd, collectionLd]

  return (
    <>
      <SEOHead
        title={`${category.name} | 플로로탄닌 종합 건강정보 데이터센터`}
        description={`${category.name} 건강정보 아카이브 — ${category.description || '플로로탄닌·감태추출물·해양 폴리페놀 기반 건강정보'}. 항산화·염증·면역·병원정보·연구기반 Q&A까지 정리하는 종합 건강정보 데이터센터입니다.`}
        keywords={`${category.name}, ${category.name_en || ''}, 플로로탄닌, 감태추출물, 해양 폴리페놀, 건강정보 아카이브, 종합 건강정보 데이터센터`}
        canonical={canonicalUrl}
        ogImage={`https://phlorotannin.com/og/qa-${primarySlug}.png`}
        ogImageAlt={`${category.name} Q&A 아카이브 미리보기 — 플로로탄닌·감태추출물 기반 1,361건 건강정보, 13개 카테고리, 131개 태그 페이지`}
        jsonLd={jsonLd}
      />

      <div className="pt-16 min-h-screen bg-gray-hana">
        {/* [2026-05-21] 의학저널 톤 통합 히어로 배너 — E-E-A-T 신뢰감 강화 */}
        <CategoryHeroBanner
          meta={meta}
          eyebrow="건강 Q&A 카테고리"
          title={category.name}
          subtitle={
            category.description
              ? `${category.description}${total ? ` · 총 ${total.toLocaleString()}개 질문` : ''}`
              : `${meta.blurb || ''}${total ? ` · 총 ${total.toLocaleString()}개 질문` : ''}`
          }
          breadcrumbs={[
            { to: '/', label: '홈' },
            { to: '/qa', label: '건강 Q&A' },
            { label: category.name },
          ]}
        />

        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ── 메인: 질문 목록 ── */}
            <main className="flex-1 min-w-0">
              {/* [2026-05-21] 정렬 탭 — 카테고리 무관 cyan-hana 통일 (active 색 통일) */}
              <div className="flex items-center gap-2 mb-4">
                {[
                  { key: 'popular', label: '🔥 인기순' },
                  { key: 'latest', label: '🕐 최신순' },
                  { key: 'likes', label: '❤️ 추천순' },
                ].map(s => (
                  <button
                    key={s.key}
                    onClick={() => { setSort(s.key); setPage(1) }}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                      sort === s.key
                        ? 'bg-cyan-hana text-white shadow-sm ring-1 ring-cyan-hana/40'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-cyan-hana hover:text-cyan-hana'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* 질문 목록 */}
              <div className="bg-white rounded-2xl border border-border-hana overflow-hidden">
                {loading ? (
                  <div className="divide-y">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="p-4 animate-pulse flex gap-3">
                        <div className="w-7 h-7 bg-gray-100 rounded-full shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-100 rounded w-3/4" />
                          <div className="h-3 bg-gray-50 rounded w-1/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : questions.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="text-4xl mb-3">📭</div>
                    <p className="text-gray-500">아직 질문이 없습니다.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {questions.map((q, i) => (
                      <QuestionRow
                        key={q.id || q.slug}
                        q={q}
                        rank={sort === 'popular' && page === 1 ? i + 1 : null}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* [2026-05-21] 페이지네이션 — cyan-hana 통일 */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-6">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:border-cyan-hana hover:text-cyan-hana disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition">이전</button>
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i
                    const active = page === p
                    return (
                      <button key={p} onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                          active
                            ? 'bg-cyan-hana text-white ring-1 ring-cyan-hana/40 shadow-sm'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-cyan-hana hover:text-cyan-hana'
                        }`}
                      >{p}</button>
                    )
                  })}
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:border-cyan-hana hover:text-cyan-hana disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition">다음</button>
                </div>
              )}
            </main>

            {/* ── 사이드바 ── */}
            <aside className="lg:w-64 shrink-0 space-y-5">

              {/* 인기 질문 TOP 5 */}
              {popular.length > 0 && (
                <div className="bg-white rounded-2xl border border-border-hana p-5">
                  <h3 className="font-bold text-ocean-deep mb-3 text-sm flex items-center gap-2">
                    🔥 인기 질문 TOP 5
                  </h3>
                  <div className="space-y-2">
                    {popular.slice(0, 5).map((q, i) => (
                      <Link
                        key={q.id || q.slug}
                        to={`/q/${q.slug || q.id}`}
                        className="flex items-start gap-2 group"
                      >
                        <span className={`shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold mt-0.5 ${
                          i < 3 ? 'bg-cyan-hana text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {i + 1}
                        </span>
                        <p className="text-xs text-gray-600 group-hover:text-cyan-hana transition line-clamp-2 leading-snug">{q.title}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* [2026-05-21] 통합 카테고리 그리드 — 13개 카테고리 일관 디자인 */}
              <CategoryGrid
                title="다른 카테고리"
                excludeId={category.id}
                excludeSlug={slug}
                variant="sidebar"
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
