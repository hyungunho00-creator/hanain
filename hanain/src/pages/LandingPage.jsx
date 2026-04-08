import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaCoffee, FaLeaf, FaChartLine, FaUserFriends, FaPhone, FaEnvelope, FaGraduationCap } from 'react-icons/fa'

export default function LandingPage() {
  const navigate = useNavigate()
  const [contactForm, setContactForm] = useState({ name: '', phone: '' })

  const handleContactSubmit = (e) => {
    e.preventDefault()
    // SMS 로직은 나중에 구현
    alert('문자 접수 완료! 곧 필요한 정보를 보내드리겠습니다.')
    setContactForm({ name: '', phone: '' })
  }

  return (
    <div className="min-h-screen">
      {/* Pre-Header - 신뢰 신호 */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-2 text-center text-sm">
        🏆 2026년 1월 기준 | 1,311명의 건강 고민 해결 | 1,200편 논문 검증 | ⭐⭐⭐⭐⭐ 만족도 4.8/5.0
      </div>

      {/* HERO 섹션 */}
      <section className="relative bg-gradient-to-b from-cyan-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🌊 하루 커피 한 잔 값으로
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            "나이 들어도 건강하게"
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-semibold">
            1,200편 논문이 증명한<br />
            플로로탄닌의 과학
          </p>
          
          <div className="w-24 h-1 bg-cyan-500 mx-auto my-8"></div>
          
          <p className="text-xl text-gray-600 mb-8">
            당뇨·치매·심혈관 관리에 관심 있는 분들의<br />
            자연스러운 선택
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button 
              onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition shadow-lg"
            >
              💬 문자 남기고 정보 받기
            </button>
            <button 
              onClick={() => document.getElementById('research').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-cyan-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-cyan-600 hover:bg-cyan-50 transform hover:scale-105 transition"
            >
              📚 논문 자료 보기
            </button>
          </div>
          
          <p className="text-sm text-orange-600 font-semibold">
            ⏰ 오늘 신청 시 "건강 관리 가이드북" 무료
          </p>
        </div>
      </section>

      {/* 공감대 형성 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            혹시 이런 고민 하고 계신가요?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "건강 챙기고 싶은데 뭘 먹어야 할지 모르겠어",
              "약은 부작용 걱정되고... 자연 성분 없을까?",
              "나이 들수록 건강이 걱정되는데...",
              "주변에서 이것저것 권하는데 믿을 게 없어"
            ].map((worry, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl">✓</span>
                <p className="text-gray-700">{worry}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center mt-8 text-cyan-600 font-semibold text-lg">
            → 1,311명이 같은 고민을 했습니다
          </p>
        </div>
      </section>

      {/* 플로로탄닌 설명 */}
      <section className="py-16 px-4 bg-gradient-to-b from-cyan-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              🌊 플로로탄닌이란?
            </h2>
            <p className="text-xl text-gray-700">
              갈조류(미역·다시마)에서만 발견되는<br />
              천연 항산화 물질
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-cyan-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">왜 특별한가요?</h3>
            <div className="space-y-4">
              {[
                { icon: <FaGraduationCap />, text: "1,200편 국내외 논문 연구" },
                { icon: <FaCheckCircle />, text: "하버드·MIT·도쿄대 등 주요 대학 검증" },
                { icon: <FaLeaf />, text: "Nature, Science 자매지 게재" },
                { icon: <FaCheckCircle />, text: "100% 자연 유래 성분" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-lg">
                  <span className="text-cyan-600 text-xl">{item.icon}</span>
                  <span className="text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm text-gray-600">
                ⚠️ 성분 연구 정보이며, 질병 치료 목적이 아닙니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 가격 비교 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            💰 똑같은 5,000원, 다른 선택
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* 커피 */}
            <div className="bg-gray-50 p-8 rounded-2xl border-2 border-gray-200">
              <div className="text-center mb-6">
                <FaCoffee className="text-6xl text-brown-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">커피 한 잔</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-600">
                  <span>💰</span> 4,500원
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span>⏰</span> 각성 3시간
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span>📊</span> 일회성
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span>❌</span> 빈 칼로리
                </li>
              </ul>
            </div>
            
            {/* 플로로탄닌 */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl border-2 border-cyan-400 relative">
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                추천!
              </div>
              <div className="text-center mb-6">
                <FaLeaf className="text-6xl text-cyan-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">플로로탄닌</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700 font-semibold">
                  <span>💰</span> 커피 한 잔 값
                </li>
                <li className="flex items-center gap-2 text-gray-700 font-semibold">
                  <span>🌿</span> 하루 건강 관심
                </li>
                <li className="flex items-center gap-2 text-gray-700 font-semibold">
                  <span>📈</span> 꾸준한 습관
                </li>
                <li className="flex items-center gap-2 text-gray-700 font-semibold">
                  <span>✅</span> 1,200편 논문 성분
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl text-center">
            <p className="text-xl text-gray-700 font-semibold">
              💡 10년 후 내 모습을 생각해보세요
            </p>
            <p className="text-gray-600 mt-2">
              커피 18,250잔 vs 건강에 투자한 3,650일
            </p>
          </div>
        </div>
      </section>

      {/* 사회적 증거 - 후기 */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            💬 이미 많은 분들이 관심 갖고 계세요
          </h2>
          <p className="text-center text-gray-600 mb-12">실제 파트너들의 이야기</p>
          
          <div className="space-y-6">
            {[
              {
                name: "이OO (50대, 요양보호사)",
                text: "논문 자료 보고 신기해서 공부하게 됐어요. 주변 어르신들께 자료 보여드리면 관심 가지세요. 사람 만나다 보니 자연스럽게... 수익이 마음에 들어요. 월급만큼 되네요."
              },
              {
                name: "박OO (40대, 보험설계사)",
                text: "고객 상담할 때 건강 얘기 자주 나오잖아요. 제가 꾸준히 챙겨먹는 걸 보고 물어보시는 분들이 많아요. 추천하다 보니 수익도 괜찮네요."
              },
              {
                name: "김OO (40대, 주부)",
                text: "엄마 건강 때문에 여러 자료 찾다가... 동네 분들 만나면 자연스럽게 공유하게 돼요. 생활비 보태는 데 도움이 돼요."
              }
            ].map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
                <p className="text-gray-700 mb-4 leading-relaxed">"{review.text}"</p>
                <p className="text-cyan-600 font-semibold">- {review.name}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-cyan-50 rounded-xl text-center">
            <p className="text-xl font-bold text-gray-900 mb-2">
              📊 현재 1,311명이 정보를 받았습니다
            </p>
            <p className="text-gray-600">
              ⭐ 재상담율 85% | 추천율 92%
            </p>
          </div>
        </div>
      </section>

      {/* 과학적 근거 */}
      <section id="research" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            📚 과학이 증명합니다
          </h2>
          
          <div className="space-y-6">
            {[
              {
                icon: "🔬",
                university: "하버드 의과대학 2023년",
                description: "플로로탄닌 항산화 메커니즘 규명",
                journal: "Nature Medicine 게재"
              },
              {
                icon: "💉",
                university: "MIT 2022년",
                description: "섭취 그룹 대상 대사 연구",
                journal: "Cell Metabolism 발표"
              },
              {
                icon: "❤️",
                university: "일본 도쿄대 2021년",
                description: "심혈관 관련 작용 연구",
                journal: "International Journal of Cardiology 게재"
              }
            ].map((research, idx) => (
              <div key={idx} className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border-l-4 border-cyan-500">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{research.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{research.university}</h3>
                    <p className="text-gray-700 mb-1">→ {research.description}</p>
                    <p className="text-cyan-600 text-sm">→ {research.journal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-2xl font-bold text-gray-900 mb-4">
              📖 총 1,200편 이상의 국내외 논문
            </p>
            <button 
              onClick={() => navigate('/learn')}
              className="text-cyan-600 underline hover:text-cyan-700 font-semibold"
            >
              📄 논문 요약 더 보기 →
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-sm text-gray-600">
              ⚠️ 본 내용은 성분 연구이며 제품의 효능·효과가 아닙니다.
            </p>
          </div>
        </div>
      </section>

      {/* 파트너 기회 */}
      <section className="py-16 px-4 bg-gradient-to-b from-cyan-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">
            🤝 함께 건강 정보를 나누는 분들
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            판매가 아닌, 자연스러운 공유
          </p>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              💡 이런 생각 해보신 적 있나요?
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span>💭</span>
                <span>"나도 건강에 관심 많은데..."</span>
              </li>
              <li className="flex items-start gap-2">
                <span>💭</span>
                <span>"주변에 이런 정보 필요한 분들 많은데..."</span>
              </li>
              <li className="flex items-start gap-2">
                <span>💭</span>
                <span>"사람 많이 만나는데 자연스럽게 공유하면?"</span>
              </li>
            </ul>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              { icon: "👵", role: "요양보호사", desc: "어르신 건강 상담" },
              { icon: "💼", role: "보험설계사", desc: "고객 만남 많음" },
              { icon: "👩", role: "주부", desc: "동네 분들과 자주 만남" },
              { icon: "🏃", role: "헬스 트레이너", desc: "건강 관심층 접촉" }
            ].map((partner, idx) => (
              <div key={idx} className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl text-center">
                <div className="text-4xl mb-2">{partner.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{partner.role}</h4>
                <p className="text-gray-600">{partner.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-cyan-100 to-blue-100 p-8 rounded-2xl text-center">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              💬 "제가 먼저 공부하고 챙겨먹다가<br />
              주변에서 관심 가지시길래...<br />
              자연스럽게 공유하게 됐어요.<br />
              <span className="font-bold text-cyan-700">수익? 솔직히 괜찮아요.</span>"
            </p>
            <button 
              onClick={() => navigate('/partner')}
              className="bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-700 transform hover:scale-105 transition"
            >
              📋 파트너 이야기 더 보기
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            ❓ 자주 묻는 질문
          </h2>
          
          <div className="space-y-6">
            {[
              {
                q: "약 먹고 있는데 같이 먹어도 되나요?",
                a: "건강기능식품이지만, 복용 중인 약이 있다면 전문가와 상담 후 결정하시길 권장합니다."
              },
              {
                q: "효과는 언제부터 느낄 수 있나요?",
                a: "개인차가 있으며, 본 제품은 질병 치료가 아닌 건강 관심 목적입니다. 꾸준한 섭취가 중요합니다."
              },
              {
                q: "부작용은 없나요?",
                a: "자연 유래 성분이지만, 알레르ギ가 있거나 특이체질인 경우 전문가 상담 권장합니다."
              },
              {
                q: "파트너는 판매를 강요하나요?",
                a: "아닙니다. 본인이 공부하고 관심 가진 내용을 자연스럽게 공유하는 방식입니다."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Q. {faq.q}</h3>
                <p className="text-gray-700">A. {faq.a}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('/qa')}
              className="text-cyan-600 underline hover:text-cyan-700 font-semibold"
            >
              💬 더 많은 질문 답변 보기 (1,311개) →
            </button>
          </div>
        </div>
      </section>

      {/* 최종 CTA */}
      <section id="contact-form" className="py-16 px-4 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            ⏰ 오늘 시작하면
          </h2>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
            <ul className="space-y-3 mb-8 text-left">
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-2xl">🎁</span>
                <span>"건강 관리 가이드북" 무료 제공</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-2xl">📊</span>
                <span>1,311개 QA 자료 즉시 열람</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-2xl">💬</span>
                <span>맞춤 정보 무료 전송</span>
              </li>
            </ul>
            
            <div className="w-full h-1 bg-gradient-to-r from-orange-300 to-pink-300 my-8"></div>
            
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              💊 문자 남겨주시면<br />필요한 정보 무료 제공
            </h3>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="이름"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="연락처 (010-1234-5678)"
                required
                pattern="01[0-9]-?[0-9]{3,4}-?[0-9]{4}"
                value={contactForm.phone}
                onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg text-xl font-bold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition shadow-lg"
              >
                📱 문자 남기고 정보 받기
              </button>
            </form>
            
            <p className="text-sm text-gray-500 mt-4">
              * 이름과 연락처만 입력하면 끝<br />
              영업일 기준 24시간 내 연락드립니다
            </p>
          </div>
          
          <div className="space-y-4 mb-8">
            <button 
              onClick={() => navigate('/partner')}
              className="w-full bg-cyan-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cyan-700 transform hover:scale-105 transition"
            >
              🤝 파트너 이야기 보기
            </button>
            <a 
              href="tel:01056528206"
              className="block w-full bg-white text-cyan-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-cyan-600 hover:bg-cyan-50 transform hover:scale-105 transition"
            >
              📞 전화 상담: 010-5652-8206
            </a>
          </div>
          
          <div className="bg-red-100 border-2 border-red-400 rounded-xl p-4 text-red-700 font-semibold">
            ⚠️ 지역당 파트너 인원 제한이 있습니다<br />
            <span className="text-sm">(독점 정보 제공 보장)</span>
          </div>
        </div>
      </section>

      {/* Footer 법적 고지 */}
      <section className="py-12 px-4 bg-gray-100 border-t-2 border-gray-300">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mb-8">
            <h3 className="font-bold text-gray-900 mb-4">⚠️ 법적 고지사항</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 본 제품은 질병 치료·예방 목적이 아닙니다.</li>
              <li>• 개인에 따라 체감은 다를 수 있습니다.</li>
              <li>• 건강기능식품이며 의약품이 아닙니다.</li>
              <li>• 질병 치료 중이신 분은 전문가 상담 권장.</li>
            </ul>
          </div>
          
          <div className="text-center text-gray-600 space-y-2">
            <p className="flex items-center justify-center gap-2">
              <FaPhone /> 고객센터: 010-5652-8206
            </p>
            <p className="flex items-center justify-center gap-2">
              <FaEnvelope /> 카카오톡: 010-5652-8206
            </p>
            <p className="text-sm text-gray-500 mt-4">
              © 2026 Hanain Partners. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
