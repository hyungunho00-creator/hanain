// Vercel Serverless Function (Node.js runtime)
// 경로별로 index.html의 <title>·<meta>·OG를 서버에서 치환해 응답한다.
// SPA 구조 유지하면서 검색엔진/소셜 크롤러가 페이지마다 고유 메타를 보도록 한다.
//
// Edge runtime 대신 Node.js runtime을 쓰는 이유:
// - fs로 빌드 산출물(hanain/dist/index.html)을 직접 읽을 수 있어
//   self-fetch 무한루프 위험이 없다.

import fs from 'fs'
import path from 'path'

const SITE = 'https://phlorotannin.com'

// 빌드 산출물 위치 — vercel은 outputDirectory(hanain/dist)를 루트에 매핑한다.
// 함수 실행 시 process.cwd()는 Vercel 환경에서 /var/task 가 됨.
// outputDirectory의 파일들은 /var/task에 그대로 복사되므로 'index.html' 경로로 접근.
let CACHED_HTML = null
function readIndexHtml() {
  if (CACHED_HTML) return CACHED_HTML
  const candidates = [
    path.join(process.cwd(), 'public', 'index.html'),
    path.join(process.cwd(), 'index.html'),
    path.join(process.cwd(), 'hanain', 'dist', 'index.html'),
    path.join(process.cwd(), '..', 'public', 'index.html'),
  ]
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) {
        CACHED_HTML = fs.readFileSync(p, 'utf8')
        return CACHED_HTML
      }
    } catch {}
  }
  return null
}

const CATEGORY_NAMES = {
  'diabetes': '당뇨·혈당 건강정보',
  'hypertension': '고혈압·혈관 건강정보',
  'cancer': '암환자 가족 건강정보',
  'cancer-family': '암환자 가족 건강정보',
  'dementia': '치매·뇌 건강정보',
  'brain': '뇌 건강정보',
  'skin': '피부 건강정보',
  'hair': '모발 건강정보',
  'sleep': '수면 건강정보',
  'immunity': '면역 건강정보',
  'inflammation': '염증 건강정보',
  'gut': '장 건강정보',
  'antioxidant': '항산화 건강정보',
  'hospital': '병원정보 아카이브',
}

const CATEGORY_DESC = {
  'diabetes':       '당뇨·혈당 건강정보 아카이브 — 감태추출물·플로로탄닌 정보센터. 항산화·염증·면역 관점의 혈당 건강정보와 전문가 Q&A를 정리합니다.',
  'hypertension':   '고혈압·혈관 건강정보 아카이브 — 플로로탄닌·감태추출물·해양 폴리페놀 정보센터. 항산화·염증·심혈관 건강정보를 한 곳에서.',
  'cancer':         '암환자 가족 건강정보 아카이브 — 항산화·면역·병원정보 중심. 플로로탄닌·감태추출물·해양 폴리페놀 관련 종합 건강정보 데이터센터.',
  'cancer-family':  '암환자 가족 건강정보 아카이브 — 항산화·면역·병원정보 중심. 플로로탄닌·감태추출물·해양 폴리페놀 관련 종합 건강정보 데이터센터.',
  'dementia':       '치매·뇌 건강정보 아카이브 — 플로로탄닌·감태추출물·해양 폴리페놀. 항산화·염증·뇌 건강정보를 정리하는 종합 건강정보 데이터센터.',
  'brain':          '뇌 건강정보 아카이브 — 플로로탄닌·감태추출물·해양 폴리페놀의 항산화·염증 작용과 뇌 건강 관련 정보를 정리.',
  'skin':           '피부 건강정보 아카이브 — 항산화·콜라겐·플로로탄닌·감태추출물·해양 폴리페놀 정보센터. 피부 노화·회복 건강정보.',
  'hair':           '모발 건강정보 아카이브 — 플로로탄닌·감태추출물·해양 폴리페놀. 항산화·염증·모발 건강 관련 종합 건강정보.',
  'sleep':          '수면 건강정보 아카이브 — 플로로탄닌·감태추출물·해양 폴리페놀. 항산화·염증·자율신경 관점의 수면 건강정보.',
  'immunity':       '면역 건강정보 아카이브 — 플로로탄닌·감태추출물·해양 폴리페놀. 항산화·염증·면역 건강정보 종합 데이터센터.',
  'inflammation':   '항산화·염증 건강정보 — 플로로탄닌·해양 폴리페놀 아카이브. 감태추출물 기반 염증 건강정보 종합 데이터센터.',
  'gut':            '장 건강 정보 아카이브 — 플로로탄닌·감태추출물·해양 폴리페놀. 항산화·염증·장내 환경 건강정보 종합.',
  'antioxidant':    '항산화·염증 건강정보 — 플로로탄닌·해양 폴리페놀 아카이브. 감태추출물 기반 항산화 건강정보 종합 데이터센터.',
  'hospital':       '병원정보 아카이브 — 암요양병원·한방병원·전문가 Q&A. 플로로탄닌·감태추출물·해양 폴리페놀 기반 종합 건강정보 데이터센터.',
}

