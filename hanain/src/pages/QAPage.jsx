import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, ChevronDown, ThumbsUp, Share2, X, Filter, BookOpen, TrendingUp, MessageSquare, Phone, ChevronRight } from 'lucide-react'

const ITEMS_PER_PAGE = 20

// 카테고리 색상 → 가독성 높은 hex 색상 맵 (모든 색상 흰 텍스트 또는 어두운 텍스트 보장)
const CAT_COLORS = {
  metabolism:           { bg: '#0077B6', text: '#ffffff' },  // 대사질환 - 진파랑
  cancer_immune:        { bg: '#7C3AED', text: '#ffffff' },  // 항암/면역 - 진보라
  digestive:            { bg: '#059669', text: '#ffffff' },  // 소화/간 - 진초록
  cardiovascular:       { bg: '#DC2626', text: '#ffffff' },  // 심혈관 - 진빨강
  neuro_cognitive:      { bg: '#4338CA', text: '#ffffff' },  // 신경/인지 - 진인디고
  mental_health:        { bg: '#BE185D', text: '#ffffff' },  // 정신건강 - 진핑크
  musculoskeletal:      { bg: '#C2410C', text: '#ffffff' },  // 근골격계 - 진오렌지
  skin_hair:            { bg: '#B45309', text: '#ffffff' },  // 피부/모발 - 진앰버 (노란배경 제거)
  respiratory:          { bg: '#0E7490', text: '#ffffff' },  // 호흡기 - 진시안
  infection_inflammation:{ bg: '#0F766E', text: '#ffffff' }, // 감염/염증 - 진틸
  womens_health:        { bg: '#BE123C', text: '#ffffff' },  // 여성건강 - 진로즈
  mens_health:          { bg: '#334155', text: '#ffffff' },  // 남성건강 - 진슬레이트
}

// qa.json의 color 필드(문자열) 또는 category id로 색상 반환
function getCatBgColor(colorOrId, catId) {
  // catId로 직접 매핑 (우선)
  if (catId && CAT_COLORS[catId]) return CAT_COLORS[catId].bg
  // color 문자열로 fallback
  const fallback = {
    blue: '#0077B6', purple: '#7C3AED', green: '#059669',
    red: '#DC2626', indigo: '#4338CA', pink: '#BE185D',
    orange: '#C2410C', yellow: '#B45309', cyan: '#0E7490',
    teal: '#0F766E', rose: '#BE123C', slate: '#334155',
  }
  return fallback[colorOrId] || '#334155'
}

function getCatTextColor(colorOrId, catId) {
  return '#ffffff'  // 모든 카테고리 배경색이 어두우므로 항상 흰색
}

function highlightText(text, query) {
  if (!query || query.length < 2) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-100 text-yellow-800 rounded px-0.5">$1</mark>')
}

