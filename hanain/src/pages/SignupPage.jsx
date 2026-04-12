import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SEOHead from '../components/common/SEOHead'

const KakaoIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.7 1.56 5.07 3.9 6.54L5 21l4.23-2.22A10.6 10.6 0 0012 19c5.52 0 10-3.48 10-8.2S17.52 3 12 3z"/>
  </svg>
)

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

export default function SignupPage() {
  const navigate = useNavigate()
  const { signUpWithEmail, signInWithKakao, signInWithGoogle } = useAuth()

  const [step, setStep]         = useState(1) // 1: 방법선택, 2: 이메일폼, 3: 완료
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [agree, setAgree]       = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleKakao = async () => {
    setLoading(true)
    sessionStorage.setItem('returnTo', '/community')
    await signInWithKakao()
  }

  const handleGoogle = async () => {
    setLoading(true)
    sessionStorage.setItem('returnTo', '/community')
    await signInWithGoogle()
  }

  const handleEmailSignup = async (e) => {
    e.preventDefault()
    if (!agree) { setError('이용약관에 동의해주세요'); return }
    if (password.length < 8) { setError('비밀번호는 8자 이상이어야 합니다'); return }
    if (!nickname.trim()) { setError('닉네임을 입력해주세요'); return }

    setLoading(true); setError('')
    const { data, error } = await signUpWithEmail(email, password, nickname)
    if (error) {
      if (error.message.includes('already registered')) {
        setError('이미 가입된 이메일입니다. 로그인해주세요.')
      } else {
        setError('가입 중 오류가 발생했습니다: ' + error.message)
      }
      setLoading(false)
    } else {
      setStep(3)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20">
      <SEOHead title="회원가입" description="플로로탄닌 커뮤니티 회원가입" />

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white text-2xl">🌊</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">커뮤니티 가입하기</h1>
          <p className="text-gray-500 mt-1 text-base">건강 정보를 함께 나눠요</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

          {step === 1 && (
            <div className="space-y-3">
              <p className="text-center text-gray-600 font-medium mb-5">가입 방법을 선택하세요</p>

              <button
                onClick={handleKakao}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#FEE500] hover:bg-[#FDD800] text-[#3A1D1D] rounded-xl font-semibold text-base transition-all hover:shadow-md disabled:opacity-60"
              >
                <KakaoIcon />
                카카오로 가입하기
              </button>

              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold text-base transition-all hover:shadow-md disabled:opacity-60"
              >
                <GoogleIcon />
                구글로 가입하기
              </button>

              <div className="text-center text-gray-400 text-sm py-2">─── 또는 ───</div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold text-base hover:border-teal-300 hover:text-teal-600 transition-all"
              >
                이메일로 가입하기
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <button type="button" onClick={() => setStep(1)} className="text-gray-400 text-sm hover:text-gray-600 flex items-center gap-1 mb-2">
                ← 뒤로
              </button>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">닉네임 *</label>
                <input
                  type="text" value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="활동할 닉네임" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">이메일 *</label>
                <input
                  type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="이메일 주소" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">비밀번호 * (8자 이상)</label>
                <input
                  type="password" value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="비밀번호 (8자 이상)" required minLength={8}
                />
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)}
                  className="mt-1 accent-teal-500 w-4 h-4 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  <span className="underline">이용약관</span> 및 <span className="underline">개인정보처리방침</span>에 동의합니다 (필수)
                </span>
              </label>

              <button
                type="submit" disabled={loading}
                className="w-full py-3.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold text-base transition-all hover:shadow-md disabled:opacity-60"
              >
                {loading ? '가입 중...' : '가입하기'}
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">가입 완료!</h3>
              <p className="text-gray-500 text-base mb-2">이메일 인증 링크를 보내드렸습니다.</p>
              <p className="text-gray-400 text-sm mb-6">{email} 를 확인해주세요</p>
              <button onClick={() => navigate('/login')}
                className="w-full py-3.5 bg-teal-500 text-white rounded-xl font-bold text-base hover:bg-teal-600 transition-all">
                로그인하러 가기
              </button>
            </div>
          )}

          {step !== 3 && (
            <div className="mt-6 text-center">
              <span className="text-gray-500 text-sm">이미 회원이신가요? </span>
              <Link to="/login" className="text-teal-600 font-semibold text-sm hover:underline">로그인</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
