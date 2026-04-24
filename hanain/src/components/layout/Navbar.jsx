import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Waves, CreditCard } from 'lucide-react'
import { usePartner } from '../../context/PartnerContext'

// 학습 순서대로 메뉴 정렬
const NAV_LINKS = [
  { path: '/easy',        label: '플로로탄닌 쉽게 배우기', num: '①' },
  { path: '/phlorotannin',label: '플로로탄닌 소개',        num: '②' },
  { path: '/qa',          label: '건강 Q&A',              num: '③' },
  { path: '/partner',     label: '파트너 참여',            num: '④' },
  { path: '/consult',     label: '문의하기',               num: '⑤' },
]

const GOLD  = '#B8953A'
const GOLD2 = '#D4AF5A'
const NAVY  = '#0D1B3E'

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location  = useLocation()
  const navigate  = useNavigate()
  const partner = usePartner()   // usePartner()는 partner 객체를 직접 반환

  // 파트너 컨텍스트가 실제 파트너인지 (기본값 010-5652-8206 제외)
  const isPartner = partner && partner.phone && partner.phone !== '01056528206'
  const cardPath  = isPartner ? `/p/${partner.phone}` : null

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location])

  return (
    <>
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
            </div>

            {/* 모바일 오른쪽 영역: 메뉴 버튼 */}
            <div className="md:hidden flex items-center gap-2">
              {/* 햄버거 버튼 */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {isOpen ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-base font-bold">닫기</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span className="text-base font-bold">메뉴</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* 모바일 드롭다운 메뉴 */}
        {isOpen && (
          <div className="md:hidden bg-ocean-deep border-t border-white/10">

            {/* ── 전자명함 보기 (메뉴 최상단, 파트너만) ── */}
            {isPartner && (
              <div className="px-4 pt-4">
                <button
                  onClick={() => { navigate(cardPath); setIsOpen(false) }}
                  className="w-full flex items-center gap-3 px-4 py-4 rounded-xl font-bold active:scale-95 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
                    color: NAVY,
                    boxShadow: `0 4px 16px ${GOLD}50`,
                  }}
                >
                  <CreditCard className="w-5 h-5 flex-shrink-0" style={{ color: NAVY }} />
                  <span style={{ fontSize: '16px', fontWeight: '900', color: NAVY }}>
                    {partner.name} 전자명함 보러가기
                  </span>
                </button>
              </div>
            )}

            {/* 안내 문구 */}
            <div className="px-4 pt-4 pb-2">
              <p className="text-xs text-cyan-hana font-bold tracking-wide">
                📌 아래 순서대로 학습하시면 도움이 됩니다
              </p>
            </div>

            <div className="px-4 pb-4 space-y-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-cyan-hana text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-cyan-hana font-extrabold text-lg w-7 flex-shrink-0">
                    {link.num}
                  </span>
                  <span className="font-bold">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
