import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, X, Phone, Calendar, ChevronUp } from 'lucide-react'
import { usePartner } from '../../context/PartnerContext'
import RevealContact from './RevealContact'

export default function FloatingButton() {
  const partner = usePartner()
  const [isOpen, setIsOpen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded menu */}
      {isOpen && (
        <div className="flex flex-col gap-2 items-end">
          <Link
            to="/consult"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 bg-white text-gray-900 border border-gray-200 px-4 py-2.5 rounded-md hover:border-gray-400 transition-colors text-sm font-medium"
          >
            <Calendar className="w-4 h-4 text-gray-500" />
            상담 신청
          </Link>
          <RevealContact
            type="tel"
            label="전화 연결"
            phone={partner.phone}
            displayPhone={partner.phoneDisplay}
            className="flex items-center gap-2 bg-white text-gray-900 border border-gray-200 px-4 py-2.5 rounded-md hover:border-gray-400 transition-colors text-sm font-medium"
          />
          <Link
            to="/partner"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 bg-white text-gray-900 border border-gray-200 px-4 py-2.5 rounded-md hover:border-gray-400 transition-colors text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4 text-gray-500" />
            파트너 신청
          </Link>
        </div>
      )}

      <div className="flex gap-2">
        {/* Scroll to top */}
        <button
          onClick={scrollToTop}
          aria-label="맨 위로 이동"
          className="w-12 h-12 bg-white text-gray-700 border border-gray-200 rounded-full hover:border-gray-400 transition-colors flex items-center justify-center"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        {/* Main button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
          className={`w-14 h-14 rounded-full transition-colors flex items-center justify-center ${
            isOpen
              ? 'bg-white text-gray-900 border border-gray-300 hover:border-gray-500'
              : 'bg-gray-900 hover:bg-black text-white'
          }`}
        >
          {isOpen
            ? <X className="w-6 h-6" />
            : <MessageCircle className="w-6 h-6" />
          }
        </button>
      </div>
    </div>
  )
}
