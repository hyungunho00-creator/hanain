import fs from 'node:fs'
import path from 'node:path'

const ALLOWED_FILE = /^[a-z0-9-]+\.png$/i

function pickFile(req) {
  const raw = Array.isArray(req.query?.file) ? req.query.file.join('/') : req.query?.file
  const value = String(raw || '').split('?')[0].split('#')[0]
  const fileName = path.basename(value)
  return ALLOWED_FILE.test(fileName) ? fileName : ''
}

function findImage(fileName) {
  const candidates = [
    path.join(process.cwd(), 'public', 'og', 'content-quality', fileName),
    path.join(process.cwd(), 'dist', 'og', 'content-quality', fileName),
    path.join(process.cwd(), 'hanain', 'public', 'og', 'content-quality', fileName),
    path.join(process.cwd(), 'hanain', 'dist', 'og', 'content-quality', fileName),
  ]

  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) return candidate
    } catch {}
  }

  return ''
}

export default function handler(req, res) {
  const fileName = pickFile(req)
  if (!fileName) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('invalid og image path')
    return
  }

  const imagePath = findImage(fileName)
  if (!imagePath) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('og image not found')
    return
  }

  const image = fs.readFileSync(imagePath)
  res.statusCode = 200
  res.setHeader('Content-Type', 'image/png')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=31536000, immutable')
  res.end(image)
}
