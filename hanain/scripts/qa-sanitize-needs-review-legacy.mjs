import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const QA_PATHS = [
  path.join(ROOT, 'public', 'qa.json'),
  path.join(ROOT, 'src', 'data', 'qa.json'),
]
const BACKUP_PATH = path.join(ROOT, 'docs', 'qa-needs-review-legacy-backup.json')

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}

function writeJson(p, data) {
  fs.writeFileSync(p, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function normalize(text) {
  return String(text || '').replace(/\s+/g, ' ').trim()
}

function run() {
  const backups = []
  for (const qaPath of QA_PATHS) {
    const data = readJson(qaPath)
    let changed = 0
    for (const q of data.questions || []) {
      const status = String(q.qualityStatus || '').toLowerCase()
      if (status !== 'needs_review') continue
      const answer = String(q.answer || '')
      if (!normalize(answer)) continue
      backups.push({
        file: path.relative(ROOT, qaPath),
        id: q.id,
        question: q.question,
        answer,
      })
      q.answer = ''
      changed += 1
    }
    writeJson(qaPath, data)
    console.log(JSON.stringify({ file: path.relative(ROOT, qaPath), changed }, null, 2))
  }
  if (!fs.existsSync(path.dirname(BACKUP_PATH))) fs.mkdirSync(path.dirname(BACKUP_PATH), { recursive: true })
  fs.writeFileSync(BACKUP_PATH, `${JSON.stringify({ generatedAt: new Date().toISOString(), count: backups.length, rows: backups }, null, 2)}\n`, 'utf8')
  console.log(JSON.stringify({ backup: path.relative(ROOT, BACKUP_PATH), rows: backups.length }, null, 2))
}

run()
