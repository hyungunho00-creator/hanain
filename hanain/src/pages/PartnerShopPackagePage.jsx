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
const HERO_IMAGE = '/partner/shop-package/salon-consult-hero.jpg'

const topMetrics = [
  { label: '도입가', value: '660만 원', helper: '샵 패키지 기준' },
  { label: '판매가', value: '1,320만 원', helper: '총 판매가 기준' },
  { label: '예상 마진', value: '약 660만 원', helper: '부가세 별도, 약 50%' },
]

const ownerPainPoints = [
  '기존 고객에게 권할 프리미엄 부가 상품이 생깁니다',
  '우리 샵 이름으로 열리는 전용 페이지가 생깁니다',
  '전단지 QR이 전화·문자 상담으로 바로 이어집니다',
  '동기반 안에서 먼저 시작한 샵으로 기억됩니다',
]

const ownerDecisionCards = [
  {
    icon: Wallet,
    label: '수익 구조',
    title: '660만 원 구성, 1,320만 원 판매가',
    body: '숫자가 먼저 보입니다. 도입가, 판매가, 예상 마진이 명확해야 샵 운영에 붙일 수 있습니다.',
  },
  {
    icon: Store,
    label: '샵 전용 웹',
    title: '우리 샵 이름으로 열리는 페이지',
    body: '고객이 QR을 찍으면 제품 소개가 아니라 우리 샵 페이지가 열립니다. 고객 기억에 샵 이름이 남습니다.',
  },
  {
    icon: Users,
    label: '상담 동선',
    title: '전단지 QR에서 전화·문자까지 바로 연결',
    body: '읽고 끝나는 자료가 아니라 전화, 문자, 전자명함으로 이어지는 고객 동선을 만듭니다.',
  },
  {
    icon: TrendingUp,
    label: '선점 효과',
    title: '동기반 한 곳 우선 세팅',
    body: '같은 동기반에 모두 똑같이 열면 가치가 떨어집니다. 먼저 시작한 샵이 지역 고객의 기억을 잡습니다.',
  },
]

const productReasons = [
  {
    icon: Leaf,
    title: '감태 유래 해양 폴리페놀 스토리',
    body: '고객에게 “왜 이 제품인가”를 짧게 말할 수 있는 소재입니다.',
  },
  {
    icon: HeartPulse,
    title: '피부·컨디션 고객 관심사와 연결',
    body: '피부관리실, 에스테틱, 웰니스 고객이 이미 궁금해하는 주제와 맞습니다.',
  },
  {
    icon: Sparkles,
    title: '전용 웹과 QR까지 포함',
    body: '제품만 들이는 게 아니라 고객에게 보여줄 랜딩페이지와 출력 자료까지 함께 씁니다.',
  },
  {
    icon: ShieldCheck,
    title: '과장 없이 고급스럽게 말할 수 있음',
    body: '치료·완치 표현 없이 건강정보와 생활 관리 관점으로 신뢰를 지킵니다.',
  },
]

const territoryItems = [
  {
    title: '동기반 한 곳 우선 세팅',
    body: '같은 동기반·상권에 모두 똑같이 열면 가치가 떨어집니다. 먼저 시작한 샵을 우선 세팅합니다.',
  },
  {
    title: '지역 키워드 선점',
    body: '지역명, 샵 유형, 상담 키워드는 먼저 쌓은 곳이 유리합니다. 늦게 시작하면 따라잡기 어렵습니다.',
  },
  {
    title: '샵 이름으로 남는 자료',
    body: '마지막 장 연락처와 QR이 전자명함으로 이어집니다. 고객은 어느 샵에 문의할지 바로 압니다.',
  },
]

