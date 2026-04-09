import { FiBell, FiEdit2, FiShare2 } from 'react-icons/fi'

export default function Header({ onSubscribeClick, onShareClick, onEditClick }) {
  return (
    <header className="flex items-center justify-between gap-3 p-4 sm:p-5">
      {/* Edit Button */}
      <button
        onClick={onEditClick}
        aria-label="Edit profile"
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/80 shadow-[0_16px_30px_rgba(0,0,0,0.16)] transition-all hover:-translate-y-0.5 hover:bg-white/[0.12] hover:text-white"
      >
        <FiEdit2 size={18} />
      </button>

      {/* Subscribe Button */}
      <button
        onClick={onSubscribeClick}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.28em] text-white shadow-[0_16px_30px_rgba(0,0,0,0.16)] transition-all hover:-translate-y-0.5 hover:bg-white/[0.12]"
      >
        <span>🔔</span>
        <span>Subscribe</span>
      </button>

      {/* Share Button */}
      <button
        onClick={onShareClick}
        aria-label="Share profile"
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/80 shadow-[0_16px_30px_rgba(0,0,0,0.16)] transition-all hover:-translate-y-0.5 hover:bg-white/[0.12] hover:text-white"
      >
        <FiShare2 size={18} />
      </button>
    </header>
  )
}
