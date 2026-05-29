import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const QA_PATH = path.join(ROOT, 'public', 'qa.json')
const OUT_PATH = path.join(ROOT, 'docs', 'content-duplicate-body-audit-result.md')

const IGNORE_BLOCK_PATTERNS = [
  /성분 정보로 함께 보기[\s\S]*$/i,
  /참고한 건강정보[\s\S]*$/i,
  /안내문:\s*이 글은 일반 건강정보[\s\S]*$/i,
]

const IGNORE_COMMON_PARAGRAPH = [
  /짧은 답변 이 질문은 치료 선택 기준을 묻는 내용으로/i,
  /치료 결정은 증상의 강도만으로 하지 않고/i,
  /원인 추정에서는 최근 변화/i,
  /검사 결과는 측정 조건/i,
]

function normalizeText(text) {
  return String(text || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function removeSharedBlocks(text) {
  let next = String(text || '')
  for (const re of IGNORE_BLOCK_PATTERNS) next = next.replace(re, '')
  return next
}

function toSlug(question) {
  return String(question || '')
    .replace(/[^\w\s가-힣]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

function ngrams(tokens, n = 5) {
  const out = []
  for (let i = 0; i <= tokens.length - n; i += 1) {
    out.push(tokens.slice(i, i + n).join(' '))
  }
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
    const cleaned = removeSharedBlocks(String(q.answer || ''))
    const plain = normalizeText(cleaned)
    const tokens = plain.split(/\s+/).filter((x) => x.length >= 2)
    return {
      id: q.id || '',
      category: q.category || '',
      slug: toSlug(q.question),
      question: q.question || '',
      plain,
      ngrams: new Set(ngrams(tokens.slice(0, 420), 5)),
    }
  })

  const paragraphBucket = new Map()
  for (const row of rows) {
    const paras = row.plain
      .split(/\.\s+/)
      .map((x) => x.trim())
      .filter((x) => x.length >= 80)
      .filter((x) => !IGNORE_COMMON_PARAGRAPH.some((re) => re.test(x)))
    for (const p of paras) {
      const key = p.slice(0, 220)
      if (!paragraphBucket.has(key)) paragraphBucket.set(key, [])
      paragraphBucket.get(key).push(row.slug)
    }
  }

  const repeatedParagraphs = [...paragraphBucket.entries()]
    .filter(([, arr]) => arr.length >= 5)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 40)

  const suspiciousPairs = []
  for (let i = 0; i < rows.length; i += 1) {
    const a = rows[i]
    for (let j = i + 1; j < rows.length; j += 1) {
      const b = rows[j]
      if (a.category && b.category && a.category !== b.category) continue
      const sim = jaccard(a.ngrams, b.ngrams)
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

  const fail = repeatedParagraphs.length > 0

  const lines = [
    '# Content Duplicate Body Audit Result',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- scanned: ${rows.length}`,
    `- repeatedParagraphGroups(>=5): ${repeatedParagraphs.length}`,
    `- similarityPairs(>=35% manual-review): ${suspiciousPairs.length}`,
    `- status: ${fail ? 'FAIL' : 'PASS'}`,
    '',
    '## Repeated Paragraph Groups (Top 40)',
    '',
    ...repeatedParagraphs.map(
      ([snippet, slugs]) => `- count=${slugs.length} | sample="${snippet.slice(0, 180)}..." | examples=${slugs.slice(0, 8).join(', ')}`,
    ),
    '',
    '## Similarity Pairs >= 35% (Top 120)',
    '',
    ...suspiciousPairs.slice(0, 120).map((p) => `- ${p.a} <-> ${p.b} | similarity=${p.similarity}`),
  ]

  fs.writeFileSync(OUT_PATH, `${lines.join('\n')}\n`, 'utf8')
  console.log(
    JSON.stringify(
      {
        scanned: rows.length,
        repeatedParagraphGroups: repeatedParagraphs.length,
        similarityPairs: suspiciousPairs.length,
        status: fail ? 'FAIL' : 'PASS',
      },
      null,
      2,
    ),
  )

  if (fail) process.exit(2)
}

main()
