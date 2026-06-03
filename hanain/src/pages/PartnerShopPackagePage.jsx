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

const lossCards = [
  {
    title: '시술만 팔면 매출은 1회로 끝납니다.',
    body: '고객은 만족했지만 집에서 무엇을 써야 할지 모른 채 돌아갑니다.',
    image: 'object-[30%_45%]',
  },
  {
    title: '제품만 놓으면 팔리지 않습니다.',
    body: '진열만 해두면 고객은 왜 필요한지 모릅니다.',
    image: 'object-[62%_50%]',
  },
  {
    title: '팔리는 건 제품이 아니라 상황입니다.',
    body: '시술 직후, 고객 고민이 가장 선명할 때 홈케어 제안이 들어가야 합니다.',
    image: 'object-[75%_48%]',
  },
]

const sellingScenes = [
  ['상담할 때', '고객 고민을 듣고, 관리 후 집에서 이어 쓸 상품을 자연스럽게 연결합니다.', 'object-[34%_46%]'],
  ['시술이 끝난 뒤', '방금 받은 관리의 만족감을 홈케어 구매로 이어줍니다.', 'object-[50%_52%]'],
  ['결제 직전', '계산대 옆 진열은 고객의 마지막 구매 결정을 만듭니다.', 'object-[72%_45%]'],
  ['집에 돌아간 뒤', '사용법과 다음 방문 이유를 문자로 다시 안내합니다.', 'object-[44%_42%]'],
]

const readySetItems = [
  ['매장 판매용 제품 패키지', '고객에게 바로 보여줄 수 있는 홈케어 상품 구성'],
  ['진열 이미지', '상담 테이블, 계산대, 대기 공간에 놓기 좋은 진열 흐름'],
  ['고객 상담 멘트', '직원이 외우기 쉬운 짧은 추천 문구'],
  ['시술 후 안내 문자', '고객이 집에서 어떻게 쓰면 되는지 보내는 안내 문구'],
  ['재방문 유도 문구', '사용 후 다시 관리받을 이유를 만드는 안내'],
  ['대표용 적용 체크리스트', '매장에 바로 적용할 수 있는 실행 체크리스트'],
]

const journey = [
  ['방문', '고객이 관리받으러 옵니다.'],
  ['상담', '현재 고민을 듣습니다.'],
  ['시술', '샵의 전문 관리가 진행됩니다.'],
  ['홈케어 제안', '집에서 이어 쓸 상품을 권합니다.'],
  ['제품 구매', '시술 만족이 추가 구매로 이어집니다.'],
  ['안내 문자', '사용법과 다음 방문 이유를 보냅니다.'],
  ['재방문', '고객이 다시 올 이유를 갖습니다.'],
]

const productStrengths = [
  ['길게 말하지 않아도 됩니다.', '오늘 받은 관리가 집에서도 이어지도록 도와주는 홈케어라고 말하면 됩니다.'],
  ['고객에게 권하기 쉽습니다.', '관리 후 고객에게 권하기 쉬운 프리미엄 홈케어 상품으로 보여줍니다.'],
  ['직원이 말하기 쉽습니다.', '어려운 성분 이야기보다 고객 상태에 맞는 짧은 멘트를 먼저 제공합니다.'],
]

const beforeItems = [
  '시술 매출 중심',
  '홈케어 판매 약함',
  '제품 멘트가 사람마다 다름',
  '진열은 있지만 주목도가 낮음',
  '방문 후 고객 안내 없음',
  '재방문 이유가 약함',
]

const afterItems = [
  '시술 후 홈케어 제안',
  '고객 상태별 짧은 멘트',
  '계산대와 상담 테이블 진열',
  '방문 후 문자 안내',
  '재방문 연결',
  '객단가 상승 기회',
]

const valueItems = [
  '홈케어 상품 패키지',
  '매장 진열 구성',
  '고객 상담 멘트',
  '시술 후 안내 문자',
  '재방문 안내 문구',
  '제품 이미지',
  '직원이 말하기 쉬운 설명 문구',
  '대표용 적용 체크리스트',
  '매장 적용 상담',
]

