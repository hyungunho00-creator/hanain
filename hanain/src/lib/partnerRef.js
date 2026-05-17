// ───────────────────────────────────────────────────────────────────────────
// hanain/src/lib/partnerRef.js
// 파트너 컨텍스트를 같은 도메인 내부 링크에 ?ref=<slug>로 전파.
// 외부 도메인/이미 ref 있음/DEFAULT 파트너인 경우는 무시.
// SEO 안전장치: canonical은 api/seo.js + SEOHead 측에서 ref 없는 URL로 고정.
// 비활성 토글: window.__PARTNER_REF_DISABLED__ = true 또는 빌드 env로 끌 수 있음.
// ───────────────────────────────────────────────────────────────────────────

// 본사 기본 파트너의 phone (PartnerContext.DEFAULT_PARTNER.phone과 같아야 함)
const DEFAULT_PHONE = '01056528206'

// ref 값이 유효한 partner slug 형태인지 검증 (전화번호 9~11자리 숫자)
export function isValidRefSlug(slug) {
  if (!slug || typeof slug !== 'string') return false
  return /^\d{9,11}$/.test(slug)
}

// 현재 URL 또는 임의 URL에서 ref 파라미터를 안전하게 추출
export function extractRefFromUrl(rawUrl) {
  try {
    const u = rawUrl
      ? new URL(rawUrl, typeof window !== 'undefined' ? window.location.origin : 'https://phlorotannin.com')
      : (typeof window !== 'undefined' ? new URL(window.location.href) : null)
    if (!u) return null
    const r = u.searchParams.get('ref')
    return isValidRefSlug(r) ? r : null
  } catch {
    return null
  }
}

// 내부 링크인지 판정 — 상대경로 또는 phlorotannin.com 절대경로
function isInternalHref(href) {
  if (!href || typeof href !== 'string') return false
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('sms:')) return false
  if (href.startsWith('/')) return true
  try {
    const u = new URL(href)
    return u.hostname === 'phlorotannin.com' || u.hostname === 'www.phlorotannin.com'
  } catch {
    // 상대 경로 (path/foo) — 내부로 본다
    return true
  }
}

// 파트너 컨텍스트를 내부 링크 URL에 ?ref=<slug>로 부착
// - href: 부착 대상 URL (절대/상대 모두 가능)
// - partner: usePartner() 반환값 ({ phone, id, ... })
// 부착 규칙:
//   1) partner 없음 / DEFAULT_PHONE → 부착 안 함
//   2) 외부 도메인 → 부착 안 함
//   3) tel:/sms:/mailto:/anchor → 부착 안 함
//   4) 이미 ?ref= 있음 → 그대로 (덮어쓰지 않음)
//   5) 비활성 토글 켜져 있음 → 부착 안 함
export function withRef(href, partner) {
  try {
    if (typeof window !== 'undefined' && window.__PARTNER_REF_DISABLED__ === true) return href
    if (!href) return href
    if (!isInternalHref(href)) return href
    if (!partner || !partner.phone) return href

    const partnerPhone = String(partner.phone).replace(/\D/g, '')
    if (!isValidRefSlug(partnerPhone)) return href
    if (partnerPhone === DEFAULT_PHONE) return href  // 본사 기본은 안 붙임

    // 절대/상대 URL 모두 처리
    const isAbsolute = /^https?:\/\//i.test(href)
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://phlorotannin.com'
    const u = new URL(href, base)

    // 같은 도메인 외부면 (예: 외부 phlorotannin이 아닌 곳) 부착 안 함
    if (isAbsolute) {
      if (u.hostname !== 'phlorotannin.com' && u.hostname !== 'www.phlorotannin.com') return href
    }

    // /p/:phone 경로 자체에는 부착 의미 없음 (이미 컨텍스트 보유)
    if (/^\/p\/\d{9,11}/.test(u.pathname)) {
      // 이미 ref가 있으면 유지, 없으면 굳이 추가 안 함
      return href
    }

    // 이미 ref가 있으면 그대로 둔다 (다른 파트너 ref가 우연히 들어 있을 수 있음)
    if (u.searchParams.has('ref')) return href

    u.searchParams.set('ref', partnerPhone)

    // 원본이 상대 경로였으면 다시 상대로 반환
    if (!isAbsolute) {
      return u.pathname + (u.search ? u.search : '') + (u.hash || '')
    }
    return u.toString()
  } catch {
    return href
  }
}

// 현재 URL에서 ref 파라미터를 제거한 깨끗한 URL을 반환 (canonical/공유 URL 가공용)
export function stripRefFromUrl(rawUrl) {
  try {
    const u = new URL(rawUrl, typeof window !== 'undefined' ? window.location.origin : 'https://phlorotannin.com')
    u.searchParams.delete('ref')
    return u.toString()
  } catch {
    return rawUrl
  }
}
