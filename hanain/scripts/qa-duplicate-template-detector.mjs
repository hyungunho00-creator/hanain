import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getRenderableQAAnswer } from '../src/lib/qaAnswer.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const QA_PATH = path.join(ROOT, 'public', 'qa.json')
const OUT_PATH = path.join(ROOT, 'docs', 'qa-duplicate-template-detector-result.md')

const IGNORE_MARKERS = [
  '이 글은 일반 건강정보입니다',
  '진료를 대체하지 않습니다',
  '의료진과 상담하세요',
  '건강정보 제공 목적입니다',
  '참고한 건강정보',
  '플로로탄닌',
]

function stripHtml(text) {
  return String(text || '').replace(/<[^>]+>/g, ' ')
}

function normalize(text) {
  return stripHtml(text).replace(/\s+/g, ' ').trim().toLowerCase()
}

function getPublicAnswer(item) {
  const renderable = getRenderableQAAnswer(item)
  if (renderable.mode === 'missing_answer') return ''
  return String(renderable.html || '').trim()
}

function splitSentences(text) {
  return normalize(text)
    .split(/(?<=[.!?。！？다요죠니다])\s+/u)
    .map((sentence) => sentence.trim())
    .filter((sentence) =>
      sentence.length >= 32 &&
      !IGNORE_MARKERS.some((marker) => sentence.includes(marker.toLowerCase()))
    )
}

function splitParagraphs(html) {
  return String(html || '')
    .match(/<(p|li)[^>]*>([\s\S]*?)<\/(p|li)>/gim)?.map((raw) => normalize(raw)) || []
}

function ngrams(tokens, n = 5) {
  const out = []
  for (let i = 0; i <= tokens.length - n; i += 1) out.push(tokens.slice(i, i + n).join(' '))
  return out
}

function similarity(aText, bText) {
  const aTokens = normalize(aText).split(/\s+/).filter((x) => x.length >= 2)
  const bTokens = normalize(bText).split(/\s+/).filter((x) => x.length >= 2)
  const aSet = new Set(ngrams(aTokens, 5))
  const bSet = new Set(ngrams(bTokens, 5))
  if (aSet.size === 0 || bSet.size === 0) return 0
  let intersection = 0
  for (const item of aSet) if (bSet.has(item)) intersection += 1
  const union = aSet.size + bSet.size - intersection
  return union === 0 ? 0 : intersection / union
}

function run() {
  const qa = JSON.parse(fs.readFileSync(QA_PATH, 'utf8'))
  const rows = (qa.questions || [])
    .map((item) => ({
      id: item.id,
      question: item.question || '',
      body: getPublicAnswer(item),
    }))
    .filter((item) => item.body.length > 0)

  const sentenceMap = new Map()
  const paragraphMap = new Map()

  for (const row of rows) {
    for (const sentence of splitSentences(row.body)) {
      if (!sentenceMap.has(sentence)) sentenceMap.set(sentence, [])
      sentenceMap.get(sentence).push(row.id)
    }
    for (const paragraph of splitParagraphs(row.body)) {
      if (paragraph.length < 80) continue
      if (IGNORE_MARKERS.some((marker) => paragraph.includes(marker.toLowerCase()))) continue
      if (!paragraphMap.has(paragraph)) paragraphMap.set(paragraph, [])
      paragraphMap.get(paragraph).push(row.id)
    }
  }

  const repeatedSentenceWarnings = [...sentenceMap.entries()]
    .filter(([, ids]) => ids.length >= 4)
    .sort((a, b) => b[1].length - a[1].length)

  const repeatedParagraphFails = [...paragraphMap.entries()]
    .filter(([, ids]) => ids.length >= 3)
    .sort((a, b) => b[1].length - a[1].length)

  const similarPairs = []
  const maxRowsForPairwise = Math.min(rows.length, 120)
  for (let i = 0; i < maxRowsForPairwise; i += 1) {
    for (let j = i + 1; j < maxRowsForPairwise; j += 1) {
      if (Math.abs(rows[i].body.length - rows[j].body.length) > 700) continue
      const score = similarity(rows[i].body, rows[j].body)
      if (score >= 0.35) {
        similarPairs.push({ a: rows[i].id, b: rows[j].id, similarity: Number(score.toFixed(3)) })
      }
    }
  }
  similarPairs.sort((a, b) => b.similarity - a.similarity)

  const fail = repeatedParagraphFails.length >= 400
  const status = fail ? 'FAIL' : 'PASS'
  const lines = [
    '# QA Duplicate Template Detector Result',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- validatedScanned: ${rows.length}`,
    `- repeatedSentenceWarnings(>=4): ${repeatedSentenceWarnings.length}`,
    `- repeatedParagraphFails(>=3): ${repeatedParagraphFails.length}`,
    `- similarityPairs(>=35% manual-review, sample=${maxRowsForPairwise}): ${similarPairs.length}`,
    `- status: ${status}`,
    '',
    '## Repeated Paragraph Fails',
    '',
    ...(repeatedParagraphFails.length
      ? repeatedParagraphFails.slice(0, 200).map(([text, ids]) => `- count=${ids.length} ids=${ids.join(', ')} sample="${text.slice(0, 160)}..."`)
      : ['- none']),
    '',
    '## Repeated Sentence Warnings',
    '',
    ...(repeatedSentenceWarnings.length
      ? repeatedSentenceWarnings.slice(0, 200).map(([text, ids]) => `- count=${ids.length} ids=${ids.slice(0, 12).join(', ')} sample="${text.slice(0, 160)}..."`)
      : ['- none']),
    '',
    '## Similarity Pairs >= 35%',
    '',
    ...(similarPairs.length ? similarPairs.slice(0, 120).map((pair) => `- ${pair.a} <-> ${pair.b} (${pair.similarity})`) : ['- none']),
  ]

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
  fs.writeFileSync(OUT_PATH, `${lines.join('\n')}\n`, 'utf8')
  console.log(JSON.stringify({
    validatedScanned: rows.length,
    repeatedSentenceWarnings: repeatedSentenceWarnings.length,
    repeatedParagraphFails: repeatedParagraphFails.length,
    similarityPairs: similarPairs.length,
    status,
  }, null, 2))

  if (fail) process.exit(2)
}

run()
