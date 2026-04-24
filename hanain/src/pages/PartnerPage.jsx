import { useState } from 'react'
import { usePartner } from '../context/PartnerContext'
import SEOHead from '../components/common/SEOHead'
import {
  Users, Award, TrendingUp, BookOpen, CheckCircle,
  ChevronDown, ChevronUp, Send, Star, MessageSquare,
  Phone, ShieldCheck, Repeat, Target, Zap,
} from 'lucide-react'
import RevealContact from '../components/common/RevealContact'

// ── 색상 ───────────────────────────────────────────────
const NAVY  = '#0D1B3E'
const GOLD  = '#B8953A'
const GOLD2 = '#D4AF5A'
const CREAM = '#FFFDF7'

// ── 파트너 혜택 ──────────────────────────────────────
const BENEFITS = [
  {
    icon: BookOpen,
    title: '체계적 교육',
    desc: '4주 온·오프라인 커리큘럼 + 질환별 심화 교육. 처음이어도 바로 시작할 수 있습니다.',
    color: '#00B4D8',
  },
  {
    icon: Zap,
    title: '시작 도구 제공',
    desc: '개인 웹페이지, SNS 콘텐츠, 설명 스크립트까지 — 혼자 던져놓지 않습니다.',
    color: '#F0A500',
  },
  {
    icon: Repeat,
    title: '재구매 중심 구조',
    desc: '실사용자 + 재구매 + 소개. 시간이 지날수록 강해지는 구조입니다.',
    color: '#8B5CF6',
  },
  {
    icon: Users,
    title: '함께하는 팀',
    desc: '같은 뜻을 가진 파트너들과 정보를 나누고 함께 성장합니다.',
    color: '#10B981',
  },
]

// ── 왜 지금인가 ──────────────────────────────────────
const WHY_NOW = [
  {
    emoji: '📈',
    title: '실버시장이 매일 커집니다',
    desc: '대한민국 고령화 속도는 세계 최고. 불과 11년 후 인구 3명 중 1명이 노인 인구입니다. 건강기능식품 시장은 국내 5조 9천억 원 규모, 국민 10명 중 8명 이상이 구매합니다.',
  },
  {
    emoji: '🌊',
    title: '플로로탄닌은 설명 자산입니다',
    desc: '감태 같은 갈조류에서 추출한 해조류 유래 폴리페놀. 잠, 회복, 피로, 인지, 대사, 심혈관, 염증, 근육까지 — 한 성분으로 수십 가지 건강 이야기를 이어갈 수 있는 구조입니다.',
  },
  {
    emoji: '🔄',
    title: '재구매가 구조를 만듭니다',
    desc: '건강은 한 번 사고 끝나는 시장이 아닙니다. 먹으면 또 먹어야 하는 구조 — 소개 → 재구매 → 팀 확장의 흐름이 반복될 때 조직은 스스로 자랍니다.',
  },
  {
    emoji: '⏰',
    title: '지금이 가장 빠른 진입 시점',
    desc: '이미 포화된 시장에서 새로 시작하면 불리한 싸움입니다. 우리는 아직 선점 가능한 포지션에 있습니다.',
  },
]

// ── 네트워크 오해와 진실 ────────────────────────────
const MYTH_FACTS = [
  {
    myth: '다단계 = 불법 피라미드?',
    fact: '다단계판매는 방문판매법에 명시된 합법적 사업 형태입니다. 공정거래위원회 등록, 정보 공개, 소비자피해보상보험, 수당 기준 공개 — 모든 조건을 충족해야 합니다. 합법 네트워크는 법 안의 사업입니다.',
  },
  {
    myth: '혼자 물건을 떠안아야 한다?',
    fact: '재고 부담, 강제 할당 — 그런 구조는 꺾입니다. 우리는 실사용자 + 재구매 + 소개 + 복제가 살아 있는 재구매 중심 구조입니다. 진짜 써보고 다시 사는 사람이 1명이라도 생기면, 그 흐름이 구조의 시작입니다.',
  },
  {
    myth: '경험이 있어야 시작할 수 있다?',
    fact: '우리는 제품만 주는 팀이 아닙니다. 설득력 있는 사업 자료, SNS용 콘텐츠, 초보도 말할 수 있는 스크립트, 개인 웹페이지까지 — 처음이어도 시작할 수 있게 만드는 팀이 강한 팀입니다.',
  },
]

