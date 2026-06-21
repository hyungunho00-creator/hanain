import fs from 'node:fs'

const data = JSON.parse(fs.readFileSync('src/data/qa.json', 'utf8'))

const patterns = [
  '증상, 검사, 치료, 생활요인을 함께 봐야 정확한 판단이 가능합니다',
  '원인·진단·생활요인·치료 여부를 구분해 보는 것이 먼저입니다',
]

const regexPatterns = [
  /질문은\s*[^<]{0,40}\s*맥락에서\s*증상,\s*검사,\s*치료,\s*생활요인을\s*함께\s*봐야/,
  /질문(?:의)?\s*핵심은\s*현재\s*상태를\s*구조화해\s*[“"]?무엇을\s*먼저\s*확인할지/,
]

const candidates = data.questions
  .map((q, index) => {
    const answer = String(q.answer || '')
    const hits = patterns.filter((pattern) => answer.includes(pattern))
    const regexHits = regexPatterns
      .filter((pattern) => pattern.test(answer.replace(/<[^>]+>/g, ' ')))
      .map((pattern) => pattern.source)
    hits.push(...regexHits)
    return hits.length
      ? {
          index,
          id: q.id,
          category: q.category,
          question: q.question,
          hits,
          answerStart: answer.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 220),
        }
      : null
  })
  .filter(Boolean)

fs.mkdirSync('docs', { recursive: true })
const lines = [
  '# Q&A Generic Answer Candidate Audit',
  '',
  `- generatedAt: ${new Date().toISOString()}`,
  `- source: src/data/qa.json`,
  `- totalQuestions: ${data.questions.length}`,
  `- candidates: ${candidates.length}`,
  '- mode: report-only; this script must not rewrite Q&A content',
  '',
  '## Policy',
  '',
  '- Do not bulk-rewrite these candidates.',
  '- Review each item manually against the actual question intent.',
  '- The public answer must read like a consumer health information journal, not a 상담 manual.',
  '- Keep medical claims evidence-based and connect phlorotannin positively within the question context.',
  '',
  '## Candidates',
  '',
  ...candidates.map((item, i) => [
    `### ${i + 1}. ${item.id}`,
    '',
    `- index: ${item.index}`,
    `- category: ${item.category}`,
    `- question: ${item.question}`,
    `- matched: ${item.hits.join(' / ')}`,
    `- answerStart: ${item.answerStart}`,
    '',
  ].join('\n')),
]

fs.writeFileSync('docs/qa-generic-answer-candidate-audit-result.md', lines.join('\n'))
console.log(`genericCandidates=${candidates.length}`)
console.log('report=docs/qa-generic-answer-candidate-audit-result.md')
