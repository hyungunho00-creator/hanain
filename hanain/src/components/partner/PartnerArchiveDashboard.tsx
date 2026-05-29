import { Link } from 'react-router-dom'
import { usePartner } from '../../context/PartnerContext'
import { withRef } from '../../lib/partnerRef'

type Stats = {
  qaCount?: number
  insightCount?: number
  blogCount?: number
}

export default function PartnerArchiveDashboard({ stats = {} as Stats }) {
  const partner = usePartner()
  const partnerName = partner?.displayName || partner?.name || '파트너'

  return (
    <section className="rounded-2xl border border-teal-100 bg-gradient-to-br from-white to-teal-50 p-5">
      <h2 className="text-lg font-semibold text-gray-900">이 파트너가 공유 중인 아카이브</h2>
      <p className="mt-1 text-sm text-gray-600">{partnerName} 파트너 링크로 이동해도 파트너 정보가 계속 유지됩니다.</p>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <p className="text-gray-500">연결 가능한 건강 Q&A</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{stats.qaCount ?? '-'}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <p className="text-gray-500">연결 가능한 인사이트</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{stats.insightCount ?? '-'}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <p className="text-gray-500">연결 가능한 연구 블로그</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{stats.blogCount ?? '-'}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <p className="text-gray-500">오늘 공유할 추천 자료</p>
          <Link to={withRef('/qa', partner)} className="mt-1 block font-semibold text-teal-700 hover:text-teal-800">건강 Q&A 열기</Link>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <Link to={withRef('/category/cancer-immune', partner)} className="rounded-full border border-gray-200 bg-white px-2.5 py-1">인기 카테고리: 암/면역</Link>
        <Link to={withRef('/category/metabolism', partner)} className="rounded-full border border-gray-200 bg-white px-2.5 py-1">대사 건강</Link>
        <Link to={withRef('/category/cardiovascular', partner)} className="rounded-full border border-gray-200 bg-white px-2.5 py-1">심혈관</Link>
      </div>
    </section>
  )
}

