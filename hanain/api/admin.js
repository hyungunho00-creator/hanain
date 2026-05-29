import { createClient } from '@supabase/supabase-js'

function env(...keys) {
  const envMap = globalThis?.process?.env || {}
  for (const key of keys) {
    const value = envMap[key]
    if (value) return value
  }
  return ''
}

function json(res, status, payload) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8')
  res.send(JSON.stringify(payload))
}

function getBearerToken(req) {
  const auth = req.headers?.authorization || req.headers?.Authorization || ''
  if (!auth.toLowerCase().startsWith('bearer ')) return ''
  return auth.slice(7).trim()
}

async function verifyAdmin(req, supabaseUrl, anonKey) {
  const bypassKey = env('ADMIN_API_KEY', 'VITE_BACKEND_ADMIN_KEY')
  const headerBypass = req.headers?.['x-admin-key'] || req.headers?.['X-Admin-Key']
  if (bypassKey && headerBypass && String(headerBypass) === String(bypassKey)) {
    return { ok: true, user: { role: 'admin-bypass' }, token: '' }
  }

  const token = getBearerToken(req)
  if (!token) return { ok: false, error: 'missing_authorization' }

  try {
    const r = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${token}`,
      },
    })
    if (!r.ok) return { ok: false, error: 'invalid_token' }
    const user = await r.json()
    const appRole = user?.app_metadata?.role
    const allowRoles = new Set(['admin', 'superadmin'])
    if (!allowRoles.has(appRole)) return { ok: false, error: 'forbidden_role' }
    return { ok: true, user, token }
  } catch {
    return { ok: false, error: 'auth_verify_failed' }
  }
}

function sanitizePostRow(input = {}) {
  const row = { ...input }
  const allow = [
    'slug',
    'title',
    'excerpt',
    'content',
    'category',
    'tags',
    'meta_title',
    'meta_desc',
    'og_image',
    'status',
    'view_count',
    'published_at',
    'created_at',
    'updated_at',
  ]
  const out = {}
  for (const key of allow) if (row[key] !== undefined) out[key] = row[key]
  if (out.slug) out.slug = String(out.slug).trim().toLowerCase()
  if (out.tags && !Array.isArray(out.tags)) out.tags = []
  if (!out.status) out.status = 'published'
  return out
}

async function runAction(admin, action, payload = {}) {
  switch (action) {
    case 'post_upsert': {
      const row = sanitizePostRow(payload.row || {})
      if (!row.slug || !row.title || !row.content) return { error: 'missing_required_post_fields' }
      const { data, error } = await admin
        .from('posts')
        .upsert(row, { onConflict: 'slug' })
        .select('*')
        .single()
      return { data, error: error?.message || null }
    }

    case 'post_delete': {
      const id = payload.id
      if (!id) return { error: 'missing_post_id' }
      const { error } = await admin.from('posts').delete().eq('id', id)
      return { data: { ok: !error }, error: error?.message || null }
    }

    case 'video_set_main': {
      const id = payload.id
      const isMain = !!payload.is_main
      if (!id) return { error: 'missing_video_id' }
      const { data, error } = await admin
        .from('question_videos')
        .update({ is_main: isMain })
        .eq('id', id)
        .select('*')
        .single()
      return { data, error: error?.message || null }
    }

    case 'video_list': {
      const { data, error } = await admin
        .from('question_videos')
        .select('*')
        .order('created_at', { ascending: false })
      return { data: data || [], error: error?.message || null }
    }

    case 'video_upsert': {
      const row = { ...(payload.row || {}) }
      const { data, error } = await admin
        .from('question_videos')
        .upsert(row, { onConflict: 'id' })
        .select('*')
        .single()
      return { data, error: error?.message || null }
    }

    case 'video_delete': {
      const id = payload.id
      if (!id) return { error: 'missing_video_id' }
      const { error } = await admin.from('question_videos').delete().eq('id', id)
      return { data: { ok: !error }, error: error?.message || null }
    }

    case 'partner_list': {
      const { data, error } = await admin
        .from('partners')
        .select('*')
        .order('created_at', { ascending: false })
      return { data: data || [], error: error?.message || null }
    }

    case 'partner_upsert': {
      const row = { ...(payload.row || {}) }
      const { data, error } = await admin
        .from('partners')
        .upsert(row, { onConflict: 'phone' })
        .select('*')
        .single()
      return { data, error: error?.message || null }
    }

    case 'partner_delete': {
      const id = payload.id
      if (!id) return { error: 'missing_partner_id' }
      const { error } = await admin.from('partners').delete().eq('id', id)
      return { data: { ok: !error }, error: error?.message || null }
    }

    case 'category_list': {
      const { data, error } = await admin.from('categories').select('*').order('sort_order', { ascending: true })
      return { data: data || [], error: error?.message || null }
    }

    case 'category_upsert': {
      const row = { ...(payload.row || {}) }
      const { data, error } = await admin
        .from('categories')
        .upsert(row, { onConflict: 'id' })
        .select('*')
        .single()
      return { data, error: error?.message || null }
    }

    case 'category_delete': {
      const id = payload.id
      if (!id) return { error: 'missing_category_id' }
      const { error } = await admin.from('categories').delete().eq('id', id)
      return { data: { ok: !error }, error: error?.message || null }
    }

    case 'page_list': {
      const { data, error } = await admin.from('pages').select('*').order('sort_order', { ascending: true })
      return { data: data || [], error: error?.message || null }
    }

    case 'page_upsert': {
      const row = { ...(payload.row || {}) }
      const { data, error } = await admin
        .from('pages')
        .upsert(row, { onConflict: 'slug' })
        .select('*')
        .single()
      return { data, error: error?.message || null }
    }

    case 'page_delete': {
      const slug = payload.slug
      if (!slug) return { error: 'missing_page_slug' }
      const { error } = await admin.from('pages').delete().eq('slug', slug)
      return { data: { ok: !error }, error: error?.message || null }
    }

    case 'lead_list': {
      let q = admin.from('leads').select('*').order('created_at', { ascending: false })
      if (payload.status) q = q.eq('status', payload.status)
      const { data, error } = await q
      return { data: data || [], error: error?.message || null }
    }

    case 'lead_update_status': {
      const id = payload.id
      const status = payload.status
      if (!id || !status) return { error: 'missing_lead_fields' }
      const { data, error } = await admin
        .from('leads')
        .update({ status })
        .eq('id', id)
        .select('*')
        .single()
      return { data, error: error?.message || null }
    }

    case 'lead_delete': {
      const id = payload.id
      if (!id) return { error: 'missing_lead_id' }
      const { error } = await admin.from('leads').delete().eq('id', id)
      return { data: { ok: !error }, error: error?.message || null }
    }

    case 'settings_get': {
      const { data, error } = await admin.from('settings').select('*')
      return { data: data || [], error: error?.message || null }
    }

    case 'settings_set': {
      const key = payload.key
      if (!key) return { error: 'missing_setting_key' }
      const row = { key, value: payload.value ?? '', updated_at: new Date().toISOString() }
      const { data, error } = await admin
        .from('settings')
        .upsert(row, { onConflict: 'key' })
        .select('*')
        .single()
      return { data, error: error?.message || null }
    }

    default:
      return { error: `unknown_action:${action}` }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, { error: 'method_not_allowed' })
  }

  const supabaseUrl = env('VITE_SUPABASE_URL', 'SUPABASE_URL')
  const anonKey = env('VITE_SUPABASE_ANON_KEY', 'SUPABASE_ANON_KEY')
  const serviceKey = env(
    'SUPABASE_SECRET_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'SUPABASE_SERVICE_KEY',
  )

  if (!supabaseUrl || !anonKey) return json(res, 500, { error: 'missing_supabase_public_env' })

  const verified = await verifyAdmin(req, supabaseUrl, anonKey)
  if (!verified.ok) return json(res, 401, { error: verified.error || 'unauthorized' })

  let body = {}
  try {
    body = typeof req.body === 'string'
      ? JSON.parse(req.body || '{}')
      : (req.body || {})
  } catch {
    return json(res, 400, { error: 'invalid_json_body' })
  }
  const action = body.action
  const payload = body.payload || {}
  if (!action) return json(res, 400, { error: 'missing_action' })

  const adminKey = serviceKey || anonKey
  const admin = createClient(supabaseUrl, adminKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: verified.token
      ? { headers: { Authorization: `Bearer ${verified.token}` } }
      : undefined,
  })

  try {
    const result = await runAction(admin, action, payload)
    if (result.error) return json(res, 400, { error: result.error, data: result.data ?? null })
    return json(res, 200, { data: result.data ?? null })
  } catch (error) {
    return json(res, 500, { error: error?.message || 'internal_error' })
  }
}
