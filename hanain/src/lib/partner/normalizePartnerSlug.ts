function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function stripPartnerPrefix(input: string): string {
  let value = input.trim()
  value = value.replace(/^https?:\/\/[^/]+/i, '')
  value = value.split('#')[0]?.split('?')[0] || ''
  value = value.replace(/^\/+|\/+$/g, '')
  if (value.toLowerCase().startsWith('p/')) value = value.slice(2)
  return value.replace(/^\/+|\/+$/g, '')
}

function looksLikePhone(input: string): boolean {
  if (!input) return false
  return !/[a-z\u3131-\u318e\uac00-\ud7a3]/i.test(input) && /[\d]/.test(input)
}

export function normalizePhoneDigits(raw?: string | null): string | null {
  if (!raw) return null
  const digits = String(raw).replace(/\D/g, '')
  if (!digits) return null

  if (digits.startsWith('82') && (digits.length === 11 || digits.length === 12)) {
    return `0${digits.slice(2)}`
  }
  if (digits.startsWith('0082') && (digits.length === 13 || digits.length === 14)) {
    return `0${digits.slice(4)}`
  }
  return digits
}

export function formatPhoneDisplay(raw?: string | null): string {
  const digits = normalizePhoneDigits(raw)
  if (!digits) return ''
  if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  return digits
}

export function normalizePartnerSlug(input?: string | null): string | null {
  if (input == null) return null
  const decoded = safeDecode(String(input))
  const stripped = stripPartnerPrefix(decoded)
  if (!stripped) return null

  const lowered = stripped.toLowerCase()
  const digits = normalizePhoneDigits(lowered)
  if (digits && looksLikePhone(lowered) && digits.length >= 9 && digits.length <= 13) {
    return digits
  }
  return lowered
}

export function buildPartnerSlugCandidates(input?: string | null): string[] {
  const out = new Set<string>()
  const normalized = normalizePartnerSlug(input)
  if (normalized) out.add(normalized)

  if (input != null) {
    const decoded = safeDecode(String(input))
    const stripped = stripPartnerPrefix(decoded).toLowerCase()
    if (stripped) out.add(stripped)

    const digits = normalizePhoneDigits(stripped)
    if (digits) {
      out.add(digits)
      if (digits.length === 11) out.add(`${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`)
      if (digits.length === 10) out.add(`${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`)
    }
  }

  return [...out]
}

export function normalizeAliases(values?: Array<string | null | undefined>): string[] {
  if (!Array.isArray(values)) return []
  const out = new Set<string>()
  for (const value of values) {
    for (const candidate of buildPartnerSlugCandidates(value || '')) {
      out.add(candidate)
    }
  }
  return [...out]
}
