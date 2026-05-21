import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Search, PenSquare, MessageSquare, Heart, Eye, Share2, ChevronRight, TrendingUp, Clock, Filter } from 'lucide-react'
import { getPosts } from '../lib/supabase'
import { COMMUNITY_CATEGORIES, getCategoryById } from '../data/communityCategories'
import { useAuth } from '../context/AuthContext'
import SEOHead from '../components/common/SEOHead'

const POSTS_PER_PAGE = 20

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000
  if (diff < 60) return '방금 전'
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
  if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`
  return new Date(dateStr).toLocaleDateString('ko-KR')
}

function PostCard({ post }) {
  const cat = getCategoryById(post.category)
  const authorName = post.users?.nickname || '익명'

  return (
    <Link
      to={`/community/post/${post.id}`}
      className="block bg-white rounded-lg border border-gray-200 hover:border-gray-400 transition-colors duration-200 p-5 group"
    >
      <div className="flex items-start gap-3 mb-3">
        {/* 카테고리 배지 — 모노 */}
        <span className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">
          {cat.label}
        </span>
      </div>

      <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors mb-2 line-clamp-2 leading-snug">
        {post.title}
      </h3>

      <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold">
            {authorName.charAt(0)}
          </div>
          <span>{authorName}</span>
          <span className="text-gray-300">·</span>
          <span>{timeAgo(post.created_at)}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> {post.view_count || 0}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5" /> {post.like_count || 0}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" /> {post.comment_count || 0}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function CommunityPage() {
  useAuth() // kept for compatibility
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const urlCategory = searchParams.get('category') || 'all'
  const urlSearch = searchParams.get('q') || ''
  const urlPage = parseInt(searchParams.get('page') || '1', 10)

  const [activeCategory, setActiveCategory] = useState(urlCategory)
  const [searchQuery, setSearchQuery] = useState(urlSearch)
  const [inputValue, setInputValue] = useState(urlSearch)
  const [posts, setPosts] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(urlPage)

  const currentCat = getCategoryById(activeCategory)
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    const { data, count } = await getPosts({
      category: activeCategory,
      page,
      limit: POSTS_PER_PAGE,
      search: searchQuery,
    })
    setPosts(data)
    setTotalCount(count || 0)
    setLoading(false)
  }, [activeCategory, page, searchQuery])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  // URL 동기화
  useEffect(() => {
    const params = {}
    if (activeCategory !== 'all') params.category = activeCategory
    if (searchQuery) params.q = searchQuery
    if (page > 1) params.page = page
    setSearchParams(params)
  }, [activeCategory, searchQuery, page, setSearchParams])

  function handleCategoryChange(catId) {
    setActiveCategory(catId)
    setPage(1)
    setSearchQuery('')
    setInputValue('')
  }

  function handleSearch(e) {
    e.preventDefault()
    setSearchQuery(inputValue)
    setPage(1)
  }

  const activeCats = COMMUNITY_CATEGORIES.filter(c => c.id !== 'all')

  return (
    <>
      <SEOHead
        title={`${currentCat.id === 'all' ? '건강정보 커뮤니티' : currentCat.label + ' 커뮤니티'} | 플로로탄닌·감태추출물 건강정보 아카이브`}
        description={`플로로탄닌·감태추출물·해양 폴리페놀 기반 건강정보 커뮤니티. ${currentCat.description || '질환별 카테고리, 회원 경험 공유, 항산화·염증·혈당·수면·면역·뇌 건강·암환자 가족 건강정보까지 정리합니다.'}`}
        keywords={currentCat.seoKeywords || '플로로탄닌 커뮤니티, 감태추출물 커뮤니티, 건강정보 공유, 질환별 건강정보 아카이브'}
        canonical={`https://phlorotannin.com/community${currentCat.id !== 'all' ? '?category=' + currentCat.id : ''}`}
      />

      <div className="pt-16 min-h-screen bg-gray-50">
        {/* 히어로 헤더 — 라이트 에디토리얼 */}
        <div className="bg-white border-b border-gray-200 py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-gray-300" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Community</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  건강 커뮤니티
                </h1>
                <p className="text-gray-500 text-sm md:text-base">
                  플로로탄닌과 함께하는 건강 이야기 · {totalCount.toLocaleString()}개 게시글
                </p>
              </div>
              <Link
                  to="/community/write"
                  className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-md font-medium transition-colors text-sm"
                >
                  <PenSquare className="w-4 h-4" />
                  글쓰기
                </Link>
            </div>

            {/* 검색창 */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="게시글 검색..."
                className="w-full bg-white border border-gray-300 rounded-md pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-base"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-900 hover:bg-black text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                검색
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 사이드바: 카테고리 목록 */}
            <aside className="lg:w-56 shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-20">
                <div className="flex items-center gap-3 mb-3 px-1">
                  <span className="h-px w-6 bg-gray-300" />
                  <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Categories</h2>
                </div>
                <nav className="space-y-0.5">
                  {/* 전체 */}
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${
                      activeCategory === 'all'
                        ? 'bg-gray-900 text-white font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>전체 게시글</span>
                    {activeCategory === 'all' && <ChevronRight className="w-4 h-4" />}
                  </button>

                  <p className="text-[11px] text-gray-400 px-3 pt-3 pb-1 font-medium uppercase tracking-[0.16em]">질환별 게시판</p>
                  {activeCats.filter(c => !['review','question','free'].includes(c.id)).map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${
                        activeCategory === cat.id
                          ? 'bg-gray-900 text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {activeCategory === cat.id && <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  ))}

                  <p className="text-[11px] text-gray-400 px-3 pt-3 pb-1 font-medium uppercase tracking-[0.16em]">커뮤니티</p>
                  {activeCats.filter(c => ['review','question','free'].includes(c.id)).map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${
                        activeCategory === cat.id
                          ? 'bg-gray-900 text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {activeCategory === cat.id && <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* 메인: 게시글 목록 */}
            <main className="flex-1 min-w-0">
              {/* 현재 카테고리 헤더 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{currentCat.label === '전체' ? '전체 게시글' : currentCat.label + ' 게시판'}</h2>
                    {currentCat.description && (
                      <p className="text-xs text-gray-500">{currentCat.description}</p>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{totalCount.toLocaleString()}개</span>
              </div>

              {/* 검색 결과 표시 */}
              {searchQuery && (
                <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3 mb-4 flex items-center justify-between">
                  <span className="text-gray-700 text-sm">
                    <strong>"{searchQuery}"</strong> 검색 결과 {totalCount}개
                  </span>
                  <button
                    onClick={() => { setSearchQuery(''); setInputValue(''); setPage(1) }}
                    className="text-gray-900 text-sm underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700"
                  >
                    초기화
                  </button>
                </div>
              )}

              {/* 게시글 목록 */}
              {loading ? (
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg border border-gray-200 p-5 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-100 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <p className="text-gray-700 text-lg font-medium mb-2">아직 게시글이 없습니다</p>
                  <p className="text-gray-400 text-sm mb-6">첫 번째 글을 작성해보세요</p>
                    <Link to="/community/write" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-md font-medium transition-colors text-sm">
                      <PenSquare className="w-4 h-4" /> 글쓰기
                    </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    이전
                  </button>
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-md text-sm font-medium transition-colors tabular-nums ${
                          page === p
                            ? 'bg-gray-900 text-white'
                            : 'border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  })}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    다음
                  </button>
                </div>
              )}
            </main>
          </div>


        </div>
      </div>
    </>
  )
}
