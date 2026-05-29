import { findPartnerBySlug, normalizePartnerSlug } from '../../data/partners'

function normalizePhone(raw) {
  if (!raw) return null
  const digits = String(raw).replace(/\D/g, '')
  return digits || null
}

function phoneDisplay(raw) {
  const digits = normalizePhone(raw)
  if (!digits) return ''
  if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  return digits
}

function adaptPublicPartner(item) {
  if (!item) return null
  const slug = normalizePartnerSlug(item.slug || item.id || item.phone)
  if (!slug) return null

  const phone = normalizePhone(item.phone || item.sms || '')

  return {
    slug,
    id: slug,
    name: item.displayName || item.name || slug,
    displayName: item.displayName || item.name || slug,
    roleLabel: item.roleLabel || '플로로탄닌 건강정보 파트너',
    organization: item.organization || '',
    region: item.region || '',
    phone: phone || '',
    phoneDisplay: item.phoneDisplay || phoneDisplay(phone),
    sms: normalizePhone(item.sms) || phone || '',
    kakaoUrl: item.kakaoUrl || item.kakao_url || '',
    naverCafeUrl: item.naverCafeUrl || item.naver_cafe_url || 'https://cafe.naver.com/phlorotannin',
    bandUrl: item.bandUrl || item.band_url || 'https://band.us/n/a6aebc75vch6U',
    profileImage: item.profileImage || item.profile_image || '',
    greeting: item.greeting || '',
    shortBio: item.shortBio || item.memo || '',
    shareTitle: item.shareTitle || `${item.displayName || item.name || '파트너'}가 공유한 플로로탄닌 건강정보`,
    shareDescription: item.shareDescription || '플로로탄닌 파트너스 공식 아카이브 기반 자료',
    themeColor: item.themeColor || '#0a4d68',
    verified: item.verified ?? true,
    visible: item.visible ?? true,
  }
}

let cache = null

async function loadPartners() {
  if (cache) return cache

  const local = findPartnerBySlug('demo')
  const list = local ? [adaptPublicPartner(local)] : []

  try {
    const r = await fetch('/partners.json', { cache: 'no-store' })
    if (r.ok) {
      const data = await r.json()
      const rows = Array.isArray(data?.partners) ? data.partners : []
      for (const row of rows) {
        const partner = adaptPublicPartner(row)
        if (partner) list.push(partner)
      }
    }
  } catch {
    // ignore
  }

  const dedup = new Map()
  for (const p of list) dedup.set(p.slug, p)
  cache = [...dedup.values()]
  return cache
}

export function getSlugFromSearch(search = '') {
  try {
    const sp = new URLSearchParams(search || '')
    return normalizePartnerSlug(sp.get('pt') || sp.get('ref'))
  } catch {
    return null
  }
}

export function getSlugFromPath(pathname = '') {
  const m = String(pathname || '').match(/^\/p\/([^/?#]+)/)
  return m ? normalizePartnerSlug(decodeURIComponent(m[1])) : null
}

export async function resolvePartnerBySlug(slug) {
  const normalized = normalizePartnerSlug(slug)
  if (!normalized) return null

  const rows = await loadPartners()
  return rows.find((p) => p.slug === normalized) || null
}

export async function resolvePartnerCandidate({ pathname = '', search = '', persistedSlug = null }) {
  const byPath = getSlugFromPath(pathname)
  const byQuery = getSlugFromSearch(search)
  const candidateSlug = byPath || byQuery || normalizePartnerSlug(persistedSlug)

  if (!candidateSlug) {
    return { partner: null, source: null, slug: null }
  }

  const partner = await resolvePartnerBySlug(candidateSlug)
  if (!partner) {
    return { partner: null, source: null, slug: null }
  }

  const source = byPath ? 'path' : byQuery ? 'query' : 'storage'
  return { partner, source, slug: partner.slug }
}
