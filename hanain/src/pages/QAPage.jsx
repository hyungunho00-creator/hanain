import { useState, useEffect, useRef, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ChevronDown, ThumbsUp, Share2, Filter, BookOpen, TrendingUp, MessageSquare, Phone, ChevronRight, Search, X, ArrowUpRight } from 'lucide-react'
import { usePartner } from '../context/PartnerContext'
import SEOHead from '../components/common/SEOHead'
import RevealContact from '../components/common/RevealContact'
import LastReviewed from '../components/common/LastReviewed'
import { withRef } from '../lib/partnerRef'
import { getRenderableQAAnswer, shouldEmitQASchema, answerPlainTextForMeta, stripHtml } from '../lib/qaAnswer'
import { QA_TOTAL } from '../data/siteStats'

const LAST_REVIEWED = '2026-06-08'

const ITEMS_PER_PAGE = 20
const QA_JSON_URL = `/qa.json?v=${QA_TOTAL}`

// [2026-05-21 fix] 카테고리는 qa.json의 categories에서 동적으로 로드한다.
// — 과거에는 12개를 하드코딩(skin_hair 통합)했으나 qa.json은 13개(skin/hair 분리)였음
//   → '피부/모발' 탭 클릭 시 q.category === 'skin_hair' 매칭 0건 → 사용자 신고 버그.
// 이제 qa.json categories 배열을 Source of Truth로 삼아 자동 동기화.
// Fallback: qa.json 로드 실패 시 사용할 12개 기본 카테고리(skin/hair 분리 반영).
const FALLBACK_QA_CATEGORIES = [
  { id: 'metabolism',             name: '대사질환' },
  { id: 'cancer_immune',          name: '항암/면역' },
  { id: 'digestive',              name: '소화/간 건강' },
  { id: 'cardiovascular',         name: '심혈관' },
  { id: 'neuro_cognitive',        name: '뇌/인지' },
  { id: 'mental_health',          name: '정신건강' },
  { id: 'musculoskeletal',        name: '근골격' },
  { id: 'skin',                   name: '피부' },
  { id: 'hair',                   name: '모발/두피' },
  { id: 'respiratory',            name: '호흡기' },
  { id: 'infection_inflammation', name: '감염/염증' },
  { id: 'womens_health',          name: '여성건강' },
  { id: 'mens_health',            name: '남성건강' },
]

// category_id → /category/:slug URL 매핑
// (CategoryPage.jsx SLUG_TO_ID 의 역방향. skin/hair 분리 + skin_hair 통합 모두 지원)
const CAT_SLUG_MAP = {
  metabolism: 'metabolism', cancer_immune: 'cancer-immune',
  digestive: 'digestive', cardiovascular: 'cardiovascular',
  neuro_cognitive: 'neuro-cognitive', mental_health: 'mental-health',
  musculoskeletal: 'musculoskeletal',
  skin_hair: 'skin-hair', skin: 'skin', hair: 'hair',
  respiratory: 'respiratory', infection_inflammation: 'infection-inflammation',
  womens_health: 'womens-health', mens_health: 'mens-health',
}

