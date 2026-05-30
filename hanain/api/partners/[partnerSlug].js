/* global process */
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const DEFAULT_SUPABASE_URL = 'https://rlfxuyeoluoeaxuujtly.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck'

function env(...keys) {
  const envMap = globalThis?.process?.env || {}
  for (const key of keys) {
    const value = envMap[key]
    if (value) return value
  }
  return ''
}

function safeDecode(value) {
  try {
    return decodeURIComponent(String(value || ''))
  } catch {
    return String(value || '')
  }
}

function normalizePhoneDigits(raw) {
  if (!raw) return null
  const digits = String(raw).replace(/\D/g, '')
  if (!digits) return null
  if (digits.startsWith('82') && (digits.length === 11 || digits.length === 12)) return `0${digits.slice(2)}`
  if (digits.startsWith('0082') && (digits.length === 13 || digits.length === 14)) return `0${digits.slice(4)}`
  return digits
}

function normalizeSlug(raw) {
  if (raw == null) return null
  let value = safeDecode(raw).trim()
  if (!value) return null

  value = value.replace(/^https?:\/\/[^/]+/i, '')
  value = value.split('#')[0]?.split('?')[0] || ''
  value = value.replace(/^\/+|\/+$/g, '')
  if (value.toLowerCase().startsWith('p/')) value = value.slice(2)
  value = value.trim().toLowerCase()
  if (!value) return null

  const digits = normalizePhoneDigits(value)
  if (digits && !/[a-z\u3131-\u318e\uac00-\ud7a3]/i.test(value)) return digits
  return value
}

