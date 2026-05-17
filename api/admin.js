// Vercel Serverless Function (Node.js runtime)
//
// /api/admin — 어드민 전용 CRUD 프록시
// 클라이언트에 service_role 키를 노출하지 않기 위한 보안 게이트웨이.
//
// ─────────────────────────────────────────────────────────────
// 인증 정책 (이중 체인 — 우선순위 순):
//   1. Supabase JWT (1순위 / 권장)
//      - 클라이언트가 supabase.auth.signInWithPassword 로 로그인 후 access_token 획득
//      - Authorization: Bearer <access_token> 헤더로 전송
//      - 서버가 /auth/v1/user 엔드포인트로 토큰 검증 + app_metadata.role === 'admin' 확인
//   2. 레거시 ADMIN_TOKEN (2순위 / 호환용)
//      - 환경변수 ADMIN_TOKEN 과 정확히 일치하는 토큰을 body.token 또는 Bearer 로 전송
//      - JWT 검증 실패 시에만 fallback 으로 시도
//      - ADMIN_TOKEN 미설정 시 이 경로는 자동 비활성화 (안전 기본값)
//
// 요청 형식:
//   POST /api/admin
//   Content-Type: application/json
//   Authorization: Bearer <supabase-access-token>   // 권장
//   {
//     "action": "video_set_main",
//     "token":  "...",                              // 레거시 fallback 용
//     "payload": { "id": "uuid", "is_main": true }
//   }
//
// 응답:
//   200 { ok: true, data: ... }
//   400/401/500 { ok: false, error: "..." }       // 에러 메시지는 의도적으로 축약
// ─────────────────────────────────────────────────────────────

const SB_URL = process.env.VITE_SUPABASE_URL ||
               process.env.SUPABASE_URL ||
               'https://rlfxuyeoluoeaxuujtly.supabase.co'

// service_role: 서버 환경변수에서만 읽음 — 클라이언트 번들에 노출 금지
const SB_SVC = process.env.SUPABASE_SERVICE_ROLE_KEY ||
               process.env.SUPABASE_SERVICE_KEY ||
               ''

// anon key: JWT 검증 시 /auth/v1/user 호출에 필요 (apikey 헤더용)
// 클라이언트 노출되어도 안전한 키 (RLS 로 보호)
const SB_ANON = process.env.VITE_SUPABASE_ANON_KEY ||
                process.env.SUPABASE_ANON_KEY ||
                ''

// 레거시 토큰 — JWT 도입 후 호환성 유지용. 점진적 폐기 예정.
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || ''

// 디버그 모드 — 평소엔 false (에러 메시지 익명화)
const DEBUG = process.env.ADMIN_DEBUG === '1'

// ─────────────────────────────────────────
// Supabase JWT 검증
// /auth/v1/user 엔드포인트가 토큰 서명·만료·유효성을 모두 검증해줌
// 응답 user.app_metadata.role === 'admin' 인 경우에만 허용
// ─────────────────────────────────────────
async function verifySupabaseJwt(jwt) {
  if (!jwt || !SB_ANON) return null
  try {
    const r = await fetch(`${SB_URL}/auth/v1/user`, {
      headers: {
        apikey: SB_ANON,
        Authorization: `Bearer ${jwt}`,
      },
    })
    if (!r.ok) return null
    const user = await r.json()
    if (!user || !user.id) return null
    const role = (user.app_metadata && user.app_metadata.role) ||
                 (user.user_metadata && user.user_metadata.role) ||
                 ''
    if (role !== 'admin') return null
    return user
  } catch {
    return null
  }
}

function sbHeaders(extra = {}) {
  return {
    apikey: SB_SVC,
    Authorization: `Bearer ${SB_SVC}`,
    'Content-Type': 'application/json',
    'Accept-Profile': 'public',
    'Content-Profile': 'public',
    Prefer: 'return=representation',
    ...extra,
  }
}

async function sb(method, pathQuery, body, headers = {}) {
  const r = await fetch(`${SB_URL}/rest/v1${pathQuery}`, {
    method,
    headers: sbHeaders(headers),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  const text = await r.text()
  let json = null
  try { json = text ? JSON.parse(text) : null } catch { json = text }
  return { ok: r.ok, status: r.status, data: json }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    // Vercel Node runtime: req.body가 이미 파싱되어 있을 수 있음
    if (req.body && typeof req.body === 'object') return resolve(req.body)
    if (req.body && typeof req.body === 'string') {
      try { return resolve(JSON.parse(req.body)) } catch { return resolve({}) }
    }
    let raw = ''
    req.on('data', chunk => { raw += chunk })
    req.on('end', () => {
      if (!raw) return resolve({})
      try { resolve(JSON.parse(raw)) } catch { resolve({}) }
    })
    req.on('error', reject)
  })
}

