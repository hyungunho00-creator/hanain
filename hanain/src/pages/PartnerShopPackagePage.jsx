import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  ExternalLink,
  Handshake,
  Headphones,
  HeartPulse,
  Leaf,
  Lock,
  MapPin,
  MessageCircle,
  Monitor,
  Package,
  Phone,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'
import SEOHead from '../components/common/SEOHead'
import { usePartner } from '../context/PartnerContext'

const SITE = 'https://phlorotannin.com'
const SHARE_TOKEN = 'salon-growth-660'

const proposalImages = [
  {
    src: '/partner/shop-package/shop-package-01.png',
    alt: '플로로탄닌 파트너스 660만 원 샵 패키지 제안서 1페이지',
  },
  {
    src: '/partner/shop-package/shop-package-02.png',
    alt: '플로로탄닌 파트너스 샵 패키지 회복 관점 제안서 2페이지',
  },
  {
    src: '/partner/shop-package/shop-package-03.png',
    alt: '플로로탄닌 파트너스 샵 지원 구조 제안서 3페이지',
  },
  {
    src: '/partner/shop-package/shop-package-04.png',
    alt: '플로로탄닌 파트너스 샵 패키지 추천 업종과 연락 안내 4페이지',
  },
]

const supportItems = [
  {
    icon: Wallet,
    label: '부가수익 구조',
    title: '660만 원 패키지 도입',
    body: '판매 시 공급가 기준 약 1,200만 원 매출 구조와 약 50% 마진 구조를 한눈에 설명할 수 있게 정리합니다.',
  },
  {
    icon: Monitor,
    label: '전용 웹페이지',
    title: '샵 소개 페이지 지원',
    body: '샵 소개, 상담 안내, 회복 중심 콘텐츠가 담긴 전용 안내 페이지로 고객이 검색 후 이해할 수 있는 흐름을 만듭니다.',
  },
  {
    icon: Search,
    label: '지역 검색',
    title: '지역 키워드 구조 세팅',
    body: '지역명, 샵명, 상담 키워드를 중심으로 고객이 비교하고 문의할 수 있는 기본 검색 구조를 잡아드립니다.',
  },
  {
    icon: ClipboardCheck,
    label: '운영 가이드',
    title: '초기 운영 문구 제공',
    body: '블로그, 카페, 인스타, 고객 안내 문구를 처음부터 어렵지 않게 시작할 수 있도록 정리합니다.',
  },
  {
    icon: Headphones,
    label: '상담 지원',
    title: '필요 시 운영 상담',
    body: '샵 운영 방향, 고객 안내 흐름, 파트너 혜택 설명이 막힐 때 운영 상담으로 방향을 함께 잡습니다.',
  },
]

const reasons = [
  {
    icon: Package,
    title: '좋은 제품만으로는 부족합니다',
    body: '고객은 이제 제품명보다 설명, 근거, 상담 연결, 구매 후 관리 흐름까지 함께 봅니다.',
  },
  {
    icon: Search,
    title: 'AI 시대에는 검색되는 샵이 유리합니다',
    body: '검색으로 비교하고 이해한 고객이 상담으로 이어지도록, 샵의 온라인 설명력을 함께 세팅해야 합니다.',
  },
  {
    icon: HeartPulse,
    title: '회복 중심 설명이 상담을 만듭니다',
    body: '피부, 컨디션, 밸런스, 생활 회복 관점으로 설명하면 고객이 자신의 문제와 연결해 이해하기 쉽습니다.',
  },
  {
    icon: TrendingUp,
    title: '오래가는 샵은 시스템이 있습니다',
    body: '제품, 콘텐츠, 검색 구조, 상담 문구가 쌓여야 단순 판매가 아닌 반복 상담 구조가 만들어집니다.',
  },
]

const recommendedShops = [
  '뷰티샵 / 피부관리실',
  '힐링센터 / 테라피샵',
  '체형관리실 / 에스테틱샵',
  '기존 고객에게 부가 상품을 자연스럽게 제안하고 싶은 샵',
  '온라인 홍보와 지역 고객 상담 연결을 강화하고 싶은 샵',
  '제품 판매와 브랜드 신뢰를 함께 키우고 싶은 샵',
]

