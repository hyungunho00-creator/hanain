#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const ROOT=process.cwd()
const auditPath=path.join(ROOT,'data','qa-controlled-audit.json')
const outMd=path.join(ROOT,'docs','qa-contamination-boundary-report.md')

const auditDoc=JSON.parse(fs.readFileSync(auditPath,'utf8'))
const rows=auditDoc.audit||[]
if (!rows.length) {
  console.error('No audit rows found. Run qa-controlled-audit.mjs first.')
  process.exit(1)
}

function rate(arr, predicate){
  if(!arr.length) return 0
  return predicate ? arr.filter(predicate).length/arr.length : 0
}
function pct(v){return `${(v*100).toFixed(2)}%`}

const before = rows.filter(r=>r.index<1200)
const after = rows.filter(r=>r.index>=1200)

const metrics = {
  before: {
    total: before.length,
    badPhraseRate: rate(before,r=>r.hasBadPhrase),
    templateRate: rate(before,r=>r.startsWithCategoryTemplate),
    lowTopicRate: rate(before,r=>r.topicMatchScore<0.25),
    highDupRate: rate(before,r=>r.duplicateRisk==='high'),
    shortAnswerRate: rate(before,r=>r.currentAnswerLength<500),
  },
  after: {
    total: after.length,
    badPhraseRate: rate(after,r=>r.hasBadPhrase),
    templateRate: rate(after,r=>r.startsWithCategoryTemplate),
    lowTopicRate: rate(after,r=>r.topicMatchScore<0.25),
    highDupRate: rate(after,r=>r.duplicateRisk==='high'),
    shortAnswerRate: rate(after,r=>r.currentAnswerLength<500),
  }
}

const windows=[]
for(let s=1;s<=rows.length;s+=100){
  const e=Math.min(rows.length,s+99)
  const chunk=rows.filter(r=>r.index>=s&&r.index<=e)
  windows.push({
    range:`${s}-${e}`,
    start:s,end:e,total:chunk.length,
    badPhraseRate:rate(chunk,r=>r.hasBadPhrase),
    templateRate:rate(chunk,r=>r.startsWithCategoryTemplate),
    lowTopicRate:rate(chunk,r=>r.topicMatchScore<0.25),
    criticalRate:rate(chunk,r=>r.rewritePriority==='critical'),
    highOrWorseRate:rate(chunk,r=>['critical','high'].includes(r.rewritePriority)),
    avgLen: chunk.length ? Math.round(chunk.reduce((a,b)=>a+b.currentAnswerLength,0)/chunk.length) : 0,
  })
}

let suspectedStart = null
for (const w of windows){
  if (w.start>=1100 && (w.highOrWorseRate>=0.3 || w.badPhraseRate>=0.2 || w.templateRate>=0.2)) { suspectedStart=w.start; break }
}
if (!suspectedStart){
  let maxWin=windows[0]
  for (const w of windows){ if (w.highOrWorseRate>maxWin.highOrWorseRate) maxWin=w }
  suspectedStart=maxWin.start
}

const topProblemRows = rows
  .filter(r=>['critical','high'].includes(r.rewritePriority))
  .sort((a,b)=>a.index-b.index)

const priorityAfter1200 = topProblemRows.filter(r=>r.index>=1200)
const suggestedRange = priorityAfter1200.length
  ? `${priorityAfter1200[0].index}-${priorityAfter1200[Math.min(priorityAfter1200.length-1, 249)].index}`
  : `${suspectedStart}-${Math.min(suspectedStart+199, rows.length)}`

const sample30 = topProblemRows.slice(0,30).map(r=>({index:r.index,id:r.id,question:r.question,reasons:r.rewriteReasons}))

const report = {
  generatedAt:new Date().toISOString(),
  total:rows.length,
  before1200:metrics.before,
  after1200:metrics.after,
  windows,
  suspectedStartIndex:suspectedStart,
  suggestedPriorityRange:suggestedRange,
  criticalOrHighCount:topProblemRows.length,
  criticalOrHighAfter1200:priorityAfter1200.length,
  sample30
}

const md=[]
md.push('# Q&A Contamination Boundary Report')
md.push('')
md.push(`- Generated at: ${report.generatedAt}`)
md.push(`- Total Q&A: ${report.total}`)
md.push(`- Suspected contamination start index: **${report.suspectedStartIndex}**`)
md.push(`- Suggested priority range: **${report.suggestedPriorityRange}**`)
md.push('')
md.push('## 1~1199 vs 1200~End')
md.push(`- 1~1199 total: ${metrics.before.total}`)
md.push(`- 1~1199 badPhrase rate: ${pct(metrics.before.badPhraseRate)}`)
md.push(`- 1~1199 template-start rate: ${pct(metrics.before.templateRate)}`)
md.push(`- 1~1199 low-topic rate: ${pct(metrics.before.lowTopicRate)}`)
md.push(`- 1~1199 high-duplicate rate: ${pct(metrics.before.highDupRate)}`)
md.push(`- 1~1199 short-answer(<500) rate: ${pct(metrics.before.shortAnswerRate)}`)
md.push('')
md.push(`- 1200~end total: ${metrics.after.total}`)
md.push(`- 1200~end badPhrase rate: ${pct(metrics.after.badPhraseRate)}`)
md.push(`- 1200~end template-start rate: ${pct(metrics.after.templateRate)}`)
md.push(`- 1200~end low-topic rate: ${pct(metrics.after.lowTopicRate)}`)
md.push(`- 1200~end high-duplicate rate: ${pct(metrics.after.highDupRate)}`)
md.push(`- 1200~end short-answer(<500) rate: ${pct(metrics.after.shortAnswerRate)}`)
md.push('')
md.push('## 100-개 Window Summary (highOrWorse)')
for(const w of windows){
  md.push(`- ${w.range}: highOrWorse ${pct(w.highOrWorseRate)}, badPhrase ${pct(w.badPhraseRate)}, template ${pct(w.templateRate)}, avgLen ${w.avgLen}`)
}
md.push('')
md.push('## Critical/High Samples (30)')
for (const s of sample30){
  md.push(`- [${s.index}] ${s.id}: ${s.question}`)
  md.push(`  reasons: ${(s.reasons||[]).join(', ')}`)
}

fs.mkdirSync(path.dirname(outMd),{recursive:true})
fs.writeFileSync(outMd, md.join('\n'))
console.log(JSON.stringify({ok:true, outMd, suspectedStart:report.suspectedStartIndex, suggestedRange:report.suggestedPriorityRange},null,2))
