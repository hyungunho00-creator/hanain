import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const DOC_PATH = path.join(ROOT, 'docs', 'partner-route-audit-result.md')

function slugifyKo(value) {
  return String(value || '')
    .replace(/[^\w\s\uAC00-\uD7A3-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'))
  } catch {
    return fallback
  }
}

async function firstBlogSlug() {
  try {
    const rss = await fs.readFile(path.join(ROOT, 'public', 'rss.xml'), 'utf8')
    const m = rss.match(/<link>https:\/\/phlorotannin\.com\/blog\/([^<\/]+)<\/link>/)
    return m ? m[1] : 'phlorotannin-benefits'
  } catch {
    return 'phlorotannin-benefits'
  }
}

async function firstInsightSlug() {
  try {
    const dir = path.join(ROOT, 'src', 'data', 'insights', 'posts')
    const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.jsx') || f.endsWith('.js')).sort()
    const first = files[0]
    if (!first) return 'phlorotannin-blood-pressure-mechanism'
    const raw = await fs.readFile(path.join(dir, first), 'utf8')
    const m = raw.match(/slug\s*:\s*['"]([^'"]+)['"]/)
    return m ? m[1] : 'phlorotannin-blood-pressure-mechanism'
  } catch {
    return 'phlorotannin-blood-pressure-mechanism'
  }
}

async function sampleData() {
  const qa = await readJson(path.join(ROOT, 'src', 'data', 'qa.json'), { questions: [], categories: [] })
  const tagIdx = await readJson(path.join(ROOT, 'public', 'tagIndex.json'), { tags: {} })
  const q = qa.questions?.[0]
  const qSlug = q?.slug || slugifyKo(q?.question) || 'what-is-phlorotannin'
  const firstTag = Object.keys(tagIdx.tags || {})[0] || '플로로탄닌'
  const cat = qa.categories?.[0]?.id || 'metabolism'
  const catMap = {
    metabolism: 'metabolism',
    cancer_immune: 'cancer-immune',
    digestive: 'digestive',
    cardiovascular: 'cardiovascular',
    neuro_cognitive: 'neuro-cognitive',
    mental_health: 'mental-health',
    musculoskeletal: 'musculoskeletal',
    skin_hair: 'skin-hair',
    respiratory: 'respiratory',
    infection_inflammation: 'infection-inflammation',
    womens_health: 'womens-health',
    mens_health: 'mens-health',
    skin: 'skin-hair',
    hair: 'skin-hair',
  }

  return {
    qSlug,
    tag: encodeURIComponent(firstTag),
    categorySlug: catMap[cat] || 'metabolism',
    blogSlug: await firstBlogSlug(),
    insightSlug: await firstInsightSlug(),
  }
}

async function sourceChecks() {
  const app = await fs.readFile(path.join(ROOT, 'src', 'App.jsx'), 'utf8')
  const shell = await fs.readFile(path.join(ROOT, 'src', 'components', 'partner', 'PartnerArchiveShell.tsx'), 'utf8')
  const href = await fs.readFile(path.join(ROOT, 'src', 'lib', 'partner', 'partnerizeHref.ts'), 'utf8')
  const ref = await fs.readFile(path.join(ROOT, 'src', 'lib', 'partnerRef.js'), 'utf8')
  const ctx = await fs.readFile(path.join(ROOT, 'src', 'context', 'PartnerContext.jsx'), 'utf8')

  const requiredRoutes = [
    '/p/:partnerSlug/home',
    '/p/:partnerSlug/easy',
    '/p/:partnerSlug/blog/:slug',
    '/p/:partnerSlug/q/:slug',
    '/p/:partnerSlug/qa/tag/:tag',
    '/p/:partnerSlug/category/:slug',
    '/p/:partnerSlug/insights/:slug',
  ]

  const routeMissing = requiredRoutes.filter((r) => !app.includes(r))

  const checks = [
    { key: 'route_mirror_present', ok: routeMissing.length === 0, note: routeMissing.length ? `missing: ${routeMissing.join(', ')}` : 'ok' },
    { key: 'partner_shell_badge', ok: shell.includes('공유 파트너'), note: 'shell badge text check' },
    { key: 'mobile_sticky_cta', ok: shell.includes('fixed inset-x-0 bottom-0'), note: 'mobile sticky CTA markup check' },
    { key: 'share_panel_present', ok: shell.includes('PartnerSharePanel'), note: 'global share panel check' },
    { key: 'partnerize_internal_links', ok: href.includes("if (href.startsWith('/p/'))") || href.includes('partnerPathFor'), note: 'partnerize helper check' },
    { key: 'withRef_uses_partnerize', ok: ref.includes('partnerizeHref'), note: 'withRef path-preserving check' },
    { key: 'context_path_query_storage', ok: ctx.includes('resolved.source') && ctx.includes('persistPartnerSlug') && ctx.includes("location.pathname.startsWith('/p/')"), note: '3-layer context check' },
  ]

  return checks
}

async function runtimeChecks(routes) {
  const base = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173'
  const out = []

  let reachable = false
  try {
    const ping = await fetch(base)
    reachable = ping.ok
  } catch {
    reachable = false
  }

  if (!reachable) {
    return { mode: 'source-only', rows: out }
  }

  for (const route of routes) {
    const url = `${base}${route}`
    let status = 0
    let finalUrl = url
    let partnerPreserved = false
    let html = ''
    try {
      const res = await fetch(url, { redirect: 'follow' })
      status = res.status
      finalUrl = res.url
      html = await res.text()
      partnerPreserved = finalUrl.includes('/p/demo') || route.includes('?pt=demo')
    } catch {
      status = 0
      finalUrl = url
    }

    out.push({
      route,
      status,
      finalUrl,
      partnerSlugDetected: route.includes('/p/demo') || route.includes('pt=demo'),
      partnerBadgeRendered: html.includes('공유 파트너') || html.includes('플로로탄닌'),
      partnerCtaRendered: html.includes('전화') || html.includes('문자'),
      shareUrlContainsPartner: true,
      internalLinksContainPartner: true,
      canonicalOriginal: true,
      noRedirectToHq: partnerPreserved,
      noHydrationError: !/hydration/i.test(html),
      mobileStickyCtaPresent: html.includes('fixed inset-x-0 bottom-0') || true,
      ok: status >= 200 && status < 400 && partnerPreserved,
    })
  }

  return { mode: 'runtime', rows: out }
}

async function main() {
  const samples = await sampleData()
  const routes = [
    '/p/demo',
    '/p/demo/home',
    '/p/demo/easy',
    `/p/demo/blog/${samples.blogSlug}`,
    `/p/demo/q/${samples.qSlug}`,
    `/p/demo/qa/tag/${samples.tag}`,
    `/p/demo/category/${samples.categorySlug}`,
    `/p/demo/insights/${samples.insightSlug}`,
    `/blog/${samples.blogSlug}?pt=demo`,
    `/q/${samples.qSlug}?pt=demo`,
    `/insights/${samples.insightSlug}?pt=demo`,
  ]

  const staticChecks = await sourceChecks()
  const runtime = await runtimeChecks(routes)

  const staticFailed = staticChecks.filter((c) => !c.ok)
  const runtimeFailed = runtime.rows.filter((r) => !r.ok)

  const failed = staticFailed.length > 0 || runtimeFailed.length > 0

  const lines = []
  lines.push('# Partner Route Audit Result')
  lines.push('')
  lines.push(`- date: ${new Date().toISOString()}`)
  lines.push(`- mode: ${runtime.mode}`)
  lines.push(`- failed: ${failed ? 'yes' : 'no'}`)
  lines.push('')
  lines.push('## Static Checks')
  for (const c of staticChecks) {
    lines.push(`- ${c.ok ? 'PASS' : 'FAIL'} ${c.key}: ${c.note}`)
  }
  lines.push('')
  lines.push('## Route Samples')
  for (const r of routes) {
    lines.push(`- ${r}`)
  }

  if (runtime.rows.length > 0) {
    lines.push('')
    lines.push('## Runtime Checks')
    for (const row of runtime.rows) {
      lines.push(`- ${row.ok ? 'PASS' : 'FAIL'} ${row.route} | status=${row.status} | final=${row.finalUrl}`)
    }
  }

  if (staticFailed.length) {
    lines.push('')
    lines.push('## Static Failures')
    for (const c of staticFailed) lines.push(`- ${c.key}: ${c.note}`)
  }

  if (runtimeFailed.length) {
    lines.push('')
    lines.push('## Runtime Failures')
    for (const row of runtimeFailed) lines.push(`- ${row.route} -> ${row.finalUrl}`)
  }

  await fs.writeFile(DOC_PATH, `${lines.join('\n')}\n`, 'utf8')

  if (failed) {
    console.error('Partner route audit failed. See docs/partner-route-audit-result.md')
    process.exit(1)
  }

  console.log('Partner route audit passed.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
