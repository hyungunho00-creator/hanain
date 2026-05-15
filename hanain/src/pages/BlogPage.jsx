import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Calendar, Eye, ChevronRight, Search, BookOpen, PlayCircle } from 'lucide-react'
import SEOHead from '../components/common/SEOHead'
import { getPosts, getPostCount } from '../lib/supabase'

const CATEGORIES = [
  { id: 'all',        name: '전체' },
  { id: 'diabetes',   name: '당뇨·혈당' },
  { id: 'cancer',     name: '항암·면역' },
  { id: 'brain',      name: '뇌·인지' },
  { id: 'cardiovascular', name: '심혈관' },
  { id: 'inflammation',   name: '염증·면역' },
  { id: 'skin',       name: '피부·모발' },
  { id: 'research',   name: '연구·임상' },
  { id: 'general',    name: '일반' },
  // SEO 확장 — 카테고리 랜딩 4종
  { id: 'ingredient-comparison', name: '성분 비교' },
  { id: 'disease-health-info',   name: '질환별 건강정보' },
  { id: 'hospital-info',         name: '병원정보' },
  { id: 'partner-info',          name: '파트너 정보' },
]

const CAT_COLORS = {
  diabetes:      'bg-orange-100 text-orange-700',
  cancer:        'bg-red-100 text-red-700',
  brain:         'bg-purple-100 text-purple-700',
  cardiovascular:'bg-rose-100 text-rose-700',
  inflammation:  'bg-yellow-100 text-yellow-700',
  skin:          'bg-pink-100 text-pink-700',
  research:      'bg-blue-100 text-blue-700',
  general:       'bg-gray-100 text-gray-700',
  'ingredient-comparison': 'bg-teal-100 text-teal-700',
  'disease-health-info':   'bg-amber-100 text-amber-700',
  'hospital-info':         'bg-indigo-100 text-indigo-700',
  'partner-info':          'bg-emerald-100 text-emerald-700',
}

// 블로그 카테고리 → question_videos category_id 매핑
// 어드민에서 등록 시 블로그 카테고리 ID를 그대로 사용
const BLOG_TO_VIDEO_CAT = {
  diabetes:       'diabetes',
  cancer:         'cancer',
  brain:          'brain',
  cardiovascular: 'cardiovascular',
  inflammation:   'inflammation',
  skin:           'skin',
  research:       'research',
  general:        'general',
  'ingredient-comparison': null,
  'disease-health-info':   null,
  'hospital-info':         null,
  'partner-info':          null,
}

const SB_URL = 'https://rlfxuyeoluoeaxuujtly.supabase.co'
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI'

async function getVideosByCat(catId, limit = 3) {
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/question_videos?category_id=eq.${catId}&order=sort_order.asc&limit=${limit}`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, 'Accept-Profile': 'public' } }
    )
    if (!res.ok) return []
    return await res.json()
  } catch { return [] }
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
    <div className="mb-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-5 border border-teal-100">
      <div className="flex items-center gap-2 mb-4">
        <PlayCircle className="w-5 h-5 text-teal-600" />
        <h2 className="font-bold text-teal-800 text-base">
          {CATEGORIES.find(c => c.id === categoryId)?.name} 관련 영상
        </h2>
        <span className="text-xs text-teal-500 bg-teal-100 px-2 py-0.5 rounded-full">{videos.length}개</span>
      </div>
      <div className={`grid gap-4 ${videos.length === 1 ? 'grid-cols-1 max-w-lg' : videos.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
        {videos.map(v => {
          const vid = extractYoutubeId(v.youtube_url)
          return (
            <a key={v.id} href={v.youtube_url} target="_blank" rel="noopener noreferrer"
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group border border-teal-100">
              {vid && (
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`}
                    alt={v.video_title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              <div className="p-3">
                <p className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-teal-600 transition-colors leading-snug">
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

function PostCard({ post }) {
  const catColor = CAT_COLORS[post.category] || 'bg-gray-100 text-gray-700'
  const catName  = CATEGORIES.find(c => c.id === post.category)?.name || post.category
  const date     = new Date(post.created_at).toLocaleDateString('ko-KR', { year:'numeric', month:'long', day:'numeric' })

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden group">
      {post.og_image && (
        <div className="aspect-video overflow-hidden">
          <img src={post.og_image} alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColor}`}>{catName}</span>
          {post.tags?.slice(0,2).map(t => (
            <span key={t} className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">#{t}</span>
          ))}
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
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
          <Link to={`/blog/${post.slug}`}
            className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1">
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

  const [posts,     setPosts]     = useState([])
  const [total,     setTotal]     = useState(0)
  const [loading,   setLoading]   = useState(true)
  const [searchInput, setSearchInput] = useState(searchQ)

  useEffect(() => {
    setLoading(true)
    const cat = activeCat === 'all' ? null : activeCat
    getPosts({ category: cat, limit: 50 }).then(({ data }) => {
      let filtered = data
      if (searchQ) {
        const q = searchQ.toLowerCase()
        filtered = data.filter(p =>
          p.title?.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.tags?.some(t => t.toLowerCase().includes(q))
        )
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

  return (
    <>
      <SEOHead
        title="건강정보 블로그 | 플로로탄닌·감태추출물·해양 폴리페놀 연구 아카이브"
        description="감태추출물·해양 폴리페놀·플로로탄닌의 최신 연구와 건강정보를 정리한 블로그 아카이브. 항산화·염증·혈당·수면·면역·뇌 건강·암환자 가족 건강정보·당뇨 건강정보까지 폭넓게 다루는 종합 건강정보 데이터센터입니다."
        keywords="플로로탄닌 블로그, 감태추출물 블로그, 해양 폴리페놀 연구, 갈조류 폴리페놀, 항산화 건강정보, 염증 건강정보, 혈당 건강정보, 면역, 뇌 건강"
        canonical="https://phlorotannin.com/blog"
        jsonLd={blogJsonLd}
      />

      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-gradient-to-br from-ocean-deep via-blue-900 to-teal-800 text-white py-14">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <BookOpen className="w-6 h-6 text-cyan-300" />
              <span className="text-cyan-300 text-sm font-semibold tracking-widest uppercase">Research Blog</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
              플로로탄닌 연구 블로그
            </h1>
            <p className="text-blue-200 text-base max-w-xl mx-auto mb-6">
              PH-100 · 에콜 · 디에콜 최신 임상·연구 정보를 전달합니다
            </p>
            <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-2">
              <input
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="키워드 검색 (예: PH-100, 당뇨, eckol)"
                className="flex-1 px-4 py-3 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors flex items-center gap-1.5">
                <Search className="w-4 h-4" /> 검색
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* 카테고리 탭 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORIES.map(cat => (
              <button key={cat.id}
                onClick={() => {
                  const p = new URLSearchParams()
                  if (cat.id !== 'all') p.set('category', cat.id)
                  setSearchParams(p)
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCat === cat.id
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-400 hover:text-teal-600'
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
              <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">아직 글이 없습니다</p>
              <p className="text-sm mt-1">곧 최신 연구 정보를 업로드할 예정입니다</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