const CATEGORY_PASTELS = {
  metabolism: { bg: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8', activeBg: '#DBEAFE', accent: '#3B82F6' },
  cancer_immune: { bg: '#F5F3FF', border: '#DDD6FE', text: '#6D28D9', activeBg: '#EDE9FE', accent: '#8B5CF6' },
  digestive: { bg: '#ECFDF5', border: '#BBF7D0', text: '#047857', activeBg: '#DCFCE7', accent: '#22C55E' },
  cardiovascular: { bg: '#FFF1F2', border: '#FECDD3', text: '#BE123C', activeBg: '#FFE4E6', accent: '#F43F5E' },
  neuro_cognitive: { bg: '#F0FDFA', border: '#99F6E4', text: '#0F766E', activeBg: '#CCFBF1', accent: '#14B8A6' },
  mental_health: { bg: '#EEF2FF', border: '#C7D2FE', text: '#4338CA', activeBg: '#E0E7FF', accent: '#6366F1' },
  musculoskeletal: { bg: '#FFF7ED', border: '#FED7AA', text: '#C2410C', activeBg: '#FFEDD5', accent: '#F97316' },
  skin_hair: { bg: '#FDF2F8', border: '#FBCFE8', text: '#BE185D', activeBg: '#FCE7F3', accent: '#EC4899' },
  skin: { bg: '#FDF2F8', border: '#FBCFE8', text: '#BE185D', activeBg: '#FCE7F3', accent: '#EC4899' },
  hair: { bg: '#F5F5F4', border: '#D6D3D1', text: '#57534E', activeBg: '#E7E5E4', accent: '#78716C' },
  respiratory: { bg: '#F0F9FF', border: '#BAE6FD', text: '#0369A1', activeBg: '#E0F2FE', accent: '#0EA5E9' },
  infection_inflammation: { bg: '#FEF2F2', border: '#FECACA', text: '#B91C1C', activeBg: '#FEE2E2', accent: '#EF4444' },
  womens_health: { bg: '#FFF7ED', border: '#FED7AA', text: '#B45309', activeBg: '#FFEDD5', accent: '#F59E0B' },
  mens_health: { bg: '#F1F5F9', border: '#CBD5E1', text: '#334155', activeBg: '#E2E8F0', accent: '#64748B' },
}

function categoryPastelStyle(catId, isActive = false) {
  const tone = CATEGORY_PASTELS[catId] || { bg: '#F8FAFC', border: '#E2E8F0', text: '#334155', activeBg: '#F1F5F9', accent: '#94A3B8' }
  return {
    backgroundColor: isActive ? tone.activeBg : tone.bg,
    borderColor: isActive ? tone.accent : tone.border,
    color: tone.text,
    boxShadow: isActive ? `inset 0 -2px 0 ${tone.accent}` : 'none',
  }
}

function qaSlug(s) {
  return (s || '').replace(/[^\w\s가-힣]/g, '').replace(/\s+/g, '-').slice(0, 60)
}

function getAnswerSearchText(qa) {
  return stripHtml(getRenderableQAAnswer(qa).html).toLowerCase()
}

function isPublicQa(qa) {
  return shouldEmitQASchema(qa)
}

function isLatestQa(qa) {
  return String(qa?.id || '').startsWith('round3-')
}

function highlightText(text, query) {
  if (!query || query.length < 2) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark class="bg-gray-900 text-white rounded px-0.5">$1</mark>')
}

function ContactCard() {
  const partner = usePartner()

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="h-px w-6 bg-gray-300" aria-hidden="true" />
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-500">Direct Inquiry</span>
      </div>
      <h3 className="font-bold text-gray-900 text-lg mb-3 tracking-tight">더 궁금하신 게 있으신가요?</h3>
      <p className="text-gray-600 text-[14px] mb-5 leading-[1.7] break-keep">
        찾는 정보가 없거나 더 알고 싶다면 전화나 문자로 편하게 연락주세요.
      </p>
      <div className="space-y-3">
        <RevealContact
          type="tel"
          label="전화 상담 번호 보기"
          revealLabel={`${partner.phoneDisplay} 전화하기`}
          phone={partner.phone}
          displayPhone={partner.phoneDisplay}
          className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-black text-white py-3 rounded-md text-[14px] font-medium transition-colors"
        />
        <RevealContact
          type="sms"
          label="문자 상담 번호 보기"
          revealLabel={`${partner.phoneDisplay} 문자하기`}
          phone={partner.phone}
          displayPhone={partner.phoneDisplay}
          smsBody="[플로로탄닌 파트너스] 건강 Q&A를 보고 문의드립니다."
          className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 py-3 rounded-md text-[14px] font-medium transition-colors"
        />
      </div>
    </div>
  )
}