// 전화번호 숨김 + 클릭 시 번호 노출 카드
function ContactCard() {
  const [showPhone, setShowPhone] = useState(false)
  const [showSms, setShowSms] = useState(false)

  return (
    <div className="bg-ocean-gradient rounded-2xl p-6">
      <MessageSquare className="w-6 h-6 text-gold-hana mb-3" />
      <h3 className="font-bold text-white text-base mb-2">더 궁금하신 게 있으신가요?</h3>
      <p className="text-gray-200 text-sm mb-4 leading-relaxed">
        찾는 정보가 없거나 더 알고 싶다면<br />전화나 문자로 편하게 연락주세요.
      </p>
      <div className="space-y-2">
        {/* 전화 - 클릭하면 번호 노출 후 연결 */}
        {!showPhone ? (
          <button
            onClick={() => setShowPhone(true)}
            className="flex items-center justify-center gap-2 w-full bg-cyan-hana text-white py-3 rounded-xl text-sm font-semibold hover:bg-opacity-90 transition-all"
          >
            <Phone className="w-4 h-4" />
            전화 상담 번호 보기
            <ChevronRight className="w-4 h-4 opacity-70" />
          </button>
        ) : (
          <a
            href="tel:01056528206"
            className="flex items-center justify-center gap-2 w-full bg-cyan-hana text-white py-3 rounded-xl text-sm font-semibold hover:bg-opacity-90 transition-all"
          >
            <Phone className="w-4 h-4" />
            010-5652-8206 &nbsp;전화하기
          </a>
        )}
        {/* 문자 - 클릭하면 번호 노출 후 문자앱 연결 */}
        {!showSms ? (
          <button
            onClick={() => setShowSms(true)}
            className="flex items-center justify-center gap-2 w-full bg-white/10 border border-white/30 text-white py-3 rounded-xl text-sm font-semibold hover:bg-white/20 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            문자 상담 번호 보기
            <ChevronRight className="w-4 h-4 opacity-70" />
          </button>
        ) : (
          <a
            href="sms:01056528206?body=%5B%ED%94%8C%EB%A1%9C%EB%A1%9C%ED%83%84%EB%8B%8C%20%ED%8C%8C%ED%8A%B8%EB%84%88%EC%8A%A4%5D%20%EA%B1%B4%EA%B0%95%20Q%26A%EB%A5%BC%20%EB%B3%B4%EA%B3%A0%20%EB%AC%B8%EC%9D%98%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4."
            className="flex items-center justify-center gap-2 w-full bg-white/10 border border-white/30 text-white py-3 rounded-xl text-sm font-semibold hover:bg-white/20 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            010-5652-8206 &nbsp;문자 보내기
          </a>
        )}
      </div>
    </div>
  )
}

