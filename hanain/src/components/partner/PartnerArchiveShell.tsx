import { useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { usePartner } from '../../context/PartnerContext'
import { withRef } from '../../lib/partnerRef'
import { isPartnerablePath, stripPartnerPrefix } from '../../lib/partner/partnerRoutes'
import { trackPartnerEvent } from '../../lib/partner/partnerAnalytics'

function isActivePartner(partner: any) {
  const slug = partner?.partnerSlug || partner?.slug || partner?.id || null
  return Boolean(partner?.isPartnerContext && slug)
}

export default function PartnerArchiveShell({ position = 'top' }: { position?: 'top' | 'bottom' }) {
  const partner = usePartner()
  const location = useLocation()
  const active = isActivePartner(partner)
  const partnerSlug = partner?.partnerSlug || partner?.slug || partner?.id || null
  const logicalPath = stripPartnerPrefix(location.pathname || '/')
  const isPartnerCardRoot = active && partnerSlug && logicalPath === '/'

  const shouldShow = active && partnerSlug && !isPartnerCardRoot && isPartnerablePath(logicalPath)

  useEffect(() => {
    if (!shouldShow || position !== 'top') return
    trackPartnerEvent('partner_archive_view', {
      partnerSlug,
      pagePath: `${location.pathname}${location.search || ''}`,
    })
  }, [shouldShow, position, partnerSlug, location.pathname, location.search])

  useEffect(() => {
    if (!shouldShow || position !== 'top' || typeof document === 'undefined') return

    const currentUrl = `${window.location.origin}${location.pathname}${location.search || ''}${location.hash || ''}`

    let ogUrl = document.querySelector('meta[property="og:url"]')
    if (!ogUrl) {
      ogUrl = document.createElement('meta')
      ogUrl.setAttribute('property', 'og:url')
      document.head.appendChild(ogUrl)
    }
    ogUrl.setAttribute('content', currentUrl)

    if (location.pathname.startsWith('/p/')) {
      let robots = document.querySelector('meta[name="robots"]')
      if (!robots) {
        robots = document.createElement('meta')
        robots.setAttribute('name', 'robots')
        document.head.appendChild(robots)
      }
      robots.setAttribute('content', 'noindex, follow')
    }
  }, [shouldShow, position, location.pathname, location.search, location.hash])

  useEffect(() => {
    if (!shouldShow || position !== 'bottom') return
    const root = document.documentElement
    const prev = root.style.getPropertyValue('--partner-sticky-offset')
    root.style.setProperty('--partner-sticky-offset', '88px')
    return () => {
      if (prev) root.style.setProperty('--partner-sticky-offset', prev)
      else root.style.removeProperty('--partner-sticky-offset')
    }
  }, [shouldShow, position])

  const label = useMemo(
    () => partner?.displayName || partner?.name || '파트너',
    [partner?.displayName, partner?.name]
  )

  if (!shouldShow) return null

  if (position === 'top') {
    return null
  }

  return (
    <>
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5">
          <p className="text-sm font-semibold text-gray-900">이 자료를 공유한 파트너</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-700">
            <span>{label}</span>
            {partner?.region ? <span className="text-gray-500">{partner.region}</span> : null}
            {partner?.phone ? <a href={`tel:${partner.phone}`} className="underline underline-offset-2">전화</a> : null}
            {partner?.sms ? <a href={`sms:${partner.sms}`} className="underline underline-offset-2">문자</a> : null}
            <Link to={withRef('/', partner)} className="underline underline-offset-2">명함 보기</Link>
          </div>
          <p className="mt-2 text-xs text-gray-500">공식 자료 출처: Phlorotannin Partners Archive</p>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-teal-200 bg-white/95 px-3 py-2 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-xs text-gray-500">공유 파트너</p>
            <p className="truncate text-sm font-semibold text-gray-900">{label}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            {partner?.phone ? <a href={`tel:${partner.phone}`} className="rounded-md border border-gray-200 px-2 py-1">전화</a> : null}
            {partner?.sms ? <a href={`sms:${partner.sms}`} className="rounded-md border border-gray-200 px-2 py-1">문자</a> : null}
            {partner?.kakaoUrl ? <a href={partner.kakaoUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-gray-200 px-2 py-1">카카오</a> : null}
            <Link to={withRef('/', partner)} className="rounded-md border border-gray-200 px-2 py-1">명함</Link>
          </div>
        </div>
      </div>
    </>
  )
}
