import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true },
})

// ── Auth ──────────────────────────────────────────────────
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
export async function getUserProfile(userId) {
  const { data } = await supabase.from('users').select('*').eq('id', userId).single()
  return data
}
export async function signOut() {
  return supabase.auth.signOut()
}

// ── Categories ────────────────────────────────────────────
export async function getCategories() {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
  return data || []
}
export async function getCategoryBySlug(slug) {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

// ── Questions ─────────────────────────────────────────────
export async function getQuestions({
  categoryId = null, page = 1, limit = 20,
  search = '', sort = 'latest', status = 'published'
} = {}) {
  let q = supabase
    .from('questions')
    .select(`
      id, slug, title, category_id, tags, view_count, like_count,
      author_type, visibility, difficulty, is_featured, created_at,
      categories(id, name, slug, color, icon),
      users!questions_author_id_fkey(nickname)
    `, { count: 'exact' })
    .eq('status', status)
    .in('visibility', ['public', 'anonymous'])
    .range((page - 1) * limit, page * limit - 1)

  if (categoryId && categoryId !== 'all') q = q.eq('category_id', categoryId)
  if (search) q = q.ilike('title', `%${search}%`)
  if (sort === 'latest')  q = q.order('created_at', { ascending: false })
  if (sort === 'popular') q = q.order('view_count',  { ascending: false })
  if (sort === 'likes')   q = q.order('like_count',  { ascending: false })

  const { data, count, error } = await q
  return { data: data || [], count: count || 0, error }
}

export async function getQuestionBySlug(slug) {
  const { data, error } = await supabase
    .from('questions')
    .select(`
      *,
      categories(id, name, slug, color, icon, description),
      users!questions_author_id_fkey(id, nickname, avatar_url)
    `)
    .eq('slug', slug)
    .single()
  return { data, error }
}

export async function getQuestionById(id) {
  const { data, error } = await supabase
    .from('questions')
    .select(`
      *,
      categories(id, name, slug, color, icon, description),
      users!questions_author_id_fkey(id, nickname, avatar_url)
    `)
    .eq('id', id)
    .single()
  return { data, error }
}

export async function getFeaturedQuestions(limit = 6) {
  const { data } = await supabase
    .from('questions')
    .select(`id, slug, title, category_id, view_count, like_count, categories(name, color, icon)`)
    .eq('status', 'published')
    .eq('is_featured', true)
    .in('visibility', ['public', 'anonymous'])
    .order('view_count', { ascending: false })
    .limit(limit)
  return data || []
}

export async function getPopularQuestions(limit = 10, categoryId = null) {
  let q = supabase
    .from('questions')
    .select(`id, slug, title, category_id, view_count, like_count, tags, categories(name, color, slug, icon)`)
    .eq('status', 'published')
    .in('visibility', ['public', 'anonymous'])
    .order('view_count', { ascending: false })
    .limit(limit)
  if (categoryId) q = q.eq('category_id', categoryId)
  const { data } = await q
  return data || []
}

export async function getLatestQuestions(limit = 10, categoryId = null) {
  let q = supabase
    .from('questions')
    .select(`id, slug, title, category_id, created_at, tags, categories(name, color, slug, icon)`)
    .eq('status', 'published')
    .in('visibility', ['public', 'anonymous'])
    .order('created_at', { ascending: false })
    .limit(limit)
  if (categoryId) q = q.eq('category_id', categoryId)
  const { data } = await q
  return data || []
}

export async function createQuestion({ title, content, categoryId, authorType, visibility, answerAlert, tags }) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: { message: '로그인이 필요합니다.' } }

  // slug 생성
  const base = title.replace(/[^\w\s가-힣]/g, '').replace(/\s+/g, '-').slice(0, 60)
  const slug = `${base}-${Date.now()}`

  const { data, error } = await supabase.from('questions').insert({
    slug, title, content, category_id: categoryId,
    author_id: user.id, author_type: authorType,
    visibility, answer_alert: answerAlert,
    tags: tags || [], status: 'published',
  }).select().single()
  return { data, error }
}

