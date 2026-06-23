// ───────────────────────────────────────────────────────────────
// hanain/src/components/qa/RelatedQA.jsx
// 블로그 글 하단에 "관련 Q&A" 표시 (헌법 제10조 의무 6)
//
// 매칭 룰 (룰베이스, LLM 0 토큰):
//   1) 블로그 글 tags ∩ Q&A tags 교집합 카운트 내림차순
//   2) 동률 시 views 내림차순
//   3) 매칭 0건 → 같은 카테고리 fallback (블로그 category  Q&A category 매핑)
//   4) 최대 N개 (기본 3)
//
// 파트너 ref 전파: 모든 링크 withRef() 거침 (불변 강령 3)
// ───────────────────────────────────────────────────────────────
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, ChevronRight, Eye } from 'lucide-react'
import { usePartner } from '../../context/PartnerContext'
import { withRef } from '../../lib/partnerRef'
import { canonicalQuestionSlug } from '../../lib/qaSlug'
import { shouldEmitQASchema } from '../../lib/qaAnswer'

// 블로그 카테고리 → Q&A 카테고리 매핑 (fallback용)
// 블로그: diabetes, cancer, brain, cardiovascular, inflammation, skin, research, general
// Q&A:    metabolism, cancer_immune, neuro_cognitive, cardiovascular, infection_inflammation, skin/skin_hair, ...
const BLOG_TO_QA_CAT = {
  diabetes:       'metabolism',
  cancer:         'cancer_immune',
  brain:          'neuro_cognitive',
  cardiovascular: 'cardiovascular',
  inflammation:   'infection_inflammation',
  skin:           'skin',
  research:       null,        // 매핑 없음
  general:        null,
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

export default function RelatedQA({ blogTags = [], blogCategory = null, max = 3, title = '관련 Q&A' }) {
  const partner = usePartner()
  const [questions, setQuestions] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('/qa.json')
      .then(r => r.json())
      .then(data => {
        if (cancelled) return
        setQuestions(data.questions || [])
      })
      .catch(() => { if (!cancelled) setQuestions([]) })
    return () => { cancelled = true }
  }, [])

  const related = useMemo(() => {
    if (!questions || questions.length === 0) return []
    const tagSet = new Set(specificTags(blogTags))
    const fallbackCat = blogCategory ? BLOG_TO_QA_CAT[blogCategory] : null

    const scored = []
    for (const q of questions) {
      if (!shouldEmitQASchema(q)) continue
      const qTags = specificTags(q.tags)
      const overlap = qTags.reduce((acc, t) => acc + (tagSet.has(t) ? 1 : 0), 0)
      if (overlap > 0) {
        scored.push({ q, score: overlap, views: q.views || q.view_count || 0 })
      }
    }
    // 매칭 0건 → 같은 Q&A 카테고리 fallback
    if (scored.length === 0 && fallbackCat) {
      for (const q of questions) {
        if (!shouldEmitQASchema(q)) continue
        if (q.category === fallbackCat) {
          scored.push({ q, score: 0, views: q.views || q.view_count || 0 })
        }
      }
    }
    scored.sort((a, b) => (b.score - a.score) || (b.views - a.views))
    return scored.slice(0, max).map(s => s.q)
  }, [questions, blogTags, blogCategory, max])

  if (!questions || related.length === 0) return null

  return (
    <section className="mt-8 bg-white border border-gray-200 rounded-lg p-5 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-4 h-4 text-gray-500" />
        <h3 className="text-base md:text-lg font-bold text-ocean-deep">{title}</h3>
      </div>
      <ul className="space-y-2">
        {related.map(q => {
          const slug = q.slug || canonicalQuestionSlug(q.question)
          const views = q.views || q.view_count || 0
          return (
            <li key={`${q.id || 'qa'}-${slug}`}>
              <Link
                to={withRef(`/q/${slug}`, partner)}
                className="flex items-start justify-between gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm md:text-base text-gray-700 group-hover:text-ocean-deep leading-snug">
                    {q.question}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    {(q.tags || []).slice(0, 3).map(t => (
                      <span key={t}>#{t}</span>
                    ))}
                    {views > 0 && (
                      <span className="flex items-center gap-1 ml-auto">
                        <Eye className="w-3 h-3" />{views.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 flex-shrink-0 mt-1" />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
