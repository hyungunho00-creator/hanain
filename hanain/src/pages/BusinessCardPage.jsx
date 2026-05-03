import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Phone, MessageSquare, Globe, Download,
  AlertCircle, ChevronRight, Leaf, Heart, Star, Shield, BookOpen, UserPlus, Smartphone, X, Share,
} from 'lucide-react'
import SEOHead from '../components/common/SEOHead'
import { savePartnerToSession } from '../context/PartnerContext'

const MAIN_SITE = 'https://phlorotannin.com'

const NAVY  = '#0D1B3E'
const GOLD  = '#B8953A'
const GOLD2 = '#D4AF5A'
const CREAM = '#FFFDF7'
const CREAM2 = '#FBF5E6'
const CREAM3 = '#F5EDD2'

const PARTNERS_JSON_URL = 'https://rlfxuyeoluoeaxuujtly.supabase.co/storage/v1/object/public/public/partners.json'

async function fetchPartnerByPhone(phone) {
  try {
    // Supabase Storage → fallback: Vercel 배포 파일
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
        const found = (data.partners || []).find(p =>
          p.phone?.replace(/\D/g, '') === digits || p.slug === digits
        )
        if (found) return found
      } catch { continue }
    }
    return null
  } catch { return null }
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

// ─────────────────────────────────────────────
//  공통 Canvas 유틸 — 골드 띠 / 사이드바 / 테두리
// ─────────────────────────────────────────────
function drawFrame(ctx, W, H) {
  // 크림 배경
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0,   '#FFFDF7')
  bg.addColorStop(0.6, '#FBF5E6')
  bg.addColorStop(1,   '#F5EDD2')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // 외곽 골드 테두리
  ctx.strokeStyle = '#B8953A'
  ctx.lineWidth = 8
  ctx.strokeRect(4, 4, W - 8, H - 8)

  // 골드 띠 (상/하)
  const goldBand = ctx.createLinearGradient(0, 0, W, 0)
  goldBand.addColorStop(0,    '#0D1B3E')
  goldBand.addColorStop(0.25, '#B8953A')
  goldBand.addColorStop(0.5,  '#D4AF5A')
  goldBand.addColorStop(0.75, '#B8953A')
  goldBand.addColorStop(1,    '#0D1B3E')
  ctx.fillStyle = goldBand
  ctx.fillRect(0, 0, W, 26)
  ctx.fillRect(0, H - 26, W, 26)

  return goldBand   // 재사용용
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

