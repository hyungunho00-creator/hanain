import { useState, useEffect, useRef } from 'react'
import { usePartner } from '../context/PartnerContext'
import SEOHead from '../components/common/SEOHead'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight, ArrowUpRight, Search, BookOpen, Users, ChevronRight,
  Star, MessageCircle, Waves, Leaf, Brain, Heart,
  Shield, Activity, Zap, Phone
} from 'lucide-react'
import RevealContact from '../components/common/RevealContact'
import LastReviewed from '../components/common/LastReviewed'

const LAST_REVIEWED = '2026-05-21'


function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])
  return [count, setStarted]
}

function StatCounter({ value, label, suffix = '' }) {
  const ref = useRef(null)
  const [count, setStarted] = useCountUp(parseInt(String(value).replace(/,/g, '')))
  const [triggered, setTriggered] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !triggered) { setTriggered(true); setStarted(true) } },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [triggered, setStarted])
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tabular-nums tracking-tight">{count.toLocaleString()}{suffix}</div>
      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">{label}</div>
    </div>
  )
}

// 카테고리 ID → 아이콘 매핑 (디자인 헌법 v3: 모노톤이므로 color는 제거)
// 이름은 qa.json categories를 Source of Truth로 사용 (skin_hair 통합 → skin/hair 분리 자동 반영)
const CAT_ICON = {
  metabolism:             Activity,
  cancer_immune:          Shield,
  digestive:              Leaf,
  cardiovascular:         Heart,
  neuro_cognitive:        Brain,
  mental_health:          Brain,
  musculoskeletal:        Zap,
  skin:                   Star,
  hair:                   Star,
  skin_hair:              Star,   // 구 통합 카테고리 호환
  respiratory:            Activity,
  infection_inflammation: Shield,
  womens_health:          Heart,
  mens_health:            Users,
}

