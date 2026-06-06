// Vercel Serverless Function (Node.js runtime)
// 경로별로 index.html의 <title>·<meta>·OG를 서버에서 치환해 응답한다.
// SPA 구조 유지하면서 검색엔진/소셜 크롤러가 페이지마다 고유 메타를 보도록 한다.
//
// Edge runtime 대신 Node.js runtime을 쓰는 이유:
// - fs로 빌드 산출물(hanain/dist/index.html)을 직접 읽을 수 있어
//   self-fetch 무한루프 위험이 없다.

import fs from 'fs'
import path from 'path'
import { LOCAL_TREND_BLOG_POSTS } from '../src/data/localTrendBlogPosts.js'

const SITE = 'https://phlorotannin.com'
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const DEFAULT_GOOGLEBOT = 'index, follow, max-image-preview:large'

// 기본 OG 이미지 (모든 응답 fallback)
const DEFAULT_OG_IMAGE = `${SITE}/og-image.png`
const DEFAULT_OG_IMAGE_ALT = '플로로탄닌 종합 건강정보 데이터센터 - 해양 폴리페놀 정보 허브'

// 카테고리 슬러그 → OG 이미지 슬러그(dash-case) 매핑
// public/og/qa-<slug>.png 파일과 동기화 — 13종 + default
// 새 카테고리 추가 시 build_og_images.py 실행 후 본 매핑도 함께 갱신할 것
//
// [2026-05-21 D6 보강] URL slug(dash-case) ↔ category_id(snake_case) 양방향 키 등록.
// CategoryPage 는 dash-case URL 로 진입하지만, 일부 호출은 category_id 로도 들어옴.
// 동일 OG 이미지로 안전 매핑되도록 양쪽 표기를 모두 키로 보유.
const CAT_OG_SLUG = {
  // snake_case (category_id)
  metabolism:             'metabolism',
  cancer_immune:          'cancer-immune',
  cancer:                 'cancer-immune',
  digestive:              'digestive',
  cardiovascular:         'cardiovascular',
  neuro_cognitive:        'neuro-cognitive',
  dementia:               'neuro-cognitive',
  brain:                  'neuro-cognitive',
  mental_health:          'mental-health',
  musculoskeletal:        'musculoskeletal',
  skin:                   'skin-hair',
  hair:                   'skin-hair',
  skin_hair:              'skin-hair',
  respiratory:            'respiratory',
  infection_inflammation: 'infection-inflammation',
  inflammation:           'infection-inflammation',
  immunity:               'infection-inflammation',
  womens_health:          'womens-health',
  mens_health:            'mens-health',
  // dash-case (URL slug — /category/<slug>)
  'cancer-immune':          'cancer-immune',
  'neuro-cognitive':        'neuro-cognitive',
  'mental-health':          'mental-health',
  'skin-hair':              'skin-hair',
  'skin-hair-care':         'skin-hair',
  'infection-inflammation': 'infection-inflammation',
  'womens-health':          'womens-health',
  'mens-health':            'mens-health',
}

function ogImageForCategory(catSlug) {
  const og = CAT_OG_SLUG[catSlug]
  if (og) return `${SITE}/og/qa-${og}.png`
  return `${SITE}/og/qa-default.png`
}

// ─── [2026-05-21 D8] qa.json 진실원 로드 + slug → 질문 인덱스 캐시 ─────
// /q/:slug 봇 메타·JSON-LD 가 카테고리·정확한 질문/답변을 알려면 qa.json 1,361건을
// 함수 콜드스타트 시 1회 읽어 메모리 인덱스화한다. 슬러그 규칙(헌법 §3-Q 동결):
//   slug = question.replace(/[^\w\s가-힣]/g,'').replace(/\s+/g,'-').slice(0,60)
let CACHED_QA = null
let CACHED_QA_INDEX = null
function qaSlug(question) {
  if (!question) return ''
  return String(question)
    .replace(/[^\w\s가-힣]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
}
function readQaJson() {
  if (CACHED_QA) return CACHED_QA
  const candidates = [
    path.join(process.cwd(), 'public', 'qa.json'),
    path.join(process.cwd(), 'qa.json'),
    path.join(process.cwd(), 'hanain', 'dist', 'qa.json'),
    path.join(process.cwd(), 'hanain', 'public', 'qa.json'),
  ]
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) {
        const raw = fs.readFileSync(p, 'utf8')
        CACHED_QA = JSON.parse(raw)
        return CACHED_QA
      }
    } catch (e) {
      // fall through
    }
  }
  return null
}
function getQaIndex() {
  if (CACHED_QA_INDEX) return CACHED_QA_INDEX
  const qa = readQaJson()
  if (!qa) return null
  const questions = (qa && qa.questions) ? qa.questions : (Array.isArray(qa) ? qa : [])
  const idx = new Map()
  for (const q of questions) {
    if (!q || !q.question) continue
    const slug = qaSlug(q.question)
    if (!slug) continue
    // 멱등 — 동일 슬러그가 있으면 최초 등록값을 유지 (qa.json 멱등 가정)
    if (!idx.has(slug)) idx.set(slug, q)
  }
  CACHED_QA_INDEX = idx
  return idx
}
function findQuestionBySlug(rawSlug) {
  const idx = getQaIndex()
  if (!idx) return null
  // 1차: 그대로
  let q = idx.get(rawSlug)
  if (q) return q
  // 2차: decodeURIComponent 후
  try {
    const dec = decodeURIComponent(rawSlug)
    q = idx.get(dec)
    if (q) return q
  } catch {}
  return null
}

