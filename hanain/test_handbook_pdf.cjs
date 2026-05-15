// Test full pdf.save flow
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
  const page = await browser.newPage()
  const client = await page.target().createCDPSession()
  await client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: DOWNLOAD_DIR })

  page.on('console', msg => {
    const t = msg.text()
    if (t.includes('google-analytics')||t.includes('DOM]')) return
    console.log('[' + msg.type() + ']', t.slice(0, 600))
  })
  page.on('pageerror', err => console.log('[pageerror]', err.message))

  await page.setViewport({ width: 1280, height: 900 })
  await page.goto('http://localhost:4173/inforoom', { waitUntil: 'networkidle2', timeout: 30000 })
  await page.waitForSelector('input[type="password"]', { timeout: 10000 })
  await page.type('input[type="password"]', '123456789')
  await page.keyboard.press('Enter')
  await page.waitForFunction(() => document.body.innerText.includes('파트너 실전 교본'), { timeout: 10000 })

  // Directly invoke pdf gen using jspdf from window
  const result = await page.evaluate(async () => {
    try {
      // Import jspdf via dynamic - it's bundled, so try grabbing from any global
      // Instead: replicate logic by calling drawHandbookPages, build pdf using globalThis.jspdf if available
      const canvases = await window.__drawHandbookPages(2)
      // Try to use the already-imported jsPDF — it must be in the bundle
      // Look in window for jspdf or use the imported instance from the page
      // Simpler: assemble PDF using globalThis by traversing
      const log = []
      log.push(`got ${canvases.length} canvases`)
      // We need jsPDF reference. Let me expose it via the bundle:
      if (typeof window.__jsPDF !== 'function') {
        return { ok: false, reason: 'jsPDF not exposed yet — need to expose' }
      }
      const pdf = new window.__jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      for (let i = 0; i < canvases.length; i++) {
        if (i > 0) pdf.addPage()
        try {
          const du = canvases[i].toDataURL('image/jpeg', 0.9)
          pdf.addImage(du, 'JPEG', 0, 0, 210, 297)
          log.push(`p${i+1} added`)
        } catch (e) {
          log.push(`p${i+1} addImage ERR: ${e.message}`)
          throw e
        }
      }
      log.push('about to save')
      pdf.save('test_handbook_direct.pdf')
      log.push('saved')
      return { ok: true, log }
    } catch (e) {
      return { ok: false, reason: e.message, stack: e.stack?.slice(0, 1200) }
    }
  })
  console.log('RESULT:', JSON.stringify(result, null, 2))

  // wait 5s for download
  await new Promise(r => setTimeout(r, 5000))
  const files = fs.readdirSync(DOWNLOAD_DIR).filter(f => f.includes('handbook') || f.includes('실전교본'))
  console.log('Files:', files)

  await browser.close()
})().catch(e => { console.error(e); process.exit(1) })
