/* ════════════════════════════════════════════════
   플로로탄닌 파트너 실전 교본 — Canvas 렌더러
   ─────────────────────────────────────────────
   v2: 노안·초보 파트너용 가독성 강화 버전
   ─ 본문 22px semibold, 줄간격 1.7배
   ─ highlight: 빨강 28px + 노랑 형광 (핵심 한 줄)
   ─ analogy : 💡 박스 + 진파랑 굵은 글씨 (비유 문장)
   ─ A4 794×1123, 자동 페이지네이션
══════════════════════════════════════════════════ */

import { HANDBOOK_BLOCKS } from './handbook_content'

const W = 794
const H = 1123

/* ── 컬러 팔레트 ─────────────────────────────────── */
const NAVY    = '#0D1B3E'
const GOLD    = '#B8953A'
const TEAL    = '#0A7E8C'
const INK     = '#0F1419'   // 본문(거의 검정) — 노안 가독성
const GREY    = '#666'
const LINE    = '#E2E8F0'
const ACC     = '#0F3D7A'
const QUOTE   = '#7A5C00'
const REC_B   = '#FFF7E6'
const REC_BD  = '#F0D080'

/* 노안용 강조 */
const HL_RED  = '#D32F2F'   // 빨강 글자
const HL_BG   = '#FFEB3B'   // 노랑 형광 배경
const HL_BD   = '#FBC02D'   // 형광 보더
const AN_BG   = '#E3F2FD'   // 연한 파랑 (비유 박스)
const AN_BD   = '#1976D2'   // 진파랑 보더
const AN_INK  = '#0D47A1'   // 진파랑 글자

/* ── 여백 ───────────────────────────────────────── */
const PAD     = 50
const TOP_Y   = 78
const BOT_Y   = H - 70
const BODY_W  = W - PAD * 2

/* ── 헬퍼 ───────────────────────────────────────── */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.lineTo(x + w, y + h - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h)
  ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath()
}

function wrapText(ctx, text, maxWidth) {
  const chars = (text || '').split('')
  const lines = []
  let cur = ''
  for (const ch of chars) {
    if (ch === '\n') {
      lines.push(cur)
      cur = ''
      continue
    }
    const test = cur + ch
    if (ctx.measureText(test).width > maxWidth && cur) {
      lines.push(cur)
      cur = ch
    } else {
      cur = test
    }
  }
  if (cur) lines.push(cur)
  return lines
}

function newCanvas(scale) {
  const c = document.createElement('canvas')
  c.width  = W * scale
  c.height = H * scale
  const ctx = c.getContext('2d')
  ctx.scale(scale, scale)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, W, H)
  return { canvas: c, ctx }
}

/* ── 헤더 / 푸터 ─────────────────────────────────── */
function drawHeader(ctx) {
  ctx.font = 'bold 14px sans-serif'
  ctx.fillStyle = NAVY
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  ctx.fillText('📚 플로로탄닌 파트너 실전 교본', PAD, 36)

  ctx.font = '12px sans-serif'
  ctx.fillStyle = GREY
  ctx.textAlign = 'right'
  ctx.fillText('PARTNERS · INTERNAL EDU', W - PAD, 36)
  ctx.textAlign = 'left'

  ctx.strokeStyle = GOLD
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(PAD, 56)
  ctx.lineTo(W - PAD, 56)
  ctx.stroke()
}

function drawFooter(ctx, pageNum, totalPages) {
  ctx.strokeStyle = LINE
  ctx.lineWidth = 0.8
  ctx.beginPath()
  ctx.moveTo(PAD, H - 50)
  ctx.lineTo(W - PAD, H - 50)
  ctx.stroke()

  ctx.font = '12px sans-serif'
  ctx.fillStyle = GREY
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  ctx.fillText('내부 교육용 자료 · 무단 배포 금지', PAD, H - 30)

  ctx.font = 'bold 13px sans-serif'
  ctx.textAlign = 'right'
  ctx.fillStyle = NAVY
  ctx.fillText(`${pageNum} / ${totalPages}`, W - PAD, H - 30)
  ctx.textAlign = 'left'
}

