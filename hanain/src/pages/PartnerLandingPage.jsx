import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Phone, MessageSquare, BookOpen, Leaf, ChevronRight, Shield, Brain, Heart, Zap, Users, CheckCircle, AlertCircle } from 'lucide-react'
import SEOHead from '../components/common/SEOHead'

const MAIN_SITE = 'https://phlorotannin.com'

// partners.json에서 slug로 파트너 조회
async function fetchPartner(slug) {
  try {
    const resp = await fetch(`${MAIN_SITE}/partners.json?t=${Date.now()}`, { cache: 'no-store' })
    if (!resp.ok) return null
    const data = await resp.json()
    return (data.partners || []).find(p => p.slug === slug) || null
  } catch {
    return null
  }
}

// 카테고리 카드 데이터
const CATEGORIES = [
  { emoji: '🦀', label: '암 회복 식단',      path: '/qa?category=cancer',     color: 'bg-rose-50 border-rose-200 text-rose-700' },
  { emoji: '🩺', label: '당뇨 혈당 관리',    path: '/qa?category=diabetes',   color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { emoji: '🧠', label: '뇌 건강·치매 예방', path: '/qa?category=brain',      color: 'bg-violet-50 border-violet-200 text-violet-700' },
  { emoji: '🔥', label: '염증·피로 회복',    path: '/qa?category=inflammation', color: 'bg-orange-50 border-orange-200 text-orange-700' },
  { emoji: '🌿', label: '플로로탄닌이란?',   path: '/phlorotannin',           color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
]

export default function PartnerLandingPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [partner, setPartner] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) { setNotFound(true); setLoading(false); return }
    fetchPartner(slug).then(p => {
      if (p) setPartner(p)
      else setNotFound(true)
      setLoading(false)
    })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-base">정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
        <div className="text-center max-w-sm">
          <AlertCircle className="w-14 h-14 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">페이지를 찾을 수 없습니다</h2>
          <p className="text-base text-gray-500 mb-6">유효하지 않은 파트너 링크입니다.</p>
          <button onClick={() => navigate('/')}
            className="bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold text-base">
            메인으로 이동
          </button>
        </div>
      </div>
    )
  }

  const tel   = `tel:${partner.phone}`
  const sms   = `sms:${partner.phone}`

  return (
    <>
      <SEOHead
        title={`${partner.name} 파트너 | 플로로탄닌 건강 정보`}
        description="암 회복, 당뇨, 뇌 건강, 염증 피로 — 플로로탄닌 관련 건강 정보를 전문 파트너와 함께 확인하세요."
        canonical={`${MAIN_SITE}/p/${slug}`}
        noindex={true}
      />

      <div className="min-h-screen bg-gray-50">

        {/* ── 헤더 배너 ── */}
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 px-5 pt-10 pb-14">
          <div className="max-w-lg mx-auto text-center">
            {/* 파트너 배지 */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
              <span className="text-emerald-100 text-sm font-medium">파트너 전용 페이지</span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
              {partner.name} 파트너와<br />함께하는 건강 정보
            </h1>
            <p className="text-emerald-100 text-base leading-relaxed mb-8">
              암 회복, 당뇨 식단, 뇌 건강, 염증 관리까지<br />
              1,200개 Q&A 정보를 함께 확인해 드립니다.
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={tel}
                className="flex items-center justify-center gap-2 bg-white text-emerald-800 px-6 py-4 rounded-2xl text-base font-bold shadow-lg active:scale-95 transition-transform">
                <Phone className="w-5 h-5" />
                {partner.phoneDisplay} 전화 연결
              </a>
              <a href={sms}
                className="flex items-center justify-center gap-2 bg-emerald-600 border-2 border-emerald-400 text-white px-6 py-4 rounded-2xl text-base font-semibold active:scale-95 transition-transform">
                <MessageSquare className="w-5 h-5" />
                문자로 문의하기
              </a>
            </div>
          </div>
        </div>

        {/* ── 카테고리 탐색 ── */}
        <div className="max-w-lg mx-auto px-5 -mt-6">
          <div className="bg-white rounded-2xl shadow-md p-5 mb-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">어떤 정보를 찾고 계신가요?</h2>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.label}
                  onClick={() => navigate(cat.path)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-base font-semibold text-left active:scale-95 transition-transform ${cat.color}`}
                >
                  <span className="text-xl">{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── 신뢰 포인트 ── */}
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">이 정보는 믿을 수 있나요?</h2>
            <div className="space-y-3">
              {[
                { icon: BookOpen,    text: '국내외 논문 기반 1,200개 Q&A' },
                { icon: Shield,      text: '판매·광고 없는 순수 정보 공간' },
                { icon: CheckCircle, text: '기초 개념부터 작용기전까지 체계적 정리' },
                { icon: Users,       text: '파트너가 직접 안내해 드립니다' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-base text-gray-700">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 핵심 링크 ── */}
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">바로 시작하기</h2>
            <div className="space-y-2">
              {[
                { label: '플로로탄닌이 뭔가요?',         path: '/phlorotannin',             desc: '해양 폴리페놀 기초 개념' },
                { label: '암 회복에 도움이 되나요?',      path: '/qa?category=cancer',       desc: '항암·회복 관련 Q&A' },
                { label: '혈당 관리에 효과가 있나요?',    path: '/qa?category=diabetes',     desc: '당뇨·혈당 관련 Q&A' },
                { label: '뇌 건강·치매 예방에 관하여',    path: '/qa?category=brain',        desc: '인지·신경 관련 Q&A' },
                { label: '염증과 피로 회복 정보',         path: '/qa?category=inflammation', desc: '만성염증·회복 Q&A' },
              ].map(link => (
                <button key={link.label} onClick={() => navigate(link.path)}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left group">
                  <div>
                    <p className="text-base font-semibold text-gray-800 group-hover:text-emerald-700">{link.label}</p>
                    <p className="text-sm text-gray-400 mt-0.5">{link.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* ── 하단 연락 고정 ── */}
          <div className="bg-gradient-to-r from-emerald-700 to-teal-700 rounded-2xl p-5 mb-8 text-center">
            <p className="text-white text-lg font-bold mb-1">궁금한 점이 있으신가요?</p>
            <p className="text-emerald-100 text-base mb-4">{partner.name} 파트너가 직접 답변해 드립니다</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={tel}
                className="flex-1 flex items-center justify-center gap-2 bg-white text-emerald-800 py-3.5 rounded-xl font-bold text-base active:scale-95 transition-transform">
                <Phone className="w-5 h-5" /> 전화 문의
              </a>
              <a href={sms}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 border border-emerald-400 text-white py-3.5 rounded-xl font-semibold text-base active:scale-95 transition-transform">
                <MessageSquare className="w-5 h-5" /> 문자 문의
              </a>
            </div>
            <p className="text-emerald-200 text-sm mt-3">본 페이지는 건강 정보 제공 목적이며 특정 제품 판매와 무관합니다.</p>
          </div>
        </div>

      </div>
    </>
  )
}
