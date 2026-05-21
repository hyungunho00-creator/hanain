// ───────────────────────────────────────────────────────────────
// hanain/src/pages/QATagPage.jsx
// Q&A 태그별 필터 페이지 — /qa/tag/:tag
//
// 목적:
//   - 122개 빈도 ≥5 태그를 각각 SEO 자산화 (헌법 제10조 의무 4)
//   - 각 태그는 자체 SEO 메타 + FAQPage JSON-LD
//   - 단순 카드 리스트 → 개별 페이지(/q/:slug)로 이동
//
// 헌법 참조:
//   - AI_BLOG_SEO_CONSTITUTION.md 제10조
//   - PARTNER_URL_POLICY.md (파트너 ref 전파)
//   - DO_NOT_TOUCH.md §3-Q (라우팅·슬러그 변경 금지)
// ───────────────────────────────────────────────────────────────
import { useEffect, useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronRight, ArrowLeft, Eye, Heart, Tag as TagIcon, BookOpen } from 'lucide-react'
import SEOHead from '../components/common/SEOHead'
import { usePartner } from '../context/PartnerContext'
import { withRef } from '../lib/partnerRef'

const FAQ_JSONLD_MAX_PER_PAGE = 10

// 슬러그 규칙 (DO_NOT_TOUCH §3-Q — 변경 금지)
function qaSlug(question) {
  return (question || '')
    .replace(/[^\w\s가-힣]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

function stripHtml(s) {
  return typeof s === 'string'
    ? s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    : ''
}

// 카테고리 라벨 (QAPage와 동일)
const CAT_NAMES = {
  metabolism: '대사질환',
  cancer_immune: '항암·면역',
  digestive: '소화·간',
  cardiovascular: '심혈관',
  neuro_cognitive: '뇌·인지',
  mental_health: '정신건강',
  musculoskeletal: '근골격',
  skin_hair: '피부·모발',
  skin: '피부',
  hair: '모발',
  respiratory: '호흡기',
  infection_inflammation: '감염·염증',
  womens_health: '여성건강',
  mens_health: '남성건강',
}

export default function QATagPage() {
  const { tag: tagParam } = useParams()
  const navigate = useNavigate()
  const partner = usePartner()
  const decodedTag = (() => {
    try {
      return decodeURIComponent(tagParam || '')
    } catch {
      return tagParam || ''
    }
  })()

  const [qaData, setQaData] = useState(null)
  const [tagIndex, setTagIndex] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([
      fetch('/qa.json').then(r => r.json()),
      fetch('/tagIndex.json').then(r => r.json()).catch(() => null),
    ])
      .then(([qa, tags]) => {
        if (cancelled) return
        setQaData(qa)
        setTagIndex(tags)
        setLoading(false)
      })
      .catch(e => {
        if (cancelled) return
        setError(e?.message || 'load error')
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  // 태그 매칭 Q&A 추출 (views 내림차순)
  const { matchedQuestions, tagMeta } = useMemo(() => {
    if (!qaData) return { matchedQuestions: [], tagMeta: null }
    const all = qaData.questions || []
    const matched = all.filter(q => (q.tags || []).map(t => t.trim()).includes(decodedTag))
    matched.sort((a, b) => (b.views || b.view_count || 0) - (a.views || a.view_count || 0))
    const meta = tagIndex?.tags?.[decodedTag] || null
    return { matchedQuestions: matched, tagMeta: meta }
  }, [qaData, tagIndex, decodedTag])

  // SEO + JSON-LD 계산 (헌법 제10조 의무 7 — description 120~158자, 롱테일 키워드 노출)
  const pageUrl = `https://phlorotannin.com/qa/tag/${encodeURIComponent(decodedTag)}`

  // 1글자 태그(폐/암/장/뇌/위/뼈/간)는 키워드 카니발리제이션 위험 → 브랜드+질환 조합으로 차별화
  const isShortTag = decodedTag.length === 1
  const tagDisplay = isShortTag ? `${decodedTag} 건강` : decodedTag

  const seoTitle = isShortTag
    ? `${decodedTag} 건강정보 Q&A ${matchedQuestions.length}개 | 플로로탄닌·감태추출물·해양 폴리페놀 아카이브`
    : `${decodedTag} 건강 Q&A ${matchedQuestions.length}개 | 플로로탄닌·감태추출물 정보`

  // description 풍성화 — 상위 태그 3개를 미리보기 키워드로 노출 → CTR 향상 + 롱테일 매칭
  const previewTags = (() => {
    if (matchedQuestions.length === 0) return []
    const cnt = new Map()
    for (const q of matchedQuestions.slice(0, 30)) {
      for (const t of (q.tags || [])) {
        const tt = (t || '').trim()
        if (!tt || tt === decodedTag) continue
        cnt.set(tt, (cnt.get(tt) || 0) + 1)
      }
    }
    return [...cnt.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([t]) => t)
  })()
  const previewSuffix = previewTags.length > 0
    ? ` 주요 주제: ${previewTags.map(t => `#${t}`).join(' ')}.`
    : ''

  // "폐 건강 + 건강정보" 같은 단어 중첩 방지 — 1글자 태그는 tagDisplay에 "건강" 이미 포함됨
  const ariaTag = isShortTag ? decodedTag : tagDisplay  // 두 번째 자리는 원어로
  const seoDesc = matchedQuestions.length > 0
    ? `${tagDisplay} 관련 ${matchedQuestions.length}개 연구기반 Q&A 모음. 플로로탄닌(phlorotannin)·감태추출물(Ecklonia cava)·해양 폴리페놀 관점에서 정리한 ${ariaTag} 아카이브.${previewSuffix} 임상 근거 기반 건강 Q&A 종합 데이터센터.`
    : `${tagDisplay} 관련 Q&A를 준비 중입니다. 플로로탄닌·감태추출물 종합 건강정보 데이터센터.`

  const faqJsonLd = (() => {
    if (matchedQuestions.length === 0) return null
    const items = matchedQuestions.slice(0, FAQ_JSONLD_MAX_PER_PAGE).map(q => {
      const ans = typeof q.answer === 'string'
        ? stripHtml(q.answer)
        : stripHtml(Object.values(q.answer || {}).join(' '))
      const slug = qaSlug(q.question)
      return {
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": ans.slice(0, 500),
          ...(slug ? { "url": `https://phlorotannin.com/q/${slug}` } : {}),
        }
      }
    })
    return [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${pageUrl}#faqpage`,
        "url": pageUrl,
        "name": `${decodedTag} 건강 Q&A`,
        "description": seoDesc,
        "inLanguage": "ko-KR",
        "mainEntity": items,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://phlorotannin.com/" },
          { "@type": "ListItem", "position": 2, "name": "건강 Q&A", "item": "https://phlorotannin.com/qa" },
          { "@type": "ListItem", "position": 3, "name": `#${decodedTag}`, "item": pageUrl },
        ]
      }
    ]
  })()

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 text-sm">로딩 중...</div>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        keywords={`${decodedTag}, ${decodedTag} Q&A, ${decodedTag} 건강정보, 플로로탄닌, 감태추출물, 해양 폴리페놀, 연구기반 Q&A`}
        canonical={pageUrl}
        ogType="website"
        jsonLd={faqJsonLd}
      />

      <div className="pt-16 min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-ocean-gradient py-10">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
              <button onClick={() => navigate(-1)} className="p-1 rounded hover:bg-white/10 transition" aria-label="뒤로">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <Link to={withRef('/qa', partner)} className="hover:text-white transition">건강 Q&A</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-200">#{decodedTag}</span>
            </div>
            <div className="flex items-center gap-3 text-white mb-3">
              <TagIcon className="w-6 h-6 text-cyan-hana" />
              <span className="text-cyan-hana font-medium">태그 모음</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              #{decodedTag}
            </h1>
            <p className="text-gray-300 text-base md:text-lg">
              {matchedQuestions.length > 0
                ? <>{decodedTag} 관련 <strong className="text-white">{matchedQuestions.length}개</strong> 연구기반 Q&A</>
                : `${decodedTag} 관련 Q&A를 찾을 수 없습니다`}
            </p>
          </div>
        </div>

        {/* 본문 */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
              데이터를 불러오는 중 문제가 발생했습니다: {error}
            </div>
          )}

          {matchedQuestions.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl px-6 py-12 text-center">
              <p className="text-gray-600 mb-4">이 태그의 Q&A가 아직 없습니다.</p>
              <Link
                to={withRef('/qa', partner)}
                className="inline-flex items-center gap-1 text-cyan-hana hover:underline text-sm font-medium"
              >
                전체 Q&A 보기 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              {/* Q&A 카드 리스트 */}
              <div className="space-y-3">
                {matchedQuestions.map(q => {
                  const slug = qaSlug(q.question)
                  const catName = CAT_NAMES[q.category] || q.category || ''
                  const views = q.views || q.view_count || 0
                  const likes = q.likes || q.like_count || 0
                  return (
                    <Link
                      key={q.id}
                      to={withRef(`/q/${slug}`, partner)}
                      className="block bg-white border border-gray-200 hover:border-cyan-hana rounded-xl px-5 py-4 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs">
                            {catName && (
                              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                {catName}
                              </span>
                            )}
                            {(q.tags || []).filter(t => t !== decodedTag).slice(0, 2).map(t => (
                              <span key={t} className="text-gray-400">#{t}</span>
                            ))}
                          </div>
                          <h3 className="font-semibold text-ocean-deep text-base md:text-lg leading-snug">
                            {q.question}
                          </h3>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{views.toLocaleString()}</span>
                            <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{likes}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0 mt-1" />
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* 관련 태그 */}
              {tagIndex?.tags && (
                <RelatedTags
                  currentTag={decodedTag}
                  matchedQuestions={matchedQuestions}
                  tagIndex={tagIndex}
                  partner={partner}
                />
              )}
            </>
          )}

          {/* 하단 네비 */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <Link
              to={withRef('/qa', partner)}
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-cyan-hana transition-colors"
            >
              <BookOpen className="w-4 h-4" /> 전체 Q&A 라이브러리로
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── 관련 태그 (현재 태그 Q&A에 공동 출현하는 상위 태그) ───
function RelatedTags({ currentTag, matchedQuestions, tagIndex, partner }) {
  const related = useMemo(() => {
    const cnt = new Map()
    for (const q of matchedQuestions) {
      for (const t of (q.tags || [])) {
        const tt = (t || '').trim()
        if (!tt || tt === currentTag) continue
        // ≥5건 임계값 통과한 태그만 (헌법 상수)
        if (!tagIndex?.tags?.[tt]) continue
        cnt.set(tt, (cnt.get(tt) || 0) + 1)
      }
    }
    return [...cnt.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([t]) => t)
  }, [currentTag, matchedQuestions, tagIndex])

  if (related.length === 0) return null

  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-xl px-5 py-4">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
        관련 태그
      </div>
      <div className="flex flex-wrap gap-2">
        {related.map(t => (
          <Link
            key={t}
            to={withRef(`/qa/tag/${encodeURIComponent(t)}`, partner)}
            className="text-sm text-gray-600 bg-gray-50 hover:bg-cyan-hana hover:text-white border border-gray-200 hover:border-cyan-hana px-3 py-1.5 rounded-full transition-colors"
          >
            #{t}
          </Link>
        ))}
      </div>
    </div>
  )
}
