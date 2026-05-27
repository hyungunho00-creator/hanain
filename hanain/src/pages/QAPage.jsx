import { useState, useEffect, useRef, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ChevronDown, ThumbsUp, Share2, Filter, BookOpen, TrendingUp, MessageSquare, Phone, ChevronRight, Search, X, ArrowUpRight } from 'lucide-react'
import { usePartner } from '../context/PartnerContext'
import SEOHead from '../components/common/SEOHead'
import RevealContact from '../components/common/RevealContact'
import LastReviewed from '../components/common/LastReviewed'

const LAST_REVIEWED = '2026-05-21'

const ITEMS_PER_PAGE = 20

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
  // 카테고리 이름 lookup — 동적 카테고리(qa.json categories) 기준
  const catName = (categories || []).find(c => c.id === catId)?.name || catId

  const diffLabel = qa.difficulty === 'basic' ? '기초' : qa.difficulty === 'intermediate' ? '중급' : qa.difficulty === 'advanced' ? '심화' : (qa.difficulty || '기초')

  return (
    <div
      data-id={itemKey || qa.id}
      className={`bg-white rounded-lg border transition-colors overflow-hidden ${isOpen ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'}`}
    >
      <button onClick={onToggle} className="w-full text-left p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3">
              {catId && (
                <Link
                  to={`/category/${CAT_SLUG_MAP[catId] || catId}`}
                  onClick={e => e.stopPropagation()}
                  className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {catName}
                </Link>
              )}
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">
                {diffLabel}
              </span>
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
            className="text-gray-700 text-[15px] md:text-base leading-[1.85] whitespace-pre-line mb-6 break-keep"
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
              © 2025 플로로탄닌 파트너스 — 본 콘텐츠의 무단 복제·배포를 금합니다.
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

  // ✅ URL params를 직접 파생 — state 비동기 타이밍 버그 완전 제거
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
    fetch('/qa.json')
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

  // ✅ 필터링: URL params 직접 사용 → state 타이밍 문제 없음
  const { questions, totalCount } = useMemo(() => {
    if (!dataLoaded) return { questions: [], totalCount: 0 }

    let filtered = [...allQuestions]

    // 검색어 필터
    const q = searchQuery.trim().toLowerCase()
    if (q.length >= 1) {
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
    { q: '플로로탄닌이란 무엇인가요?', a: '플로로탄닌(Phlorotannin)은 감태·미역·다시마 등 갈조류에서 추출되는 해양 폴리페놀 성분입니다. 육상 식물 폴리페놀과 구조가 달라 별도 분류되며 강력한 항산화·항염·혈당 조절 효과가 연구되고 있습니다.' },
    { q: '발뒤꿈치 갈라짐에 플로로탄닌이 도움이 되나요?', a: '발뒤꿈치 갈라짐은 피부 수분 부족, 각질화 과정 이상이 주 원인입니다. 플로로탄닌의 항산화·항염 작용이 피부 장벽 강화와 수분 보유에 도움을 줄 수 있다는 연구가 있습니다.' },
    { q: '아토피 피부염에 플로로탄닌이 효과적인가요?', a: '플로로탄닌은 NF-κB 경로를 억제해 염증 사이토카인 분비를 줄이고, 피부 장벽 단백질 발현을 높여 아토피 증상 완화에 기여할 수 있습니다. 동물 모델에서 가려움·홍반 감소가 관찰되었습니다.' },
    { q: '탈모 예방에 플로로탄닌이 도움이 되나요?', a: '플로로탄닌은 5α-환원효소를 억제해 DHT(탈모 유발 호르몬) 생성을 차단하고, 모낭 세포 사멸을 억제하는 효과가 in vitro 연구에서 확인되었습니다.' },
    { q: '플로로탄닌이 혈당 조절에 도움이 되나요?', a: '임상 연구에서 플로로탄닌 섭취 후 공복 혈당이 약 27% 감소한 결과가 보고되었습니다. α-글루코시다아제 억제를 통해 식후 혈당 급상승을 완화합니다.' },
    { q: '플로로탄닌은 고혈압에도 효과가 있나요?', a: 'ACE(안지오텐신 전환효소) 억제 작용으로 혈압 조절에 도움이 될 수 있으며, IC50 2.7μg/mL로 처방 약물 수준의 억제력이 연구에서 보고되었습니다.' },
    { q: '플로로탄닌이 치매·인지 기능 저하에 도움이 되나요?', a: '아세틸콜린에스테라제(AChE) 억제 및 BDNF 증가, 산화 스트레스 감소를 통해 인지 기능 보호에 기여할 수 있습니다. 동물 실험에서 기억력 테스트 40% 개선이 관찰되었습니다.' },
    { q: '플로로탄닌은 어떤 만성 염증 질환에 도움이 되나요?', a: 'NF-κB 신호 경로를 억제해 TNF-α, IL-6 등 염증 사이토카인 분비를 줄입니다. 관절염, 장 염증, 피부 염증 등 다양한 만성 염증 질환 연구에서 긍정적 결과가 보고되었습니다.' },
    { q: '플로로탄닌의 항암 효과는 어느 정도인가요?', a: '대장암·유방암 세포 실험에서 암세포 아포토시스(사멸) 유도와 혈관 신생 억제 효과가 확인되었습니다. 단, 임상 적용 전 추가 연구가 필요합니다.' },
    { q: '플로로탄닌을 어떻게 섭취하나요?', a: '식품의약품안전처에서 인정한 감태 추출물 형태의 건강기능식품으로 섭취할 수 있습니다. 제품별 섭취 방법과 용량은 라벨을 확인하세요.' },
  ]

  // ──────────────────────────────────────────────────────────
  // FAQPage JSON-LD (헌법 제10조 의무 3)
  //   - /qa 메인: STATIC_FAQ (브랜드 핵심 FAQ 10개)
  //   - 카테고리 필터 시: 해당 카테고리 인기 Q&A 상위 N개 (FAQ_JSONLD_MAX_PER_PAGE=10)
  //   - 각 항목에 url 부여하여 개별 페이지(/q/:slug)로 연결 → 내부 SEO 권한 전파
  //   - 단일 페이지 최대 10개로 제한 (구글 가이드 + 페널티 회피)
  // ──────────────────────────────────────────────────────────
  const FAQ_JSONLD_MAX_PER_PAGE = 10

  // 슬러그 규칙 (DO_NOT_TOUCH §3-Q — 변경 금지)
  const qaSlug = (s) =>
    (s || '').replace(/[^\w\s가-힣]/g, '').replace(/\s+/g, '-').slice(0, 60)

  // HTML 태그 제거 (answer에 <span> 등이 들어있어서 schema.org text에 raw가 들어가면 안 됨)
  const stripHtml = (s) => (typeof s === 'string'
    ? s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    : '')

  const faqJsonLd = (() => {
    // 카테고리/검색 필터가 활성이면 실데이터 기반 FAQPage
    const useDynamic = (activeCategory && activeCategory !== 'all') || (searchQuery && searchQuery.length >= 2)
    if (useDynamic && questions.length > 0) {
      const items = questions.slice(0, FAQ_JSONLD_MAX_PER_PAGE).map(item => {
        const ansText = typeof item.answer === 'string'
          ? stripHtml(item.answer)
          : stripHtml(Object.values(item.answer || {}).join(' '))
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
    <div className="pt-16 min-h-screen bg-gray-50">
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

          {/* 🔍 검색창 */}
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
                className={`flex-shrink-0 inline-flex items-baseline gap-1.5 px-4 py-2.5 rounded-md border text-[14px] whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-gray-900 border-gray-900 text-white'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[12px] tabular-nums ${isActive ? 'text-white/70' : 'text-gray-400'}`}>{(catCounts[cat.id] || 0).toLocaleString()}</span>
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
                  onClick={() => setPage(p => Math.max(1, p - 1))}
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
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
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
                    to="/partner"
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
                to="/partner"
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
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors text-left ${
                          isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-[13px]">{cat.name}</span>
                        <span className={`text-[11px] tabular-nums ${isActive ? 'text-white/60' : 'text-gray-400'}`}>
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
