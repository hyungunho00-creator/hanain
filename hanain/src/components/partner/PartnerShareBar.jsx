// ───────────────────────────────────────────────────────────────
// hanain/src/components/partner/PartnerShareBar.jsx
// 중립 톤 공유 위젯 — 손님 친화 디자인.
//
// 디자인 원칙:
//   - 화면에는 파트너 이름·전화·"추천" 단어 등 네트워크 느낌 표기 절대 없음.
//   - 평범한 블로그 "공유" 버튼처럼 보임 ("최신 정보 공유 가능합니다").
//   - 내부적으로는 클릭 시 자동으로 ?ref=<phone>가 부착된 링크가 복사/전송됨.
//
// 백그라운드 인프라:
//   1) 파트너 컨텍스트가 활성(본사 기본 아님)이면 노출.
//   2) 진입 시 주소창 URL을 ?ref=<phone>으로 silent 동기화 (history.replaceState).
//      → 손님이 브라우저 주소창을 직접 복사해도 ref가 유지되어 본사로 새지 않음.
//
// 사용처: BlogPage (목록 상단), BlogPostPage (글 상단).
// 외부 의존성: usePartner(), DEFAULT_PARTNER, withRef().
// ───────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Copy, MessageCircle, Share2, CheckCircle2 } from 'lucide-react'
import { usePartner, DEFAULT_PARTNER } from '../../context/PartnerContext'
import { withRef } from '../../lib/partnerRef'

export default function PartnerShareBar() {
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

  // ─────────────────────────────────────────────────────────
  // 중립 디자인:
  //   - 파트너 이름·전화·"추천" 등 네트워크 느낌 단어 전부 제거
  //   - 정보성 톤("최신 정보 공유 가능합니다")
  //   - 손님이 봐도 그냥 평범한 블로그 공유 위젯처럼 보임
  //   - 내부적으로는 여전히 ?ref=<phone> 자동 부착 (handleCopy/SMS/Share)
  // ─────────────────────────────────────────────────────────
  const hasWebShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  return (
    <div className="flex items-center justify-between gap-3 border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 mb-5">
      <div className="flex items-center gap-2 text-sm text-gray-600 min-w-0">
        <Share2 className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <span className="truncate">최신 정보 공유 가능합니다</span>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={handleCopy}
          aria-label="링크 복사"
          title="링크 복사"
          className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors"
        >
          {copied ? (
            <><CheckCircle2 className="w-3.5 h-3.5 text-gray-900" /><span className="hidden sm:inline">복사됨</span></>
          ) : (
            <><Copy className="w-3.5 h-3.5" /><span className="hidden sm:inline">링크</span></>
          )}
        </button>
        <button
          onClick={handleSMS}
          aria-label="문자로 보내기"
          title="문자로 보내기"
          className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">문자</span>
        </button>
        {hasWebShare && (
          <button
            onClick={handleWebShare}
            aria-label="공유"
            title="공유"
            className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">공유</span>
          </button>
        )}
      </div>
    </div>
  )
}