/* ════════════════════════════════════════════════
   블록별 "높이 계산"
══════════════════════════════════════════════════ */
function measureBlock(ctx, block) {
  switch (block.type) {
    case 'pagebreak':
      return { h: 0, hard: true }

    case 'divider':
      return { h: 30 }

    case 'section': {
      // 큰 섹션 제목 30px — 번호 박스(42px 높이) 입령너움
      ctx.font = 'bold 30px sans-serif'
      const titleLines = wrapText(ctx, block.title, block.num ? BODY_W - 120 : BODY_W)
      // 제목 하단 골드 밑줄 + 아래 숨쉬는 공간
      return { h: 44 + Math.max(42, titleLines.length * 42) + 28, _titleLines: titleLines }
    }

    case 'h2': {
      // 절 제목 — 26px 빨강
      ctx.font = 'bold 26px sans-serif'
      const lines = wrapText(ctx, block.title, BODY_W - 28)
      return { h: 26 + lines.length * 38 + 18, _lines: lines }
    }

    case 'h3': {
      // 소제목 — 22px 진파랑
      ctx.font = 'bold 22px sans-serif'
      const lines = wrapText(ctx, block.title, BODY_W - 16)
      return { h: 20 + lines.length * 32 + 12, _lines: lines }
    }

    case 'p': {
      // 본문 — 22px semibold, 줄간격 1.7 → 38px
      ctx.font = '600 22px sans-serif'
      const lines = wrapText(ctx, block.text, BODY_W)
      return { h: lines.length * 38 + 22, _lines: lines }
    }

    case 'highlight': {
      // 🔴 핵심 한 줄 — 빨강 28px + 노랑 형광 배경 (상하 패딩 ↑)
      ctx.font = 'bold 28px sans-serif'
      const lines = wrapText(ctx, block.text, BODY_W - 56)
      return { h: 36 + lines.length * 42 + 36, _lines: lines }
    }

    case 'analogy': {
      // 💡 비유 박스 — 진파랑 22px bold (상하 패딩 ↑)
      ctx.font = 'bold 22px sans-serif'
      const lines = wrapText(ctx, block.text, BODY_W - 72)
      return { h: 30 + lines.length * 36 + 30, _lines: lines }
    }

    case 'quote': {
      ctx.font = 'bold italic 22px sans-serif'
      const lines = wrapText(ctx, block.text, BODY_W - 72)
      return { h: 34 + lines.length * 36 + 34, _lines: lines }
    }

    case 'callout': {
      // 콜아웃 박스 — 내부 패딩 + 항목 간격 ↑
      ctx.font = 'bold 20px sans-serif'
      const titleLines = block.title ? wrapText(ctx, block.title, BODY_W - 48) : []
      ctx.font = '600 19px sans-serif'
      // wrap 너비에서 • 아이콘 폭(약 22px)을 빼서 계산 — prefix는 draw에서만 붙임
      const itemLines = (block.items || []).map(it => wrapText(ctx, it, BODY_W - 74))
      const titleH = titleLines.length * 32 + (titleLines.length ? 14 : 0)
      const itemsH = itemLines.reduce((a, ls) => a + ls.length * 32 + 10, 0)
      return { h: 26 + titleH + itemsH + 26, _titleLines: titleLines, _itemLines: itemLines }
    }

    case 'list': {
      ctx.font = '600 21px sans-serif'
      // wrap 너비에서 • 폭(약 22px)을 빼서 계산 — prefix는 draw에서만 붙임
      const itemLines = (block.items || []).map(it => wrapText(ctx, it, BODY_W - 42))
      const itemsH = itemLines.reduce((a, ls) => a + ls.length * 36 + 12, 0)
      return { h: itemsH + 16, _itemLines: itemLines }
    }

    case 'qa': {
      ctx.font = 'bold 21px sans-serif'
      // 콘텐츠가 이미 "Q." / "A."로 시작하면 라벨 중복 방지를 위해 제거
      const qText = (block.q || '').replace(/^Q\.\s*/i, '')
      const aText = (block.a || '').replace(/^A\.\s*/i, '')
      const qLines = wrapText(ctx, qText, BODY_W - 56)
      ctx.font = '600 20px sans-serif'
      const aLines = wrapText(ctx, aText, BODY_W - 56)
      const qH = qLines.length * 32 + 28
      const aH = aLines.length * 34 + 28
      return { h: qH + 6 + aH + 12, _qLines: qLines, _aLines: aLines, _qH: qH, _aH: aH }
    }

    case 'persona': {
      ctx.font = 'bold 22px sans-serif'
      const tLines = wrapText(ctx, block.title || '', BODY_W - 48)
      ctx.font = 'italic 18px sans-serif'
      const sLines = wrapText(ctx, block.subtitle || '', BODY_W - 48)
      ctx.font = '600 19px sans-serif'
      const bLines = (block.blocks || []).map(b => wrapText(ctx, b, BODY_W - 76))
      const tH = tLines.length * 32
      const sH = sLines.length * 28 + 14
      const bH = bLines.reduce((a, ls) => a + ls.length * 32 + 12, 0)
      return { h: 24 + tH + sH + bH + 24, _tLines: tLines, _sLines: sLines, _bLines: bLines }
    }

    case 'ref': {
      ctx.font = '600 16px sans-serif'
      const lines = wrapText(ctx, block.text || '', BODY_W - 24)
      return { h: lines.length * 26 + 14, _lines: lines }
    }

    default:
      return { h: 0 }
  }
}

