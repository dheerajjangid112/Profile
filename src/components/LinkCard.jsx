import { FiInstagram, FiLinkedin } from 'react-icons/fi'
import { SiSpotify, SiSnapchat } from 'react-icons/si'

const IconMap = {
  spotify: SiSpotify,
  snapchat: SiSnapchat,
  linkedin: FiLinkedin,
  instagram: FiInstagram,
}

export default function LinkCard({ title, subtitle, icon, url }) {
  const Icon = IconMap[icon] || FiInstagram

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center h-[68px] px-5 gap-4 bg-gray-900 border-2 border-white rounded-full hover:bg-gray-800 transition-all group"
    >
      {/* Icon Container */}
      <div className="flex-shrink-0 w-[44px] h-[44px] flex items-center justify-center">
        <Icon size={28} className="text-white" />
      </div>

      {/* Text (left-aligned) */}
      <div className="flex-1">
        <div className="text-white font-medium text-base">
          {title}
        </div>
        {subtitle && (
          <div className="text-white/60 text-xs">
            {subtitle}
          </div>
        )}
      </div>
    </a>
  )
}
