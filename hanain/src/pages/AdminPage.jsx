import { useState, useEffect } from 'react'
import { Settings, Users, MessageSquare, BookOpen, Plus, Edit, Trash2, Save, X, Search, Download, RefreshCw, Lock, Eye, EyeOff } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
const ADMIN_PASS = 'hanain2024'

function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const [err, setErr] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASS) {
      onLogin()
    } else {
      setErr(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-ocean-deep rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-ocean-deep">관리자 로그인</h1>
          <p className="text-gray-400 text-sm mt-1">파트너스인 하나 관리 시스템</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={pw}
              onChange={e => { setPw(e.target.value); setErr(false) }}
              placeholder="관리자 비밀번호"
              className={`input-field pr-10 ${err ? 'border-red-500' : ''}`}
            />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {err && <p className="text-red-500 text-sm">비밀번호가 올바르지 않습니다.</p>}
          <button type="submit" className="w-full btn-primary py-3">로그인</button>
        </form>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('submissions')
  const [submissions, setSubmissions] = useState([])
  const [partners, setPartners] = useState([])
  const [qaItems, setQaItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [showQaForm, setShowQaForm] = useState(false)
  const [editingQa, setEditingQa] = useState(null)
  const [stats, setStats] = useState({})
  const [emailSettings, setEmailSettings] = useState({ host: '', port: 587, user: '', pass: '', to: '' })
  const [settingsSaved, setSettingsSaved] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [subRes, partRes, statsRes, settingsRes] = await Promise.all([
        fetch(BACKEND_URL + '/api/admin/submissions', { headers: { 'x-admin-key': ADMIN_PASS } }),
        fetch(BACKEND_URL + '/api/admin/partners', { headers: { 'x-admin-key': ADMIN_PASS } }),
        fetch(BACKEND_URL + '/api/admin/stats', { headers: { 'x-admin-key': ADMIN_PASS } }),
        fetch(BACKEND_URL + '/api/admin/email-settings', { headers: { 'x-admin-key': ADMIN_PASS } }),
      ])

      if (subRes.ok) setSubmissions(await subRes.json())
      if (partRes.ok) setPartners(await partRes.json())
      if (statsRes.ok) setStats(await statsRes.json())
      if (settingsRes.ok) {
        const s = await settingsRes.json()
        setEmailSettings(s)
      }
    } catch {
      // Fallback to localStorage
      const localSubs = JSON.parse(localStorage.getItem('hanain_submissions') || '[]')
      const localParts = JSON.parse(localStorage.getItem('hanain_partner_applications') || '[]')
      setSubmissions(localSubs)
      setPartners(localParts)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn) fetchData()
  }, [isLoggedIn])

  const downloadCSV = (data, filename) => {
    if (data.length === 0) return
    const keys = Object.keys(data[0])
    const csv = [keys.join(','), ...data.map(r => keys.map(k => `"${(r[k] || '').toString().replace(/"/g, '""')}"`).join(','))].join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = filename
    a.click()
  }

  const saveEmailSettings = async () => {
    try {
      await fetch(BACKEND_URL + '/api/admin/email-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_PASS },
        body: JSON.stringify(emailSettings),
      })
      setSettingsSaved(true)
      setTimeout(() => setSettingsSaved(false), 3000)
    } catch {
      setSettingsSaved(true)
      setTimeout(() => setSettingsSaved(false), 3000)
    }
  }

  const deleteSubmission = async (id) => {
    if (!confirm('삭제하시겠습니까?')) return
    try {
      await fetch(BACKEND_URL + '/api/admin/submissions/' + id, {
        method: 'DELETE',
        headers: { 'x-admin-key': ADMIN_PASS }
      })
      setSubmissions(prev => prev.filter(s => s.id !== id))
    } catch {
      setSubmissions(prev => prev.filter(s => s.id !== id))
    }
  }

  const filteredSubmissions = submissions.filter(s =>
    !search || s.name?.includes(search) || s.email?.includes(search) || s.phone?.includes(search)
  )

  const filteredPartners = partners.filter(p =>
    !search || p.name?.includes(search) || p.email?.includes(search)
  )

  if (!isLoggedIn) return <LoginScreen onLogin={() => setIsLoggedIn(true)} />

  const tabs = [
    { id: 'submissions', label: '상담 문의', icon: MessageSquare, count: submissions.length },
    { id: 'partners', label: '파트너 신청', icon: Users, count: partners.length },
    { id: 'stats', label: '통계', icon: BookOpen },
    { id: 'settings', label: '이메일 설정', icon: Settings },
  ]

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-ocean-deep text-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">관리자 대시보드</h1>
            <p className="text-gray-400 text-sm mt-0.5">파트너스인 하나 운영 관리</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchData} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              새로고침
            </button>
            <button onClick={() => setIsLoggedIn(false)} className="text-gray-400 hover:text-white text-sm">로그아웃</button>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: '총 상담 문의', value: submissions.length, color: 'text-cyan-hana' },
            { label: '파트너 신청', value: partners.length, color: 'text-gold-hana' },
            { label: '뉴스레터 구독', value: submissions.filter(s => s.formType === 'newsletter').length, color: 'text-purple-500' },
            { label: '오늘 신규', value: [...submissions, ...partners].filter(s => {
              const d = new Date(s.timestamp || s.created_at)
              const today = new Date()
              return d.toDateString() === today.toDateString()
            }).length, color: 'text-green-500' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-2xl shadow-sm p-5">
              <div className={`text-3xl font-bold ${item.color}`}>{item.value}</div>
              <div className="text-sm text-gray-500 mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm mb-6 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-ocean-deep text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Submissions tab */}
        {activeTab === 'submissions' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="이름, 이메일 검색..." className="input-field pl-9 py-2 text-sm" />
              </div>
              <button
                onClick={() => downloadCSV(filteredSubmissions, '상담문의_' + new Date().toLocaleDateString() + '.csv')}
                className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" /> CSV 다운로드
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">이름</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">연락처</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">이메일</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">카테고리</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">유형</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">날짜</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.length === 0 ? (
                    <tr><td colSpan={7} className="p-12 text-center text-gray-400">데이터가 없습니다</td></tr>
                  ) : (
                    filteredSubmissions.map((s, i) => (
                      <tr key={s.id || i} className="border-t hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-700">{s.name}</td>
                        <td className="p-4 text-gray-500 text-sm">{s.phone}</td>
                        <td className="p-4 text-gray-500 text-sm">
                          <a href={`mailto:${s.email}`} className="hover:text-cyan-hana">{s.email}</a>
                        </td>
                        <td className="p-4 text-gray-500 text-sm">{s.category}</td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${s.formType === 'newsletter' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                            {s.formType === 'newsletter' ? '뉴스레터' : '상담'}
                          </span>
                        </td>
                        <td className="p-4 text-gray-400 text-xs">{new Date(s.timestamp || s.created_at).toLocaleDateString('ko-KR')}</td>
                        <td className="p-4">
                          <button onClick={() => deleteSubmission(s.id || i)} className="text-gray-300 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Partners tab */}
        {activeTab === 'partners' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="이름, 이메일 검색..." className="input-field pl-9 py-2 text-sm" />
              </div>
              <button
                onClick={() => downloadCSV(filteredPartners, '파트너신청_' + new Date().toLocaleDateString() + '.csv')}
                className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" /> CSV 다운로드
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">이름</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">연락처</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">이메일</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">직업</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">신청일</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPartners.length === 0 ? (
                    <tr><td colSpan={5} className="p-12 text-center text-gray-400">데이터가 없습니다</td></tr>
                  ) : (
                    filteredPartners.map((p, i) => (
                      <tr key={p.id || i} className="border-t hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-700">{p.name}</td>
                        <td className="p-4 text-gray-500 text-sm">{p.phone}</td>
                        <td className="p-4 text-gray-500 text-sm">
                          <a href={`mailto:${p.email}`} className="hover:text-cyan-hana">{p.email}</a>
                        </td>
                        <td className="p-4 text-gray-500 text-sm">{p.job}</td>
                        <td className="p-4 text-gray-400 text-xs">{new Date(p.timestamp || p.created_at).toLocaleDateString('ko-KR')}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats tab */}
        {activeTab === 'stats' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-ocean-deep mb-4">카테고리별 문의</h3>
              <div className="space-y-3">
                {Object.entries(
                  submissions.reduce((acc, s) => {
                    acc[s.category || '미지정'] = (acc[s.category || '미지정'] || 0) + 1
                    return acc
                  }, {})
                ).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([cat, count]) => (
                  <div key={cat} className="flex items-center gap-3">
                    <div className="flex-1 text-sm text-gray-600 truncate">{cat}</div>
                    <div className="w-24 h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-cyan-hana rounded-full" style={{ width: `${(count / submissions.length) * 100}%` }} />
                    </div>
                    <div className="text-xs text-gray-400 w-6 text-right">{count}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-ocean-deep mb-4">월별 신청 현황</h3>
              <div className="space-y-3">
                {Array.from({ length: 6 }, (_, i) => {
                  const d = new Date()
                  d.setMonth(d.getMonth() - (5 - i))
                  const month = d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })
                  const count = [...submissions, ...partners].filter(s => {
                    const sd = new Date(s.timestamp || s.created_at)
                    return sd.getFullYear() === d.getFullYear() && sd.getMonth() === d.getMonth()
                  }).length
                  return { month, count }
                }).map(item => (
                  <div key={item.month} className="flex items-center gap-3">
                    <div className="text-sm text-gray-600 w-24">{item.month}</div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-gold-hana rounded-full" style={{ width: `${Math.min(100, (item.count / 10) * 100)}%` }} />
                    </div>
                    <div className="text-xs text-gray-400 w-6 text-right">{item.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Email Settings tab */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
              <div>
                <h3 className="font-bold text-ocean-deep text-lg mb-1">이메일 알림 설정</h3>
                <p className="text-sm text-gray-500">상담 신청, 파트너 신청 시 자동으로 이메일 알림을 받을 수 있습니다.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">SMTP 호스트</label>
                  <input
                    value={emailSettings.host}
                    onChange={e => setEmailSettings(p => ({ ...p, host: e.target.value }))}
                    className="input-field"
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">SMTP 포트</label>
                  <input
                    type="number"
                    value={emailSettings.port}
                    onChange={e => setEmailSettings(p => ({ ...p, port: parseInt(e.target.value) }))}
                    className="input-field"
                    placeholder="587"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">발신 이메일</label>
                  <input
                    value={emailSettings.user}
                    onChange={e => setEmailSettings(p => ({ ...p, user: e.target.value }))}
                    className="input-field"
                    placeholder="your@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">앱 비밀번호</label>
                  <input
                    type="password"
                    value={emailSettings.pass}
                    onChange={e => setEmailSettings(p => ({ ...p, pass: e.target.value }))}
                    className="input-field"
                    placeholder="앱 비밀번호 (Gmail)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">알림 수신 이메일</label>
                <input
                  value={emailSettings.to}
                  onChange={e => setEmailSettings(p => ({ ...p, to: e.target.value }))}
                  className="input-field"
                  placeholder="admin@hanain.co.kr (알림 받을 이메일)"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
                <strong>Gmail 사용 시:</strong> Google 계정 → 보안 → 2단계 인증 활성화 후 앱 비밀번호 생성하여 사용하세요.
              </div>

              <button
                onClick={saveEmailSettings}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  settingsSaved ? 'bg-green-500 text-white' : 'btn-primary'
                }`}
              >
                {settingsSaved ? (
                  <><span>✓</span> 저장되었습니다!</>
                ) : (
                  <><Save className="w-4 h-4" /> 설정 저장</>
                )}
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 mt-4 space-y-4">
              <h3 className="font-bold text-ocean-deep">Q&A 데이터 관리</h3>
              <p className="text-sm text-gray-500">Q&A를 추가/수정하려면 아래 GitHub 링크에서 직접 편집하거나, JSON 형식으로 업로드하세요.</p>
              <div className="bg-gray-50 rounded-xl p-4 text-sm font-mono text-gray-600">
                GitHub 저장소: hyungunho00-creator/hanain<br />
                파일 경로: src/data/qa.json
              </div>
              <a
                href="https://github.com/hyungunho00-creator/hanain"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
              >
                GitHub에서 편집하기
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
