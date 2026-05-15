// Directly invoke drawHandbookPages via console
const puppeteer = require('puppeteer')
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  page.on('console', msg => {
    const t = msg.text()
    if (t.includes('google-analytics')||t.includes('DOM]')) return
    console.log('[' + msg.type() + ']', t.slice(0, 500))
  })
  page.on('pageerror', err => console.log('[pageerror]', err.message, err.stack?.slice(0, 1000)))
  page.on('dialog', async d => { console.log('[DIALOG]', d.message()); await d.dismiss() })

  await page.setViewport({ width: 1280, height: 900 })
  await page.goto('http://localhost:4173/inforoom', { waitUntil: 'networkidle2', timeout: 30000 })
  await page.waitForSelector('input[type="password"]', { timeout: 10000 })
  await page.type('input[type="password"]', '123456789')
  await page.keyboard.press('Enter')
  await page.waitForFunction(() => document.body.innerText.includes('파트너 실전 교본'), { timeout: 10000 })

  // Try direct call by clicking button + tracking actual handler outcome
  // Inject diag instrumentation
  await page.evaluate(() => {
    window.__diag = []
    const origError = console.error
    console.error = (...args) => { window.__diag.push('ERR: ' + args.map(a => a?.message || a?.toString() || String(a)).join(' ')); origError.apply(console, args) }
    const origLog = console.log
    console.log = (...args) => { window.__diag.push('LOG: ' + args.map(a => a?.toString() || String(a)).join(' ')); origLog.apply(console, args) }
  })

  // Click handbook PDF button
  await page.evaluate(() => {
    const allDivs = Array.from(document.querySelectorAll('div'))
    let best = null
    for (const c of allDivs) {
      if (c.innerText && c.innerText.includes('파트너 실전 교본') && c.innerText.includes('A4 약 25~30장')) {
        if (!best || c.innerText.length < best.innerText.length) best = c
      }
    }
    const btns = Array.from(best.querySelectorAll('button'))
    for (const b of btns) {
      if (b.innerText.includes('인쇄용 PDF')) { b.click(); console.log('CLICKED'); break }
    }
  })

  // Wait and pull diag
  await new Promise(r => setTimeout(r, 30000))
  const diag = await page.evaluate(() => window.__diag)
  console.log('---DIAG---')
  diag.forEach(d => console.log(d))

  await browser.close()
})().catch(e => { console.error(e); process.exit(1) })
