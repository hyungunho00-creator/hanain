import path from 'path'
import {
  REPORTS_DIR,
  collectContentInventory,
  ensureStateDirs,
  protectedAssetSnapshot,
  protectedFingerprint,
  sha256,
  stableStringify,
  textOf,
  writeJson,
} from './content_refinement_core.mjs'

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function main() {
  ensureStateDirs()
  const records = await collectContentInventory()
  assert(records.length > 0, 'inventory is empty')
  const sample = records[0]
  const snapshot = protectedAssetSnapshot(sample)
  assert(snapshot.id && snapshot.url && snapshot.title !== undefined, 'protected snapshot missing basics')
  assert(protectedFingerprint(sample) === protectedFingerprint({ ...sample }), 'fingerprint is not deterministic')
  assert(sha256('abc') === sha256('abc'), 'sha256 is not deterministic')
  assert(stableStringify({ b: 1, a: 2 }) === stableStringify({ a: 2, b: 1 }), 'stable stringify key order failed')
  assert(textOf('<p>Hello <strong>reader</strong></p>') === 'Hello reader', 'text extraction failed')
  const byType = records.reduce((acc, row) => {
    acc[row.type] = (acc[row.type] || 0) + 1
    return acc
  }, {})
  assert(byType.qa > 0, 'Q&A inventory missing')
  assert(byType.blog > 0, 'blog inventory missing')
  assert(byType.insight > 0, 'insight inventory missing')
  const report = {
    generatedAt: new Date().toISOString(),
    status: 'PASS',
    tests: ['inventory', 'protected snapshot', 'SHA-256 fingerprint', 'HTML text extraction', 'stable stringify', 'content type coverage'],
    totalRecords: records.length,
    byType,
  }
  writeJson(path.join(REPORTS_DIR, 'test-results.json'), report)
  console.log(JSON.stringify(report, null, 2))
}

main().catch((error) => {
  ensureStateDirs()
  writeJson(path.join(REPORTS_DIR, 'test-results.json'), { generatedAt: new Date().toISOString(), status: 'FAIL', error: error.message })
  console.error(`[content:refine:test] ${error.message}`)
  process.exit(1)
})
