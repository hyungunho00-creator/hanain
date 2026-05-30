import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Calendar, Eye, ChevronRight, Search, BookOpen, PlayCircle } from 'lucide-react'
import SEOHead from '../components/common/SEOHead'
import { usePartner } from '../context/PartnerContext'
import { withRef } from '../lib/partnerRef'
import { getPosts, getPostCount, getBlogCategories, getVideosByCategory, expandSearchTerms } from '../lib/supabase'
import { resolvePostImage, getCategoryFallbackImage } from '../lib/postImages'
import { INSIGHTS_LIST } from '../data/insights'

// Phase 3: Supabase categories 테이블이 1순위, 아래 상수는 DB 실패 시 fallback
const FALLBACK_CATEGORIES = [
  { id: 'all',        name: '전체' },
  { id: 'cancer-treatment-care', name: '항암 치료 케어' }, //  항암 치료 부작용·대처·보완 (고전환)
  { id: 'buying-guide',       name: '구매 가이드' },      //  구매 의도 SEO 흡수
  { id: 'safety-precautions', name: '부작용·주의사항' },  //  안전 정보 SEO 흡수
  { id: 'diabetes',   name: '당뇨·혈당' },
  { id: 'digestive',  name: '소화·간' },
  { id: 'cancer',     name: '항암·면역' },
  { id: 'brain',      name: '뇌·인지' },
  { id: 'cardiovascular', name: '심혈관' },
  { id: 'inflammation',   name: '염증·면역' },
  { id: 'skin',       name: '피부·모발' },
  { id: 'research',   name: '연구·임상' },
  { id: 'general',    name: '일반' },
  { id: 'ingredient-comparison', name: '성분 비교' },
  { id: 'disease-health-info',   name: '질환별 건강정보' },
  { id: 'exercise-recovery',      name: '운동·재활 루틴' },
  { id: 'hospital-info',         name: '병원정보' },
  { id: 'partner-info',          name: '파트너 정보' },
  { id: '분자기전 작용경로',     name: '분자기전·작용경로' },
  { id: '신약개발 임상',         name: '신약개발·임상' },
  { id: 'metabolism',            name: '대사 건강' },
  { id: 'cancer_immune',         name: '암·면역 건강' },
  { id: 'neuro_cognitive',       name: '뇌·인지 건강' },
  { id: 'mental_health',         name: '정신·수면 건강' },
  { id: 'musculoskeletal',       name: '근골격 건강' },
  { id: 'respiratory',           name: '호흡기 건강' },
  { id: 'infection_inflammation',name: '감염·염증 건강' },
  { id: 'mens_health',           name: '남성 건강' },
  { id: 'womens_health',         name: '여성 건강' },
]

// 모듈 레벨 캐시 — BlogPage에서 DB 페치 후 갱신, PostCard 등이 같은 변수 참조
let CATEGORIES = FALLBACK_CATEGORIES
const SEARCH_SUGGESTIONS = ['감태', '감태추출물', '디에콜', 'Ecklonia cava', '씨폴리놀', '감태 수면', '감태 갑상선']

// 카테고리 라벨: 단일 모노 톤(헌법 v3 — 1색 액센트 원칙). 카테고리별 시각 구분은 카드 hover/border로 위임
const CAT_COLORS = {
  'cancer-treatment-care': 'bg-gray-900 text-white',
  'buying-guide':       'bg-gray-100 text-gray-700',
  'safety-precautions': 'bg-gray-100 text-gray-700',
  diabetes:      'bg-gray-100 text-gray-700',
  digestive:     'bg-gray-100 text-gray-700',
  cancer:        'bg-gray-100 text-gray-700',
  brain:         'bg-gray-100 text-gray-700',
  cardiovascular:'bg-gray-100 text-gray-700',
  inflammation:  'bg-gray-100 text-gray-700',
  skin:          'bg-gray-100 text-gray-700',
  research:      'bg-gray-100 text-gray-700',
  general:       'bg-gray-100 text-gray-700',
  'ingredient-comparison': 'bg-gray-100 text-gray-700',
  'disease-health-info':   'bg-gray-100 text-gray-700',
  'exercise-recovery':      'bg-gray-100 text-gray-700',
  'hospital-info':         'bg-gray-100 text-gray-700',
  'partner-info':          'bg-gray-100 text-gray-700',
  '분자기전 작용경로': 'bg-gray-100 text-gray-700',
  '신약개발 임상': 'bg-gray-100 text-gray-700',
  metabolism: 'bg-gray-100 text-gray-700',
  cancer_immune: 'bg-gray-100 text-gray-700',
  neuro_cognitive: 'bg-gray-100 text-gray-700',
  mental_health: 'bg-gray-100 text-gray-700',
  musculoskeletal: 'bg-gray-100 text-gray-700',
  respiratory: 'bg-gray-100 text-gray-700',
  infection_inflammation: 'bg-gray-100 text-gray-700',
  mens_health: 'bg-gray-100 text-gray-700',
  womens_health: 'bg-gray-100 text-gray-700',
}

