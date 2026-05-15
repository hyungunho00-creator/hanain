// Full handbook test: directly call drawHandbookPages, generate PDF in puppeteer, save
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const DOWNLOAD_DIR = path.resolve(__dirname, 'flyer_test_out');
if (!fs.existsSync(DOWNLOAD_DIR)) fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
// clear old
for (const f of fs.readdirSync(DOWNLOAD_DIR)) {
  if (f.includes('실전교본')) fs.unlinkSync(path.join(DOWNLOAD_DIR, f));
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
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
  await page.waitForFunction(() => document.body.innerText.includes('파트너 실전 교본'), { timeout: 10000 });
  await page.waitForFunction(() => typeof window.__drawHandbookPages === 'function', { timeout: 10000 });

  // Click PDF button on handbook card
  await page.evaluate(() => {
    const allDivs = Array.from(document.querySelectorAll('div'));
    let best = null;
    for (const c of allDivs) {
      if (c.innerText && c.innerText.includes('파트너 실전 교본') && c.innerText.includes('A4 약 25~30장')) {
        if (!best || c.innerText.length < best.innerText.length) best = c;
      }
    }
    const btns = Array.from(best.querySelectorAll('button'));
    for (const b of btns) {
      if (b.innerText.includes('인쇄용 PDF')) { b.click(); break; }
    }
  });
  console.log('Clicked PDF button, waiting up to 90s for file...');

  const target = path.join(DOWNLOAD_DIR, '플로로탄닌_파트너_실전교본.pdf');
  const start = Date.now();
  while (Date.now() - start < 90000) {
    if (fs.existsSync(target)) {
      const stat = fs.statSync(target);
      if (stat.size > 50000) {
        // wait a bit for write to complete
        await new Promise(r => setTimeout(r, 1500));
        const final = fs.statSync(target);
        console.log('PDF downloaded:', final.size, 'bytes');
        break;
      }
    }
    await new Promise(r => setTimeout(r, 500));
  }
  if (!fs.existsSync(target)) console.log('ERROR: no file');

  await browser.close();
  console.log('DONE');
})().catch(e => { console.error(e); process.exit(1); });
