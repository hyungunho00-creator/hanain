/* global process */
import { readFileSync } from 'node:fs'
import path from 'node:path'

function normalizeSlug(value) {
  if (!value) return null
  const slug = String(value).trim().toLowerCase()
  return slug || null
}

function sanitizePhone(value) {
  return String(value || '').replace(/[^0-9+]/g, '')
}

function readPartners() {
  const root = process.cwd()
  const localPath = path.join(root, 'src', 'data', 'partners.ts')
  const jsonPath = path.join(root, 'public', 'partners.json')
  const out = []

  try {
    const tsRaw = readFileSync(localPath, 'utf8')
    const m = tsRaw.match(/PARTNERS:\s*Partner\[\]\s*=\s*(\[[\s\S]*?\n\])/)
    if (m) {
      const normalized = m[1]
        .replace(/(\w+)\s*:/g, '"$1":')
        .replace(/'([^']*)'/g, '"$1"')
      const rows = JSON.parse(normalized)
      if (Array.isArray(rows)) out.push(...rows)
    }
  } catch {
    // ignore
  }

  try {
    const jsonRaw = readFileSync(jsonPath, 'utf8')
    const data = JSON.parse(jsonRaw)
    if (Array.isArray(data?.partners)) out.push(...data.partners)
  } catch {
    // ignore
  }

  return out
}

function findPartner(slug) {
  const normalized = normalizeSlug(slug)
  if (!normalized) return null
  const partners = readPartners()
  return partners.find((p) => normalizeSlug(p.slug) === normalized) || null
}

export default async function handler(req, res) {
  const slug = normalizeSlug(req.query?.partnerSlug)
  if (!slug) {
    res.status(400).setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.send('Missing partner slug')
    return
  }

  const partner = findPartner(slug)
  if (!partner) {
    res.status(404).setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.send('Partner not found')
    return
  }

  const name = partner.displayName || partner.name || slug
  const org = partner.organization || 'Phlorotannin Partners Archive'
  const phone = sanitizePhone(partner.phone || partner.sms || '')
  const cardUrl = `https://phlorotannin.com/p/${slug}`

  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${name}`,
    `ORG:${org}`,
    phone ? `TEL;TYPE=CELL:${phone}` : '',
    `URL:${cardUrl}`,
    'NOTE:Phlorotannin Partners Archive',
    'END:VCARD',
  ].filter(Boolean).join('\r\n')

  res.status(200)
  res.setHeader('Content-Type', 'text/vcard; charset=utf-8')
  res.setHeader('Content-Disposition', `attachment; filename="${slug}.vcf"`)
  res.send(vcard)
}