// 블로그 카테고리 → question_videos category_id 매핑
// 어드민에서 등록 시 블로그 카테고리 ID를 그대로 사용
const BLOG_TO_VIDEO_CAT = {
  diabetes:       'diabetes',
  digestive:      null,
  cancer:         'cancer',
  brain:          'brain',
  cardiovascular: 'cardiovascular',
  inflammation:   'inflammation',
  skin:           'skin',
  research:       'research',
  general:        'general',
  'ingredient-comparison': null,
  'disease-health-info':   null,
  'exercise-recovery':      null,
  'hospital-info':         null,
  'partner-info':          null,
  'buying-guide':          null,  //  영상 매칭은 추후
  'safety-precautions':    null,  //  영상 매칭은 추후
  'cancer-treatment-care': 'cancer',  //  기존 cancer 영상 재활용
  '분자기전 작용경로': 'research',
  '신약개발 임상': 'research',
  metabolism: 'diabetes',
  cancer_immune: 'cancer',
  neuro_cognitive: 'brain',
  mental_health: 'brain',
  musculoskeletal: null,
  respiratory: null,
  infection_inflammation: null,
  mens_health: null,
  womens_health: null,
}

// Phase 3 보안 강화: service_role 키를 클라이언트 번들에서 제거
// 영상 페치는 lib/supabase.js의 익명 키 + RLS(question_videos read-all)로 처리
async function getVideosByCat(catId, limit = 3) {
  return getVideosByCategory(catId, limit)
}

function extractYoutubeId(url) {
  return url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&\s?#/]+)/)?.[1] || null
}

