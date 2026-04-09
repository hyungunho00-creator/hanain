import { useState , useEffect } from 'react'
import { usePartner } from '../context/PartnerContext'
import SEOHead from '../components/common/SEOHead'
import { Users, Award, TrendingUp, BookOpen, CheckCircle, ChevronDown, ChevronUp, Send, Star, MessageSquare, Phone } from 'lucide-react'

const curriculum = [
  {
    week: '1주차',
    title: '플로로탄닌 파트너스 이해',
    topics: ['감태 플로로탄닌 기초 과학', 'MOP 공정 이해', '하이드로 포집 기술', '제품 라인업 소개'],
  },
  {
    week: '2주차',
    title: '건강 과학 심화 교육',
    topics: ['12개 카테고리 질환별 기전', '표준 의학 치료와 식품소재 비교', 'SCI 논문 읽는 법', 'Q&A 라이브러리 활용법'],
  },
  {
    week: '3주차',
    title: '비즈니스 스킬',
    topics: ['파트너 활동 구조 이해', '건강 정보 안내 방법', '소셜 미디어 활용 기초', '고객 응대 방법'],
  },
  {
    week: '4주차',
    title: '실전 적용 & 수료',
    topics: ['모의 상담 실습', '개인 활동 계획 수립', '파트너 목표 설정', '수료증 발급'],
  },
]

