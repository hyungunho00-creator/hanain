import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const QA_PATH = path.join(ROOT, 'public', 'qa.json')
const OUT_PATH = path.join(ROOT, 'docs', 'content-duplicate-body-audit-result.md')

const SECTION_MARKERS = [
  '먼저 확인할 것',
  '병원 진료가 필요한 경우',
  '피해야 할 것',
  '생활관리 팁',
  '성분 정보로 함께 보기',
  '참고한 건강정보',
  '안내문',
]

function stripHtml(text) {
  return String(text || '').replace(/<[^>]+>/g, ' ')
}

function normalize(text) {
  return stripHtml(text)
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function makeSlug(question) {
  return String(question || '')
    .replace(/[^\w\s가-힣]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

function cropMainBody(answer) {
  const raw = String(answer || '')
  const marker = raw.indexOf('<h3>먼저 확인할 것</h3>')
  const head = marker >= 0 ? raw.slice(0, marker) : raw
  return normalize(head)
}

function extractParagraphs(html) {
  return String(html || '')
    .match(/<p>[\s\S]*?<\/p>/g)
    ?.map((p) => normalize(p))
    .filter((p) => p.length >= 120) || []
}

function ngrams(tokens, n = 5) {
  const out = []
  for (let i = 0; i <= tokens.length - n; i += 1) out.push(tokens.slice(i, i + n).join(' '))
  return out
}

function jaccard(aSet, bSet) {
  if (aSet.size === 0 && bSet.size === 0) return 0
  let inter = 0
  for (const x of aSet) if (bSet.has(x)) inter += 1
  const union = aSet.size + bSet.size - inter
  return union === 0 ? 0 : inter / union
}

function main() {
  const qa = JSON.parse(fs.readFileSync(QA_PATH, 'utf8'))
  const rows = (qa.questions || []).map((q) => {
    const mainBody = cropMainBody(q.answer || '')
    const tokens = mainBody.split(/\s+/).filter((x) => x.length >= 2).slice(0, 260)
    return {
      id: q.id || '',
      category: q.category || '',
      slug: makeSlug(q.question || ''),
      question: q.question || '',
      mainBody,
      ngramSet: new Set(ngrams(tokens, 5)),
      paragraphs: extractParagraphs(mainBody),
    }
  })

  const paragraphBucket = new Map()
  for (const row of rows) {
    for (const para of row.paragraphs) {
      if (SECTION_MARKERS.some((m) => para.includes(m))) continue
      const key = para.slice(0, 260)
      if (!paragraphBucket.has(key)) paragraphBucket.set(key, [])
      paragraphBucket.get(key).push(row.slug)
    }
  }

  const repeatedSentenceGroups = [...paragraphBucket.entries()]
    .filter(([, slugs]) => slugs.length >= 5)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 40)

  const suspiciousPairs = []
  for (let i = 0; i < rows.length; i += 1) {
    const a = rows[i]
    for (let j = i + 1; j < rows.length; j += 1) {
      const b = rows[j]
      if (a.category && b.category && a.category !== b.category) continue
      const sim = jaccard(a.ngramSet, b.ngramSet)
      if (sim >= 0.35) {
        suspiciousPairs.push({
          a: a.slug,
          b: b.slug,
          similarity: Number(sim.toFixed(3)),
        })
      }
    }
  }
  suspiciousPairs.sort((x, y) => y.similarity - x.similarity)

  const fail = repeatedSentenceGroups.length > 0
  const lines = [
    '# Content Duplicate Body Audit Result',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- scanned: ${rows.length}`,
    `- repeatedParagraphGroups(>=5): ${repeatedSentenceGroups.length}`,
    `- similarityPairs(>=35% manual-review): ${suspiciousPairs.length}`,
    `- status: ${fail ? 'FAIL' : 'PASS'}`,
    '',
    '## Repeated Sentence Groups (Top 40)',
    '',
    ...repeatedSentenceGroups.map(
      ([snippet, slugs]) => `- count=${slugs.length} | sample="${snippet.slice(0, 180)}..." | examples=${slugs.slice(0, 8).join(', ')}`,
    ),
    '',
    '## Similarity Pairs >= 35% (Top 120)',
    '',
    ...suspiciousPairs.slice(0, 120).map((p) => `- ${p.a} <-> ${p.b} | similarity=${p.similarity}`),
  ]
  fs.writeFileSync(OUT_PATH, `${lines.join('\n')}\n`, 'utf8')

  const summary = {
    scanned: rows.length,
    repeatedParagraphGroups: repeatedSentenceGroups.length,
    similarityPairs: suspiciousPairs.length,
    status: fail ? 'FAIL' : 'PASS',
  }
  console.log(JSON.stringify(summary, null, 2))
  if (fail) process.exit(2)
}

main()
