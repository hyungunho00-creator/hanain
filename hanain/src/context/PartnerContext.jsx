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

const PartnerContext = createContext(DEFAULT_PARTNER)

// ───────────────────────────────────────────
// 1순위: index.html에 주입된 window._PARTNER_CONFIG 읽기
//   <script>window._PARTNER_CONFIG={phone:"...",display:"...",name:"...",slug:"..."}</script>
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
// 2순위: 호스트명에서 파트너 슬러그 추출
// 예) hanain-hong-abc123.vercel.app → hong-abc123
//     phlorotannin.com → null (본사)
// ───────────────────────────────────────────
function getPartnerSlugFromHost() {
  const host = window.location.hostname
  // 본사 도메인이면 null
  if (host === 'phlorotannin.com' || host === 'www.phlorotannin.com') return null
  if (host === 'localhost' || host === '127.0.0.1') return null

  // hanain-{slug}.vercel.app 패턴 (슬러그에 하이픈 포함 가능)
  // ex) hanain-hong-gil-dong-abc123.vercel.app
  // 프로젝트명 전체가 hanain-{slug}이고 .vercel.app 앞에 배포ID(-xxx)가 붙을 수 있음
  const m = host.match(/^hanain-(.+?)(?:-[a-z0-9]{8,})?\.vercel\.app$/)
  if (m) return m[1]
  return null
}

// ───────────────────────────────────────────
// partners.json에서 파트너 정보 로드
// ───────────────────────────────────────────
async function fetchPartnerBySlug(slug) {
  try {
    const MAIN_SITE = 'https://phlorotannin.com'
    const resp = await fetch(`${MAIN_SITE}/partners.json?t=${Date.now()}`, {
      cache: 'no-store',
    })
    if (!resp.ok) return null
    const data = await resp.json()
    const list = data.partners || []
    return list.find(p => p.slug === slug) || null
  } catch {
    return null
  }
}

export { DEFAULT_PARTNER }

export function PartnerProvider({ children }) {
  const [partner, setPartner] = useState(() => {
    // 초기값: window._PARTNER_CONFIG 우선 읽기 (깜빡임 방지)
    return getPartnerFromWindowConfig() || DEFAULT_PARTNER
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1순위: window._PARTNER_CONFIG 주입값 있으면 바로 사용
    const fromWindow = getPartnerFromWindowConfig()
    if (fromWindow) {
      setPartner(fromWindow)
      setLoading(false)
      return
    }

    // 2순위: 호스트명 슬러그 → partners.json 조회
    const slug = getPartnerSlugFromHost()
    if (!slug) {
      setLoading(false)
      return
    }
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
      setLoading(false)
    })
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

// AdminPage에서 사용
export function urlSafeBase64Encode(str) {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}
