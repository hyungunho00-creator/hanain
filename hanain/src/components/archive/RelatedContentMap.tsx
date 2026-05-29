import { Link } from 'react-router-dom'
import { withRef } from '../../lib/partnerRef'
import { usePartner } from '../../context/PartnerContext'

export default function RelatedContentMap({ links = [] as Array<{ label: string, to: string }> }) {
  const partner = usePartner()
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-gray-900">관련 콘텐츠 맵</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {links.map((item) => (
          <Link key={`${item.label}-${item.to}`} to={withRef(item.to, partner)} className="rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:border-teal-300 hover:text-teal-800">
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  )
}

