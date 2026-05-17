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
  'cancer_immune': '암·면역 건강정보',
  'dementia': '치매·뇌 건강정보',
  'brain': '뇌 건강정보',
  'neuro_cognitive': '뇌·인지 건강정보',
  'skin': '피부 건강정보',
  'skin_hair': '피부·모발 건강정보',
  'hair': '모발 건강정보',
  'sleep': '수면 건강정보',
  'immunity': '면역 건강정보',
  'inflammation': '염증 건강정보',
  'infection_inflammation': '감염·염증 건강정보',
  'gut': '장 건강정보',
  'digestive': '소화·장 건강정보',
  'antioxidant': '항산화 건강정보',
  'hospital': '병원정보 아카이브',
  'hospital-info': '병원정보 아카이브',
  'cardiovascular': '심혈관 건강정보',
  'metabolism': '대사·체중 건강정보',
  'musculoskeletal': '근골격 건강정보',
  'respiratory': '호흡기 건강정보',
  'mental_health': '정신·마음 건강정보',
  'womens_health': '여성 건강정보',
  'mens_health': '남성 건강정보',
  'ingredient-comparison': '성분 비교 아카이브',
  'disease-health-info': '질환별 건강정보',
  'partner-info': '파트너 정보페이지',
  'research': '연구·논문 아카이브',
  'general': '건강정보 종합',
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
      desc:  '콜라겐·후코이단·베타글루칸·EPA와 플로로탄닌, 감태추출물(Ecklonia cava), 해양 폴리페놀의 작용기전·임상 근거·항산화 특성을 한 번에 비교하는 종합 건강정보 아카이브입니다.',
      canonical: `${SITE}/blog?category=ingredient-comparison`,
    }
  }
  if (pathname === '/blog?category=disease-health-info') {
    return {
      title: '질환별 건강정보 | 암환자 가족·당뇨·수면·면역 정보 아카이브',
      desc:  '암환자 가족 건강정보, 당뇨·혈당, 수면, 면역, 장 건강, 뇌 건강, 피부 건강, 염증·항산화 기전까지 사람들이 실제로 검색하는 12개 질환 카테고리 건강정보를 임상 근거 기반으로 정리하는 아카이브입니다.',
      canonical: `${SITE}/blog?category=disease-health-info`,
    }
  }
  if (pathname === '/blog?category=hospital-info') {
    return {
      title: '병원정보 아카이브 | 암요양병원·한방병원·전문가 Q&A 정보',
      desc:  '암요양병원, 한방병원, 재활병원, 회복기 병원과 전문가 Q&A·진료과 비교·치료 옵션 안내 등 환자와 가족이 병원정보를 찾을 때 반드시 확인해야 할 기준과 실제 사례를 정리한 건강정보 아카이브입니다.',
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
  if (pathname === '/copyright') {
    return {
      title: '저작권 및 무단복제 금지 안내 | phlorotannin.com',
      desc:  'phlorotannin.com의 콘텐츠, 카테고리 구조, 파트너 정보페이지 시스템, 자료실, 데이터베이스 구조 및 SEO 설계의 무단 복제·재가공·상업적 이용 금지 안내입니다.',
      canonical: `${SITE}/copyright`,
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
// Supabase REST 공통 헬퍼
// ─────────────────────────────────────────
function sbCreds() {
  const url = process.env.VITE_SUPABASE_URL ||
              process.env.SUPABASE_URL ||
              'https://rlfxuyeoluoeaxuujtly.supabase.co'
  const key = process.env.VITE_SUPABASE_ANON_KEY ||
              process.env.SUPABASE_ANON_KEY ||
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck'
  return { url, key }
}

// Phase 3: pages 테이블에서 슬러그별 메타 조회 (staticMetaFor 우선 — 운영자가 어드민에서 덮어쓸 수 있게 함)
async function fetchPageMeta(slug) {
  const { url, key } = sbCreds()
  if (!key) return null
  try {
    const r = await fetch(
      `${url}/rest/v1/pages?slug=eq.${encodeURIComponent(slug)}&status=eq.active&select=title,meta_title,meta_desc&limit=1`,
      { headers: { apikey: key, Authorization: `Bearer ${key}`, 'Accept-Profile': 'public' } }
    )
    if (!r.ok) return null
    const arr = await r.json()
    const p = Array.isArray(arr) && arr[0]
    if (!p) return null
    const title = p.meta_title || p.title
    const desc  = p.meta_desc || ''
    if (!title) return null
    return {
      title,
      desc,
      canonical: `${SITE}/${slug === 'home' ? '' : slug}`,
    }
  } catch {
    return null
  }
}

// ─────────────────────────────────────────
// /blog/{slug} → Supabase REST API
// ─────────────────────────────────────────
async function fetchPostMeta(slug) {
  const url = process.env.VITE_SUPABASE_URL ||
              process.env.SUPABASE_URL ||
              'https://rlfxuyeoluoeaxuujtly.supabase.co'
  // anon key는 클라이언트 빌드에 이미 노출되는 공개 키이므로
  // Vercel 환경변수가 미설정이어도 동작하도록 하드코드 fallback 제공.
  const key = process.env.VITE_SUPABASE_ANON_KEY ||
              process.env.SUPABASE_ANON_KEY ||
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck'
  if (!key) return null
  try {
    const r = await fetch(
      `${url}/rest/v1/posts?slug=eq.${encodeURIComponent(slug)}&select=title,meta_title,meta_desc,excerpt&limit=1`,
      // Supabase 프로젝트 기본 노출 스키마가 'api'로 설정된 경우가 있어
      // public 스키마의 posts 테이블에 접근하려면 Accept-Profile 헤더가 필요하다.
      { headers: { apikey: key, Authorization: `Bearer ${key}`, 'Accept-Profile': 'public' } }
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

// ─────────────────────────────────────────
// SSR-lite Fallback (AI 크롤러 본문 읽기 최적화)
// ─────────────────────────────────────────
// 목적: 빈 <div id="root"></div>에 정적 한국어 본문을 주입해
// JS를 실행하지 않는 AI/검색 크롤러도 본문을 읽을 수 있게 한다.
// React(createRoot)는 마운트 시 root의 자식을 **교체**하므로 사용자 화면에는 영향 없음.
// 추가로 visually-hidden(sr-only) 스타일과 <noscript> 병행으로 안전망 구성.

const SR_ONLY_STYLE = '<style data-ssr-lite-style>.sr-only-ai-fallback{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}</style>'

// 11개 정적 경로용 fallback 본문 (700~1,000자 목표, 자연 문장, 의학적 단정 표현 제외)
const SSR_LITE_BODIES = {
  '/': {
    h1: '플로로탄닌·감태추출물 종합 건강정보 데이터센터',
    paras: [
      'phlorotannin.com은 플로로탄닌(phlorotannin), 감태추출물(Ecklonia cava extract), 해양 폴리페놀(갈조류 폴리페놀, 해조류 폴리페놀)에 관한 정보를 한 곳에 정리하는 건강정보 데이터센터입니다.',
      '플로로탄닌은 갈조류에서 발견되는 폴리페놀 계열 성분의 총칭으로, 대표 구성 분자로 eckol(에콜), dieckol(다이에콜) 등이 알려져 있습니다. 같은 감태(Ecklonia cava) 유래 해양 폴리페놀 성분군은 일부 자료에서 씨놀(Seanol)이라는 명칭으로도 언급되며, "카프"라는 표현으로 함께 검색되기도 합니다.',
      '이 사이트는 항산화, 염증, 혈당, 당뇨, 수면, 면역, 장 건강, 뇌 건강, 피부 건강 등 여러 주제에 걸친 연구 동향과 일반 건강정보를 정리합니다. 특정 질환의 치료나 예방을 단정하는 표현은 사용하지 않고, 공개된 자료와 사람들이 실제로 검색하는 질문에 답하는 구조로 콘텐츠를 모읍니다.',
      '메뉴는 크게 플로로탄닌 개요, 쉬운 건강정보(/easy, /learn), 블로그 아카이브(성분 비교, 질환별 건강정보, 병원정보, 파트너 정보페이지 안내), 전문가 Q&A, 파트너 개인 정보페이지(/p/:phone)로 구성됩니다.',
      '운영 목표는 사람이 보는 브라우저뿐 아니라 ChatGPT, GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Googlebot, Bingbot 같은 검색·AI 도구도 본문까지 읽을 수 있는 종합 건강정보 데이터센터를 만드는 것입니다.',
    ],
    nav: ['/home', '/easy', '/phlorotannin', '/learn', '/blog', '/qa', '/copyright'],
  },
  '/home': {
    h1: '플로로탄닌 건강정보 허브 — 감태추출물·해양 폴리페놀 쉽게 이해하기',
    paras: [
      '플로로탄닌(phlorotannin)은 갈조류·해조류에 풍부한 폴리페놀 계열 성분의 총칭입니다. 대표적으로 감태(Ecklonia cava)에서 추출되며, eckol, dieckol 등 다양한 분자 형태가 보고되어 있습니다.',
      '이 페이지는 플로로탄닌, 감태추출물, 해양 폴리페놀(갈조류 폴리페놀)을 처음 접하는 분들을 위해 작성되었습니다. 항산화, 염증, 혈당, 당뇨, 수면, 면역, 장 건강, 뇌 건강, 피부 건강 같은 주제별로 관련 연구 동향과 일반 건강정보를 안내합니다.',
      '같은 성분군이 자료에 따라 씨놀(Seanol), 카프 같은 별칭으로도 검색되기 때문에, 이 사이트는 사용자가 어떤 검색어로 들어오더라도 같은 정보 허브에 도달할 수 있도록 키워드를 폭넓게 정리합니다.',
      '아래 메뉴에서 더 자세한 페이지로 이동할 수 있습니다.',
    ],
    nav: ['/easy', '/phlorotannin', '/learn', '/blog', '/qa'],
  },
  '/easy': {
    h1: '쉬운 플로로탄닌 건강정보 — 감태추출물·해양 폴리페놀',
    paras: [
      '이 페이지는 플로로탄닌(phlorotannin), 감태추출물, 해양 폴리페놀을 어려운 용어 없이 쉽게 풀어 설명합니다. 처음 듣는 분도 부담 없이 읽을 수 있도록 비유와 간단한 문장 위주로 정리했습니다.',
      '핵심은 다음 세 가지입니다. 첫째, 플로로탄닌은 갈조류·해조류에 들어 있는 폴리페놀입니다. 둘째, 감태(Ecklonia cava)는 그 대표 원료이고, eckol·dieckol 같은 분자가 알려져 있습니다. 셋째, 같은 성분군이 씨놀(Seanol)·카프 같은 별칭으로 불리기도 합니다.',
      '항산화, 염증, 혈당, 수면, 면역, 장 건강, 뇌 건강, 피부 건강 같은 일상 키워드와 어떻게 연결되는지 한 줄씩 풀어드립니다. 의학적 치료·예방을 단정하지 않고, 공개된 연구 동향과 일반 건강정보 관점에서만 안내합니다.',
    ],
    nav: ['/home', '/phlorotannin', '/learn', '/blog', '/qa'],
  },
  '/phlorotannin': {
    h1: '플로로탄닌이란? — 감태추출물·해양 폴리페놀 작용기전 정리',
    paras: [
      '플로로탄닌(phlorotannin)은 갈조류(brown algae)에서 발견되는 폴리페놀(polyphenol) 계열 성분의 총칭입니다. 대표 원료는 감태(Ecklonia cava)이며, eckol(에콜), dieckol(다이에콜) 같은 분자가 잘 알려져 있습니다. 같은 감태 유래 해양 폴리페놀 성분군은 일부 자료에서 씨놀(Seanol)이라는 명칭으로도 언급됩니다.',
      '연구 자료에서 자주 다뤄지는 키워드는 항산화(antioxidant), 염증 반응, 혈당 관련 지표, 수면, 면역, 장 건강, 뇌 건강, 피부 건강 등입니다. 이 페이지는 공개된 논문·리뷰 자료에서 다뤄지는 작용기전을 일반 건강정보 수준으로 풀어 정리하며, 특정 질환의 치료나 예방을 단정하지 않습니다.',
      '관련 분류로는 갈조류 폴리페놀, 해조류 폴리페놀, 해양 폴리페놀이 있고, 검색어로는 플로로탄닌, 플로로타닌, phlorotannin, 감태추출물, Ecklonia cava, 씨놀, Seanol, 카프 등이 함께 사용됩니다.',
    ],
    nav: ['/learn', '/easy', '/blog', '/qa'],
  },
  '/learn': {
    h1: '플로로탄닌 쉽게 배우기 — 감태추출물·해양 폴리페놀 학습 가이드',
    paras: [
      '이 학습 가이드는 플로로탄닌(phlorotannin), 감태추출물, 해양 폴리페놀(갈조류 폴리페놀)의 개념과 작용기전을 단계별로 정리합니다.',
      '1단계 개념: 플로로탄닌은 무엇이고, 감태(Ecklonia cava)와 어떻게 연결되는가. 2단계 분자: eckol, dieckol 같은 대표 분자와 별칭(씨놀, Seanol, 카프). 3단계 주제별 연결: 항산화·염증·혈당·당뇨·수면·면역·장 건강·뇌 건강·피부 건강 같은 주제와 어떤 연구가 이뤄졌는지.',
      '의학적 효능을 단정하지 않으며, 공개된 연구 동향과 일반 건강정보 관점의 학습 자료로 사용하시기 바랍니다.',
    ],
    nav: ['/phlorotannin', '/easy', '/blog', '/qa'],
  },
  '/qa': {
    h1: '전문가 Q&A 아카이브 — 플로로탄닌·감태추출물 건강정보',
    paras: [
      '전문가 Q&A는 플로로탄닌(phlorotannin), 감태추출물, 해양 폴리페놀에 관해 사람들이 실제로 묻는 질문들을 모아 정리한 아카이브입니다.',
      '주제는 질환별 건강정보(당뇨·혈당, 암환자 가족 건강정보, 치매·뇌 건강, 수면, 면역, 장 건강, 피부 건강, 염증), 성분 비교(콜라겐·후코이단·베타글루칸 등 다른 건강성분과의 비교), 병원정보(암요양병원·한방병원·재활병원 선택 기준) 등으로 구성됩니다.',
      '검색어로는 플로로탄닌, 플로로타닌, phlorotannin, 감태추출물, Ecklonia cava, 씨놀, Seanol, 카프, 갈조류 폴리페놀, 해조류 폴리페놀, 해양 폴리페놀이 함께 사용됩니다.',
    ],
    nav: ['/blog', '/phlorotannin', '/learn', '/easy'],
  },
  '/blog': {
    h1: '건강정보 블로그 — 플로로탄닌·감태추출물·해양 폴리페놀 연구 아카이브',
    paras: [
      '건강정보 블로그는 플로로탄닌(phlorotannin), 감태추출물(Ecklonia cava), 해양 폴리페놀(갈조류 폴리페놀, 해조류 폴리페놀)의 연구 동향과 일반 건강정보를 모아 정리하는 아카이브입니다.',
      '아카이브는 네 가지 카테고리로 구성됩니다. 1) 성분 비교 — 콜라겐, 후코이단, 베타글루칸, 오메가3 등 다양한 건강성분과 플로로탄닌·감태추출물의 차이. 2) 질환별 건강정보 — 당뇨·혈당, 암환자 가족 건강정보, 치매·뇌 건강, 수면, 면역, 장 건강, 피부 건강, 염증. 3) 병원정보 — 암요양병원, 한방병원, 재활병원, 전문가 Q&A. 4) 파트너 정보페이지 안내.',
      '관련 검색어: 플로로탄닌, 플로로타닌, phlorotannin, 감태추출물, Ecklonia cava, 씨놀, Seanol, 카프, eckol, dieckol, 항산화, 염증, 면역.',
    ],
    nav: ['/blog?category=ingredient-comparison', '/blog?category=disease-health-info', '/blog?category=hospital-info', '/blog?category=partner-info'],
  },
  '/blog?category=ingredient-comparison': {
    h1: '성분 비교 아카이브 — 콜라겐·후코이단·베타글루칸·플로로탄닌 비교',
    paras: [
      '성분 비교 아카이브는 콜라겐, 후코이단, 베타글루칸, 오메가3 같은 다양한 건강성분과 플로로탄닌(phlorotannin), 감태추출물, 해양 폴리페놀(갈조류 폴리페놀)의 차이를 일반 건강정보 관점에서 비교하는 카테고리입니다.',
      '같은 감태(Ecklonia cava) 유래 해양 폴리페놀 성분군이 자료에 따라 씨놀(Seanol), 카프 같은 별칭으로도 언급되기 때문에, 이름이 달라도 동일 성분군인지 다른 성분인지 정리합니다.',
      '비교 항목은 원료(육상 vs 해양), 분자 종류(eckol, dieckol 등), 항산화 관점, 염증 관점, 흡수율, 적용 범위 등입니다. 의학적 효능을 단정하지 않고 연구 동향과 일반 건강정보 위주로 안내합니다.',
    ],
    nav: ['/blog', '/blog?category=disease-health-info', '/blog?category=hospital-info'],
  },
  '/blog?category=disease-health-info': {
    h1: '질환별 건강정보 — 암환자 가족·당뇨·수면·면역 정보 아카이브',
    paras: [
      '질환별 건강정보 아카이브는 사람들이 실제로 검색하는 건강 주제를 정리하는 카테고리입니다.',
      '주요 주제: 당뇨·혈당 건강정보, 암환자 가족 건강정보, 치매·뇌 건강, 수면 건강, 면역 건강, 장 건강, 피부 건강, 항산화·염증 관련 건강정보.',
      '각 주제는 플로로탄닌(phlorotannin), 감태추출물, 해양 폴리페놀(갈조류 폴리페놀, 해조류 폴리페놀)의 공개된 연구 동향과 어떻게 연결되는지 풀어 설명합니다. 의학적 치료·예방을 단정하지 않으며, 일반 건강정보 관점에서 안내합니다. 관련 검색어: eckol, dieckol, 씨놀, Seanol, 카프, Ecklonia cava.',
    ],
    nav: ['/blog', '/qa', '/blog?category=hospital-info'],
  },
  '/blog?category=hospital-info': {
    h1: '병원정보 아카이브 — 암요양병원·한방병원·전문가 Q&A',
    paras: [
      '병원정보 아카이브는 환자와 가족이 병원을 선택할 때 확인해야 하는 정보를 정리하는 카테고리입니다.',
      '다루는 분야: 암요양병원, 한방병원, 재활병원, 통합의학 병원, 그리고 각 분야 전문가 Q&A. 병원 선택 시 점검할 항목, 치료 외 환자·가족 건강정보(영양, 항산화, 염증, 면역, 수면, 장 건강, 뇌 건강 등)도 함께 정리합니다.',
      '관련 키워드: 플로로탄닌, phlorotannin, 감태추출물, Ecklonia cava, 해양 폴리페놀, 갈조류 폴리페놀, 해조류 폴리페놀, 씨놀, Seanol, 카프, eckol, dieckol.',
    ],
    nav: ['/blog', '/qa', '/blog?category=disease-health-info'],
  },
  '/blog?category=partner-info': {
    h1: '파트너 개인 정보페이지 — 전자명함과 건강정보 플랫폼을 잇는 구조',
    paras: [
      '파트너 정보페이지(/p/:phone)는 phlorotannin.com 안에서 파트너 개인 링크를 전자명함, 정보 안내, 상담 연결 페이지로 활용하는 구조입니다.',
      '각 파트너는 자신의 정보페이지에서 플로로탄닌(phlorotannin), 감태추출물, 해양 폴리페놀(갈조류 폴리페놀)에 관한 건강정보를 안내하고, 방문자가 안전하게 연락할 수 있는 전화/문자 채널을 제공합니다. 개인정보 보호를 위해 전화번호 노출에는 RevealContact 흐름이 적용됩니다.',
      '이 카테고리는 파트너 모집·운영 안내와 파트너 정보페이지 활용 방식을 정리하는 자료실 역할을 합니다. 관련 검색어: 플로로탄닌, 감태추출물, 해양 폴리페놀, 씨놀, Seanol, 카프, eckol, dieckol.',
    ],
    nav: ['/partner', '/blog', '/qa'],
  },
  '/copyright': {
    h1: '저작권 및 무단복제 금지 안내 — phlorotannin.com',
    paras: [
      'phlorotannin.com의 콘텐츠, 카테고리 구조, 파트너 정보페이지 시스템, 자료실, 데이터베이스 구조 및 SEO 설계는 운영 주체의 저작물입니다.',
      '본문 텍스트, 이미지, 카테고리 분류 체계, 파트너 페이지 URL 패턴, sitemap·robots.txt 설계, /api/seo 메타 주입 구조, 블로그·Q&A 아카이브 구조의 무단 복제, 재가공, 상업적 이용을 금지합니다.',
      '플로로탄닌(phlorotannin), 감태추출물, 해양 폴리페놀(갈조류 폴리페놀) 관련 일반 건강정보 자체는 공개 자료이지만, 이 사이트의 표현·구성·디자인은 별도 저작권의 보호를 받습니다.',
    ],
    nav: ['/', '/blog', '/qa'],
  },
}

// HTML/마크다운 → 평문 변환 (안전한 발췌용)
function stripToPlainText(s) {
  if (!s) return ''
  return String(s)
    // 1) script/style/iframe 블록 전체 제거 (보안)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, ' ')
    // 2) on* 이벤트 핸들러가 포함된 태그 통째로 제거 위험 → 그냥 모든 태그 제거
    .replace(/<[^>]+>/g, ' ')
    // 3) 마크다운 헤더/리스트/코드/링크/강조 마크 제거
    .replace(/`[^`]*`/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*>\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^---+$/gm, ' ')
    // 4) HTML 엔티티 디코드 (간단)
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    // 5) 공백 정리
    .replace(/\s+/g, ' ')
    .trim()
}

// /blog/:slug → posts.content 발췌 (600자 평문)
async function fetchPostBody(slug) {
  const { url, key } = sbCreds()
  if (!key) return null
  try {
    const r = await fetch(
      `${url}/rest/v1/posts?slug=eq.${encodeURIComponent(slug)}&select=id,slug,title,meta_title,meta_desc,excerpt,content,category,tags,og_image,published_at,updated_at&limit=1`,
      { headers: { apikey: key, Authorization: `Bearer ${key}`, 'Accept-Profile': 'public' } }
    )
    if (!r.ok) return null
    const arr = await r.json()
    const p = Array.isArray(arr) && arr[0]
    if (!p) return null
    const title = p.meta_title || p.title || ''
    const metaDesc = p.meta_desc || p.excerpt || ''
    // 원본 content는 JSON-LD/FAQ 추출용으로 보존, plain body는 fallback용 600자 발췌
    const contentRaw = String(p.content || '')
    let body = stripToPlainText(contentRaw)
    if (body.length > 600) {
      body = body.slice(0, 600)
      const lastSpace = body.lastIndexOf(' ')
      if (lastSpace > 400) body = body.slice(0, lastSpace)
      body = body.trim() + ' …'
    }
    if (body.length < 80 && metaDesc) {
      body = stripToPlainText(metaDesc)
    }
    return {
      title,
      metaDesc,
      body,
      category: p.category || '',
      // 항목 F 확장 필드 (Article JSON-LD, Related Posts, FAQ 추출용)
      id: p.id || null,
      slug: p.slug || slug,
      rawTitle: p.title || '',
      content: contentRaw,
      tags: Array.isArray(p.tags) ? p.tags.filter(t => t && typeof t === 'string') : [],
      ogImage: p.og_image || '',
      publishedAt: p.published_at || '',
      updatedAt: p.updated_at || '',
    }
  } catch {
    return null
  }
}

// /blog/:slug 의 같은 카테고리 다른 글 3건 (Related Posts)
// view_count 우선, 그 다음 최근 published_at 순으로 정렬
async function fetchRelatedPosts(category, excludeSlug, limit = 3) {
  if (!category || typeof category !== 'string') return []
  const { url, key } = sbCreds()
  if (!key) return []
  try {
    const params = [
      `category=eq.${encodeURIComponent(category)}`,
      `slug=neq.${encodeURIComponent(excludeSlug || '__none__')}`,
      `status=eq.published`,
      `select=slug,title,excerpt,published_at`,
      `order=view_count.desc.nullslast,published_at.desc.nullslast`,
      `limit=${limit}`,
    ].join('&')
    const r = await fetch(
      `${url}/rest/v1/posts?${params}`,
      { headers: { apikey: key, Authorization: `Bearer ${key}`, 'Accept-Profile': 'public' } }
    )
    if (!r.ok) return []
    const arr = await r.json()
    if (!Array.isArray(arr)) return []
    return arr.map(p => ({
      slug: p.slug || '',
      title: p.title || '',
      excerpt: p.excerpt || '',
    })).filter(p => p.slug && p.title)
  } catch {
    return []
  }
}

// /p/:phone → partners 정보 조회 (마스킹된 형태)
async function fetchPartnerBody(phone) {
  const { url, key } = sbCreds()
  if (!key) return null
  try {
    const r = await fetch(
      `${url}/rest/v1/partners?slug=eq.${encodeURIComponent(phone)}&status=eq.active&select=name,phone_display,memo,site_url&limit=1`,
      { headers: { apikey: key, Authorization: `Bearer ${key}`, 'Accept-Profile': 'public' } }
    )
    if (!r.ok) return null
    const arr = await r.json()
    const p = Array.isArray(arr) && arr[0]
    if (!p) return null
    return {
      name: p.name || '',
      phoneDisplay: maskPhone(phone),  // 검색 노출용 — 마스킹 처리
      memo: stripToPlainText(p.memo || ''),
      siteUrl: p.site_url || '',
    }
  } catch {
    return null
  }
}

// 전화번호 마스킹: 01012345678 → 010-****-5678
function maskPhone(phone) {
  const digits = String(phone || '').replace(/[^0-9]/g, '')
  if (digits.length === 11) return `${digits.slice(0, 3)}-****-${digits.slice(7)}`
  if (digits.length === 10) return `${digits.slice(0, 3)}-***-${digits.slice(6)}`
  return phone
}

// ─────────────────────────────────────────
// 항목 F: 2차 SEO 자산화 — JSON-LD 빌더 / Related Posts / FAQ 추출
// ─────────────────────────────────────────

// 본문에서 보수적 패턴으로 Q/A 쌍 추출.
// 매칭 패턴 (false positive 회피 위해 명시적 마커만 허용):
//   1) "Q1. ..." / "A1. ..."  (숫자 기반)
//   2) "**Q:** ..." / "**A:** ..."  (Markdown bold + 콜론)
//   3) "### Q. ..." / "### A. ..."  (Markdown 헤딩)
// 2건 이상 추출 시에만 반환. 각 Q/A는 stripToPlainText 후 400자로 cap.
function extractFaqFromContent(content) {
  if (!content || typeof content !== 'string') return []
  const text = content
  const pairs = []

  // 패턴 1: Q1./A1. 형식
  const re1 = /Q\s*([0-9]{1,2})\.\s*([\s\S]+?)\s*(?:^|\n)\s*A\s*\1\.\s*([\s\S]+?)(?=\n\s*Q\s*[0-9]{1,2}\.|\n\s*##|\n\s*---|$)/gm
  let m
  while ((m = re1.exec(text)) !== null && pairs.length < 10) {
    pairs.push({ q: m[2], a: m[3] })
  }

  // 패턴 2: **Q:** / **A:**
  if (pairs.length === 0) {
    const re2 = /\*\*Q\s*[:：]\*\*\s*([\s\S]+?)\s*\n\s*\*\*A\s*[:：]\*\*\s*([\s\S]+?)(?=\n\s*\*\*Q\s*[:：]\*\*|\n\s*##|\n\s*---|$)/gm
    while ((m = re2.exec(text)) !== null && pairs.length < 10) {
      pairs.push({ q: m[1], a: m[2] })
    }
  }

  // 패턴 3: ### Q. / ### A.
  if (pairs.length === 0) {
    const re3 = /^#{2,4}\s*Q[\s.:：]+([\s\S]+?)\n#{2,4}\s*A[\s.:：]+([\s\S]+?)(?=\n#{2,4}\s*Q[\s.:：]|\n#{1,4}\s|\n\s*---|$)/gm
    while ((m = re3.exec(text)) !== null && pairs.length < 10) {
      pairs.push({ q: m[1], a: m[2] })
    }
  }

  if (pairs.length < 2) return []

  return pairs.map(p => {
    let q = stripToPlainText(p.q).trim()
    let a = stripToPlainText(p.a).trim()
    if (q.length > 200) q = q.slice(0, 200).trim() + '…'
    if (a.length > 400) a = a.slice(0, 400).trim() + '…'
    return { q, a }
  }).filter(p => p.q.length >= 4 && p.a.length >= 8)
}

// JSON.stringify 결과를 <script> 내부 삽입 시 안전하게 만들기 (XSS 방지).
function safeJsonForScript(obj) {
  return JSON.stringify(obj)
    .replace(/<\/script>/gi, '<\\/script>')
    .replace(/<!--/g, '<\\!--')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

// /blog/:slug → Article JSON-LD
// posts 데이터를 활용하되, 의료 클레임 회피를 위해 MedicalWebPage 대신 Article 사용.
function buildArticleJsonLd(post, pathname) {
  if (!post || !post.rawTitle) return null
  const canonical = `${SITE}${pathname}`
  const image = post.ogImage
    ? (post.ogImage.startsWith('http') ? post.ogImage : `${SITE}${post.ogImage.startsWith('/') ? '' : '/'}${post.ogImage}`)
    : `${SITE}/og-image.png`

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: String(post.rawTitle).slice(0, 110),
    description: post.metaDesc ? String(post.metaDesc).slice(0, 300) : undefined,
    inLanguage: 'ko-KR',
    isAccessibleForFree: true,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    url: canonical,
    image: { '@type': 'ImageObject', url: image, width: 1200, height: 630 },
    author: {
      '@type': 'Organization',
      name: '플로로탄닌 파트너스',
      url: SITE,
    },
    publisher: {
      '@type': 'Organization',
      name: '플로로탄닌·감태추출물 종합 건강정보 데이터센터',
      url: SITE,
      logo: { '@type': 'ImageObject', url: `${SITE}/og-image.png`, width: 1200, height: 630 },
    },
  }
  if (post.publishedAt) ld.datePublished = post.publishedAt
  if (post.updatedAt) ld.dateModified = post.updatedAt
  if (Array.isArray(post.tags) && post.tags.length) {
    ld.keywords = post.tags.slice(0, 12).join(', ')
  } else if (post.category) {
    ld.keywords = post.category
  }
  // undefined 값 제거
  Object.keys(ld).forEach(k => { if (ld[k] === undefined) delete ld[k] })
  return ld
}

// /blog/:slug → BreadcrumbList JSON-LD (Home > 블로그 > 카테고리 > 글)
function buildBreadcrumbJsonLd(post, pathname) {
  if (!post) return null
  const items = [
    { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: '건강정보 블로그', item: `${SITE}/blog` },
  ]
  if (post.category) {
    const catName = CATEGORY_NAMES[post.category] || post.category
    // 카테고리 페이지가 라우팅으로 노출되는 4개에 한해 정확한 URL 사용, 그 외엔 /blog 로 fallback
    const catUrlMap = {
      'ingredient-comparison': `${SITE}/blog?category=ingredient-comparison`,
      'disease-health-info':   `${SITE}/blog?category=disease-health-info`,
      'hospital-info':         `${SITE}/blog?category=hospital-info`,
      'partner-info':          `${SITE}/blog?category=partner-info`,
    }
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: catName,
      item: catUrlMap[post.category] || `${SITE}/blog`,
    })
  }
  items.push({
    '@type': 'ListItem',
    position: items.length + 1,
    name: String(post.rawTitle || post.title || '').slice(0, 110),
    item: `${SITE}${pathname}`,
  })
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

// /blog/:slug → FAQPage JSON-LD (Q/A 패턴이 2건 이상일 때만)
function buildFaqJsonLd(faqPairs) {
  if (!Array.isArray(faqPairs) || faqPairs.length < 2) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqPairs.map(p => ({
      '@type': 'Question',
      name: p.q,
      acceptedAnswer: { '@type': 'Answer', text: p.a },
    })),
  }
}

// <head> 내부에 JSON-LD script 1~N개 주입. 기존 JSON-LD 손대지 않음.
function injectJsonLd(html, jsonLdObjArray) {
  const valid = (jsonLdObjArray || []).filter(o => o && typeof o === 'object')
  if (!valid.length) return html
  const scripts = valid.map(o =>
    `<script type="application/ld+json" data-seo-jsonld>${safeJsonForScript(o)}</script>`
  ).join('')
  return html.replace(/<\/head>/i, `${scripts}</head>`)
}

// Related Posts 3건을 fallback body에 덧붙일 HTML 생성
function buildRelatedPostsHtml(relatedPosts) {
  if (!Array.isArray(relatedPosts) || relatedPosts.length === 0) return ''
  const items = relatedPosts.map(p => {
    const href = `/blog/${encodeURIComponent(p.slug)}`
    const excerptShort = p.excerpt
      ? stripToPlainText(p.excerpt).slice(0, 80).trim()
      : ''
    return `<li><a href="${esc(href)}">${esc(p.title)}</a>${excerptShort ? ` — ${esc(excerptShort)}` : ''}</li>`
  }).join('')
  return `<nav class="related-posts" aria-label="관련 글"><h2>관련 글</h2><ul>${items}</ul></nav>`
}

// fallback HTML 빌더
function buildFallbackHtml(pathname, dynamic) {
  // 동적 경로 우선 처리
  // /blog/:slug
  if (dynamic && dynamic.kind === 'post') {
    const { title, metaDesc, body, category, relatedHtml } = dynamic
    const catName = category ? (CATEGORY_NAMES[category] || category) : ''
    const inner = [
      `<h1>${esc(title)}</h1>`,
      catName ? `<p>${esc('카테고리: ' + catName)}</p>` : '',
      metaDesc ? `<p>${esc(metaDesc)}</p>` : '',
      body ? `<p>${esc(body)}</p>` : '',
      `<p>${esc('관련 주제: 플로로탄닌, 감태추출물, 해양 폴리페놀, 갈조류 폴리페놀, Ecklonia cava, eckol, dieckol, 항산화, 염증, 면역.')}</p>`,
      // 항목 F: Related Posts 섹션 (있을 때만)
      relatedHtml || '',
      `<nav><a href="/blog">블로그 아카이브로</a> · <a href="/qa">전문가 Q&amp;A</a> · <a href="/phlorotannin">플로로탄닌이란</a></nav>`,
    ].filter(Boolean).join('')
    return wrapFallback(inner)
  }

  // /p/:phone
  if (dynamic && dynamic.kind === 'partner') {
    const { name, phoneDisplay, memo, siteUrl } = dynamic
    const intro = name
      ? `${name} 님은 phlorotannin.com의 파트너로, 플로로탄닌·감태추출물·해양 폴리페놀 관련 건강정보를 안내합니다.`
      : 'phlorotannin.com 파트너 정보페이지입니다. 플로로탄닌·감태추출물·해양 폴리페놀 관련 건강정보를 안내합니다.'
    const inner = [
      `<h1>${esc((name ? name + ' — ' : '') + '플로로탄닌 정보페이지')}</h1>`,
      `<p>${esc(intro)}</p>`,
      memo ? `<p>${esc(memo)}</p>` : '',
      phoneDisplay ? `<p>${esc('연락처 안내: ' + phoneDisplay + ' (정확한 번호는 페이지 내 RevealContact를 통해 확인하실 수 있습니다.)')}</p>` : '',
      siteUrl ? `<p>${esc('외부 안내 페이지: ' + siteUrl)}</p>` : '',
      `<p>${esc('관련 키워드: 플로로탄닌, phlorotannin, 감태추출물, Ecklonia cava, 해양 폴리페놀, 갈조류 폴리페놀, 씨놀, Seanol, 카프, eckol, dieckol, 항산화, 염증, 면역, 수면, 장 건강, 뇌 건강.')}</p>`,
      `<nav><a href="/">홈</a> · <a href="/blog">건강정보 블로그</a> · <a href="/qa">전문가 Q&amp;A</a></nav>`,
    ].filter(Boolean).join('')
    return wrapFallback(inner)
  }

  // 정적 경로 — SSR_LITE_BODIES 매칭 (없으면 /blog 또는 / 본문으로 안전 fallback)
  let def = SSR_LITE_BODIES[pathname]
  if (!def) {
    // /blog/<unknown>, /category/<x> 등 미정의 경로는 /blog 안내로 노출
    if (pathname.startsWith('/blog')) def = SSR_LITE_BODIES['/blog']
    else if (pathname.startsWith('/category/')) def = SSR_LITE_BODIES['/blog']
    else def = SSR_LITE_BODIES['/']
  }
  const inner = [
    `<h1>${esc(def.h1)}</h1>`,
    ...def.paras.map(p => `<p>${esc(p)}</p>`),
    def.nav && def.nav.length
      ? `<nav>${def.nav.map(href => `<a href="${esc(href)}">${esc(href)}</a>`).join(' · ')}</nav>`
      : '',
  ].filter(Boolean).join('')
  return wrapFallback(inner)
}

function wrapFallback(inner) {
  // 화면에는 sr-only로 숨김 (React가 createRoot 마운트 시 어차피 교체).
  // <noscript>에도 동일 내용 병행 — JS 비활성/크롤러용 안전망.
  return (
    `<main data-ssr-lite="true" class="sr-only-ai-fallback" aria-hidden="true">${inner}</main>` +
    `<noscript><main data-ssr-lite-noscript="true">${inner}</main></noscript>`
  )
}

function injectFallback(html, fallbackHtml) {
  if (!fallbackHtml) return html
  // 1) <head>에 sr-only 스타일 1회 주입 (중복 방지)
  if (!html.includes('data-ssr-lite-style')) {
    html = html.replace(/<\/head>/i, `${SR_ONLY_STYLE}</head>`)
  }
  // 2) <div id="root"></div> → <div id="root">${fallbackHtml}</div>
  //    빈 root만 정확히 매칭 (이미 내용 있으면 건드리지 않음)
  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${fallbackHtml}</div>`
  )
  return html
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

    // SEO 안전장치: pathname에 ?ref=... 같은 쿼리가 섞여 들어왔어도 canonical/매칭에서 제거
    // (파트너 컨텍스트 전파용 ?ref= 파라미터는 SEO에 영향 없어야 함 — 중복 색인 방지)
    // 단, 기존 정적 메타 매핑에서 사용하는 ?category=... 는 유지해야 하므로 ref/utm 만 제거
    if (pathname.includes('?')) {
      try {
        const tmp = new URL(pathname, 'http://localhost')
        const sp = tmp.searchParams
        const keysToStrip = ['ref', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
        let changed = false
        for (const k of keysToStrip) {
          if (sp.has(k)) { sp.delete(k); changed = true }
        }
        if (changed) {
          const qs = sp.toString()
          pathname = tmp.pathname + (qs ? '?' + qs : '')
        }
      } catch { /* 무시 */ }
    }

    // 메타 결정
    let meta = null
    let metaSource = 'static'
    const blogMatch = pathname.match(/^\/blog\/([^/]+)$/)
    if (blogMatch) {
      meta = await fetchPostMeta(blogMatch[1])
      if (meta) metaSource = 'posts-table'
    }
    // Phase 3: 고정 페이지 슬러그 매핑 (pages 테이블에 운영자가 정의한 메타가 있으면 우선)
    if (!meta) {
      // /home, /qa, /blog, /phlorotannin 등 짧은 경로를 slug로 직접 매핑
      const pageSlug = pathname === '/' ? 'home' : pathname.replace(/^\//, '').split('/')[0]
      if (pageSlug && !pageSlug.startsWith('api')) {
        const pageMeta = await fetchPageMeta(pageSlug)
        if (pageMeta) {
          meta = pageMeta
          metaSource = 'pages-table'
        }
      }
    }
    if (!meta) {
      meta = staticMetaFor(pathname)
      if (meta) metaSource = 'static'
    }
    if (!meta) {
      meta = staticMetaFor('/')
      meta.canonical = `${SITE}${pathname}`
      metaSource = 'fallback'
    }

    // ─── 파트너 페이지 동적 메타 보강 ─────────────────────────────────
    // /p/:phone 경로에서 partners 테이블에 파트너 정보가 있으면
    // title을 "{name} — 플로로탄닌 정보페이지 | phlorotannin.com" 으로 갱신.
    // SSR-lite 블록에서 동일 데이터를 재사용하도록 변수에 저장한다.
    const partnerMatch = pathname.match(/^\/p\/([^/]+)$/)
    let partnerBodyCached = null
    if (partnerMatch) {
      try {
        partnerBodyCached = await fetchPartnerBody(partnerMatch[1])
      } catch {
        partnerBodyCached = null
      }
      if (partnerBodyCached && partnerBodyCached.name) {
        const safeName = String(partnerBodyCached.name).trim().slice(0, 24)
        meta = {
          title: `${safeName} — 플로로탄닌 정보페이지 | phlorotannin.com`,
          desc:  `${safeName} 님의 플로로탄닌·감태추출물·해양 폴리페놀 관련 건강정보 안내 페이지. 플로로탄닌 파트너스가 제공하는 종합 건강정보 데이터센터의 파트너 정보페이지입니다.`,
          canonical: `${SITE}${pathname}`,
        }
        metaSource = 'partners-table'
      }
    }

    // index.html 로드 (fs)
    const indexHtml = readIndexHtml()
    if (!indexHtml) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.status(500).send(`index.html not found. cwd=${process.cwd()}`)
      return
    }

    let html = injectMeta(indexHtml, meta)

    // ─── SSR-lite Fallback (AI 크롤러 본문 읽기 최적화) ───────────────
    // 환경변수 SSR_LITE_DISABLED=1 이면 비활성화 (롤백 토글).
    let ssrLiteApplied = 'none'
    // 항목 F 진단 헤더용 상태값
    let articleLdApplied = 'no'
    let breadcrumbLdApplied = 'no'
    let faqLdApplied = 'no'
    let relatedPostsCount = 0
    if (process.env.SSR_LITE_DISABLED !== '1') {
      let dynamic = null
      try {
        // /blog/:slug → 본문 발췌 + 2차 SEO 자산화 (Article/Breadcrumb/FAQ JSON-LD + Related Posts)
        if (blogMatch) {
          const postBody = await fetchPostBody(blogMatch[1])
          if (postBody && (postBody.body || postBody.metaDesc)) {
            dynamic = { kind: 'post', ...postBody }

            // ─── 항목 F: 2차 SEO 자산화 ───
            // 환경변수 JSONLD_DISABLED=1 / RELATED_POSTS_DISABLED=1 로 개별 비활성화 가능.

            // 1) Related Posts 3건 (같은 카테고리, 현재 글 제외)
            if (process.env.RELATED_POSTS_DISABLED !== '1') {
              try {
                const related = await fetchRelatedPosts(postBody.category, postBody.slug, 3)
                if (Array.isArray(related) && related.length) {
                  dynamic.relatedHtml = buildRelatedPostsHtml(related)
                  relatedPostsCount = related.length
                }
              } catch (rErr) {
                // Related Posts 실패는 무시 (메인 응답 보호)
              }
            }

            // 2) JSON-LD 생성·주입 (Article + BreadcrumbList + FAQ)
            if (process.env.JSONLD_DISABLED !== '1') {
              const ldArray = []
              try {
                const articleLd = buildArticleJsonLd(postBody, pathname)
                if (articleLd) { ldArray.push(articleLd); articleLdApplied = 'yes' }

                const breadcrumbLd = buildBreadcrumbJsonLd(postBody, pathname)
                if (breadcrumbLd) { ldArray.push(breadcrumbLd); breadcrumbLdApplied = 'yes' }

                // FAQ는 Q/A 패턴이 2건 이상일 때만
                const faqPairs = extractFaqFromContent(postBody.content || '')
                const faqLd = buildFaqJsonLd(faqPairs)
                if (faqLd) { ldArray.push(faqLd); faqLdApplied = `yes:${faqPairs.length}` }

                if (ldArray.length) {
                  html = injectJsonLd(html, ldArray)
                }
              } catch (ldErr) {
                // JSON-LD 실패는 메인 응답 보호
                articleLdApplied = `error:${(ldErr && ldErr.message) || 'unknown'}`
              }
            } else {
              articleLdApplied = 'disabled'
              breadcrumbLdApplied = 'disabled'
              faqLdApplied = 'disabled'
            }
          }
        }
        // /p/:phone → 파트너 정보 (위에서 이미 fetch됨, 마스킹 처리된 결과 재사용)
        if (partnerMatch) {
          if (partnerBodyCached) {
            dynamic = { kind: 'partner', ...partnerBodyCached }
          } else {
            // 파트너 정보가 없어도 안내 fallback은 노출
            dynamic = { kind: 'partner', name: '', phoneDisplay: maskPhone(partnerMatch[1]), memo: '', siteUrl: '' }
          }
        }
        const fallbackHtml = buildFallbackHtml(pathname, dynamic)
        if (fallbackHtml) {
          html = injectFallback(html, fallbackHtml)
          ssrLiteApplied = dynamic ? dynamic.kind : 'static'
        }
      } catch (e) {
        // SSR-lite 실패는 메인 응답을 막지 않는다 (안전 fallback).
        ssrLiteApplied = `error:${(e && e.message) || 'unknown'}`
      }
    } else {
      ssrLiteApplied = 'disabled'
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400')
    res.setHeader('X-SEO-Path', pathname)
    res.setHeader('X-SEO-Title', encodeURIComponent(meta.title))
    res.setHeader('X-SEO-Source', metaSource)
    res.setHeader('X-SSR-Lite', ssrLiteApplied)
    // 항목 F 진단 헤더
    res.setHeader('X-Article-JsonLd', articleLdApplied)
    res.setHeader('X-Breadcrumb-JsonLd', breadcrumbLdApplied)
    res.setHeader('X-Faq-JsonLd', faqLdApplied)
    res.setHeader('X-Related-Posts', String(relatedPostsCount))
    res.status(200).send(html)
  } catch (e) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.status(500).send(`SEO function error: ${e && e.message}`)
  }
}
