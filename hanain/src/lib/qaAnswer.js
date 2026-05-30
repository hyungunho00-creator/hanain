const BAD_PHRASES = [
  '정신건강/수면 문제 질문은',
  '근골격 맥락에서',
  '대사질환 맥락에서',
  '항암·면역 맥락에서',
  '소화·간 맥락에서',
  '심혈관 맥락에서',
  '뇌·인지 맥락에서',
  '피부/모발 맥락에서',
  '증상, 검사, 치료, 생활요인을 함께 봐야',
  '현재 상태를 구조화',
  '무엇을 먼저 확인할지',
  '보존치료·재활치료·수술치료 가능성을 단계적으로 설명',
  '이 질문의 핵심은',
  '실전 답은',
  '작은 루틴',
  '관리형 질문',
]

const BAD_GRAMMAR_PATTERNS = [
  /\?에 대한/g,
  /은\?에 대한/g,
  /는\?에 대한/g,
  /요\?에 대한/g,
  /방법은\?에 대한/g,
  /치료하나요\?에 대한/g,
]

const CATEGORY_START_WORDS = [
  '근골격',
  '대사질환',
  '항암',
  '소화',
  '심혈관',
  '뇌',
  '인지',
  '정신건강',
  '피부',
  '모발',
]

const MEDICAL_SIGNAL_RE = /(치료|수술|진료|검사|의료진|응급|항암|부작용|신장|경련)/i
const PHLOROTANNIN_RE = /플로로탄닌/i
const PHLORO_CLAIM_RE = /플로로탄닌.{0,40}(치료|예방|개선|회복|완화|낫게|줄인다|낮춘다|약 대신)/i

const QUESTION_STOPWORDS = new Set([
  '무엇',
  '뭔가요',
  '뭔가',
  '어떻게',
  '방법',
  '관리',
  '치료',
  '질문',
  '인가요',
  '있나요',
  '좋나요',
  '되나요',
  '하나요',
  '필요',
  '입니다',
  '가',
  '이',
  '은',
  '는',
  '을',
  '를',
  '에',
  '의',
])

function normalizeSpace(text) {
  return String(text || '').replace(/\s+/g, ' ').trim()
}

export function stripHtml(text) {
  return String(text || '').replace(/<[^>]+>/g, ' ')
}

function normalizeText(text) {
  return normalizeSpace(stripHtml(text))
}

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function splitToList(value) {
  if (!value) return []
  if (Array.isArray(value)) return value.map((x) => normalizeSpace(x)).filter(Boolean)
  return normalizeSpace(String(value))
    .split(/\n+/)
    .map((x) => normalizeSpace(x.replace(/^[-*\d.)\s]+/, '')))
    .filter(Boolean)
}

function sectionHtml(title, value) {
  if (!value) return ''
  const text = normalizeSpace(String(value))
  if (!text) return ''
  return `<h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p>`
}