// ─────────────────────────────────────────
// 경로별 정적 메타
// ─────────────────────────────────────────
function staticMetaFor(pathname) {
  if (pathname === '/' || pathname === '') {
    return {
      title: '플로로탄닌·감태추출물 종합 건강정보 데이터센터 | 해양 폴리페놀 정보 허브',
      desc:  '플로로탄닌닷컴은 감태추출물·해양 폴리페놀·플로로탄닌을 중심으로 항산화, 염증, 수면, 혈당, 면역, 장 건강, 뇌 건강, 암환자 가족 건강정보와 병원정보까지 정리하는 종합 건강정보 데이터센터입니다.',
      canonical: `${SITE}/`,
    }
  }
  if (pathname === '/home') {
    return {
      title: '플로로탄닌 건강정보 허브 | 감태추출물·해양 폴리페놀 쉽게 이해하기',
      desc:  '플로로탄닌과 감태추출물, 해양 폴리페놀의 기본 개념을 쉽게 정리한 건강정보 허브입니다. 항산화, 염증, 수면, 혈당, 면역 건강정보로 확장되는 핵심 내용을 안내합니다.',
      canonical: `${SITE}/home`,
    }
  }
  if (pathname === '/easy') {
    return {
      title: '쉬운 플로로탄닌 건강정보 | 감태추출물·해양 폴리페놀 쉽게 이해하기',
      desc:  '플로로탄닌, 감태추출물, 해양 폴리페놀을 처음 접하는 분들을 위해 항산화, 염증, 수면, 혈당, 면역 건강정보를 쉬운 언어로 정리한 페이지입니다.',
      canonical: `${SITE}/easy`,
    }
  }
  if (pathname === '/phlorotannin') {
    return {
      title: '플로로탄닌이란? 감태추출물·해양 폴리페놀 작용기전 정리 | 종합 건강정보 데이터센터',
      desc:  '플로로탄닌(Phlorotannin)이란 무엇인가 — 감태추출물에서 유래한 해양 폴리페놀(갈조류 폴리페놀)의 항산화·염증 기전, 혈당·면역·뇌 건강 작용을 논문 근거와 함께 정리한 건강정보 페이지입니다.',
      canonical: `${SITE}/phlorotannin`,
    }
  }
  if (pathname === '/learn') {
    return {
      title: '플로로탄닌 쉽게 배우기 | 감태추출물·해양 폴리페놀 학습 가이드',
      desc:  '플로로탄닌·감태추출물·해양 폴리페놀의 작용기전과 건강 효과를 단계별로 학습하는 가이드. 항산화·염증·혈당·수면·면역·뇌 건강까지 일반인이 이해할 수 있게 정리한 건강정보 아카이브입니다.',
      canonical: `${SITE}/learn`,
    }
  }
  if (pathname === '/qa') {
    return {
      title: '전문가 Q&A 아카이브 | 플로로탄닌·감태추출물 건강정보 데이터센터',
      desc:  '플로로탄닌·감태추출물·해양 폴리페놀 관련 전문가 Q&A 아카이브. 항산화·염증·혈당·수면·면역·뇌 건강·암환자 가족 건강정보·병원정보까지 질환별로 정리한 종합 건강정보 데이터센터의 Q&A 모음입니다.',
      canonical: `${SITE}/qa`,
    }
  }
  if (pathname === '/blog') {
    return {
      title: '건강정보 블로그 | 플로로탄닌·감태추출물·해양 폴리페놀 연구 아카이브',
      desc:  '감태추출물·해양 폴리페놀·플로로탄닌의 최신 연구와 건강정보를 정리한 블로그 아카이브. 항산화·염증·혈당·수면·면역·뇌 건강·암환자 가족 건강정보·당뇨 건강정보까지 폭넓게 다루는 종합 건강정보 데이터센터입니다.',
      canonical: `${SITE}/blog`,
    }
  }
  // SEO 확장 — 블로그 카테고리 랜딩 4종 (query string 기반)
  if (pathname === '/blog?category=ingredient-comparison') {
    return {
      title: '성분 비교 아카이브 | 콜라겐·후코이단·베타글루칸·플로로탄닌 비교',
      desc:  '다양한 건강성분과 플로로탄닌, 감태추출물, 해양 폴리페놀의 차이를 쉽게 비교하는 건강정보 아카이브입니다.',
      canonical: `${SITE}/blog?category=ingredient-comparison`,
    }
  }
  if (pathname === '/blog?category=disease-health-info') {
    return {
      title: '질환별 건강정보 | 암환자 가족·당뇨·수면·면역 정보 아카이브',
      desc:  '암환자 가족 건강정보, 당뇨·혈당, 수면, 면역, 장 건강, 뇌 건강 등 사람들이 실제로 검색하는 건강정보를 정리합니다.',
      canonical: `${SITE}/blog?category=disease-health-info`,
    }
  }
  if (pathname === '/blog?category=hospital-info') {
    return {
      title: '병원정보 아카이브 | 암요양병원·한방병원·전문가 Q&A 정보',
      desc:  '암요양병원, 한방병원, 재활병원, 전문가 Q&A 등 환자와 가족이 병원정보를 찾을 때 확인해야 할 기준을 정리합니다.',
      canonical: `${SITE}/blog?category=hospital-info`,
    }
  }
  if (pathname === '/blog?category=partner-info') {
    return {
      title: '파트너 개인 정보페이지 | 전자명함과 건강정보 플랫폼을 하나로 연결하는 방식',
      desc:  'phlorotannin.com 안에서 파트너 개인 링크를 전자명함, 정보 안내, 상담 연결 페이지로 활용하는 구조를 설명합니다.',
      canonical: `${SITE}/blog?category=partner-info`,
    }
  }
  if (pathname === '/community') {
    return {
      title: '건강정보 커뮤니티 | 플로로탄닌·감태추출물 건강정보 아카이브',
      desc:  '플로로탄닌·감태추출물·해양 폴리페놀 기반 건강정보 커뮤니티. 질환별 경험 공유와 항산화·염증·혈당·수면·면역·뇌 건강 정보가 모이는 종합 건강정보 데이터센터의 커뮤니티 공간입니다.',
      canonical: `${SITE}/community`,
    }
  }
  if (pathname === '/consult') {
    return {
      title: '건강정보 상담 문의 | 플로로탄닌·감태추출물 정보센터',
      desc:  '플로로탄닌·감태추출물·해양 폴리페놀 관련 건강정보 상담 문의. 항산화·염증·혈당·수면·면역·병원정보에 관해 종합 건강정보 데이터센터에 편하게 문의하세요.',
      canonical: `${SITE}/consult`,
    }
  }
  if (pathname === '/partner') {
    return {
      title: '파트너 참여 안내 | 플로로탄닌·감태추출물 건강정보 파트너 모집',
      desc:  '플로로탄닌·감태추출물 건강정보를 함께 나눌 파트너를 모집합니다. 재구매 중심 구조, 체계적 교육 자료, 개인 도구 지원 — 종합 건강정보 데이터센터와 함께 활동하세요.',
      canonical: `${SITE}/partner`,
    }
  }
  if (pathname.startsWith('/category/')) {
    const slug = pathname.replace('/category/', '').split('/')[0]
    const name = CATEGORY_NAMES[slug] || slug
    const desc = CATEGORY_DESC[slug] ||
      `${name} 아카이브 — 플로로탄닌·감태추출물·해양 폴리페놀 기반 건강정보. 항산화·염증·면역·병원정보·전문가 Q&A까지 정리하는 종합 건강정보 데이터센터입니다.`
    return {
      title: `${name} | 플로로탄닌 종합 건강정보 데이터센터`,
      desc,
      canonical: `${SITE}${pathname}`,
    }
  }
  if (pathname.startsWith('/p/')) {
    const phone = pathname.replace('/p/', '').split('/')[0]
    return {
      title: `${phone} 플로로탄닌 정보페이지 | phlorotannin.com 파트너 페이지`,
      desc:  '플로로탄닌, 감태추출물, 해양 폴리페놀 관련 건강정보와 자료 안내를 확인할 수 있는 파트너 전용 정보페이지입니다.',
      canonical: `${SITE}${pathname}`,
    }
  }
  return null
}