const supportItems = [
  {
    icon: Monitor,
    label: '전용 웹',
    title: '샵 이름으로 열리는 랜딩페이지',
    body: '고객이 링크나 QR로 들어오면 우리 샵 이름의 전용 페이지가 열립니다.',
  },
  {
    icon: Search,
    label: '지역 선점',
    title: '먼저 보이는 상담 키워드',
    body: '지역명과 샵 유형 중심으로 고객이 검색하고 문의할 수 있는 흐름을 먼저 잡습니다.',
  },
  {
    icon: ClipboardCheck,
    label: '상담 문구',
    title: '대표님이 바로 말할 문장',
    body: '고객에게 바로 말할 핵심 문장, 질문 대응, 상담 포인트를 정리합니다.',
  },
  {
    icon: Package,
    label: '출력 자료',
    title: '마지막 장에 연락처·QR 삽입',
    body: '1~3장은 고객이 읽을 내용만 담고, 마지막 장에서만 연락처와 QR로 연결합니다.',
  },
  {
    icon: Headphones,
    label: '운영 문의',
    title: '샵 상황에 맞춘 시작',
    body: '피부관리실, 에스테틱, 힐링센터, 체형관리실 등 업종별로 시작 포인트를 맞춥니다.',
  },
]

const contractTriggers = [
  {
    label: '수익이 보인다',
    title: '660만 원 도입 → 1,320만 원 판매가 구조',
    body: '샵에서 바로 계산할 수 있는 숫자입니다. 제품값이 아니라 부가 매출 구조로 보입니다.',
  },
  {
    label: '고객이 이어진다',
    title: 'QR을 찍으면 문의 전자명함과 상담 버튼으로 연결',
    body: '전단지를 받은 고객이 다시 검색하지 않아도 바로 문의할 수 있습니다.',
  },
  {
    label: '지역을 먼저 잡는다',
    title: '동기반 한 곳 우선 웹 세팅',
    body: '먼저 시작한 샵이 지역 상담 흐름과 고객 기억을 먼저 가져갑니다.',
  },
]

const customerResponsePoints = [
  {
    title: '“이건 우리 샵에서 상담받아야겠다”',
    body: 'QR이 문의 전자명함과 전화·문자로 이어지면 고객이 바로 움직입니다.',
  },
  {
    title: '“우리 샵에서 먼저 안내받는 느낌이다”',
    body: '전용 웹과 출력 자료가 있으면 단순 공동구매처럼 보이지 않습니다.',
  },
  {
    title: '“우리 동네에서 먼저 보이는 샵이 기억난다”',
    body: '지역명과 샵 유형을 담은 흐름은 먼저 시작한 곳일수록 유리합니다.',
  },
]

const productProofAngles = [
  '감태 등 갈조류 유래 해양 폴리페놀 계열 소재',
  '항산화, 염증 반응, 대사 밸런스 연구에서 반복적으로 언급되는 성분군',
  '치료·완치 표현 없이 생활 관리와 컨디션 상담으로 연결되는 구조',
]

