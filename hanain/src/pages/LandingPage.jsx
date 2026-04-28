import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePartner } from '../context/PartnerContext'
import SEOHead from '../components/common/SEOHead'
import { getMainVideos } from '../lib/supabase'

// ─── YouTube ID 추출 ──────────────────────────────────────────
function extractYoutubeId(url) {
  if (!url) return null
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&\s?#/]+)/)
  return m?.[1] || null
}

// ─── 기본 영상 (DB 없을 때 폴백) ─────────────────────────────
const DEFAULT_VIDEOS = [
  {
    id: 'default-1',
    youtube_url: 'https://www.youtube.com/watch?v=lOM_Bn7wCsU',
    video_title: '플로로탄닌이란 무엇인가?',
    video_summary: null,
    is_main: true,
    sort_order: 0,
  },
  {
    id: 'default-2',
    youtube_url: 'https://www.youtube.com/watch?v=GdUU7sk04rc',
    video_title: '플로로탄닌 건강 정보',
    video_summary: null,
    is_main: true,
    sort_order: 1,
  },
]

// ─── 효능 카드 (쉽게 이해하기 - 아코디언) ──────────────────
const BENEFIT_CARDS = [
  {
    emoji: '🔥',
    title: '염증 억제',
    short: '만성 염증을 줄이는 핵심 기전',
    analogy: '🚒 불 끄는 소방관처럼 몸속 염증 신호를 꺼줘요',
    simple: '만성 염증은 암·당뇨·심혈관 질환의 공통 뿌리예요. 플로로탄닌은 염증을 키우는 신호(NF-κB)를 차단해서 몸 전체 염증 반응을 조절해 줘요.',
    evidence: '항염증 경로 NF-κB 억제 확인 (다수 SCI 논문)',
    symptom: ['만성 피로', '반복되는 통증', '붓기', '소화 불량'],
  },
  {
    emoji: '🧠',
    title: '뇌 건강',
    short: '인지력·기억력 보호에 연구 중',
    analogy: '🧹 뇌 속 나쁜 단백질을 치워주는 청소부예요',
    simple: '뇌에 베타아밀로이드 같은 나쁜 단백질이 쌓이면 기억력이 떨어져요. 플로로탄닌은 이 단백질 분해를 방해하는 효소를 억제해 뇌세포를 보호해요.',
    evidence: '기억력 관련 효소(AChE) 억제율 60% 이상 (체외 실험)',
    symptom: ['자꾸 깜빡함', '집중력 저하', '말이 잘 안 나옴', '수면 질 저하'],
  },
  {
    emoji: '🩸',
    title: '혈당 조절',
    short: '당뇨·대사 관련 정보와 연결',
    analogy: '🚦 당이 혈액으로 들어오는 문을 천천히 열리게 해요',
    simple: '밥을 먹으면 당이 빠르게 혈액으로 흡수돼요. 플로로탄닌은 이 흡수 속도를 늦춰줘서 혈당이 급격히 오르는 걸 막아줘요.',
    evidence: '임상 연구에서 공복 혈당 약 27% 감소 확인',
    symptom: ['식후 졸림', '심한 갈증', '잦은 소변', '쉽게 피곤함'],
  },
  {
    emoji: '🛡️',
    title: '면역 강화',
    short: '암 회복·면역 흐름과 교차',
    analogy: '💪 면역 경비원을 더 강하게 훈련시켜요',
    simple: '면역세포(NK세포)가 약해지면 암세포나 바이러스를 제대로 못 막아요. 플로로탄닌은 면역세포를 활성화하고, 암세포의 성장 자체를 억제하는 기전이 연구되고 있어요.',
    evidence: '대장암·유방암 세포주에서 세포 사멸 유도 확인',
    symptom: ['잦은 감기', '상처 회복 느림', '계속 피곤함', '항암 치료 중 회복'],
  },
]

