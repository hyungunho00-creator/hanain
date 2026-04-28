import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ChevronDown, ThumbsUp, Share2, Filter, BookOpen, TrendingUp, MessageSquare, Phone, ChevronRight, Search, X } from 'lucide-react'
import { usePartner } from '../context/PartnerContext'
import SEOHead from '../components/common/SEOHead'

const ITEMS_PER_PAGE = 20

// 카테고리 정의 (qa.json 기준 - skin/hair 분리)
const QA_CATEGORIES = [
  { id: 'metabolism',             name: '대사질환',    emoji: '🩸' },
  { id: 'cancer_immune',          name: '항암/면역',   emoji: '💪' },
  { id: 'digestive',              name: '소화/간 건강', emoji: '🫁' },
  { id: 'cardiovascular',         name: '심혈관',      emoji: '❤️' },
  { id: 'neuro_cognitive',        name: '뇌/인지',     emoji: '🧠' },
  { id: 'mental_health',          name: '정신건강',    emoji: '😴' },
  { id: 'musculoskeletal',        name: '근골격',      emoji: '🦴' },
  { id: 'skin',                   name: '피부',        emoji: '✨' },
  { id: 'hair',                   name: '모발',        emoji: '💇' },
  { id: 'respiratory',            name: '호흡기',      emoji: '🫀' },
  { id: 'infection_inflammation', name: '감염/염증',   emoji: '🔥' },
  { id: 'womens_health',          name: '여성건강',    emoji: '🌸' },
  { id: 'mens_health',            name: '남성건강',    emoji: '💪' },
]

const CAT_COLORS = {
  metabolism:             { bg: '#0077B6' },
  cancer_immune:          { bg: '#7C3AED' },
  digestive:              { bg: '#059669' },
  cardiovascular:         { bg: '#DC2626' },
  neuro_cognitive:        { bg: '#4338CA' },
  mental_health:          { bg: '#BE185D' },
  musculoskeletal:        { bg: '#C2410C' },
  skin:                   { bg: '#D97706' },
  hair:                   { bg: '#92400E' },
  skin_hair:              { bg: '#B45309' }, // legacy fallback
  respiratory:            { bg: '#0E7490' },
  infection_inflammation: { bg: '#0F766E' },
  womens_health:          { bg: '#BE123C' },
  mens_health:            { bg: '#334155' },
}

const CAT_SLUG_MAP = {
  metabolism: 'metabolism', cancer_immune: 'cancer-immune',
  digestive: 'digestive', cardiovascular: 'cardiovascular',
  neuro_cognitive: 'neuro-cognitive', mental_health: 'mental-health',
  musculoskeletal: 'musculoskeletal',
  skin: 'skin', hair: 'hair', skin_hair: 'skin-hair',
  respiratory: 'respiratory', infection_inflammation: 'infection-inflammation',
  womens_health: 'womens-health', mens_health: 'mens-health',
}

function getCatBg(catId) {
  return (CAT_COLORS[catId] || { bg: '#334155' }).bg
}

function getCatName(catId) {
  const cat = QA_CATEGORIES.find(c => c.id === catId)
  return cat ? cat.name : catId
}

function highlightText(text, query) {
  if (!query || query.length < 2) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-100 text-yellow-800 rounded px-0.5">$1</mark>')
}

