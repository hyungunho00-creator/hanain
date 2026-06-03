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
  { label: '도입 패키지', value: '660만 원', helper: '샵 패키지 기준' },
  { label: '판매 시 공급가 기준', value: '약 1,200만 원', helper: '매출 구조 예시' },
  { label: '예상 마진 구조', value: '약 50%', helper: '부가가치세 별도 기준' },
]

const ownerPainPoints = [
  '기존 고객에게 객단가를 올릴 부가 상품이 필요하다',
  '좋은 제품이어도 설명이 길어지면 판매가 멈춘다',
  '우리 지역에서 먼저 보이고 먼저 문의받는 구조가 필요하다',
  '샵 분위기를 해치지 않는 프리미엄 제안이어야 한다',
]

const ownerDecisionCards = [
  {
    icon: Wallet,
    label: '비용 판단',
    title: '660만 원을 비용이 아니라 회수 구조로 봅니다',
    body: '도입 금액, 판매 시 공급가 기준 매출 구조, 예상 마진을 한 화면에서 확인하게 해야 계약 검토가 빨라집니다.',
  },
  {
    icon: Store,
    label: '샵 이미지',
    title: '샵 분위기를 해치지 않는 고급 제안이어야 합니다',
    body: '고객이 받는 인상은 제품만이 아니라 제안서, QR, 웹페이지, 상담 문구까지 합쳐진 전체 경험입니다.',
  },
  {
    icon: Users,
    label: '고객 반응',
    title: '고객이 “어디서 상담받죠?”라고 물을 수 있어야 합니다',
    body: '자료를 읽고 끝나는 구조가 아니라 QR, 전화, 문자, 전자명함으로 바로 상담 흐름이 이어져야 합니다.',
  },
  {
    icon: TrendingUp,
    label: '지역 선점',
    title: '동기반 한 곳만 먼저 세팅되는 구조가 힘입니다',
    body: '같은 상권에 모두 같은 제안을 뿌리면 매력이 떨어집니다. 먼저 계약한 샵의 이름으로 상담 자산을 쌓는 게 핵심입니다.',
  },
]

const productReasons = [
  {
    icon: Leaf,
    title: '고객에게 팔 이유가 분명한 소재',
    body: '플로로탄닌은 감태 등 갈조류에 존재하는 해양 폴리페놀 계열입니다. 낯선 성분이 아니라 항산화, 염증 반응, 밸런스 연구에서 반복적으로 다뤄지는 스토리가 있습니다.',
  },
  {
    icon: HeartPulse,
    title: '피부샵 고객의 관심사와 바로 연결',
    body: '피부, 컨디션, 수면, 스트레스, 장 건강, 생활 리듬처럼 샵 고객이 실제로 묻는 관심사와 자연스럽게 연결됩니다.',
  },
  {
    icon: Sparkles,
    title: '660만 원 제안을 받쳐주는 자료 구조',
    body: '가격만 말하면 부담스럽지만, 전용 웹·QR·제안서·상담 문구가 함께 있으면 “왜 이 패키지인지”를 보여줄 수 있습니다.',
  },
  {
    icon: ShieldCheck,
    title: '과장 없이 고급스럽게 설명 가능',
    body: '치료·완치 표현 없이 연구 기반 건강정보와 생활 관리 관점으로 설명하므로 샵의 신뢰도와 프리미엄 이미지를 지킬 수 있습니다.',
  },
]

const territoryItems = [
  {
    title: '동기반 한 곳 우선 세팅',
    body: '같은 동기반·상권에 모두 똑같은 제안 구조를 뿌리면 가치가 떨어집니다. 먼저 계약한 샵을 중심으로 전용 웹과 QR 구조를 우선 세팅합니다.',
  },
  {
    title: '지역 키워드 선점',
    body: '지역명, 샵 유형, 상담 키워드는 먼저 쌓은 곳이 유리합니다. 검색 자산은 늦게 시작할수록 따라잡기 어렵습니다.',
  },
  {
    title: '샵 이름으로 남는 자료',
    body: '출력 제안서 마지막 장에는 담당자 연락처와 QR이 들어갑니다. 고객은 제품 이름만 보는 게 아니라 “누구에게 문의해야 하는지”까지 기억합니다.',
  },
]

