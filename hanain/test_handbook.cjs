// Puppeteer test: download handbook PDF, verify multi-page output
const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

const DOWNLOAD_DIR = path.resolve(__dirname, 'flyer_test_out')
if (!fs.existsSync(DOWNLOAD_DIR)) fs.mkdirSync(DOWNLOAD_DIR, { recursive: true })
// clear old handbook files
for (const f of fs.readdirSync(DOWNLOAD_DIR)) {
  if (f.includes('실전교본') || f.includes('handbook')) fs.unlinkSync(path.join(DOWNLOAD_DIR, f))
}

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
    if (msg.type() === 'error' || /error|fail/i.test(t)) console.log('[console]', msg.type(), t)
  })
  page.on('pageerror', err => console.log('[pageerror]', err.message))

  await page.setViewport({ width: 1280, height: 900 })
  await page.goto('http://localhost:4173/inforoom', { waitUntil: 'networkidle2', timeout: 30000 })

  // Unlock
  await page.waitForSelector('input[type="password"]', { timeout: 10000 })
  await page.type('input[type="password"]', '123456789')
  await page.keyboard.press('Enter')

  // Wait for handbook section
  await page.waitForFunction(() => document.body.innerText.includes('파트너 실전 교본'), { timeout: 10000 })

  // Click 인쇄용 PDF on handbook card
  const clicked = await page.evaluate(() => {
    // find card containing 실전교본
    const cards = Array.from(document.querySelectorAll('div'))
    for (const c of cards) {
      if (c.innerText && c.innerText.includes('플로로탄닌 파트너 실전 교본') &&
          c.innerText.includes('25~30장')) {
        const btns = c.querySelectorAll('button')
        for (const b of btns) {
          if (b.innerText.includes('인쇄용 PDF')) {
            b.click()
            return true
          }
        }
      }
    }
    return false
  })
  console.log('PDF button clicked:', clicked)
  if (!clicked) { await browser.close(); process.exit(1) }

  // Wait for PDF download (up to 90s for multi-page)
  const target = path.join(DOWNLOAD_DIR, '플로로탄닌_파트너_실전교본.pdf')
  const start = Date.now()
  while (Date.now() - start < 90000) {
    if (fs.existsSync(target)) {
      const stat = fs.statSync(target)
      if (stat.size > 50000) { console.log('PDF downloaded:', stat.size, 'bytes'); break }
    }
    await new Promise(r => setTimeout(r, 500))
  }
  if (!fs.existsSync(target)) {
    console.log('ERROR: PDF not downloaded')
    await browser.close()
    process.exit(1)
  }
  await new Promise(r => setTimeout(r, 1500))

  await browser.close()
  console.log('DONE')
})().catch(e => { console.error(e); process.exit(1) })
