export default function QuestionArchiveMap({ nodes = [] as Array<{ title: string, count?: number }> }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-gray-900">건강 Q&A 아카이브 맵</h2>
      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
        {nodes.map((node) => (
          <div key={node.title} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
            <p className="font-medium text-gray-800">{node.title}</p>
            <p className="text-xs text-gray-500">{typeof node.count === 'number' ? `${node.count}개` : '누적 아카이브'}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

