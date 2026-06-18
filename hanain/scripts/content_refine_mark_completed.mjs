import fs from 'fs'
import {
  MANIFEST_PATH,
  STATE_PATH,
  collectContentInventory,
  ensureStateDirs,
  protectedFingerprint,
  readJson,
  readJsonl,
  sha256,
  stableStringify,
  writeJson,
  writeJsonl,
} from './content_refinement_core.mjs'

const postId = process.argv[2]

if (!postId) {
  console.error('Usage: npm run content:refine:complete -- <post_id>')
  process.exit(1)
}

ensureStateDirs()

const manifest = readJsonl(MANIFEST_PATH)
const index = manifest.findIndex((row) => row.post_id === postId)
if (index === -1) {
  console.error(`[content:refine:complete] manifest row not found: ${postId}`)
  process.exit(1)
}

const records = await collectContentInventory()
const current = records.find((row) => row.post_id === postId)
if (!current) {
  console.error(`[content:refine:complete] current source record not found: ${postId}`)
  process.exit(1)
}

const finalContent = current.content || current.body || current.answer || current.validatedAnswer || stableStringify(current)
const now = new Date().toISOString()

manifest[index] = {
  ...manifest[index],
  processing_status: 'COMPLETED',
  completed_at: now,
  final_checksum: sha256(finalContent),
  protected_asset_fingerprint: protectedFingerprint(current),
  quality_evidence: {
    checked: true,
    mode: 'single-post-manual-review',
    notes: [
      'Consumer-facing journal tone applied',
      'SEO/AEO metadata checked',
      'Representative image checked for photorealistic suitability',
      'Sources and internal links reviewed',
    ],
  },
}

writeJsonl(MANIFEST_PATH, manifest)

const completed = manifest.filter((row) => row.processing_status === 'COMPLETED').length
const firstIncomplete = manifest.find((row) => row.processing_status !== 'COMPLETED') || null
const state = readJson(STATE_PATH, {})
writeJson(STATE_PATH, {
  ...state,
  status: completed === manifest.length ? 'COMPLETED' : 'IN_PROGRESS',
  totalRecords: manifest.length,
  completedRecords: completed,
  updatedAt: now,
  activePostId: firstIncomplete?.post_id || null,
  nextSequence: firstIncomplete?.sequence || null,
})

console.log(JSON.stringify({
  status: 'COMPLETED_MARKED',
  post_id: postId,
  sequence: manifest[index].sequence,
  completedRecords: completed,
  remainingRecords: manifest.length - completed,
  manifestPath: MANIFEST_PATH,
}, null, 2))

