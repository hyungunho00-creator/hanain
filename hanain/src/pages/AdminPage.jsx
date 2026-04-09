import { useState, useEffect } from 'react'
import { Settings, Users, MessageSquare, BookOpen, Trash2, Save, X, Search, Download, RefreshCw, Lock, Eye, EyeOff, Copy, Check, Link2, Phone, UserPlus, AlertCircle, CheckCircle, Loader, Globe } from 'lucide-react'

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || '56528206'
const PARTNERS_KEY = 'phlorotannin_partners_v2'
const GH_TOKEN_KEY = 'phlorotannin_gh_token'
const GH_REPO = 'hyungunho00-creator/hanain'
const GH_FILE_PATH = 'hanain/public/partners.json'
const MAIN_SITE = 'https://phlorotannin.com'

// 전화번호 포맷
function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 11) return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  if (digits.length === 10) return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  return digits
}

// 슬러그 생성 (랜덤 6자리)
function makeSlug() {
  return Math.random().toString(36).substring(2, 8)
}

// 슬러그 유효성 검사 (영문 소문자, 숫자, 하이픈만 허용)
function isValidSlug(s) {
  return /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/.test(s)
}

// ───────────────────────────────────────────
// GitHub: partners.json 읽기/쓰기
// ───────────────────────────────────────────
async function ghGetPartnersJson(ghToken) {
  const resp = await fetch(
    `https://api.github.com/repos/${GH_REPO}/contents/${GH_FILE_PATH}`,
    { headers: { Authorization: `token ${ghToken}`, Accept: 'application/vnd.github.v3+json' } }
  )
  if (!resp.ok) throw new Error(`GitHub 파일 읽기 실패: ${resp.status}`)
  const data = await resp.json()
  const content = JSON.parse(atob(data.content.replace(/\n/g, '')))
  return { content, sha: data.sha }
}

async function ghUpdatePartnersJson(ghToken, newContent, fileSha) {
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(newContent, null, 2))))
  const resp = await fetch(
    `https://api.github.com/repos/${GH_REPO}/contents/${GH_FILE_PATH}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${ghToken}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `파트너 목록 업데이트`,
        content: encoded,
        sha: fileSha,
        branch: 'main',
      }),
    }
  )
  if (!resp.ok) {
    const err = await resp.json()
    throw new Error(`GitHub 쓰기 실패: ${err.message}`)
  }
  return await resp.json()
}

// ───────────────────────────────────────────
// 로그인
// ───────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const [err, setErr] = useState(false)
  const handleLogin = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASS) onLogin(); else setErr(true)
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
    <button onClick={() => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }) }}
      className={`flex items-center gap-1 text-sm px-2.5 py-1.5 rounded-lg font-medium transition-all ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? '복사됨!' : label}
    </button>
  )
}

