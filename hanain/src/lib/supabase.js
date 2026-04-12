import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase 환경변수가 설정되지 않았습니다.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// ─── Auth 편의 함수들 ───────────────────────────────

// 현재 로그인 유저
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// 유저 프로필 (users 테이블)
export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) return null
  return data
}

// 로그아웃
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// ─── 게시글 CRUD ───────────────────────────────────

// 게시글 목록 조회
export async function getPosts({ category = null, page = 1, limit = 20, search = '' } = {}) {
  let query = supabase
    .from('posts')
    .select(`
      id, title, category, view_count, like_count, comment_count, share_count,
      created_at, author_id,
      users!posts_author_id_fkey(nickname, avatar_url)
    `, { count: 'exact' })
    .eq('status', 'published')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (category && category !== 'all') {
    query = query.eq('category', category)
  }
  if (search) {
    query = query.ilike('title', `%${search}%`)
  }

  const { data, error, count } = await query
  return { data: data || [], error, count }
}

// 게시글 단건 조회
export async function getPost(id) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      users!posts_author_id_fkey(id, nickname, avatar_url, role)
    `)
    .eq('id', id)
    .single()
  return { data, error }
}

// 게시글 작성
export async function createPost({ title, content, category, is_public = true }) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: { message: '로그인이 필요합니다.' } }

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title,
      content,
      category,
      is_public,
      author_id: user.id,
      status: 'published',
    })
    .select()
    .single()
  return { data, error }
}

// 게시글 수정
export async function updatePost(id, { title, content, category, is_public }) {
  const { data, error } = await supabase
    .from('posts')
    .update({ title, content, category, is_public, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

// 게시글 삭제
export async function deletePost(id) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
  return { error }
}

// 조회수 증가
export async function incrementViewCount(id) {
  await supabase.rpc('increment_view_count', { post_id: id }).catch(() => {
    // RPC 없으면 직접 업데이트
    supabase.from('posts').select('view_count').eq('id', id).single()
      .then(({ data }) => {
        if (data) supabase.from('posts').update({ view_count: (data.view_count || 0) + 1 }).eq('id', id)
      })
  })
}

// ─── 댓글 CRUD ──────────────────────────────────────

// 댓글 목록 조회
export async function getComments(postId) {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      id, content, created_at, is_deleted,
      users!comments_author_id_fkey(id, nickname, avatar_url)
    `)
    .eq('post_id', postId)
    .eq('is_deleted', false)
    .order('created_at', { ascending: true })
  return { data: data || [], error }
}

// 댓글 작성
export async function createComment(postId, content) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: { message: '로그인이 필요합니다.' } }

  const { data, error } = await supabase
    .from('comments')
    .insert({ post_id: postId, author_id: user.id, content })
    .select(`
      id, content, created_at,
      users!comments_author_id_fkey(id, nickname, avatar_url)
    `)
    .single()

  if (!error) {
    // comment_count 업데이트
    await supabase.rpc('increment_comment_count', { post_id: postId }).catch(() => {})
  }
  return { data, error }
}

// 댓글 삭제
export async function deleteComment(commentId, postId) {
  const { error } = await supabase
    .from('comments')
    .update({ is_deleted: true })
    .eq('id', commentId)

  if (!error) {
    await supabase.rpc('decrement_comment_count', { post_id: postId }).catch(() => {})
  }
  return { error }
}

// ─── 좋아요 ──────────────────────────────────────────

// 좋아요 상태 확인
export async function getLikeStatus(postId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { liked: false }

  const { data } = await supabase
    .from('likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .single()
  return { liked: !!data }
}

// 좋아요 토글
export async function toggleLike(postId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: { message: '로그인이 필요합니다.' } }

  const { data: existing } = await supabase
    .from('likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .single()

  if (existing) {
    // 좋아요 취소
    await supabase.from('likes').delete().eq('id', existing.id)
    await supabase.from('posts').select('like_count').eq('id', postId).single()
      .then(({ data }) => {
        if (data) supabase.from('posts').update({ like_count: Math.max(0, (data.like_count || 1) - 1) }).eq('id', postId)
      })
    return { liked: false }
  } else {
    // 좋아요 추가
    await supabase.from('likes').insert({ post_id: postId, user_id: user.id })
    await supabase.from('posts').select('like_count').eq('id', postId).single()
      .then(({ data }) => {
        if (data) supabase.from('posts').update({ like_count: (data.like_count || 0) + 1 }).eq('id', postId)
      })
    return { liked: true }
  }
}

// ─── 공유 로그 ───────────────────────────────────────

export async function logShare(postId, platform) {
  const partnerSlug = localStorage.getItem('ref_partner') || null
  await supabase
    .from('share_logs')
    .insert({ post_id: postId, partner_slug: partnerSlug, platform })
    .catch(() => {})

  await supabase.from('posts').select('share_count').eq('id', postId).single()
    .then(({ data }) => {
      if (data) supabase.from('posts').update({ share_count: (data.share_count || 0) + 1 }).eq('id', postId)
    })
}
