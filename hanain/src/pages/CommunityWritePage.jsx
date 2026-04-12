import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Send, Lock, Globe, AlertCircle } from 'lucide-react'
import { createPost, updatePost, getPost } from '../lib/supabase'
import { COMMUNITY_CATEGORIES } from '../data/communityCategories'
import { useAuth } from '../context/AuthContext'
import SEOHead from '../components/common/SEOHead'

const WRITE_CATEGORIES = COMMUNITY_CATEGORIES.filter(c => c.id !== 'all')

export default function CommunityWritePage() {
  const { postId } = useParams() // 수정 시 사용
  const navigate = useNavigate()
  const { user, isMember, loading: authLoading } = useAuth()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('free')
  const [isPublic, setIsPublic] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  // 수정 모드: 기존 게시글 로드
  useEffect(() => {
    if (postId) {
      setIsEdit(true)
      getPost(postId).then(({ data, error }) => {
        if (data && !error) {
          setTitle(data.title)
          setContent(data.content)
          setCategory(data.category)
          setIsPublic(data.is_public)
        }
      })
    }
  }, [postId])

  // 비로그인 리다이렉트
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { replace: true, state: { from: '/community/write' } })
    }
  }, [authLoading, user, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!title.trim()) { setError('제목을 입력해주세요.'); return }
    if (title.trim().length < 2) { setError('제목은 2자 이상 입력해주세요.'); return }
    if (!content.trim()) { setError('내용을 입력해주세요.'); return }
    if (content.trim().length < 10) { setError('내용은 10자 이상 입력해주세요.'); return }

    setSubmitting(true)
    let result
    if (isEdit) {
      result = await updatePost(postId, { title: title.trim(), content: content.trim(), category, is_public: isPublic })
    } else {
      result = await createPost({ title: title.trim(), content: content.trim(), category, is_public: isPublic })
    }

    if (result.error) {
      setError(result.error.message || '저장 중 오류가 발생했습니다.')
      setSubmitting(false)
      return
    }

    navigate(isEdit ? `/community/post/${postId}` : `/community/post/${result.data.id}`, { replace: true })
  }

  if (authLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-hana">
        <div className="text-gray-400">로딩 중...</div>
      </div>
    )
  }

  const selectedCat = WRITE_CATEGORIES.find(c => c.id === category) || WRITE_CATEGORIES[WRITE_CATEGORIES.length - 1]

  return (
    <>
      <SEOHead
        title={`${isEdit ? '게시글 수정' : '글쓰기'} | 플로로탄닌 커뮤니티`}
        description="플로로탄닌 건강 커뮤니티에 글을 작성하세요."
        canonical="https://phlorotannin.com/community/write"
      />

      <div className="pt-16 min-h-screen bg-gray-hana">
        {/* 헤더 */}
        <div className="bg-ocean-deep text-white py-6 px-4">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">{isEdit ? '게시글 수정' : '새 글 작성'}</h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 카테고리 선택 */}
            <div className="bg-white rounded-2xl border border-border-hana p-5">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                게시판 선택 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {WRITE_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                      category === cat.id
                        ? `${cat.color} text-white border-transparent shadow-md`
                        : `bg-white ${cat.textColor} ${cat.borderColor} hover:opacity-80`
                    }`}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 제목 */}
            <div className="bg-white rounded-2xl border border-border-hana p-5">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="제목을 입력하세요 (2~100자)"
                maxLength={100}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-cyan-hana focus:border-transparent transition-all"
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-400">{title.length}/100</span>
              </div>
            </div>

            {/* 내용 */}
            <div className="bg-white rounded-2xl border border-border-hana p-5">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="건강 경험, 질문, 정보를 자유롭게 작성하세요.&#10;&#10;예) 플로로탄닌 복용 후 변화가 느껴진 점, 궁금한 점, 다른 분들과 나누고 싶은 건강 정보..."
                rows={12}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-cyan-hana focus:border-transparent transition-all resize-none leading-relaxed"
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-400">{content.length}자</span>
              </div>
            </div>

            {/* 공개 설정 */}
            <div className="bg-white rounded-2xl border border-border-hana p-5">
              <label className="block text-sm font-bold text-gray-700 mb-3">공개 설정</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsPublic(true)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                    isPublic
                      ? 'bg-cyan-hana text-white border-transparent'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-cyan-hana'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  전체 공개
                </button>
                <button
                  type="button"
                  onClick={() => setIsPublic(false)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                    !isPublic
                      ? 'bg-ocean-deep text-white border-transparent'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-ocean-deep'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  회원 전용
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {isPublic ? '누구나 게시글을 볼 수 있습니다.' : '로그인한 회원만 게시글을 볼 수 있습니다.'}
              </p>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* 작성 규칙 */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700">
              <p className="font-semibold mb-1">✏️ 게시글 작성 안내</p>
              <ul className="space-y-0.5 text-blue-600">
                <li>• 건강 정보는 참고용이며 의료 진단을 대체하지 않습니다.</li>
                <li>• 욕설·광고·비방 게시글은 관리자에 의해 삭제될 수 있습니다.</li>
                <li>• 개인정보(전화번호, 주소 등)는 게시글에 포함하지 마세요.</li>
              </ul>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all text-base"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3.5 rounded-xl bg-cyan-hana text-white font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 text-base shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span>저장 중...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {isEdit ? '수정 완료' : '게시글 등록'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
