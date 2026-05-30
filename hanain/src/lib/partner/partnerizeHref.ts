import { normalizePartnerSlug } from './normalizePartnerSlug'
import { isExcludedPartnerPath, partnerPathFor } from './partnerRoutes'

const INTERNAL_HOSTS = new Set(['phlorotannin.com', 'www.phlorotannin.com'])

function isExternalScheme(href) {
  return /^(mailto:|tel:|sms:|kakaotalk:|intent:|javascript:|#)/i.test(href)
}

function normalizeSlug(value) {
  return normalizePartnerSlug(value)
}

function extractSlug(input) {
  if (!input) return null
  if (typeof input === 'string') return normalizeSlug(input)

  const candidate =
    input.partnerSlug ||
    input.slug ||
    input.id ||
    input.phone ||
    input.partner?.slug ||
    input.partner?.phone

  return normalizeSlug(candidate)
}

function toURL(href) {
  const base = typeof window !== 'undefined' ? window.location.origin : 'https://phlorotannin.com'
  try {
    return new URL(href, base)
  } catch {
    return null
  }
}

export function partnerizeHref(href, partnerLike) {
  if (!href || typeof href !== 'string') return href
  if (isExternalScheme(href)) return href

  const partnerSlug = extractSlug(partnerLike)
  if (!partnerSlug) return href

  const u = toURL(href)
  if (!u) return href

  const isAbsolute = /^[a-z]+:\/\//i.test(href)
  const isInternal = !isAbsolute || INTERNAL_HOSTS.has(u.hostname)
  if (!isInternal) return href

  const nextPath = partnerPathFor(u.pathname, partnerSlug)
  if (isExcludedPartnerPath(nextPath)) return href

  if (isAbsolute) {
    u.pathname = nextPath
    return u.toString()
  }

  return `${nextPath}${u.search}${u.hash}`
}

export default partnerizeHref
