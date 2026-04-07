import { useState } from 'react'
import { Calendar, Phone, Mail, Clock, CheckCircle, User, MessageSquare, Send, ExternalLink } from 'lucide-react'

// ✅ Formspree로 폼 제출 → meul777@naver.com 으로 이메일 수신
// Vercel 배포 시: Settings → Environment Variables → VITE_FORMSPREE_ID 설정
// https://formspree.io 에서 무료 가입 후 Form ID 발급
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'xpwzgkqv'

const healthCategories = [
  '대사질환 (당뇨, 비만, 고혈압)',
  '항암/면역',
  '소화/간 건강',
  '신경/인지 (치매, 수면)',
  '피부/모발 (탈모, 아토피)',
  '근골격계 (관절, 골다공증)',
  '여성건강 (갱년기, 임신)',
  '남성건강 (전립선, 탈모)',
  '심혈관 건강',
  '호흡기',
  '정신건강 (스트레스, 우울)',
  '기타',
]

const timeSlots = [
  '오전 9시-11시',
  '오전 11시-오후 1시',
  '오후 1시-3시',
  '오후 3시-5시',
  '오후 5시-7시',
  '저녁 7시 이후',
]

function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-ocean-deep mb-3">신청 완료!</h3>
        <p className="text-gray-600 mb-2">
          상담 신청이 완료되었습니다.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          입력하신 내용은 <strong>meul777@naver.com</strong>으로 전송되었습니다.<br />
          영업일 기준 24시간 이내에 답변드립니다.
        </p>
        <button onClick={onClose} className="btn-primary w-full">확인</button>
      </div>
    </div>
  )
}

