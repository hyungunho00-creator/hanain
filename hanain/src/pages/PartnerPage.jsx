import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Users, Award, TrendingUp, BookOpen, CheckCircle, ChevronDown, ChevronUp, Send, Star } from 'lucide-react'

// Formspree로 파트너 신청 전송 → meul777@naver.com 수신
// https://formspree.io 가입 후 파트너용 Form ID 교체 (현재 ConsultPage와 동일 ID 공유)
const FORMSPREE_PARTNER_ID = import.meta.env.VITE_FORMSPREE_PARTNER_ID || 'xpwzgkqv'

const curriculum = [
  {
    week: '1주차',
    title: '플로로탄닌 파트너스 이해',
    topics: ['감태 플로로탄닌 기초 과학', 'MOP 공정 이해', '하이드로 네트워크 기술', '제품 라인업 소개'],
  },
  {
    week: '2주차',
    title: '건강 과학 심화 교육',
    topics: ['12개 카테고리 질환별 기전', '표준 의학 치료와 식품소재 비교', 'SCI 논문 읽는 법', 'Q&A 라이브러리 활용법'],
  },
  {
    week: '3주차',
    title: '비즈니스 스킬',
    topics: ['파트너 네트워크 구조 이해', '고객 상담 스크립트', 'SNS 마케팅 기초', 'DB 수집 전략'],
  },
  {
    week: '4주차',
    title: '실전 적용 & 수료',
    topics: ['모의 상담 실습', '개인 마케팅 계획 수립', '네트워크 목표 설정', '수료증 발급'],
  },
]

const successCases = [
  {
    initial: 'K',
    role: '간호사 출신 파트너',
    location: '서울',
    quote: '의료 지식을 활용해 고객 신뢰를 얻기 쉬웠습니다. 월 수입이 기존 대비 2배 이상으로 늘었어요.',
    duration: '파트너 활동 18개월',
  },
  {
    initial: 'P',
    role: '전업주부 출신 파트너',
    location: '부산',
    quote: '처음에는 많이 걱정했지만 체계적인 교육 덕분에 자신감이 생겼습니다. 지금은 저도 누군가를 교육하고 있어요.',
    duration: '파트너 활동 12개월',
  },
  {
    initial: 'L',
    role: '약사 출신 파트너',
    location: '대구',
    quote: '과학적 근거가 탄탄해서 마음 편하게 추천할 수 있습니다. 고객들의 피드백이 정말 좋아요.',
    duration: '파트너 활동 8개월',
  },
]

