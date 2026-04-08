import { useState } from 'react'
import { PARTNER_CONFIG } from '../config/partner'
import { Calendar, Phone, Clock, CheckCircle, MessageSquare, Send } from 'lucide-react'
import RevealContact from '../components/common/RevealContact'

const PHONE_NUMBER = PARTNER_CONFIG.phone
const PHONE_DISPLAY = PARTNER_CONFIG.phoneDisplay

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

function buildSmsBody(formData) {
  const lines = [
    '[플로로탄닌 파트너스] 상담 신청',
    '─────────────────',
    `이름: ${formData.name}`,
    `연락처: ${formData.phone}`,
    `관심 분야: ${formData.category}`,
    formData.concern ? `건강 고민: ${formData.concern}` : '',
    formData.preferredTime ? `연락 희망 시간: ${formData.preferredTime}` : '',
    '─────────────────',
    '위 내용으로 상담을 신청합니다.',
  ]
  return lines.filter(Boolean).join('\n')
}

function SuccessModal({ formData, onClose }) {
  const smsBody = buildSmsBody(formData)
  const smsLink = `sms:${PHONE_NUMBER}?body=${encodeURIComponent(smsBody)}`

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-ocean-deep mb-3">준비 완료!</h3>
        <p className="text-gray-700 mb-2 font-medium">
          아래 버튼을 누르면 문자 앱이 열리면서<br />
          상담 내용이 자동으로 입력됩니다.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          전송 버튼을 한 번만 눌러주시면 됩니다.
        </p>

        {/* SMS 미리보기 */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left border border-gray-200">
          <p className="text-xs text-gray-400 font-semibold mb-2 uppercase tracking-wide">문자 미리보기</p>
          <pre className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed font-sans">{smsBody}</pre>
        </div>

        <div className="space-y-3">
          <a
            href={smsLink}
            className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-base"
          >
            <MessageSquare className="w-5 h-5" />
            문자 앱 열고 전송하기
          </a>
          <button
            onClick={onClose}
            className="w-full py-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            나중에 보내기
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ConsultPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: '',
    concern: '',
    preferredTime: '',
    privacyAgreed: false,
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = '이름을 입력해주세요'
    if (!formData.phone.match(/^[0-9-+]{10,13}$/)) errs.phone = '올바른 연락처를 입력해주세요'
    if (!formData.category) errs.category = '관심 분야를 선택해주세요'
    if (!formData.privacyAgreed) errs.privacyAgreed = '개인정보 수집에 동의해주세요'
    return errs
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSuccess(true)
  }

  return (
    <div className="pt-16">
      {success && (
        <SuccessModal
          formData={formData}
          onClose={() => {
            setSuccess(false)
            setFormData({ name: '', phone: '', category: '', concern: '', preferredTime: '', privacyAgreed: false })
          }}
        />
      )}

      {/* Header */}
      <div className="bg-ocean-gradient py-16 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-cyan-hana text-sm font-medium mb-4">
            <MessageSquare className="w-4 h-4" />
            상담 신청
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">상담 신청하기</h1>
          <p className="text-gray-200 text-lg max-w-xl leading-relaxed">
            아래 정보를 입력하고{' '}
            <strong className="text-gold-hana">상담 신청 문자 보내기</strong>를 누르면<br />
            작성한 내용이 문자로 자동 입력됩니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left info */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-bold text-ocean-deep mb-4">연락처 안내</h3>
              <div className="space-y-4">
                {[
                  { icon: Phone, title: '전화 상담', desc: `평일 09:00 – 18:00\n${PHONE_DISPLAY}` },
                  { icon: MessageSquare, title: '문자 상담', desc: `24시간 접수 가능\n${PHONE_DISPLAY}` },
                  { icon: Clock, title: '응답 시간', desc: '영업일 기준\n24시간 이내 답변' },
                  { icon: Calendar, title: '상담 주제', desc: '건강 정보 / 자연 소재\n파트너 활동 안내' },
                ].map(item => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-10 h-10 bg-cyan-hana/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-cyan-hana" />
                    </div>
                    <div>
                      <div className="font-medium text-ocean-deep text-sm">{item.title}</div>
                      <div className="text-xs text-gray-600 whitespace-pre-line">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 문의 방법 */}
            <div className="card bg-cyan-hana/5 border border-cyan-hana/20">
              <h4 className="font-bold text-ocean-deep mb-3 text-sm">📞 바로 연락하기</h4>
              <div className="space-y-3">
                <RevealContact
                  type="tel"
                  label="전화 상담 번호 확인"
                  phone={PHONE_NUMBER}
                  displayPhone={PHONE_DISPLAY}
                  className="w-full bg-white rounded-xl p-3 border border-gray-100 hover:border-cyan-hana hover:shadow-sm transition-all text-sm font-semibold text-ocean-deep"
                />
                <RevealContact
                  type="sms"
                  label="문자 상담 번호 확인"
                  phone={PHONE_NUMBER}
                  displayPhone={PHONE_DISPLAY}
                  smsBody="[플로로탄닌 파트너스] 상담 문의드립니다."
                  className="w-full bg-white rounded-xl p-3 border border-gray-100 hover:border-cyan-hana hover:shadow-sm transition-all text-sm font-semibold text-ocean-deep"
                />
              </div>
            </div>

            <div className="bg-gold-hana/10 border border-gold-hana/30 rounded-2xl p-5">
              <div className="font-semibold text-ocean-deep mb-2">💡 상담 전 참고사항</div>
              <ul className="text-sm text-gray-700 space-y-1.5">
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
            <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-bold text-cyan-800">이렇게 진행됩니다</div>
                <div className="text-sm text-cyan-700 mt-1 leading-relaxed">
                  ① 아래 양식 작성 → ② <strong>상담 신청 문자 보내기</strong> 클릭 → ③ 문자 앱이 열리면 <strong>전송</strong> 버튼 클릭
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="card space-y-5">
              <h3 className="font-bold text-ocean-deep text-lg">상담 신청서</h3>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">이름 *</label>
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
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">내 연락처 *</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="010-0000-0000"
                    type="tel"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">관심 건강 분야 *</label>
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
                <label className="block text-sm font-medium text-gray-800 mb-1.5">
                  건강 고민 / 증상
                  <span className="text-xs text-gray-500 font-normal ml-1">(선택사항 — 문자에 자동 포함됩니다)</span>
                </label>
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
                <label className="block text-sm font-medium text-gray-800 mb-1.5">연락 희망 시간</label>
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
                  className="mt-1 accent-cyan-hana w-4 h-4"
                />
                <label className="text-sm text-gray-700">
                  <span className="font-medium">개인정보 수집 및 이용에 동의합니다.</span> (필수) 수집된 정보는 상담 목적으로만 사용됩니다.
                </label>
              </div>
              {errors.privacyAgreed && <p className="text-red-500 text-xs">{errors.privacyAgreed}</p>}

              {/* 제출 버튼 */}
              <button
                type="submit"
                className="w-full bg-ocean-deep text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <MessageSquare className="w-5 h-5" />
                상담 신청 문자 보내기
                <Send className="w-4 h-4 opacity-70" />
              </button>

              <p className="text-xs text-center text-gray-500">
                버튼을 누르면 작성하신 내용이 담긴 문자가 준비됩니다.<br />
                문자 앱에서 <strong>전송</strong>만 누르면 완료!
              </p>
            </form>

            {/* 바로 전화 / 문자 */}
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <RevealContact
                type="tel"
                label="전화 상담 신청하기"
                revealLabel={`${PHONE_DISPLAY} 전화하기`}
                phone={PHONE_NUMBER}
                displayPhone={PHONE_DISPLAY}
                className="p-4 bg-cyan-hana text-white rounded-2xl font-semibold hover:bg-opacity-90 transition-all hover:shadow-md w-full"
              />
              <RevealContact
                type="sms"
                label="문자 상담 신청하기"
                revealLabel={`${PHONE_DISPLAY} 문자 보내기`}
                phone={PHONE_NUMBER}
                displayPhone={PHONE_DISPLAY}
                smsBody="[플로로탄닌 파트너스] 상담 문의드립니다."
                className="p-4 bg-white border-2 border-ocean-deep text-ocean-deep rounded-2xl font-semibold hover:bg-ocean-deep hover:text-white transition-all hover:shadow-md w-full"
              />
            </div>

            {/* 저작권 */}
            <div className="mt-6 border-t border-gray-100 pt-5 text-center space-y-1">
              <p className="text-xs text-gray-400">
                © 2025 <span className="font-semibold text-gray-600">플로로탄닌 파트너스</span> — All rights reserved.
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                본 사이트의 모든 콘텐츠는 저작권법의 보호를 받습니다. 무단 복제·배포를 금합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
