import { createContext, useContext, useState, useEffect } from 'react'

// ───────────────────────────────────────────
// 기본값 (본사 번호)
// ───────────────────────────────────────────
const DEFAULT_PARTNER = {
  id: '',
  name: '플로로탄닌 파트너스',
  phone: '01056528206',
  phoneDisplay: '010-5652-8206',
  prefix: '',
}

const SESSION_KEY = 'phlorotannin_active_partner'

const PartnerContext = createContext(DEFAULT_PARTNER)

// ───────────────────────────────────────────
// 1순위: URL 경로 /p/전화번호 에서 파트너 번호 추출
// → 전자명함 페이지 자체 + 이후 이동한 페이지 모두 커버
// ───────────────────────────────────────────
function getPhoneFromPath() {
  const m = window.location.pathname.match(/^\/p\/(\d{9,11})/)
  return m ? m[1] : null
}

// ───────────────────────────────────────────
// 2순위: index.html에 주입된 window._PARTNER_CONFIG 읽기
// ───────────────────────────────────────────
function getPartnerFromWindowConfig() {
  try {
    const cfg = window._PARTNER_CONFIG
    if (cfg && cfg.phone && cfg.slug) {
      return {
        id: cfg.slug,
        name: cfg.name || '플로로탄닌 파트너스',
        phone: cfg.phone,
        phoneDisplay: cfg.display || cfg.phone,
        prefix: '',
      }
    }
  } catch { /* 무시 */ }
  return null
}

// ───────────────────────────────────────────
// 3순위: 호스트명에서 파트너 슬러그 추출
// ───────────────────────────────────────────
function getPartnerSlugFromHost() {
  const host = window.location.hostname
  if (host === 'phlorotannin.com' || host === 'www.phlorotannin.com') return null
  if (host === 'localhost' || host === '127.0.0.1') return null
  const m = host.match(/^hanain-(.+?)(?:-[a-z0-9]{8,})?\.vercel\.app$/)
  if (m) return m[1]
  return null
}

// ───────────────────────────────────────────
// 4순위: sessionStorage에서 파트너 정보 읽기
// ───────────────────────────────────────────
function getPartnerFromSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const p = JSON.parse(raw)
    if (p && p.phone) return p
  } catch { /* 무시 */ }
  return null
}

// ───────────────────────────────────────────
// sessionStorage에 파트너 정보 저장 (공개 함수)
// ───────────────────────────────────────────
export function savePartnerToSession(partnerData) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(partnerData))
  } catch { /* 무시 */ }
}

export function clearPartnerSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch { /* 무시 */ }
}

// ───────────────────────────────────────────
// partners.json에서 전화번호로 파트너 로드
// ───────────────────────────────────────────
async function fetchPartnerByPhone(phone) {
  try {
    const MAIN_SITE = 'https://phlorotannin.com'
    const resp = await fetch(`${MAIN_SITE}/partners.json?t=${Date.now()}`, { cache: 'no-store' })
    if (!resp.ok) return null
    const data = await resp.json()
    const digits = phone.replace(/\D/g, '')
    return (data.partners || []).find(p => p.phone?.replace(/\D/g, '') === digits) || null
  } catch {
    return null
  }
}

// ───────────────────────────────────────────
// partners.json에서 slug로 파트너 로드
// ───────────────────────────────────────────
async function fetchPartnerBySlug(slug) {
  try {
    const MAIN_SITE = 'https://phlorotannin.com'
    const resp = await fetch(`${MAIN_SITE}/partners.json?t=${Date.now()}`, { cache: 'no-store' })
    if (!resp.ok) return null
    const data = await resp.json()
    return (data.partners || []).find(p => p.slug === slug) || null
  } catch {
    return null
  }
}

export { DEFAULT_PARTNER }

export function PartnerProvider({ children }) {
  // 초기값: sessionStorage → DEFAULT 순 (깜빡임 방지용)
  const [partner, setPartner] = useState(() => {
    return getPartnerFromWindowConfig() || getPartnerFromSession() || DEFAULT_PARTNER
  })

  useEffect(() => {
    // ① URL /p/전화번호 → 가장 우선
    const phoneFromPath = getPhoneFromPath()
    if (phoneFromPath) {
      fetchPartnerByPhone(phoneFromPath).then(found => {
        if (found) {
          const p = {
            id: found.slug,
            name: found.name,
            phone: found.phone,
            phoneDisplay: found.phoneDisplay,
            prefix: '',
          }
          setPartner(p)
          savePartnerToSession(p)   // 이후 다른 페이지로 이동해도 유지
        }
      })
      return
    }

    // ② window._PARTNER_CONFIG (구형 Vercel 파트너 사이트 호환)
    const fromWindow = getPartnerFromWindowConfig()
    if (fromWindow) {
      setPartner(fromWindow)
      return
    }

    // ③ 호스트명 슬러그
    const slug = getPartnerSlugFromHost()
    if (slug) {
      fetchPartnerBySlug(slug).then(found => {
        if (found) {
          setPartner({
            id: found.slug,
            name: found.name,
            phone: found.phone,
            phoneDisplay: found.phoneDisplay,
            prefix: '',
          })
        }
      })
      return
    }

    // ④ sessionStorage (명함 → 다른 페이지로 이동한 경우)
    const fromSession = getPartnerFromSession()
    if (fromSession) {
      setPartner(fromSession)
      return
    }

    // 아무것도 없으면 DEFAULT 유지
  }, [])

  return (
    <PartnerContext.Provider value={partner}>
      {children}
    </PartnerContext.Provider>
  )
}

export function usePartner() {
  return useContext(PartnerContext)
}

export function urlSafeBase64Encode(str) {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}
