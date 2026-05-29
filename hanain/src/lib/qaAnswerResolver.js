const REVIEW_NOTICE_TEXT = '이 답변은 현재 검수 중입니다. 정확한 건강정보 제공을 위해 본문을 다시 확인하고 있습니다.'

const LEGACY_FIELDS = [
  'validatedAnswer',
  'validated_answer',
  'answer',
  'body',
  'content',
  'detailedAnswer',
  'shortAnswer',
  'restoredAnswer',
  'markdown',
  'html',
]

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function nlToHtml(value = '') {
  return escapeHtml(value).replace(/\n/g, '<br />')
}

function sectionHtml(title, body) {
  if (!body || !String(body).trim()) return ''
  return [
    '<section class="qa-section">',
    `  <h3>${escapeHtml(title)}</h3>`,
    `  <p>${nlToHtml(body)}</p>`,
    '</section>',
  ].join('\n')
}

function listHtml(title, items) {
  if (!Array.isArray(items)) return ''
  const normalized = items.map((v) => String(v || '').trim()).filter(Boolean)
  if (!normalized.length) return ''
  return [
    '<section class="qa-section">',
    `  <h3>${escapeHtml(title)}</h3>`,
    '  <ul>',
    ...normalized.map((item) => `    <li>${nlToHtml(item)}</li>`),
    '  </ul>',
    '</section>',
  ].join('\n')
}

function getAnswerV2Status(answerV2) {
  return String(answerV2?.status || '').trim().toLowerCase()
}

export function isApprovedAnswerV2(answerV2) {
  return getAnswerV2Status(answerV2) === 'approved'
}

export function getLegacyAnswerHtml(qa) {
  if (!qa || typeof qa !== 'object') return ''
  for (const field of LEGACY_FIELDS) {
    const raw = qa[field]
    if (typeof raw === 'string' && raw.trim()) return raw.trim()
  }
  return ''
}

export function buildAnswerV2Html(answerV2) {
  if (!answerV2 || typeof answerV2 !== 'object') return ''
  const chunks = []

  if (answerV2.shortAnswer) chunks.push(sectionHtml('짧은 답변', answerV2.shortAnswer))

  if (Array.isArray(answerV2.sections)) {
    for (const sec of answerV2.sections) {
      if (!sec || typeof sec !== 'object') continue
      chunks.push(sectionHtml(sec.heading || '자세히 보면', sec.body || ''))
    }
  }

  chunks.push(listHtml('먼저 확인할 것', answerV2.checkFirst))
  chunks.push(listHtml('진료가 필요한 경우', answerV2.whenToSeeDoctor))
  chunks.push(listHtml('피해야 할 것', answerV2.avoidList))
  chunks.push(listHtml('생활관리 팁', answerV2.lifestyleTips))

  if (answerV2.phlorotanninBridge) {
    chunks.push(sectionHtml('성분 정보로 함께 보기', answerV2.phlorotanninBridge))
  }
  if (answerV2.disclaimer) {
    chunks.push(sectionHtml('안내문', answerV2.disclaimer))
  }

  const html = chunks.filter(Boolean).join('\n')
  return html.trim()
}

export function getReviewNoticeHtml() {
  return `<p>${escapeHtml(REVIEW_NOTICE_TEXT)}</p>`
}

export function getRenderableQaAnswer(qa) {
  const answerV2 = qa?.answerV2 || qa?.answer_v2 || null
  if (isApprovedAnswerV2(answerV2)) {
    const v2Html = buildAnswerV2Html(answerV2)
    if (v2Html) {
      return {
        mode: 'answerV2',
        html: v2Html,
        sourceField: 'answerV2',
        status: 'approved',
      }
    }
  }

  const legacyHtml = getLegacyAnswerHtml(qa)
  if (legacyHtml) {
    return {
      mode: 'legacy',
      html: legacyHtml,
      sourceField: 'legacy',
      status: String(qa?.qualityStatus || qa?.quality_status || '').toLowerCase() || 'unknown',
    }
  }

  return {
    mode: 'review_notice',
    html: getReviewNoticeHtml(),
    sourceField: 'notice',
    status: 'needs_review',
  }
}

export function hasRenderableQaAnswer(qa) {
  return getRenderableQaAnswer(qa).mode !== 'review_notice'
}

export function getRenderableQaPlainText(qa, max = 500) {
  const rendered = getRenderableQaAnswer(qa)
  const plain = String(rendered.html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return plain.slice(0, max)
}

export function isQaAnswerSeoEligible(qa) {
  const rendered = getRenderableQaAnswer(qa)
  if (rendered.mode === 'answerV2') return true
  const status = String(qa?.qualityStatus || qa?.quality_status || '').toLowerCase()
  return status === 'validated' && rendered.mode === 'legacy'
}

