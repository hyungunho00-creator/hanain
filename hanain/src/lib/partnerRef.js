import partnerizeHref from './partner/partnerizeHref'
import { normalizePartnerSlug } from './partner/normalizePartnerSlug'

const DEFAULT_PHONE = '01056528206'

export function isValidRefSlug(slug) {
  if (!slug || typeof slug !== 'string') return false
  const normalized = normalizePartnerSlug(slug)
  return Boolean(normalized)
}

export function extractRefFromUrl(rawUrl) {
  try {
    const u = rawUrl
      ? new URL(rawUrl, typeof window !== 'undefined' ? window.location.origin : 'https://phlorotannin.com')
      : (typeof window !== 'undefined' ? new URL(window.location.href) : null)
    if (!u) return null
    return normalizePartnerSlug(u.searchParams.get('pt') || u.searchParams.get('ref'))
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

  const normalized = normalizePartnerSlug(slug)
  if (!normalized) return null
  if (normalized === DEFAULT_PHONE) return null
  return normalized
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