const recommendedShops = [
  '뷰티샵 / 피부관리실',
  '에스테틱샵 / 스킨케어룸',
  '힐링센터 / 테라피샵',
  '체형관리실 / 웰니스샵',
  '기존 고객에게 고급 부가 상품을 더하고 싶은 곳',
  '지역 검색과 온라인 상담 연결을 강화하고 싶은 곳',
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

function MetricCard({ label, value, helper, dark = false }) {
  return (
    <div className={dark ? 'rounded-lg border border-[#d8be78] bg-[#063f2a] p-4 text-white' : 'rounded-lg border border-[#e2d4ad] bg-white p-4'}>
      <p className={dark ? 'text-xs font-black tracking-[0.08em] text-[#f3d57a]' : 'text-xs font-black tracking-[0.08em] text-[#7b6a46]'}>{label}</p>
      <p className={dark ? 'mt-1 text-3xl font-black leading-tight text-white' : 'mt-1 text-3xl font-black leading-tight text-[#063f2a]'}>{value}</p>
      <p className={dark ? 'mt-2 text-xs font-bold text-[#f3e7c3]' : 'mt-2 text-xs font-bold text-[#7a817b]'}>{helper}</p>
    </div>
  )
}

function SectionTitle({ kicker, title, body }) {
  return (
    <div className="mx-auto mb-7 max-w-3xl text-center">
      <p className="text-xs font-black text-[#a06f10]">{kicker}</p>
      <h2 className="mt-2 text-3xl font-black leading-tight text-[#071b12] md:text-4xl">{title}</h2>
      {body && <p className="mt-3 text-base font-semibold leading-8 text-[#59645f]">{body}</p>}
    </div>
  )
}

function PartnerContact({ partnerName, phoneDisplay, phone, pageUrl, cardUrl }) {
  return (
    <div className="grid gap-4 rounded-lg border-2 border-[#063f2a] bg-white p-4 shadow-lg shadow-[#0b2f1f]/10 sm:grid-cols-[1fr_auto]">
      <div>
        <p className="text-xs font-black tracking-[0.16em] text-[#a06f10]">샵 패키지 문의</p>
        <p className="mt-1 text-2xl font-black text-[#071b12]">{partnerName}</p>
        <p className="mt-1 text-xl font-black text-[#063f2a]">{phoneDisplay}</p>
        <p className="mt-2 break-all text-xs font-semibold leading-5 text-[#607166]">공유 링크: {pageUrl}</p>
        <p className="break-all text-xs font-semibold leading-5 text-[#607166]">전자명함: {cardUrl}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-md border border-[#d8c18a] bg-white p-2">
          <QRCodeCanvas value={pageUrl} size={96} includeMargin={false} fgColor="#063f2a" />
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

function ProposalSheet({ page, title, subtitle, children, partnerName, phoneDisplay, pageUrl, showContact = false }) {
  return (
    <article className={['proposal-sheet relative overflow-hidden rounded-lg border-2 border-[#d8c18a] bg-[#fffdf7] shadow-lg shadow-[#0b2f1f]/10', showContact ? 'has-contact' : ''].join(' ')}>
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
      {showContact && (
        <div className="proposal-sheet-footer grid gap-3 border-t border-[#e5d4aa] bg-white px-5 py-4 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-black tracking-[0.16em] text-[#a06f10]">샵 패키지 문의</p>
            <p className="mt-1 text-lg font-black text-[#071b12]">{partnerName} · {phoneDisplay}</p>
            <p className="mt-1 break-all text-xs font-bold text-[#66766d]">{pageUrl}</p>
          </div>
          <div className="rounded-md border border-[#d8c18a] bg-white p-2">
            <QRCodeCanvas value={pageUrl} size={74} includeMargin={false} fgColor="#063f2a" />
          </div>
        </div>
      )}
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
        .proposal-sheet-body { padding: 9mm !important; }
        .proposal-sheet.has-contact .proposal-sheet-body { padding-bottom: 36mm !important; }
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
      window.prompt('샵 패키지 링크를 복사해 주세요.', pageUrl)
    }
  }

  async function shareLink() {
    const payload = {
      title: '플로로탄닌 샵 패키지',
      text: `샵 전용 웹, QR 자료, 660만 원 구성과 1,320만 원 판매가 구조를 확인해보세요.`,
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
    <div className="shop-print-root min-h-screen bg-[#f8f5ed]">
      <SEOHead
        title="플로로탄닌 샵 패키지"
        description="샵 대표를 위한 비공개 플로로탄닌 샵 패키지 랜딩페이지입니다."
        canonical={pageUrl}
        ogUrl={pageUrl}
        ogImage={`${SITE}${HERO_IMAGE}`}
        ogImageAlt="프리미엄 샵 상담 장면과 플로로탄닌 샵 패키지"
        noindex={true}
      />
      <PrintStyles />

      <section className="shop-no-print border-b border-[#e6d7b3] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3 md:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c18a] bg-[#fff8e5] px-3 py-2 text-xs font-black text-[#7c5a12]">
            <Lock size={14} />
            초대 링크 전용 · 검색 노출 제외
          </div>
          <a href={easyUrl} className="inline-flex items-center gap-1.5 text-xs font-black text-[#063f2a] underline underline-offset-4">
            플로로탄닌 쉽게 알아보기
            <ArrowRight size={14} />
          </a>
        </div>
      </section>

      <section
        className="shop-no-print relative min-h-[720px] overflow-hidden bg-[#f5efe3]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(255,253,247,0.98) 0%, rgba(255,253,247,0.92) 39%, rgba(255,253,247,0.45) 61%, rgba(255,253,247,0.06) 100%), url("${HERO_IMAGE}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto flex min-h-[720px] max-w-7xl items-center px-5 py-14 md:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#063f2a] px-4 py-2 text-xs font-black tracking-[0.14em] text-[#f0c45c]">
              <Leaf size={15} />
              샵 대표 전용
            </div>
            <h1 className="mt-6 text-4xl font-black leading-[1.08] text-[#071b12] md:text-6xl">
              우리 샵 이름으로
              <span className="block text-[#0b4a30]">먼저 열리는</span>
              플로로탄닌 샵 패키지
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-bold leading-9 text-[#45584d] md:text-xl">
              660만 원 구성으로 1,320만 원 판매가 구조를 만들고, 고객이 QR을 찍으면 우리 샵 이름의 페이지와 상담 버튼으로 바로 연결됩니다.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {topMetrics.map((metric, index) => <MetricCard key={metric.label} {...metric} dark={index === 2} />)}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={shareLink} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#063f2a] px-5 text-sm font-black text-white shadow-lg shadow-[#063f2a]/20">
                <Share2 size={18} />
                링크 공유
              </button>
              <button type="button" onClick={printProposal} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#d8c18a] bg-[#fff8e5] px-5 text-sm font-black text-[#8a620d]">
                <Printer size={18} />
                4장 자료 출력
              </button>
              <button type="button" onClick={copyLink} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#d8c18a] bg-white px-5 text-sm font-black text-[#063f2a]">
                <Copy size={18} />
                {copied ? '복사 완료' : '링크 복사'}
              </button>
            </div>

            <div className="mt-6 max-w-2xl">
              <PartnerContact
                partnerName={partnerName}
                phoneDisplay={phoneDisplay}
                phone={phone}
                pageUrl={pageUrl}
                cardUrl={cardUrl}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="shop-no-print bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[1fr_0.9fr] md:px-8">
          <div>
            <p className="text-xs font-black text-[#a06f10]">샵 운영에 바로 붙이는 구조</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-[#071b12] md:text-4xl">
              제품만 들이는 게 아니라, 고객 동선을 함께 가져갑니다
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-[#59645f]">
              고객이 자료를 보고, QR을 찍고, 우리 샵 페이지에서 전화·문자로 이어지는 흐름까지 함께 시작합니다.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {ownerDecisionCards.map((item) => (
                <div key={item.label} className="rounded-lg border border-[#e2d6bd] bg-[#fffdf8] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-black tracking-[0.12em] text-[#a06f10]">{item.label}</p>
                    <item.icon size={28} className="text-[#0b4a30]" />
                  </div>
                  <h3 className="mt-3 text-lg font-black leading-7 text-[#071b12]">{item.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-[#59645f]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-[#e2d6bd] bg-[#fffdf8] shadow-xl shadow-[#0b2f1f]/10">
            <img src={HERO_IMAGE} alt="샵 대표가 고객에게 프리미엄 제품을 상담하는 장면" className="h-72 w-full object-cover md:h-96" />
            <div className="p-5">
              <p className="text-xs font-black text-[#a06f10]">이런 고민에 맞습니다</p>
              <h3 className="mt-2 text-2xl font-black leading-8 text-[#071b12]">샵 매출에 붙일 이유가 분명해집니다</h3>
              <div className="mt-4 grid gap-3">
                {ownerPainPoints.map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-[#0b4a30]" />
                    <p className="text-sm font-black leading-6 text-[#24362d]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shop-no-print bg-[#063f2a] py-12 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-8">
          <div>
            <p className="text-xs font-black text-[#f0c45c]">지역 선점 구조</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              같은 동기반이라면 먼저 시작한 샵이 유리합니다
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-[#dce7df]">
              같은 상권에 모두 같은 웹을 열면 매력이 떨어집니다. 먼저 시작한 샵 이름으로 전용 웹, QR, 지역 상담 흐름을 쌓는 게 핵심입니다.
            </p>
          </div>
          <div className="grid gap-4">
            {territoryItems.map((item, index) => (
              <div key={item.title} className="rounded-lg border border-[#caa85a] bg-white p-5 text-[#071b12]">
                <p className="text-xs font-black text-[#a06f10]">0{index + 1}</p>
                <h3 className="mt-1 text-xl font-black">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-[#59645f]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-no-print bg-[#fbf7ed] py-12">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionTitle
            kicker="제품 선택 포인트"
            title="샵 고객이 자연스럽게 관심 가질 소재여야 합니다"
            body="감태 유래 해양 폴리페놀 스토리와 피부·컨디션 관심사가 연결되면, 기존 고객에게도 프리미엄 부가 상품으로 말하기 좋습니다."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {productReasons.map((item) => (
              <div key={item.title} className="rounded-lg border border-[#e2d6bd] bg-white p-6">
                <item.icon size={32} className="mb-4 text-[#0b4a30]" />
                <h3 className="text-xl font-black leading-7 text-[#071b12]">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#59645f]">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg border-2 border-[#063f2a] bg-white p-6">
            <p className="text-xs font-black text-[#a06f10]">상담 포인트</p>
            <h3 className="mt-2 text-2xl font-black leading-8 text-[#071b12]">고객이 궁금해할 포인트가 바로 보입니다</h3>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {productProofAngles.map((text) => (
                <div key={text} className="rounded-lg bg-[#f8f5ed] px-4 py-3">
                  <p className="text-sm font-black leading-7 text-[#24362d]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shop-no-print bg-white py-12">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionTitle
            kicker="샵에서 바로 보이는 장점"
            title="판매가, 고객 동선, 지역 선점이 한 화면에 잡힙니다"
            body="단순 제품 매입이 아니라 우리 샵 이름으로 고객에게 남는 구조입니다."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {contractTriggers.map((item) => (
              <div key={item.label} className="rounded-lg border border-[#e2d6bd] bg-[#fffdf8] p-6">
                <p className="text-xs font-black tracking-[0.14em] text-[#a06f10]">{item.label}</p>
                <h3 className="mt-3 text-xl font-black leading-7 text-[#071b12]">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#59645f]">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-lg bg-[#063f2a] p-6 text-white">
            <p className="text-xs font-black text-[#f0c45c]">고객 연결 흐름</p>
            <h3 className="mt-2 text-2xl font-black leading-8">고객은 전단지에서 우리 샵 페이지로 이동합니다</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {customerResponsePoints.map((item) => (
                <div key={item.title} className="rounded-lg border border-[#caa85a] bg-white/95 p-5 text-[#071b12]">
                  <h4 className="text-lg font-black leading-7">{item.title}</h4>
                  <p className="mt-2 text-sm font-semibold leading-7 text-[#59645f]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shop-no-print bg-[#f8f5ed] py-12">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionTitle
            kicker="도입 후 바로 활용"
            title="샵에서 바로 쓰는 구성"
            body="제품, 전용 웹, QR 자료, 상담 문구, 출력물까지 바로 고객에게 보여줄 수 있게 묶습니다."
          />
          <div className="grid gap-4 lg:grid-cols-5">
            {supportItems.map((item, index) => (
              <div key={item.label} className="rounded-lg border border-[#e2d6bd] bg-white p-5">
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

      <section className="shop-no-print bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-8">
          <div>
            <p className="text-xs font-black text-[#a06f10]">추천 샵</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-[#071b12]">이런 샵·센터에 특히 추천합니다</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-[#59645f]">
              이미 고객과 만나는 공간이라면 “무엇을 더 권할지”가 매출 차이를 만듭니다. 이 패키지는 고급 부가 상품을 바로 시작하려는 샵에 맞습니다.
            </p>
          </div>
          <div className="grid gap-3">
            {recommendedShops.map((text) => (
              <div key={text} className="flex items-start gap-3 rounded-lg border border-[#e2d6bd] bg-[#fffdf8] px-4 py-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#0b4a30]" />
                <p className="text-sm font-black leading-7 text-[#24362d]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="proposal-print-wrap bg-white py-12">
        <div className="proposal-print-inner mx-auto max-w-5xl px-5 md:px-8">
          <div className="shop-no-print mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black text-[#a06f10]">출력용 자료</p>
              <h2 className="mt-2 text-3xl font-black text-[#071b12]">출력용 4장 자료</h2>
              <p className="mt-2 text-sm font-bold leading-7 text-[#66766d]">
                1~3장은 숫자와 선점 구조만 강하게 보여주고, 마지막 4장에만 문의 연락처와 QR을 넣습니다.
              </p>
            </div>
            <button
              type="button"
              onClick={printProposal}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#d8c18a] bg-[#fff8e5] px-4 py-2 text-sm font-black text-[#8a620d]"
            >
              <Printer size={17} />
              4장 자료 출력
            </button>
          </div>

          <div className="proposal-print-list grid gap-6">
            <ProposalSheet
              page="1"
              title="660만 원 도입, 1,320만 원 판매가 구조"
              subtitle="샵에서 바로 확인할 숫자입니다. 도입가, 판매가, 예상 마진이 명확해야 운영에 붙일 수 있습니다."
              partnerName={partnerName}
              phoneDisplay={phoneDisplay}
              pageUrl={pageUrl}
            >
              <div className="grid gap-5 md:grid-cols-[1fr_0.9fr]">
                <div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {topMetrics.map((metric, index) => <MetricCard key={metric.label} {...metric} dark={index === 2} />)}
                  </div>
                  <div className="mt-5 grid gap-3">
                    {ownerDecisionCards.slice(0, 3).map((item) => (
                      <div key={item.label} className="rounded-lg border border-[#e2d6bd] bg-white px-4 py-3">
                        <p className="text-xs font-black text-[#a06f10]">{item.label}</p>
                        <p className="mt-1 text-sm font-black leading-7 text-[#24362d]">{item.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <img src={HERO_IMAGE} alt="프리미엄 샵 상담 장면" className="h-full min-h-[280px] rounded-lg border border-[#e2d6bd] object-cover" />
              </div>
            </ProposalSheet>

            <ProposalSheet
              page="2"
              title="동기반 한 곳만 먼저 세팅해야 합니다"
              subtitle="같은 상권에 모두 똑같이 열면 가치가 떨어집니다. 먼저 시작한 샵 이름으로 전용 웹과 QR 상담 흐름을 잡습니다."
              partnerName={partnerName}
              phoneDisplay={phoneDisplay}
              pageUrl={pageUrl}
            >
              <div className="grid gap-4 md:grid-cols-3">
                {territoryItems.map((item, index) => (
                  <div key={item.title} className="rounded-lg border border-[#e0cfaa] bg-white p-5">
                    <p className="text-xs font-black text-[#a06f10]">0{index + 1}</p>
                    <h3 className="mt-2 text-lg font-black leading-7 text-[#071b12]">{item.title}</h3>
                    <p className="mt-3 text-sm font-semibold leading-7 text-[#59645f]">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-lg bg-[#063f2a] px-5 py-4 text-center text-xl font-black leading-8 text-[#f0c45c]">
                같은 자료라도, 먼저 시작한 샵 이름과 QR로 남아야 가치가 있습니다
              </div>
            </ProposalSheet>

            <ProposalSheet
              page="3"
              title="고객이 관심 가질 이유가 있어야 합니다"
              subtitle="감태 유래 해양 폴리페놀, 피부·컨디션 관심사, 고급 상담 이미지를 한 번에 보여줄 수 있어야 샵에서 권하기 쉽습니다."
              partnerName={partnerName}
              phoneDisplay={phoneDisplay}
              pageUrl={pageUrl}
            >
              <div className="grid gap-4 md:grid-cols-2">
                {productReasons.map((item) => (
                  <div key={item.title} className="rounded-lg border border-[#e2d6bd] bg-white p-5">
                    <item.icon size={28} className="text-[#0b4a30]" />
                    <h3 className="mt-3 text-lg font-black leading-7 text-[#071b12]">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-[#59645f]">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {productProofAngles.map((text) => (
                  <div key={text} className="rounded-lg bg-[#063f2a] px-4 py-3">
                    <p className="text-sm font-black leading-6 text-[#f0c45c]">{text}</p>
                  </div>
                ))}
              </div>
            </ProposalSheet>

            <ProposalSheet
              page="4"
              title="이제 우리 샵 이름으로 먼저 잡으세요"
              subtitle="샵 패키지 문의는 아래 연락처와 QR로 바로 연결됩니다. 연락처와 QR은 마지막 장에만 넣었습니다."
              partnerName={partnerName}
              phoneDisplay={phoneDisplay}
              pageUrl={pageUrl}
              showContact={true}
            >
              <div className="grid gap-5 md:grid-cols-[1fr_0.9fr]">
                <div className="grid gap-3">
                  {contractTriggers.map((item) => (
                    <div key={item.label} className="rounded-lg border border-[#e2d6bd] bg-white px-4 py-3">
                      <p className="text-xs font-black text-[#a06f10]">{item.label}</p>
                      <p className="mt-2 text-sm font-black leading-7 text-[#24362d]">{item.title}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border-2 border-[#063f2a] bg-[#fff8e5] p-5">
                  <p className="text-sm font-black text-[#a06f10]">상담 연결</p>
                  <h3 className="mt-2 text-2xl font-black leading-9 text-[#071b12]">
                    동기반 우선 세팅 가능 여부와 시작 조건을 바로 확인하세요
                  </h3>
                  <div className="mt-5 flex items-center gap-4">
                    <div className="rounded-md border border-[#d8c18a] bg-white p-2">
                      <QRCodeCanvas value={pageUrl} size={112} includeMargin={false} fgColor="#063f2a" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#66766d]">샵 패키지 문의</p>
                      <p className="mt-1 text-2xl font-black text-[#063f2a]">{partnerName}</p>
                      <p className="mt-1 text-xl font-black text-[#071b12]">{phoneDisplay}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ProposalSheet>
          </div>
        </div>
      </section>

      <section className="shop-no-print bg-[#071b12] py-12 text-white">
        <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
          <Sparkles size={30} className="mx-auto mb-4 text-[#f0c45c]" />
          <h2 className="text-3xl font-black leading-tight md:text-4xl">
            좋은 제품을 좋은 샵 이름으로 남기세요
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-7 text-[#dce7df]">
            플로로탄닌 샵 패키지는 제품 공급을 넘어, 우리 샵 이름으로 고객에게 남고 다시 문의받는 구조입니다.
          </p>
          <div className="mx-auto mt-7 max-w-2xl">
            <PartnerContact partnerName={partnerName} phoneDisplay={phoneDisplay} phone={phone} pageUrl={pageUrl} cardUrl={cardUrl} />
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm font-bold">
            <a href={cardUrl} className="inline-flex items-center gap-1.5 text-[#f0c45c] underline underline-offset-4">
              문의 전자명함 <ArrowRight size={14} />
            </a>
            <a href={easyUrl} className="inline-flex items-center gap-1.5 text-[#f0c45c] underline underline-offset-4">
              플로로탄닌 쉽게 알아보기 <ArrowRight size={14} />
            </a>
            <Link to={pagePath} className="inline-flex items-center gap-1.5 text-[#f0c45c] underline underline-offset-4">
              현재 페이지 링크 <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
