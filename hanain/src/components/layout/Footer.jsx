import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usePartner } from '../../context/PartnerContext'
import { withRef } from '../../lib/partnerRef'
import { MessageSquare, Megaphone, PlayCircle, Film, BookOpen, ArrowUpRight, Utensils } from 'lucide-react'
import RevealContact from '../common/RevealContact'
import { getQaCategories } from '../../lib/supabase'

// 카테고리 ID → /category/:slug URL 슬러그 매핑
// (CategoryPage.jsx SLUG_TO_ID 의 역방향, 헌법 정합성)
const CAT_ID_TO_SLUG = {
  metabolism: 'metabolism',
  cancer_immune: 'cancer-immune',
  digestive: 'digestive',
  cardiovascular: 'cardiovascular',
  neuro_cognitive: 'neuro-cognitive',
  mental_health: 'mental-health',
  musculoskeletal: 'musculoskeletal',
  skin_hair: 'skin-hair',
  skin: 'skin-hair',
  hair: 'skin-hair',
  respiratory: 'respiratory',
  infection_inflammation: 'infection-inflammation',
  womens_health: 'womens-health',
  mens_health: 'mens-health',
}

// Phase 3: Supabase categories(type='qa') 테이블 1순위, 실패 시 아래 상수 fallback
const FALLBACK_QA_CATS = [
  { id: 'metabolism', name: '대사 건강' },
  { id: 'cancer_immune', name: '세포·면역' },
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
  const [topTags, setTopTags] = useState([])

  useEffect(() => {
    let cancelled = false
    getQaCategories()
      .then(list => {
        if (cancelled || !list || !list.length) return
        setQaCats(list.map(c => ({ id: c.id, name: c.name })))
      })
      .catch(() => {})

    // 인기 태그 상위 12개 로드 (정적 tagIndex.json, 헌법 제10조 — 신규 자산 활성화)
    fetch('/tagIndex.json')
      .then(r => r.json())
      .then(data => {
        if (cancelled || !data?.tags) return
        const top = Object.entries(data.tags)
          .sort((a, b) => b[1].count - a[1].count)
          .slice(0, 12)
          .map(([tag, info]) => ({ tag, count: info.count }))
        setTopTags(top)
      })
      .catch(() => {})

    return () => { cancelled = true }
  }, [])

  // SEO 핵심 자산 (절대 보존) — sameAs 5채널, topTags 122 nav, 카테고리 13건
  const SOCIAL_LINKS = [
    { href: 'https://naver.me/x4lFCvwV',          label: '네이버 카페',  Icon: MessageSquare, aria: '플로로탄닌 네이버 카페로 이동' },
    { href: 'https://band.us/n/a6aebc75vch6U',    label: '네이버 밴드',  Icon: Megaphone,     aria: '플로로탄닌 네이버 밴드로 이동' },
    { href: 'https://youtube.com/@phlorotannin',  label: '유튜브',       Icon: PlayCircle,    aria: '플로로탄닌 공식 유튜브 채널로 이동' },
    { href: 'https://naver.me/5sunayUx',          label: '네이버 클립',  Icon: Film,          aria: '플로로탄닌 네이버 클립으로 이동' },
    { href: 'https://m.blog.naver.com/phlorotannin', label: '네이버 블로그', Icon: BookOpen,   aria: '플로로탄닌랩 네이버 블로그로 이동' },
  ]

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-14 md:py-20">

        {/* ── 메인 그리드: 좌측 브랜드/스토리(넓게) + 우측 링크 3열 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">

          {/* Brand block — 좌측 5/12 */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-baseline gap-2 mb-5">
              <span className="text-lg font-semibold tracking-tight text-gray-900">
                Phlorotannin Partners
              </span>
              <span className="text-sm text-gray-500">플로로탄닌 파트너스</span>
            </Link>

            <p className="text-[15px] leading-7 text-gray-600 max-w-md mb-6">
              해조류 유래 폴리페놀 '플로로탄닌'의 과학적 근거를 정리하고,
              논문 기반 건강 정보를 일반인이 이해할 수 있는 언어로 전달하는
              정보형 아카이브입니다.
            </p>

            {/* 공식 채널 5종 — 단색 lucide 아이콘 only (SEO sameAs는 hidden link로 보존) */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-400 mb-3">
                Channels
              </p>
              <div className="flex items-center gap-1">
                {SOCIAL_LINKS.map((link) => {
                  const SocialIcon = link.Icon
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      aria-label={link.aria}
                      title={link.label}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                      <SocialIcon className="w-[18px] h-[18px]" strokeWidth={1.6} />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* SEO: Organization sameAs JSON-LD (보존) */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Organization',
                  name: '플로로탄닌 파트너스',
                  alternateName: 'Phlorotannin Partners',
                  url: 'https://phlorotannin.com',
                  sameAs: [
                    'https://naver.me/x4lFCvwV',
                    'https://band.us/n/a6aebc75vch6U',
                    'https://youtube.com/@phlorotannin',
                    'https://naver.me/5sunayUx',
                    'https://blog.naver.com/phlorotannin',
                  ],
                }),
              }}
            />
          </div>

          {/* Right 3-col link cluster — 우측 7/12 */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">

            {/* Menu */}
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-400 mb-4">
                Sitemap
              </h3>
              <ul className="space-y-2.5 text-[14px]">
                {[
                  { to: '/',             label: '홈' },
                  { to: '/qa',           label: '건강 Q&A' },
                  // [2026-05-21] 인사이트(60편 PMC 1차 자료) + 블로그 진입 보강
                  // 누락 시 사용자가 사이트맵에서 인사이트 페이지 발견 불가 → SEO equity 손실
                  { to: '/insights',     label: '인사이트' },
                  { to: '/blog',         label: '연구 블로그' },
                  { to: '/learn',        label: '쉽게 배우기' },
                  { to: '/phlorotannin', label: '플로로탄닌 소개' },
                  { to: '/partner',     label: '파트너 참여' },
                  { to: '/consult',     label: '문의하기' },
                ].map(item => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Q&A Categories — /category/:slug (canonical 정합성, 헌법 제10조 의무 7) */}
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-400 mb-4">
                Categories
              </h3>
              <ul className="space-y-2.5 text-[14px]">
                {qaCats.map(cat => {
                  const slug = CAT_ID_TO_SLUG[cat.id] || cat.id.replace(/_/g, '-')
                  return (
                    <li key={cat.id}>
                      <Link
                        to={withRef(`/category/${slug}`, partner)}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-400 mb-4">
                Contact
              </h3>
              <div className="space-y-4 text-[14px]">
                <div>
                  <div className="text-gray-400 text-xs mb-1.5">전화 문의</div>
                  <RevealContact
                    type="tel"
                    label="클릭하여 연결"
                    revealLabel={partner.phoneDisplay}
                    phone={partner.phone}
                    displayPhone={partner.phoneDisplay}
                    className="text-gray-800 font-medium hover:text-gray-900 transition-colors"
                  />
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1.5">문자 문의</div>
                  <RevealContact
                    type="sms"
                    label="클릭하여 연결"
                    revealLabel={partner.phoneDisplay}
                    phone={partner.phone}
                    displayPhone={partner.phoneDisplay}
                    className="text-gray-800 font-medium hover:text-gray-900 transition-colors"
                  />
                </div>
                <div className="pt-1 space-y-2.5">
                  <RevealContact
                    type="sms"
                    label="플로로탄닌 자료·상담 문의"
                    revealLabel={`${partner.phoneDisplay} 문자하기`}
                    phone={partner.phone}
                    displayPhone={partner.phoneDisplay}
                    smsBody="[플로로탄닌 자료/상담 문의] 플로로탄닌 정보와 상담 안내를 받고 싶습니다."
                    className="w-full border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-3.5 py-2.5 rounded-md text-[13px] font-medium transition-colors"
                  />
                  <Link
                    to="/blog/meulssori-patient-meal-delivery-service-introduction"
                    className="flex items-center justify-center gap-2 w-full border border-gray-200 bg-white text-gray-700 hover:border-gray-900 hover:text-gray-900 px-3.5 py-2.5 rounded-md text-[13px] font-medium transition-colors"
                  >
                    <Utensils className="w-4 h-4 flex-shrink-0" strokeWidth={1.8} aria-hidden="true" />
                    <span>건강한 반찬 정보 보기</span>
                    <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.8} aria-hidden="true" />
                  </Link>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1.5">운영 시간</div>
                  <div className="text-gray-800">평일 09:00 – 18:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 인기 태그 nav (SEO equity 122 진입점, 헌법 제10조 · DO_NOT_TOUCH §3-Q) ── */}
        {topTags.length > 0 && (
          <nav aria-label="인기 건강 태그" className="mt-14 pt-10 border-t border-gray-100">
            <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-400 mb-4">
              Popular Topics
            </h3>
            <div className="flex flex-wrap gap-x-1.5 gap-y-2">
              {topTags.map(({ tag, count }) => (
                <Link
                  key={tag}
                  to={withRef(`/qa/tag/${encodeURIComponent(tag)}`, partner)}
                  className="inline-flex items-baseline gap-1.5 px-2.5 py-1.5 rounded text-[13px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  aria-label={`#${tag} 관련 ${count}개 Q&A`}
                >
                  <span>{tag}</span>
                  <span className="text-[11px] text-gray-400 tabular-nums">{count}</span>
                </Link>
              ))}
              <Link
                to={withRef('/qa', partner)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[13px] text-gray-700 hover:text-gray-900"
              >
                전체 보기
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </nav>
        )}

        {/* ── 저작권 + 컨택 통합 ── */}
        <div className="mt-14 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-[13px] leading-6 text-gray-500">
                본 사이트의 콘텐츠·페이지 구성·카테고리 구조·파트너 정보페이지 시스템·자료실·
                데이터베이스 구조 및 SEO 설계는
                <span className="text-gray-700"> 무단 복제·재가공·상업적 이용을 금지</span>합니다.
                인용 시 출처(phlorotannin.com)를 반드시 명시하세요.
              </p>
              <Link
                to="/copyright"
                className="inline-flex items-center gap-1 mt-2 text-[13px] text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700"
              >
                저작권 및 무단복제 금지 안내
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Link>
            </div>
            <RevealContact
              type="sms"
              label="콘텐츠 사용·제휴 문의"
              revealLabel={`${partner.phoneDisplay} 문자하기`}
              phone={partner.phone}
              displayPhone={partner.phoneDisplay}
              className="flex-shrink-0 inline-flex items-center gap-2 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white text-sm font-medium px-4 py-2.5 rounded-md transition-colors whitespace-nowrap"
            />
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <p className="text-[12px] text-gray-400">
              © 2026 phlorotannin.com · Phlorotannin Partners
            </p>
            <p className="text-[12px] text-gray-400 text-center md:text-right">
              본 사이트의 정보는 건강 교육 목적이며 의료 처방·진단을 대체하지 않습니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
