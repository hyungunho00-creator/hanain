// Vercel Edge Function: 경로별로 index.html의 <title>·<meta>·OG 태그를
// 서버에서 치환해 응답한다. SPA 구조를 유지하면서 검색엔진/소셜 크롤러가
// 페이지마다 고유 메타를 보도록 한다.
//
// 사용: vercel.json의 rewrites가 SPA HTML 요청을 /api/_seo로 보낸다.

export const config = { runtime: 'edge' }

const SITE = 'https://phlorotannin.com'
const OG_IMG = `${SITE}/og-image.png`

// 카테고리 slug → 한글명 (CategoryPage 라우트용)
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

// ────────────────────────────────────────────────
// 경로별 메타 (정적 매핑)
// ────────────────────────────────────────────────
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
    // 내부 파트너 모집 페이지 — "파트너" 표현 유지 허용
    return {
      title: '파트너 참여 안내 | 플로로탄닌·감태추출물 건강정보 파트너 모집',
      desc:  '플로로탄닌·감태추출물 건강정보를 함께 나눌 파트너를 모집합니다. 재구매 중심 구조, 체계적 교육 자료, 개인 도구 지원 — 종합 건강정보 데이터센터와 함께 활동하세요.',
      canonical: `${SITE}/partner`,
    }
  }
  if (pathname.startsWith('/category/')) {
    const slug = pathname.replace('/category/', '').split('/')[0]
    const name = CATEGORY_NAMES[slug] || slug
    return {
      title: `${name} | 플로로탄닌 종합 건강정보 데이터센터`,
      desc:  `${name} 아카이브 — 플로로탄닌·감태추출물·해양 폴리페놀 기반 건강정보. 항산화·염증·면역·병원정보·전문가 Q&A까지 정리하는 종합 건강정보 데이터센터입니다.`,
      canonical: `${SITE}${pathname}`,
    }
  }
  // 파트너 개별 페이지: /p/01000000000 — 검색 노출 우선이 아니므로 기본값
  if (pathname.startsWith('/p/')) {
    return {
      title: '파트너 건강정보 페이지 | 플로로탄닌·감태추출물 건강정보 데이터센터',
      desc:  '플로로탄닌·감태추출물·해양 폴리페놀 건강정보를 함께 안내하는 파트너 페이지. 항산화·염증·혈당·수면·면역·뇌 건강·암환자 가족 건강정보·병원정보를 한 곳에서 확인하세요.',
      canonical: `${SITE}${pathname}`,
    }
  }
  return null // 기본 fallback
}

// ────────────────────────────────────────────────
// /blog/{slug} → Supabase에서 글 가져와 동적 메타 생성
// ────────────────────────────────────────────────
async function fetchPostMeta(slug) {
  const url = process.env.VITE_SUPABASE_URL || 'https://rlfxuyeoluoeaxuujtly.supabase.co'
  const key = process.env.VITE_SUPABASE_ANON_KEY
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
    const title = baseTitle.includes(' | ') ? baseTitle : `${baseTitle} | 플로로탄닌·감태추출물 건강정보`
    const rawDesc = p.meta_desc || p.excerpt || p.title
    const desc = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc
    return {
      title,
      desc: `${desc} (플로로탄닌·감태추출물·해양 폴리페놀 건강정보)`.slice(0, 300),
      canonical: `${SITE}/blog/${slug}`,
    }
  } catch {
    return null
  }
}

// ────────────────────────────────────────────────
// HTML 이스케이프 (속성용)
// ────────────────────────────────────────────────
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// ────────────────────────────────────────────────
// index.html에서 메타 태그들을 경로별로 치환
// ────────────────────────────────────────────────
function injectMeta(html, meta) {
  const t = esc(meta.title)
  const d = esc(meta.desc)
  const c = esc(meta.canonical)

  // 1) <title id="page-title">...</title>
  html = html.replace(
    /<title id="page-title">[\s\S]*?<\/title>/,
    `<title id="page-title">${t}</title>`
  )
  // 2) <meta id="page-desc" name="description" content="...">
  html = html.replace(
    /<meta id="page-desc" name="description" content="[^"]*"\s*\/?>/,
    `<meta id="page-desc" name="description" content="${d}" />`
  )
  // 3) <link rel="canonical" href="...">
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${c}" />`
  )
  // 4) og:title / og:description / og:url
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
  // 5) twitter:title / twitter:description
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

// ────────────────────────────────────────────────
// 메인 핸들러
// ────────────────────────────────────────────────
export default async function handler(req) {
  const url = new URL(req.url)
  let pathname = url.pathname

  // /api/_seo로 직접 들어오면 ?p=경로 쿼리로 받음
  if (pathname === '/api/_seo') {
    pathname = url.searchParams.get('p') || '/'
    if (!pathname.startsWith('/')) pathname = '/' + pathname
  }

  // 정적 자산은 절대 통과 안 시킴 (rewrites에서 걸러지지만 이중 안전장치)
  if (/\.(js|css|png|jpe?g|gif|svg|ico|webp|json|xml|txt|map|woff2?|ttf|eot|pdf)$/i.test(pathname)) {
    return fetch(`${SITE}${pathname}`)
  }

  // 1) /blog/{slug} 동적 메타
  let meta = null
  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/)
  if (blogMatch) {
    meta = await fetchPostMeta(blogMatch[1])
  }

  // 2) 정적 매핑
  if (!meta) meta = staticMetaFor(pathname)

  // 3) fallback (못 잡는 경로) — 기본 정체성 유지
  if (!meta) {
    meta = staticMetaFor('/')
    meta.canonical = `${SITE}${pathname}`
  }

  // 4) index.html 원본을 같은 도메인에서 가져옴
  // (Vercel 빌드 산출물이 /index.html로 서빙됨 — 리라이트 전 원본)
  const origin = `${url.protocol}//${url.host}`
  const indexRes = await fetch(`${origin}/index.html`, {
    headers: { 'x-seo-bypass': '1' },  // 무한 루프 방지 헤더 (혹시 모를 경우 대비)
  })
  if (!indexRes.ok) {
    return new Response(`index.html fetch failed: ${indexRes.status}`, { status: 500 })
  }
  let html = await indexRes.text()
  html = injectMeta(html, meta)

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
      'X-SEO-Path': pathname,
    },
  })
}