function listSectionHtml(title, listValue) {
  const items = splitToList(listValue)
  if (!items.length) return ''
  return `<h3>${escapeHtml(title)}</h3><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
}

export function answerObjectToHtml(answerObj) {
  if (!answerObj || typeof answerObj !== 'object') return ''
  const body = [
    sectionHtml('짧은 답변', answerObj.shortAnswer),
    sectionHtml('자세히 보면', answerObj.detailedAnswer),
    listSectionHtml('먼저 확인할 것', answerObj.checkFirst),
    listSectionHtml('진료가 필요한 경우', answerObj.whenToSeeDoctor),
    listSectionHtml('피해야 할 것', answerObj.avoidList),
    listSectionHtml('생활관리 팁', answerObj.lifestyleTips),
    answerObj.phlorotanninBridge
      ? `<div class="qa-phlorotannin-block">${sectionHtml('성분 정보로 함께 보기', answerObj.phlorotanninBridge)}</div>`
      : '',
    sectionHtml('안내문', answerObj.disclaimer),
  ].filter(Boolean)
  return body.length ? `<div class="qa-structured">${body.join('')}</div>` : ''
}

function sectionsToHtml(sections) {
  if (!Array.isArray(sections) || sections.length === 0) return ''
  const body = sections
    .map((section) => {
      if (typeof section === 'string') return `<p>${escapeHtml(section)}</p>`
      if (!section || typeof section !== 'object') return ''
      const title = section.title || section.heading || section.name || ''
      const content = section.content || section.body || section.text || ''
      if (!title && !content) return ''
      if (Array.isArray(content)) {
        return `${title ? `<h3>${escapeHtml(title)}</h3>` : ''}<ul>${content.map((x) => `<li>${escapeHtml(x)}</li>`).join('')}</ul>`
      }
      return `${title ? `<h3>${escapeHtml(title)}</h3>` : ''}<p>${escapeHtml(content)}</p>`
    })
    .filter(Boolean)
    .join('')
  return body ? `<div class="qa-structured">${body}</div>` : ''
}

function markdownToHtml(markdown) {
  const text = normalizeSpace(markdown)
  if (!text) return ''
  const lines = String(markdown || '').split('\n')
  const html = []
  let inList = false
  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      if (inList) {
        html.push('</ul>')
        inList = false
      }
      continue
    }
    if (/^[-*]\s+/.test(line)) {
      if (!inList) {
        html.push('<ul>')
        inList = true
      }
      html.push(`<li>${escapeHtml(line.replace(/^[-*]\s+/, ''))}</li>`)
      continue
    }
    if (inList) {
      html.push('</ul>')
      inList = false
    }
    if (/^#{2,3}\s+/.test(line)) {
      html.push(`<h3>${escapeHtml(line.replace(/^#{2,3}\s+/, ''))}</h3>`)
    } else {
      html.push(`<p>${escapeHtml(line)}</p>`)
    }
  }
  if (inList) html.push('</ul>')
  return `<div class="qa-structured">${html.join('')}</div>`
}

function normalizeAnswerValue(value) {
  if (typeof value === 'string') return value.trim()
  if (!value || typeof value !== 'object') return ''
  return answerObjectToHtml(value).trim()
}

function combineShortAndDetailed(shortAnswer, detailedAnswer) {
  if (!shortAnswer && !detailedAnswer) return ''
  return answerObjectToHtml({ shortAnswer, detailedAnswer })
}

export function extractLegacyCandidates(qa) {
  if (!qa || typeof qa !== 'object') return []
  const rows = [
    ['validatedAnswer', qa.validatedAnswer ?? qa.validated_answer],
    ['restoredAnswer', qa.restoredAnswer],
    ['answer', qa.answer],
    ['body', qa.body],
    ['content', qa.content],
    ['detailedAnswer', qa.detailedAnswer],
    ['short+detail', combineShortAndDetailed(qa.shortAnswer, qa.detailedAnswer)],
    ['sections', sectionsToHtml(qa.sections)],
    ['markdown', markdownToHtml(qa.markdown)],
    ['html', qa.html],
    ['explanation', qa.explanation],
    ['description', qa.description],
    ['excerpt', qa.excerpt],
    ['originalAnswer', qa.originalAnswer],
    ['legacyAnswer', qa.legacyAnswer],
    ['generatedAnswer', qa.generatedAnswer],
  ]
  return rows
    .map(([source, value]) => [source, normalizeAnswerValue(value)])
    .filter(([, value]) => Boolean(value))
}

function extractQuestionTokens(question) {
  return String(question || '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .map((x) => x.trim())
    .filter((x) => x.length >= 2 && !QUESTION_STOPWORDS.has(x))
    .slice(0, 6)
}

function firstParagraphText(answerHtml) {
  const match = String(answerHtml || '').match(/<p[^>]*>([\s\S]*?)<\/p>/i)
  return match ? normalizeText(match[1]) : normalizeText(answerHtml).slice(0, 300)
}

function startsWithCategoryTemplate(firstSentence) {
  const normalized = normalizeText(firstSentence)
  if (!normalized) return false
  if (BAD_PHRASES.some((phrase) => normalized.startsWith(phrase))) return true
  if (CATEGORY_START_WORDS.some((w) => normalized.startsWith(w))) return true
  if (normalized.startsWith('이 질문의 핵심은') || normalized.startsWith('현재 상태를 구조화')) return true
  return false
}

function containsBadPhrase(text) {
  const normalized = normalizeText(text)
  return BAD_PHRASES.some((phrase) => normalized.includes(phrase))
}

function includesQuestionKeywords(question, answerText) {
  const tokens = extractQuestionTokens(question)
  if (!tokens.length) return true
  const first300 = normalizeText(answerText).slice(0, 300)
  return tokens.some((token) => first300.includes(token))
}

function hasPhlorotanninInFirstParagraph(answerHtml) {
  return PHLOROTANNIN_RE.test(firstParagraphText(answerHtml))
}

function hasPhlorotanninClaim(answerHtml) {
  return PHLORO_CLAIM_RE.test(normalizeText(answerHtml))
}

export function validateLegacyAnswer(qa, answerHtml) {
  const answerText = normalizeText(answerHtml)
  const question = String(qa?.question || '')
  const status = String(qa?.qualityStatus || qa?.quality_status || '').toLowerCase()

  if (!answerText) return { pass: false, reason: 'empty-answer' }
  if (containsBadPhrase(answerText)) return { pass: false, reason: 'category-template-answer-detected' }
  if (BAD_GRAMMAR_PATTERNS.some((re) => re.test(answerText))) return { pass: false, reason: 'bad-question-grammar-pattern' }
  if (startsWithCategoryTemplate(firstParagraphText(answerHtml))) return { pass: false, reason: 'category-first-sentence' }
  if (!includesQuestionKeywords(question, answerText)) return { pass: false, reason: 'question-keyword-mismatch' }
  if (hasPhlorotanninInFirstParagraph(answerHtml)) return { pass: false, reason: 'phlorotannin-first-paragraph' }
  if (hasPhlorotanninClaim(answerText)) return { pass: false, reason: 'phlorotannin-therapeutic-claim' }
  if (status === 'validated' && !answerText) return { pass: false, reason: 'validated-without-answer' }

  const sourceStatus = String(qa?.sourceStatus || qa?.source_status || '').toLowerCase()
  const isMedicalTone = MEDICAL_SIGNAL_RE.test(answerText.slice(0, 800))
  if (isMedicalTone && (sourceStatus === 'source_gap' || sourceStatus === 'missing' || sourceStatus === 'needs_medical_review')) {
    return { pass: false, reason: 'medical-source-gap' }
  }

  return { pass: true, reason: 'ok' }
}

export function buildReviewNoticeHtml() {
  return '<div class="qa-answer-missing"><p>답변 본문을 불러오지 못했습니다.</p></div>'
}

export function getRenderableQAAnswer(qa) {
  const legacyCandidates = extractLegacyCandidates(qa)
  for (const [source, candidateHtml] of legacyCandidates) {
    if (candidateHtml) {
      return {
        mode: source === 'validatedAnswer' ? 'validated' : 'legacy',
        html: candidateHtml,
        source: `legacy.${source}`,
        badge: null,
        schemaEligible: true,
        noindex: false,
      }
    }
  }

  return {
    mode: 'missing',
    html: buildReviewNoticeHtml(),
    source: 'missing',
    badge: null,
    schemaEligible: false,
    noindex: false,
  }
}

export function shouldEmitQASchema(qa) {
  const renderable = getRenderableQAAnswer(qa)
  return renderable.schemaEligible && Boolean(normalizeText(renderable.html))
}

export function answerPlainTextForMeta(qa, fallback = '') {
  const renderable = getRenderableQAAnswer(qa)
  const plain = normalizeText(renderable.html)
  return plain || fallback
}
