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
  '좋은 제품을 들여도 고객에게 설명할 말이 부족하다',
  '온라인에서는 샵 이름보다 가격 비교 글이 먼저 보인다',
  '한 번 관리받고 끝나는 고객을 다시 상담으로 연결하고 싶다',
  '부가 상품은 필요하지만 샵 이미지가 싸 보이는 건 싫다',
]

const productReasons = [
  {
    icon: Leaf,
    title: '해조류 유래 폴리페놀이라는 분명한 스토리',
    body: '플로로탄닌은 감태 등 갈조류에 존재하는 해양 폴리페놀 계열로, 항산화·염증 반응·대사 밸런스 연구에서 반복적으로 언급되는 소재입니다.',
  },
  {
    icon: HeartPulse,
    title: '샵 고객이 이해하기 쉬운 회복 관점',
    body: '피부만 따로 보는 설명보다 컨디션, 수면, 스트레스, 장 건강, 생활 리듬까지 연결해 이야기할 수 있어 상담 소재가 넓어집니다.',
  },
  {
    icon: Sparkles,
    title: '고급 샵 이미지와 맞는 제안 방식',
    body: '단순 판매 문구가 아니라 전용 웹, QR, 전단지, 전자명함이 함께 움직여 “우리 샵이 관리해준다”는 인상을 만듭니다.',
  },
  {
    icon: ShieldCheck,
    title: '치료·완치가 아닌 건강정보 중심',
    body: '질병 치료 표현을 피하고, 연구 기반 건강정보와 생활 관리 관점으로 안내해 샵의 신뢰도를 지키는 방향으로 설계합니다.',
  },
]

const territoryItems = [
  {
    title: '동기반 한 곳 우선 세팅',
    body: '동일 동기반·동일 상권에서는 먼저 도입한 샵을 중심으로 전용 웹과 QR 제안 구조를 우선 세팅합니다.',
  },
  {
    title: '지역 검색 문구 선점',
    body: '지역명, 샵 유형, 상담 키워드를 먼저 쌓은 곳이 고객에게 먼저 설명될 가능성이 커집니다. 검색 자산은 늦게 시작할수록 따라잡기 어렵습니다.',
  },
  {
    title: '샵 이름으로 남는 자료',
    body: '전단지와 제안서 하단에는 파트너명, 연락처, QR이 자동 삽입됩니다. 자료를 받을수록 고객은 제품보다 “그 샵”을 기억합니다.',
  },
]

const supportItems = [
  {
    icon: Monitor,
    label: '전용 웹',
    title: '샵 이름으로 보이는 안내 페이지',
    body: '샵 소개, 상담 안내, 제품 설명, QR 문의 흐름이 담긴 전용 웹페이지를 제공합니다.',
  },
  {
    icon: Search,
    label: '검색 흐름',
    title: '지역 고객이 찾는 구조',
    body: '지역명과 상담 키워드 중심으로 고객이 찾아보고 문의할 수 있는 기본 흐름을 잡습니다.',
  },
  {
    icon: ClipboardCheck,
    label: '상담 문구',
    title: '처음 안내할 말까지 준비',
    body: '샵 대표가 바로 말할 수 있는 소개 문장, 고객 질문 대응 문구, 전단지 설명 포인트를 정리합니다.',
  },
  {
    icon: Package,
    label: '전단지',
    title: 'QR 출력물 자동 연결',
    body: '출력용 제안서와 자료에는 파트너 연락처와 QR이 자동 삽입되어 샵 상담으로 이어집니다.',
  },
  {
    icon: Headphones,
    label: '운영 상담',
    title: '샵 상황별 운영 방향',
    body: '피부관리실, 에스테틱, 힐링센터, 체형관리실 등 업종별로 제안 포인트를 함께 맞춥니다.',
  },
]

