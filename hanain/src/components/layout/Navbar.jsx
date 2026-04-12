import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Waves, LogOut, User, PenSquare } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV_LINKS = [
  { path: '/', label: '홈' },
  { path: '/qa', label: '건강 Q&A' },
  { path: '/learn', label: '🌊 쉽게 배우기' },
  { path: '/phlorotannin', label: '플로로탄닌 소개' },
  { path: '/partner', label: '파트너 참여' },
  { path: '/consult', label: '문의하기' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, profile, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setProfileOpen(false)
  }, [location])

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  const displayName = profile?.nickname || user?.email?.split('@')[0] || '회원'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-ocean-deep shadow-lg' : 'bg-ocean-deep/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-hana to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg leading-tight block">플로로탄닌 파트너스</span>
              <span className="text-cyan-hana text-sm leading-tight block">Phlorotannin Partners</span>
            </div>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-cyan-hana text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* 로그인된 경우에만 아바타 드롭다운 표시 */}
            {user && (
              <div className="relative ml-2">
                <button
                  onClick={() => setProfileOpen(v => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-hana to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    {displayName.charAt(0)}
                  </div>
                  <span className="hidden lg:block">{displayName}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-border-hana py-2 w-48 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-sm font-semibold text-ocean-deep">{displayName}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/community/write"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <PenSquare className="w-4 h-4 text-cyan-hana" />
                      글쓰기
                    </Link>
                    <Link
                      to="/my"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      마이페이지
                    </Link>
                    {profile?.role === 'superadmin' && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <span>⚙️</span>
                        관리자 페이지
                      </Link>
                    )}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        로그아웃
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 모바일 햄버거 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <div className="md:hidden bg-ocean-deep border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-cyan-hana text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* 로그인된 경우에만 사용자 메뉴 표시 */}
            {user && (
              <div className="border-t border-white/10 mt-2 pt-2">
                <div className="px-4 py-2 text-gray-400 text-sm flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-hana flex items-center justify-center text-white text-xs font-bold">
                    {displayName.charAt(0)}
                  </div>
                  {displayName}
                </div>
                <Link to="/community/write" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">
                  ✏️ 글쓰기
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left block px-4 py-3 rounded-lg text-base font-medium text-red-400 hover:text-red-300 hover:bg-white/10"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
