// Final test using Browser.setDownloadBehavior (newer CDP API works better in headless)
const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

const DOWNLOAD_DIR = path.resolve(__dirname, 'flyer_test_out');
for (const f of fs.readdirSync(DOWNLOAD_DIR)) {
  if (f.includes('실전교본')) fs.unlinkSync(path.join(DOWNLOAD_DIR, f))
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  // Use Browser-level download behavior (works better)
  const bClient = await browser.target().createCDPSession()
  await bClient.send('Browser.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: DOWNLOAD_DIR,
    eventsEnabled: true,
  })

  const page = await browser.newPage()
  page.on('console', msg => {
    const t = msg.text()
    if (t.includes('google-analytics')||t.includes('DOM]')) return
    console.log('[' + msg.type() + ']', t.slice(0, 500))
  })
  page.on('pageerror', err => console.log('[pageerror]', err.message))
  page.on('dialog', async d => { console.log('[DIALOG]', d.message()); await d.dismiss() })

  await page.setViewport({ width: 1280, height: 900 })
  await page.goto('http://localhost:4173/inforoom', { waitUntil: 'networkidle2', timeout: 30000 })
  await page.waitForSelector('input[type="password"]', { timeout: 10000 })
  await page.type('input[type="password"]', '123456789')
  await page.keyboard.press('Enter')
  await page.waitForFunction(() => document.body.innerText.includes('파트너 실전 교본'), { timeout: 10000 })

  await page.evaluate(() => {
    const allDivs = Array.from(document.querySelectorAll('div'))
    let best = null
    for (const c of allDivs) {
      if (c.innerText && c.innerText.includes('파트너 실전 교본') && c.innerText.includes('A4 약 25~30장')) {
        if (!best || c.innerText.length < best.innerText.length) best = c
      }
    }
    const btns = Array.from(best.querySelectorAll('button'))
    for (const b of btns) if (b.innerText.includes('인쇄용 PDF')) { b.click(); break }
  })

  // Wait up to 60s for PDF file
  const target = path.join(DOWNLOAD_DIR, '플로로탄닌_파트너_실전교본.pdf')
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 1000))
    if (fs.existsSync(target)) {
      const stat = fs.statSync(target)
      if (stat.size > 50000) {
        // wait for stable size
        await new Promise(r => setTimeout(r, 2000))
        const stat2 = fs.statSync(target)
        if (stat2.size === stat.size) {
          console.log(`✓ PDF saved: ${stat2.size} bytes after ~${i}s`)
          break
        }
      }
    }
  }

  if (!fs.existsSync(target)) console.log('✗ PDF NOT saved')

  await browser.close()
})().catch(e => { console.error(e); process.exit(1) })
