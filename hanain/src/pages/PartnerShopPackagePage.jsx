import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { QRCodeCanvas } from 'qrcode.react'
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  ExternalLink,
  Headphones,
  HeartPulse,
  Leaf,
  Lock,
  MessageCircle,
  Monitor,
  Package,
  Phone,
  Printer,
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

const metrics = [
  { label: '도입 패키지', value: '660만 원', helper: '샵 패키지 기준' },
  { label: '판매 시 공급가 기준', value: '약 1,200만 원', helper: '매출 구조 예시' },
  { label: '마진 구조', value: '약 50%', helper: '부가가치세 별도 기준' },
]

const supportItems = [
  {
    icon: Wallet,
    label: '수익 구조',
    title: '기존 고객에게 자연스럽게 제안',
    body: '제품만 소개하는 방식보다 상담 흐름과 함께 제안할 수 있어 샵의 부가 매출 구조를 만들기 쉽습니다.',
  },
  {
    icon: Monitor,
    label: '전용 페이지',
    title: '샵 소개와 상담 안내 연결',
    body: '고객이 QR이나 링크로 들어왔을 때 파트너 정보, 제품 설명, 문의 버튼을 한 번에 확인할 수 있습니다.',
  },
  {
    icon: Search,
    label: '검색 구조',
    title: '지역 고객이 찾는 흐름 준비',
    body: '지역명, 샵명, 상담 키워드 중심으로 고객이 비교하고 문의할 수 있는 기본 구조를 잡습니다.',
  },
  {
    icon: ClipboardCheck,
    label: '운영 가이드',
    title: '처음 안내할 문구까지 정리',
    body: '블로그, 카페, 인스타, 고객 안내 멘트처럼 바로 쓰기 어려운 초기 문구를 함께 준비합니다.',
  },
  {
    icon: Headphones,
    label: '상담 지원',
    title: '필요할 때 운영 방향 상담',
    body: '샵 상황에 맞춰 어떤 고객에게 어떻게 안내할지, 파트너 운영 흐름을 함께 조정합니다.',
  },
]

const whyItems = [
  {
    icon: Package,
    title: '제품만 설명하면 오래 남기 어렵습니다',
    body: '고객은 가격보다 왜 필요한지, 내 상황과 어떤 관련이 있는지, 누구에게 상담할 수 있는지를 함께 봅니다.',
  },
  {
    icon: Search,
    title: 'AI 시대에는 검색되는 샵이 유리합니다',
    body: '고객은 검색으로 비교하고, 페이지를 읽고, 신뢰가 생겼을 때 문의합니다. 샵도 검색 자산이 필요합니다.',
  },
  {
    icon: HeartPulse,
    title: '피부·컨디션·생활 회복 관점이 강합니다',
    body: '피부만 따로 보지 않고 컨디션, 밸런스, 생활 관리 관점으로 설명할 때 상담 연결이 쉬워집니다.',
  },
  {
    icon: TrendingUp,
    title: '반복 상담은 구조가 만듭니다',
    body: '제품, 콘텐츠, 상담 문구, QR 링크가 함께 쌓이면 단발 판매가 아니라 지속 문의 흐름을 만들 수 있습니다.',
  },
]

const recommendedShops = [
  '뷰티샵 / 피부관리실',
  '힐링센터 / 테라피샵',
  '체형관리실 / 에스테틱샵',
  '기존 고객에게 부가 상품을 자연스럽게 제안하고 싶은 곳',
  '온라인 홍보와 지역 고객 상담 연결을 강화하고 싶은 곳',
  '제품 판매와 브랜드 신뢰를 함께 키우고 싶은 곳',
]

function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '')
}

