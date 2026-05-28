import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { LOCAL_FUNCTIONAL_INGREDIENT_POSTS } from '../src/data/localFunctionalIngredientPosts.js'
import { FUNCTIONAL_INGREDIENT_CONFIGS } from '../src/data/insights/functionalIngredientConfigs.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const site = 'https://phlorotannin.com'
const sitemapPath = path.join(root, 'public', 'sitemap.xml')

function esc(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function routeXml({ loc, title, image, priority = '0.84' }) {
  const imageBlock = image
    ? `
    <image:image>
      <image:loc>${esc(site + image)}</image:loc>
      <image:title>${esc(title)}</image:title>
    </image:image>`
    : ''

  return `  <url>
    <loc>${esc(site + loc)}</loc>
    <lastmod>2026-05-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>${imageBlock}
    <xhtml:link rel="alternate" hreflang="ko" href="${esc(site + loc)}"/>
  </url>`
}

function updateSitemap() {
  let xml = fs.readFileSync(sitemapPath, 'utf8')
  const routes = [
    ...LOCAL_FUNCTIONAL_INGREDIENT_POSTS.map((post) => ({
      loc: `/blog/${post.slug}`,
      title: post.title,
      image: post.og_image,
      priority: '0.86',
    })),
    ...FUNCTIONAL_INGREDIENT_CONFIGS.map((post) => ({
      loc: `/insights/${post.slug}`,
      title: post.title,
      image: post.heroImage,
      priority: '0.84',
    })),
  ]

  const additions = routes
    .filter(({ loc }) => !xml.includes(`<loc>${site}${loc}</loc>`))
    .map(routeXml)

  if (additions.length) {
    xml = xml.replace(/\s*<\/urlset>\s*$/u, `\n${additions.join('\n')}\n\n</urlset>\n`)
    fs.writeFileSync(sitemapPath, xml, 'utf8')
  }

  console.log(`[update-static-routes] sitemap additions=${additions.length}`)
}

updateSitemap()
