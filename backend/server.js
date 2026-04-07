const express = require('express')
const cors = require('cors')
const Database = require('better-sqlite3')
const nodemailer = require('nodemailer')
const rateLimit = require('express-rate-limit')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow all sandbox URLs and localhost
    if (!origin || origin.includes('localhost') || origin.includes('sandbox.novita.ai') || origin.includes('novita.ai')) {
      callback(null, true)
    } else {
      callback(null, true) // Allow all for now - restrict in production
    }
  },
  credentials: true
}))
app.use(express.json())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.' }
})
app.use('/api', limiter)

// Database setup
const DB_PATH = path.join(__dirname, 'data', 'hanain.db')
const DATA_DIR = path.join(__dirname, 'data')
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })

const db = new Database(DB_PATH)

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    category TEXT,
    concern TEXT,
    preferred_time TEXT,
    interests TEXT,
    form_type TEXT DEFAULT 'consult',
    privacy_agreed INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS partners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    job TEXT,
    interests TEXT,
    message TEXT,
    privacy_agreed INTEGER DEFAULT 1,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS email_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    host TEXT DEFAULT '',
    port INTEGER DEFAULT 587,
    user TEXT DEFAULT '',
    pass TEXT DEFAULT '',
    recipient_email TEXT DEFAULT ''
  );

  INSERT OR IGNORE INTO email_settings (id, host, port, user, pass, recipient_email)
  VALUES (1, '', 587, '', '', '');
`)

// Email helper
async function getTransporter() {
  const settings = db.prepare('SELECT * FROM email_settings WHERE id = 1').get()
  if (!settings?.host || !settings?.user || !settings?.pass) return null

  return nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.port === 465,
    auth: { user: settings.user, pass: settings.pass },
  })
}

async function sendNotificationEmail(type, data) {
  try {
    const settings = db.prepare('SELECT * FROM email_settings WHERE id = 1').get()
    if (!settings?.recipient_email) return

    const transporter = await getTransporter()
    if (!transporter) return

    const subject = type === 'consult' ? '새 상담 신청이 접수되었습니다'
      : type === 'newsletter' ? '새 뉴스레터 구독 신청'
      : '새 파트너 신청이 접수되었습니다'

    const html = `
      <h2 style="color: #0A1628;">플로로탄닌 파트너스 - ${subject}</h2>
      <table style="border-collapse: collapse; width: 100%;">
        ${Object.entries(data).map(([k, v]) => `
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold; width: 30%;">${k}</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${v || '-'}</td>
          </tr>
        `).join('')}
      </table>
      <p style="color: #6b7280; margin-top: 16px;">신청 시각: ${new Date().toLocaleString('ko-KR')}</p>
    `

    await transporter.sendMail({
      from: `플로로탄닌 파트너스 <${settings.user}>`,
      to: settings.recipient_email,
      subject,
      html,
    })

    // Also send confirmation to applicant
    if (data.이메일) {
      await transporter.sendMail({
        from: `플로로탄닌 파트너스 <${settings.user}>`,
        to: data.이메일,
        subject: '신청이 완료되었습니다 - 플로로탄닌 파트너스',
        html: `
          <h2 style="color: #0A1628;">플로로탄닌 파트너스</h2>
          <p>${data.이름 || '고객'}님, 신청이 완료되었습니다.</p>
          <p>빠른 시일 내에 연락드리겠습니다.</p>
          <br>
          <p style="color: #6b7280; font-size: 12px;">본 정보는 의료 조언을 대체하지 않습니다.</p>
        `,
      })
    }
  } catch (err) {
    console.error('Email error:', err.message)
  }
}

// Admin middleware
const adminAuth = (req, res, next) => {
  const key = req.headers['x-admin-key']
  if (key !== process.env.ADMIN_KEY && key !== 'hanain2024') {
    return res.status(401).json({ error: '인증이 필요합니다' })
  }
  next()
}

// =================== PUBLIC ROUTES ===================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Submit consult/newsletter form
app.post('/api/consult', (req, res) => {
  const { name, phone, email, category, concern, preferredTime, interests, formType, privacyAgreed } = req.body

  if (!name || !phone || !email) {
    return res.status(400).json({ message: '필수 정보를 입력해주세요' })
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO submissions (name, phone, email, category, concern, preferred_time, interests, form_type, privacy_agreed)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    const result = stmt.run(
      name, phone, email, category || '',
      concern || '', preferredTime || '',
      Array.isArray(interests) ? interests.join(', ') : (interests || ''),
      formType || 'consult',
      privacyAgreed ? 1 : 0
    )

    sendNotificationEmail(formType || 'consult', {
      이름: name, 연락처: phone, 이메일: email,
      카테고리: category || '', 고민내용: concern || '',
      희망시간: preferredTime || '', 유형: formType || 'consult'
    })

    res.json({ success: true, id: result.lastInsertRowid })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '서버 오류가 발생했습니다' })
  }
})

// Newsletter (same endpoint, just different formType)
app.post('/api/newsletter', (req, res) => {
  req.body.formType = 'newsletter'
  const { name, phone, email, category, interests } = req.body

  if (!name || !email) {
    return res.status(400).json({ message: '필수 정보를 입력해주세요' })
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO submissions (name, phone, email, category, interests, form_type)
      VALUES (?, ?, ?, ?, ?, 'newsletter')
    `)
    const result = stmt.run(
      name, phone || '', email, category || '',
      Array.isArray(interests) ? interests.join(', ') : (interests || '')
    )

    sendNotificationEmail('newsletter', {
      이름: name, 연락처: phone || '', 이메일: email,
      카테고리: category || ''
    })

    res.json({ success: true, id: result.lastInsertRowid })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '서버 오류가 발생했습니다' })
  }
})

