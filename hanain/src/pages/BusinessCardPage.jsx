import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Phone, MessageSquare, Globe, Download,
  AlertCircle, ChevronRight, Leaf, Heart, Star, Shield, BookOpen, UserPlus, Smartphone, X, Share,
} from 'lucide-react'
import SEOHead from '../components/common/SEOHead'
import { savePartnerToSession } from '../context/PartnerContext'
import {
  buildPartnerSlugCandidates,
  normalizePartnerSlug,
  normalizePhoneDigits,
} from '../lib/partner/normalizePartnerSlug'

const MAIN_SITE = 'https://phlorotannin.com'

const NAVY  = '#0D1B3E'
const GOLD  = '#B8953A'
const GOLD2 = '#D4AF5A'
const CREAM = '#FFFDF7'
const CREAM2 = '#FBF5E6'
const CREAM3 = '#F5EDD2'

// Supabase partners table primary, static json fallback
const SB_URL_FOR_PARTNERS = 'https://rlfxuyeoluoeaxuujtly.supabase.co'
const SB_ANON_FOR_PARTNERS = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck'
const PARTNERS_JSON_URL = `${SB_URL_FOR_PARTNERS}/storage/v1/object/public/public/partners.json`

function adaptPartnerRow(r) {
  if (!r) return null
  return {
    slug: r.slug,
    name: r.name,
    phone: r.phone,
    phoneDisplay: r.phone_display,
    siteUrl: r.site_url,
    memo: r.memo || '',
    createdAt: r.created_at,
  }
}

async function fetchPartnerBySlugFromTable(partnerSlug) {
  try {
    const normalized = normalizePartnerSlug(partnerSlug)
    if (!normalized) return null

    const digits = normalizePhoneDigits(partnerSlug)
    const params = new URLSearchParams({
      select: 'slug,phone,name,phone_display,site_url,memo,created_at,status',
      status: 'eq.active',
      limit: '1',
    })

    if (digits) {
      params.set('or', `(phone.eq.${digits},slug.eq.${digits})`)
    } else {
      params.set('slug', `eq.${normalized}`)
    }

    const url = `${SB_URL_FOR_PARTNERS}/rest/v1/partners?${params.toString()}`
    const resp = await fetch(url, {
      headers: {
        apikey: SB_ANON_FOR_PARTNERS,
        Authorization: `Bearer ${SB_ANON_FOR_PARTNERS}`,
        'Accept-Profile': 'public',
      },
    })

    if (!resp.ok) return null
    const rows = await resp.json()
    if (!Array.isArray(rows) || rows.length === 0) return null
    return adaptPartnerRow(rows[0])
  } catch {
    return null
  }
}

function findPartnerFromStaticRows(rows, partnerSlug) {
  const candidates = new Set(buildPartnerSlugCandidates(partnerSlug))
  if (!candidates.size) return null

  for (const row of rows || []) {
    const keys = new Set([
      ...buildPartnerSlugCandidates(row.slug || ''),
      ...buildPartnerSlugCandidates(row.phone || ''),
      ...buildPartnerSlugCandidates(row.phoneDisplay || row.phone_display || ''),
      ...buildPartnerSlugCandidates(row.sms || ''),
    ])
    if ([...candidates].some((item) => keys.has(item))) return row
  }
  return null
}

async function fetchPartnerBySlug(partnerSlug) {
  const fromTable = await fetchPartnerBySlugFromTable(partnerSlug)
  if (fromTable) return fromTable

  try {
    const urls = [
      `${PARTNERS_JSON_URL}?t=${Date.now()}`,
      `${MAIN_SITE}/partners.json?t=${Date.now()}`,
    ]

    for (const url of urls) {
      try {
        const resp = await fetch(url, { cache: 'no-store' })
        if (!resp.ok) continue
        const data = await resp.json()
        const found = findPartnerFromStaticRows(data.partners || [], partnerSlug)
        if (found) return found
      } catch {
        continue
      }
    }
    return null
  } catch {
    return null
  }
}
function QRCode({ url, size = 100 }) {
  return (
    <img
      src={`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&color=${NAVY.replace('#', '')}&bgcolor=ffffff&margin=6`}
      alt="QR" width={size} height={size}
      style={{ display: 'block', borderRadius: '4px' }}
    />
  )
}

// ?????????????????????????????????????????????
//  怨듯넻 Canvas ?좏떥 ??怨⑤뱶 ??/ ?ъ씠?쒕컮 / ?뚮몢由?
// ?????????????????????????????????????????????
function drawFrame(ctx, W, H) {
  // ?щ┝ 諛곌꼍
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0,   '#FFFDF7')
  bg.addColorStop(0.6, '#FBF5E6')
  bg.addColorStop(1,   '#F5EDD2')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // ?멸낸 怨⑤뱶 ?뚮몢由?
  ctx.strokeStyle = '#B8953A'
  ctx.lineWidth = 8
  ctx.strokeRect(4, 4, W - 8, H - 8)

  // 怨⑤뱶 ??(????
  const goldBand = ctx.createLinearGradient(0, 0, W, 0)
  goldBand.addColorStop(0,    '#0D1B3E')
  goldBand.addColorStop(0.25, '#B8953A')
  goldBand.addColorStop(0.5,  '#D4AF5A')
  goldBand.addColorStop(0.75, '#B8953A')
  goldBand.addColorStop(1,    '#0D1B3E')
  ctx.fillStyle = goldBand
  ctx.fillRect(0, 0, W, 26)
  ctx.fillRect(0, H - 26, W, 26)

  return goldBand   // ?ъ궗?⑹슜
}

function drawSidebar(ctx, H) {
  const sg = ctx.createLinearGradient(0, 0, 0, H)
  sg.addColorStop(0,   '#0D1B3E')
  sg.addColorStop(0.5, '#1a3a6a')
  sg.addColorStop(1,   '#0D1B3E')
  ctx.fillStyle = sg
  ctx.fillRect(0, 26, 32, H - 52)
}

function roundRect(ctx, x, y, w, h, r) {
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, r)
  } else {
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.arcTo(x + w, y, x + w, y + r, r)
    ctx.lineTo(x + w, y + h - r)
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
    ctx.lineTo(x + r, y + h)
    ctx.arcTo(x, y + h, x, y + h - r, r)
    ctx.lineTo(x, y + r)
    ctx.arcTo(x, y, x + r, y, r)
  }
}

