export default function ResearchReferenceCards({ references = [] as Array<{ title: string, source?: string }> }) {
  return (
    <section className="grid gap-3 md:grid-cols-2">
      {references.map((ref) => (
        <article key={ref.title} className="rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-gray-900">{ref.title}</h3>
          {ref.source ? <p className="mt-1 text-xs text-gray-500">{ref.source}</p> : null}
        </article>
      ))}
    </section>
  )
}

