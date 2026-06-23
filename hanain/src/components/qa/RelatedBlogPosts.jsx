// ───────────────────────────────────────────────────────────────
// hanain/src/components/qa/RelatedBlogPosts.jsx
// Q&A 상세 페이지 하단에 "관련 블로그 글" 표시 (헌법 제10조 의무 6)
//
// 매칭 룰 (룰베이스, LLM 0 토큰):
//   1) Q&A tags ∩ blog post tags 교집합 카운트 내림차순
//   2) 동률 시 created_at 내림차순 (최신 우선)
//   3) 매칭 0건 → 같은 Q&A 카테고리 → 매핑된 블로그 카테고리 fallback
//   4) 최대 N개 (기본 3)
//
// 데이터 소스: Supabase posts (status='published') — 빌드 시 fetch
// 파트너 ref 전파: 모든 링크 withRef() 거침
// ───────────────────────────────────────────────────────────────
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ChevronRight, Calendar } from 'lucide-react'
import { usePartner } from '../../context/PartnerContext'
import { withRef } from '../../lib/partnerRef'
import { getPosts } from '../../lib/supabase'

// Q&A 카테고리 → 블로그 카테고리 매핑 (RelatedQA와 역방향)
const QA_TO_BLOG_CAT = {
  metabolism:             'diabetes',
  cancer_immune:          'cancer',
  neuro_cognitive:        'brain',
  cardiovascular:         'cardiovascular',
  infection_inflammation: 'inflammation',
  skin:                   'skin',
  skin_hair:              'skin',
  hair:                   'skin',
  digestive:              null,
  mental_health:          null,
  musculoskeletal:        null,
  respiratory:            null,
  womens_health:          null,
  mens_health:            null,
}

const GENERIC_RELATED_TAGS = new Set([
  '플로로탄닌',
  '감태',
  '감태추출물',
  '항산화',
  '해양폴리페놀',
  '폴리페놀',
  '건강정보',
  '자주묻는질문',
])

function specificTags(tags) {
  return (tags || [])
    .map(t => (t || '').trim())
    .filter(t => t && !GENERIC_RELATED_TAGS.has(t))
}

export default function RelatedBlogPosts({ qaTags = [], qaCategory = null, max = 3, title = '관련 블로그' }) {
  const partner = usePartner()
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    let cancelled = false
    // 전체 published posts 가져오기 (현재 298건 — 메모리 OK)
    getPosts({ limit: 500 })
      .then(res => {
        if (cancelled) return
        const list = Array.isArray(res) ? res : (res?.data || [])
        setPosts(list || [])
      })
      .catch(() => { if (!cancelled) setPosts([]) })
    return () => { cancelled = true }
  }, [])

  const related = useMemo(() => {
    if (!posts || posts.length === 0) return []
    const tagSet = new Set(specificTags(qaTags))
    const fallbackCat = qaCategory ? QA_TO_BLOG_CAT[qaCategory] : null

    const scored = []
    for (const p of posts) {
      const pTags = specificTags(p.tags)
      const overlap = pTags.reduce((acc, t) => acc + (tagSet.has(t) ? 1 : 0), 0)
      if (overlap > 0) {
        scored.push({ p, score: overlap })
      }
    }
    if (scored.length === 0 && fallbackCat) {
      for (const p of posts) {
        if (p.category === fallbackCat) {
          scored.push({ p, score: 0 })
        }
      }
    }
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      const da = new Date(a.p.created_at || 0).getTime()
      const db = new Date(b.p.created_at || 0).getTime()
      return db - da
    })
    return scored.slice(0, max).map(s => s.p)
  }, [posts, qaTags, qaCategory, max])

  if (!posts || related.length === 0) return null

  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-cyan-hana" />
        <h3 className="text-base md:text-lg font-bold text-ocean-deep">{title}</h3>
      </div>
      <ul className="space-y-2">
        {related.map(p => {
          const date = p.created_at
            ? new Date(p.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
            : ''
          return (
            <li key={p.id || p.slug}>
              <Link
                to={withRef(`/blog/${p.slug}`, partner)}
                className="flex items-start justify-between gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm md:text-base text-gray-700 group-hover:text-ocean-deep leading-snug">
                    {p.title}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    {(p.tags || []).slice(0, 3).map(t => (
                      <span key={t}>#{t}</span>
                    ))}
                    {date && (
                      <span className="flex items-center gap-1 ml-auto">
                        <Calendar className="w-3 h-3" />{date}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-cyan-hana flex-shrink-0 mt-1" />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