/* ════════════════════════════════════════════════
   블록별 "그리기"
══════════════════════════════════════════════════ */
function drawBlock(ctx, block, y, m) {
  switch (block.type) {

    case 'divider': {
      ctx.strokeStyle = LINE
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(PAD + 80, y + 14)
      ctx.lineTo(W - PAD - 80, y + 14)
      ctx.stroke()
      return y + m.h
    }

    case 'section': {
      // 번호 박스 세로 중앙 정렬 (h:42, 큐 제목 baseline과 조화)
      const baseY = y + 20
      const numH = 42
      let titleX = PAD
      if (block.num) {
        ctx.font = 'bold 19px sans-serif'
        const numText = block.num
        const numW = Math.max(78, ctx.measureText(numText).width + 30)
        roundRect(ctx, PAD, baseY, numW, numH, 8)
        ctx.fillStyle = NAVY
        ctx.fill()
        ctx.fillStyle = '#fff'
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillText(numText, PAD + numW / 2, baseY + numH / 2 + 1)
        ctx.textAlign = 'left'
        titleX = PAD + numW + 14
      }
      // 큰 제목 — 수직 중앙 정렬 (번호 박스와 baseline 맞춤)
      ctx.font = 'bold 30px sans-serif'
      ctx.fillStyle = NAVY
      ctx.textBaseline = 'top'
      const titleStartY = m._titleLines.length === 1
        ? baseY + (numH - 30) / 2 - 2   // 1줄 — 번호 박스에 가운데 맞춤
        : baseY                          // 2줄이상 — 상단부터
      m._titleLines.forEach((l, i) => ctx.fillText(l, titleX, titleStartY + i * 42))
      // 골드 밑줄
      const titleBottom = titleStartY + m._titleLines.length * 42
      const underY = Math.max(baseY + numH, titleBottom) + 12
      ctx.strokeStyle = GOLD
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(PAD, underY)
      ctx.lineTo(PAD + 140, underY)
      ctx.stroke()
      return y + m.h
    }

    case 'h2': {
      // 좌측 강조 막대 + 빨강 큰 글씨
      ctx.fillStyle = HL_RED
      ctx.fillRect(PAD, y + 28, 6, m._lines.length * 38 + 6)
      ctx.font = 'bold 26px sans-serif'
      ctx.fillStyle = HL_RED
      ctx.textBaseline = 'top'
      m._lines.forEach((l, i) => ctx.fillText(l, PAD + 18, y + 24 + i * 38))
      return y + m.h
    }

    case 'h3': {
      // 소제목 — 좌측 작은 막대 + 진파랑 글씨
      ctx.fillStyle = ACC
      ctx.fillRect(PAD, y + 22, 4, m._lines.length * 32 + 4)
      ctx.font = 'bold 22px sans-serif'
      ctx.fillStyle = ACC
      ctx.textBaseline = 'top'
      m._lines.forEach((l, i) => ctx.fillText(l, PAD + 14, y + 20 + i * 32))
      return y + m.h
    }

    case 'p': {
      ctx.font = '600 22px sans-serif'
      ctx.fillStyle = INK
      ctx.textBaseline = 'top'
      m._lines.forEach((l, i) => ctx.fillText(l, PAD, y + 10 + i * 38))
      return y + m.h
    }

    case 'highlight': {
      // 노랑 형광 배경 + 빨강 큰 글씨 — 박스 안쪽 여백 확장
      const boxH = m.h - 12
      roundRect(ctx, PAD, y + 6, BODY_W, boxH, 14)
      ctx.fillStyle = HL_BG
      ctx.fill()
      ctx.strokeStyle = HL_BD
      ctx.lineWidth = 2
      ctx.stroke()
      // 좌측 빨강 마크
      ctx.fillStyle = HL_RED
      ctx.fillRect(PAD + 16, y + 22, 6, boxH - 32)
      // 글자
      ctx.font = 'bold 28px sans-serif'
      ctx.fillStyle = HL_RED
      ctx.textBaseline = 'top'
      m._lines.forEach((l, i) => ctx.fillText(l, PAD + 36, y + 32 + i * 42))
      return y + m.h
    }

    case 'analogy': {
      // 💡 박스 — 연한 파랑 배경 + 진파랑 글씨, 내부 여백 ↑
      const boxH = m.h - 12
      roundRect(ctx, PAD, y + 6, BODY_W, boxH, 12)
      ctx.fillStyle = AN_BG
      ctx.fill()
      ctx.strokeStyle = AN_BD
      ctx.lineWidth = 2
      ctx.stroke()
      // 💡 아이콘
      ctx.font = 'bold 28px sans-serif'
      ctx.fillStyle = AN_INK
      ctx.textBaseline = 'top'
      ctx.fillText('💡', PAD + 18, y + 24)
      // 본문
      ctx.font = 'bold 22px sans-serif'
      ctx.fillStyle = AN_INK
      m._lines.forEach((l, i) => ctx.fillText(l, PAD + 62, y + 26 + i * 36))
      return y + m.h
    }

    case 'quote': {
      const boxH = m.h - 12
      roundRect(ctx, PAD, y + 6, BODY_W, boxH, 14)
      ctx.fillStyle = '#FFF9EC'
      ctx.fill()
      ctx.strokeStyle = GOLD
      ctx.lineWidth = 2
      ctx.stroke()
      // 큰 따옴표
      ctx.font = 'bold 52px serif'
      ctx.fillStyle = GOLD
      ctx.textBaseline = 'top'
      ctx.fillText('"', PAD + 18, y + 14)
      // 본문
      ctx.font = 'bold italic 22px sans-serif'
      ctx.fillStyle = QUOTE
      m._lines.forEach((l, i) => ctx.fillText(l, PAD + 60, y + 36 + i * 36))
      return y + m.h
    }

    case 'callout': {
      // 콜아웃 — 타이틀(▸) + 항목(•) wrap 들여쓰기 적용
      const boxH = m.h - 12
      roundRect(ctx, PAD, y + 6, BODY_W, boxH, 12)
      ctx.fillStyle = REC_B
      ctx.fill()
      ctx.strokeStyle = REC_BD
      ctx.lineWidth = 1.5
      ctx.stroke()
      let yy = y + 26
      if (m._titleLines.length) {
        ctx.font = 'bold 20px sans-serif'
        ctx.fillStyle = '#7A5C00'
        ctx.textBaseline = 'top'
        m._titleLines.forEach((l, i) => {
          ctx.fillText((i === 0 ? '▸ ' : '   ') + l, PAD + 22, yy)
          yy += 32
        })
        yy += 12
      }
      // 항목 — 첫 줄은 •, wrap 줄은 들여쓰기
      ctx.font = '600 19px sans-serif'
      ctx.fillStyle = INK
      const itemIndentX = PAD + 28
      const wrapIndentX = PAD + 44
      m._itemLines.forEach(ls => {
        ls.forEach((l, i) => {
          const text = (i === 0 ? '• ' : '') + l
          ctx.fillText(text, i === 0 ? itemIndentX : wrapIndentX, yy)
          yy += 32
        })
        yy += 10
      })
      return y + m.h
    }

    case 'list': {
      // 리스트 — 첫 줄에만 •, wrap 줄은 들여쓰기
      ctx.font = '600 21px sans-serif'
      ctx.fillStyle = INK
      ctx.textBaseline = 'top'
      let yy = y + 10
      const bulletX = PAD + 12
      const wrapX = PAD + 30
      m._itemLines.forEach(ls => {
        ls.forEach((l, i) => {
          const text = (i === 0 ? '• ' : '') + l
          ctx.fillText(text, i === 0 ? bulletX : wrapX, yy)
          yy += 36
        })
        yy += 12
      })
      return y + m.h
    }

    case 'qa': {
      // Q 박스 — 명확한 “Q.” 라벨 + 텍스트 인덱트
      const qH = m._qH
      roundRect(ctx, PAD, y + 6, BODY_W, qH, 10)
      ctx.fillStyle = '#EDF2FA'
      ctx.fill()
      ctx.fillStyle = NAVY
      ctx.fillRect(PAD, y + 6, 6, qH)
      // Q 라벨
      ctx.font = 'bold 22px sans-serif'
      ctx.fillStyle = NAVY
      ctx.textBaseline = 'top'
      ctx.fillText('Q.', PAD + 18, y + 18)
      // Q 본문
      ctx.font = 'bold 21px sans-serif'
      ctx.fillStyle = NAVY
      m._qLines.forEach((l, i) => ctx.fillText(l, PAD + 52, y + 18 + i * 32))

      // A 박스
      const aY = y + 6 + qH + 6
      const aH = m._aH
      roundRect(ctx, PAD, aY, BODY_W, aH, 10)
      ctx.fillStyle = '#FFFBF0'
      ctx.fill()
      ctx.fillStyle = GOLD
      ctx.fillRect(PAD, aY, 6, aH)
      // A 라벨
      ctx.font = 'bold 22px sans-serif'
      ctx.fillStyle = '#7A5C00'
      ctx.fillText('A.', PAD + 18, aY + 14)
      // A 본문
      ctx.font = '600 20px sans-serif'
      ctx.fillStyle = INK
      m._aLines.forEach((l, i) => ctx.fillText(l, PAD + 52, aY + 14 + i * 34))
      return y + m.h
    }

    case 'persona': {
      const boxH = m.h - 8
      roundRect(ctx, PAD, y + 4, BODY_W, boxH, 12)
      ctx.fillStyle = '#F7FAFC'
      ctx.fill()
      ctx.strokeStyle = TEAL
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.fillStyle = TEAL
      ctx.fillRect(PAD, y + 4, 6, boxH)
      let yy = y + 22
      // 제목
      ctx.font = 'bold 22px sans-serif'
      ctx.fillStyle = NAVY
      ctx.textBaseline = 'top'
      m._tLines.forEach(l => { ctx.fillText(l, PAD + 22, yy); yy += 32 })
      // 부제
      ctx.font = 'italic 18px sans-serif'
      ctx.fillStyle = GREY
      m._sLines.forEach(l => { ctx.fillText(l, PAD + 22, yy); yy += 28 })
      yy += 14
      // 항목 (— 프리픽스 + wrap 들여쓰기)
      ctx.font = '600 19px sans-serif'
      ctx.fillStyle = INK
      const dashX = PAD + 22
      const wrapX = PAD + 48
      m._bLines.forEach(ls => {
        ls.forEach((l, i) => {
          const text = (i === 0 ? '— ' : '') + l
          ctx.fillText(text, i === 0 ? dashX : wrapX, yy)
          yy += 32
        })
        yy += 12
      })
      return y + m.h
    }

    case 'ref': {
      // 참고문헌 — 16px, 좌측 연한 세로선 + 들여쓰기
      ctx.fillStyle = '#C0C8D6'
      ctx.fillRect(PAD, y + 6, 3, m._lines.length * 26 + 4)
      ctx.font = '600 16px sans-serif'
      ctx.fillStyle = '#333'
      ctx.textBaseline = 'top'
      m._lines.forEach((l, i) => ctx.fillText(l, PAD + 16, y + 6 + i * 26))
      return y + m.h
    }

    default:
      return y
  }
}

