import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rlfxuyeoluoeaxuujtly.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true },
})

// ── Auth ──────────────────────────────────────────────────
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
export async function signOut() {
  return supabase.auth.signOut()
}

// ── QA Categories (실제 테이블: qa_categories, is_active 컬럼 없음) ──
export async function getQaCategories() {
  const { data } = await supabase
    .from('qa_categories')
    .select('*')
    .order('sort_order')
  return data || []
}

// ── QA Questions (실제 테이블: qa_questions) ─────────────
export async function getQaQuestions({ categoryId = null, page = 1, limit = 20, sort = 'popular' } = {}) {
  let q = supabase
    .from('qa_questions')
    .select('*', { count: 'exact' })
    .range((page - 1) * limit, page * limit - 1)
  if (categoryId && categoryId !== 'all') q = q.eq('category_id', categoryId)
  if (sort === 'popular') q = q.order('views', { ascending: false })
  else if (sort === 'likes') q = q.order('likes', { ascending: false })
  else q = q.order('created_at', { ascending: false })
  const { data, count, error } = await q
  return { data: data || [], count: count || 0, error }
}

export async function getQaCategoryCounts() {
  const cats = [
    'metabolism','cancer_immune','digestive','cardiovascular',
    'neuro_cognitive','mental_health','musculoskeletal','skin','hair',
    'respiratory','infection_inflammation','womens_health','mens_health',
  ]
  const counts = {}
  let total = 0
  await Promise.all(cats.map(async (catId) => {
    const { count } = await supabase
      .from('qa_questions')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', catId)
    counts[catId] = count || 0
    total += count || 0
  }))
  return { counts, total }
}

export async function getQaPopular(categoryId = null, limit = 10) {
  let q = supabase
    .from('qa_questions')
    .select('id,question,category_id,views,likes')
    .order('views', { ascending: false })
    .limit(limit)
  if (categoryId) q = q.eq('category_id', categoryId)
  const { data } = await q
  return data || []
}

export async function incrementQaView(id) {
  if (!id) return
  await supabase.rpc('increment_qa_view', { question_id: id }).catch(() => {})
}

export async function toggleQaLike(id) {
  if (!id) return { liked: false }
  const { error } = await supabase.rpc('increment_qa_like', { question_id: id })
  if (error) return { liked: false, error }
  return { liked: true }
}

// ── Question Videos (anon read — 2026-05 RLS 정책으로 service_role 의존 제거) ──
export async function getVideosByCategory(categoryId, limit = 4) {
  if (!categoryId) return []
  const { data } = await supabase
    .from('question_videos')
    .select('*')
    .eq('category_id', categoryId)
    .order('sort_order', { ascending: true })
    .limit(limit)
  return data || []
}

export async function getVideosByQuestion(questionId) {
  if (!questionId) return []
  const { data } = await supabase
    .from('question_videos')
    .select('*')
    .eq('question_id', questionId)
    .order('sort_order', { ascending: true })
  return data || []
}

export async function getMainVideos() {
  const { data } = await supabase
    .from('question_videos')
    .select('*')
    .eq('is_main', true)
    .order('sort_order', { ascending: true })
    .limit(2)
  return data || []
}

// 쓰기 작업 (Admin 전용) — /api/admin 경유로 변경
// AdminPage에서만 호출. 이 함수는 클라이언트에서 직접 호출하면 RLS로 실패함.
export async function setVideoMain(id, isMain) {
  try {
    const r = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'video_set_main',
        token: sessionStorage.getItem('phl_admin_token') || '',
        payload: { id, is_main: isMain },
      }),
    })
    if (!r.ok) {
      const t = await r.text().catch(() => '')
      return { error: { message: `Admin API 오류 (${r.status}) ${t}` } }
    }
    return { error: null }
  } catch (e) { return { error: { message: e.message } } }
}

// ── Phase 3: Blog Categories (Supabase categories 테이블) ──
export async function getBlogCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, description, meta_title, meta_desc, sort_order')
      .eq('type', 'blog')
      .eq('status', 'active')
      .order('sort_order', { ascending: true })
    if (error) return null
    return (data || []).map(r => ({
      id: r.id,
      name: r.name,
      description: r.description,
      metaTitle: r.meta_title,
      metaDesc: r.meta_desc,
    }))
  } catch { return null }
}

// ── Phase 3: Pages (고정 페이지 메타) ──
export async function getPageBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'active')
      .single()
    if (error) return null
    return data
  } catch { return null }
}

