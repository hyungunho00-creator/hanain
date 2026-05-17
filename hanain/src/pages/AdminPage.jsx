import { useState, useEffect } from 'react'
import { Settings, Users, MessageSquare, BookOpen, Trash2, Save, X, Search, Download, RefreshCw, Lock, Eye, EyeOff, Copy, Check, Link2, Phone, UserPlus, Rocket, AlertCircle, CheckCircle, Loader, Globe, PlayCircle, PenSquare, ChevronDown, ChevronRight, ExternalLink, Pin, PinOff, Star, FileText, Plus, Edit3 } from 'lucide-react'
import { supabase, setVideoMain, upsertPost, getAllPostsAdmin, deletePost } from '../lib/supabase'

// Phase 4: 클라이언트 번들에서 service_role 키 완전 제거
// 모든 어드민 쓰기 작업은 /api/admin 서버 함수를 경유한다.
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || '56528206'
const ADMIN_TOKEN_KEY = 'phl_admin_token'

// /api/admin 액션 호출 헬퍼 — 세션 스토리지에 저장된 토큰을 자동 첨부
async function adminApi(action, payload) {
  const token = sessionStorage.getItem(ADMIN_TOKEN_KEY) || ''
  try {
    const r = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, token, payload: payload || {} }),
    })
    const text = await r.text()
    let json = null
    try { json = text ? JSON.parse(text) : null } catch { json = { raw: text } }
    return { ok: r.ok, status: r.status, data: (json && json.data) || null, error: (json && json.error) || null }
  } catch (e) {
    return { ok: false, status: 0, data: null, error: e.message }
  }
}

// 기존 vFetch 호환 시그니처 — question_videos REST 경로 → /api/admin 액션으로 매핑
// 옛 코드를 최소 수정으로 유지하기 위한 어댑터
async function vFetch(path, opts = {}) {
  const method = (opts.method || 'GET').toUpperCase()
  // path 예: /question_videos?select=*&order=created_at.desc
  // path 예: /question_videos?id=eq.xxxx
  const isVideoPath = path.startsWith('/question_videos')
  if (isVideoPath) {
    if (method === 'GET') {
      const r = await adminApi('video_list')
      return { ok: r.ok, status: r.status, data: r.data }
    }
    if (method === 'POST') {
      const row = opts.body ? JSON.parse(opts.body) : {}
      const r = await adminApi('video_upsert', { row })
      return { ok: r.ok, status: r.status, data: r.data ? [r.data] : [] }
    }
    if (method === 'PATCH') {
      const row = opts.body ? JSON.parse(opts.body) : {}
      const m = path.match(/id=eq\.([^&]+)/)
      if (m) row.id = decodeURIComponent(m[1])
      const r = await adminApi('video_upsert', { row })
      return { ok: r.ok, status: r.status, data: r.data ? [r.data] : [] }
    }
    if (method === 'DELETE') {
      const m = path.match(/id=eq\.([^&]+)/)
      const id = m ? decodeURIComponent(m[1]) : null
      const r = await adminApi('video_delete', { id })
      return { ok: r.ok, status: r.status, data: null }
    }
  }
  // 그 외 경로는 일반 anon 페치로 폴백 (read-only, RLS 통과 가능한 경우)
  const SB_URL_PUB = import.meta.env.VITE_SUPABASE_URL || 'https://rlfxuyeoluoeaxuujtly.supabase.co'
  const SB_ANON_PUB = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck'
  const res = await fetch(`${SB_URL_PUB}/rest/v1${path}`, {
    ...opts,
    headers: {
      apikey: SB_ANON_PUB,
      Authorization: `Bearer ${SB_ANON_PUB}`,
      'Content-Type': 'application/json',
      'Accept-Profile': 'public',
      ...(opts.headers || {}),
    },
  })
  const text = await res.text()
  return { ok: res.ok, status: res.status, data: text ? JSON.parse(text) : null }
}
const PARTNERS_KEY = 'phlorotannin_partners_v2'
const MAIN_SITE = 'https://phlorotannin.com'
// ※ 폐기됨 (PARTNER_URL_POLICY.md 참조):
//   - VERCEL_TOKEN_KEY, GH_TOKEN_KEY, VERCEL_TEAM_ID, GH_REPO, GH_FILE_PATH
//   - 옛 vercel.app 파트너 사이트 자동 배포 + GitHub로 partners.json 직접 수정 방식
//   - 현재 모든 파트너는 phlorotannin.com/p/<phone> 단일 방식 사용
//   - 신규 등록은 향후 Supabase partners 테이블 직접 INSERT로 통합 예정 (Phase 2)

// ───────────────────────────────────────────
// 유틸
// ───────────────────────────────────────────
function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 11) return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  if (digits.length === 10) return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  return digits
}

function makeSlug() {
  return Math.random().toString(36).substring(2, 8)
}

function isValidSlug(s) {
  return /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/.test(s)
}

// (좀비 코드 제거: sha1hex / ghGetPartnersJson / ghUpdatePartnersJson / deployPartnerShell — 241줄 제거)
// 사유: 모든 파트너가 phlorotannin.com/p/<phone> 통일 방식 사용, 옛 vercel.app + GitHub 직접편집 방식 폐기
// 참조: PARTNER_URL_POLICY.md


// ───────────────────────────────────────────
// 로그인 화면
// ───────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const [err, setErr] = useState(false)
  const handleLogin = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASS) {
      // /api/admin 호출 시 사용할 어드민 토큰 저장 (서버의 ADMIN_TOKEN env와 일치해야 함)
      // 기본값은 VITE_ADMIN_PASS와 동일 → Vercel env에서 ADMIN_TOKEN을 별도 지정하면 그것을 클라가 모름
      // 따라서 운영자는 ADMIN_TOKEN=VITE_ADMIN_PASS 동일값으로 설정하거나, 별도 토큰 입력 폼을 사용.
      try { sessionStorage.setItem(ADMIN_TOKEN_KEY, pw) } catch {}
      onLogin()
    } else setErr(true)
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-ocean-deep rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-ocean-deep">관리자 로그인</h1>
          <p className="text-gray-400 text-base mt-1">플로로탄닌 파트너스 관리 시스템</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input type={show ? 'text' : 'password'} value={pw}
              onChange={e => { setPw(e.target.value); setErr(false) }}
              placeholder="관리자 비밀번호" className={`input-field pr-10 ${err ? 'border-red-500' : ''}`} />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {err && <p className="text-red-500 text-base">비밀번호가 올바르지 않습니다.</p>}
          <button type="submit" className="w-full btn-primary py-3">로그인</button>
        </form>
      </div>
    </div>
  )
}

