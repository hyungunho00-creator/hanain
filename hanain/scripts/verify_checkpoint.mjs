const SITE = 'https://phlorotannin.com'

const EXPECTED = {
  sitemapTotal: 2821,
  qCount: 1823,
  tagCount: 223,
  blogCount: 572,
  insightCount: 172,
  requiredBundleSlugs: [
    'glp1-era-protein-fiber-phlorotannin-checklist-2026',
    'glp1-muscle-loss-protein-resistance-training-2026',
    'masld-fatty-liver-insulin-resistance-phlorotannin-2026',
    'menopause-sleep-hot-flash-metabolic-health-gamtae-2026',
    'oral-microbiome-gum-inflammation-systemic-health-2026',
    'wearable-vo2max-cardio-fitness-longevity-record-2026',
    'energy-drink-preworkout-caffeine-sleep-arrhythmia-safety-2026',
    'berberine-blood-sugar-supplement-safety-record-2026',
    'glp1-hair-loss-telogen-effluvium-protein-ferritin-2026',
    'menopause-hormone-therapy-label-change-risk-conversation-2026',
    'testosterone-therapy-low-libido-blood-pressure-monitoring-2026',
    'measles-mmr-vitamin-a-outbreak-check-2026',
    'rsv-vaccine-older-adults-risk-record-2026',
    'glp1-knee-osteoarthritis-muscle-bone-record-2026',
    'hearing-loss-dementia-risk-hearing-aid-record-2026',
    'screen-time-sleep-anxiety-digital-behavior-record-2026',
    'sunscreen-vitamin-d-uv-index-myth-check-2026',
    'cgm-prediabetes-a1c-postprandial-spike-record-2026',
    'diet-microbiome-ibs-upf-fermented-food-record-2026',
    'dyslipidemia-prevent-ldl-apob-lpa-risk-record-2026',
  ],
  draftSlug: 'ecklonia-cava-respiratory-health-clinical-trial-2026',
}

function readHead(html, name) {
  if (name === 'canonical') {
    return (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1] || ''
  }
  if (name === 'robots') {
    return (html.match(/<meta name="robots" content="([^"]+)"/) || [])[1] || ''
  }
  if (name === 'title') {
    return (html.match(/<title[^>]*>([^<]+)/) || [])[1] || ''
  }
  return ''
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function fetchText(url, options = {}) {
  const response = await fetch(url, options)
  const text = await response.text()
  return { response, text }
}

async function checkPage(path, expected) {
  const url = `${SITE}${path}`
  const { response, text } = await fetchText(url, { redirect: 'manual' })
  const actual = {
    status: response.status,
    source: response.headers.get('x-seo-source') || '',
    xRobots: response.headers.get('x-robots-tag') || '',
    canonical: readHead(text, 'canonical'),
    robots: readHead(text, 'robots'),
    title: readHead(text, 'title'),
  }

  assert(actual.status === (expected.status || 200), `${path}: status ${actual.status}`)
  if (expected.source) assert(actual.source === expected.source, `${path}: source ${actual.source}`)
  if (expected.xRobots) assert(actual.xRobots === expected.xRobots, `${path}: X-Robots-Tag ${actual.xRobots}`)
  if (expected.canonical) assert(actual.canonical === expected.canonical, `${path}: canonical ${actual.canonical}`)
  if (expected.robotsIncludes) assert(actual.robots.includes(expected.robotsIncludes), `${path}: robots ${actual.robots}`)

  return actual
}

async function main() {
  const results = []

  const { response: sitemapResponse, text: sitemap } = await fetchText(`${SITE}/sitemap.xml`)
  assert(sitemapResponse.status === 200, `sitemap status ${sitemapResponse.status}`)
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  const duplicates = urls.length - new Set(urls).size
  const noindexLike = urls.filter((url) =>
    /\/admin|\/api|\/question\/write|\/community\/write|\/community\/edit|[?&](q|category|ref|utm_)/.test(url) ||
    /phlorotannin\.com\/p\/[^/]+\//.test(url)
  )
  assert(urls.length === EXPECTED.sitemapTotal, `sitemap total ${urls.length}`)
  assert(duplicates === 0, `sitemap duplicates ${duplicates}`)
  assert(noindexLike.length === 0, `sitemap noindex-like URLs ${noindexLike.length}`)
  assert(!urls.some((url) => url.includes(EXPECTED.draftSlug)), 'draft slug appears in sitemap')
  assert(urls.filter((url) => url.includes('/q/')).length === EXPECTED.qCount, 'Q&A URL count changed')
  assert(urls.filter((url) => url.includes('/qa/tag/')).length === EXPECTED.tagCount, 'Q&A tag URL count changed')
  assert(urls.filter((url) => url.includes('/blog/')).length === EXPECTED.blogCount, 'blog URL count changed')
  assert(urls.filter((url) => url.includes('/insights/')).length === EXPECTED.insightCount, 'insight URL count changed')
  results.push(`sitemap ok: ${urls.length} URLs`)

  await checkPage('/qa?category=cancer_immune', {
    xRobots: 'noindex,nofollow',
    canonical: `${SITE}/qa`,
    robotsIncludes: 'noindex',
  })
  results.push('qa filtered noindex ok')

  await checkPage('/p/test/home', {
    source: 'partner-archive:static',
    xRobots: 'noindex,follow',
    canonical: `${SITE}/home`,
    robotsIncludes: 'noindex',
  })
  results.push('partner archive canonical ok')

  await checkPage('/blog/masld-fatty-liver-insulin-resistance-phlorotannin-2026', {
    source: 'posts-table',
    canonical: `${SITE}/blog/masld-fatty-liver-insulin-resistance-phlorotannin-2026`,
    robotsIncludes: 'index',
  })
  results.push('Supabase blog post route ok')

  await checkPage(`/blog/${EXPECTED.draftSlug}`, {
    source: 'blog-not-found',
    xRobots: 'noindex,nofollow',
    canonical: `${SITE}/blog/${EXPECTED.draftSlug}`,
    robotsIncludes: 'noindex',
  })
  results.push('draft post noindex ok')

  const { response: wwwResponse } = await fetchText('https://www.phlorotannin.com/home', { redirect: 'manual' })
  assert(wwwResponse.status === 307, `www redirect status ${wwwResponse.status}`)
  assert(wwwResponse.headers.get('location') === `${SITE}/home`, `www redirect ${wwwResponse.headers.get('location')}`)
  results.push('www redirect ok')

  const { text: blogHtml } = await fetchText(`${SITE}/blog`)
  const scripts = [...blogHtml.matchAll(/<script[^>]+src="([^"]+\.js)"/g)]
    .map((match) => new URL(match[1], SITE).href)
  assert(scripts.length > 0, 'no JS bundle found on /blog')
  const bundleTexts = await Promise.all(scripts.map(async (script) => (await fetchText(script)).text))
  const bundle = bundleTexts.join('\n')
  for (const slug of EXPECTED.requiredBundleSlugs) {
    assert(bundle.includes(slug), `required local post missing from production bundle: ${slug}`)
  }
  results.push(`production bundle local posts ok: ${EXPECTED.requiredBundleSlugs.length} slugs`)

  console.log(`checkpoint ok\n- ${results.join('\n- ')}`)
}

main().catch((error) => {
  console.error(`checkpoint failed: ${error.message}`)
  process.exit(1)
})
