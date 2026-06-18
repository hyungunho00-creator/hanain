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

function normalizeSlug(value) {
  if (value == null) return null
  let slug = safeDecode(value).trim()
  if (!slug) return null
  slug = slug.replace(/^https?:\/\/[^/]+/i, '')
  slug = slug.split('#')[0]?.split('?')[0] || ''
  slug = slug.replace(/^\/+|\/+$/g, '')
  if (slug.toLowerCase().startsWith('p/')) slug = slug.slice(2)
  slug = slug.trim().toLowerCase()
  if (!slug) return null

  const digits = normalizePhoneDigits(slug)
  if (digits && !/[a-z\u3131-\u318e\uac00-\ud7a3]/i.test(slug)) return digits
  return slug
}

function buildCandidates(input) {
  const out = new Set()
  const normalized = normalizeSlug(input)
  if (normalized) out.add(normalized)

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
    displayName: row.displayName || row.name || slug,
    organization: row.organization || 'Phlorotannin Partners Archive',
    phone,
    sms: normalizePhoneDigits(row.sms || '') || phone,
    status: row.status || 'active',
  }
}

function rowCandidates(row) {
  const keys = new Set()
  for (const c of buildCandidates(row.slug || '')) keys.add(c)
  for (const c of buildCandidates(row.phone || '')) keys.add(c)
  for (const c of buildCandidates(row.phone_display || row.phoneDisplay || '')) keys.add(c)
  for (const c of buildCandidates(row.sms || '')) keys.add(c)
  for (const c of Array.isArray(row.aliases) ? row.aliases.flatMap((v) => buildCandidates(v || '')) : []) keys.add(c)
  return keys
}

function readStaticPartners() {
  const root = process.cwd()
  const jsonPath = path.join(root, 'public', 'partners.json')
  try {
    const jsonRaw = readFileSync(jsonPath, 'utf8')
    const data = JSON.parse(jsonRaw)
    return Array.isArray(data?.partners) ? data.partners : []
  } catch {
    return []
  }
}

async function loadPartnersFromDb() {
  const supabaseUrl = env('VITE_SUPABASE_URL', 'SUPABASE_URL') || DEFAULT_SUPABASE_URL
  const serviceKey = env('SUPABASE_SECRET_KEY', 'SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_SERVICE_KEY')
  const anonKey = env('VITE_SUPABASE_ANON_KEY', 'SUPABASE_ANON_KEY') || DEFAULT_SUPABASE_ANON_KEY
  const key = serviceKey || anonKey

  if (!supabaseUrl || !key) return { ok: false, rows: [], reason: 'missing_supabase_env' }

  try {
    const client = createClient(supabaseUrl, key, { auth: { autoRefreshToken: false, persistSession: false } })
    const { data, error } = await client
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000)

    if (error) return { ok: false, rows: [], reason: error.message || 'partners_select_failed' }
    return { ok: true, rows: Array.isArray(data) ? data : [] }
  } catch (error) {
    return { ok: false, rows: [], reason: error?.message || 'partners_select_failed' }
  }
}

async function resolvePartner(input) {
  const candidates = buildCandidates(input)
  if (!candidates.length) return null

  const db = await loadPartnersFromDb()
  if (db.ok) {
    for (const row of db.rows) {
      const keys = rowCandidates(row)
      if (candidates.some((c) => keys.has(c))) return pickPublicFields(row)
    }
  }

  for (const row of readStaticPartners()) {
    const keys = rowCandidates(row)
    if (candidates.some((c) => keys.has(c))) return pickPublicFields(row)
  }

  return null
}

function sanitizePhone(value) {
  return String(value || '').replace(/[^0-9+]/g, '')
}

export default async function handler(req, res) {
  const requested = req.query?.partnerSlug
  const normalized = normalizeSlug(requested)
  if (!normalized) {
    res.status(400).setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.send('Missing or invalid partner slug')
    return
  }

  const partner = await resolvePartner(requested)
  if (!partner) {
    res.status(404).setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.send('Partner not found')
    return
  }

  const name = partner.displayName || normalized
  const org = partner.organization || 'Phlorotannin Partners Archive'
  const phone = sanitizePhone(partner.phone || partner.sms || '')
  const cardUrl = `https://phlorotannin.com/p/${partner.slug || normalized}`

  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${name}`,
    `ORG:${org}`,
    phone ? `TEL;TYPE=CELL:${phone}` : '',
    `URL:${cardUrl}`,
    'NOTE:Phlorotannin Partners Archive',
    'END:VCARD',
  ]
    .filter(Boolean)
    .join('\r\n')

  res.status(200)
  res.setHeader('Content-Type', 'text/vcard; charset=utf-8')
  res.setHeader('Content-Disposition', `attachment; filename="${partner.slug || normalized}.vcf"`)
  res.setHeader('Cache-Control', 'no-store, max-age=0')
  res.send(vcard)
}
