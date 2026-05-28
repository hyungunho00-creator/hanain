import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { LOCAL_FUNCTIONAL_INGREDIENT_POSTS } from '../src/data/localFunctionalIngredientPosts.js'
import { LOCAL_CATEGORY_BLOG_POSTS } from '../src/data/localCategoryBlogPosts.js'
import { LOCAL_SEO_EXPANSION_POSTS } from '../src/data/localSeoExpansionPosts.js'
import { FUNCTIONAL_INGREDIENT_CONFIGS } from '../src/data/insights/functionalIngredientConfigs.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const site = 'https://phlorotannin.com'
const sitemapPath = path.join(root, 'public', 'sitemap.xml')
const rssPath = path.join(root, 'public', 'rss.xml')

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

function toAbsoluteUrl(url) {
  if (!url) return `${site}/og-image.png`
  if (/^https?:\/\//i.test(url)) return url
  return url.startsWith('/') ? `${site}${url}` : `${site}/${url}`
}

function rfc822(dateLike) {
  const dt = dateLike ? new Date(dateLike) : new Date()
  return Number.isNaN(dt.getTime()) ? new Date().toUTCString() : dt.toUTCString()
}

function rssItemXml(post) {
  const link = `${site}/blog/${post.slug}`
  const category = esc(post.category || 'general')
  const excerpt = String(post.excerpt || '').replaceAll(']]>', ']]&gt;').slice(0, 300)
  return `  <item>
    <title>${esc(post.title)}</title>
    <link>${esc(link)}</link>
    <description><![CDATA[${excerpt}]]></description>
    <category>${category}</category>
    <pubDate>${rfc822(post.created_at || post.published_at)}</pubDate>
    <guid isPermaLink="true">${esc(link)}</guid>
    <enclosure url="${esc(toAbsoluteUrl(post.og_image))}" type="image/png"/>
  </item>`
}

function updateSitemap() {
  let xml = fs.readFileSync(sitemapPath, 'utf8')
  const localBlogPosts = [
    ...LOCAL_FUNCTIONAL_INGREDIENT_POSTS,
    ...LOCAL_CATEGORY_BLOG_POSTS,
    ...LOCAL_SEO_EXPANSION_POSTS,
  ]
  const routes = [
    ...localBlogPosts.map((post) => ({
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

function updateRss() {
  let xml = fs.readFileSync(rssPath, 'utf8')
  const localBlogPosts = [
    ...LOCAL_FUNCTIONAL_INGREDIENT_POSTS,
    ...LOCAL_CATEGORY_BLOG_POSTS,
    ...LOCAL_SEO_EXPANSION_POSTS,
  ]
    .slice()
    .sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')))

  const additions = localBlogPosts
    .filter((post) => !xml.includes(`<guid isPermaLink="true">${site}/blog/${post.slug}</guid>`))
    .map(rssItemXml)

  if (additions.length) {
    xml = xml.replace(/\s*<\/channel>\s*<\/rss>\s*$/u, `\n${additions.join('\n')}\n  </channel>\n</rss>\n`)
    fs.writeFileSync(rssPath, xml, 'utf8')
  }

  console.log(`[update-static-routes] rss additions=${additions.length}`)
}

updateSitemap()
updateRss()