/* ════════════════════════════════════════════════
   표지
══════════════════════════════════════════════════ */
function drawCoverPage(ctx, block) {
  const grad = ctx.createLinearGradient(0, 0, 0, H)
  grad.addColorStop(0, '#0A1530')
  grad.addColorStop(0.55, '#0D1B3E')
  grad.addColorStop(1, '#1a3a6a')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  ctx.strokeStyle = GOLD
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(PAD, 110)
  ctx.lineTo(PAD + 100, 110)
  ctx.stroke()

  ctx.font = 'bold 14px sans-serif'
  ctx.fillStyle = GOLD
  ctx.textBaseline = 'top'
  ctx.textAlign = 'left'
  ctx.fillText(block.eyebrow, PAD, 130)

  ctx.font = 'bold 72px sans-serif'
  ctx.fillStyle = '#fff'
  ctx.fillText(block.title1, PAD, 210)

  ctx.font = 'bold 62px sans-serif'
  ctx.fillStyle = '#D4AF5A'
  ctx.fillText(block.title2, PAD, 310)

  ctx.strokeStyle = GOLD
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(PAD, 410)
  ctx.lineTo(W - PAD, 410)
  ctx.stroke()

  ctx.font = '20px sans-serif'
  ctx.fillStyle = '#b0c8e0'
  const subLines = wrapText(ctx, block.subtitle, BODY_W)
  subLines.forEach((l, i) => ctx.fillText(l, PAD, 432 + i * 30))

  // 모토 박스
  const mY = 620
  const mH = 180
  roundRect(ctx, PAD + 30, mY, W - (PAD + 30) * 2, mH, 14)
  ctx.fillStyle = 'rgba(184,149,58,0.14)'
  ctx.fill()
  ctx.strokeStyle = GOLD
  ctx.lineWidth = 2
  ctx.stroke()

  ctx.font = 'bold 13px sans-serif'
  ctx.fillStyle = GOLD
  ctx.textAlign = 'center'
  ctx.fillText('파트너의 모토 · PARTNER\'S MOTTO', W / 2, mY + 26)

  ctx.font = 'bold italic 28px sans-serif'
  ctx.fillStyle = '#fff'
  ctx.fillText(block.motto, W / 2, mY + 82)

  ctx.font = '14px sans-serif'
  ctx.fillStyle = '#7e93b3'
  ctx.fillText(block.footer, W / 2, H - 90)

  ctx.font = 'bold 13px sans-serif'
  ctx.fillStyle = GOLD
  ctx.fillText('PHLOROTANNIN PARTNERS · 2025 EDITION', W / 2, H - 60)

  ctx.textAlign = 'left'
}