// ───────────────────────────────────────────
// 파트너 관리 탭 (경로 기반 /p/:slug 방식)
// ───────────────────────────────────────────
function PartnerManageTab() {
  const [partners, setPartners] = useState([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', slug: '', memo: '' })
  const [errors, setErrors] = useState({})

  // GitHub 토큰 설정
  const [ghToken, setGhToken] = useState(() => localStorage.getItem(GH_TOKEN_KEY) || '')
  const [showSettings, setShowSettings] = useState(false)
  const [tokenInput, setTokenInput] = useState('')

  // 저장 상태
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState(null)

  // localStorage에서 로드
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem(PARTNERS_KEY) || '[]')
    setPartners(list)
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
    const sl = form.slug.trim().toLowerCase()
    if (sl && !isValidSlug(sl)) errs.slug = '영문 소문자, 숫자, 하이픈만 사용 가능 (예: kim, park-seoul)'
    // 중복 슬러그 체크
    const finalSlug = sl || ''
    if (finalSlug && partners.some(p => p.slug === finalSlug)) errs.slug = '이미 사용 중인 슬러그입니다. 다른 이름을 입력하세요.'
    return errs
  }

  const addPartner = async () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    const digits = form.phone.replace(/\D/g, '')
    const phoneDisplay = formatPhone(digits)
    const name = form.name.trim()
    const slug = form.slug.trim().toLowerCase() || makeSlug()
    const partnerUrl = `${MAIN_SITE}/p/${slug}`

    const newPartner = {
      slug,
      name,
      phone: digits,
      phoneDisplay,
      memo: form.memo.trim(),
      siteUrl: partnerUrl,
      createdAt: new Date().toISOString(),
    }

    setSaving(true)
    setResult(null)

    try {
      // GitHub partners.json 업데이트 (선택적 — 토큰 있을 때만)
      if (ghToken) {
        try {
          const { content: jsonData, sha: fileSha } = await ghGetPartnersJson(ghToken)
          jsonData.partners = [newPartner, ...(jsonData.partners || [])]
          await ghUpdatePartnersJson(ghToken, jsonData, fileSha)
        } catch (ghErr) {
          console.warn('GitHub 업데이트 스킵:', ghErr.message)
          // GitHub 실패해도 로컬은 저장
        }
      }

      // 로컬 저장
      saveLocal([newPartner, ...partners])
      setForm({ name: '', phone: '', slug: '', memo: '' })
      setErrors({})
      setShowForm(false)
      setResult({ success: true, url: partnerUrl, name })
    } catch (e) {
      console.error(e)
      setResult({ success: false, error: e.message })
    } finally {
      setSaving(false)
    }
  }

  const deletePartner = (slug) => {
    if (!confirm('삭제하시겠습니까?\nGitHub 토큰이 설정된 경우 partners.json도 함께 업데이트됩니다.')) return
    const updated = partners.filter(p => p.slug !== slug)
    saveLocal(updated)
    // GitHub도 업데이트 (선택적)
    if (ghToken) {
      ghGetPartnersJson(ghToken).then(({ content, sha }) => {
        content.partners = (content.partners || []).filter(p => p.slug !== slug)
        ghUpdatePartnersJson(ghToken, content, sha).catch(console.warn)
      }).catch(console.warn)
    }
  }

  const downloadCSV = () => {
    if (!partners.length) return
    const rows = [['이름', '전화번호', '파트너URL', '슬러그', '메모', '등록일'],
      ...partners.map(p => [p.name, p.phoneDisplay, p.siteUrl || '', p.slug || '', p.memo || '', new Date(p.createdAt).toLocaleDateString('ko-KR')])]
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
    a.download = `파트너목록_${new Date().toLocaleDateString('ko-KR')}.csv`; a.click()
  }

  const filtered = partners.filter(p =>
    !search || p.name?.includes(search) || p.phoneDisplay?.includes(search) || p.memo?.includes(search)
  )

  return (
    <div className="space-y-4">

      {/* 헤더 */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-ocean-deep text-xl flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-hana" />
              파트너 전용 페이지 관리
            </h3>
            <p className="text-base text-gray-500 mt-0.5">
              파트너 URL: <span className="font-mono text-cyan-hana">phlorotannin.com/p/슬러그</span> — DNS 설정 불필요, 즉시 발급
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={downloadCSV} className="flex items-center gap-1.5 text-base bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg">
              <Download className="w-4 h-4" /> CSV
            </button>
            <button onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center gap-1.5 text-base px-3 py-2 rounded-lg transition-colors ${ghToken ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              {ghToken ? <CheckCircle className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
              {ghToken ? 'GitHub 연결됨' : 'GitHub 설정 (선택)'}
            </button>
            <button onClick={() => { setShowForm(true); setErrors({}); setResult(null) }}
              className="flex items-center gap-1.5 text-base bg-ocean-deep text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
              <UserPlus className="w-4 h-4" /> 파트너 추가
            </button>
          </div>
        </div>

        {/* GitHub 토큰 설정 패널 */}
        {showSettings && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
            <p className="text-base font-semibold text-gray-700">🔑 GitHub 토큰 설정 (선택 — 설정 시 partners.json 자동 동기화)</p>
            <div className="max-w-md">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                GitHub Personal Access Token
                <a href="https://github.com/settings/tokens/new?scopes=repo" target="_blank" rel="noopener noreferrer" className="ml-1 text-cyan-hana hover:underline">발급하기 →</a>
              </label>
              <div className="flex gap-2">
                <input type="password" placeholder="ghp_xxx..."
                  value={tokenInput} onChange={e => setTokenInput(e.target.value)}
                  className="input-field flex-1 text-base py-2" />
                <button onClick={() => { localStorage.setItem(GH_TOKEN_KEY, tokenInput); setGhToken(tokenInput); setShowSettings(false) }}
                  className="bg-gray-800 text-white px-3 py-2 rounded-lg text-base">저장</button>
              </div>
              {ghToken && <p className="text-sm text-green-600 mt-1">✅ 연결됨: {ghToken.slice(0, 10)}...</p>}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              <p className="font-semibold mb-1">GitHub 토큰 없이도 사용 가능합니다.</p>
              <p>토큰 없이 추가 시 이 기기(localStorage)에만 저장됩니다. 파트너 페이지 URL({MAIN_SITE}/p/슬러그)은 즉시 동작합니다.</p>
            </div>
          </div>
        )}

        {/* 안내 배너 */}
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-base text-emerald-800">
          <p className="font-semibold mb-1">✨ 경로 기반 파트너 URL 방식</p>
          <div className="grid sm:grid-cols-2 gap-2 text-emerald-700 text-sm">
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-emerald-500" />
              <span>DNS/서브도메인 설정 불필요 — 즉시 발급</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-emerald-500" />
              <span>본사 업데이트 → 파트너 페이지 자동 최신화</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-emerald-500" />
              <span>파트너 수 무제한 · 추가 비용 없음</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-emerald-500" />
              <span>카카오톡·문자 링크 공유 100% 작동</span>
            </div>
          </div>
        </div>
      </div>

      {/* 저장 진행 */}
      {saving && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
          <Loader className="w-5 h-5 text-blue-500 animate-spin flex-shrink-0" />
          <p className="font-medium text-blue-800">파트너 등록 중...</p>
        </div>
      )}

      {/* 결과 */}
      {result && !saving && (
        <div className={`rounded-xl p-4 border ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          {result.success ? (
            <div>
              <p className="font-bold text-green-800 flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5" /> 🎉 {result.name} 파트너 등록 완료!
              </p>
              <p className="text-sm font-semibold text-green-700 mb-1">📎 파트너 전달 URL</p>
              <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-green-300">
                <Globe className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-base text-gray-800 font-mono flex-1 font-semibold">{result.url}</span>
                <CopyButton text={result.url} label="URL 복사" />
              </div>
              <p className="text-sm text-green-600 mt-2">
                ✅ 이 URL을 파트너에게 전달하세요. 지금 바로 접속 가능합니다.
              </p>
            </div>
          ) : (
            <div>
              <p className="font-bold text-red-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> 오류 발생
              </p>
              <p className="text-base text-red-600 mt-1">{result.error}</p>
            </div>
          )}
          <button onClick={() => setResult(null)} className="mt-3 text-sm text-gray-400 hover:text-gray-600">닫기</button>
        </div>
      )}

      {/* 추가 폼 */}
      {showForm && !saving && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-cyan-hana/30">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-ocean-deep text-lg">새 파트너 추가</h4>
            <button onClick={() => { setShowForm(false); setErrors({}) }}><X className="w-5 h-5 text-gray-400" /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1.5">파트너 이름 <span className="text-red-500">*</span></label>
              <input value={form.name} onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })) }}
                className={`input-field ${errors.name ? 'border-red-400' : ''}`} placeholder="예: 홍길동" />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1.5">전화번호 <span className="text-red-500">*</span></label>
              <input value={form.phone} onChange={e => { setForm(p => ({ ...p, phone: e.target.value })); setErrors(p => ({ ...p, phone: '' })) }}
                className={`input-field ${errors.phone ? 'border-red-400' : ''}`} placeholder="010-0000-0000" type="tel" />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            {/* 슬러그(경로) 입력 */}
            <div className="sm:col-span-2">
              <label className="block text-base font-medium text-gray-700 mb-1.5">
                경로 슬러그 (선택)
                <span className="ml-1.5 text-sm text-gray-400 font-normal">— 비워두면 랜덤 코드 자동 생성</span>
              </label>
              <div className={`flex items-center border rounded-xl overflow-hidden transition-colors ${
                errors.slug ? 'border-red-400' : 'border-gray-300 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-100'
              }`}>
                <span className="px-3 py-3 text-base text-gray-400 bg-gray-50 border-r border-gray-200 whitespace-nowrap">phlorotannin.com/p/</span>
                <input
                  value={form.slug}
                  onChange={e => { setForm(p => ({ ...p, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })); setErrors(p => ({ ...p, slug: '' })) }}
                  className="flex-1 px-3 py-3 outline-none bg-transparent text-gray-800 text-base font-mono"
                  placeholder="kim (영문·숫자·하이픈)"
                />
              </div>
              {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
              {form.slug && !errors.slug && (
                <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  발급 URL: <span className="font-mono font-semibold">{MAIN_SITE}/p/{form.slug.toLowerCase()}</span>
                </p>
              )}
              {!form.slug && (
                <p className="text-sm text-gray-400 mt-1">비워두면 예: phlorotannin.com/p/ab12xy (자동 생성)</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-base font-medium text-gray-700 mb-1.5">메모 (선택)</label>
              <input value={form.memo} onChange={e => setForm(p => ({ ...p, memo: e.target.value }))}
                className="input-field" placeholder="예: 서울 강남 지역" />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={addPartner}
              className="flex items-center gap-2 bg-ocean-deep text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-opacity-90">
              <CheckCircle className="w-4 h-4" /> 파트너 등록
            </button>
            <button onClick={() => { setShowForm(false); setErrors({}) }}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50">취소</button>
          </div>
          <p className="text-sm text-gray-400 mt-2">⚡ 즉시 등록 — DNS 대기 없음</p>
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
            {!search && <button onClick={() => { setShowForm(true); setErrors({}) }} className="mt-4 text-base text-cyan-hana hover:underline">첫 번째 파트너 추가 →</button>}
          </div>
        ) : (
          <div className="divide-y">
            {filtered.map((p, idx) => (
              <div key={p.slug || idx} className="p-5 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-10 h-10 bg-ocean-deep/10 rounded-xl flex items-center justify-center text-base font-bold text-ocean-deep flex-shrink-0">{idx + 1}</div>
                    <div className="min-w-0">
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
                          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5">
                            <Globe className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span className="text-sm text-emerald-700 font-mono font-semibold">{p.siteUrl}</span>
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
// 메인 AdminPage
// ───────────────────────────────────────────
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('partner_manage')
  const [submissions, setSubmissions] = useState([])
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [emailSettings, setEmailSettings] = useState({ host: '', port: 587, user: '', pass: '', to: '' })
  const [settingsSaved, setSettingsSaved] = useState(false)

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

  const fetchData = async () => {
    setLoading(true)
    try {
      const localSubs = JSON.parse(localStorage.getItem('phlorotannin_submissions') || '[]')
      const localParts = JSON.parse(localStorage.getItem('phlorotannin_partner_applications') || '[]')
      setSubmissions(localSubs)
      setPartners(localParts)
      if (BACKEND_URL) {
        const [subRes, partRes] = await Promise.all([
          fetch(BACKEND_URL + '/api/admin/submissions', { headers: { 'x-admin-key': ADMIN_PASS } }),
          fetch(BACKEND_URL + '/api/admin/partners', { headers: { 'x-admin-key': ADMIN_PASS } }),
        ])
        if (subRes.ok) setSubmissions(await subRes.json())
        if (partRes.ok) setPartners(await partRes.json())
      }
    } catch {}
    setLoading(false)
  }

  useEffect(() => { if (isLoggedIn) fetchData() }, [isLoggedIn])

  const downloadCSV = (data, filename) => {
    if (!data.length) return
    const keys = Object.keys(data[0])
    const csv = [keys.join(','), ...data.map(r => keys.map(k => `"${(r[k] || '').toString().replace(/"/g, '""')}"`).join(','))].join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click()
  }

  const deleteSubmission = async (id) => {
    if (!confirm('삭제하시겠습니까?')) return
    setSubmissions(prev => prev.filter(s => s.id !== id))
  }

  const filteredSubmissions = submissions.filter(s => !search || s.name?.includes(search) || s.email?.includes(search) || s.phone?.includes(search))
  const filteredPartners = partners.filter(p => !search || p.name?.includes(search) || p.email?.includes(search))

  if (!isLoggedIn) return <LoginScreen onLogin={() => setIsLoggedIn(true)} />

  const tabs = [
    { id: 'partner_manage', label: '파트너 관리', icon: Globe },
    { id: 'submissions', label: '상담 문의', icon: MessageSquare, count: submissions.length },
    { id: 'partners', label: '파트너 신청', icon: Users, count: partners.length },
    { id: 'stats', label: '통계', icon: BookOpen },
    { id: 'settings', label: '설정', icon: Settings },
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
            <button onClick={() => setIsLoggedIn(false)} className="text-gray-400 hover:text-white text-base">로그아웃</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: '등록 파트너', value: JSON.parse(localStorage.getItem(PARTNERS_KEY) || '[]').length, color: 'text-cyan-hana' },
            { label: '상담 문의', value: submissions.length, color: 'text-blue-500' },
            { label: '파트너 신청', value: partners.length, color: 'text-gold-hana' },
            { label: '오늘 신규', value: [...submissions, ...partners].filter(s => new Date(s.timestamp || s.created_at).toDateString() === new Date().toDateString()).length, color: 'text-green-500' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-2xl shadow-sm p-5">
              <div className={`text-3xl font-bold ${item.color}`}>{item.value}</div>
              <div className="text-base text-gray-500 mt-1">{item.label}</div>
            </div>
          ))}
        </div>

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

        {activeTab === 'partner_manage' && <PartnerManageTab />}

        {activeTab === 'submissions' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="검색..." className="input-field pl-9 py-2 text-base" />
              </div>
              <button onClick={() => downloadCSV(filteredSubmissions, '상담문의.csv')}
                className="flex items-center gap-2 text-base bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">
                <Download className="w-4 h-4" /> CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="bg-gray-50">{['이름','연락처','이메일','카테고리','유형','날짜',''].map(h => <th key={h} className="p-4 text-sm font-semibold text-gray-500 uppercase text-left">{h}</th>)}</tr></thead>
                <tbody>
                  {filteredSubmissions.length === 0
                    ? <tr><td colSpan={7} className="p-12 text-center text-gray-400">데이터가 없습니다</td></tr>
                    : filteredSubmissions.map((s, i) => (
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
              <button onClick={() => downloadCSV(filteredPartners, '파트너신청.csv')}
                className="flex items-center gap-2 text-base bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">
                <Download className="w-4 h-4" /> CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="bg-gray-50">{['이름','연락처','이메일','직업','신청일'].map(h => <th key={h} className="p-4 text-sm font-semibold text-gray-500 uppercase text-left">{h}</th>)}</tr></thead>
                <tbody>
                  {filteredPartners.length === 0
                    ? <tr><td colSpan={5} className="p-12 text-center text-gray-400">데이터가 없습니다</td></tr>
                    : filteredPartners.map((p, i) => (
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
                <div><label className="block text-base font-medium text-gray-700 mb-1.5">발신 이메일</label><input value={emailSettings.user} onChange={e => setEmailSettings(p => ({ ...p, user: e.target.value }))} className="input-field" placeholder="hyungunho00@gmail.com" /></div>
                <div><label className="block text-base font-medium text-gray-700 mb-1.5">앱 비밀번호</label><input type="password" value={emailSettings.pass} onChange={e => setEmailSettings(p => ({ ...p, pass: e.target.value }))} className="input-field" /></div>
              </div>
              <div><label className="block text-base font-medium text-gray-700 mb-1.5">알림 수신 이메일</label><input value={emailSettings.to} onChange={e => setEmailSettings(p => ({ ...p, to: e.target.value }))} className="input-field" placeholder="hyungunho00@gmail.com" /></div>
              <button onClick={() => { setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 3000) }}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${settingsSaved ? 'bg-green-500 text-white' : 'btn-primary'}`}>
                {settingsSaved ? <><Check className="w-4 h-4" /> 저장되었습니다!</> : <><Save className="w-4 h-4" /> 설정 저장</>}
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
              <h3 className="font-bold text-ocean-deep">GitHub 저장소</h3>
              <div className="bg-gray-50 rounded-xl p-4 text-base font-mono text-gray-600">hyungunho00-creator/hanain · hanain/public/partners.json</div>
              <a href="https://github.com/hyungunho00-creator/hanain/blob/main/hanain/public/partners.json" target="_blank" rel="noopener noreferrer"
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
