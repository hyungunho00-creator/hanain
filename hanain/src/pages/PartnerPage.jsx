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
    title: '교육 지원',
    desc: '질환별 건강 정보, 성분 과학, 고객 응대까지 — 필요한 지식을 체계적으로 지원합니다.',
    color: '#00B4D8',
  },
  {
    icon: Zap,
    title: '다양한 지원',
    desc: '개인 웹페이지, SNS 콘텐츠, 전자명함, 설명 자료까지 — 혼자 시작해도 갖출 것은 다 갖춥니다.',
    color: '#F0A500',
  },
  {
    icon: Repeat,
    title: '재구매 중심 구조',
    desc: '건강은 한 번으로 끝나지 않습니다. 신뢰가 쌓일수록 관계가 이어지는 구조입니다.',
    color: '#8B5CF6',
  },
  {
    icon: Users,
    title: '함께하는 네트워크',
    desc: '같은 방향을 보는 파트너들과 정보를 나누고 서로의 전문성을 연결합니다.',
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
    title: '재구매가 관계를 만듭니다',
    desc: '건강은 한 번 사고 끝나는 시장이 아닙니다. 효과를 경험한 사람이 다시 찾고, 주변에 소개합니다. 신뢰 기반의 반복 구조입니다.',
  },
  {
    emoji: '⏰',
    title: '지금이 가장 빠른 진입 시점',
    desc: '이미 포화된 시장에서 새로 시작하면 불리한 싸움입니다. 우리는 아직 선점 가능한 포지션에 있습니다.',
  },
]

// ── 이런 분들과 함께합니다 ────────────────────────
const WHO_FIT = [
  { emoji: '💆', title: '힐링센터 · 웰니스샵', desc: '고객에게 건강 정보를 전하는 일을 이미 하고 계신 분. 플로로탄닌은 설명 자산이 됩니다.' },
  { emoji: '✨', title: '피부샵 · 마사지샵', desc: '피부·관절·회복에 관심 있는 고객층을 이미 보유한 분. 자연스럽게 연결되는 이야기입니다.' },
  { emoji: '🌿', title: '건강식품 사업자', desc: '온·오프라인에서 건강 관련 제품을 이미 다루고 있는 분. 성분 하나가 전체 라인업을 강화합니다.' },
  { emoji: '🏃', title: '운동·피트니스 관련', desc: '근육 회복, 에너지 대사, 항염에 관심 있는 고객과 일하는 분. 과학적 근거가 신뢰를 높입니다.' },
  { emoji: '📱', title: '온라인 콘텐츠 활동가', desc: '블로그·SNS·유튜브로 건강 정보를 나누는 분. 1,361개 Q&A가 콘텐츠 소재가 됩니다.' },
  { emoji: '🤝', title: '건강에 관심 많은 누구나', desc: '전문 경력 없어도 괜찮습니다. 주변 사람에게 좋은 정보를 먼저 전하는 것에서 시작됩니다.' },
]

