import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  CheckCircle2,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react'
import SEOHead from '../components/common/SEOHead'
import { usePartner } from '../context/PartnerContext'

const SITE = 'https://phlorotannin.com'
const SHARE_TOKEN = 'salon-growth-660'
const SALON_IMAGE = '/partner/shop-package/salon-consult-hero.jpg'
const DEFAULT_PHONE = '01056528206'

const problemCards = [
  {
    title: '시술 매출만 있음',
    body: ['고객은 만족하지만 결제는 1회로 끝남', '집에서 어떤 제품을 써야 할지 모름', '다음 방문 이유가 약함'],
    image: 'object-[30%_45%]',
  },
  {
    title: '제품은 있는데 안 팔림',
    body: ['진열만 되어 있음', '직원이 설명하기 어려움', '고객에게 필요한 이유가 전달되지 않음'],
    image: 'object-[60%_50%]',
  },
  {
    title: '필요한 건 판매 동선',
    body: ['시술 후 추천 멘트', '고객 상태별 제품 제안', '문자 안내와 재방문 연결'],
    image: 'object-[75%_48%]',
  },
]

const systemItems = [
  ['홈케어 상품 구성', '시술 후 고객에게 권하기 쉬운 상품 구성'],
  ['매장 진열 방식', '계산대, 상담 테이블, 대기 공간에 놓기 좋은 진열 흐름'],
  ['상담 멘트', '고객 상태별로 직원이 말하기 쉬운 설명 문구'],
  ['문자 안내', '시술 후 고객에게 보내는 홈케어 안내 문구'],
  ['재방문 동선', '제품 사용 후 다시 방문할 이유를 만드는 안내'],
  ['대표용 운영 가이드', '복잡한 교육 없이 바로 적용 가능한 운영 흐름'],
]

const sceneCards = [
  ['상담할 때', '고객 상태를 설명하며 홈케어 필요성을 자연스럽게 연결합니다.', 'object-[34%_46%]'],
  ['시술이 끝난 뒤', '관리 효과를 유지하기 위한 제품을 부담 없이 제안합니다.', 'object-[50%_52%]'],
  ['결제 직전', '계산대 옆 진열은 고객의 마지막 선택을 만듭니다.', 'object-[72%_45%]'],
  ['방문 후', '집에서 어떻게 써야 하는지 문자로 다시 안내합니다.', 'object-[44%_42%]'],
]

const journey = [
  ['방문', '고객이 관리받으러 옵니다.'],
  ['상담', '현재 상태와 고민을 듣습니다.'],
  ['시술', '샵의 전문 관리가 진행됩니다.'],
  ['홈케어 추천', '관리 후 집에서 이어 쓸 상품을 제안합니다.'],
  ['제품 구매', '시술 만족이 상품 구매로 이어집니다.'],
  ['문자 안내', '사용법과 다음 방문 이유를 안내합니다.'],
  ['재방문', '고객은 다시 관리받을 이유를 갖게 됩니다.'],
]

const includedItems = [
  '홈케어 상품 패키지',
  '매장 진열 구성',
  '상담 멘트',
  '고객 안내 문구',
  '문자 안내 문구',
  '재방문 안내 흐름',
  '대표용 운영 가이드',
  '직원 설명 자료',
  '제품 이미지 자료',
  '매장 적용 상담',
]

const trustItems = [
  ['우리 샵 고객에게 맞을까요?', '샵 업종, 고객 연령대, 시술 메뉴, 현재 객단가를 보고 권장 흐름을 제안합니다.'],
  ['직원이 설명하기 어렵지 않을까요?', '전문 용어보다 고객이 이해하기 쉬운 상담 멘트를 제공합니다.'],
  ['제품만 놓으면 팔릴까요?', '진열만으로는 부족합니다. 추천 타이밍과 문자 안내까지 연결해야 합니다.'],
  ['1인샵도 가능한가요?', '가능합니다. 대표가 직접 상담하는 1인샵은 설명 흐름만 잡히면 적용이 빠릅니다.'],
  ['기존 제품과 충돌하지 않나요?', '현재 메뉴 구성을 확인한 뒤 무리하게 겹치지 않는 방향으로 안내합니다.'],
  ['도입 후 무엇을 해야 하나요?', '설명하고, 진열하고, 안내 문자를 보내고, 재방문 때 다시 연결하면 됩니다.'],
]