/* ════════════════════════════════════════════════
   목차 (여러 페이지로 자동 분할)
══════════════════════════════════════════════════ */
function drawTocPageHeader(ctx, isFirst) {
  ctx.font = 'bold 14px sans-serif'
  ctx.fillStyle = NAVY
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  ctx.fillText('📚 플로로탄닌 파트너 실전 교본', PAD, 36)
  ctx.font = '12px sans-serif'
  ctx.fillStyle = GREY
  ctx.textAlign = 'right'
  ctx.fillText('TABLE OF CONTENTS · 목차', W - PAD, 36)
  ctx.textAlign = 'left'

  ctx.strokeStyle = GOLD
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(PAD, 56)
  ctx.lineTo(W - PAD, 56)
  ctx.stroke()

  if (isFirst) {
    ctx.font = 'bold 44px sans-serif'
    ctx.fillStyle = NAVY
    ctx.textBaseline = 'top'
    ctx.fillText('목  차', PAD, 100)

    ctx.font = '15px sans-serif'
    ctx.fillStyle = GREY
    ctx.fillText('CONTENTS — 본문 14장 + 보충 6장 + 참고자료', PAD, 168)

    ctx.strokeStyle = LINE
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(PAD, 204)
    ctx.lineTo(W - PAD, 204)
    ctx.stroke()
    return 226
  } else {
    return 80
  }
}