// 빌드 산출물 위치 — vercel은 outputDirectory(hanain/dist)를 루트에 매핑한다.
// 함수 실행 시 process.cwd()는 Vercel 환경에서 /var/task 가 됨.
// outputDirectory의 파일들은 /var/task에 그대로 복사되므로 'index.html' 경로로 접근.
let CACHED_HTML = null
function readIndexHtml() {
  if (CACHED_HTML) return CACHED_HTML
  const candidates = [
    path.join(process.cwd(), 'dist', 'index.html'),
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
  // [D7] dash-case URL slug 동의어 매핑 (CategoryPage 가 dash-case 로 라우팅됨)
  'cancer-immune': '암·면역 건강정보',
  'neuro-cognitive': '뇌·인지 건강정보',
  'mental-health': '정신·마음 건강정보',
  'skin-hair': '피부·모발 건강정보',
  'skin-hair-care': '피부·모발 건강정보',
  'infection-inflammation': '감염·염증 건강정보',
  'womens-health': '여성 건강정보',
  'mens-health': '남성 건강정보',
  'ingredient-comparison': '성분 비교 아카이브',
  'disease-health-info': '질환별 건강정보',
  'exercise-recovery': '운동·재활 루틴',
  'partner-info': '파트너 정보페이지',
  'cancer-treatment-care': '항암 치료 케어',
  'buying-guide': '구매 가이드',
  'safety-precautions': '부작용·주의사항',
  '분자기전 작용경로': '분자기전·작용경로',
  '신약개발 임상': '신약개발·임상',
  'research': '연구·논문 아카이브',
  'general': '건강정보 종합',
}

function imageTypeFromUrl(url) {
  const clean = String(url || '').split('?')[0].toLowerCase()
  if (clean.endsWith('.webp')) return 'image/webp'
  if (clean.endsWith('.jpg') || clean.endsWith('.jpeg')) return 'image/jpeg'
  if (clean.endsWith('.gif')) return 'image/gif'
  return 'image/png'
}

function absoluteUrl(url) {
  const raw = String(url || '').trim()
  if (!raw) return ''
  if (/^https?:\/\//i.test(raw)) return raw
  return `${SITE}${raw.startsWith('/') ? raw : `/${raw}`}`
}

function getPartnerArchiveLogicalPath(pathname) {
  const match = String(pathname || '').match(/^\/p\/[^/]+\/(.+)$/)
  if (!match) return null
  const logicalPath = `/${match[1]}`.replace(/\/+$/, '')
  return logicalPath || '/'
}

function appendForwardedViewQuery(pathname, searchParams) {
  if (String(pathname || '').includes('?')) return pathname
  const target = String(pathname || '')
  const isArchive = target === '/qa' || target === '/blog' || /^\/p\/[^/]+\/(?:qa|blog)$/.test(target)
  if (!isArchive) return pathname
  const viewParams = new URLSearchParams()
  for (const key of ['category', 'q', 'page', 'openId']) {
    const value = searchParams.get(key)
    if (value) viewParams.set(key, value)
  }
  const query = viewParams.toString()
  return query ? `${pathname}?${query}` : pathname
}

function buildBlogImageAlt(post) {
  if (!post) return DEFAULT_OG_IMAGE_ALT
  const rawTitle = (post.title || post.rawTitle || post.meta_title || '').toString().trim()
  const core = rawTitle.split('|')[0].trim() || rawTitle || '플로로탄닌 건강정보'
  const catName = CATEGORY_NAMES[post.category] || (post.category || '건강정보').toString()
  return `${core} - ${catName} 건강정보 일러스트`
}

const LOCAL_BLOG_POSTS = [
  ...LOCAL_TREND_BLOG_POSTS,
]

function findLocalBlogPost(slug) {
  return LOCAL_BLOG_POSTS.find((post) => post && post.slug === slug) || null
}

function localPostMeta(slug) {
  const p = findLocalBlogPost(slug)
  if (!p) return null
  const title = p.meta_title || p.title || ''
  if (!title) return null
  let desc = p.meta_desc || p.excerpt || p.title || ''
  if (desc.length > 300) desc = desc.slice(0, 300)
  return {
    source: 'local-trend',
    title,
    desc,
    canonical: `${SITE}/blog/${slug}`,
    ogImage: p.og_image || '',
    ogImageAlt: buildBlogImageAlt(p),
  }
}

function localPostBody(slug) {
  const p = findLocalBlogPost(slug)
  if (!p) return null
  const title = p.meta_title || p.title || ''
  const metaDesc = p.meta_desc || p.excerpt || ''
  const contentRaw = String(p.content || '')
  let body = stripToPlainText(contentRaw)
  if (body.length > 600) {
    body = body.slice(0, 600)
    const lastSpace = body.lastIndexOf(' ')
    if (lastSpace > 400) body = body.slice(0, lastSpace)
    body = body.trim() + ' ...'
  }
  if (body.length < 80 && metaDesc) {
    body = stripToPlainText(metaDesc)
  }
  return {
    title,
    metaDesc,
    body,
    category: p.category || '',
    id: p.id || null,
    slug: p.slug || slug,
    rawTitle: p.title || '',
    content: contentRaw,
    tags: Array.isArray(p.tags) ? p.tags.filter(t => t && typeof t === 'string') : [],
    ogImage: p.og_image || '',
    publishedAt: p.published_at || p.updated_at || p.created_at || '',
    updatedAt: p.updated_at || p.created_at || '',
  }
}

function localRelatedPosts(category, excludeSlug, limit = 3) {
  if (!category || typeof category !== 'string') return []
  return LOCAL_BLOG_POSTS
    .filter((post) => post && post.category === category && post.slug !== excludeSlug)
    .sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')))
    .slice(0, limit)
    .map((post) => ({
      slug: post.slug || '',
      title: post.title || post.meta_title || '',
      excerpt: post.excerpt || post.meta_desc || '',
    }))
    .filter(p => p.slug && p.title)
}

function missingBlogPostMeta(slug) {
  return {
    title: '블로그 글을 찾을 수 없습니다 | phlorotannin.com',
    desc: '공개 상태가 아니거나 삭제된 블로그 글입니다. 플로로탄닌 건강정보 블로그의 공개 글 목록에서 최신 자료를 확인해 주세요.',
    canonical: `${SITE}/blog/${slug}`,
    robots: 'noindex,nofollow',
  }
}

const CATEGORY_DESC = {
  'diabetes':       '당뇨·혈당 건강정보 아카이브 — 감태추출물·플로로탄닌 정보센터. 항산화·염증·면역 관점의 혈당 건강정보와 연구기반 Q&A를 정리합니다.',
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
  'hospital':       '병원정보 아카이브 — 암요양병원·한방병원·연구기반 Q&A. 플로로탄닌·감태추출물·해양 폴리페놀 기반 종합 건강정보 데이터센터.',
}

// ─────────────────────────────────────────
// 경로별 정적 메타
// ─────────────────────────────────────────
function staticMetaFor(pathname) {
  const queryIndex = String(pathname || '').indexOf('?')
  if (queryIndex > -1) {
    const cleanPath = String(pathname).slice(0, queryIndex)
    if (cleanPath === '/qa' || cleanPath === '/blog') {
      const baseMeta = staticMetaFor(cleanPath) || staticMetaFor('/')
      return {
        ...baseMeta,
        canonical: `${SITE}${cleanPath}`,
        robots: 'noindex,nofollow',
      }
    }
  }
  if (pathname === '/' || pathname === '') {
    // [2026-05-19] 메인은 원료 키워드(플로로탄닌·감태추출물·씨놀·카프·해양폴리페놀) 중심으로 압축.
    //   • 암·당뇨·병원 등 질환 키워드는 내부 글·카테고리에서 받음 (메인 메타에서는 제외)
    //   • 기존 /blog/:slug 메타·canonical·내부링크는 절대 변경하지 않음 → 기존 노출 유지
    return {
      title: '플로로탄닌 효능 효과 | 감태추출물·씨놀·해양폴리페놀 정보',
      desc:  '플로로탄닌 효능효과, 감태추출물, 씨놀, 카프, 해양폴리페놀 관련 연구와 건강정보를 쉽게 정리한 정보 허브입니다.',
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
      title: '연구기반 Q&A 아카이브 | 플로로탄닌·감태추출물 건강정보 데이터센터',
      desc:  '플로로탄닌·감태추출물·해양 폴리페놀 관련 연구기반 Q&A 아카이브. 항산화·염증·혈당·수면·면역·뇌 건강·암환자 가족 건강정보·병원정보까지 질환별로 정리한 종합 건강정보 데이터센터의 Q&A 모음입니다.',
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
  if (pathname === '/blog?category=exercise-recovery') {
    return {
      title: '운동·재활 루틴 | 암환자 운동법·당뇨 운동법·근감소증 회복',
      desc:  '암환자 운동법, 항암치료 중 운동, 당뇨 식후 걷기, 근감소증 근력운동, 회복기 재활 루틴을 안전 체크리스트와 근거 기반 건강정보로 정리한 아카이브입니다.',
      canonical: `${SITE}/blog?category=exercise-recovery`,
    }
  }
  if (pathname === '/blog?category=hospital-info') {
    return {
      title: '병원정보 아카이브 | 암요양병원·한방병원·연구기반 Q&A 정보',
      desc:  '암요양병원, 한방병원, 재활병원, 회복기 병원과 연구기반 Q&A·진료과 비교·치료 옵션 안내 등 환자와 가족이 병원정보를 찾을 때 반드시 확인해야 할 기준과 실제 사례를 정리한 건강정보 아카이브입니다.',
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
  // ─── [2026-05-21 D9] 누락 라우트 메타·canonical 보강 ─────
  // 이전엔 fallback이 홈 메타로 떨어져 canonical 자기상충(중복 색인 위험) + 홈 title 노출.
  // sitemap에는 미포함(noindex 의도)이나 외부 공유/실제 진입 가능 → canonical은 자기 자신을
  // 가리키고 home title 누출은 차단. /question/write·/admin·/community/post 등 작성/관리
  // 페이지는 noindex 의도 영역이라 robots 메타에 noindex,nofollow 신호도 함께 송신한다.
  if (pathname === '/shop-package' || pathname.startsWith('/shop-package/')) {
    return {
      title: '샵 매출 성장 패키지 | 플로로탄닌 파트너스',
      desc:  '660만 원 샵 패키지로 제품 공급, 전용 페이지, 지역 검색 구조, 기본 소개 문구, 초기 운영 지원까지 함께 제공하는 플로로탄닌 파트너스 샵 전용 매출 성장 랜딩입니다.',
      canonical: `${SITE}${pathname}`,
      robots: 'noindex,follow',
      ogImage: `${SITE}/partner/shop-package/salon-consult-hero.jpg`,
      ogImageAlt: '고급 피부관리 모델과 제품 진열',
    }
  }
  if (pathname === '/inforoom') {
    return {
      title: '정보실 | 플로로탄닌·감태추출물 자료 안내',
      desc:  '플로로탄닌·감태추출물·해양 폴리페놀 관련 자료 안내. 종합 건강정보 데이터센터에서 제공하는 일반 정보실 페이지입니다.',
      canonical: `${SITE}/inforoom`,
      robots: 'noindex,follow',
    }
  }
  if (pathname.match(/^\/p\/[^/]+\/inforoom$/)) {
    const m = pathname.match(/^\/p\/([^/]+)\/inforoom$/)
    const phone = m ? m[1] : ''
    return {
      title: `정보실 | ${phone} 파트너 · 플로로탄닌 정보페이지`,
      desc:  '플로로탄닌·감태추출물·해양 폴리페놀 관련 자료 안내(파트너 컨텍스트). 종합 건강정보 데이터센터의 파트너 정보실 페이지입니다.',
      canonical: `${SITE}/p/${phone}/inforoom`,
      robots: 'noindex,follow',
    }
  }
  if (pathname.startsWith('/community/post/')) {
    const postId = pathname.replace('/community/post/', '').split('/')[0]
    return {
      title: '커뮤니티 글 | 플로로탄닌·감태추출물 건강정보 커뮤니티',
      desc:  '플로로탄닌·감태추출물·해양 폴리페놀 건강정보 커뮤니티의 사용자 작성 게시글 페이지입니다.',
      canonical: `${SITE}/community/post/${postId}`,
      robots: 'noindex,follow',
    }
  }
  if (pathname === '/community/write' || pathname.startsWith('/community/edit/')) {
    return {
      title: '커뮤니티 글 작성 | 플로로탄닌·감태추출물 건강정보',
      desc:  '플로로탄닌·감태추출물·해양 폴리페놀 건강정보 커뮤니티의 게시글 작성 페이지입니다.',
      canonical: `${SITE}${pathname}`,
      robots: 'noindex,nofollow',
    }
  }
  if (pathname === '/question/write') {
    return {
      title: '질문 작성 | 연구기반 Q&A — 플로로탄닌·감태추출물 건강정보',
      desc:  '플로로탄닌·감태추출물·해양 폴리페놀 관련 연구기반 Q&A의 질문 작성 페이지입니다.',
      canonical: `${SITE}/question/write`,
      robots: 'noindex,nofollow',
    }
  }
  if (pathname === '/admin') {
    return {
      title: '관리자 | phlorotannin.com',
      desc:  '플로로탄닌 종합 건강정보 데이터센터 관리자 페이지입니다.',
      canonical: `${SITE}/admin`,
      robots: 'noindex,nofollow',
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
  if (pathname === '/glossary') {
    return {
      title: '플로로탄닌 용어 사전 | 감태·디에콜·에콜·씨놀·후코이단 한곳에서',
      desc:  '플로로탄닌(phlorotannin), 감태(Ecklonia cava), 디에콜, 에콜, 씨놀(Seanol), 후코이단 등 해양 폴리페놀·갈조류 관련 전문 용어를 한곳에서 정리한 용어 사전. 학술명·이명·핵심 정의 제공.',
      canonical: `${SITE}/glossary`,
    }
  }
  if (pathname === '/safety') {
    return {
      title: '플로로탄닌 안전성 가이드 | 감태추출물 섭취 전 확인할 점',
      desc:  '플로로탄닌과 감태추출물을 알아볼 때 섭취량, 원료 확인, 복용 중인 약, 임신·수유, 알레르기 등 먼저 확인해야 할 안전성 기준을 정리했습니다.',
      canonical: `${SITE}/safety`,
    }
  }
  if (pathname === '/research-timeline') {
    return {
      title: '플로로탄닌 연구 흐름 | 감태추출물과 해양 폴리페놀 근거 정리',
      desc:  '감태추출물, 디에콜, 에콜, 해양 폴리페놀 연구가 어떤 주제로 확장되어 왔는지 항산화·염증·수면·대사 관점에서 정리한 연구 흐름 페이지입니다.',
      canonical: `${SITE}/research-timeline`,
    }
  }
  if (pathname === '/insights') {
    return {
      title: '플로로탄닌 인사이트 | 최신 건강 이슈와 감태 원료 해설',
      desc:  '최신 건강 이슈를 플로로탄닌, 감태추출물, 해양 폴리페놀 관점에서 읽기 쉽게 정리한 인사이트 아카이브입니다.',
      canonical: `${SITE}/insights`,
    }
  }
  if (pathname.startsWith('/insights/')) {
    const rawSlug = pathname.replace('/insights/', '').split('/')[0]
    const insightMeta = {
      'haengwoo-lee-seanol-developer-evidence-map-2026': {
        title: '이행우 박사와 씨놀 개발자 자료 | 언론 서사와 원료 근거 맵',
        desc: '이행우 박사, 보타메디, 씨놀 개발자 키워드를 국내 언론·회사 연혁·FDA NDI·EFSA Novel Food 자료로 나누어 읽는 인사이트입니다.',
        ogImage: '/og/content-quality/research-study-design-evidence-record-2026.png',
        ogImageAlt: '이행우 박사와 씨놀 개발자 자료를 언론, 연혁, 규제 근거로 구분한 인사이트 이미지',
      },
      'seanol-seapolynol-regulatory-map-2026': {
        title: 'Seanol·SeaPolynol 규제 자료 맵 | FDA NDI와 EFSA Novel Food 차이',
        desc: 'Seanol, SeaPolynol, Ecklonia cava phlorotannins를 FDA NDI, EFSA Novel Food, EU 규정, 인체 연구로 구분합니다.',
        ogImage: '/og/content-quality/polyphenol-ingredient-comparison-phlorotannin-record-2026.png',
        ogImageAlt: 'Seanol SeaPolynol FDA NDI EFSA Novel Food 자료를 구분한 해양 원료 인사이트 이미지',
      },
      'seanol-caf-ph100-terms-guide-2026': {
        title: '씨놀·카프·PH100 용어 가이드 | 검색어를 근거 문장으로 바꾸기',
        desc: '씨놀, 카프/CAF, PH100, SeaPolynol, Ecklonia cava phlorotannins를 연구·규제·제품 문맥으로 구분합니다.',
        ogImage: '/og/content-quality/molecular-pathway-phlorotannin-oxidative-stress-record-2026.png',
        ogImageAlt: '씨놀 카프 PH100 SeaPolynol 용어를 연구 문맥별로 정리한 인사이트 이미지',
      },
      'ebola-bundibugyo-pheic-response-record-2026': {
        title: 'WHO Ebola Bundibugyo PHEIC | 해외 감염 대응 신호',
        desc: '2026년 WHO Ebola Bundibugyo PHEIC와 Africa CDC·WHO 공동 대응계획을 조기 발견, 격리, 접촉 추적, 감염관리 기준으로 정리합니다.',
        ogImage: '/og/content-quality/sepsis-warning-signs-infection-record-2026.png',
        ogImageAlt: 'WHO Ebola Bundibugyo PHEIC 대응 신호와 접촉 추적 기록을 정리한 인사이트 이미지',
      },
      'andes-hantavirus-cruise-travel-record-2026': {
        title: 'Andes hantavirus 크루즈선 이슈 | 여행 감염 접촉자 추적',
        desc: 'WHO의 2026년 크루즈선 Andes hantavirus outbreak 업데이트를 여행 동선, 고위험 접촉, 증상 시간표 중심으로 정리합니다.',
        ogImage: '/og/content-quality/respiratory-virus-vaccine-2025-2026-covid-flu-rsv-record-2026.png',
        ogImageAlt: 'Andes hantavirus 크루즈선 여행 감염과 접촉자 추적을 요약한 인사이트 이미지',
      },
      'fda-bht-ada-food-chemical-record-2026': {
        title: 'FDA BHT·ADA 재평가 | 해외 식품안전 라벨 기록',
        desc: 'FDA의 2026년 BHT·ADA 식품첨가물 재평가와 식품 화학물질 사후 안전성 평가 프로그램을 라벨·섭취 빈도 기록 중심으로 정리합니다.',
        ogImage: '/og/content-quality/ultra-processed-food-blood-sugar-inflammation-guide-2026.png',
        ogImageAlt: 'FDA BHT ADA 식품첨가물 재평가와 가공식품 라벨 기록을 요약한 인사이트 이미지',
      },
      'cholera-water-sanitation-travel-record-2026': {
        title: 'WHO 다국가 콜레라 업데이트 | 물·위생·탈수 신호 기록',
        desc: 'WHO 2026년 5월 29일 다국가 콜레라 업데이트를 바탕으로 여행 후 설사, 물·음식 노출, 탈수 신호 기록을 정리합니다.',
        ogImage: '/og/content-quality/world-food-safety-day-foodborne-illness-home-record-2026.png',
        ogImageAlt: 'WHO 다국가 콜레라 업데이트와 물 위생 탈수 신호 기록을 요약한 인사이트 이미지',
      },
      'mpox-clade-ib-rash-exposure-record-2026': {
        title: 'WHO·CDC mpox 2026 | clade Ib와 발진·노출 기록',
        desc: 'WHO mpox situation report #66과 CDC 2026년 현황을 바탕으로 clade Ib, 발진, 노출, 검사, 백신 상담 기록을 정리합니다.',
        ogImage: '/og/content-quality/inflammation-flare-trigger-symptom-record-2026.jpg',
        ogImageAlt: 'WHO CDC mpox 2026 clade Ib 발진 노출 기록을 요약한 인사이트 이미지',
      },
      'ciguatera-vanuatu-fish-travel-record-2026': {
        title: 'CDC Vanuatu ciguatera | 열대 생선 식중독 여행 기록',
        desc: 'CDC 2026년 Vanuatu ciguatera fish poisoning 여행 공지를 바탕으로 생선 섭취 시간, 증상 시간표, 해양 독소와 해양 원료 구분을 정리합니다.',
        ogImage: '/og/content-quality/world-food-safety-day-foodborne-illness-home-record-2026.png',
        ogImageAlt: 'Vanuatu ciguatera fish poisoning 여행 식품안전 기록을 요약한 인사이트 이미지',
      },
    }
    if (insightMeta[rawSlug]) {
      return {
        ...insightMeta[rawSlug],
        canonical: `${SITE}${pathname}`,
      }
    }
    const slug = rawSlug.replace(/-/g, ' ').slice(0, 80)
    return {
      title: `${slug} | 플로로탄닌 인사이트`,
      desc:  `${slug} 주제를 플로로탄닌, 감태추출물, 해양 폴리페놀 관점에서 정리한 건강정보 인사이트입니다.`,
      canonical: `${SITE}${pathname}`,
    }
  }
  if (pathname.startsWith('/compare/')) {
    const slug = pathname.replace('/compare/', '').split('/')[0]
    return {
      title: `${slug.replace(/-/g, ' ')} 비교 | 플로로탄닌 건강정보`,
      desc:  '플로로탄닌과 관련 원료·성분을 작용 관점, 연구 흐름, 섭취 전 확인 포인트 중심으로 비교한 건강정보 페이지입니다.',
      canonical: `${SITE}${pathname}`,
    }
  }
  if (pathname.startsWith('/category/')) {
    const slug = pathname.replace('/category/', '').split('/')[0]
    const name = CATEGORY_NAMES[slug] || slug
    const desc = CATEGORY_DESC[slug] ||
      `${name} 아카이브 — 플로로탄닌·감태추출물·해양 폴리페놀 기반 건강정보. 항산화·염증·면역·병원정보·연구기반 Q&A까지 정리하는 종합 건강정보 데이터센터입니다.`
    return {
      title: `${name} | 플로로탄닌 종합 건강정보 데이터센터`,
      desc,
      canonical: `${SITE}${pathname}`,
      ogImage: ogImageForCategory(slug),
      ogImageAlt: `${name} Q&A 아카이브 미리보기 — 플로로탄닌·감태추출물 기반 종합 건강정보 데이터센터`,
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
  // ─── Q&A 자산화 (헌법 제10조) — /q/:slug 개별 Q&A ───
  // 슬러그 자체는 한글이라 봇이 정확한 질문 본문을 알 수 없으나, 페이지 단위 SEO가 0이 아닌
  // safe-fallback 메타를 보장하여 noindex/빈 셸 문제 차단. 실제 질문 본문은 JS 렌더링 후
  // QuestionDetailPage.jsx 가 SEOHead 로 덮어쓴다.
  if (pathname.startsWith('/q/')) {
    const rawSlug = pathname.replace('/q/', '').split('/')[0]
    let readable = rawSlug
    try { readable = decodeURIComponent(rawSlug) } catch { /* keep */ }
    readable = readable.replace(/-/g, ' ').trim().slice(0, 60)

    // ─── [2026-05-21 D8] qa.json 진실원으로 정확한 메타 송신 ─────
    // 봇 첫 fetch 시 슬러그→질문/카테고리/답변 매칭. 매칭 실패 시 안전 fallback.
    const q = findQuestionBySlug(rawSlug)
    if (q) {
      const catId = q.category || ''
      const catName = CATEGORY_NAMES[catId] || ''
      const question = String(q.question || readable).trim()
      const answer   = String(q.answer || '').trim()
      // description: 답변 첫 160자 (한글 가독성)
      const descRaw = answer.replace(/\s+/g, ' ').trim()
      const desc = descRaw
        ? (descRaw.length > 158 ? descRaw.slice(0, 157) + '…' : descRaw)
        : `${question} 관련 연구기반 Q&A — 플로로탄닌·감태추출물·해양 폴리페놀과 관련된 질환·증상·성분·건강관리 정보를 정리한 종합 건강정보 데이터센터의 Q&A 페이지입니다.`
      const titlePrefix = catName ? `${catName} | ` : ''
      return {
        title: `${question} | ${catName || '연구기반 Q&A'} — 플로로탄닌·감태추출물 건강정보`,
        desc,
        canonical: `${SITE}${pathname}`,
        ogImage: ogImageForCategory(catId),
        ogImageAlt: `${question} — ${catName || '연구기반 Q&A'} | 플로로탄닌·감태추출물 종합 건강정보 데이터센터`,
      }
    }
    // fallback — qa.json 미매칭 (사이트맵 외 슬러그·과거 색인된 변종 등)
    return {
      title: `${readable} | 연구기반 Q&A — 플로로탄닌·감태추출물 건강정보`,
      desc:  `${readable} 관련 연구기반 Q&A. 플로로탄닌·감태추출물·해양 폴리페놀과 관련된 질환·증상·성분·건강관리 정보를 정리한 종합 건강정보 데이터센터의 Q&A 페이지입니다.`,
      canonical: `${SITE}${pathname}`,
      ogImage: `${SITE}/og/qa-default.png`,
      ogImageAlt: `${readable} — 연구기반 Q&A 미리보기 | 플로로탄닌·감태추출물 종합 건강정보 데이터센터`,
    }
  }
  // ─── Q&A 자산화 (헌법 제10조) — /qa/tag/:tag 태그별 Q&A 모음 ───
  if (pathname.startsWith('/qa/tag/')) {
    const rawTag = pathname.replace('/qa/tag/', '').split('/')[0]
    let readable = rawTag
    try { readable = decodeURIComponent(rawTag) } catch { /* keep */ }
    readable = readable.trim().slice(0, 30)
    return {
      title: `${readable} 건강 Q&A 모음 | 플로로탄닌·감태추출물 정보센터`,
      desc:  `${readable} 관련 연구기반 Q&A 모음. 플로로탄닌(phlorotannin)·감태추출물·해양 폴리페놀의 ${readable} 관련 건강정보를 한곳에서 확인할 수 있는 종합 건강정보 데이터센터의 태그 아카이브입니다.`,
      canonical: `${SITE}${pathname}`,
      ogImage: `${SITE}/og/qa-default.png`,
      ogImageAlt: `${readable} 태그 Q&A 아카이브 — 플로로탄닌·감태추출물 종합 건강정보 데이터센터`,
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
async function fetchPageMeta(slug, pathname = null) {
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
    const canonicalPath = pathname || (slug === 'home' ? '/' : `/${slug}`)
    return {
      title,
      desc,
      canonical: canonicalPath === '/' ? `${SITE}/` : `${SITE}${canonicalPath}`,
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
  if (!key) return localPostMeta(slug)
  try {
    const r = await fetch(
      `${url}/rest/v1/posts?slug=eq.${encodeURIComponent(slug)}&status=eq.published&select=title,meta_title,meta_desc,excerpt,category,og_image&limit=1`,
      // Supabase 프로젝트 기본 노출 스키마가 'api'로 설정된 경우가 있어
      // public 스키마의 posts 테이블에 접근하려면 Accept-Profile 헤더가 필요하다.
      { headers: { apikey: key, Authorization: `Bearer ${key}`, 'Accept-Profile': 'public' } }
    )
    if (!r.ok) return localPostMeta(slug)
    const arr = await r.json()
    const p = Array.isArray(arr) && arr[0]
    if (!p) return localPostMeta(slug)
    const baseTitle = p.meta_title || p.title
    const title = baseTitle.includes(' | ')
      ? baseTitle
      : `${baseTitle} | 플로로탄닌·감태추출물 건강정보`
    let desc = p.meta_desc || p.excerpt || p.title
    if (desc.length > 140) desc = desc.slice(0, 137) + '...'
    desc = `${desc} (플로로탄닌·감태추출물·해양 폴리페놀 건강정보)`
    if (desc.length > 300) desc = desc.slice(0, 300)
    return {
      title,
      desc,
      canonical: `${SITE}/blog/${slug}`,
      ogImage: p.og_image || '',
      ogImageAlt: buildBlogImageAlt(p),
    }
  } catch {
    return localPostMeta(slug)
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

// [2026-05-18] SR_ONLY_STYLE 제거 — fallback이 <noscript> 안으로만 출력되므로 CSS 불필요.

// 11개 정적 경로용 fallback 본문 (700~1,000자 목표, 자연 문장, 의학적 단정 표현 제외)
const SSR_LITE_BODIES = {
  '/': {
    h1: '플로로탄닌·감태추출물 종합 건강정보 데이터센터',
    paras: [
      'phlorotannin.com은 플로로탄닌(phlorotannin), 감태추출물(Ecklonia cava extract), 해양 폴리페놀(갈조류 폴리페놀, 해조류 폴리페놀)에 관한 정보를 한 곳에 정리하는 건강정보 데이터센터입니다.',
      '플로로탄닌은 갈조류에서 발견되는 폴리페놀 계열 성분의 총칭으로, 대표 구성 분자로 eckol(에콜), dieckol(다이에콜) 등이 알려져 있습니다. 같은 감태(Ecklonia cava) 유래 해양 폴리페놀 성분군은 일부 자료에서 씨놀(Seanol)이라는 명칭으로도 언급되며, "카프"라는 표현으로 함께 검색되기도 합니다.',
      '이 사이트는 항산화, 염증, 혈당, 당뇨, 수면, 면역, 장 건강, 뇌 건강, 피부 건강 등 여러 주제에 걸친 연구 동향과 일반 건강정보를 정리합니다. 특정 질환의 치료나 예방을 단정하는 표현은 사용하지 않고, 공개된 자료와 사람들이 실제로 검색하는 질문에 답하는 구조로 콘텐츠를 모읍니다.',
      '메뉴는 크게 플로로탄닌 개요, 쉬운 건강정보(/easy, /learn), 블로그 아카이브(성분 비교, 질환별 건강정보, 병원정보, 파트너 정보페이지 안내), 연구기반 Q&A, 파트너 개인 정보페이지(/p/:phone)로 구성됩니다.',
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
    h1: '연구기반 Q&A 아카이브 — 플로로탄닌·감태추출물 건강정보',
    paras: [
      '연구기반 Q&A는 플로로탄닌(phlorotannin), 감태추출물, 해양 폴리페놀에 관해 사람들이 실제로 묻는 질문들을 모아 정리한 아카이브입니다.',
      '주제는 질환별 건강정보(당뇨·혈당, 암환자 가족 건강정보, 치매·뇌 건강, 수면, 면역, 장 건강, 피부 건강, 염증), 성분 비교(콜라겐·후코이단·베타글루칸 등 다른 건강성분과의 비교), 병원정보(암요양병원·한방병원·재활병원 선택 기준) 등으로 구성됩니다.',
      '검색어로는 플로로탄닌, 플로로타닌, phlorotannin, 감태추출물, Ecklonia cava, 씨놀, Seanol, 카프, 갈조류 폴리페놀, 해조류 폴리페놀, 해양 폴리페놀이 함께 사용됩니다.',
    ],
    nav: ['/blog', '/phlorotannin', '/learn', '/easy'],
  },
  '/blog': {
    h1: '건강정보 블로그 — 플로로탄닌·감태추출물·해양 폴리페놀 연구 아카이브',
    paras: [
      '건강정보 블로그는 플로로탄닌(phlorotannin), 감태추출물(Ecklonia cava), 해양 폴리페놀(갈조류 폴리페놀, 해조류 폴리페놀)의 연구 동향과 일반 건강정보를 모아 정리하는 아카이브입니다.',
      '아카이브는 다섯 가지 카테고리로 구성됩니다. 1) 성분 비교 — 콜라겐, 후코이단, 베타글루칸, 오메가3 등 다양한 건강성분과 플로로탄닌·감태추출물의 차이. 2) 질환별 건강정보 — 당뇨·혈당, 암환자 가족 건강정보, 치매·뇌 건강, 수면, 면역, 장 건강, 피부 건강, 염증. 3) 운동·재활 루틴 — 암환자 운동법, 당뇨 운동법, 근감소증 회복. 4) 병원정보 — 암요양병원, 한방병원, 재활병원, 연구기반 Q&A. 5) 파트너 정보페이지 안내.',
      '관련 검색어: 플로로탄닌, 플로로타닌, phlorotannin, 감태추출물, Ecklonia cava, 씨놀, Seanol, 카프, eckol, dieckol, 항산화, 염증, 면역.',
    ],
    nav: ['/blog?category=ingredient-comparison', '/blog?category=disease-health-info', '/blog?category=exercise-recovery', '/blog?category=hospital-info', '/blog?category=partner-info'],
  },
  '/blog?category=ingredient-comparison': {
    h1: '성분 비교 아카이브 — 콜라겐·후코이단·베타글루칸·플로로탄닌 비교',
    paras: [
      '성분 비교 아카이브는 콜라겐, 후코이단, 베타글루칸, 오메가3 같은 다양한 건강성분과 플로로탄닌(phlorotannin), 감태추출물, 해양 폴리페놀(갈조류 폴리페놀)의 차이를 일반 건강정보 관점에서 비교하는 카테고리입니다.',
      '같은 감태(Ecklonia cava) 유래 해양 폴리페놀 성분군이 자료에 따라 씨놀(Seanol), 카프 같은 별칭으로도 언급되기 때문에, 이름이 달라도 동일 성분군인지 다른 성분인지 정리합니다.',
      '비교 항목은 원료(육상 vs 해양), 분자 종류(eckol, dieckol 등), 항산화 관점, 염증 관점, 흡수율, 적용 범위 등입니다. 의학적 효능을 단정하지 않고 연구 동향과 일반 건강정보 위주로 안내합니다.',
    ],
    nav: ['/blog', '/blog?category=disease-health-info', '/blog?category=exercise-recovery', '/blog?category=hospital-info'],
  },
  '/blog?category=disease-health-info': {
    h1: '질환별 건강정보 — 암환자 가족·당뇨·수면·면역 정보 아카이브',
    paras: [
      '질환별 건강정보 아카이브는 사람들이 실제로 검색하는 건강 주제를 정리하는 카테고리입니다.',
      '주요 주제: 당뇨·혈당 건강정보, 암환자 가족 건강정보, 치매·뇌 건강, 수면 건강, 면역 건강, 장 건강, 피부 건강, 항산화·염증 관련 건강정보.',
      '각 주제는 플로로탄닌(phlorotannin), 감태추출물, 해양 폴리페놀(갈조류 폴리페놀, 해조류 폴리페놀)의 공개된 연구 동향과 어떻게 연결되는지 풀어 설명합니다. 의학적 치료·예방을 단정하지 않으며, 일반 건강정보 관점에서 안내합니다. 관련 검색어: eckol, dieckol, 씨놀, Seanol, 카프, Ecklonia cava.',
    ],
    nav: ['/blog', '/qa', '/blog?category=exercise-recovery', '/blog?category=hospital-info'],
  },
  '/blog?category=exercise-recovery': {
    h1: '운동·재활 루틴 — 암환자 운동법·당뇨 운동법·근감소증 회복',
    paras: [
      '운동·재활 루틴 아카이브는 환자와 가족이 실제로 검색하는 운동법을 안전 기준과 함께 정리하는 카테고리입니다.',
      '주요 주제: 암환자 운동법, 항암치료 중 운동, 당뇨 식후 걷기, 근감소증 근력운동, 회복기 단백질·ONS·환자식 연계. 질환별 금기와 의료진 상담이 필요한 신호를 함께 안내합니다.',
      '관련 검색어: 암환자 운동, 항암 운동, 당뇨 운동법, 식후 걷기, 근감소증 운동, 회복기 재활, 단백질, 건강한 반찬 정보, ONS, 플로로탄닌, 감태추출물.',
    ],
    nav: ['/blog', '/blog?category=disease-health-info', '/blog?category=hospital-info'],
  },
  '/blog?category=hospital-info': {
    h1: '병원정보 아카이브 — 암요양병원·한방병원·연구기반 Q&A',
    paras: [
      '병원정보 아카이브는 환자와 가족이 병원을 선택할 때 확인해야 하는 정보를 정리하는 카테고리입니다.',
      '다루는 분야: 암요양병원, 한방병원, 재활병원, 통합의학 병원, 그리고 각 분야 연구기반 Q&A. 병원 선택 시 점검할 항목, 치료 외 환자·가족 건강정보(영양, 항산화, 염증, 면역, 수면, 장 건강, 뇌 건강 등)도 함께 정리합니다.',
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
  if (!key) return localPostBody(slug)
  try {
    const r = await fetch(
      `${url}/rest/v1/posts?slug=eq.${encodeURIComponent(slug)}&status=eq.published&select=id,slug,title,meta_title,meta_desc,excerpt,content,category,tags,og_image,published_at,updated_at,created_at&limit=1`,
      { headers: { apikey: key, Authorization: `Bearer ${key}`, 'Accept-Profile': 'public' } }
    )
    if (!r.ok) return localPostBody(slug)
    const arr = await r.json()
    const p = Array.isArray(arr) && arr[0]
    if (!p) return localPostBody(slug)
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
      // ─── [2026-05-21 D9] datePublished SEO 안전 fallback ─────
      // published_at 이 NULL 인 글이 36.9% (110/298) 존재. Schema.org Article
      // 권장 필드 누락 시 Google Rich Results Article 자격 박탈되므로
      // updated_at → created_at 순으로 안전 대체. 데이터 본체 변경 없음.
      publishedAt: p.published_at || p.updated_at || p.created_at || '',
      updatedAt: p.updated_at || p.created_at || '',
    }
  } catch {
    return localPostBody(slug)
  }
}

// /blog/:slug 의 같은 카테고리 다른 글 3건 (Related Posts)
// view_count 우선, 그 다음 최근 published_at 순으로 정렬
async function fetchRelatedPosts(category, excludeSlug, limit = 3) {
  if (!category || typeof category !== 'string') return []
  const { url, key } = sbCreds()
  if (!key) return localRelatedPosts(category, excludeSlug, limit)
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
    if (!r.ok) return localRelatedPosts(category, excludeSlug, limit)
    const arr = await r.json()
    if (!Array.isArray(arr) || arr.length === 0) return localRelatedPosts(category, excludeSlug, limit)
    const related = arr.map(p => ({
      slug: p.slug || '',
      title: p.title || '',
      excerpt: p.excerpt || '',
    })).filter(p => p.slug && p.title)
    return related.length ? related : localRelatedPosts(category, excludeSlug, limit)
  } catch {
    return localRelatedPosts(category, excludeSlug, limit)
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
  const citations = extractCitationsFromContent(post.content || '')
  if (citations.length) {
    ld.citation = citations
    ld.isBasedOn = citations
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
      'exercise-recovery':      `${SITE}/blog?category=exercise-recovery`,
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

// /blog/:slug → 본문 참고자료 링크를 Article JSON-LD citation/isBasedOn 으로 승격.
// YMYL 글은 화면 하단 출처만으로 부족하므로 검색엔진이 읽는 구조화데이터에도
// 공식·공공·학회 출처를 명시한다. 내부 링크와 CTA 링크는 제외한다.
function extractCitationsFromContent(content) {
  if (!content || typeof content !== 'string') return []
  const seen = new Set()
  const citations = []
  const add = (name, url) => {
    if (!url || !/^https?:\/\//i.test(url)) return
    if (/^https?:\/\/(www\.)?phlorotannin\.com/i.test(url)) return
    const normalized = url.replace(/[.,;)\]]+$/g, '')
    if (seen.has(normalized)) return
    seen.add(normalized)
    citations.push({
      '@type': 'CreativeWork',
      name: stripToPlainText(name || normalized).slice(0, 160),
      url: normalized,
    })
  }

  // Markdown links: [label](https://...)
  const markdownRe = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g
  let m
  while ((m = markdownRe.exec(content)) !== null && citations.length < 12) {
    add(m[1], m[2])
  }

  // Plain URLs fallback
  const urlRe = /https?:\/\/[^\s<>"')]+/g
  while ((m = urlRe.exec(content)) !== null && citations.length < 12) {
    add(m[0], m[0])
  }
  return citations
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

// ─────────────────────────────────────────────────────────────────
// [2026-05-21 D7 보강] 카테고리·허브 페이지 서버 사이드 JSON-LD 빌더
//   React 컴포넌트의 SEOHead 가 클라이언트 사이드에서만 JSON-LD를 추가하므로
//   봇이 첫 fetch 받는 HTML 에는 BreadcrumbList/CollectionPage/ItemList 등이 누락된다.
//   여기서 같은 시그널을 서버 사이드에서 그대로 만들어 inject 한다.
// ─────────────────────────────────────────────────────────────────

// URL slug(dash-case) → category_id(snake_case 정규형) 정규화
const URL_SLUG_TO_CAT_ID = {
  'metabolism': 'metabolism',
  'cancer-immune': 'cancer_immune',
  'digestive': 'digestive',
  'cardiovascular': 'cardiovascular',
  'neuro-cognitive': 'neuro_cognitive',
  'mental-health': 'mental_health',
  'musculoskeletal': 'musculoskeletal',
  'skin-hair': 'skin_hair',
  'skin-hair-care': 'skin_hair',
  'skin': 'skin',
  'hair': 'hair',
  'respiratory': 'respiratory',
  'infection-inflammation': 'infection_inflammation',
  'womens-health': 'womens_health',
  'mens-health': 'mens_health',
}

// /category/:slug → BreadcrumbList + CollectionPage JSON-LD
// (ItemList 는 동적 fetch 비용이 커서 서버 사이드에선 생략; 클라이언트 사이드 보강에 위임)
function buildCategoryJsonLd(pathname, name) {
  const pageUrl = `${SITE}${pathname}`
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": `${SITE}/` },
      { "@type": "ListItem", "position": 2, "name": "건강 Q&A", "item": `${SITE}/qa` },
      { "@type": "ListItem", "position": 3, "name": name, "item": pageUrl },
    ]
  }
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    "url": pageUrl,
    "name": `${name} 건강정보 Q&A`,
    "description": `${name} 관련 연구기반 Q&A 아카이브 — 플로로탄닌·감태추출물·해양 폴리페놀 종합 건강정보 데이터센터`,
    "inLanguage": "ko-KR",
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      "url": `${SITE}/`,
      "name": "플로로탄닌 종합 건강정보 데이터센터"
    },
    "breadcrumb": { "@id": `${pageUrl}#breadcrumb` },
    "about": { "@type": "Thing", "name": name },
  }
  return [breadcrumb, collection]
}

// /learn → BreadcrumbList + LearningResource
function buildLearnJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${SITE}/learn#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": `${SITE}/` },
        { "@type": "ListItem", "position": 2, "name": "학습 가이드", "item": `${SITE}/learn` },
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      "@id": `${SITE}/learn#resource`,
      "url": `${SITE}/learn`,
      "name": "플로로탄닌 쉽게 배우기 — 감태추출물·해양 폴리페놀 학습 가이드",
      "description": "플로로탄닌·감태추출물·해양 폴리페놀의 작용기전과 건강 효과를 단계별로 학습하는 종합 가이드. 항산화·염증·혈당·수면·면역·뇌 건강 주제 포함.",
      "inLanguage": "ko-KR",
      "audience": { "@type": "Audience", "audienceType": "일반 성인 학습자" },
      "educationalLevel": "Beginner to Intermediate",
      "learningResourceType": "Guide",
      "about": [
        { "@type": "Thing", "name": "플로로탄닌(Phlorotannin)" },
        { "@type": "Thing", "name": "감태추출물(Ecklonia cava extract)" },
        { "@type": "Thing", "name": "해양 폴리페놀" },
      ],
      "isPartOf": {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        "url": `${SITE}/`,
        "name": "플로로탄닌 종합 건강정보 데이터센터"
      }
    }
  ]
}

// /easy → BreadcrumbList + MedicalWebPage
function buildEasyJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${SITE}/easy#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": `${SITE}/` },
        { "@type": "ListItem", "position": 2, "name": "쉬운 건강정보", "item": `${SITE}/easy` },
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "@id": `${SITE}/easy#page`,
      "url": `${SITE}/easy`,
      "name": "쉬운 플로로탄닌 건강정보",
      "description": "플로로탄닌·감태추출물·해양 폴리페놀을 처음 접하는 분들을 위해 항산화·염증·수면·혈당·면역 건강정보를 쉬운 언어로 정리한 허브",
      "inLanguage": "ko-KR",
      "audience": { "@type": "MedicalAudience", "audienceType": "Patient" },
      "specialty": [
        { "@type": "MedicalSpecialty", "name": "Internal Medicine" },
        { "@type": "MedicalSpecialty", "name": "Nutrition" }
      ],
      "about": [
        { "@type": "Thing", "name": "당뇨" },
        { "@type": "Thing", "name": "고혈압" },
        { "@type": "Thing", "name": "비만" },
        { "@type": "Thing", "name": "치매" },
        { "@type": "Thing", "name": "스트레스" },
        { "@type": "Thing", "name": "피부 건강" },
        { "@type": "Thing", "name": "관절 건강" },
        { "@type": "Thing", "name": "암 예방" }
      ],
      "isPartOf": {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        "url": `${SITE}/`,
        "name": "플로로탄닌 종합 건강정보 데이터센터"
      }
    }
  ]
}

// /phlorotannin → BreadcrumbList + MedicalWebPage (이미 클라이언트에 있지만 서버 사이드에서도 동일 송신)
function buildPhlorotanninJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${SITE}/phlorotannin#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": `${SITE}/` },
        { "@type": "ListItem", "position": 2, "name": "플로로탄닌 소개", "item": `${SITE}/phlorotannin` },
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "@id": `${SITE}/phlorotannin#page`,
      "url": `${SITE}/phlorotannin`,
      "name": "플로로탄닌(Phlorotannin)이란? - 해양 폴리페놀 과학적 근거",
      "description": "감태·미역·다시마 등 갈조류에서 추출한 해양 폴리페놀 플로로탄닌의 6가지 과학적 작용기전",
      "inLanguage": "ko-KR",
      "about": {
        "@type": "Thing",
        "name": "플로로탄닌 (Phlorotannin)",
        "alternateName": ["Phlorotannin", "감태추출물", "해양폴리페놀"],
        "description": "갈조류(감태·미역·다시마)에서 추출한 해양 폴리페놀 계열 천연 소재"
      }
    }
  ]
}

// /glossary → BreadcrumbList (DefinedTermSet 은 데이터 의존이 커서 클라이언트에 위임)
function buildGlossaryJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${SITE}/glossary#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": `${SITE}/` },
        { "@type": "ListItem", "position": 2, "name": "용어 사전", "item": `${SITE}/glossary` },
      ]
    }
  ]
}

// ─── [2026-05-21 D8] /q/:slug → QAPage + BreadcrumbList (SSR) ─────
// 1,361 Q&A 페이지 본체 자산화. 봇 첫 fetch HTML 에 QAPage 스키마를 포함시켜
// Google Q&A rich result + 색인 신호 강화. qa.json 매칭 실패 시 빈 배열 반환.
function buildQuestionJsonLd(pathname, q) {
  if (!q || !q.question) return []
  const pageUrl = `${SITE}${pathname}`
  const question = String(q.question).trim()
  const answer   = String(q.answer || '').trim()
  const catId    = q.category || ''
  const catName  = CATEGORY_NAMES[catId] || '건강 Q&A'
  const ogSlug   = CAT_OG_SLUG[catId] || ''
  // URL slug (카테고리 페이지로의 정식 링크) — dash-case
  // skin_hair → skin-hair, neuro_cognitive → neuro-cognitive 등
  const catUrlSlug = (ogSlug || String(catId).replace(/_/g, '-')) || 'qa'
  const categoryUrl = `${SITE}/category/${catUrlSlug}`

  // E-E-A-T 메타
  const author = q.author || '플로로탄닌 정보센터 편집팀'
  const reviewedAt = q.reviewed_at || q.reviewedAt || ''

  // QAPage.acceptedAnswer.text: 답변 본문 (제어문자 0x00–0x1F 제거 + 길이 보존)
  const safeAnswer = answer.replace(/[\u0000-\u001F\u007F]/g, ' ').trim()
  const safeQuestion = question.replace(/[\u0000-\u001F\u007F]/g, ' ').trim()

  const qaPage = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "@id": `${pageUrl}#qapage`,
    "url": pageUrl,
    "inLanguage": "ko",
    "isPartOf": { "@id": `${SITE}/#website` },
    "breadcrumb": { "@id": `${pageUrl}#breadcrumb` },
    "mainEntity": {
      "@type": "Question",
      "@id": `${pageUrl}#question`,
      "name": safeQuestion,
      "text": safeQuestion,
      "answerCount": safeAnswer ? 1 : 0,
      "author": { "@type": "Person", "name": "건강 정보 검색 사용자" },
      ...(safeAnswer ? {
        "acceptedAnswer": {
          "@type": "Answer",
          "text": safeAnswer,
          "url": pageUrl,
          "author": { "@type": "Organization", "name": author },
          ...(reviewedAt ? { "dateCreated": reviewedAt } : {}),
        }
      } : {})
    },
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": `${SITE}/` },
      { "@type": "ListItem", "position": 2, "name": "건강 Q&A", "item": `${SITE}/qa` },
      ...(catName !== '건강 Q&A' ? [
        { "@type": "ListItem", "position": 3, "name": catName, "item": categoryUrl },
        { "@type": "ListItem", "position": 4, "name": safeQuestion.slice(0, 80), "item": pageUrl },
      ] : [
        { "@type": "ListItem", "position": 3, "name": safeQuestion.slice(0, 80), "item": pageUrl },
      ])
    ]
  }

  return [breadcrumb, qaPage]
}

// /qa/tag/:tag → BreadcrumbList
function buildTagJsonLd(pathname, tag) {
  const pageUrl = `${SITE}${pathname}`
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": `${SITE}/` },
        { "@type": "ListItem", "position": 2, "name": "건강 Q&A", "item": `${SITE}/qa` },
        { "@type": "ListItem", "position": 3, "name": `#${tag}`, "item": pageUrl },
      ]
    }
  ]
}

