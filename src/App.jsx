import { useEffect, useState } from 'react'
import Header from './components/HeaderPanel'
import Profile from './components/ProfilePanel'
import SocialIcons from './components/SocialBar'
import Links from './components/LinksPanel'
import SubscribeSection from './components/SubscribePanel'
import EditModal from './components/EditModalPanel'

const DEFAULT_LINKS = [
  {
    id: 1,
    title: 'Spotify',
    subtitle: 'User · Dheeraj',
    icon: 'spotify',
    url: 'https://open.spotify.com',
  },
  {
    id: 2,
    title: 'Snapchat',
    subtitle: 'Quick updates and stories',
    icon: 'snapchat',
    url: 'https://snapchat.com',
  },
  {
    id: 3,
    title: 'LinkedIn',
    subtitle: 'Projects, work, and highlights',
    icon: 'linkedin',
    url: 'https://linkedin.com',
  },
  {
    id: 4,
    title: 'Instagram',
    subtitle: 'Photos, reels, and behind the scenes',
    icon: 'instagram',
    url: 'https://instagram.com',
  },
]

const DEFAULT_PROFILE = {
  username: 'dheeraj.325',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  instagram: 'https://instagram.com/dheeraj325',
  snapchat: 'https://snapchat.com',
  linkedin: 'https://linkedin.com',
}

export default function App() {
  const [username, setUsername] = useState(DEFAULT_PROFILE.username)
  const [avatar, setAvatar] = useState(DEFAULT_PROFILE.avatar)
  const [links, setLinks] = useState(DEFAULT_LINKS)
  const [instagram, setInstagram] = useState(DEFAULT_PROFILE.instagram)
  const [snapchat, setSnapchat] = useState(DEFAULT_PROFILE.snapchat)
  const [linkedin, setLinkedin] = useState(DEFAULT_PROFILE.linkedin)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const safeLinks = Array.isArray(links) ? links : DEFAULT_LINKS

  useEffect(() => {
    const savedProfile = localStorage.getItem('profileData')
    if (savedProfile) {
      try {
        const data = JSON.parse(savedProfile)
        setUsername(data.username || DEFAULT_PROFILE.username)
        setAvatar(data.avatar || DEFAULT_PROFILE.avatar)
        setLinks(Array.isArray(data.links) ? data.links : DEFAULT_LINKS)
        setInstagram(data.instagram || DEFAULT_PROFILE.instagram)
        setSnapchat(data.snapchat || DEFAULT_PROFILE.snapchat)
        setLinkedin(data.linkedin || DEFAULT_PROFILE.linkedin)
      } catch (error) {
        console.error('Failed to load profile:', error)
      }
    }
  }, [])

  const handleEditSave = (formData) => {
    const nextLinks = Array.isArray(formData.links) ? formData.links : DEFAULT_LINKS
    const updatedData = {
      username: formData.username,
      avatar: formData.avatar,
      links: nextLinks,
      instagram,
      snapchat,
      linkedin,
    }

    setUsername(formData.username)
    setAvatar(formData.avatar)
    setLinks(nextLinks)

    localStorage.setItem('profileData', JSON.stringify(updatedData))
    setIsEditOpen(false)
  }

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: username,
        text: 'Check out my profile!',
        url: window.location.href,
      })
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const handleSubscribeClick = () => {
    const element = document.querySelector('[data-subscribe]')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12%] top-[-4rem] h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(111,255,210,0.24)_0%,_rgba(111,255,210,0)_70%)] blur-3xl" />
        <div className="absolute right-[-8%] top-[20%] h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(86,196,255,0.18)_0%,_rgba(86,196,255,0)_72%)] blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(142,240,200,0.16)_0%,_rgba(142,240,200,0)_72%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-5 sm:px-6 sm:py-8">
        <div className="rounded-[34px] border border-white/10 bg-white/[0.07] shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <Header
            onSubscribeClick={handleSubscribeClick}
            onShareClick={handleShareClick}
            onEditClick={() => setIsEditOpen(true)}
          />

          <div className="px-4 pb-6 sm:px-6 sm:pb-8">
            <Profile username={username} avatar={avatar} linkCount={safeLinks.length} />

            <SocialIcons
              instagram={instagram}
              snapchat={snapchat}
              linkedin={linkedin}
            />

            <Links links={safeLinks} />
          </div>
        </div>

        <div data-subscribe className="mt-6">
          <SubscribeSection username={username} />
        </div>

        <p className="pt-4 text-center text-[11px] uppercase tracking-[0.32em] text-white/35">
          One page. Every important link.
        </p>
      </div>

      <EditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditSave}
        currentData={{
          username,
          avatar,
          links: safeLinks,
        }}
      />
    </div>
  )
}
