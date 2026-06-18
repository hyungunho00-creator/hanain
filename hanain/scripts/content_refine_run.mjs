import path from 'path'
import {
  LOGS_DIR,
  MANIFEST_PATH,
  STATE_PATH,
  ensureStateDirs,
  readJson,
  readJsonl,
  writeJson,
} from './content_refinement_core.mjs'

function main() {
  ensureStateDirs()
  const manifest = readJsonl(MANIFEST_PATH)
  if (!manifest.length) throw new Error('Manifest is missing. Run npm run content:refine:prepare first.')
  const firstIncomplete = manifest.find((row) => row.processing_status !== 'COMPLETED')
  const state = readJson(STATE_PATH, {})
  const log = {
    generatedAt: new Date().toISOString(),
    status: 'PAUSED_RUN',
    reason: 'No isolated editor adapter is configured. This command is intentionally non-writing until CONTENT_REFINEMENT_EDITOR_COMMAND is implemented.',
    activePost: firstIncomplete ? {
      sequence: firstIncomplete.sequence,
      post_id: firstIncomplete.post_id,
      URL: firstIncomplete.URL,
      processing_status: firstIncomplete.processing_status,
    } : null,
  }
  writeJson(path.join(LOGS_DIR, `paused-run-${Date.now()}.json`), log)
  writeJson(STATE_PATH, {
    ...state,
    status: 'PAUSED_RUN',
    pausedAt: log.generatedAt,
    pauseReason: log.reason,
    activePostId: firstIncomplete?.post_id || null,
    currentSequence: firstIncomplete?.sequence || null,
  })
  console.log(JSON.stringify(log, null, 2))
}

try {
  main()
} catch (error) {
  console.error(`[content:refine:run] ${error.message}`)
  process.exit(1)
}
