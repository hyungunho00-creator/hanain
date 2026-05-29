import { useParams, Navigate } from 'react-router-dom'
import InsightLayout from '../components/insight/InsightLayout'
import { getInsight, relatedInsights, INSIGHT_CATEGORIES } from '../data/insights'
import { usePartner } from '../context/PartnerContext'
import { withRef } from '../lib/partnerRef'

export default function InsightPostPage() {
  const { slug } = useParams()
  const partner = usePartner()
  const post = getInsight(slug)
  if (!post) {
    return <Navigate to={withRef('/insights', partner)} replace />
  }

  const cat = INSIGHT_CATEGORIES.find((c) => c.id === post.category)
  const enriched = { ...post, categoryLabel: cat?.name || post.category }
  const related = relatedInsights(slug, 4).map((r) => ({
    ...r,
    categoryLabel: (INSIGHT_CATEGORIES.find((c) => c.id === r.category) || {}).name || r.category,
  }))

  return <InsightLayout post={enriched} related={related} />
}