function CopyButton({ text, label = '복사' }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })}
      className={`flex items-center gap-1 text-sm px-2.5 py-1.5 rounded-lg font-medium transition-all ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? '복사됨!' : label}
    </button>
  )
}

// ───────────────────────────────────────────
// 파트너 관리 탭
// ───────────────────────────────────────────
function PartnerManageTab() {
  const [partners, setPartners] = useState([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', memo: '' })
  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(null)

  // partners.json + localStorage 모두에서 파트너 로드 (병합, 전화번호 중복 제거)
  useEffect(() => {
    async function loadAll() {
      // 1) partners.json (서버)
      let serverList = []
      try {
        const r = await fetch('/partners.json?t=' + Date.now(), { cache: 'no-store' })
        if (r.ok) {
          const d = await r.json()
          serverList = d.partners || []
        }
      } catch {}

      // 2) localStorage
      const localList = JSON.parse(localStorage.getItem(PARTNERS_KEY) || '[]')

      // 3) 병합 (전화번호 기준 중복 제거, 서버 우선)
      const merged = [...serverList]
      for (const lp of localList) {
        const exists = merged.some(p => p.phone === lp.phone || p.slug === lp.slug)
        if (!exists) merged.push(lp)
      }
      setPartners(merged)
      // localStorage도 최신화
      localStorage.setItem(PARTNERS_KEY, JSON.stringify(merged))
    }
    loadAll()
  }, [])

  const saveLocal = (list) => {
    localStorage.setItem(PARTNERS_KEY, JSON.stringify(list))
    setPartners(list)
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = '파트너 이름을 입력하세요'
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 10 || digits.length > 11) errs.phone = '올바른 전화번호를 입력하세요'
    if (digits.length >= 10 && partners.some(p => p.phone === digits)) errs.phone = '이미 등록된 전화번호입니다'
    return errs
  }

  const addPartner = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    const digits       = form.phone.replace(/\D/g, '')
    const phoneDisplay = formatPhone(digits)
    const name         = form.name.trim()
    const siteUrl      = `${MAIN_SITE}/p/${digits}`

    const newPartner = {
      slug: digits,          // 전화번호를 slug로 사용
      name,
      phone: digits,
      phoneDisplay,
      siteUrl,
      memo: form.memo.trim(),
      createdAt: new Date().toISOString(),
    }

    const updated = [newPartner, ...partners]
    saveLocal(updated)
    setForm({ name: '', phone: '', memo: '' })
    setErrors({})
    setShowForm(false)
    setResult({ success: true, url: siteUrl, name })
  }

  const deletePartner = (slug) => {
    if (!confirm('삭제하시겠습니까?')) return
    saveLocal(partners.filter(p => p.slug !== slug))
  }

  const downloadCSV = () => {
    if (!partners.length) return
    const rows = [
      ['이름', '전화번호', '파트너URL', '메모', '등록일'],
      ...partners.map(p => [p.name, p.phoneDisplay, p.siteUrl || '', p.memo || '', new Date(p.createdAt).toLocaleDateString('ko-KR')])
    ]
    const csv  = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
    a.download = `파트너목록_${new Date().toLocaleDateString('ko-KR')}.csv`; a.click()
  }

  const filtered = partners.filter(p =>
    !search || p.name?.includes(search) || p.phoneDisplay?.includes(search) || p.memo?.includes(search)
  )

  return (
    <div className="space-y-4">

      {/* ── 헤더 ── */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-ocean-deep text-xl flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-hana" />
              파트너 전자명함 관리
            </h3>
            <p className="text-base text-gray-500 mt-0.5">
              이름·전화번호 입력만으로 전자명함 URL 즉시 발급
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={downloadCSV}
              className="flex items-center gap-1.5 text-base bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg">
              <Download className="w-4 h-4" /> CSV
            </button>
            <button onClick={() => { setShowForm(true); setErrors({}); setResult(null) }}
              className="flex items-center gap-1.5 text-base bg-ocean-deep text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
              <UserPlus className="w-4 h-4" /> 파트너 추가
            </button>
          </div>
        </div>

        {/* 안내 */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="font-semibold text-amber-800 mb-1">✨ 새로운 전자명함 시스템</p>
          <div className="grid sm:grid-cols-2 gap-2 text-amber-700 text-sm">
            {[
              '이름 + 전화번호만 입력하면 URL 즉시 발급',
              'phlorotannin.com/p/전화번호 형태의 깔끔한 URL',
              '전자명함 앞·뒷면, QR코드 자동 생성',
              '명함 이미지 다운로드 기능 내장',
            ].map(t => (
              <div key={t} className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-500" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 결과 */}
      {result && (
        <div className={`rounded-xl p-4 border ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          {result.success ? (
            <div>
              <p className="font-bold text-green-800 flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5" /> 🎉 {result.name} 파트너 전자명함 등록 완료!
              </p>
              <p className="text-sm font-semibold text-green-700 mb-1">📎 파트너 전달 URL (전자명함)</p>
              <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-green-300">
                <Globe className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-base text-gray-800 font-mono flex-1 font-semibold break-all">{result.url}</span>
                <CopyButton text={result.url} label="복사" />
              </div>
              <p className="text-sm text-green-600 mt-2">
                ✅ 이 URL을 파트너에게 전달하세요. 접속하면 전자명함이 바로 표시됩니다.<br />
                ✅ 배포 없이 즉시 사용 가능합니다.
              </p>
            </div>
          ) : (
            <div>
              <p className="font-bold text-red-800 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> 등록 실패</p>
              <p className="text-base text-red-600 mt-1">{result.error}</p>
            </div>
          )}
          <button onClick={() => setResult(null)} className="mt-3 text-sm text-gray-400 hover:text-gray-600">닫기</button>
        </div>
      )}

      {/* 추가 폼 */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-ocean-deep text-lg">새 파트너 추가</h4>
            <button onClick={() => { setShowForm(false); setErrors({}) }}><X className="w-5 h-5 text-gray-400" /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* 이름 */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1.5">파트너 이름 <span className="text-red-500">*</span></label>
              <input value={form.name}
                onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })) }}
                className={`input-field ${errors.name ? 'border-red-400' : ''}`} placeholder="예: 홍길동" />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            {/* 전화번호 */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1.5">전화번호 <span className="text-red-500">*</span></label>
              <input value={form.phone} type="tel"
                onChange={e => { setForm(p => ({ ...p, phone: e.target.value })); setErrors(p => ({ ...p, phone: '' })) }}
                className={`input-field ${errors.phone ? 'border-red-400' : ''}`} placeholder="010-0000-0000" />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              {form.phone.replace(/\D/g,'').length >= 10 && !errors.phone && (
                <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  발급 URL: <span className="font-mono font-semibold">phlorotannin.com/p/{form.phone.replace(/\D/g,'')}</span>
                </p>
              )}
            </div>
            {/* 메모 */}
            <div className="sm:col-span-2">
              <label className="block text-base font-medium text-gray-700 mb-1.5">메모 (선택)</label>
              <input value={form.memo}
                onChange={e => setForm(p => ({ ...p, memo: e.target.value }))}
                className="input-field" placeholder="예: 서울 강남 지역" />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={addPartner}
              className="flex items-center gap-2 bg-ocean-deep text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-opacity-90">
              <UserPlus className="w-4 h-4" /> 즉시 등록
            </button>
            <button onClick={() => { setShowForm(false); setErrors({}) }}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50">취소</button>
          </div>
          <p className="text-sm text-gray-400 mt-2">⚡ 배포 없이 즉시 URL이 발급됩니다</p>
        </div>
      )}

      {/* 검색 */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="이름, 전화번호 검색..." className="input-field pl-9 py-2 text-base" />
        </div>
      </div>

      {/* 파트너 목록 */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Globe className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400">{search ? '검색 결과 없음' : '등록된 파트너가 없습니다'}</p>
            {!search && (
              <button onClick={() => { setShowForm(true); setErrors({}) }}
                className="mt-4 text-base text-cyan-hana hover:underline">첫 번째 파트너 추가 →</button>
            )}
          </div>
        ) : (
          <div className="divide-y">
            {filtered.map((p, idx) => (
              <div key={p.slug || idx} className="p-5 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-10 h-10 bg-ocean-deep/10 rounded-xl flex items-center justify-center text-base font-bold text-ocean-deep flex-shrink-0">{idx + 1}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-gray-800">{p.name}</span>
                        {p.memo && <span className="text-sm bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{p.memo}</span>}
                        <span className="text-sm bg-green-100 text-green-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> 활성
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-base text-gray-500">
                        <Phone className="w-3.5 h-3.5" /><span>{p.phoneDisplay}</span>
                      </div>
                      {p.siteUrl && (
                        <div className="mt-2 flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 min-w-0">
                            <Link2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                            <span className="text-sm text-blue-700 font-mono truncate max-w-[260px]">{p.siteUrl}</span>
                          </div>
                          <CopyButton text={p.siteUrl} label="URL 복사" />
                          <CopyButton text={p.phoneDisplay} label="번호 복사" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm text-gray-400 hidden sm:block">{new Date(p.createdAt).toLocaleDateString('ko-KR')}</span>
                    {p.siteUrl && (
                      <a href={p.siteUrl} target="_blank" rel="noopener noreferrer"
                        className="text-gray-300 hover:text-cyan-hana p-1.5 rounded-lg hover:bg-cyan-50 transition-colors">
                        <Eye className="w-4 h-4" />
                      </a>
                    )}
                    <button onClick={() => deletePartner(p.slug)}
                      className="text-gray-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {partners.length > 0 && (
        <p className="text-base text-gray-400 text-center">
          총 <strong className="text-gray-600">{partners.length}명</strong> 등록
        </p>
      )}
    </div>
  )
}

// ───────────────────────────────────────────
// Q&A 답변 관리 탭 (Supabase)
// ───────────────────────────────────────────
function QAAnswerTab() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [answerForms, setAnswerForms] = useState({})   // { questionId: draftText }
  const [saving, setSaving] = useState({})
  const [msg, setMsg] = useState({})

  // qa.json에서 질문 목록 로드 (Supabase 없어도 동작)
  useEffect(() => {
    setLoading(true)
    fetch('/qa.json')
      .then(r => r.json())
      .then(async d => {
        // Supabase answers 조회
        const { data: answers } = await supabase
          .from('answers')
          .select('question_id, content, id')
          .eq('is_official', true)
        const answerMap = {}
        ;(answers || []).forEach(a => { answerMap[a.question_id] = a })

        const cats = {}
        d.categories.forEach(c => { cats[c.id] = c })

        setQuestions(d.questions.map(q => ({
          ...q,
          categoryName: cats[q.category]?.name || q.category,
          categoryColor: cats[q.category]?.color || '#00B4D8',
          dbAnswer: answerMap[q.id] || null,
        })))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = search
    ? questions.filter(q =>
        q.question.includes(search) ||
        q.category.includes(search) ||
        (q.tags || []).some(t => t.includes(search))
      )
    : questions

  async function handleSaveAnswer(q) {
    const content = answerForms[q.id]
    if (!content?.trim()) return
    setSaving(s => ({ ...s, [q.id]: true }))
    setMsg(m => ({ ...m, [q.id]: '' }))

    // 기존 답변이 있으면 update, 없으면 insert
    let error
    if (q.dbAnswer?.id) {
      const res = await supabase.from('answers').update({ content: content.trim(), updated_at: new Date().toISOString() }).eq('id', q.dbAnswer.id)
      error = res.error
    } else {
      const res = await supabase.from('answers').insert({
        question_id: q.id,
        content: content.trim(),
        is_official: true,
        author_id: null,
      })
      error = res.error
    }

    setSaving(s => ({ ...s, [q.id]: false }))
    if (error) {
      setMsg(m => ({ ...m, [q.id]: '저장 실패: ' + error.message }))
    } else {
      setMsg(m => ({ ...m, [q.id]: '✅ 저장되었습니다.' }))
      // 로컬 상태 갱신
      setQuestions(qs => qs.map(item => item.id === q.id
        ? { ...item, dbAnswer: { ...item.dbAnswer, content: content.trim() } }
        : item
      ))
      setTimeout(() => setMsg(m => ({ ...m, [q.id]: '' })), 3000)
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="font-bold text-ocean-deep text-lg flex items-center gap-2">
            <PenSquare className="w-5 h-5 text-cyan-hana" />
            Q&A 답변 관리 ({filtered.length.toLocaleString()}개)
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="질문 검색..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-hana w-64"
            />
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          💡 qa.json 기반 질문 목록입니다. 답변을 입력하면 Supabase DB에 저장되며, 질문 상세 페이지에 자동 표시됩니다.
        </p>

        {loading ? (
          <div className="py-8 text-center text-gray-400 animate-pulse">로딩 중...</div>
        ) : (
          <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
            {filtered.map(q => {
              const isOpen = expandedId === q.id
              const draft = answerForms[q.id] ?? (q.dbAnswer?.content || q.answer || '')
              return (
                <div key={q.id} className="py-3">
                  {/* 질문 헤더 */}
                  <button
                    onClick={() => {
                      setExpandedId(isOpen ? null : q.id)
                      if (!answerForms[q.id]) {
                        setAnswerForms(f => ({ ...f, [q.id]: q.dbAnswer?.content || q.answer || '' }))
                      }
                    }}
                    className="w-full flex items-start gap-3 text-left hover:bg-gray-50 rounded-xl px-2 py-2 transition"
                  >
                    <span
                      className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full text-white mt-0.5"
                      style={{ backgroundColor: q.categoryColor }}
                    >
                      {q.categoryName}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">{q.question}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-400">{q.id}</span>
                        {q.dbAnswer
                          ? <span className="text-xs text-green-600 font-medium">✅ 답변 있음</span>
                          : <span className="text-xs text-amber-500 font-medium">⚠️ DB 답변 없음 (qa.json 사용)</span>
                        }
                      </div>
                    </div>
                    {isOpen ? <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 mt-1" /> : <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-1" />}
                  </button>

                  {/* 답변 편집 영역 */}
                  {isOpen && (
                    <div className="mt-3 ml-2 pl-4 border-l-2 border-cyan-hana/30 space-y-3">
                      <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700">
                        <strong>현재 qa.json 답변 (참고용):</strong>
                        <p className="mt-1 text-gray-500 line-clamp-3">
                          {typeof q.answer === 'string' ? q.answer.slice(0, 200) : JSON.stringify(q.answer).slice(0, 200)}...
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          관리자 답변 (공식 답변 — HTML 가능)
                        </label>
                        <textarea
                          value={draft}
                          onChange={e => setAnswerForms(f => ({ ...f, [q.id]: e.target.value }))}
                          rows={8}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-hana resize-y font-mono"
                          placeholder="답변 내용을 입력하세요. HTML 태그 사용 가능 (<p>, <br>, <strong>, <ul><li> 등)"
                        />
                        <p className="text-xs text-gray-400 mt-1">* 저장하면 질문 상세 페이지 '전문 답변' 섹션에 표시됩니다.</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleSaveAnswer(q)}
                          disabled={saving[q.id]}
                          className="flex items-center gap-2 px-5 py-2 bg-cyan-hana text-white rounded-xl text-sm font-semibold hover:bg-opacity-90 transition disabled:opacity-60"
                        >
                          <Save className="w-4 h-4" />
                          {saving[q.id] ? '저장 중...' : '답변 저장'}
                        </button>
                        {msg[q.id] && (
                          <span className={`text-sm ${msg[q.id].includes('실패') ? 'text-red-500' : 'text-green-600'}`}>
                            {msg[q.id]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ───────────────────────────────────────────
// 사용자 질문 관리 탭 (비회원 질문)
// ───────────────────────────────────────────
const CATEGORY_NAMES = {
  metabolism: '대사질환', cancer_immune: '항암/면역', digestive: '소화/간',
  cardiovascular: '심혈관', neuro_cognitive: '뇌/인지', mental_health: '정신건강',
  musculoskeletal: '근골격', skin: '피부', hair: '모발', skin_hair: '피부/모발(구)', respiratory: '호흡기',
  infection_inflammation: '감염/염증', womens_health: '여성건강', mens_health: '남성건강',
}

function UserQuestionsTab() {
  const [questions, setQuestions]   = useState([])
  const [loading, setLoading]       = useState(false)
  const [filter, setFilter]         = useState('')       // '' | 'pending' | 'answered'
  const [expandedId, setExpandedId] = useState(null)
  const [drafts, setDrafts]         = useState({})       // { id: answerText }
  const [saving, setSaving]         = useState({})
  const [msg, setMsg]               = useState({})

  async function load() {
    setLoading(true)
    const { data } = await supabase
      .from('user_questions')
      .select('*')
      .order('created_at', { ascending: false })
    setQuestions(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const filtered = questions.filter(q =>
    (!filter || q.status === filter)
  )

  async function handleSaveAnswer(q) {
    const answer = (drafts[q.id] ?? q.admin_answer ?? '').trim()
    if (!answer) return
    setSaving(s => ({ ...s, [q.id]: true }))
    const { error } = await supabase
      .from('user_questions')
      .update({ admin_answer: answer, status: 'answered', answered_at: new Date().toISOString() })
      .eq('id', q.id)
    setSaving(s => ({ ...s, [q.id]: false }))
    if (error) {
      setMsg(m => ({ ...m, [q.id]: '❌ 저장 실패: ' + error.message }))
    } else {
      setMsg(m => ({ ...m, [q.id]: '✅ 답변 저장 완료!' }))
      setQuestions(prev => prev.map(item =>
        item.id === q.id ? { ...item, admin_answer: answer, status: 'answered' } : item
      ))
      setTimeout(() => setMsg(m => ({ ...m, [q.id]: '' })), 3000)
    }
  }

  async function handleDelete(id) {
    if (!confirm('삭제하시겠습니까?')) return
    await supabase.from('user_questions').delete().eq('id', id)
    setQuestions(prev => prev.filter(q => q.id !== id))
  }

  const pendingCount  = questions.filter(q => q.status === 'pending').length
  const answeredCount = questions.filter(q => q.status === 'answered').length

  return (
    <div className="space-y-4">
      {/* 상단 요약 + 필터 */}
      <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">{pendingCount}</div>
            <div className="text-xs text-gray-400">미답변</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-500">{answeredCount}</div>
            <div className="text-xs text-gray-400">답변완료</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">{questions.length}</div>
            <div className="text-xs text-gray-400">전체</div>
          </div>
        </div>
        <div className="flex gap-2">
          {[['', '전체'], ['pending', '미답변'], ['answered', '답변완료']].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === val ? 'bg-ocean-deep text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {label}
            </button>
          ))}
          <button onClick={load} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
            <RefreshCw className={`w-4 h-4 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* 질문 목록 */}
      <div className="space-y-3">
        {loading && <div className="bg-white rounded-2xl p-10 text-center text-gray-400">불러오는 중...</div>}
        {!loading && filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center text-gray-400">
            {filter === 'pending' ? '미답변 질문이 없습니다 🎉' : '질문이 없습니다.'}
          </div>
        )}
        {filtered.map(q => {
          const isOpen = expandedId === q.id
          const draftVal = drafts[q.id] ?? q.admin_answer ?? ''
          return (
            <div key={q.id} className={`bg-white rounded-2xl shadow-sm border-l-4 ${q.status === 'answered' ? 'border-teal-400' : 'border-orange-400'}`}>
              {/* 헤더 */}
              <button
                className="w-full text-left px-5 py-4 flex items-start justify-between gap-3"
                onClick={() => setExpandedId(isOpen ? null : q.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      q.status === 'answered' ? 'bg-teal-100 text-teal-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {q.status === 'answered' ? '✅ 답변완료' : '⏳ 미답변'}
                    </span>
                    {q.category_id && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {CATEGORY_NAMES[q.category_id] || q.category_id}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {q.guest_name || '익명'} {q.guest_contact ? `· ${q.guest_contact}` : ''}
                    </span>
                    <span className="text-xs text-gray-300">
                      {new Date(q.created_at).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-800 text-sm leading-snug break-keep">{q.title}</p>
                  {q.content && <p className="text-xs text-gray-400 mt-1 line-clamp-1">{q.content}</p>}
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* 펼침 내용 */}
              {isOpen && (
                <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-4">
                  {/* 질문 상세 */}
                  {q.content && (
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {q.content}
                    </div>
                  )}
                  {/* 연락처 */}
                  {q.guest_contact && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${q.guest_contact}`} className="hover:text-teal-600 font-medium">{q.guest_contact}</a>
                    </div>
                  )}
                  {/* 답변 입력 */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">답변 작성</label>
                    <textarea
                      rows={5}
                      value={draftVal}
                      onChange={e => setDrafts(d => ({ ...d, [q.id]: e.target.value }))}
                      placeholder="고객에게 전달할 답변을 작성하세요."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none transition"
                    />
                    {msg[q.id] && <p className="text-xs mt-1 text-teal-600">{msg[q.id]}</p>}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleSaveAnswer(q)}
                        disabled={saving[q.id]}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-500 text-white text-sm font-bold hover:bg-teal-600 disabled:opacity-60 transition"
                      >
                        <Save className="w-4 h-4" />
                        {saving[q.id] ? '저장 중...' : '답변 저장'}
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 text-gray-500 text-sm font-medium hover:bg-red-50 hover:text-red-500 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ───────────────────────────────────────────
// YouTube 관리 탭 (Supabase) — v2
// 수정사항:
// 1. type="url" 제거 → youtu.be 단축 URL 허용
// 2. URL 자동 정규화 (youtu.be → youtube.com/watch?v=)
// 3. question_id: UUID 대신 카테고리만 선택 (question_id는 DB에서 조회)
//    → qa.json의 legacy_id(cardio-001 등)를 카테고리와 묶어서 관리
// ───────────────────────────────────────────

// ── 블로그 관리 탭 ─────────────────────────
const BLOG_CATS = [
  { id: 'general',       name: '일반' },
  { id: 'diabetes',      name: '당뇨·혈당' },
  { id: 'cancer',        name: '항암·면역' },
  { id: 'brain',         name: '뇌·인지' },
  { id: 'cardiovascular',name: '심혈관' },
  { id: 'inflammation',  name: '염증·면역' },
  { id: 'skin',          name: '피부·모발' },
  { id: 'research',      name: '연구·임상' },
]

const EMPTY_POST = {
  slug:'', title:'', excerpt:'', content:'',
  category:'general', tags:'', meta_title:'', meta_desc:'',
  og_image:'', status:'published'
}

function BlogManageTab() {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)   // null = 목록, {} = 편집
  const [form,    setForm]    = useState(EMPTY_POST)
  const [saving,  setSaving]  = useState(false)
  const [msg,     setMsg]     = useState('')

  const loadPosts = () => {
    setLoading(true)
    getAllPostsAdmin().then(({ data }) => { setPosts(data); setLoading(false) })
  }
  useEffect(() => { loadPosts() }, [])

  const openNew  = () => { setForm(EMPTY_POST); setEditing('new') }
  const openEdit = (p) => {
    setForm({ ...p, tags: (p.tags || []).join(', ') })
    setEditing(p.id)
  }

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      setMsg('❌ 제목, 슬러그, 본문은 필수입니다'); return
    }
    setSaving(true)
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      meta_title: form.meta_title || form.title,
      meta_desc:  form.meta_desc  || form.excerpt,
    }
    if (editing !== 'new') payload.id = editing
    const { error } = await upsertPost(payload)
    setSaving(false)
    if (error) { setMsg('❌ 저장 실패: ' + error.message); return }
    setMsg('✅ 저장 완료!')
    setTimeout(() => { setMsg(''); setEditing(null); loadPosts() }, 1200)
  }

  const handleDelete = async (id, title) => {
    if (!confirm(`"${title}" 글을 삭제하시겠습니까?`)) return
    await deletePost(id)
    loadPosts()
  }

  // ── 편집 화면 ──
  if (editing !== null) return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {editing === 'new' ? '✏️ 새 글 작성' : '✏️ 글 수정'}
        </h2>
        <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5"/></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">제목 *</label>
          <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})}
            placeholder="예: 플로로탄닌 당뇨 임상 2b 성공"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"/>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">슬러그 * (URL)</label>
          <input value={form.slug} onChange={e=>setForm({...form,slug:e.target.value.toLowerCase().replace(/\s+/g,'-')})}
            placeholder="phlorotannin-diabetes-clinical-2b"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"/>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">카테고리</label>
          <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
            {BLOG_CATS.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">상태</label>
          <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
            <option value="published">발행</option>
            <option value="draft">임시저장</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">태그 (쉼표 구분)</label>
          <input value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})}
            placeholder="phlorotannin, PH-100, 당뇨, eckol"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"/>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">요약 (excerpt)</label>
        <textarea value={form.excerpt} onChange={e=>setForm({...form,excerpt:e.target.value})}
          rows={2} placeholder="글 목록에 표시되는 짧은 요약 (2~3줄)"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"/>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          본문 * <span className="font-normal text-gray-400">(마크다운 지원: ## 제목, **굵게**, - 목록)</span>
        </label>
        <textarea value={form.content} onChange={e=>setForm({...form,content:e.target.value})}
          rows={18} placeholder="## 소제목&#10;&#10;본문 내용...&#10;&#10;- 항목 1&#10;- 항목 2"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-400 resize-y"/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-blue-50 rounded-xl">
        <div>
          <label className="block text-sm font-semibold text-blue-700 mb-1">SEO 제목 (meta_title)</label>
          <input value={form.meta_title} onChange={e=>setForm({...form,meta_title:e.target.value})}
            placeholder="비우면 제목 자동 사용 | 60자 이내 권장"
            className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <p className="text-xs text-blue-500 mt-1">{form.meta_title.length}/60자</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-700 mb-1">SEO 설명 (meta_desc)</label>
          <textarea value={form.meta_desc} onChange={e=>setForm({...form,meta_desc:e.target.value})}
            rows={2} placeholder="검색 결과에 표시되는 설명 | 160자 이내 권장"
            className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"/>
          <p className="text-xs text-blue-500 mt-1">{form.meta_desc.length}/160자</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">대표 이미지 URL (og_image)</label>
        <input value={form.og_image} onChange={e=>setForm({...form,og_image:e.target.value})}
          placeholder="https://... (비우면 기본 이미지 사용)"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"/>
      </div>

      {msg && <p className="mb-4 text-sm font-semibold text-center">{msg}</p>}

      <div className="flex gap-3 justify-end">
        <button onClick={() => setEditing(null)}
          className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">
          취소
        </button>
        <button onClick={handleSave} disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold flex items-center gap-2 disabled:opacity-60">
          {saving ? <Loader className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4"/>}
          {saving ? '저장 중...' : '저장 & 발행'}
        </button>
      </div>
    </div>
  )

  // ── 목록 화면 ──
  return (
    <div className="bg-white rounded-2xl shadow-sm">
      <div className="p-5 border-b flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-teal-600"/> 블로그 글 관리
          <span className="text-sm font-normal text-gray-400">({posts.length}개)</span>
        </h2>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors">
          <Plus className="w-4 h-4"/> 새 글 작성
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"/></div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30"/>
          <p className="font-medium">아직 글이 없습니다</p>
          <p className="text-sm mt-1">Supabase SQL Editor에서 테이블을 먼저 생성하세요</p>
          <a href="https://supabase.com/dashboard/project/rlfxuyeoluoeaxuujtly/sql"
            target="_blank" rel="noopener"
            className="inline-flex items-center gap-1.5 mt-3 text-teal-600 text-sm font-semibold hover:underline">
            <ExternalLink className="w-4 h-4"/> Supabase SQL Editor 열기
          </a>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {posts.map(p => (
            <div key={p.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>{p.status === 'published' ? '발행' : '임시저장'}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {BLOG_CATS.find(c=>c.id===p.category)?.name || p.category}
                  </span>
                </div>
                <p className="font-semibold text-gray-900 truncate">{p.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  /blog/{p.slug} · {new Date(p.created_at).toLocaleDateString('ko-KR')} · 조회 {p.view_count}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a href={`https://phlorotannin.com/blog/${p.slug}`} target="_blank" rel="noopener"
                  className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all">
                  <Eye className="w-4 h-4"/>
                </a>
                <button onClick={() => openEdit(p)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Edit3 className="w-4 h-4"/>
                </button>
                <button onClick={() => handleDelete(p.id, p.title)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  <Trash2 className="w-4 h-4"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function YouTubeManageTab() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    youtubeUrl: '', videoTitle: '', videoSummary: '',
    legacyId: '', categoryId: '', sortOrder: 0,
  })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [preview, setPreview] = useState(null) // 미리보기 비디오 ID
  const [togglingId, setTogglingId] = useState(null) // 메인 토글 중인 ID

  // 블로그 + Q&A 카테고리 통합
  // 블로그: diabetes, cancer, brain, cardiovascular, inflammation, skin, research, general
  // Q&A:   metabolism, cancer_immune, neuro_cognitive, cardiovascular, infection_inflammation, skin, digestive, ...
  const CATEGORY_OPTIONS = [
    // ── 블로그 카테고리 ──────────────────────────────
    { id: 'diabetes',              name: '📝 블로그 · 당뇨·혈당',        group: 'blog' },
    { id: 'cancer',                name: '📝 블로그 · 항암·면역',         group: 'blog' },
    { id: 'brain',                 name: '📝 블로그 · 뇌·인지',          group: 'blog' },
    { id: 'cardiovascular',        name: '📝 블로그 · 심혈관',           group: 'blog' },
    { id: 'inflammation',          name: '📝 블로그 · 염증·면역',         group: 'blog' },
    { id: 'skin',                  name: '📝 블로그 · 피부·모발',         group: 'blog' },
    { id: 'research',              name: '📝 블로그 · 연구·임상',         group: 'blog' },
    { id: 'general',               name: '📝 블로그 · 일반',             group: 'blog' },
    // ── Q&A 카테고리 (DB: qa_categories) ─────────────────────────────────
    { id: 'metabolism',            name: '❓ Q&A · 대사질환',            group: 'qa' },
    { id: 'cancer_immune',         name: '❓ Q&A · 항암/면역',           group: 'qa' },
    { id: 'digestive',             name: '❓ Q&A · 소화/간',             group: 'qa' },
    { id: 'neuro_cognitive',       name: '❓ Q&A · 뇌/인지',             group: 'qa' },
    { id: 'mental_health',         name: '❓ Q&A · 정신건강',            group: 'qa' },
    { id: 'musculoskeletal',       name: '❓ Q&A · 근골격',              group: 'qa' },
    { id: 'skin_hair',             name: '❓ Q&A · 피부/모발',           group: 'qa' },
    { id: 'respiratory',           name: '❓ Q&A · 호흡기',              group: 'qa' },
    { id: 'infection_inflammation',name: '❓ Q&A · 감염/염증',           group: 'qa' },
    { id: 'womens_health',         name: '❓ Q&A · 여성건강',            group: 'qa' },
    { id: 'mens_health',           name: '❓ Q&A · 남성건강',            group: 'qa' },
  ]

  // YouTube URL에서 videoId 추출 (youtu.be, watch?v=, embed/ 모두 지원)
  function extractVideoId(url) {
    if (!url) return null
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&\s?#/]+)/)
    return m?.[1] || null
  }

  // youtu.be → 표준 URL 정규화
  function normalizeYoutubeUrl(url) {
    const id = extractVideoId(url.trim())
    if (!id) return url.trim()
    return `https://www.youtube.com/watch?v=${id}`
  }

  // URL 입력 시 실시간 미리보기
  function handleUrlChange(val) {
    setForm(f => ({ ...f, youtubeUrl: val }))
    const id = extractVideoId(val)
    setPreview(id)
  }

  function loadVideos() {
    setLoading(true)
    vFetch('/question_videos?select=*&order=created_at.desc')
      .then(({ data }) => {
        setVideos(data || [])
        setLoading(false)
      })
  }

  // 초기 영상 2개 자동 시드 (DB가 비어있을 때만)
  async function seedDefaultVideos() {
    const DEFAULTS = [
      {
        youtube_url:   'https://www.youtube.com/watch?v=lOM_Bn7wCsU',
        video_title:   '플로로탄닌 건강 정보 영상 1',
        video_summary: null,
        question_id:   null,
        category_id:   null,
        sort_order:    0,
        is_main:       true,
      },
      {
        youtube_url:   'https://www.youtube.com/watch?v=GdUU7sk04rc',
        video_title:   '플로로탄닌 건강 정보 영상 2',
        video_summary: null,
        question_id:   null,
        category_id:   null,
        sort_order:    1,
        is_main:       true,
      },
    ]
    const { data: existing } = await vFetch('/question_videos?select=id&limit=1')
    if (!existing || existing.length === 0) {
      await vFetch('/question_videos', { method: 'POST', body: JSON.stringify(DEFAULTS) })
    }
  }

  useEffect(() => {
    seedDefaultVideos().then(() => loadVideos())
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    const rawUrl = form.youtubeUrl.trim()
    const videoId = extractVideoId(rawUrl)

    // 유효성 검사
    if (!rawUrl) { setMsg('❌ YouTube URL을 입력해주세요.'); return }
    if (!videoId) { setMsg('❌ 올바른 YouTube URL이 아닙니다. (youtu.be/... 또는 youtube.com/watch?v=... 형식)'); return }
    if (!form.videoTitle.trim()) { setMsg('❌ 영상 제목을 입력해주세요.'); return }
    if (!form.categoryId) { setMsg('❌ 카테고리를 선택해주세요.'); return }

    const normalizedUrl = `https://www.youtube.com/watch?v=${videoId}`

    setSaving(true); setMsg('')

    // ★ 카테고리 중복 체크: 같은 카테고리에 이미 영상이 있으면 교체
    const { data: existing } = await vFetch(`/question_videos?category_id=eq.${form.categoryId}&select=id`)
    if (existing && existing.length > 0) {
      // 기존 영상 모두 삭제 후 새 영상 등록
      for (const old of existing) {
        await vFetch(`/question_videos?id=eq.${old.id}`, { method: 'DELETE', headers: { Prefer: 'return=minimal' } })
      }
    }

    const summaryWithLegacy = [
      form.videoSummary.trim(),
      form.legacyId.trim() ? `[질문ID:${form.legacyId.trim()}]` : ''
    ].filter(Boolean).join(' ')

    const { ok, data: inserted } = await vFetch('/question_videos', {
      method: 'POST',
      body: JSON.stringify({
        youtube_url:   normalizedUrl,
        video_title:   form.videoTitle.trim(),
        video_summary: summaryWithLegacy || null,
        question_id:   null,
        category_id:   form.categoryId,
        sort_order:    Number(form.sortOrder) || 0,
      })
    })
    setSaving(false)

    const error = ok ? null : (inserted?.[0] || { message: '저장 실패' })
    if (error) {
      setMsg('❌ 저장 실패: ' + error.message)
    } else {
      setMsg(`✅ 등록 완료! [${CATEGORY_OPTIONS.find(c=>c.id===form.categoryId)?.name}] 영상 ID: ${videoId}`)
      setForm({ youtubeUrl: '', videoTitle: '', videoSummary: '', legacyId: '', categoryId: '', sortOrder: 0 })
      setPreview(null)
      loadVideos()
      setTimeout(() => setMsg(''), 5000)
    }
  }

  async function handleDelete(id) {
    if (!confirm('삭제하시겠습니까?')) return
    await vFetch(`/question_videos?id=eq.${id}`, { method: 'DELETE', headers: { Prefer: 'return=minimal' } })
    loadVideos()
  }

  // 메인 고정 토글 — is_main=true는 최대 2개만 허용
  async function handleToggleMain(v) {
    const mainCount = videos.filter(x => x.is_main).length
    if (!v.is_main && mainCount >= 2) {
      setMsg('❌ 메인 고정은 최대 2개까지만 가능합니다. 기존 고정을 먼저 해제해주세요.')
      setTimeout(() => setMsg(''), 3000)
      return
    }
    setTogglingId(v.id)
    const { ok } = await vFetch(`/question_videos?id=eq.${v.id}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ is_main: !v.is_main })
    })
    const error = ok ? null : { message: '변경 실패' }
    // legacy setVideoMain replaced
    void error
    setTogglingId(null)
    if (!ok) {
      setMsg('❌ 변경 실패')
    } else {
      setMsg(v.is_main ? '📌 메인 고정 해제됨' : '✅ 메인에 고정되었습니다!')
      setTimeout(() => setMsg(''), 2500)
      loadVideos()
    }
  }

  return (
    <div className="space-y-6">
      {/* 등록 폼 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-bold text-ocean-deep text-lg mb-4 flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-red-500" />
          YouTube 영상 등록
        </h2>

        {/* 안내 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 space-y-1 text-sm text-blue-700">
          <p>📌 <strong>카테고리</strong>를 선택하면 해당 카테고리 페이지에 영상이 표시됩니다.</p>
          <p>📌 <strong>YouTube URL</strong>은 youtu.be 단축 링크, youtube.com 전체 URL 모두 가능합니다.</p>
          <p>📌 <strong>질문 레거시 ID</strong>(예: cardio-001)를 입력하면 참고용으로 저장됩니다.</p>
        </div>

        <form onSubmit={handleAdd} className="space-y-4">
          {/* URL + 미리보기 */}
          <div className="grid md:grid-cols-2 gap-4 items-start">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                YouTube URL <span className="text-red-500">*</span>
              </label>
              {/* type="text"로 고정 — type="url"은 youtu.be를 거부함 */}
              <input
                type="text"
                value={form.youtubeUrl}
                onChange={e => handleUrlChange(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-hana"
                placeholder="https://youtu.be/xxxx 또는 https://youtube.com/watch?v=xxxx"
              />
              {preview && (
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> 영상 ID 인식됨: <span className="font-mono">{preview}</span>
                </p>
              )}
              {form.youtubeUrl && !preview && (
                <p className="text-xs text-red-500 mt-1">⚠️ 유효한 YouTube URL을 입력하세요</p>
              )}
            </div>
            {/* 실시간 썸네일 미리보기 */}
            <div>
              {preview ? (
                <div className="rounded-xl overflow-hidden border border-gray-200 aspect-video bg-black">
                  <img
                    src={`https://img.youtube.com/vi/${preview}/mqdefault.jpg`}
                    alt="미리보기"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-200 aspect-video flex items-center justify-center text-gray-300 text-sm">
                  URL 입력 시 미리보기
                </div>
              )}
            </div>
          </div>

          {/* 제목 + 요약 */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                영상 제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.videoTitle}
                onChange={e => setForm(f => ({ ...f, videoTitle: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-hana"
                placeholder="영상 제목"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">요약 설명 (선택)</label>
              <input
                type="text"
                value={form.videoSummary}
                onChange={e => setForm(f => ({ ...f, videoSummary: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-hana"
                placeholder="영상 한 줄 설명"
              />
            </div>
          </div>

          {/* 카테고리 + 질문ID + 순서 */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                카테고리 <span className="text-gray-400 font-normal text-xs">(표시 위치)</span>
              </label>
              <select
                value={form.categoryId}
                onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-hana bg-white"
              >
                <option value="">선택 안 함</option>
                {CATEGORY_OPTIONS.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                질문 레거시 ID <span className="text-gray-400 font-normal text-xs">(참고용)</span>
              </label>
              <input
                type="text"
                value={form.legacyId}
                onChange={e => setForm(f => ({ ...f, legacyId: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-hana"
                placeholder="예: cardio-001 (선택)"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">정렬 순서</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={e => setForm(f => ({ ...f, sortOrder: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-hana"
                min="0"
              />
            </div>
          </div>

          {msg && (
            <p className={`text-sm font-medium px-3 py-2 rounded-lg ${msg.includes('❌') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {msg}
            </p>
          )}
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-hana text-white rounded-xl font-semibold hover:bg-opacity-90 transition disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? '등록 중...' : 'YouTube 영상 등록'}
          </button>
        </form>
      </div>

      {/* 등록된 영상 목록 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-ocean-deep flex items-center gap-2">
              <span>등록된 영상 ({videos.length}개)</span>
              {videos.filter(v => v.is_main).length > 0 && (
                <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-semibold">
                  📌 메인 고정 {videos.filter(v => v.is_main).length}/2
                </span>
              )}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              📌 버튼으로 메인 페이지에 고정할 영상을 선택하세요 (최대 2개)
            </p>
          </div>
          <button onClick={loadVideos} className="text-sm text-gray-400 hover:text-cyan-hana flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5" /> 새로고침
          </button>
        </div>

        {/* 메인 고정 현황 미리보기 */}
        {videos.filter(v => v.is_main).length > 0 && (
          <div className="mb-5 p-4 bg-teal-50 border border-teal-200 rounded-xl">
            <p className="text-sm font-bold text-teal-800 mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" /> 현재 메인 페이지에 표시되는 영상
            </p>
            <div className="flex gap-3 flex-wrap">
              {videos.filter(v => v.is_main).map(v => {
                const vid = extractVideoId(v.youtube_url)
                return (
                  <div key={v.id} className="flex items-center gap-2 bg-white rounded-xl border border-teal-200 p-2 pr-3">
                    {vid && (
                      <img src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`} alt="" className="w-16 h-10 object-cover rounded-lg" />
                    )}
                    <div>
                      <p className="text-xs font-semibold text-gray-800 line-clamp-1 max-w-[150px]">{v.video_title}</p>
                      <button
                        onClick={() => handleToggleMain(v)}
                        disabled={togglingId === v.id}
                        className="text-xs text-red-400 hover:text-red-600 mt-0.5 flex items-center gap-1"
                      >
                        <PinOff className="w-3 h-3" /> 고정 해제
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {loading ? (
          <div className="py-8 text-center text-gray-400 animate-pulse">로딩 중...</div>
        ) : videos.length === 0 ? (
          <div className="py-8 text-center text-gray-400">
            <PlayCircle className="w-10 h-10 mx-auto mb-2 text-gray-200" />
            <p>등록된 영상이 없습니다.</p>
            <p className="text-sm mt-1">위 폼에서 YouTube URL을 입력해 등록하세요.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {videos.map(v => {
              const vid = extractVideoId(v.youtube_url)
              const catName = CATEGORY_OPTIONS.find(c => c.id === v.category_id)?.name
              const isToggling = togglingId === v.id
              return (
                <div key={v.id} className={`flex items-start gap-3 p-3 border rounded-xl transition ${v.is_main ? 'border-teal-300 bg-teal-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                  {vid ? (
                    <img
                      src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`}
                      alt={v.video_title}
                      className="w-24 h-16 object-cover rounded-lg shrink-0"
                    />
                  ) : (
                    <div className="w-24 h-16 bg-gray-100 rounded-lg shrink-0 flex items-center justify-center">
                      <PlayCircle className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {v.is_main && (
                        <span className="text-xs bg-teal-500 text-white px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                          <Pin className="w-2.5 h-2.5" /> 메인 고정
                        </span>
                      )}
                      <p className="text-sm font-semibold text-gray-800 line-clamp-1">{v.video_title}</p>
                    </div>
                    {v.video_summary && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{v.video_summary}</p>}
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      {catName && (
                        <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                          {catName}
                        </span>
                      )}
                      {!catName && !v.question_id && (
                        <span className="text-xs bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full">
                          ⚠️ 카테고리 미지정
                        </span>
                      )}
                      <span className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full font-mono">
                        {vid}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {/* 메인 고정 토글 버튼 */}
                    <button
                      onClick={() => handleToggleMain(v)}
                      disabled={isToggling}
                      title={v.is_main ? '메인 고정 해제' : '메인에 고정'}
                      className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                        v.is_main
                          ? 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-teal-50 hover:text-teal-600'
                      } disabled:opacity-50`}
                    >
                      {isToggling ? (
                        <Loader className="w-3 h-3 animate-spin" />
                      ) : v.is_main ? (
                        <><PinOff className="w-3 h-3" /> 고정 해제</>
                      ) : (
                        <><Pin className="w-3 h-3" /> 메인 고정</>
                      )}
                    </button>
                    <div className="flex items-center gap-1">
                      <a
                        href={v.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-red-500 hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" /> 보기
                      </a>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="text-gray-300 hover:text-red-500 transition p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ───────────────────────────────────────────
// 메인 AdminPage
// ───────────────────────────────────────────
export default function AdminPage() {
  const [isLoggedIn,    setIsLoggedIn]    = useState(false)
  const [activeTab,     setActiveTab]     = useState('user_questions')
  const [submissions,   setSubmissions]   = useState([])
  const [partners,      setPartners]      = useState([])
  const [loading,       setLoading]       = useState(false)
  const [search,        setSearch]        = useState('')
  const [emailSettings, setEmailSettings] = useState({ host: '', port: 587, user: '', pass: '', to: '' })
  const [settingsSaved, setSettingsSaved] = useState(false)

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

  const fetchData = async () => {
    setLoading(true)
    try {
      const localSubs  = JSON.parse(localStorage.getItem('phlorotannin_submissions') || '[]')
      const localParts = JSON.parse(localStorage.getItem('phlorotannin_partner_applications') || '[]')
      setSubmissions(localSubs); setPartners(localParts)
      if (BACKEND_URL) {
        const [subRes, partRes] = await Promise.all([
          fetch(BACKEND_URL + '/api/admin/submissions',  { headers: { 'x-admin-key': ADMIN_PASS } }),
          fetch(BACKEND_URL + '/api/admin/partners',     { headers: { 'x-admin-key': ADMIN_PASS } }),
        ])
        if (subRes.ok)  setSubmissions(await subRes.json())
        if (partRes.ok) setPartners(await partRes.json())
      }
    } catch {}
    setLoading(false)
  }

  useEffect(() => { if (isLoggedIn) fetchData() }, [isLoggedIn])

  const downloadCSV = (data, filename) => {
    if (!data.length) return
    const keys = Object.keys(data[0])
    const csv  = [keys.join(','), ...data.map(r => keys.map(k => `"${(r[k] || '').toString().replace(/"/g, '""')}"`).join(','))].join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click()
  }

  const deleteSubmission = (id) => {
    if (!confirm('삭제하시겠습니까?')) return
    setSubmissions(prev => prev.filter(s => s.id !== id))
  }

  const filteredSubs  = submissions.filter(s => !search || s.name?.includes(search) || s.email?.includes(search) || s.phone?.includes(search))
  const filteredParts = partners.filter(p => !search || p.name?.includes(search) || p.email?.includes(search))

  if (!isLoggedIn) return <LoginScreen onLogin={() => setIsLoggedIn(true)} />

  const tabs = [
    { id: 'blog',           label: '블로그 관리',  icon: FileText },
    { id: 'user_questions', label: '고객 질문',    icon: MessageSquare },
    { id: 'partner_manage', label: '파트너 관리',  icon: Globe },
    { id: 'qa_answers',     label: 'Q&A 답변',     icon: PenSquare },
    { id: 'youtube',        label: 'YouTube',       icon: PlayCircle },
    { id: 'cms_categories', label: 'CMS·카테고리', icon: BookOpen },
    { id: 'cms_pages',      label: 'CMS·페이지',   icon: FileText },
    { id: 'cms_leads',      label: 'CMS·리드',     icon: UserPlus },
    { id: 'submissions',    label: '상담 문의',     icon: MessageSquare, count: submissions.length },
    { id: 'partners',       label: '파트너 신청',   icon: Users,         count: partners.length },
    { id: 'stats',          label: '통계',          icon: BookOpen },
    { id: 'settings',       label: '설정',          icon: Settings },
  ]

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="bg-ocean-deep text-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">관리자 대시보드</h1>
            <p className="text-gray-400 text-base mt-0.5">플로로탄닌 파트너스 운영 관리</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchData} className="flex items-center gap-2 text-gray-300 hover:text-white text-base">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> 새로고침
            </button>
            <button onClick={() => { try { sessionStorage.removeItem(ADMIN_TOKEN_KEY) } catch {} ; setIsLoggedIn(false) }} className="text-gray-400 hover:text-white text-base">로그아웃</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: '등록 파트너', value: JSON.parse(localStorage.getItem(PARTNERS_KEY) || '[]').length, color: 'text-cyan-hana' },
            { label: '상담 문의',   value: submissions.length,  color: 'text-blue-500' },
            { label: '파트너 신청', value: partners.length,     color: 'text-gold-hana' },
            { label: '오늘 신규',   value: [...submissions, ...partners].filter(s => new Date(s.timestamp || s.created_at).toDateString() === new Date().toDateString()).length, color: 'text-green-500' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-2xl shadow-sm p-5">
              <div className={`text-3xl font-bold ${item.color}`}>{item.value}</div>
              <div className="text-base text-gray-500 mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        {/* 탭 */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm mb-6 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-base font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-ocean-deep text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'blog'           && <BlogManageTab />}

        {activeTab === 'user_questions' && <UserQuestionsTab />}

        {activeTab === 'partner_manage' && <PartnerManageTab />}

        {activeTab === 'qa_answers' && <QAAnswerTab />}

        {activeTab === 'youtube' && <YouTubeManageTab />}

        {activeTab === 'cms_categories' && <CmsCategoriesTab />}
        {activeTab === 'cms_pages'      && <CmsPagesTab />}
        {activeTab === 'cms_leads'      && <CmsLeadsTab />}

        {activeTab === 'submissions' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="검색..." className="input-field pl-9 py-2 text-base" />
              </div>
              <button onClick={() => downloadCSV(filteredSubs, '상담문의.csv')}
                className="flex items-center gap-2 text-base bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">
                <Download className="w-4 h-4" /> CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="bg-gray-50">{['이름','연락처','이메일','카테고리','유형','날짜',''].map(h => <th key={h} className="p-4 text-sm font-semibold text-gray-500 text-left">{h}</th>)}</tr></thead>
                <tbody>
                  {filteredSubs.length === 0
                    ? <tr><td colSpan={7} className="p-12 text-center text-gray-400">데이터가 없습니다</td></tr>
                    : filteredSubs.map((s, i) => (
                      <tr key={s.id || i} className="border-t hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-700">{s.name}</td>
                        <td className="p-4 text-gray-500 text-base">{s.phone}</td>
                        <td className="p-4 text-gray-500 text-base"><a href={`mailto:${s.email}`} className="hover:text-cyan-hana">{s.email}</a></td>
                        <td className="p-4 text-gray-500 text-base">{s.category}</td>
                        <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full font-medium ${s.formType === 'newsletter' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>{s.formType === 'newsletter' ? '뉴스레터' : '상담'}</span></td>
                        <td className="p-4 text-gray-400 text-sm">{new Date(s.timestamp || s.created_at).toLocaleDateString('ko-KR')}</td>
                        <td className="p-4"><button onClick={() => deleteSubmission(s.id || i)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'partners' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="검색..." className="input-field pl-9 py-2 text-base" />
              </div>
              <button onClick={() => downloadCSV(filteredParts, '파트너신청.csv')}
                className="flex items-center gap-2 text-base bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">
                <Download className="w-4 h-4" /> CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="bg-gray-50">{['이름','연락처','이메일','직업','신청일'].map(h => <th key={h} className="p-4 text-sm font-semibold text-gray-500 text-left">{h}</th>)}</tr></thead>
                <tbody>
                  {filteredParts.length === 0
                    ? <tr><td colSpan={5} className="p-12 text-center text-gray-400">데이터가 없습니다</td></tr>
                    : filteredParts.map((p, i) => (
                      <tr key={p.id || i} className="border-t hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-700">{p.name}</td>
                        <td className="p-4 text-gray-500 text-base">{p.phone}</td>
                        <td className="p-4 text-gray-500 text-base"><a href={`mailto:${p.email}`} className="hover:text-cyan-hana">{p.email}</a></td>
                        <td className="p-4 text-gray-500 text-base">{p.job}</td>
                        <td className="p-4 text-gray-400 text-sm">{new Date(p.timestamp || p.created_at).toLocaleDateString('ko-KR')}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-ocean-deep mb-4">카테고리별 문의</h3>
              <div className="space-y-3">
                {Object.entries(submissions.reduce((acc, s) => { acc[s.category || '미지정'] = (acc[s.category || '미지정'] || 0) + 1; return acc }, {}))
                  .sort((a, b) => b[1] - a[1]).slice(0, 8).map(([cat, count]) => (
                  <div key={cat} className="flex items-center gap-3">
                    <div className="flex-1 text-base text-gray-600 truncate">{cat}</div>
                    <div className="w-24 h-2 bg-gray-100 rounded-full"><div className="h-2 bg-cyan-hana rounded-full" style={{ width: `${(count / Math.max(1, submissions.length)) * 100}%` }} /></div>
                    <div className="text-sm text-gray-400 w-6 text-right">{count}</div>
                  </div>
                ))}
                {submissions.length === 0 && <p className="text-gray-400 text-base">데이터가 없습니다</p>}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-ocean-deep mb-4">월별 신청 현황</h3>
              <div className="space-y-3">
                {Array.from({ length: 6 }, (_, i) => {
                  const d = new Date(); d.setMonth(d.getMonth() - (5 - i))
                  const month = d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })
                  const count = [...submissions, ...partners].filter(s => {
                    const sd = new Date(s.timestamp || s.created_at)
                    return sd.getFullYear() === d.getFullYear() && sd.getMonth() === d.getMonth()
                  }).length
                  return { month, count }
                }).map(item => (
                  <div key={item.month} className="flex items-center gap-3">
                    <div className="text-base text-gray-600 w-28">{item.month}</div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full"><div className="h-2 bg-gold-hana rounded-full" style={{ width: `${Math.min(100, (item.count / 10) * 100)}%` }} /></div>
                    <div className="text-sm text-gray-400 w-6 text-right">{item.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
              <div>
                <h3 className="font-bold text-ocean-deep text-xl mb-1">이메일 알림 설정</h3>
                <p className="text-base text-gray-500">상담 신청, 파트너 신청 시 자동으로 이메일 알림을 받을 수 있습니다.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="block text-base font-medium text-gray-700 mb-1.5">SMTP 호스트</label><input value={emailSettings.host} onChange={e => setEmailSettings(p => ({ ...p, host: e.target.value }))} className="input-field" placeholder="smtp.gmail.com" /></div>
                <div><label className="block text-base font-medium text-gray-700 mb-1.5">SMTP 포트</label><input type="number" value={emailSettings.port} onChange={e => setEmailSettings(p => ({ ...p, port: parseInt(e.target.value) }))} className="input-field" placeholder="587" /></div>
                <div><label className="block text-base font-medium text-gray-700 mb-1.5">발신 이메일</label><input value={emailSettings.user} onChange={e => setEmailSettings(p => ({ ...p, user: e.target.value }))} className="input-field" placeholder="your@gmail.com" /></div>
                <div><label className="block text-base font-medium text-gray-700 mb-1.5">앱 비밀번호</label><input type="password" value={emailSettings.pass} onChange={e => setEmailSettings(p => ({ ...p, pass: e.target.value }))} className="input-field" /></div>
              </div>
              <div><label className="block text-base font-medium text-gray-700 mb-1.5">알림 수신 이메일</label><input value={emailSettings.to} onChange={e => setEmailSettings(p => ({ ...p, to: e.target.value }))} className="input-field" placeholder="your@gmail.com" /></div>
              <button
                onClick={() => { setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 3000) }}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${settingsSaved ? 'bg-green-500 text-white' : 'btn-primary'}`}>
                {settingsSaved ? <><Check className="w-4 h-4" /> 저장되었습니다!</> : <><Save className="w-4 h-4" /> 설정 저장</>}
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
              <h3 className="font-bold text-ocean-deep">GitHub 저장소</h3>
              <div className="bg-gray-50 rounded-xl p-4 text-base font-mono text-gray-600">hyungunho00-creator/hanain · hanain/public/partners.json</div>
              <a href="https://github.com/hyungunho00-creator/hanain/blob/main/hanain/public/partners.json"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-base hover:bg-gray-700">
                partners.json 직접 편집
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════
// Phase 4 CMS — Categories Tab
// ═══════════════════════════════════════════
function CmsCategoriesTab() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(null)
  const [msg, setMsg] = useState('')
  const [tab, setTab] = useState('blog')

  const load = async () => {
    setLoading(true)
    const r = await adminApi('category_list', {})
    if (r.ok) setItems(r.data || [])
    else setMsg(`로드 실패: ${r.error || r.status}`)
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const filtered = items.filter(i => i.type === tab)

  const save = async () => {
    if (!edit.id || !edit.type || !edit.name) { setMsg('id/type/name 필수'); return }
    const r = await adminApi('category_upsert', { row: edit })
    if (r.ok) { setMsg('저장됨'); setEdit(null); load() }
    else setMsg(`실패: ${r.error}`)
  }
  const del = async (id) => {
    if (!confirm(`'${id}' 카테고리를 삭제할까요?`)) return
    const r = await adminApi('category_delete', { id })
    if (r.ok) { setMsg('삭제됨'); load() }
    else setMsg(`실패: ${r.error}`)
  }
  const newRow = (type) => setEdit({
    id: '', type, name: '', description: '', meta_title: '', meta_desc: '', sort_order: 100, status: 'active'
  })

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-ocean-deep">CMS · 카테고리 관리</h2>
        <button onClick={load} className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1.5">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> 새로고침
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        {['blog','qa'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${tab === t ? 'bg-ocean-deep text-white' : 'bg-gray-100 text-gray-700'}`}>
            {t === 'blog' ? '블로그' : 'Q&A'} ({items.filter(i => i.type === t).length})
          </button>
        ))}
        <button onClick={() => newRow(tab)}
          className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-cyan-hana text-white hover:opacity-90">
          <Plus className="w-4 h-4" /> 새 카테고리
        </button>
      </div>
      {msg && <p className="text-sm text-amber-700 bg-amber-50 rounded px-3 py-2 mb-3">{msg}</p>}

      {edit && (
        <div className="border-2 border-cyan-hana rounded-xl p-4 mb-4 bg-cyan-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="text-sm">ID(slug, 영문 소문자/하이픈)
              <input className="input-field mt-1" value={edit.id} onChange={e => setEdit({ ...edit, id: e.target.value })} placeholder="diabetes" />
            </label>
            <label className="text-sm">타입
              <select className="input-field mt-1" value={edit.type} onChange={e => setEdit({ ...edit, type: e.target.value })}>
                <option value="blog">blog</option><option value="qa">qa</option>
              </select>
            </label>
            <label className="text-sm">이름
              <input className="input-field mt-1" value={edit.name} onChange={e => setEdit({ ...edit, name: e.target.value })} placeholder="당뇨·혈당" />
            </label>
            <label className="text-sm">정렬
              <input type="number" className="input-field mt-1" value={edit.sort_order || 100} onChange={e => setEdit({ ...edit, sort_order: parseInt(e.target.value) || 100 })} />
            </label>
            <label className="text-sm md:col-span-2">설명
              <textarea className="input-field mt-1" rows={2} value={edit.description || ''} onChange={e => setEdit({ ...edit, description: e.target.value })} />
            </label>
            <label className="text-sm">SEO 타이틀
              <input className="input-field mt-1" value={edit.meta_title || ''} onChange={e => setEdit({ ...edit, meta_title: e.target.value })} />
            </label>
            <label className="text-sm">상태
              <select className="input-field mt-1" value={edit.status || 'active'} onChange={e => setEdit({ ...edit, status: e.target.value })}>
                <option value="active">active</option><option value="draft">draft</option>
              </select>
            </label>
            <label className="text-sm md:col-span-2">SEO 설명
              <textarea className="input-field mt-1" rows={2} value={edit.meta_desc || ''} onChange={e => setEdit({ ...edit, meta_desc: e.target.value })} />
            </label>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={save} className="btn-primary px-4 py-2 text-sm inline-flex items-center gap-1.5"><Save className="w-4 h-4" /> 저장</button>
            <button onClick={() => setEdit(null)} className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 inline-flex items-center gap-1.5"><X className="w-4 h-4" /> 취소</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2 pr-3">ID</th>
              <th className="py-2 pr-3">이름</th>
              <th className="py-2 pr-3">정렬</th>
              <th className="py-2 pr-3">상태</th>
              <th className="py-2 pr-3">작업</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="py-2 pr-3 font-mono text-xs">{c.id}</td>
                <td className="py-2 pr-3">{c.name}</td>
                <td className="py-2 pr-3">{c.sort_order}</td>
                <td className="py-2 pr-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{c.status}</span>
                </td>
                <td className="py-2 pr-3">
                  <button onClick={() => setEdit({ ...c })} className="text-cyan-700 hover:underline text-xs mr-3"><Edit3 className="w-3.5 h-3.5 inline" /> 편집</button>
                  <button onClick={() => del(c.id)} className="text-red-600 hover:underline text-xs"><Trash2 className="w-3.5 h-3.5 inline" /> 삭제</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="py-6 text-center text-gray-400 text-sm">데이터 없음</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════
// Phase 4 CMS — Pages Tab
// ═══════════════════════════════════════════
function CmsPagesTab() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(null)
  const [msg, setMsg] = useState('')

  const load = async () => {
    setLoading(true)
    const r = await adminApi('page_list', {})
    if (r.ok) setItems(r.data || [])
    else setMsg(`로드 실패: ${r.error || r.status}`)
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!edit.slug) { setMsg('slug 필수'); return }
    const r = await adminApi('page_upsert', { row: edit })
    if (r.ok) { setMsg('저장됨 — sitemap/SEO 캐시는 ~5분 내 반영'); setEdit(null); load() }
    else setMsg(`실패: ${r.error}`)
  }
  const del = async (slug) => {
    if (!confirm(`'${slug}' 페이지를 삭제할까요?`)) return
    const r = await adminApi('page_delete', { slug })
    if (r.ok) { setMsg('삭제됨'); load() }
    else setMsg(`실패: ${r.error}`)
  }
  const newRow = () => setEdit({
    slug: '', title: '', meta_title: '', meta_desc: '', body: '', sort_order: 100, status: 'active'
  })

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-ocean-deep">CMS · 고정 페이지 관리</h2>
        <div className="flex gap-2">
          <button onClick={newRow} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-cyan-hana text-white hover:opacity-90">
            <Plus className="w-4 h-4" /> 새 페이지
          </button>
          <button onClick={load} className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1.5">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> 새로고침
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-3">
        ⚠️ <code>slug</code>는 URL 경로(예: <code>home</code> → <code>/</code>, <code>phlorotannin</code> → <code>/phlorotannin</code>)에 매핑됩니다.
        여기서 <code>meta_title</code>/<code>meta_desc</code>를 채우면 <code>/api/seo</code>가 코드 상수보다 우선 사용합니다.
      </p>
      {msg && <p className="text-sm text-amber-700 bg-amber-50 rounded px-3 py-2 mb-3">{msg}</p>}

      {edit && (
        <div className="border-2 border-cyan-hana rounded-xl p-4 mb-4 bg-cyan-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="text-sm">slug(영문 소문자/하이픈)
              <input className="input-field mt-1" value={edit.slug} onChange={e => setEdit({ ...edit, slug: e.target.value })} placeholder="home" />
            </label>
            <label className="text-sm">정렬
              <input type="number" className="input-field mt-1" value={edit.sort_order || 100} onChange={e => setEdit({ ...edit, sort_order: parseInt(e.target.value) || 100 })} />
            </label>
            <label className="text-sm md:col-span-2">제목(내부용)
              <input className="input-field mt-1" value={edit.title || ''} onChange={e => setEdit({ ...edit, title: e.target.value })} />
            </label>
            <label className="text-sm md:col-span-2">SEO 타이틀
              <input className="input-field mt-1" value={edit.meta_title || ''} onChange={e => setEdit({ ...edit, meta_title: e.target.value })} />
            </label>
            <label className="text-sm md:col-span-2">SEO 설명 (160자 권장)
              <textarea className="input-field mt-1" rows={3} value={edit.meta_desc || ''} onChange={e => setEdit({ ...edit, meta_desc: e.target.value })} />
            </label>
            <label className="text-sm md:col-span-2">본문 (옵션 — 현재 미사용)
              <textarea className="input-field mt-1" rows={4} value={edit.body || ''} onChange={e => setEdit({ ...edit, body: e.target.value })} />
            </label>
            <label className="text-sm">상태
              <select className="input-field mt-1" value={edit.status || 'active'} onChange={e => setEdit({ ...edit, status: e.target.value })}>
                <option value="active">active</option><option value="draft">draft</option>
              </select>
            </label>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={save} className="btn-primary px-4 py-2 text-sm inline-flex items-center gap-1.5"><Save className="w-4 h-4" /> 저장</button>
            <button onClick={() => setEdit(null)} className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 inline-flex items-center gap-1.5"><X className="w-4 h-4" /> 취소</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2 pr-3">slug</th>
              <th className="py-2 pr-3">SEO 타이틀</th>
              <th className="py-2 pr-3">정렬</th>
              <th className="py-2 pr-3">상태</th>
              <th className="py-2 pr-3">작업</th>
            </tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p.slug} className="border-b hover:bg-gray-50">
                <td className="py-2 pr-3 font-mono text-xs">{p.slug}</td>
                <td className="py-2 pr-3 max-w-md truncate">{p.meta_title || p.title}</td>
                <td className="py-2 pr-3">{p.sort_order}</td>
                <td className="py-2 pr-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{p.status}</span>
                </td>
                <td className="py-2 pr-3">
                  <button onClick={() => setEdit({ ...p })} className="text-cyan-700 hover:underline text-xs mr-3"><Edit3 className="w-3.5 h-3.5 inline" /> 편집</button>
                  <button onClick={() => del(p.slug)} className="text-red-600 hover:underline text-xs"><Trash2 className="w-3.5 h-3.5 inline" /> 삭제</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="py-6 text-center text-gray-400 text-sm">데이터 없음</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════
// Phase 4 CMS — Leads Tab
// ═══════════════════════════════════════════
function CmsLeadsTab() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const [msg, setMsg] = useState('')

  const load = async () => {
    setLoading(true)
    const r = await adminApi('lead_list', { status: filter })
    if (r.ok) setItems(r.data || [])
    else setMsg(`로드 실패: ${r.error || r.status}`)
    setLoading(false)
  }
  useEffect(() => { load() /* eslint-disable-next-line */ }, [filter])

  const updateStatus = async (id, status) => {
    const r = await adminApi('lead_update_status', { id, status })
    if (r.ok) load()
    else setMsg(`실패: ${r.error}`)
  }
  const del = async (id) => {
    if (!confirm('이 리드를 삭제할까요?')) return
    const r = await adminApi('lead_delete', { id })
    if (r.ok) load()
    else setMsg(`실패: ${r.error}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-ocean-deep">CMS · 리드 / 문의</h2>
        <div className="flex items-center gap-2">
          <select value={filter} onChange={e => setFilter(e.target.value)} className="input-field py-1.5 text-sm">
            <option value="">전체</option>
            <option value="new">new</option>
            <option value="contacted">contacted</option>
            <option value="closed">closed</option>
          </select>
          <button onClick={load} className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1.5">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> 새로고침
          </button>
        </div>
      </div>
      {msg && <p className="text-sm text-amber-700 bg-amber-50 rounded px-3 py-2 mb-3">{msg}</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2 pr-3">접수</th>
              <th className="py-2 pr-3">이름</th>
              <th className="py-2 pr-3">연락처</th>
              <th className="py-2 pr-3">메시지</th>
              <th className="py-2 pr-3">소스</th>
              <th className="py-2 pr-3">상태</th>
              <th className="py-2 pr-3">작업</th>
            </tr>
          </thead>
          <tbody>
            {items.map(l => (
              <tr key={l.id} className="border-b hover:bg-gray-50 align-top">
                <td className="py-2 pr-3 text-xs whitespace-nowrap">{l.created_at ? new Date(l.created_at).toLocaleString('ko-KR') : ''}</td>
                <td className="py-2 pr-3">{l.name || '-'}</td>
                <td className="py-2 pr-3 text-xs">
                  <div>{l.phone || '-'}</div>
                  <div className="text-gray-400">{l.email || ''}</div>
                </td>
                <td className="py-2 pr-3 max-w-xs">
                  <div className="line-clamp-3 text-xs text-gray-700">{l.message || ''}</div>
                </td>
                <td className="py-2 pr-3 text-xs text-gray-500">{l.source || '-'}</td>
                <td className="py-2 pr-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${l.status === 'new' ? 'bg-cyan-100 text-cyan-700' : l.status === 'contacted' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>{l.status}</span>
                </td>
                <td className="py-2 pr-3 whitespace-nowrap">
                  {l.status !== 'contacted' && <button onClick={() => updateStatus(l.id, 'contacted')} className="text-amber-700 hover:underline text-xs mr-2">연락중</button>}
                  {l.status !== 'closed' && <button onClick={() => updateStatus(l.id, 'closed')} className="text-gray-700 hover:underline text-xs mr-2">완료</button>}
                  <button onClick={() => del(l.id)} className="text-red-600 hover:underline text-xs"><Trash2 className="w-3.5 h-3.5 inline" /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={7} className="py-6 text-center text-gray-400 text-sm">데이터 없음</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