// ── 커리큘럼 ─────────────────────────────────────────
const CURRICULUM = [
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

// ── 성공 사례 ─────────────────────────────────────────
const SUCCESS_CASES = [
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
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ background: `${GOLD}18`, color: NAVY }}
        >
          {item.week}
        </div>
        <div className="flex-1 text-left">
          <div className="font-semibold" style={{ color: NAVY }}>{item.title}</div>
          <div className="text-sm text-gray-400">{item.topics.length}개 주제</div>
        </div>
        {isOpen
          ? <ChevronUp className="w-5 h-5 text-gray-400" />
          : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="border-t border-gray-100 bg-gray-50 p-5">
          <ul className="space-y-2">
            {item.topics.map((topic, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function SmsModal({ formData, partnerPhone, onClose }) {
  const smsBody = buildSmsBody(formData)
  const smsLink = `sms:${partnerPhone}?body=${encodeURIComponent(smsBody)}`

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: `${GOLD}20` }}>
          <MessageSquare className="w-10 h-10" style={{ color: GOLD }} />
        </div>
        <h3 className="text-2xl font-bold mb-3" style={{ color: NAVY }}>신청 준비 완료!</h3>
        <p className="text-gray-700 mb-2 font-medium">
          아래 버튼을 누르면 문자 앱이 열리면서<br />
          신청 내용이 자동으로 입력됩니다.
        </p>
        <p className="text-gray-500 text-sm mb-5">전송 버튼을 한 번만 눌러주시면 됩니다.</p>

        <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left border border-gray-200">
          <p className="text-xs text-gray-400 font-semibold mb-2 uppercase tracking-wide">문자 미리보기</p>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-sans">{smsBody}</pre>
        </div>

        <div className="space-y-3">
          <a
            href={smsLink}
            className="w-full py-4 flex items-center justify-center gap-2 text-lg font-bold rounded-2xl"
            style={{ background: `linear-gradient(135deg, ${NAVY}, #1a3a6a)`, color: '#fff' }}
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

export default function PartnerPage() {
  const partner = usePartner()
  const PHONE_NUMBER  = partner.phone
  const PHONE_DISPLAY = partner.phoneDisplay

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', job: '', interests: [], message: '', privacyAgreed: false,
  })
  const [errors, setErrors]   = useState({})
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
    <div className="pt-16" style={{ background: CREAM }}>
      <SEOHead
        title="파트너 참여 | 플로로탄닌 파트너스"
        description="건강 정보를 나누고 뜻이 맞는 분들과 파트너로 함께하세요. 재구매 중심 구조, 체계적 교육, 개인 도구 지원."
        keywords="플로로탄닌 파트너, 건강 파트너십, 건강식품 사업, 파트너 모집"
        canonical="https://phlorotannin.com/partner"
      />

      {success && (
        <SmsModal
          formData={formData}
          partnerPhone={PHONE_NUMBER}
          onClose={() => {
            setSuccess(false)
            setFormData({ name: '', phone: '', email: '', job: '', interests: [], message: '', privacyAgreed: false })
          }}
        />
      )}

      {/* ── Hero ──────────────────────────────────────── */}
      <div className="py-20 px-6 text-center"
        style={{ background: `linear-gradient(160deg, ${NAVY} 0%, #1a3a6a 100%)`, borderBottom: `3px solid ${GOLD}` }}>
        <p style={{ fontSize: '11px', color: GOLD, letterSpacing: '4px', fontWeight: '700', marginBottom: '12px' }}>
          PHLOROTANNIN PARTNERS
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ color: '#fff' }}>
          건강시장에서<br />
          <span style={{ color: GOLD2 }}>먼저 자리 잡는 사람이</span><br />
          돈을 벌기 시작합니다
        </h1>
        <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: '#a0b8d0' }}>
          실버시장 + 플로로탄닌 성분력 + 재구매 구조 + 팀 시스템.<br />
          지금이 가장 빠른 진입 시점입니다.
        </p>
        <a
          href="#apply"
          className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-2xl font-bold text-lg"
          style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, color: NAVY }}
        >
          파트너 신청하기 →
        </a>
      </div>

      {/* ── 왜 지금인가 ───────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{ fontSize: '11px', color: GOLD, letterSpacing: '3px', fontWeight: '700', textAlign: 'center', marginBottom: '8px' }}>
            WHY NOW
          </p>
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: NAVY }}>
            왜 지금 기회가 보이는가
          </h2>
          <p className="text-center text-gray-500 mb-10" style={{ fontSize: '15px' }}>
            시장 자체가 커지고 있습니다. 지금이 선점 가능한 포지션입니다.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {WHY_NOW.map((item, i) => (
              <div key={i} className="rounded-2xl p-6 bg-white"
                style={{ border: `1.5px solid ${GOLD}30`, boxShadow: `0 2px 16px ${GOLD}10` }}>
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: NAVY }}>{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl p-5 text-center"
            style={{ background: `linear-gradient(135deg, ${NAVY}, #1a3a6a)`, border: `2px solid ${GOLD}50` }}>
            <p style={{ fontSize: '14px', color: GOLD2, fontStyle: 'italic' }}>
              "이 시장은 늦게 보면 평범한 시장이고, 빨리 보면 선점 가능한 시장입니다."
            </p>
          </div>
        </div>
      </section>

      {/* ── 네트워크 오해와 진실 ──────────────────────── */}
      <section className="py-16 px-4" style={{ background: '#F8F9FA' }}>
        <div className="max-w-4xl mx-auto">
          <p style={{ fontSize: '11px', color: GOLD, letterSpacing: '3px', fontWeight: '700', textAlign: 'center', marginBottom: '8px' }}>
            FACTS
          </p>
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: NAVY }}>
            네트워크에 대한 오해와 진실
          </h2>
          <p className="text-center text-gray-500 mb-10 text-sm">
            네트워크가 나쁜 게 아닙니다. 불법 피라미드가 나쁜 것입니다.
          </p>
          <div className="space-y-4">
            {MYTH_FACTS.map((item, i) => (
              <div key={i} className="rounded-2xl bg-white overflow-hidden"
                style={{ border: `1.5px solid #E5E7EB`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div className="px-5 py-3 flex items-center gap-3"
                  style={{ background: '#FFF1F2', borderBottom: '1px solid #FECDD3' }}>
                  <span style={{ fontSize: '18px' }}>❌</span>
                  <p className="font-bold text-red-700 text-sm">{item.myth}</p>
                </div>
                <div className="px-5 py-4 flex items-start gap-3">
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>✅</span>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.fact}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl p-5"
            style={{ background: '#EFF6FF', border: '1.5px solid #BFDBFE' }}>
            <p style={{ fontSize: '13px', color: '#1E40AF', lineHeight: 1.8 }}>
              📌 <strong>출처:</strong> 공정거래위원회 / 한국소비자원 / 찾기쉬운생활법령정보<br />
              합법 다단계판매는 방문판매법에 의해 엄격히 규제됩니다. 후원수당 총액은 공급 상품 가격 합계액의 35%를 초과할 수 없습니다.
            </p>
          </div>
        </div>
      </section>

      {/* ── 파트너 혜택 ───────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <p style={{ fontSize: '11px', color: GOLD, letterSpacing: '3px', fontWeight: '700', textAlign: 'center', marginBottom: '8px' }}>
            BENEFITS
          </p>
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: NAVY }}>파트너 혜택</h2>
          <p className="text-center text-gray-500 mb-10 text-sm">우리는 제품만 주는 팀이 아닙니다. 시작 도구까지 주는 팀입니다.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map(item => (
              <div key={item.title} className="rounded-2xl p-6 text-center"
                style={{ border: `1.5px solid ${item.color}30`, background: `${item.color}08` }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${item.color}20` }}>
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: NAVY }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 교육 커리큘럼 ────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: '#F8F9FA' }}>
        <div className="max-w-3xl mx-auto">
          <p style={{ fontSize: '11px', color: GOLD, letterSpacing: '3px', fontWeight: '700', textAlign: 'center', marginBottom: '8px' }}>
            CURRICULUM
          </p>
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: NAVY }}>교육 커리큘럼</h2>
          <p className="text-center text-gray-500 mb-10 text-sm">4주 집중 교육으로 전문 파트너가 됩니다</p>
          <div className="space-y-4">
            {CURRICULUM.map(item => (
              <CurriculumCard key={item.week} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 성공 사례 ─────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <p style={{ fontSize: '11px', color: GOLD, letterSpacing: '3px', fontWeight: '700', textAlign: 'center', marginBottom: '8px' }}>
            SUCCESS STORIES
          </p>
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: NAVY }}>파트너 성공 사례</h2>
          <p className="text-center text-gray-500 mb-10 text-sm">실제 파트너들의 이야기 (익명 처리)</p>
          <div className="grid md:grid-cols-3 gap-6">
            {SUCCESS_CASES.map(cs => (
              <div key={cs.initial} className="rounded-2xl p-6 bg-white"
                style={{ border: `1.5px solid ${GOLD}30`, boxShadow: `0 2px 16px ${GOLD}10` }}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4" style={{ color: GOLD, fill: GOLD }} />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{cs.quote}"</p>
                <div className="flex items-center gap-3 border-t pt-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ background: NAVY }}>
                    {cs.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: NAVY }}>{cs.role}</div>
                    <div className="text-xs text-gray-400">{cs.location} · {cs.duration}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 파트너 신청 폼 ───────────────────────────── */}
      <section id="apply" className="py-16 px-4" style={{ background: '#F8F9FA' }}>
        <div className="max-w-2xl mx-auto">
          <p style={{ fontSize: '11px', color: GOLD, letterSpacing: '3px', fontWeight: '700', textAlign: 'center', marginBottom: '8px' }}>
            APPLY NOW
          </p>
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: NAVY }}>파트너 신청</h2>
          <p className="text-center text-gray-500 mb-8 text-sm">아래 정보를 입력하고 문자로 신청하세요</p>

          {/* 안내 배너 */}
          <div className="rounded-2xl p-4 mb-6 flex items-start gap-3"
            style={{ background: `${GOLD}12`, border: `1.5px solid ${GOLD}40` }}>
            <MessageSquare className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: GOLD }} />
            <div>
              <div className="text-sm font-bold" style={{ color: NAVY }}>이렇게 진행됩니다</div>
              <div className="text-sm mt-1 leading-relaxed text-gray-700">
                ① 아래 양식 작성 → ② <strong>파트너 신청 문자 보내기</strong> 클릭 → ③ 문자 앱에서 <strong>전송</strong>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="bg-white rounded-3xl p-8 shadow-md space-y-5">
            <h3 className="font-bold text-xl" style={{ color: NAVY }}>파트너 신청서</h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">이름 *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500"
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
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500"
                  placeholder="010-0000-0000"
                  type="tel"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                이메일 <span className="text-xs text-gray-400 font-normal">(선택사항)</span>
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500"
                placeholder="example@email.com"
                type="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">현재 직업</label>
              <input
                name="job"
                value={formData.job}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500"
                placeholder="예: 간호사, 약사, 주부, 자영업 등"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">관심 건강/활동 분야</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  '암치료/항암 관리', '당뇨/혈당 조절', '고혈압/혈관 건강', '탈모/피부 개선',
                  '치매/인지 건강', '다이어트/비만', '건강/웰니스', '의료/약학',
                  '뷰티/헬스케어', '교육/코칭', '영업/마케팅', '기타',
                ].map(item => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="interests"
                      value={item}
                      checked={formData.interests.includes(item)}
                      onChange={handleChange}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: GOLD }}
                    />
                    <span className="text-sm text-gray-700">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                문의 내용 <span className="text-xs text-gray-400 font-normal">(선택사항 — 문자에 자동 포함)</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 resize-none"
                placeholder="파트너 활동 관련 궁금한 점을 자유롭게 적어주세요."
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="privacyAgreed"
                checked={formData.privacyAgreed}
                onChange={handleChange}
                className="mt-1 w-4 h-4"
                style={{ accentColor: NAVY }}
              />
              <label className="text-sm text-gray-600">
                <span className="font-medium">개인정보 수집 및 이용에 동의합니다.</span> (필수)
              </label>
            </div>
            {errors.privacyAgreed && <p className="text-red-500 text-xs">{errors.privacyAgreed}</p>}

            <button
              type="submit"
              className="w-full py-4 flex items-center justify-center gap-3 rounded-2xl font-bold text-lg"
              style={{ background: `linear-gradient(135deg, ${NAVY}, #1a3a6a)`, color: '#fff' }}
            >
              <MessageSquare className="w-5 h-5" />
              파트너 신청 문자 보내기
              <Send className="w-4 h-4 opacity-70" />
            </button>

            <p className="text-xs text-center text-gray-500">
              버튼을 누르면 작성하신 내용이 담긴 문자가 준비됩니다.<br />
              문자 앱에서 <strong>전송</strong>만 누르면 완료!
            </p>

            <div className="border-t border-gray-100 pt-5">
              <p className="text-xs text-center text-gray-400 mb-3">또는 바로 연락하기</p>
              <div className="grid grid-cols-2 gap-3">
                <RevealContact
                  type="tel"
                  label="전화 문의"
                  phone={PHONE_NUMBER}
                  displayPhone={PHONE_DISPLAY}
                  className="flex items-center justify-center gap-2 py-3 bg-white border-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
                  style={{ borderColor: NAVY, color: NAVY }}
                />
                <RevealContact
                  type="sms"
                  label="문자 문의"
                  phone={PHONE_NUMBER}
                  displayPhone={PHONE_DISPLAY}
                  smsBody="[플로로탄닌 파트너스] 파트너 신청 문의드립니다."
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all"
                  style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})` }}
                />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5 space-y-1">
              <p className="text-xs text-gray-400 text-center">
                © 2026 <span className="font-semibold text-gray-500">플로로탄닌 파트너스</span> — All rights reserved.
              </p>
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                본 사이트의 교육 자료·커리큘럼·콘텐츠는 저작권법의 보호를 받습니다. 무단 복제·배포를 금합니다.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