// pathname 으로부터 적절한 JSON-LD 배열을 반환 (없으면 [])
function buildJsonLdForPath(pathname) {
  // /category/:slug
  if (pathname.startsWith('/category/')) {
    const slug = pathname.replace('/category/', '').split('/')[0]
    const catId = URL_SLUG_TO_CAT_ID[slug] || slug
    const name = CATEGORY_NAMES[catId] || CATEGORY_NAMES[slug] || slug
    return buildCategoryJsonLd(pathname, name)
  }
  // /learn
  if (pathname === '/learn') return buildLearnJsonLd()
  // /easy
  if (pathname === '/easy') return buildEasyJsonLd()
  // /phlorotannin
  if (pathname === '/phlorotannin') return buildPhlorotanninJsonLd()
  // /glossary
  if (pathname === '/glossary') return buildGlossaryJsonLd()
  // /qa/tag/:tag
  if (pathname.startsWith('/qa/tag/')) {
    const rawTag = pathname.replace('/qa/tag/', '').split('/')[0]
    let tag = rawTag
    try { tag = decodeURIComponent(rawTag) } catch { /* keep */ }
    return buildTagJsonLd(pathname, tag)
  }
  // ─── [2026-05-21 D8] /q/:slug → QAPage + BreadcrumbList ─────
  if (pathname.startsWith('/q/')) {
    const rawSlug = pathname.replace('/q/', '').split('/')[0]
    const q = findQuestionBySlug(rawSlug)
    if (q) return buildQuestionJsonLd(pathname, q)
    return []
  }
  return []
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
      `<nav><a href="/blog">블로그 아카이브로</a> · <a href="/qa">연구기반 Q&amp;A</a> · <a href="/phlorotannin">플로로탄닌이란</a></nav>`,
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
      `<nav><a href="/">홈</a> · <a href="/blog">건강정보 블로그</a> · <a href="/qa">연구기반 Q&amp;A</a></nav>`,
      // ── 플랫폼 마커 + 저작권 (파트너 페이지 봇 노출 HTML에도 동일 표시) ──
      `<footer data-platform="phlorotannin-partner-page" data-owner="phlorotannin.com" data-signature="phlorotannin-platform-v1" data-page-type="partner-business-card">© 2026 <a href="https://phlorotannin.com/">phlorotannin.com</a> — 플로로탄닌·감태추출물 종합 건강정보 데이터센터. 본 파트너 정보페이지의 구조·연락처 노출 방식·SEO 설계는 저작권법의 보호를 받으며, <a href="https://phlorotannin.com/copyright">무단 복제·재가공·상업적 이용을 금지</a>합니다.</footer>`,
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
    // ── 플랫폼 마커 + 저작권 (봇이 보는 HTML에도 동일 표시) ──
    `<footer data-platform="phlorotannin-platform" data-owner="phlorotannin.com" data-signature="phlorotannin-platform-v1">© 2026 <a href="https://phlorotannin.com/">phlorotannin.com</a> — 플로로탄닌·감태추출물 종합 건강정보 데이터센터. 본 사이트의 콘텐츠·카테고리 구조·파트너 정보페이지 시스템·SEO 설계는 저작권법의 보호를 받으며, <a href="https://phlorotannin.com/copyright">무단 복제·재가공·상업적 이용을 금지</a>합니다.</footer>`,
  ].filter(Boolean).join('')
  return wrapFallback(inner)
}