// ─────────────────────────────────────────
// /blog/{slug} → Supabase REST API
// ─────────────────────────────────────────
async function fetchPostMeta(slug) {
  const url = process.env.VITE_SUPABASE_URL ||
              process.env.SUPABASE_URL ||
              'https://rlfxuyeoluoeaxuujtly.supabase.co'
  const key = process.env.VITE_SUPABASE_ANON_KEY ||
              process.env.SUPABASE_ANON_KEY
  if (!key) return null
  try {
    const r = await fetch(
      `${url}/rest/v1/posts?slug=eq.${encodeURIComponent(slug)}&select=title,meta_title,meta_desc,excerpt&limit=1`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    )
    if (!r.ok) return null
    const arr = await r.json()
    const p = Array.isArray(arr) && arr[0]
    if (!p) return null
    const baseTitle = p.meta_title || p.title
    const title = baseTitle.includes(' | ')
      ? baseTitle
      : `${baseTitle} | 플로로탄닌·감태추출물 건강정보`
    let desc = p.meta_desc || p.excerpt || p.title
    if (desc.length > 140) desc = desc.slice(0, 137) + '...'
    desc = `${desc} (플로로탄닌·감태추출물·해양 폴리페놀 건강정보)`
    if (desc.length > 300) desc = desc.slice(0, 300)
    return { title, desc, canonical: `${SITE}/blog/${slug}` }
  } catch {
    return null
  }
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function injectMeta(html, meta) {
  const t = esc(meta.title)
  const d = esc(meta.desc)
  const c = esc(meta.canonical)

  // <title id="page-title">...</title>
  html = html.replace(
    /<title id="page-title">[\s\S]*?<\/title>/,
    `<title id="page-title">${t}</title>`
  )
  // 일반 <title> 백업
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)

  // <meta id="page-desc" name="description" ...>
  html = html.replace(
    /<meta id="page-desc" name="description" content="[^"]*"\s*\/?>/,
    `<meta id="page-desc" name="description" content="${d}" />`
  )
  // 백업: id 없는 description
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${d}" />`
  )

  // canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${c}" />`
  )

  // og
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${t}" />`
  )
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${d}" />`
  )
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${c}" />`
  )

  // twitter
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${t}" />`
  )
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${d}" />`
  )

  return html
}

