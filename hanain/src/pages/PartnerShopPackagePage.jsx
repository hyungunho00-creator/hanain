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
  { label: '도입가', value: '660만 원', helper: '제품+웹+QR 구성' },
  { label: '판매가', value: '1,320만 원', helper: '샵 고객 제안가' },
  { label: '예상 마진', value: '약 660만 원', helper: '부가세 별도 기준' },
]

const ownerPainPoints = [
  '관리 후 결제대에서 바로 꺼낼 프리미엄 메뉴가 생깁니다',
  '고객이 QR을 찍으면 제품 회사가 아니라 우리 샵 이름이 먼저 보입니다',
  '전단지와 모바일 링크가 전화·문자·전자명함으로 끊기지 않고 이어집니다',
  '동기반에서 한 곳만 먼저 열리면 “먼저 시작한 샵”으로 기억됩니다',
]

const ownerDecisionCards = [
  {
    icon: Wallet,
    label: '회수 구조',
    title: '660만 원이 재고가 아니라 회수 가능한 구조로 보여야 합니다',
    body: '1,320만 원 판매가와 약 660만 원 예상 마진이 한 화면에서 보여야 샵 운영 숫자로 판단할 수 있습니다.',
  },
  {
    icon: Store,
    label: '고객층',
    title: '이미 돈을 쓰는 고객에게 권하는 프리미엄 부가 상품',
    body: '새 고객을 억지로 모으는 구조가 아니라 관리, 상담, 재방문 고객에게 자연스럽게 붙이는 메뉴입니다.',
  },
  {
    icon: Users,
    label: '샵 이름',
    title: '고객 기억에 남는 건 “어느 샵에서 봤는가”입니다',
    body: 'QR을 찍으면 우리 샵 이름의 랜딩페이지, 연락처, 전자명함 흐름이 남아 문의처가 흐려지지 않습니다.',
  },
  {
    icon: TrendingUp,
    label: '상권 선점',
    title: '동기반 한 곳 우선 세팅은 희소성을 만듭니다',
    body: '모든 샵에 동시에 열리면 가치가 떨어집니다. 먼저 시작한 샵이 지역 고객의 첫 기억을 잡습니다.',
  },
]

const shopKillerPoints = [
  {
    icon: Wallet,
    title: '관리 끝난 고객에게 바로 건넬 이유',
    body: '“오늘 받은 케어를 집에서도 이어가세요”라는 흐름이 생기면 결제 후 대화가 제품 구매로 이어집니다.',
  },
  {
    icon: Store,
    title: '비싼 가격을 설명하는 고급 명분',
    body: '감태 유래 해양 폴리페놀, 컨디션 관리, 프리미엄 케어 스토리가 있어 단품 판매처럼 보이지 않습니다.',
  },
  {
    icon: Search,
    title: '고객이 문의할 곳을 헷갈리지 않음',
    body: '출력물 마지막 장과 모바일 링크가 모두 우리 샵 연락처로 이어져 “어디에 물어보지?”가 사라집니다.',
  },
  {
    icon: Phone,
    title: '먼저 시작한 곳이 상담 기억을 선점',
    body: '동기반에서 한 곳만 먼저 열리면 고객은 “이 샵이 먼저 안내한 브랜드”로 기억하기 쉽습니다.',
  },
]

const shopUseCases = [
  {
    label: '관리 직후',
    title: '결제대 앞에서 바로',
    body: '“오늘 케어를 집에서도 이어갈 수 있는 프리미엄 패키지가 있어요. 우리 샵 전용 페이지 먼저 보세요.”',
  },
  {
    label: '단골 고객',
    title: '월관리 상담 중에',
    body: '“이번에는 피부만 보지 말고 컨디션 관리까지 같이 보시면 만족도가 달라질 수 있어요.”',
  },
  {
    label: '카카오 문의',
    title: '문자·카카오 상담 전에',
    body: '“가격과 구성은 이 링크가 가장 보기 쉬워요. 보시고 전화나 문자로 바로 문의 주세요.”',
  },
]

