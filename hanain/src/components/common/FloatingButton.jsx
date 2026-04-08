import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, X, Phone, Calendar, ChevronUp } from 'lucide-react'

export default function FloatingButton() {
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
            className="flex items-center gap-2 bg-white text-ocean-deep px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all text-sm font-medium"
          >
            <Calendar className="w-4 h-4 text-cyan-hana" />
            상담 신청
          </Link>
          <a
            href="tel:01056528206"
            className="flex items-center gap-2 bg-white text-ocean-deep px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all text-sm font-medium"
          >
            <Phone className="w-4 h-4 text-green-500" />
            010-5652-8206
          </a>
          <Link
            to="/partner"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 bg-white text-ocean-deep px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4 text-gold-hana" />
            파트너 신청
          </Link>
        </div>
      )}

      <div className="flex gap-2">
        {/* Scroll to top */}
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-white text-ocean-deep rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:-translate-y-0.5"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        {/* Main button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg transition-all flex items-center justify-center hover:-translate-y-0.5 ${
            isOpen
              ? 'bg-gray-600 hover:bg-gray-700'
              : 'bg-gradient-to-br from-cyan-hana to-blue-600 animate-pulse-glow'
          }`}
        >
          {isOpen
            ? <X className="w-6 h-6 text-white" />
            : <MessageCircle className="w-6 h-6 text-white" />
          }
        </button>
      </div>
    </div>
  )
}