function wrapFallback(inner) {
  // [2026-05-18 2차 수정] <noscript> fallback 완전 제거.
  //   • 1차 수정에서 <noscript> 안에만 두었으나, 검색엔진/AI 텍스트 추출기는
  //     <noscript> 내부도 인덱싱하므로 React 마운트 후 본문과 합쳐 본문이 2회로 인식되는 문제 잔존.
  //   • 모던 Googlebot/Bingbot/AI 크롤러는 JavaScript를 실행하여 React 렌더링 결과를 읽으므로
  //     SEO 본문 신호는 클라이언트 렌더링만으로 충분히 전달된다.
  //   • SEO 핵심 신호(<title>, <meta name="description">, canonical, OG, JSON-LD)는
  //     injectMeta()가 정적 HTML에 그대로 주입하므로 손실 없음.
  //   • inner는 더 이상 출력되지 않으므로 빈 문자열을 반환한다(호출부 호환을 위해 함수 유지).
  void inner
  return ''
}

function injectFallback(html, fallbackHtml) {
  // [2026-05-18 2차 수정] fallback HTML 자체를 출력하지 않으므로 root 주입도 생략.
  //   • <div id="root"></div> 는 그대로 유지되어 React가 클라이언트에서 마운트한다.
  //   • SEO에 필요한 메타·canonical·JSON-LD는 injectMeta()/injectJsonLd()로 별도 주입.
  void fallbackHtml
  return html
}

