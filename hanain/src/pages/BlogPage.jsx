import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Calendar, Tag, Eye, ChevronRight, Search, BookOpen } from 'lucide-react'
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
        title="플로로탄닌 건강 블로그 | Phlorotannin Research & Health"
        description="플로로탄닌(Phlorotannin), PH-100, 에콜(Eckol), 디에콜(Dieckol) 최신 연구·임상 정보. 당뇨 임상 2b, 혈당 조절, 항암, 뇌 건강 천연물 최신 뉴스."
        keywords="플로로탄닌,phlorotannin,PH-100,에콜,eckol,디에콜,dieckol,당뇨임상,혈당조절,해양폴리페놀,감태추출물,brown algae"
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
            {/* 검색창 */}
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
          <div className="flex flex-wrap gap-2 mb-8">
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

          {/* 결과 수 */}
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
