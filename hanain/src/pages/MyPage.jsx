import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  User, MessageCircle, Bookmark, Bell, LogOut,
  ChevronRight, Eye, Heart, Settings, Tag,
  CheckCircle, AlertCircle, PenSquare, ArrowLeft,
  Mail, Phone, Shield, ToggleLeft, ToggleRight
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import SEOHead from '../components/common/SEOHead'

const INTEREST_CATS = [
  { id: 'metabolism', name: '대사질환', color: '#3B82F6' },
  { id: 'cancer_immune', name: '항암/면역', color: '#8B5CF6' },
  { id: 'digestive', name: '소화/간', color: '#10B981' },
  { id: 'cardiovascular', name: '심혈관', color: '#EF4444' },
  { id: 'neuro_cognitive', name: '뇌/인지', color: '#6366F1' },
  { id: 'mental_health', name: '정신건강', color: '#F59E0B' },
  { id: 'musculoskeletal', name: '근골격', color: '#F97316' },
  { id: 'skin_hair', name: '피부/모발', color: '#EC4899' },
  { id: 'respiratory', name: '호흡기', color: '#06B6D4' },
  { id: 'infection_inflammation', name: '감염/염증', color: '#DC2626' },
  { id: 'womens_health', name: '여성건강', color: '#F472B6' },
  { id: 'mens_health', name: '남성건강', color: '#3B82F6' },
]

const TAB_LIST = [
  { key: 'questions', label: '내 질문', icon: MessageCircle },
  { key: 'saved', label: '저장 목록', icon: Bookmark },
  { key: 'settings', label: '설정', icon: Settings },
]

