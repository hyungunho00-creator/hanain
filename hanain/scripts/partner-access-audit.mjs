import fs from 'node:fs/promises'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const ROOT = process.cwd()
const DOC_PATH = path.join(ROOT, 'docs', 'partner-access-audit-result.md')
const BASE_URL = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173'

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://rlfxuyeoluoeaxuujtly.supabase.co'

const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck'

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
  let value = decodeURIComponent(String(raw)).trim()
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

function extractTitle(html) {
  const m = String(html || '').match(/<title>([^<]+)<\/title>/i)
  return m ? m[1].trim() : ''
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'))
  } catch {
    return fallback
  }
}

async function collectRouteSamples() {
  const partnersJson = await readJson(path.join(ROOT, 'public', 'partners.json'), { partners: [] })
  const partnerRows = Array.isArray(partnersJson.partners) ? partnersJson.partners : []

  const existing = partnerRows
    .map((row) => normalizeSlug(row.slug || row.phone || ''))
    .filter(Boolean)

  const existingUnique = [...new Set(existing)]
  const existingSlug = existingUnique[0] || '01098498408'

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  let latest = []
  let dbError = null
  try {
    const { data, error } = await supabase
      .from('partners')
      .select('slug,name,phone,status,created_at')
      .order('created_at', { ascending: false })
      .limit(200)
    if (error) {
      dbError = error.message || 'partners_select_failed'
    } else {
      latest = Array.isArray(data) ? data : []
    }
  } catch (error) {
    dbError = error?.message || 'partners_select_failed'
  }

  const existingSet = new Set(existingUnique)
  const newFromDb = latest
    .map((row) => ({
      slug: normalizeSlug(row.slug || row.phone || ''),
      name: row.name || '',
      status: row.status || 'active',
      createdAt: row.created_at || '',
    }))
    .filter((row) => row.slug)
    .filter((row) => !existingSet.has(row.slug))

  const newSlugs = newFromDb.slice(0, 3)

  const routeList = [
    { type: 'test', route: '/p/demo-new', slug: 'demo-new' },
    { type: 'test', route: '/p/demo-new/home', slug: 'demo-new' },
    { type: 'test', route: '/p/demo-new/qa', slug: 'demo-new' },
    { type: 'test', route: '/p/demo-new/blog', slug: 'demo-new' },
    { type: 'test', route: '/p/demo-new/insights', slug: 'demo-new' },
    { type: 'test', route: '/p/01011112222', slug: '01011112222' },
    { type: 'test', route: '/p/010-1111-2222', slug: '010-1111-2222' },
    { type: 'existing', route: `/p/${existingSlug}`, slug: existingSlug },
  ]

  for (const row of newSlugs) {
    routeList.push({ type: 'new-db', route: `/p/${row.slug}`, slug: row.slug, expectedName: row.name || null })
    routeList.push({ type: 'new-db', route: `/p/${row.slug}/home`, slug: row.slug, expectedName: row.name || null })
    routeList.push({ type: 'new-db', route: `/p/${row.slug}/qa`, slug: row.slug, expectedName: row.name || null })
  }

  return {
    existingSlug,
    routes: routeList,
    newSlugs,
    dbError,
    dbCount: latest.length,
    staticCount: existingUnique.length,
  }
}

async function fetchApiStatus(baseUrl, slug) {
  try {
    const url = `${baseUrl}/api/partners/${encodeURIComponent(slug)}?t=${Date.now()}`
    const r = await fetch(url, { redirect: 'follow' })
    const text = await r.text()
    let payload = null
    try {
      payload = text ? JSON.parse(text) : null
    } catch {
      payload = null
    }
    return {
      httpStatus: r.status,
      status: payload?.status || null,
      source: payload?.source || null,
      ok: payload?.ok === true,
      reason: payload?.reason || null,
    }
  } catch (error) {
    return {
      httpStatus: 0,
      status: 'partner_source_error',
      source: null,
      ok: false,
      reason: error?.message || 'api_fetch_failed',
    }
  }
}

async function auditRoute(baseUrl, item) {
  const url = `${baseUrl}${item.route}`
  let status = 0
  let finalUrl = url
  let html = ''
  let title = ''
  let error = null

  try {
    const res = await fetch(url, { redirect: 'follow' })
    status = res.status
    finalUrl = res.url
    html = await res.text()
    title = extractTitle(html)
  } catch (e) {
    error = e?.message || 'fetch_failed'
  }

  const normalizedSlug = normalizeSlug(item.slug)
  const finalHasPartnerPath = normalizedSlug
    ? finalUrl.includes(`/p/${normalizedSlug}`) || finalUrl.includes(`/p/${item.slug}`)
    : false

  const partnerInfoMissing = /파트너 정보가 없습니다|정보가 없습니다|파트너를 찾을 수 없습니다/u.test(html)
  const hasPartnerName = item.expectedName ? html.includes(item.expectedName) : /파트너/u.test(html)
  const hasPartnerizedLink = normalizedSlug
    ? html.includes(`/p/${normalizedSlug}/`) || html.includes(`/p/${item.slug}/`)
    : false
  const hasInstallMenu = html.includes('앱 설치하기')
  const hasContactCta = html.includes('파트너 연락하기') || html.includes('전화하기') || html.includes('문자 보내기')

  const apiCheck = await fetchApiStatus(baseUrl, item.slug)

  const pass =
    !error &&
    status >= 200 &&
    status < 400 &&
    finalHasPartnerPath &&
    !partnerInfoMissing &&
    apiCheck.status !== 'partner_not_found'

  return {
    route: item.route,
    type: item.type,
    slug: item.slug,
    normalizedSlug,
    httpStatus: status,
    finalUrl,
    title,
    partnerInfoMissing,
    hasPartnerName,
    hasPartnerizedLink,
    hasInstallMenu,
    hasContactCta,
    finalHasPartnerPath,
    apiStatus: apiCheck.status,
    apiHttpStatus: apiCheck.httpStatus,
    apiSource: apiCheck.source,
    apiReason: apiCheck.reason,
    pass,
    error,
  }
}

