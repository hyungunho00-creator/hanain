import { normalizePartnerSlug } from './normalizePartnerSlug'

export const PARTNER_COOKIE_KEY = 'ph_partner'
export const PARTNER_STORAGE_KEY = 'ph_partner'
export const PARTNER_COOKIE_DAYS = 30

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

function normalizeSlug(slug) {
  return normalizePartnerSlug(slug)
}

export function getPartnerFromCookie() {
  if (!isBrowser()) return null
  try {
    const value = document.cookie
      .split(';')
      .map((x) => x.trim())
      .find((x) => x.startsWith(`${PARTNER_COOKIE_KEY}=`))

    if (!value) return null
    return normalizeSlug(decodeURIComponent(value.slice(PARTNER_COOKIE_KEY.length + 1)))
  } catch {
    return null
  }
}

export function setPartnerCookie(slug, days = PARTNER_COOKIE_DAYS) {
  if (!isBrowser()) return
  const normalized = normalizeSlug(slug)
  if (!normalized) return

  const maxAge = Math.max(1, Number(days || PARTNER_COOKIE_DAYS)) * 24 * 60 * 60
  document.cookie = `${PARTNER_COOKIE_KEY}=${encodeURIComponent(normalized)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`
}

export function clearPartnerCookie() {
  if (!isBrowser()) return
  document.cookie = `${PARTNER_COOKIE_KEY}=; Max-Age=0; Path=/; SameSite=Lax`
}

export function getPartnerFromStorage() {
  if (!isBrowser()) return null
  try {
    return normalizeSlug(window.localStorage.getItem(PARTNER_STORAGE_KEY))
  } catch {
    return null
  }
}

export function setPartnerToStorage(slug) {
  if (!isBrowser()) return
  const normalized = normalizeSlug(slug)
  if (!normalized) return
  try {
    window.localStorage.setItem(PARTNER_STORAGE_KEY, normalized)
  } catch {
    // ignore
  }
}

export function clearPartnerStorage() {
  if (!isBrowser()) return
  try {
    window.localStorage.removeItem(PARTNER_STORAGE_KEY)
  } catch {
    // ignore
  }
}

export function persistPartnerSlug(slug) {
  const normalized = normalizeSlug(slug)
  if (!normalized) return null
  setPartnerCookie(normalized)
  setPartnerToStorage(normalized)
  return normalized
}

export function readPersistedPartnerSlug() {
  return getPartnerFromCookie() || getPartnerFromStorage() || null
}
