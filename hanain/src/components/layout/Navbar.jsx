import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Waves, CreditCard, FolderLock, Eye, EyeOff } from 'lucide-react'
import { usePartner } from '../../context/PartnerContext'

const NAV_LINKS = [
  { path: '/easy',        label: '플로로탄닌 쉽게 배우기', num: '①' },
  { path: '/phlorotannin',label: '플로로탄닌 소개',        num: '②' },
  { path: '/qa',          label: '건강 Q&A',              num: '③' },
  { path: '/blog',        label: '연구 블로그',            num: '④' },
  { path: '/partner',     label: '파트너 참여',            num: '⑤' },
  { path: '/consult',     label: '문의하기',               num: '⑥' },
]

const GOLD  = '#B8953A'
const GOLD2 = '#D4AF5A'
const NAVY  = '#0D1B3E'
const TEAL  = '#0A7E8C'
const TEAL2 = '#0D5F6A'

const SESSION_KEY = 'phlorotannin_inforoom_auth'
const CORRECT_PW  = '123456789'

/* ── 비밀번호 모달 ── */
function PwModal({ onSuccess, onClose }) {
  const [pw, setPw]         = useState('')
  const [show, setShow]     = useState(false)
  const [error, setError]   = useState('')
  const [shake, setShake]   = useState(false)
  const inputRef            = useRef(null)

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (pw === CORRECT_PW) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onSuccess()
    } else {
      setError('비밀번호가 올바르지 않습니다')
      setShake(true)
      setPw('')
      setTimeout(() => setShake(false), 600)
    }
  }

  return (
    /* 오버레이 */
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 20px',
      }}
    >
      {/* 모달 박스 */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 360,
          background: '#fff', borderRadius: 20,
          boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          animation: shake ? 'shake 0.5s ease' : 'none',
        }}
      >
        {/* 상단 헤더 */}
        <div style={{
          background: `linear-gradient(135deg, ${NAVY}, #1a3a6a)`,
          padding: '28px 28px 22px',
          textAlign: 'center',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: `rgba(184,149,58,0.2)`,
            border: `2px solid ${GOLD}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
          }}>
            <FolderLock size={26} color={GOLD} />
          </div>
          <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: '0 0 6px' }}>
            🔒 파트너 전용 자료실
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.6 }}>
            파트너 전용 공간입니다.<br />
            담당자에게 별도 공유된<br />
            비밀번호를 입력해주세요.
          </p>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} style={{ padding: '24px 28px 28px' }}>
          <div style={{ position: 'relative', marginBottom: 8 }}>
            <input
              ref={inputRef}
              type={show ? 'text' : 'password'}
              value={pw}
              onChange={e => { setPw(e.target.value); setError('') }}
              placeholder="비밀번호 입력"
              style={{
                width: '100%', padding: '14px 48px 14px 16px',
                borderRadius: 12, border: `2px solid ${error ? '#ef4444' : '#e0e8f0'}`,
                fontSize: 16, outline: 'none', boxSizing: 'border-box',
                fontFamily: 'inherit', letterSpacing: pw && !show ? '4px' : '0',
                transition: 'border-color 0.2s',
              }}
            />
            <button
              type="button"
              onClick={() => setShow(v => !v)}
              style={{
                position: 'absolute', right: 14, top: '50%',
                transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 4, color: '#999',
              }}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <p style={{ fontSize: 13, color: '#ef4444', margin: '0 0 12px', fontWeight: 600 }}>
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: '100%', padding: '14px',
              borderRadius: 12, border: 'none',
              background: `linear-gradient(135deg, ${TEAL}, ${TEAL2})`,
              color: '#fff', fontSize: 16, fontWeight: 900,
              cursor: 'pointer', marginTop: error ? 0 : 12,
              boxShadow: `0 4px 16px rgba(10,126,140,0.4)`,
              transition: 'opacity 0.2s',
            }}
          >
            입장하기
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: '100%', padding: '11px',
              borderRadius: 12, border: '1.5px solid #e0e8f0',
              background: '#fff', color: '#888',
              fontSize: 14, fontWeight: 700,
              cursor: 'pointer', marginTop: 10,
            }}
          >
            취소
          </button>
        </form>
      </div>

      {/* shake 애니메이션 */}
      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-6px)}
          80%{transform:translateX(6px)}
        }
      `}</style>
    </div>
  )
}

