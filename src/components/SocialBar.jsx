import { FiInstagram, FiLinkedin } from 'react-icons/fi'
import { SiSnapchat } from 'react-icons/si'

export default function SocialBar({ instagram, snapchat, linkedin }) {
  const socialLinks = [
    { href: instagram, icon: FiInstagram, label: 'Instagram' },
    { href: snapchat, icon: SiSnapchat, label: 'Snapchat' },
    { href: linkedin, icon: FiLinkedin, label: 'LinkedIn' },
  ]

  return (
    <div className="mb-8 flex items-center justify-center gap-3">
      {socialLinks.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#061411]/75 text-white/75 shadow-[0_18px_30px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-1 hover:border-white/20 hover:text-white"
        >
          <Icon size={22} />
        </a>
      ))}
    </div>
  )
}