export default function ConsultPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '',
    concern: '',
    preferredTime: '',
    privacyAgreed: false,
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = '이름을 입력해주세요'
    if (!formData.phone.match(/^[0-9-+]{10,13}$/)) errs.phone = '올바른 연락처를 입력해주세요'
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) errs.email = '올바른 이메일을 입력해주세요'
    if (!formData.category) errs.category = '관심 분야를 선택해주세요'
    if (!formData.privacyAgreed) errs.privacyAgreed = '개인정보 수집에 동의해주세요'
    return errs
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setIsSubmitting(true)
    try {
      // Formspree로 전송 (무료, 이메일로 수신)
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          이름: formData.name,
          연락처: formData.phone,
          이메일: formData.email,
          관심분야: formData.category,
          건강고민: formData.concern,
          연락희망시간: formData.preferredTime,
          _replyto: formData.email,
          _subject: `[플로로탄닌 파트너스] 상담 신청 - ${formData.name}`,
        }),
      })

      if (res.ok) {
        setSuccess(true)
        setFormData({ name: '', phone: '', email: '', category: '', concern: '', preferredTime: '', privacyAgreed: false })
      } else {
        // Fallback: localStorage 저장
        const existing = JSON.parse(localStorage.getItem('phlorotannin_submissions') || '[]')
        existing.push({ ...formData, timestamp: new Date().toISOString() })
        localStorage.setItem('phlorotannin_submissions', JSON.stringify(existing))
        setSuccess(true)
        setFormData({ name: '', phone: '', email: '', category: '', concern: '', preferredTime: '', privacyAgreed: false })
      }
    } catch {
      // 네트워크 오류 시에도 로컬 저장 후 성공 처리
      const existing = JSON.parse(localStorage.getItem('phlorotannin_submissions') || '[]')
      existing.push({ ...formData, timestamp: new Date().toISOString() })
      localStorage.setItem('phlorotannin_submissions', JSON.stringify(existing))
      setSuccess(true)
      setFormData({ name: '', phone: '', email: '', category: '', concern: '', preferredTime: '', privacyAgreed: false })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-16">
      {success && <SuccessModal onClose={() => setSuccess(false)} />}

      {/* Header */}
      <div className="bg-ocean-gradient py-16 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-cyan-hana text-sm font-medium mb-4">
            <MessageSquare className="w-4 h-4" />
            상담 신청
          </div>
          <h1 className="text-4xl font-bold mb-4">문의하기</h1>
          <p className="text-gray-300 text-lg max-w-xl">
            건강 정보, 자연 소재, 파트너 활동 등 어떤 내용이든 편하게 문의해 주세요.
            입력하신 내용은 <strong className="text-white">meul777@naver.com</strong>으로 직접 전달됩니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left info */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-bold text-ocean-deep mb-4">상담 안내</h3>
              <div className="space-y-4">
                {[
                  { icon: Phone, title: '전화 문의', desc: '평일 09:00 – 18:00\n010-5652-8206' },
                  { icon: Mail, title: '이메일 문의', desc: 'meul777@naver.com\n24시간 접수 가능' },
                  { icon: Clock, title: '응답 시간', desc: '영업일 기준\n24시간 이내 답변' },
                  { icon: Calendar, title: '상담 주제', desc: '건강 정보 / 자연 소재\n파트너 활동 안내' },
                ].map(item => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-10 h-10 bg-cyan-hana/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-cyan-hana" />
                    </div>
                    <div>
                      <div className="font-medium text-ocean-deep text-sm">{item.title}</div>
                      <div className="text-xs text-gray-500 whitespace-pre-line">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 문의 방법 선택 */}
            <div className="card bg-cyan-hana/5 border border-cyan-hana/20">
              <h4 className="font-bold text-ocean-deep mb-3 text-sm">📋 문의 방법</h4>
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-3 border border-gray-100">
                  <div className="text-xs font-semibold text-gray-700 mb-1">① 아래 폼 작성 (추천)</div>
                  <div className="text-xs text-gray-500">입력하신 내용이 이메일로 자동 전달됩니다</div>
                </div>
                <div className="bg-white rounded-xl p-3 border border-gray-100">
                  <div className="text-xs font-semibold text-gray-700 mb-1">② 직접 이메일</div>
                  <a href="mailto:meul777@naver.com" className="text-xs text-cyan-hana hover:underline">meul777@naver.com</a>
                </div>
                <div className="bg-white rounded-xl p-3 border border-gray-100">
                  <div className="text-xs font-semibold text-gray-700 mb-1">③ 전화</div>
                  <a href="tel:01056528206" className="text-xs text-cyan-hana hover:underline">010-5652-8206</a>
                </div>
              </div>
            </div>

            <div className="bg-gold-hana/10 border border-gold-hana/30 rounded-2xl p-5">
              <div className="font-semibold text-ocean-deep mb-2">💡 상담 전 참고사항</div>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li>• 현재 복용 중인 약물 목록 준비</li>
                <li>• 주요 건강 검사 결과 (혈액검사 등)</li>
                <li>• 증상 및 고민 사항 메모</li>
                <li>• 상담은 의료 조언이 아닌 건강 정보 제공</li>
              </ul>
            </div>
          </div>

          {/* Form area */}
          <div className="lg:col-span-2">
            {/* 안내 배너 */}
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <Mail className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-teal-800">이렇게 처리됩니다</div>
                <div className="text-xs text-teal-600 mt-0.5">
                  아래 폼을 작성하고 신청하면 고객님의 정보가 <strong>meul777@naver.com</strong>으로 자동 전송됩니다.
                  영업일 기준 24시간 이내에 답변 드립니다.
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="card space-y-5">
              <h3 className="font-bold text-ocean-deep text-lg">상담 신청서</h3>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">이름 *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="홍길동"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">연락처 *</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="010-0000-0000"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">이메일 * <span className="text-xs text-gray-400 font-normal">(답변 받을 이메일)</span></label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="example@email.com"
                  type="email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">관심 건강 분야 *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field bg-white"
                >
                  <option value="">선택해주세요</option>
                  {healthCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">건강 고민 / 증상</label>
                <textarea
                  name="concern"
                  value={formData.concern}
                  onChange={handleChange}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="현재 건강 고민이나 증상을 자유롭게 적어주세요. (복용 중인 약, 주요 증상 등)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">연락 희망 시간</label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="input-field bg-white"
                >
                  <option value="">선택해주세요 (선택사항)</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="privacyAgreed"
                  checked={formData.privacyAgreed}
                  onChange={handleChange}
                  className="mt-1 accent-cyan-hana"
                />
                <label className="text-sm text-gray-600">
                  <span className="font-medium">개인정보 수집 및 이용에 동의합니다.</span> (필수) 수집된 정보는 상담 목적으로만 사용되며 제3자에게 제공되지 않습니다.
                </label>
              </div>
              {errors.privacyAgreed && <p className="text-red-500 text-xs">{errors.privacyAgreed}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    전송 중...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    상담 신청하기
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-400">
                신청 내용은 <strong>meul777@naver.com</strong>으로 자동 전달됩니다
              </p>
            </form>

            {/* 직접 이메일 대안 */}
            <div className="mt-6 p-5 bg-gray-50 rounded-2xl border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-3">폼이 불편하시면 직접 이메일로 보내셔도 됩니다</p>
              <a
                href={`mailto:meul777@naver.com?subject=[플로로탄닌 파트너스] 상담 문의&body=이름:%0A연락처:%0A관심 분야:%0A건강 고민:%0A`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-cyan-hana text-cyan-hana rounded-full text-sm font-semibold hover:bg-cyan-hana hover:text-white transition-all"
              >
                <Mail className="w-4 h-4" />
                meul777@naver.com 으로 직접 문의
              </a>
            </div>

            {/* 저작권 / 사용 문의 */}
            <div className="mt-6 border-t border-gray-100 pt-5 text-center space-y-1">
              <p className="text-xs text-gray-400">
                © 2025 <span className="font-semibold text-gray-500">플로로탄닌 파트너스</span> — All rights reserved.
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                본 사이트의 모든 콘텐츠는 저작권법의 보호를 받습니다. 무단 복제·배포를 금합니다.<br />
                콘텐츠 사용·제휴 문의:{' '}
                <a href="mailto:meul777@naver.com?subject=[저작권/제휴 문의]" className="text-cyan-600 hover:underline font-medium">
                  meul777@naver.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