export async function incrementQuestionView(id) {
  const { data } = await supabase.from('questions').select('view_count').eq('id', id).single()
  if (data) await supabase.from('questions').update({ view_count: (data.view_count || 0) + 1 }).eq('id', id)
}

// ── Answers ───────────────────────────────────────────────
export async function getAnswersByQuestion(questionId) {
  const { data } = await supabase
    .from('answers')
    .select(`*, users!answers_author_id_fkey(nickname, avatar_url)`)
    .eq('question_id', questionId)
    .order('is_official', { ascending: false })
    .order('created_at', { ascending: true })
  return data || []
}

// ── Related Questions ─────────────────────────────────────
export async function getRelatedQuestions(questionId, limit = 5) {
  const { data } = await supabase
    .from('question_relations')
    .select(`
      related_question_id,
      questions!question_relations_related_question_id_fkey(id, slug, title, category_id, view_count, categories(name, color, icon))
    `)
    .eq('question_id', questionId)
    .order('sort_order')
    .limit(limit)
  return (data || []).map(r => r.questions).filter(Boolean)
}

export async function getSameCategory(questionId, categoryId, limit = 5) {
  const { data } = await supabase
    .from('questions')
    .select(`id, slug, title, view_count, like_count, categories(name, color, icon)`)
    .eq('category_id', categoryId)
    .eq('status', 'published')
    .neq('id', questionId)
    .in('visibility', ['public', 'anonymous'])
    .order('view_count', { ascending: false })
    .limit(limit)
  return data || []
}

// ── Question Videos ───────────────────────────────────────
export async function getVideosByQuestion(questionId) {
  const { data } = await supabase
    .from('question_videos')
    .select('*')
    .eq('question_id', questionId)
    .order('sort_order')
  return data || []
}

export async function getVideosByCategory(categoryId, limit = 4) {
  const { data } = await supabase
    .from('question_videos')
    .select('*')
    .eq('category_id', categoryId)
    .is('question_id', null)
    .order('sort_order')
    .limit(limit)
  return data || []
}

// 메인 고정 영상 (is_main = true, 최대 2개) — 메인 페이지 전용
export async function getMainVideos() {
  const { data } = await supabase
    .from('question_videos')
    .select('*')
    .eq('is_main', true)
    .order('sort_order')
    .limit(2)
  return data || []
}

// 메인 고정 영상 설정 토글 (어드민 전용)
export async function setVideoMain(id, isMain) {
  const { error } = await supabase
    .from('question_videos')
    .update({ is_main: isMain })
    .eq('id', id)
  return { error }
}

// ── Likes ─────────────────────────────────────────────────
export async function getQuestionLikeStatus(questionId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  const { data } = await supabase
    .from('question_likes')
    .select('id')
    .eq('question_id', questionId)
    .eq('user_id', user.id)
    .single()
  return !!data
}

export async function toggleQuestionLike(questionId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인 필요' }
  const { data: existing } = await supabase
    .from('question_likes').select('id')
    .eq('question_id', questionId).eq('user_id', user.id).single()

  if (existing) {
    await supabase.from('question_likes').delete().eq('id', existing.id)
    const { data: q } = await supabase.from('questions').select('like_count').eq('id', questionId).single()
    if (q) await supabase.from('questions').update({ like_count: Math.max(0, q.like_count - 1) }).eq('id', questionId)
    return { liked: false }
  } else {
    await supabase.from('question_likes').insert({ question_id: questionId, user_id: user.id })
    const { data: q } = await supabase.from('questions').select('like_count').eq('id', questionId).single()
    if (q) await supabase.from('questions').update({ like_count: (q.like_count || 0) + 1 }).eq('id', questionId)
    return { liked: true }
  }
}

// ── Saved ─────────────────────────────────────────────────
export async function getSaveStatus(questionId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  const { data } = await supabase
    .from('saved_questions').select('id')
    .eq('question_id', questionId).eq('user_id', user.id).single()
  return !!data
}