// Partner application
app.post('/api/partner', (req, res) => {
  const { name, phone, email, job, interests, message, privacyAgreed } = req.body

  if (!name || !phone || !email) {
    return res.status(400).json({ message: '필수 정보를 입력해주세요' })
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO partners (name, phone, email, job, interests, message, privacy_agreed)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    const result = stmt.run(
      name, phone, email, job || '',
      Array.isArray(interests) ? interests.join(', ') : (interests || ''),
      message || '',
      privacyAgreed ? 1 : 0
    )

    sendNotificationEmail('partner', {
      이름: name, 연락처: phone, 이메일: email,
      직업: job || '', 관심분야: Array.isArray(interests) ? interests.join(', ') : (interests || ''),
      문의내용: message || ''
    })

    res.json({ success: true, id: result.lastInsertRowid })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '서버 오류가 발생했습니다' })
  }
})

// =================== ADMIN ROUTES ===================

// Get all submissions
app.get('/api/admin/submissions', adminAuth, (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM submissions ORDER BY created_at DESC').all()
    res.json(rows.map(r => ({
      ...r,
      timestamp: r.created_at,
      formType: r.form_type
    })))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete submission
app.delete('/api/admin/submissions/:id', adminAuth, (req, res) => {
  try {
    db.prepare('DELETE FROM submissions WHERE id = ?').run(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get all partners
app.get('/api/admin/partners', adminAuth, (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM partners ORDER BY created_at DESC').all()
    res.json(rows.map(r => ({
      ...r,
      timestamp: r.created_at
    })))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Stats
app.get('/api/admin/stats', adminAuth, (req, res) => {
  try {
    const totalSubmissions = db.prepare('SELECT COUNT(*) as count FROM submissions').get()
    const totalPartners = db.prepare('SELECT COUNT(*) as count FROM partners').get()
    const newsletters = db.prepare("SELECT COUNT(*) as count FROM submissions WHERE form_type = 'newsletter'").get()
    const today = new Date().toISOString().split('T')[0]
    const todayNew = db.prepare("SELECT COUNT(*) as count FROM submissions WHERE date(created_at) = ?").get(today)

    res.json({
      total_submissions: totalSubmissions.count,
      total_partners: totalPartners.count,
      newsletters: newsletters.count,
      today_new: todayNew.count
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get email settings
app.get('/api/admin/email-settings', adminAuth, (req, res) => {
  try {
    const settings = db.prepare('SELECT * FROM email_settings WHERE id = 1').get()
    res.json({
      host: settings?.host || '',
      port: settings?.port || 587,
      user: settings?.user || '',
      pass: '', // Never send password back
      to: settings?.recipient_email || ''
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Save email settings
app.post('/api/admin/email-settings', adminAuth, (req, res) => {
  const { host, port, user, pass, to } = req.body
  try {
    const existing = db.prepare('SELECT pass FROM email_settings WHERE id = 1').get()
    db.prepare(`
      UPDATE email_settings SET host = ?, port = ?, user = ?, pass = ?, recipient_email = ? WHERE id = 1
    `).run(host, port, user, pass || existing?.pass || '', to)

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Test email
app.post('/api/admin/test-email', adminAuth, async (req, res) => {
  try {
    const transporter = await getTransporter()
    if (!transporter) return res.status(400).json({ error: '이메일 설정을 먼저 완료해주세요' })

    const settings = db.prepare('SELECT * FROM email_settings WHERE id = 1').get()
    await transporter.sendMail({
      from: settings.user,
      to: settings.recipient_email,
      subject: '[테스트] 플로로탄닌 파트너스 이메일 테스트',
      text: '이메일 설정이 올바르게 작동합니다.'
    })

    res.json({ success: true, message: '테스트 이메일이 발송되었습니다' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Serve static files - always serve React app
app.use(express.static(path.join(__dirname, '../hanain/dist')))
app.get('/{*path}', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../hanain/dist/index.html'))
  }
})

app.listen(PORT, () => {
  console.log(`✅ 플로로탄닌 파트너스 Backend running on http://localhost:${PORT}`)
  console.log(`📊 Database: ${DB_PATH}`)
})
