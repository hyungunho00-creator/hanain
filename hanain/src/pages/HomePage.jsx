import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight, Search, BookOpen, Users, ChevronRight,
  Star, MessageCircle, Waves, Leaf, Brain, Heart,
  Shield, Activity, Zap, Phone
} from 'lucide-react'
import RevealContact from '../components/common/RevealContact'


function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])
  return [count, setStarted]
}

function StatCounter({ value, label, suffix = '' }) {
  const ref = useRef(null)
  const [count, setStarted] = useCountUp(parseInt(String(value).replace(/,/g, '')))
  const [triggered, setTriggered] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !triggered) { setTriggered(true); setStarted(true) } },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [triggered, setStarted])
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">{count.toLocaleString()}{suffix}</div>
      <div className="text-cyan-hana text-sm font-medium">{label}</div>
    </div>
  )
}

const categoryMeta = [
  { id: 'metabolism',          name: '대사질환',   color: '#0077B6', icon: Activity },
  { id: 'cancer_immune',       name: '항암/면역',   color: '#00B4D8', icon: Shield },
  { id: 'digestive',           name: '소화/간',     color: '#2ECC71', icon: Leaf },
  { id: 'neuro_cognitive',     name: '신경/인지',   color: '#9B59B6', icon: Brain },
  { id: 'skin_hair',           name: '피부/모발',   color: '#E91E63', icon: Star },
  { id: 'musculoskeletal',     name: '근골격계',    color: '#FF6B35', icon: Zap },
  { id: 'womens_health',       name: '여성건강',    color: '#F06292', icon: Heart },
  { id: 'mens_health',         name: '남성건강',    color: '#1976D2', icon: Users },
  { id: 'cardiovascular',      name: '심혈관',      color: '#E53935', icon: Heart },
  { id: 'respiratory',         name: '호흡기',      color: '#26C6DA', icon: Activity },
  { id: 'infection_inflammation', name: '감염/염증', color: '#FFA726', icon: Shield },
  { id: 'mental_health',       name: '정신건강',    color: '#66BB6A', icon: Brain },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [featuredQAs, setFeaturedQAs] = useState([])
  const [qaData, setQaData] = useState({ questions: [], categories: [] })

  useEffect(() => {
    fetch('/qa.json')
      .then(r => r.json())
      .then(d => {
        setQaData(d)
        const shuffled = [...(d.questions || [])].sort(() => Math.random() - 0.5)
        setFeaturedQAs(shuffled.slice(0, 6))
      })
      .catch(console.error)
  }, [])

  const handleSearch = (e) => {
    const val = e.target.value
    setSearchQuery(val)
    if (val.length > 1) {
      const matches = (qaData.questions || []).filter(q =>
        q.question.includes(val) || (q.tags || []).some(t => t.includes(val))
      ).slice(0, 6)
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }

  const getCategoryMeta = (catId) =>
    categoryMeta.find(c => c.id === catId) || { name: '', color: '#00B4D8', icon: BookOpen }

  const totalQA = (qaData.questions || []).length

  return (
    <div className="pt-16">

      {/* ─── Hero ─── */}
      <section className="relative min-h-[90vh] bg-ocean-gradient flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-hana/10 rounded-full blur-3xl animate-wave" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-wave" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 py-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-cyan-hana/20 border border-cyan-hana/30 text-cyan-hana px-5 py-2 rounded-full text-sm font-medium mb-8">
            <Waves className="w-4 h-4" />
            해조류 건강 정보 커뮤니티
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            플로로탄닌 파트너스<br />
            <span className="gradient-text">건강 정보를 함께 공부합니다</span>
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            갈조류(미역·다시마·감태)에서 발견된 플로로탄닌과 다양한 자연 소재에 대한
            과학적 건강 정보를 나눕니다. 정보로 시작해 파트너로 이어집니다.
          </p>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto mb-10">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="궁금한 증상이나 건강 주제를 검색하세요... (예: 당뇨, 탈모, 고혈압)"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 pl-14 pr-5 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-hana backdrop-blur-sm text-base"
            />
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
                {suggestions.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSuggestions([])
                      setSearchQuery('')
                      // QA 페이지로 이동하면서 해당 질문 ID를 openId로 전달
                      navigate(`/qa?openId=${s.id}&category=${s.category}`)
                    }}
                    className="w-full flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 text-left"
                  >
                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-700 text-sm block">{s.question}</span>
                      <span className="text-xs text-cyan-hana mt-0.5 block">
                        {categoryMeta.find(c => c.id === s.category)?.name || ''} · 클릭하면 답변 바로 보기 →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Link to="/qa" className="btn-primary flex items-center gap-2 px-8 py-3.5">
              전체 Q&A 보기 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/consult" className="btn-secondary flex items-center gap-2 px-8 py-3.5">
              파트너 문의하기 <MessageCircle className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {['당뇨', '탈모', '지방간', '고혈압', '아토피', '치매', '수면', '면역'].map(tag => (
              <Link
                key={tag}
                to={`/qa?q=${tag}`}
                className="text-xs bg-white/10 text-gray-300 px-3 py-1.5 rounded-full hover:bg-cyan-hana hover:text-white transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="bg-ocean-mid py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter value={totalQA} label="건강 Q&A" suffix="+" />
            <StatCounter value="12" label="전문 카테고리" suffix="개" />
            <StatCounter value="50" label="파트너 활동 중" suffix="+" />
            <StatCounter value="100" label="카테고리별 Q&A" suffix="+" />
          </div>
        </div>
      </section>

      {/* ─── 이 사이트는 무엇인가 ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-cyan-hana text-sm font-medium mb-3">
              <BookOpen className="w-4 h-4" />
              플로로탄닌 파트너스 소개
            </div>
            <h2 className="section-title">우리는 정보를 나누는 커뮤니티입니다</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                color: 'text-cyan-hana',
                bg: 'bg-cyan-hana/10',
                title: '정확한 건강 정보',
                desc: '당뇨·혈압·탈모·면역 등 12개 카테고리의 건강 Q&A를 과학적 근거와 함께 제공합니다. 잘못된 상식을 바로잡고 올바른 방향을 안내합니다.',
              },
              {
                icon: Waves,
                color: 'text-blue-500',
                bg: 'bg-blue-500/10',
                title: '플로로탄닌 & 자연 소재',
                desc: '미역·다시마·감태 등 갈조류에서 발견된 플로로탄닌을 비롯해 다양한 자연 소재의 작용 원리와 활용법을 자연스럽게 소개합니다.',
              },
              {
                icon: Users,
                color: 'text-gold-hana',
                bg: 'bg-gold-hana/10',
                title: '파트너 연결',
                desc: '정보를 공부하다 보면 자연스럽게 파트너들을 만나게 됩니다. 네트워크 판매에 관심 있는 분들과 건강 정보를 찾는 분들의 중간 다리 역할을 합니다.',
              },
            ].map((item, i) => (
              <div key={i} className="card flex flex-col items-start gap-4">
                <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-ocean-deep mb-2 text-lg">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 쉬운 건강 설명 배너 ─── */}
      <section className="py-10 bg-gradient-to-r from-cyan-500 to-blue-600">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                🆕 새 페이지 오픈!
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                🩺 중학생도 이해하는 건강 설명
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                당뇨·고혈압·탈모·치매… 왜 생기는지,<br />
                플로로탄닌이 어떻게 도움이 되는지 그림처럼 쉽게!
              </p>
            </div>
            <Link
              to="/easy"
              className="flex-shrink-0 flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-black text-base hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 whitespace-nowrap"
            >
              쉬운 설명 보러가기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 오늘의 추천 Q&A ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-cyan-hana text-sm font-medium mb-3">
              <Star className="w-4 h-4" />
              오늘의 추천
            </div>
            <h2 className="section-title">많이 찾는 건강 Q&A</h2>
            <p className="section-subtitle">과학적 근거 기반의 건강 정보를 확인해보세요</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredQAs.map(qa => {
              const meta = getCategoryMeta(qa.category)
              return (
                <button
                  key={qa.id}
                  onClick={() => navigate(`/qa?openId=${qa.id}&category=${qa.category}`)}
                  className="text-left bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 hover:border-cyan-hana transition-all group"
                >
                  <div
                    className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 text-white"
                    style={{ backgroundColor: meta.color }}
                  >
                    {meta.name}
                  </div>
                  <h3 className="font-semibold text-ocean-deep mb-3 leading-snug group-hover:text-cyan-hana transition-colors line-clamp-2 text-base">
                    {qa.question}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                    {typeof qa.answer === 'string' ? qa.answer : qa.answer?.step1_empathy || ''}
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                    <span>👁 {(qa.views || 0).toLocaleString()}</span>
                    <span>👍 {qa.likes || 0}</span>
                    <span className="ml-auto text-cyan-hana flex items-center gap-1 font-medium">
                      자세히 <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/qa" className="btn-primary inline-flex items-center gap-2 px-10 py-4">
              전체 Q&A 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 12 Categories ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">12개 건강 정보 카테고리</h2>
            <p className="section-subtitle">관심 있는 분야를 선택해 정보를 탐색하세요</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryMeta.map(cat => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => navigate(`/qa?category=${cat.id}`)}
                  className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:shadow-md hover:border-cyan-hana transition-all group"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: cat.color + '18' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: cat.color }} />
                  </div>
                  <div className="font-semibold text-ocean-deep mb-1 group-hover:text-cyan-hana transition-colors text-sm">
                    {cat.name}
                  </div>
                  <div className="text-xs text-gray-400">Q&A 보기 →</div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── 플로로탄닌이란? 교육 섹션 ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-hana text-sm font-medium mb-4">
                <Waves className="w-4 h-4" />
                건강 소재 가이드
              </div>
              <h2 className="section-title">플로로탄닌이란 무엇인가요?</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                플로로탄닌(Phlorotannin)은 미역·다시마·감태 같은 갈조류에서만 발견되는
                해양 폴리페놀 성분입니다. 육상 식물의 폴리페놀과 달리 독특한 구조를 가지며,
                다양한 생리 활성이 연구되고 있습니다.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { title: '항산화 효과', desc: '활성산소를 중화하여 세포 손상을 줄이고 노화를 늦추는 데 도움을 줍니다.' },
                  { title: '혈당·혈압 조절 연구', desc: 'α-글루코시다제·ACE 억제 효소 경로를 통한 혈당·혈압 관리 가능성이 연구되고 있습니다.' },
                  { title: '항염증 & 면역 조절', desc: 'NF-κB 경로 억제를 통해 만성 염증을 줄이는 기전이 다수 논문으로 보고됩니다.' },
                  { title: '다양한 제조 공정', desc: 'MOP(다중산화공정), 저온 추출, 발효 추출 등 다양한 방식으로 생체이용률을 높이는 기술이 연구 중입니다.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 bg-cyan-hana/10 text-cyan-hana rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-ocean-deep text-sm">{item.title}</div>
                      <div className="text-gray-500 text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/phlorotannin" className="btn-primary inline-flex items-center gap-2">
                  플로로탄닌 상세 소개 <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/qa?q=플로로탄닌" className="btn-secondary inline-flex items-center gap-2">
                  관련 Q&A 보기
                </Link>
              </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '주요 함유 해조류', value: '감태·미역·다시마', color: 'bg-cyan-hana/10 text-cyan-hana' },
                { label: '핵심 구조', value: '플로로글루시놀 중합체', color: 'bg-blue-500/10 text-blue-600' },
                { label: '연구 분야', value: '혈당·혈압·항암·항염', color: 'bg-green-500/10 text-green-600' },
                { label: '활용 형태', value: '추출물·캡슐·분말', color: 'bg-purple-500/10 text-purple-600' },
              ].map((item, i) => (
                <div key={i} className={`${item.color} rounded-2xl p-6`}>
                  <div className="text-xs font-medium mb-2 opacity-70">{item.label}</div>
                  <div className="font-bold text-sm leading-snug">{item.value}</div>
                </div>
              ))}
              <div className="col-span-2 bg-ocean-deep rounded-2xl p-6 text-white">
                <div className="text-xs text-cyan-hana font-medium mb-2">이런 분들께 도움이 됩니다</div>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>• 자연 소재에 관심 있는 건강 관리자</li>
                  <li>• 네트워크 판매를 공부하는 파트너</li>
                  <li>• 올바른 소재 정보를 찾는 소비자</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 파트너 안내 ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-cyan-hana text-sm font-medium mb-3">
              <Users className="w-4 h-4" />
              파트너 참여 안내
            </div>
            <h2 className="section-title">함께 공부하고, 함께 성장합니다</h2>
            <p className="section-subtitle">
              정보를 충분히 이해한 후 자연스럽게 파트너로 이어집니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: '정보 탐색',
                desc: 'Q&A를 통해 건강 소재에 대한 지식을 쌓고, 잘못된 정보와 올바른 정보를 구분하는 안목을 키웁니다.',
                color: 'bg-cyan-hana/10 text-cyan-hana',
              },
              {
                step: '02',
                title: '파트너 연결',
                desc: '플로로탄닌 관련 제품과 파트너를 자연스럽게 만납니다. 문의 메일 또는 전화로 연결됩니다.',
                color: 'bg-gold-hana/10 text-gold-hana',
              },
              {
                step: '03',
                title: '함께 활동',
                desc: '네트워크 파트너로서 올바른 건강 정보를 전달하며 사람들과 연결하는 의미 있는 활동을 합니다.',
                color: 'bg-green-500/10 text-green-600',
              },
            ].map(item => (
              <div key={item.step} className="card text-center">
                <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center font-bold text-lg mx-auto mb-4`}>
                  {item.step}
                </div>
                <h3 className="font-bold text-ocean-deep mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/partner" className="btn-primary inline-flex items-center gap-2 px-10 py-4">
              파트너 참여 알아보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA / Contact ─── */}
      <section className="py-20 bg-ocean-gradient text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            궁금한 점이 있으신가요?
          </h2>
          <p className="text-gray-300 mb-10 text-lg leading-relaxed">
            건강 정보, 자연 소재, 파트너 활동 등 어떤 내용이든 편하게 문의해 주세요.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <RevealContact
              type="tel"
              label="전화 상담 신청"
              revealLabel="010-5652-8206 전화하기"
              phone="01056528206"
              displayPhone="010-5652-8206"
              className="flex items-center gap-2 bg-white text-ocean-deep px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all"
            />
            <RevealContact
              type="sms"
              label="문자 상담 신청"
              revealLabel="010-5652-8206 문자하기"
              phone="01056528206"
              displayPhone="010-5652-8206"
              smsBody="[플로로탄닌 파트너스] 상담 문의드립니다."
              className="flex items-center gap-2 btn-secondary px-8 py-4"
            />
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/qa" className="text-sm text-cyan-hana hover:underline flex items-center gap-1">
              건강 Q&A 탐색 <ChevronRight className="w-3 h-3" />
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/partner" className="text-sm text-cyan-hana hover:underline flex items-center gap-1">
              파트너 참여 <ChevronRight className="w-3 h-3" />
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/consult" className="text-sm text-cyan-hana hover:underline flex items-center gap-1">
              상담 신청 <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 저작권 안내 ── */}
      <section className="py-6 bg-gray-100 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500 text-center md:text-left">
              © 2025 <span className="font-semibold text-gray-600">플로로탄닌 파트너스</span> — All rights reserved. |
              본 사이트의 모든 콘텐츠는 저작권법에 의해 보호받습니다. 무단 복제·배포를 금합니다.
            </p>
            <a
              href="sms:01056528206?body=%5B%EC%BD%98%ED%85%90%EC%B8%A0%20%EC%82%AC%EC%9A%A9%20%EB%AC%B8%EC%9D%98%5D%20"
              className="flex-shrink-0 text-xs text-cyan-600 hover:underline font-medium whitespace-nowrap"
            >
              콘텐츠 사용 문의 →
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
