import { createContext, useContext } from 'react'

// 회원가입/로그인 제거 — 항상 비로그인 상태로 고정
const AuthContext = createContext({
  user: null,
  profile: null,
  loading: false,
  isSuperAdmin: false,
  isPartner: false,
  isMember: false,
  signInWithKakao: async () => {},
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signOut: async () => {},
  refreshProfile: () => {},
})

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={AuthContext._currentValue}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
