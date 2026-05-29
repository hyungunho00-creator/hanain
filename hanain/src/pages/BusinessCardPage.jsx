import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2, MapPin, MessageCircle, Phone, ShieldCheck, UserCircle2 } from 'lucide-react'
import SEOHead from '../components/common/SEOHead'
import PartnerSharePanel from '../components/partner/PartnerSharePanel'
import PartnerContactCTA, { downloadPartnerVCard } from '../components/partner/PartnerContactCTA'
import PartnerArchiveDashboard from '../components/partner/PartnerArchiveDashboard'
import { resolvePartnerBySlug } from '../lib/partner/resolvePartner'
import { usePartner } from '../context/PartnerContext'
import { withRef } from '../lib/partnerRef'
import { QA_TOTAL } from '../data/siteStats'
import { INSIGHTS_LIST } from '../data/insights'
import { trackPartnerEvent } from '../lib/partner/partnerAnalytics'

function ContactButton({ href, label, external = false, onClick = null }) {
  const attrs = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a
      href={href}
      onClick={onClick}
      {...attrs}
      className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-gray-800 hover:border-teal-300 hover:text-teal-800"
    >
      {label}
    </a>
  )
}

export default function BusinessCardPage() {
  const { partnerSlug } = useParams()
  const navigate = useNavigate()
  const contextPartner = usePartner()
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [partnerData, setPartnerData] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const resolved = await resolvePartnerBySlug(partnerSlug)
      if (cancelled) return
      if (!resolved) {
        setNotFound(true)
        setLoading(false)
        return
      }
      setPartnerData(resolved)
      setNotFound(false)
      setLoading(false)

      trackPartnerEvent('partner_card_view', {
        partnerSlug: resolved.slug,
        pagePath: `/p/${resolved.slug}`,
      })
    }
    load()
    return () => { cancelled = true }
  }, [partnerSlug])

  const partner = partnerData || contextPartner

  const displayName = partner?.displayName || partner?.name || partnerSlug || '파트너'
  const slug = partner?.slug || partner?.partnerSlug || partnerSlug
  const phoneRaw = String(partner?.phone || '').replace(/\D/g, '')
  const phoneDisplay = partner?.phoneDisplay || partner?.phone || ''
  const sms = partner?.sms || phoneRaw

  const archiveLinks = useMemo(() => [
    { label: '건강정보 허브', to: '/home' },
    { label: '쉽게 배우기', to: '/easy' },
    { label: '건강 Q&A', to: '/qa' },
    { label: '인사이트', to: '/insights' },
    { label: '연구 블로그', to: '/blog' },
    { label: '카테고리별 보기', to: '/category/metabolism' },
  ], [])

  if (loading) {
    return <div className="mx-auto max-w-4xl px-4 py-16 text-center text-gray-500">파트너 정보를 불러오는 중입니다.</div>
  }

  if (notFound || !partner) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">파트너를 찾을 수 없습니다.</h1>
        <p className="mt-2 text-gray-600">유효한 파트너 링크인지 확인해 주세요.</p>
        <button onClick={() => navigate('/')} className="mt-5 rounded-lg border border-gray-200 px-4 py-2 text-sm">메인으로 이동</button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      <SEOHead
        title={`${displayName} 파트너 명함 | 플로로탄닌 파트너스`}
        description={`${displayName} 파트너가 공유하는 플로로탄닌 건강정보 아카이브 전자 명함입니다.`}
        canonical={`https://phlorotannin.com/p/${slug}`}
        noindex={true}
      />

      <section className="rounded-3xl border border-teal-100 bg-gradient-to-br from-white to-teal-50 p-6 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-teal-700">플로로탄닌 파트너스 공식 아카이브 공유 파트너</p>
        <div className="mt-3 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-2xl font-bold text-gray-900">{displayName}</h1>
              {partner?.verified ? <CheckCircle2 className="h-5 w-5 text-teal-600" /> : null}
            </div>
            <p className="mt-1 text-sm text-gray-600">{partner?.roleLabel || '플로로탄닌 건강정보 파트너'}</p>
            {partner?.region ? <p className="mt-2 inline-flex items-center gap-1 text-sm text-gray-500"><MapPin className="h-4 w-4" />{partner.region}</p> : null}
            {partner?.greeting ? <p className="mt-3 text-sm text-gray-700">{partner.greeting}</p> : null}
          </div>
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-teal-100 bg-white text-teal-700">
            <UserCircle2 className="h-10 w-10" />
          </div>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-3">
        {phoneRaw ? <ContactButton href={`tel:${phoneRaw}`} label="전화하기" onClick={() => trackPartnerEvent('partner_contact_click', { partnerSlug: slug, contentType: 'phone' })} /> : null}
        {sms ? <ContactButton href={`sms:${sms}`} label="문자 보내기" onClick={() => trackPartnerEvent('partner_contact_click', { partnerSlug: slug, contentType: 'sms' })} /> : null}
        {partner?.kakaoUrl ? <ContactButton href={partner.kakaoUrl} label="카카오 상담" external={true} onClick={() => trackPartnerEvent('partner_contact_click', { partnerSlug: slug, contentType: 'kakao' })} /> : null}
        {partner?.naverCafeUrl ? <ContactButton href={partner.naverCafeUrl} label="네이버 카페 보기" external={true} /> : null}
        {partner?.bandUrl ? <ContactButton href={partner.bandUrl} label="밴드 보기" external={true} /> : null}
        <button onClick={() => downloadPartnerVCard(partner)} className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-gray-800 hover:border-teal-300 hover:text-teal-800">
          명함 저장
        </button>
      </section>

      <section className="mt-6 grid gap-3 md:grid-cols-2">
        {archiveLinks.map((item) => (
          <Link
            key={item.label}
            to={withRef(item.to, partner)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:border-teal-300 hover:text-teal-800"
          >
            {item.label}
          </Link>
        ))}
      </section>

      <div className="mt-6">
        <PartnerSharePanel />
      </div>

      <div className="mt-6">
        <PartnerArchiveDashboard stats={{ qaCount: QA_TOTAL, insightCount: INSIGHTS_LIST.length, blogCount: null }} />
      </div>

      <div className="mt-6">
        <PartnerContactCTA />
      </div>

      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-4 text-sm leading-relaxed text-gray-700">
        <p className="font-semibold text-gray-900">안내</p>
        <p className="mt-2">
          이 페이지는 플로로탄닌 파트너스 공식 건강정보 아카이브를 기반으로 하며,
          특정 질병의 치료·예방·효과를 보장하지 않습니다.
          건강 관련 결정은 의료진 상담과 함께 확인해 주세요.
        </p>
        <p className="mt-2 text-xs text-gray-500">
          공유 링크: <span className="font-mono">https://phlorotannin.com/p/{slug}</span>
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-teal-100 bg-teal-50/70 p-4 text-sm text-teal-900">
        <p className="font-semibold">성분 정보로 함께 보기</p>
        <p className="mt-1">
          플로로탄닌은 감태 등 갈조류에서 발견되는 해양 폴리페놀 성분입니다. 감태추출물, 씨놀, 디에콜, 에콜 같은 키워드와 함께
          항산화·염증 반응·대사 건강 관련 연구에서 자주 다뤄집니다. 특정 질병 치료를 의미하지 않으며 건강교육 자료로 구분해 확인해 주세요.
        </p>
      </section>
    </div>
  )
}
