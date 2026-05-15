// Bypass React onClick — directly invoke window.__drawHandbookPages + jsPDF, save manually
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const DOWNLOAD_DIR = path.resolve(__dirname, 'flyer_test_out');
for (const f of fs.readdirSync(DOWNLOAD_DIR)) {
  if (f.includes('실전교본')) fs.unlinkSync(path.join(DOWNLOAD_DIR, f));
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: DOWNLOAD_DIR });
  page.on('console', msg => {
    const t = msg.text();
    if (t.includes('google-analytics') || t.includes('DOM]')) return;
    console.log('[' + msg.type() + ']', t.slice(0, 800));
  });
  page.on('pageerror', err => console.log('[pageerror]', err.message));
  page.on('dialog', async d => { console.log('[DIALOG]', d.message()); await d.dismiss(); });

  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:4173/inforoom', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForSelector('input[type="password"]', { timeout: 10000 });
  await page.type('input[type="password"]', '123456789');
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => typeof window.__drawHandbookPages === 'function', { timeout: 15000 });
  console.log('Renderer exposed');

  // Generate canvases via window function and build PDF using page-context jsPDF
  // We'll use html-to-image conversion: dump each canvas as PNG dataURL → save manually via fs
  const dataUrls = await page.evaluate(async () => {
    const canvases = await window.__drawHandbookPages(2);
    return canvases.map(c => c.toDataURL('image/jpeg', 0.9));
  });
  console.log('Got', dataUrls.length, 'page images');

  // Build PDF locally using pdf-lib? No — let's use jspdf in node
  // Actually simpler: save each page as PNG, then ImageMagick/pdftk into PDF — but we just want to verify
  // Save PNGs first
  for (let i = 0; i < dataUrls.length; i++) {
    const b64 = dataUrls[i].split(',')[1];
    const fname = path.join(DOWNLOAD_DIR, `handbook_page_${String(i+1).padStart(2,'0')}.jpg`);
    fs.writeFileSync(fname, Buffer.from(b64, 'base64'));
  }
  console.log('Saved', dataUrls.length, 'page JPGs to', DOWNLOAD_DIR);

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