// qa.json 로드 실패/지연 시 사용할 fallback 카테고리 (13개, skin/hair 분리)
const FALLBACK_CATEGORIES = [
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

export default function HomePage() {
  const partner = usePartner()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [featuredQAs, setFeaturedQAs] = useState([])
  const [qaData, setQaData] = useState({ questions: [], categories: [] })

  useEffect(() => {
    fetch('/qa.json')
      .then(r => r.json())
      .then(d => {
        setQaData(d)
        const shuffled = [...(d.questions || [])].sort(() => Math.random() - 0.5)
        setFeaturedQAs(shuffled.slice(0, 6))
      })
      .catch(console.error)
  }, [])

  const handleSearch = (e) => {
    const val = e.target.value
    setSearchQuery(val)
    if (val.length > 1) {
      const matches = (qaData.questions || []).filter(q =>
        q.question.includes(val) || (q.tags || []).some(t => t.includes(val))
      ).slice(0, 6)
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }

  // 카테고리 목록 — qa.json categories를 Source of Truth로 (skin/hair 분리 자동 반영)
  const categoryList = (qaData.categories && qaData.categories.length > 0)
    ? qaData.categories.map(c => ({ id: c.id, name: c.name }))
    : FALLBACK_CATEGORIES

  const getCategoryMeta = (catId) => {
    const found = categoryList.find(c => c.id === catId)
    return {
      id: catId,
      name: found?.name || '',
      icon: CAT_ICON[catId] || BookOpen,
    }
  }

  const totalQA = (qaData.questions || []).length

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://phlorotannin.com/#website",
        "url": "https://phlorotannin.com",
        "name": "플로로탄닌 파트너스",
        "description": "감태 플로로탄닌의 과학적 근거와 건강 Q&A 제공",
        "inLanguage": "ko-KR",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://phlorotannin.com/qa?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://phlorotannin.com/home#webpage",
        "url": "https://phlorotannin.com/home",
        "name": "플로로탄닌 건강정보 허브",
        "inLanguage": "ko-KR",
        "isPartOf": { "@id": "https://phlorotannin.com/#website" },
        "lastReviewed": LAST_REVIEWED,
        "reviewedBy": { "@type": "Organization", "name": "플로로탄닌 파트너스 편집부" },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", "[data-speakable=\"true\"]"]
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://phlorotannin.com/" },
          { "@type": "ListItem", "position": 2, "name": "건강 정보 허브", "item": "https://phlorotannin.com/home" }
        ]
      }
    ]
  }

  return (
    <div className="pt-16">
      <SEOHead
        title="플로로탄닌 건강정보 허브 | 감태추출물·해양 폴리페놀 쉽게 이해하기"
        description="플로로탄닌과 감태추출물, 해양 폴리페놀의 기본 개념을 쉽게 정리한 건강정보 허브입니다. 항산화, 염증, 수면, 혈당, 면역 건강정보로 확장되는 핵심 내용을 안내합니다."
        keywords="플로로탄닌 건강정보 허브, 감태추출물 효과, 해양 폴리페놀, 항산화, 염증, 혈당 건강정보, 수면 건강정보, 면역 건강정보, 뇌 건강"
        canonical="https://phlorotannin.com/home"
        jsonLd={homeJsonLd}
      />

      {/* ─── Hero — 라이트 에디토리얼 ─── */}
      <section className="relative bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Phlorotannin Information Hub</span>
          </div>

          <h1 data-speakable="true" className="text-3xl md:text-[3.25rem] font-bold text-gray-900 tracking-tight leading-[1.15] mb-5 break-keep">
            기초 개념부터 작용 기전까지<br />
            <span className="text-gray-700">한 흐름으로 이해하는 건강 정보</span>
          </h1>

          <p data-speakable="true" className="text-gray-700 text-[16px] md:text-[17px] leading-[1.8] mb-3 max-w-2xl break-keep">
            암·당뇨·뇌질환·염증 등 다양한 이유로 찾아온 분들이 결국 같은 키워드에서 만나게 됩니다.
          </p>
          <p className="text-gray-500 text-[14px] leading-[1.8] mb-10 max-w-2xl break-keep">
            플로로탄닌 관련 정보를 단편적 소개가 아닌, 연결 구조와 이해를 돕는 방식으로 정리했습니다.
          </p>

          {/* Search — 라이트 */}
          <div className="relative max-w-2xl mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.8} aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="궁금한 증상이나 건강 주제를 검색하세요 (예: 당뇨, 탈모, 고혈압)"
              className="w-full bg-white border border-gray-300 text-gray-900 placeholder-gray-400 pl-11 pr-5 py-3.5 rounded-md focus:outline-none focus:border-gray-900 transition-colors text-[14px]"
            />
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md border border-gray-200 shadow-lg overflow-hidden z-50">
                {suggestions.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSuggestions([])
                      setSearchQuery('')
                      navigate(`/qa?openId=${s.id}&category=${s.category}`)
                    }}
                    className="w-full flex items-start gap-3 px-5 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 text-left"
                  >
                    <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-1" strokeWidth={1.8} aria-hidden="true" />
                    <div className="min-w-0">
                      <span className="text-gray-800 text-[14px] block leading-snug">{s.question}</span>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-gray-400 mt-1 block">
                        {categoryList.find(c => c.id === s.category)?.name || ''}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 items-center mb-10">
            <Link
              to={`/consult`}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-md text-[14px] font-medium transition-colors"
            >
              파트너 문의하기
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} aria-hidden="true" />
            </Link>
            <Link
              to={`/qa`}
              className="text-[14px] text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700 transition-colors"
            >
              전체 Q&amp;A 둘러보기
            </Link>
          </div>

          {/* Quick tags — 세리프 키워드 */}
          <div className="flex flex-wrap gap-2">
            {['당뇨', '탈모', '지방간', '고혈압', '아토피', '치매', '수면', '면역'].map(tag => (
              <Link
                key={tag}
                to={`/qa?q=${tag}`}
                className="text-[12px] text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 px-3 py-1.5 rounded-md transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats — 에디토리얼 ─── */}
      <section className="bg-gray-50 border-b border-gray-100 py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
            <StatCounter value={totalQA} label="Health Q&A" suffix="+" />
            <StatCounter value="12" label="Categories" suffix="" />
            <StatCounter value="50" label="Active Partners" suffix="+" />
            <StatCounter value="100" label="Articles" suffix="+" />
          </div>
        </div>
      </section>

      {/* ─── About — 에디토리얼 ─── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">About</span>
            </div>
            <h2 className="text-2xl md:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight mb-4 break-keep">
              우리는 정보를 나누는 커뮤니티입니다
            </h2>
            <p className="text-gray-600 text-[15px] leading-[1.8] break-keep">
              근거 중심의 건강 정보와 자연 소재 이해를 기반으로 같은 관심사를 가진 사람들을 연결합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-x-6 gap-y-10">
            {[
              { num: '01', icon: BookOpen, title: '정확한 건강 정보', desc: '당뇨·혈압·탈모·면역 등 12개 카테고리의 건강 Q&A를 과학적 근거와 함께 제공합니다.' },
              { num: '02', icon: Waves, title: '플로로탄닌 & 자연 소재', desc: '갈조류에서 발견된 플로로탄닌을 비롯해 다양한 자연 소재의 작용 원리와 활용법을 소개합니다.' },
              { num: '03', icon: Users, title: '파트너 연결', desc: '건강 정보를 함께 공부하다 보면 자연스럽게 뜻이 맞는 파트너들을 만나고 연결됩니다.' },
            ].map((item) => (
              <div key={item.num} className="flex flex-col">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-200">
                  <span className="text-[11px] font-medium text-gray-400 tabular-nums tracking-[0.18em]">{item.num}</span>
                  <item.icon className="w-5 h-5 text-gray-400" strokeWidth={1.6} aria-hidden="true" />
                </div>
                <h3 className="text-[17px] font-semibold text-gray-900 mb-3 tracking-tight">{item.title}</h3>
                <p className="text-gray-600 text-[14px] leading-[1.75] break-keep">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Easy Health 배너 — 에디토리얼 ─── */}
      <section className="py-14 md:py-16 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">New · Easy Health</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight break-keep">
                중학생도 이해하는 건강 설명
              </h3>
              <p className="text-gray-600 text-[14px] leading-[1.75] max-w-xl break-keep">
                당뇨·고혈압·탈모·치매 — 왜 생기는지, 플로로탄닌이 어떻게 도움이 되는지 그림으로 정리했습니다.
              </p>
            </div>
            <Link
              to={`/easy`}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-md text-[14px] font-medium transition-colors flex-shrink-0 w-fit"
            >
              쉬운 설명 보러가기
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Featured Q&A — 에디토리얼 ─── */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Featured Q&amp;A</span>
            </div>
            <h2 className="text-2xl md:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight mb-3 break-keep">
              많이 찾는 건강 Q&amp;A
            </h2>
            <p className="text-gray-600 text-[15px] leading-[1.8] break-keep">
              과학적 근거 기반의 건강 정보를 확인해보세요.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredQAs.map(qa => {
              const meta = getCategoryMeta(qa.category)
              return (
                <button
                  key={qa.id}
                  onClick={() => navigate(`/qa?openId=${qa.id}&category=${qa.category}`)}
                  className="text-left bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-400 transition-colors group"
                >
                  <div className="text-[11px] uppercase tracking-[0.16em] text-gray-500 mb-3">
                    {meta.name}
                  </div>
                  <h3 className="text-[15px] font-semibold text-gray-900 mb-3 leading-snug line-clamp-2 break-keep">
                    {qa.question}
                  </h3>
                  <p className="text-gray-600 text-[13px] line-clamp-2 leading-[1.7] break-keep mb-5">
                    {typeof qa.answer === 'string' ? qa.answer : qa.answer?.step1_empathy || ''}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 tabular-nums pt-4 border-t border-gray-100">
                    <span>{(qa.views || 0).toLocaleString()} views</span>
                    <span className="text-gray-700 group-hover:text-gray-900 inline-flex items-center gap-1">
                      Read
                      <ArrowUpRight className="w-3 h-3" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Categories — 에디토리얼 (개수는 qa.json 기준 동적) ─── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Categories · {categoryList.length}</span>
            </div>
            <h2 className="text-2xl md:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight mb-3 break-keep">
              {categoryList.length}개 건강 정보 카테고리
            </h2>
            <p className="text-gray-600 text-[15px] leading-[1.8] break-keep">
              관심 있는 분야를 선택해 정보를 탐색하세요.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categoryList.map((cat, i) => {
              const Icon = CAT_ICON[cat.id] || BookOpen
              return (
                <button
                  key={cat.id}
                  onClick={() => navigate(`/qa?category=${cat.id}`)}
                  className="bg-white border border-gray-200 rounded-lg p-5 text-left hover:border-gray-400 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-5 h-5 text-gray-600" strokeWidth={1.6} aria-hidden="true" />
                    <span className="text-[10px] font-medium text-gray-400 tabular-nums tracking-[0.16em]">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="text-[14px] font-semibold text-gray-900 group-hover:text-black transition-colors">
                    {cat.name}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── What is Phlorotannin — 에디토리얼 ─── */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">What is Phlorotannin</span>
              </div>
              <h2 className="text-2xl md:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight mb-5 break-keep">
                플로로탄닌이란 무엇인가요?
              </h2>
              <p className="text-gray-700 text-[15px] leading-[1.85] mb-8 break-keep">
                플로로탄닌(Phlorotannin)은 미역·다시마·감태 같은 갈조류에서만 발견되는 해양 폴리페놀 성분입니다. 육상 식물의 폴리페놀과 달리 독특한 구조를 가지며, 다양한 생리 활성이 연구되고 있습니다.
              </p>

              <ol className="space-y-5 mb-10">
                {[
                  { title: '항산화 효과', desc: '활성산소를 중화하여 세포 손상을 줄이고 노화를 늦추는 데 도움을 줍니다.' },
                  { title: '혈당·혈압 조절 연구', desc: 'α-글루코시다제·ACE 억제 효소 경로를 통한 혈당·혈압 관리 가능성이 연구됩니다.' },
                  { title: '항염증 & 면역 조절', desc: 'NF-κB 경로 억제를 통해 만성 염증을 줄이는 기전이 다수 논문으로 보고됩니다.' },
                  { title: '다양한 제조 공정', desc: 'MOP(다중산화공정), 저온 추출, 발효 추출 등으로 생체이용률을 높이는 기술이 연구 중입니다.' },
                ].map((item, i) => (
                  <li key={i} className="flex items-baseline gap-4">
                    <span className="text-[11px] font-medium text-gray-400 tabular-nums tracking-[0.18em] flex-shrink-0 w-8">{String(i + 1).padStart(2, '0')}</span>
                    <div className="min-w-0">
                      <div className="text-[15px] font-semibold text-gray-900 mb-1 tracking-tight">{item.title}</div>
                      <div className="text-gray-600 text-[13px] leading-[1.75] break-keep">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ol>

              <Link
                to={`/phlorotannin`}
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-md text-[14px] font-medium transition-colors"
              >
                플로로탄닌 상세 소개
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </div>

            {/* Spec list — Stripe 스타일 */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-6 bg-gray-300" aria-hidden="true" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Specifications</span>
              </div>
              <dl className="space-y-5">
                {[
                  { label: '주요 함유 해조류', value: '감태 · 미역 · 다시마' },
                  { label: '핵심 구조', value: '플로로글루시놀 중합체' },
                  { label: '연구 분야', value: '혈당 · 혈압 · 항암 · 항염' },
                  { label: '활용 형태', value: '추출물 · 캡슐 · 분말' },
                ].map((item, i) => (
                  <div key={i} className="flex items-baseline justify-between gap-6 pb-5 border-b border-gray-100 last:border-0 last:pb-0">
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-gray-400 flex-shrink-0">{item.label}</dt>
                    <dd className="text-[14px] font-semibold text-gray-900 text-right">{item.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 pt-7 border-t border-gray-200">
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500 mb-3">Recommended For</div>
                <ul className="space-y-2 text-[13px] text-gray-700 leading-[1.7]">
                  <li>— 자연 소재에 관심 있는 건강 관리자</li>
                  <li>— 건강 정보를 함께 나누고 싶은 파트너</li>
                  <li>— 올바른 소재 정보를 찾는 소비자</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Partner Journey — 에디토리얼 ─── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Partner Journey</span>
            </div>
            <h2 className="text-2xl md:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight mb-4 break-keep">
              함께 공부하고, 함께 성장합니다
            </h2>
            <p className="text-gray-600 text-[15px] leading-[1.8] break-keep">
              정보를 충분히 이해한 후 자연스럽게 파트너로 이어집니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-x-6 gap-y-10">
            {[
              { step: '01', title: '정보 탐색', desc: 'Q&A를 통해 건강 소재에 대한 지식을 쌓고, 올바른 정보를 구분하는 안목을 키웁니다.' },
              { step: '02', title: '파트너 연결', desc: '플로로탄닌 관련 정보와 파트너를 자연스럽게 만납니다. 전화 또는 문자로 편하게 연결됩니다.' },
              { step: '03', title: '함께 활동', desc: '올바른 건강 정보를 함께 나누고 주변 사람들과 건강하게 연결되는 의미 있는 활동을 합니다.' },
            ].map(item => (
              <div key={item.step} className="flex flex-col">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-200">
                  <span className="text-[11px] font-medium text-gray-400 tabular-nums tracking-[0.18em]">{item.step}</span>
                </div>
                <h3 className="text-[17px] font-semibold text-gray-900 mb-3 tracking-tight">{item.title}</h3>
                <p className="text-gray-600 text-[14px] leading-[1.75] break-keep">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to={`/partner`}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-md text-[14px] font-medium transition-colors"
            >
              파트너 참여 알아보기
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Contact CTA — 라이트 에디토리얼 ─── */}
      <section className="py-20 md:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Contact</span>
          </div>
          <h2 className="text-2xl md:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight mb-4 break-keep">
            궁금한 점이 있으신가요?
          </h2>
          <p className="text-gray-600 mb-10 text-[15px] leading-[1.85] break-keep max-w-2xl">
            건강 정보, 자연 소재, 파트너 활동 등 어떤 내용이든 편하게 문의해 주세요.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 items-center mb-10">
            <RevealContact
              type="sms"
              label="문자 상담 신청"
              revealLabel={`${partner.phoneDisplay} 문자하기`}
              phone={partner.phone}
              displayPhone={partner.phoneDisplay}
              smsBody="[플로로탄닌 파트너스] 상담 문의드립니다."
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-md text-[14px] font-medium transition-colors"
            />
            <RevealContact
              type="tel"
              label="전화 상담 신청"
              revealLabel={`${partner.phoneDisplay} 전화하기`}
              phone={partner.phone}
              displayPhone={partner.phoneDisplay}
              className="inline-flex items-center gap-1.5 text-[14px] text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-gray-500 pt-6 border-t border-gray-200">
            <Link to={`/partner`} className="hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700 transition-colors">
              파트너 참여
            </Link>
            <span className="text-gray-300">/</span>
            <Link to={`/consult`} className="hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700 transition-colors">
              상담 신청
            </Link>
          </div>
        </div>
      </section>

      {/* ── 저작권 안내 — 에디토리얼 ── */}
      <section className="py-7 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-4">
            <LastReviewed date={LAST_REVIEWED} />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-gray-500 text-center md:text-left leading-[1.7]">
              © 2026 <span className="font-medium text-gray-700">플로로탄닌 파트너스</span> · All rights reserved. · 본 사이트의 모든 콘텐츠는 저작권법에 의해 보호받습니다.
            </p>
            <RevealContact
              type="sms"
              label="콘텐츠 사용 문의"
              revealLabel={`${partner.phoneDisplay} 문자하기`}
              phone={partner.phone}
              displayPhone={partner.phoneDisplay}
              smsBody="[콘텐츠 사용 문의] "
              className="flex-shrink-0 text-[12px] text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700 whitespace-nowrap transition-colors"
            />
          </div>
        </div>
      </section>

    </div>
  )
}