function formatPhone(value) {
  const digits = onlyDigits(value)
  if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  return String(value || '010-5652-8206')
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

function MetricCard({ label, value, helper }) {
  return (
    <div className="rounded-lg border-2 border-[#d8be78] bg-white p-4 shadow-sm">
      <p className="text-xs font-black tracking-[0.08em] text-[#7b6a46]">{label}</p>
      <p className="mt-1 text-3xl font-black leading-tight text-[#063f2a]">{value}</p>
      <p className="mt-2 text-xs font-bold text-[#7a817b]">{helper}</p>
    </div>
  )
}

function ProductVisual() {
  return (
    <div className="relative min-h-[390px] overflow-hidden rounded-lg border border-[#dec78f] bg-[#fffaf0] p-5 shadow-xl shadow-[#0b2f1f]/10">
      <div className="absolute right-[-48px] top-[-50px] h-44 w-44 rounded-full border border-[#ecd9aa]" />
      <div className="absolute bottom-[-68px] left-[-58px] h-48 w-48 rounded-full border border-[#ecd9aa]" />
      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#063f2a] px-4 py-2 text-xs font-black tracking-[0.12em] text-[#f3c75d]">
            <Leaf size={15} />
            FLORO TANNIN PARTNERS
          </div>
          <h2 className="mt-5 text-3xl font-black leading-tight text-[#071b12]">
            샵 대표님이 바로 이해하는
            <span className="block text-[#0b4a30]">수익 + 검색 + 상담 구조</span>
          </h2>
          <p className="mt-4 text-sm font-bold leading-7 text-[#5f6b62]">
            고정 이미지를 보여주는 페이지가 아니라, 파트너 정보와 QR이 자동으로 들어가는 제안서입니다.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-[1fr_120px] items-end gap-4">
          <div className="space-y-3">
            {['부가수익', '지역 검색 노출', '고객 신뢰 상승'].map((text) => (
              <div key={text} className="flex items-center gap-2 rounded-lg border border-[#e0cfaa] bg-white px-3 py-2 text-sm font-black text-[#22352b]">
                <CheckCircle2 size={17} className="text-[#0b4a30]" />
                {text}
              </div>
            ))}
          </div>
          <div className="relative h-52">
            <div className="absolute bottom-0 right-4 h-44 w-20 rounded-md border-2 border-[#082818] bg-[#063f2a] shadow-xl">
              <div className="mx-auto mt-4 h-7 w-7 rounded-full border border-[#f0c45c]" />
              <div className="mx-auto mt-4 h-16 w-12 rounded-sm border border-[#f0c45c]" />
              <p className="mt-3 text-center text-[10px] font-black leading-3 text-[#f0c45c]">FLORO<br />TANNIN</p>
            </div>
            <div className="absolute bottom-0 left-0 h-28 w-14 rounded-b-lg rounded-t-2xl border-2 border-[#082818] bg-[#103b29] shadow-lg">
              <div className="mx-auto mt-2 h-3 w-8 rounded-full bg-[#d5b35b]" />
              <div className="mx-auto mt-5 h-10 w-8 rounded-sm border border-[#f0c45c]" />
            </div>
            <div className="absolute bottom-28 left-3 h-8 w-8 rounded-full border-2 border-[#d5b35b] bg-[#fff8e5]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function PartnerContact({ partnerName, phoneDisplay, phone, pageUrl, cardUrl }) {
  return (
    <div className="mt-5 grid gap-3 rounded-lg border-2 border-[#063f2a] bg-white p-4 sm:grid-cols-[1fr_auto]">
      <div>
        <p className="text-xs font-black tracking-[0.16em] text-[#a06f10]">PARTNER CONTACT</p>
        <p className="mt-1 text-2xl font-black text-[#071b12]">{partnerName}</p>
        <p className="mt-1 text-xl font-black text-[#063f2a]">{phoneDisplay}</p>
        <p className="mt-2 break-all text-xs font-semibold leading-5 text-[#607166]">제안 링크: {pageUrl}</p>
        <p className="break-all text-xs font-semibold leading-5 text-[#607166]">전자명함: {cardUrl}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-md border border-[#d8c18a] bg-white p-2">
          <QRCodeCanvas value={pageUrl} size={92} includeMargin={false} fgColor="#063f2a" />
        </div>
        <div className="grid gap-2">
          <a href={`tel:${phone}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#063f2a] px-4 text-sm font-black text-white">
            <Phone size={16} />
            전화
          </a>
          <a href={`sms:${phone}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#063f2a] px-4 text-sm font-black text-[#063f2a]">
            <MessageCircle size={16} />
            문자
          </a>
        </div>
      </div>
    </div>
  )
}

function ProposalSheet({ page, title, subtitle, children, partnerName, phoneDisplay, pageUrl }) {
  return (
    <article className="proposal-sheet relative overflow-hidden rounded-lg border-2 border-[#d8c18a] bg-[#fffdf7] shadow-lg shadow-[#0b2f1f]/10">
      <div className="flex items-center justify-between gap-4 bg-[#063f2a] px-5 py-4 text-white">
        <div className="inline-flex items-center gap-2 text-sm font-black text-[#f0c45c]">
          <Leaf size={18} />
          플로로탄닌 파트너스
        </div>
        <div className="rounded-full border border-[#f0c45c] px-3 py-1 text-sm font-black text-[#f0c45c]">{page} / 4</div>
      </div>
      <div className="proposal-sheet-body p-5 md:p-7">
        <h2 className="text-3xl font-black leading-tight text-[#071b12] md:text-4xl">{title}</h2>
        <p className="mt-3 text-base font-bold leading-8 text-[#5b3a16]">{subtitle}</p>
        <div className="mt-5">{children}</div>
      </div>
      <div className="proposal-sheet-footer grid gap-3 border-t border-[#e5d4aa] bg-white px-5 py-4 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xs font-black tracking-[0.16em] text-[#a06f10]">상담 및 제안 담당</p>
          <p className="mt-1 text-lg font-black text-[#071b12]">{partnerName} · {phoneDisplay}</p>
          <p className="mt-1 break-all text-xs font-bold text-[#66766d]">{pageUrl}</p>
        </div>
        <div className="rounded-md border border-[#d8c18a] bg-white p-2">
          <QRCodeCanvas value={pageUrl} size={72} includeMargin={false} fgColor="#063f2a" />
        </div>
      </div>
    </article>
  )
}

function PrintStyles() {
  return (
    <style>{`
      .shop-print-root {
        font-family: Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: #071b12;
      }
      @media print {
        @page { size: A4 portrait; margin: 10mm; }
        html, body, #root { background: #fff !important; }
        .shop-no-print { display: none !important; }
        .shop-print-root { background: #fff !important; }
        .proposal-print-wrap { padding: 0 !important; background: #fff !important; }
        .proposal-print-inner { max-width: none !important; padding: 0 !important; }
        .proposal-print-list { display: block !important; }
        .proposal-sheet {
          width: 190mm !important;
          min-height: 277mm !important;
          margin: 0 auto !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          page-break-after: always;
          break-after: page;
        }
        .proposal-sheet:last-child {
          page-break-after: auto;
          break-after: auto;
        }
        .proposal-sheet-body { padding: 9mm !important; padding-bottom: 36mm !important; }
        .proposal-sheet h2 { font-size: 28px !important; line-height: 1.18 !important; }
        .proposal-sheet-footer {
          position: absolute !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
        }
      }
    `}</style>
  )
}

export default function PartnerShopPackagePage() {
  const partner = usePartner()
  const { partnerSlug } = useParams()
  const [copied, setCopied] = useState(false)

  const partnerInfo = useMemo(() => {
    const slug = safePartnerSlug(partner, partnerSlug)
    const phone = onlyDigits(partner?.phone || partner?.sms || slug || '01056528206') || '01056528206'
    const partnerName = partner?.name || partner?.displayName || '플로로탄닌 파트너스'
    const phoneDisplay = partner?.phoneDisplay || formatPhone(phone)
    const pagePath = `/p/${slug}/shop-package/${SHARE_TOKEN}`

    return {
      slug,
      phone,
      partnerName,
      phoneDisplay,
      pagePath,
      pageUrl: `${SITE}${pagePath}`,
      cardUrl: `${SITE}/p/${slug}`,
      easyUrl: `${SITE}/p/${slug}/easy`,
    }
  }, [partner, partnerSlug])

  const {
    phone,
    partnerName,
    phoneDisplay,
    pagePath,
    pageUrl,
    cardUrl,
    easyUrl,
  } = partnerInfo

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      window.prompt('샵 패키지 제안 링크를 복사해 주세요.', pageUrl)
    }
  }

  async function shareLink() {
    const payload = {
      title: '플로로탄닌 샵 패키지 제안서',
      text: `${partnerName} 파트너가 전달드리는 샵 패키지 제안서입니다.`,
      url: pageUrl,
    }

    if (navigator.share) {
      try {
        await navigator.share(payload)
        return
      } catch {
        return
      }
    }
    await copyLink()
  }

  function printProposal() {
    window.print()
  }

  return (
    <div className="shop-print-root min-h-screen bg-[#f7f3ea]">
      <SEOHead
        title="플로로탄닌 파트너스 샵 패키지 제안서"
        description="파트너 공유 전용 플로로탄닌 샵 패키지 제안 페이지입니다."
        canonical={pageUrl}
        ogUrl={pageUrl}
        ogImage={`${SITE}/partner/shop-package/shop-package-01.png`}
        ogImageAlt="플로로탄닌 파트너스 샵 패키지 제안서 미리보기"
        noindex={true}
      />
      <PrintStyles />

      <section className="shop-no-print border-b border-[#e6d7b3] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 md:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c18a] bg-[#fff8e5] px-3 py-2 text-xs font-black text-[#7c5a12]">
            <Lock size={14} />
            파트너 공유 전용 · 검색 노출 제외
          </div>
          <Link to={`/p/${partnerInfo.slug}/inforoom`} className="inline-flex items-center gap-1.5 text-xs font-black text-[#063f2a] underline underline-offset-4">
            정보방으로 돌아가기
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="shop-no-print bg-[#fffdf7] py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[1.05fr_0.95fr] md:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#063f2a] px-4 py-2 text-xs font-black tracking-[0.14em] text-[#f0c45c]">
              <Leaf size={15} />
              SHOP PACKAGE PROPOSAL
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight text-[#071b12] md:text-6xl">
              제품만 파는 샵보다
              <span className="block text-[#0b4a30]">상담으로 이어지는 샵이</span>
              선택받습니다
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-bold leading-9 text-[#4f5f55]">
              660만 원 샵 패키지를 단순 상품 제안이 아니라, 고객이 검색하고 이해하고 문의하는 구조로 보여주는 파트너 전용 제안서입니다.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
            </div>

            <PartnerContact
              partnerName={partnerName}
              phoneDisplay={phoneDisplay}
              phone={phone}
              pageUrl={pageUrl}
              cardUrl={cardUrl}
            />

            <div className="mt-5 flex flex-wrap gap-3">
              <a href={`tel:${phone}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#063f2a] px-5 text-sm font-black text-white shadow-lg shadow-[#063f2a]/20">
                <Phone size={18} />
                바로 문의하기
              </a>
              <button type="button" onClick={shareLink} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#d8c18a] bg-white px-5 text-sm font-black text-[#063f2a]">
                <Share2 size={18} />
                모바일로 제안하기
              </button>
              <button type="button" onClick={printProposal} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#d8c18a] bg-[#fff8e5] px-5 text-sm font-black text-[#8a620d]">
                <Printer size={18} />
                출력용 전단지
              </button>
              <button type="button" onClick={copyLink} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#d8c18a] bg-white px-5 text-sm font-black text-[#063f2a]">
                <Copy size={18} />
                {copied ? '복사 완료' : '링크 복사'}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold text-[#6d7a71]">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} /> noindex 비공개 제안 페이지</span>
              <span className="inline-flex items-center gap-1.5"><Users size={14} /> 파트너 정보 자동 삽입</span>
              <span className="inline-flex items-center gap-1.5"><Store size={14} /> 샵·센터 제안용</span>
            </div>
          </div>

          <ProductVisual />
        </div>
      </section>

      <section className="shop-no-print bg-white py-10">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-6 text-center">
            <p className="text-xs font-black tracking-[0.18em] text-[#a06f10]">WHY NOW</p>
            <h2 className="mt-2 text-3xl font-black text-[#071b12]">샵 대표님이 계약하고 싶어지는 이유</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {whyItems.map((item, index) => (
              <div key={item.title} className="rounded-lg border border-[#e2d6bd] bg-[#fffdf7] p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#063f2a] px-3 py-1 text-xs font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                  <item.icon size={30} className="text-[#a06f10]" />
                </div>
                <h3 className="text-lg font-black leading-7 text-[#071b12]">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#59645f]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-no-print bg-[#063f2a] py-9 text-white">
        <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
          <Sparkles size={28} className="mx-auto mb-3 text-[#f0c45c]" />
          <p className="text-2xl font-black leading-9 md:text-3xl">
            좋은 제품 + 검색되는 구조 + 회복 관점 상담 = 오래가는 샵
          </p>
        </div>
      </section>

      <section className="shop-no-print bg-white py-10">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-6 text-center">
            <p className="text-xs font-black tracking-[0.18em] text-[#a06f10]">PARTNER SUPPORT</p>
            <h2 className="mt-2 text-3xl font-black text-[#071b12]">파트너가 받는 실제 지원</h2>
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

      <section className="shop-no-print border-y border-[#e8dcc3] bg-[#fbf7ed] py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-[0.92fr_1.08fr] md:px-8">
          <div>
            <p className="text-xs font-black tracking-[0.18em] text-[#a06f10]">RECOMMENDED</p>
            <h2 className="mt-2 text-3xl font-black text-[#071b12]">이런 샵·센터에 특히 추천합니다</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-[#59645f]">
              고객과 이미 만나는 공간이라면 단순 제품 판매보다 상담과 신뢰가 남는 구조가 더 중요합니다.
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

      <section className="proposal-print-wrap bg-white py-10">
        <div className="proposal-print-inner mx-auto max-w-5xl px-5 md:px-8">
          <div className="shop-no-print mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.18em] text-[#a06f10]">PRINTABLE PROPOSAL</p>
              <h2 className="mt-2 text-3xl font-black text-[#071b12]">파트너 정보가 자동 삽입되는 출력용 4장 제안서</h2>
              <p className="mt-2 text-sm font-bold leading-7 text-[#66766d]">
                아래 4장은 고정 이미지가 아니라 실제 HTML 출력물입니다. 인쇄하면 파트너명, 연락처, 제안 QR이 각 장 하단에 들어갑니다.
              </p>
            </div>
            <button
              type="button"
              onClick={printProposal}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#d8c18a] bg-[#fff8e5] px-4 py-2 text-sm font-black text-[#8a620d]"
            >
              <Printer size={17} />
              4장 전단지 출력
            </button>
          </div>

          <div className="proposal-print-list grid gap-6">
            <ProposalSheet
              page="1"
              title="제품만 파는 샵보다 상담으로 이어지는 샵이 선택받습니다"
              subtitle="AI 시대, 고객은 좋은 제품만 보지 않습니다. 검색되고, 이해되고, 바로 문의할 수 있는 샵을 찾습니다."
              partnerName={partnerName}
              phoneDisplay={phoneDisplay}
              pageUrl={pageUrl}
            >
              <div className="grid gap-4 md:grid-cols-[1fr_260px]">
                <div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
                  </div>
                  <div className="mt-5 grid gap-3">
                    {[
                      '기존 고객에게 자연스럽게 부가 상품을 제안할 수 있습니다.',
                      '지역 검색과 상담 연결 구조를 함께 세팅합니다.',
                      '제품 설명보다 회복 관점의 콘텐츠로 신뢰를 쌓습니다.',
                    ].map((text) => (
                      <div key={text} className="flex items-start gap-3 rounded-lg border border-[#e2d6bd] bg-white px-4 py-3">
                        <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#0b4a30]" />
                        <p className="text-sm font-black leading-7 text-[#24362d]">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <ProductVisual />
              </div>
            </ProposalSheet>

            <ProposalSheet
              page="2"
              title="왜 지금 시작해야 할까요?"
              subtitle="안티에이징도, 웰니스도, 결국 고객은 몸 전체의 균형과 생활 회복 관점을 찾습니다."
              partnerName={partnerName}
              phoneDisplay={phoneDisplay}
              pageUrl={pageUrl}
            >
              <div className="grid gap-4 md:grid-cols-2">
                {whyItems.map((item, index) => (
                  <div key={item.title} className="rounded-lg border border-[#e0cfaa] bg-white p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#063f2a] text-xs font-black text-white">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <item.icon size={25} className="text-[#a06f10]" />
                    </div>
                    <h3 className="text-lg font-black leading-7 text-[#071b12]">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-[#59645f]">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-lg bg-[#063f2a] px-5 py-4 text-center text-xl font-black leading-8 text-[#f0c45c]">
                회복은 한 부위가 아니라 전체 시스템의 이야기입니다
              </div>
            </ProposalSheet>

            <ProposalSheet
              page="3"
              title="파트너가 되면 수익도 만들고 샵도 더 강해집니다"
              subtitle="좋은 제품, 검색되는 시스템, 초기 운영 지원까지 함께 가져가는 구조입니다."
              partnerName={partnerName}
              phoneDisplay={phoneDisplay}
              pageUrl={pageUrl}
            >
              <div className="grid gap-4 md:grid-cols-5">
                {supportItems.map((item, index) => (
                  <div key={item.label} className="rounded-lg border border-[#e2d6bd] bg-white p-4">
                    <span className="rounded-full bg-[#063f2a] px-3 py-1 text-xs font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                    <item.icon size={28} className="mt-4 text-[#0b4a30]" />
                    <p className="mt-3 text-xs font-black text-[#a06f10]">{item.label}</p>
                    <h3 className="mt-2 text-base font-black leading-6 text-[#071b12]">{item.title}</h3>
                    <p className="mt-2 text-xs font-semibold leading-6 text-[#59645f]">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
              </div>
            </ProposalSheet>

            <ProposalSheet
              page="4"
              title="이런 샵·센터에 특히 추천합니다"
              subtitle="제품만 공급받는 제안보다, 고객이 궁금해하고 상담으로 이어지는 구조가 필요한 곳에 맞습니다."
              partnerName={partnerName}
              phoneDisplay={phoneDisplay}
              pageUrl={pageUrl}
            >
              <div className="grid gap-5 md:grid-cols-[1fr_0.9fr]">
                <div className="grid gap-3">
                  {recommendedShops.map((text) => (
                    <div key={text} className="flex items-start gap-3 rounded-lg border border-[#e2d6bd] bg-white px-4 py-3">
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#0b4a30]" />
                      <p className="text-sm font-black leading-7 text-[#24362d]">{text}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="rounded-lg border-2 border-[#063f2a] bg-[#fff8e5] p-5">
                    <p className="text-sm font-black tracking-[0.16em] text-[#a06f10]">NEXT STEP</p>
                    <h3 className="mt-2 text-2xl font-black leading-9 text-[#071b12]">
                      연락 주시면 샘플 체험과 자세한 자료로 안내드리겠습니다
                    </h3>
                    <div className="mt-5 flex items-center gap-4">
                      <div className="rounded-md border border-[#d8c18a] bg-white p-2">
                        <QRCodeCanvas value={pageUrl} size={112} includeMargin={false} fgColor="#063f2a" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#66766d]">상담 담당</p>
                        <p className="mt-1 text-2xl font-black text-[#063f2a]">{partnerName}</p>
                        <p className="mt-1 text-xl font-black text-[#071b12]">{phoneDisplay}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ProposalSheet>
          </div>
        </div>
      </section>

      <section className="shop-no-print bg-[#071b12] py-10 text-white">
        <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
          <Sparkles size={30} className="mx-auto mb-4 text-[#f0c45c]" />
          <h2 className="text-3xl font-black leading-tight">샵의 수익을 더하고, 고객에게는 회복 관점을 전하세요</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-7 text-[#dce7df]">
            제품 설명, 상담 연결, 지역 검색 구조까지 함께 준비하면 고객은 더 쉽게 이해하고 더 명확하게 문의합니다.
          </p>
          <PartnerContact partnerName={partnerName} phoneDisplay={phoneDisplay} phone={phone} pageUrl={pageUrl} cardUrl={cardUrl} />
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-bold text-[#c5d4ca]">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} /> 검색엔진 색인 제외</span>
            <span className="inline-flex items-center gap-1.5"><Users size={14} /> 링크를 받은 분 전용</span>
            <span className="inline-flex items-center gap-1.5"><Store size={14} /> 샵 상담 제안서</span>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm font-bold">
            <a href={cardUrl} className="inline-flex items-center gap-1.5 text-[#f0c45c] underline underline-offset-4">
              파트너 전자명함 <ArrowRight size={14} />
            </a>
            <a href={easyUrl} className="inline-flex items-center gap-1.5 text-[#f0c45c] underline underline-offset-4">
              플로로탄닌 쉽게 알아보기 <ArrowRight size={14} />
            </a>
            <Link to={pagePath} className="inline-flex items-center gap-1.5 text-[#f0c45c] underline underline-offset-4">
              제안서 링크 <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
