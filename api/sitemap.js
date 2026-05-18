// Vercel Serverless Function — /sitemap.xml 동적 생성
//
// 데이터 소스:
//   1) Supabase posts 테이블 (status='published') — 동적
//   2) Supabase partners 테이블 (status='active') — Phase 2, 동적 (slug = 전화번호)
//      ↓ 실패 시 fallback: Supabase Storage public/partners.json → 동일 도메인 /partners.json
//   3) Supabase pages 테이블 (status='active') — Phase 3, 고정 페이지
//      ↓ 실패 시 fallback: 코드 상수 STATIC_PAGES
//   4) Supabase categories 테이블 (status='active') — Phase 3, blog/qa 카테고리
//      ↓ 실패 시 fallback: 코드 상수 BLOG_CATEGORIES / QA_CATEGORIES
//
// 안전장치:
//   - Supabase 호출 실패 시 정적 fallback (hanain/public/sitemap.xml) 응답
//   - 어떤 단계가 실패해도 200 응답 + 부분 sitemap 보장
//   - 캐시 헤더로 sitemap 폭주 방지

import fs from 'fs'
import path from 'path'

const SITE = 'https://phlorotannin.com'

const SB_URL = process.env.VITE_SUPABASE_URL || 'https://rlfxuyeoluoeaxuujtly.supabase.co'
const SB_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck'

// ───────────────────────────────────────────────
// 고정 URL 목록 (Phase 3에서 Supabase categories/pages 테이블로 이전 예정)
// 현재는 코드 상수로 유지 — 기존 sitemap.xml과 100% 동일하게 맞춤
// ───────────────────────────────────────────────
const STATIC_PAGES = [
  { path: '/',             priority: '1.00', changefreq: 'weekly' },
  { path: '/home',         priority: '0.80', changefreq: 'weekly' },
  { path: '/easy',         priority: '0.80', changefreq: 'weekly' },
  { path: '/learn',        priority: '0.80', changefreq: 'weekly' },
  { path: '/phlorotannin', priority: '0.85', changefreq: 'weekly' },
  { path: '/qa',           priority: '0.95', changefreq: 'daily' },
  { path: '/blog',         priority: '0.95', changefreq: 'daily' },
  { path: '/community',    priority: '0.70', changefreq: 'weekly' },
  { path: '/consult',      priority: '0.70', changefreq: 'monthly' },
  { path: '/partner',      priority: '0.70', changefreq: 'monthly' },
  { path: '/copyright',    priority: '0.30', changefreq: 'yearly' },
  { path: '/inforoom',     priority: '0.40', changefreq: 'monthly' },
  { path: '/glossary',     priority: '0.75', changefreq: 'monthly' },
]

const BLOG_CATEGORIES = [
  'general', 'diabetes', 'cancer', 'brain', 'cardiovascular',
  'inflammation', 'skin', 'research',
  'ingredient-comparison', 'disease-health-info',
  'hospital-info', 'partner-info',
]

const QA_CATEGORIES = [
  'metabolism', 'cancer_immune', 'digestive', 'cardiovascular',
  'neuro_cognitive', 'mental_health', 'respiratory', 'musculoskeletal',
  'skin_hair', 'infection_inflammation', 'mens_health', 'womens_health',
]

// ───────────────────────────────────────────────
// 헬퍼
// ───────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
const todayISO = () => new Date().toISOString().slice(0, 10)

function urlBlock({ loc, lastmod, changefreq, priority, hreflang = true }) {
  const lines = ['  <url>']
  lines.push(`    <loc>${esc(loc)}</loc>`)
  if (lastmod)    lines.push(`    <lastmod>${esc(lastmod)}</lastmod>`)
  if (changefreq) lines.push(`    <changefreq>${esc(changefreq)}</changefreq>`)
  if (priority)   lines.push(`    <priority>${esc(priority)}</priority>`)
  if (hreflang)   lines.push(`    <xhtml:link rel="alternate" hreflang="ko" href="${esc(loc)}"/>`)
  lines.push('  </url>')
  return lines.join('\n')
}

// ───────────────────────────────────────────────
// Supabase posts 페치 (status='published')
// ───────────────────────────────────────────────
async function fetchPublishedPosts() {
  try {
    const url = `${SB_URL}/rest/v1/posts?select=slug,updated_at,created_at,title&status=eq.published&order=updated_at.desc&limit=2000`
    const resp = await fetch(url, {
      headers: {
        'apikey': SB_ANON_KEY,
        'Authorization': `Bearer ${SB_ANON_KEY}`,
        'Accept-Profile': 'public',
      },
    })
    if (!resp.ok) {
      console.error('[sitemap] posts fetch failed:', resp.status)
      return []
    }
    const rows = await resp.json()
    return Array.isArray(rows) ? rows : []
  } catch (e) {
    console.error('[sitemap] posts fetch error:', e?.message || e)
    return []
  }
}

