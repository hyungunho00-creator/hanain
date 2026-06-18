import path from 'path'
import {
  MANIFEST_PATH,
  REPORTS_DIR,
  STATE_PATH,
  collectContentInventory,
  ensureStateDirs,
  latestBackupPath,
  protectedFingerprint,
  readGzipJsonl,
  readJson,
  readJsonl,
  writeJson,
} from './content_refinement_core.mjs'

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function main() {
  ensureStateDirs()
  const records = await collectContentInventory()
  const manifest = readJsonl(MANIFEST_PATH)
  const state = readJson(STATE_PATH, {})
  const backupPath = state.backupPath || latestBackupPath()
  assert(backupPath, 'No backup file found')
  const backup = readGzipJsonl(backupPath)

  const manifestIds = new Set(manifest.map((row) => row.post_id))
  const backupIds = new Set(backup.map((row) => row.post_id))
  const missingFromManifest = records.filter((row) => !manifestIds.has(row.post_id)).map((row) => row.post_id)
  const missingFromBackup = records.filter((row) => !backupIds.has(row.post_id)).map((row) => row.post_id)
  const duplicateManifestIds = manifest.length - manifestIds.size
  const manifestById = new Map(manifest.map((row) => [row.post_id, row]))
  const protectedMismatches = records.filter((row) => {
    const entry = manifestById.get(row.post_id)
    return entry && entry.protected_asset_fingerprint !== protectedFingerprint(row)
  }).map((row) => row.post_id)
  const completed = manifest.filter((row) => row.processing_status === 'COMPLETED')
  const pending = manifest.filter((row) => row.processing_status !== 'COMPLETED')
  const sequenceOk = manifest.every((row, index) => row.sequence === index + 1)

  const report = {
    generatedAt: new Date().toISOString(),
    status: missingFromManifest.length || missingFromBackup.length || duplicateManifestIds || protectedMismatches.length || !sequenceOk ? 'FAIL' : 'PASS',
    total_source_posts: records.length,
    total_manifest_posts: manifest.length,
    total_backup_posts: backup.length,
    total_completed_posts: completed.length,
    pending_posts: pending.length,
    repairing_posts: manifest.filter((row) => row.processing_status === 'REPAIRING').length,
    skipped_posts: manifest.filter((row) => row.processing_status === 'SKIPPED').length,
    unresolved_posts: pending.length,
    duplicate_manifest_ids: duplicateManifestIds,
    missing_from_manifest: missingFromManifest,
    missing_from_backup: missingFromBackup,
    protected_asset_mismatches: protectedMismatches.length,
    protected_asset_mismatch_ids: protectedMismatches.slice(0, 50),
    sequence_ok: sequenceOk,
    manifestPath: MANIFEST_PATH,
    backupPath,
  }

  writeJson(path.join(REPORTS_DIR, 'verify-report.json'), report)
  console.log(JSON.stringify(report, null, 2))
  assert(report.status === 'PASS', 'content refinement verification failed')
}

main().catch((error) => {
  console.error(`[content:refine:verify] ${error.message}`)
  process.exit(1)
})
