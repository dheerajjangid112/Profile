import LinkCard from './LinkCard'

export default function Links({ links }) {
  return (
    <div className="w-full max-w-[500px] mx-auto px-4 space-y-4 mb-8">
      {links.map(link => (
        <LinkCard
          key={link.id}
          title={link.title}
          subtitle={link.subtitle}
          icon={link.icon}
          url={link.url}
        />
      ))}
    </div>
  )
}
