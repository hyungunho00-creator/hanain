import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { withRef } from '../../lib/partnerRef'
import { usePartner } from '../../context/PartnerContext'
import { trackPartnerEvent } from '../../lib/partner/partnerAnalytics'

function buildShareUrl(pathname, search, hash, partner) {
  const raw = `${pathname || '/'}${search || ''}${hash || ''}`
  const partnerized = withRef(raw, partner)
  if (/^https?:\/\//i.test(partnerized)) return partnerized
  return `https://phlorotannin.com${partnerized}`
}

export default function PartnerSharePanel() {
  const location = useLocation()
  const partner = usePartner()
  const [copied, setCopied] = useState(false)
  const partnerSlug = partner?.partnerSlug || partner?.slug || partner?.id || null

  const shareUrl = useMemo(
    () => buildShareUrl(location.pathname, location.search, location.hash, partner),
    [location.pathname, location.search, location.hash, partner]
  )

  const onCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    trackPartnerEvent('partner_copy_link', {
      partnerSlug,
      pagePath: `${location.pathname}${location.search || ''}`,
    })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const onWebShare = async () => {
    trackPartnerEvent('partner_share_click', {
      partnerSlug,
      contentType: 'web_share',
      pagePath: `${location.pathname}${location.search || ''}`,
    })

    if (navigator.share) {
      await navigator.share({
        title: partner?.shareTitle || '플로로탄닌 건강정보 아카이브',
        text: partner?.shareDescription || '플로로탄닌 파트너스 공식 아카이브 기반 자료',
        url: shareUrl,
      })
      return
    }

    await onCopy()
  }

  const onSms = () => {
    trackPartnerEvent('partner_share_click', {
      partnerSlug,
      contentType: 'sms_share',
      pagePath: `${location.pathname}${location.search || ''}`,
    })
    const text = encodeURIComponent(`${partner?.displayName || partner?.name || '파트너'} 공유 링크\n${shareUrl}`)
    window.location.href = `sms:?body=${text}`
  }

  const onKakao = () => {
    trackPartnerEvent('partner_share_click', {
      partnerSlug,
      contentType: 'kakao_share',
      pagePath: `${location.pathname}${location.search || ''}`,
    })
    window.open(`https://story.kakao.com/share?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="text-sm font-semibold text-gray-900 mb-2">공유</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <button onClick={onCopy} className="px-3 py-2 rounded-md border border-gray-200 hover:border-gray-400 text-left">
          파트너 정보 포함 링크 복사 {copied ? '완료' : ''}
        </button>
        <button onClick={onKakao} className="px-3 py-2 rounded-md border border-gray-200 hover:border-gray-400 text-left">
          카카오톡 공유
        </button>
        <button onClick={onSms} className="px-3 py-2 rounded-md border border-gray-200 hover:border-gray-400 text-left">
          문자로 공유
        </button>
        <button onClick={onWebShare} className="px-3 py-2 rounded-md border border-gray-200 hover:border-gray-400 text-left">
          현재 글 공유
        </button>
        <button onClick={onCopy} className="px-3 py-2 rounded-md border border-gray-200 hover:border-gray-400 text-left sm:col-span-2">
          명함 함께 공유
        </button>
      </div>
    </section>
  )
}