function drawTocItem(ctx, num, title, y) {
  // 번호
  ctx.font = 'bold 17px sans-serif'
  ctx.fillStyle = num ? GOLD : GREY
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  ctx.fillText(num || '※', PAD + 2, y + 16)

  // 제목
  ctx.font = num ? 'bold 18px sans-serif' : '600 17px sans-serif'
  ctx.fillStyle = num ? NAVY : '#555'
  const titleLines = wrapText(ctx, title, BODY_W - 90)
  titleLines.forEach((l, i) => ctx.fillText(l, PAD + 80, y + 16 + i * 28))

  // 점선
  if (titleLines.length === 1) {
    const titleW = ctx.measureText(titleLines[0]).width
    const dotStartX = PAD + 80 + titleW + 10
    const dotEndX = W - PAD - 10
    if (dotEndX > dotStartX + 20) {
      ctx.strokeStyle = '#cfd6e3'
      ctx.lineWidth = 1
      ctx.setLineDash([2, 5])
      ctx.beginPath()
      ctx.moveTo(dotStartX, y + 16)
      ctx.lineTo(dotEndX, y + 16)
      ctx.stroke()
      ctx.setLineDash([])
    }
  }
  return Math.max(36, titleLines.length * 28 + 10)
}

/* ════════════════════════════════════════════════
   메인 렌더
══════════════════════════════════════════════════ */
export async function drawHandbookPages(scale = 2) {
  const tmpCanvas = document.createElement('canvas')
  tmpCanvas.width = W
  tmpCanvas.height = H
  const tmpCtx = tmpCanvas.getContext('2d')

  // 1차 패스: 페이지 분리 계획
  const pages = []
  let curPage = []
  let curY = TOP_Y

  function flushPage() {
    if (curPage.length) pages.push(curPage)
    curPage = []
    curY = TOP_Y
  }

  for (const block of HANDBOOK_BLOCKS) {
    if (block.type === 'cover') {
      flushPage()
      pages.push([{ block, m: { h: H, special: 'cover' } }])
      continue
    }
    if (block.type === 'toc') {
      // 목차는 자체적으로 페이지 분할
      flushPage()
      // 목차 항목을 페이지에 나눠 담기
      const tocItems = block.items || []
      let tocPageItems = []
      let tocY = 226  // 첫 페이지 시작 y
      let firstPage = true
      for (const item of tocItems) {
        const [num, title] = item
        // 한 줄 가정 28, 두 줄 가정 56까지 보수적 추정
        ctx2estimate(tmpCtx)
        const titleLines = wrapText(tmpCtx, title, BODY_W - 90)
        const itemH = Math.max(36, titleLines.length * 28 + 10)
        if (tocY + itemH > BOT_Y) {
          pages.push([{ block: { type: '__toc_page', items: tocPageItems, firstPage }, m: { h: H, special: 'toc' } }])
          tocPageItems = []
          tocY = 80
          firstPage = false
        }
        tocPageItems.push({ num, title })
        tocY += itemH
      }
      if (tocPageItems.length) {
        pages.push([{ block: { type: '__toc_page', items: tocPageItems, firstPage, lastPage: true, motto: '"몸은 하나입니다. 회복도 하나로 봐야 합니다."' }, m: { h: H, special: 'toc' } }])
      }
      continue
    }
    if (block.type === 'pagebreak') {
      flushPage()
      continue
    }

    const m = measureBlock(tmpCtx, block)
    const minSpaceForSection = (block.type === 'section') ? 280 : (block.type === 'h2') ? 160 : 0
    const fits = (curY + m.h <= BOT_Y) && (minSpaceForSection === 0 || BOT_Y - curY >= minSpaceForSection)

    if (!fits) {
      flushPage()
    }

    if (block.type === 'section' && curPage.length > 0 && curY > TOP_Y + 80) {
      curY += 16
    }

    // 블록 간 기본 숨쉬는 간격 (시각적 분리)
    const blockGap = (
      block.type === 'section' ? 18 :
      block.type === 'h2'      ? 14 :
      block.type === 'h3'      ? 10 :
      block.type === 'highlight' ? 16 :
      block.type === 'analogy'   ? 14 :
      block.type === 'quote'     ? 16 :
      block.type === 'callout'   ? 16 :
      block.type === 'list'      ? 12 :
      block.type === 'qa'        ? 14 :
      block.type === 'persona'   ? 16 :
      block.type === 'ref'       ?  4 :
      block.type === 'p'         ?  8 :
      0
    )

    curPage.push({ block, m, atY: curY })
    curY += m.h + blockGap
  }
  flushPage()

  // 2차 패스: 실제 렌더
  const totalPages = pages.length
  const out = []

  for (let i = 0; i < pages.length; i++) {
    const { canvas, ctx } = newCanvas(scale)
    const items = pages[i]

    if (items.length === 1 && items[0].m.special === 'cover') {
      drawCoverPage(ctx, items[0].block)
      // 표지에는 페이지 번호 없음
    } else if (items.length === 1 && items[0].m.special === 'toc') {
      const tp = items[0].block
      const startY = drawTocPageHeader(ctx, !!tp.firstPage)
      let yy = startY
      for (const it of tp.items) {
        yy += drawTocItem(ctx, it.num, it.title, yy)
      }
      // 마지막 목차 페이지에만 모토
      if (tp.lastPage && tp.motto) {
        ctx.font = 'bold italic 16px sans-serif'
        ctx.fillStyle = GOLD
        ctx.textAlign = 'center'
        ctx.fillText(tp.motto, W / 2, H - 90)
        ctx.textAlign = 'left'
      }
      drawFooter(ctx, i + 1, totalPages)
    } else {
      drawHeader(ctx)
      let y = TOP_Y
      for (const it of items) {
        if (it.block.type === 'section' && y > TOP_Y) {
          y += 20
        }
        y = drawBlock(ctx, it.block, y, it.m)
        // 블록 간 시각적 숨쉬는 간격 (1차 패스 blockGap과 동기화)
        y += (
          it.block.type === 'section'   ? 18 :
          it.block.type === 'h2'        ? 14 :
          it.block.type === 'h3'        ? 10 :
          it.block.type === 'highlight' ? 16 :
          it.block.type === 'analogy'   ? 14 :
          it.block.type === 'quote'     ? 16 :
          it.block.type === 'callout'   ? 16 :
          it.block.type === 'list'      ? 12 :
          it.block.type === 'qa'        ? 14 :
          it.block.type === 'persona'   ? 16 :
          it.block.type === 'ref'       ?  4 :
          it.block.type === 'p'         ?  8 :
          0
        )
      }
      drawFooter(ctx, i + 1, totalPages)
    }

    out.push(canvas)
  }

  return out
}

// 폰트 측정 안정화 (캔버스 컨텍스트 폰트 초기화)
function ctx2estimate(ctx) {
  ctx.font = 'bold 18px sans-serif'
}

export const HANDBOOK_TOTAL_BLOCKS = HANDBOOK_BLOCKS.length

// 디버그용 window 노출 (개발 시에만)
if (typeof window !== 'undefined') {
  window.__drawHandbookPages = drawHandbookPages
  window.__HANDBOOK_BLOCKS = HANDBOOK_BLOCKS
}