// ── Blog Posts (실제 테이블: posts) ──────────────────────
// 2026-05-20: `q` (검색어) 인자 추가 — 서버사이드 ILIKE 검색.
//   기존: 클라이언트가 limit만큼만 받아 .filter() → 50개 너머의 글은 검색 누락.
//   변경: q가 주어지면 title/excerpt/tags ILIKE를 Supabase에서 직접 처리 + limit 자동 확대.
export async function getPosts({ category = null, tag = null, limit = 20, page = 1, q = null } = {}) {
  // 검색 모드일 때는 전체 published 풀에서 찾을 수 있도록 limit을 충분히 키운다.
  const effectiveLimit = q ? Math.max(limit, 500) : limit
  let query = supabase
    .from('posts')
    .select('id,slug,title,excerpt,category,tags,og_image,created_at,view_count')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .range((page - 1) * effectiveLimit, page * effectiveLimit - 1)
  if (category && category !== 'all') query = query.eq('category', category)
  if (tag) query = query.contains('tags', [tag])

  // 검색어가 있으면 PostgREST의 or 필터로 title/excerpt를 ILIKE 검색.
  // tags는 배열이라 ILIKE 직접 불가 → cs(contains) 또는 별도 처리. 여기선 title/excerpt만 서버 처리하고
  // tags는 클라이언트에서 한 번 더 보완 필터링한다 (전체 풀이므로 안전).
  if (q && q.trim()) {
    const safe = q.trim().replace(/[%,()]/g, ' ')  // PostgREST 안전 이스케이프
    query = query.or(`title.ilike.%${safe}%,excerpt.ilike.%${safe}%`)
  }

  const { data, error } = await query
  let rows = data || []

  // tags 보완 매칭 (클라이언트 사이드, 위 or 필터 결과에 누락된 tag-only 매치 글을 합치기 위해
  //   별도 쿼리 한 번 더 실행).
  if (q && q.trim()) {
    const safe = q.trim()
    const tagQuery = supabase
      .from('posts')
      .select('id,slug,title,excerpt,category,tags,og_image,created_at,view_count')
      .eq('status', 'published')
      .contains('tags', [safe])  // 정확한 태그 매치
      .order('created_at', { ascending: false })
      .limit(50)
    const { data: tagData } = await tagQuery
    if (tagData && tagData.length) {
      const have = new Set(rows.map(r => r.id))
      for (const r of tagData) if (!have.has(r.id)) rows.push(r)
    }
  }

  return { data: rows, error }
}

export async function getPostBySlug(slug) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  return { data, error }
}

export async function getPostCount(category = null) {
  let q = supabase.from('posts').select('id', { count: 'exact', head: true }).eq('status', 'published')
  if (category && category !== 'all') q = q.eq('category', category)
  const { count } = await q
  return count || 0
}

export async function incrementPostView(slug) {
  await supabase.rpc('increment_post_view', { post_slug: slug }).catch(() => {})
}

export async function upsertPost(post) {
  try {
    const r = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'post_upsert',
        token: sessionStorage.getItem('phl_admin_token') || '',
        payload: { row: post },
      }),
    })
    const data = await r.json().catch(() => null)
    if (!r.ok) return { data: null, error: { message: data?.error || `Admin API error (${r.status})` } }
    return { data: data?.data || data, error: null }
  } catch (e) {
    return { data: null, error: { message: e.message } }
  }
}

export async function deletePost(id) {
  try {
    const r = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'post_delete',
        token: sessionStorage.getItem('phl_admin_token') || '',
        payload: { id },
      }),
    })
    const data = await r.json().catch(() => null)
    if (!r.ok) return { error: { message: data?.error || `Admin API error (${r.status})` } }
    return { error: null }
  } catch (e) {
    return { error: { message: e.message } }
  }
}

export async function getAllPostsAdmin() {
  const { data, error } = await supabase
    .from('posts')
    .select('id,slug,title,category,tags,status,created_at,view_count')
    .order('created_at', { ascending: false })
  return { data: data || [], error }
}

// ── Community Posts (community_posts 테이블) ──────────────
export async function getCommunityPosts({ category = null, page = 1, limit = 20, search = '' } = {}) {
  let q = supabase
    .from('community_posts')
    .select('id,title,category,view_count,like_count,comment_count,created_at,author_id', { count: 'exact' })
    .eq('status', 'published')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)
  if (category && category !== 'all') q = q.eq('category', category)
  if (search) q = q.ilike('title', `%${search}%`)
  const { data, error, count } = await q
  return { data: data || [], error, count }
}

export async function getCommunityPost(id) {
  const { data, error } = await supabase
    .from('community_posts')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

export async function createCommunityPost({ title, content, category, is_public = true }) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: { message: '로그인이 필요합니다.' } }
  const { data, error } = await supabase
    .from('community_posts')
    .insert({ title, content, category, is_public, author_id: user.id, status: 'published' })
    .select().single()
  return { data, error }
}

export async function updateCommunityPost(id, { title, content, category, is_public }) {
  const { data, error } = await supabase
    .from('community_posts')
    .update({ title, content, category, is_public, updated_at: new Date().toISOString() })
    .eq('id', id).select().single()
  return { data, error }
}

export async function deleteCommunityPost(id) {
  return supabase.from('community_posts').delete().eq('id', id)
}

export async function getComments(postId) {
  const { data } = await supabase
    .from('community_comments')
    .select('id,content,created_at,is_deleted,author_id')
    .eq('post_id', postId)
    .eq('is_deleted', false)
    .order('created_at', { ascending: true })
  return { data: data || [] }
}

