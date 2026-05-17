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
// 1.5순위: URL ?ref=<slug> 쿼리에서 파트너 번호 추출
// → 파트너가 블로그 글 URL을 손님에게 공유했을 때 컨텍스트 복원용
// ───────────────────────────────────────────
function getPhoneFromRef() {
  try {
    const sp = new URLSearchParams(window.location.search)
    const r = sp.get('ref')
    if (r && /^\d{9,11}$/.test(r)) return r
  } catch { /* 무시 */ }
  return null
}

// ───────────────────────────────────────────
// 2순위: sessionStorage에서 파트너 정보 읽기
// (명함 → 다른 페이지로 이동한 경우 컨텍스트 유지용)
//
// ※ 폐기된 분기 (PARTNER_URL_POLICY.md 참조):
//   - getPartnerFromWindowConfig (구형 vercel.app 별도 사이트용)
//   - getPartnerSlugFromHost (구형 hanain-<slug>.vercel.app 서브도메인용)
//   → 현재 모든 파트너(29명)는 phlorotannin.com/p/<phone> 단일 방식 사용
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
// Phase 2: Supabase partners 테이블 1순위 / JSON fallback
// ───────────────────────────────────────────
const _SB_URL_PARTNERS = 'https://rlfxuyeoluoeaxuujtly.supabase.co'
const _SB_ANON_PARTNERS = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck'

function _adaptPartner(r) {
  if (!r) return null
  return {
    slug: r.slug,
    name: r.name,
    phone: r.phone,
    phoneDisplay: r.phone_display,
    siteUrl: r.site_url,
    memo: r.memo || '',
    createdAt: r.created_at,
  }
}

async function _fetchFromTable(filter) {
  try {
    const url = `${_SB_URL_PARTNERS}/rest/v1/partners?select=slug,phone,name,phone_display,site_url,memo,created_at&status=eq.active&${filter}&limit=1`
    const resp = await fetch(url, {
      headers: {
        apikey: _SB_ANON_PARTNERS,
        Authorization: `Bearer ${_SB_ANON_PARTNERS}`,
        'Accept-Profile': 'public',
      },
    })
    if (!resp.ok) return null
    const rows = await resp.json()
    if (!Array.isArray(rows) || rows.length === 0) return null
    return _adaptPartner(rows[0])
  } catch { return null }
}

// ───────────────────────────────────────────
// 전화번호로 파트너 로드 (테이블 → JSON fallback)
// ───────────────────────────────────────────
async function fetchPartnerByPhone(phone) {
  const digits = phone.replace(/\D/g, '')
  const fromTable = await _fetchFromTable(`or=(phone.eq.${digits},slug.eq.${digits})`)
  if (fromTable) return fromTable

  try {
    const MAIN_SITE = 'https://phlorotannin.com'
    const resp = await fetch(`${MAIN_SITE}/partners.json?t=${Date.now()}`, { cache: 'no-store' })
    if (!resp.ok) return null
    const data = await resp.json()
    return (data.partners || []).find(p => p.phone?.replace(/\D/g, '') === digits) || null
  } catch {
    return null
  }
}

export { DEFAULT_PARTNER }

export function PartnerProvider({ children }) {
  // 초기값: sessionStorage → DEFAULT 순 (깜빡임 방지용)
  const [partner, setPartner] = useState(() => {
    return getPartnerFromSession() || DEFAULT_PARTNER
  })

  useEffect(() => {
    // ① URL /p/전화번호 → 가장 우선
    const phoneFromPath = getPhoneFromPath()
    if (phoneFromPath) {
      fetchPartnerByPhone(phoneFromPath).then(found => {
        if (found) {
          const rawPhone = found.phone?.replace(/\D/g, '') || ''
          const fallbackDisplay = rawPhone.length === 11
            ? `${rawPhone.slice(0,3)}-${rawPhone.slice(3,7)}-${rawPhone.slice(7)}`
            : rawPhone
          const p = {
            id: found.slug,
            name: found.name,
            phone: rawPhone,
            phoneDisplay: found.phoneDisplay || fallbackDisplay,
            prefix: '',
          }
          setPartner(p)
          savePartnerToSession(p)   // 이후 다른 페이지로 이동해도 유지
        }
      })
      return
    }

    // ①.5 URL ?ref=<slug> (파트너가 블로그 글을 공유한 경우 컨텍스트 복원)
    const phoneFromRef = getPhoneFromRef()
    if (phoneFromRef) {
      fetchPartnerByPhone(phoneFromRef).then(found => {
        if (found) {
          const rawPhone = found.phone?.replace(/\D/g, '') || ''
          const fallbackDisplay = rawPhone.length === 11
            ? `${rawPhone.slice(0,3)}-${rawPhone.slice(3,7)}-${rawPhone.slice(7)}`
            : rawPhone
          const p = {
            id: found.slug,
            name: found.name,
            phone: rawPhone,
            phoneDisplay: found.phoneDisplay || fallbackDisplay,
            prefix: '',
          }
          setPartner(p)
          savePartnerToSession(p)
        }
      })
      return
    }

    // ② sessionStorage (명함 → 다른 페이지로 이동한 경우)
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
