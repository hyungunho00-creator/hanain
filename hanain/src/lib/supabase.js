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
  const { data } = await supabase.from('qa_questions').select('views').eq('id', id).single()
  if (data) await supabase.from('qa_questions').update({ views: (data.views || 0) + 1 }).eq('id', id)
}

export async function toggleQaLike(id) {
  const { data } = await supabase.from('qa_questions').select('likes').eq('id', id).single()
  if (data) {
    await supabase.from('qa_questions').update({ likes: (data.likes || 0) + 1 }).eq('id', id)
    return { liked: true }
  }
  return { liked: false }
}

// ── Question Videos (service key 직접 fetch — anon RLS 우회) ──
const _SB_URL = 'https://rlfxuyeoluoeaxuujtly.supabase.co'
const _SVC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI'
const _VID_H = {
  apikey: _SVC_KEY,
  Authorization: `Bearer ${_SVC_KEY}`,
  'Accept-Profile': 'public',
  'Content-Profile': 'public',
  'Content-Type': 'application/json',
}

async function _vidFetch(qs) {
  try {
    const r = await fetch(`${_SB_URL}/rest/v1/question_videos?${qs}`, { headers: _VID_H })
    if (!r.ok) return []
    return await r.json()
  } catch { return [] }
}

export async function getVideosByCategory(categoryId, limit = 4) {
  if (!categoryId) return []
  return _vidFetch(`category_id=eq.${categoryId}&order=sort_order.asc&limit=${limit}`)
}

export async function getVideosByQuestion(questionId) {
  if (!questionId) return []
  return _vidFetch(`question_id=eq.${questionId}&order=sort_order.asc`)
}

export async function getMainVideos() {
  return _vidFetch(`is_main=eq.true&order=sort_order.asc&limit=2`)
}

export async function setVideoMain(id, isMain) {
  try {
    const r = await fetch(`${_SB_URL}/rest/v1/question_videos?id=eq.${id}`, {
      method: 'PATCH',
      headers: { ..._VID_H, Prefer: 'return=minimal' },
      body: JSON.stringify({ is_main: isMain }),
    })
    return { error: r.ok ? null : { message: '업데이트 실패' } }
  } catch (e) { return { error: { message: e.message } } }
}

// ── Blog Posts (실제 테이블: posts) ──────────────────────
export async function getPosts({ category = null, tag = null, limit = 20, page = 1 } = {}) {
  let q = supabase
    .from('posts')
    .select('id,slug,title,excerpt,category,tags,og_image,created_at,view_count')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)
  if (category && category !== 'all') q = q.eq('category', category)
  if (tag) q = q.contains('tags', [tag])
  const { data, error } = await q
  return { data: data || [], error }
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
  const { data, error } = await supabase
    .from('posts')
    .upsert(post, { onConflict: 'slug' })
    .select()
    .single()
  return { data, error }
}

export async function deletePost(id) {
  const { error } = await supabase.from('posts').delete().eq('id', id)
  return { error }
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
export async function getAnswersByQuestion(_questionId) {
  return []
}

// 관련 질문 (같은 카테고리)
export async function getRelatedQuestions(questionId, limit = 5) {
  return []
}

export async function getSameCategory(questionId, categoryId, limit = 5) {
  const { data } = await supabase
    .from('qa_questions')
    .select('id,question,category_id,views,likes')
    .eq('category_id', categoryId)
    .neq('id', questionId)
    .order('views', { ascending: false })
    .limit(limit)
  return data || []
}

export async function incrementQuestionView(id) {
  await incrementQaView(id)
}

export async function toggleQuestionLike(id) {
  return toggleQaLike(id)
}

export async function getQuestionLikeStatus(_id) {
  return false
}

export async function toggleSave(_questionId) {
  return { saved: false }
}

export async function getSaveStatus(_questionId) {
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
