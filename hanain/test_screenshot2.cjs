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
  // Scroll to handbook section
  await page.evaluate(() => {
    const el = [...document.querySelectorAll('*')].find(e => e.textContent && e.textContent.includes('파트너 실전 교본') && e.children.length < 5);
    if (el) el.scrollIntoView({ block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'handbook_section.png', fullPage: false });
  await browser.close();
})();
