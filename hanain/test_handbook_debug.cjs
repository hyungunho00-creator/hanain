// Debug: capture full console output during handbook PDF generation
const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

const DOWNLOAD_DIR = path.resolve(__dirname, 'flyer_test_out');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  const client = await page.target().createCDPSession()
  await client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: DOWNLOAD_DIR })
  page.on('console', msg => {
    const t = msg.text()
    if (t.includes('google-analytics') || t.includes('DOM]')) return
    console.log('[' + msg.type() + ']', t)
  })
  page.on('pageerror', err => console.log('[pageerror]', err.message, err.stack))
  page.on('requestfailed', req => console.log('[reqfail]', req.url(), req.failure().errorText))

  // catch alerts (since handbook handlers use alert on error)
  page.on('dialog', async dialog => {
    console.log('[DIALOG]', dialog.type(), '|', dialog.message())
    await dialog.dismiss()
  })

  await page.setViewport({ width: 1280, height: 900 })
  await page.goto('http://localhost:4173/inforoom', { waitUntil: 'networkidle2', timeout: 30000 })

  await page.waitForSelector('input[type="password"]', { timeout: 10000 })
  await page.type('input[type="password"]', '123456789')
  await page.keyboard.press('Enter')
  await page.waitForFunction(() => document.body.innerText.includes('파트너 실전 교본'), { timeout: 10000 })

  // Inject error capture
  await page.evaluate(() => {
    window.__handbookError = null
    window.addEventListener('error', (e) => { window.__handbookError = e.message + ' @ ' + e.filename + ':' + e.lineno })
    window.addEventListener('unhandledrejection', (e) => { window.__handbookError = 'PROMISE: ' + (e.reason?.message || e.reason) })
  })

  const clicked = await page.evaluate(() => {
    // find the smallest div that contains '실전교본' AND has buttons inside
    const allDivs = Array.from(document.querySelectorAll('div'))
    let best = null
    for (const c of allDivs) {
      if (c.innerText && c.innerText.includes('파트너 실전 교본') && c.innerText.includes('A4 약 25~30장')) {
        const btns = c.querySelectorAll('button')
        if (btns.length > 0) {
          if (!best || c.innerText.length < best.innerText.length) best = c
        }
      }
    }
    if (!best) return { ok: false, reason: 'no card found' }
    const btns = Array.from(best.querySelectorAll('button'))
    const btnLabels = btns.map(b => b.innerText)
    for (const b of btns) {
      if (b.innerText.includes('인쇄용 PDF')) {
        b.click()
        return { ok: true, btnLabels, picked: b.innerText }
      }
    }
    return { ok: false, reason: 'no PDF button', btnLabels }
  })
  console.log('clicked:', clicked)

  // Wait 60s, polling for errors / file existence / button state
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 1000))
    const status = await page.evaluate(() => ({
      err: window.__handbookError,
      busyText: Array.from(document.querySelectorAll('button')).map(b => b.innerText).filter(t => t.includes('생성') || t.includes('PDF')).slice(0, 3)
    }))
    if (status.err) { console.log('ERROR DETECTED:', status.err); break }
    if (i % 5 === 0) console.log(`[${i}s]`, JSON.stringify(status))
    const files = fs.readdirSync(DOWNLOAD_DIR).filter(f => f.includes('실전교본'))
    if (files.length) { console.log('FILE FOUND:', files); break }
  }

  await browser.close()
})().catch(e => { console.error(e); process.exit(1) })