async function loadImage(src) {
  return new Promise(resolve => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })
}

// ?????????????????????????????????????????????
//  ?욌㈃ Canvas
// ?????????????????????????????????????????????
async function drawFront(partner, cardUrl) {
  const W = 1076, H = 650
  const canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')

  drawFrame(ctx, W, H)
  drawSidebar(ctx, H)

  const TX = 74   // ?띿뒪??湲곗? X

  // 釉뚮옖?쒕챸
  ctx.fillStyle = '#B8953A'
  ctx.font = 'bold 26px Arial, sans-serif'
  ctx.fillText('PHLOROTANNIN PARTNERS', TX, 80)

  // ?대쫫
  const nameLen = (partner.name || '').length
  const namePx = nameLen <= 3 ? 148 : nameLen <= 4 ? 118 : 92
  ctx.fillStyle = '#0D1B3E'
  ctx.font = `900 ${namePx}px Arial, sans-serif`
  ctx.fillText(partner.name || '', TX, 80 + namePx + 8)

  // ?대쫫 ?꾨옒 怨⑤뱶 ??
  const lineY = 80 + namePx + 34
  const lg = ctx.createLinearGradient(TX, 0, TX + 180, 0)
  lg.addColorStop(0, '#B8953A'); lg.addColorStop(1, '#D4AF5A')
  ctx.strokeStyle = lg; ctx.lineWidth = 5
  ctx.beginPath(); ctx.moveTo(TX, lineY); ctx.lineTo(TX + 180, lineY); ctx.stroke()

  // 吏곹븿
  ctx.fillStyle = '#B8953A'; ctx.font = 'bold 38px Arial, sans-serif'
  ctx.fillText('?뚮났?붾（??而⑥꽕?댄듃', TX, lineY + 58)

  // ?뚭컻
  ctx.fillStyle = '#4a5568'; ctx.font = '30px Arial, sans-serif'
  ctx.fillText('신뢰를 전하는 회복 솔루션', TX, lineY + 110)

  // ?꾪솕踰덊샇
  ctx.fillStyle = '#0D1B3E'; ctx.font = 'bold 36px Arial, sans-serif'
  ctx.fillText('?? ' + (partner.phoneDisplay || ''), TX, lineY + 162)

  // ?뱀＜??(?섎떒 ?쇱そ)
  ctx.fillStyle = '#B8953A'; ctx.font = 'bold 24px Arial, sans-serif'
  ctx.fillText('phlorotannin.com', TX, H - 42)

  // ?곗륫 臾멸뎄
  ctx.fillStyle = '#999'; ctx.font = '20px Arial, sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('Health Recovery Partner', W - 50, H - 42)
  ctx.textAlign = 'left'

  // QR
  const qrSize = 270, qrX = W - qrSize - 50, qrY = 40
  ctx.fillStyle = '#fff'
  ctx.beginPath(); roundRect(ctx, qrX - 12, qrY - 12, qrSize + 24, qrSize + 24, 16); ctx.fill()
  ctx.strokeStyle = '#B8953A'; ctx.lineWidth = 5
  ctx.beginPath(); roundRect(ctx, qrX - 12, qrY - 12, qrSize + 24, qrSize + 24, 16); ctx.stroke()

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize * 2}x${qrSize * 2}&data=${encodeURIComponent(cardUrl)}&color=0D1B3E&bgcolor=ffffff&margin=8`
  const qrImg = await loadImage(qrUrl)
  if (qrImg) ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize)

  ctx.fillStyle = '#B8953A'; ctx.font = 'bold 22px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('SCAN ME', qrX + qrSize / 2, qrY + qrSize + 38)
  ctx.textAlign = 'left'

  return canvas
}

// ?????????????????????????????????????????????
//  ?룸㈃ Canvas  (?щ┝ ???듭씪)
// ?????????????????????????????????????????????
async function drawBack(partner, cardUrl) {
  const W = 1076, H = 650
  const canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')

  drawFrame(ctx, W, H)
  drawSidebar(ctx, H)

  // ?? 以묒븰 ?먰삎 ?μ떇 (?щ┝ ???댁슱由ш쾶 怨⑤뱶 怨꾩뿴) ??
  ;[300, 200].forEach((r, i) => {
    ctx.beginPath()
    ctx.arc(W / 2 + 160, H / 2, r, 0, Math.PI * 2)
    ctx.strokeStyle = i === 0 ? '#B8953A18' : '#D4AF5A28'
    ctx.lineWidth = 1.5
    ctx.stroke()
  })

  // ?? ?쇱そ ?띿뒪???곸뿭 ??
  const TX = 74

  // 釉뚮옖?쒕챸
  ctx.fillStyle = '#B8953A'; ctx.font = 'bold 22px Arial, sans-serif'
  ctx.fillText('PHLOROTANNIN PARTNERS', TX, 80)

  // 硫붿씤 移댄뵾
  ctx.fillStyle = '#0D1B3E'; ctx.font = '900 72px Arial, sans-serif'
  ctx.fillText('?좊ː瑜??꾪븯??, TX, 180)
  ctx.fillText('?뚮났 ?붾（??, TX, 268)

  // 怨⑤뱶 援щ텇??
  const lg = ctx.createLinearGradient(TX, 0, TX + 200, 0)
  lg.addColorStop(0, '#B8953A'); lg.addColorStop(1, '#D4AF5A')
  ctx.strokeStyle = lg; ctx.lineWidth = 5
  ctx.beginPath(); ctx.moveTo(TX, 300); ctx.lineTo(TX + 200, 300); ctx.stroke()

  // ?ㅻ챸 臾멸뎄
  ctx.fillStyle = '#4a5568'; ctx.font = '30px Arial, sans-serif'
  ctx.fillText('?꾩슂???뺣낫? ?곌껐??, TX, 350)
  ctx.fillText('???뺣룉??諛⑹떇?쇰줈 ?쒖븞?⑸땲??, TX, 394)

  // ?뚰듃???대쫫 (?묎쾶)
  ctx.fillStyle = '#B8953A'; ctx.font = 'bold 32px Arial, sans-serif'
  ctx.fillText((partner.name || '') + ' 而⑥꽕?댄듃', TX, 454)

  // ?꾪솕踰덊샇
  ctx.fillStyle = '#0D1B3E'; ctx.font = 'bold 30px Arial, sans-serif'
  ctx.fillText('?? ' + (partner.phoneDisplay || ''), TX, 498)

  // ?뱀＜??
  ctx.fillStyle = '#B8953A'; ctx.font = 'bold 24px Arial, sans-serif'
  ctx.fillText('phlorotannin.com', TX, H - 42)

  // ?곗륫 臾멸뎄
  ctx.fillStyle = '#999'; ctx.font = '20px Arial, sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('Health Recovery Partner', W - 50, H - 42)
  ctx.textAlign = 'left'

  // ?? QR (?ㅻⅨ履? ??
  const qrSize = 260, qrX = W - qrSize - 60, qrY = H / 2 - qrSize / 2 - 20

  ctx.fillStyle = '#fff'
  ctx.beginPath(); roundRect(ctx, qrX - 14, qrY - 14, qrSize + 28, qrSize + 28, 18); ctx.fill()
  ctx.strokeStyle = '#B8953A'; ctx.lineWidth = 5
  ctx.beginPath(); roundRect(ctx, qrX - 14, qrY - 14, qrSize + 28, qrSize + 28, 18); ctx.stroke()

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize * 2}x${qrSize * 2}&data=${encodeURIComponent(cardUrl)}&color=0D1B3E&bgcolor=ffffff&margin=8`
  const qrImg = await loadImage(qrUrl)
  if (qrImg) ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize)

  ctx.fillStyle = '#B8953A'; ctx.font = 'bold 22px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('SCAN ME', qrX + qrSize / 2, qrY + qrSize + 40)
  ctx.textAlign = 'left'

  return canvas
}

