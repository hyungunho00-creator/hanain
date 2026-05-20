// ───────────────────────────────────────────────────────────────
// hanain/src/components/partner/PartnerShareBar.jsx
// 파트너 영업 보조 — 추천 링크 공유 도구.
//
// 동작:
//   1) 파트너 컨텍스트가 활성(본사 기본 아님)이면 노출.
//   2) 표시: "나의 추천 링크" + 자동 부착된 ref URL preview + [복사][카카오톡][문자]
//   3) 추가 안전망: 진입 후 주소창 URL을 ?ref=<phone> 으로 silent 동기화
//      → 사용자가 브라우저 주소창을 직접 복사해도 ref가 유지되어 본사로 새지 않음.
//
// 사용처:
//   - BlogPage  (목록 상단)
//   - BlogPostPage (글 상단)
//   - 향후 QAPage, GlossaryPage 등에도 동일하게 삽입 가능.
//
// 외부 의존성:
//   - usePartner() : 현재 컨텍스트 파트너 ({ name, phone, phoneDisplay })
//   - DEFAULT_PARTNER : 본사 기본 파트너
//   - withRef() : 내부 URL에 ?ref= 부착
// ───────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Copy, MessageCircle, Share2, CheckCircle2 } from 'lucide-react'
import { usePartner, DEFAULT_PARTNER } from '../../context/PartnerContext'
import { withRef } from '../../lib/partnerRef'

export default function PartnerShareBar({ compact = false }) {
  const partner = usePartner()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [copied, setCopied] = useState(false)

  const isPartner = partner && partner.phone && partner.phone !== DEFAULT_PARTNER.phone
  const currentRef = searchParams.get('ref')

  // ─────────────────────────────────────────────────────────
  // URL silent 동기화
  // 파트너 컨텍스트 활성 + 현재 URL에 ref가 없거나 다른 ref가 박혀 있으면
  // 주소창 URL을 본인 파트너 ref로 교체한다.
  // /p/<phone>/... 경로는 이미 컨텍스트를 path로 포함하므로 제외.
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPartner) return
    if (/^\/p\/\d{9,11}/.test(location.pathname)) return  // path 기반 컨텍스트는 그대로 둠

    const myRef = partner.phone
    if (currentRef === myRef) return  // 이미 동일

    // 안전한 동기화: replaceState로 history 오염 없이 주소창만 갱신
    try {
      const u = new URL(window.location.href)
      u.searchParams.set('ref', myRef)
      window.history.replaceState(window.history.state, '', u.pathname + u.search + u.hash)
    } catch { /* 무시 */ }
  }, [isPartner, partner?.phone, location.pathname, location.search, currentRef])

  // ─────────────────────────────────────────────────────────
  // 현재 페이지의 추천 URL (절대 URL — 외부 공유용)
  // ─────────────────────────────────────────────────────────
  const getShareUrl = () => {
    const base = `https://phlorotannin.com${location.pathname}${location.search || ''}`
    // searchParams에 이미 ref가 있을 수 있으니 withRef는 그대로 둘 것
    return withRef(base, partner)
  }

  const handleCopy = async () => {
    const url = getShareUrl()
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = url
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSMS = () => {
    const url = getShareUrl()
    const text = `[플로로탄닌 정보 공유]\n${url}`
    window.location.href = `sms:?body=${encodeURIComponent(text)}`
  }

  const handleWebShare = async () => {
    const url = getShareUrl()
    if (navigator.share) {
      try {
        await navigator.share({ title: '플로로탄닌 정보', url })
      } catch { /* 취소 */ }
    } else {
      handleCopy()
    }
  }

  // 파트너 컨텍스트 없으면 표시 안 함 (본사 모드)
  if (!isPartner) return null

  const shareUrl = getShareUrl()

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-3 mb-4 flex items-center gap-2 text-sm">
        <span className="font-semibold text-teal-800 whitespace-nowrap">
          📎 내 추천 링크
        </span>
        <span className="flex-1 truncate text-gray-600 text-xs font-mono">
          {shareUrl.replace('https://', '')}
        </span>
        <button onClick={handleCopy}
          className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
          {copied ? <><CheckCircle2 className="w-3.5 h-3.5" /> 복사됨</> : <><Copy className="w-3.5 h-3.5" /> 복사</>}
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 border-2 border-teal-200 rounded-2xl p-4 md:p-5 mb-6 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <div className="bg-teal-600 text-white rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0">
          <Share2 className="w-4.5 h-4.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm md:text-base font-bold text-teal-900 mb-0.5">
            {partner.name} 님의 추천 링크
          </div>
          <div className="text-xs text-teal-700">
            이 페이지를 공유하시면 <strong>{partner.name}</strong> 파트너 추천으로 연결됩니다.
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-teal-200 px-3 py-2 mb-3 overflow-hidden">
        <div className="text-[11px] text-gray-400 mb-0.5">아래 주소가 자동 전달됩니다</div>
        <div className="font-mono text-xs md:text-sm text-gray-700 truncate">
          {shareUrl.replace('https://', '')}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={handleCopy}
          className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors">
          {copied ? <><CheckCircle2 className="w-4 h-4" /> 복사됨!</> : <><Copy className="w-4 h-4" /> 링크 복사</>}
        </button>
        <button onClick={handleSMS}
          className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors">
          <MessageCircle className="w-4 h-4" /> 문자로 보내기
        </button>
        {typeof navigator !== 'undefined' && navigator.share && (
          <button onClick={handleWebShare}
            className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors">
            <Share2 className="w-4 h-4" /> 카카오톡·기타
          </button>
        )}
      </div>

      <div className="mt-3 text-[11px] text-teal-700 leading-relaxed">
        ✅ 링크에 자동으로 <code className="bg-teal-100 px-1 rounded">?ref={partner.phone}</code>가 부착되어,
        손님이 어디서 보든 <strong>{partner.name}</strong> 파트너로 연결됩니다.
      </div>
    </div>
  )
}
