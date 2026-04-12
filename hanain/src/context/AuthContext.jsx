import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, getUserProfile } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)   // Supabase Auth 유저
  const [profile, setProfile] = useState(null)   // users 테이블 프로필
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 현재 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else setLoading(false)
    })

    // 로그인/로그아웃 상태 변화 구독
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) fetchProfile(session.user.id)
        else { setProfile(null); setLoading(false) }
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    setLoading(true)
    const data = await getUserProfile(userId)
    setProfile(data)
    setLoading(false)
  }

  // ─── 소셜 로그인 ───────────────────────────
  const signInWithKakao = async () => {
    // 파트너 ref 저장 (로그인 전 클릭한 경우)
    const ref = localStorage.getItem('ref_partner')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: ref ? { ref_partner: ref } : {},
      },
    })
    return { error }
  }

  const signInWithGoogle = async () => {
    const ref = localStorage.getItem('ref_partner')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: ref ? { ref_partner: ref } : {},
      },
    })
    return { error }
  }

  // ─── 이메일 로그인 ─────────────────────────
  const signInWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  const signUpWithEmail = async (email, password, nickname) => {
    const ref = localStorage.getItem('ref_partner')
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: nickname,
          ref_partner: ref || null,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    return { data, error }
  }

  // ─── 로그아웃 ──────────────────────────────
  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  // ─── 권한 확인 ─────────────────────────────
  const isSuperAdmin = profile?.role === 'superadmin'
  const isPartner    = profile?.role === 'partner' || profile?.role === 'superadmin'
  const isMember     = !!user

  const value = {
    user,
    profile,
    loading,
    isSuperAdmin,
    isPartner,
    isMember,
    signInWithKakao,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    refreshProfile: () => user && fetchProfile(user.id),
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
