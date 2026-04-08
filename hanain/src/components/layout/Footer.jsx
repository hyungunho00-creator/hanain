import { Link } from 'react-router-dom'
import { Waves, Phone, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ocean-deep text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-hana to-blue-500 rounded-xl flex items-center justify-center">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-bold">플로로탄닌 파트너스</div>
                <div className="text-cyan-hana text-xs">Phlorotannin Partners</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              해조류 유래 플로로탄닌에 관한<br />
              건강 정보를 나누고, 올바른 지식으로<br />
              파트너를 연결하는 정보 커뮤니티입니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">메뉴</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: '홈' },
                { to: '/qa', label: '건강 Q&A' },
                { to: '/learn', label: '🌊 쉽게 배우기' },
                { to: '/phlorotannin', label: '플로로탄닌 소개' },
                { to: '/partner', label: '파트너 참여' },
                { to: '/consult', label: '문의하기' },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-cyan-hana transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Q&A Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">건강 정보 카테고리</h3>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'metabolism', name: '대사질환' },
                { id: 'cancer_immune', name: '항암/면역' },
                { id: 'digestive', name: '소화/간' },
                { id: 'cardiovascular', name: '심혈관' },
                { id: 'neuro_cognitive', name: '신경/인지' },
                { id: 'mental_health', name: '정신건강' },
                { id: 'respiratory', name: '호흡기' },
                { id: 'musculoskeletal', name: '근골격' },
                { id: 'skin_hair', name: '피부/모발' },
                { id: 'infection_inflammation', name: '감염/염증' },
                { id: 'mens_health', name: '남성건강' },
                { id: 'womens_health', name: '여성건강' },
              ].map(cat => (
                <li key={cat.id}>
                  <Link to={`/qa?category=${cat.id}`} className="hover:text-cyan-hana transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">문의</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-cyan-hana mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-400 text-xs mb-1">전화 문의</div>
                  <a href="tel:01056528206" className="text-white font-medium hover:text-cyan-hana transition-colors">
                    010-5652-8206
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-cyan-hana mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-400 text-xs mb-1">문자 문의</div>
                  <a href="sms:01056528206?body=%5B%ED%94%8C%EB%A1%9C%EB%A1%9C%ED%83%84%EB%8B%8C%20%ED%8C%8C%ED%8A%B8%EB%84%88%EC%8A%A4%5D%20%EB%AC%B8%EC%9D%98%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4." className="text-white font-medium hover:text-cyan-hana transition-colors">
                    010-5652-8206
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-cyan-hana mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-400 text-xs mb-1">운영 시간</div>
                  <div className="text-white">평일 09:00 – 18:00</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 안내 박스 */}
        <div className="border border-white/10 rounded-2xl bg-white/5 px-6 py-5 mt-12 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-white text-sm font-semibold mb-1">© 2025 플로로탄닌 파트너스. All rights reserved.</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                본 사이트의 모든 콘텐츠(Q&A, 건강 정보, 이미지, 텍스트 등)는 저작권법에 의해 보호받습니다.<br />
                무단 복제·배포·상업적 이용을 금합니다. 인용 시 반드시 출처를 명시하세요.
              </p>
            </div>
            <a
              href="sms:01056528206?body=%5B%EC%A0%80%EC%9E%91%EA%B6%8C%2F%EC%A0%9C%ED%9C%B4%20%EB%AC%B8%EC%9D%98%5D%20"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-cyan-hana text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-opacity-90 transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              콘텐츠 사용·제휴 문자 문의
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © 2025 플로로탄닌 파트너스 · 연락: 010-5652-8206
          </p>
          <p className="text-xs text-gray-400 text-center md:text-right max-w-md">
            본 사이트의 정보는 건강 교육 목적이며 의료 처방·진단을 대체하지 않습니다.
          </p>
        </div>
      </div>
    </footer>
  )
}
