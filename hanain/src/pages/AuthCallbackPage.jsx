import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

/**
 * 소셜 로그인 후 리다이렉트 되는 콜백 페이지
 * URL: /auth/callback
 */
export default function AuthCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Auth callback error:', error)
        navigate('/login?error=auth_failed')
        return
      }

      if (session?.user) {
        // ref_partner 업데이트 (localStorage에 있으면)
        const ref = localStorage.getItem('ref_partner')
        if (ref) {
          await supabase
            .from('users')
            .update({ ref_partner: ref })
            .eq('id', session.user.id)
            .is('ref_partner', null) // 최초 1회만
        }

        // 로그인 후 이동 (이전 페이지 or 커뮤니티)
        const returnTo = sessionStorage.getItem('returnTo') || '/community'
        sessionStorage.removeItem('returnTo')
        navigate(returnTo, { replace: true })
      } else {
        navigate('/login')
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-lg font-medium">로그인 처리 중...</p>
        <p className="text-gray-400 text-sm mt-2">잠시만 기다려주세요</p>
      </div>
    </div>
  )
}
