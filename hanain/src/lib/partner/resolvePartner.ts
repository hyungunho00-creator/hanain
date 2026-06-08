import { PARTNERS } from '../../data/partners'
import {
  buildPartnerSlugCandidates,
  formatPhoneDisplay,
  normalizeAliases,
  normalizePartnerSlug,
  normalizePhoneDigits,
} from './normalizePartnerSlug'

export type PartnerResolveStatus =
  | 'found'
  | 'partner_not_found'
  | 'partner_inactive'
  | 'partner_slug_mismatch'
  | 'partner_source_error'
  | 'partner_cache_stale'
  | 'partner_static_generation_missing'
  | 'partner_route_not_supported'

export type PartnerResolveSource = 'static' | 'partners_json' | 'api' | 'none'

export type PartnerResolveResult = {
  ok: boolean
  partner: any | null
  status: PartnerResolveStatus
  requestedSlug: string | null
  normalizedSlug: string | null
  source: PartnerResolveSource
  reason?: string
  debugMessage?: string
  route?: string
  cacheMode?: string
  fallbackMode?: string
}

type PartnerLoadResult = {
  list: any[]
  status: 'ok' | 'cache_stale' | 'error'
  reason?: string
  cacheMode?: string
}

const JSON_CACHE_TTL_MS = 30 * 1000
const API_TIMEOUT_MS = 4500
let partnersJsonCache: { at: number; list: any[] } | null = null

function normalizeStatus(raw: any): string {
  const value = String(raw ?? '').trim().toLowerCase()
  return value || 'active'
}

function hasPublicAccessFlags(partner: any) {
  const status = normalizeStatus(partner?.status)
  const active = partner?.active ?? status === 'active'
  const visible = partner?.visible ?? true
  const approved = partner?.approved ?? true
  return {
    active: Boolean(active),
    visible: Boolean(visible),
    approved: Boolean(approved),
    status,
    isPublic: Boolean(active) && Boolean(visible) && Boolean(approved),
  }
}

function adaptPartner(item: any) {
  if (!item) return null

  const slug = normalizePartnerSlug(item.slug || item.partnerSlug || item.id || item.phone)
  if (!slug) return null

  const phone = normalizePhoneDigits(item.phone || item.sms || item.slug || '') || ''
  const flags = hasPublicAccessFlags(item)

  return {
    slug,
    id: slug,
    name: item.displayName || item.name || slug,
    displayName: item.displayName || item.name || slug,
    roleLabel: item.roleLabel || '플로로탄닌 건강정보 파트너',
    organization: item.organization || '',
    region: item.region || '',
    phone,
    phoneDisplay: item.phoneDisplay || item.phone_display || formatPhoneDisplay(phone),
    sms: normalizePhoneDigits(item.sms || '') || phone,
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
    active: item.active ?? flags.active,
    approved: item.approved ?? true,
    status: item.status || flags.status,
    aliases: normalizeAliases([
      ...(Array.isArray(item.aliases) ? item.aliases : []),
      item.slug,
      item.partnerSlug,
      item.phone,
      item.phone_display,
      item.phoneDisplay,
      item.sms,
    ]),
  }
}

function collectPartnerCandidates(partner: any): string[] {
  const out = new Set<string>()
  for (const candidate of buildPartnerSlugCandidates(partner?.slug || '')) out.add(candidate)
  for (const candidate of normalizeAliases(partner?.aliases || [])) out.add(candidate)
  for (const candidate of buildPartnerSlugCandidates(partner?.phone || '')) out.add(candidate)
  for (const candidate of buildPartnerSlugCandidates(partner?.phoneDisplay || '')) out.add(candidate)
  for (const candidate of buildPartnerSlugCandidates(partner?.sms || '')) out.add(candidate)
  return [...out]
}

function findPartnerByCandidates(list: any[], requestedCandidates: string[]) {
  if (!requestedCandidates.length || !Array.isArray(list)) return null
  for (const partner of list) {
    const keys = collectPartnerCandidates(partner)
    if (requestedCandidates.some((candidate) => keys.includes(candidate))) {
      return partner
    }
  }
  return null
}

function loadStaticPartners(): any[] {
  const list = Array.isArray(PARTNERS) ? PARTNERS.map(adaptPartner).filter(Boolean) : []
  const dedup = new Map<string, any>()
  for (const partner of list) dedup.set(partner.slug, partner)
  return [...dedup.values()]
}

