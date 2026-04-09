import { useEffect, useState } from 'react'
import { FiCheck, FiMail, FiRefreshCw, FiSend } from 'react-icons/fi'

export default function SubscribePanel({ username }) {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('subscription')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setFormData(data)
        setSubmitted(true)
      } catch (error) {
        console.error('Failed to load subscription:', error)
      }
    }
  }, [])

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name required'
    if (!formData.email.trim()) newErrors.email = 'Email required'
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('subscription', JSON.stringify(formData))
      setSubmitted(true)
      setLoading(false)
    }, 600)
  }

  const handleReset = () => {
    setFormData({ name: '', email: '' })
    setSubmitted(false)
    setErrors({})
    localStorage.removeItem('subscription')
  }

  return (
    <div className="mx-auto w-full max-w-[640px] px-1 pb-8">
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#071411]/82 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-7">
        {submitted ? (
          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200/20 bg-emerald-300/12 text-emerald-100">
              <FiCheck size={26} />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-50/45">
              Subscription confirmed
            </p>
            <h2 className="mt-2 font-display text-3xl text-white">
              You are on the list
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/65">
              New updates from {username} will land in your inbox whenever something worth sharing drops.
            </p>
            <button
              onClick={handleReset}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white/80 transition-all hover:bg-white/[0.09] hover:text-white"
            >
              <FiRefreshCw size={14} />
              Subscribe again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-lg">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-50/45">
                  Stay in the loop
                </p>
                <h2 className="mt-2 font-display text-3xl text-white sm:text-[2.2rem]">
                  Subscribe to {username}
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Short emails with new links, fresh drops, and the occasional useful update.
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-200/25 to-cyan-200/10 text-emerald-50">
                <FiMail size={24} />
              </div>
            </div>

            <div className="mb-5 flex flex-wrap gap-2 text-xs font-medium text-white/50">
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">No spam</span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">Easy unsubscribe</span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">Only useful updates</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`h-[54px] w-full rounded-2xl border px-4 text-sm font-medium text-white outline-none transition-all placeholder:text-white/30 ${
                      errors.name
                        ? 'border-red-300/70 bg-red-500/10'
                        : 'border-white/10 bg-white/[0.05] hover:bg-white/[0.07] focus:border-emerald-200/40 focus:bg-white/[0.08]'
                    }`}
                  />
                  {errors.name && <p className="mt-2 text-xs text-red-200">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={`h-[54px] w-full rounded-2xl border px-4 text-sm font-medium text-white outline-none transition-all placeholder:text-white/30 ${
                      errors.email
                        ? 'border-red-300/70 bg-red-500/10'
                        : 'border-white/10 bg-white/[0.05] hover:bg-white/[0.07] focus:border-emerald-200/40 focus:bg-white/[0.08]'
                    }`}
                  />
                  {errors.email && <p className="mt-2 text-xs text-red-200">{errors.email}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-200 to-cyan-200 px-4 text-sm font-extrabold uppercase tracking-[0.22em] text-[#062019] transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiSend size={16} />
                {loading ? 'Loading...' : 'Subscribe'}
              </button>

              <p className="text-center text-xs text-white/40">
                A confirmation is saved locally so you can test the flow without a backend.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