function TabButton({ tab, active, onClick }) {
  const Icon = tab.icon
  return (
    <button
      onClick={() => onClick(tab.key)}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
        active
          ? 'bg-ocean-deep text-white shadow'
          : 'bg-white text-gray-600 border border-border-hana hover:border-cyan-hana'
      }`}
    >
      <Icon className="w-4 h-4" />
      {tab.label}
    </button>
  )
}

function QuestionCard({ q, onHidden }) {
  const slug = q.slug || q.id
  const catColor = q.categories?.color || '#00B4D8'
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors group">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {q.categories && (
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: catColor }}
              >
                {q.categories.name}
              </span>
            )}
            <span className={`text-xs px-2 py-0.5 rounded-full border ${
              q.visibility === 'private'
                ? 'border-gray-300 text-gray-400'
                : q.visibility === 'anonymous'
                  ? 'border-amber-200 text-amber-600'
                  : 'border-green-200 text-green-600'
            }`}>
              {q.visibility === 'private' ? '비공개' : q.visibility === 'anonymous' ? '익명' : '공개'}
            </span>
            {q.has_official_answer && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> 답변 완료
              </span>
            )}
          </div>
          <Link
            to={`/q/${slug}`}
            className="text-base font-medium text-gray-800 group-hover:text-cyan-hana transition-colors leading-snug line-clamp-2"
          >
            {q.title}
          </Link>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{(q.view_count || 0).toLocaleString()}</span>
            <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{q.like_count || 0}</span>
            {q.created_at && (
              <span>{new Date(q.created_at).toLocaleDateString('ko-KR')}</span>
            )}
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-cyan-hana transition-colors shrink-0 mt-1" />
      </div>
    </div>
  )
}

function SavedCard({ q }) {
  const slug = q.slug || q.id
  const catColor = q.categories?.color || '#00B4D8'
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors group">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            {q.categories && (
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: catColor }}
              >
                {q.categories.name}
              </span>
            )}
          </div>
          <Link
            to={`/q/${slug}`}
            className="text-base font-medium text-gray-800 group-hover:text-cyan-hana transition-colors leading-snug line-clamp-2"
          >
            {q.title}
          </Link>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{(q.view_count || 0).toLocaleString()}</span>
            <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{q.like_count || 0}</span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-cyan-hana transition-colors shrink-0 mt-1" />
      </div>
    </div>
  )
}

export default function MyPage() {
  const navigate = useNavigate()
  const { user, profile, signOut, refreshProfile, loading: authLoading } = useAuth()
  const [tab, setTab] = useState('questions')
  const [myQuestions, setMyQuestions] = useState([])
  const [savedItems, setSavedItems] = useState([])
  const [questionsLoading, setQuestionsLoading] = useState(false)
  const [savedLoading, setSavedLoading] = useState(false)

  // 설정 상태
  const [interests, setInterests] = useState([])
  const [smsOptIn, setSmsOptIn] = useState(false)
  const [emailOptIn, setEmailOptIn] = useState(false)
  const [savingSettings, setSavingSettings] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    if (!authLoading && !user) navigate('/login', { replace: true, state: { from: '/my-page' } })
  }, [authLoading, user, navigate])

  // 프로필 로드 시 설정값 동기화
  useEffect(() => {
    if (profile) {
      setInterests(profile.interest_categories || [])
      setSmsOptIn(!!profile.sms_opt_in)
      setEmailOptIn(!!profile.email_opt_in)
    }
  }, [profile])

  // 내 질문 로드
  useEffect(() => {
    if (!user || tab !== 'questions') return
    setQuestionsLoading(true)
    supabase
      .from('questions')
      .select(`
        id, slug, title, category_id, view_count, like_count,
        visibility, has_official_answer, created_at,
        categories(name, color)
      `)
      .eq('author_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setMyQuestions(data || [])
        setQuestionsLoading(false)
      })
  }, [user, tab])

  // 저장 목록 로드
  useEffect(() => {
    if (!user || tab !== 'saved') return
    setSavedLoading(true)
    supabase
      .from('saved_questions')
      .select(`
        question_id,
        questions(
          id, slug, title, view_count, like_count, created_at,
          categories(name, color)
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setSavedItems((data || []).map(d => d.questions).filter(Boolean))
        setSavedLoading(false)
      })
  }, [user, tab])

  async function handleSaveSettings() {
    if (!user) return
    setSavingSettings(true)
    setSaveMsg('')
    const { error } = await supabase.from('users').upsert({
      id: user.id,
      interest_categories: interests,
      sms_opt_in: smsOptIn,
      email_opt_in: emailOptIn,
    })
    setSavingSettings(false)
    if (error) {
      setSaveMsg('저장 중 오류가 발생했습니다.')
    } else {
      setSaveMsg('저장되었습니다.')
      refreshProfile()
      setTimeout(() => setSaveMsg(''), 3000)
    }
  }

  function toggleInterest(id) {
    setInterests(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  if (authLoading || !user) return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="text-gray-400 animate-pulse">로딩 중...</div>
    </div>
  )

  const displayName = profile?.nickname || user.email?.split('@')[0] || '회원'
  const emailDisplay = user.email || ''
  const roleLabel = { superadmin: '최고 관리자', partner: '파트너', member: '회원' }[profile?.role] || '회원'

  return (
    <>
      <SEOHead
        title="마이페이지 | 플로로탄닌 건강 Q&A"
        description="내 건강 질문, 저장 목록, 알림 설정을 관리합니다."
        canonical="https://phlorotannin.com/my-page"
        noindex
      />
      <div className="pt-16 min-h-screen bg-gray-hana">
        {/* 헤더 */}
        <div className="bg-ocean-deep text-white py-6 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-1">
              <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-white/10 transition text-gray-300">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold">마이페이지</h1>
            </div>
            <div className="flex items-center gap-4 mt-4 ml-10">
              {/* 아바타 */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-hana to-blue-500 flex items-center justify-center shrink-0 shadow">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt={displayName} className="w-14 h-14 rounded-full object-cover" />
                ) : (
                  <User className="w-7 h-7 text-white" />
                )}
              </div>
              <div>
                <p className="font-bold text-lg leading-tight">{displayName}</p>
                <p className="text-gray-400 text-sm">{emailDisplay}</p>
                <span className="mt-1 inline-block text-xs bg-cyan-hana/20 text-cyan-hana px-2 py-0.5 rounded-full">{roleLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 사이드 탭 */}
            <aside className="lg:w-52 shrink-0">
              <div className="flex lg:flex-col gap-2">
                {TAB_LIST.map(t => (
                  <TabButton key={t.key} tab={t} active={tab === t.key} onClick={setTab} />
                ))}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-white text-red-400 border border-border-hana hover:border-red-300 hover:text-red-500 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </button>
              </div>

              {/* 질문하기 CTA */}
              <Link
                to="/question/write"
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-cyan-hana text-white text-sm font-bold hover:bg-opacity-90 transition shadow"
              >
                <PenSquare className="w-4 h-4" />
                질문 작성하기
              </Link>
            </aside>

            {/* 콘텐츠 */}
            <main className="flex-1 min-w-0">
              {/* ── 내 질문 ── */}
              {tab === 'questions' && (
                <div className="bg-white rounded-2xl border border-border-hana overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-bold text-ocean-deep flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-cyan-hana" />
                      내 질문 ({myQuestions.length})
                    </h2>
                    <Link to="/question/write" className="text-sm text-cyan-hana hover:underline flex items-center gap-1">
                      <PenSquare className="w-3.5 h-3.5" /> 새 질문
                    </Link>
                  </div>
                  {questionsLoading ? (
                    <div className="divide-y">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="p-4 animate-pulse flex gap-3">
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-100 rounded w-3/4" />
                            <div className="h-3 bg-gray-50 rounded w-1/3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : myQuestions.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="text-4xl mb-3">💬</div>
                      <p className="text-gray-500 mb-4">아직 등록한 질문이 없습니다.</p>
                      <Link
                        to="/question/write"
                        className="inline-block bg-cyan-hana text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-opacity-90 transition"
                      >
                        첫 질문 등록하기
                      </Link>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-50">
                      {myQuestions.map(q => (
                        <QuestionCard key={q.id} q={q} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── 저장 목록 ── */}
              {tab === 'saved' && (
                <div className="bg-white rounded-2xl border border-border-hana overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-ocean-deep flex items-center gap-2">
                      <Bookmark className="w-5 h-5 text-gold-hana" />
                      저장한 질문 ({savedItems.length})
                    </h2>
                  </div>
                  {savedLoading ? (
                    <div className="divide-y">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="p-4 animate-pulse flex gap-3">
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-100 rounded w-3/4" />
                            <div className="h-3 bg-gray-50 rounded w-1/3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : savedItems.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="text-4xl mb-3">🔖</div>
                      <p className="text-gray-500 mb-4">저장한 질문이 없습니다.</p>
                      <Link to="/qa" className="inline-block bg-ocean-deep text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-opacity-90 transition">
                        건강 Q&A 보러가기
                      </Link>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-50">
                      {savedItems.map(q => (
                        <SavedCard key={q.id} q={q} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── 설정 ── */}
              {tab === 'settings' && (
                <div className="space-y-4">
                  {/* 계정 정보 */}
                  <div className="bg-white rounded-2xl border border-border-hana p-5">
                    <h2 className="font-bold text-ocean-deep mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-cyan-hana" />
                      계정 정보
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400">이메일</p>
                          <p className="text-sm font-medium text-gray-700">{emailDisplay}</p>
                        </div>
                      </div>
                      {profile?.phone && (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                          <div>
                            <p className="text-xs text-gray-400">휴대폰</p>
                            <p className="text-sm font-medium text-gray-700">{profile.phone}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Shield className="w-4 h-4 text-gray-400 shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400">가입 방식</p>
                          <p className="text-sm font-medium text-gray-700">
                            {user.app_metadata?.provider === 'google' ? '구글 소셜 로그인' :
                             user.app_metadata?.provider === 'kakao' ? '카카오 소셜 로그인' : '이메일'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 관심 분야 */}
                  <div className="bg-white rounded-2xl border border-border-hana p-5">
                    <h2 className="font-bold text-ocean-deep mb-1 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-cyan-hana" />
                      관심 건강 분야
                    </h2>
                    <p className="text-xs text-gray-400 mb-4">관심 분야를 설정하면 맞춤 건강 정보를 받을 수 있습니다.</p>
                    <div className="flex flex-wrap gap-2">
                      {INTEREST_CATS.map(c => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => toggleInterest(c.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${
                            interests.includes(c.id)
                              ? 'text-white border-transparent shadow-sm'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                          }`}
                          style={interests.includes(c.id) ? { backgroundColor: c.color } : {}}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 알림 동의 */}
                  <div className="bg-white rounded-2xl border border-border-hana p-5">
                    <h2 className="font-bold text-ocean-deep mb-4 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-cyan-hana" />
                      알림·수신 동의
                    </h2>
                    <div className="space-y-4">
                      {/* SMS */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">문자(SMS) 수신 동의</p>
                          <p className="text-xs text-gray-400 mt-0.5">건강 정보 및 답변 알림 SMS 수신</p>
                        </div>
                        <button
                          onClick={() => setSmsOptIn(v => !v)}
                          className={`ml-3 transition-colors ${smsOptIn ? 'text-cyan-hana' : 'text-gray-300'}`}
                        >
                          {smsOptIn
                            ? <ToggleRight className="w-9 h-9" />
                            : <ToggleLeft className="w-9 h-9" />
                          }
                        </button>
                      </div>
                      {/* Email */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">이메일 수신 동의</p>
                          <p className="text-xs text-gray-400 mt-0.5">건강 뉴스레터 및 답변 알림 이메일 수신</p>
                        </div>
                        <button
                          onClick={() => setEmailOptIn(v => !v)}
                          className={`ml-3 transition-colors ${emailOptIn ? 'text-cyan-hana' : 'text-gray-300'}`}
                        >
                          {emailOptIn
                            ? <ToggleRight className="w-9 h-9" />
                            : <ToggleLeft className="w-9 h-9" />
                          }
                        </button>
                      </div>
                      <p className="text-xs text-gray-400">※ 카카오톡 알림은 제공하지 않습니다. SMS/이메일만 지원합니다.</p>
                    </div>
                  </div>

                  {/* 저장 버튼 */}
                  {saveMsg && (
                    <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm ${
                      saveMsg.includes('오류') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'
                    }`}>
                      {saveMsg.includes('오류')
                        ? <AlertCircle className="w-4 h-4 shrink-0" />
                        : <CheckCircle className="w-4 h-4 shrink-0" />
                      }
                      {saveMsg}
                    </div>
                  )}
                  <button
                    onClick={handleSaveSettings}
                    disabled={savingSettings}
                    className="w-full py-3.5 rounded-xl bg-cyan-hana text-white font-bold hover:bg-opacity-90 transition shadow disabled:opacity-60"
                  >
                    {savingSettings ? '저장 중...' : '설정 저장'}
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
