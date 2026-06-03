const SITE = 'https://phlorotannin.com'

const EXPECTED = {
  sitemapTotal: 2989,
  qCount: 1874,
  tagCount: 238,
  blogCount: 623,
  insightCount: 223,
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
    'mced-blood-test-cancer-screening-guideline-record-2026',
    'endometriosis-clinical-diagnosis-acog-record-2026',
    'prostate-psa-mri-screening-aua-record-2026',
    'oral-minoxidil-hair-loss-blood-pressure-safety-record-2026',
    'cleaner-indoor-air-respiratory-virus-ventilation-record-2026',
    'h5n1-bird-flu-raw-milk-exposure-monitoring-record-2026',
    'youth-mental-health-sleep-screen-time-record-2026',
    'creatine-resistance-training-sarcopenia-older-adults-record-2026',
    'bemotrizinol-sunscreen-uva-broad-spectrum-record-2026',
    'rosemary-oil-hair-loss-scalp-irritation-record-2026',
    'pcos-glp1-insulin-resistance-pregnancy-planning-record-2026',
    'phthalates-male-fertility-semen-quality-exposure-record-2026',
    'indoor-co2-ventilation-hepa-respiratory-virus-record-2026',
    'norovirus-handwashing-bleach-hydration-outbreak-record-2026',
    'fermented-food-probiotics-gut-microbiome-safety-record-2026',
    'ai-chatbot-mental-health-crisis-safety-record-2026',
    'weighted-vest-rucking-bone-joint-safety-record-2026',
    'cold-plunge-sauna-blood-pressure-arrhythmia-safety-record-2026',
    'finasteride-dutasteride-hair-loss-safety-warning-record-2026',
    'hpv-self-collection-cervical-screening-home-test-record-2026',
    'erectile-dysfunction-cardiovascular-risk-blood-pressure-record-2026',
    'pollen-thunderstorm-asthma-action-plan-record-2026',
    'tick-bite-lyme-alpha-gal-syndrome-summer-record-2026',
    'melasma-tinted-sunscreen-visible-light-iron-oxide-record-2026',
    'pickleball-overuse-achilles-wrist-injury-prevention-record-2026',
    'teen-social-media-sleep-mental-health-boundary-record-2026',
    'glp1-compounded-dosing-error-gi-side-effect-record-2026',
    'exosome-scalp-injection-hair-loss-fda-safety-record-2026',
    'dense-breast-mammogram-notification-supplemental-screening-record-2026',
    'testosterone-therapy-fertility-sperm-count-record-2026',
    'lpa-once-lifetime-test-family-heart-risk-record-2026',
    'alzheimers-blood-biomarker-memory-clinic-test-record-2026',
    'personalized-cancer-vaccine-ctdna-neoantigen-trial-record-2026',
    'respiratory-virus-vaccine-2025-2026-covid-flu-rsv-record-2026',
    'candida-auris-hospital-infection-antifungal-resistance-record-2026',
    'home-led-red-light-mask-fda-cleared-skin-safety-record-2026',
    'knee-osteoarthritis-prp-injection-conservative-care-record-2026',
    'psychological-self-help-digital-burnout-support-record-2026',
    'at-home-gut-microbiome-test-dtc-stool-report-record-2026',
    'alopecia-areata-jak-inhibitor-boxed-warning-safety-record-2026',
    'menopause-hormone-therapy-boxed-warning-label-update-record-2026',
    'male-fertility-at-home-sperm-test-dna-fragmentation-record-2026',
    'wildfire-smoke-aqi-n95-asthma-copd-action-record-2026',
    'dengue-chikungunya-travel-fever-joint-pain-mosquito-record-2026',
    'tattoo-ink-contamination-skin-cancer-mole-monitoring-record-2026',
    'older-adult-fall-prevention-balance-medication-vision-record-2026',
    'loneliness-social-connection-health-risk-support-record-2026',
    'masld-fib4-liver-fibrosis-risk-stratification-record-2026',
    'renal-denervation-resistant-hypertension-home-bp-abpm-record-2026',
    'tia-mini-stroke-fast-warning-symptom-time-record-2026',
    'immune-checkpoint-inhibitor-side-effect-organ-inflammation-record-2026',
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
  assert(!urls.some((url) => url.includes('/shop-package')), 'private shop package appears in sitemap')
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

  await checkPage('/p/test/shop-package/salon-growth-660', {
    source: 'private-shop-package',
    xRobots: 'noindex,follow',
    canonical: `${SITE}/p/test/shop-package/salon-growth-660`,
    robotsIncludes: 'noindex',
  })
  results.push('private shop package noindex ok')

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
