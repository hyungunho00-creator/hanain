import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import QRCodeGenerator from 'qrcode'
import { QRCodeCanvas } from 'qrcode.react'
import {
  Phone, MessageSquare, Globe, Download,
  AlertCircle, ChevronRight, Leaf, Star, BookOpen, UserPlus, Smartphone, Share,
} from 'lucide-react'
import SEOHead from '../components/common/SEOHead'
import { savePartnerToSession } from '../context/PartnerContext'
import { resolvePartnerBySlugWithStatus } from '../lib/partner/resolvePartner'
import { formatPhoneDisplay, normalizePartnerSlug, normalizePhoneDigits } from '../lib/partner/normalizePartnerSlug'
import { partnerPathFor } from '../lib/partner/partnerRoutes'

const MAIN_SITE = 'https://phlorotannin.com'

const NAVY  = '#143D38'
const GREEN = '#2B7568'
const GOLD  = '#B9975B'
const GOLD2 = '#D7BD82'
const CREAM = '#F5F1E2'
const CREAM2 = '#EFE9D5'
const CREAM3 = '#E7DDC4'
const MINT = '#F7F3E7'
const DEEP = '#071F1E'
const MUTED = '#5F6F68'
const LINE = '#DCE8E2'
const SOFT_SHADOW = 'rgba(20,61,56,0.08)'
const MEDIUM_SHADOW = 'rgba(20,61,56,0.14)'
const MOLECULE_PHOTO = '/images/phlorotannin/partners/phlorotannin-molecule-light-card-v1.png'
const PRINT_CARD_WIDTH = 1080
const PRINT_CARD_HEIGHT = 600
const SCREEN_CARD_ASPECT = '90 / 50'

// Phase 2: Supabase partners 테이블 1순위, JSON fallback
const SB_URL_FOR_PARTNERS = 'https://rlfxuyeoluoeaxuujtly.supabase.co'
const SB_ANON_FOR_PARTNERS = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck'
const PARTNERS_JSON_URL = `${SB_URL_FOR_PARTNERS}/storage/v1/object/public/public/partners.json`

// Supabase partners 테이블 row(snake_case) → camelCase 어댑터
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

function normalizeCardPartner(partner, requestedSlug) {
  if (!partner) return null

  const slug = normalizePartnerSlug(partner.slug || partner.partnerSlug || partner.id || requestedSlug) || String(requestedSlug || '').trim()
  const phone = normalizePhoneDigits(partner.phone || partner.sms || slug) || ''
  const phoneDisplay = partner.phoneDisplay || partner.phone_display || formatPhoneDisplay(phone) || partner.phone || ''
  const name = partner.name || partner.displayName || partner.display_name || '신규 파트너'
  const sms = normalizePhoneDigits(partner.sms || phone) || phone

  return {
    ...partner,
    id: partner.id || slug,
    slug,
    partnerSlug: slug,
    name,
    displayName: partner.displayName || partner.display_name || name,
    phone,
    phoneDisplay,
    sms,
    kakaoUrl: partner.kakaoUrl || partner.kakao_url || '',
    siteUrl: partner.siteUrl || `${MAIN_SITE}/p/${slug}`,
  }
}

function createFallbackPartner(requestedSlug) {
  const slug = normalizePartnerSlug(requestedSlug) || String(requestedSlug || '').trim().toLowerCase()
  if (!slug) return null

  const phone = normalizePhoneDigits(slug) || normalizePhoneDigits(requestedSlug) || ''
  return {
    id: slug,
    slug,
    partnerSlug: slug,
    name: '신규 파트너',
    displayName: '신규 파트너',
    roleLabel: '플로로탄닌 건강정보 파트너',
    phone,
    phoneDisplay: formatPhoneDisplay(phone),
    sms: phone,
    kakaoUrl: '',
    siteUrl: `${MAIN_SITE}/p/${slug}`,
    fallbackMode: 'runtime-placeholder',
  }
}

async function fetchPartnerByPhoneFromTable(phone) {
  try {
    const digits = normalizePhoneDigits(phone) || ''
    const normalized = normalizePartnerSlug(phone) || ''
    const filters = []
    if (digits) {
      filters.push(`phone.eq.${encodeURIComponent(digits)}`)
      filters.push(`slug.eq.${encodeURIComponent(digits)}`)
    }
    if (normalized && normalized !== digits) filters.push(`slug.eq.${encodeURIComponent(normalized)}`)
    if (!filters.length) return null
    // phone 또는 slug로 매칭 (둘 다 전화번호지만 안전 차원에서 OR)
    const url = `${SB_URL_FOR_PARTNERS}/rest/v1/partners?select=slug,phone,name,phone_display,site_url,memo,created_at&status=eq.active&or=(${filters.join(',')})&limit=1`
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
  } catch { return null }
}

async function fetchPartnerByPhone(phone) {
  const resolved = await resolvePartnerBySlugWithStatus(phone, {
    route: `/p/${phone || ''}`,
    forceFresh: true,
  })
  if (resolved?.ok && resolved.partner) {
    return normalizeCardPartner(resolved.partner, phone)
  }

  // 1순위: Supabase partners 테이블
  const fromTable = await fetchPartnerByPhoneFromTable(phone)
  if (fromTable) return normalizeCardPartner(fromTable, phone)

  // Fallback: Storage JSON → Vercel 배포 JSON
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
        const digits = phone.replace(/\D/g, '')
        const normalized = normalizePartnerSlug(phone)
        const found = (data.partners || []).find(p =>
          p.phone?.replace(/\D/g, '') === digits || normalizePartnerSlug(p.slug) === normalized
        )
        if (found) return normalizeCardPartner(found, phone)
      } catch { continue }
    }
    return createFallbackPartner(phone)
  } catch { return createFallbackPartner(phone) }
}

function QRCode({ url, size = 100 }) {
  return (
    <QRCodeCanvas
      value={url}
      size={size}
      fgColor={NAVY}
      bgColor="#ffffff"
      level="M"
      marginSize={2}
      title="파트너 명함 QR"
      style={{ display: 'block', borderRadius: '4px' }}
    />
  )
}

function MoleculeNetworkSvg({ className = '', style = {}, opacity = 1 }) {
  return (
    <svg className={className} style={style} viewBox="0 0 360 470" fill="none" aria-hidden="true">
      <g opacity={opacity}>
        <path d="M36 78 91 46 151 76 205 48 282 87" stroke="#BFEFE4" strokeWidth="2.5" />
        <path d="M36 78 61 153 132 126 188 168 255 134 316 177" stroke="#BFEFE4" strokeWidth="2.5" />
        <path d="M61 153 39 292 98 352 173 315 229 373 306 333" stroke="#BFEFE4" strokeWidth="2.5" />
        <path d="M132 126 151 76 188 168 206 256 173 315" stroke="#E6D39B" strokeWidth="2" />
        <path d="M255 134 282 87 316 177 286 254 229 373" stroke="#E6D39B" strokeWidth="2" />
        {[
          [36, 78, 8, '#EFF8F1'], [91, 46, 5, '#E5C77A'], [151, 76, 9, '#BFEFE4'], [205, 48, 5, '#E5C77A'],
          [282, 87, 8, '#EFF8F1'], [61, 153, 6, '#BFEFE4'], [132, 126, 7, '#E5C77A'], [188, 168, 6, '#EFF8F1'],
          [255, 134, 9, '#BFEFE4'], [316, 177, 6, '#E5C77A'], [39, 292, 10, '#EFF8F1'], [98, 352, 6, '#BFEFE4'],
          [173, 315, 7, '#E5C77A'], [229, 373, 8, '#BFEFE4'], [306, 333, 10, '#EFF8F1'], [206, 256, 5, '#E5C77A'],
          [286, 254, 5, '#BFEFE4'],
        ].map(([cx, cy, r, fill], idx) => (
          <circle key={idx} cx={cx} cy={cy} r={r} fill={fill} />
        ))}
      </g>
    </svg>
  )
}