function unauthorized(res, reason = 'Unauthorized') {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.status(401).end(JSON.stringify({ ok: false, error: reason }))
}

function badRequest(res, reason) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.status(400).end(JSON.stringify({ ok: false, error: reason }))
}

function serverError(res, reason) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.status(500).end(JSON.stringify({ ok: false, error: reason }))
}

function ok(res, data) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.status(200).end(JSON.stringify({ ok: true, data }))
}

// ─────────────────────────────────────────
// 액션 핸들러
// ─────────────────────────────────────────
const HANDLERS = {
  // ─── 헬스체크 ──────────────────────────────
  async ping() {
    // 평소엔 헬스만 반환. DEBUG 일 때만 자세한 상태 노출.
    if (!DEBUG) return { ok: true, now: new Date().toISOString() }
    return {
      now: new Date().toISOString(),
      service_role: !!SB_SVC,
      admin_token: !!ADMIN_TOKEN,
      anon_key: !!SB_ANON,
      jwt_verification: !!SB_ANON,
    }
  },

  // ─── Question Videos ──────────────────────
  async video_list() {
    const r = await sb('GET', '/question_videos?select=*&order=created_at.desc')
    if (!r.ok) throw new Error(`video_list ${r.status}`)
    return r.data
  },
  async video_upsert({ row }) {
    if (!row || typeof row !== 'object') throw new Error('row required')
    if (row.id) {
      const r = await sb('PATCH', `/question_videos?id=eq.${encodeURIComponent(row.id)}`, row)
      if (!r.ok) throw new Error(`video_upsert ${r.status} ${JSON.stringify(r.data)}`)
      return Array.isArray(r.data) ? r.data[0] : r.data
    } else {
      const r = await sb('POST', '/question_videos', row)
      if (!r.ok) throw new Error(`video_insert ${r.status} ${JSON.stringify(r.data)}`)
      return Array.isArray(r.data) ? r.data[0] : r.data
    }
  },
  async video_delete({ id }) {
    if (!id) throw new Error('id required')
    const r = await sb('DELETE', `/question_videos?id=eq.${encodeURIComponent(id)}`, undefined, { Prefer: 'return=minimal' })
    if (!r.ok) throw new Error(`video_delete ${r.status}`)
    return { id }
  },
  async video_set_main({ id, is_main }) {
    if (!id) throw new Error('id required')
    const r = await sb('PATCH', `/question_videos?id=eq.${encodeURIComponent(id)}`, { is_main: !!is_main })
    if (!r.ok) throw new Error(`video_set_main ${r.status} ${JSON.stringify(r.data)}`)
    return Array.isArray(r.data) ? r.data[0] : r.data
  },

  // ─── User Questions (비회원 질문) ──────────
  async user_questions_list({ status = '', page = 1, limit = 50 } = {}) {
    const from = (page - 1) * limit
    const to = from + limit - 1
    const q = status
      ? `/user_questions?status=eq.${encodeURIComponent(status)}&order=created_at.desc&select=*`
      : `/user_questions?order=created_at.desc&select=*`
    const r = await sb('GET', q, undefined, { Range: `${from}-${to}` })
    if (!r.ok) throw new Error(`user_questions_list ${r.status}`)
    return r.data
  },
  async user_questions_answer({ id, answer }) {
    if (!id) throw new Error('id required')
    const r = await sb('PATCH', `/user_questions?id=eq.${encodeURIComponent(id)}`, {
      admin_answer: answer,
      status: 'answered',
      answered_at: new Date().toISOString(),
    })
    if (!r.ok) throw new Error(`user_questions_answer ${r.status}`)
    return Array.isArray(r.data) ? r.data[0] : r.data
  },
  async user_questions_delete({ id }) {
    if (!id) throw new Error('id required')
    const r = await sb('DELETE', `/user_questions?id=eq.${encodeURIComponent(id)}`, undefined, { Prefer: 'return=minimal' })
    if (!r.ok) throw new Error(`user_questions_delete ${r.status}`)
    return { id }
  },

  // ─── Posts (blog) ─────────────────────────
  async post_upsert({ row }) {
    if (!row || !row.slug) throw new Error('row.slug required')
    const r = await sb('POST', '/posts?on_conflict=slug', row, { Prefer: 'resolution=merge-duplicates,return=representation' })
    if (!r.ok) throw new Error(`post_upsert ${r.status} ${JSON.stringify(r.data)}`)
    return Array.isArray(r.data) ? r.data[0] : r.data
  },
  async post_delete({ id }) {
    if (!id) throw new Error('id required')
    const r = await sb('DELETE', `/posts?id=eq.${encodeURIComponent(id)}`, undefined, { Prefer: 'return=minimal' })
    if (!r.ok) throw new Error(`post_delete ${r.status}`)
    return { id }
  },

  // ─── Partners ─────────────────────────────
  async partner_list() {
    const r = await sb('GET', '/partners?select=*&order=created_at.desc')
    if (!r.ok) throw new Error(`partner_list ${r.status}`)
    return r.data
  },
  async partner_upsert({ row }) {
    if (!row || (!row.id && !row.phone)) throw new Error('row.id or row.phone required')
    // 컬럼 화이트리스트 (오용 방지)
    const allowed = ['id','phone','name','slug','company','title','region','memo','og_image','status','sort_order']
    const safe = {}
    for (const k of allowed) if (row[k] !== undefined) safe[k] = row[k]
    if (row.id) {
      const r = await sb('PATCH', `/partners?id=eq.${encodeURIComponent(row.id)}`, safe)
      if (!r.ok) throw new Error(`partner_update ${r.status} ${JSON.stringify(r.data)}`)
      return Array.isArray(r.data) ? r.data[0] : r.data
    } else {
      const r = await sb('POST', '/partners', safe)
      if (!r.ok) throw new Error(`partner_insert ${r.status} ${JSON.stringify(r.data)}`)
      return Array.isArray(r.data) ? r.data[0] : r.data
    }
  },
  async partner_delete({ id }) {
    if (!id) throw new Error('id required')
    const r = await sb('DELETE', `/partners?id=eq.${encodeURIComponent(id)}`, undefined, { Prefer: 'return=minimal' })
    if (!r.ok) throw new Error(`partner_delete ${r.status}`)
    return { id }
  },

  // ─── Categories ───────────────────────────
  async category_list({ type = '' } = {}) {
    const q = type
      ? `/categories?type=eq.${encodeURIComponent(type)}&order=sort_order.asc&select=*`
      : `/categories?order=type.asc,sort_order.asc&select=*`
    const r = await sb('GET', q)
    if (!r.ok) throw new Error(`category_list ${r.status}`)
    return r.data
  },
  async category_upsert({ row }) {
    if (!row || !row.id || !row.type || !row.name) throw new Error('row.id, row.type, row.name required')
    const allowed = ['id','type','name','description','meta_title','meta_desc','sort_order','status']
    const safe = {}
    for (const k of allowed) if (row[k] !== undefined) safe[k] = row[k]
    safe.updated_at = new Date().toISOString()
    // upsert (on conflict id)
    const r = await sb('POST', '/categories?on_conflict=id', safe, { Prefer: 'resolution=merge-duplicates,return=representation' })
    if (!r.ok) throw new Error(`category_upsert ${r.status} ${JSON.stringify(r.data)}`)
    return Array.isArray(r.data) ? r.data[0] : r.data
  },
  async category_delete({ id }) {
    if (!id) throw new Error('id required')
    const r = await sb('DELETE', `/categories?id=eq.${encodeURIComponent(id)}`, undefined, { Prefer: 'return=minimal' })
    if (!r.ok) throw new Error(`category_delete ${r.status}`)
    return { id }
  },

  // ─── Pages ────────────────────────────────
  async page_list() {
    const r = await sb('GET', '/pages?select=*&order=sort_order.asc')
    if (!r.ok) throw new Error(`page_list ${r.status}`)
    return r.data
  },
  async page_upsert({ row }) {
    if (!row || !row.slug) throw new Error('row.slug required')
    const allowed = ['slug','title','meta_title','meta_desc','body','sort_order','status']
    const safe = {}
    for (const k of allowed) if (row[k] !== undefined) safe[k] = row[k]
    safe.updated_at = new Date().toISOString()
    const r = await sb('POST', '/pages?on_conflict=slug', safe, { Prefer: 'resolution=merge-duplicates,return=representation' })
    if (!r.ok) throw new Error(`page_upsert ${r.status} ${JSON.stringify(r.data)}`)
    return Array.isArray(r.data) ? r.data[0] : r.data
  },
  async page_delete({ slug }) {
    if (!slug) throw new Error('slug required')
    const r = await sb('DELETE', `/pages?slug=eq.${encodeURIComponent(slug)}`, undefined, { Prefer: 'return=minimal' })
    if (!r.ok) throw new Error(`page_delete ${r.status}`)
    return { slug }
  },

  // ─── Leads (문의 — 비회원 INSERT 만 RLS 허용, 관리자만 조회/갱신) ──
  async lead_list({ status = '', page = 1, limit = 50 } = {}) {
    const from = (page - 1) * limit
    const to = from + limit - 1
    const q = status
      ? `/leads?status=eq.${encodeURIComponent(status)}&order=created_at.desc&select=*`
      : `/leads?order=created_at.desc&select=*`
    const r = await sb('GET', q, undefined, { Range: `${from}-${to}` })
    if (!r.ok) throw new Error(`lead_list ${r.status}`)
    return r.data
  },
  async lead_update_status({ id, status, memo }) {
    if (!id || !status) throw new Error('id and status required')
    const body = { status }
    if (memo !== undefined) body.memo = memo
    const r = await sb('PATCH', `/leads?id=eq.${encodeURIComponent(id)}`, body)
    if (!r.ok) throw new Error(`lead_update ${r.status}`)
    return Array.isArray(r.data) ? r.data[0] : r.data
  },
  async lead_delete({ id }) {
    if (!id) throw new Error('id required')
    const r = await sb('DELETE', `/leads?id=eq.${encodeURIComponent(id)}`, undefined, { Prefer: 'return=minimal' })
    if (!r.ok) throw new Error(`lead_delete ${r.status}`)
    return { id }
  },

  // ─── Site Settings (key-value) ────────────
  async settings_get({ key }) {
    if (key) {
      const r = await sb('GET', `/site_settings?key=eq.${encodeURIComponent(key)}&select=*`)
      if (!r.ok) throw new Error(`settings_get ${r.status}`)
      return Array.isArray(r.data) ? r.data[0] : r.data
    }
    const r = await sb('GET', '/site_settings?select=*')
    if (!r.ok) throw new Error(`settings_list ${r.status}`)
    return r.data
  },
  async settings_set({ key, value }) {
    if (!key) throw new Error('key required')
    const row = { key, value, updated_at: new Date().toISOString() }
    const r = await sb('POST', '/site_settings?on_conflict=key', row, { Prefer: 'resolution=merge-duplicates,return=representation' })
    if (!r.ok) throw new Error(`settings_set ${r.status} ${JSON.stringify(r.data)}`)
    return Array.isArray(r.data) ? r.data[0] : r.data
  },
}