const faqs = [
  ['우리 샵 고객에게 맞을까요?', '업종, 주요 메뉴, 고객층을 보고 매장에서 권하기 쉬운 흐름을 맞춰드립니다.'],
  ['1인샵도 가능한가요?', '가능합니다. 대표가 직접 상담하는 매장은 오히려 적용이 빠릅니다.'],
  ['직원이 설명하기 어렵지 않을까요?', '어려운 성분 이야기가 아니라 고객 상태별로 바로 말할 수 있는 짧은 멘트를 드립니다.'],
  ['제품만 놓으면 팔릴까요?', '진열만으로는 부족합니다. 시술 직후 멘트와 방문 후 문자가 함께 가야 합니다.'],
  ['기존 제품과 충돌하지 않나요?', '현재 메뉴와 판매 제품을 보고 겹치지 않는 위치를 잡아드립니다.'],
  ['도입하면 바로 쓸 수 있나요?', '제품, 진열, 멘트, 문자, 체크리스트까지 매장에서 바로 쓰게 맞춥니다.'],
]

const shopTypes = ['헤어샵', '두피샵', '피부관리샵', '에스테틱', '네일샵', '바디관리샵', '왁싱샵', '1인샵', '기타']
const salesLevels = ['거의 없음', '조금 있음', '어느 정도 있음', '적극적으로 하고 있음']
const questionOptions = ['우리 샵에 맞는지', '660만 원 구성', '매장 진열', '상담 멘트', '문자 안내', '재방문 연결']

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

function SectionIntro({ title, body, align = 'center', light = false }) {
  const textColor = light ? 'text-white' : 'text-[#181512]'
  const bodyColor = light ? 'text-[#efe7dc]' : 'text-[#625950]'

  return (
    <div className={align === 'left' ? 'mx-0 max-w-3xl' : 'mx-auto max-w-3xl text-center'}>
      <h2 className={`text-[26px] font-black leading-tight ${textColor} sm:text-4xl lg:text-5xl`}>{title}</h2>
      {body ? <p className={`mt-5 text-base leading-8 ${bodyColor} sm:text-lg`}>{body}</p> : null}
    </div>
  )
}