function MoleculePhotoPanel({ small = false }) {
  return (
    <div
      style={{
        position: 'relative',
        width: small ? '100%' : '40%',
        minWidth: 0,
        alignSelf: 'stretch',
        borderRadius: small ? '10px' : '14px',
        overflow: 'hidden',
        border: `1.5px solid ${GOLD}`,
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.6)), url(${MOLECULE_PHOTO})`,
        backgroundSize: 'cover',
        backgroundPosition: small ? '28% center' : '30% center',
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.72), 0 10px 24px ${NAVY}12`,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(255,255,255,0.36) 0 18%, transparent 19% 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 26px rgba(20,61,56,0.08)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '6px 8px', fontSize: '6px', letterSpacing: '0.14em', color: NAVY, background: 'rgba(255,255,255,0.68)' }}>
        PHLOROTANNIN · ECKLONIA CAVA
      </div>
    </div>
  )
}

function MoleculeWatermark({ style = {} }) {
  return (
    <svg viewBox="0 0 360 160" style={{ position: 'absolute', pointerEvents: 'none', ...style }} aria-hidden="true">
      <g opacity="0.22" stroke={GREEN} strokeWidth="5" fill="none">
        <polygon points="58,47 98,24 139,47 139,94 98,118 58,94" />
        <polygon points="158,68 199,45 239,68 239,115 199,138 158,115" />
        <polygon points="264,36 304,13 345,36 345,83 304,107 264,83" />
        <path d="M139 70h19M239 86l25-24" />
      </g>
      <g fill={GOLD2} opacity="0.4">
        {[58, 98, 139, 199, 239, 304, 345].map((x, i) => (
          <circle key={i} cx={x} cy={i % 2 ? 24 : 47} r="7" />
        ))}
      </g>
    </svg>
  )
}

// ─────────────────────────────────────────────
//  공통 Canvas 유틸 — 골드 띠 / 사이드바 / 테두리
// ─────────────────────────────────────────────
function drawFrame(ctx, W, H) {
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0,   '#FFFFFF')
  bg.addColorStop(0.58, '#FFFDF6')
  bg.addColorStop(1,   '#F4F0E2')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // Subtle paper grain for the downloaded PNG.
  ctx.save()
  ctx.globalAlpha = 0.045
  for (let y = 0; y < H; y += 7) {
    ctx.strokeStyle = y % 14 === 0 ? '#fff' : '#9AB8AE'
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(W, y + Math.sin(y / 31) * 2)
    ctx.stroke()
  }
  ctx.restore()

  const topRule = ctx.createLinearGradient(42, 38, W - 42, 38)
  topRule.addColorStop(0, GREEN)
  topRule.addColorStop(0.52, GOLD2)
  topRule.addColorStop(1, '#EDE0BA')
  ctx.fillStyle = topRule
  ctx.fillRect(42, 38, W - 84, 8)

  ctx.strokeStyle = 'rgba(20,61,56,0.58)'
  ctx.lineWidth = 2
  ctx.beginPath(); roundRect(ctx, 28, 28, W - 56, H - 56, 24); ctx.stroke()
  ctx.strokeStyle = 'rgba(215,189,130,0.58)'
  ctx.lineWidth = 2
  ctx.beginPath(); roundRect(ctx, 42, 42, W - 84, H - 84, 18); ctx.stroke()
}

function drawSidebar(ctx, H) {
  ctx.fillStyle = GREEN
  ctx.fillRect(0, 24, 28, H - 48)
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

function drawImageCover(ctx, img, x, y, w, h, focusX = 0.34, focusY = 0.5) {
  const sourceRatio = img.width / img.height
  const targetRatio = w / h
  let sx = 0, sy = 0, sw = img.width, sh = img.height

  if (sourceRatio > targetRatio) {
    sw = img.height * targetRatio
    sx = Math.max(0, Math.min(img.width - sw, (img.width - sw) * focusX))
  } else {
    sh = img.width / targetRatio
    sy = Math.max(0, Math.min(img.height - sh, (img.height - sh) * focusY))
  }

  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h)
}

function drawCanvasMolecule(ctx, ox, oy, scale = 1, alpha = 0.55) {
  const hex = (cx, cy, r) => {
    const pts = []
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 180) * (60 * i - 30)
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r])
    }
    for (let i = 0; i < 6; i++) {
      ctx.beginPath()
      ctx.moveTo(pts[i][0], pts[i][1])
      ctx.lineTo(pts[(i + 1) % 6][0], pts[(i + 1) % 6][1])
      ctx.stroke()
    }
    return pts
  }

  ctx.save()
  ctx.globalAlpha = alpha
  ctx.strokeStyle = GREEN
  ctx.lineWidth = 4 * scale
  ctx.fillStyle = GOLD2
  const rings = [[ox, oy], [ox + 105 * scale, oy + 38 * scale], [ox + 205 * scale, oy - 12 * scale]]
  let prev = null
  rings.forEach(([cx, cy]) => {
    const pts = hex(cx, cy, 38 * scale)
    if (prev) {
      ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(pts[3][0], pts[3][1]); ctx.stroke()
    }
    prev = pts[0]
    ;[0, 2, 4].forEach((idx) => {
      const [x, y] = pts[idx]
      ctx.beginPath(); ctx.arc(x, y, 7 * scale, 0, Math.PI * 2); ctx.fill()
    })
  })
  ctx.restore()
}

async function drawMoleculePhotoPanelCanvas(ctx, x, y, w, h) {
  ctx.save()
  ctx.beginPath(); roundRect(ctx, x, y, w, h, 26); ctx.clip()
  const moleculePhoto = await loadImage(MOLECULE_PHOTO)
  if (moleculePhoto) {
    drawImageCover(ctx, moleculePhoto, x, y, w, h, 0.32, 0.5)
  } else {
    const bg = ctx.createLinearGradient(x, y, x + w, y + h)
    bg.addColorStop(0, '#FFFFFF')
    bg.addColorStop(0.7, MINT)
    bg.addColorStop(1, '#EDE5CC')
    ctx.fillStyle = bg
    ctx.fillRect(x, y, w, h)
    drawCanvasMolecule(ctx, x + 68, y + 120, 1.05, 0.28)
  }

  const shade = ctx.createLinearGradient(x, y, x + w, y + h)
  shade.addColorStop(0, 'rgba(255,255,255,0.02)')
  shade.addColorStop(0.58, 'rgba(255,255,255,0.24)')
  shade.addColorStop(1, 'rgba(255,255,255,0.66)')
  ctx.fillStyle = shade
  ctx.fillRect(x, y, w, h)

  ctx.fillStyle = 'rgba(255,255,255,0.34)'
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + w * 0.55, y)
  ctx.lineTo(x + w * 0.28, y + h)
  ctx.lineTo(x, y + h)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = 'rgba(255,255,255,0.72)'
  ctx.fillRect(x, y + h - 36, w, 36)
  ctx.fillStyle = NAVY
  ctx.font = 'bold 13px Arial, sans-serif'
  ctx.fillText('PHLOROTANNIN · ECKLONIA CAVA', x + 14, y + h - 13)
  ctx.restore()
  ctx.strokeStyle = GOLD
  ctx.lineWidth = 2
  ctx.beginPath(); roundRect(ctx, x, y, w, h, 26); ctx.stroke()
}

