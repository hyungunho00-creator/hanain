import { useState } from 'react'
import { Phone, MessageSquare, ChevronRight } from 'lucide-react'
import { PARTNER_CONFIG } from '../../config/partner'

/**
 * RevealContact
 * - 처음에는 번호 없이 "전화 상담 신청" 등 텍스트만 표시
 * - 클릭 시 번호가 나타나며 tel: / sms: 링크로 변환
 *
 * Props:
 *   type: 'tel' | 'sms'
 *   label: 버튼에 표시할 기본 라벨 (예: "전화 상담 신청")
 *   revealLabel: 번호 노출 후 표시할 텍스트 (예: "010-5652-8206 전화하기")
 *   phone: 전화번호 숫자만 (예: {PARTNER_CONFIG.phone})
 *   smsBody: 문자 기본 내용 (type=sms 일 때)
 *   className: 버튼 스타일 클래스
 */
export default function RevealContact({
  type = 'tel',
  label,
  revealLabel,
  phone = PARTNER_CONFIG.phone,
  displayPhone = PARTNER_CONFIG.phoneDisplay,
  smsBody = '[플로로탄닌 파트너스] 상담 문의드립니다.',
  className = '',
}) {
  const [revealed, setRevealed] = useState(false)

  const href = type === 'tel'
    ? `tel:${phone}`
    : `sms:${phone}?body=${encodeURIComponent(smsBody)}`

  const Icon = type === 'tel' ? Phone : MessageSquare

  if (!revealed) {
    return (
      <button
        onClick={() => setRevealed(true)}
        className={`flex items-center justify-center gap-2 ${className}`}
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span>{label || (type === 'tel' ? '전화 상담 신청' : '문자 상담 신청')}</span>
        <ChevronRight className="w-4 h-4 opacity-60 flex-shrink-0" />
      </button>
    )
  }

  return (
    <a
      href={href}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{revealLabel || `${displayPhone} ${type === 'tel' ? '전화하기' : '문자 보내기'}`}</span>
    </a>
  )
}