// ─────────────────────────────────────────
// 메인 핸들러 (Node.js Serverless)
// ─────────────────────────────────────────
export default async function handler(req, res) {
  try {
    // 요청 URL 파싱 — 두 가지 케이스:
    // (1) /api/seo?p=/home  → 직접 호출 / 리라이트 destination
    // (2) /home             → vercel rewrites로 이쪽으로 잡힌 경우 req.url에 원본 경로
    const reqUrl = req.url || '/'
    const u = new URL(reqUrl, 'http://localhost')
    let pathname = u.searchParams.get('p') || u.pathname

    // /api/seo로 들어왔는데 p 쿼리가 없는 경우 — 안전 fallback
    if (pathname === '/api/seo') pathname = '/'
    if (!pathname.startsWith('/')) pathname = '/' + pathname

    // 메타 결정
    let meta = null
    const blogMatch = pathname.match(/^\/blog\/([^/]+)$/)
    if (blogMatch) {
      meta = await fetchPostMeta(blogMatch[1])
    }
    if (!meta) meta = staticMetaFor(pathname)
    if (!meta) {
      meta = staticMetaFor('/')
      meta.canonical = `${SITE}${pathname}`
    }

    // index.html 로드 (fs)
    const indexHtml = readIndexHtml()
    if (!indexHtml) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.status(500).send(`index.html not found. cwd=${process.cwd()}`)
      return
    }

    const html = injectMeta(indexHtml, meta)

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400')
    res.setHeader('X-SEO-Path', pathname)
    res.setHeader('X-SEO-Title', encodeURIComponent(meta.title))
    res.status(200).send(html)
  } catch (e) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.status(500).send(`SEO function error: ${e && e.message}`)
  }
}