async function loadPartnersFromJson({ forceFresh = false }: { forceFresh?: boolean } = {}): Promise<PartnerLoadResult> {
  if (!forceFresh && partnersJsonCache && Date.now() - partnersJsonCache.at < JSON_CACHE_TTL_MS) {
    return {
      list: partnersJsonCache.list,
      status: 'ok',
      cacheMode: 'memory-hit',
    }
  }

  try {
    const url = `/partners.json?t=${Date.now()}`
    const r = await fetch(url, { cache: 'no-store' })
    if (!r.ok) {
      if (partnersJsonCache?.list?.length) {
        return {
          list: partnersJsonCache.list,
          status: 'cache_stale',
          reason: `partners.json_http_${r.status}`,
          cacheMode: 'memory-stale-fallback',
        }
      }
      return { list: [], status: 'error', reason: `partners.json_http_${r.status}`, cacheMode: 'network-error' }
    }

    const data = await r.json()
    const rows = Array.isArray(data?.partners) ? data.partners : []
    const list = rows.map(adaptPartner).filter(Boolean)
    const dedup = new Map<string, any>()
    for (const partner of list) dedup.set(partner.slug, partner)

    partnersJsonCache = { at: Date.now(), list: [...dedup.values()] }

    return {
      list: partnersJsonCache.list,
      status: 'ok',
      cacheMode: 'network-no-store',
    }
  } catch (error: any) {
    if (partnersJsonCache?.list?.length) {
      return {
        list: partnersJsonCache.list,
        status: 'cache_stale',
        reason: error?.message || 'partners_json_fetch_failed',
        cacheMode: 'memory-stale-fallback',
      }
    }
    return {
      list: [],
      status: 'error',
      reason: error?.message || 'partners_json_fetch_failed',
      cacheMode: 'network-error',
    }
  }
}

async function loadPartnerFromApi(slug: string): Promise<PartnerResolveResult> {
  const requestedSlug = slug || null
  const normalizedSlug = normalizePartnerSlug(slug)

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS)

    const response = await fetch(`/api/partners/${encodeURIComponent(slug)}?t=${Date.now()}`, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })

    clearTimeout(timeoutId)

    const payload = await response.json().catch(() => null)

    if (!response.ok) {
      return {
        ok: false,
        partner: null,
        status: payload?.status || 'partner_source_error',
        requestedSlug,
        normalizedSlug,
        source: 'api',
        reason: payload?.reason || `api_http_${response.status}`,
        debugMessage: payload?.debugMessage || 'partner api returned non-200 response',
      }
    }

    if (!payload?.ok || !payload?.partner) {
      return {
        ok: false,
        partner: null,
        status: payload?.status || 'partner_not_found',
        requestedSlug,
        normalizedSlug,
        source: 'api',
        reason: payload?.reason || 'api_no_partner',
        debugMessage: payload?.debugMessage || 'partner api returned no partner',
      }
    }

    const partner = adaptPartner(payload.partner)
    if (!partner) {
      return {
        ok: false,
        partner: null,
        status: 'partner_source_error',
        requestedSlug,
        normalizedSlug,
        source: 'api',
        reason: 'api_partner_adapt_failed',
        debugMessage: 'partner api returned malformed partner payload',
      }
    }

    const flags = hasPublicAccessFlags(partner)
    if (!flags.isPublic) {
      return {
        ok: false,
        partner,
        status: 'partner_inactive',
        requestedSlug,
        normalizedSlug,
        source: 'api',
        reason: `active=${flags.active},visible=${flags.visible},approved=${flags.approved}`,
        debugMessage: 'partner exists but inactive/hidden/unapproved',
      }
    }

    return {
      ok: true,
      partner,
      status: 'found',
      requestedSlug,
      normalizedSlug,
      source: 'api',
      reason: 'api_partner_resolved',
      debugMessage: 'partner resolved via dynamic api source',
    }
  } catch (error: any) {
    return {
      ok: false,
      partner: null,
      status: 'partner_source_error',
      requestedSlug,
      normalizedSlug,
      source: 'api',
      reason: error?.name === 'AbortError' ? 'api_timeout' : error?.message || 'api_fetch_failed',
      debugMessage: 'failed to call partner api source',
    }
  }
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

