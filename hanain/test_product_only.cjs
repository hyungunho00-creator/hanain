const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const OUT = path.resolve(__dirname, 'flyer_test_out');
(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  try {
    const page = await browser.newPage();
    page.on('console', msg => { if (msg.type() === 'error') console.log('PAGE ERR:', msg.text()); });
    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: OUT });
    await page.goto('http://localhost:4173/inforoom', { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForSelector('input[type="password"]', { timeout: 15000 });
    await page.type('input[type="password"]', '123456789');
    await page.keyboard.press('Enter');
    await new Promise(r => setTimeout(r, 2500));
    // Product flyer is index 2 (the first PDF button in the list)
    const before = fs.readdirSync(OUT).filter(f => f.endsWith('.pdf'));
    const buttons = await page.$$('button');
    await buttons[2].click();
    console.log('Clicked button index 2 (제품안내)...');
    // Wait for download
    for (let i = 0; i < 40; i++) {
      await new Promise(r => setTimeout(r, 1000));
      const cur = fs.readdirSync(OUT).filter(f => f.endsWith('.pdf'));
      const newOnes = cur.filter(f => !before.includes(f));
      if (newOnes.length > 0 && !newOnes.some(f => f.endsWith('.crdownload'))) {
        console.log('Downloaded:', newOnes);
        // Rename to standard name
        newOnes.forEach(f => {
          const src = path.join(OUT, f);
          const dst = path.join(OUT, '00_제품안내.pdf');
          fs.renameSync(src, dst);
          console.log('Renamed:', f, '->', '00_제품안내.pdf');
        });
        break;
      }
    }
    await browser.close();
  } catch (e) {
    console.error('ERR:', e.message);
    await browser.close();
    process.exit(1);
  }
})();
