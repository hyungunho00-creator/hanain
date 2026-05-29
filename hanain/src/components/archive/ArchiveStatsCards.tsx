export default function ArchiveStatsCards({ stats = [] as Array<{ label: string, value: string | number }> }) {
  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {stats.map((item) => (
        <article key={item.label} className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">{item.label}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{item.value}</p>
        </article>
      ))}
    </section>
  )
}

