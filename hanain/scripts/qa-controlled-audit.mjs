#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const qaPath = path.join(ROOT, 'src', 'data', 'qa.json')
const outAuditJson = path.join(ROOT, 'data', 'qa-controlled-audit.json')
const outQueueJson = path.join(ROOT, 'data', 'qa-rewrite-queue.json')
const outMd = path.join(ROOT, 'docs', 'qa-controlled-audit-result.md')

const BAD_PHRASES = [
  '근골격 맥락에서','정신건강/수면 문제 질문은','대사질환 맥락에서','항암·면역 맥락에서','소화·간 맥락에서','심혈관 맥락에서','뇌·인지 맥락에서','피부/모발 맥락에서','증상, 검사, 치료, 생활요인을 함께 봐야','현재 상태를 구조화','무엇을 먼저 확인할지','실전 답은','작은 루틴','관리형 질문','?에 대한','은?에 대한','는?에 대한','요?에 대한'
]
const CATEGORY_START_PHRASES = ['근골격 질문은','대사질환 질문은','항암·면역 질문은','정신건강/수면 문제 질문은','근골격 맥락에서','대사질환 맥락에서','항암·면역 맥락에서']
const PHLORO_TERMS = ['플로로탄닌','phlorotannin','감태','씨놀','디에콜','에콜']
const MEDICAL_MARKERS = ['치료','진료','병원','검사','수술','항암','증후군','약물','부작용','응급','진단','의사','의료진']

function stripHtml(s='') { return String(s).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim() }
function normalize(s='') { return stripHtml(s).toLowerCase().replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim() }
function tokenizeKR(s='') {
  const n = normalize(s)
  return n.split(' ').map(t=>t.trim()).filter(t=>t.length>=2 && !STOPWORDS.has(t))
}
const STOPWORDS = new Set(['이','그','저','것','수','등','및','를','을','은','는','이란','무엇','어떻게','하나요','인가요','있나요','위한','에서','대한','하는','하면','때','후','전','중'])
function firstAvailableField(q){
  const cands=['validatedAnswer','validated_answer','answer','body','content','detailedAnswer','shortAnswer']
  for (const k of cands) {
    if (typeof q[k]==='string' && q[k].trim()) return {field:k,text:q[k]}
  }
  return {field:'none',text:''}
}
function containsBadPhrase(text){
  return BAD_PHRASES.find(p=>text.includes(p)) || null
}
function startsWithCategoryTemplate(text){
  return CATEGORY_START_PHRASES.some(p=>text.startsWith(p))
}
function titleTermsInFirst300Chars(question, answerText){
  const qTerms=[...new Set(tokenizeKR(question))].slice(0,12)
  if (!qTerms.length) return true
  const head = stripHtml(answerText).slice(0,300)
  return qTerms.some(t=>head.includes(t))
}
function topicMatchScore(question, answerText){
  const qTerms=[...new Set(tokenizeKR(question))]
  if (!qTerms.length) return 1
  const aNorm=normalize(answerText)
  const hit=qTerms.filter(t=>aNorm.includes(t)).length
  return Number((hit/qTerms.length).toFixed(3))
}
function phlorotanninPlacement(answerText){
  const plain=stripHtml(answerText)
  if (!plain) return 'none'
  const lower=plain.toLowerCase()
  const idxs = PHLORO_TERMS.map(t=>lower.indexOf(t.toLowerCase())).filter(i=>i>=0)
  if (!idxs.length) return 'none'
  const idx=Math.min(...idxs)
  const ratio=idx/Math.max(plain.length,1)
  if (ratio<=0.33) return 'top'
  if (ratio<=0.66) return 'middle'
  return 'bottom'
}
function medicalSourceNeeded(q, answerText){
  const qText = `${q.question||''} ${q.tags?.join(' ')||''}`
  const src = `${qText} ${stripHtml(answerText)}`
  return MEDICAL_MARKERS.some(m=>src.includes(m))
}

function ensureDirFor(file){ fs.mkdirSync(path.dirname(file), {recursive:true}) }

const qaRaw=JSON.parse(fs.readFileSync(qaPath,'utf8'))
const questions = (qaRaw.questions||[]).map((q,i)=>({ ...q, __index:i+1 }))

const dupMap = new Map()
for (const q of questions){
  const {text}=firstAvailableField(q)
  const key = normalize(stripHtml(text).slice(0,220))
  if (!key) continue
  dupMap.set(key, (dupMap.get(key)||0)+1)
}

