import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  getRenderableQAAnswer,
  isSearchIndexableQA,
  stripHtml,
  validateLegacyAnswer,
} from '../src/lib/qaAnswer.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const QA_PATH = path.join(ROOT, 'public', 'qa.json')
const OUT_PATH = path.join(ROOT, 'docs', 'qa-publication-recovery-queue.md')

function plain(html) {
  return String(stripHtml(html || '')).replace(/\s+/g, ' ').trim()
}

function reasonFor(item) {
  const renderable = getRenderableQAAnswer(item)
  const text = plain(renderable.html)
  const sourceStatus = String(item.sourceStatus || item.source_status || '').toLowerCase()
  const validation = validateLegacyAnswer(item, renderable.html || '')

  if (!text) return 'empty-answer'
  if (text.length < 700) return 'short-answer'
  if (!['verified', 'referenced'].includes(sourceStatus)) return `sourceStatus:${sourceStatus || 'missing'}`
  if (!validation.pass) return validation.reason
  return 'ok'
}

function priorityFor(row) {
  if (row.reason === 'short-answer' && row.sourceStatus === 'referenced') return 1
  if (row.reason === 'short-answer') return 2
  if (row.reason.startsWith('sourceStatus')) return 3
  if (row.reason === 'phlorotannin-therapeutic-claim') return 4
  if (row.reason === 'category-template-answer-detected') return 5
  return 9
}

function run() {
  const qa = JSON.parse(fs.readFileSync(QA_PATH, 'utf8'))
  const rows = (qa.questions || []).map((item, index) => {
    const renderable = getRenderableQAAnswer(item)
    const text = plain(renderable.html)
    const reason = reasonFor(item)
    const sourceStatus = String(item.sourceStatus || item.source_status || '').toLowerCase()
    return {
      index,
      id: item.id || '',
      question: item.question || '',
      category: item.category || item.category_id || '',
      sourceStatus,
      qualityStatus: item.qualityStatus || item.quality_status || '',
      chars: text.length,
      refs:
        (Array.isArray(item.references) ? item.references.length : 0) +
        (Array.isArray(item.references_text) ? item.references_text.length : 0) +
        (Array.isArray(item.references_pmid) ? item.references_pmid.length : 0),
      reason,
      indexable: isSearchIndexableQA(item),
    }
  })

  const counts = rows.reduce((acc, row) => {
    acc[row.reason] = (acc[row.reason] || 0) + 1
    return acc
  }, {})
  const hidden = rows.filter((row) => !row.indexable)
  const queue = hidden
    .sort(
      (a, b) =>
        priorityFor(a) - priorityFor(b) ||
        b.refs - a.refs ||
        b.chars - a.chars ||
        a.index - b.index,
    )
    .slice(0, 120)

  const lines = [
    '# QA Publication Recovery Queue',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- totalQuestions: ${rows.length}`,
    `- currentlyIndexable: ${rows.length - hidden.length}`,
    `- recoveryNeeded: ${hidden.length}`,
    '',
    '## Reason Counts',
    '',
    '| reason | count |',
    '|---|---:|',
    ...Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([reason, count]) => `| ${reason} | ${count} |`),
    '',
    '## Recovery Rule',
    '',
    '1. 출처가 이미 붙어 있고 본문만 짧은 글을 먼저 확장한다.',
    '2. 출처 상태가 부족한 글은 공식기관·학회·논문 출처를 붙인 뒤 확장한다.',
    '3. 템플릿 중복 글은 같은 카테고리 안에서 검색 의도별로 재작성한다.',
    '4. 플로로탄닌은 질환 치료 표현이 아니라 성분 정보·상담 기록 보조 맥락으로만 분리한다.',
    '',
    '## Top Queue',
    '',
    '| seq | priority | reason | chars | refs | category | id | question |',
    '|---:|---:|---|---:|---:|---|---|---|',
    ...queue.map(
      (row, index) =>
        `| ${index + 1} | ${priorityFor(row)} | ${row.reason} | ${row.chars} | ${row.refs} | ${row.category} | ${row.id} | ${row.question.replace(/\|/g, '/')} |`,
    ),
  ]

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
  fs.writeFileSync(OUT_PATH, `${lines.join('\n')}\n`, 'utf8')
  console.log(JSON.stringify({
    totalQuestions: rows.length,
    currentlyIndexable: rows.length - hidden.length,
    recoveryNeeded: hidden.length,
    report: path.relative(ROOT, OUT_PATH),
    topReason: Object.entries(counts).sort((a, b) => b[1] - a[1])[0],
  }, null, 2))
}

run()
