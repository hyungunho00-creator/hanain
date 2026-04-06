import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, ChevronDown, ChevronUp, ThumbsUp, Share2, X, Filter, BookOpen, TrendingUp } from 'lucide-react'
import qaData from '../data/qa.json'

const ITEMS_PER_PAGE = 20

function highlightText(text, query) {
  if (!query || query.length < 2) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

function QACard({ qa, isOpen, onToggle, searchQuery, categories }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(qa.likes)
  const cat = categories.find(c => c.id === qa.category)

  const handleLike = (e) => {
    e.stopPropagation()
    if (!liked) {
      setLiked(true)
      setLikeCount(prev => prev + 1)
    }
  }

  const handleShare = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(window.location.href + '?q=' + encodeURIComponent(qa.question))
      alert('링크가 복사되었습니다!')
    } catch {
      alert('링크 복사: ' + window.location.href)
    }
  }

  return (
    <div className={`bg-white rounded-2xl shadow-sm border transition-all duration-200 overflow-hidden ${isOpen ? 'border-cyan-hana shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
      {/* Question header */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6"
      >
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {cat && (
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.name}
                </span>
              )}
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                qa.difficulty === '기초' ? 'bg-green-100 text-green-700' :
                qa.difficulty === '중급' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {qa.difficulty}
              </span>
              {qa.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
            <h3
              className="font-semibold text-ocean-deep text-lg leading-snug"
              dangerouslySetInnerHTML={{ __html: highlightText(qa.question, searchQuery) }}
            />
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
              <span>👁 {qa.views.toLocaleString()}</span>
              <span>👍 {likeCount}</span>
            </div>
          </div>
          <div className={`text-cyan-hana transition-transform duration-300 flex-shrink-0 mt-1 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </button>

      {/* Answer */}
      {isOpen && (
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <div className="space-y-5">
            {[
              { key: 'step1_empathy', label: '💬 공감', color: 'bg-blue-50 border-blue-200' },
              { key: 'step2_statistics', label: '📊 현황 통계', color: 'bg-green-50 border-green-200' },
              { key: 'step3_standard_treatment', label: '🏥 표준 치료', color: 'bg-yellow-50 border-yellow-200' },
              { key: 'step4_natural_alternatives', label: '🌿 천연 대안', color: 'bg-teal-50 border-teal-200' },
              { key: 'step5_phlorotannin', label: '⚗️ 플로로탄닌 & MOP 기술', color: 'bg-cyan-50 border-cyan-200' },
              { key: 'step6_cta', label: '📞 상담 안내', color: 'bg-purple-50 border-purple-200' },
            ].map(step => (
              qa.answer[step.key] && (
                <div key={step.key} className={`rounded-xl border p-4 ${step.color}`}>
                  <div className="font-semibold text-sm text-gray-600 mb-1">{step.label}</div>
                  <p className="text-gray-700 text-sm leading-relaxed">{qa.answer[step.key]}</p>
                </div>
              )
            ))}

            {/* References */}
            {qa.answer.references?.length > 0 && (
              <div className="bg-gray-100 rounded-xl p-4">
                <div className="font-semibold text-sm text-gray-500 mb-2">📚 참고 문헌</div>
                <ul className="space-y-1">
                  {qa.answer.references.map((ref, i) => (
                    <li key={i} className="text-xs text-gray-500 flex items-start gap-2">
                      <span className="text-gray-400">[{i+1}]</span>
                      <span>{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Disclaimer */}
            <div className="text-xs text-gray-400 italic border-t pt-3">
              ⚠️ {qa.answer.disclaimer}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  liked ? 'bg-cyan-hana text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-cyan-hana hover:text-cyan-hana'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                도움이 됐어요 {likeCount}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:border-cyan-hana hover:text-cyan-hana transition-all"
              >
                <Share2 className="w-4 h-4" />
                공유
              </button>
              <Link
                to="/consult"
                className="ml-auto btn-primary text-sm py-2"
              >
                상담 신청
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function QAPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
  const [openId, setOpenId] = useState(null)
  const [page, setPage] = useState(1)
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery)
      setPage(1)
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [searchQuery])

  const filteredQuestions = useCallback(() => {
    let results = qaData.questions
    if (activeCategory !== 'all') {
      results = results.filter(q => q.category === activeCategory)
    }
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase()
      results = results.filter(r =>
        r.question.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q)) ||
        Object.values(r.answer).join(' ').toLowerCase().includes(q)
      )
    }
    return results
  }, [activeCategory, debouncedQuery])

  const questions = filteredQuestions()
  const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE)
  const paginatedQuestions = questions.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  const popularQuestions = [...qaData.questions].sort((a, b) => b.views - a.views).slice(0, 10)

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-ocean-gradient py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 text-white mb-4">
            <BookOpen className="w-6 h-6 text-cyan-hana" />
            <span className="text-cyan-hana font-medium">Q&A 라이브러리</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">건강 정보 Q&A</h1>

          {/* Search bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="질문, 증상, 태그로 검색..."
              className="w-full bg-white pl-12 pr-10 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-hana text-gray-700 shadow-lg"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Category tabs - mobile horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          <button
            onClick={() => { setActiveCategory('all'); setPage(1) }}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'all' ? 'bg-ocean-deep text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            전체 ({qaData.questions.length})
          </button>
          {qaData.categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setPage(1) }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              style={activeCategory === cat.id ? { backgroundColor: cat.color } : {}}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Q&A list */}
          <div className="lg:col-span-2 space-y-4">
            {debouncedQuery && (
              <div className="text-sm text-gray-500 mb-4">
                "<strong>{debouncedQuery}</strong>" 검색 결과: {questions.length}개
              </div>
            )}

            {paginatedQuestions.length === 0 ? (
              <div className="card text-center py-16">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400">검색 결과가 없습니다.</p>
                <button onClick={() => { setSearchQuery(''); setActiveCategory('all') }} className="mt-4 text-cyan-hana text-sm hover:underline">
                  전체 보기
                </button>
              </div>
            ) : (
              paginatedQuestions.map(qa => (
                <QACard
                  key={qa.id}
                  qa={qa}
                  isOpen={openId === qa.id}
                  onToggle={() => setOpenId(openId === qa.id ? null : qa.id)}
                  searchQuery={debouncedQuery}
                  categories={qaData.categories}
                />
              ))
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className="px-4 py-2 rounded-lg bg-white border disabled:opacity-40 hover:border-cyan-hana transition-colors text-sm">
                  이전
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${page === p ? 'bg-cyan-hana text-white' : 'bg-white border hover:border-cyan-hana'}`}
                    >
                      {p}
                    </button>
                  )
                })}
                <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} className="px-4 py-2 rounded-lg bg-white border disabled:opacity-40 hover:border-cyan-hana transition-colors text-sm">
                  다음
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            {/* Popular questions */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-cyan-hana" />
                <h3 className="font-semibold text-ocean-deep">인기 질문 TOP 10</h3>
              </div>
              <div className="space-y-3">
                {popularQuestions.map((qa, i) => (
                  <button
                    key={qa.id}
                    onClick={() => {
                      setSearchQuery('')
                      setActiveCategory('all')
                      setOpenId(qa.id)
                      setTimeout(() => document.querySelector(`[data-id="${qa.id}"]`)?.scrollIntoView({ behavior: 'smooth' }), 100)
                    }}
                    className="w-full text-left flex items-start gap-2 hover:text-cyan-hana transition-colors"
                  >
                    <span className={`text-xs font-bold flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${i < 3 ? 'bg-gold-hana text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {i+1}
                    </span>
                    <span className="text-sm text-gray-600 hover:text-cyan-hana leading-snug line-clamp-2">
                      {qa.question}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick consult */}
            <div className="bg-ocean-gradient rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-2">빠른 상담 신청</h3>
              <p className="text-gray-300 text-sm mb-4">원하는 답을 못 찾으셨나요? 전문가와 1:1 상담을 받아보세요.</p>
              <Link to="/consult" className="block w-full bg-cyan-hana text-white py-3 rounded-xl text-center text-sm font-semibold hover:bg-opacity-90 transition-colors">
                상담 신청하기
              </Link>
            </div>

            {/* Categories */}
            <div className="card">
              <h3 className="font-semibold text-ocean-deep mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4 text-cyan-hana" />
                카테고리
              </h3>
              <div className="space-y-2">
                {qaData.categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setPage(1) }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      activeCategory === cat.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-sm text-gray-700">{cat.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