const supportItems = [
  {
    icon: Monitor,
    label: '전용 웹',
    title: '샵 이름으로 열리는 제안 페이지',
    body: '고객이 링크나 QR로 들어왔을 때 샵의 제안처럼 보이는 전용 안내 페이지를 제공합니다.',
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
    body: '제품 설명보다 계약과 판매에 필요한 고객 안내 문장, 질문 대응, 제안 포인트를 정리합니다.',
  },
  {
    icon: Package,
    label: '출력 제안서',
    title: '마지막 장에 연락처·QR 삽입',
    body: '1~3장은 설득 자료로 깔끔하게 보여주고, 마지막 장에서만 담당자 연락처와 QR로 연결합니다.',
  },
  {
    icon: Headphones,
    label: '도입 상담',
    title: '계약 전 운영 방향 정리',
    body: '피부관리실, 에스테틱, 힐링센터, 체형관리실 등 업종별로 도입 포인트를 맞춥니다.',
  },
]

const contractTriggers = [
  {
    label: '마진이 보인다',
    title: '660만 원 도입 → 약 1,200만 원 매출 구조',
    body: '단순 제품 매입이 아니라 판매 시 공급가 기준 약 1,200만 원 구조와 약 50% 마진 포인트를 한눈에 보여줍니다.',
  },
  {
    label: '고객이 다시 온다',
    title: 'QR을 찍으면 우리 샵 제안 페이지로 연결',
    body: '전단지를 받은 고객이 다시 검색하지 않아도 제안 페이지, 상담 버튼, 담당자 연락처로 이어집니다.',
  },
  {
    label: '먼저 잡는다',
    title: '동기반·지역 우선 세팅',
    body: '같은 지역에서 먼저 전용 웹과 상담 키워드를 잡은 샵이 고객 기억에 먼저 남습니다.',
  },
]

const customerResponsePoints = [
  {
    title: '“이건 우리 샵에서 상담받아야겠다”',
    body: '전단지 QR과 제안 페이지가 담당자 명함으로 이어지면 고객이 다시 검색하지 않고 바로 문의할 수 있습니다.',
  },
  {
    title: '“제품 설명이 싸 보이지 않는다”',
    body: '성분만 나열하지 않고 컨디션, 생활 리듬, 피부 관심사와 연결해 프리미엄 상담 소재처럼 보이게 만듭니다.',
  },
  {
    title: '“우리 동네에서 먼저 보이는 샵이 기억난다”',
    body: '지역명과 샵 유형을 담은 전용 웹 흐름은 먼저 시작한 곳일수록 고객 기억에 남기 쉽습니다.',
  },
]

const productProofAngles = [
  '감태 등 갈조류 유래 해양 폴리페놀 계열 소재',
  '항산화, 염증 반응, 대사 밸런스 연구에서 반복적으로 언급되는 성분군',
  '치료·완치 표현 없이 생활 관리와 컨디션 상담으로 설명하기 좋은 구조',
]

const recommendedShops = [
  '뷰티샵 / 피부관리실',
  '에스테틱샵 / 스킨케어룸',
  '힐링센터 / 테라피샵',
  '체형관리실 / 웰니스샵',
  '기존 고객에게 고급 부가 상품을 제안하고 싶은 곳',
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
      <p className="text-xs font-black tracking-[0.2em] text-[#a06f10]">{kicker}</p>
      <h2 className="mt-2 text-3xl font-black leading-tight text-[#071b12] md:text-4xl">{title}</h2>
      {body && <p className="mt-3 text-base font-semibold leading-8 text-[#59645f]">{body}</p>}
    </div>
  )
}