// ─────────────────────────────────────────────
//  앞면 Canvas
// ─────────────────────────────────────────────
async function drawFront(partner, cardUrl) {
  const W = 1076, H = 650
  const canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')

  drawFrame(ctx, W, H)
  drawSidebar(ctx, H)

  const TX = 74   // 텍스트 기준 X

  // 브랜드명
  ctx.fillStyle = '#B8953A'
  ctx.font = 'bold 26px Arial, sans-serif'
  ctx.fillText('PHLOROTANNIN PARTNERS', TX, 80)

  // 이름
  const nameLen = (partner.name || '').length
  const namePx = nameLen <= 3 ? 148 : nameLen <= 4 ? 118 : 92
  ctx.fillStyle = '#0D1B3E'
  ctx.font = `900 ${namePx}px Arial, sans-serif`
  ctx.fillText(partner.name || '', TX, 80 + namePx + 8)

  // 이름 아래 골드 선
  const lineY = 80 + namePx + 34
  const lg = ctx.createLinearGradient(TX, 0, TX + 180, 0)
  lg.addColorStop(0, '#B8953A'); lg.addColorStop(1, '#D4AF5A')
  ctx.strokeStyle = lg; ctx.lineWidth = 5
  ctx.beginPath(); ctx.moveTo(TX, lineY); ctx.lineTo(TX + 180, lineY); ctx.stroke()

  // 직함
  ctx.fillStyle = '#B8953A'; ctx.font = 'bold 38px Arial, sans-serif'
  ctx.fillText('회복솔루션 컨설턴트', TX, lineY + 58)

  // 소개
  ctx.fillStyle = '#4a5568'; ctx.font = '30px Arial, sans-serif'
  ctx.fillText('신뢰를 전하는 회복 솔루션', TX, lineY + 110)

  // 전화번호
  ctx.fillStyle = '#0D1B3E'; ctx.font = 'bold 36px Arial, sans-serif'
  ctx.fillText('✆  ' + (partner.phoneDisplay || ''), TX, lineY + 162)

  // 웹주소 (하단 왼쪽)
  ctx.fillStyle = '#B8953A'; ctx.font = 'bold 24px Arial, sans-serif'
  ctx.fillText('phlorotannin.com', TX, H - 42)

  // 우측 문구
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

// ─────────────────────────────────────────────
//  뒷면 Canvas  (크림 톤 통일)
// ─────────────────────────────────────────────
async function drawBack(partner, cardUrl) {
  const W = 1076, H = 650
  const canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')

  drawFrame(ctx, W, H)
  drawSidebar(ctx, H)

  // ── 중앙 원형 장식 (크림 톤 어울리게 골드 계열) ──
  ;[300, 200].forEach((r, i) => {
    ctx.beginPath()
    ctx.arc(W / 2 + 160, H / 2, r, 0, Math.PI * 2)
    ctx.strokeStyle = i === 0 ? '#B8953A18' : '#D4AF5A28'
    ctx.lineWidth = 1.5
    ctx.stroke()
  })

  // ── 왼쪽 텍스트 영역 ──
  const TX = 74

  // 브랜드명
  ctx.fillStyle = '#B8953A'; ctx.font = 'bold 22px Arial, sans-serif'
  ctx.fillText('PHLOROTANNIN PARTNERS', TX, 80)

  // 메인 카피
  ctx.fillStyle = '#0D1B3E'; ctx.font = '900 72px Arial, sans-serif'
  ctx.fillText('신뢰를 전하는', TX, 180)
  ctx.fillText('회복 솔루션', TX, 268)

  // 골드 구분선
  const lg = ctx.createLinearGradient(TX, 0, TX + 200, 0)
  lg.addColorStop(0, '#B8953A'); lg.addColorStop(1, '#D4AF5A')
  ctx.strokeStyle = lg; ctx.lineWidth = 5
  ctx.beginPath(); ctx.moveTo(TX, 300); ctx.lineTo(TX + 200, 300); ctx.stroke()

  // 설명 문구
  ctx.fillStyle = '#4a5568'; ctx.font = '30px Arial, sans-serif'
  ctx.fillText('필요한 정보와 연결을', TX, 350)
  ctx.fillText('더 정돈된 방식으로 제안합니다', TX, 394)

  // 파트너 이름 (작게)
  ctx.fillStyle = '#B8953A'; ctx.font = 'bold 32px Arial, sans-serif'
  ctx.fillText((partner.name || '') + ' 컨설턴트', TX, 454)

  // 전화번호
  ctx.fillStyle = '#0D1B3E'; ctx.font = 'bold 30px Arial, sans-serif'
  ctx.fillText('✆  ' + (partner.phoneDisplay || ''), TX, 498)

  // 웹주소
  ctx.fillStyle = '#B8953A'; ctx.font = 'bold 24px Arial, sans-serif'
  ctx.fillText('phlorotannin.com', TX, H - 42)

  // 우측 문구
  ctx.fillStyle = '#999'; ctx.font = '20px Arial, sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('Health Recovery Partner', W - 50, H - 42)
  ctx.textAlign = 'left'

  // ── QR (오른쪽) ──
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

// ─────────────────────────────────────────────
//  메인 컴포넌트
// ─────────────────────────────────────────────
export default function BusinessCardPage() {
  const { phone }  = useParams()
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
  const [showHomeGuide, setShowHomeGuide] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const deferredPromptRef = useRef(null)

  const cardUrl = `${MAIN_SITE}/p/${phone}`

  // ── iOS 감지 & Android beforeinstallprompt 캐치 ──
  useEffect(() => {
    const ua = navigator.userAgent || ''
    const ios = /iPhone|iPad|iPod/i.test(ua) && !/CriOS/i.test(ua)
    setIsIOS(ios)

    const handler = (e) => {
      e.preventDefault()
      deferredPromptRef.current = e
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
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
          id: p.slug, name: p.name,
          phone: rawPhone,
          phoneDisplay: p.phoneDisplay || fallbackDisplay,
          prefix: '',
        })

        if (viewCard) {
          // ?view=card 파라미터 있음 → 명함 버튼 클릭이므로 명함 페이지 표시
          setPartner(p)
          setLoading(false)
        } else {
          // 파라미터 없음 → 처음 파트너 링크 접속이므로 메인으로 리다이렉트
          navigate('/', { replace: true })
        }
      } else {
        setNotFound(true)
        setLoading(false)
      }
    })
  }, [phone])

  // ── 홈화면 바로가기 만들기 핸들러 ──
  const handleAddToHome = async () => {
    if (isIOS) {
      // iOS: 안내 팝업 표시
      setShowHomeGuide(true)
    } else if (deferredPromptRef.current) {
      // Android Chrome: 네이티브 팝업 트리거
      deferredPromptRef.current.prompt()
      const { outcome } = await deferredPromptRef.current.userChoice
      deferredPromptRef.current = null
      setDeferredPrompt(null)
    } else {
      // 이미 설치됐거나 지원 안 되는 브라우저
      setShowHomeGuide(true)
    }
  }

  // 앞면 + 뒷면을 세로로 이어붙여 PNG 1장으로 다운로드
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
      mc.fillStyle = '#B8953A'
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
          style={{ background: `linear-gradient(135deg, ${NAVY}, #1a3a6a)` }}>
          메인으로 이동
        </button>
      </div>
    </div>
  )

  const tel = `tel:${partner.phone}`
  const sms = `sms:${partner.phone}?body=${encodeURIComponent('[PHLOROTANNIN PARTNERS] 안녕하세요! 명함을 보고 연락드립니다.')}`

  const nameLen = (partner.name || '').length
  // 화면 너비에 따라 반응형으로 조정: vw 기반으로 절대 잘리지 않게
  const screenNameSize = nameLen <= 2 ? '2.8rem' : nameLen <= 3 ? '2.4rem' : nameLen <= 4 ? '2.0rem' : '1.6rem'
  const screenLetterSp = nameLen <= 3 ? '0.15em' : nameLen <= 4 ? '0.10em' : '0.06em'

  return (
    <>
      <SEOHead
        title={`${partner.name} | Phlorotannin Partners`}
        description="회복솔루션 컨설턴트 — 신뢰를 전하는 회복 솔루션"
        canonical={cardUrl}
        noindex={true}
      />

      <div className="min-h-screen"
        style={{ background: `linear-gradient(160deg, ${CREAM} 0%, ${CREAM2} 50%, ${CREAM3} 100%)` }}>

        {/* 상단 헤더 */}
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
            ✦ &nbsp;Digital Business Card&nbsp; ✦
          </p>

          {/* ════ 명함 카드 (앞/뒤 플립) ════ */}
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
              /* ── 앞면 화면 미리보기 ── */
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
                        회복솔루션 컨설턴트
                      </p>
                      <div style={{ width: '48px', height: '3px', marginBottom: '12px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})` }} />
                      <p style={{ fontSize: '13px', color: '#4a5568', lineHeight: '1.9' }}>신뢰를 전하는 회복 솔루션</p>
                      <p style={{ fontSize: '15px', color: NAVY, fontWeight: '800', marginTop: '4px' }}>✆&nbsp; {partner.phoneDisplay}</p>
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
                    <span style={{ fontSize: '11px', color: '#bbb' }}>탭하면 뒤집기 →</span>
                  </div>
                </div>
                <div style={{ height: '7px', background: `linear-gradient(90deg, ${NAVY}, ${GOLD}, ${GOLD2}, ${GOLD}, ${NAVY})` }} />
              </div>

            ) : (

              /* ── 뒷면 화면 미리보기 — 크림 톤 ── */
              <div style={{ background: `linear-gradient(135deg, ${CREAM} 0%, ${CREAM2} 60%, ${CREAM3} 100%)`, position: 'relative', overflow: 'hidden', minHeight: '310px' }}>
                <div style={{ height: '7px', background: `linear-gradient(90deg, ${NAVY}, ${GOLD}, ${GOLD2}, ${GOLD}, ${NAVY})` }} />
                <div style={{ position: 'absolute', left: 0, top: '7px', bottom: '7px', width: '8px', background: `linear-gradient(180deg, ${NAVY}, #1a3a6a, ${NAVY})` }} />

                {/* 우측 원형 장식 */}
                <div style={{ position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)', width: '220px', height: '220px', borderRadius: '50%', border: `1.5px solid ${GOLD}20` }} />
                <div style={{ position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', width: '140px', height: '140px', borderRadius: '50%', border: `1px solid ${GOLD}15` }} />

                <div style={{ padding: '26px 22px 20px 28px', position: 'relative' }}>
                  <p style={{ fontSize: '10px', color: GOLD, fontWeight: '800', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
                    PHLOROTANNIN PARTNERS
                  </p>

                  <div className="flex justify-between items-start gap-3">
                    {/* 왼쪽 텍스트 */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: NAVY, lineHeight: 1.4, marginBottom: '12px' }}>
                        신뢰를 전하는<br />회복 솔루션
                      </h2>
                      <div style={{ width: '48px', height: '3px', marginBottom: '12px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})` }} />
                      <p style={{ fontSize: '13px', color: '#4a5568', lineHeight: '1.9', marginBottom: '14px' }}>
                        필요한 정보와 연결을<br />더 정돈된 방식으로 제안합니다
                      </p>
                      <p style={{ fontSize: '14px', color: GOLD, fontWeight: '800' }}>{partner.name} 컨설턴트</p>
                      <p style={{ fontSize: '14px', color: NAVY, fontWeight: '700', marginTop: '4px' }}>✆&nbsp; {partner.phoneDisplay}</p>
                    </div>

                    {/* 오른쪽 QR */}
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
                    <span style={{ fontSize: '11px', color: '#bbb' }}>← 앞면으로 돌아가기</span>
                  </div>
                </div>

                <div style={{ height: '7px', background: `linear-gradient(90deg, ${NAVY}, ${GOLD}, ${GOLD2}, ${GOLD}, ${NAVY})` }} />
              </div>
            )}
          </div>

          {/* ════ 연락처 저장 버튼 ════ */}
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
            <span style={{ fontSize: '16px', fontWeight: '800' }}>연락처 저장하기</span>
            <span style={{ fontSize: '12px', color: GOLD }}>· 주소록 등록</span>
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
                style={{ background: '#FFFDF7', border: `3px solid ${GOLD}` }}
                onClick={e => e.stopPropagation()}
              >
                {/* 핸들 */}
                <div className="w-10 h-1.5 rounded-full mx-auto mb-5" style={{ background: `${GOLD}60` }} />

                {/* 제목 */}
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
                    <p style={{ fontSize: '18px', fontWeight: '900', color: NAVY }}>연락처 저장 방법</p>
                    <p style={{ fontSize: '13px', color: '#888' }}>아래 순서대로 따라하세요</p>
                  </div>
                </div>

                {/* 단계 */}
                {[
                  { num: '1', text: '아래 버튼을 눌러 파일을 받으세요', sub: null },
                  { num: '2', text: '받은 파일을 누르세요', sub: '화면 상단 알림 또는 다운로드 폴더' },
                  { num: '3', text: '"연락처에 추가" 를 누르세요', sub: '그러면 바로 저장 완료!' },
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
                      'TITLE:회복솔루션 컨설턴트',
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
                  파일 받기 (누르세요)
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

          {/* ════ 액션 버튼 3개 ════ */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <a href={tel}
              className="flex flex-col items-center gap-2 rounded-2xl py-5 active:scale-95 transition-transform"
              style={{ background: '#fff', border: `2px solid ${GOLD}40`, boxShadow: `0 4px 16px ${GOLD}20` }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${NAVY}, #1a3a6a)`, boxShadow: `0 4px 14px ${NAVY}50` }}>
                <Phone className="w-6 h-6 text-white" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '800', color: NAVY }}>전화하기</span>
            </a>

            <a href={sms}
              className="flex flex-col items-center gap-2 rounded-2xl py-5 active:scale-95 transition-transform"
              style={{ background: '#fff', border: `2px solid ${GOLD}40`, boxShadow: `0 4px 16px ${GOLD}20` }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, boxShadow: `0 4px 14px ${GOLD}50` }}>
                <MessageSquare className="w-6 h-6" style={{ color: NAVY }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '800', color: NAVY }}>문자하기</span>
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
                {downloading ? '저장중...' : saved ? '저장됨 ✓' : '명함저장'}
              </span>
            </button>
          </div>

          {/* ════ 신뢰 배지 ════ */}
          <div className="rounded-2xl p-5 mb-5"
            style={{ background: '#fff', border: `2px solid ${GOLD}35`, boxShadow: `0 4px 20px ${GOLD}15` }}>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { icon: Shield, label: '논문 기반', sub: '검증된 Q&A' },
                { icon: Heart,  label: '광고 없음', sub: '순수 건강정보' },
                { icon: Star,   label: '1,311',   sub: '건강 Q&A' },
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

          {/* 구분선 */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: `${GOLD}50` }} />
            <span style={{ fontSize: '12px', color: GOLD, letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '700' }}>건강 정보 바로가기</span>
            <div className="flex-1 h-px" style={{ background: `${GOLD}50` }} />
          </div>

          {/* ════ 메뉴 링크 ════ */}
          <div className="rounded-2xl overflow-hidden mb-5"
            style={{ background: '#fff', border: `2px solid ${GOLD}35`, boxShadow: `0 4px 20px ${GOLD}15` }}>
            {[
              { icon: Globe,    label: '쉽게 배우는 플로로탄닌', sub: '누구나 이해하는 건강 정보', path: '/easy' },
              { icon: Leaf,     label: '플로로탄닌 소개',        sub: '해양 폴리페놀 기초 개념',  path: '/phlorotannin' },
              { icon: BookOpen, label: '건강 Q&A 1,311개',       sub: '질환별 전문 답변 모음',    path: '/qa' },
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

          {/* ════ 파트너 연락 CTA ════ */}
          <div className="rounded-2xl p-6 mb-5 text-center relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a3a6a 100%)`, boxShadow: `0 8px 30px ${NAVY}60` }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${NAVY}, ${GOLD}, ${GOLD2}, ${GOLD}, ${NAVY})` }} />
            <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '100px', height: '100px', borderRadius: '50%', border: `1px solid ${GOLD}20` }} />
            <p style={{ fontSize: '19px', fontWeight: '900', color: '#fff', marginBottom: '6px' }}>궁금한 점이 있으신가요?</p>
            <p style={{ fontSize: '15px', color: GOLD2, marginBottom: '18px' }}>{partner.name} 컨설턴트가 직접 안내해 드립니다</p>
            <div className="flex gap-3">
              <a href={tel} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold active:scale-95 transition-transform"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, color: NAVY, fontSize: '15px' }}>
                <Phone className="w-5 h-5" /> 전화 문의
              </a>
              <a href={sms} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold active:scale-95 transition-transform"
                style={{ background: 'rgba(255,255,255,0.1)', border: `2px solid ${GOLD}60`, color: '#fff', fontSize: '15px' }}>
                <MessageSquare className="w-5 h-5" /> 문자 문의
              </a>
            </div>
          </div>

          {/* ════ 홈화면 바로가기 배너 ════ */}
          {!bannerDismissed && (
            <div className="rounded-2xl p-4 mb-5 relative"
              style={{ background: `linear-gradient(135deg, #1a3a6a 0%, ${NAVY} 100%)`, border: `2px solid ${GOLD}60`, boxShadow: `0 4px 20px ${NAVY}50` }}>
              <button
                onClick={() => setBannerDismissed(true)}
                style={{ position: 'absolute', top: '10px', right: '12px', color: `${GOLD}80`, background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}
              >✕</button>
              <div className="flex items-center gap-3 mb-3">
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})` }}>
                  <Smartphone style={{ width: '20px', height: '20px', color: NAVY }} />
                </div>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: '900', color: '#fff' }}>홈화면 바로가기 만들기</p>
                  <p style={{ fontSize: '12px', color: GOLD2 }}>언제든 편하게 바로 접속하세요</p>
                </div>
              </div>
              <button
                onClick={handleAddToHome}
                className="w-full py-3 rounded-xl font-bold active:scale-95 transition-transform"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, color: NAVY, fontSize: '15px' }}>
                📱 홈화면에 바로가기 추가하기
              </button>
            </div>
          )}

          <p className="text-center pb-8"
            style={{ fontSize: '12px', color: '#aaa', lineHeight: '1.9' }}>
            본 페이지는 건강 정보 제공 목적이며<br />특정 제품 판매와 무관합니다.
          </p>
        </div>
      </div>

      {/* ════ iOS 홈화면 추가 안내 팝업 ════ */}
      {showHomeGuide && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setShowHomeGuide(false)}
        >
          <div
            className="w-full max-w-md rounded-t-3xl p-6 pb-10"
            style={{ background: '#FFFDF7', border: `3px solid ${GOLD}` }}
            onClick={e => e.stopPropagation()}
          >
            {/* 핸들 */}
            <div className="w-10 h-1.5 rounded-full mx-auto mb-5" style={{ background: `${GOLD}60` }} />

            {/* 제목 */}
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: `linear-gradient(135deg, ${NAVY}, #1a3a6a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Smartphone style={{ width: '24px', height: '24px', color: GOLD }} />
              </div>
              <div>
                <p style={{ fontSize: '18px', fontWeight: '900', color: NAVY }}>홈화면 바로가기 만들기</p>
                <p style={{ fontSize: '13px', color: '#888' }}>아이폰 · 아이패드 안내</p>
              </div>
            </div>

            {/* iOS 단계 */}
            {[
              { num: '1', icon: '⬆️', text: '하단 공유 버튼을 누르세요', sub: '화면 아래 가운데 네모+화살표 버튼' },
              { num: '2', icon: '➕', text: '"홈 화면에 추가" 를 누르세요', sub: '목록을 아래로 내리면 보입니다' },
              { num: '3', icon: '✅', text: '오른쪽 위 "추가" 를 누르세요', sub: `"플로로탄닌 - ${partner?.name || ''}" 이름으로 저장돼요` },
            ].map(step => (
              <div key={step.num} className="flex items-start gap-4 mb-5">
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0, background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '20px' }}>{step.icon}</span>
                </div>
                <div style={{ paddingTop: '4px' }}>
                  <p style={{ fontSize: '16px', fontWeight: '800', color: NAVY, lineHeight: 1.4 }}>{step.text}</p>
                  {step.sub && <p style={{ fontSize: '13px', color: '#888', marginTop: '3px' }}>{step.sub}</p>}
                </div>
              </div>
            ))}

            {/* 안드로이드 안내 (접히는 텍스트) */}
            <div className="rounded-xl p-3 mb-4" style={{ background: '#f5f0e8', border: `1px solid ${GOLD}30` }}>
              <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.7 }}>
                📱 <strong style={{ color: NAVY }}>안드로이드(Chrome)</strong>는 팝업이 자동으로 뜹니다.<br />
                뜨지 않으면 주소창 오른쪽 ⋮ 메뉴 → "홈 화면에 추가"
              </p>
            </div>

            <button
              onClick={() => setShowHomeGuide(false)}
              className="w-full py-3 rounded-2xl font-bold"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, color: NAVY, fontSize: '16px' }}
            >
              확인했어요
            </button>
          </div>
        </div>
      )}
    </>
  )
}