const audit=[]
for (const q of questions){
  const idx=q.__index
  const {field,text} = firstAvailableField(q)
  const plain=stripHtml(text)
  const bad=containsBadPhrase(plain)
  const startsTemplate=startsWithCategoryTemplate(plain)
  const titleInHead = titleTermsInFirst300Chars(q.question||'', plain)
  const tScore = topicMatchScore(q.question||'', plain)
  const dupKey = normalize(plain.slice(0,220))
  const dupCount = dupMap.get(dupKey)||0
  const duplicateRisk = dupCount>=5 ? 'high' : dupCount>=3 ? 'medium' : 'low'
  const phPos = phlorotanninPlacement(plain)
  const medNeed = medicalSourceNeeded(q, plain)
  const hasAnswer = plain.length>0

  let priority='none'
  const reasons=[]
  if (!hasAnswer) { priority='critical'; reasons.push('blank-answer') }
  if (bad) { priority='critical'; reasons.push(`bad-phrase:${bad}`) }
  if (startsTemplate) { priority='critical'; reasons.push('category-template-start') }
  if (!titleInHead) { if (priority==='none') priority='high'; reasons.push('title-term-missing-in-first300') }
  if (tScore < 0.25) { if (priority==='none' || priority==='low') priority='high'; reasons.push('low-topic-match') }
  if (duplicateRisk==='high') { if (priority==='none') priority='medium'; reasons.push('duplicate-high') }
  if (phPos==='top') { if (priority==='none' || priority==='low') priority='high'; reasons.push('phlorotannin-top') }
  if (idx>=1200 && priority==='none') priority='low'

  audit.push({
    index: idx,
    id: q.id || '',
    slug: q.slug || '',
    question: q.question || '',
    category: q.category || q.category_id || '',
    tags: Array.isArray(q.tags)?q.tags:[],
    currentAnswerField: field,
    currentAnswerLength: plain.length,
    hasAnswer,
    hasBadPhrase: !!bad,
    startsWithCategoryTemplate: startsTemplate,
    titleTermsInFirst300Chars: titleInHead,
    duplicateRisk,
    topicMatchScore: tScore,
    phlorotanninPlacement: phPos,
    medicalSourceNeeded: medNeed,
    rewritePriority: priority,
    suspectedRange: idx<1200 ? 'before1200' : 'after1200',
    rewriteReasons: reasons
  })
}

const priorityRank = {critical:4, high:3, medium:2, low:1, none:0}
const queueItems = audit
  .filter(a=>a.rewritePriority!=='none')
  .sort((a,b)=>{
    const p = priorityRank[b.rewritePriority]-priorityRank[a.rewritePriority]
    if (p!==0) return p
    return a.index-b.index
  })
  .map(a=>({
    index:a.index,
    id:a.id,
    slug:a.slug,
    question:a.question,
    category:a.category,
    tags:a.tags,
    currentAnswerPreview: stripHtml((questions[a.index-1]?.validatedAnswer || questions[a.index-1]?.answer || '')).slice(0,220),
    rewriteReason: a.rewriteReasons.join(',') || 'quality-review',
    priority: a.rewritePriority,
    requiredTerms: tokenizeKR(a.question).slice(0,8),
    forbiddenTerms: BAD_PHRASES,
    sourceNeeded: a.medicalSourceNeeded,
    status: 'pending'
  }))

const batches=[]
let cursor=0
while (cursor < queueItems.length){
  const chunk=queueItems.slice(cursor, cursor+50)
  const start=chunk[0]?.index
  const end=chunk[chunk.length-1]?.index
  batches.push({ batchId:`qa-${String(start).padStart(4,'0')}-${String(end).padStart(4,'0')}`, items:chunk })
  cursor += 50
}

const summary = {
  total: audit.length,
  rewriteCandidates: queueItems.length,
  byPriority: Object.fromEntries(['critical','high','medium','low','none'].map(k=>[k,audit.filter(a=>a.rewritePriority===k).length])),
  before1200: {
    total: audit.filter(a=>a.suspectedRange==='before1200').length,
    badPhrase: audit.filter(a=>a.suspectedRange==='before1200' && a.hasBadPhrase).length,
    templateStart: audit.filter(a=>a.suspectedRange==='before1200' && a.startsWithCategoryTemplate).length,
    lowTopicMatch: audit.filter(a=>a.suspectedRange==='before1200' && a.topicMatchScore<0.25).length,
  },
  after1200: {
    total: audit.filter(a=>a.suspectedRange==='after1200').length,
    badPhrase: audit.filter(a=>a.suspectedRange==='after1200' && a.hasBadPhrase).length,
    templateStart: audit.filter(a=>a.suspectedRange==='after1200' && a.startsWithCategoryTemplate).length,
    lowTopicMatch: audit.filter(a=>a.suspectedRange==='after1200' && a.topicMatchScore<0.25).length,
  }
}

ensureDirFor(outAuditJson)
ensureDirFor(outQueueJson)
ensureDirFor(outMd)
fs.writeFileSync(outAuditJson, JSON.stringify({generatedAt:new Date().toISOString(), summary, audit}, null, 2))
fs.writeFileSync(outQueueJson, JSON.stringify({generatedAt:new Date().toISOString(), summary, batches}, null, 2))

const md = [
  '# Q&A Controlled Audit Result',
  '',
  `- Generated at: ${new Date().toISOString()}`,
  `- Total Q&A: ${summary.total}`,
  `- Rewrite candidates: ${summary.rewriteCandidates}`,
  '',
  '## Priority',
  `- critical: ${summary.byPriority.critical}`,
  `- high: ${summary.byPriority.high}`,
  `- medium: ${summary.byPriority.medium}`,
  `- low: ${summary.byPriority.low}`,
  `- none: ${summary.byPriority.none}`,
  '',
  '## Range Comparison',
  `- before1200 total: ${summary.before1200.total}`,
  `- before1200 badPhrase: ${summary.before1200.badPhrase}`,
  `- before1200 templateStart: ${summary.before1200.templateStart}`,
  `- before1200 lowTopicMatch: ${summary.before1200.lowTopicMatch}`,
  '',
  `- after1200 total: ${summary.after1200.total}`,
  `- after1200 badPhrase: ${summary.after1200.badPhrase}`,
  `- after1200 templateStart: ${summary.after1200.templateStart}`,
  `- after1200 lowTopicMatch: ${summary.after1200.lowTopicMatch}`,
  '',
  '## Output Files',
  '- data/qa-controlled-audit.json',
  '- data/qa-rewrite-queue.json',
].join('\n')
fs.writeFileSync(outMd, md)

console.log(JSON.stringify({ok:true, summary, outAuditJson, outQueueJson, outMd}, null, 2))