export async function toggleSave(questionId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인 필요' }
  const { data: existing } = await supabase
    .from('saved_questions').select('id')
    .eq('question_id', questionId).eq('user_id', user.id).single()
  if (existing) {
    await supabase.from('saved_questions').delete().eq('id', existing.id)
    return { saved: false }
  } else {
    await supabase.from('saved_questions').insert({ question_id: questionId, user_id: user.id })
    return { saved: true }
  }
}

// ── My Page ───────────────────────────────────────────────
export async function getMyQuestions(userId) {
  const { data } = await supabase
    .from('questions')
    .select(`id, slug, title, category_id, status, visibility, created_at, categories(name, color)`)
    .eq('author_id', userId)
    .order('created_at', { ascending: false })
  return data || []
}

export async function getMySavedQuestions(userId) {
  const { data } = await supabase
    .from('saved_questions')
    .select(`question_id, created_at, questions(id, slug, title, category_id, view_count, categories(name, color))`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return (data || []).map(r => r.questions).filter(Boolean)
}

export async function updateUserProfile(userId, updates) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  return { data, error }
}

// ── Community posts (기존) ────────────────────────────────
export async function getPosts({ category = null, page = 1, limit = 20, search = '' } = {}) {
  let query = supabase
    .from('posts')
    .select(`id, title, category, view_count, like_count, comment_count, share_count, created_at, author_id,
      users!posts_author_id_fkey(nickname, avatar_url)`, { count: 'exact' })
    .eq('status', 'published').eq('is_public', true)
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)
  if (category && category !== 'all') query = query.eq('category', category)
  if (search) query = query.ilike('title', `%${search}%`)
  const { data, error, count } = await query
  return { data: data || [], error, count }
}

export async function getPost(id) {
  const { data, error } = await supabase
    .from('posts')
    .select(`*, users!posts_author_id_fkey(id, nickname, avatar_url, role)`)
    .eq('id', id).single()
  return { data, error }
}

export async function createPost({ title, content, category, is_public = true }) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: { message: '로그인이 필요합니다.' } }
  const { data, error } = await supabase.from('posts')
    .insert({ title, content, category, is_public, author_id: user.id, status: 'published' })
    .select().single()
  return { data, error }
}

export async function updatePost(id, { title, content, category, is_public }) {
  const { data, error } = await supabase.from('posts')
    .update({ title, content, category, is_public, updated_at: new Date().toISOString() })
    .eq('id', id).select().single()
  return { data, error }
}

export async function deletePost(id) {
  return supabase.from('posts').delete().eq('id', id)
}

export async function getComments(postId) {
  const { data } = await supabase.from('comments')
    .select(`id, content, created_at, is_deleted, users!comments_author_id_fkey(id, nickname, avatar_url)`)
    .eq('post_id', postId).eq('is_deleted', false).order('created_at', { ascending: true })
  return { data: data || [] }
}

export async function createComment(postId, content) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: { message: '로그인이 필요합니다.' } }
  const { data, error } = await supabase.from('comments')
    .insert({ post_id: postId, author_id: user.id, content })
    .select(`id, content, created_at, users!comments_author_id_fkey(id, nickname, avatar_url)`).single()
  return { data, error }
}

export async function deleteComment(commentId, postId) {
  const { error } = await supabase.from('comments').update({ is_deleted: true }).eq('id', commentId)
  return { error }
}

export async function toggleLike(postId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인 필요' }
  const { data: existing } = await supabase.from('likes').select('id')
    .eq('post_id', postId).eq('user_id', user.id).single()
  if (existing) {
    await supabase.from('likes').delete().eq('id', existing.id)
    const { data: p } = await supabase.from('posts').select('like_count').eq('id', postId).single()
    if (p) await supabase.from('posts').update({ like_count: Math.max(0, p.like_count - 1) }).eq('id', postId)
    return { liked: false }
  } else {
    await supabase.from('likes').insert({ post_id: postId, user_id: user.id })
    const { data: p } = await supabase.from('posts').select('like_count').eq('id', postId).single()
    if (p) await supabase.from('posts').update({ like_count: (p.like_count || 0) + 1 }).eq('id', postId)
    return { liked: true }
  }
}