function stripManagedHeadTags(html) {
  return html
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>\s*/gi, '')
    .replace(/<meta\b(?=[^>]*(?:name|property)=["'](?:description|keywords|robots|googlebot|twitter:[^"']+|og:[^"']+)["'])[^>]*>\s*/gi, '')
    .replace(/<link\b(?=[^>]*rel=["'](?:canonical|alternate)["'])[^>]*>\s*/gi, '')
}

function injectMeta(html, meta) {
  const t = esc(meta.title)
  const d = esc(meta.desc)
  const c = esc(meta.canonical)
  // [2026-05-21] og:image / og:image:alt / twitter:image / twitter:image:alt 까지
  // 라우트별로 갱신. 카테고리 OG (public/og/qa-<slug>.png) 가 봇에 정확히 도달하도록 함.
  // 메타에 ogImage 가 없으면 기본 OG (/og-image.png) 유지 — 안전 fallback.
  const ogImage    = esc(absoluteUrl(meta.ogImage || DEFAULT_OG_IMAGE))
  const ogImageAlt = esc(meta.ogImageAlt || DEFAULT_OG_IMAGE_ALT)
  const ogImageType = esc(imageTypeFromUrl(meta.ogImage || DEFAULT_OG_IMAGE))
  const robots = esc(meta.robots || DEFAULT_ROBOTS)
  const googlebot = meta.robots && meta.robots.includes('noindex')
    ? esc(meta.robots)
    : DEFAULT_GOOGLEBOT
  const tags = [
    `<title id="page-title">${t}</title>`,
    `<meta id="page-desc" name="description" content="${d}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="googlebot" content="${googlebot}" />`,
    `<link rel="canonical" href="${c}" />`,
    `<link rel="alternate" hreflang="ko" href="${c}" />`,
    `<link rel="alternate" hreflang="x-default" href="${c}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${c}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:secure_url" content="${ogImage}" />`,
    `<meta property="og:image:alt" content="${ogImageAlt}" />`,
    `<meta property="og:image:type" content="${ogImageType}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<meta name="twitter:image:alt" content="${ogImageAlt}" />`,
  ].join('\n    ')
  html = stripManagedHeadTags(html)
  return html.replace(/<head([^>]*)>/i, `<head$1>\n    ${tags}`)

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

  // ─── [2026-05-21 D9] robots 메타 라우트별 갱신 ─────
  // /admin, /question/write, /community/post, /inforoom 등 noindex 의도 라우트에서만
  // meta.robots 가 셋되며, 그 외 페이지는 index.html 기본값 (index, follow ...) 유지.
  // 의도하지 않은 noindex 누출 방지: meta.robots 가 없으면 index.html 그대로.
  if (meta.robots) {
    const r = esc(meta.robots)
    // index.html에는 동일 메타가 2회 중복 출현하므로 replace_all로 전부 갱신
    html = html.replace(
      /<meta name="robots" content="[^"]*"\s*\/?>/g,
      `<meta name="robots" content="${r}" />`
    )
  }

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
  // [2026-05-21] og:image 5종 — 라우트별 카테고리 OG 차별화
  html = html.replace(
    /<meta property="og:image" content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${ogImage}" />`
  )
  html = html.replace(
    /<meta property="og:image:secure_url" content="[^"]*"\s*\/?>/,
    `<meta property="og:image:secure_url" content="${ogImage}" />`
  )
  html = html.replace(
    /<meta property="og:image:alt" content="[^"]*"\s*\/?>/,
    `<meta property="og:image:alt" content="${ogImageAlt}" />`
  )
  html = html.replace(
    /<meta property="og:image:type" content="[^"]*"\s*\/?>/,
    `<meta property="og:image:type" content="${ogImageType}" />`
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
  // [2026-05-21] twitter:image / twitter:image:alt 도 동시 갱신
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${ogImage}" />`
  )
  html = html.replace(
    /<meta name="twitter:image:alt" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image:alt" content="${ogImageAlt}" />`
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
    pathname = appendForwardedViewQuery(pathname, u.searchParams)

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
    const privateShopPackageMatch = pathname.match(/^\/p\/[^/]+\/shop-package(?:\/[^?]+)?$/)
    if (privateShopPackageMatch) {
      const canonicalPath = pathname.split('?')[0] || pathname
      meta = {
        title: '샵 매출 성장 패키지 | 플로로탄닌 파트너스',
        desc:  '660만 원 샵 패키지로 제품 공급, 전용 페이지, 지역 검색 구조, 기본 소개 문구, 초기 운영 지원까지 함께 제공하는 플로로탄닌 파트너스 샵 전용 매출 성장 랜딩입니다.',
        canonical: `${SITE}${canonicalPath}`,
        robots: 'noindex,follow',
        ogImage: `${SITE}/partner/shop-package/salon-consult-hero.jpg`,
        ogImageAlt: '고급 피부관리 모델과 제품 진열',
      }
      metaSource = 'private-shop-package'
    }
    const partnerArchiveLogicalPathname = getPartnerArchiveLogicalPath(pathname)
    const metaLookupPathname = partnerArchiveLogicalPathname || pathname
    const blogMatch = metaLookupPathname.match(/^\/blog\/([^/]+)$/)
    if (!meta && blogMatch) {
      meta = await fetchPostMeta(blogMatch[1])
      if (meta) {
        metaSource = meta.source || 'posts-table'
      } else {
        meta = missingBlogPostMeta(blogMatch[1])
        metaSource = 'blog-not-found'
      }
    }
    // Phase 3: 고정 페이지 슬러그 매핑 (pages 테이블에 운영자가 정의한 메타가 있으면 우선)
    if (!meta) {
      // /home, /qa, /blog, /phlorotannin 등 짧은 경로를 slug로 직접 매핑
      const pageSlug = metaLookupPathname === '/' ? 'home' : metaLookupPathname.replace(/^\//, '').split('/')[0]
      if (pageSlug && !pageSlug.startsWith('api')) {
        const pageMeta = await fetchPageMeta(pageSlug, metaLookupPathname)
        if (pageMeta) {
          meta = pageMeta
          metaSource = 'pages-table'
        }
      }
    }
    if (!meta) {
      meta = staticMetaFor(metaLookupPathname)
      if (meta) metaSource = 'static'
    }
    if (!meta) {
      meta = staticMetaFor('/')
      meta.canonical = `${SITE}${metaLookupPathname}`
      metaSource = 'fallback'
    }
    if (partnerArchiveLogicalPathname && !privateShopPackageMatch) {
      const canonicalPath = partnerArchiveLogicalPathname.split('?')[0] || '/'
      const isPrivateShopPackage = canonicalPath === '/shop-package' || canonicalPath.startsWith('/shop-package/')
      const requestCanonicalPath = pathname.split('?')[0] || '/'
      const canonical = isPrivateShopPackage
        ? `${SITE}${requestCanonicalPath}`
        : canonicalPath === '/'
        ? `${SITE}/`
        : `${SITE}${canonicalPath}`
      const robots = meta.robots && String(meta.robots).includes('nofollow')
        ? meta.robots
        : 'noindex,follow'
      meta = { ...meta, canonical, robots }
      metaSource = `partner-archive:${metaSource}`
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

    // ─── [2026-05-21 D7 보강] 카테고리·허브 페이지 서버 사이드 JSON-LD 주입 ─────
    // React SEOHead 가 클라이언트 사이드에서만 JSON-LD를 추가하므로 봇의 첫 fetch HTML 에
    // BreadcrumbList/CollectionPage/LearningResource 등이 누락된다. 동일 시그널을 서버
    // 사이드에서도 직접 inject 해서 자바스크립트 미실행 봇/검색엔진에게도 100% 전달.
    let extraLdApplied = 'no'
    let extraLdCount = 0
    if (process.env.JSONLD_DISABLED !== '1') {
      try {
        const extraLdArray = buildJsonLdForPath(metaLookupPathname)
        if (extraLdArray && extraLdArray.length > 0) {
          html = injectJsonLd(html, extraLdArray)
          extraLdCount = extraLdArray.length
          extraLdApplied = `yes:${extraLdCount}`
        }
      } catch (e) {
        extraLdApplied = `error:${(e && e.message) || 'unknown'}`
      }
    } else {
      extraLdApplied = 'disabled'
    }

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
                const articleLd = buildArticleJsonLd(postBody, metaLookupPathname)
                if (articleLd) { ldArray.push(articleLd); articleLdApplied = 'yes' }

                const breadcrumbLd = buildBreadcrumbJsonLd(postBody, metaLookupPathname)
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
    // [2026-05-21 D4 회귀 fix] HTTP 헤더는 ASCII 만 허용 — 한글 슬러그가 들어간
    // /qa/tag/플로로탄닌 같은 경로에서 500 (Invalid character in header content) 발생.
    // pathname / ogImage 모두 encodeURIComponent 로 안전화. 본문(HTML) 의 메타·canonical 은
    // injectMeta() 가 그대로 한글 처리하므로 SEO 신호에 영향 없음.
    res.setHeader('X-SEO-Path', encodeURI(pathname))
    res.setHeader('X-SEO-Title', encodeURIComponent(meta.title))
    res.setHeader('X-SEO-Source', metaSource)
    if (meta.robots && String(meta.robots).toLowerCase().includes('noindex')) {
      res.setHeader('X-Robots-Tag', meta.robots)
    }
    // [2026-05-21] og:image 차별화 진단용 (카테고리 OG 도달 여부 확인)
    res.setHeader('X-OG-Image', encodeURI(meta.ogImage || DEFAULT_OG_IMAGE))
    res.setHeader('X-SSR-Lite', ssrLiteApplied)
    // 플랫폼·저작권 추적 헤더 (응답 헤더에도 마커)
    res.setHeader('X-Platform', 'phlorotannin-platform-v1')
    res.setHeader('X-Owner', 'phlorotannin.com')
    res.setHeader('X-Copyright', '(c) 2026 phlorotannin.com - all rights reserved')
    // 항목 F 진단 헤더
    res.setHeader('X-Article-JsonLd', articleLdApplied)
    res.setHeader('X-Breadcrumb-JsonLd', breadcrumbLdApplied)
    res.setHeader('X-Faq-JsonLd', faqLdApplied)
    res.setHeader('X-Related-Posts', String(relatedPostsCount))
    // [D7] 카테고리·허브 JSON-LD 진단
    res.setHeader('X-Extra-JsonLd', extraLdApplied)
    res.setHeader('X-Extra-JsonLd-Count', String(extraLdCount))
    res.status(200).send(html)
  } catch (e) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.status(500).send(`SEO function error: ${e && e.message}`)
  }
}