async function drawMoleculePhotoBandCanvas(ctx, x, y, w, h) {
  ctx.save()
  ctx.beginPath(); roundRect(ctx, x, y, w, h, 22); ctx.clip()
  const moleculePhoto = await loadImage(MOLECULE_PHOTO)
  if (moleculePhoto) {
    drawImageCover(ctx, moleculePhoto, x, y, w, h, 0.26, 0.5)
  } else {
    ctx.fillStyle = MINT
    ctx.fillRect(x, y, w, h)
    drawCanvasMolecule(ctx, x + 70, y + 52, 0.8, 0.28)
  }
  const wash = ctx.createLinearGradient(x, y, x + w, y)
  wash.addColorStop(0, 'rgba(255,255,255,0.1)')
  wash.addColorStop(0.52, 'rgba(255,255,255,0.42)')
  wash.addColorStop(1, 'rgba(255,255,255,0.82)')
  ctx.fillStyle = wash
  ctx.fillRect(x, y, w, h)
  ctx.restore()
  ctx.strokeStyle = 'rgba(185,151,91,0.58)'
  ctx.lineWidth = 2
  ctx.beginPath(); roundRect(ctx, x, y, w, h, 22); ctx.stroke()
}

function drawGoldRule(ctx, x, y, w) {
  const lg = ctx.createLinearGradient(x, y, x + w, y)
  lg.addColorStop(0, GOLD)
  lg.addColorStop(1, GOLD2)
  ctx.strokeStyle = lg
  ctx.lineWidth = 5
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke()
}

// ─────────────────────────────────────────────
//  앞면 Canvas
// ─────────────────────────────────────────────
async function drawFront(partner, cardUrl) {
  const W = PRINT_CARD_WIDTH, H = PRINT_CARD_HEIGHT
  const canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')

  drawFrame(ctx, W, H)
  await drawMoleculePhotoPanelCanvas(ctx, 64, 76, 300, 448)
  drawCanvasMolecule(ctx, 668, 122, 1.02, 0.09)

  const TX = 408
  ctx.fillStyle = GREEN
  ctx.font = 'bold 28px Arial, sans-serif'
  ctx.fillText('PHLOROTANNIN', TX, 132)
  ctx.fillStyle = MUTED
  ctx.font = '20px Arial, sans-serif'
  ctx.fillText('PARTNERS', TX, 162)

  const nameLen = (partner.name || '').length
  const namePx = nameLen <= 3 ? 88 : nameLen <= 4 ? 76 : 64
  ctx.fillStyle = NAVY
  ctx.font = `900 ${namePx}px Arial, sans-serif`
  ctx.fillText(partner.name || '', TX, 260)

  ctx.fillStyle = NAVY
  ctx.font = 'bold 30px Arial, sans-serif'
  ctx.fillText('회복 플래너 · AI 검색 파트너', TX, 316)
  drawGoldRule(ctx, TX, 350, 350)

  ctx.fillStyle = MUTED
  ctx.font = '25px Arial, sans-serif'
  ctx.fillText('샵 AI 검색·Q&A·연구자료를', TX, 414)
  ctx.fillText('내 파트너 링크로 바로 안내합니다.', TX, 454)

  ctx.fillStyle = NAVY
  ctx.font = 'bold 31px Arial, sans-serif'
  ctx.fillText(partner.phoneDisplay || '', TX, 526)
  ctx.font = '25px Arial, sans-serif'
  ctx.fillText('phlorotannin.com', 650, 526)

  return canvas
}

// ─────────────────────────────────────────────
//  뒷면 Canvas  (크림 톤 통일)
// ─────────────────────────────────────────────
async function drawBack(partner, cardUrl) {
  const W = PRINT_CARD_WIDTH, H = PRINT_CARD_HEIGHT
  const canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')

  drawFrame(ctx, W, H)
  drawCanvasMolecule(ctx, 124, 98, 1.08, 0.07)

  const TX = 82
  ctx.fillStyle = GREEN
  ctx.font = 'bold 34px Arial, sans-serif'
  ctx.fillText('QR로 열리는', TX, 132)
  ctx.fillStyle = NAVY
  ctx.font = '900 48px Arial, sans-serif'
  ctx.fillText('회복 플래너 링크', TX, 198)
  ctx.fillText('AI 검색 에이전트', TX, 256)
  drawGoldRule(ctx, TX, 304, 390)

  ctx.fillStyle = NAVY
  ctx.font = '28px Arial, sans-serif'
  ctx.fillText('1. 회복 플래너 상담 흐름', TX, 386)
  ctx.fillText('2. 샵 AI 검색 에이전트', TX, 438)
  ctx.fillText('3. Q&A·블로그·명함 저장', TX, 490)

  ctx.fillStyle = NAVY
  ctx.font = 'bold 30px Arial, sans-serif'
  ctx.fillText(`${partner.name || ''} 파트너`, 724, 424)
  ctx.font = 'bold 28px Arial, sans-serif'
  ctx.fillText(partner.phoneDisplay || '', 724, 468)
  ctx.fillStyle = MUTED
  ctx.font = '19px Arial, sans-serif'
  ctx.fillText(cardUrl.replace('https://', ''), 724, 506)

  const qrSize = 214, qrX = W - qrSize - 96, qrY = 124

  ctx.fillStyle = '#fff'
  ctx.beginPath(); roundRect(ctx, qrX - 24, qrY - 24, qrSize + 48, qrSize + 80, 24); ctx.fill()
  ctx.strokeStyle = NAVY; ctx.lineWidth = 3
  ctx.beginPath(); roundRect(ctx, qrX - 24, qrY - 24, qrSize + 48, qrSize + 80, 24); ctx.stroke()

  const qrDataUrl = await QRCodeGenerator.toDataURL(cardUrl, {
    width: qrSize * 2,
    margin: 2,
    errorCorrectionLevel: 'M',
    color: { dark: NAVY, light: '#FFFFFF' },
  })
  const qrImg = await loadImage(qrDataUrl)
  if (qrImg) ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize)

  ctx.fillStyle = NAVY; ctx.font = 'bold 22px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('SCAN ME', qrX + qrSize / 2, qrY + qrSize + 40)
  ctx.textAlign = 'left'

  return canvas
}

