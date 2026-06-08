function json(res, status, payload) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8')
  res.send(JSON.stringify(payload))
}

export default async function handler(req, res) {
  const kind = String(req.query?.kind || '').trim()

  if (kind === 'lead_stats') {
    return json(res, 200, {
      ok: false,
      data: null,
      reason: 'lead_stats_disabled',
    })
  }

  return json(res, 400, {
    ok: false,
    error: 'unsupported_metrics_kind',
  })
}
