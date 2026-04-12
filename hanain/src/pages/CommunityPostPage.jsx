import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, Heart, MessageSquare, Share2, Eye, Edit2, Trash2,
  Send, Copy, Check, AlertCircle, ChevronRight
} from 'lucide-react'
import {
  getPost, getComments, createComment, deleteComment,
  toggleLike, getLikeStatus, incrementViewCount, deletePost, logShare
} from '../lib/supabase'
import { getCategoryById } from '../data/communityCategories'
import { useAuth } from '../context/AuthContext'
import SEOHead from '../components/common/SEOHead'

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000
  if (diff < 60) return '방금 전'
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
  if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`
  return new Date(dateStr).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

function Avatar({ name, size = 'md' }) {
  const sizes = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-11 h-11 text-base' }
  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-cyan-hana to-blue-500 flex items-center justify-center text-white font-bold shrink-0`}>
      {(name || '익').charAt(0)}
    </div>
  )
}

function CommentItem({ comment, currentUserId, onDelete }) {
  const [deleting, setDeleting] = useState(false)
  const authorName = comment.users?.nickname || '익명'
  const isOwn = currentUserId && comment.users?.id === currentUserId

  async function handleDelete() {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return
    setDeleting(true)
    await onDelete(comment.id)
    setDeleting(false)
  }

  return (
    <div className="flex gap-3 py-4 border-b border-gray-100 last:border-0">
      <Avatar name={authorName} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-ocean-deep">{authorName}</span>
          <span className="text-xs text-gray-400">{timeAgo(comment.created_at)}</span>
          {isOwn && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="ml-auto text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              {deleting ? '삭제 중...' : '삭제'}
            </button>
          )}
        </div>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
      </div>
    </div>
  )
}

