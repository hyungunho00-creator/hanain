import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usePartner } from '../../context/PartnerContext'
import { withRef } from '../../lib/partnerRef'
import { Waves, Phone, MessageCircle } from 'lucide-react'
import RevealContact from '../common/RevealContact'
import { getQaCategories } from '../../lib/supabase'

// Phase 3: Supabase categories(type='qa') 테이블 1순위, 실패 시 아래 상수 fallback
const FALLBACK_QA_CATS = [
  { id: 'metabolism', name: '대사질환' },
  { id: 'cancer_immune', name: '항암/면역' },
  { id: 'digestive', name: '소화/간' },
  { id: 'cardiovascular', name: '심혈관' },
  { id: 'neuro_cognitive', name: '신경/인지' },
  { id: 'mental_health', name: '정신건강' },
  { id: 'respiratory', name: '호흡기' },
  { id: 'musculoskeletal', name: '근골격' },
  { id: 'skin', name: '피부' },
  { id: 'hair', name: '모발/두피' },
  { id: 'infection_inflammation', name: '감염/염증' },
  { id: 'mens_health', name: '남성건강' },
  { id: 'womens_health', name: '여성건강' },
]

export default function Footer() {
  const partner = usePartner()
  const [qaCats, setQaCats] = useState(FALLBACK_QA_CATS)

  useEffect(() => {
    let cancelled = false
    getQaCategories()
      .then(list => {
        if (cancelled || !list || !list.length) return
        setQaCats(list.map(c => ({ id: c.id, name: c.name })))
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

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
                <div className="text-cyan-hana text-sm">Phlorotannin Partners</div>
              </div>
            </div>
            <p className="text-base text-gray-400 leading-relaxed">
              해조류 유래 플로로탄닌에 관한<br />
              건강 정보를 나누고, 올바른 지식으로<br />
              파트너를 연결하는 정보 커뮤니티입니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">메뉴</h3>
            <ul className="space-y-2 text-base">
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
            <ul className="space-y-2 text-base">
              {qaCats.map(cat => (
                <li key={cat.id}>
                  <Link to={withRef(`/qa?category=${cat.id}`, partner)} className="hover:text-cyan-hana transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">문의</h3>
            <div className="space-y-3 text-base">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-cyan-hana mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-400 text-sm mb-1">전화 문의</div>
                  <RevealContact
                    type="tel"
                    label="클릭하여 연결"
                    revealLabel={partner.phoneDisplay}
                    phone={partner.phone}
                    displayPhone={partner.phoneDisplay}
                    className="text-white font-medium hover:text-cyan-hana transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-cyan-hana mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-400 text-sm mb-1">문자 문의</div>
                  <RevealContact
                    type="sms"
                    label="클릭하여 연결"
                    revealLabel={partner.phoneDisplay}
                    phone={partner.phone}
                    displayPhone={partner.phoneDisplay}
                    className="text-white font-medium hover:text-cyan-hana transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-cyan-hana mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-400 text-sm mb-1">운영 시간</div>
                  <div className="text-white">평일 09:00 – 18:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 저작권 안내 박스 (강화) */}
        <div className="border border-white/10 rounded-2xl bg-white/5 px-5 md:px-6 py-5 mt-12 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-white text-sm md:text-base font-semibold mb-1.5">
                © 2026 phlorotannin.com. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                본 사이트의 콘텐츠, 페이지 구성, 카테고리 구조, 파트너 정보페이지 시스템, 자료실,
                데이터베이스 구조 및 SEO 설계는
                <span className="text-gray-200 font-semibold"> 무단 복제·재가공·상업적 이용을 금지</span>합니다.
              </p>
              <Link
                to="/copyright"
                className="inline-flex items-center gap-1 mt-2 text-xs md:text-sm text-cyan-hana hover:underline"
              >
                저작권 및 무단복제 금지 안내 →
              </Link>
            </div>
            <RevealContact
              type="sms"
              label="콘텐츠 사용·제휴 문의"
              revealLabel={`${partner.phoneDisplay} 문자하기`}
              phone={partner.phone}
              displayPhone={partner.phoneDisplay}
              icon={MessageCircle}
              className="flex-shrink-0 inline-flex items-center gap-2 bg-cyan-hana text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-opacity-90 transition-all whitespace-nowrap"
            />
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs md:text-sm text-gray-400">
            © 2026 phlorotannin.com · 플로로탄닌 파트너스
          </p>
          <p className="text-xs md:text-sm text-gray-400 text-center md:text-right max-w-md">
            본 사이트의 정보는 건강 교육 목적이며 의료 처방·진단을 대체하지 않습니다.
          </p>
        </div>
      </div>
    </footer>
  )
}
