import { FiArrowUpRight, FiInstagram, FiLinkedin } from 'react-icons/fi'
import { SiSpotify, SiSnapchat } from 'react-icons/si'

const iconMap = {
  spotify: SiSpotify,
  snapchat: SiSnapchat,
  linkedin: FiLinkedin,
  instagram: FiInstagram,
}

const cardTheme = {
  spotify: {
    accentLine: 'bg-gradient-to-r from-transparent via-[#1ed760]/70 to-transparent',
    iconBg: 'from-[#1ed760]/35 via-[#1ed760]/18 to-transparent',
    label: 'Music',
  },
  snapchat: {
    accentLine: 'bg-gradient-to-r from-transparent via-[#f8e84f]/70 to-transparent',
    iconBg: 'from-[#f8e84f]/35 via-[#f8e84f]/16 to-transparent',
    label: 'Social',
  },
  linkedin: {
    accentLine: 'bg-gradient-to-r from-transparent via-[#63bcff]/70 to-transparent',
    iconBg: 'from-[#63bcff]/35 via-[#63bcff]/16 to-transparent',
    label: 'Career',
  },
  instagram: {
    accentLine: 'bg-gradient-to-r from-transparent via-[#ff8eb5]/70 to-transparent',
    iconBg: 'from-[#ff8eb5]/35 via-[#ff8eb5]/16 to-transparent',
    label: 'Visual',
  },
}

export default function LinkTile({ title, subtitle, icon, url }) {
  const Icon = iconMap[icon] || FiInstagram
  const theme = cardTheme[icon] || cardTheme.instagram
  const cleanSubtitle = subtitle ? subtitle.replace('Â·', '|') : ''

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-[30px] border border-white/10 bg-[#071512]/82 px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-[#0a1b17]/90"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(142,240,200,0.12),_transparent_45%)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className={`absolute inset-x-8 top-0 h-px ${theme.accentLine}`} />

      <div className="relative flex items-center gap-4">
        <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${theme.iconBg}`}>
          <Icon size={28} className="text-white" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="truncate font-display text-xl tracking-[-0.03em] text-white">
              {title}
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {theme.label}
            </span>
          </div>
          <div className="mt-1 text-sm text-white/60">
            {cleanSubtitle || 'Tap to open this destination.'}
          </div>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/55 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">
          <FiArrowUpRight size={18} />
        </div>
      </div>
    </a>
  )
}
