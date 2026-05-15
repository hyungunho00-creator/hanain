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
  const has = await page.evaluate(() => document.body.innerText.includes('실전 교본') || document.body.innerText.includes('실전교본'));
  console.log('Has handbook text:', has);
  await page.screenshot({ path: 'handbook_check.png', fullPage: true });
  await browser.close();
})();
