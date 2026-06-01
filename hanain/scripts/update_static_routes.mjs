import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { LOCAL_FUNCTIONAL_INGREDIENT_POSTS } from '../src/data/localFunctionalIngredientPosts.js'
import { LOCAL_CATEGORY_BLOG_POSTS } from '../src/data/localCategoryBlogPosts.js'
import { LOCAL_TREND_BLOG_POSTS } from '../src/data/localTrendBlogPosts.js'
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

function routeXml({ loc, title, image, priority = '0.84', lastmod = '2026-05-30' }) {
  const imageBlock = image
    ? `
    <image:image>
      <image:loc>${esc(site + image)}</image:loc>
      <image:title>${esc(title)}</image:title>
    </image:image>`
    : ''

  return `  <url>
    <loc>${esc(site + loc)}</loc>
    <lastmod>${esc(lastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>${imageBlock}
    <xhtml:link rel="alternate" hreflang="ko" href="${esc(site + loc)}"/>
  </url>`
}

function removeSitemapUrl(xml, loc) {
  const marker = `<loc>${esc(site + loc)}</loc>`
  return xml.replace(/\s*<url>[\s\S]*?<\/url>/gu, (block) => (block.includes(marker) ? '' : block))
}

function removeRssItem(xml, slug) {
  const marker = `<guid isPermaLink="true">${esc(`${site}/blog/${slug}`)}</guid>`
  return xml.replace(/\s*<item>[\s\S]*?<\/item>/gu, (block) => (block.includes(marker) ? '' : block))
}

function toAbsoluteUrl(url) {
  if (!url) return `${site}/og-image.png`
  if (/^https?:\/\//i.test(url)) return url
  return url.startsWith('/') ? `${site}${url}` : `${site}/${url}`
}

function mimeForUrl(url) {
  const clean = String(url || '').split('?')[0].split('#')[0]
  const ext = clean.includes('.') ? clean.split('.').pop().toLowerCase() : ''
  return ({
    avif: 'image/avif',
    gif: 'image/gif',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    webp: 'image/webp',
  })[ext] || 'image/png'
}

function rfc822(dateLike) {
  const dt = dateLike ? new Date(dateLike) : new Date()
  return Number.isNaN(dt.getTime()) ? new Date().toUTCString() : dt.toUTCString()
}

function rssItemXml(post) {
  const link = `${site}/blog/${post.slug}`
  const category = esc(post.category || 'general')
  const excerpt = String(post.excerpt || '').replaceAll(']]>', ']]&gt;').slice(0, 300)
  const imageUrl = toAbsoluteUrl(post.og_image)
  return `  <item>
    <title>${esc(post.title)}</title>
    <link>${esc(link)}</link>
    <description><![CDATA[${excerpt}]]></description>
    <category>${category}</category>
    <pubDate>${rfc822(post.created_at || post.published_at)}</pubDate>
    <guid isPermaLink="true">${esc(link)}</guid>
    <enclosure url="${esc(imageUrl)}" type="${esc(mimeForUrl(imageUrl))}"/>
  </item>`
}

function updateSitemap() {
  let xml = fs.readFileSync(sitemapPath, 'utf8')
  const localBlogPosts = [
    ...LOCAL_TREND_BLOG_POSTS,
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
      lastmod: String(post.updated_at || post.created_at || '2026-05-30').slice(0, 10),
    })),
    ...FUNCTIONAL_INGREDIENT_CONFIGS.map((post) => ({
      loc: `/insights/${post.slug}`,
      title: post.title,
      image: post.heroImage,
      priority: '0.84',
      lastmod: '2026-05-30',
    })),
  ]

  for (const route of routes) {
    xml = removeSitemapUrl(xml, route.loc)
  }

  const additions = routes.map(routeXml)

  if (additions.length) {
    xml = xml.replace(/\s*<\/urlset>\s*$/u, `\n${additions.join('\n')}\n\n</urlset>\n`)
    fs.writeFileSync(sitemapPath, xml, 'utf8')
  }

  console.log(`[update-static-routes] sitemap upserts=${additions.length}`)
}

function updateRss() {
  let xml = fs.readFileSync(rssPath, 'utf8')
  const localBlogPosts = [
    ...LOCAL_TREND_BLOG_POSTS,
    ...LOCAL_FUNCTIONAL_INGREDIENT_POSTS,
    ...LOCAL_CATEGORY_BLOG_POSTS,
    ...LOCAL_SEO_EXPANSION_POSTS,
  ]
    .slice()
    .sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')))

  const recentLocalBlogPosts = localBlogPosts.slice(0, 80)

  for (const post of recentLocalBlogPosts) {
    xml = removeRssItem(xml, post.slug)
  }

  const additions = recentLocalBlogPosts.map(rssItemXml)

  if (additions.length) {
    xml = xml.replace(/\s*<\/channel>\s*<\/rss>\s*$/u, `\n${additions.join('\n')}\n  </channel>\n</rss>\n`)
    fs.writeFileSync(rssPath, xml, 'utf8')
  }

  console.log(`[update-static-routes] rss upserts=${additions.length}`)
}

updateSitemap()
updateRss()
