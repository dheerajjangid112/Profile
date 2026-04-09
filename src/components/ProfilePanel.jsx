export default function ProfilePanel({ username, avatar, linkCount }) {
  const handle = username.startsWith('@') ? username : `@${username}`

  return (
    <section className="mb-8 mt-4 text-center sm:mt-6">
      <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-50/70">
        <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(142,240,200,0.9)]" />
        <span>Live profile hub</span>
      </div>

      <div className="relative mx-auto w-fit">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(142,240,200,0.3)_0%,_rgba(142,240,200,0)_72%)] blur-xl" />
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-white/25 via-white/10 to-cyan-200/20 p-[3px] shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <div className="h-full w-full overflow-hidden rounded-full border border-white/10 bg-[#0b1915]">
            <img
              src={avatar}
              alt={username}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <h1 className="mt-6 font-display text-4xl tracking-[-0.04em] text-white sm:text-[3.2rem]">
        {username}
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
        A single place for social profiles, favorite platforms, and everything worth tapping.
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-white/60">
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">
          {handle}
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">
          {linkCount} curated links
        </span>
      </div>
    </section>
  )
}
