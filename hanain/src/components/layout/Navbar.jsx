import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Leaf } from 'lucide-react'

const navLinks = [
  { path: '/', label: '홈' },
  { path: '/qa', label: 'Q&A 라이브러리' },
  { path: '/tech', label: '기술 소개' },
  { path: '/partner', label: '파트너 신청' },
  { path: '/consult', label: '상담 신청' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-ocean-deep shadow-lg' : 'bg-ocean-deep/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-hana to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-base leading-tight block">파트너스인 하나</span>
              <span className="text-cyan-hana text-xs leading-tight block">Partners in HANA</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-cyan-hana text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="ml-2 px-4 py-2 bg-gold-hana text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all"
            >
              관리자
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-ocean-deep border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-cyan-hana text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="block px-4 py-3 bg-gold-hana text-white rounded-lg text-sm font-medium"
            >
              관리자 페이지
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
