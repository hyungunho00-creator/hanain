const EVENT_NAMES = new Set([
  'partner_card_view',
  'partner_archive_view',
  'partner_share_click',
  'partner_copy_link',
  'partner_contact_click',
  'partner_vcard_download',
  'partner_context_restored',
  'partner_context_lost',
])

function nowIso() {
  return new Date().toISOString()
}

function safePushDebug(payload) {
  if (typeof window === 'undefined') return
  try {
    const existing = window.__phPartnerEvents || []
    existing.push(payload)
    window.__phPartnerEvents = existing.slice(-200)
  } catch {
    // ignore
  }
}

export function trackPartnerEvent(eventName, detail = {}) {
  if (!EVENT_NAMES.has(eventName)) return

  const payload = {
    event: eventName,
    partnerSlug: detail.partnerSlug || null,
    pagePath: detail.pagePath || (typeof window !== 'undefined' ? window.location.pathname : null),
    contentType: detail.contentType || null,
    contentSlug: detail.contentSlug || null,
    timestamp: detail.timestamp || nowIso(),
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, payload)
    } catch {
      // ignore
    }
  }

  safePushDebug(payload)
}