// ?????????????????????????????????????????????
//  硫붿씤 而댄룷?뚰듃
// ?????????????????????????????????????????????
export default function BusinessCardPage() {
  const { partnerSlug: phone }  = useParams()
  const navigate   = useNavigate()
  const [searchParams] = useSearchParams()
  const viewCard = searchParams.get('view') === 'card'
  const [partner,     setPartner]     = useState(null)
  const [loading,     setLoading]     = useState(true)
  const [notFound,    setNotFound]    = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [flipped,     setFlipped]     = useState(false)
  const [saved,       setSaved]       = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [showInstallBanner, setShowInstallBanner] = useState(false)  // ?곷떒 怨좎젙 ?덈궡 諛곕꼫
  const [installBannerType, setInstallBannerType] = useState('android') // 'android' | 'ios'
  const deferredPromptRef = useRef(null)

  const cardUrl = `${MAIN_SITE}/p/${phone}`

  // ?? Android beforeinstallprompt 罹먯튂 + ?pwa=1 濡??섏뼱??寃쎌슦 ?곷떒 諛곕꼫 ?쒖떆 ??
  useEffect(() => {
    const ua = navigator.userAgent || ''
    const isAndroid = /Android/i.test(ua)
    const isIphone = /iPhone|iPad|iPod/i.test(ua)

    // Android: beforeinstallprompt ???
    const handler = (e) => {
      e.preventDefault()
      deferredPromptRef.current = e
    }
    window.addEventListener('beforeinstallprompt', handler)

    // ?pwa=1 ?뚮씪誘명꽣 ??Chrome/Safari濡??섏뼱???곹깭 ???곷떒 ?덈궡 諛곕꼫 ?쒖떆
    if (new URLSearchParams(window.location.search).get('pwa') === '1') {
      if (isIphone) {
        setInstallBannerType('ios')
      } else {
        setInstallBannerType('android')
      }
      setShowInstallBanner(true)
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  useEffect(() => {
    if (!phone) { setNotFound(true); setLoading(false); return }
    fetchPartnerBySlug(phone).then(p => {
      if (p) {
        const rawPhone = p.phone?.replace(/\D/g, '') || phone
        const fallbackDisplay = rawPhone.length === 11
          ? `${rawPhone.slice(0,3)}-${rawPhone.slice(3,7)}-${rawPhone.slice(7)}`
          : rawPhone

        // ?몄뀡?????(??긽 理쒖떊 ?곗씠?곕줈 媛깆떊)
        savePartnerToSession({
          id: p.slug, name: p.name,
          phone: rawPhone,
          phoneDisplay: p.phoneDisplay || fallbackDisplay,
          prefix: '',
        })

        // ?? [2026-05-24] ?뚮쾿 ??2議?SPA ?쇱슦???쒖? ??
        // /p/:phone ? 臾댁“嫄?紐낇븿(媛쒖씤?? ?섏씠吏濡?吏꾩엯.
        // 怨쇨굅: ?view=card ?뚮씪誘명꽣 ?놁쑝硫?navigate('/')濡?硫붿씤 異붾갑 ??URL 蹂듭궗쨌怨듭쑀 ??紐낇븿?????⑤뒗 移섎챸???뚭?
        // ?꾩옱: ?뚰듃???곗씠??濡쒕뱶?섎㈃ ??긽 紐낇븿 ?섏씠吏 ?뚮뜑. viewCard ?뚮씪誘명꽣?????댁긽 吏꾩엯 寃뚯씠?멸? ?꾨떂(PWA 遺媛 濡쒖쭅 ?좏샇?⑹쑝濡쒕쭔 ?좎?)
        setPartner(p)
        setLoading(false)
      } else {
        setNotFound(true)
        setLoading(false)
      }
    })
  }, [phone])

  // ?? ?덊솕硫?諛붾줈媛湲?留뚮뱾湲??몃뱾????
  const handleAddToHome = () => {
    const ua = navigator.userAgent || ''
    const isInApp = /KAKAOTALK|NAVER|Instagram|FB_IAB|FBAN|FBAV|Line|wv|WebView/i.test(ua)
    const isAndroid = /Android/i.test(ua)
    const isIphone = /iPhone|iPad|iPod/i.test(ua)
    const isSafari = /Safari/i.test(ua) && !/Chrome|CriOS|FxiOS/i.test(ua)

    // ?pwa=1 遺숈씤 URL: Chrome/Safari濡??섏뼱媛????곷떒 諛곕꼫媛 ?먮룞?쇰줈 ??
    const pwaUrl = `${cardUrl}?view=card&pwa=1`
    const encodedPwaUrl = encodeURIComponent(pwaUrl)

    if (isAndroid) {
      // Android (?몄빋 ?ы븿 ?꾨?) ??Chrome?쇰줈 媛뺤젣 ?대룞
      // Chrome ?대━硫??pwa=1 媛먯? ???곷떒??"???????붾㈃??異붽?" 諛곕꼫 ?먮룞?쇰줈 ?쒖떆
      const intentUrl = `intent://${pwaUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodedPwaUrl};end`
      window.location.href = intentUrl

    } else if (isIphone) {
      // iPhone (?몄빋 ?ы븿 ?꾨?) ??Safari濡?媛뺤젣 ?대룞
      // Safari ?대━硫??pwa=1 媛먯? ???곷떒??"燧놅툘 ?????붾㈃??異붽?" 諛곕꼫 ?먮룞?쇰줈 ?쒖떆
      window.location.href = pwaUrl.replace('https://', 'x-safari-https://')

    } else {
      // ?곗뒪?ы깙 ????諛곕꼫 諛붾줈 ?쒖떆
      setInstallBannerType('android')
      setShowInstallBanner(true)
    }
  }

  // ?욌㈃ + ?룸㈃???몃줈濡??댁뼱遺숈뿬 PNG 1?μ쑝濡??ㅼ슫濡쒕뱶
  const downloadCard = async () => {
    setDownloading(true)
    try {
      const [frontCanvas, backCanvas] = await Promise.all([
        drawFront(partner, cardUrl),
        drawBack(partner, cardUrl),
      ])

      const W = frontCanvas.width
      const GAP = 40  // ?욌뮘 ?ъ씠 ?щ갚
      const LABEL_H = 50  // ?쇰꺼 ?믪씠

      // ?⑸낯 罹붾쾭?? ?욌㈃ + ?쇰꺼 + ?룸㈃ ?몃줈濡?
      const merged = document.createElement('canvas')
      merged.width  = W
      merged.height = frontCanvas.height + GAP + LABEL_H + backCanvas.height + GAP + LABEL_H

      const mc = merged.getContext('2d')

      // ?꾩껜 諛곌꼍 ?곗깋
      mc.fillStyle = '#f5f5f5'
      mc.fillRect(0, 0, merged.width, merged.height)

      // ?욌㈃ ?쇰꺼
      mc.fillStyle = '#B8953A'
      mc.font = 'bold 28px Arial, sans-serif'
      mc.textAlign = 'center'
      mc.fillText('[ ?욌㈃ ]', W / 2, 36)

      // ?욌㈃
      mc.drawImage(frontCanvas, 0, LABEL_H)

      // ?룸㈃ ?쇰꺼
      const backY = LABEL_H + frontCanvas.height + GAP
      mc.fillText('[ ?룸㈃ ]', W / 2, backY + 36)

      // ?룸㈃
      mc.drawImage(backCanvas, 0, backY + LABEL_H)

      // ??1踰??ㅼ슫濡쒕뱶
      const a = document.createElement('a')
      a.download = `${partner.name}_?꾩옄紐낇븿_?욌뮘_PHLOROTANNIN_PARTNERS.png`
      a.href = merged.toDataURL('image/png')
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      console.error(e)
      alert('?ㅼ슫濡쒕뱶 ?ㅻ쪟. ?좎떆 ???ㅼ떆 ?쒕룄??二쇱꽭??')
    } finally {
      setDownloading(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: CREAM }}>
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-4"
          style={{ borderColor: `${GOLD} transparent transparent transparent` }} />
        <p style={{ color: GOLD, fontSize: '14px' }}>?좎떆留?湲곕떎??二쇱꽭??..</p>
      </div>
    </div>
  )

  if (notFound) return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ background: CREAM }}>
      <div className="text-center max-w-sm">
        <AlertCircle className="w-14 h-14 mx-auto mb-4" style={{ color: `${GOLD}80` }} />
        <h2 className="text-xl font-bold mb-2" style={{ color: NAVY }}>?섏씠吏瑜?李얠쓣 ???놁뒿?덈떎</h2>
        <p className="mb-6" style={{ color: '#666' }}>?좏슚?섏? ?딆? ?뚰듃??留곹겕?낅땲??</p>
        <button onClick={() => navigate('/')}
          className="px-6 py-3 rounded-xl font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${NAVY}, #1a3a6a)` }}>
          硫붿씤?쇰줈 ?대룞
        </button>
      </div>
    </div>
  )

  const tel = `tel:${partner.phone}`
  const sms = `sms:${partner.phone}?body=${encodeURIComponent('[PHLOROTANNIN PARTNERS] ?덈뀞?섏꽭?? 紐낇븿??蹂닿퀬 ?곕씫?쒕┰?덈떎.')}`

  const nameLen = (partner.name || '').length
  // ?붾㈃ ?덈퉬???곕씪 諛섏쓳?뺤쑝濡?議곗젙: vw 湲곕컲?쇰줈 ?덈? ?섎━吏 ?딄쾶
  const screenNameSize = nameLen <= 2 ? '2.8rem' : nameLen <= 3 ? '2.4rem' : nameLen <= 4 ? '2.0rem' : '1.6rem'
  const screenLetterSp = nameLen <= 3 ? '0.15em' : nameLen <= 4 ? '0.10em' : '0.06em'

  return (
    <>
      <SEOHead
        title={`${partner.name} | Phlorotannin Partners`}
        description="?뚮났?붾（??而⑥꽕?댄듃 ???좊ː瑜??꾪븯???뚮났 ?붾（??
        canonical={cardUrl}
        noindex={true}
      />

      <div className="min-h-screen"
        data-platform="phlorotannin-partner-page"
        data-owner="phlorotannin.com"
        data-page-type="partner-business-card"
        data-partner-slug={partner?.slug || partner?.phone || ''}
        data-copyright="짤 2026 phlorotannin.com"
        style={{ background: `linear-gradient(160deg, ${CREAM} 0%, ${CREAM2} 50%, ${CREAM3} 100%)` }}>

        {/* ?곷떒 ?ㅻ뜑 */}
        <div className="py-4 px-5 text-center"
          style={{ background: `linear-gradient(90deg, ${NAVY} 0%, #1a3a6a 100%)`, borderBottom: `3px solid ${GOLD}` }}>
          <div className="flex items-center justify-center gap-3">
            <div style={{ width: '30px', height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
            <span style={{ color: GOLD, fontSize: '12px', fontWeight: '800', letterSpacing: '4px' }}>
              PHLOROTANNIN PARTNERS
            </span>
            <div style={{ width: '30px', height: '1px', background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-6">

          <p className="text-center mb-4"
            style={{ color: GOLD, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
            ??&nbsp;Digital Business Card&nbsp; ??
          </p>

          {/* ?먥븧?먥븧 紐낇븿 移대뱶 (?????뚮┰) ?먥븧?먥븧 */}
          <div
            className="mb-6 cursor-pointer select-none"
            onClick={() => setFlipped(!flipped)}
            style={{
              borderRadius: '20px', overflow: 'hidden',
              boxShadow: `0 8px 40px ${GOLD}40, 0 0 0 2px ${GOLD}`,
              transition: 'transform 0.15s ease',
            }}
          >
            {!flipped ? (
              /* ?? ?욌㈃ ?붾㈃ 誘몃━蹂닿린 ?? */
              <div style={{ background: `linear-gradient(135deg, ${CREAM} 0%, ${CREAM2} 60%, ${CREAM3} 100%)`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ height: '7px', background: `linear-gradient(90deg, ${NAVY}, ${GOLD}, ${GOLD2}, ${GOLD}, ${NAVY})` }} />
                <div style={{ position: 'absolute', left: 0, top: '7px', bottom: '7px', width: '8px', background: `linear-gradient(180deg, ${NAVY}, #1a3a6a, ${NAVY})` }} />
                <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', width: '180px', height: '180px', borderRadius: '50%', border: `1.5px solid ${GOLD}20` }} />

                <div style={{ padding: '24px 22px 18px 28px', position: 'relative' }}>
                  <div className="flex justify-between items-start gap-3">
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '10px', color: GOLD, fontWeight: '800', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
                        PHLOROTANNIN PARTNERS
                      </p>
                      <h1 style={{ fontSize: screenNameSize, fontWeight: '900', color: NAVY, letterSpacing: screenLetterSp, wordBreak: 'keep-all', overflowWrap: 'break-word', whiteSpace: 'normal', marginBottom: '8px', lineHeight: 1.15 }}>
                        {partner.name}
                      </h1>
                      <p style={{ fontSize: '14px', color: GOLD, fontWeight: '800', letterSpacing: '2px', marginBottom: '10px' }}>
                        ?뚮났?붾（??而⑥꽕?댄듃
                      </p>
                      <div style={{ width: '48px', height: '3px', marginBottom: '12px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})` }} />
                      <p style={{ fontSize: '13px', color: '#4a5568', lineHeight: '1.9' }}>?좊ː瑜??꾪븯???뚮났 ?붾（??/p>
                      <p style={{ fontSize: '15px', color: NAVY, fontWeight: '800', marginTop: '4px' }}>??nbsp; {partner.phoneDisplay}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 flex-shrink-0" style={{ maxWidth: '85px' }}>
                      <div style={{ border: `2px solid ${GOLD}`, borderRadius: '10px', padding: '4px', background: '#fff', boxShadow: `0 4px 16px ${GOLD}35` }}>
                        <QRCode url={cardUrl} size={75} />
                      </div>
                      <p style={{ fontSize: '8px', color: GOLD, letterSpacing: '1.5px', fontWeight: '700', textTransform: 'uppercase' }}>SCAN ME</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: `1.5px solid ${GOLD}30` }}>
                    <div className="flex items-center gap-2">
                      <Leaf className="w-3.5 h-3.5" style={{ color: GOLD }} />
                      <span style={{ fontSize: '12px', color: GOLD, letterSpacing: '1.5px', fontWeight: '700' }}>phlorotannin.com</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#bbb' }}>??븯硫??ㅼ쭛湲???/span>
                  </div>
                </div>
                <div style={{ height: '7px', background: `linear-gradient(90deg, ${NAVY}, ${GOLD}, ${GOLD2}, ${GOLD}, ${NAVY})` }} />
              </div>

            ) : (

              /* ?? ?룸㈃ ?붾㈃ 誘몃━蹂닿린 ???щ┝ ???? */
              <div style={{ background: `linear-gradient(135deg, ${CREAM} 0%, ${CREAM2} 60%, ${CREAM3} 100%)`, position: 'relative', overflow: 'hidden', minHeight: '310px' }}>
                <div style={{ height: '7px', background: `linear-gradient(90deg, ${NAVY}, ${GOLD}, ${GOLD2}, ${GOLD}, ${NAVY})` }} />
                <div style={{ position: 'absolute', left: 0, top: '7px', bottom: '7px', width: '8px', background: `linear-gradient(180deg, ${NAVY}, #1a3a6a, ${NAVY})` }} />

                {/* ?곗륫 ?먰삎 ?μ떇 */}
                <div style={{ position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)', width: '220px', height: '220px', borderRadius: '50%', border: `1.5px solid ${GOLD}20` }} />
                <div style={{ position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', width: '140px', height: '140px', borderRadius: '50%', border: `1px solid ${GOLD}15` }} />

                <div style={{ padding: '26px 22px 20px 28px', position: 'relative' }}>
                  <p style={{ fontSize: '10px', color: GOLD, fontWeight: '800', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
                    PHLOROTANNIN PARTNERS
                  </p>

                  <div className="flex justify-between items-start gap-3">
                    {/* ?쇱そ ?띿뒪??*/}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: NAVY, lineHeight: 1.4, marginBottom: '12px' }}>
                        ?좊ː瑜??꾪븯??br />?뚮났 ?붾（??
                      </h2>
                      <div style={{ width: '48px', height: '3px', marginBottom: '12px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})` }} />
                      <p style={{ fontSize: '13px', color: '#4a5568', lineHeight: '1.9', marginBottom: '14px' }}>
                        ?꾩슂???뺣낫? ?곌껐??br />???뺣룉??諛⑹떇?쇰줈 ?쒖븞?⑸땲??
                      </p>
                      <p style={{ fontSize: '14px', color: GOLD, fontWeight: '800' }}>{partner.name} 而⑥꽕?댄듃</p>
                      <p style={{ fontSize: '14px', color: NAVY, fontWeight: '700', marginTop: '4px' }}>??nbsp; {partner.phoneDisplay}</p>
                    </div>

                    {/* ?ㅻⅨ履?QR */}
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div style={{ border: `2px solid ${GOLD}`, borderRadius: '12px', padding: '5px', background: '#fff', boxShadow: `0 6px 24px ${GOLD}35` }}>
                        <QRCode url={cardUrl} size={88} />
                      </div>
                      <p style={{ fontSize: '9px', color: GOLD, letterSpacing: '2px', fontWeight: '700', textTransform: 'uppercase' }}>SCAN ME</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: `1.5px solid ${GOLD}30` }}>
                    <div className="flex items-center gap-2">
                      <Leaf className="w-3.5 h-3.5" style={{ color: GOLD }} />
                      <span style={{ fontSize: '12px', color: GOLD, letterSpacing: '1.5px', fontWeight: '700' }}>phlorotannin.com</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#bbb' }}>???욌㈃?쇰줈 ?뚯븘媛湲?/span>
                  </div>
                </div>

                <div style={{ height: '7px', background: `linear-gradient(90deg, ${NAVY}, ${GOLD}, ${GOLD2}, ${GOLD}, ${NAVY})` }} />
              </div>
            )}
          </div>

          {/* ?먥븧?먥븧 ?곕씫泥????踰꾪듉 ?먥븧?먥븧 */}
          <button
            onClick={() => setShowContact(true)}
            className="w-full flex items-center justify-center gap-3 rounded-2xl py-4 mb-4 active:scale-95 transition-transform"
            style={{
              background: `linear-gradient(135deg, ${NAVY}, #1a3a6a)`,
              color: '#fff',
              boxShadow: `0 4px 20px ${NAVY}60`,
              border: `2px solid ${GOLD}60`,
            }}
          >
            <UserPlus className="w-5 h-5" style={{ color: GOLD }} />
            <span style={{ fontSize: '16px', fontWeight: '800' }}>?곕씫泥???ν븯湲?/span>
            <span style={{ fontSize: '12px', color: GOLD }}>쨌 二쇱냼濡??깅줉</span>
          </button>

          {/* ?먥븧?먥븧 ?곕씫泥?????덈궡 ?앹뾽 ?먥븧?먥븧 */}
          {showContact && (
            <div
              className="fixed inset-0 z-50 flex items-end justify-center"
              style={{ background: 'rgba(0,0,0,0.55)' }}
              onClick={() => setShowContact(false)}
            >
              <div
                className="w-full max-w-md rounded-t-3xl p-6 pb-10"
                style={{ background: '#FFFDF7', border: `3px solid ${GOLD}` }}
                onClick={e => e.stopPropagation()}
              >
                {/* ?몃뱾 */}
                <div className="w-10 h-1.5 rounded-full mx-auto mb-5" style={{ background: `${GOLD}60` }} />

                {/* ?쒕ぉ */}
                <div className="flex items-center gap-3 mb-6">
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: `linear-gradient(135deg, ${NAVY}, #1a3a6a)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <UserPlus style={{ width: '24px', height: '24px', color: GOLD }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '18px', fontWeight: '900', color: NAVY }}>?곕씫泥????諛⑸쾿</p>
                    <p style={{ fontSize: '13px', color: '#888' }}>?꾨옒 ?쒖꽌?濡??곕씪?섏꽭??/p>
                  </div>
                </div>

                {/* ?④퀎 */}
                {[
                  { num: '1', text: '?꾨옒 踰꾪듉???뚮윭 ?뚯씪??諛쏆쑝?몄슂', sub: null },
                  { num: '2', text: '諛쏆? ?뚯씪???꾨Ⅴ?몄슂', sub: '?붾㈃ ?곷떒 ?뚮┝ ?먮뒗 ?ㅼ슫濡쒕뱶 ?대뜑' },
                  { num: '3', text: '"?곕씫泥섏뿉 異붽?" 瑜??꾨Ⅴ?몄슂', sub: '洹몃윭硫?諛붾줈 ????꾨즺!' },
                ].map(step => (
                  <div key={step.num} className="flex items-start gap-4 mb-5">
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                      background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: '18px', fontWeight: '900', color: NAVY }}>{step.num}</span>
                    </div>
                    <div style={{ paddingTop: '4px' }}>
                      <p style={{ fontSize: '17px', fontWeight: '800', color: NAVY, lineHeight: 1.4 }}>{step.text}</p>
                      {step.sub && <p style={{ fontSize: '13px', color: '#888', marginTop: '3px' }}>{step.sub}</p>}
                    </div>
                  </div>
                ))}

                {/* ?ㅼ슫濡쒕뱶 踰꾪듉 */}
                <button
                  onClick={() => {
                    const vcard = [
                      'BEGIN:VCARD',
                      'VERSION:3.0',
                      `FN:${partner.name}`,
                      `N:${partner.name};;;`,
                      `TEL;TYPE=CELL:${partner.phoneDisplay}`,
                      'ORG:PHLOROTANNIN PARTNERS',
                      'TITLE:?뚮났?붾（??而⑥꽕?댄듃',
                      `URL:${cardUrl}`,
                      'END:VCARD',
                    ].join('\r\n')
                    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `${partner.name}_PHLOROTANNIN_PARTNERS.vcf`
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    URL.revokeObjectURL(url)
                    setTimeout(() => setShowContact(false), 800)
                  }}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold active:scale-95 transition-transform mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
                    color: NAVY, fontSize: '17px',
                    boxShadow: `0 4px 16px ${GOLD}60`,
                  }}
                >
                  <Download className="w-5 h-5" />
                  ?뚯씪 諛쏄린 (?꾨Ⅴ?몄슂)
                </button>

                <button
                  onClick={() => setShowContact(false)}
                  className="w-full py-3 rounded-2xl font-bold"
                  style={{ background: '#eee', color: '#666', fontSize: '15px' }}
                >
                  ?リ린
                </button>
              </div>
            </div>
          )}

          {/* ?먥븧?먥븧 ?≪뀡 踰꾪듉 3媛??먥븧?먥븧 */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <a href={tel}
              className="flex flex-col items-center gap-2 rounded-2xl py-5 active:scale-95 transition-transform"
              style={{ background: '#fff', border: `2px solid ${GOLD}40`, boxShadow: `0 4px 16px ${GOLD}20` }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${NAVY}, #1a3a6a)`, boxShadow: `0 4px 14px ${NAVY}50` }}>
                <Phone className="w-6 h-6 text-white" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '800', color: NAVY }}>?꾪솕?섍린</span>
            </a>

            <a href={sms}
              className="flex flex-col items-center gap-2 rounded-2xl py-5 active:scale-95 transition-transform"
              style={{ background: '#fff', border: `2px solid ${GOLD}40`, boxShadow: `0 4px 16px ${GOLD}20` }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, boxShadow: `0 4px 14px ${GOLD}50` }}>
                <MessageSquare className="w-6 h-6" style={{ color: NAVY }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '800', color: NAVY }}>臾몄옄?섍린</span>
            </a>

            <button
              onClick={downloadCard}
              disabled={downloading}
              className="flex flex-col items-center gap-2 rounded-2xl py-5 active:scale-95 transition-transform disabled:opacity-50"
              style={{ background: '#fff', border: `2px solid ${GOLD}40`, boxShadow: `0 4px 16px ${GOLD}20` }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: saved ? 'linear-gradient(135deg, #16a34a, #4ade80)' : 'linear-gradient(135deg, #475569, #64748b)', boxShadow: '0 4px 14px #33415550' }}>
                <Download className="w-6 h-6 text-white" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '800', color: NAVY }}>
                {downloading ? '??μ쨷...' : saved ? '??λ맖 ?? : '紐낇븿???}
              </span>
            </button>
          </div>

          {/* ?먥븧?먥븧 ?좊ː 諛곗? ?먥븧?먥븧 */}
          <div className="rounded-2xl p-5 mb-5"
            style={{ background: '#fff', border: `2px solid ${GOLD}35`, boxShadow: `0 4px 20px ${GOLD}15` }}>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { icon: Shield, label: '?쇰Ц 湲곕컲', sub: '寃利앸맂 Q&A' },
                { icon: Heart,  label: '愿묎퀬 ?놁쓬', sub: '?쒖닔 嫄닿컯?뺣낫' },
                { icon: Star,   label: '1,311',   sub: '嫄닿컯 Q&A' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${CREAM2}, ${CREAM3})`, border: `1.5px solid ${GOLD}40` }}>
                    <Icon style={{ width: '20px', height: '20px', color: GOLD }} />
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: '800', color: NAVY }}>{label}</p>
                  <p style={{ fontSize: '12px', color: '#888' }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 援щ텇??*/}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: `${GOLD}50` }} />
            <span style={{ fontSize: '12px', color: GOLD, letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '700' }}>嫄닿컯 ?뺣낫 諛붾줈媛湲?/span>
            <div className="flex-1 h-px" style={{ background: `${GOLD}50` }} />
          </div>

          {/* ?먥븧?먥븧 硫붾돱 留곹겕 ?먥븧?먥븧 */}
          <div className="rounded-2xl overflow-hidden mb-5"
            style={{ background: '#fff', border: `2px solid ${GOLD}35`, boxShadow: `0 4px 20px ${GOLD}15` }}>
            {[
              { icon: Globe,    label: '?쎄쾶 諛곗슦???뚮줈濡쒗깂??, sub: '?꾧뎄???댄빐?섎뒗 嫄닿컯 ?뺣낫', path: '/easy' },
              { icon: Leaf,     label: '?뚮줈濡쒗깂???뚭컻',        sub: '?댁뼇 ?대━?섎? 湲곗큹 媛쒕뀗',  path: '/phlorotannin' },
              { icon: BookOpen, label: '嫄닿컯 Q&A 1,311媛?,       sub: '吏덊솚蹂??꾨Ц ?듬? 紐⑥쓬',    path: '/qa' },
            ].map((item, i, arr) => (
              <button key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center justify-between px-5 py-4 text-left active:opacity-70 transition-opacity"
                style={{ borderBottom: i < arr.length - 1 ? `1.5px solid ${GOLD}20` : 'none' }}>
                <div className="flex items-center gap-4">
                  <div style={{ width: '46px', height: '46px', borderRadius: '12px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${NAVY}, #1a3a6a)` }}>
                    <item.icon style={{ width: '22px', height: '22px', color: GOLD }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '800', color: NAVY, marginBottom: '2px' }}>{item.label}</p>
                    <p style={{ fontSize: '13px', color: '#888' }}>{item.sub}</p>
                  </div>
                </div>
                <ChevronRight style={{ width: '18px', height: '18px', color: `${GOLD}70`, flexShrink: 0 }} />
              </button>
            ))}
          </div>

          {/* ?먥븧?먥븧 ?뚰듃???곕씫 CTA ?먥븧?먥븧 */}
          <div className="rounded-2xl p-6 mb-5 text-center relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a3a6a 100%)`, boxShadow: `0 8px 30px ${NAVY}60` }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${NAVY}, ${GOLD}, ${GOLD2}, ${GOLD}, ${NAVY})` }} />
            <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '100px', height: '100px', borderRadius: '50%', border: `1px solid ${GOLD}20` }} />
            <p style={{ fontSize: '19px', fontWeight: '900', color: '#fff', marginBottom: '6px' }}>沅곴툑???먯씠 ?덉쑝?좉???</p>
            <p style={{ fontSize: '15px', color: GOLD2, marginBottom: '18px' }}>{partner.name} 而⑥꽕?댄듃媛 吏곸젒 ?덈궡???쒕┰?덈떎</p>
            <div className="flex gap-3">
              <a href={tel} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold active:scale-95 transition-transform"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, color: NAVY, fontSize: '15px' }}>
                <Phone className="w-5 h-5" /> ?꾪솕 臾몄쓽
              </a>
              <a href={sms} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold active:scale-95 transition-transform"
                style={{ background: 'rgba(255,255,255,0.1)', border: `2px solid ${GOLD}60`, color: '#fff', fontSize: '15px' }}>
                <MessageSquare className="w-5 h-5" /> 臾몄옄 臾몄쓽
              </a>
            </div>
          </div>

          {/* ?먥븧?먥븧 ?덊솕硫?諛붾줈媛湲?踰꾪듉 ?먥븧?먥븧 */}
          <button
            onClick={handleAddToHome}
            className="w-full flex items-center justify-center gap-3 rounded-2xl py-4 mb-4 active:scale-95 transition-transform"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
              color: NAVY,
              boxShadow: `0 4px 20px ${GOLD}60`,
              border: 'none',
              fontSize: '16px',
              fontWeight: '800',
            }}
          >
            <Smartphone className="w-5 h-5" />
            ?덊솕硫?諛붾줈媛湲?留뚮뱾湲?
          </button>

          <p className="text-center pt-2"
            style={{ fontSize: '12px', color: '#aaa', lineHeight: '1.9' }}>
            蹂??섏씠吏??嫄닿컯 ?뺣낫 ?쒓났 紐⑹쟻?대ŉ<br />?뱀젙 ?쒗뭹 ?먮ℓ? 臾닿??⑸땲??
          </p>

          {/* ?먥븧?먥븧 ?뚮옯???먯궛 蹂댄샇 怨좎? ?먥븧?먥븧 */}
          <div
            style={{
              marginTop: 18,
              marginBottom: 12,
              padding: '12px 14px',
              border: `1px solid ${GOLD}30`,
              borderRadius: 10,
              background: 'rgba(184,149,58,0.06)',
            }}
          >
            <p style={{ fontSize: '11px', fontWeight: 800, color: GOLD2, marginBottom: 6, letterSpacing: '0.5px' }}>
              짤 2026 phlorotannin.com 쨌 臾대떒蹂듭젣 湲덉?
            </p>
            <p style={{ fontSize: '11px', color: '#bfc8d4', lineHeight: 1.75, margin: 0 }}>
              蹂??섏씠吏??phlorotannin.com ?뚰듃???뺣낫?섏씠吏 ?쒖뒪?쒖쓣 ?듯빐 ?쒓났?섎뒗 媛쒖씤 ?뺣낫?섏씠吏?낅땲??
              ?섏씠吏??援ъ꽦, 臾멸뎄, ?대?吏, 留곹겕 援ъ“, ?곷떞 ?곌껐 諛⑹떇, ?먮즺???묎렐 諛⑹떇, ?뚰듃??肄붾뱶 援ъ“ 諛?DB ?곌껐 ?먮쫫?
              phlorotannin.com???뚮옯???먯궛?대ŉ,
              ?ъ쟾 ?쒕㈃ ?숈쓽 ?녿뒗 蹂듭젣쨌罹≪쿂 ???ш?怨돠룹쑀???섏씠吏 ?쒖옉쨌?곸뾽???댁슜쨌?곸뾽?먮즺 ?쒖슜??湲덉??⑸땲??
            </p>
            <a
              href="https://phlorotannin.com/copyright"
              style={{ display: 'inline-block', marginTop: 6, fontSize: '11px', color: GOLD2, textDecoration: 'underline' }}
            >
              ??묎텒 諛?臾대떒蹂듭젣 湲덉? ?덈궡 蹂닿린 ??
            </a>
          </div>
        </div>

        {/* ?먥븧?먥븧 ?뚮옯?셋룹냼?좉텒 ?뚰꽣留덊겕 (?쒓컖 ?쒖떆 0, 蹂듭젣 ???④퍡 ?곕씪媛??留덉빱) ?먥븧?먥븧 */}
        <div
          data-platform="phlorotannin-partner-system"
          data-owner="phlorotannin.com"
          data-signature="phlorotannin-platform-v1"
          aria-hidden="true"
          style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
        >
          짤 2026 phlorotannin.com ??phlorotannin-partner-page 쨌 臾대떒 蹂듭젣쨌?ш?怨돠룹긽?낆쟻 ?댁슜 湲덉?
        </div>
      </div>

      {/* ?먥븧?먥븧 Chrome/Safari ?대룞 ???곷떒 怨좎젙 ?덈궡 諛곕꼫 ?먥븧?먥븧 */}
      {showInstallBanner && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
            background: `linear-gradient(135deg, ${NAVY}, #1a3a6a)`,
            borderBottom: `3px solid ${GOLD}`,
            padding: '14px 16px 14px 16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
        >
          {/* ?リ린 */}
          <button
            onClick={() => setShowInstallBanner(false)}
            style={{ position: 'absolute', top: '10px', right: '14px', color: `${GOLD}`, background: 'none', border: 'none', fontSize: '20px', lineHeight: 1, cursor: 'pointer' }}
          >??/button>

          <div className="flex items-center gap-3" style={{ paddingRight: '28px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})` }}>
              <Smartphone style={{ width: '18px', height: '18px', color: NAVY }} />
            </div>
            <div>
              {installBannerType === 'android' ? (
                <>
                  <p style={{ fontSize: '14px', fontWeight: '900', color: '#fff', marginBottom: '2px' }}>
                    ?곗긽??<span style={{ color: GOLD2 }}>??/span> ?꾨Ⅴ怨??? <span style={{ color: GOLD2 }}>"???붾㈃??異붽?"</span> ?꾨Ⅴ?몄슂
                  </p>
                  <p style={{ fontSize: '12px', color: `${GOLD2}` }}>洹몃윭硫?諛붾줈媛湲곌? 留뚮뱾?댁졇??/p>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '14px', fontWeight: '900', color: '#fff', marginBottom: '2px' }}>
                    ?섎떒 <span style={{ color: GOLD2 }}>怨듭쑀</span> ?꾨Ⅴ怨???<span style={{ color: GOLD2 }}>"???붾㈃??異붽?"</span> ?꾨Ⅴ?몄슂
                  </p>
                  <p style={{ fontSize: '12px', color: `${GOLD2}` }}>洹몃윭硫?諛붾줈媛湲곌? 留뚮뱾?댁졇??/p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}