// ── 시장성 ───────────────────────────────────────
const MARKET_GROWTH = [
  {
    icon: '📊',
    title: '국내 건강기능식품 시장 5조 9천억',
    desc: '연평균 8% 이상 성장 중. 고령화·건강 관심 증가로 시장 자체가 커지는 구조입니다.',
    highlight: '연 8% 이상 성장',
  },
  {
    icon: '🌿',
    title: '플로로탄닌 — 아직 선점 가능한 성분',
    desc: '홍삼·오메가3는 이미 포화. 플로로탄닌은 SCI 논문이 쏟아지는 신흥 성분. 지금이 콘텐츠 선점 시점입니다.',
    highlight: '블루오션 성분',
  },
  {
    icon: '🔁',
    title: '신뢰가 쌓이는 재구매 구조',
    desc: '효과를 경험한 사람이 다시 찾습니다. 관계 중심으로 움직이는 건강 시장의 특성입니다.',
    highlight: '관계 기반 구조',
  },
  {
    icon: '📱',
    title: '온·오프라인 어디서든',
    desc: '매장 방문 고객에게도, 온라인 팔로워에게도. 채널을 가리지 않고 전문성을 연결할 수 있습니다.',
    highlight: '채널 무관 활동',
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
    role: '피부샵 운영 파트너',
    location: '부산',
    quote: '고객들에게 피부 관리 외에 건강 이야기를 나눌 수 있게 됐습니다. 플로로탄닌 성분 자료가 설명 도구가 되더라고요.',
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
          건강을 다루는 사람이라면<br />
          <span style={{ color: GOLD2 }}>전문성이 더 깊어지는</span><br />
          파트너십입니다
        </h1>
        <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: '#a0b8d0' }}>
          힐링센터·피부샵·건강식품·온라인 활동까지 —<br />
          이미 건강 관련 일을 하고 있다면 자연스럽게 연결됩니다.
        </p>
        <a
          href="#apply"
          className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-2xl font-bold text-lg"
          style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, color: NAVY }}
        >
          파트너 신청하기 →
        </a>
      </div>

      {/* ── 파트너 소개 영상 ───────────────────────────── */}
      <section className="py-12 px-4" style={{ background: '#0d1f3c' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ fontSize: '11px', color: '#C9A84C', letterSpacing: '3px', fontWeight: '700', marginBottom: '8px' }}>
            PARTNER INTRO VIDEO
          </p>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#fff' }}>
            플로로탄닌 파트너스, 영상으로 먼저 확인하세요
          </h2>
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/lkLEZ4nhlx8"
              title="플로로탄닌 파트너스 소개 영상"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      </section>

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

      {/* ── 이런 분들과 함께합니다 ─────────────────── */}
      <section className="py-16 px-4" style={{ background: '#F8F9FA' }}>
        <div className="max-w-5xl mx-auto">
          <p style={{ fontSize: '11px', color: GOLD, letterSpacing: '3px', fontWeight: '700', textAlign: 'center', marginBottom: '8px' }}>WHO WE WORK WITH</p>
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: NAVY }}>이런 분들과 함께합니다</h2>
          <p className="text-center text-gray-500 mb-10 text-sm">건강과 관련된 일을 하고 있다면, 이미 절반은 준비된 겁니다</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHO_FIT.map((item, i) => (
              <div key={i} className="rounded-2xl bg-white p-6"
                style={{ border: `1.5px solid ${GOLD}25`, boxShadow: `0 2px 16px ${GOLD}08` }}>
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-bold mb-2" style={{ color: NAVY }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 시장성 ───────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <p style={{ fontSize: '11px', color: GOLD, letterSpacing: '3px', fontWeight: '700', textAlign: 'center', marginBottom: '8px' }}>MARKET</p>
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: NAVY }}>왜 지금 플로로탄닌인가</h2>
          <p className="text-center text-gray-500 mb-10 text-sm">성장하는 시장에서 선점 가능한 성분</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {MARKET_GROWTH.map((item, i) => (
              <div key={i} className="rounded-2xl p-6"
                style={{ border: `1.5px solid ${GOLD}25`, background: `${GOLD}06` }}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2"
                  style={{ background: `${GOLD}18`, color: GOLD }}>{item.highlight}</div>
                <h3 className="font-bold text-sm mb-2" style={{ color: NAVY }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
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
                  '힐링센터·웰니스샵', '피부샵·마사지샵', '건강식품 사업', '운동·피트니스',
                  '당뇨/혈당 관리', '고혈압/혈관 건강', '피부·탈모 관리', '치매/인지 건강',
                  '의료·약학 종사', '온라인 콘텐츠 활동', '시니어 케어', '기타',
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
                본 사이트의 교육 자료·콘텐츠는 저작권법의 보호를 받습니다. 무단 복제·배포를 금합니다.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
