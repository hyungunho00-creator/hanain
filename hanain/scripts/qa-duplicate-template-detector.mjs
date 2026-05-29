import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const QA_PATH = path.join(ROOT, 'public', 'qa.json')
const OUT_PATH = path.join(ROOT, 'docs', 'qa-duplicate-template-detector-result.md')

const IGNORE_SENTENCE_MARKERS = [
  '성분 정보로 함께 보기',
  '플로로탄닌은 감태',
  '플로로탄닌 연구 정리 보기',
  '감태추출물 정보 더 보기',
  '해양 폴리페놀 자료 보기',
  '관련 Q&A 더 보기',
  '안내문',
]

function stripHtml(text) {
  return String(text || '').replace(/<[^>]+>/g, ' ')
}

function normalize(text) {
  return stripHtml(text).replace(/\s+/g, ' ').trim().toLowerCase()
}

function getStatus(q) {
  return String(q.qualityStatus || q.quality_status || '').toLowerCase()
}

function getValidatedAnswer(q) {
  const answer = q.validatedAnswer || q.validated_answer || ''
  return typeof answer === 'string' ? answer.trim() : ''
}

function isValidated(q) {
  return getStatus(q) === 'validated' && getValidatedAnswer(q).length > 0
}

function splitSentences(text) {
  return normalize(text)
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 24 && !IGNORE_SENTENCE_MARKERS.some((m) => s.includes(m.toLowerCase())))
}

function splitParagraphs(html) {
  return String(html || '')
    .match(/<(p|li)>([\s\S]*?)<\/(p|li)>/gim)?.map((raw) => normalize(raw)) || []
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
  let inter = 0
  for (const x of aSet) if (bSet.has(x)) inter += 1
  const union = aSet.size + bSet.size - inter
  return union === 0 ? 0 : inter / union
}

function run() {
  const qa = JSON.parse(fs.readFileSync(QA_PATH, 'utf8'))
  const rows = (qa.questions || []).filter(isValidated).map((q) => ({
    id: q.id,
    question: q.question || '',
    body: getValidatedAnswer(q),
    firstSentence: splitSentences(getValidatedAnswer(q))[0] || '',
  }))

  const sentenceMap = new Map()
  const paragraphMap = new Map()
  for (const row of rows) {
    for (const s of splitSentences(row.body)) {
      if (!sentenceMap.has(s)) sentenceMap.set(s, [])
      sentenceMap.get(s).push(row.id)
    }
    for (const p of splitParagraphs(row.body)) {
      if (p.length < 40) continue
      if (IGNORE_SENTENCE_MARKERS.some((m) => p.includes(m.toLowerCase()))) continue
      if (!paragraphMap.has(p)) paragraphMap.set(p, [])
      paragraphMap.get(p).push(row.id)
    }
  }

  const repeatedSentenceWarnings = [...sentenceMap.entries()]
    .filter(([, ids]) => ids.length >= 3)
    .sort((a, b) => b[1].length - a[1].length)

  const repeatedParagraphFails = [...paragraphMap.entries()]
    .filter(([, ids]) => ids.length >= 2)
    .sort((a, b) => b[1].length - a[1].length)

  const similarPairs = []
  for (let i = 0; i < rows.length; i += 1) {
    for (let j = i + 1; j < rows.length; j += 1) {
      const sim = similarity(rows[i].body, rows[j].body)
      if (sim >= 0.35) {
        similarPairs.push({ a: rows[i].id, b: rows[j].id, similarity: Number(sim.toFixed(3)) })
      }
    }
  }
  similarPairs.sort((x, y) => y.similarity - x.similarity)

  const firstSentenceMap = new Map()
  for (const row of rows) {
    if (!row.firstSentence) continue
    if (!firstSentenceMap.has(row.firstSentence)) firstSentenceMap.set(row.firstSentence, [])
    firstSentenceMap.get(row.firstSentence).push(row.id)
  }
  const repeatedFirstSentenceFails = [...firstSentenceMap.entries()]
    .filter(([, ids]) => ids.length >= 2)
    .sort((a, b) => b[1].length - a[1].length)

  const fail = repeatedParagraphFails.length > 0 || repeatedFirstSentenceFails.length > 0
  const status = fail ? 'FAIL' : 'PASS'

  const lines = [
    '# QA Duplicate Template Detector Result',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- validatedScanned: ${rows.length}`,
    `- repeatedSentenceWarnings(>=3): ${repeatedSentenceWarnings.length}`,
    `- repeatedParagraphFails(>=2): ${repeatedParagraphFails.length}`,
    `- repeatedFirstSentenceFails(>=2): ${repeatedFirstSentenceFails.length}`,
    `- similarityPairs(>=35% manual-review): ${similarPairs.length}`,
    `- status: ${status}`,
    '',
    '## Repeated Paragraph Fails',
    '',
    ...(repeatedParagraphFails.length
      ? repeatedParagraphFails.map(([text, ids]) => `- count=${ids.length} ids=${ids.join(', ')} sample="${text.slice(0, 160)}..."`)
      : ['- none']),
    '',
    '## Repeated First Sentence Fails',
    '',
    ...(repeatedFirstSentenceFails.length
      ? repeatedFirstSentenceFails.map(([text, ids]) => `- count=${ids.length} ids=${ids.join(', ')} text="${text.slice(0, 200)}"`)
      : ['- none']),
    '',
    '## Similarity Pairs >= 35%',
    '',
    ...(similarPairs.length ? similarPairs.slice(0, 120).map((p) => `- ${p.a} <-> ${p.b} (${p.similarity})`) : ['- none']),
  ]

  fs.writeFileSync(OUT_PATH, `${lines.join('\n')}\n`, 'utf8')
  console.log(JSON.stringify({
    validatedScanned: rows.length,
    repeatedSentenceWarnings: repeatedSentenceWarnings.length,
    repeatedParagraphFails: repeatedParagraphFails.length,
    repeatedFirstSentenceFails: repeatedFirstSentenceFails.length,
    similarityPairs: similarPairs.length,
    status,
  }, null, 2))
  if (fail) process.exit(2)
}

run()
