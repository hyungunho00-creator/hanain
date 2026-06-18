export function canonicalQuestionSlug(value) {
  return String(value || '')
    .normalize('NFC')
    .replace(/[^\w\s\uAC00-\uD7A3-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

export function legacyQuestionSlug(value) {
  return String(value || '')
    .normalize('NFC')
    .replace(/[^\w\s\uAC00-\uD7A3]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

export function questionSlugCandidates(value) {
  return Array.from(new Set([
    canonicalQuestionSlug(value),
    legacyQuestionSlug(value),
  ].filter(Boolean)))
}
