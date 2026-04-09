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
// 호스트명에서 파트너 슬러그 추출
// 예) hanain-hong-abc123.vercel.app → hong-abc123
//     phlorotannin.com → null (본사)
// ───────────────────────────────────────────
function getPartnerSlugFromHost() {
  const host = window.location.hostname
  // 본사 도메인이면 null
  if (host === 'phlorotannin.com' || host === 'www.phlorotannin.com') return null
  if (host === 'localhost' || host === '127.0.0.1') return null
  // hanain-{slug}.vercel.app 또는 hanain-{slug}-xxx.vercel.app 형태
  // 프로젝트명: hanain-{slug}
  const m = host.match(/^hanain-([^.]+)(?:-[a-z0-9]+)?\.vercel\.app$/) ||
            host.match(/^hanain-([^-]+-[^.]+?)(?:-\w+)?\.vercel\.app$/)
  if (m) return m[1]
  return null
}

// ───────────────────────────────────────────
// partners.json에서 파트너 정보 로드
// ───────────────────────────────────────────
async function fetchPartnerBySlug(slug) {
  try {
    // 항상 본사 phlorotannin.com에서 최신 partners.json 로드
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
  const [partner, setPartner] = useState(DEFAULT_PARTNER)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

  // 로딩 중에도 기본값으로 렌더링 (번쩍임 없음)
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