// ───────────────────────────────────────────────
// 파트너 페치 (Phase 2)
//   1) Supabase partners 테이블 (status='active') — 1순위, snake_case 스키마
//   2) Supabase Storage public/partners.json — fallback
//   3) 동일 도메인 /partners.json — fallback
//   반환 형식은 camelCase (slug, name, phone, phoneDisplay, siteUrl)로 통일 → sitemap 생성기 호환
// ───────────────────────────────────────────────
async function fetchPartnersFromTable() {
  try {
    const url = `${SB_URL}/rest/v1/partners?select=slug,phone,name,phone_display,site_url,updated_at&status=eq.active&order=created_at.desc&limit=2000`
    const resp = await fetch(url, {
      headers: {
        apikey: SB_ANON_KEY,
        Authorization: `Bearer ${SB_ANON_KEY}`,
        'Accept-Profile': 'public',
      },
    })
    if (!resp.ok) return null
    const rows = await resp.json()
    if (!Array.isArray(rows) || rows.length === 0) return null
    // snake_case → camelCase 어댑팅
    return rows.map(r => ({
      slug: r.slug,
      phone: r.phone,
      name: r.name,
      phoneDisplay: r.phone_display,
      siteUrl: r.site_url,
      updatedAt: r.updated_at,
    }))
  } catch (e) {
    console.error('[sitemap] partners table fetch error:', e?.message || e)
    return null
  }
}

async function fetchPartnersFromJson() {
  const sources = [
    `${SB_URL}/storage/v1/object/public/public/partners.json`,
    `${SITE}/partners.json`,
  ]
  for (const url of sources) {
    try {
      const resp = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' })
      if (!resp.ok) continue
      const data = await resp.json()
      const list = Array.isArray(data) ? data : (data.partners || [])
      if (list.length) return list
    } catch (e) {
      // 다음 소스 시도
    }
  }
  return []
}

async function fetchPartners() {
  // 1순위: Supabase partners 테이블
  const fromTable = await fetchPartnersFromTable()
  if (fromTable && fromTable.length) return { list: fromTable, source: 'table' }
  // fallback: JSON
  const fromJson = await fetchPartnersFromJson()
  return { list: fromJson, source: fromJson.length ? 'json' : 'empty' }
}

// ───────────────────────────────────────────────
// Phase 3: pages 테이블 페치 (status='active')
// ───────────────────────────────────────────────
async function fetchPagesFromTable() {
  try {
    const url = `${SB_URL}/rest/v1/pages?select=slug,priority,changefreq,updated_at&status=eq.active&limit=200`
    const resp = await fetch(url, {
      headers: {
        apikey: SB_ANON_KEY,
        Authorization: `Bearer ${SB_ANON_KEY}`,
        'Accept-Profile': 'public',
      },
    })
    if (!resp.ok) return null
    const rows = await resp.json()
    if (!Array.isArray(rows) || rows.length === 0) return null
    return rows.map(r => ({
      path: r.slug,
      priority: r.priority || '0.70',
      changefreq: r.changefreq || 'monthly',
      updatedAt: r.updated_at,
    }))
  } catch (e) {
    console.error('[sitemap] pages table fetch error:', e?.message || e)
    return null
  }
}

// ───────────────────────────────────────────────
// Phase 3: categories 테이블 페치 (type별, status='active')
// ───────────────────────────────────────────────
async function fetchCategoriesFromTable() {
  try {
    const url = `${SB_URL}/rest/v1/categories?select=id,type,updated_at&status=eq.active&id=neq.all&limit=200`
    const resp = await fetch(url, {
      headers: {
        apikey: SB_ANON_KEY,
        Authorization: `Bearer ${SB_ANON_KEY}`,
        'Accept-Profile': 'public',
      },
    })
    if (!resp.ok) return null
    const rows = await resp.json()
    if (!Array.isArray(rows) || rows.length === 0) return null
    const blog = rows.filter(r => r.type === 'blog').map(r => r.id)
    const qa = rows.filter(r => r.type === 'qa').map(r => r.id)
    return { blog, qa }
  } catch (e) {
    console.error('[sitemap] categories table fetch error:', e?.message || e)
    return null
  }
}