export async function createComment(postId, content) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: { message: '로그인이 필요합니다.' } }
  const { data, error } = await supabase
    .from('community_comments')
    .insert({ post_id: postId, author_id: user.id, content })
    .select('id,content,created_at,author_id').single()
  return { data, error }
}

export async function deleteComment(commentId) {
  const { error } = await supabase
    .from('community_comments')
    .update({ is_deleted: true })
    .eq('id', commentId)
  return { error }
}

export async function toggleLike(postId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인 필요' }
  const { data: existing } = await supabase
    .from('community_likes').select('id')
    .eq('post_id', postId).eq('user_id', user.id).single()
  if (existing) {
    await supabase.from('community_likes').delete().eq('id', existing.id)
    const { data: p } = await supabase.from('community_posts').select('like_count').eq('id', postId).single()
    if (p) await supabase.from('community_posts').update({ like_count: Math.max(0, (p.like_count || 0) - 1) }).eq('id', postId)
    return { liked: false }
  } else {
    await supabase.from('community_likes').insert({ post_id: postId, user_id: user.id })
    const { data: p } = await supabase.from('community_posts').select('like_count').eq('id', postId).single()
    if (p) await supabase.from('community_posts').update({ like_count: (p.like_count || 0) + 1 }).eq('id', postId)
    return { liked: true }
  }
}

export async function getLikeStatus(postId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { liked: false }
  const { data } = await supabase
    .from('community_likes').select('id')
    .eq('post_id', postId).eq('user_id', user.id).single()
  return { liked: !!data }
}

export async function incrementViewCount(id) {
  const { data } = await supabase.from('community_posts').select('view_count').eq('id', id).single()
  if (data) await supabase.from('community_posts').update({ view_count: (data.view_count || 0) + 1 }).eq('id', id)
}

export async function logShare(postId, platform) {
  const partnerSlug = localStorage.getItem('ref_partner') || null
  await supabase.from('share_logs').insert({ post_id: postId, partner_slug: partnerSlug, platform }).catch(() => {})
}

// ── Q&A 상세 (QuestionDetailPage 용 — qa_questions 기반) ──
// qa_questions에는 slug 없음 → id로 조회
export async function getQuestionBySlug(slugOrId) {
  const { data, error } = await supabase
    .from('qa_questions')
    .select('*')
    .eq('id', slugOrId)
    .single()
  return { data, error }
}

// qa_questions에 answers 없음 → 빈 배열 반환 (하위 호환)
export async function getAnswersByQuestion() {
  return []
}

// 관련 질문 (같은 카테고리)
export async function getRelatedQuestions() {
  return []
}

// [2026-05-21] 사이드바 빈 카드 결함 fix:
// - select 에 slug 컬럼이 빠져 있어 RelatedCard 의 to=/q/${q.slug} 가 undefined 였음
// - title 필드도 빠져 q.title 이 undefined → 빈 텍스트
// - 정규화: question → title, slug 없으면 question 기반 생성, 카테고리 메타도 일관 포맷
//
// 호환성: 기존 호출부가 [{id, question, category_id, views, likes}] 를 기대해도
// 추가 필드는 무시되므로 회귀 없음. RelatedCard 가 q.title || q.question 모두 받음.
function slugifyKo(s) {
  return String(s || '')
    .replace(/[^\w\s가-힣]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

function normalizeQa(row) {
  if (!row) return null
  const title = row.title || row.question || ''
  const slug  = row.slug || slugifyKo(title)
  return {
    id: row.id,
    slug,
    title,
    question: title,
    category_id: row.category_id,
    views: row.views || 0,
    likes: row.likes || 0,
  }
}

export async function getSameCategory(questionId, categoryId, limit = 5) {
  // questionId 가 null 이면 .neq('id', null) 이 됨 — Postgres 가 거짓 평가하지 않도록 가드.
  let q = supabase
    .from('qa_questions')
    .select('id,question,slug,title,category_id,views,likes')
    .eq('category_id', categoryId)
  if (questionId) q = q.neq('id', questionId)
  const { data } = await q
    .order('views', { ascending: false })
    .limit(limit)
  return (data || []).map(normalizeQa).filter(Boolean)
}

export async function incrementQuestionView(id) {
  await incrementQaView(id)
}

export async function toggleQuestionLike(id) {
  return toggleQaLike(id)
}

export async function getQuestionLikeStatus() {
  return false
}

export async function toggleSave() {
  return { saved: false }
}

export async function getSaveStatus() {
  return false
}

// ── 비회원 사용자 질문 (user_questions) ───────────────────
export async function getUserQuestions({ page = 1, limit = 50, status = '' } = {}) {
  let q = supabase
    .from('user_questions')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)
  if (status) q = q.eq('status', status)
  const { data, count, error } = await q
  return { data: data || [], count: count || 0, error }
}

export async function saveUserQuestionAnswer(id, answer) {
  return supabase
    .from('user_questions')
    .update({ admin_answer: answer, status: 'answered', answered_at: new Date().toISOString() })
    .eq('id', id)
}

export async function deleteUserQuestion(id) {
  return supabase.from('user_questions').delete().eq('id', id)
}
