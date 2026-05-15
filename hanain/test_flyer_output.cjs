// 전단지 PDF 자동 검증 — 여러 종류 다운받기 (download 파일명에 인덱스 붙임)
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const BASE_URL = process.env.BASE_URL || 'http://localhost:4173'
const OUT_DIR  = path.join(__dirname, 'flyer_test_out')
fs.mkdirSync(OUT_DIR, { recursive: true })

;(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })

  const client = await page.target().createCDPSession()
  await client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: OUT_DIR })

  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36')

  console.log('▶ 사이트 접속:', BASE_URL + '/inforoom')
  await page.goto(BASE_URL + '/inforoom', { waitUntil: 'networkidle2', timeout: 30000 })

  await page.waitForSelector('input[type="password"]', { timeout: 8000 })
  await page.type('input[type="password"]', '123456789')
  await page.click('button[type="submit"]')
  await new Promise(r => setTimeout(r, 2000))

  const buttons = await page.$$eval('button', btns =>
    btns.map((b, i) => ({ i, text: (b.textContent || '').replace(/\s+/g, ' ').trim() }))
        .filter(o => o.text.includes('인쇄용 PDF'))
  )
  console.log(`▶ PDF 다운로드 버튼: ${buttons.length}개`)

  const allButtons = await page.$$('button')

  // 대표 5종: 제품안내(0), 통합ALL(1), 기초(15), 혈당(17), 장-면역(=combo_immune, 3)
  // 다양한 카테고리 골라서
  const targets = [
    { tIdx: 0, name: '00_제품안내' },
    { tIdx: 1, name: '01_성기능男' },
    { tIdx: 3, name: '03_암통합' },
    { tIdx: 6, name: '06_통합ALL' },
    { tIdx: 11, name: '11_기초' },
    { tIdx: 19, name: '19_심혈관' },
    { tIdx: 25, name: '25_장건강' },
  ].filter(t => t.tIdx < buttons.length)

  for (const { tIdx, name } of targets) {
    const btnIdx = buttons[tIdx].i
    // 기존 download 제거
    for (const f of fs.readdirSync(OUT_DIR)) {
      if (f === 'download') fs.unlinkSync(path.join(OUT_DIR, f))
    }
    console.log(`\n▶ [${tIdx}] ${name} 클릭 (전체 ${btnIdx}번째): "${buttons[tIdx].text.slice(0, 50)}"`)

    // 카드까지 스크롤
    await page.evaluate((i) => {
      document.querySelectorAll('button')[i]?.scrollIntoView({ block: 'center' })
    }, btnIdx)
    await new Promise(r => setTimeout(r, 300))
    await allButtons[btnIdx].click()

    // 다운로드 완료까지 대기
    let ok = false
    for (let i = 0; i < 40; i++) {
      await new Promise(r => setTimeout(r, 500))
      const dl = path.join(OUT_DIR, 'download')
      if (fs.existsSync(dl) && fs.statSync(dl).size > 100000) {
        // 완료
        const dst = path.join(OUT_DIR, name + '.pdf')
        fs.renameSync(dl, dst)
        console.log(`  ✓ 저장: ${name}.pdf (${fs.statSync(dst).size} bytes)`)
        ok = true
        break
      }
    }
    if (!ok) console.log(`  ✗ 다운로드 실패`)
    await new Promise(r => setTimeout(r, 800))
  }

  await browser.close()
  console.log('\n✓ 완료')
})().catch(e => {
  console.error('에러:', e)
  process.exit(1)
})