// ───────────────────────────────────────────────
// 정적 fallback (기존 hanain/public/sitemap.xml)
// ───────────────────────────────────────────────
function readStaticFallback() {
  const candidates = [
    path.join(process.cwd(), 'public', 'sitemap.xml'),
    path.join(process.cwd(), 'sitemap.xml'),
    path.join(process.cwd(), 'hanain', 'dist', 'sitemap.xml'),
    path.join(process.cwd(), 'hanain', 'public', 'sitemap.xml'),
  ]
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return fs.readFileSync(p, 'utf-8')
    } catch (e) { /* next */ }
  }
  return null
}

// ───────────────────────────────────────────────
// sitemap 빌드
// ───────────────────────────────────────────────
function buildSitemap({ posts, partners, pages, categories }) {
  const today = todayISO()
  const urls = []

  const pageList = (pages && pages.length) ? pages : STATIC_PAGES
  const blogCats = (categories && categories.blog && categories.blog.length) ? categories.blog : BLOG_CATEGORIES
  const qaCats   = (categories && categories.qa   && categories.qa.length)   ? categories.qa   : QA_CATEGORIES

  // 1) 고정 페이지
  for (const p of pageList) {
    urls.push(urlBlock({
      loc: `${SITE}${p.path}`,
      lastmod: (p.updatedAt || '').slice(0, 10) || today,
      changefreq: p.changefreq,
      priority: p.priority,
    }))
  }

  // 2) 블로그 카테고리
  for (const c of blogCats) {
    urls.push(urlBlock({
      loc: `${SITE}/blog?category=${c}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.75',
    }))
  }

  // 3) Q&A 카테고리
  for (const c of qaCats) {
    urls.push(urlBlock({
      loc: `${SITE}/qa?category=${c}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.70',
    }))
  }

  // 4) 블로그 글 (Supabase 동적)
  for (const post of posts) {
    if (!post?.slug) continue
    const lastmod = (post.updated_at || post.created_at || '').slice(0, 10) || today
    urls.push(urlBlock({
      loc: `${SITE}/blog/${post.slug}`,
      lastmod,
      changefreq: 'weekly',
      priority: '0.80',
    }))
  }

  // 5) 파트너 명함 페이지
  for (const p of partners) {
    const phone = (p.slug || p.phone || '').replace(/\D/g, '')
    if (!phone) continue
    if (p.is_active === false) continue
    urls.push(urlBlock({
      loc: `${SITE}/p/${phone}`,
      lastmod: (p.updated_at || p.createdAt || '').slice(0, 10) || today,
      changefreq: 'monthly',
      priority: '0.50',
    }))
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n\n')}
</urlset>
`
}

// ───────────────────────────────────────────────
// 핸들러
// ───────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  // CDN 30분 캐시, 갱신은 1시간 stale-while-revalidate
  res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=1800, stale-while-revalidate=3600')

  try {
    const [posts, partnersResult, pages, categories] = await Promise.all([
      fetchPublishedPosts(),
      fetchPartners(),
      fetchPagesFromTable(),
      fetchCategoriesFromTable(),
    ])
    const partners = partnersResult?.list || []
    const partnersSource = partnersResult?.source || 'empty'
    const pagesSource = pages ? 'table' : 'constant'
    const categoriesSource = categories ? 'table' : 'constant'

    // posts가 비어 있으면 Supabase 장애로 판단 → 정적 fallback
    if (!posts || posts.length === 0) {
      const fb = readStaticFallback()
      if (fb) {
        res.setHeader('X-Sitemap-Source', 'static-fallback')
        return res.status(200).send(fb)
      }
    }

    const xml = buildSitemap({ posts: posts || [], partners, pages, categories })
    res.setHeader('X-Sitemap-Source', 'dynamic')
    res.setHeader('X-Sitemap-Posts', String((posts || []).length))
    res.setHeader('X-Sitemap-Partners', String(partners.length))
    res.setHeader('X-Sitemap-Partners-Source', partnersSource)
    res.setHeader('X-Sitemap-Pages-Source', pagesSource)
    res.setHeader('X-Sitemap-Categories-Source', categoriesSource)
    return res.status(200).send(xml)
  } catch (e) {
    console.error('[sitemap] fatal:', e?.message || e)
    const fb = readStaticFallback()
    if (fb) {
      res.setHeader('X-Sitemap-Source', 'static-fallback-error')
      return res.status(200).send(fb)
    }
    // 최후 수단: 최소 sitemap (메인 1개만이라도)
    res.setHeader('X-Sitemap-Source', 'minimal-fallback')
    return res.status(200).send(
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc><lastmod>${todayISO()}</lastmod></url>
</urlset>
`
    )
  }
}
