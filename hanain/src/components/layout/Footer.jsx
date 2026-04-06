import { Link } from 'react-router-dom'
import { Leaf, Mail, Phone, MapPin, Camera, PlayCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ocean-deep text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-hana to-blue-500 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-bold">파트너스인 하나</div>
                <div className="text-cyan-hana text-xs">Partners in HANA</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              감태 플로로탄닌 기반 건강 솔루션.<br />
              MOP 공정 + 하이드로 네트워크 전달망 기술로<br />
              최고의 흡수율을 제공합니다.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-cyan-hana transition-colors">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-cyan-hana transition-colors">
                <PlayCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">빠른 메뉴</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: '홈' },
                { to: '/qa', label: 'Q&A 라이브러리' },
                { to: '/tech', label: '기술 소개' },
                { to: '/partner', label: '파트너 신청' },
                { to: '/consult', label: '상담 신청' },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-cyan-hana transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Q&A 카테고리</h3>
            <ul className="space-y-2 text-sm">
              {['대사질환', '항암/면역', '소화/간', '신경/인지', '피부/모발', '근골격계'].map(cat => (
                <li key={cat}>
                  <Link to={`/qa?category=${cat}`} className="hover:text-cyan-hana transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">연락처</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-cyan-hana mt-0.5 flex-shrink-0" />
                <span>1588-0000</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-cyan-hana mt-0.5 flex-shrink-0" />
                <span>info@hanain.co.kr</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-hana mt-0.5 flex-shrink-0" />
                <span>서울특별시 강남구<br />테헤란로 123</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2024 파트너스인 하나 (Partners in HANA). All rights reserved.
          </p>
          <p className="text-xs text-gray-600 text-center md:text-right max-w-md">
            본 사이트의 정보는 의료 조언을 대체하지 않습니다. 건강 문제는 반드시 전문 의료진과 상담하시기 바랍니다.
          </p>
        </div>
      </div>
    </footer>
  )
}