// ─── 질환 카테고리 그리드 ────────────────────────────────────
const DISEASE_CATEGORIES = [
  { emoji: '💪', name: '암·회복', categoryId: 'cancer_immune', query: '암' },
  { emoji: '🩸', name: '당뇨·대사', categoryId: 'metabolism', query: '당뇨' },
  { emoji: '🧠', name: '뇌·인지', categoryId: 'neuro_cognitive', query: '치매' },
  { emoji: '🔥', name: '염증·피로', categoryId: 'infection_inflammation', query: '염증' },
  { emoji: '❤️', name: '심혈관', categoryId: 'cardiovascular', query: '혈압' },
  { emoji: '😴', name: '수면·정신', categoryId: 'mental_health', query: '수면' },
  { emoji: '🦴', name: '근골격계', categoryId: 'musculoskeletal', query: '관절' },
  { emoji: '🌊', name: '플로로탄닌', path: '/phlorotannin' },
]

// ─── FAQ ─────────────────────────────────────────────────────
const FAQS = [
  {
    q: '플로로탄닌은 어떤 성분인가요?',
    a: '미역·다시마·감태 같은 갈조류에서 발견되는 해양 폴리페놀입니다. 육상 식물의 폴리페놀과 구조가 달라 별도로 분류됩니다.',
  },
  {
    q: '특정 질환에 효과가 있나요?',
    a: '이 사이트는 효능·효과를 주장하지 않습니다. 관련 연구에서 어떤 기전이 관찰됐는지 정보를 정리해 제공하는 정보형 사이트입니다.',
  },
  {
    q: '어디서부터 읽으면 좋나요?',
    a: '관심 있는 질환 카테고리 Q&A를 먼저 보거나, 플로로탄닌 소개 페이지에서 기초 개념부터 시작하셔도 됩니다.',
  },
  {
    q: '정보의 출처는 무엇인가요?',
    a: '국내외 학술 논문, 공공 건강 데이터, 전문가 검토 자료를 기반으로 구성합니다. 특정 제품 회사의 마케팅 자료에 의존하지 않습니다.',
  },
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

// ─── 아이콘 ──────────────────────────────────────────────────
const ArrowRight = () => (
  <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)
const ChevronDown = ({ open }) => (
  <svg className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)
const MessageCircle = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

export default function LandingPage() {
  const partner = usePartner()
  const navigate = useNavigate()
  const [mainVideos, setMainVideos] = useState(DEFAULT_VIDEOS)
  const [openFaq, setOpenFaq] = useState(null)
  const [openBenefit, setOpenBenefit] = useState(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    getMainVideos().then(v => { if (v && v.length > 0) setMainVideos(v) }).catch(() => {})
  }, [])

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollProgress = typeof document !== 'undefined'
    ? Math.min((scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)) * 100, 100)
    : 0

  const goCategory = (cat) => {
    if (cat.path) { navigate(cat.path); return }
    if (cat.categoryId) {
      navigate(`/qa?category=${encodeURIComponent(cat.categoryId)}`)
    } else {
      navigate(`/qa?q=${encodeURIComponent(cat.query)}`)
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEOHead
        title="플로로탄닌 건강 정보 아카이브"
        description="암·당뇨·뇌질환·염증 등 다양한 건강 문제를 찾는 분들을 위해 플로로탄닌 관련 정보를 기초부터 기전까지 정리한 정보형 사이트입니다."
        keywords="플로로탄닌, 감태, 해양폴리페놀, 암 회복 식단, 당뇨 혈당 관리, 뇌 건강 치매예방, 만성염증"
        canonical="https://phlorotannin.com/"
        jsonLd={landingJsonLd}
      />

      {/* 스크롤 진행 바 */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50 pointer-events-none">
        <div className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-100" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* ════════════════════════════════════
          1. HERO
      ════════════════════════════════════ */}
      <section className="relative pt-24 pb-14 px-5 bg-white overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-teal-50 via-cyan-50 to-transparent rounded-full opacity-60 translate-x-1/4 -translate-y-1/4" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* 배지 */}
          <div className="flex items-center gap-2 mb-8">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200 text-sm font-bold text-teal-700">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse inline-block" />
              정보형 건강 아카이브 · 광고 없음
            </span>
          </div>

          {/* 헤드라인 */}
          <h1 className="text-[2rem] md:text-[3rem] font-extrabold text-gray-900 leading-[1.25] tracking-tight mb-5 break-keep">
            암·당뇨·뇌질환·염증…<br />
            <span className="text-teal-600">어떤 질환이든 연결됩니다</span>
          </h1>

          {/* 1줄 서브카피 */}
          <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-xl">
            다른 이유로 찾아와도, 깊이 알아볼수록 같은 정보로 모입니다.
          </p>

          {/* 질환 태그 */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['💪 암·회복', '🩸 당뇨', '🧠 뇌 건강', '🔥 염증', '❤️ 심혈관', '😴 수면·정신', '🦴 근골격'].map(tag => (
              <span key={tag} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-semibold text-gray-600">
                {tag}
              </span>
            ))}
          </div>

          {/* CTA 버튼 — 학습 시작 */}
          <button
            onClick={() => navigate('/easy')}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-xl text-base font-bold transition-colors shadow-lg shadow-teal-100"
          >
            🌊 플로로탄닌 쉽게 이해하기부터 시작하세요 <ArrowRight />
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════
          2. 추천 영상 (최우선 배치)
      ════════════════════════════════════ */}
      <section className="py-12 px-5 bg-gray-50">
        <div className="max-w-3xl mx-auto">

          {/* ── 처음 오신 분 안내 박스 ── */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl px-5 py-4 mb-6">
            <p className="text-sm font-extrabold text-amber-700 mb-2">💡 처음 오신 분들께</p>
            <p className="text-sm text-amber-800 leading-relaxed font-medium">
              우측 상단 <strong>메뉴</strong> 버튼을 누르신 후<br />
              아래 순서로 학습하시면 도움이 됩니다.
            </p>
            <div className="mt-3 space-y-1">
              {[
                { num: '①', label: '플로로탄닌 쉽게 배우기' },
                { num: '②', label: '플로로탄닌 소개' },
                { num: '③', label: '건강 Q&A' },
              ].map(item => (
                <div key={item.num} className="flex items-center gap-2">
                  <span className="text-amber-600 font-extrabold text-base w-6">{item.num}</span>
                  <span className="text-amber-900 font-bold text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 섹션 헤더 */}
          <div className="text-center mb-8">
            <p className="text-sm font-bold text-teal-600 tracking-widest uppercase mb-2">먼저 영상으로 보세요</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 break-keep">
              읽기 전에 영상으로 <span className="text-teal-600">3분이면 이해됩니다</span>
            </h2>
          </div>

          <div className={`grid gap-6 ${mainVideos.length === 1 ? 'grid-cols-1' : 'md:grid-cols-2 grid-cols-1'}`}>
            {mainVideos.map((v, idx) => {
              const vid = extractYoutubeId(v.youtube_url)
              if (!vid) return null
              return (
                <div key={v.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="aspect-video bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${vid}?rel=0&modestbranding=1`}
                      title={v.video_title || `추천 영상 ${idx + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      className="w-full h-full"
                    />
                  </div>
                  {v.video_title && (
                    <div className="px-4 py-3">
                      <p className="font-bold text-gray-800 text-sm leading-snug">{v.video_title}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          3. 쉽게 이해하기 (아코디언)
      ════════════════════════════════════ */}
      <section className="py-12 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm font-bold text-teal-600 tracking-widest uppercase mb-2">쉽게 이해하기</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 break-keep">
              플로로탄닌이 주목받는 이유
            </h2>
            <p className="text-gray-400 text-sm mt-2">항목을 눌러 설명을 확인하세요</p>
          </div>

          <div className="space-y-3">
            {BENEFIT_CARDS.map((card, i) => {
              const isOpen = openBenefit === i
              return (
                <div
                  key={card.title}
                  className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${isOpen ? 'border-teal-300 bg-teal-50' : 'border-gray-100 bg-gray-50 hover:border-teal-200'}`}
                >
                  {/* 카드 헤더 - 클릭 */}
                  <button
                    onClick={() => setOpenBenefit(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-2xl flex-shrink-0">{card.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-gray-900 text-base">{card.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5 break-keep">{card.short}</p>
                    </div>
                    <span className={`flex-shrink-0 text-teal-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown open={isOpen} />
                    </span>
                  </button>

                  {/* 아코디언 펼침 내용 */}
                  {isOpen && (
                    <div className="px-5 pb-5">
                      <div className="h-px bg-teal-100 mb-4" />

                      {/* 비유 한 줄 */}
                      <div className="bg-white rounded-xl px-4 py-3 mb-4 border border-teal-100">
                        <p className="text-sm font-bold text-teal-700">{card.analogy}</p>
                      </div>

                      {/* 쉬운 설명 */}
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 break-keep">
                        {card.simple}
                      </p>

                      {/* 연구 근거 */}
                      <div className="flex items-start gap-2 bg-white rounded-xl px-4 py-3 mb-4 border border-gray-100">
                        <span className="text-teal-500 flex-shrink-0 text-base">🔬</span>
                        <p className="text-xs text-gray-500 leading-relaxed">{card.evidence}</p>
                      </div>

                      {/* 해당 증상 태그 */}
                      <div>
                        <p className="text-xs font-bold text-gray-400 mb-2">이런 분께 관련 정보가 있어요</p>
                        <div className="flex flex-wrap gap-2">
                          {card.symptom.map(s => (
                            <span key={s} className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* ── 쉽게 배우기 배너 링크 ── */}
          <div className="mt-6">
            <button
              onClick={() => navigate('/easy')}
              className="w-full flex items-center justify-between gap-3 px-6 py-5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-2xl text-white shadow-lg shadow-teal-200 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌊</span>
                <div className="text-left">
                  <p className="text-base font-extrabold leading-tight">왜 도움이 되는지 쉽게 알아보기</p>
                  <p className="text-xs text-teal-200 mt-0.5">그림·비유로 이해하는 플로로탄닌</p>
                </div>
              </div>
              <span className="flex-shrink-0 bg-white bg-opacity-20 rounded-full p-2">
                <ArrowRight />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FAQ
      ════════════════════════════════════ */}
      <section className="py-12 px-5 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm font-bold text-teal-600 tracking-widest uppercase mb-2">자주 묻는 질문</p>
            <h2 className="text-2xl font-extrabold text-gray-900">먼저 궁금하셨던 것들</h2>
          </div>

          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-teal-300 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-bold text-gray-900 text-sm leading-snug break-keep">{faq.q}</span>
                  <span className="flex-shrink-0 text-teal-500">
                    <ChevronDown open={openFaq === i} />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <div className="h-px bg-gray-100 mb-3" />
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA: 문자 문의
      ════════════════════════════════════ */}
      <section className="py-12 px-5 bg-white">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-xl font-extrabold text-gray-900 mb-2 break-keep">
            더 궁금하신 점이 있으신가요?
          </h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            전화 또는 문자로 편하게 연락주세요.
          </p>
          <a
            href={`sms:${partner.phone}?body=${encodeURIComponent('[플로로탄닌 문의]\n')}`}
            className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl text-base font-bold transition-colors shadow-lg shadow-teal-100"
          >
            📱 문자로 문의하기
          </a>
          <p className="mt-5 text-xs text-gray-400">
            본 내용은 건강 정보 제공 목적이며, 특정 제품의 질병 치료·예방 효능을 주장하지 않습니다.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════
          푸터
      ════════════════════════════════════ */}
      <footer className="py-10 px-5 bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
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
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors font-semibold"
              >
                {l.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mb-3 leading-relaxed">
            본 사이트는 플로로탄닌 관련 건강 정보를 제공하는 정보형 플랫폼입니다.
            특정 제품의 질병 치료·예방 효능·효과를 주장하거나 보장하지 않습니다.
          </p>
          <p className="text-center text-xs text-gray-600 font-medium">
            © 2026 플로로탄닌 파트너스 · 모든 저작권 보호
          </p>
        </div>
      </footer>
    </div>
  )
}
