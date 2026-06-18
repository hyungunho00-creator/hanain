import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  canonicalQuestionSlug,
  legacyQuestionSlug,
  questionSlugCandidates,
} from '../src/lib/qaSlug.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')
const qaPath = path.join(root, 'src', 'data', 'qa.json')
const qaJson = JSON.parse(fs.readFileSync(qaPath, 'utf8'))
const questions = Array.isArray(qaJson.questions) ? qaJson.questions : []

const failures = []
const canonicalSeen = new Map()
const acceptedSlugs = new Map()

for (const q of questions) {
  const id = String(q.id || '')
  const question = String(q.question || '')
  const canonical = canonicalQuestionSlug(question)
  const legacy = legacyQuestionSlug(question)
  const candidates = questionSlugCandidates(question)

  if (!id) failures.push({ id, reason: 'missing id' })
  if (!question) failures.push({ id, reason: 'missing question' })
  if (!canonical) failures.push({ id, reason: 'empty canonical slug', question })
  if (!legacy) failures.push({ id, reason: 'empty legacy slug', question })

  if (canonicalSeen.has(canonical)) {
    failures.push({
      id,
      reason: 'duplicate canonical slug',
      slug: canonical,
      firstId: canonicalSeen.get(canonical),
    })
  } else {
    canonicalSeen.set(canonical, id)
  }

  for (const slug of candidates) {
    if (!acceptedSlugs.has(slug)) acceptedSlugs.set(slug, id)
  }

  const relatedLinkSlug = q.slug || canonical
  if (!relatedLinkSlug) {
    failures.push({ id, reason: 'empty related Q&A link slug' })
  } else if (!candidates.includes(relatedLinkSlug) && relatedLinkSlug !== id) {
    failures.push({
      id,
      reason: 'stored q.slug does not resolve through QuestionDetailPage fallback',
      slug: relatedLinkSlug,
      candidates,
    })
  }
}

if (acceptedSlugs.size < questions.length) {
  failures.push({
    reason: 'accepted slug index is smaller than question count',
    acceptedSlugs: acceptedSlugs.size,
    questions: questions.length,
  })
}

if (failures.length) {
  console.error('[audit-related-qa-links] FAIL')
  console.error(JSON.stringify(failures.slice(0, 25), null, 2))
  if (failures.length > 25) console.error(`...and ${failures.length - 25} more`)
  process.exit(1)
}

console.log(
  `[audit-related-qa-links] PASS questions=${questions.length} canonical=${canonicalSeen.size} acceptedSlugs=${acceptedSlugs.size}`,
)