function buildCandidates(input) {
  const out = new Set()
  const normalized = normalizeSlug(input)
  if (normalized) out.add(normalized)

  const stripped = normalizeSlug(String(input || '').replace(/^p\//i, ''))
  if (stripped) out.add(stripped)

  const digits = normalizePhoneDigits(String(input || ''))
  if (digits) {
    out.add(digits)
    if (digits.length === 11) out.add(`${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`)
    if (digits.length === 10) out.add(`${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`)
  }

  return [...out]
}

function pickPublicFields(row) {
  if (!row) return null
  const slug = normalizeSlug(row.slug || row.phone)
  if (!slug) return null

  const phone = normalizePhoneDigits(row.phone || row.sms || '') || ''

  return {
    slug,
    aliases: Array.isArray(row.aliases) ? row.aliases : [],
    displayName: row.displayName || row.name || slug,
    roleLabel: row.roleLabel || '플로로탄닌 건강정보 파트너',
    organization: row.organization || '',
    region: row.region || '',
    phone,
    sms: normalizePhoneDigits(row.sms || '') || phone,
    kakaoUrl: row.kakaoUrl || row.kakao_url || '',
    naverCafeUrl: row.naverCafeUrl || row.naver_cafe_url || 'https://cafe.naver.com/phlorotannin',
    bandUrl: row.bandUrl || row.band_url || 'https://band.us/n/a6aebc75vch6U',
    profileImage: row.profileImage || row.profile_image || '',
    greeting: row.greeting || '',
    shortBio: row.shortBio || row.memo || '',
    verified: row.verified ?? true,
    visible: row.visible ?? true,
    active: row.active ?? String(row.status || 'active').toLowerCase() === 'active',
    approved: row.approved ?? true,
    status: row.status || 'active',
    createdAt: row.created_at || row.createdAt || null,
    updatedAt: row.updated_at || row.updatedAt || null,
  }
}

function isPartnerPublic(row) {
  const active = row?.active ?? String(row?.status || 'active').toLowerCase() === 'active'
  const visible = row?.visible ?? true
  const approved = row?.approved ?? true
  return {
    active: Boolean(active),
    visible: Boolean(visible),
    approved: Boolean(approved),
    ok: Boolean(active) && Boolean(visible) && Boolean(approved),
  }
}

function readStaticPartners() {
  const root = process.cwd()
  const jsonPath = path.join(root, 'public', 'partners.json')
  const out = []

  try {
    const jsonRaw = readFileSync(jsonPath, 'utf8')
    const data = JSON.parse(jsonRaw)
    if (Array.isArray(data?.partners)) out.push(...data.partners)
  } catch {
    // static fallback read failed
  }

  return out.map(pickPublicFields).filter(Boolean)
}

function matchInRows(rows, candidates) {
  if (!Array.isArray(rows) || !rows.length) return null
  for (const row of rows) {
    const keys = new Set()
    for (const candidate of buildCandidates(row.slug || '')) keys.add(candidate)
    for (const candidate of buildCandidates(row.phone || '')) keys.add(candidate)
    for (const candidate of buildCandidates(row.phone_display || row.phoneDisplay || '')) keys.add(candidate)
    for (const candidate of buildCandidates(row.displayName || row.name || '')) keys.add(candidate)
    for (const candidate of buildCandidates(row.sms || '')) keys.add(candidate)
    for (const candidate of Array.isArray(row.aliases) ? row.aliases.flatMap((v) => buildCandidates(v || '')) : []) {
      keys.add(candidate)
    }

    if (candidates.some((candidate) => keys.has(candidate))) return row
  }
  return null
}

async function loadPartnersFromDb() {
  const supabaseUrl = env('VITE_SUPABASE_URL', 'SUPABASE_URL') || DEFAULT_SUPABASE_URL
  const serviceKey = env('SUPABASE_SECRET_KEY', 'SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_SERVICE_KEY')
  const anonKey = env('VITE_SUPABASE_ANON_KEY', 'SUPABASE_ANON_KEY') || DEFAULT_SUPABASE_ANON_KEY

  const key = serviceKey || anonKey
  if (!supabaseUrl || !key) {
    return { ok: false, rows: [], reason: 'missing_supabase_env' }
  }

  try {
    const client = createClient(supabaseUrl, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const { data, error } = await client
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000)

    if (error) {
      return { ok: false, rows: [], reason: error.message || 'partners_select_failed' }
    }

    return { ok: true, rows: Array.isArray(data) ? data : [], reason: null }
  } catch (error) {
    return { ok: false, rows: [], reason: error?.message || 'partners_select_failed' }
  }
}

function respondJson(res, statusCode, payload) {
  res.status(statusCode)
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store, max-age=0')
  res.send(JSON.stringify(payload))
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return respondJson(res, 405, {
      ok: false,
      status: 'partner_route_not_supported',
      reason: 'method_not_allowed',
    })
  }

  const requestedSlug = req.query?.partnerSlug || null
  const normalizedSlug = normalizeSlug(requestedSlug)
  const candidates = buildCandidates(requestedSlug)

  if (!candidates.length || !normalizedSlug) {
    return respondJson(res, 400, {
      ok: false,
      status: 'partner_slug_mismatch',
      requestedSlug,
      normalizedSlug,
      reason: 'invalid_partner_slug',
      debugMessage: 'partner slug could not be normalized',
    })
  }

  const dbLoad = await loadPartnersFromDb()
  if (dbLoad.ok) {
    const matchedDb = matchInRows(dbLoad.rows, candidates)
    if (matchedDb) {
      const partner = pickPublicFields(matchedDb)
      const publicFlags = isPartnerPublic(partner)
      if (!publicFlags.ok) {
        return respondJson(res, 200, {
          ok: false,
          status: 'partner_inactive',
          requestedSlug,
          normalizedSlug,
          source: 'supabase',
          reason: `active=${publicFlags.active},visible=${publicFlags.visible},approved=${publicFlags.approved}`,
          partner,
          debugMessage: 'partner exists but is not public',
        })
      }

      return respondJson(res, 200, {
        ok: true,
        status: 'found',
        source: 'supabase',
        requestedSlug,
        normalizedSlug,
        partner,
      })
    }
  }

  const staticRows = readStaticPartners()
  const matchedStatic = matchInRows(staticRows, candidates)
  if (matchedStatic) {
    const partner = pickPublicFields(matchedStatic)
    const publicFlags = isPartnerPublic(partner)
    if (!publicFlags.ok) {
      return respondJson(res, 200, {
        ok: false,
        status: 'partner_inactive',
        requestedSlug,
        normalizedSlug,
        source: 'partners_json',
        reason: `active=${publicFlags.active},visible=${publicFlags.visible},approved=${publicFlags.approved}`,
        partner,
        debugMessage: 'partner found in static source but not public',
      })
    }

    return respondJson(res, 200, {
      ok: true,
      status: 'found',
      source: 'partners_json',
      requestedSlug,
      normalizedSlug,
      partner,
    })
  }

  if (!dbLoad.ok) {
    return respondJson(res, 500, {
      ok: false,
      status: 'partner_source_error',
      requestedSlug,
      normalizedSlug,
      source: 'supabase',
      reason: dbLoad.reason || 'partners_source_error',
      debugMessage: 'failed to read dynamic partner source',
    })
  }

  return respondJson(res, 404, {
    ok: false,
    status: 'partner_not_found',
    requestedSlug,
    normalizedSlug,
    source: 'supabase',
    reason: 'partner_not_registered',
    debugMessage: 'partner not found in dynamic or static source',
  })
}