function ContactCard() {
  const partner = usePartner()
  const [showPhone, setShowPhone] = useState(false)
  const [showSms, setShowSms] = useState(false)

  return (
    <div className="bg-ocean-gradient rounded-2xl p-6">
      <MessageSquare className="w-6 h-6 text-gold-hana mb-3" />
      <h3 className="font-bold text-white text-lg mb-2">더 궁금하신 게 있으신가요?</h3>
      <p className="text-gray-200 text-base mb-4 leading-relaxed">
        찾는 정보가 없거나 더 알고 싶다면<br />전화나 문자로 편하게 연락주세요.
      </p>
      <div className="space-y-2">
        {!showPhone ? (
          <button onClick={() => setShowPhone(true)}
            className="flex items-center justify-center gap-2 w-full bg-cyan-hana text-white py-3 rounded-xl text-base font-semibold hover:bg-opacity-90 transition-all">
            <Phone className="w-4 h-4" />전화 상담 번호 보기<ChevronRight className="w-4 h-4 opacity-70" />
          </button>
        ) : (
          <a href={`tel:${partner.phone}`}
            className="flex items-center justify-center gap-2 w-full bg-cyan-hana text-white py-3 rounded-xl text-base font-semibold hover:bg-opacity-90 transition-all">
            <Phone className="w-4 h-4" />{partner.phoneDisplay} &nbsp;전화하기
          </a>
        )}
        {!showSms ? (
          <button onClick={() => setShowSms(true)}
            className="flex items-center justify-center gap-2 w-full bg-white/10 border border-white/30 text-white py-3 rounded-xl text-base font-semibold hover:bg-white/20 transition-all">
            <MessageSquare className="w-4 h-4" />문자 상담 번호 보기<ChevronRight className="w-4 h-4 opacity-70" />
          </button>
        ) : (
          <a href={`sms:${partner.phone}?body=${encodeURIComponent('[플로로탄닌 파트너스] 건강 Q&A를 보고 문의드립니다.')}`}
            className="flex items-center justify-center gap-2 w-full bg-white/10 border border-white/30 text-white py-3 rounded-xl text-base font-semibold hover:bg-white/20 transition-all">
            <MessageSquare className="w-4 h-4" />{partner.phoneDisplay} &nbsp;문자 보내기
          </a>
        )}
      </div>
    </div>
  )
}

