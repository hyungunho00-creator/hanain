import fs from 'fs'

const qa = JSON.parse(fs.readFileSync('public/qa.json', 'utf8')).questions
let withContextDepth = 0
let under700 = 0
const lens = []
const sig = new Map()

for (const item of qa) {
  const a = item.answer || ''
  if (a.includes('qa-context-depth')) withContextDepth += 1

  const plain = a.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  lens.push(plain.length)
  if (plain.length < 700) under700 += 1

  let key = 'none'
  const s = a.indexOf('<div class="qa-context-depth">')
  if (s >= 0) {
    const u1 = a.indexOf('<ul>', s)
    const u2 = a.indexOf('</ul>', u1)
    if (u1 >= 0 && u2 > u1) key = a.slice(u1 + 4, u2)
  }
  sig.set(key, (sig.get(key) || 0) + 1)
}

lens.sort((a, b) => a - b)
const pct = (x) => lens[Math.floor((lens.length - 1) * x)]
const topPatterns = [...sig.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 8)
  .map(([k, v]) => ({
    count: v,
    sample: k.replace(/<li>/g, '').replace(/<\/li>/g, ' | ').slice(0, 200),
  }))

console.log(
  JSON.stringify(
    {
      total: qa.length,
      with_context_depth: withContextDepth,
      under700,
      p25: pct(0.25),
      p50: pct(0.5),
      p75: pct(0.75),
      unique_checklists: sig.size,
      top_patterns: topPatterns,
    },
    null,
    2
  )
)
