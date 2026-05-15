const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:4173/inforoom', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  const pwInput = await page.$('input[type="password"]');
  if (pwInput) {
    await pwInput.type('123456789');
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 2500));
  }
  // Find element containing 실전 교본 text and scroll to it
  const found = await page.evaluate(() => {
    const all = document.querySelectorAll('h2, h3, div');
    for (const el of all) {
      const t = el.textContent || '';
      if (t.includes('파트너 실전 교본') && t.length < 200) {
        el.scrollIntoView({ block: 'start', behavior: 'instant' });
        return { ok: true, tag: el.tagName, text: t.slice(0, 100) };
      }
    }
    return { ok: false };
  });
  console.log('Found:', JSON.stringify(found));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'handbook_section.png', fullPage: false });
  await browser.close();
})();