async function ensureBaseReachable(baseUrl) {
  try {
    const ping = await fetch(baseUrl, { redirect: 'follow' })
    return ping.status > 0
  } catch {
    return false
  }
}

function mdRow(cols) {
  return `| ${cols.map((c) => String(c ?? '').replace(/\n/g, ' ')).join(' | ')} |`
}

async function main() {
  const sample = await collectRouteSamples()
  const reachable = await ensureBaseReachable(BASE_URL)

  const lines = []
  lines.push('# Partner Access Audit Result')
  lines.push('')
  lines.push(`- date: ${new Date().toISOString()}`)
  lines.push(`- baseUrl: ${BASE_URL}`)
  lines.push(`- baseReachable: ${reachable ? 'yes' : 'no'}`)
  lines.push(`- staticPartnerCount(partners.json): ${sample.staticCount}`)
  lines.push(`- dbFetchedCount(partners): ${sample.dbCount}`)
  lines.push(`- dbError: ${sample.dbError || 'none'}`)
  lines.push(`- existingPartnerSlug: ${sample.existingSlug}`)
  lines.push(`- detectedNewDbSlugs: ${sample.newSlugs.map((r) => r.slug).join(', ') || 'none'}`)
  lines.push('')

  if (!reachable) {
    lines.push('## Result')
    lines.push('- FAIL: audit base URL is not reachable. Start preview server or set AUDIT_BASE_URL.')
    await fs.writeFile(DOC_PATH, `${lines.join('\n')}\n`, 'utf8')
    console.error('Partner access audit failed: base URL not reachable.')
    process.exit(1)
  }

  const rows = []
  for (const item of sample.routes) {
    // eslint-disable-next-line no-await-in-loop
    const row = await auditRoute(BASE_URL, item)
    rows.push(row)
  }

  const failed = rows.filter((row) => !row.pass)

  lines.push('## Route Check Matrix')
  lines.push(mdRow([
    'route',
    'type',
    'http',
    'apiStatus',
    'partnerPath',
    'errorMessage',
    'partnerLinks',
    'installMenu',
    'contactCTA',
    'pass',
  ]))
  lines.push(mdRow(['---', '---', '---', '---', '---', '---', '---', '---', '---', '---']))

  for (const row of rows) {
    lines.push(mdRow([
      row.route,
      row.type,
      row.httpStatus,
      row.apiStatus || '-',
      row.finalHasPartnerPath ? 'yes' : 'no',
      row.partnerInfoMissing ? 'yes' : 'no',
      row.hasPartnerizedLink ? 'yes' : 'no',
      row.hasInstallMenu ? 'yes' : 'no',
      row.hasContactCta ? 'yes' : 'no',
      row.pass ? 'PASS' : 'FAIL',
    ]))
  }

  if (failed.length) {
    lines.push('')
    lines.push('## Failures')
    for (const row of failed) {
      lines.push(`- ${row.route}`)
      lines.push(`  - httpStatus: ${row.httpStatus}`)
      lines.push(`  - finalUrl: ${row.finalUrl}`)
      lines.push(`  - apiStatus: ${row.apiStatus || '-'} (http ${row.apiHttpStatus})`)
      lines.push(`  - apiReason: ${row.apiReason || '-'}`)
      lines.push(`  - partnerInfoMissing: ${row.partnerInfoMissing}`)
      lines.push(`  - finalHasPartnerPath: ${row.finalHasPartnerPath}`)
      lines.push(`  - error: ${row.error || '-'}`)
    }
  }

  lines.push('')
  lines.push('## Success Criteria')
  lines.push(`- existing/new partner routes all resolved: ${failed.length === 0 ? 'PASS' : 'FAIL'}`)
  lines.push(`- no partner-missing message on existing/new partner routes: ${rows.some((r) => r.partnerInfoMissing) ? 'FAIL' : 'PASS'}`)
  lines.push(`- partner path preserved in final URL: ${rows.every((r) => r.finalHasPartnerPath) ? 'PASS' : 'FAIL'}`)

  await fs.writeFile(DOC_PATH, `${lines.join('\n')}\n`, 'utf8')

  if (failed.length) {
    console.error(`Partner access audit failed (${failed.length} routes). See docs/partner-access-audit-result.md`)
    process.exit(1)
  }

  console.log(`Partner access audit passed (${rows.length} routes).`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
