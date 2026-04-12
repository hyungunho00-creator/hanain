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
      className="block bg-white rounded-2xl border border-border-hana hover:border-cyan-hana hover:shadow-lg transition-all duration-200 p-5 group"
    >
      <div className="flex items-start gap-3 mb-3">
        {/* 카테고리 배지 */}
        <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full text-white ${cat.color}`}>
          {cat.emoji} {cat.label}
        </span>
      </div>

      <h3 className="text-base font-semibold text-ocean-deep group-hover:text-cyan-hana transition-colors mb-2 line-clamp-2 leading-snug">
        {post.title}
      </h3>

      <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-hana to-blue-500 flex items-center justify-center text-white text-xs font-bold">
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
  const { user, isMember } = useAuth()
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
        title={`${currentCat.id === 'all' ? '커뮤니티' : currentCat.label + ' 게시판'} | 플로로탄닌 파트너스`}
        description={`플로로탄닌 건강 커뮤니티. ${currentCat.description || '12개 질환별 카테고리, 회원 경험 공유, Q&A 게시판'}`}
        keywords={currentCat.seoKeywords || '플로로탄닌 커뮤니티, 건강 정보 공유, 질환별 게시판'}
        canonical={`https://phlorotannin.com/community${currentCat.id !== 'all' ? '?category=' + currentCat.id : ''}`}
      />

      <div className="pt-16 min-h-screen bg-gray-hana">
        {/* 히어로 헤더 */}
        <div className="bg-ocean-deep text-white py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">
                  💬 건강 커뮤니티
                </h1>
                <p className="text-gray-300 text-sm md:text-base">
                  플로로탄닌과 함께하는 건강 이야기 · {totalCount.toLocaleString()}개 게시글
                </p>
              </div>
              {isMember ? (
                <Link
                  to="/community/write"
                  className="flex items-center gap-2 bg-cyan-hana text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-opacity-90 transition-all text-sm shadow-lg"
                >
                  <PenSquare className="w-4 h-4" />
                  글쓰기
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 border border-white/40 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-white/10 transition-all text-sm"
                >
                  로그인 후 글쓰기
                </Link>
              )}
            </div>

            {/* 검색창 */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="게시글 검색..."
                className="w-full bg-white/10 backdrop-blur border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-hana focus:bg-white/15 transition-all text-base"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-cyan-hana text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-opacity-90 transition"
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
              <div className="bg-white rounded-2xl border border-border-hana p-4 sticky top-20">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">카테고리</h2>
                <nav className="space-y-1">
                  {/* 전체 */}
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                      activeCategory === 'all'
                        ? 'bg-ocean-deep text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>📋 전체 게시글</span>
                    {activeCategory === 'all' && <ChevronRight className="w-4 h-4" />}
                  </button>

                  {/* 구분선: 질환별 */}
                  <p className="text-xs text-gray-400 px-3 pt-2 pb-1 font-semibold">질환별 게시판</p>
                  {activeCats.filter(c => !['review','question','free'].includes(c.id)).map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center justify-between ${
                        activeCategory === cat.id
                          ? `${cat.color} text-white font-semibold`
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.emoji} {cat.label}</span>
                      {activeCategory === cat.id && <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  ))}

                  {/* 구분선: 기타 */}
                  <p className="text-xs text-gray-400 px-3 pt-2 pb-1 font-semibold">커뮤니티</p>
                  {activeCats.filter(c => ['review','question','free'].includes(c.id)).map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center justify-between ${
                        activeCategory === cat.id
                          ? `${cat.color} text-white font-semibold`
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.emoji} {cat.label}</span>
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
                  <span className={`text-2xl`}>{currentCat.emoji}</span>
                  <div>
                    <h2 className="text-lg font-bold text-ocean-deep">{currentCat.label === '전체' ? '전체 게시글' : currentCat.label + ' 게시판'}</h2>
                    {currentCat.description && (
                      <p className="text-xs text-gray-500">{currentCat.description}</p>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{totalCount.toLocaleString()}개</span>
              </div>

              {/* 검색 결과 표시 */}
              {searchQuery && (
                <div className="bg-cyan-50 border border-cyan-200 rounded-xl px-4 py-3 mb-4 flex items-center justify-between">
                  <span className="text-cyan-700 text-sm">
                    <strong>"{searchQuery}"</strong> 검색 결과 {totalCount}개
                  </span>
                  <button
                    onClick={() => { setSearchQuery(''); setInputValue(''); setPage(1) }}
                    className="text-cyan-600 text-sm hover:underline"
                  >
                    초기화
                  </button>
                </div>
              )}

              {/* 게시글 목록 */}
              {loading ? (
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-border-hana p-5 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-100 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-border-hana p-12 text-center">
                  <div className="text-5xl mb-4">📝</div>
                  <p className="text-gray-500 text-lg mb-2">아직 게시글이 없습니다</p>
                  <p className="text-gray-400 text-sm mb-6">첫 번째 글을 작성해보세요!</p>
                  {isMember ? (
                    <Link to="/community/write" className="inline-flex items-center gap-2 bg-cyan-hana text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-opacity-90 transition-all text-sm">
                      <PenSquare className="w-4 h-4" /> 글쓰기
                    </Link>
                  ) : (
                    <Link to="/login" className="inline-flex items-center gap-2 bg-ocean-deep text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-opacity-90 transition-all text-sm">
                      로그인하기
                    </Link>
                  )}
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
                    className="px-4 py-2 rounded-xl border border-border-hana text-sm font-medium text-gray-600 hover:border-cyan-hana hover:text-cyan-hana disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    이전
                  </button>
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-xl text-sm font-medium transition ${
                          page === p
                            ? 'bg-cyan-hana text-white'
                            : 'border border-border-hana text-gray-600 hover:border-cyan-hana hover:text-cyan-hana'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  })}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded-xl border border-border-hana text-sm font-medium text-gray-600 hover:border-cyan-hana hover:text-cyan-hana disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    다음
                  </button>
                </div>
              )}
            </main>
          </div>

          {/* 비회원 안내 배너 */}
          {!isMember && (
            <div className="mt-8 bg-gradient-to-r from-ocean-deep to-ocean-mid rounded-2xl p-6 text-white text-center">
              <p className="font-bold text-lg mb-2">회원만 게시글을 작성할 수 있습니다</p>
              <p className="text-gray-300 text-sm mb-4">무료 회원가입 후 커뮤니티에 참여하세요</p>
              <div className="flex gap-3 justify-center">
                <Link to="/signup" className="bg-cyan-hana text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-opacity-90 transition text-sm">
                  무료 회원가입
                </Link>
                <Link to="/login" className="border border-white/40 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-white/10 transition text-sm">
                  로그인
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