function QACard({ qa, itemKey, isOpen, onToggle, searchQuery, categories }) {
  const partner = usePartner()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(qa.likes || 0)
  const renderable = getRenderableQAAnswer(qa)

  const handleLike = (e) => {
    e.stopPropagation()
    if (!liked) { setLiked(true); setLikeCount(prev => prev + 1) }
  }

  const handleShare = async (e) => {
    e.stopPropagation()
    const slug = qaSlug(qa.question)
    const qaPath = slug
      ? withRef(`/q/${slug}`, partner)
      : withRef(`/qa?openId=${qa.id}&category=${qa.category || qa.category_id || ''}`, partner)
    const shareUrl = `${window.location.origin}${qaPath}`
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('링크가 복사되었습니다!')
    } catch {
      alert('링크 복사: ' + shareUrl)
    }
  }

  const answerText = renderable.html
  const references = null
  const catId = qa.category_id || qa.category
  // 카테고리 이름 lookup — 동적 카테고리(qa.json categories) 기준
  const catName = (categories || []).find(c => c.id === catId)?.name || catId
  const catTone = categoryPastelStyle(catId, false)

  const diffLabel = qa.difficulty === 'basic' ? '기초' : qa.difficulty === 'intermediate' ? '중급' : qa.difficulty === 'advanced' ? '심화' : (qa.difficulty || '기초')

  return (
    <div
      data-id={itemKey || qa.id}
      className={`bg-white rounded-lg border transition-colors overflow-hidden ${isOpen ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'}`}
      style={{
        boxShadow: catId ? `inset 4px 0 0 ${(CATEGORY_PASTELS[catId]?.accent || '#CBD5E1')}26` : undefined,
      }}
    >
      <button onClick={onToggle} className="w-full text-left p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3">
              {catId && (
                <Link
                  to={withRef(`/category/${CAT_SLUG_MAP[catId] || catId}`, partner)}
                  onClick={e => e.stopPropagation()}
                  className="text-[11px] font-semibold uppercase tracking-[0.14em] px-2.5 py-0.5 rounded-full border transition-all hover:shadow-sm"
                  style={catTone}
                >
                  {catName}
                </Link>
              )}
              {isLatestQa(qa) && (
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] px-2.5 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
                  NEW
                </span>
              )}
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">
                {diffLabel}
              </span>
              {renderable.badge && (
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  {renderable.badge}
                </span>
              )}
              {(qa.tags || []).slice(0, 3).map(tag => (
                <span key={tag} className="text-[12px] text-gray-400">#{tag}</span>
              ))}
            </div>
            <h3
              className="font-semibold text-gray-900 text-lg md:text-xl leading-[1.45] break-keep"
              dangerouslySetInnerHTML={{ __html: highlightText(qa.question, searchQuery) }}
            />
            <div className="flex items-center gap-5 mt-3 text-[12px] text-gray-400 tabular-nums">
              <span>조회 {(qa.views || qa.view_count || 0).toLocaleString()}</span>
              <span>도움 {likeCount}</span>
            </div>
          </div>
          <div className={`text-gray-400 transition-transform duration-300 flex-shrink-0 mt-1 ${isOpen ? 'rotate-180 text-gray-900' : ''}`}>
            <ChevronDown className="w-5 h-5" strokeWidth={1.8} />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-gray-200 px-5 md:px-6 py-6 bg-gray-50">
          <div
            className="qa-article text-gray-700 text-[15px] md:text-base leading-[1.85] mb-6 break-keep"
            dangerouslySetInnerHTML={{ __html: answerText }}
          />
          {references?.length > 0 && (
            <div className="border-t border-gray-200 pt-5 mb-5">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.16em] mb-3">References</p>
              <ul className="space-y-1.5">
                {references.map((ref, i) => (
                  <li key={i} className="text-[13px] text-gray-500 flex items-start gap-2 leading-relaxed">
                    <span className="tabular-nums text-gray-400">[{i + 1}]</span><span>{ref}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="border-t border-gray-200 pt-5 mb-6 space-y-1">
            <p className="text-[12px] text-gray-400 leading-relaxed">
              ※ 본 내용은 교육·정보 목적으로 제공되며 의료적 진단이나 처방을 대체하지 않습니다.
            </p>
            <p className="text-[12px] text-gray-400 leading-relaxed">
               2025 플로로탄닌 파트너스 — 본 콘텐츠의 무단 복제·배포를 금합니다.
              더 자세한 내용이 궁금하시면 아래 [파트너 연락하기]를 이용해 주세요.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[14px]">
            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-1.5 transition-colors ${
                liked ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ThumbsUp className="w-4 h-4" strokeWidth={1.8} />
              도움이 됐어요 <span className="tabular-nums">{likeCount}</span>
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Share2 className="w-4 h-4" strokeWidth={1.8} />공유
            </button>
            <RevealContact
              type="sms"
              label="파트너 연락하기"
              revealLabel={`${partner.phoneDisplay} 문자하기`}
              phone={partner.phone}
              displayPhone={partner.phoneDisplay}
              smsBody="안녕하세요! 플로로탄닌 파트너스 건강 Q&A를 보고 문의드립니다."
              className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700 transition-colors"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default function QAPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const partner = usePartner()

  // URL params를 직접 파생해 state 비동기 타이밍 버그를 방지
  const activeCategory = searchParams.get('category') || 'all'
  const openId = searchParams.get('openId') || null
  const searchQuery = searchParams.get('q') || ''
  const page = Number(searchParams.get('page') || '1')

  // 검색창 입력값만 별도 state (입력 중 URL 갱신 방지)
  const [searchInput, setSearchInput] = useState(searchQuery)

  // searchQuery(URL) 바뀌면 입력창도 동기화
  useEffect(() => {
    setSearchInput(searchQuery)
  }, [searchQuery])

  // qa.json 기반 전체 데이터
  const [allQuestions, setAllQuestions] = useState([])
  const [categories, setCategories] = useState(FALLBACK_QA_CATEGORIES)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [catCounts, setCatCounts] = useState({})
  const [popularList, setPopularList] = useState([])
  // loading = 데이터 미로드 상태
  const loading = !dataLoaded

  const searchInputRef = useRef(null)

  // qa.json 로드 (최초 1회)
  useEffect(() => {
    fetch(QA_JSON_URL, { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        const qs = data.questions || []
        setAllQuestions(qs)

        // 카테고리 목록 — qa.json categories를 Source of Truth로 사용
        // (fix 2026-05-21: 하드코딩된 skin_hair → qa.json의 skin/hair 분리 자동 반영)
        const cats = Array.isArray(data.categories) && data.categories.length > 0
          ? data.categories.map(c => ({ id: c.id, name: c.name }))
          : FALLBACK_QA_CATEGORIES
        setCategories(cats)

        // 카테고리별 카운트
        const counts = {}
        qs.forEach(q => {
          const c = q.category || q.category_id || ''
          counts[c] = (counts[c] || 0) + 1
        })
        setCatCounts(counts)

        // 인기 질문 (조회수 순 상위 10)
        const popular = [...qs]
          .sort((a, b) => (b.views || b.view_count || 0) - (a.views || a.view_count || 0))
          .slice(0, 10)
        setPopularList(popular)

        setDataLoaded(true)
      })
      .catch(() => setDataLoaded(true))
  }, [])

  // URL params 직접 사용으로 필터 state 불일치를 방지
  const { questions, totalCount } = useMemo(() => {
    if (!dataLoaded) return { questions: [], totalCount: 0 }

    let filtered = [...allQuestions]

    // 검색어 필터
    const q = searchQuery.trim().toLowerCase()
    if (q.length >= 1) {
      filtered = filtered.filter(item => {
        const qText = (item.question || '').toLowerCase()
        const aText = getAnswerSearchText(item)
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
    filtered.sort((a, b) => {
      const latestDelta = Number(isLatestQa(b)) - Number(isLatestQa(a))
      if (latestDelta !== 0) return latestDelta
      return (b.views || b.view_count || 0) - (a.views || a.view_count || 0)
    })

    const total = filtered.length
    const start = (page - 1) * ITEMS_PER_PAGE
    const paged = filtered.slice(start, start + ITEMS_PER_PAGE)
    return { questions: paged, totalCount: total }
  }, [allQuestions, dataLoaded, activeCategory, page, searchQuery])

  // openId 스크롤
  useEffect(() => {
    if (openId) {
      setTimeout(() => {
        const el = document.querySelector(`[data-id="${openId}"]`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 400)
    }
  }, [openId, questions])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const setPage = (p) => {
    const params = Object.fromEntries(searchParams.entries())
    if (p === 1) delete params.page
    else params.page = String(p)
    setSearchParams(params)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const q = searchInput.trim()
    const params = {}
    if (q) params.q = q
    if (activeCategory !== 'all') params.category = activeCategory
    setSearchParams(params)
  }

  const clearSearch = () => {
    setSearchInput('')
    const params = {}
    if (activeCategory !== 'all') params.category = activeCategory
    setSearchParams(params)
  }

  const handleCategoryChange = (catId) => {
    const params = {}
    if (searchQuery) params.q = searchQuery
    if (catId !== 'all') params.category = catId
    setSearchParams(params)
  }

  const setOpenId = (id) => {
    const params = Object.fromEntries(searchParams.entries())
    if (!id || openId === id) {
      delete params.openId
    } else {
      params.openId = id
    }
    setSearchParams(params)
  }

  const totalAll = Object.values(catCounts).reduce((a, b) => a + b, 0)

  // FAQPage JSON-LD는 /qa 페이지 전용 (메인페이지 / 에는 FAQPage 없음 → 중복 방지)
  const STATIC_FAQ = [
    { q: '플로로탄닌이란 무엇인가요?', a: '플로로탄닌(Phlorotannin)은 감태·미역·다시마 같은 갈조류에 들어 있는 해양 폴리페놀 계열 성분입니다. 항산화, 염증 반응, 대사 건강, 수면 등 여러 연구 주제에서 다뤄지지만 질병 치료를 대신하는 표현으로 해석하면 안 됩니다.' },
    { q: '감태추출물과 플로로탄닌은 같은 말인가요?', a: '감태추출물은 원료명에 가깝고, 플로로탄닌은 감태 등 갈조류에서 확인되는 성분군입니다. 제품을 볼 때는 기능성 문구, 원료 표준화 기준, 섭취량, 주의사항을 함께 확인하는 것이 안전합니다.' },
    { q: '플로로탄닌 정보를 볼 때 가장 먼저 확인할 것은 무엇인가요?', a: '후기보다 먼저 원료명, 함량, 시험 대상, 연구가 세포·동물·인체 중 어디까지 진행됐는지 확인해야 합니다. 질병명과 함께 과장된 치료·완치 표현을 쓰는 자료는 조심해서 봐야 합니다.' },
    { q: '혈당이나 대사 건강 글에서 플로로탄닌을 어떻게 읽어야 하나요?', a: '혈당 관리는 식사, 운동, 수면, 체중, 약물 복용이 기본입니다. 플로로탄닌 관련 연구는 원료 이해를 위한 참고 정보로 보고, 검사 수치나 처방을 바꾸는 판단은 의료진과 상의해야 합니다.' },
    { q: '피부·모발 건강 글에서 감태 성분을 어떻게 봐야 하나요?', a: '피부와 모발 문제는 보습, 염증, 영양 상태, 호르몬, 약물, 질환 신호가 함께 얽힐 수 있습니다. 감태 유래 성분 연구는 보조적인 원료 정보로 읽고, 증상이 지속되면 진료가 우선입니다.' },
    { q: '수면 건강과 감태추출물 글은 어떤 기준으로 봐야 하나요?', a: '수면 글은 잠드는 시간, 중간 각성, 다음날 졸림, 카페인, 음주, 수면무호흡 가능성을 먼저 나눠 봐야 합니다. 원료 정보는 생활기록과 안전성 확인 뒤에 판단하는 것이 좋습니다.' },
    { q: '항암·면역 관련 글에서 건강기능식품을 봐도 되나요?', a: '항암치료 중에는 건강기능식품이 약물, 수술, 검사와 충돌할 수 있어 담당 의료진 확인이 우선입니다. 플로로탄닌이나 감태추출물도 치료 효과가 아니라 원료 연구 정보로 구분해 읽어야 합니다.' },
    { q: '논문 제목만 보고 제품 효과를 판단해도 되나요?', a: '논문 제목은 출발점일 뿐입니다. 연구 대상, 용량, 기간, 대조군, 이해상충, 인체 적용 가능성을 함께 봐야 하며 세포·동물 연구를 사람에게 바로 적용하는 해석은 피해야 합니다.' },
    { q: 'Q&A 답변은 어떤 기준으로 신뢰도를 관리하나요?', a: '질문별로 증상·검사·생활요인·주의사항을 분리하고, 치료 단정 표현과 과장된 원료 표현을 줄이는 방식으로 관리합니다. 검색엔진 제출도 출처와 문장 품질을 기준으로 선별합니다.' },
    { q: '플로로탄닌을 어떻게 섭취하나요?', a: '섭취 여부는 제품 라벨의 원료명, 일일 섭취량, 주의사항을 기준으로 확인하세요. 임신·수유, 질환 치료 중, 항응고제 등 약물 복용 중이라면 제품 섭취 전 의료진이나 약사에게 상담하는 것이 좋습니다.' },
  ]

  // ──────────────────────────────────────────────────────────
  // FAQPage JSON-LD (헌법 제10조 의무 3)
  //   - /qa 메인: STATIC_FAQ (브랜드 핵심 FAQ 10개)
  //   - 카테고리 필터 시: 해당 카테고리 인기 Q&A 상위 N개 (FAQ_JSONLD_MAX_PER_PAGE=10)
  //   - 각 항목에 url 부여하여 개별 페이지(/q/:slug)로 연결 → 내부 SEO 권한 전파
  //   - 단일 페이지 최대 10개로 제한 (구글 가이드 + 페널티 회피)
  // ──────────────────────────────────────────────────────────
  const FAQ_JSONLD_MAX_PER_PAGE = 10

  const faqJsonLd = (() => {
    // 카테고리/검색 필터가 활성이면 실데이터 기반 FAQPage
    const useDynamic = (activeCategory && activeCategory !== 'all') || (searchQuery && searchQuery.length >= 2)
    if (useDynamic && questions.length > 0) {
      const publicQuestions = questions.filter((item) => isPublicQa(item))
      const items = publicQuestions.slice(0, FAQ_JSONLD_MAX_PER_PAGE).map(item => {
        const ansText = answerPlainTextForMeta(item)
        const slug = qaSlug(item.question)
        return {
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": ansText.slice(0, 500),
            ...(slug ? { "url": `https://phlorotannin.com/q/${slug}` } : {}),
          }
        }
      })
      if (items.length === 0) return null
      const catSuffix = activeCategory && activeCategory !== 'all' ? `#${activeCategory}` : ''
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `https://phlorotannin.com/qa${catSuffix}#faqpage`,
        "url": `https://phlorotannin.com/qa${catSuffix}`,
        "mainEntity": items,
      }
    }
    // 기본: 브랜드 STATIC_FAQ (메인 /qa 페이지) — 공식 FAQPage + Speakable + lastReviewed
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "FAQPage",
          "@id": "https://phlorotannin.com/qa#faqpage",
          "url": "https://phlorotannin.com/qa",
          "name": "플로로탄닌·감태추출물 Q&A 아카이브",
          "inLanguage": "ko-KR",
          "lastReviewed": LAST_REVIEWED,
          "reviewedBy": { "@type": "Organization", "name": "플로로탄닌 파트너스 편집부" },
          "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": ["h1", "[data-speakable=\"true\"]"]
          },
          "mainEntity": STATIC_FAQ.slice(0, FAQ_JSONLD_MAX_PER_PAGE).map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://phlorotannin.com/" },
            { "@type": "ListItem", "position": 2, "name": "Q&A 아카이브", "item": "https://phlorotannin.com/qa" }
          ]
        }
      ]
    }
  })()

  // SEO 정합성 (헌법 제10조 의무 7):
  //   - 기본 /qa : index, follow + canonical 자체
  //   - /qa?category=… / /qa?q=… / /qa?page=… : 동일 canonical (/qa) + noindex
  //     (중복 콘텐츠 방지, 14개 /category/:slug + 122개 /qa/tag/:tag 정식 페이지로 유도)
  const isFilteredView = activeCategory !== 'all' || !!searchQuery || page > 1
  return (
    <div className="pt-16 pb-24 min-h-screen bg-gray-50">
      <SEOHead
        title={`연구기반 Q&A ${totalAll.toLocaleString()}개 | 플로로탄닌·감태추출물 건강정보 아카이브`}
        description={`플로로탄닌·감태추출물·해양 폴리페놀 관련 ${totalAll.toLocaleString()}개 연구기반 Q&A. 항산화·염증·혈당·수면·면역·뇌 건강·암환자 가족 건강정보·병원정보까지 질환별로 정리한 종합 건강정보 데이터센터의 Q&A 아카이브입니다.`}
        keywords="연구기반 Q&A, 플로로탄닌 Q&A, 감태추출물 Q&A, 해양 폴리페놀 Q&A, 항산화, 염증, 혈당, 수면, 면역, 뇌 건강, 암환자 가족 건강정보, 병원정보 아카이브"
        canonical="https://phlorotannin.com/qa"
        noindex={isFilteredView}
        jsonLd={faqJsonLd}
      />

      {/* Header — 라이트 에디토리얼 */}
      <div className="bg-white border-b border-gray-100 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Health Q&amp;A Archive</span>
          </div>
          <h1 data-speakable="true" className="text-3xl md:text-[3rem] font-bold text-gray-900 tracking-tight leading-[1.1] mb-3">건강 Q&amp;A 라이브러리</h1>
          <p data-speakable="true" className="text-gray-600 mb-3 text-[15px] md:text-base leading-[1.7] break-keep max-w-2xl">
            올바른 건강 정보, 소재별 근거 중심 해설 · <span className="text-gray-900 font-semibold tabular-nums">{totalAll.toLocaleString()}</span>개 아티클
          </p>
          <div className="mb-8">
            <LastReviewed date={LAST_REVIEWED} className="text-left" />
          </div>

          {/* 검색창 */}
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden focus-within:border-gray-900 transition-colors">
              <Search className="w-4 h-4 text-gray-400 ml-4 flex-shrink-0" strokeWidth={1.8} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="증상·질환·성분을 검색하세요 (예: 아토피, 발뒤꿈치, 탈모)"
                className="flex-1 px-3 py-3 text-[14px] text-gray-800 outline-none placeholder-gray-400 bg-transparent"
              />
              {searchInput && (
                <button type="button" onClick={clearSearch} className="p-2 mr-1 text-gray-400 hover:text-gray-600" aria-label="검색어 지우기">
                  <X className="w-4 h-4" strokeWidth={1.8} />
                </button>
              )}
              <button
                type="submit"
                className="bg-gray-900 hover:bg-black text-white px-6 py-3 text-[14px] font-medium transition-colors whitespace-nowrap"
              >
                검색
              </button>
            </div>
            {searchQuery && (
              <p className="text-[13px] text-gray-500 mt-3 ml-1 break-keep">
                「<span className="text-gray-900 font-medium">{searchQuery}</span>」 검색 결과 <span className="text-gray-900 font-medium tabular-nums">{totalCount.toLocaleString()}</span>개
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Category tabs — 모노 직사각, 이모지 제거, 카운트 톤다운 */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-7 scrollbar-hide -mx-1 px-1">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`flex-shrink-0 inline-flex items-baseline gap-1.5 px-4 py-2.5 rounded-md border text-[14px] whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-gray-900 border-gray-900 text-white'
                : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
            }`}
          >
            <span>전체</span>
            <span className={`text-[12px] tabular-nums ${activeCategory === 'all' ? 'text-white/70' : 'text-gray-400'}`}>{totalAll.toLocaleString()}</span>
          </button>
          {categories.filter(cat => (catCounts[cat.id] || 0) > 0).map(cat => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                style={categoryPastelStyle(cat.id, isActive)}
                className="flex-shrink-0 inline-flex items-baseline gap-1.5 px-4 py-2.5 rounded-md border text-[14px] whitespace-nowrap transition-all hover:-translate-y-0.5 hover:shadow-sm"
              >
                <span>{cat.name}</span>
                <span className="text-[12px] tabular-nums opacity-60">{(catCounts[cat.id] || 0).toLocaleString()}</span>
              </button>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Q&A list */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-3"></div>
                  <p className="text-gray-400 text-sm">불러오는 중...</p>
                </div>
              </div>
            ) : questions.length === 0 ? (
              <div className="bg-white rounded-lg p-16 text-center border border-gray-200">
                <p className="text-gray-500 mb-3 text-[14px]">
                  {searchQuery ? `「${searchQuery}」에 해당하는 정보가 없습니다.` : '해당 카테고리에 정보가 없습니다.'}
                </p>
                <button
                  onClick={() => { clearSearch(); handleCategoryChange('all') }}
                  className="text-[14px] text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700 transition-colors"
                >
                  전체 보기
                </button>
              </div>
            ) : (
              questions.map((qa, index) => {
                const itemKey = `${qa.id || 'qa'}-${qaSlug(qa.question) || index}`
                return (
                  <QACard
                    key={itemKey}
                    itemKey={itemKey}
                    qa={qa}
                    isOpen={openId === itemKey || openId === qa.id}
                    onToggle={() => setOpenId((openId === itemKey || openId === qa.id) ? null : itemKey)}
                    searchQuery={searchQuery}
                    categories={categories}
                  />
                )
              })
            )}

            {/* Pagination — 에디토리얼 모노 */}
            {totalPages > 1 && (
              <nav className="flex justify-center items-center gap-1.5 mt-10" aria-label="페이지네이션">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-md bg-white border border-gray-200 text-[13px] text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-400 hover:text-gray-900 transition-colors"
                >
                  이전
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i
                  const active = page === p
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      aria-current={active ? 'page' : undefined}
                      className={`w-10 h-10 rounded-md text-[13px] font-medium tabular-nums transition-colors ${
                        active
                          ? 'bg-gray-900 border border-gray-900 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400 hover:text-gray-900'
                      }`}
                    >
                      {p}
                    </button>
                  )
                })}
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-md bg-white border border-gray-200 text-[13px] text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-400 hover:text-gray-900 transition-colors"
                >
                  다음
                </button>
              </nav>
            )}

            {/* CTA Section */}
            <div className="mt-12 rounded-lg overflow-hidden bg-white border border-gray-200 p-8 md:p-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Personalized Guidance</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-5 leading-snug break-keep">
                  같은 고민을 먼저 겪은 사람에게<br />
                  직접 물어보세요
                </h2>
                <p className="text-gray-600 text-[15px] leading-[1.8] mb-3 break-keep">
                  글로 읽는 것과 내 상황에 적용하는 건 다릅니다. 나이·복용 중인 약·생활 습관에 따라 같은 성분도 접근법이 달라집니다.
                </p>
                <p className="text-gray-600 text-[15px] leading-[1.8] mb-7 break-keep">
                  파트너는 의료인이 아닙니다. 하지만 <span className="text-gray-900 font-semibold">같은 고민을 먼저 공부한 사람</span>으로서, 시중 제품 차이와 내게 맞는 선택 기준을 함께 정리해 드립니다.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
                  <Link
                    to={withRef('/partner', partner)}
                    className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-md text-[14px] font-medium transition-colors"
                  >
                    파트너와 이야기하기
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} aria-hidden="true" />
                  </Link>
                  <RevealContact
                    type="sms"
                    label="문자로 편하게 물어보기"
                    revealLabel={`${partner.phoneDisplay} 문자하기`}
                    phone={partner.phone}
                    displayPhone={partner.phoneDisplay}
                    smsBody="안녕하세요, Q&A 보다가 제 상황이랑 비슷한 것 같아서요. 좀 더 여쭤봐도 될까요?"
                    className="inline-flex items-center gap-1.5 text-[14px] text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            {/* Popular questions — 에디토리얼 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-6 bg-gray-300" aria-hidden="true" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Most Read</span>
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900 mb-4 tracking-tight">많이 읽은 아티클</h3>
              <ol className="space-y-3">
                {popularList.map((qa, i) => {
                  const itemKey = `${qa.id || 'qa'}-${qaSlug(qa.question) || i}`
                  return (
                  <li key={itemKey}>
                    <button
                      onClick={() => {
                        const catId = qa.category || qa.category_id || 'all'
                        handleCategoryChange(catId)
                        setPage(1)
                        setOpenId(itemKey)
                        setTimeout(() => {
                          const el = document.querySelector(`[data-id="${itemKey}"]`)
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                        }, 500)
                      }}
                      className="flex items-baseline gap-3 group w-full text-left"
                    >
                      <span className="text-[11px] font-medium text-gray-400 tabular-nums tracking-[0.16em] flex-shrink-0 w-6">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[13px] text-gray-700 group-hover:text-gray-900 leading-[1.6] line-clamp-2 transition-colors">
                        {qa.question}
                      </span>
                    </button>
                  </li>
                  )
                })}
              </ol>
            </div>

            {/* SMS CTA */}
            <ContactCard />

            {/* Partner CTA — 에디토리얼 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-6 bg-gray-300" aria-hidden="true" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Partner Program</span>
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900 mb-2 tracking-tight">파트너 교육 프로그램</h3>
              <p className="text-gray-600 text-[13px] leading-[1.7] mb-5 break-keep">
                이 정보를 고객에게 직접 전달하고 싶으신가요? 플로로탄닌 파트너스에서 더 많은 정보를 탐색해 보세요.
              </p>
              <Link
                to={withRef('/partner', partner)}
                className="inline-flex items-center gap-1.5 text-[13px] text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700 transition-colors"
              >
                파트너 과정 알아보기
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </div>

            {/* Categories — 에디토리얼 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-6 bg-gray-300" aria-hidden="true" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Browse</span>
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900 mb-4 flex items-center gap-2 tracking-tight">
                <Filter className="w-4 h-4 text-gray-500" strokeWidth={1.6} aria-hidden="true" />
                카테고리별 보기
              </h3>
              <ul className="space-y-0.5">
                {categories.filter(cat => (catCounts[cat.id] || 0) > 0).map(cat => {
                  const isActive = activeCategory === cat.id
                  return (
                    <li key={cat.id}>
                      <button
                        onClick={() => handleCategoryChange(cat.id)}
                        style={categoryPastelStyle(cat.id, isActive)}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-md border transition-all text-left hover:-translate-y-0.5 hover:shadow-sm"
                      >
                        <span className="text-[13px]">{cat.name}</span>
                        <span className="text-[11px] tabular-nums opacity-60">
                          {(catCounts[cat.id] || 0).toLocaleString()}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
