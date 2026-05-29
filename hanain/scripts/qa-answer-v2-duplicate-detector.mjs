#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const QA_SRC = path.join(ROOT, 'src', 'data', 'qa.json')
const OUT_PATH = path.join(ROOT, 'docs', 'qa-answer-v2-duplicate-detector-result.md')

function argValue(name, fallback = null) {
  const i = process.argv.indexOf(name)
  if (i === -1) return fallback
  return process.argv[i + 1] ?? fallback
}
function hasFlag(name) { return process.argv.includes(name) }
function stripHtml(s='') { return String(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() }
function norm(s='') { return stripHtml(s).toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g,' ').trim() }

function answerText(v2) {
  return [
    v2.shortAnswer || '',
    ...(v2.sections || []).map(s=>s.body || ''),
    ...(v2.checkFirst || []),
    ...(v2.whenToSeeDoctor || []),
    ...(v2.avoidList || []),
    ...(v2.lifestyleTips || []),
    // Shared compliance blocks are intentionally excluded from similarity
    // scoring to reduce false positives across otherwise distinct answers.
    // v2.phlorotanninBridge
    // v2.disclaimer
  ].join('\n')
}

function coreParagraphs(v2) {
  const blocks = [
    v2.shortAnswer || '',
    ...(v2.sections || []).map(s => s.body || ''),
    ...(v2.checkFirst || []),
    ...(v2.whenToSeeDoctor || []),
    ...(v2.avoidList || []),
    ...(v2.lifestyleTips || []),
  ]
  return blocks
    .map((b) => stripHtml(b))
    .flatMap((b) => b.split(/\n+/))
    .map((p) => p.trim())
    .filter((p) => p.length >= 40)
}

function sim(a,b) {
  const at = norm(a).split(' ').filter(x=>x.length>1)
  const bt = norm(b).split(' ').filter(x=>x.length>1)
  const setA = new Set(at)
  const setB = new Set(bt)
  if (!setA.size || !setB.size) return 0
  let inter = 0
  for (const t of setA) if (setB.has(t)) inter += 1
  return inter / (setA.size + setB.size - inter)
}

function run() {
  const batch = argValue('--batch')
  const all = hasFlag('--all') || !batch
  const qa = JSON.parse(fs.readFileSync(QA_SRC,'utf8')).questions || []

  const items = qa
    .filter(q => q.answerV2 && String(q.answerV2.status).toLowerCase()==='approved')
    .filter(q => all || String(q.reviewBatch||'') === batch)
    .map(q => ({
      id: q.id,
      batch: q.reviewBatch || '',
      question: q.question,
      firstSentence: norm(String(q.answerV2.shortAnswer||'').split(/[.!?]\s/)[0] || ''),
      text: answerText(q.answerV2),
      paragraphs: coreParagraphs(q.answerV2),
    }))

  const firstMap = new Map()
  for (const it of items) {
    if (!it.firstSentence) continue
    if (!firstMap.has(it.firstSentence)) firstMap.set(it.firstSentence, [])
    firstMap.get(it.firstSentence).push(it.id)
  }
  const repeatedFirst = [...firstMap.entries()].filter(([,ids])=>ids.length>=2)
  const repeatedFirstHardFail = repeatedFirst.filter(([, ids]) => ids.length >= 3)

  const pairIssues = []
  for (let i=0;i<items.length;i++) {
    for (let j=i+1;j<items.length;j++) {
      const score = sim(items[i].text, items[j].text)
      if (score >= 0.35) pairIssues.push({ a:items[i].id, b:items[j].id, score:Number(score.toFixed(3)) })
    }
  }

  const paraMap = new Map()
  for (const it of items) {
    const dedup = new Set(it.paragraphs.map((p) => norm(p)))
    for (const p of dedup) {
      if (!p) continue
      if (!paraMap.has(p)) paraMap.set(p, new Set())
      paraMap.get(p).add(it.id)
    }
  }
  const repeatedParagraphs = [...paraMap.entries()]
    .map(([text, ids]) => ({ text, ids: [...ids] }))
    .filter((x) => x.ids.length >= 3)

  // Policy:
  // - similarity >= 0.35 => manual review candidate
  // - identical paragraph repeated across >=3 answers => FAIL
  const status = repeatedFirstHardFail.length || repeatedParagraphs.length ? 'FAIL' : 'PASS'
  const lines = [
    '# QA Answer V2 Duplicate Detector Result',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- mode: ${all ? 'all' : `batch:${batch}`}`,
    `- approvedScanned: ${items.length}`,
    `- repeatedFirstSentence(>=2, manual-review): ${repeatedFirst.length}`,
    `- repeatedFirstSentence(>=3, fail): ${repeatedFirstHardFail.length}`,
    `- similarityPairs(>=0.35, manual-review): ${pairIssues.length}`,
    `- repeatedParagraphs(>=3 ids, fail): ${repeatedParagraphs.length}`,
    `- status: ${status}`,
    '',
    '## Repeated First Sentence',
    ...(repeatedFirst.length ? repeatedFirst.map(([s,ids]) => `- count=${ids.length} ids=${ids.join(', ')} text="${s.slice(0,160)}"`) : ['- none']),
    '',
    '## Similarity Pairs',
    ...(pairIssues.length ? pairIssues.map(p => `- ${p.a} <-> ${p.b} (${p.score})`) : ['- none']),
    '',
    '## Repeated Paragraphs (Fail)',
    ...(repeatedParagraphs.length
      ? repeatedParagraphs.map((r) => `- count=${r.ids.length} ids=${r.ids.join(', ')} text="${r.text.slice(0, 180)}"`)
      : ['- none']),
  ]
  fs.writeFileSync(OUT_PATH, lines.join('\n') + '\n', 'utf8')
  console.log(JSON.stringify({ approvedScanned: items.length, repeatedFirstSentenceFails: repeatedFirst.length, similarityPairs: pairIssues.length, status }, null, 2))
  if (status !== 'PASS') process.exit(2)
}

run()
