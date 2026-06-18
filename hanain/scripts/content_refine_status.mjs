import { MANIFEST_PATH, STATE_PATH, latestBackupPath, readJson, readJsonl } from './content_refinement_core.mjs'

const manifest = readJsonl(MANIFEST_PATH)
const state = readJson(STATE_PATH, {})
const counts = manifest.reduce((acc, row) => {
  acc[row.processing_status] = (acc[row.processing_status] || 0) + 1
  return acc
}, {})
const firstIncomplete = manifest.find((row) => row.processing_status !== 'COMPLETED') || null

console.log(JSON.stringify({
  status: state.status || 'NOT_PREPARED',
  totalManifestPosts: manifest.length,
  statusCounts: counts,
  completedPosts: counts.COMPLETED || 0,
  incompletePosts: manifest.length - (counts.COMPLETED || 0),
  firstIncomplete: firstIncomplete ? {
    sequence: firstIncomplete.sequence,
    post_id: firstIncomplete.post_id,
    URL: firstIncomplete.URL,
    processing_status: firstIncomplete.processing_status,
  } : null,
  manifestPath: MANIFEST_PATH,
  backupPath: state.backupPath || latestBackupPath(),
}, null, 2))
