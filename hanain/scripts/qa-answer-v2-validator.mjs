#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const QA_SRC = path.join(ROOT, 'src', 'data', 'qa.json')
const OUT_PATH = path.join(ROOT, 'docs', 'qa-answer-v2-validator-result.md')

const BAD_PHRASES = [
  '근골격 맥락에서','정신건강/수면 문제 질문은','대사질환 맥락에서','항암·면역 맥락에서','소화·간 맥락에서','심혈관 맥락에서','뇌·인지 맥락에서','피부/모발 맥락에서','증상, 검사, 치료, 생활요인을 함께 봐야','현재 상태를 구조화','무엇을 먼저 확인할지','실전 답은','작은 루틴','관리형 질문','?에 대한','은?에 대한','는?에 대한','요?에 대한'
]
const BAD_GRAMMAR = [ /\?에 대한/, /은\?에 대한/, /는\?에 대한/, /요\?에 대한/ ]

function argValue(name, fallback = null) {
  const i = process.argv.indexOf(name)
  if (i === -1) return fallback
  return process.argv[i + 1] ?? fallback
}
function hasFlag(name) { return process.argv.includes(name) }
function stripHtml(s='') { return String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim() }

function collectText(v2) {
  return [
    v2.shortAnswer || '',
    ...(v2.sections || []).flatMap(s => [s.heading || '', s.body || '']),
    ...(v2.checkFirst || []),
    ...(v2.whenToSeeDoctor || []),
    ...(v2.avoidList || []),
    ...(v2.lifestyleTips || []),
    v2.phlorotanninBridge || '',
    v2.disclaimer || '',
  ].join('\n')
}

function requiredTermsFromQuestion(question='') {
  const q = question
  if (q.includes('척추') && q.includes('수면')) return ['척추','수면','자세']
  if (q.includes('반달') || q.includes('반월판')) return ['반월판','무릎','연골']
  if (q.includes('어깨') && q.includes('탈구')) return ['어깨','탈구']
  if (q.includes('체외충격파')) return ['체외충격파']
  if (q.includes('디스크')) return ['디스크','자세']
  if (q.includes('낙상')) return ['낙상','예방']
  if (q.includes('유전자') || q.includes('NGS')) return ['유전자','NGS']
  if (q.includes('식욕')) return ['식욕','암환자']
  if (q.includes('종양 용해')) return ['종양','용해']
  if (q.includes('당뇨') || q.includes('공복혈당')) return ['당뇨','혈당']
  return []
}

function validateRow(q) {
  const v2 = q.answerV2
  const failures = []
  if (!v2 || typeof v2 !== 'object') return failures
  if (String(v2.status).toLowerCase() !== 'approved') return failures

  const text = collectText(v2)
  const plain = stripHtml(text)
  const first300 = plain.slice(0,300)
  const firstPara = stripHtml(`${v2.shortAnswer || ''} ${(v2.sections?.[0]?.body || '')}`).slice(0,260)

  if (!stripHtml(v2.shortAnswer)) failures.push('empty-shortAnswer')
  if (!plain) failures.push('empty-body')
  const medical = /(치료|진료|병원|검사|수술|약물|항암|증후군|진단)/.test(q.question || '')
  if (medical && plain.length < 500) failures.push('medical-body-too-short')

  const reqTerms = requiredTermsFromQuestion(q.question || '')
  if (reqTerms.length) {
    const hit = reqTerms.filter(t => first300.includes(t)).length
    if (hit === 0) failures.push('title-terms-missing-in-first300')
  }

  const bad = BAD_PHRASES.find(p => plain.includes(p) || String(v2.shortAnswer || '').includes(p))
  if (bad) failures.push(`bad-phrase:${bad}`)
  if (BAD_GRAMMAR.some(re => re.test(plain))) failures.push('bad-grammar-pattern')

  if (/플로로탄닌|phlorotannin|감태|씨놀|디에콜|에콜/i.test(firstPara)) failures.push('phlorotannin-in-first-paragraph')
  if (/플로로탄닌.{0,24}(치료|예방|개선|완화|회복|통증|혈당|암|식욕)/.test(plain)) failures.push('phlorotannin-therapeutic-claim')

  if (!Array.isArray(v2.whenToSeeDoctor) || v2.whenToSeeDoctor.filter(Boolean).length === 0) failures.push('missing-whenToSeeDoctor')
  if (!Array.isArray(v2.avoidList) || v2.avoidList.filter(Boolean).length === 0) failures.push('missing-avoidList')
  if (!stripHtml(v2.disclaimer)) failures.push('missing-disclaimer')

  return failures
}

function run() {
  const batch = argValue('--batch')
  const all = hasFlag('--all') || !batch
  const qaDoc = JSON.parse(fs.readFileSync(QA_SRC,'utf8'))
  const rows = qaDoc.questions || []

  const failures = []
  let scanned = 0
  for (const q of rows) {
    if (!q.answerV2 || String(q.answerV2.status).toLowerCase() !== 'approved') continue
    if (!all && String(q.reviewBatch || '') !== batch) continue
    scanned += 1
    const errs = validateRow(q)
    if (errs.length) failures.push({ id:q.id, question:q.question, batch:q.reviewBatch || '', errors:errs })
  }

  const status = failures.length ? 'FAIL' : 'PASS'
  const lines = [
    '# QA Answer V2 Validator Result',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- mode: ${all ? 'all' : `batch:${batch}`}`,
    `- approvedScanned: ${scanned}`,
    `- failures: ${failures.length}`,
    `- status: ${status}`,
    '',
    '## Failures',
    ...(failures.length ? failures.map(f => `- ${f.id} (${f.batch}) ${f.question} => ${f.errors.join(', ')}`) : ['- none']),
  ]
  fs.writeFileSync(OUT_PATH, lines.join('\n') + '\n', 'utf8')
  console.log(JSON.stringify({ approvedScanned: scanned, failures: failures.length, status }, null, 2))
  if (failures.length) process.exit(2)
}

run()