const beforeItems = ['시술 매출 중심', '홈케어 판매 약함', '제품 설명이 직원마다 다름', '진열 주목도가 낮음', '방문 후 고객 안내 없음', '재방문 이유가 약함']
const afterItems = ['시술 후 홈케어 추천', '고객 상태별 상담 멘트', '계산대와 상담 테이블 진열', '문자 안내', '재방문 연결', '객단가 상승 기회']
const shopTypes = ['헤어샵', '두피샵', '피부관리샵', '에스테틱', '네일샵', '바디관리샵', '왁싱샵', '1인샵', '기타']
const customerCounts = ['50명 이하', '50~100명', '100~300명', '300명 이상', '잘 모름']
const salesLevels = ['거의 없음', '조금 있음', '어느 정도 있음', '적극적으로 하고 있음']
const questions = ['우리 샵에 맞는지', '가격과 구성', '제품 설명 방법', '진열 방법', '직원 교육', '고객 안내 문자', '재방문 연결']

function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '')
}

function formatPhone(value) {
  const digits = onlyDigits(value)
  if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  return '010-5652-8206'
}

function safePartnerSlug(partner, paramsSlug) {
  return paramsSlug || partner?.partnerSlug || partner?.slug || onlyDigits(partner?.phone) || DEFAULT_PHONE
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function SectionIntro({ title, body, align = 'center' }) {
  return (
    <div className={align === 'left' ? 'mx-0 max-w-3xl' : 'mx-auto max-w-3xl text-center'}>
      <h2 className="text-[26px] font-black leading-tight text-[#181512] sm:text-4xl lg:text-5xl">{title}</h2>
      {body ? <p className="mt-5 text-base leading-8 text-[#625950] sm:text-lg">{body}</p> : null}
    </div>
  )
}

function CheckList({ items, accent = false }) {
  return (
    <ul className="space-y-3">
      {items.map(item => (
        <li key={item} className="flex gap-3 text-base leading-7 text-[#4b433c]">
          <CheckCircle2 className={`mt-1 h-5 w-5 shrink-0 ${accent ? 'text-[#d8b25d]' : 'text-[#0f5a3b]'}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ProductVisual() {
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-[#d3b56a] bg-[#f7efe0] shadow-[0_24px_90px_rgba(30,22,15,0.16)]">
      <img src={SALON_IMAGE} alt="고급 샵 상담과 제품 진열 이미지" className="absolute inset-0 h-full w-full object-cover object-[55%_45%]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#12100e]/15 via-[#fff7e8]/40 to-[#0c382b]/80" />
      <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-white/40 bg-white/88 p-5 backdrop-blur">
        <div className="flex items-end gap-4">
          <div className="h-28 w-24 rounded-md border border-[#b58b3b] bg-gradient-to-b from-[#0b3d2d] to-[#02180f] shadow-2xl">
            <div className="mx-auto mt-5 h-10 w-10 rounded-full border border-[#dbbd69]" />
            <p className="mt-4 text-center text-sm font-black text-[#f0d889]">플로로탄닌</p>
          </div>
          <div className="h-36 w-28 rounded-md border border-[#b58b3b] bg-gradient-to-b from-[#173f33] to-[#06170f] shadow-2xl">
            <div className="mx-auto mt-6 h-12 w-12 rounded-full border border-[#e1c66d]" />
            <p className="mt-5 text-center text-base font-black text-[#f4db84]">홈케어</p>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-black text-[#a26f25]">계산대 옆 추천 진열</p>
            <p className="mt-2 text-xl font-black leading-tight text-[#181512]">고객이 마지막에 한 번 더 보는 상품 자리</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PhonePreview() {
  return (
    <div className="rounded-[2rem] border-[10px] border-[#171512] bg-[#171512] shadow-2xl">
      <div className="rounded-[1.35rem] bg-[#fffaf2] p-4">
        <div className="mb-4 flex items-center justify-between border-b border-[#eadfce] pb-3">
          <span className="text-sm font-black text-[#181512]">방문 후 안내</span>
          <span className="h-2 w-2 rounded-full bg-[#0f5a3b]" />
        </div>
        <div className="space-y-3 text-sm leading-6">
          <p className="rounded-lg bg-[#eee5d7] p-3 text-[#4b433c]">오늘 관리 후 집에서 이어 쓰는 순서만 지켜주세요.</p>
          <p className="rounded-lg bg-[#0f3f2e] p-3 text-white">사용법과 다음 방문 추천 시점을 함께 안내드립니다.</p>
        </div>
      </div>
    </div>
  )
}

function ImagePanel({ title, body, position, children }) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#e0d5c4] bg-white shadow-[0_24px_80px_rgba(30,22,15,0.08)]">
      <div className="relative h-56 overflow-hidden sm:h-64">
        <img src={SALON_IMAGE} alt={`${title} 장면`} className={`h-full w-full object-cover ${position}`} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        {children}
      </div>
      <div className="p-6">
        <h3 className="text-[19px] font-black text-[#181512] sm:text-2xl">{title}</h3>
        <p className="mt-3 text-base leading-7 text-[#625950]">{body}</p>
      </div>
    </article>
  )
}

function Field({ label, name, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <label className="block">
      <span className="text-sm font-black text-[#322a23]">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-lg border border-[#d8ccbb] bg-white px-4 text-base text-[#181512] outline-none transition focus:border-[#8d6328] focus:ring-4 focus:ring-[#d6b263]/20"
      />
    </label>
  )
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-sm font-black text-[#322a23]">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 h-12 w-full rounded-lg border border-[#d8ccbb] bg-white px-4 text-base text-[#181512] outline-none transition focus:border-[#8d6328] focus:ring-4 focus:ring-[#d6b263]/20"
      >
        <option value="">선택해 주세요</option>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  )
}

export default function PartnerShopGrowthLandingPage() {
  const partner = usePartner()
  const { partnerSlug } = useParams()
  const slug = safePartnerSlug(partner, partnerSlug)
  const rawPhone = onlyDigits(partner?.phone || partner?.sms || slug || DEFAULT_PHONE) || DEFAULT_PHONE
  const phone = rawPhone.length >= 10 ? rawPhone : DEFAULT_PHONE
  const phoneDisplay = formatPhone(phone)
  const pageUrl = `${SITE}/p/${slug}/shop-package/${SHARE_TOKEN}`
  const [form, setForm] = useState({
    shopName: '',
    ownerName: '',
    phone: '',
    region: '',
    shopType: '',
    mainMenu: '',
    customerCount: '',
    salesLevel: '',
    question: '',
    memo: '',
  })

  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '샵 매출 성장 패키지 | 플로로탄닌 파트너스',
    description: '시술 후 홈케어 판매, 객단가 상승, 재방문 관리, 매장 진열, 상담 멘트, 문자 안내까지 연결하는 샵 전용 매출 성장 패키지입니다.',
    url: pageUrl,
    inLanguage: 'ko-KR',
    isPartOf: {
      '@type': 'WebSite',
      name: '플로로탄닌 파트너스',
      url: SITE,
    },
  }), [pageUrl])

  const updateForm = event => {
    const { name, value } = event.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const submitInquiry = event => {
    event.preventDefault()
    const message = [
      '샵 매출 성장 패키지 도입 상담 요청',
      `샵명: ${form.shopName || '-'}`,
      `대표님: ${form.ownerName || '-'}`,
      `연락처: ${form.phone || '-'}`,
      `지역: ${form.region || '-'}`,
      `업종: ${form.shopType || '-'}`,
      `현재 주요 메뉴: ${form.mainMenu || '-'}`,
      `월 평균 고객 수: ${form.customerCount || '-'}`,
      `현재 제품 판매 여부: ${form.salesLevel || '-'}`,
      `가장 궁금한 점: ${form.question || '-'}`,
      `문의 내용: ${form.memo || '-'}`,
    ].join('\n')
    window.location.href = `sms:${phone}?body=${encodeURIComponent(message)}`
  }

  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#181512]">
      <SEOHead
        title="샵 매출 성장 패키지 | 플로로탄닌 파트너스"
        description="시술 후 홈케어 판매, 객단가 상승, 재방문 관리, 매장 진열, 상담 멘트, 문자 안내까지 연결하는 샵 전용 매출 성장 패키지입니다."
        canonical={pageUrl}
        ogUrl={pageUrl}
        ogImage={`${SITE}${SALON_IMAGE}`}
        ogImageAlt="고급 샵에서 홈케어 상품을 상담하는 장면"
        noindex
        jsonLd={jsonLd}
      />

      <section className="relative overflow-hidden bg-[#fffaf2]">
        <div className="absolute inset-0">
          <img src={SALON_IMAGE} alt="" className="h-full w-full object-cover object-[52%_45%] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fffaf2] via-[#fffaf2]/92 to-[#fffaf2]/60" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-24">
          <div>
            <p className="inline-flex rounded-full border border-[#c9a862] bg-white/85 px-4 py-2 text-sm font-black text-[#7d5420] shadow-sm">
              샵 전용 매출 성장 패키지
            </p>
            <h1 className="mt-6 max-w-4xl text-[32px] font-black leading-[1.08] text-[#181512] sm:text-5xl lg:text-6xl">
              시술은 한 번, 매출은 홈케어에서 다시 만들어집니다.
            </h1>
            <div className="mt-6 max-w-2xl space-y-5 text-base leading-8 text-[#4b433c] sm:text-lg">
              <p>
                고객은 샵에서 관리받고 끝나지 않습니다. 집에서 무엇을 쓰느냐에 따라 만족도,
                재방문, 추가 구매가 달라집니다.
              </p>
              <p>
                플로로탄닌 샵 패키지는 시술 후 고객에게 자연스럽게 권할 수 있는 홈케어 상품과
                상담 멘트, 진열 방식, 문자 안내, 재방문 동선을 함께 설계합니다.
              </p>
            </div>
            <div className="mt-7 rounded-lg border-l-4 border-[#b88a36] bg-white/88 p-5 shadow-sm">
              <p className="text-lg font-black leading-7 text-[#181512]">제품만 공급하는 것이 아니라, 샵에서 팔리는 흐름까지 만듭니다.</p>
              <p className="mt-2 text-base font-bold leading-7 text-[#7a241f]">지역에서 먼저 도입한 샵이 고객 홈케어 매출을 먼저 가져갑니다.</p>
            </div>
            <div className="mt-8 grid gap-3 sm:max-w-xl sm:grid-cols-2">
              <button
                type="button"
                onClick={() => scrollToId('inquiry')}
                className="inline-flex min-h-[54px] items-center justify-center rounded-lg bg-[#171512] px-6 text-base font-black text-white shadow-[0_16px_34px_rgba(23,21,18,0.22)] transition hover:bg-[#2a231d]"
              >
                우리 샵 도입 가능 여부 확인하기
              </button>
              <button
                type="button"
                onClick={() => scrollToId('value')}
                className="inline-flex min-h-[54px] items-center justify-center rounded-lg border border-[#a7803b] bg-white px-6 text-base font-black text-[#211a14] transition hover:bg-[#fff3d8]"
              >
                패키지 구성과 운영비 확인하기
              </button>
            </div>
            <a href={`tel:${phone}`} className="mt-5 inline-flex items-center gap-2 text-base font-black text-[#0f3f2e]">
              <Phone className="h-5 w-5" />
              바로 상담: {phoneDisplay}
            </a>
          </div>

          <div className="grid gap-4">
            <ProductVisual />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-[#e0d5c4] bg-white p-5 shadow-sm">
                <p className="text-sm font-black text-[#a26f25]">샵 대표가 보는 핵심</p>
                <p className="mt-2 text-2xl font-black leading-tight text-[#181512]">시술 후 한 번 더 팔 수 있는 이유</p>
              </div>
              <div className="rounded-lg border border-[#123e2f] bg-[#0e3a2c] p-5 text-white shadow-sm">
                <p className="text-sm font-black text-[#e8cc75]">도입 방향</p>
                <p className="mt-2 text-2xl font-black leading-tight">진열, 멘트, 문자까지 한 흐름</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionIntro
          title="시술만 잘해도 매출이 부족한 이유"
          body="고객은 관리받고 만족해도, 집에서 이어 쓸 상품이 없으면 매출은 시술비에서 끝납니다. 반대로 시술 후 홈케어 상품이 자연스럽게 연결되면 객단가와 재방문 이유가 함께 만들어집니다."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {problemCards.map(card => (
            <article key={card.title} className="overflow-hidden rounded-lg border border-[#e0d5c4] bg-white shadow-sm">
              <div className="h-40 overflow-hidden">
                <img src={SALON_IMAGE} alt={`${card.title}을 보여주는 샵 장면`} className={`h-full w-full object-cover ${card.image}`} loading="lazy" />
              </div>
              <div className="p-6">
                <h3 className="text-[19px] font-black text-[#181512] sm:text-2xl">{card.title}</h3>
                <div className="mt-5">
                  <CheckList items={card.body} />
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl rounded-lg border border-[#bfa15a] bg-[#fff8e8] p-5 text-center text-xl font-black leading-8 text-[#261c13]">
          문제는 제품이 없는 것이 아니라, 고객에게 팔리는 흐름이 없는 것입니다.
        </p>
      </section>

      <section className="bg-[#191512] px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[26px] font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              플로로탄닌 샵 패키지는 제품 공급이 아니라, 매장 판매 동선입니다.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#efe7dc] sm:text-lg">
              샵 대표가 직접 기획하지 않아도 됩니다. 고객에게 언제, 어떻게, 어떤 말로 추천해야 하는지까지 매장 운영 흐름에 맞춰 구성합니다.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {systemItems.map(([title, body], index) => (
              <article key={title} className="rounded-lg border border-white/12 bg-white/7 p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#d8b25d] text-base font-black text-[#191512]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 text-[19px] font-black sm:text-2xl">{title}</h3>
                <p className="mt-3 text-base leading-7 text-[#efe7dc]">{body}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 rounded-lg border border-[#d8b25d] bg-[#d8b25d]/12 p-6 text-center text-xl font-black leading-8 text-[#ffe4a0]">
            대표님은 제품을 외우는 게 아니라, 매장에 팔리는 구조를 놓으면 됩니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionIntro
          title="샵에서는 이렇게 보입니다."
          body="고객이 실제로 보는 지점은 상담 테이블, 시술 직후, 계산대, 방문 후 문자입니다. 이 네 장면이 이어져야 상품이 자연스럽게 팔립니다."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {sceneCards.map(([title, body, position], index) => (
            <ImagePanel key={title} title={title} body={body} position={position}>
              {index === 3 ? (
                <div className="absolute bottom-4 right-4 w-44">
                  <PhonePreview />
                </div>
              ) : null}
            </ImagePanel>
          ))}
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            title="고객 한 명의 흐름이 이렇게 바뀝니다."
            body="방문과 시술에서 끝나던 고객 여정이 홈케어 추천, 제품 구매, 문자 안내, 재방문까지 이어집니다."
          />
          <div className="mt-10 rounded-lg border border-[#e0d5c4] bg-white p-5 shadow-sm sm:p-8">
            <div className="grid gap-3 text-center md:grid-cols-4 lg:grid-cols-7">
              {journey.map(([title, body], index) => (
                <article key={title} className="rounded-lg border border-[#eadfce] bg-[#fbf7ef] p-4">
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#0f3f2e] text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-[19px] font-black text-[#181512]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#625950]">{body}</p>
                </article>
              ))}
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-4xl text-center text-2xl font-black leading-9 text-[#181512]">
            샵 매출은 시술 당일에 끝나는 것이 아니라, 고객이 집에서 이어 쓰는 순간 다시 시작됩니다.
          </p>
        </div>
      </section>

      <section id="value" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <SectionIntro
              align="left"
              title="비용이 아니라, 매장에 쌓이는 판매 구조입니다."
              body="이 패키지는 제품 몇 개를 납품하는 비용이 아닙니다. 샵에서 고객에게 설명하고, 진열하고, 판매하고, 다시 방문하게 만드는 운영 구조를 함께 세팅하는 비용입니다."
            />
            <button
              type="button"
              onClick={() => scrollToId('inquiry')}
              className="mt-7 inline-flex min-h-[54px] w-full items-center justify-center rounded-lg bg-[#7a241f] px-6 text-base font-black text-white shadow-[0_18px_36px_rgba(122,36,31,0.24)] sm:w-auto"
            >
              우리 샵 적용 가능 여부 확인하기
            </button>
          </div>
          <article className="rounded-lg border border-[#bfa15a] bg-[#fffaf2] p-6 shadow-[0_24px_80px_rgba(30,22,15,0.1)] sm:p-8">
            <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div className="rounded-lg bg-[#171512] p-6 text-white">
                <p className="text-base font-black text-[#e8cc75]">샵 성장 패키지</p>
                <p className="mt-3 text-5xl font-black leading-none">660만 원</p>
                <p className="mt-3 text-lg font-black text-[#f0dfb4]">VAT 별도</p>
                <p className="mt-5 text-base leading-7 text-[#efe7dc]">한 번 팔고 끝나는 제품비가 아니라, 고객 한 명당 객단가와 재방문 이유를 만드는 판매 구조입니다.</p>
              </div>
              <CheckList items={includedItems} accent />
            </div>
          </article>
        </div>
      </section>

      <section className="bg-[#191512] px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[26px] font-black leading-tight text-white sm:text-4xl lg:text-5xl">샵 대표가 도입 전에 가장 궁금해하는 것</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trustItems.map(([question, answer]) => (
              <article key={question} className="rounded-lg border border-white/12 bg-white/7 p-6">
                <h3 className="text-[19px] font-black sm:text-xl">{question}</h3>
                <p className="mt-3 text-base leading-7 text-[#efe7dc]">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionIntro title="도입 전과 도입 후, 대표가 보는 화면이 달라집니다." />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="overflow-hidden rounded-lg border border-[#e0d5c4] bg-white shadow-sm">
            <div className="h-56 overflow-hidden">
              <img src={SALON_IMAGE} alt="시술 중심으로 끝나는 매장 흐름" className="h-full w-full object-cover object-[38%_50%] opacity-80 grayscale" loading="lazy" />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-3xl font-black text-[#181512]">도입 전</h3>
              <div className="mt-6"><CheckList items={beforeItems} /></div>
            </div>
          </article>
          <article className="overflow-hidden rounded-lg border border-[#bfa15a] bg-[#fffaf2] shadow-[0_24px_80px_rgba(30,22,15,0.1)]">
            <div className="h-56 overflow-hidden">
              <img src={SALON_IMAGE} alt="홈케어 판매와 재방문으로 이어지는 매장 흐름" className="h-full w-full object-cover object-[68%_46%]" loading="lazy" />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-3xl font-black text-[#0f3f2e]">도입 후</h3>
              <div className="mt-6"><CheckList items={afterItems} accent /></div>
            </div>
          </article>
        </div>
      </section>

      <section id="inquiry" className="bg-[#fffaf2] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <SectionIntro
              align="left"
              title="우리 샵에 맞는 적용 가능 여부를 확인하세요."
              body="샵 업종, 현재 메뉴, 고객층, 제품 판매 경험을 남겨주시면 우리 매장에 맞는 도입 흐름을 안내드립니다."
            />
            <div className="mt-8 overflow-hidden rounded-lg border border-[#e0d5c4] bg-white shadow-sm">
              <img src={SALON_IMAGE} alt="샵 대표와 고객 상담 장면" className="h-72 w-full object-cover object-[50%_45%]" loading="lazy" />
              <div className="p-6">
                <p className="text-xl font-black leading-8 text-[#181512]">복잡한 준비보다 먼저 확인할 것은 한 가지입니다.</p>
                <p className="mt-3 text-base leading-7 text-[#625950]">우리 매장 고객에게 어떤 장면에서, 어떤 말로, 어디에 진열해야 자연스럽게 팔리는지입니다.</p>
              </div>
            </div>
          </div>

          <form onSubmit={submitInquiry} className="rounded-lg border border-[#d8ccbb] bg-white p-5 shadow-[0_24px_80px_rgba(30,22,15,0.08)] sm:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="샵명" name="shopName" value={form.shopName} onChange={updateForm} />
              <Field label="대표님 성함" name="ownerName" value={form.ownerName} onChange={updateForm} />
              <Field label="연락처" name="phone" value={form.phone} onChange={updateForm} type="tel" placeholder="010-0000-0000" />
              <Field label="지역" name="region" value={form.region} onChange={updateForm} placeholder="예: 서울 강남구" />
              <SelectField label="업종" name="shopType" value={form.shopType} onChange={updateForm} options={shopTypes} />
              <Field label="현재 주요 메뉴" name="mainMenu" value={form.mainMenu} onChange={updateForm} placeholder="예: 두피관리, 피부관리" />
              <SelectField label="월 평균 고객 수" name="customerCount" value={form.customerCount} onChange={updateForm} options={customerCounts} />
              <SelectField label="현재 제품 판매 여부" name="salesLevel" value={form.salesLevel} onChange={updateForm} options={salesLevels} />
              <SelectField label="가장 궁금한 점" name="question" value={form.question} onChange={updateForm} options={questions} />
              <label className="block md:col-span-2">
                <span className="text-sm font-black text-[#322a23]">문의 내용</span>
                <textarea
                  name="memo"
                  value={form.memo}
                  onChange={updateForm}
                  rows={5}
                  placeholder="현재 매장 상황이나 궁금한 점을 남겨주세요."
                  className="mt-2 w-full rounded-lg border border-[#d8ccbb] bg-white px-4 py-3 text-base text-[#181512] outline-none transition focus:border-[#8d6328] focus:ring-4 focus:ring-[#d6b263]/20"
                />
              </label>
            </div>
            <button type="submit" className="mt-6 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-lg bg-[#171512] px-6 text-base font-black text-white shadow-[0_16px_34px_rgba(23,21,18,0.22)]">
              <Send className="h-5 w-5" />
              우리 샵 적용 가능 여부 확인하기
            </button>
            <p className="mt-4 text-center text-sm leading-6 text-[#7a7066]">입력 내용은 도입 상담 안내 목적으로만 사용됩니다.</p>
          </form>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-20 text-white sm:px-8 sm:py-24">
        <img src={SALON_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover object-[58%_46%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171512]/95 via-[#171512]/82 to-[#0f3f2e]/70" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="mx-auto inline-flex rounded-full border border-[#e8cc75]/50 bg-white/10 px-4 py-2 text-sm font-black text-[#f2d985]">
            시술 후 홈케어 매출을 시작할 시간
          </p>
          <h2 className="mt-6 text-[30px] font-black leading-tight sm:text-5xl">
            고객은 이미 관리받고 있습니다. 이제 집에서 이어 쓰게 만들어야 합니다.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#f3eadc] sm:text-lg">
            시술 한 번으로 끝나는 매장이 있고, 시술 후 홈케어까지 이어지는 매장이 있습니다.
            플로로탄닌 샵 패키지는 고객 상담, 제품 추천, 매장 진열, 문자 안내, 재방문 흐름까지
            샵 대표가 바로 적용할 수 있게 구성합니다.
          </p>
          <div className="mt-8 grid gap-3 sm:mx-auto sm:max-w-xl sm:grid-cols-2">
            <a href={`tel:${phone}`} className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-lg bg-white px-6 text-base font-black text-[#171512]">
              <Phone className="h-5 w-5" />
              우리 샵 도입 상담하기
            </a>
            <a href={`sms:${phone}`} className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-lg border border-white/50 bg-white/10 px-6 text-base font-black text-white">
              <MessageCircle className="h-5 w-5" />
              문자로 문의하기
            </a>
          </div>
          <p className="mt-5 text-xl font-black text-[#f2d985]">{phoneDisplay}</p>
        </div>
      </section>
    </main>
  )
}