function QACard({ qa, isOpen, onToggle, searchQuery }) {
  const partner = usePartner()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(qa.likes || 0)

  const handleLike = (e) => {
    e.stopPropagation()
    if (!liked) { setLiked(true); setLikeCount(prev => prev + 1) }
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

  const answerText = typeof qa.answer === 'string'
    ? qa.answer
    : [
        qa.answer?.step1_empathy, qa.answer?.step2_statistics,
        qa.answer?.step3_standard_treatment, qa.answer?.step4_natural_alternatives,
        qa.answer?.step5_phlorotannin, qa.answer?.step6_cta,
      ].filter(Boolean).join('\n\n')

  const references = typeof qa.answer !== 'string' ? qa.answer?.references : null
  const catId = qa.category_id || qa.category
  const catName = getCatName(catId)
  const catBg = getCatBg(catId)

  return (
    <div
      data-id={qa.id}
      className={`bg-white rounded-2xl shadow-sm border transition-all duration-200 overflow-hidden ${isOpen ? 'border-cyan-hana shadow-md' : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'}`}
    >
      <button onClick={onToggle} className="w-full text-left p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {catId && (
                <Link
                  to={`/category/${CAT_SLUG_MAP[catId] || catId}`}
                  onClick={e => e.stopPropagation()}
                  className="text-sm font-bold px-2.5 py-1 rounded-full hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: catBg, color: '#ffffff' }}
                >
                  {catName}
                </Link>
              )}
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                qa.difficulty === 'basic' || qa.difficulty === '기초' ? 'bg-green-100 text-green-700' :
                qa.difficulty === 'intermediate' || qa.difficulty === '중급' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {qa.difficulty === 'basic' ? '기초' : qa.difficulty === 'intermediate' ? '중급' : qa.difficulty === 'advanced' ? '심화' : (qa.difficulty || '기초')}
              </span>
              {(qa.tags || []).slice(0, 3).map(tag => (
                <span key={tag} className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">#{tag}</span>
              ))}
            </div>
            <h3
              className="font-semibold text-ocean-deep text-lg md:text-xl leading-snug"
              dangerouslySetInnerHTML={{ __html: highlightText(qa.question, searchQuery) }}
            />
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
              <span>👁 {(qa.views || qa.view_count || 0).toLocaleString()}</span>
              <span>👍 {likeCount}</span>
            </div>
          </div>
          <div className={`text-cyan-hana transition-transform duration-300 flex-shrink-0 mt-1 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-gray-100 px-5 md:px-6 py-5 bg-slate-50">
          <div
            className="text-gray-700 text-base md:text-lg leading-[1.9] whitespace-pre-line mb-5"
            dangerouslySetInnerHTML={{ __html: answerText }}
          />
          {references?.length > 0 && (
            <div className="border-t border-gray-200 pt-4 mb-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">참고 자료</p>
              <ul className="space-y-1">
                {references.map((ref, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-start gap-1.5">
                    <span>[{i + 1}]</span><span>{ref}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-3 mb-5 space-y-1">
            <p className="text-sm text-gray-400 italic">
              ※ 본 내용은 교육·정보 목적으로 제공되며 의료적 진단이나 처방을 대체하지 않습니다.
            </p>
            <p className="text-sm text-gray-400">
              © 2025 플로로탄닌 파트너스 — 본 콘텐츠의 무단 복제·배포를 금합니다.
              자료 사용 문의는 아래 [문자 보내기]를 이용해 주세요.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium transition-all ${
                liked ? 'bg-cyan-hana text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-cyan-hana hover:text-cyan-hana'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />도움이 됐어요 {likeCount}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium bg-white border border-gray-200 text-gray-600 hover:border-cyan-hana hover:text-cyan-hana transition-all"
            >
              <Share2 className="w-4 h-4" />공유
            </button>
            <a
              href={`sms:${partner.phone}?body=${encodeURIComponent('안녕하세요! 플로로탄닌 파트너스 건강 Q&A를 보고 문의드립니다.')}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium bg-white border border-gray-200 text-gray-600 hover:border-cyan-hana hover:text-cyan-hana transition-all"
            >
              <MessageSquare className="w-4 h-4" />문자 보내기
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default function QAPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
  const [openId, setOpenId] = useState(searchParams.get('openId') || null)
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '')

  // qa.json 기반 전체 데이터
  const [allQuestions, setAllQuestions] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  // 표시할 질문 목록 (카테고리/검색/페이지 필터)
  const [questions, setQuestions] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [catCounts, setCatCounts] = useState({})
  const [popularList, setPopularList] = useState([])
  const [loading, setLoading] = useState(true)

  const searchInputRef = useRef(null)

  // qa.json 로드 (최초 1회)
  useEffect(() => {
    fetch('/qa.json')
      .then(r => r.json())
      .then(data => {
        const qs = data.questions || []
        setAllQuestions(qs)

        // 카테고리별 카운트
        const counts = {}
        qs.forEach(q => {
          const c = q.category || q.category_id || ''
          counts[c] = (counts[c] || 0) + 1
        })
        setCatCounts(counts)
        setTotalCount(qs.length)

        // 인기 질문 (조회수 순 상위 10)
        const popular = [...qs]
          .sort((a, b) => (b.views || b.view_count || 0) - (a.views || a.view_count || 0))
          .slice(0, 10)
        setPopularList(popular)

        setDataLoaded(true)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // URL 파라미터 동기화
  useEffect(() => {
    const cat = searchParams.get('category') || 'all'
    const oid = searchParams.get('openId') || null
    const q = searchParams.get('q') || ''
    setActiveCategory(cat)
    setOpenId(oid)
    setSearchQuery(q)
    setSearchInput(q)
    setPage(1)
  }, [searchParams])

  // 필터링 + 페이지네이션
  useEffect(() => {
    if (!dataLoaded) return
    setLoading(true)

    let filtered = [...allQuestions]

    // 검색어 필터
    if (searchQuery && searchQuery.length >= 1) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(item => {
        const qText = (item.question || '').toLowerCase()
        const aText = typeof item.answer === 'string'
          ? item.answer.toLowerCase()
          : Object.values(item.answer || {}).join(' ').toLowerCase()
        const tags = (item.tags || []).join(' ').toLowerCase()
        return qText.includes(q) || aText.includes(q) || tags.includes(q)
      })
    }

    // 카테고리 필터
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item =>
        (item.category || item.category_id) === activeCategory
      )
    }

    // 인기순 정렬
    filtered.sort((a, b) => (b.views || b.view_count || 0) - (a.views || a.view_count || 0))

    const total = filtered.length
    const start = (page - 1) * ITEMS_PER_PAGE
    const paged = filtered.slice(start, start + ITEMS_PER_PAGE)

    setQuestions(paged)
    setTotalCount(total)
    setLoading(false)

    // openId 스크롤
    if (openId) {
      setTimeout(() => {
        const el = document.querySelector(`[data-id="${openId}"]`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 400)
    }
  }, [allQuestions, dataLoaded, activeCategory, page, searchQuery, openId])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const handleSearch = (e) => {
    e.preventDefault()
    const q = searchInput.trim()
    const params = {}
    if (q) params.q = q
    if (activeCategory !== 'all') params.category = activeCategory
    setSearchParams(params)
    setPage(1)
  }

  const clearSearch = () => {
    setSearchInput('')
    const params = {}
    if (activeCategory !== 'all') params.category = activeCategory
    setSearchParams(params)
    setPage(1)
  }

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId)
    setPage(1)
    const params = {}
    if (searchQuery) params.q = searchQuery
    if (catId !== 'all') params.category = catId
    setSearchParams(params)
  }

  const totalAll = Object.values(catCounts).reduce((a, b) => a + b, 0)

  const STATIC_FAQ = [
    { q: '플로로탄닌이란 무엇인가요?', a: '플로로탄닌(Phlorotannin)은 감태·미역·다시마 등 갈조류에서 추출되는 해양 폴리페놀 성분입니다. 강력한 항산화, 항염, 혈당 조절 효과가 연구되고 있습니다.' },
    { q: '플로로탄닌이 혈당에 도움이 되나요?', a: '임상 연구에 따르면 플로로탄닌 섭취 후 공복 혈당이 약 27% 감소한 결과가 보고되었습니다.' },
    { q: '플로로탄닌은 피부에 효과가 있나요?', a: '플로로탄닌은 항산화·항염 작용으로 피부 염증 완화, 아토피 개선, 피부 장벽 강화에 도움이 될 수 있습니다.' },
    { q: '플로로탄닌은 고혈압에도 효과가 있나요?', a: '플로로탄닌은 ACE(안지오텐신 전환효소) 억제 작용으로 혈압 조절에 도움이 될 수 있습니다.' },
    { q: '플로로탄닌이 치매 예방에 도움이 되나요?', a: '플로로탄닌은 아세틸콜린에스테라제 억제 및 산화 스트레스 감소를 통해 인지 기능 보호에 기여할 수 있습니다.' },
    { q: '플로로탄닌은 항암 효과가 있나요?', a: '암세포 사멸 유도(아폽토시스)와 혈관신생 억제 효과가 세포 실험 및 동물 실험에서 보고되었습니다.' },
  ]

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": STATIC_FAQ.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <SEOHead
        title={`건강 Q&A ${totalAll.toLocaleString()}개`}
        description={`플로로탄닌 관련 ${totalAll.toLocaleString()}개 건강 질문과 답변. 혈당, 혈압, 치매, 항암, 피부, 모발, 아토피, 발뒤꿈치 갈라짐 등 13개 질환 카테고리 Q&A.`}
        keywords="플로로탄닌 Q&A, 감태 효능, 건강 질문 답변, 혈당 낮추는 식품, 혈압 낮추는 법, 치매예방 식품, 피부 건강, 아토피 치료, 발뒤꿈치 갈라짐, 탈모 예방, 모발 건강, 항산화 효과"
        canonical="https://phlorotannin.com/qa"
        jsonLd={faqJsonLd}
      />

      {/* Header */}
      <div className="bg-ocean-gradient py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 text-white mb-4">
            <BookOpen className="w-6 h-6 text-cyan-hana" />
            <span className="text-cyan-hana font-medium">건강 정보 아카이브</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">건강 Q&amp;A 라이브러리</h1>
          <p className="text-gray-300 mb-6 text-base md:text-lg">
            올바른 건강 정보, 소재별 근거 중심 해설 · {totalAll.toLocaleString()}개 아티클
          </p>

          {/* 🔍 검색창 */}
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <div className="flex items-center bg-white rounded-2xl shadow-lg overflow-hidden">
              <Search className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="증상·질환·성분을 검색하세요 (예: 아토피, 발뒤꿈치, 탈모)"
                className="flex-1 px-3 py-3.5 text-base text-gray-800 outline-none placeholder-gray-400 bg-transparent"
              />
              {searchInput && (
                <button type="button" onClick={clearSearch} className="p-2 mr-1 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="bg-cyan-hana text-white px-5 py-3.5 text-base font-semibold hover:bg-opacity-90 transition-all whitespace-nowrap"
              >
                검색
              </button>
            </div>
            {searchQuery && (
              <p className="text-cyan-200 text-sm mt-2 ml-1">
                「{searchQuery}」 검색 결과: {totalCount.toLocaleString()}개
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-base font-medium transition-all ${
              activeCategory === 'all' ? 'bg-ocean-deep text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            전체 ({totalAll.toLocaleString()})
          </button>
          {QA_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-base font-medium transition-all ${
                activeCategory === cat.id ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              style={activeCategory === cat.id ? { backgroundColor: getCatBg(cat.id), color: '#ffffff' } : {}}
            >
              {cat.emoji} {cat.name} ({(catCounts[cat.id] || 0).toLocaleString()})
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Q&A list */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600 mx-auto mb-3"></div>
                  <p className="text-gray-400 text-sm">불러오는 중...</p>
                </div>
              </div>
            ) : questions.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
                <p className="text-gray-400 mb-1">
                  {searchQuery ? `「${searchQuery}」에 해당하는 정보가 없습니다.` : '해당 카테고리에 정보가 없습니다.'}
                </p>
                <button onClick={() => { clearSearch(); handleCategoryChange('all') }} className="text-cyan-hana text-base hover:underline mt-3">
                  전체 보기
                </button>
              </div>
            ) : (
              questions.map(qa => (
                <QACard
                  key={qa.id}
                  qa={qa}
                  isOpen={openId === qa.id}
                  onToggle={() => setOpenId(openId === qa.id ? null : qa.id)}
                  searchQuery={searchQuery}
                />
              ))
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-4 py-2 rounded-lg bg-white border disabled:opacity-40 hover:border-cyan-hana transition-colors text-base">
                  이전
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i
                  return (
                    <button key={p} onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-lg text-base font-medium transition-all ${page === p ? 'bg-cyan-hana text-white' : 'bg-white border hover:border-cyan-hana'}`}>
                      {p}
                    </button>
                  )
                })}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg bg-white border disabled:opacity-40 hover:border-cyan-hana transition-colors text-base">
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
                {popularList.map((qa, i) => (
                  <button
                    key={qa.id}
                    onClick={() => {
                      const catId = qa.category || qa.category_id || 'all'
                      handleCategoryChange(catId)
                      setPage(1)
                      setOpenId(qa.id)
                      setTimeout(() => {
                        const el = document.querySelector(`[data-id="${qa.id}"]`)
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      }, 500)
                    }}
                    className="flex items-start gap-2 group w-full text-left"
                  >
                    <span className={`text-xs font-bold flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${i < 3 ? 'bg-cyan-hana text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {i + 1}
                    </span>
                    <span className="text-base text-gray-600 group-hover:text-cyan-hana leading-snug line-clamp-2 transition-colors">
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
              <p className="text-gray-500 text-base mb-4">이 정보를 고객에게 직접 전달하고 싶으신가요? 플로로탄닌 파트너스에서 더 많은 정보를 탐색해 보세요.</p>
              <Link to="/partner" className="block w-full text-center py-2.5 rounded-xl border-2 border-ocean-deep text-ocean-deep text-base font-semibold hover:bg-ocean-deep hover:text-white transition-all">
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
                {QA_CATEGORIES.map(cat => (
                  <div key={cat.id} className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${activeCategory === cat.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
                    <button
                      onClick={() => handleCategoryChange(cat.id)}
                      className="flex items-center gap-2 flex-1 text-left"
                    >
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getCatBg(cat.id) }} />
                      <span className="text-base text-gray-700">{cat.emoji} {cat.name}</span>
                    </button>
                    <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {(catCounts[cat.id] || 0).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
