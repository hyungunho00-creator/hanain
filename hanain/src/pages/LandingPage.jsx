import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePartner } from '../context/PartnerContext'
import SEOHead from '../components/common/SEOHead'

// ─── 인라인 SVG 아이콘 ────────────────────────────────────────
const Icon = {
  ArrowRight: () => (
    <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  ChevronDown: ({ open }) => (
    <svg
      className={`w-6 h-6 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  BookOpen: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Leaf: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3s14 0 16 14c-5-2-10-2-16 0V3z" />
    </svg>
  ),
  MessageCircle: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Wave: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12c1-4 3-6 5-6s4 4 6 4 4-6 6-6" />
    </svg>
  ),
}

// ─── 카테고리 카드 ─────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'cancer',
    emoji: '🎗️',
    label: '암과 회복 정보를 찾고 있어요',
    short: '회복·식단·염증',
    desc: '치료 후 회복 과정에서 놓치기 쉬운 정보들을 정리했습니다. 식단, 염증 조절, 성분의 흐름을 함께 살펴보다 보면 자연스럽게 연결된 맥락이 보입니다.',
    related: '→ 당뇨·염증 카테고리와 함께 보면 이해가 깊어집니다',
    path: '/qa', query: '암', categoryId: 'cancer_immune',
    accent: { border: 'border-rose-200', hover: 'hover:border-rose-400', tag: 'bg-rose-100 text-rose-700', dot: 'bg-rose-500', btn: 'text-rose-600' },
  },
  {
    id: 'diabetes',
    emoji: '🩸',
    label: '당뇨와 식단 정보를 보고 있어요',
    short: '혈당·대사·식단',
    desc: '혈당 수치만이 아니라 식단의 구조와 대사 흐름 전반을 함께 보는 관점이 필요합니다. 정보를 따라가다 보면 플로로탄닌이라는 키워드와 자주 마주치게 됩니다.',
    related: '→ 혈압·비만·염증 정보와 연결되는 흐름이 있습니다',
    path: '/qa', query: '당뇨', categoryId: 'metabolism',
    accent: { border: 'border-emerald-200', hover: 'hover:border-emerald-400', tag: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', btn: 'text-emerald-600' },
  },
  {
    id: 'brain',
    emoji: '🧠',
    label: '뇌 건강과 인지 변화를 알고 싶어요',
    short: '인지·기억·집중',
    desc: '집중력 저하, 기억력 변화, 피로감은 따로 보이지만 서로 연결되어 있습니다. 이 정보를 읽다 보면 뇌 건강과 전신 염증·대사가 공통 키워드로 모이는 구조가 보입니다.',
    related: '→ 수면·피로·회복 카테고리와 함께 이해됩니다',
    path: '/qa', query: '치매', categoryId: 'neuro_cognitive',
    accent: { border: 'border-violet-200', hover: 'hover:border-violet-400', tag: 'bg-violet-100 text-violet-700', dot: 'bg-violet-500', btn: 'text-violet-600' },
  },
  {
    id: 'inflammation',
    emoji: '🔥',
    label: '염증·피로·회복 흐름이 궁금해요',
    short: '염증·피로·회복',
    desc: '만성 피로와 반복되는 염증은 여러 질환의 공통 기반입니다. 이 흐름을 이해하면 암, 당뇨, 뇌 건강 정보가 왜 같은 성분 이야기로 이어지는지 알 수 있습니다.',
    related: '→ 면역·심혈관 정보와도 연결됩니다',
    path: '/qa', query: '염증', categoryId: 'infection_inflammation',
    accent: { border: 'border-amber-200', hover: 'hover:border-amber-400', tag: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500', btn: 'text-amber-600' },
  },
  {
    id: 'family',
    emoji: '👨‍👩‍👧‍👦',
    label: '가족 건강과 노화 예방이 걱정돼요',
    short: '노화·가족·예방',
    desc: '부모님의 건강, 자녀의 성장, 나 자신의 노화까지 — 가족 건강을 챙기다 보면 결국 생활습관과 기반 성분에 대한 질문으로 이어집니다.',
    related: '→ 여성건강·근골격계 카테고리와 연결됩니다',
    path: '/qa', query: '건강', categoryId: '',
    accent: { border: 'border-sky-200', hover: 'hover:border-sky-400', tag: 'bg-sky-100 text-sky-700', dot: 'bg-sky-500', btn: 'text-sky-600' },
  },
  {
    id: 'phlorotannin',
    emoji: '🌊',
    label: '플로로탄닌부터 바로 이해하고 싶어요',
    short: '기초·기전·연결',
    desc: '어떤 질환 정보로 들어왔든 결국 마주하게 되는 이름입니다. 기초 개념부터 작용 기전까지 한 흐름으로 살펴볼 수 있도록 정리했습니다.',
    related: '→ 모든 카테고리 정보의 공통 교차점입니다',
    path: '/phlorotannin', query: '',
    accent: { border: 'border-cyan-200', hover: 'hover:border-cyan-500', tag: 'bg-cyan-100 text-cyan-700', dot: 'bg-cyan-500', btn: 'text-cyan-600' },
  },
]

// ─── 연결 카드 ─────────────────────────────────────────────────
const CROSS_LINKS = [
  {
    title: '암 정보와 함께 보면 좋은 식단 관점',
    desc: '회복 과정의 식이 전략은 암 정보에서만 다루기 어렵습니다. 식단 카테고리와 함께 보면 맥락이 더 분명해집니다.',
    path: '/qa', query: '회복 식단', badge: '암·식단',
    color: 'bg-rose-50 border-rose-200 hover:border-rose-400',
    badgeColor: 'bg-rose-100 text-rose-700',
  },
  {
    title: '당뇨 정보와 함께 보는 염증 흐름',
    desc: '혈당 조절과 만성 염증은 서로 영향을 주고받습니다. 두 카테고리를 같이 읽으면 더 입체적인 이해가 됩니다.',
    path: '/qa', query: '염증 혈당', badge: '당뇨·염증',
    color: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400',
    badgeColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    title: '뇌 건강 정보와 함께 보는 회복 관점',
    desc: '신경 피로와 인지 변화는 전신 회복 흐름과 연결됩니다. 관련 정보를 교차해서 읽을수록 이해가 깊어집니다.',
    path: '/qa', query: '뇌 회복', badge: '뇌·회복',
    color: 'bg-violet-50 border-violet-200 hover:border-violet-400',
    badgeColor: 'bg-violet-100 text-violet-700',
  },
  {
    title: '플로로탄닌 기초 — 먼저 알아두면 좋은 개념',
    desc: '성분 이야기 전에 갈조류와 폴리페놀의 기초 개념을 먼저 살펴보면 이후 정보들이 훨씬 자연스럽게 연결됩니다.',
    path: '/learn', query: '', badge: '기초·개념',
    color: 'bg-cyan-50 border-cyan-200 hover:border-cyan-400',
    badgeColor: 'bg-cyan-100 text-cyan-700',
  },
]

// ─── FAQ ───────────────────────────────────────────────────────
const FAQS = [
  {
    q: '플로로탄닌은 어떤 성분인가요?',
    a: '미역·다시마·감태 같은 갈조류에서 발견되는 해양 폴리페놀의 일종입니다. 육상 식물의 폴리페놀과는 구조가 달라 연구자들 사이에서 별도 분류됩니다. 기초 개념은 플로로탄닌 소개 페이지에서 자세히 확인할 수 있습니다.',
  },
  {
    q: '암이나 당뇨에 효과가 있다는 뜻인가요?',
    a: '이 사이트는 특정 효능·효과를 주장하지 않습니다. 관련 연구에서 어떤 기전이 관찰되었는지, 어떤 흐름으로 정보가 연결되는지를 정리해서 제공하는 정보형 사이트입니다.',
  },
  {
    q: '어디서부터 읽기 시작하면 좋을까요?',
    a: '관심 있는 질환 카테고리 Q&A를 먼저 보시거나, 플로로탄닌 소개 페이지에서 기초 개념부터 시작하셔도 됩니다. 어느 쪽이든 결국 같은 연결점으로 이어집니다.',
  },
  {
    q: '연락처를 남기면 어떤 안내를 받나요?',
    a: '판매나 가입 권유가 아닙니다. 관심 분야에 맞는 정보 흐름을 개인별로 안내드립니다. 부담 없이 질문만 남기셔도 됩니다.',
  },
  {
    q: '정보의 출처는 무엇인가요?',
    a: '국내외 학술 논문, 공공 건강 데이터, 전문가 검토 자료를 기반으로 정보를 구성합니다. 특정 제품 회사의 마케팅 자료에 의존하지 않습니다.',
  },
]

const SAMPLE_QUESTIONS = [
  '플로로탄닌이 혈당에 어떤 영향을 주나요?',
  '감태 추출물과 플로로탄닌은 같은 건가요?',
  '치매 예방에 해조류 성분이 연구된 적 있나요?',
  '항산화 성분 중 플로로탄닌의 특이점은?',
  '암 환자가 플로로탄닌을 섭취해도 되나요?',
  '만성 염증 조절에 관련된 해양 성분이 있나요?',
]

const landingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://phlorotannin.com/#webpage",
      "url": "https://phlorotannin.com/",
      "name": "플로로탄닌 건강 정보 아카이브 | 플로로탄닌 파트너스",
      "description": "암·당뇨·뇌질환·염증·회복기 식단 등 다양한 건강 주제를 다루는 플로로탄닌 관련 정보형 사이트.",
      "inLanguage": "ko-KR",
    },
    {
      "@type": "FAQPage",
      "@id": "https://phlorotannin.com/#faqpage",
      "mainEntity": FAQS.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    }
  ]
}

// ─── 섹션 레이블 컴포넌트 ─────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-8 h-0.5 bg-teal-400 inline-block rounded-full" />
      <p className="text-base font-bold tracking-widest text-teal-600 uppercase">
        {children}
      </p>
      <span className="w-8 h-0.5 bg-teal-400 inline-block rounded-full" />
    </div>
  )
}

// ─── 섹션 헤더 컴포넌트 ─────────────────────────────────────
function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="mb-10">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-[1.3] tracking-tight mb-4 break-keep">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-gray-500 leading-[1.9] max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default function LandingPage() {
  const partner = usePartner()
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)
  const [questionIdx, setQuestionIdx] = useState(0)
  const contactRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setQuestionIdx(i => (i + 1) % SAMPLE_QUESTIONS.length), 3000)
    return () => clearInterval(t)
  }, [])

  const goCategory = (cat) => {
    if (cat.path === '/phlorotannin') { navigate('/phlorotannin'); return }
    if (cat.path === '/learn') { navigate('/learn'); return }
    // categoryId가 있으면 카테고리 필터로 이동 (검색어 없이), 없으면 검색어로 이동
    if (cat.categoryId) {
      navigate(`${cat.path}?category=${encodeURIComponent(cat.categoryId)}`)
    } else {
      navigate(`${cat.path}?q=${encodeURIComponent(cat.query)}`)
    }
  }

  const scrollProgress = typeof document !== 'undefined'
    ? Math.min((scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)) * 100, 100)
    : 0

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEOHead
        title="플로로탄닌 건강 정보 아카이브"
        description="암·당뇨·뇌질환·염증·회복기 식단 등 다양한 건강 문제를 찾는 분들을 위해 플로로탄닌 관련 정보를 기초 개념부터 작용 기전까지 정리한 정보형 사이트입니다. 1,200개 Q&A 제공."
        keywords="플로로탄닌, 감태, 해양폴리페놀, 암 회복 식단, 당뇨 혈당 관리, 뇌 건강 치매예방, 만성염증"
        canonical="https://phlorotannin.com/"
        jsonLd={landingJsonLd}
      />

      {/* 스크롤 진행 바 */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50 pointer-events-none">
        <div className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-100" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* ═══════════════════════════════════
          A. HERO
      ═══════════════════════════════════ */}
      <section className="relative pt-28 pb-28 px-5 bg-white overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-teal-50 via-cyan-50 to-transparent rounded-full opacity-70 translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-50 to-transparent rounded-full opacity-50 -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* 상단 배지 */}
          <div className="flex items-center gap-3 mb-12">
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-50 border border-teal-200">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse inline-block" />
              <span className="text-base font-bold text-teal-700 tracking-wide">정보형 건강 아카이브</span>
            </div>
            <span className="text-base text-gray-400 font-medium">광고·판매 없음</span>
          </div>

          {/* 메인 헤드라인 */}
          <h1 className="text-[2.2rem] md:text-[3.5rem] font-extrabold text-gray-900 leading-[1.2] tracking-tight mb-8">
            <span className="block text-gray-400 text-lg md:text-2xl font-normal mb-3 tracking-normal leading-[1.7]">
              암, 당뇨, 뇌질환, 회복, 가족 건강…
            </span>
            다른 이유로 들어와도<br />
            <span className="text-teal-600">결국 같은 정보로</span><br />
            <span className="relative inline-block">
              모이게 됩니다
              <span className="absolute -bottom-1 left-0 w-full h-[5px] bg-teal-100 rounded-full" />
            </span>
          </h1>

          {/* 서브카피 */}
          <div className="space-y-4 mb-10 max-w-2xl">
            <p className="text-lg md:text-xl text-gray-600 leading-[1.9]">
              회복, 식단, 염증, 피로, 인지, 대사까지 — 각자 다른 고민으로 찾기 시작하지만,
              깊이 알아볼수록 <strong className="text-gray-800 font-semibold">공통으로 마주하게 되는 정보</strong>가 있습니다.
            </p>
            <p className="text-base md:text-lg text-gray-500 leading-[1.9]">
              이곳은 <strong className="text-gray-700 font-semibold">플로로탄닌 관련 정보</strong>를 기초 개념부터
              작용 기전까지, 한 흐름으로 이해할 수 있도록 정리해온 건강 정보 공간입니다.
            </p>
          </div>

          {/* 자동 순환 질문 배너 */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                <Icon.Search />
              </span>
              <div className="overflow-hidden flex-1 min-w-0">
                <p
                  key={questionIdx}
                  className="text-base text-gray-600 font-medium truncate"
                  style={{ animation: 'fadeSlide 0.45s ease' }}
                >
                  "{SAMPLE_QUESTIONS[questionIdx]}"
                </p>
              </div>
              <button
                onClick={() => navigate('/qa')}
                className="flex-shrink-0 text-sm font-bold text-teal-600 hover:text-teal-800 whitespace-nowrap transition-colors"
              >
                보기 →
              </button>
            </div>
          </div>

          {/* 강점 배지 */}
          <div className="grid grid-cols-2 gap-2.5 mb-10">
            {[
              { text: '1,200개+ Q&A', icon: '📚' },
              { text: '12개 질환 카테고리', icon: '🗂️' },
              { text: '기초부터 기전까지', icon: '🔬' },
              { text: '구매 유도 없음', icon: '✅' },
            ].map((item) => (
              <span key={item.text}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-200 text-base text-gray-700 shadow-sm font-semibold">
                <span className="text-lg leading-none flex-shrink-0">{item.icon}</span>
                <span className="break-keep">{item.text}</span>
              </span>
            ))}
          </div>

          {/* CTA 버튼 */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/qa')}
              className="flex items-center justify-center gap-2.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white px-6 py-4 rounded-xl text-lg font-bold transition-colors shadow-lg shadow-teal-100"
            >
              <Icon.BookOpen />
              질환별 정보 탐색하기
            </button>
            <button
              onClick={() => navigate('/phlorotannin')}
              className="flex items-center justify-center gap-2.5 bg-white hover:bg-gray-50 text-gray-800 px-6 py-4 rounded-xl text-lg font-bold border-2 border-gray-200 hover:border-teal-300 transition-colors"
            >
              <Icon.Leaf />
              플로로탄닌 이해하기
            </button>
          </div>

          <p className="mt-6 text-base text-gray-400 leading-relaxed">
            본 내용은 건강 정보 제공 목적이며, 특정 제품의 질병 치료·예방 효능을 주장하지 않습니다.
          </p>
        </div>

        <style>{`
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* ─── 섹션 구분선 ─── */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ═══════════════════════════════════
          B. 어떤 이유로 들어오셨나요?
      ═══════════════════════════════════ */}
      <section className="py-28 px-5 bg-gray-50">
        <div className="max-w-3xl mx-auto">

          <SectionHeader
            label="어떤 이유로 들어오셨나요?"
            title={<>찾아온 이유는 달라도<br /><span className="text-teal-600">연결된 정보가 기다리고 있습니다</span></>}
            subtitle="관심 있는 주제를 선택하면 관련 Q&A와 정보 페이지로 바로 이동합니다. 어떤 카테고리로 들어와도 자연스럽게 다른 카테고리와 연결됩니다."
          />

          <div className="space-y-4">
            {CATEGORIES.map((cat) => (
              <article
                key={cat.id}
                onClick={() => goCategory(cat)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && goCategory(cat)}
                className={`w-full text-left bg-white rounded-2xl border-2 ${cat.accent.border} ${cat.accent.hover} transition-all duration-200 cursor-pointer group hover:shadow-md`}
              >
                {/* 카드 상단: 이모지 + 배지 한 줄 */}
                <div className="flex items-center gap-3 px-5 pt-5 pb-3">
                  <span className="text-2xl leading-none flex-shrink-0">{cat.emoji}</span>
                  <span className={`text-sm px-3 py-1 rounded-full font-bold flex-shrink-0 ${cat.accent.tag}`}>{cat.short}</span>
                </div>
                {/* 카드 본문 */}
                <div className="px-5 pb-5">
                  <p className="font-extrabold text-gray-900 text-xl leading-[1.4] mb-3 break-keep">{cat.label}</p>
                  <p className="text-base text-gray-500 leading-[1.8] mb-3">{cat.desc}</p>
                  <p className={`text-sm font-bold ${cat.accent.btn}`}>{cat.related}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/qa')}
              className="inline-flex items-center gap-2 text-lg font-bold text-teal-600 hover:text-teal-800 transition-colors border-2 border-teal-300 hover:border-teal-500 rounded-full px-8 py-4 hover:bg-teal-50"
            >
              전체 Q&A 아카이브 보기 <Icon.ArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ─── 섹션 구분선 ─── */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ═══════════════════════════════════
          C. 이 공간에 대해 (신뢰 보강)
      ═══════════════════════════════════ */}
      <section className="py-28 px-5 bg-white">
        <div className="max-w-3xl mx-auto">

          <SectionHeader
            label="이 공간에 대해"
            title={<>조금 더 깊이 이해할 수 있도록<br />꾸준히 정리해왔습니다</>}
          />

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              {
                icon: '🔬',
                title: '기초부터 기전까지',
                body: '단순 소개에 그치지 않고, 왜 이런 질문이 생기는지, 어떤 구조로 작동하는지까지 한 흐름으로 이해할 수 있도록 정보를 쌓아왔습니다.',
              },
              {
                icon: '🔗',
                title: '질환 간 연결 구조',
                body: '암·당뇨·뇌 건강·염증은 따로 보이지만 정보를 깊이 파고들면 공통 키워드가 반복됩니다. 그 연결 흐름을 함께 정리했습니다.',
              },
              {
                icon: '📋',
                title: '광고 없는 정보',
                body: '이 사이트에는 판매 페이지나 구매 유도가 없습니다. 찾아보고 이해하는 것 자체가 목적이며, 더 알고 싶을 때 질문을 남기면 됩니다.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-100 hover:border-teal-200 transition-colors">
                <span className="text-4xl mb-5 block">{item.icon}</span>
                <h3 className="font-extrabold text-gray-900 mb-4 text-2xl">{item.title}</h3>
                <p className="text-lg text-gray-600 leading-[1.9]">{item.body}</p>
              </div>
            ))}
          </div>

          {/* 핵심 메시지 블록 */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-100 rounded-3xl p-10">
            <div className="flex items-start gap-6">
              <span className="text-5xl flex-shrink-0">🌊</span>
              <div>
                <h3 className="font-extrabold text-gray-900 mb-4 text-2xl leading-snug">플로로탄닌 정보, 왜 이곳에서 찾으시나요?</h3>
                <p className="text-gray-600 text-lg leading-[1.9] mb-6">
                  플로로탄닌 관련 정보는 인터넷에 많지만, 기초 개념·작용 기전·질환 간 연결 흐름이
                  한곳에 정리된 자료는 찾기 쉽지 않습니다. 이 공간은 그 간격을 줄이기 위해
                  꾸준히 정보를 축적해온 아카이브입니다.
                </p>
                <div className="flex flex-wrap gap-6">
                  {['1,200개 Q&A', '12개 질환 카테고리', '판매·가입 요청 없음'].map(t => (
                    <div key={t} className="flex items-center gap-2.5">
                      <span className="text-teal-500"><Icon.Check /></span>
                      <span className="text-lg font-semibold text-gray-700">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 섹션 구분선 ─── */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ═══════════════════════════════════
          D. 정보의 교차점
      ═══════════════════════════════════ */}
      <section className="py-28 px-5 bg-gray-50">
        <div className="max-w-3xl mx-auto">

          <SectionHeader
            label="정보의 교차점"
            title={<>왜 많은 질문이 결국<br /><span className="text-teal-600">플로로탄닌으로 모일까요?</span></>}
            subtitle="질환명은 다르지만, 실제로 사람들이 깊이 찾아보는 내용은 생각보다 비슷합니다. 회복, 식단, 대사, 염증, 인지 변화처럼 서로 다른 고민들이 결국 몇 가지 공통 질문으로 모이기 때문입니다."
          />

          {/* 다이어그램 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10 shadow-sm">
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: '암·회복',   sub: '식단·염증·면역',    color: 'bg-rose-50 border-rose-200 text-rose-700' },
                { label: '당뇨·대사', sub: '혈당·인슐린·비만',  color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
                { label: '뇌·인지',   sub: '기억·집중·수면',    color: 'bg-violet-50 border-violet-200 text-violet-700' },
                { label: '염증·피로', sub: '만성염증·회복력',   color: 'bg-amber-50 border-amber-200 text-amber-700' },
              ].map((item) => (
                <div key={item.label} className={`rounded-xl border px-3 py-4 text-center ${item.color}`}>
                  <div className="font-extrabold text-lg mb-1">{item.label}</div>
                  <div className="text-sm opacity-80 font-medium">{item.sub}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gray-200" />
              <div className="px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200">
                <span className="text-sm font-bold text-gray-500">공통 키워드</span>
              </div>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="text-center">
              <span className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3.5 rounded-xl text-lg font-extrabold shadow-md shadow-teal-100">
                <Icon.Wave />
                플로로탄닌
              </span>
              <p className="text-sm text-gray-400 mt-3 leading-[1.7]">
                갈조류(감태·미역·다시마) 유래 해양 폴리페놀<br />
                다양한 질환 연구에서 반복 등장
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/phlorotannin')}
              className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-xl text-lg font-bold transition-colors shadow-md shadow-teal-100"
            >
              플로로탄닌 기전 이해하기 <Icon.ArrowRight />
            </button>
            <button
              onClick={() => navigate('/qa')}
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-6 py-4 rounded-xl text-lg font-bold border-2 border-gray-200 hover:border-gray-300 transition-colors"
            >
              질환별 Q&A 전체 보기 <Icon.ArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ─── 섹션 구분선 ─── */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ═══════════════════════════════════
          E. 연결해서 보기
      ═══════════════════════════════════ */}
      <section className="py-28 px-5 bg-white">
        <div className="max-w-3xl mx-auto">

          <SectionHeader
            label="연결해서 보기"
            title={<>한 가지를 보러 들어와도,<br /><span className="text-teal-600">함께 보면 이해가 쉬워집니다</span></>}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CROSS_LINKS.map((item) => (
              <button
                key={item.title}
                onClick={() =>
                  item.path === '/learn'
                    ? navigate('/learn')
                    : navigate(`${item.path}?q=${encodeURIComponent(item.query)}`)
                }
                className={`text-left rounded-2xl p-6 border-2 transition-all group hover:shadow-md ${item.color}`}
              >
                <span className={`inline-block text-sm font-bold px-3 py-1 rounded-full mb-3 ${item.badgeColor}`}>{item.badge}</span>
                <h3 className="font-extrabold text-gray-900 text-lg mb-2 leading-snug break-keep">{item.title}</h3>
                <p className="text-base text-gray-500 leading-[1.8] mb-4">{item.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 group-hover:gap-2.5 transition-all">
                  바로 보기 <Icon.ArrowRight />
                </span>
              </button>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            {[
              { label: '쉽게 배우기', path: '/learn' },
              { label: '쉬운 건강 정보', path: '/easy' },
              { label: '플로로탄닌 소개', path: '/phlorotannin' },
              { label: '건강 정보 허브', path: '/home' },
            ].map(l => (
              <button
                key={l.label}
                onClick={() => navigate(l.path)}
                className="text-base font-bold text-gray-500 hover:text-teal-700 border-2 border-gray-200 hover:border-teal-300 rounded-full px-6 py-3 transition-colors hover:bg-teal-50"
              >
                {l.label} →
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 섹션 구분선 ─── */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ═══════════════════════════════════
          F. 자주 묻는 질문
      ═══════════════════════════════════ */}
      <section className="py-28 px-5 bg-gray-50">
        <div className="max-w-3xl mx-auto">

          <SectionHeader
            label="자주 묻는 질문"
            title="먼저 궁금하셨던 것들"
          />

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-teal-300 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-5 flex items-center justify-between gap-4"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-bold text-gray-900 text-lg leading-snug break-keep">{faq.q}</span>
                  <span className="flex-shrink-0 text-teal-500 ml-2">
                    <Icon.ChevronDown open={openFaq === i} />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <div className="h-px bg-gray-100 mb-4" />
                    <p className="text-base text-gray-600 leading-[1.9]">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigate('/qa')}
              className="inline-flex items-center gap-2 text-lg font-bold text-teal-600 hover:text-teal-800 border-2 border-teal-200 hover:border-teal-400 rounded-full px-8 py-4 transition-colors hover:bg-teal-50"
            >
              전체 Q&A 아카이브 보기 <Icon.ArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ─── 섹션 구분선 ─── */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ═══════════════════════════════════
          G. 질문 남기기 CTA
      ═══════════════════════════════════ */}
      <section ref={contactRef} className="py-28 px-5 bg-white">
        <div className="max-w-2xl mx-auto">

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200 mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse inline-block" />
              <span className="text-sm font-bold text-teal-700">질문 남기기</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-[1.3] break-keep">
              혼자 찾기 어려웠던 정보,<br />
              <span className="text-teal-600">질문부터 남겨보세요</span>
            </h2>
            <p className="text-gray-500 text-lg leading-[1.9] max-w-md mx-auto">
              구매 권유나 가입 요청이 없습니다.<br />
              관심 있는 분야와 궁금한 점을 남겨주시면
              해당 정보 흐름을 개인별로 안내드립니다.
            </p>
          </div>

          {/* 안내 포인트 */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: '질문만\n남겨도 됩니다', icon: '💬' },
              { label: '구매 권유\n없음', icon: '🚫' },
              { label: '맞춤 정보\n안내', icon: '📋' },
            ].map((item) => (
              <div key={item.icon} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <span className="text-2xl block mb-2">{item.icon}</span>
                <span className="text-sm text-gray-600 leading-snug font-bold whitespace-pre-line break-keep">{item.label}</span>
              </div>
            ))}
          </div>

          {/* 문자 CTA 카드 */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100 p-6 mb-6">
            <h3 className="font-extrabold text-gray-900 mb-2 text-xl leading-snug">관심 분야 및 궁금한 점</h3>
            <p className="text-base text-gray-500 mb-5 leading-[1.8]">
              아래 버튼을 누르면 문자 앱이 열립니다. 관심 있는 질환·분야와 궁금한 점을 자유롭게 적어 보내주세요.
            </p>

            <div className="space-y-2 mb-5">
              {[
                '예) 암 회복 중인데 플로로탄닌 관련 정보가 궁금합니다.',
                '예) 당뇨 식단 조절 중인데 관련 정보를 더 알고 싶습니다.',
                '예) 뇌 건강에 관심이 많아 기초부터 공부하고 싶습니다.',
              ].map((ex) => (
                <div key={ex} className="flex items-start gap-2.5 bg-white rounded-xl px-4 py-3 border border-teal-100">
                  <span className="text-teal-500 flex-shrink-0 mt-0.5"><Icon.Check /></span>
                  <p className="text-base text-gray-500 leading-relaxed">{ex}</p>
                </div>
              ))}
            </div>

            <a
              href={`sms:${partner.phone}?body=${encodeURIComponent('[플로로탄닌 정보 문의]\n관심 분야: \n궁금한 점: ')}`}
              className="flex items-center justify-center gap-2.5 w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white py-5 rounded-xl text-xl font-extrabold transition-colors shadow-lg shadow-teal-100"
            >
              <Icon.MessageCircle />
              문자로 질문 남기기
            </a>
            <p className="text-center text-sm text-gray-400 mt-3">
              문자 앱이 열리면 내용을 자유롭게 수정하셔도 됩니다 · 24시간 내 안내드립니다
            </p>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-400 mb-5 font-medium">아직 더 살펴보고 싶으시다면</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: '질환별 Q&A', path: '/qa' },
                { label: '플로로탄닌 기초', path: '/phlorotannin' },
                { label: '쉽게 배우기', path: '/learn' },
                { label: '건강 정보 허브', path: '/home' },
              ].map((l) => (
                <button
                  key={l.label}
                  onClick={() => navigate(l.path)}
                  className="text-base font-bold text-gray-500 hover:text-teal-700 border-2 border-gray-200 hover:border-teal-300 rounded-full px-6 py-3 transition-colors hover:bg-teal-50"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          푸터
      ═══════════════════════════════════ */}
      <footer className="py-14 px-5 bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
            {[
              { label: '건강 Q&A', path: '/qa' },
              { label: '플로로탄닌 소개', path: '/phlorotannin' },
              { label: '쉽게 배우기', path: '/learn' },
              { label: '쉬운 건강 정보', path: '/easy' },
              { label: '파트너 참여', path: '/partner' },
              { label: '상담 문의', path: '/consult' },
            ].map(l => (
              <button
                key={l.label}
                onClick={() => navigate(l.path)}
                className="text-base text-gray-400 hover:text-gray-200 transition-colors font-semibold"
              >
                {l.label}
              </button>
            ))}
          </div>
          <p className="text-base text-gray-500 leading-[1.9] text-center mb-5">
            본 사이트는 플로로탄닌 관련 건강 정보를 제공하는 정보형 플랫폼입니다.
            특정 제품의 질병 치료·예방 효능·효과를 주장하거나 보장하지 않습니다.
            건강 관련 결정은 반드시 전문 의료인과 상담하시기 바랍니다.
          </p>
          <p className="text-center text-base text-gray-600 font-medium">
            © 2026 플로로탄닌 파트너스 · 모든 저작권 보호
          </p>
        </div>
      </footer>
    </div>
  )
}