export default function CommunityPostPage() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const { user, profile, isMember, isSuperAdmin } = useAuth()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [commentText, setCommentText] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)

  // 게시글 로드
  useEffect(() => {
    if (!postId) return
    async function load() {
      setLoading(true)
      const [{ data: postData }, { data: commentsData }, { liked: likedStatus }] = await Promise.all([
        getPost(postId),
        getComments(postId),
        getLikeStatus(postId),
      ])
      if (postData) {
        setPost(postData)
        setLikeCount(postData.like_count || 0)
        incrementViewCount(postId)
      } else {
        setError('게시글을 찾을 수 없습니다.')
      }
      setComments(commentsData || [])
      setLiked(likedStatus)
      setLoading(false)
    }
    load()
  }, [postId])

  const cat = post ? getCategoryById(post.category) : null
  const authorName = post?.users?.nickname || '익명'
  const isAuthor = user && post?.author_id === user.id
  const canEdit = isAuthor || isSuperAdmin

  // 좋아요
  async function handleLike() {
    if (!isMember) { navigate('/login'); return }
    const prev = liked
    setLiked(!liked)
    setLikeCount(c => prev ? c - 1 : c + 1)
    const { liked: newLiked } = await toggleLike(postId)
    setLiked(newLiked)
  }

  // 댓글 작성
  async function handleComment(e) {
    e.preventDefault()
    if (!isMember) { navigate('/login'); return }
    if (!commentText.trim()) return
    setCommentLoading(true)
    const { data, error } = await createComment(postId, commentText.trim())
    if (!error && data) {
      setComments(prev => [...prev, data])
      setCommentText('')
      setPost(prev => prev ? { ...prev, comment_count: (prev.comment_count || 0) + 1 } : prev)
    }
    setCommentLoading(false)
  }

  // 댓글 삭제
  async function handleDeleteComment(commentId) {
    const { error } = await deleteComment(commentId, postId)
    if (!error) {
      setComments(prev => prev.filter(c => c.id !== commentId))
      setPost(prev => prev ? { ...prev, comment_count: Math.max(0, (prev.comment_count || 1) - 1) } : prev)
    }
  }

  // 게시글 삭제
  async function handleDeletePost() {
    if (!window.confirm('게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return
    const { error } = await deletePost(postId)
    if (!error) navigate('/community', { replace: true })
  }

  // 링크 복사
  async function handleCopyLink() {
    const ref = localStorage.getItem('ref_partner')
    const url = `${window.location.origin}/community/post/${postId}${ref ? `?ref=${ref}` : ''}`
    await navigator.clipboard.writeText(url)
    await logShare(postId, 'copy')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    setShareMenuOpen(false)
  }

  // 카카오 공유
  function handleKakaoShare() {
    const ref = localStorage.getItem('ref_partner')
    const url = `${window.location.origin}/community/post/${postId}${ref ? `?ref=${ref}` : ''}`
    if (window.Kakao?.Share) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: post.title,
          description: post.content.slice(0, 80) + (post.content.length > 80 ? '...' : ''),
          imageUrl: 'https://phlorotannin.com/og-image.png',
          link: { mobileWebUrl: url, webUrl: url },
        },
      })
    } else {
      // Kakao SDK 없으면 링크 복사로 대체
      handleCopyLink()
    }
    logShare(postId, 'kakao')
    setShareMenuOpen(false)
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-hana flex items-center justify-center">
        <div className="text-gray-400">로딩 중...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="pt-16 min-h-screen bg-gray-hana flex items-center justify-center flex-col gap-4">
        <div className="text-5xl">😕</div>
        <p className="text-gray-500 text-lg">{error || '게시글을 찾을 수 없습니다.'}</p>
        <Link to="/community" className="text-cyan-hana hover:underline">← 커뮤니티로 돌아가기</Link>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title={`${post.title} | 플로로탄닌 커뮤니티`}
        description={post.content.slice(0, 120).replace(/\n/g, ' ')}
        keywords={`${cat?.label || ''}, 플로로탄닌 커뮤니티, 건강 정보`}
        canonical={`https://phlorotannin.com/community/post/${postId}`}
        ogImage="https://phlorotannin.com/og-image.png"
      />

      <div className="pt-16 min-h-screen bg-gray-hana">
        {/* 헤더 */}
        <div className="bg-ocean-deep text-white py-4 px-4">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <button
              onClick={() => navigate('/community')}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <nav className="flex items-center gap-1 text-sm text-gray-400">
              <Link to="/community" className="hover:text-white transition-colors">커뮤니티</Link>
              <ChevronRight className="w-4 h-4" />
              {cat && (
                <>
                  <span
                    onClick={() => navigate(`/community?category=${cat.id}`)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {cat.emoji} {cat.label}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
              <span className="text-gray-300 truncate max-w-xs">{post.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
          {/* 게시글 본문 */}
          <article className="bg-white rounded-2xl border border-border-hana overflow-hidden">
            {/* 카테고리 + 메타 */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
              {cat && (
                <button
                  onClick={() => navigate(`/community?category=${cat.id}`)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${cat.color} mb-3 inline-block hover:opacity-90 transition`}
                >
                  {cat.emoji} {cat.label}
                </button>
              )}
              <h1 className="text-xl md:text-2xl font-bold text-ocean-deep mb-4 leading-snug">
                {post.title}
              </h1>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                  <Avatar name={authorName} />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{authorName}</p>
                    <p className="text-xs text-gray-400">{timeAgo(post.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {post.view_count || 0}</span>
                  <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> {likeCount}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {post.comment_count || 0}</span>
                  {canEdit && (
                    <div className="flex items-center gap-1 ml-2">
                      <Link
                        to={`/community/edit/${postId}`}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-cyan-hana transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={handleDeletePost}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 본문 내용 */}
            <div className="px-6 py-6">
              <div className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </div>

            {/* 좋아요 / 공유 */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  liked
                    ? 'bg-red-50 text-red-500 border-2 border-red-200'
                    : 'bg-gray-50 text-gray-500 border-2 border-gray-200 hover:border-red-200 hover:text-red-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                좋아요 {likeCount > 0 && likeCount}
              </button>

              {/* 공유 버튼 */}
              <div className="relative">
                <button
                  onClick={() => setShareMenuOpen(v => !v)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gray-50 text-gray-500 border-2 border-gray-200 hover:border-cyan-hana hover:text-cyan-hana transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  공유하기
                </button>
                {shareMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-border-hana py-2 w-44 z-10">
                    <button
                      onClick={handleKakaoShare}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      <span>💬</span> 카카오톡 공유
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      {copied ? '복사됨!' : '링크 복사'}
                    </button>
                  </div>
                )}
              </div>

              <div className="ml-auto text-xs text-gray-400">
                {post.share_count > 0 && `공유 ${post.share_count}회`}
              </div>
            </div>
          </article>

          {/* 댓글 섹션 */}
          <section className="bg-white rounded-2xl border border-border-hana overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-ocean-deep flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-hana" />
                댓글 {comments.length > 0 && <span className="text-cyan-hana">{comments.length}</span>}
              </h2>
            </div>

            {/* 댓글 목록 */}
            <div className="px-6 divide-y divide-gray-100">
              {comments.length === 0 ? (
                <p className="py-8 text-center text-gray-400 text-sm">
                  첫 댓글을 남겨보세요 ✏️
                </p>
              ) : (
                comments.map(comment => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    currentUserId={user?.id}
                    onDelete={handleDeleteComment}
                  />
                ))
              )}
            </div>

            {/* 댓글 작성 */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-hana">
              {isMember ? (
                <form onSubmit={handleComment} className="flex gap-3">
                  <Avatar name={profile?.nickname || user?.email?.[0] || '?'} />
                  <div className="flex-1">
                    <textarea
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      placeholder="댓글을 입력하세요..."
                      rows={2}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-hana focus:border-transparent transition-all resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={commentLoading || !commentText.trim()}
                        className="flex items-center gap-2 bg-cyan-hana text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                        {commentLoading ? '등록 중...' : '댓글 등록'}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm mb-3">댓글은 로그인 후 작성할 수 있습니다.</p>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 bg-ocean-deep text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-opacity-90 transition-all"
                  >
                    로그인하기
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* 목록으로 */}
          <div className="flex justify-center pb-4">
            <Link
              to="/community"
              className="flex items-center gap-2 text-gray-500 hover:text-ocean-deep transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              커뮤니티 목록으로
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
