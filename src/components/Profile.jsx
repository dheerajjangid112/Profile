export default function Profile({ username, avatar }) {
  return (
    <div className="flex flex-col items-center gap-3 mt-6 mb-6">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full border-4 border-white/40 overflow-hidden">
        <img
          src={avatar}
          alt={username}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Username */}
      <h1 className="text-xl font-semibold text-white">
        {username}
      </h1>
    </div>
  )
}