/* ── 메인 Navbar ── */
export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showPwModal, setShowPwModal] = useState(false)
  const location  = useLocation()
  const navigate  = useNavigate()
  const partner   = usePartner()

  const isPartner = partner && partner.phone && partner.phone !== '01056528206'
  const cardPath  = isPartner ? `/p/${partner.phone}?view=card` : null
  const infoPath  = isPartner ? `/p/${partner.phone}/inforoom` : '/inforoom'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location])

  function handleInfoRoom() {
    // 세션에 이미 인증된 경우 바로 이동
    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      navigate(infoPath)
      setIsOpen(false)
    } else {
      setShowPwModal(true)
    }
  }

  function handlePwSuccess() {
    setShowPwModal(false)
    setIsOpen(false)
    navigate(infoPath)
  }

  return (
    <>
      {/* 비밀번호 모달 */}
      {showPwModal && (
        <PwModal
          onSuccess={handlePwSuccess}
          onClose={() => setShowPwModal(false)}
        />
      )}

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ocean-deep shadow-lg' : 'bg-ocean-deep/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* 로고 */}
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-hana to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-white font-bold text-lg leading-tight block">플로로탄닌 파트너스</span>
                <span className="text-cyan-hana text-sm leading-tight block">Phlorotannin Partners</span>
              </div>
              <div className="block sm:hidden">
                <span className="text-white font-bold text-base leading-tight block">플로로탄닌</span>
              </div>
            </Link>

            {/* 데스크탑 메뉴 */}
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

              {/* 데스크탑 파트너 버튼들 */}
              {isPartner && (
                <>
                  {/* 자료실 버튼 */}
                  <button
                    onClick={handleInfoRoom}
                    className="ml-1 flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold text-sm transition-all active:scale-95 whitespace-nowrap"
                    style={{
                      background: `linear-gradient(135deg, ${TEAL}, ${TEAL2})`,
                      color: '#fff',
                      boxShadow: `0 2px 10px rgba(10,126,140,0.45)`,
                    }}
                  >
                    <FolderLock className="w-4 h-4 flex-shrink-0" />
                    <span>파트너 자료실</span>
                  </button>

                  {/* 명함 버튼 */}
                  <button
                    onClick={() => navigate(cardPath)}
                    className="ml-1 flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold text-sm transition-all active:scale-95 whitespace-nowrap"
                    style={{
                      background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
                      color: NAVY,
                      boxShadow: `0 2px 10px ${GOLD}60`,
                    }}
                  >
                    <CreditCard className="w-4 h-4 flex-shrink-0" style={{ color: NAVY }} />
                    <span style={{ color: NAVY }}>{partner.name} 명함</span>
                  </button>
                </>
              )}
            </div>

            {/* 모바일 오른쪽: 명함 + 햄버거 */}
            <div className="md:hidden flex items-center gap-1.5">
              {isPartner && (
                <button
                  onClick={() => navigate(cardPath)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold text-xs active:scale-95 transition-transform whitespace-nowrap"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
                    color: NAVY,
                    boxShadow: `0 2px 6px ${GOLD}50`,
                  }}
                >
                  <CreditCard className="w-3.5 h-3.5 flex-shrink-0" style={{ color: NAVY }} />
                  <span style={{ color: NAVY, fontSize: '12px', fontWeight: '700' }}>{partner.name}</span>
                </button>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-white px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                {isOpen ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm font-bold">닫기</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span className="text-sm font-bold">메뉴</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* 모바일 드롭다운 */}
        {isOpen && (
          <div className="md:hidden bg-ocean-deep border-t border-white/10">

            {/* 파트너 전용 버튼들 */}
            {isPartner && (
              <div className="px-4 pt-4 flex flex-col gap-2">
                {/* 전자명함 */}
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

                {/* 파트너 자료실 */}
                <button
                  onClick={handleInfoRoom}
                  className="w-full flex items-center gap-3 px-4 py-4 rounded-xl font-bold active:scale-95 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${TEAL}, ${TEAL2})`,
                    color: '#fff',
                    boxShadow: '0 4px 16px rgba(10,126,140,0.4)',
                  }}
                >
                  <FolderLock className="w-5 h-5 flex-shrink-0" />
                  <div className="text-left">
                    <p style={{ fontSize: '16px', fontWeight: '900', color: '#fff', margin: 0 }}>
                      📂 파트너 전용 자료실
                    </p>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                      전단지 PDF·이미지 다운로드
                    </p>
                  </div>
                </button>
              </div>
            )}

            {/* 학습 안내 */}
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