function PartnerContact({ partnerName, phoneDisplay, phone, pageUrl, cardUrl }) {
  return (
    <div className="grid gap-4 rounded-lg border-2 border-[#063f2a] bg-white p-4 shadow-lg shadow-[#0b2f1f]/10 sm:grid-cols-[1fr_auto]">
      <div>
        <p className="text-xs font-black tracking-[0.16em] text-[#a06f10]">상담 담당</p>
        <p className="mt-1 text-2xl font-black text-[#071b12]">{partnerName}</p>
        <p className="mt-1 text-xl font-black text-[#063f2a]">{phoneDisplay}</p>
        <p className="mt-2 break-all text-xs font-semibold leading-5 text-[#607166]">제안 링크: {pageUrl}</p>
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
            <p className="text-xs font-black tracking-[0.16em] text-[#a06f10]">상담 및 계약 문의</p>
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
      window.prompt('샵 패키지 제안 링크를 복사해 주세요.', pageUrl)
    }
  }

  async function shareLink() {
    const payload = {
      title: '플로로탄닌 샵 패키지 제안서',
      text: `${partnerName} 담당자가 전달드리는 샵 전용 웹·QR·전단지 제안서입니다.`,
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
        title="플로로탄닌 파트너스 샵 패키지 제안서"
        description="초대 링크 전용 플로로탄닌 샵 패키지 제안 페이지입니다."
        canonical={pageUrl}
        ogUrl={pageUrl}
        ogImage={`${SITE}${HERO_IMAGE}`}
        ogImageAlt="프리미엄 샵 상담 장면과 플로로탄닌 파트너스 제안서"
        noindex={true}
      />
      <PrintStyles />

      <section className="shop-no-print border-b border-[#e6d7b3] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3 md:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c18a] bg-[#fff8e5] px-3 py-2 text-xs font-black text-[#7c5a12]">
            <Lock size={14} />
            초대 링크 전용 제안서 · 검색 노출 제외
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
              SHOP PACKAGE PROPOSAL
            </div>
            <h1 className="mt-6 text-4xl font-black leading-[1.08] text-[#071b12] md:text-6xl">
              660만 원 샵 패키지,
              <span className="block text-[#0b4a30]">우리 동기반에서는</span>
              먼저 계약한 샵이 유리합니다
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-bold leading-9 text-[#45584d] md:text-xl">
              제품만 공급받는 구조가 아닙니다. 샵 이름으로 열리는 전용 웹, QR 제안서, 고객 상담 문구, 출력 자료까지 함께 받아 객단가와 재방문 상담을 만드는 계약 패키지입니다.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {topMetrics.map((metric, index) => <MetricCard key={metric.label} {...metric} dark={index === 2} />)}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={shareLink} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#063f2a] px-5 text-sm font-black text-white shadow-lg shadow-[#063f2a]/20">
                <Share2 size={18} />
                계약 제안 링크 공유
              </button>
              <button type="button" onClick={printProposal} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#d8c18a] bg-[#fff8e5] px-5 text-sm font-black text-[#8a620d]">
                <Printer size={18} />
                4장 제안서 출력
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
            <p className="text-xs font-black tracking-[0.2em] text-[#a06f10]">SHOP OWNER DECISION</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-[#071b12] md:text-4xl">
              샵 대표는 설명보다 “계약 후 바로 쓸 수 있는가”를 봅니다
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-[#59645f]">
              좋은 성분 설명만으로는 부족합니다. 대표님은 도입 비용, 마진, 고객 연결, 샵 이미지, 지역 선점 가능성을 한 번에 판단합니다.
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
              <p className="text-xs font-black tracking-[0.16em] text-[#a06f10]">CONTRACT CHECK</p>
              <h3 className="mt-2 text-2xl font-black leading-8 text-[#071b12]">대표님이 바로 따지는 조건</h3>
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
            <p className="text-xs font-black tracking-[0.2em] text-[#f0c45c]">FIRST MOVER ADVANTAGE</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              샵 전용 웹은 먼저 잡은 곳이 유리합니다
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-[#dce7df]">
              같은 상권에서 모두에게 똑같은 웹 구조를 뿌리면 가치가 떨어집니다. 먼저 계약한 샵이 자기 이름으로 검색 문구, QR, 제안서, 상담 흐름을 쌓아야 합니다.
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
            kicker="WHY PHLOROTANNIN"
            title="제품이 좋아 보여야 660만 원 제안도 설득됩니다"
            body="샵 대표님은 고객에게 설명할 수 있는 제품인지 봅니다. 플로로탄닌은 소재 스토리, 생활 관리 관점, 고급 제안 방식이 함께 맞습니다."
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
            <p className="text-xs font-black tracking-[0.16em] text-[#a06f10]">PRODUCT TALKING POINTS</p>
            <h3 className="mt-2 text-2xl font-black leading-8 text-[#071b12]">고객에게 이렇게 설명할 수 있어야 판매가 자연스럽습니다</h3>
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
            kicker="CONTRACT POINT"
            title="계약하고 싶어지는 포인트는 세 가지입니다"
            body="샵 대표가 바로 계산할 수 있게 마진, 고객 연결, 지역 선점 구조를 먼저 보여줘야 합니다."
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
            <p className="text-xs font-black tracking-[0.16em] text-[#f0c45c]">CUSTOMER RESPONSE FLOW</p>
            <h3 className="mt-2 text-2xl font-black leading-8">고객이 다시 문의하게 되는 흐름까지 보여줍니다</h3>
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
            kicker="WHAT THE SHOP GETS"
            title="계약하면 샵이 바로 받는 패키지"
            body="제품만 받는 게 아니라, 대표님이 고객에게 보여주고 말하고 공유하고 문의받을 수 있는 세트를 받습니다."
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
            <p className="text-xs font-black tracking-[0.18em] text-[#a06f10]">RECOMMENDED</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-[#071b12]">이런 샵·센터에 특히 추천합니다</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-[#59645f]">
              이미 고객과 만나는 공간이라면 제품보다 “상담 이유”가 더 중요합니다. 플로로탄닌은 샵의 고급 부가 상담 소재로 쓰기 좋습니다.
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
              <p className="text-xs font-black tracking-[0.18em] text-[#a06f10]">PRINTABLE PROPOSAL</p>
              <h2 className="mt-2 text-3xl font-black text-[#071b12]">출력용 4장 제안서</h2>
              <p className="mt-2 text-sm font-bold leading-7 text-[#66766d]">
                1~3장은 계약 판단 자료로만 깔끔하게 보여주고, 마지막 4장에만 담당자 연락처와 QR을 넣습니다.
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
              title="660만 원을 제품값으로 보지 않게 만듭니다"
              subtitle="샵 대표가 보는 건 상품 설명이 아니라, 도입 후 객단가와 고객 상담으로 이어지는 구조입니다."
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
              title="먼저 계약한 샵이 지역 상담 흐름을 선점합니다"
              subtitle="동기반 한 곳 우선 세팅, 지역 키워드, QR 제안서가 함께 쌓이면 고객은 먼저 보이는 샵을 기억합니다."
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
                같은 자료라도, 먼저 계약한 샵 이름과 QR로 남아야 가치가 있습니다
              </div>
            </ProposalSheet>

            <ProposalSheet
              page="3"
              title="제품이 좋아 보여야 계약도 쉬워집니다"
              subtitle="플로로탄닌은 해조류 유래 폴리페놀 스토리와 생활 관리 관점이 있어 샵 고객에게 고급스럽게 제안하기 좋습니다."
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
              title="계약 검토는 여기서 시작하시면 됩니다"
              subtitle="샵 상황에 맞는 도입 방향, 전용 웹 세팅, QR 제안서, 고객 안내 문구를 담당자가 안내드립니다."
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
                  <p className="text-sm font-black tracking-[0.16em] text-[#a06f10]">NEXT STEP</p>
                  <h3 className="mt-2 text-2xl font-black leading-9 text-[#071b12]">
                    상담 주시면 샵 상황에 맞는 계약 조건과 도입 방향을 안내드리겠습니다
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
            플로로탄닌 샵 패키지는 제품 공급이 아니라, 샵이 고객에게 설명하고 공유하고 다시 문의받는 구조를 만드는 제안입니다.
          </p>
          <div className="mx-auto mt-7 max-w-2xl">
            <PartnerContact partnerName={partnerName} phoneDisplay={phoneDisplay} phone={phone} pageUrl={pageUrl} cardUrl={cardUrl} />
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm font-bold">
            <a href={cardUrl} className="inline-flex items-center gap-1.5 text-[#f0c45c] underline underline-offset-4">
              상담 담당자 명함 <ArrowRight size={14} />
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