const productReasons = [
  {
    icon: Leaf,
    title: '고급스럽게 설명되는 감태 유래 소재',
    body: '감태 등 갈조류 유래 해양 폴리페놀은 흔한 원료처럼 들리지 않아 프리미엄 상담 이야기가 만들어집니다.',
  },
  {
    icon: HeartPulse,
    title: '샵 고객의 관심사와 바로 맞물림',
    body: '피부, 수면, 컨디션, 스트레스, 활력처럼 관리 고객이 이미 궁금해하는 주제로 자연스럽게 이어집니다.',
  },
  {
    icon: Sparkles,
    title: '제품만이 아니라 보여줄 자료가 있음',
    body: '고객에게 말로만 설명하지 않고 모바일 랜딩페이지, QR 출력물, 전자명함 연결을 함께 보여줍니다.',
  },
  {
    icon: ShieldCheck,
    title: '과장 없이 신뢰를 지키는 표현',
    body: '치료·완치 표현이 아니라 건강정보와 생활 관리 관점으로 안내해 샵의 신뢰도를 지킵니다.',
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
    title: '우리 샵 이름으로 열리는 고객 페이지',
    body: '제품 설명보다 우리 샵 이름, 연락처, 상담 버튼이 먼저 남는 비공개 링크입니다.',
  },
  {
    icon: Search,
    label: '지역 선점',
    title: '같은 동기반에서 먼저 잡는 상담 흐름',
    body: '지역명과 샵 유형 중심의 상담 흐름을 먼저 잡아 뒤늦게 따라오는 곳과 차이를 만듭니다.',
  },
  {
    icon: ClipboardCheck,
    label: '현장 멘트',
    title: '고객에게 바로 꺼낼 문장',
    body: '가격을 말하기 전에 왜 우리 샵에서 권하는지 납득시키는 핵심 문장을 준비합니다.',
  },
  {
    icon: Package,
    label: '출력 자료',
    title: '마지막 장에 연락처·QR 삽입',
    body: '1~3장은 고객이 읽을 내용만 담고, 마지막 장에서만 연락처와 QR로 연결합니다.',
  },
  {
    icon: Headphones,
    label: '시작 조건',
    title: '선점 가능 여부 확인',
    body: '동기반에서 이미 세팅된 곳이 있는지, 우리 샵이 먼저 열 수 있는지부터 확인합니다.',
  },
]