function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '')
}

function formatPhone(value) {
  const digits = onlyDigits(value)
  if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  return value || '010-5652-8206'
}

function safePartnerSlug(partner, paramsSlug) {
  return (
    paramsSlug ||
    partner?.partnerSlug ||
    partner?.slug ||
    onlyDigits(partner?.phone) ||
    '01056528206'
  )
}

export default function PartnerShopPackagePage() {
  const partner = usePartner()
  const { partnerSlug } = useParams()
  const [copied, setCopied] = useState(false)

  const slug = safePartnerSlug(partner, partnerSlug)
  const partnerName = partner?.name || partner?.displayName || '플로로탄닌 파트너'
  const phone = onlyDigits(partner?.phone || partnerSlug || '01056528206')
  const phoneDisplay = partner?.phoneDisplay || formatPhone(phone)
  const pagePath = `/p/${slug}/shop-package/${SHARE_TOKEN}`
  const pageUrl = `${SITE}${pagePath}`
  const cardUrl = `${SITE}/p/${slug}`
  const easyUrl = `${SITE}/p/${slug}/easy`

  const sharePayload = useMemo(() => ({
    title: '플로로탄닌 샵 패키지 제안서',
    text: '제품만 파는 샵보다 회복을 제안하는 샵을 위한 플로로탄닌 파트너스 샵 패키지 제안서입니다.',
    url: pageUrl,
  }), [pageUrl])

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.prompt('샵 패키지 제안 링크를 복사해 주세요.', pageUrl)
    }
  }

  async function shareLink() {
    if (navigator.share) {
      try {
        await navigator.share(sharePayload)
        return
      } catch {
        // 공유창 취소는 링크 복사로 이어진다.
      }
    }
    copyLink()
  }

  return (
    <div className="min-h-screen bg-[#fffdf7] text-[#102015]">
      <SEOHead
        title="샵 패키지 제안서 | 플로로탄닌 파트너스"
        description="파트너가 직접 공유한 플로로탄닌 샵 패키지 제안 페이지입니다. 660만 원 샵 패키지, 지역 검색 구조, 상담 연결, 운영 지원 흐름을 안내합니다."
        canonical={pageUrl}
        ogUrl={pageUrl}
        ogImage={`${SITE}/partner/shop-package/shop-package-01.png`}
        ogImageAlt="플로로탄닌 파트너스 660만 원 샵 패키지 모바일 제안서"
        noindex={true}
      />

      <section className="relative overflow-hidden border-b border-[#e8dcc3] bg-[#fffdf7]">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              'linear-gradient(115deg, rgba(255,253,247,0.96) 0%, rgba(255,253,247,0.92) 48%, rgba(250,244,229,0.64) 100%)',
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1fr_410px] md:px-8 md:py-14">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#b88923] bg-white px-3 py-1.5 text-xs font-black tracking-[0.14em] text-[#09442c]">
              <Lock size={14} />
              PARTNER PRIVATE PROPOSAL
            </div>

            <p className="mb-3 text-sm font-black text-[#a06f10]">
              {partnerName} 파트너가 공유한 플로로탄닌 샵 패키지
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-[#071b12] md:text-5xl">
              이제는 제품만 파는 샵보다
              <span className="block text-[#0b4a30]">회복을 제안하는 샵이 선택받습니다</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-[#4b5b52] md:text-lg">
              AI 시대, 고객은 좋은 제품만 보지 않습니다. 검색되고, 이해되고, 신뢰되는 샵을 찾습니다.
              플로로탄닌 파트너스는 제품, 콘텐츠, 지역 검색 구조, 상담 연결까지 함께 제안합니다.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border-2 border-[#0b4a30] bg-white p-4 shadow-sm">
                <p className="text-xs font-black text-[#6d7a71]">도입 패키지</p>
                <p className="mt-1 text-3xl font-black text-[#063f2a]">660만 원</p>
              </div>
              <div className="rounded-lg border border-[#d0b06a] bg-[#fffaf0] p-4 shadow-sm">
                <p className="text-xs font-black text-[#6d7a71]">판매 시 공급가 기준</p>
                <p className="mt-1 text-3xl font-black text-[#9a6a0c]">약 1,200만 원</p>
              </div>
              <div className="rounded-lg border border-[#d0b06a] bg-[#063f2a] p-4 text-white shadow-sm">
                <p className="text-xs font-black text-[#f4d991]">마진 구조</p>
                <p className="mt-1 text-3xl font-black">약 50%</p>
              </div>
            </div>

            <p className="mt-3 text-xs font-semibold leading-6 text-[#7a6a52]">
              위 수치는 판매 시 공급가 기준 예시이며 부가가치세 별도 기준입니다. 실제 매출과 수익은 샵의 운영 방식, 판매량, 상담 흐름에 따라 달라질 수 있습니다.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${phone}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#063f2a] px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-950/15"
              >
                <Phone size={18} />
                상담 전화 연결
              </a>
              <a
                href={`sms:${phone}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-[#0b4a30] bg-white px-5 py-3 text-sm font-black text-[#063f2a]"
              >
                <MessageCircle size={18} />
                문자로 문의하기
              </a>
              <button
                type="button"
                onClick={shareLink}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#d8c18a] bg-[#fff8e5] px-5 py-3 text-sm font-black text-[#8a620d]"
              >
                <Share2 size={18} />
                링크 공유
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-bold">
              <Link to={`/p/${slug}`} className="inline-flex items-center gap-1.5 text-[#0b4a30] underline underline-offset-4">
                전자명함 보기 <ExternalLink size={14} />
              </Link>
              <Link to={`/p/${slug}/easy`} className="inline-flex items-center gap-1.5 text-[#0b4a30] underline underline-offset-4">
                플로로탄닌 쉽게 알아보기 <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          <div className="self-start md:self-center">
            <div className="rounded-lg border border-[#d8c18a] bg-white p-3 shadow-2xl shadow-[#0b2f1f]/10">
              <img
                src="/partner/shop-package/shop-package-01.png"
                alt="플로로탄닌 파트너스 샵 패키지 모바일 제안서 대표 이미지"
                className="w-full rounded-md border border-[#efe4cb]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 md:grid-cols-3 md:px-8">
          {[
            { icon: Wallet, title: '추가 수익', body: '기존 고객에게 자연스럽게 소개하고 부가수익을 만들 수 있습니다.' },
            { icon: MapPin, title: '지역 검색 노출', body: '우리 샵이 지역에서 더 잘 보이도록 기본 구조를 잡아드립니다.' },
            { icon: Handshake, title: '고객 신뢰 상승', body: '회복 중심 설명과 콘텐츠로 상담 연결이 쉬워집니다.' },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-[#e2d6bd] bg-[#fffdf7] p-5">
              <item.icon size={30} className="mb-4 text-[#0b4a30]" />
              <h2 className="text-xl font-black text-[#071b12]">{item.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-7 text-[#59645f]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e8dcc3] bg-[#fbf7ed] py-10">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-6">
            <p className="text-xs font-black tracking-[0.18em] text-[#a06f10]">WHY NOW</p>
            <h2 className="mt-2 text-3xl font-black text-[#071b12]">왜 지금 시작해야 할까요?</h2>
            <p className="mt-3 max-w-2xl text-base font-semibold leading-8 text-[#58645e]">
              안티에이징도, 웰니스도, 결국 고객은 “내 몸이 다시 균형을 찾을 수 있는가”를 묻습니다.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {reasons.map((item, index) => (
              <div key={item.title} className="rounded-lg border border-[#e0cfaa] bg-white p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#063f2a] text-sm font-black text-white">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <item.icon size={30} className="text-[#a06f10]" />
                </div>
                <h3 className="text-xl font-black leading-7 text-[#071b12]">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#59645f]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#063f2a] py-9 text-white">
        <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
          <Leaf size={28} className="mx-auto mb-3 text-[#f0c45c]" />
          <p className="text-2xl font-black leading-9 md:text-3xl">
            좋은 제품 + 검색되는 구조 + 회복의 관점 = 오래가는 샵
          </p>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-6 text-center">
            <p className="text-xs font-black tracking-[0.18em] text-[#a06f10]">PARTNER SUPPORT</p>
            <h2 className="mt-2 text-3xl font-black text-[#071b12]">파트너가 받는 지원</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-5">
            {supportItems.map((item, index) => (
              <div key={item.label} className="rounded-lg border border-[#e2d6bd] bg-[#fffdf7] p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#063f2a] px-3 py-1 text-xs font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                  <item.icon size={30} className="text-[#0b4a30]" />
                </div>
                <p className="text-xs font-black text-[#a06f10]">{item.label}</p>
                <h3 className="mt-2 text-lg font-black leading-7 text-[#071b12]">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#59645f]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8dcc3] bg-[#fbf7ed] py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-[0.92fr_1.08fr] md:px-8">
          <div>
            <p className="text-xs font-black tracking-[0.18em] text-[#a06f10]">RECOMMENDED</p>
            <h2 className="mt-2 text-3xl font-black text-[#071b12]">이런 샵·센터에 특히 추천합니다</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-[#59645f]">
              이미 고객과 만나는 공간이라면, 단순 제품 판매보다 상담과 신뢰가 남는 구조가 더 중요합니다.
            </p>
          </div>
          <div className="grid gap-3">
            {recommendedShops.map((text) => (
              <div key={text} className="flex items-start gap-3 rounded-lg border border-[#e2d6bd] bg-white px-4 py-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#0b4a30]" />
                <p className="text-sm font-black leading-7 text-[#24362d]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.18em] text-[#a06f10]">MOBILE PROPOSAL</p>
              <h2 className="mt-2 text-3xl font-black text-[#071b12]">모바일로 바로 보여주는 4장 제안서</h2>
            </div>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#d8c18a] bg-[#fff8e5] px-4 py-2 text-sm font-black text-[#8a620d]"
            >
              <Copy size={17} />
              {copied ? '복사 완료' : '제안 링크 복사'}
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {proposalImages.map((image, index) => (
              <figure key={image.src} className="rounded-lg border border-[#e2d6bd] bg-[#fffdf7] p-3 shadow-sm">
                <img src={image.src} alt={image.alt} className="w-full rounded-md border border-[#efe4cb]" loading={index === 0 ? 'eager' : 'lazy'} />
                <figcaption className="mt-3 text-center text-xs font-black text-[#6d7a71]">{index + 1} / 4</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071b12] py-10 text-white">
        <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
          <Sparkles size={30} className="mx-auto mb-4 text-[#f0c45c]" />
          <h2 className="text-3xl font-black leading-tight">샵의 수익을 더하고, 고객에게는 회복의 관점을 전하세요</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-7 text-[#dce7df]">
            제품 설명, 상담 연결, 지역 검색 구조까지 함께 준비하면 고객은 더 쉽게 이해하고 더 편하게 문의합니다.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={`tel:${phone}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#f0c45c] px-5 py-3 text-sm font-black text-[#071b12]"
            >
              <Phone size={18} />
              {phoneDisplay} 상담 연결
            </a>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#f0c45c] px-5 py-3 text-sm font-black text-[#f0c45c]"
            >
              <Copy size={18} />
              {copied ? '링크 복사 완료' : '제안 링크 복사'}
            </button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-bold text-[#c5d4ca]">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} /> 검색엔진 색인 제외</span>
            <span className="inline-flex items-center gap-1.5"><Users size={14} /> 링크를 받은 분 전용</span>
            <span className="inline-flex items-center gap-1.5"><Store size={14} /> 샵 상담 제안용</span>
          </div>
          <div className="mt-5 text-xs font-semibold text-[#97aa9d]">
            공유 링크: <span className="break-all text-[#dce7df]">{pageUrl}</span>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm font-bold">
            <a href={cardUrl} className="inline-flex items-center gap-1.5 text-[#f0c45c] underline underline-offset-4">
              파트너 전자명함 <ArrowRight size={14} />
            </a>
            <a href={easyUrl} className="inline-flex items-center gap-1.5 text-[#f0c45c] underline underline-offset-4">
              플로로탄닌 쉽게 알아보기 <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
