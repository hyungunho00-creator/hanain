import { useParams, Navigate } from 'react-router-dom'
import InsightLayout from '../components/insight/InsightLayout'
import { getInsight, relatedInsights, INSIGHT_CATEGORIES } from '../data/insights'

export default function InsightPostPage() {
  const { slug } = useParams()
  const post = getInsight(slug)
  if (!post) {
    // 잘못된 slug → 허브로 이동 (404 대신 SEO-friendly)
    return <Navigate to="/insights" replace />
  }
  // 카테고리 라벨 매핑
  const cat = INSIGHT_CATEGORIES.find((c) => c.id === post.category)
  const enriched = { ...post, categoryLabel: cat?.name || post.category }
  const related = relatedInsights(slug, 4).map((r) => ({
    ...r,
    categoryLabel: (INSIGHT_CATEGORIES.find((c) => c.id === r.category) || {}).name || r.category,
  }))
  return <InsightLayout post={enriched} related={related} />
}
