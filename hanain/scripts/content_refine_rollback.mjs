import { latestBackupPath } from './content_refinement_core.mjs'

const backupPath = process.argv[2] || latestBackupPath()
if (!backupPath) {
  console.error('[content:refine:rollback] No backup file found')
  process.exit(1)
}

console.log(JSON.stringify({
  status: 'READY_FOR_MANUAL_ROLLBACK',
  backupPath,
  note: 'Content is stored across JSON, local JS/JSX files, and Supabase. Rollback is report-only until a target storage scope is provided.',
}, null, 2))