export async function getLikeStatus(postId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { liked: false }
  const { data } = await supabase.from('likes').select('id')
    .eq('post_id', postId).eq('user_id', user.id).single()
  return { liked: !!data }
}

export async function logShare(postId, platform) {
  const partnerSlug = localStorage.getItem('ref_partner') || null
  await supabase.from('share_logs').insert({ post_id: postId, partner_slug: partnerSlug, platform }).catch(() => {})
  const { data } = await supabase.from('posts').select('share_count').eq('id', postId).single()
  if (data) await supabase.from('posts').update({ share_count: (data.share_count || 0) + 1 }).eq('id', postId)
}

export async function incrementViewCount(id) {
  const { data } = await supabase.from('posts').select('view_count').eq('id', id).single()
  if (data) await supabase.from('posts').update({ view_count: (data.view_count || 0) + 1 }).eq('id', id)
}

// ── Admin: Questions ──────────────────────────────────────
export async function adminGetQuestions({ page = 1, limit = 30, search = '', categoryId = '', status = '' } = {}) {
  let q = supabase.from('questions')
    .select(`*, categories(name, color), users!questions_author_id_fkey(nickname, email)`, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)
  if (search) q = q.ilike('title', `%${search}%`)
  if (categoryId) q = q.eq('category_id', categoryId)
  if (status) q = q.eq('status', status)
  const { data, count, error } = await q
  return { data: data || [], count: count || 0, error }
}

export async function adminUpdateQuestion(id, updates) {
  const { data, error } = await supabase.from('questions').update(updates).eq('id', id).select().single()
  return { data, error }
}

export async function adminCreateAnswer(questionId, content) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase.from('answers')
    .insert({ question_id: questionId, content, author_id: user?.id, is_official: true })
    .select().single()
  return { data, error }
}

export async function adminUpdateAnswer(id, content) {
  return supabase.from('answers').update({ content, updated_at: new Date().toISOString() }).eq('id', id)
}

export async function adminDeleteAnswer(id) {
  return supabase.from('answers').delete().eq('id', id)
}

export async function adminAddVideo({ questionId, categoryId, youtubeUrl, videoTitle, videoSummary, sortOrder }) {
  const { data, error } = await supabase.from('question_videos').insert({
    question_id: questionId || null,
    category_id: categoryId || null,
    youtube_url: youtubeUrl,
    video_title: videoTitle,
    video_summary: videoSummary,
    sort_order: sortOrder || 0,
  }).select().single()
  return { data, error }
}

export async function adminSetRelated(questionId, relatedIds) {
  await supabase.from('question_relations').delete().eq('question_id', questionId)
  if (!relatedIds.length) return
  const rows = relatedIds.map((rid, i) => ({ question_id: questionId, related_question_id: rid, sort_order: i }))
  return supabase.from('question_relations').insert(rows)
}

export async function adminGetUsers({ page = 1, limit = 30, search = '' } = {}) {
  let q = supabase.from('users')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)
  if (search) q = q.or(`nickname.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`)
  const { data, count, error } = await q
  return { data: data || [], count: count || 0, error }
}

export async function adminGetVideos() {
  const { data } = await supabase.from('question_videos')
    .select('*, questions(title), categories(name)')
    .order('created_at', { ascending: false })
  return data || []
}

export async function adminDeleteVideo(id) {
  return supabase.from('question_videos').delete().eq('id', id)
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

// ── QA (qa_categories / qa_questions) ────────────────────
export async function getQaCategories() {
  const { data } = await supabase
    .from('qa_categories')
    .select('*')
    .order('sort_order')
  return data || []
}

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

// 카테고리별 정확한 카운트 집계 (Supabase 1000행 제한 우회)
export async function getQaCategoryCounts() {
  const cats = ['metabolism','cancer_immune','digestive','cardiovascular',
    'neuro_cognitive','mental_health','musculoskeletal','skin_hair',
    'respiratory','infection_inflammation','womens_health','mens_health']

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
