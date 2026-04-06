import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Calendar, Phone, Mail, Clock, CheckCircle, User, MessageSquare, Send } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

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

function SuccessModal({ onClose, type }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-ocean-deep mb-3">신청 완료!</h3>
        <p className="text-gray-500 mb-6">
          {type === 'consult'
            ? '개인 상담 신청이 완료되었습니다.\n빠른 시일 내에 연락드리겠습니다.'
            : '뉴스레터 구독 신청이 완료되었습니다.\n유익한 건강 정보를 보내드리겠습니다.'
          }
        </p>
        <button onClick={onClose} className="btn-primary w-full">확인</button>
      </div>
    </div>
  )
}

export default function ConsultPage() {
  const [activeForm, setActiveForm] = useState('consult')
  const [success, setSuccess] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const endpoint = activeForm === 'newsletter' ? '/api/newsletter' : '/api/consult'
      const res = await fetch(BACKEND_URL + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType: activeForm }),
      })
      if (res.ok) {
        setSuccess(activeForm)
        reset()
      } else {
        const err = await res.json()
        alert('오류가 발생했습니다: ' + (err.message || '잠시 후 다시 시도해주세요.'))
      }
    } catch (err) {
      // Fallback: save locally
      const existing = JSON.parse(localStorage.getItem('hanain_submissions') || '[]')
      existing.push({ ...data, formType: activeForm, timestamp: new Date().toISOString() })
      localStorage.setItem('hanain_submissions', JSON.stringify(existing))
      setSuccess(activeForm)
      reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-16">
      {success && <SuccessModal type={success} onClose={() => setSuccess(null)} />}

      {/* Header */}
      <div className="bg-ocean-gradient py-16 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-cyan-hana text-sm font-medium mb-4">
            <MessageSquare className="w-4 h-4" />
            상담 신청
          </div>
          <h1 className="text-4xl font-bold mb-4">개인 맞춤 건강 상담</h1>
          <p className="text-gray-300 text-lg max-w-xl">
            건강 고민을 전문 파트너와 함께 해결해보세요. 과학적 근거에 기반한 맞춤 솔루션을 제안해 드립니다.
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
                  { icon: Phone, title: '전화 상담', desc: '평일 9:00 - 18:00\n1588-0000' },
                  { icon: Mail, title: '이메일 상담', desc: 'info@hanain.co.kr\n24시간 접수 가능' },
                  { icon: Clock, title: '응답 시간', desc: '영업일 기준\n24시간 이내 답변' },
                  { icon: Calendar, title: '방문 상담', desc: '예약 후 방문 가능\n서울 강남구 소재' },
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
            {/* Form type tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
              {[
                { id: 'consult', label: '개인 상담 신청', icon: User },
                { id: 'newsletter', label: '뉴스레터 구독', icon: Mail },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveForm(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeForm === tab.id ? 'bg-white text-ocean-deep shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">이름 *</label>
                  <input
                    {...register('name', { required: '이름을 입력해주세요' })}
                    className="input-field"
                    placeholder="홍길동"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">연락처 *</label>
                  <input
                    {...register('phone', {
                      required: '연락처를 입력해주세요',
                      pattern: { value: /^[0-9-+]{10,13}$/, message: '올바른 연락처를 입력해주세요' }
                    })}
                    className="input-field"
                    placeholder="010-0000-0000"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">이메일 *</label>
                <input
                  {...register('email', {
                    required: '이메일을 입력해주세요',
                    pattern: { value: /^\S+@\S+$/i, message: '올바른 이메일을 입력해주세요' }
                  })}
                  className="input-field"
                  placeholder="example@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">관심 건강 분야 *</label>
                <select {...register('category', { required: '분야를 선택해주세요' })} className="input-field bg-white">
                  <option value="">선택해주세요</option>
                  {healthCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </div>

              {activeForm === 'consult' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">건강 고민 / 증상</label>
                    <textarea
                      {...register('concern')}
                      rows={4}
                      className="input-field resize-none"
                      placeholder="현재 건강 고민이나 증상을 자유롭게 적어주세요. (복용 중인 약, 주요 증상 등)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">연락 희망 시간</label>
                    <select {...register('preferredTime')} className="input-field bg-white">
                      <option value="">선택해주세요 (선택사항)</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {activeForm === 'newsletter' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">추가 관심 분야 (복수 선택)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['최신 연구', '식이요법', '운동/생활습관', '제품 정보', '파트너 소식', '이벤트'].map(item => (
                      <label key={item} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" {...register('interests')} value={item} className="accent-cyan-hana" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  {...register('privacyAgreed', { required: '개인정보 수집에 동의해주세요' })}
                  className="mt-1 accent-cyan-hana"
                />
                <label className="text-sm text-gray-600">
                  <span className="font-medium">개인정보 수집 및 이용에 동의합니다.</span> (필수) 수집된 정보는 상담 목적으로만 사용되며 제3자에게 제공되지 않습니다.
                </label>
              </div>
              {errors.privacyAgreed && <p className="text-red-500 text-xs">{errors.privacyAgreed.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    처리 중...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {activeForm === 'newsletter' ? '구독 신청하기' : '상담 신청하기'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