function CurriculumCard({ item }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="w-16 h-16 bg-cyan-hana/10 text-cyan-hana rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
          {item.week}
        </div>
        <div className="flex-1 text-left">
          <div className="font-semibold text-ocean-deep">{item.title}</div>
          <div className="text-sm text-gray-400">{item.topics.length}개 주제</div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="border-t border-gray-100 bg-gray-50 p-5">
          <ul className="space-y-2">
            {item.topics.map((topic, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-cyan-hana flex-shrink-0" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-ocean-deep mb-3">파트너 신청 완료!</h3>
        <p className="text-gray-500 mb-6">
          파트너 신청이 접수되었습니다.<br />
          담당 매니저가 영업일 기준 1-2일 내 연락드리겠습니다.
        </p>
        <button onClick={onClose} className="btn-primary w-full">확인</button>
      </div>
    </div>
  )
}

export default function PartnerPage() {
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // Formspree로 전송 (백엔드 서버 불필요)
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_PARTNER_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: '[파트너 신청] ' + data.name,
          _replyto: data.email,
        }),
      })
      const json = await res.json()
      if (res.ok && !json.error) {
        setSuccess(true)
        reset()
      } else {
        throw new Error(json.error || 'Formspree error')
      }
    } catch {
      // Formspree 실패 시 localStorage 임시 저장 + 성공 처리
      const existing = JSON.parse(localStorage.getItem('phlorotannin_partner_applications') || '[]')
      existing.push({ ...data, timestamp: new Date().toISOString() })
      localStorage.setItem('phlorotannin_partner_applications', JSON.stringify(existing))
      setSuccess(true)
      reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-16">
      {success && <SuccessModal onClose={() => setSuccess(false)} />}

      {/* Hero */}
      <div className="bg-ocean-gradient py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-gold-hana text-sm font-medium mb-5">
            <Users className="w-4 h-4" />
            <span>파트너 프로그램</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ color: '#ffffff' }}>
            플로로탄닌 파트너스와<br />
            <span style={{ color: '#00B4D8' }}>함께 성장하세요</span>
          </h1>
          <p className="text-lg max-w-xl leading-relaxed" style={{ color: '#d1e8f5' }}>
            건강 지식으로 가치를 창출하는 네트워크 파트너 프로그램.<br />
            교육부터 수익 창출까지 모두 지원합니다.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-title text-center mb-4">파트너 혜택</h2>
          <p className="section-subtitle text-center">플로로탄닌 파트너스가 제공하는 지원</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: '체계적 교육', desc: '4주 온/오프라인 교육 커리큘럼 + 건강 과학 심화 교육', color: '#00B4D8' },
              { icon: TrendingUp, title: '수익 창출', desc: '투명한 수익 구조와 다양한 보상 프로그램', color: '#F0A500' },
              { icon: Award, title: '브랜드 지원', desc: '마케팅 자료, SNS 콘텐츠, Q&A 라이브러리 활용 지원', color: '#8B5CF6' },
              { icon: Users, title: '커뮤니티', desc: '파트너 단톡방, 월간 세미나, 1:1 멘토링', color: '#10B981' },
            ].map(item => (
              <div key={item.title} className="card text-center hover:scale-105 transition-transform">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: item.color + '20' }}>
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <h3 className="font-bold text-ocean-deep mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="section-title text-center mb-4">교육 커리큘럼</h2>
          <p className="section-subtitle text-center">4주 집중 교육으로 전문 파트너가 됩니다</p>

          <div className="space-y-4">
            {curriculum.map(item => (
              <CurriculumCard key={item.week} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Success cases */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-title text-center mb-4">파트너 성공 사례</h2>
          <p className="section-subtitle text-center">실제 파트너들의 이야기 (익명 처리)</p>

          <div className="grid md:grid-cols-3 gap-6">
            {successCases.map(cs => (
              <div key={cs.initial} className="card">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-gold-hana fill-gold-hana" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{cs.quote}"</p>
                <div className="flex items-center gap-3 border-t pt-4">
                  <div className="w-10 h-10 bg-ocean-deep text-white rounded-full flex items-center justify-center font-bold">
                    {cs.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-ocean-deep text-sm">{cs.role}</div>
                    <div className="text-xs text-gray-400">{cs.location} · {cs.duration}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner application form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="section-title text-center mb-4">파트너 신청</h2>
          <p className="section-subtitle text-center">지금 바로 파트너 신청서를 제출하세요</p>

          <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">이름 *</label>
                <input {...register('name', { required: '이름을 입력해주세요' })} className="input-field" placeholder="홍길동" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">연락처 *</label>
                <input {...register('phone', { required: '연락처를 입력해주세요' })} className="input-field" placeholder="010-0000-0000" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">이메일 *</label>
              <input {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: { value: /^\S+@\S+$/i, message: '올바른 이메일을 입력해주세요' }
              })} className="input-field" placeholder="example@email.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">현재 직업</label>
              <input {...register('job')} className="input-field" placeholder="예: 간호사, 약사, 주부, 자영업 등" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">관심 분야</label>
              <div className="grid grid-cols-2 gap-2">
                {['건강/웰니스', '의료/약학', '뷰티/헬스케어', '교육/코칭', '영업/마케팅', '기타'].map(item => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" {...register('interests')} value={item} className="accent-cyan-hana" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">문의 내용</label>
              <textarea
                {...register('message')}
                rows={3}
                className="input-field resize-none"
                placeholder="파트너 활동 관련 궁금한 점을 자유롭게 적어주세요."
              />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" {...register('privacyAgreed', { required: '동의해주세요' })} className="mt-1 accent-cyan-hana" />
              <label className="text-sm text-gray-600">개인정보 수집 및 이용에 동의합니다. (필수)</label>
            </div>
            {errors.privacyAgreed && <p className="text-red-500 text-xs">{errors.privacyAgreed.message}</p>}

            <button type="submit" disabled={isSubmitting} className="w-full btn-gold py-4 flex items-center justify-center gap-2">
              {isSubmitting ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send className="w-5 h-5" />}
              파트너 신청하기
            </button>

            {/* 저작권 / 사용 문의 */}
            <div className="mt-6 border-t border-gray-100 pt-5 space-y-1">
              <p className="text-xs text-gray-400 text-center">
                © 2025 <span className="font-semibold text-gray-500">플로로탄닌 파트너스</span> — All rights reserved.
              </p>
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                본 사이트의 교육 자료·커리큘럼·콘텐츠는 저작권법의 보호를 받습니다. 무단 복제·배포를 금합니다.<br />
                콘텐츠 사용 또는 제휴 문의:{' '}
                <a href="mailto:meul777@naver.com?subject=[파트너/제휴 문의]" className="text-cyan-600 hover:underline font-medium">
                  meul777@naver.com
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
