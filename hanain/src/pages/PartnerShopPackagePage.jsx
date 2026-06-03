import { useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  CheckCircle2,
  Download,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react'
import html2canvas from 'html2canvas'
import SEOHead from '../components/common/SEOHead'
import { usePartner } from '../context/PartnerContext'

const SITE = 'https://phlorotannin.com'
const SHARE_TOKEN = 'salon-growth-660'
const SALON_IMAGE = '/partner/shop-package/salon-consult-hero.jpg'
const DEFAULT_PHONE = '01056528206'

const recommendLeft = [
  '뷰티샵 / 피부관리실',
  '힐링센터 / 테라피샵',
  '체형관리실 / 에스테틱샵',
]

const recommendRight = [
  '기존 고객에게 부가 상품을 자연스럽게 소개하고 싶은 곳',
  '온라인 홍보를 강화하고 싶은 곳',
  '지역 고객 상담 연결을 늘리고 싶은 곳',
]

const earlyCards = [
  ['좋은 제품만으로는 부족합니다', '이제 고객은 설명과 신뢰까지 함께 봅니다.'],
  ['검색되는 샵이 유리합니다', '고객은 검색으로 비교하고, 이해하고, 상담합니다.'],
  ['회복 중심 설명이 설득합니다', '피부, 컨디션, 밸런스, 생활 회복 관점이 고객에게 더 쉽게 전달됩니다.'],
  ['오래가는 샵은 구조가 있습니다', '제품, 콘텐츠, 검색 자산이 함께 쌓여야 합니다.'],
]

const supportCards = [
  ['부가수익 구조', '660만 원 샵 패키지 도입 판매 시 공급가 기준 약 1,200만 원 매출 구조를 만들 수 있습니다.', '마진 약 50%'],
  ['전용 웹페이지 지원', '샵 소개, 상담 안내, 회복 중심 콘텐츠가 담긴 전용 페이지를 세팅합니다.', ''],
  ['지역 검색 구조 세팅', '지역명 + 샵명 + 상담 키워드 중심으로 기본 검색 구조를 잡아드립니다.', ''],
  ['초기 운영 자료 제공', '블로그, 카페, 인스타, 클립 등 무엇을 어떻게 올릴지 쉽게 안내합니다.', ''],
  ['필요 시 운영 상담', '직접 운영이 어려우면 방향 상담과 운영 도움도 가능합니다.', ''],
]

const summaryItems = [
  '샵 전용 페이지 제작',
  '지역 검색형 구조 세팅',
  '기본 소개 문구 제공',
  '초기 SNS / 블로그 가이드',
  '운영 상담 가능',
]

const revenueSteps = [
  ['방문', '고객이 관리받으러 옵니다.'],
  ['상담', '현재 고민과 관리 목적을 듣습니다.'],
  ['관리', '샵의 전문 관리가 진행됩니다.'],
  ['제품 제안', '관리 후 집에서 이어 쓸 상품을 자연스럽게 소개합니다.'],
  ['구매', '고객은 필요한 이유를 이해하고 선택합니다.'],
  ['재방문', '사용 경험이 다음 상담과 재방문으로 이어집니다.'],
]

const beforeItems = [
  '제품은 있지만 설명이 약함',
  '진열은 되어 있지만 구매 이유가 약함',
  '고객은 관리받고 결제하면 끝남',
  '온라인에서 우리 샵이 잘 보이지 않음',
  '재방문 이유가 약함',
]

const afterItems = [
  '회복 중심 설명으로 고객이 이해함',
  '제품을 자연스럽게 소개할 수 있음',
  '전용 페이지로 검색 구조가 생김',
  '상담과 콘텐츠가 신뢰를 쌓음',
  '고객에게 다시 방문할 이유가 생김',
]

const priceItems = [
  '홈케어 상품 패키지',
  '샵 전용 페이지 제작',
  '지역 검색 구조 세팅',
  '기본 소개 문구 제공',
  '초기 SNS / 블로그 가이드',
  '제품 이미지 자료',
  '상담 연결 문구',
  '필요 시 운영 상담',
]

const faqItems = [
  ['우리 샵 고객에게 맞을까요?', '뷰티샵, 피부관리실, 힐링센터, 테라피샵, 체형관리실, 에스테틱샵처럼 기존 고객에게 부가 상품을 자연스럽게 소개하고 싶은 곳에 잘 맞습니다.'],
  ['제품만 놓으면 팔릴까요?', '진열만으로는 부족합니다. 고객이 이해할 수 있는 설명, 전용 페이지, 검색 구조가 함께 있어야 합니다.'],
  ['온라인 홍보가 약한 샵도 가능한가요?', '가능합니다. 샵 소개, 상담 안내, 기본 소개 문구, 지역 검색형 구조를 함께 세팅합니다.'],
  ['1인샵도 가능한가요?', '가능합니다. 대표가 직접 상담하는 샵일수록 고객에게 자연스럽게 소개하기 좋습니다.'],
  ['도입 후 무엇을 하면 되나요?', '고객에게 설명하고, 전용 페이지를 안내하고, 필요할 때 운영 상담을 받으면 됩니다.'],
  ['문의하면 바로 방문하나요?', '문의가 많아 예약된 순서대로 안내드립니다. 샵에 맞는 운영 방향과 파트너 혜택을 확인한 뒤 안내합니다.'],
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

function SectionTitle({ title, body, light = false }) {
  return (
    <div className="mx-auto max-w-5xl text-center">
      <h2 className={`text-[26px] font-black leading-tight sm:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-[#111111]'}`}>{title}</h2>
      {body ? <p className={`mx-auto mt-5 max-w-4xl text-base font-bold leading-8 sm:text-lg ${light ? 'text-[#f7ead2]' : 'text-[#4A3A2A]'}`}>{body}</p> : null}
    </div>
  )
}

function CheckList({ items, light = false }) {
  return (
    <ul className="space-y-4">
      {items.map(item => (
        <li key={item} className={`flex gap-3 text-base font-black leading-7 sm:text-lg ${light ? 'text-[#fff7e8]' : 'text-[#111111]'}`}>
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#C69A2D]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function PriceRibbon() {
  return (
    <div className="grid overflow-hidden rounded-lg border-2 border-[#C69A2D] bg-white shadow-[0_26px_70px_rgba(5,61,34,0.16)] md:grid-cols-[1.05fr_1fr_0.72fr]">
      <div className="bg-[#053D22] p-5 text-center text-[#f5d275] sm:p-7">
        <p className="text-[36px] font-black leading-none sm:text-6xl">660만 원</p>
        <p className="mt-3 text-2xl font-black leading-tight sm:text-4xl">샵 패키지</p>
      </div>
      <div className="border-y-2 border-[#C69A2D] p-5 text-center md:border-x-2 md:border-y-0 sm:p-7">
        <p className="text-base font-black text-[#4A3A2A]">판매 시 공급가 기준</p>
        <p className="mt-2 text-[34px] font-black leading-tight text-[#B8860B] sm:text-5xl">약 1,200만 원</p>
        <p className="mt-2 text-xl font-black text-[#111111]">매출 구조</p>
      </div>
      <div className="bg-[#0B4A2B] p-5 text-center text-white sm:p-7">
        <p className="text-base font-black text-[#f5d275]">마진 약</p>
        <p className="mt-1 text-[44px] font-black leading-none sm:text-6xl">50%</p>
        <p className="mt-3 text-sm font-bold">부가가치세 별도 기준</p>
      </div>
    </div>
  )
}

function ProductStage() {
  return (
    <div className="relative min-h-[500px] overflow-hidden rounded-lg border-2 border-[#C69A2D] bg-[#FFFDF7] shadow-[0_28px_90px_rgba(5,61,34,0.2)]">
      <img src={SALON_IMAGE} alt="샵 대표가 고객에게 제품을 설명하는 고급 상담 장면" className="absolute inset-0 h-full w-full object-cover object-[60%_44%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF7]/95 via-[#FFFDF7]/58 to-[#053D22]/22" />
      <div className="absolute left-5 top-5 rounded-lg bg-[#053D22] px-5 py-3 text-base font-black text-[#f5d275] shadow-lg">
        플로로탄닌 파트너스
      </div>
      <div className="absolute bottom-5 left-5 right-5">
        <PriceRibbon />
      </div>
    </div>
  )
}

function Field({ label, name, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <label className="block">
      <span className="text-sm font-black text-[#111111]">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-lg border border-[#d8ccbb] bg-white px-4 text-base text-[#111111] outline-none transition focus:border-[#B8860B] focus:ring-4 focus:ring-[#C69A2D]/20"
      />
    </label>
  )
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-sm font-black text-[#111111]">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 h-12 w-full rounded-lg border border-[#d8ccbb] bg-white px-4 text-base text-[#111111] outline-none transition focus:border-[#B8860B] focus:ring-4 focus:ring-[#C69A2D]/20"
      >
        <option value="">선택해 주세요</option>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  )
}

function FlyerPriceBlock() {
  return (
    <div className="grid overflow-hidden rounded-lg border-2 border-[#C69A2D] bg-white text-center sm:grid-cols-[1fr_1fr_0.8fr]">
      <div className="bg-[#053D22] p-4 text-[#f5d275]">
        <p className="text-4xl font-black leading-none">660만 원</p>
        <p className="mt-2 text-2xl font-black">샵 패키지</p>
      </div>
      <div className="border-y-2 border-[#C69A2D] p-4 sm:border-x-2 sm:border-y-0">
        <p className="text-sm font-black text-[#4A3A2A]">판매 시 공급가 기준</p>
        <p className="mt-1 text-3xl font-black text-[#B8860B]">약 1,200만 원</p>
        <p className="text-lg font-black">매출 구조</p>
      </div>
      <div className="bg-[#0B4A2B] p-4 text-white">
        <p className="text-sm font-black text-[#f5d275]">마진 약</p>
        <p className="text-5xl font-black leading-none">50%</p>
        <p className="mt-2 text-xs font-bold">부가가치세 별도 기준</p>
      </div>
    </div>
  )
}

function FlyerOne() {
  return (
    <article className="relative flex min-h-[720px] flex-col overflow-hidden rounded-lg border-[3px] border-[#053D22] bg-[#FFFDF7] text-[#111111] shadow-[0_22px_70px_rgba(5,61,34,0.18)]">
      <div className="mx-auto rounded-b-lg bg-[#053D22] px-8 py-3 text-center text-2xl font-black text-[#f5d275]">
        플로로탄닌 파트너스
      </div>
      <div className="grid flex-1 gap-4 p-6">
        <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <p className="text-lg font-black text-[#B8860B]">이런 샵·센터에 특히 추천합니다</p>
            <h3 className="mt-3 text-[42px] font-black leading-[1.04] text-[#053D22]">
              제품만 공급받는 시대는 끝났습니다
            </h3>
            <p className="mt-4 text-xl font-black leading-tight">
              이제는 수익이 남고, 검색에 보이고, 고객에게 신뢰받는 구조까지 함께 가져가야 합니다.
            </p>
          </div>
          <div className="relative h-56 overflow-hidden rounded-lg border-2 border-[#C69A2D]">
            <img src={SALON_IMAGE} alt="샵 상담 장면" crossOrigin="anonymous" className="h-full w-full object-cover object-[63%_45%]" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#FFFDF7]/30" />
          </div>
        </div>

        <FlyerPriceBlock />

        <div className="overflow-hidden rounded-lg border-2 border-[#C69A2D]">
          <div className="bg-[#053D22] px-4 py-3 text-center text-xl font-black text-white">
            플로로탄닌 파트너스는 이런 샵·센터에 특히 추천합니다
          </div>
          <div className="grid gap-0 bg-white p-5 md:grid-cols-2">
            <div className="md:border-r md:border-[#C69A2D] md:pr-5">
              <CheckList items={recommendLeft} />
            </div>
            <div className="pt-5 md:pl-5 md:pt-0">
              <CheckList items={recommendRight} />
            </div>
          </div>
        </div>

        <div className="mt-auto rounded-lg bg-[#053D22] p-5 text-center text-2xl font-black leading-tight text-[#f5d275]">
          좋은 제품 + 검색되는 구조 + 회복의 관점 = 오래가는 샵
        </div>
      </div>
    </article>
  )
}

function FlyerTwo({ contactName, phoneDisplay }) {
  return (
    <article className="relative flex min-h-[720px] flex-col overflow-hidden rounded-lg border-[3px] border-[#053D22] bg-[#FFFDF7] text-[#111111] shadow-[0_22px_70px_rgba(5,61,34,0.18)]">
      <div className="grid gap-5 p-6">
        <div className="grid gap-5 md:grid-cols-[1fr_0.86fr] md:items-center">
          <div>
            <p className="inline-flex rounded-lg bg-[#053D22] px-5 py-2 text-lg font-black text-[#f5d275]">
              플로로탄닌 파트너스
            </p>
            <h3 className="mt-5 text-[40px] font-black leading-[1.06] text-[#111111]">
              수익도 만들고, 샵도 더 강해집니다
            </h3>
            <p className="mt-3 text-2xl font-black text-[#B8860B]">
              좋은 제품 + 검색되는 시스템 + 초기 운영 지원까지
            </p>
          </div>
          <div className="relative h-48 overflow-hidden rounded-lg border-2 border-[#C69A2D]">
            <img src={SALON_IMAGE} alt="제품 진열과 상담 장면" crossOrigin="anonymous" className="h-full w-full object-cover object-[68%_45%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#053D22]/30 to-transparent" />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-5">
          {supportCards.map(([title, body, note], index) => (
            <div key={title} className="overflow-hidden rounded-lg border border-[#eadfce] bg-white text-center">
              <div className="bg-[#FFF6E8] p-3">
                <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#053D22] text-sm font-black text-[#f5d275]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 text-base font-black leading-snug text-[#053D22]">{title}</p>
                <p className="mt-2 text-xs font-bold leading-5 text-[#4A3A2A]">{body}</p>
              </div>
              {note ? <p className="bg-[#B8860B] px-2 py-2 text-lg font-black text-white">{note}</p> : null}
            </div>
          ))}
        </div>

        <div className="rounded-lg border-2 border-[#C69A2D] bg-white p-4">
          <p className="text-center text-2xl font-black text-[#053D22]">파트너가 받는 지원</p>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {summaryItems.map(item => (
              <div key={item} className="rounded-lg bg-[#FFF6E8] p-3 text-center">
                <CheckCircle2 className="mx-auto h-6 w-6 text-[#C69A2D]" />
                <p className="mt-2 text-sm font-black leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto overflow-hidden rounded-lg border-2 border-[#053D22] bg-white">
          <div className="grid gap-0 md:grid-cols-[1.15fr_0.85fr]">
            <div className="p-5">
              <p className="text-xl font-black leading-snug text-[#053D22]">
                연락주시면 샘플 체험과 자세한 자료로 찾아뵙겠습니다
              </p>
              <div className="mt-4 rounded-lg bg-[#053D22] p-4 text-white">
                <p className="text-lg font-black text-[#f5d275]">{contactName}</p>
                <p className="mt-1 text-3xl font-black">{phoneDisplay}</p>
              </div>
            </div>
            <div className="border-t border-[#C69A2D] bg-[#FFF6E8] p-5 md:border-l md:border-t-0">
              <p className="text-base font-black leading-7 text-[#4A3A2A]">
                문의가 많아 예약된 순서대로 방문하는 점 양해 바랍니다.
              </p>
              <p className="mt-4 text-base font-black leading-7 text-[#053D22]">
                샵에 맞는 운영 방향과 파트너 혜택을 안내해드립니다.
              </p>
            </div>
          </div>
          <div className="bg-[#053D22] px-4 py-4 text-center text-2xl font-black text-[#f5d275]">
            수익을 더하고, 가치를 높이고, 회복을 전하는 샵 파트너십
          </div>
        </div>
      </div>
    </article>
  )
}

export default function PartnerShopGrowthLandingPage() {
  const partner = usePartner()
  const { partnerSlug } = useParams()
  const slug = safePartnerSlug(partner, partnerSlug)
  const rawPhone = onlyDigits(partner?.phone || partner?.sms || slug || DEFAULT_PHONE) || DEFAULT_PHONE
  const phone = rawPhone.length >= 10 ? rawPhone : DEFAULT_PHONE
  const phoneDisplay = partner?.phoneDisplay || formatPhone(phone)
  const contactName = partner?.displayName || partner?.name || '플로로탄닌 파트너스'
  const pageUrl = `${SITE}/p/${slug}/shop-package/${SHARE_TOKEN}`
  const flyerRefs = useRef([])
  const [flyerDownloading, setFlyerDownloading] = useState(false)
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
    description: '660만 원 샵 패키지로 제품 공급, 전용 페이지, 지역 검색 구조, 기본 소개 문구, 초기 운영 지원까지 함께 제공하는 플로로탄닌 파트너스 샵 전용 매출 성장 랜딩입니다.',
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
      '우리 샵 적용 가능 여부 확인하기',
      `샵명: ${form.shopName || '-'}`,
      `대표님 성함: ${form.ownerName || '-'}`,
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

  const saveFlyerImage = async (index) => {
    const node = flyerRefs.current[index]
    if (!node) throw new Error('전단지 영역을 찾을 수 없습니다.')

    if (document.fonts?.ready) await document.fonts.ready
    const canvas = await html2canvas(node, {
      backgroundColor: '#FFFDF7',
      scale: 2,
      useCORS: true,
      logging: false,
    })

    await new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('PNG 파일 생성에 실패했습니다.'))
          return
        }
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `플로로탄닌_샵매출성장전단지_${contactName}_${index + 1}페이지.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        resolve()
      }, 'image/png', 0.95)
    })
  }

  const downloadAllFlyers = async () => {
    setFlyerDownloading(true)
    try {
      await saveFlyerImage(0)
      await new Promise(resolve => setTimeout(resolve, 350))
      await saveFlyerImage(1)
    } catch (error) {
      alert(`전단지 다운로드 오류: ${error.message}`)
    } finally {
      setFlyerDownloading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#FFF6E8] text-[#111111]">
      <SEOHead
        title="샵 매출 성장 패키지 | 플로로탄닌 파트너스"
        description="660만 원 샵 패키지로 제품 공급, 전용 페이지, 지역 검색 구조, 기본 소개 문구, 초기 운영 지원까지 함께 제공하는 플로로탄닌 파트너스 샵 전용 매출 성장 랜딩입니다."
        canonical={pageUrl}
        ogUrl={pageUrl}
        ogImage={`${SITE}${SALON_IMAGE}`}
        ogImageAlt="고급 피부관리 모델과 제품 진열"
        noindex
        jsonLd={jsonLd}
      />

      <section className="px-4 py-5 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-[1180px] overflow-hidden rounded-lg border-4 border-[#053D22] bg-[#FFFDF7] shadow-[0_34px_120px_rgba(5,61,34,0.22)]">
          <div className="mx-auto w-fit rounded-b-lg bg-[#053D22] px-8 py-4 text-center text-xl font-black text-[#f5d275] shadow-lg sm:text-3xl">
            플로로탄닌 파트너스
          </div>
          <div className="grid gap-0 lg:grid-cols-[0.98fr_1.02fr] lg:items-stretch">
            <div className="px-5 pb-8 pt-7 sm:px-10 sm:pb-12 lg:pt-12">
              <h1 className="text-[42px] font-black leading-[1.02] text-[#053D22] sm:text-6xl lg:text-[74px]">
                제품만 공급받는 시대는 끝났습니다
              </h1>
              <p className="mt-6 text-[24px] font-black leading-tight text-[#111111] sm:text-4xl">
                이제는 수익이 남고, 검색에 보이고, 고객에게 신뢰받는 구조까지 함께 가져가야 합니다.
              </p>
              <div className="mt-6 max-w-2xl space-y-4 text-base font-bold leading-8 text-[#4A3A2A] sm:text-lg">
                <p>고객은 좋은 제품만 보지 않습니다. 검색되고, 이해되고, 신뢰되는 샵을 찾습니다.</p>
                <p>플로로탄닌 파트너스는 제품만 공급하지 않습니다. 샵에서 고객에게 설명하고, 판매하고, 다시 찾아오게 만드는 구조까지 함께 제공합니다.</p>
              </div>
              <div className="mt-8 grid gap-3 sm:max-w-xl sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => scrollToId('inquiry')}
                  className="inline-flex min-h-[54px] items-center justify-center rounded-lg bg-[#053D22] px-6 text-base font-black text-white shadow-[0_18px_36px_rgba(5,61,34,0.24)] transition hover:bg-[#0B4A2B]"
                >
                  우리 샵 도입 가능 여부 확인하기
                </button>
                <button
                  type="button"
                  onClick={() => scrollToId('value')}
                  className="inline-flex min-h-[54px] items-center justify-center rounded-lg border-2 border-[#B8860B] bg-white px-6 text-base font-black text-[#053D22] transition hover:bg-[#fff6dc]"
                >
                  660만 원 구성 확인하기
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 lg:p-8">
              <ProductStage />
            </div>
          </div>
          <div className="grid gap-0 border-t-2 border-[#C69A2D] md:grid-cols-3">
            {[
              ['추가 수익', '기존 고객에게 자연스럽게 소개하고 부가수익을 만들 수 있습니다.'],
              ['지역 검색 노출', '우리 샵이 지역에서 더 잘 보일 수 있게 구조를 잡아드립니다.'],
              ['고객 신뢰 상승', '회복 중심의 설명과 콘텐츠로 상담 연결이 쉬워집니다.'],
            ].map(([title, body], index) => (
              <article key={title} className={`p-6 text-center ${index > 0 ? 'border-t-2 border-[#C69A2D] md:border-l-2 md:border-t-0' : ''}`}>
                <h2 className="text-2xl font-black text-[#053D22]">{title}</h2>
                <p className="mt-3 text-base font-bold leading-7 text-[#4A3A2A]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-[1180px] overflow-hidden rounded-lg border-2 border-[#C69A2D] bg-[#FFFDF7] shadow-[0_22px_80px_rgba(5,61,34,0.12)]">
          <div className="bg-[#053D22] px-5 py-4 text-center text-2xl font-black text-[#f5d275] sm:text-4xl">
            이런 샵·센터에 특히 추천합니다
          </div>
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-base font-bold leading-8 text-[#4A3A2A] sm:text-lg">
                플로로탄닌 파트너스는 단순히 제품을 더 들여놓는 구조가 아닙니다.
                기존 고객에게 자연스럽게 소개하고, 지역에서 검색되고, 신뢰를 쌓아가는 샵에 특히 잘 맞습니다.
              </p>
              <div className="mt-7 rounded-lg bg-[#FFF6E8] p-6">
                <CheckList items={recommendLeft} />
              </div>
            </div>
            <div className="rounded-lg border-2 border-[#C69A2D] bg-white p-6">
              <CheckList items={recommendRight} />
            </div>
          </div>
          <p className="border-t-2 border-[#C69A2D] bg-[#FFFDF7] p-5 text-center text-2xl font-black leading-9 text-[#053D22] sm:text-3xl">
            제품만 들여놓는 것이 아니라, 샵에서 팔릴 이유까지 함께 만들어드립니다.
          </p>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto grid max-w-[1180px] overflow-hidden rounded-lg border-2 border-[#C69A2D] bg-[#FFFDF7] shadow-[0_22px_80px_rgba(5,61,34,0.12)] lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative min-h-[300px] overflow-hidden">
            <img src={SALON_IMAGE} alt="샵 관리실과 제품 진열" className="absolute inset-0 h-full w-full object-cover object-[67%_45%]" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#053D22]/12 to-[#053D22]/48" />
          </div>
          <div className="p-5 sm:p-8">
            <SectionTitle
              title="지금 도입한 샵이 먼저 가져가는 것"
              body="고객은 이미 비교하고 검색합니다. 좋은 제품만 있는 샵보다, 설명할 수 있고 신뢰를 쌓는 샵이 선택받습니다."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {earlyCards.map(([title, body], index) => (
                <article key={title} className="rounded-lg border border-[#eadfce] bg-[#FFF6E8] p-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#053D22] text-sm font-black text-[#f5d275]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 text-[21px] font-black leading-snug text-[#053D22] sm:text-2xl">{title}</h3>
                  <p className="mt-3 text-base font-bold leading-7 text-[#4A3A2A]">{body}</p>
                </article>
              ))}
            </div>
            <p className="mt-7 rounded-lg bg-[#053D22] p-5 text-center text-2xl font-black leading-9 text-[#f5d275]">
              좋은 제품 + 검색되는 구조 + 회복의 관점 = 오래가는 샵
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-[1180px] rounded-lg bg-[#053D22] p-5 text-white shadow-[0_28px_100px_rgba(5,61,34,0.24)] sm:p-8">
          <SectionTitle light title="파트너가 되면 이렇게 지원합니다" body="좋은 제품 + 검색되는 시스템 + 초기 운영 지원까지" />
          <h3 className="mt-6 text-center text-[32px] font-black leading-tight text-white sm:text-6xl">
            수익도 만들고, 샵도 더 강해집니다
          </h3>
          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            {supportCards.map(([title, body, note], index) => (
              <article key={title} className="overflow-hidden rounded-lg border border-[#C69A2D]/70 bg-[#FFFDF7] text-[#111111] shadow-lg">
                <div className="bg-[#FFF6E8] p-5 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#053D22] text-lg font-black text-[#f5d275]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h4 className="mt-5 text-[21px] font-black leading-snug text-[#053D22]">{title}</h4>
                  <p className="mt-4 text-base font-bold leading-7 text-[#4A3A2A]">{body}</p>
                </div>
                {note ? <p className="bg-[#B8860B] px-4 py-4 text-center text-2xl font-black text-white">{note}</p> : null}
              </article>
            ))}
          </div>
          <p className="mt-8 rounded-lg border border-[#C69A2D] bg-[#0B4A2B] p-5 text-center text-2xl font-black leading-9 text-[#f5d275]">
            이제는 단순 판매가 아니라, 회복을 제안하는 샵이 선택받습니다
          </p>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-[1180px] rounded-lg border-2 border-[#C69A2D] bg-[#FFFDF7] p-5 shadow-[0_22px_80px_rgba(5,61,34,0.12)] sm:p-8">
          <SectionTitle title="파트너가 받는 지원" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {summaryItems.map(item => (
              <article key={item} className="rounded-lg border border-[#eadfce] bg-white p-5 text-center">
                <CheckCircle2 className="mx-auto h-8 w-8 text-[#053D22]" />
                <p className="mt-4 text-[19px] font-black leading-snug text-[#111111]">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-[1180px] overflow-hidden rounded-lg border-2 border-[#C69A2D] bg-[#FFFDF7] shadow-[0_22px_80px_rgba(5,61,34,0.12)]">
          <div className="p-5 sm:p-8">
            <SectionTitle
              title="샵에서는 이렇게 매출로 연결됩니다"
              body="고객에게 갑자기 제품을 파는 것이 아닙니다. 관리 후 고객이 느끼는 관심과 필요에 맞춰 자연스럽게 연결합니다."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {revenueSteps.map(([title, body], index) => (
                <article key={title} className="rounded-lg bg-[#FFF6E8] p-5 text-center">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#053D22] text-base font-black text-[#f5d275]">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-[19px] font-black text-[#053D22]">{title}</h3>
                  <p className="mt-3 text-base font-bold leading-7 text-[#4A3A2A]">{body}</p>
                </article>
              ))}
            </div>
          </div>
          <p className="bg-[#053D22] p-5 text-center text-2xl font-black leading-9 text-[#f5d275]">
            샵 매출은 관리 당일에 끝나는 것이 아니라, 고객이 집에서 이어 쓰는 순간 다시 시작됩니다.
          </p>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-[1180px] rounded-lg border-2 border-[#C69A2D] bg-[#FFFDF7] p-5 shadow-[0_22px_80px_rgba(5,61,34,0.12)] sm:p-8">
          <SectionTitle title="도입 전과 도입 후, 샵의 판매 구조가 달라집니다" />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <article className="overflow-hidden rounded-lg border border-[#e0d5c4] bg-white">
              <div className="h-52 overflow-hidden">
                <img src={SALON_IMAGE} alt="도입 전 샵 이미지" className="h-full w-full object-cover object-[38%_50%] opacity-80 grayscale" loading="lazy" />
              </div>
              <div className="p-6">
                <h3 className="text-4xl font-black text-[#111111]">도입 전</h3>
                <div className="mt-5"><CheckList items={beforeItems} /></div>
              </div>
            </article>
            <article className="overflow-hidden rounded-lg border-2 border-[#C69A2D] bg-[#FFF6E8] shadow-[0_24px_80px_rgba(5,61,34,0.1)]">
              <div className="h-52 overflow-hidden">
                <img src={SALON_IMAGE} alt="도입 후 샵 이미지" className="h-full w-full object-cover object-[68%_46%]" loading="lazy" />
              </div>
              <div className="p-6">
                <h3 className="text-4xl font-black text-[#053D22]">도입 후</h3>
                <div className="mt-5"><CheckList items={afterItems} /></div>
              </div>
            </article>
          </div>
          <p className="mt-8 rounded-lg bg-[#053D22] p-5 text-center text-2xl font-black leading-9 text-[#f5d275]">
            제품을 파는 것이 아니라, 고객이 이해하고 선택할 수 있는 구조를 만드는 것입니다.
          </p>
        </div>
      </section>

      <section id="value" className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-[1180px] rounded-lg border-4 border-[#053D22] bg-[#FFFDF7] p-5 shadow-[0_28px_100px_rgba(5,61,34,0.18)] sm:p-8">
          <SectionTitle
            title="660만 원은 제품비가 아니라, 매장에 판매 구조를 놓는 비용입니다"
            body="이 패키지는 제품 몇 개를 사는 비용이 아닙니다. 샵에서 고객에게 보여주고, 설명하고, 판매하고, 다시 방문하게 만드는 구조를 함께 세팅하는 비용입니다."
          />
          <div className="mt-8">
            <PriceRibbon />
          </div>
          <div className="mt-6 rounded-lg border border-[#eadfce] bg-white p-6">
            <h3 className="text-3xl font-black text-[#053D22]">샵 성장 패키지</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {priceItems.map(item => (
                <div key={item} className="rounded-lg bg-[#FFF6E8] p-4">
                  <CheckCircle2 className="h-6 w-6 text-[#C69A2D]" />
                  <p className="mt-3 text-base font-black leading-7 text-[#111111]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-7 rounded-lg border-2 border-[#C69A2D] bg-white p-5 text-center text-2xl font-black leading-9 text-[#053D22]">
            가격을 보는 것이 아니라, 고객 한 명당 객단가와 재방문 이유를 만들 수 있는 판매 구조를 보는 것입니다.
          </p>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-[1180px] rounded-lg bg-[#053D22] p-5 text-white shadow-[0_28px_100px_rgba(5,61,34,0.22)] sm:p-8">
          <SectionTitle light title="대표님이 도입 전에 궁금한 것만 짧게 답합니다" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {faqItems.map(([question, answer]) => (
              <article key={question} className="rounded-lg border border-[#C69A2D]/60 bg-[#FFFDF7] p-5 text-[#111111]">
                <h3 className="text-[19px] font-black leading-snug text-[#053D22] sm:text-xl">{question}</h3>
                <p className="mt-3 text-base font-bold leading-7 text-[#4A3A2A]">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="inquiry" className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto grid max-w-[1180px] gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="overflow-hidden rounded-lg border-2 border-[#C69A2D] bg-[#FFFDF7] shadow-[0_22px_80px_rgba(5,61,34,0.12)]">
            <div className="p-5 sm:p-7">
              <SectionTitle
                title="우리 샵에 맞는 적용 가능 여부를 확인하세요"
                body="연락주시면 샘플 체험과 자세한 자료로 찾아뵙겠습니다. 샵에 맞는 운영 방향과 파트너 혜택을 안내해드립니다."
              />
            </div>
            <div className="relative h-72 overflow-hidden">
              <img src={SALON_IMAGE} alt="여성 모델과 제품 패키지" className="h-full w-full object-cover object-[60%_45%]" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#053D22]/42 to-transparent" />
            </div>
            <div className="p-5 sm:p-7">
              <p className="rounded-lg bg-[#FFF6E8] p-4 text-base font-black leading-7 text-[#4A3A2A]">
                문의가 많아 예약된 순서대로 방문하는 점 양해 바랍니다.
              </p>
              <div className="mt-5 rounded-lg border-2 border-[#C69A2D] bg-[#053D22] p-5 text-white">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-7 w-7 text-[#f5d275]" />
                  <p className="text-lg font-black text-[#f5d275]">{contactName}</p>
                </div>
                <p className="mt-3 text-[32px] font-black leading-tight sm:text-4xl">{phoneDisplay}</p>
              </div>
            </div>
          </div>

          <form onSubmit={submitInquiry} className="rounded-lg border border-[#d8ccbb] bg-white p-5 shadow-[0_24px_80px_rgba(5,61,34,0.08)] sm:p-8">
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
                <span className="text-sm font-black text-[#111111]">문의 내용</span>
                <textarea
                  name="memo"
                  value={form.memo}
                  onChange={updateForm}
                  rows={5}
                  placeholder="현재 매장 상황이나 궁금한 점을 남겨주세요."
                  className="mt-2 w-full rounded-lg border border-[#d8ccbb] bg-white px-4 py-3 text-base text-[#111111] outline-none transition focus:border-[#B8860B] focus:ring-4 focus:ring-[#C69A2D]/20"
                />
              </label>
            </div>
            <button type="submit" className="mt-6 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-lg bg-[#053D22] px-6 text-base font-black text-white shadow-[0_16px_34px_rgba(5,61,34,0.22)]">
              <Send className="h-5 w-5" />
              우리 샵 적용 가능 여부 확인하기
            </button>
            <a href={`tel:${phone}`} className="mt-4 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-lg border-2 border-[#B8860B] bg-white px-6 text-base font-black text-[#053D22]">
              <Phone className="h-5 w-5" />
              전화로 문의하기
            </a>
          </form>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-lg border-4 border-[#053D22] text-white shadow-[0_28px_100px_rgba(5,61,34,0.22)]">
          <img src={SALON_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover object-[62%_46%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#053D22]/98 via-[#053D22]/90 to-[#0B4A2B]/70" />
          <div className="relative p-6 text-center sm:p-10 lg:p-14">
            <p className="text-[28px] font-black leading-tight text-[#f5d275] sm:text-5xl">
              수익을 더하고, 가치를 높이고, 회복을 전하는 샵 파트너십
            </p>
            <h2 className="mt-6 text-[36px] font-black leading-tight sm:text-6xl">
              플로로탄닌 파트너스
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base font-bold leading-8 text-[#f7ead2] sm:text-lg">
              제품만 공급받는 시대는 끝났습니다. 이제는 수익이 남고, 검색에 보이고, 고객에게 신뢰받는 구조까지 함께 가져가야 합니다.
            </p>
            <button
              type="button"
              onClick={() => scrollToId('inquiry')}
              className="mt-8 inline-flex min-h-[54px] items-center justify-center rounded-lg bg-white px-8 text-base font-black text-[#053D22]"
            >
              우리 샵 도입 상담하기
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 pt-2 sm:px-6 sm:pb-14">
        <div className="mx-auto max-w-[1180px] rounded-lg border-4 border-[#053D22] bg-[#FFFDF7] p-5 shadow-[0_28px_100px_rgba(5,61,34,0.18)] sm:p-8">
          <SectionTitle
            title="공유용 전단지 2장 다운로드"
            body="전단지 이미지만 내려받아 바로 공유하세요. 버튼을 누르면 1페이지와 2페이지 PNG가 순서대로 저장됩니다."
          />
          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={downloadAllFlyers}
              disabled={flyerDownloading}
              className="inline-flex min-h-[54px] w-full max-w-md items-center justify-center gap-2 rounded-lg bg-[#053D22] px-7 text-base font-black text-white shadow-[0_16px_34px_rgba(5,61,34,0.22)] disabled:cursor-not-allowed disabled:bg-[#7b827a]"
            >
              <Download className="h-5 w-5" />
              {flyerDownloading ? '전단지 생성 중...' : '전단지 2장 다운로드'}
            </button>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div ref={node => { flyerRefs.current[0] = node }} className="mx-auto w-full max-w-[540px]">
              <FlyerOne />
            </div>
            <div ref={node => { flyerRefs.current[1] = node }} className="mx-auto w-full max-w-[540px]">
              <FlyerTwo contactName={contactName} phoneDisplay={phoneDisplay} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
