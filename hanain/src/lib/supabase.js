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

// ─── 편의 함수들 ───────────────────────────────

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
