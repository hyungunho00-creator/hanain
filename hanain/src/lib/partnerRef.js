import partnerizeHref from './partner/partnerizeHref'

const DEFAULT_PHONE = '01056528206'

export function isValidRefSlug(slug) {
  if (!slug || typeof slug !== 'string') return false
  return /^[a-z0-9_-]{2,64}$/.test(slug) || /^\d{9,11}$/.test(slug)
}

export function extractRefFromUrl(rawUrl) {
  try {
    const u = rawUrl
      ? new URL(rawUrl, typeof window !== 'undefined' ? window.location.origin : 'https://phlorotannin.com')
      : (typeof window !== 'undefined' ? new URL(window.location.href) : null)
    if (!u) return null
    const r = u.searchParams.get('pt') || u.searchParams.get('ref')
    return isValidRefSlug(r || '') ? String(r).toLowerCase() : null
  } catch {
    return null
  }
}

function extractPartnerSlug(partner) {
  if (!partner) return null

  const slug =
    partner.partnerSlug ||
    partner.slug ||
    partner.id ||
    partner.phone ||
    partner.partner?.slug ||
    partner.partner?.phone ||
    null

  if (!slug) return null

  const value = String(slug).trim().toLowerCase()
  if (!value) return null
  if (value === DEFAULT_PHONE) return null
  return value
}

export function withRef(href, partner) {
  const slug = extractPartnerSlug(partner)
  if (!slug) return href
  return partnerizeHref(href, slug)
}

export function stripRefFromUrl(rawUrl) {
  try {
    const u = new URL(rawUrl, typeof window !== 'undefined' ? window.location.origin : 'https://phlorotannin.com')
    u.searchParams.delete('ref')
    u.searchParams.delete('pt')
    return u.toString()
  } catch {
    return rawUrl
  }
}
