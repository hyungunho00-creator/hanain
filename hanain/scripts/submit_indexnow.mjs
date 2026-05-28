import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SITEMAP_PATH = path.join(ROOT, 'public', 'sitemap.xml')
const KEY_PATH = path.join(ROOT, 'public', 'indexnow.txt')
const REPORT_DIR = path.join(ROOT, 'reports')

const HOST = 'phlorotannin.com'
const KEY = fs.readFileSync(KEY_PATH, 'utf8').trim()
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
]

function nowStamp() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
}

function getUrlsFromSitemap(xml) {
  const out = []
  const re = /<loc>([^<]+)<\/loc>/g
  let m = re.exec(xml)
  while (m) {
    const url = String(m[1] || '').trim()
    if (url.startsWith('https://phlorotannin.com/')) out.push(url)
    m = re.exec(xml)
  }
  return [...new Set(out)]
}

async function submitToEndpoint(endpoint, urls) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })
  const text = await res.text()
  return {
    endpoint,
    status: res.status,
    ok: res.ok,
    body: text.slice(0, 1000),
  }
}

async function main() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    throw new Error(`Missing sitemap: ${SITEMAP_PATH}`)
  }
  if (!KEY || !/^[0-9a-f]{32}$/i.test(KEY)) {
    throw new Error('Invalid IndexNow key in public/indexnow.txt')
  }

  const xml = fs.readFileSync(SITEMAP_PATH, 'utf8')
  const urls = getUrlsFromSitemap(xml)
  const chunkSize = 10000
  const chunks = []
  for (let i = 0; i < urls.length; i += chunkSize) {
    chunks.push(urls.slice(i, i + chunkSize))
  }

  const results = []
  for (const endpoint of ENDPOINTS) {
    for (let i = 0; i < chunks.length; i += 1) {
      const item = await submitToEndpoint(endpoint, chunks[i])
      results.push({ ...item, chunk: i + 1, chunkSize: chunks[i].length })
    }
  }

  fs.mkdirSync(REPORT_DIR, { recursive: true })
  const reportPath = path.join(REPORT_DIR, `indexnow_submit_${nowStamp()}.json`)
  const report = {
    generatedAt: new Date().toISOString(),
    host: HOST,
    keyLocation: KEY_LOCATION,
    totalUrls: urls.length,
    endpoints: ENDPOINTS,
    results,
  }
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8')

  const okCount = results.filter((r) => r.ok).length
  console.log(JSON.stringify({
    totalUrls: urls.length,
    submissions: results.length,
    ok: okCount,
    fail: results.length - okCount,
    reportPath,
  }))
}

main().catch((err) => {
  console.error(err?.stack || String(err))
  process.exit(1)
})