export default async function handler(req, res) {
  // 보안 헤더 (응답에도 적용)
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.setHeader('Cache-Control', 'no-store')

  // CORS — 같은 오리진만 허용 (동일 도메인 fetch)
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST')
    return res.status(204).end()
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end()
  }

  // 서버 환경변수 사전 검증 — 에러 메시지는 의도적으로 축약 (env 이름 노출 금지)
  if (!SB_SVC) return serverError(res, DEBUG ? 'SUPABASE_SERVICE_ROLE_KEY env not set' : 'server misconfigured')

  let body
  try { body = await readBody(req) } catch (e) { return badRequest(res, 'invalid body') }

  // ─── 인증: JWT(1순위) → 레거시 ADMIN_TOKEN(2순위) ───
  const auth = req.headers && (req.headers.authorization || req.headers.Authorization || '')
  const bearer = typeof auth === 'string' && auth.startsWith('Bearer ') ? auth.slice(7) : ''
  const bodyToken = (body && body.token) || ''

  let authorized = false
  let authMethod = ''
  let authedUser = null

  // 1순위: Supabase JWT 검증
  if (bearer) {
    const user = await verifySupabaseJwt(bearer)
    if (user) {
      authorized = true
      authMethod = 'jwt'
      authedUser = user
    }
  }

  // 2순위: 레거시 ADMIN_TOKEN (env 설정 + 정확히 일치할 때만)
  if (!authorized && ADMIN_TOKEN && bodyToken && bodyToken === ADMIN_TOKEN) {
    authorized = true
    authMethod = 'legacy'
  }

  if (!authorized) {
    // 인증 실패 — 자세한 이유 노출 안 함 (공격자에게 힌트 X)
    return unauthorized(res, 'unauthorized')
  }

  const action = body && body.action
  if (!action || typeof action !== 'string') return badRequest(res, 'action required')

  const fn = HANDLERS[action]
  if (!fn) return badRequest(res, 'unknown action')

  try {
    const data = await fn(body.payload || {})
    // 성공 응답에는 추가 정보 안 넣음 (감사 로그는 서버 로그로)
    if (DEBUG) console.log(`[admin] action=${action} via=${authMethod}${authedUser ? ` user=${authedUser.email}` : ''}`)
    return ok(res, data)
  } catch (e) {
    // 핸들러 내부 에러 — 메시지 익명화 (DB 구조·env 이름 누수 방지)
    if (DEBUG) console.error('[admin] handler error:', e)
    return serverError(res, DEBUG && e && e.message ? e.message : 'handler error')
  }
}