const conversationExamples = [
  {
    who: '샵 대표 관점',
    quote: '제품 하나 더 들이는 게 아니라, 우리 샵 이름으로 고객이 다시 들어오는 구조라면 해볼 만하다.',
  },
  {
    who: '고객 상담 관점',
    quote: '이건 피부관리만이 아니라 컨디션과 생활 관리까지 같이 설명해줘서 이해가 쉽다.',
  },
  {
    who: '운영 관점',
    quote: '전단지 QR을 찍으면 내 연락처와 제안 페이지가 바로 열리니까 설명 시간이 줄어든다.',
  },
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
        <p className="text-xs font-black tracking-[0.16em] text-[#a06f10]">상담 담당 파트너</p>
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
          <QRCodeCanvas value={pageUrl} size={74} includeMargin={false} fgColor="#063f2a" />
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
      text: `${partnerName} 파트너가 전달드리는 샵 전용 웹·QR·전단지 제안서입니다.`,
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
        description="파트너 공유 전용 플로로탄닌 샵 패키지 제안 페이지입니다."
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
            파트너 공유 전용 · 검색 노출 제외
          </div>
          <Link to={`/p/${partnerInfo.slug}/inforoom`} className="inline-flex items-center gap-1.5 text-xs font-black text-[#063f2a] underline underline-offset-4">
            정보방으로 돌아가기
            <ArrowRight size={14} />
          </Link>
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
              샵 대표님,
              <span className="block text-[#0b4a30]">제품을 하나 더 들이는 게 아니라</span>
              지역 상담 구조를 먼저 선점하는 겁니다
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-bold leading-9 text-[#45584d] md:text-xl">
              플로로탄닌 샵 패키지는 제품, 샵 전용 웹, QR 전단지, 상담 문구를 한 번에 묶어 고객이 “어디서 사야 하는지”까지 기억하게 만드는 제안 구조입니다.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {topMetrics.map((metric, index) => <MetricCard key={metric.label} {...metric} dark={index === 2} />)}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={shareLink} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#063f2a] px-5 text-sm font-black text-white shadow-lg shadow-[#063f2a]/20">
                <Share2 size={18} />
                샵 대표에게 바로 공유
              </button>
              <button type="button" onClick={printProposal} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#d8c18a] bg-[#fff8e5] px-5 text-sm font-black text-[#8a620d]">
                <Printer size={18} />
                출력 제안서 보기
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
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionTitle
            kicker="SHOP OWNER REALITY"
            title="샵 대표가 계약을 망설이는 이유부터 풀어야 합니다"
            body="대표님들은 제품 설명보다 먼저 “이게 우리 샵 매출과 고객 재방문에 도움이 되는가”를 봅니다."
          />
          <div className="grid gap-3 md:grid-cols-2">
            {ownerPainPoints.map((text) => (
              <div key={text} className="flex items-start gap-3 rounded-lg border border-[#e8dfc9] bg-[#fffdf8] px-5 py-4">
                <CheckCircle2 size={21} className="mt-0.5 shrink-0 text-[#0b4a30]" />
                <p className="text-base font-black leading-7 text-[#24362d]">{text}</p>
              </div>
            ))}
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
              같은 상권에서 모두에게 똑같은 웹 구조를 뿌리면 가치가 떨어집니다. 먼저 시작한 샵이 자기 이름으로 검색 문구, QR, 전단지, 상담 흐름을 쌓아야 합니다.
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
            title="제품이 좋아야 상담 구조도 오래 갑니다"
            body="샵 고객은 “왜 이 제품이어야 하는지”를 묻습니다. 그래서 제품 스토리, 연구 소재, 생활 관리 관점이 함께 있어야 합니다."
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
        </div>
      </section>

      <section className="shop-no-print bg-white py-12">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionTitle
            kicker="FIELD REACTION"
            title="샵 대표가 바로 이해하는 반응 포인트"
            body="허위 후기를 만들지 않고, 제안 현장에서 바로 나오는 판단 기준을 대화 형식으로 정리했습니다."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {conversationExamples.map((item) => (
              <div key={item.who} className="rounded-lg border border-[#e2d6bd] bg-[#fffdf8] p-6">
                <p className="text-xs font-black tracking-[0.14em] text-[#a06f10]">{item.who}</p>
                <p className="mt-4 text-lg font-black leading-8 text-[#071b12]">“{item.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-no-print bg-[#f8f5ed] py-12">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionTitle
            kicker="WHAT PARTNER GETS"
            title="파트너가 실제로 받는 것"
            body="제품만 공급하고 끝나는 구조가 아니라, 샵이 고객에게 설명하고 공유하고 문의받을 수 있는 세트를 제공합니다."
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
              <h2 className="mt-2 text-3xl font-black text-[#071b12]">파트너 정보가 자동 삽입되는 출력용 4장 제안서</h2>
              <p className="mt-2 text-sm font-bold leading-7 text-[#66766d]">
                고정 이미지가 아니라 실제 출력물입니다. 인쇄하면 파트너명, 연락처, 제안 QR이 각 장 하단에 들어갑니다.
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
              title="우리 샵 이름으로 고객이 다시 들어오게 만듭니다"
              subtitle="제품 제안, 전용 웹, QR, 상담 문구가 하나로 연결될 때 고객은 제품보다 샵을 기억합니다."
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
                    {ownerPainPoints.slice(0, 3).map((text) => (
                      <div key={text} className="flex items-start gap-3 rounded-lg border border-[#e2d6bd] bg-white px-4 py-3">
                        <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#0b4a30]" />
                        <p className="text-sm font-black leading-7 text-[#24362d]">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <img src={HERO_IMAGE} alt="프리미엄 샵 상담 장면" className="h-full min-h-[280px] rounded-lg border border-[#e2d6bd] object-cover" />
              </div>
            </ProposalSheet>

            <ProposalSheet
              page="2"
              title="먼저 시작한 샵이 지역 상담 흐름을 선점합니다"
              subtitle="동기반 한 곳 우선 세팅, 지역 검색 문구, QR 전단지가 함께 쌓이면 샵 이름이 고객 기억에 남습니다."
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
                같은 자료라도, 내 샵 이름과 QR로 남아야 가치가 있습니다
              </div>
            </ProposalSheet>

            <ProposalSheet
              page="3"
              title="플로로탄닌은 샵 상담 소재로 설명하기 좋습니다"
              subtitle="해조류 유래 폴리페놀, 항산화와 밸런스 연구 소재, 생활 회복 관점이 함께 있어 고객 이해가 쉽습니다."
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
            </ProposalSheet>

            <ProposalSheet
              page="4"
              title="지금 필요한 건 제품 설명서가 아니라 계약하고 싶어지는 제안 구조입니다"
              subtitle="샵 대표가 바로 판단할 수 있도록 수익 구조, 전용 웹, 고객 상담, 출력 QR까지 한 번에 보여드립니다."
              partnerName={partnerName}
              phoneDisplay={phoneDisplay}
              pageUrl={pageUrl}
            >
              <div className="grid gap-5 md:grid-cols-[1fr_0.9fr]">
                <div className="grid gap-3">
                  {conversationExamples.map((item) => (
                    <div key={item.who} className="rounded-lg border border-[#e2d6bd] bg-white px-4 py-3">
                      <p className="text-xs font-black text-[#a06f10]">{item.who}</p>
                      <p className="mt-2 text-sm font-black leading-7 text-[#24362d]">“{item.quote}”</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border-2 border-[#063f2a] bg-[#fff8e5] p-5">
                  <p className="text-sm font-black tracking-[0.16em] text-[#a06f10]">NEXT STEP</p>
                  <h3 className="mt-2 text-2xl font-black leading-9 text-[#071b12]">
                    상담 주시면 샵 상황에 맞는 도입 방향과 자료를 안내드리겠습니다
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