// ─────────────────────────────────────────────
//  메인 컴포넌트
// ─────────────────────────────────────────────
export default function BusinessCardPage() {
  const { partnerSlug: phone } = useParams()
  const navigate   = useNavigate()
  const [searchParams] = useSearchParams()
  const viewCard = searchParams.get('view') === 'card'
  const [partner,     setPartner]     = useState(null)
  const [loading,     setLoading]     = useState(true)
  const [notFound,    setNotFound]    = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [flipped,     setFlipped]     = useState(false)
  const [saved,       setSaved]       = useState(false)
  const [copied,      setCopied]      = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [showInstallBanner, setShowInstallBanner] = useState(false)  // 상단 고정 안내 배너
  const [installBannerType, setInstallBannerType] = useState('android') // 'android' | 'ios'
  const [compactCardPreview, setCompactCardPreview] = useState(false)
  const deferredPromptRef = useRef(null)

  const requestedSlug = phone || ''
  const normalizedRequestedSlug = normalizePartnerSlug(requestedSlug) || requestedSlug
  const activePartnerSlug = partner?.slug || normalizedRequestedSlug
  const cardUrl = `${MAIN_SITE}/p/${encodeURIComponent(activePartnerSlug || requestedSlug)}`

  useEffect(() => {
    const updatePreviewSize = () => setCompactCardPreview(window.innerWidth < 480)
    updatePreviewSize()
    window.addEventListener('resize', updatePreviewSize)
    return () => window.removeEventListener('resize', updatePreviewSize)
  }, [])

  // ── Android beforeinstallprompt 캐치 + ?pwa=1 로 넘어온 경우 상단 배너 표시 ──
  useEffect(() => {
    const ua = navigator.userAgent || ''
    const isAndroid = /Android/i.test(ua)
    const isIphone = /iPhone|iPad|iPod/i.test(ua)

    // Android: beforeinstallprompt 저장
    const handler = (e) => {
      e.preventDefault()
      deferredPromptRef.current = e
    }
    window.addEventListener('beforeinstallprompt', handler)

    // ?pwa=1 파라미터 → Chrome/Safari로 넘어온 상태 → 상단 안내 배너 표시
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
    fetchPartnerByPhone(phone).then(p => {
      if (p) {
        const rawPhone = p.phone?.replace(/\D/g, '') || phone
        const fallbackDisplay = rawPhone.length === 11
          ? `${rawPhone.slice(0,3)}-${rawPhone.slice(3,7)}-${rawPhone.slice(7)}`
          : rawPhone

        // 세션에 저장 (항상 최신 데이터로 갱신)
        savePartnerToSession({
          id: p.slug,
          slug: p.slug,
          partnerSlug: p.slug,
          name: p.name,
          displayName: p.displayName || p.name,
          phone: rawPhone,
          phoneDisplay: p.phoneDisplay || fallbackDisplay,
          sms: p.sms || rawPhone,
          kakaoUrl: p.kakaoUrl || '',
          prefix: '',
          isPartnerContext: true,
        })

        // ── [2026-05-24] 헌법 제12조 SPA 라우팅 표준 ──
        // /p/:phone 은 무조건 명함(개인화) 페이지로 진입.
        // 과거: ?view=card 파라미터 없으면 navigate('/')로 메인 추방 → URL 복사·공유 시 명함이 안 뜨는 치명적 회귀
        // 현재: 파트너 데이터 로드되면 항상 명함 페이지 렌더. viewCard 파라미터는 더 이상 진입 게이트가 아님(PWA 부가 로직 신호용으로만 유지)
        setPartner(p)
        setLoading(false)
      } else {
        setNotFound(true)
        setLoading(false)
      }
    })
  }, [phone])

  // ── 홈화면 바로가기 만들기 핸들러 ──
  const handleAddToHome = () => {
    const ua = navigator.userAgent || ''
    const isInApp = /KAKAOTALK|NAVER|Instagram|FB_IAB|FBAN|FBAV|Line|wv|WebView/i.test(ua)
    const isAndroid = /Android/i.test(ua)
    const isIphone = /iPhone|iPad|iPod/i.test(ua)
    const isSafari = /Safari/i.test(ua) && !/Chrome|CriOS|FxiOS/i.test(ua)

    // ?pwa=1 붙인 URL: Chrome/Safari로 넘어간 후 상단 배너가 자동으로 뜸
    const pwaUrl = `${cardUrl}?view=card&pwa=1`
    const encodedPwaUrl = encodeURIComponent(pwaUrl)

    if (isAndroid) {
      // Android (인앱 포함 전부) → Chrome으로 강제 이동
      // Chrome 열리면 ?pwa=1 감지 → 상단에 "⋮ → 홈 화면에 추가" 배너 자동으로 표시
      const intentUrl = `intent://${pwaUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodedPwaUrl};end`
      window.location.href = intentUrl

    } else if (isIphone) {
      // iPhone (인앱 포함 전부) → Safari로 강제 이동
      // Safari 열리면 ?pwa=1 감지 → 상단에 "⬆️ → 홈 화면에 추가" 배너 자동으로 표시
      window.location.href = pwaUrl.replace('https://', 'x-safari-https://')

    } else {
      // 데스크탑 등 → 배너 바로 표시
      setInstallBannerType('android')
      setShowInstallBanner(true)
    }
  }

  // 앞면 + 뒷면을 세로로 이어붙여 PNG 1장으로 다운로드
  const shareCardPage = async () => {
    const shareText = `${partner?.name || '파트너'} 전자명함\n${cardUrl}`

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${partner?.name || '파트너'} 전자명함`,
          text: '플로로탄닌 건강정보 파트너 전자명함입니다.',
          url: cardUrl,
        })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(cardUrl)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = shareText
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }

      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // 사용자가 공유창을 닫은 경우는 조용히 무시
    }
  }

  const downloadCard = async () => {
    setDownloading(true)
    try {
      const [frontCanvas, backCanvas] = await Promise.all([
        drawFront(partner, cardUrl),
        drawBack(partner, cardUrl),
      ])

      const W = frontCanvas.width
      const GAP = 40  // 앞뒤 사이 여백
      const LABEL_H = 50  // 라벨 높이

      // 합본 캔버스: 앞면 + 라벨 + 뒷면 세로로
      const merged = document.createElement('canvas')
      merged.width  = W
      merged.height = frontCanvas.height + GAP + LABEL_H + backCanvas.height + GAP + LABEL_H

      const mc = merged.getContext('2d')

      // 전체 배경 흰색
      mc.fillStyle = '#f5f5f5'
      mc.fillRect(0, 0, merged.width, merged.height)

      // 앞면 라벨
      mc.fillStyle = GOLD
      mc.font = 'bold 28px Arial, sans-serif'
      mc.textAlign = 'center'
      mc.fillText('[ 앞면 ]', W / 2, 36)

      // 앞면
      mc.drawImage(frontCanvas, 0, LABEL_H)

      // 뒷면 라벨
      const backY = LABEL_H + frontCanvas.height + GAP
      mc.fillText('[ 뒷면 ]', W / 2, backY + 36)

      // 뒷면
      mc.drawImage(backCanvas, 0, backY + LABEL_H)

      // 단 1번 다운로드
      const a = document.createElement('a')
      a.download = `${partner.name}_전자명함_앞뒤_PHLOROTANNIN_PARTNERS.png`
      a.href = merged.toDataURL('image/png')
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      console.error(e)
      alert('다운로드 오류. 잠시 후 다시 시도해 주세요.')
    } finally {
      setDownloading(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: CREAM }}>
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-4"
          style={{ borderColor: `${GOLD} transparent transparent transparent` }} />
        <p style={{ color: GOLD, fontSize: '14px' }}>잠시만 기다려 주세요...</p>
      </div>
    </div>
  )

  if (notFound) return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ background: CREAM }}>
      <div className="text-center max-w-sm">
        <AlertCircle className="w-14 h-14 mx-auto mb-4" style={{ color: `${GOLD}80` }} />
        <h2 className="text-xl font-bold mb-2" style={{ color: NAVY }}>페이지를 찾을 수 없습니다</h2>
        <p className="mb-6" style={{ color: '#666' }}>유효하지 않은 파트너 링크입니다.</p>
        <button onClick={() => navigate('/')}
          className="px-6 py-3 rounded-xl font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${NAVY}, ${GREEN})` }}>
          메인으로 이동
        </button>
      </div>
    </div>
  )

  const tel = `tel:${partner.phone}`
  const sms = `sms:${partner.sms || partner.phone}?body=${encodeURIComponent('[PHLOROTANNIN PARTNERS] 안녕하세요! 명함을 보고 연락드립니다.')}`
  const kakaoLink = partner.kakaoUrl || `https://story.kakao.com/share?url=${encodeURIComponent(cardUrl)}`
  const routePartnerSlug = partner?.slug || activePartnerSlug || phone
  const goPartnerPath = (path) => navigate(partnerPathFor(path, routePartnerSlug))
  const easyPath = partnerPathFor('/easy', routePartnerSlug)
  const partnerMetrics = [
    { icon: Phone, value: '회복 플래너', label: '상담 흐름 정리' },
    { icon: Star, value: 'AI 검색', label: '샵·Q&A 연결' },
    { icon: BookOpen, value: 'QR 명함', label: '파트너 자동 링크' },
  ]
  const productHooks = [
    '회복 플래너처럼 관심사와 상담 흐름을 차분히 정리',
    '샵 AI 검색 에이전트로 제품·Q&A·블로그 자료를 빠르게 탐색',
    '파트너 링크로 문의·명함 저장·자료 공유까지 연결 유지',
  ]
  const mechanismPapers = [
    {
      title: '갈조류 플로로탄닌은 염증 신호를 어디서 조절할까?',
      source: '갈조류 플로로탄닌의 염증 관련 분자 표적 연구',
      keyword: 'NF-kB · MAPK · Nrf2-HO-1',
    },
    {
      title: '플로로탄닌은 왜 해양 폴리페놀로 불릴까?',
      source: '해조류 유래 플로로탄닌의 생리활성 역할과 작용기전 리뷰',
      keyword: '항산화 · 항염 · 대사 관련 기전',
    },
    {
      title: '근육의 포도당 이동 신호까지 연구된 플로로탄닌 성분',
      source: 'DPHC와 골격근 포도당 이동 관련 in vitro/in vivo 연구',
      keyword: 'Ca2+ · GLUT4 · AMPK',
    },
  ]
  const cardBackground = `linear-gradient(135deg, #FFFFFF 0%, #FFFDF7 52%, #F4F0E2 100%)`

  const nameLen = (partner.name || '').length
  // 화면 너비에 따라 명함 안의 정보가 잘리지 않게 조정
  const screenNameSize = compactCardPreview
    ? (nameLen <= 2 ? '2.16rem' : nameLen <= 3 ? '1.96rem' : nameLen <= 4 ? '1.68rem' : '1.38rem')
    : (nameLen <= 2 ? '2.78rem' : nameLen <= 3 ? '2.48rem' : nameLen <= 4 ? '2.08rem' : '1.72rem')
  const screenLetterSp = compactCardPreview ? 0 : (nameLen <= 3 ? '0.04em' : nameLen <= 4 ? '0.02em' : 0)

  return (
    <>
      <SEOHead
        title={`${partner.name} | Phlorotannin Partners`}
        description="플로로탄닌 건강정보 파트너 전자명함 — 자료, QR, 연락처, 상담 연결"
        canonical={cardUrl}
        noindex={true}
      />

      <div className="min-h-screen"
        data-platform="phlorotannin-partner-page"
        data-owner="phlorotannin.com"
        data-page-type="partner-business-card"
        data-partner-slug={partner?.slug || partner?.phone || ''}
        data-copyright="© 2026 phlorotannin.com"
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: MINT,
          backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(247,250,244,0.94) 280px, ${MINT} 620px, ${MINT} 100%), url(${MOLECULE_PHOTO})`,
          backgroundSize: 'cover, 1280px auto',
          backgroundPosition: 'center top, center -120px',
          backgroundRepeat: 'no-repeat',
        }}>
        <span data-partner-card-restore-marker="active" hidden>PARTNER CARD RESTORE ACTIVE</span>

        {/* 상단 헤더 */}
        <div className="py-4 px-5 text-center"
          style={{ background: 'rgba(255,255,255,0.72)', borderBottom: '1px solid rgba(215,189,130,0.28)', backdropFilter: 'blur(14px)' }}>
          <div className="flex items-center justify-center gap-3">
            <div style={{ width: '30px', height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD2})` }} />
            <span style={{ color: NAVY, fontSize: '12px', fontWeight: '900', letterSpacing: '4px' }}>
              PHLOROTANNIN PARTNERS
            </span>
            <div style={{ width: '30px', height: '1px', background: `linear-gradient(90deg, ${GOLD2}, transparent)` }} />
          </div>
        </div>

        <div className="mx-auto px-4 py-6 sm:py-7" style={{ maxWidth: '640px' }}>

          <div className="text-center mb-5">
            <p style={{ color: GREEN, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '900', marginBottom: '6px' }}>
              DIGITAL BUSINESS CARD
            </p>
            <p style={{ color: NAVY, fontSize: '18px', lineHeight: 1.35, fontWeight: 900, textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}>
              {partner.name} 파트너 명함
            </p>
          </div>

          {/* ════ 명함 카드 (앞/뒤 플립) ════ */}
          <div
            className="cursor-pointer select-none"
            onClick={() => setFlipped(!flipped)}
            style={{
              width: 'min(100%, 600px)',
              margin: '0 auto 18px',
              padding: '7px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(185,151,91,0.48)',
              boxShadow: '0 22px 54px rgba(20,61,56,0.16), 0 1px 0 rgba(255,255,255,0.95) inset',
              transform: 'none',
              transformOrigin: 'center',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(244,239,218,0.7))',
            }}
          >
            {!flipped ? (
              /* ── 앞면 화면 미리보기 ── */
              <div style={{ background: cardBackground, position: 'relative', overflow: 'hidden', aspectRatio: SCREEN_CARD_ASPECT, borderRadius: '11px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.8)' }}>
                <div style={{ position: 'absolute', inset: '9px', border: `1px solid ${NAVY}45`, borderRadius: '8px' }} />
                <MoleculeWatermark style={{ width: compactCardPreview ? '132px' : '188px', height: compactCardPreview ? '56px' : '78px', right: compactCardPreview ? '18px' : '34px', top: compactCardPreview ? '54px' : '62px', opacity: compactCardPreview ? 0.22 : 0.3 }} />

                <div style={{ position: 'relative', zIndex: 1, height: '100%', padding: compactCardPreview ? '12px' : '16px', display: 'grid', gridTemplateColumns: compactCardPreview ? 'minmax(112px, 0.42fr) minmax(0, 1fr)' : 'minmax(126px, 0.38fr) minmax(0, 1fr)', gap: compactCardPreview ? '9px' : '14px', alignItems: 'stretch' }}>
                  <MoleculePhotoPanel small />
                  <div style={{ minWidth: 0, padding: compactCardPreview ? '4px 2px 4px 0' : '9px 7px 8px 0', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <p style={{ fontSize: compactCardPreview ? '9.5px' : '12px', color: GREEN, fontWeight: '900', letterSpacing: '0.08em', marginBottom: '2px' }}>PHLOROTANNIN</p>
                    <p style={{ fontSize: compactCardPreview ? '7.5px' : '9.5px', color: MUTED, fontWeight: 800, letterSpacing: '0.08em', marginBottom: compactCardPreview ? '5px' : '8px' }}>PARTNERS</p>
                    <h1 style={{ fontSize: screenNameSize, fontWeight: '900', color: NAVY, letterSpacing: screenLetterSp, wordBreak: 'keep-all', overflowWrap: 'break-word', whiteSpace: 'normal', marginBottom: compactCardPreview ? '3px' : '5px', lineHeight: 0.96 }}>
                      {partner.name}
                    </h1>
                    <p style={{ fontSize: compactCardPreview ? '9.8px' : '13px', color: NAVY, fontWeight: '900', letterSpacing: '0.02em', marginBottom: compactCardPreview ? '4px' : '7px', lineHeight: 1.14 }}>
                      회복 플래너 · AI 검색 파트너
                    </p>
                    <div style={{ width: compactCardPreview ? '72px' : '102px', height: '2px', marginBottom: compactCardPreview ? '4px' : '7px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})` }} />
                    <p style={{ fontSize: compactCardPreview ? '8.2px' : '11px', color: MUTED, lineHeight: compactCardPreview ? '1.22' : '1.32', fontWeight: 700 }}>샵 AI 검색·Q&A·연구자료를<br />내 파트너 링크로 안내합니다.</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: compactCardPreview ? '6px' : '10px', flexWrap: 'wrap', marginTop: 'auto', paddingTop: compactCardPreview ? '4px' : '10px' }}>
                      <p style={{ fontSize: compactCardPreview ? '10.5px' : '14px', color: NAVY, fontWeight: '900', lineHeight: 1 }}>{partner.phoneDisplay}</p>
                      <p style={{ fontSize: compactCardPreview ? '8.5px' : '10.5px', color: NAVY, fontWeight: 800, letterSpacing: '0.03em' }}>phlorotannin.com</p>
                    </div>
                  </div>
                </div>
              </div>

            ) : (

              /* ── 뒷면 화면 미리보기 ── */
              <div style={{ background: cardBackground, position: 'relative', overflow: 'hidden', aspectRatio: SCREEN_CARD_ASPECT, borderRadius: '11px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.8)' }}>
                <div style={{ position: 'absolute', inset: '9px', border: `1px solid ${NAVY}45`, borderRadius: '8px' }} />
                <MoleculeWatermark style={{ width: compactCardPreview ? '154px' : '230px', height: compactCardPreview ? '64px' : '96px', right: compactCardPreview ? '104px' : '146px', top: compactCardPreview ? '28px' : '32px', opacity: compactCardPreview ? 0.18 : 0.22 }} />

                <div style={{ position: 'relative', zIndex: 1, height: '100%', padding: compactCardPreview ? '18px 16px 15px 20px' : '32px 28px 24px 34px', display: 'grid', gridTemplateColumns: compactCardPreview ? 'minmax(0, 1fr) 96px' : 'minmax(0, 1fr) 138px', gap: compactCardPreview ? '8px' : '18px', alignItems: 'center' }}>
                  <div style={{ minWidth: 0 }}>
                    <h2 style={{ fontSize: compactCardPreview ? '1rem' : '1.34rem', fontWeight: '900', color: GREEN, lineHeight: 1.15, marginBottom: compactCardPreview ? '5px' : '8px', letterSpacing: 0 }}>
                      QR로 열리는<br />회복 플래너 링크
                    </h2>
                    <div style={{ width: compactCardPreview ? '68px' : '114px', height: '2px', margin: compactCardPreview ? '6px 0 7px' : '10px 0 14px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})` }} />
                    <p style={{ fontSize: compactCardPreview ? '7.7px' : '11px', color: NAVY, lineHeight: compactCardPreview ? '1.48' : '1.58', marginBottom: compactCardPreview ? '6px' : '12px', fontWeight: 800 }}>
                      1. 회복 플래너 상담 흐름<br />2. 샵 AI 검색 에이전트<br />3. Q&A·블로그·명함 저장
                    </p>
                    <p style={{ fontSize: compactCardPreview ? '10.5px' : '15px', color: NAVY, fontWeight: '900', lineHeight: 1.2 }}>{partner.name} 파트너</p>
                    <p style={{ fontSize: compactCardPreview ? '11px' : '15px', color: NAVY, fontWeight: '800', marginTop: compactCardPreview ? '2px' : '4px', lineHeight: 1.2 }}>{partner.phoneDisplay}</p>
                    <p style={{ fontSize: compactCardPreview ? '6.8px' : '9px', color: MUTED, marginTop: compactCardPreview ? '4px' : '7px', lineHeight: 1.2 }}>{cardUrl.replace('https://', '')}</p>
                  </div>

                  <div className="flex flex-col items-center" style={{ justifySelf: 'end' }}>
                    <div style={{ border: `1.5px solid ${NAVY}`, borderRadius: compactCardPreview ? '9px' : '11px', padding: compactCardPreview ? '6px' : '8px', background: '#fff', boxShadow: `0 9px 22px ${NAVY}20` }}>
                      <QRCode url={cardUrl} size={compactCardPreview ? 76 : 110} />
                    </div>
                    <p style={{ fontSize: compactCardPreview ? '6px' : '8px', color: NAVY, letterSpacing: '0.12em', fontWeight: '900', textTransform: 'uppercase', marginTop: compactCardPreview ? '4px' : '7px' }}>SCAN ME</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={shareCardPage}
            className="w-full flex items-center justify-center gap-3 rounded-2xl py-4 mb-3 active:scale-95 transition-transform"
            style={{
              background: 'rgba(255,255,255,0.92)',
              color: NAVY,
              boxShadow: '0 16px 34px rgba(7,31,30,0.12)',
              border: '1.5px solid rgba(215,189,130,0.42)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Share className="w-5 h-5" style={{ color: NAVY }} />
            <span style={{ fontSize: '16px', fontWeight: '900' }}>
              {copied ? '명함 링크가 복사됐습니다' : '이 명함 웹페이지 공유하기'}
            </span>
          </button>

          <div className="rounded-2xl p-4 mb-3"
            style={{ background: 'rgba(255,252,244,0.94)', color: NAVY, boxShadow: '0 18px 42px rgba(7,31,30,0.14)', border: '1.5px solid rgba(215,189,130,0.42)', backdropFilter: 'blur(10px)' }}>
            <p style={{ fontSize: '12px', color: NAVY, fontWeight: 900, letterSpacing: '0.18em', marginBottom: 6 }}>
              상담 전 바로 확인
            </p>
            <p style={{ fontSize: '18px', lineHeight: 1.35, fontWeight: 900, marginBottom: 12 }}>
              제품이 궁금하면 자료보다 먼저 전화로 핵심만 물어보세요.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div style={{ border: `1px solid ${LINE}`, background: MINT, padding: '10px 12px', borderRadius: 8 }}>
                <p style={{ fontSize: '18px', fontWeight: 900, color: NAVY, lineHeight: 1 }}>자료 확인</p>
                <p style={{ fontSize: '12px', color: '#5f7471', marginTop: 4 }}>성분·연구자료</p>
              </div>
              <div style={{ border: `1px solid ${LINE}`, background: MINT, padding: '10px 12px', borderRadius: 8 }}>
                <p style={{ fontSize: '18px', fontWeight: 900, color: NAVY, lineHeight: 1 }}>상담 연결</p>
                <p style={{ fontSize: '12px', color: '#5f7471', marginTop: 4 }}>전화·문자 바로가기</p>
              </div>
            </div>
            <a href={tel}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-black active:scale-95 transition-transform"
              style={{ background: `linear-gradient(135deg, ${GREEN}, #4D9B8D)`, color: '#fff', fontSize: '16px', boxShadow: `0 10px 20px ${GREEN}26` }}>
              <Phone className="w-5 h-5" /> 지금 전화 상담하기
            </a>
          </div>

          {/* ════ 연락처 저장 버튼 ════ */}
          <button
            onClick={() => setShowContact(true)}
            className="w-full flex items-center justify-center gap-3 rounded-2xl py-4 mb-4 active:scale-95 transition-transform"
            style={{
              background: `linear-gradient(135deg, ${GREEN}, #4D9B8D)`,
              color: '#fff',
              boxShadow: '0 16px 34px rgba(20,61,56,0.16)',
              border: `1.5px solid ${GOLD}88`,
            }}
          >
            <UserPlus className="w-5 h-5" style={{ color: '#fff' }} />
            <span style={{ fontSize: '16px', fontWeight: '800' }}>연락처로 저장하기</span>
            <span style={{ fontSize: '12px', color: '#dfece8' }}>· 주소록 등록</span>
          </button>

          {/* ════ 연락처 저장 안내 팝업 ════ */}
          {showContact && (
            <div
              className="fixed inset-0 z-50 flex items-end justify-center"
              style={{ background: 'rgba(0,0,0,0.55)' }}
              onClick={() => setShowContact(false)}
            >
              <div
                className="w-full max-w-md rounded-t-3xl p-6 pb-10"
                style={{ background: '#FFFCFA', border: `3px solid ${NAVY}` }}
                onClick={e => e.stopPropagation()}
              >
                {/* 핸들 */}
                <div className="w-10 h-1.5 rounded-full mx-auto mb-5" style={{ background: `${NAVY}35` }} />

                {/* 제목 */}
                <div className="flex items-center gap-3 mb-6">
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: `linear-gradient(135deg, ${NAVY}, ${GREEN})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <UserPlus style={{ width: '24px', height: '24px', color: '#fff' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '18px', fontWeight: '900', color: NAVY }}>명함 연락처 저장</p>
                    <p style={{ fontSize: '13px', color: '#888' }}>주소록에 파트너 정보를 추가합니다</p>
                  </div>
                </div>

                {/* 단계 */}
                {[
                  { num: '1', text: '아래 버튼을 눌러 연락처 파일을 받으세요', sub: null },
                  { num: '2', text: '받은 파일을 여세요', sub: '화면 상단 알림 또는 다운로드 폴더' },
                  { num: '3', text: '"연락처에 추가"를 누르세요', sub: '파트너 전화번호와 명함 링크가 함께 저장됩니다' },
                ].map(step => (
                  <div key={step.num} className="flex items-start gap-4 mb-5">
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                      background: `linear-gradient(135deg, ${NAVY}, ${GREEN})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: '18px', fontWeight: '900', color: '#fff' }}>{step.num}</span>
                    </div>
                    <div style={{ paddingTop: '4px' }}>
                      <p style={{ fontSize: '17px', fontWeight: '800', color: NAVY, lineHeight: 1.4 }}>{step.text}</p>
                      {step.sub && <p style={{ fontSize: '13px', color: '#888', marginTop: '3px' }}>{step.sub}</p>}
                    </div>
                  </div>
                ))}

                {/* 다운로드 버튼 */}
                <button
                  onClick={() => {
                    const vcard = [
                      'BEGIN:VCARD',
                      'VERSION:3.0',
                      `FN:${partner.name}`,
                      `N:${partner.name};;;`,
                      `TEL;TYPE=CELL:${partner.phoneDisplay}`,
                      'ORG:PHLOROTANNIN PARTNERS',
                      'TITLE:플로로탄닌 건강정보 파트너',
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
                    background: `linear-gradient(135deg, ${NAVY}, ${GREEN})`,
                    color: '#fff', fontSize: '17px',
                    boxShadow: `0 4px 16px ${NAVY}35`,
                  }}
                >
                  <Download className="w-5 h-5" />
                  연락처 파일 받기
                </button>

                <button
                  onClick={() => setShowContact(false)}
                  className="w-full py-3 rounded-2xl font-bold"
                  style={{ background: '#eee', color: '#666', fontSize: '15px' }}
                >
                  닫기
                </button>
              </div>
            </div>
          )}

          {/* ════ 액션 버튼 ════ */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <a href={tel}
              className="flex flex-col items-center gap-2 rounded-2xl py-5 active:scale-95 transition-transform"
              style={{ background: '#fff', border: `1.5px solid ${LINE}`, boxShadow: `0 8px 18px ${SOFT_SHADOW}` }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${NAVY}, ${GREEN})`, boxShadow: `0 4px 14px ${NAVY}30` }}>
                <Phone className="w-6 h-6 text-white" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '800', color: NAVY }}>전화하기</span>
            </a>

            <a href={sms}
              className="flex flex-col items-center gap-2 rounded-2xl py-5 active:scale-95 transition-transform"
              style={{ background: '#fff', border: `1.5px solid ${LINE}`, boxShadow: `0 8px 18px ${SOFT_SHADOW}` }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${GREEN}, ${NAVY})`, boxShadow: `0 4px 14px ${NAVY}26` }}>
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '800', color: NAVY }}>문자하기</span>
            </a>

            <a href={kakaoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-2xl py-5 active:scale-95 transition-transform"
              style={{ background: '#fff', border: `1.5px solid ${LINE}`, boxShadow: `0 8px 18px ${SOFT_SHADOW}` }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fee500, #f4c430)', boxShadow: '0 4px 14px rgba(16,47,43,0.18)' }}>
                <Share className="w-6 h-6" style={{ color: NAVY }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '800', color: NAVY }}>카카오</span>
            </a>

            <button
              onClick={downloadCard}
              disabled={downloading}
              className="flex flex-col items-center gap-2 rounded-2xl py-5 active:scale-95 transition-transform disabled:opacity-50"
              style={{ background: '#fff', border: `1.5px solid ${LINE}`, boxShadow: `0 8px 18px ${SOFT_SHADOW}` }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: saved ? 'linear-gradient(135deg, #16a34a, #4ade80)' : 'linear-gradient(135deg, #475569, #64748b)', boxShadow: '0 4px 14px #33415550' }}>
                <Download className="w-6 h-6 text-white" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '800', color: NAVY }}>
                {downloading ? '저장중...' : saved ? '저장됨 ✓' : '명함저장'}
              </span>
            </button>
          </div>

          {/* ════ 신뢰 배지 ════ */}
          <div className="rounded-2xl p-5 mb-5"
            style={{ background: '#fff', border: `1.5px solid ${LINE}`, boxShadow: `0 10px 22px ${SOFT_SHADOW}` }}>
            <p style={{ fontSize: '12px', color: NAVY, fontWeight: 900, letterSpacing: '0.18em', textAlign: 'center', marginBottom: 14 }}>
              파트너 신뢰 지표
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {partnerMetrics.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: MINT, border: `1.5px solid ${LINE}` }}>
                    <Icon style={{ width: '20px', height: '20px', color: NAVY }} />
                  </div>
                  <p style={{ fontSize: '18px', fontWeight: '900', color: NAVY }}>{value}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.35 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 구분선 */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: LINE }} />
            <span style={{ fontSize: '12px', color: NAVY, letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '800' }}>건강 정보 바로가기</span>
            <div className="flex-1 h-px" style={{ background: LINE }} />
          </div>

          {/* ════ 메뉴 링크 ════ */}
          <div className="rounded-2xl overflow-hidden mb-5"
            style={{ background: '#fff', border: `1.5px solid ${LINE}`, boxShadow: `0 10px 22px ${SOFT_SHADOW}` }}>
            {[
              { icon: Globe,    label: '쉽게 배우는 플로로탄닌', sub: '누구나 이해하는 건강 정보', path: '/easy' },
              { icon: Leaf,     label: '플로로탄닌 소개',        sub: '해양 폴리페놀 기초 개념',  path: '/phlorotannin' },
              { icon: BookOpen, label: '건강 Q&A 1,311개',       sub: '주제별 건강 답변 모음',    path: '/qa' },
            ].map((item, i, arr) => (
              <button key={item.path}
                onClick={() => goPartnerPath(item.path)}
                className="w-full flex items-center justify-between px-5 py-4 text-left active:opacity-70 transition-opacity"
                style={{ borderBottom: i < arr.length - 1 ? `1.5px solid ${LINE}` : 'none' }}>
                <div className="flex items-center gap-4">
                  <div style={{ width: '46px', height: '46px', borderRadius: '12px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${NAVY}, ${GREEN})` }}>
                    <item.icon style={{ width: '22px', height: '22px', color: '#fff' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '800', color: NAVY, marginBottom: '2px' }}>{item.label}</p>
                    <p style={{ fontSize: '13px', color: '#888' }}>{item.sub}</p>
                  </div>
                </div>
                <ChevronRight style={{ width: '18px', height: '18px', color: `${NAVY}70`, flexShrink: 0 }} />
              </button>
            ))}
          </div>

          <div className="rounded-2xl p-5 mb-5"
            style={{ background: '#fff', border: `1.5px solid ${LINE}`, boxShadow: `0 10px 24px ${SOFT_SHADOW}` }}>
            <div className="flex items-start gap-3 mb-4">
              <div style={{ width: '44px', height: '44px', borderRadius: '14px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${NAVY}, ${GREEN})` }}>
                <Leaf className="w-5 h-5" style={{ color: '#fff' }} />
              </div>
              <div>
                <p style={{ fontSize: '18px', fontWeight: 900, color: NAVY, lineHeight: 1.35, margin: 0 }}>
                  플로로탄닌, 이런 연구 제목이 있습니다
                </p>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.65, margin: '4px 0 0' }}>
                  효능을 단정하지 않고, 공개 논문 제목과 핵심 키워드만 먼저 확인할 수 있게 정리했습니다.
                </p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              {productHooks.map((text) => (
                <div key={text} className="flex items-start gap-2">
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: `${NAVY}12`, color: NAVY, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: '14px', color: '#334155', lineHeight: 1.55 }}>{text}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 mb-4">
              {mechanismPapers.map((paper) => (
                <div
                  key={paper.title}
                  className="block rounded-xl p-3"
                  style={{ background: MINT, border: `1px solid ${LINE}` }}
                >
                  <p style={{ fontSize: '13px', color: NAVY, fontWeight: 900, lineHeight: 1.45, marginBottom: 5 }}>
                    {paper.title}
                  </p>
                  <p style={{ fontSize: '12px', color: '#5f7471', fontWeight: 700, lineHeight: 1.45, margin: 0 }}>
                    {paper.source}
                  </p>
                  <p style={{ fontSize: '11px', color: GREEN, fontWeight: 900, lineHeight: 1.45, margin: '6px 0 0' }}>
                    {paper.keyword}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate(easyPath)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold active:scale-95 transition-transform"
              style={{ background: `linear-gradient(135deg, ${NAVY}, ${GREEN})`, color: '#fff', fontSize: '15px', boxShadow: `0 10px 20px ${NAVY}32` }}
            >
              <Leaf className="w-4 h-4" />
              플로로탄닌 쉽게 알아보기
            </button>
          </div>

          {/* ════ 파트너 연락 CTA ════ */}
          <div className="rounded-2xl p-6 mb-5 text-center relative overflow-hidden"
            style={{ background: '#fff', boxShadow: `0 16px 32px ${SOFT_SHADOW}`, border: `1.5px solid ${LINE}` }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})` }} />
            <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '100px', height: '100px', borderRadius: '50%', border: `1px solid ${LINE}` }} />
            <p style={{ fontSize: '19px', fontWeight: '900', color: NAVY, marginBottom: '6px' }}>제품 선택 전에 핵심만 묻고 싶으신가요?</p>
            <p style={{ fontSize: '15px', color: '#5f7471', marginBottom: '18px' }}>{partner.name} 파트너에게 성분·연구 제목·자료를 한 번에 문의하세요</p>
            <div className="flex gap-3">
              <a href={tel} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold active:scale-95 transition-transform"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, color: NAVY, fontSize: '15px' }}>
                <Phone className="w-5 h-5" /> 전화 문의
              </a>
              <a href={sms} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold active:scale-95 transition-transform"
                style={{ background: '#fff', border: `2px solid ${LINE}`, color: NAVY, fontSize: '15px' }}>
                <MessageSquare className="w-5 h-5" /> 문자 문의
              </a>
            </div>
          </div>

          {/* ════ 홈화면 바로가기 버튼 ════ */}
          <button
            onClick={handleAddToHome}
            className="w-full flex items-center justify-center gap-3 rounded-2xl py-4 mb-4 active:scale-95 transition-transform"
            style={{
              background: '#fff',
              color: NAVY,
              boxShadow: `0 10px 22px ${SOFT_SHADOW}`,
              border: `1.5px solid ${LINE}`,
              fontSize: '16px',
              fontWeight: '800',
            }}
          >
            <Smartphone className="w-5 h-5" />
            홈화면 바로가기 만들기
          </button>

          <p className="text-center pt-2"
            style={{ fontSize: '12px', color: '#aaa', lineHeight: '1.9' }}>
            본 페이지는 건강정보 안내 목적이며<br />질병의 예방·치료 효과를 보장하지 않습니다.
          </p>

          {/* ════ 플랫폼 자산 보호 고지 ════ */}
          <div
            style={{
              marginTop: 18,
              marginBottom: 12,
              padding: '12px 14px',
              border: `1px solid ${LINE}`,
              borderRadius: 10,
              background: MINT,
            }}
          >
            <p style={{ fontSize: '11px', fontWeight: 800, color: NAVY, marginBottom: 6, letterSpacing: '0.5px' }}>
              © 2026 phlorotannin.com · 무단복제 금지
            </p>
            <p style={{ fontSize: '11px', color: '#bfc8d4', lineHeight: 1.75, margin: 0 }}>
              본 페이지는 phlorotannin.com 파트너 정보페이지 시스템을 통해 제공되는 개인 정보페이지입니다.
              페이지의 구성, 문구, 이미지, 링크 구조, 상담 연결 방식, 자료실 접근 방식, 파트너 코드 구조 및 DB 연결 흐름은
              phlorotannin.com의 플랫폼 자산이며,
              사전 서면 동의 없는 복제·캡처 후 재가공·유사 페이지 제작·상업적 이용·영업자료 활용을 금지합니다.
            </p>
            <a
              href="https://phlorotannin.com/copyright"
              style={{ display: 'inline-block', marginTop: 6, fontSize: '11px', color: NAVY, textDecoration: 'underline' }}
            >
              저작권 및 무단복제 금지 안내 보기 →
            </a>
          </div>
        </div>

        {/* ════ 플랫폼·소유권 워터마크 (시각 표시 0, 복제 시 함께 따라가는 마커) ════ */}
        <div
          data-platform="phlorotannin-partner-system"
          data-owner="phlorotannin.com"
          data-signature="phlorotannin-platform-v1"
          aria-hidden="true"
          style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
        >
          © 2026 phlorotannin.com — phlorotannin-partner-page · 무단 복제·재가공·상업적 이용 금지
        </div>
      </div>

      {/* ════ Chrome/Safari 이동 후 상단 고정 안내 배너 ════ */}
      {showInstallBanner && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
            background: `linear-gradient(135deg, ${NAVY}, ${GREEN})`,
            borderBottom: `3px solid ${GOLD}`,
            padding: '14px 16px 14px 16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
        >
          {/* 닫기 */}
          <button
            onClick={() => setShowInstallBanner(false)}
            style={{ position: 'absolute', top: '10px', right: '14px', color: `${GOLD}`, background: 'none', border: 'none', fontSize: '20px', lineHeight: 1, cursor: 'pointer' }}
          >✕</button>

          <div className="flex items-center gap-3" style={{ paddingRight: '28px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})` }}>
              <Smartphone style={{ width: '18px', height: '18px', color: NAVY }} />
            </div>
            <div>
              {installBannerType === 'android' ? (
                <>
                  <p style={{ fontSize: '14px', fontWeight: '900', color: '#fff', marginBottom: '2px' }}>
                    우상단 <span style={{ color: GOLD2 }}>⋮</span> 누르고 →  <span style={{ color: GOLD2 }}>"홈 화면에 추가"</span> 누르세요
                  </p>
                  <p style={{ fontSize: '12px', color: `${GOLD2}` }}>그러면 바로가기가 만들어져요</p>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '14px', fontWeight: '900', color: '#fff', marginBottom: '2px' }}>
                    하단 <span style={{ color: GOLD2 }}>공유</span> 누르고 → <span style={{ color: GOLD2 }}>"홈 화면에 추가"</span> 누르세요
                  </p>
                  <p style={{ fontSize: '12px', color: `${GOLD2}` }}>그러면 바로가기가 만들어져요</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