const successCases = [
  {
    initial: 'K',
    role: '간호사 출신 파트너',
    location: '서울',
    quote: '의료 지식을 활용해 사람들에게 신뢰를 얻기 쉬웠습니다. 파트너로 활동하면서 건강에 대한 보람찬 역할을 하고 있어요.',
    duration: '파트너 활동 18개월',
  },
  {
    initial: 'P',
    role: '전업주부 출신 파트너',
    location: '부산',
    quote: '처음에는 많이 걱정했지만 체계적인 교육 덕분에 자신감이 생겼습니다. 이제는 주변 분들에게 건강 정보를 나누는 역할을 하고 있어요.',
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

function buildSmsBody(data) {
  const interests = Array.isArray(data.interests)
    ? data.interests.join(', ')
    : data.interests || '미선택'
  const lines = [
    '[플로로탄닌 파트너스] 파트너 신청',
    '─────────────────',
    `이름: ${data.name}`,
    `연락처: ${data.phone}`,
    data.email ? `이메일: ${data.email}` : '',
    data.job ? `현재 직업: ${data.job}` : '',
    interests ? `관심 분야: ${interests}` : '',
    data.message ? `문의 내용: ${data.message}` : '',
    '─────────────────',
    '위 내용으로 파트너 신청합니다.',
  ]
  return lines.filter(Boolean).join('\n')
}

function CurriculumCard({ item }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="w-16 h-16 bg-cyan-hana/10 text-cyan-hana rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0">
          {item.week}
        </div>
        <div className="flex-1 text-left">
          <div className="font-semibold text-ocean-deep">{item.title}</div>
          <div className="text-base text-gray-400">{item.topics.length}개 주제</div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="border-t border-gray-100 bg-gray-50 p-5">
          <ul className="space-y-2">
            {item.topics.map((topic, i) => (
              <li key={i} className="flex items-center gap-2 text-base text-gray-600">
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

// SMS 준비 완료 모달
function SmsModal({ formData, onClose }) {
  const smsBody = buildSmsBody(formData)
  const smsLink = `sms:${PHONE_NUMBER}?body=${encodeURIComponent(smsBody)}`

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-10 h-10 text-cyan-hana" />
        </div>
        <h3 className="text-2xl font-bold text-ocean-deep mb-3">신청 준비 완료!</h3>
        <p className="text-gray-700 mb-2 font-medium">
          아래 버튼을 누르면 문자 앱이 열리면서<br />
          신청 내용이 자동으로 입력됩니다.
        </p>
        <p className="text-gray-500 text-base mb-5">
          전송 버튼을 한 번만 눌러주시면 됩니다.
        </p>

        {/* SMS 미리보기 */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left border border-gray-200">
          <p className="text-sm text-gray-400 font-semibold mb-2 uppercase tracking-wide">문자 미리보기</p>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-sans">{smsBody}</pre>
        </div>

        <div className="space-y-3">
          <a
            href={smsLink}
            className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-lg"
          >
            <MessageSquare className="w-5 h-5" />
            문자 앱 열고 전송하기
          </a>
          <button
            onClick={onClose}
            className="w-full py-3 text-base text-gray-400 hover:text-gray-600 transition-colors"
          >
            나중에 보내기
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PartnerPage() {
  const partner = usePartner()
  const PHONE_NUMBER = partner.phone
  const PHONE_DISPLAY = partner.phoneDisplay

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    job: '',
    interests: [],
    message: '',
    privacyAgreed: false,
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox' && name === 'interests') {
      setFormData(prev => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter(i => i !== value),
      }))
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = '이름을 입력해주세요'
    if (!formData.phone.match(/^[0-9-+]{10,13}$/)) errs.phone = '올바른 연락처를 입력해주세요'
    if (!formData.privacyAgreed) errs.privacyAgreed = '개인정보 수집에 동의해주세요'
    return errs
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSuccess(true)
  }

  return (
    <div className="pt-16">
      <SEOHead
        title="파트너 참여"
        description="플로로탄닌 파트너스 파트너 참여 안내. 건강 정보를 공유하고 파트너로 함께하세요."
        keywords="플로로탄닌 파트너, 건강 파트너십, 건강식품 사업, 파트너 모집"
        canonical="https://phlorotannin.com/partner"
      />
      {success && (
        <SmsModal
          formData={formData}
          onClose={() => {
            setSuccess(false)
            setFormData({ name: '', phone: '', email: '', job: '', interests: [], message: '', privacyAgreed: false })
          }}
        />
      )}

      {/* Hero */}
      <div className="bg-ocean-gradient py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-gold-hana text-base font-medium mb-5">
            <Users className="w-4 h-4" />
            <span>파트너 프로그램</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ color: '#ffffff' }}>
            플로로탄닌 파트너스와<br />
            <span style={{ color: '#00B4D8' }}>함께 성장하세요</span>
          </h1>
          <p className="text-xl max-w-xl leading-relaxed" style={{ color: '#d1e8f5' }}>
            건강 정보를 함께 나누고, 뜻이 맞는 분들과<br />
            파트너로 함께할 수 있습니다.
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
              { icon: TrendingUp, title: '활동 지원', desc: '파트너 활동에 필요한 자료와 정보를 함께 제공합니다', color: '#F0A500' },
              { icon: Award, title: '브랜드 지원', desc: '마케팅 자료, SNS 콘텐츠, Q&A 라이브러리 활용 지원', color: '#8B5CF6' },
              { icon: Users, title: '함께하는 커뮤니티', desc: '같은 뜻을 가진 파트너들과 정보를 나누고 함께 성장해요', color: '#10B981' },
            ].map(item => (
              <div key={item.title} className="card text-center hover:scale-105 transition-transform">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: item.color + '20' }}>
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <h3 className="font-bold text-ocean-deep mb-2">{item.title}</h3>
                <p className="text-gray-500 text-base">{item.desc}</p>
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
                <p className="text-gray-600 text-base leading-relaxed mb-4 italic">"{cs.quote}"</p>
                <div className="flex items-center gap-3 border-t pt-4">
                  <div className="w-10 h-10 bg-ocean-deep text-white rounded-full flex items-center justify-center font-bold">
                    {cs.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-ocean-deep text-base">{cs.role}</div>
                    <div className="text-sm text-gray-400">{cs.location} · {cs.duration}</div>
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
          <p className="section-subtitle text-center">아래 정보를 입력하고 문자로 신청하세요</p>

          {/* 안내 배너 */}
          <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-base font-bold text-cyan-800">이렇게 진행됩니다</div>
              <div className="text-base text-cyan-700 mt-1 leading-relaxed">
                ① 아래 양식 작성 → ② <strong>파트너 신청 문자 보내기</strong> 클릭 → ③ 문자 앱에서 <strong>전송</strong>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="card space-y-5">
            <h3 className="font-bold text-ocean-deep text-xl">파트너 신청서</h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1.5">이름 *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="홍길동"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1.5">연락처 *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="010-0000-0000"
                  type="tel"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-1.5">
                이메일
                <span className="text-sm text-gray-400 font-normal ml-1">(선택사항)</span>
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="example@email.com"
                type="email"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-1.5">현재 직업</label>
              <input
                name="job"
                value={formData.job}
                onChange={handleChange}
                className="input-field"
                placeholder="예: 간호사, 약사, 주부, 자영업 등"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-1.5">관심 건강/활동 분야</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  '암치료/항암 관리',
                  '당뇨/혈당 조절',
                  '고혈압/혈관 건강',
                  '탈모/피부 개선',
                  '치매/인지 건강',
                  '다이어트/비만',
                  '건강/웰니스',
                  '의료/약학',
                  '뷰티/헬스케어',
                  '교육/코칭',
                  '영업/마케팅',
                  '기타',
                ].map(item => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="interests"
                      value={item}
                      checked={formData.interests.includes(item)}
                      onChange={handleChange}
                      className="accent-cyan-hana"
                    />
                    <span className="text-base text-gray-700">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-1.5">
                문의 내용
                <span className="text-sm text-gray-400 font-normal ml-1">(선택사항 — 문자에 자동 포함)</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="input-field resize-none"
                placeholder="파트너 활동 관련 궁금한 점을 자유롭게 적어주세요."
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="privacyAgreed"
                checked={formData.privacyAgreed}
                onChange={handleChange}
                className="mt-1 accent-cyan-hana w-4 h-4"
              />
              <label className="text-base text-gray-600">
                <span className="font-medium">개인정보 수집 및 이용에 동의합니다.</span> (필수)
              </label>
            </div>
            {errors.privacyAgreed && <p className="text-red-500 text-sm">{errors.privacyAgreed}</p>}

            {/* 제출 버튼 */}
            <button
              type="submit"
              className="w-full bg-ocean-deep text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <MessageSquare className="w-5 h-5" />
              파트너 신청 문자 보내기
              <Send className="w-4 h-4 opacity-70" />
            </button>

            <p className="text-sm text-center text-gray-500">
              버튼을 누르면 작성하신 내용이 담긴 문자가 준비됩니다.<br />
              문자 앱에서 <strong>전송</strong>만 누르면 완료!
            </p>

            {/* 바로 전화 */}
            <div className="border-t border-gray-100 pt-5">
              <p className="text-sm text-center text-gray-400 mb-3">또는 바로 연락하기</p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center justify-center gap-2 py-3 bg-white border-2 border-ocean-deep text-ocean-deep rounded-xl text-base font-semibold hover:bg-ocean-deep hover:text-white transition-all"
                >
                  <Phone className="w-4 h-4" />
                  {PHONE_DISPLAY}
                </a>
                <a
                  href={`sms:${PHONE_NUMBER}?body=${encodeURIComponent('[플로로탄닌 파트너스] 파트너 신청 문의드립니다.')}`}
                  className="flex items-center justify-center gap-2 py-3 bg-cyan-hana text-white rounded-xl text-base font-semibold hover:bg-opacity-90 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  문자 문의
                </a>
              </div>
            </div>

            {/* 저작권 */}
            <div className="border-t border-gray-100 pt-5 space-y-1">
              <p className="text-sm text-gray-400 text-center">
                © 2025 <span className="font-semibold text-gray-500">플로로탄닌 파트너스</span> — All rights reserved.
              </p>
              <p className="text-sm text-gray-400 text-center leading-relaxed">
                본 사이트의 교육 자료·커리큘럼·콘텐츠는 저작권법의 보호를 받습니다. 무단 복제·배포를 금합니다.<br />
                콘텐츠 사용 또는 제휴 문의:{' '}
                <a href={`sms:${PHONE_NUMBER}?body=${encodeURIComponent('[파트너/제휴 문의] ')}`} className="text-cyan-600 hover:underline font-medium">
                  {PHONE_DISPLAY} 문자
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
