import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search, Users, BookOpen, Award, ChevronRight, Star, Zap, Shield, Brain, Activity } from 'lucide-react'
import qaData from '../data/qa.json'

// Counter animation hook
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return [count, setStarted]
}

function StatCounter({ value, label, suffix = '' }) {
  const ref = useRef(null)
  const [count, setStarted] = useCountUp(parseInt(value.replace(/,/g, '')))
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true)
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [triggered, setStarted])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-cyan-hana text-sm font-medium">{label}</div>
    </div>
  )
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [randomQAs, setRandomQAs] = useState([])

  useEffect(() => {
    // Pick 3 random Q&As
    const shuffled = [...qaData.questions].sort(() => Math.random() - 0.5)
    setRandomQAs(shuffled.slice(0, 3))
  }, [])

  const handleSearch = (e) => {
    const val = e.target.value
    setSearchQuery(val)
    if (val.length > 1) {
      const matches = qaData.questions.filter(q =>
        q.question.includes(val) || q.tags.some(t => t.includes(val))
      ).slice(0, 5)
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }

  const getCategoryColor = (catId) => {
    const cat = qaData.categories.find(c => c.id === catId)
    return cat?.color || '#00B4D8'
  }

  const getCategoryName = (catId) => {
    const cat = qaData.categories.find(c => c.id === catId)
    return cat?.name || ''
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-ocean-gradient flex items-center overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-hana/10 rounded-full blur-3xl animate-wave" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-wave" style={{ animationDelay: '2s' }} />
          <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-gold-hana/5 rounded-full blur-3xl animate-wave" style={{ animationDelay: '4s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-cyan-hana/20 border border-cyan-hana/30 text-cyan-hana px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                MOP 공정 + 하이드로 네트워크 기술
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                파트너스인 하나<br />
                <span className="gradient-text">건강의 파트너</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
                감태(Ecklonia cava) 추출 플로로탄닌의 혁신.<br />
                1,200개의 과학적 Q&A와 함께 올바른 건강 정보를 만나세요.
              </p>

              {/* Search bar */}
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="증상이나 질환을 검색해보세요... (예: 당뇨, 탈모)"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-hana focus:border-transparent backdrop-blur-sm"
                />
                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
                    {suggestions.map(s => (
                      <Link
                        key={s.id}
                        to={`/qa?q=${s.question}`}
                        onClick={() => setSuggestions([])}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                      >
                        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{s.question}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/qa" className="btn-primary flex items-center gap-2">
                  Q&A 라이브러리 <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/consult" className="btn-secondary flex items-center gap-2">
                  무료 상담 신청 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {['당뇨', '탈모', '지방간', '고혈압', '아토피', '치매'].map(tag => (
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

            {/* Right - Feature cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { icon: BookOpen, title: '1,200+', desc: '과학적 Q&A', color: 'text-cyan-hana' },
                { icon: Shield, title: 'MOP 공정', desc: '최적화 추출 기술', color: 'text-green-400' },
                { icon: Brain, title: '12개 카테고리', desc: '전문 건강 정보', color: 'text-purple-400' },
                { icon: Activity, title: '하이드로 네트워크', desc: '최고의 흡수율', color: 'text-gold-hana' },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-colors">
                  <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
                  <div className="text-white font-bold text-xl mb-1">{item.title}</div>
                  <div className="text-gray-300 text-sm">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-ocean-mid py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter value="1200" label="Q&A 데이터베이스" suffix="+" />
            <StatCounter value="12" label="전문 카테고리" suffix="개" />
            <StatCounter value="50" label="파트너 누적" suffix="+" />
            <StatCounter value="98" label="고객 만족도" suffix="%" />
          </div>
        </div>
      </section>

      {/* Today's Featured Q&A */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-cyan-hana text-sm font-medium mb-3">
              <Star className="w-4 h-4" />
              오늘의 추천 Q&A
            </div>
            <h2 className="section-title">많이 찾는 건강 정보</h2>
            <p className="section-subtitle">과학적 근거 기반의 정확한 건강 정보를 제공합니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {randomQAs.map(qa => (
              <Link key={qa.id} to={`/qa?q=${qa.question}`} className="card group cursor-pointer hover:border-cyan-hana border border-transparent">
                <div
                  className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 text-white"
                  style={{ backgroundColor: getCategoryColor(qa.category) }}
                >
                  {getCategoryName(qa.category)}
                </div>
                <h3 className="font-semibold text-ocean-deep mb-3 leading-snug group-hover:text-cyan-hana transition-colors line-clamp-2">
                  {qa.question}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {qa.answer.step1_empathy}
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                  <span>👁 {qa.views.toLocaleString()}</span>
                  <span>👍 {qa.likes}</span>
                  <span className="ml-auto text-cyan-hana flex items-center gap-1 font-medium">
                    자세히 보기 <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/qa" className="btn-primary inline-flex items-center gap-2">
              전체 Q&A 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-hana text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                핵심 기술
              </div>
              <h2 className="section-title">MOP + 하이드로 네트워크 기술</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                파트너스인 하나의 혁신적인 MOP(Micro Optimal Processing) 공정과 하이드로 네트워크 전달망 기술이
                감태 플로로탄닌의 흡수율을 극대화합니다.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { step: '01', title: 'MOP 공정', desc: '분자 크기 최적화로 세포막 투과성 극대화' },
                  { step: '02', title: '하이드로 네트워크', desc: '수용성 나노 전달체로 흡수율 최대 300% 향상' },
                  { step: '03', title: '플로로탄닌 농축', desc: '활성 성분 보존율 극대화, 산화 방지 처리' },
                ].map(item => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 bg-cyan-hana/10 text-cyan-hana rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-semibold text-ocean-deep">{item.title}</div>
                      <div className="text-gray-500 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/tech" className="btn-primary inline-flex items-center gap-2">
                기술 자세히 보기 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Tech visualization */}
            <div className="relative">
              <div className="bg-ocean-gradient rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6 text-center">일반 추출물 vs 파트너스인 하나</h3>
                <div className="space-y-4">
                  {[
                    { label: '흡수율', normal: 30, hana: 90 },
                    { label: '활성 성분 보존율', normal: 45, hana: 95 },
                    { label: '세포 전달 효율', normal: 25, hana: 88 },
                    { label: '생체이용률', normal: 35, hana: 92 },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{item.label}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="flex-1">
                          <div className="text-xs text-gray-400 mb-1">일반</div>
                          <div className="h-2 bg-white/10 rounded-full">
                            <div className="h-2 bg-white/40 rounded-full" style={{ width: `${item.normal}%` }} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-cyan-hana mb-1">파트너스인 하나</div>
                          <div className="h-2 bg-white/10 rounded-full">
                            <div className="h-2 bg-cyan-hana rounded-full" style={{ width: `${item.hana}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">12개 전문 카테고리</h2>
            <p className="section-subtitle">당신의 건강 고민에 맞는 정보를 찾아보세요</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {qaData.categories.map(cat => (
              <Link
                key={cat.id}
                to={`/qa?category=${cat.id}`}
                className="card group text-center hover:scale-105 transition-transform"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg"
                  style={{ backgroundColor: cat.color + '20', color: cat.color }}
                >
                  {cat.name.charAt(0)}
                </div>
                <div className="font-semibold text-ocean-deep mb-1 group-hover:text-cyan-hana transition-colors">
                  {cat.name}
                </div>
                <div className="text-xs text-gray-400">{cat.count}개 Q&A</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ocean-gradient text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            파트너스인 하나와 함께<br />건강한 삶을 시작하세요
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            네트워크 파트너 참여 또는 개인 건강 상담, 지금 바로 시작하세요.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/partner" className="bg-gold-hana text-white px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all hover:shadow-lg">
              파트너 신청하기
            </Link>
            <Link to="/consult" className="btn-secondary px-8 py-4">
              개인 상담 신청
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
