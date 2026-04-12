import { useState } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SEOHead from '../components/common/SEOHead'

// 카카오 아이콘
const KakaoIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.7 1.56 5.07 3.9 6.54L5 21l4.23-2.22A10.6 10.6 0 0012 19c5.52 0 10-3.48 10-8.2S17.52 3 12 3z"/>
  </svg>
)

// 구글 아이콘
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { signInWithKakao, signInWithGoogle, signInWithEmail } = useAuth()

  const [tab, setTab]         = useState('social') // 'social' | 'email'
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const returnTo = searchParams.get('returnTo') || '/community'

  const handleKakao = async () => {
    setLoading(true)
    sessionStorage.setItem('returnTo', returnTo)
    const { error } = await signInWithKakao()
    if (error) { setError('카카오 로그인에 실패했습니다.'); setLoading(false) }
  }

  const handleGoogle = async () => {
    setLoading(true)
    sessionStorage.setItem('returnTo', returnTo)
    const { error } = await signInWithGoogle()
    if (error) { setError('구글 로그인에 실패했습니다.'); setLoading(false) }
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await signInWithEmail(email, password)
    if (error) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      setLoading(false)
    } else {
      navigate(returnTo)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20">
      <SEOHead title="로그인" description="플로로탄닌 파트너스 커뮤니티 로그인" />

      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white text-2xl">🌊</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">플로로탄닌 커뮤니티</h1>
          <p className="text-gray-500 mt-1 text-base">건강 정보를 함께 나눠요</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

          {/* 탭 */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {[['social', '소셜 로그인'], ['email', '이메일 로그인']].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  tab === key ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 에러 */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">
              {error}
            </div>
          )}

          {tab === 'social' ? (
            <div className="space-y-3">
              {/* 카카오 */}
              <button
                onClick={handleKakao}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#FEE500] hover:bg-[#FDD800] text-[#3A1D1D] rounded-xl font-semibold text-base transition-all hover:shadow-md disabled:opacity-60"
              >
                <KakaoIcon />
                카카오로 시작하기
              </button>

              {/* 구글 */}
              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold text-base transition-all hover:shadow-md disabled:opacity-60"
              >
                <GoogleIcon />
                구글로 시작하기
              </button>

              <div className="text-center text-gray-400 text-sm py-2">
                ─── 또는 ───
              </div>

              <button
                onClick={() => setTab('email')}
                className="w-full py-3.5 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold text-base hover:border-teal-300 hover:text-teal-600 transition-all"
              >
                이메일로 로그인
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  placeholder="이메일을 입력하세요"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">비밀번호</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold text-base transition-all hover:shadow-md disabled:opacity-60"
              >
                {loading ? '로그인 중...' : '로그인'}
              </button>
            </form>
          )}

          {/* 회원가입 링크 */}
          <div className="mt-6 text-center">
            <span className="text-gray-500 text-sm">아직 회원이 아니신가요? </span>
            <Link to="/signup" className="text-teal-600 font-semibold text-sm hover:underline">
              회원가입
            </Link>
          </div>
        </div>

        {/* 약관 */}
        <p className="text-center text-gray-400 text-xs mt-6 leading-relaxed">
          로그인 시 <span className="underline cursor-pointer">이용약관</span> 및{' '}
          <span className="underline cursor-pointer">개인정보처리방침</span>에 동의하게 됩니다.
        </p>
      </div>
    </div>
  )
}