// 카테고리 영상 섹션 컴포넌트
function CategoryVideoSection({ categoryId }) {
  const [videos, setVideos] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!categoryId || categoryId === 'all') { setVideos([]); setLoaded(true); return }
    const videoCatId = BLOG_TO_VIDEO_CAT[categoryId] || categoryId
    getVideosByCat(videoCatId, 3).then(v => { setVideos(v); setLoaded(true) })
  }, [categoryId])

  if (!loaded || videos.length === 0) return null

  return (
    <div className="mb-8 bg-gray-50 rounded-lg p-5 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px w-8 bg-gray-300" />
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Related Videos</span>
        <PlayCircle className="w-4 h-4 text-gray-500" />
        <h2 className="font-semibold text-gray-900 text-[15px]">
          {CATEGORIES.find(c => c.id === categoryId)?.name}
        </h2>
        <span className="text-[11px] tabular-nums text-gray-500">· {videos.length}</span>
      </div>
      <div className={`grid gap-4 ${videos.length === 1 ? 'grid-cols-1 max-w-lg' : videos.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
        {videos.map(v => {
          const vid = extractYoutubeId(v.youtube_url)
          return (
            <a key={v.id} href={v.youtube_url} target="_blank" rel="noopener noreferrer"
              className="bg-white rounded-lg overflow-hidden transition-colors group border border-gray-200 hover:border-gray-400">
              {vid && (
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`}
                    alt={v.video_title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/40 transition">
                    <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              <div className="p-3">
                <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors leading-snug">
                  {v.video_title}
                </p>
                {v.video_summary && (
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">{v.video_summary}</p>
                )}
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

function PostCard({ post, partner }) {
  const catColor = CAT_COLORS[post.category] || 'bg-gray-100 text-gray-700'
  const catName  = CATEGORIES.find(c => c.id === post.category)?.name || post.category
  const date     = new Date(post.created_at).toLocaleDateString('ko-KR', { year:'numeric', month:'long', day:'numeric' })
  const imageSrc = resolvePostImage(post.og_image, post.category)

  // SEO: 글마다 다른 alt 텍스트 (동일 alt 페널티 회피, AI 호출 없이 기존 데이터만 조합)
  // '|' 앞부분만 추출(영문 부제 제거, ':' 뒤 한글 부제는 유지 → 변별력↑)
  const rawTitle = (post.title || '').toString().trim()
  const titleCore = rawTitle.split('|')[0].trim() || rawTitle
  const imgAlt   = `${titleCore} - ${catName} 건강정보 일러스트`

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden group">
      <div className="aspect-video overflow-hidden">
        <img
          src={imageSrc}
          alt={imgAlt}
          loading="lazy"
          onError={(e) => {
            const fallback = getCategoryFallbackImage(post.category)
            if (e.currentTarget.getAttribute('data-fallback-applied') === '1') return
            e.currentTarget.setAttribute('data-fallback-applied', '1')
            e.currentTarget.src = fallback
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColor}`}>{catName}</span>
          {post.tags?.slice(0,2).map(t => (
            <span key={t} className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">#{t}</span>
          ))}
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
          <Link to={withRef(`/blog/${post.slug}`, partner)}>{post.title}</Link>
        </h2>
        {post.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed">{post.excerpt}</p>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{date}</span>
            {post.view_count > 0 && (
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{post.view_count}</span>
            )}
          </div>
          <Link to={withRef(`/blog/${post.slug}`, partner)}
            className="text-xs font-semibold text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700 flex items-center gap-1">
            읽기 <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCat = searchParams.get('category') || 'all'
  const searchQ   = searchParams.get('q') || ''
  const partner   = usePartner()

  const [posts,     setPosts]     = useState([])
  const [total,     setTotal]     = useState(0)
  const [loading,   setLoading]   = useState(true)
  const [searchInput, setSearchInput] = useState(searchQ)
  const [cats, setCats] = useState(CATEGORIES)

  // Phase 3+: Supabase categories 테이블 + FALLBACK_CATEGORIES 머지
  // - DB가 source of truth (sort_order 유지)
  // - FALLBACK에만 있는 카테고리(신규 추가 직후·DB INSERT 권한 없을 때)는 뒤에 append
  //   → 코드 신규 카테고리도 즉시 노출되어 사용자가 두 번 수정할 필요 없음 (헌법 제1조)
  useEffect(() => {
    getBlogCategories().then(list => {
      if (list && list.length) {
        const dbIds = new Set(list.map(c => c.id))
        const extras = FALLBACK_CATEGORIES.filter(c => !dbIds.has(c.id) && c.id !== 'all')
        const merged = extras.length ? [...list, ...extras] : list
        CATEGORIES = merged  // 모듈 캐시 갱신 (PostCard, CategoryVideoSection 즉시 반영)
        setCats(merged)
      }
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    const cat = activeCat === 'all' ? null : activeCat
    // 2026-05-20 BUGFIX: 검색어를 supabase.js의 getPosts에 q로 전달 →
    //   기존 'limit 50 내에서 클라이언트 필터' 방식은 51번째 이후 글이 검색 불가였음.
    //   이제 q가 있으면 서버사이드 ILIKE로 전체 published 풀에서 검색한다.
    getPosts({ category: cat, limit: 50, q: searchQ || null }).then(({ data }) => {
      // 안전망: tags 부분 매칭 (서버사이드 contains는 정확매치라 부분 단어 보완)
      let filtered = data
      if (searchQ) {
        const terms = expandSearchTerms(searchQ)
        // 서버에서 이미 title/excerpt/tags(정확) 결과 받았으나, 부분 단어로 tag 매칭도 추가 보완
        // 클라이언트 사이드 보완은 이미 받은 set 안에서 정렬만 다듬는 정도로 한정
        filtered = data.filter((p) =>
          terms.some((term) => {
            const needle = term.toLowerCase()
            return (
              p.title?.toLowerCase().includes(needle) ||
              p.excerpt?.toLowerCase().includes(needle) ||
              p.tags?.some((t) => t.toLowerCase().includes(needle))
            )
          })
        )
        // 검색 결과가 0인데 서버 결과가 있으면 그대로 보여줌 (보완 필터가 너무 엄격하지 않게)
        if (filtered.length === 0 && data.length > 0) filtered = data
      }
      setPosts(filtered)
      setLoading(false)
    })
    getPostCount(activeCat === 'all' ? null : activeCat).then(setTotal)
  }, [activeCat, searchQ])

  const handleSearch = (e) => {
    e.preventDefault()
    const p = new URLSearchParams(searchParams)
    if (searchInput.trim()) p.set('q', searchInput.trim())
    else p.delete('q')
    setSearchParams(p)
  }

  const applySuggestedSearch = (term) => {
    setSearchInput(term)
    const p = new URLSearchParams(searchParams)
    p.set('q', term)
    setSearchParams(p)
  }

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "플로로탄닌 건강 블로그",
    "url": "https://phlorotannin.com/blog",
    "description": "플로로탄닌(Phlorotannin), PH-100, 에콜(Eckol), 디에콜(Dieckol) 최신 연구·임상 정보. 당뇨·암·뇌건강·심혈관 천연물 건강 정보.",
    "inLanguage": "ko-KR",
    "publisher": {
      "@type": "Organization",
      "name": "플로로탄닌 파트너스",
      "url": "https://phlorotannin.com"
    }
  }

  // SEO 정합성 (헌법 제10조 의무 7):
  //   - 기본 /blog : index, follow
  //   - /blog?category=… / /blog?q=… : 동일 canonical + noindex (중복 콘텐츠 방지)
  const isBlogFiltered = activeCat !== 'all' || !!searchQ
  return (
    <>
      <SEOHead
        title="건강정보 블로그 | 플로로탄닌·감태추출물·해양 폴리페놀 연구 아카이브"
        description="감태추출물·해양 폴리페놀·플로로탄닌의 최신 연구와 건강정보를 정리한 블로그 아카이브. 항산화·염증·혈당·수면·면역·뇌 건강·암환자 가족 건강정보·당뇨 건강정보까지 폭넓게 다루는 종합 건강정보 데이터센터입니다."
        keywords="플로로탄닌 블로그, 감태추출물 블로그, 해양 폴리페놀 연구, 갈조류 폴리페놀, 항산화 건강정보, 염증 건강정보, 혈당 건강정보, 면역, 뇌 건강"
        canonical="https://phlorotannin.com/blog"
        noindex={isBlogFiltered}
        jsonLd={blogJsonLd}
      />

      <div className="min-h-screen bg-gray-50">
        {/* 헤더 — 라이트 에디토리얼 (헌법 v3) */}
        <div className="bg-white border-b border-gray-200 pt-20 pb-14 md:pt-24 md:pb-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-gray-300" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Research Blog</span>
              <BookOpen className="w-4 h-4 text-gray-400" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-3 text-gray-900 tracking-tight">
              플로로탄닌 연구 블로그
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mb-8">
              PH-100 · 에콜 · 디에콜 최신 임상·연구 정보를 전달합니다
            </p>

            <form onSubmit={handleSearch} className="max-w-lg flex gap-2">
              <input
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="키워드 검색 (예: PH-100, 당뇨, eckol)"
                className="flex-1 px-4 py-3 rounded-md bg-white border border-gray-300 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <button type="submit"
                className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-md text-[14px] font-medium transition-colors flex items-center gap-2">
                <Search className="w-4 h-4" /> 검색
              </button>
            </form>
            <div className="mt-3 flex flex-wrap gap-2">
              {SEARCH_SUGGESTIONS.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => applySuggestedSearch(term)}
                  className="px-2.5 py-1 rounded-md border border-gray-200 bg-white text-[12px] text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* [2026-05-21] 인사이트 진입 CTA — 블로그 방문자에게 심층 자산 자연 안내
              디자인: 라이트 모노톤 위에 미세한 ocean-deep 액센트, 광고 톤 아님 */}
          <Link
            to={withRef('/insights', partner)}
            className="group block mb-6 -mt-1 rounded-lg border border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-900 text-white flex-shrink-0">
                <BookOpen className="w-4.5 h-4.5" strokeWidth={1.6} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-500">
                    Insights · {INSIGHTS_LIST.length}
                  </span>
                  <span className="text-[10px] text-gray-300">·</span>
                  <span className="text-[10px] text-gray-500">PubMed·PMC·DOI 1차 자료 기반</span>
                </div>
                <p className="text-[14px] font-semibold text-gray-900 leading-snug">
                  심층 원료 자산 {INSIGHTS_LIST.length}편 — 플로로탄닌·NMN·후코이단·베르베린 등 PMC 검증 가이드
                </p>
              </div>
              <ChevronRight
                className="w-4 h-4 text-gray-300 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                aria-hidden="true"
              />
            </div>
          </Link>

          {/* 카테고리 탭 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {cats.map(cat => (
              <button key={cat.id}
                onClick={() => {
                  const p = new URLSearchParams(searchParams)
                  if (cat.id !== 'all') p.set('category', cat.id)
                  else p.delete('category')
                  setSearchParams(p)
                }}
                className={`px-4 py-2 rounded-md text-[13px] font-medium transition-colors ${
                  activeCat === cat.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400 hover:text-gray-900'
                }`}>
                {cat.name}
              </button>
            ))}
          </div>

          {/* ★ 카테고리 선택 시 관련 영상 섹션 */}
          {activeCat !== 'all' && !searchQ && (
            <CategoryVideoSection categoryId={activeCat} />
          )}

          {/* 검색 결과 수 */}
          {searchQ && (
            <p className="text-sm text-gray-500 mb-4">
              "<span className="font-semibold text-gray-800">{searchQ}</span>" 검색 결과 {posts.length}건
            </p>
          )}

          {/* 글 목록 */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">아직 글이 없습니다</p>
              <p className="text-sm mt-1">곧 최신 연구 정보를 업로드할 예정입니다</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => <PostCard key={post.id} post={post} partner={partner} />)}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
