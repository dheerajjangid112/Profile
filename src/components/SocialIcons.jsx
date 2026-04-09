import { FiInstagram, FiLinkedin } from 'react-icons/fi'
import { SiSnapchat } from 'react-icons/si'

export default function SocialIcons({instagram, snapchat, linkedin}) {
  return (
    <div className="flex items-center justify-center gap-6 mb-8">
      <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-all">
        <FiInstagram size={24} />
      </a>
      <a href={snapchat} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-all">
        <SiSnapchat size={24} />
      </a>
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-all">
        <FiLinkedin size={24} />
      </a>
    </div>
  )
}