function QACard({ qa, isOpen, onToggle, searchQuery, categories }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(qa.likes || 0)
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
      await navigator.clipboard.writeText(window.location.origin + '/qa?q=' + encodeURIComponent(qa.question))
      alert('링크가 복사되었습니다!')
    } catch {
      alert('링크 복사: ' + window.location.origin + '/qa')
    }
  }

  // Normalize answer to string
  const answerText = typeof qa.answer === 'string'
    ? qa.answer
    : [
        qa.answer.step1_empathy,
        qa.answer.step2_statistics,
        qa.answer.step3_standard_treatment,
        qa.answer.step4_natural_alternatives,
        qa.answer.step5_phlorotannin,
        qa.answer.step6_cta,
      ].filter(Boolean).join('\n\n')

  const references = typeof qa.answer !== 'string' ? qa.answer.references : null

  return (
    <div
      data-id={qa.id}
      className={`bg-white rounded-2xl shadow-sm border transition-all duration-200 overflow-hidden ${isOpen ? 'border-cyan-hana shadow-md' : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'}`}
    >
      {/* Question header */}
      <button onClick={onToggle} className="w-full text-left p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {cat && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: getCatBgColor(cat.color, cat.id), color: '#ffffff' }}>
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
              {(qa.tags || []).slice(0, 3).map(tag => (
                <span key={tag} className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">#{tag}</span>
              ))}
            </div>
            <h3
              className="font-semibold text-ocean-deep text-base md:text-lg leading-snug"
              dangerouslySetInnerHTML={{ __html: highlightText(qa.question, searchQuery) }}
            />
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
              <span>👁 {(qa.views || 0).toLocaleString()}</span>
              <span>👍 {likeCount}</span>
            </div>
          </div>
          <div className={`text-cyan-hana transition-transform duration-300 flex-shrink-0 mt-1 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </button>

      {/* Answer — column/editorial style */}
      {isOpen && (
        <div className="border-t border-gray-100 px-5 md:px-6 py-5 bg-slate-50">
          {/* Article-style answer body */}
          <div 
            className="text-gray-700 text-sm md:text-base leading-[1.9] whitespace-pre-line mb-5"
            dangerouslySetInnerHTML={{ __html: answerText }}
          />

          {/* References — subtle footer */}
          {references?.length > 0 && (
            <div className="border-t border-gray-200 pt-4 mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">참고 자료</p>
              <ul className="space-y-1">
                {references.map((ref, i) => (
                  <li key={i} className="text-xs text-gray-400 flex items-start gap-1.5">
                    <span>[{i + 1}]</span><span>{ref}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer + Copyright */}
          <div className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-3 mb-5 space-y-1">
            <p className="text-xs text-gray-400 italic">
              ※ 본 내용은 교육·정보 목적으로 제공되며 의료적 진단이나 처방을 대체하지 않습니다.
            </p>
            <p className="text-xs text-gray-400">
              © 2025 플로로탄닌 파트너스 — 본 콘텐츠의 무단 복제·배포를 금합니다.
              자료 사용 문의는 아래 [문자 보내기]를 이용해 주세요.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
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
            <a
              href="sms:01056528206?body=안녕하세요! 플로로탄닌 파트너스 건강 Q&A를 보고 문의드립니다."
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:border-cyan-hana hover:text-cyan-hana transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              문자 보내기
            </a>
            <Link
              to="/partner"
              className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-ocean-deep text-white hover:bg-opacity-90 transition-all"
            >
              파트너 연결
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default function QAPage() {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
  const [openId, setOpenId] = useState(searchParams.get('openId') || null)
  const [page, setPage] = useState(1)
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)
  const debounceRef = useRef(null)
  const [qaData, setQaData] = useState({ questions: [], categories: [] })
  const [loading, setLoading] = useState(true)

  // ✅ URL 파라미터가 바뀔 때마다 state 동기화 (Footer/외부 링크 클릭 대응)
  useEffect(() => {
    const cat = searchParams.get('category') || 'all'
    const q   = searchParams.get('q') || ''
    const oid = searchParams.get('openId') || null
    setActiveCategory(cat)
    setSearchQuery(q)
    setDebouncedQuery(q)
    setOpenId(oid)
    setPage(1)
  }, [searchParams])

  useEffect(() => {
    fetch('/qa.json')
      .then(r => r.json())
      .then(d => {
        setQaData(d)
        setLoading(false)
        // openId가 있으면 해당 아이템으로 스크롤 + 오픈
        const targetId = searchParams.get('openId')
        if (targetId) {
          setTimeout(() => {
            const el = document.querySelector(`[data-id="${targetId}"]`)
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }, 400)
        }
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery)
      setPage(1)
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [searchQuery])

  const filteredQuestions = useCallback(() => {
    let results = (qaData.questions || [])
    if (activeCategory !== 'all') {
      results = results.filter(q => q.category === activeCategory)
    }
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase()
      results = results.filter(r => {
        const answerText = typeof r.answer === 'string'
          ? r.answer
          : Object.values(r.answer).filter(v => typeof v === 'string').join(' ')
        return (
          r.question.toLowerCase().includes(q) ||
          (r.tags || []).some(t => t.toLowerCase().includes(q)) ||
          answerText.toLowerCase().includes(q)
        )
      })
    }
    return results
  }, [activeCategory, debouncedQuery, qaData])

  const questions = filteredQuestions()
  const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE)

  // openId가 있을 때 해당 아이템이 있는 페이지로 자동 이동
  const targetOpenId = searchParams.get('openId')
  const effectivePage = (() => {
    if (targetOpenId && questions.length > 0) {
      const idx = questions.findIndex(q => q.id === targetOpenId)
      if (idx >= 0) return Math.floor(idx / ITEMS_PER_PAGE) + 1
    }
    return page
  })()

  const paginatedQuestions = questions.slice((effectivePage - 1) * ITEMS_PER_PAGE, effectivePage * ITEMS_PER_PAGE)
  const popularQuestions = [...(qaData.questions || [])].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 10)

  if (loading) return (
    <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Q&A 데이터 로딩 중...</p>
      </div>
    </div>
  )

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-ocean-gradient py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 text-white mb-4">
            <BookOpen className="w-6 h-6 text-cyan-hana" />
            <span className="text-cyan-hana font-medium">건강 정보 아카이브</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">건강 Q&amp;A 라이브러리</h1>
          <p className="text-gray-300 mb-6 text-sm md:text-base">올바른 건강 정보, 소재별 근거 중심 해설 · {qaData.questions.length}개 아티클</p>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="질환명, 성분, 증상으로 검색..."
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
        {/* Category tabs */}
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
              style={activeCategory === cat.id ? { backgroundColor: getCatBgColor(cat.color, cat.id), color: '#ffffff' } : {}}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Q&A list */}
          <div className="lg:col-span-2 space-y-4">
            {debouncedQuery && (
              <div className="text-sm text-gray-500 mb-2">
                "<strong>{debouncedQuery}</strong>" 검색 결과: {questions.length}개
              </div>
            )}

            {paginatedQuestions.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 mb-1">검색 결과가 없습니다.</p>
                <p className="text-xs text-gray-400 mb-4">더 궁금하신 내용은 이메일로 문의해 주세요.</p>
                <div className="flex justify-center gap-3">
                  <button onClick={() => { setSearchQuery(''); setActiveCategory('all') }} className="text-cyan-hana text-sm hover:underline">
                    전체 보기
                  </button>
                  <a href="sms:01056528206?body=안녕하세요! 건강 정보 관련 문의드립니다." className="text-cyan-hana text-sm hover:underline">
                    문자 문의
                  </a>
                </div>
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
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-4 py-2 rounded-lg bg-white border disabled:opacity-40 hover:border-cyan-hana transition-colors text-sm">
                  이전
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i
                  return (
                    <button key={p} onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${page === p ? 'bg-cyan-hana text-white' : 'bg-white border hover:border-cyan-hana'}`}>
                      {p}
                    </button>
                  )
                })}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg bg-white border disabled:opacity-40 hover:border-cyan-hana transition-colors text-sm">
                  다음
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            {/* Popular questions */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-cyan-hana" />
                <h3 className="font-semibold text-ocean-deep">많이 읽은 아티클</h3>
              </div>
              <div className="space-y-3">
                {popularQuestions.map((qa, i) => (
                  <button key={qa.id}
                    onClick={() => {
                      setActiveCategory('all'); setSearchQuery(''); setOpenId(qa.id); setPage(1)
                      setTimeout(() => document.querySelector(`[data-id="${qa.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200)
                    }}
                    className="w-full text-left flex items-start gap-2 group"
                  >
                    <span className={`text-xs font-bold flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${i < 3 ? 'bg-cyan-hana text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-600 group-hover:text-cyan-hana leading-snug line-clamp-2 transition-colors">
                      {qa.question}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* SMS CTA */}
            <ContactCard />

            {/* Partner CTA */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-ocean-deep mb-2">파트너 교육 프로그램</h3>
              <p className="text-gray-500 text-sm mb-4">이 정보를 고객에게 직접 전달하고 싶으신가요? 플로로탄닌 파트너스에서 더 많은 정보를 탐색해 보세요.</p>
              <Link to="/partner" className="block w-full text-center py-2.5 rounded-xl border-2 border-ocean-deep text-ocean-deep text-sm font-semibold hover:bg-ocean-deep hover:text-white transition-all">
                파트너 과정 알아보기
              </Link>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-ocean-deep mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4 text-cyan-hana" />
                카테고리별 보기
              </h3>
              <div className="space-y-1">
                {qaData.categories.map(cat => (
                  <button key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setPage(1) }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${activeCategory === cat.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getCatBgColor(cat.color, cat.id) }} />
                      <span className="text-sm text-gray-700">{cat.name}</span>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{cat.count}</span>
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
