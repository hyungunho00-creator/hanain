export default function CategoryEvidenceGrid({ items = [] as Array<{ title: string, body: string }> }) {
  return (
    <section className="grid gap-3 md:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className="rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">{item.body}</p>
        </article>
      ))}
    </section>
  )
}