const contractTriggers = [
  {
    label: '수익이 보인다',
    title: '660만 원 도입 → 1,320만 원 판매가 구조',
    body: '샵에서 바로 계산할 수 있는 숫자입니다. 제품값이 아니라 새 부가 매출 라인으로 보입니다.',
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
    title: '“이건 여기서 상담받는 상품이네”',
    body: '우리 샵 이름의 페이지와 전화·문자 버튼이 보이면 문의처가 바로 정리됩니다.',
  },
  {
    title: '“가격이 센 이유가 보인다”',
    body: '원료 스토리, 관리 관점, 전용 자료가 함께 보이면 단순 단품 판매보다 납득도가 높아집니다.',
  },
  {
    title: '“집에서 보고 다시 연락해야겠다”',
    body: '고객이 링크를 저장하고 다시 들어와도 우리 샵 연락처와 전자명함으로 이어집니다.',
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
  '객단가를 올릴 프리미엄 메뉴가 필요한 곳',
  '우리 동네에서 먼저 보이는 샵이 되고 싶은 곳',
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
      text: `660만 원 구성, 1,320만 원 판매가, 우리 샵 이름으로 이어지는 비공개 샵 패키지를 확인해보세요.`,
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
              관리가 끝난 뒤에도
              <span className="block text-[#0b4a30]">매출이 남는 샵</span>
              플로로탄닌 샵 패키지
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-bold leading-9 text-[#45584d] md:text-xl">
              660만 원 구성, 1,320만 원 판매가, 예상 마진 약 660만 원. 고객이 QR을 찍으면 우리 샵 이름의 페이지와 전화·문자 버튼으로 바로 연결됩니다.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {topMetrics.map((metric, index) => <MetricCard key={metric.label} {...metric} dark={index === 2} />)}
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {[
                '관리 후 30초 안에 링크 전송',
                '동기반 한 곳 우선 세팅',
                'QR → 우리 샵 페이지 → 전화·문자',
                '마지막 출력 장에만 연락처와 QR 삽입',
              ].map((text) => (
                <div key={text} className="flex items-center gap-2 rounded-lg border border-[#e0cfaa] bg-white/85 px-4 py-3 text-sm font-black text-[#24362d]">
                  <CheckCircle2 size={18} className="shrink-0 text-[#0b4a30]" />
                  {text}
                </div>
              ))}
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
            <p className="text-xs font-black text-[#a06f10]">샵 대표가 먼저 볼 숫자</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-[#071b12] md:text-4xl">
              이건 제품 매입이 아니라 새 메뉴를 여는 구조입니다
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-[#59645f]">
              고객에게 이미 관리비를 받는 공간이라면, “무엇을 더 권할 수 있는가”가 매출 차이를 만듭니다.
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
              <p className="text-xs font-black text-[#a06f10]">샵 현장에서 바로 생기는 장면</p>
              <h3 className="mt-2 text-2xl font-black leading-8 text-[#071b12]">고객을 그냥 보내지 않는 이유가 생깁니다</h3>
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

      <section className="shop-no-print bg-[#fffdf7] py-12">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionTitle
            kicker="샵 대표가 바로 보는 킬포인트"
            title="도입을 결정하게 만드는 건 제품 설명보다 회수 가능성입니다"
            body="샵 대표가 보는 핵심은 간단합니다. 기존 고객에게 권할 명분이 있는가, 가격을 납득시킬 수 있는가, 문의가 우리 샵으로 돌아오는가."
          />
          <div className="grid gap-4 md:grid-cols-4">
            {shopKillerPoints.map((item) => (
              <div key={item.title} className="rounded-lg border border-[#e2d6bd] bg-white p-5 shadow-sm shadow-[#0b2f1f]/5">
                <item.icon size={30} className="text-[#0b4a30]" />
                <h3 className="mt-4 text-lg font-black leading-7 text-[#071b12]">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#59645f]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-no-print bg-[#063f2a] py-12 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-8">
          <div>
            <p className="text-xs font-black text-[#f0c45c]">지역 선점 구조</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              같은 동기반이라면 한 곳만 먼저 열어야 힘이 생깁니다
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-[#dce7df]">
              여러 샵에 동시에 똑같이 열리면 희소성이 사라집니다. 먼저 시작한 샵 이름으로 전용 웹, QR, 지역 상담 흐름이 남아야 합니다.
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
            kicker="고객에게 권할 명분"
            title="고객은 제품만 보지 않고, 왜 이 샵에서 권하는지를 봅니다"
            body="감태 유래 해양 폴리페놀 스토리와 피부·컨디션 관심사가 연결되어야 프리미엄 가격을 말할 수 있습니다."
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
            <p className="text-xs font-black text-[#a06f10]">가격을 납득시키는 소재</p>
            <h3 className="mt-2 text-2xl font-black leading-8 text-[#071b12]">고객이 “왜 비싼가”를 물었을 때 답할 이유가 보입니다</h3>
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
            kicker="고객이 움직이는 흐름"
            title="고객이 이해하고, 저장하고, 다시 연락하는 동선이어야 팔립니다"
            body="전단지와 링크가 읽고 끝나면 매출이 되지 않습니다. 우리 샵 연락처로 돌아오는 구조가 필요합니다."
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
            <p className="text-xs font-black text-[#f0c45c]">상담 장면에서 나와야 하는 반응</p>
            <h3 className="mt-2 text-2xl font-black leading-8">샵 대표가 원하는 고객 반응은 명확해야 합니다</h3>
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

      <section className="shop-no-print bg-[#fbf7ed] py-12">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionTitle
            kicker="매출로 바뀌는 사용 장면"
            title="고객 앞에서 바로 꺼낼 수 있어야 도입할 이유가 생깁니다"
            body="샵 대표가 필요한 건 긴 설명이 아니라, 관리가 끝난 고객에게 바로 보낼 수 있는 링크와 한 문장입니다."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {shopUseCases.map((item) => (
              <div key={item.label} className="rounded-lg border border-[#e2d6bd] bg-white p-6">
                <p className="text-xs font-black text-[#a06f10]">{item.label}</p>
                <h3 className="mt-2 text-xl font-black leading-7 text-[#071b12]">{item.title}</h3>
                <p className="mt-4 text-base font-black leading-8 text-[#24362d]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-no-print bg-[#f8f5ed] py-12">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionTitle
            kicker="도입하면 바로 있어야 할 것"
            title="제품만 오면 부족합니다. 팔리게 만드는 장치가 함께 와야 합니다"
            body="우리 샵 전용 웹, QR 자료, 현장 멘트, 출력물, 연락 동선까지 같이 있어야 고객에게 바로 보여줄 수 있습니다."
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
            <p className="text-xs font-black text-[#a06f10]">우선 시작하면 좋은 곳</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-[#071b12]">이미 고객을 만나는 샵일수록 유리합니다</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-[#59645f]">
              매일 상담하고 관리하는 고객이 있다면, 고객에게 다시 권할 프리미엄 이유가 생기는 순간 매출 구조가 달라집니다.
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
              title="660만 원 구성, 1,320만 원 판매가, 예상 마진 약 660만 원"
              subtitle="샵 대표가 먼저 보는 건 좋은 말보다 숫자입니다. 도입 후 고객에게 제안할 판매가와 회수 가능성이 바로 보여야 합니다."
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
              title="동기반 한 곳만 먼저 열릴 때 가치가 생깁니다"
              subtitle="같은 상권에 모두 똑같이 열면 희소성이 사라집니다. 먼저 시작한 샵 이름으로 전용 웹과 QR 상담 흐름을 잡습니다."
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
              title="고객이 비싼 가격을 납득할 이유가 있어야 합니다"
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
              title="이제 우리 샵 이름으로 먼저 연결하세요"
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
            고객이 기억하는 건 제품명보다 어디서 봤는지입니다
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-7 text-[#dce7df]">
            플로로탄닌 샵 패키지는 제품 공급을 넘어, 우리 샵 이름으로 고객에게 남고 다시 문의받는 비공개 연결 구조입니다.
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