function CheckList({ items, accent = false, light = false }) {
  return (
    <ul className="space-y-3">
      {items.map(item => (
        <li key={item} className={`flex gap-3 text-base leading-7 ${light ? 'text-[#f3eadc]' : 'text-[#4b433c]'}`}>
          <CheckCircle2 className={`mt-1 h-5 w-5 shrink-0 ${accent ? 'text-[#d8b25d]' : 'text-[#0f5a3b]'}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ProductDisplay() {
  return (
    <div className="relative min-h-[390px] overflow-hidden rounded-lg border border-[#d3b56a] bg-[#f7efe0] shadow-[0_24px_90px_rgba(30,22,15,0.16)]">
      <img src={SALON_IMAGE} alt="고급 샵 상담 테이블과 제품 진열" className="absolute inset-0 h-full w-full object-cover object-[55%_45%]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#12100e]/12 via-[#fff7e8]/35 to-[#0c382b]/82" />
      <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-white/40 bg-white/90 p-5 backdrop-blur">
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

function PhoneScreen() {
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

function SceneCard({ title, body, position, children }) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#e0d5c4] bg-white shadow-[0_24px_80px_rgba(30,22,15,0.08)]">
      <div className="relative h-56 overflow-hidden sm:h-64">
        <img src={SALON_IMAGE} alt={`${title} 매장 장면`} className={`h-full w-full object-cover ${position}`} loading="lazy" />
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#fffaf2] via-[#fffaf2]/92 to-[#fffaf2]/62" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-24">
          <div>
            <p className="inline-flex rounded-full border border-[#c9a862] bg-white/85 px-4 py-2 text-sm font-black text-[#7d5420] shadow-sm">
              샵 전용 홈케어 매출 패키지
            </p>
            <h1 className="mt-6 max-w-4xl text-[32px] font-black leading-[1.08] text-[#181512] sm:text-5xl lg:text-6xl">
              시술은 한 번, 매출은 홈케어에서 다시 만들어집니다.
            </h1>
            <div className="mt-6 max-w-2xl space-y-5 text-base leading-8 text-[#4b433c] sm:text-lg">
              <p>
                고객이 관리받고 나간 뒤에도 집에서 이어 쓸 상품이 있어야 객단가, 만족도,
                재방문 이유가 만들어집니다.
              </p>
              <p>
                플로로탄닌 샵 패키지는 제품 구성, 매장 진열, 고객 상담 멘트, 문자 안내,
                재방문 흐름까지 대표님 매장에 바로 적용할 수 있게 준비합니다.
              </p>
            </div>
            <div className="mt-7 rounded-lg border-l-4 border-[#b88a36] bg-white/90 p-5 shadow-sm">
              <p className="text-lg font-black leading-7 text-[#181512]">
                대표님이 직접 기획할 필요 없습니다.
              </p>
              <p className="mt-2 text-base font-bold leading-7 text-[#7a241f]">
                매장에 놓고, 설명하고, 판매하고, 다시 방문하게 만드는 구조까지 같이 드립니다.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:max-w-xl sm:grid-cols-2">
              <button
                type="button"
                onClick={() => scrollToId('inquiry')}
                className="inline-flex min-h-[54px] items-center justify-center rounded-lg bg-[#171512] px-6 text-base font-black text-white shadow-[0_16px_34px_rgba(23,21,18,0.22)] transition hover:bg-[#2a231d]"
              >
                우리 샵 적용 가능 여부 확인하기
              </button>
              <button
                type="button"
                onClick={() => scrollToId('value')}
                className="inline-flex min-h-[54px] items-center justify-center rounded-lg border border-[#a7803b] bg-white px-6 text-base font-black text-[#211a14] transition hover:bg-[#fff3d8]"
              >
                660만 원 패키지 구성 보기
              </button>
            </div>
            <a href={`tel:${phone}`} className="mt-5 inline-flex items-center gap-2 text-base font-black text-[#0f3f2e]">
              <Phone className="h-5 w-5" />
              바로 상담 {phoneDisplay}
            </a>
          </div>

          <div className="grid gap-4">
            <ProductDisplay />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-[#e0d5c4] bg-white p-5 shadow-sm">
                <p className="text-sm font-black text-[#a26f25]">대표가 보는 핵심</p>
                <p className="mt-2 text-2xl font-black leading-tight text-[#181512]">시술 후 한 번 더 팔 수 있는 장면</p>
              </div>
              <div className="rounded-lg border border-[#123e2f] bg-[#0e3a2c] p-5 text-white shadow-sm">
                <p className="text-sm font-black text-[#e8cc75]">매장 적용</p>
                <p className="mt-2 text-2xl font-black leading-tight">진열, 멘트, 문자까지 한 번에</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionIntro
          title="고객은 만족했는데, 매출은 왜 시술비에서 끝날까요?"
          body="고객이 만족하고 나가도 집에서 이어 쓸 상품을 제안하지 않으면 매출은 그날 결제로 끝납니다. 샵 안에서 관리받은 고객에게 홈케어까지 연결해야 객단가와 재방문 이유가 생깁니다."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {lossCards.map(card => (
            <article key={card.title} className="overflow-hidden rounded-lg border border-[#e0d5c4] bg-white shadow-sm">
              <div className="h-40 overflow-hidden">
                <img src={SALON_IMAGE} alt={`${card.title} 매장 이미지`} className={`h-full w-full object-cover ${card.image}`} loading="lazy" />
              </div>
              <div className="p-6">
                <h3 className="text-[19px] font-black text-[#181512] sm:text-2xl">{card.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#625950]">{card.body}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl rounded-lg border border-[#bfa15a] bg-[#fff8e8] p-5 text-center text-xl font-black leading-8 text-[#261c13]">
          대표님에게 필요한 건 매장에서 바로 써먹는 판매 상황입니다.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionIntro
          title="샵에서는 이렇게 팔립니다."
          body="제품을 길게 말하기 전에, 고객이 구매를 떠올리는 장면을 먼저 만듭니다."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {sellingScenes.map(([title, body, position], index) => (
            <SceneCard key={title} title={title} body={body} position={position}>
              {index === 3 ? (
                <div className="absolute bottom-4 right-4 w-44">
                  <PhoneScreen />
                </div>
              ) : null}
            </SceneCard>
          ))}
        </div>
      </section>

      <section className="bg-[#191512] px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            light
            title="대표님이 받는 건 설명서가 아니라, 매장에서 바로 쓰는 판매 세트입니다."
            body="제품만 보내고 끝나는 방식이 아닙니다. 고객에게 보여주고, 권하고, 문자로 다시 연결하는 준비물까지 함께 맞춥니다."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {readySetItems.map(([title, body], index) => (
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
            샵 대표가 필요한 건 공부가 아니라 팔리는 구조입니다.
          </p>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            title="고객 한 명의 결제 흐름이 이렇게 바뀝니다."
            body="방문과 시술에서 끝나던 결제가 홈케어 구매, 안내 문자, 재방문까지 이어집니다."
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

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionIntro
              align="left"
              title="고객에게 길게 설명하지 않아도 되는 상품이어야 합니다."
              body="샵에서 판매되는 상품은 대표가 길게 말해야 팔리는 상품이면 안 됩니다. 고객이 이해하기 쉬운 한 줄 메시지와 관리 후 연결되는 상황이 있어야 합니다."
            />
          </div>
          <div className="grid gap-4">
            {productStrengths.map(([title, body]) => (
              <article key={title} className="rounded-lg border border-[#e0d5c4] bg-white p-6 shadow-sm">
                <h3 className="text-[19px] font-black text-[#181512] sm:text-2xl">{title}</h3>
                <p className="mt-3 text-base leading-7 text-[#625950]">{body}</p>
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

      <section id="value" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <SectionIntro
              align="left"
              title="660만 원은 제품비가 아니라, 매장에 판매 구조를 놓는 비용입니다."
              body="이 패키지는 제품 몇 개를 사는 비용이 아닙니다. 매장에서 고객에게 보여주고, 설명하고, 판매하고, 다시 방문하게 만드는 구조를 함께 세팅하는 비용입니다."
            />
            <p className="mt-7 rounded-lg border border-[#bfa15a] bg-[#fff8e8] p-5 text-lg font-black leading-8 text-[#261c13]">
              가격을 보는 것이 아니라, 고객 한 명당 객단가가 올라갈 수 있는 판매 구조를 보는 것입니다.
            </p>
          </div>
          <article className="rounded-lg border border-[#bfa15a] bg-[#fffaf2] p-6 shadow-[0_24px_80px_rgba(30,22,15,0.1)] sm:p-8">
            <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div className="rounded-lg bg-[#171512] p-6 text-white">
                <p className="text-base font-black text-[#e8cc75]">샵 성장 패키지</p>
                <p className="mt-3 text-5xl font-black leading-none">660만 원</p>
                <p className="mt-3 text-lg font-black text-[#f0dfb4]">VAT 별도</p>
                <button
                  type="button"
                  onClick={() => scrollToId('inquiry')}
                  className="mt-6 inline-flex min-h-[54px] w-full items-center justify-center rounded-lg bg-[#7a241f] px-6 text-base font-black text-white"
                >
                  우리 샵 적용 가능 여부 확인하기
                </button>
              </div>
              <CheckList items={valueItems} accent />
            </div>
          </article>
        </div>
      </section>

      <section className="bg-[#191512] px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro light title="대표님이 도입 전에 궁금한 것만 짧게 답합니다." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {faqs.map(([question, answer]) => (
              <article key={question} className="rounded-lg border border-white/12 bg-white/7 p-6">
                <h3 className="text-[19px] font-black sm:text-xl">{question}</h3>
                <p className="mt-3 text-base leading-7 text-[#efe7dc]">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="inquiry" className="bg-[#fffaf2] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <SectionIntro
              align="left"
              title="우리 샵에 바로 적용 가능한지 확인하세요."
              body="샵 업종, 현재 메뉴, 고객층, 제품 판매 경험을 남겨주시면 우리 매장에 맞는 적용 흐름을 안내드립니다."
            />
            <div className="mt-8 overflow-hidden rounded-lg border border-[#e0d5c4] bg-white shadow-sm">
              <img src={SALON_IMAGE} alt="샵 대표와 고객 상담 장면" className="h-72 w-full object-cover object-[50%_45%]" loading="lazy" />
              <div className="p-6">
                <p className="text-xl font-black leading-8 text-[#181512]">확인할 것은 단순합니다.</p>
                <p className="mt-3 text-base leading-7 text-[#625950]">우리 매장 고객에게 어느 장면에서, 어떤 말로, 어디에 진열해야 팔리는지입니다.</p>
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
              <SelectField label="현재 제품 판매 여부" name="salesLevel" value={form.salesLevel} onChange={updateForm} options={salesLevels} />
              <SelectField label="가장 궁금한 점" name="question" value={form.question} onChange={updateForm} options={questionOptions} />
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
          <h2 className="text-[30px] font-black leading-tight sm:text-5xl">
            시술로 끝나는 매장과, 홈케어까지 파는 매장은 다릅니다.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#f3eadc] sm:text-lg">
            고객은 이미 관리받고 있습니다. 이제 집에서 이어 쓸 상품까지 연결해야 합니다.
            플로로탄닌 샵 패키지는 제품, 진열, 상담 멘트, 문자 안내, 재방문 흐름까지
            대표님 매장에서 바로 팔 수 있게 준비합니다.
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
