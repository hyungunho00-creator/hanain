import fs from 'fs'
import path from 'path'
import {
  BACKUPS_DIR,
  MANIFEST_PATH,
  PROJECT_ANALYSIS_PATH,
  REPORTS_DIR,
  STATE_PATH,
  collectContentInventory,
  ensureStateDirs,
  latestBackupPath,
  manifestRows,
  projectAnalysis,
  readGzipJsonl,
  sha256,
  timestamp,
  writeGzipJsonl,
  writeJson,
  writeJsonl,
} from './content_refinement_core.mjs'

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function backupRecord(record) {
  return {
    schemaVersion: 1,
    backupCreatedAt: new Date().toISOString(),
    type: record.type,
    post_id: record.post_id,
    id: record.id,
    slug: record.slug,
    URL: record.url,
    title: record.title,
    excerpt: record.excerpt || record.description || '',
    meta_title: record.meta_title || record.metaTitle || '',
    meta_description: record.meta_desc || record.metaDesc || record.description || '',
    body_original: record.content || record.body || record.answer || record.validatedAnswer || '',
    FAQ: record.faqs || [],
    structuredDataRelated: {
      category: record.category || record.category_id || '',
      tags: record.tags || [],
      references: record.references || record.referenceIds || record.references_pmid || [],
    },
    image: { og_image: record.og_image || '', image_alt: record.image_alt || '' },
    createdAt: record.created_at || record.createdAt || '',
    publishedAt: record.published_at || record.publishedAt || '',
    updatedAt: record.updated_at || record.updatedAt || '',
    source_location: record.source_location,
    original_checksum: record.original_checksum,
    protected_asset_fingerprint: record.protected_asset_fingerprint,
  }
}

async function main() {
  ensureStateDirs()
  const records = await collectContentInventory()
  assert(records.length > 0, 'No content records discovered')

  const backupPath = path.join(BACKUPS_DIR, `content-before-refinement-${timestamp()}.jsonl.gz`)
  const backupRows = records.map(backupRecord)
  writeGzipJsonl(backupPath, backupRows)
  const restoredRows = readGzipJsonl(backupPath)
  assert(restoredRows.length === records.length, `Backup count mismatch: ${restoredRows.length} !== ${records.length}`)
  assert(restoredRows.every((row, index) => row.post_id === records[index].post_id), 'Backup post_id order mismatch')
  assert(restoredRows.every((row, index) => row.original_checksum === records[index].original_checksum), 'Backup checksum mismatch')

  writeJson(PROJECT_ANALYSIS_PATH, projectAnalysis(records))
  const manifest = manifestRows(records)
  writeJsonl(MANIFEST_PATH, manifest)

  const state = {
    status: 'PREPARED',
    refinementVersion: 'content-refinement-v1',
    preparedAt: new Date().toISOString(),
    manifestPath: MANIFEST_PATH,
    backupPath,
    totalSourcePosts: records.length,
    totalManifestPosts: manifest.length,
    currentSequence: manifest[0]?.sequence || null,
    completedPosts: 0,
    activePostId: manifest[0]?.post_id || null,
  }
  writeJson(STATE_PATH, state)

  const report = {
    generatedAt: new Date().toISOString(),
    status: 'PASS',
    totalRecords: records.length,
    byType: records.reduce((acc, row) => {
      acc[row.type] = (acc[row.type] || 0) + 1
      return acc
    }, {}),
    backupPath,
    latestBackupPath: latestBackupPath(),
    manifestPath: MANIFEST_PATH,
    projectAnalysisPath: PROJECT_ANALYSIS_PATH,
    backupFileSha256: sha256(fs.readFileSync(backupPath).toString('base64')),
  }
  writeJson(path.join(REPORTS_DIR, 'prepare-report.json'), report)
  console.log(JSON.stringify(report, null, 2))
}

main().catch((error) => {
  console.error(`[content:refine:prepare] ${error.message}`)
  process.exit(1)
})
