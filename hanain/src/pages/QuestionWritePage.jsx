import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, AlertCircle, CheckCircle2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import SEOHead from '../components/common/SEOHead'

const CATEGORIES = [
  { id: 'metabolism',            name: '대사질환',    color: '#3B82F6' },
  { id: 'cancer_immune',         name: '항암/면역',   color: '#8B5CF6' },
  { id: 'digestive',             name: '소화/간',     color: '#10B981' },
  { id: 'cardiovascular',        name: '심혈관',      color: '#EF4444' },
  { id: 'neuro_cognitive',       name: '뇌/인지',     color: '#6366F1' },
  { id: 'mental_health',         name: '정신건강',    color: '#F59E0B' },
  { id: 'musculoskeletal',       name: '근골격',      color: '#F97316' },
  { id: 'skin_hair',             name: '피부/모발',   color: '#EC4899' },
  { id: 'respiratory',           name: '호흡기',      color: '#06B6D4' },
  { id: 'infection_inflammation',name: '감염/염증',   color: '#DC2626' },
  { id: 'womens_health',         name: '여성건강',    color: '#F472B6' },
  { id: 'mens_health',           name: '남성건강',    color: '#3B82F6' },
]

export default function QuestionWritePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    guestName: '',
    guestContact: '',
    categoryId: '',
    title: '',
    content: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  function set(key, val) { setForm(f => ({ ...f, [key]: val })) }

  function validate() {
    const e = {}
    if (!form.title.trim()) e.title = '질문 내용을 입력해주세요.'
    else if (form.title.trim().length < 5) e.title = '5자 이상 입력해주세요.'
    if (!form.categoryId) e.categoryId = '카테고리를 선택해주세요.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    const slug = 'q-' + Date.now()

    const { error } = await supabase.from('user_questions').insert({
      guest_name:    form.guestName.trim() || '익명',
      guest_contact: form.guestContact.trim() || null,
      category_id:   form.categoryId,
      title:         form.title.trim(),
      content:       form.content.trim() || null,
      slug,
      status:        'pending',   // pending → answered
    })

    setSubmitting(false)

    if (error) {
      setErrors({ submit: '오류가 발생했습니다. 다시 시도해주세요.' })
      return
    }

    setDone(true)
  }

  // ── 완료 화면 ──
  if (done) {
    return (
      <div className="pt-16 min-h-screen bg-gray-hana flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
          <CheckCircle2 className="w-16 h-16 text-teal-500 mx-auto mb-5" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">질문이 접수됐어요!</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-8">
            빠른 시일 내에 답변 드리겠습니다.<br />
            연락처를 남기셨다면 개별 연락드립니다.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setDone(false); setForm({ guestName:'', guestContact:'', categoryId:'', title:'', content:'' }) }}
              className="w-full py-3.5 rounded-xl bg-teal-500 text-white font-bold text-base hover:bg-teal-600 transition"
            >
              추가 질문하기
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-base hover:bg-gray-50 transition"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title="건강 질문하기 | 플로로탄닌"
        description="건강 궁금증을 편하게 질문하세요. 회원가입 없이 바로 작성 가능합니다."
        canonical="https://phlorotannin.com/question/write"
        noindex
      />
      <div className="pt-16 min-h-screen bg-gray-hana">
        {/* 헤더 */}
        <div className="bg-ocean-deep text-white py-5 px-4">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-white/10 transition text-gray-300">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">건강 질문하기</h1>
              <p className="text-gray-400 text-sm">회원가입 없이 바로 질문하세요</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* 이름 + 연락처 */}
            <div className="bg-white rounded-2xl border border-border-hana p-5 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  이름 <span className="text-gray-400 font-normal">(선택)</span>
                </label>
                <input
                  type="text"
                  value={form.guestName}
                  onChange={e => set('guestName', e.target.value)}
                  placeholder="홍길동 (입력 안 해도 됩니다)"
                  maxLength={20}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  연락처 <span className="text-gray-400 font-normal">(선택 — 답변 연락 희망 시)</span>
                </label>
                <input
                  type="text"
                  value={form.guestContact}
                  onChange={e => set('guestContact', e.target.value)}
                  placeholder="010-0000-0000 또는 이메일"
                  maxLength={50}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />
              </div>
            </div>

            {/* 카테고리 */}
            <div className="bg-white rounded-2xl border border-border-hana p-5">
              <p className="text-sm font-bold text-gray-700 mb-3">
                관련 분야 <span className="text-red-500">*</span>
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => set('categoryId', cat.id)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                      form.categoryId === cat.id
                        ? 'text-white border-transparent shadow'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                    style={form.categoryId === cat.id ? { backgroundColor: cat.color } : {}}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
              {errors.categoryId && <p className="text-red-500 text-xs mt-2">{errors.categoryId}</p>}
            </div>

            {/* 질문 */}
            <div className="bg-white rounded-2xl border border-border-hana p-5">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                질문 내용 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={e => set('title', e.target.value)}
                placeholder="예) 플로로탄닌이 당뇨에 도움이 되나요?"
                maxLength={100}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-400 transition mb-3"
              />
              <div className="flex justify-end">
                <span className="text-xs text-gray-400">{form.title.length}/100</span>
              </div>
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}

              <label className="block text-sm font-bold text-gray-700 mb-2 mt-3">
                상세 내용 <span className="text-gray-400 font-normal">(선택)</span>
              </label>
              <textarea
                value={form.content}
                onChange={e => set('content', e.target.value)}
                placeholder="증상, 복용 약, 경과 기간 등 추가 정보를 적어주시면 더 정확한 답변을 드릴 수 있어요."
                rows={5}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none"
              />
            </div>

            {/* 안내 */}
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 text-xs text-teal-700">
              <p className="font-semibold mb-1">📋 안내</p>
              <ul className="space-y-0.5 text-teal-600">
                <li>• 입력하신 정보는 답변 목적으로만 사용됩니다.</li>
                <li>• 건강 정보는 참고용이며 의료 진단을 대체하지 않습니다.</li>
                <li>• 긴급한 상황은 즉시 119 또는 병원을 이용하세요.</li>
              </ul>
            </div>

            {errors.submit && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />{errors.submit}
              </div>
            )}

            <div className="flex gap-3 pb-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition text-base"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3.5 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-600 transition flex items-center justify-center gap-2 text-base shadow-lg disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                {submitting ? '등록 중...' : '질문 등록'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
