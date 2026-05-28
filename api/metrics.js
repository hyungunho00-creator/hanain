const SB_URL =
  process.env.VITE_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://rlfxuyeoluoeaxuujtly.supabase.co'

const SB_SVC =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  ''

function parseCountFromRange(contentRange) {
  if (!contentRange) return null
  const m = String(contentRange).match(/\/(\d+)$/)
  return m ? Number(m[1]) : null
}

function getKstUtcWindow() {
  const now = new Date()
  const kstMs = now.getTime() + 9 * 60 * 60 * 1000
  const kst = new Date(kstMs)
  const y = kst.getUTCFullYear()
  const m = kst.getUTCMonth()
  const d = kst.getUTCDate()
  const startKst = new Date(Date.UTC(y, m, d, 0, 0, 0))
  const endKst = new Date(Date.UTC(y, m, d + 1, 0, 0, 0))
  return {
    startUtcIso: new Date(startKst.getTime() - 9 * 60 * 60 * 1000).toISOString(),
    endUtcIso: new Date(endKst.getTime() - 9 * 60 * 60 * 1000).toISOString(),
  }
}

async function headCount(pathQuery) {
  const r = await fetch(`${SB_URL}/rest/v1${pathQuery}`, {
    method: 'HEAD',
    headers: {
      apikey: SB_SVC,
      Authorization: `Bearer ${SB_SVC}`,
      'Accept-Profile': 'public',
      'Content-Profile': 'public',
      Prefer: 'count=exact',
    },
  })
  if (!r.ok) {
    throw new Error(`count failed: ${r.status}`)
  }
  return parseCountFromRange(r.headers.get('content-range')) ?? 0
}

export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Cache-Control', 'public, max-age=120, stale-while-revalidate=300')

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ ok: false, error: 'method not allowed' })
  }

  if (!SB_SVC) {
    return res.status(500).json({ ok: false, error: 'server misconfigured' })
  }

  const kind = req.query?.kind || 'lead_stats'
  if (kind !== 'lead_stats') {
    return res.status(400).json({ ok: false, error: 'unsupported kind' })
  }

  try {
    const totalCount = await headCount('/leads?select=id')
    const { startUtcIso, endUtcIso } = getKstUtcWindow()
    const todayCount = await headCount(
      `/leads?select=id&created_at=gte.${encodeURIComponent(startUtcIso)}&created_at=lt.${encodeURIComponent(endUtcIso)}`,
    )

    return res.status(200).json({
      ok: true,
      data: {
        todayCount,
        totalCount,
        timezone: 'Asia/Seoul',
        dayWindowUtc: [startUtcIso, endUtcIso],
      },
    })
  } catch {
    return res.status(500).json({ ok: false, error: 'metrics unavailable' })
  }
}
