import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const qaPath = path.join(root, 'public', 'qa.json')
const outPath = path.join(root, 'src', 'data', 'siteStats.js')

const qa = JSON.parse(fs.readFileSync(qaPath, 'utf8'))
const qaTotal = Array.isArray(qa.questions) ? qa.questions.length : 0
const categoryTotal = Array.isArray(qa.categories) ? qa.categories.length : 0

if (!qaTotal || !categoryTotal) {
  throw new Error(`Invalid qa.json stats: questions=${qaTotal}, categories=${categoryTotal}`)
}

const body = `// Synced with public/qa.json by scripts/update_site_stats.mjs during prebuild.\nexport const QA_TOTAL = ${qaTotal}\nexport const QA_CATEGORY_TOTAL = ${categoryTotal}\n`

fs.writeFileSync(outPath, body, 'utf8')
console.log(`[siteStats] QA_TOTAL=${qaTotal}, QA_CATEGORY_TOTAL=${categoryTotal}`)
