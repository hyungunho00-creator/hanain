import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isExcludedPartnerPath, partnerPathFor } from '../lib/partner/partnerRoutes'
import {
  persistPartnerSlug,
  readPersistedPartnerSlug,
  PARTNER_STORAGE_KEY,
} from '../lib/partner/partnerStorage'
import { resolvePartnerCandidate } from '../lib/partner/resolvePartner'
import { trackPartnerEvent } from '../lib/partner/partnerAnalytics'

export const DEFAULT_PARTNER = {
  id: '',
  slug: '',
  partnerSlug: '',
  name: '플로로탄닌 파트너스',
  displayName: '플로로탄닌 파트너스',
  roleLabel: '플로로탄닌 건강정보 아카이브',
  phone: '01056528206',
  phoneDisplay: '010-5652-8206',
  sms: '01056528206',
  kakaoUrl: '',
  naverCafeUrl: 'https://cafe.naver.com/phlorotannin',
  bandUrl: 'https://band.us/n/a6aebc75vch6U',
  prefix: '',
  region: '',
  verified: false,
  isPartnerContext: false,
}

const SESSION_KEY = 'phlorotannin_active_partner'
const PartnerContext = createContext(DEFAULT_PARTNER)

export function savePartnerToSession(partnerData) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(partnerData))
  } catch {
    // ignore
  }
}

export function clearPartnerSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY)
    localStorage.removeItem(PARTNER_STORAGE_KEY)
  } catch {
    // ignore
  }
}

function readPartnerFromSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed || null
  } catch {
    return null
  }
}

function adaptResolvedPartner(partner) {
  if (!partner) return DEFAULT_PARTNER

  const phone = String(partner.phone || '').replace(/\D/g, '')
  const phoneDisplay = partner.phoneDisplay || (phone.length === 11
    ? `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`
    : phone)

  return {
    ...DEFAULT_PARTNER,
    ...partner,
    id: partner.slug,
    slug: partner.slug,
    partnerSlug: partner.slug,
    name: partner.name || partner.displayName || partner.slug,
    displayName: partner.displayName || partner.name || partner.slug,
    phone,
    phoneDisplay,
    sms: partner.sms || phone,
    isPartnerContext: true,
  }
}

export function PartnerProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [partner, setPartner] = useState(() => readPartnerFromSession() || DEFAULT_PARTNER)
  const lastPartnerSlugRef = useRef(partner?.partnerSlug || partner?.slug || null)

  useEffect(() => {
    let mounted = true

    async function syncPartner() {
      const persistedSlug = readPersistedPartnerSlug()
      const resolved = await resolvePartnerCandidate({
        pathname: location.pathname,
        search: location.search,
        persistedSlug,
      })

      if (!mounted) return

      if (!resolved.partner) {
        if (lastPartnerSlugRef.current && !isExcludedPartnerPath(location.pathname)) {
          trackPartnerEvent('partner_context_lost', {
            partnerSlug: lastPartnerSlugRef.current,
            pagePath: `${location.pathname}${location.search || ''}`,
          })
        }
        lastPartnerSlugRef.current = null
        setPartner(DEFAULT_PARTNER)
        return
      }

      const nextPartner = adaptResolvedPartner(resolved.partner)
      setPartner(nextPartner)
      savePartnerToSession(nextPartner)
      persistPartnerSlug(nextPartner.slug)
      lastPartnerSlugRef.current = nextPartner.slug

      if (resolved.source === 'storage') {
        trackPartnerEvent('partner_context_restored', {
          partnerSlug: nextPartner.slug,
          pagePath: `${location.pathname}${location.search || ''}`,
        })
      }

      if (
        location.pathname &&
        !location.pathname.startsWith('/p/') &&
        !isExcludedPartnerPath(location.pathname)
      ) {
        const targetPath = partnerPathFor(location.pathname, nextPartner.slug)
        if (targetPath !== location.pathname) {
          let search = location.search || ''
          try {
            const sp = new URLSearchParams(search)
            sp.delete('pt')
            sp.delete('ref')
            const nextSearch = sp.toString()
            search = nextSearch ? `?${nextSearch}` : ''
          } catch {
            // ignore
          }
          navigate(`${targetPath}${search}${location.hash}`, { replace: true })
        }
      }
    }

    syncPartner()
    return () => { mounted = false }
  }, [location.pathname, location.search, location.hash, navigate])

  const value = useMemo(() => partner, [partner])

  return (
    <PartnerContext.Provider value={value}>
      {children}
    </PartnerContext.Provider>
  )
}

export function usePartner() {
  return useContext(PartnerContext)
}

export function urlSafeBase64Encode(str) {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}