export async function resolvePartnerBySlugWithStatus(
  slug: string,
  options: { route?: string; forceFresh?: boolean } = {},
): Promise<PartnerResolveResult> {
  const requestedSlug = slug || null
  const normalizedSlug = normalizePartnerSlug(slug)
  const requestedCandidates = buildPartnerSlugCandidates(slug)

  const base: Omit<PartnerResolveResult, 'ok' | 'partner' | 'status' | 'source'> = {
    requestedSlug,
    normalizedSlug,
    route: options.route || null,
  }

  if (!requestedCandidates.length) {
    return {
      ok: false,
      partner: null,
      status: 'partner_slug_mismatch',
      source: 'none',
      ...base,
      reason: 'empty_or_invalid_partner_slug',
      debugMessage: 'partner slug could not be normalized',
    }
  }

  const apiResult = await loadPartnerFromApi(slug)
  if (apiResult.ok) {
    return {
      ...apiResult,
      route: options.route || null,
      cacheMode: 'api-no-store',
      fallbackMode: 'dynamic-runtime',
    }
  }
  if (apiResult.status === 'partner_inactive') {
    return {
      ...apiResult,
      route: options.route || null,
      cacheMode: 'api-no-store',
      fallbackMode: 'dynamic-runtime-inactive',
    }
  }

  const jsonLoad = await loadPartnersFromJson({ forceFresh: options.forceFresh })
  const jsonMatched = findPartnerByCandidates(jsonLoad.list, requestedCandidates)
  if (jsonMatched) {
    const flags = hasPublicAccessFlags(jsonMatched)
    if (!flags.isPublic) {
      return {
        ok: false,
        partner: jsonMatched,
        status: 'partner_inactive',
        source: 'partners_json',
        ...base,
        cacheMode: jsonLoad.cacheMode,
        reason: `active=${flags.active},visible=${flags.visible},approved=${flags.approved}`,
        debugMessage: 'partner found in partners.json but inactive/hidden/unapproved',
      }
    }
    return {
      ok: true,
      partner: jsonMatched,
      status: 'found',
      source: 'partners_json',
      ...base,
      cacheMode: jsonLoad.cacheMode,
      reason: 'resolved_from_partners_json',
      debugMessage: 'resolved from static partners.json',
    }
  }

  const staticList = loadStaticPartners()
  const staticMatched = findPartnerByCandidates(staticList, requestedCandidates)
  if (staticMatched) {
    const flags = hasPublicAccessFlags(staticMatched)
    if (!flags.isPublic) {
      return {
        ok: false,
        partner: staticMatched,
        status: 'partner_inactive',
        source: 'static',
        ...base,
        reason: `active=${flags.active},visible=${flags.visible},approved=${flags.approved}`,
        debugMessage: 'static partner exists but inactive/hidden/unapproved',
      }
    }
    return {
      ok: true,
      partner: staticMatched,
      status: 'found',
      source: 'static',
      ...base,
      reason: 'resolved_from_static_partners',
      debugMessage: 'resolved from in-repo static partner data',
    }
  }

  if (jsonLoad.status === 'cache_stale') {
    return {
      ok: false,
      partner: null,
      status: 'partner_cache_stale',
      source: 'partners_json',
      ...base,
      cacheMode: jsonLoad.cacheMode,
      fallbackMode: 'stale-json->api-failed',
      reason: jsonLoad.reason || apiResult.reason || 'stale_partner_cache',
      debugMessage: 'partners.json cache appears stale and dynamic api lookup failed',
    }
  }

  if (jsonLoad.status === 'error' && apiResult.status === 'partner_source_error') {
    return {
      ok: false,
      partner: null,
      status: 'partner_source_error',
      source: 'none',
      ...base,
      cacheMode: jsonLoad.cacheMode,
      fallbackMode: 'json-error->api-error',
      reason: `${jsonLoad.reason || 'partners_json_error'} | ${apiResult.reason || 'api_error'}`,
      debugMessage: 'both partners.json and dynamic api sources failed',
    }
  }

  return {
    ok: false,
    partner: null,
    status: 'partner_not_found',
    source: 'none',
    ...base,
    cacheMode: jsonLoad.cacheMode,
    fallbackMode: 'json+api-not-found',
    reason: apiResult.reason || jsonLoad.reason || 'partner_not_registered',
    debugMessage: 'partner not found in static/json/api sources',
  }
}

export async function resolvePartnerBySlug(slug: string) {
  const resolved = await resolvePartnerBySlugWithStatus(slug)
  return resolved.ok ? resolved.partner : null
}

export async function resolvePartnerCandidate({ pathname = '', search = '', persistedSlug = null }) {
  const byPath = getSlugFromPath(pathname)
  const byQuery = getSlugFromSearch(search)
  const candidateSlug = byPath || byQuery || normalizePartnerSlug(persistedSlug)

  if (!candidateSlug) {
    return { partner: null, source: null, slug: null, status: 'partner_not_found', reason: 'no_slug_signal' }
  }

  const resolved = await resolvePartnerBySlugWithStatus(candidateSlug, {
    route: pathname || null,
  })

  if (!resolved.ok || !resolved.partner) {
    return {
      partner: null,
      source: null,
      slug: null,
      status: resolved.status,
      reason: resolved.reason,
      debugMessage: resolved.debugMessage,
      requestedSlug: resolved.requestedSlug,
      normalizedSlug: resolved.normalizedSlug,
      cacheMode: resolved.cacheMode,
      fallbackMode: resolved.fallbackMode,
    }
  }

  const source = byPath ? 'path' : byQuery ? 'query' : 'storage'
  return {
    partner: resolved.partner,
    source,
    slug: resolved.partner.slug,
    status: resolved.status,
    reason: resolved.reason,
    requestedSlug: resolved.requestedSlug,
    normalizedSlug: resolved.normalizedSlug,
    cacheMode: resolved.cacheMode,
    fallbackMode: resolved.fallbackMode,
  }
}
