import LinkTile from './LinkTile'

export default function LinksPanel({ links }) {
  return (
    <section className="mx-auto w-full max-w-[560px] px-1 pb-2">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-50/45">
            Featured
          </p>
          <h2 className="mt-1 font-display text-2xl text-white">
            Explore the collection
          </h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
          {links.length} live
        </span>
      </div>

      {links.length > 0 ? (
        <div className="space-y-4">
          {links.map((link) => (
            <LinkTile
              key={link.id}
              title={link.title}
              subtitle={link.subtitle}
              icon={link.icon}
              url={link.url}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-dashed border-white/15 bg-[#071511]/75 px-5 py-10 text-center text-sm text-white/55">
          Add links from the editor to start filling out this page.
        </div>
      )}
    </section>
  )
}
