// Directly invoke window.__drawHandbookPages and report any error
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  page.on('console', msg => {
    const t = msg.text()
    if (t.includes('google-analytics') || t.includes('DOM]')) return
    console.log('[' + msg.type() + ']', t.slice(0, 800))
  })
  page.on('pageerror', err => console.log('[pageerror]', err.message, '\n', err.stack?.slice(0, 1500)))

  await page.setViewport({ width: 1280, height: 900 })
  await page.goto('http://localhost:4173/inforoom', { waitUntil: 'networkidle2', timeout: 30000 })
  await page.waitForSelector('input[type="password"]', { timeout: 10000 })
  await page.type('input[type="password"]', '123456789')
  await page.keyboard.press('Enter')
  await page.waitForFunction(() => document.body.innerText.includes('파트너 실전 교본'), { timeout: 10000 })

  // Wait for module to register (lazy import done at component mount)
  await page.waitForFunction(() => typeof window.__drawHandbookPages === 'function', { timeout: 10000 })
  console.log('drawHandbookPages exposed')

  const result = await page.evaluate(async () => {
    try {
      const blocks = window.__HANDBOOK_BLOCKS
      const start = performance.now()
      const canvases = await window.__drawHandbookPages(1)
      const elapsed = performance.now() - start
      return {
        ok: true,
        blockCount: blocks.length,
        pageCount: canvases.length,
        elapsedMs: Math.round(elapsed),
        firstCanvasW: canvases[0].width,
        firstCanvasH: canvases[0].height,
      }
    } catch (e) {
      return { ok: false, error: e?.message || String(e), stack: e?.stack?.slice(0, 1500) }
    }
  })
  console.log('RESULT:', JSON.stringify(result, null, 2))

  await browser.close()
})().catch(e => { console.error(e); process.exit(1) })
