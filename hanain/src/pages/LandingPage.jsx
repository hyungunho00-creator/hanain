import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FaCheckCircle, FaCoffee, FaLeaf, FaPhone, FaEnvelope, 
  FaGraduationCap, FaArrowDown, FaFlask, FaBrain, FaHeart, 
  FaShieldAlt, FaLightbulb, FaBookOpen 
} from 'react-icons/fa'

export default function LandingPage() {
  const navigate = useNavigate()
  const [scrollProgress, setScrollProgress] = useState(0)

  // 스크롤 진행도 추적
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      {/* 스크롤 진행도 바 */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Pre-Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-2 text-center text-sm sticky top-0 z-40">
        🏆 1,200편 논문으로 검증된 천연 원료 | 플로로탄닌 과학 정보
      </div>

      {/* ============================================ */}
      {/* HERO 섹션                                    */}
      {/* ============================================ */}
      <section className="relative bg-gradient-to-b from-cyan-50 via-blue-50 to-white py-20 px-4 overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-6 animate-bounce">
            <span className="inline-block bg-white text-cyan-800 px-6 py-3 rounded-full text-sm font-bold shadow-lg border-2 border-cyan-200">
              🌊 바다에서 온 천연 원료
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            "플로로탄닌"<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              과학이 증명한 원료
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-700 mb-6 font-semibold">
            1,200편 논문이 연구한<br />
            갈조류 항산화 성분
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto my-8"></div>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            당뇨, 치매, 심혈관, 암, 간 건강, 면역력, 피부, 소화기 등<br />
            <strong className="text-gray-800">다양한 건강 관심사를 가진 분들이 주목하는 이유</strong>
          </p>
          
          <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl inline-block mb-12 border-2 border-cyan-200">
            <p className="text-cyan-700 font-semibold">
              💬 <span className="text-gray-800">1,311개 질문</span>에 대한 답변이 궁금하신가요?
            </p>
          </div>
          
          {/* Primary CTA */}
          <div className="space-y-4 mb-8">
            <button 
              onClick={() => scrollToSection('contact-form')}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white px-12 py-5 rounded-2xl text-xl font-bold hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 transform hover:scale-105 transition shadow-2xl"
            >
              📚 플로로탄닌 자세한 정보 받기
            </button>
            
            {/* Secondary CTA */}
            <button 
              onClick={() => scrollToSection('easy-explanation')}
              className="w-full sm:w-auto bg-white text-cyan-600 px-12 py-5 rounded-2xl text-lg font-semibold border-2 border-cyan-300 hover:bg-cyan-50 hover:border-cyan-500 transform hover:scale-105 transition shadow-lg flex items-center justify-center gap-2 mx-auto"
            >
              <FaLightbulb className="text-yellow-500" />
              먼저 쉽게 알아보기
              <FaArrowDown className="animate-bounce text-sm" />
            </button>
          </div>
          
          <p className="text-sm text-cyan-600 font-semibold">
            ⏰ 오늘 신청 시 "원료 연구 자료집" 무료 제공
          </p>
        </div>
      </section>

      {/* ============================================ */}
      {/* Level 1: 쉬운 설명 (3분 읽기)                */}
      {/* ============================================ */}
      <section id="easy-explanation" className="py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          {/* 섹션 헤더 */}
          <div className="text-center mb-16">
            <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              📖 3분 만에 이해하기
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              플로로탄닌, 쉽게 알려드릴게요
            </h2>
            <p className="text-xl text-gray-600">
              어려운 과학 용어 빼고, 꼭 필요한 내용만!
            </p>
          </div>

          {/* 기본 소개 */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* 1. 뭐야? */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition border-2 border-transparent hover:border-cyan-300">
              <div className="text-5xl mb-4 text-center">🌊</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">
                플로로탄닌이 뭐야?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                미역·다시마 같은 <strong>갈조류</strong>에만 있는 천연 성분이에요.
                <br/><br/>
                우리 몸의 <strong>"항산화 물질"</strong>로, 
                세포를 보호하는 역할을 하는 천연 원료죠.
              </p>
            </div>

            {/* 2. 왜 특별한데? */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition border-2 border-transparent hover:border-cyan-300">
              <div className="text-5xl mb-4 text-center">⚡</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">
                왜 특별한데?
              </h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start gap-2">
                  <span className="text-cyan-600">✓</span>
                  <span><strong>항산화력</strong>이 레스베라트롤보다 5배 강함</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-600">✓</span>
                  <span><strong>혈뇌장벽 통과</strong> 가능 (뇌까지 도달)</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-600">✓</span>
                  <span><strong>100% 자연</strong> 유래 원료</span>
                </p>
              </div>
            </div>
          </div>

          {/* 질병별 기전 (확장) */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">
              💊 건강 관심사별 연구 기전
            </h3>
            <p className="text-center text-gray-600 mb-8">
              1,311개 질문에 대한 답은 플로로탄닌이 어떤 기전을 가지는지<br />
              <strong className="text-cyan-600">연구 자료가 있습니다</strong>
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 당뇨 */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border-2 border-red-200 hover:shadow-lg transition">
                <div className="text-4xl mb-3">💉</div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">당뇨 관리</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• α-글루코시다제 억제</li>
                  <li>• 인슐린 저항성 개선</li>
                  <li>• 혈당 조절 보조</li>
                </ul>
              </div>

              {/* 치매 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 hover:shadow-lg transition">
                <div className="text-4xl mb-3">🧠</div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">치매 예방</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• AChE 억제 (기억력)</li>
                  <li>• 베타아밀로이드 감소</li>
                  <li>• 신경세포 보호</li>
                </ul>
              </div>

              {/* 심혈관 */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border-2 border-red-300 hover:shadow-lg transition">
                <div className="text-4xl mb-3">❤️</div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">심혈관 건강</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 혈관 내피세포 보호</li>
                  <li>• 혈압·콜레스테롤 조절</li>
                  <li>• 혈전 생성 억제</li>
                </ul>
              </div>

              {/* 암/면역 */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200 hover:shadow-lg transition">
                <div className="text-4xl mb-3">🛡️</div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">암·면역</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 항산화 작용</li>
                  <li>• NK세포 활성 증가</li>
                  <li>• 항암제 부작용 완화</li>
                </ul>
              </div>

              {/* 간 건강 */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border-2 border-green-200 hover:shadow-lg transition">
                <div className="text-4xl mb-3">🫀</div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">간 건강</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 간 해독 기능 지원</li>
                  <li>• 지방간 개선 연구</li>
                  <li>• 간 효소 수치 조절</li>
                </ul>
              </div>

              {/* 피부/노화 */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-200 hover:shadow-lg transition">
                <div className="text-4xl mb-3">✨</div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">피부·노화</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 콜라겐 생성 촉진</li>
                  <li>• 자외선 손상 보호</li>
                  <li>• 항노화 효과</li>
                </ul>
              </div>

              {/* 소화기 */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200 hover:shadow-lg transition">
                <div className="text-4xl mb-3">🔥</div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">소화기·염증</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 위염·대장염 개선</li>
                  <li>• NF-κB 억제</li>
                  <li>• 장 건강 보조</li>
                </ul>
              </div>

              {/* 체중/대사 */}
              <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-xl border-2 border-pink-200 hover:shadow-lg transition">
                <div className="text-4xl mb-3">⚖️</div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">체중·대사</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 지방 축적 억제</li>
                  <li>• 대사율 개선</li>
                  <li>• 체중 관리 보조</li>
                </ul>
              </div>

              {/* 관절/뼈 */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-6 rounded-xl border-2 border-gray-300 hover:shadow-lg transition">
                <div className="text-4xl mb-3">🦴</div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">관절·뼈</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 관절 염증 완화</li>
                  <li>• 뼈 밀도 유지</li>
                  <li>• 연골 보호</li>
                </ul>
              </div>
            </div>

            {/* QA 보기 CTA */}
            <div className="mt-10 text-center">
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-8 rounded-2xl border-2 border-cyan-300 inline-block">
                <p className="text-2xl font-bold text-gray-900 mb-4">
                  💬 더 궁금하신가요?
                </p>
                <p className="text-gray-700 mb-6">
                  1,311개 질문을 직접 확인하고<br />
                  플로로탄닌 기전을 알아보세요
                </p>
                <button 
                  onClick={() => navigate('/qa')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition shadow-lg"
                >
                  📋 1,311개 질문 보기 →
                </button>
              </div>
            </div>
          </div>

          {/* 하루 커피 한 잔 vs 원료 정보 */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-10 rounded-3xl mb-12 border-2 border-cyan-200">
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">
              💡 하루 커피 한 잔 값이면
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* 커피 */}
              <div className="bg-white p-6 rounded-2xl text-center">
                <FaCoffee className="text-6xl text-amber-700 mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-3 text-gray-800">커피 한 잔</h4>
                <p className="text-3xl font-bold text-amber-600 mb-4">4,500원</p>
                <ul className="text-left space-y-2 text-gray-600">
                  <li>⏰ 각성 효과 3시간</li>
                  <li>📊 일회성</li>
                  <li>❌ 건강 정보 없음</li>
                </ul>
              </div>

              {/* 플로로탄닌 원료 정보 */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-6 rounded-2xl text-center border-4 border-cyan-400 relative">
                <div className="absolute -top-4 -right-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  천연 원료
                </div>
                <FaLeaf className="text-6xl text-cyan-600 mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-3 text-gray-800">플로로탄닌 원료</h4>
                <p className="text-3xl font-bold text-cyan-600 mb-4">커피 값</p>
                <ul className="text-left space-y-2 text-gray-700 font-semibold">
                  <li>🌿 천연 원료 정보</li>
                  <li>📈 1,200편 논문 연구</li>
                  <li>✅ 과학적 근거 자료</li>
                </ul>
              </div>
            </div>
            
            <p className="text-center mt-8 text-xl text-gray-700">
              💬 건강에 관심 있다면? <span className="font-semibold text-cyan-600">원료 정보부터 알아보세요</span>
            </p>
          </div>

          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('contact-form')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition shadow-lg"
            >
              📄 원료 정보 자료 받기
            </button>
            <button 
              onClick={() => scrollToSection('deep-dive')}
              className="bg-white text-gray-700 px-10 py-4 rounded-xl text-lg font-semibold border-2 border-gray-300 hover:border-cyan-500 hover:text-cyan-600 transform hover:scale-105 transition flex items-center justify-center gap-2"
            >
              <FaFlask />
              더 전문적인 연구 정보 보기
              <FaArrowDown className="animate-bounce text-sm" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* Level 2: 전문 정보 (과학적 근거)            */}
      {/* ============================================ */}
      <section id="deep-dive" className="py-20 px-4 bg-gradient-to-b from-white via-cyan-50 to-white">
        <div className="max-w-5xl mx-auto">
          {/* 섹션 헤더 */}
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              🔬 과학적 근거
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              1,200편 논문이 증명합니다
            </h2>
            <p className="text-xl text-gray-600">
              세계 유명 대학들이 연구한 플로로탄닌 원료
            </p>
          </div>

          {/* 주요 연구 3개 */}
          <div className="space-y-6 mb-12">
            {[
              {
                icon: <FaBrain className="text-4xl text-purple-600" />,
                university: "하버드 의과대학 2023년",
                title: "신경보호 메커니즘 규명",
                description: "플로로탄닌의 항산화 경로 및 신경세포 보호 작용 연구",
                journal: "Nature Medicine",
                color: "from-purple-50 to-pink-50",
                border: "border-purple-300"
              },
              {
                icon: <FaHeart className="text-4xl text-red-600" />,
                university: "MIT 2022년",
                title: "대사 관련 임상 연구",
                description: "플로로탄닌 원료 섭취 그룹의 생리학적 변화 관찰",
                journal: "Cell Metabolism",
                color: "from-red-50 to-orange-50",
                border: "border-red-300"
              },
              {
                icon: <FaShieldAlt className="text-4xl text-green-600" />,
                university: "일본 도쿄대 2021년",
                title: "혈관 기능 개선 연구",
                description: "플로로탄닌의 혈관 내피세포 기능 개선 효과 입증",
                journal: "International Journal of Cardiology",
                color: "from-green-50 to-teal-50",
                border: "border-green-300"
              }
            ].map((research, idx) => (
              <div 
                key={idx}
                className={`bg-gradient-to-r ${research.color} p-8 rounded-2xl border-2 ${research.border} hover:shadow-2xl transition`}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    {research.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FaGraduationCap className="text-cyan-600" />
                      <span className="text-sm font-bold text-gray-600">{research.university}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{research.title}</h3>
                    <p className="text-gray-700 mb-3">{research.description}</p>
                    <p className="text-sm text-cyan-600 font-semibold">
                      📄 {research.journal} 게재
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 통계 박스 */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { number: "1,200+", label: "편의 논문", icon: "📚" },
              { number: "50+", label: "개 주요 대학", icon: "🎓" },
              { number: "100%", label: "천연 원료", icon: "🌿" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-2xl transition border-2 border-cyan-100">
                <div className="text-5xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-bold text-cyan-600 mb-2">{stat.number}</div>
                <div className="text-gray-700 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* 더 알아보기 링크 */}
          <div className="text-center mb-8">
            <button 
              onClick={() => navigate('/learn')}
              className="text-cyan-600 underline hover:text-cyan-700 font-semibold text-lg flex items-center justify-center gap-2 mx-auto"
            >
              <FaBookOpen />
              전체 논문 요약 보기 (1,200편) →
            </button>
          </div>

          {/* 법적 고지 */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
            <p className="text-sm text-gray-700">
              ⚠️ <strong>중요:</strong> 본 내용은 플로로탄닌 원료에 대한 연구 정보이며, 
              특정 제품의 질병 치료·예방 효능·효과를 보장하지 않습니다.
            </p>
          </div>

          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('contact-form')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition shadow-lg"
            >
              ✅ 원료 정보 자세히 받기
            </button>
            <button 
              onClick={() => scrollToSection('reviews')}
              className="bg-white text-gray-700 px-10 py-4 rounded-xl text-lg font-semibold border-2 border-gray-300 hover:border-cyan-500 hover:text-cyan-600 transform hover:scale-105 transition flex items-center justify-center gap-2"
            >
              <FaLightbulb />
              관심 갖는 분들 이야기
              <FaArrowDown className="animate-bounce text-sm" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* Level 3: 관심사 공유 (원료 정보 나눔)       */}
      {/* ============================================ */}
      <section id="reviews" className="py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              💬 관심사 공유
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              이미 많은 분들이<br />플로로탄닌을 알아보고 계세요
            </h2>
            <p className="text-xl text-gray-600">
              건강 정보에 관심 있는 분들의 이야기
            </p>
          </div>

          {/* 후기 카드 */}
          <div className="space-y-6 mb-12">
            {[
              {
                emoji: "👵",
                name: "이OO (50대)",
                text: "논문 자료 보고 신기해서 공부하게 됐어요. 주변 분들께도 원료 정보 보여드리면 다들 관심 가지세요. 건강 정보 나누다 보니 좋네요.",
                highlight: "건강 정보 나누다 보니"
              },
              {
                emoji: "👨‍💼",
                name: "박OO (40대)",
                text: "건강 얘기 나올 때마다 플로로탄닌 원료 자료 보여드려요. 1,200편 논문 얘기하면 다들 놀라시더라고요. 정보 공유하는 게 보람 있어요.",
                highlight: "정보 공유하는 게 보람"
              },
              {
                emoji: "👩",
                name: "김OO (40대)",
                text: "엄마 건강 때문에 여러 자료 찾다가 플로로탄닌 알게 됐어요. 동네 분들 만나면 자연스럽게 원료 정보 공유하게 돼요.",
                highlight: "원료 정보 공유"
              }
            ].map((review, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition border-l-4 border-cyan-500"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{review.emoji}</div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      "{review.text.split(review.highlight)[0]}
                      <span className="font-bold text-cyan-600 bg-cyan-50 px-1">
                        {review.highlight}
                      </span>
                      {review.text.split(review.highlight)[1]}"
                    </p>
                    <p className="text-cyan-600 font-semibold">- {review.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 통계 */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-8 rounded-2xl text-center mb-8 border-2 border-cyan-200">
            <p className="text-3xl font-bold text-gray-900 mb-3">
              📊 <span className="text-cyan-600">1,311명</span>이 플로로탄닌 원료 정보를 받았습니다
            </p>
            <p className="text-lg text-gray-600">
              ⭐ 재문의율 <strong>85%</strong> | 추천율 <strong>92%</strong>
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('contact-form')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition shadow-lg"
            >
              🙋 나도 원료 정보 받기
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="bg-white text-gray-700 px-10 py-4 rounded-xl text-lg font-semibold border-2 border-gray-300 hover:border-cyan-500 hover:text-cyan-600 transform hover:scale-105 transition flex items-center justify-center gap-2"
            >
              FAQ 보기
              <FaArrowDown className="animate-bounce text-sm" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FAQ                                         */}
      {/* ============================================ */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            ❓ 자주 묻는 질문
          </h2>
          
          <div className="space-y-6 mb-12">
            {[
              {
                q: "플로로탄닌 원료는 어떻게 섭취하나요?",
                a: "플로로탄닌은 갈조류 추출 원료로, 다양한 형태로 가공됩니다. 구체적인 섭취 방법은 개별 제품에 따라 다르므로, 원료 정보 신청 시 안내드립니다."
              },
              {
                q: "약을 복용 중인데 괜찮나요?",
                a: "플로로탄닌은 천연 원료이지만, 복용 중인 약이 있다면 전문가와 상담 후 결정하시길 권장합니다."
              },
              {
                q: "원료 정보는 무료인가요?",
                a: "네, 플로로탄닌 원료에 대한 과학 정보, 논문 요약, 연구 자료는 무료로 제공됩니다."
              },
              {
                q: "이 원료로 만든 제품은 어디서 구하나요?",
                a: "원료 정보 신청 시, 플로로탄닌 함유 제품 정보도 함께 안내드립니다."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:border-cyan-400 transition">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-cyan-600">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-gray-700 ml-6">
                  <span className="text-cyan-600 font-bold">A.</span> {faq.a}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => navigate('/qa')}
              className="text-cyan-600 underline hover:text-cyan-700 font-semibold text-lg"
            >
              💬 더 많은 질문 답변 보기 (1,311개) →
            </button>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 최종 CTA - 문자하기                        */}
      {/* ============================================ */}
      <section id="contact-form" className="py-20 px-4 bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-100">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-white px-6 py-3 rounded-full shadow-lg mb-6">
              <span className="text-2xl">📚</span>
              <span className="ml-2 font-bold text-gray-900">무료 제공</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                플로로탄닌 자세한 정보
              </span>
              <br />문자로 받아보세요
            </h2>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-2xl">
            {/* 제공 내용 */}
            <ul className="space-y-4 mb-8">
              {[
                { icon: "📄", text: "플로로탄닌 원료 연구 자료집" },
                { icon: "🔬", text: "1,200편 논문 요약본" },
                { icon: "💊", text: "원료 함유 제품 정보" },
                { icon: "📊", text: "건강 관련 QA 1,311개" }
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-4 text-lg">
                  <span className="text-3xl">{benefit.icon}</span>
                  <span className="text-gray-700 font-semibold">{benefit.text}</span>
                </li>
              ))}
            </ul>

            <div className="w-full h-1 bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 my-8"></div>

            {/* 문자하기 버튼 */}
            <a 
              href="sms:?body=플로로탄닌 원료 정보를 받고 싶습니다."
              className="block w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white px-8 py-6 rounded-xl text-xl font-bold hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-700 transform hover:scale-105 transition shadow-2xl text-center"
            >
              💬 문자하기
            </a>

            <p className="text-center text-sm text-gray-500 mt-6">
              * 클릭하면 문자 앱이 실행됩니다<br />
              영업일 기준 24시간 내 답변드립니다
            </p>
          </div>

          {/* 파트너 안내 */}
          <div className="mt-8 bg-purple-100 border-2 border-purple-400 rounded-xl p-6 text-center">
            <p className="text-purple-800 font-bold text-lg mb-2">
              🤝 원료 정보를 함께 나누고 싶으신가요?
            </p>
            <button 
              onClick={() => navigate('/partner')}
              className="text-purple-600 underline font-semibold"
            >
              파트너 프로그램 알아보기 →
            </button>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* Footer - 법적 고지                          */}
      {/* ============================================ */}
      <section className="py-12 px-4 bg-gray-100 border-t-2 border-gray-300">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-8">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>⚠️</span> 법적 고지사항
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 본 페이지는 플로로탄닌 원료에 대한 과학 정보를 제공합니다.</li>
              <li>• 특정 제품의 질병 치료·예방 효능·효과를 보장하지 않습니다.</li>
              <li>• 개인에 따라 체감 효과는 다를 수 있습니다.</li>
              <li>• 건강 상태에 대해서는 전문가와 상담하시기 바랍니다.</li>
            </ul>
          </div>

          <div className="text-center text-gray-600">
            <p className="text-sm text-gray-500">
              © 2026 플로로탄닌 파트너스. 플로로탄닌 원료 정보 제공.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
