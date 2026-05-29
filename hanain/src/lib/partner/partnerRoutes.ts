const EXCLUDED_PREFIXES = [
  '/api',
  '/_next',
  '/assets',
  '/images',
]

const EXCLUDED_EXACT = new Set([
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/llms.txt',
  '/ai-sitemap.json',
])

const STATIC_EXT_RE = /\.(?:css|js|mjs|png|jpg|jpeg|gif|webp|svg|ico|txt|xml|json|map)$/i

const PARTNERABLE_PREFIXES = [
  '/',
  '/home',
  '/easy',
  '/blog',
  '/q',
  '/qa',
  '/category',
  '/insights',
  '/phlorotannin',
  '/learn',
  '/partner',
  '/consult',
  '/question/write',
  '/inforoom',
  '/glossary',
  '/copyright',
  '/safety',
  '/research-timeline',
  '/compare',
]

export function isExcludedPartnerPath(pathname) {
  if (!pathname) return true
  if (EXCLUDED_EXACT.has(pathname)) return true
  if (STATIC_EXT_RE.test(pathname)) return true
  return EXCLUDED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}

export function isPartnerablePath(pathname) {
  if (!pathname || isExcludedPartnerPath(pathname)) return false
  if (pathname.startsWith('/p/')) return true

  return PARTNERABLE_PREFIXES.some((prefix) => {
    if (prefix === '/') return pathname === '/'
    return pathname === prefix || pathname.startsWith(`${prefix}/`)
  })
}

export function getPartnerSlugFromPath(pathname) {
  const match = String(pathname || '').match(/^\/p\/([^/?#]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

export function stripPartnerPrefix(pathname) {
  if (!pathname) return '/'
  const match = String(pathname).match(/^\/p\/([^/?#]+)(\/.*)?$/)
  if (!match) return pathname
  return match[2] || '/'
}

export function partnerPathFor(pathname, partnerSlug) {
  if (!partnerSlug) return pathname
  const normalized = String(partnerSlug).trim().toLowerCase()
  if (!normalized) return pathname

  if (!pathname || pathname === '/') return `/p/${encodeURIComponent(normalized)}`
  if (pathname.startsWith(`/p/${encodeURIComponent(normalized)}`)) return pathname
  if (/^\/p\/[^/]+/.test(pathname)) return pathname
  if (!isPartnerablePath(pathname)) return pathname

  return `/p/${encodeURIComponent(normalized)}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}

export function departnerPath(pathname) {
  return stripPartnerPrefix(pathname)
}
