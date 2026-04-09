import { useState, useEffect } from 'react'

export default function SubscribeSection({ username }) {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('subscription')
    if (saved) {
      const data = JSON.parse(saved)
      setFormData(data)
      setSubmitted(true)
    }
  }, [])

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
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
    <div className="w-full max-w-[500px] mx-auto px-4 pb-8">
      <div className="bg-white rounded-[28px] p-6 shadow-lg">
        {submitted ? (
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">✓</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Thanks for subscribing!
            </h2>
            <p className="text-gray-600 text-sm mb-3">
              Check your email for updates from {username}
            </p>
            <button
              onClick={handleReset}
              className="text-sm text-teal-600 hover:text-teal-700 font-semibold underline"
            >
              Subscribe again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 pb-5 border-b border-gray-300">
              <h2 className="text-xl font-bold text-gray-900">
                Subscribe to {username}
              </h2>
              <p className="text-gray-600 text-sm">
                Sign up to get exclusive email updates directly from me.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="First Name"
                  className={`w-full h-[52px] px-4 rounded-full border-2 transition-all focus:outline-none text-sm font-medium ${
                    errors.name
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-400 bg-white hover:border-gray-500 focus:border-teal-600'
                  }`}
                />
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`w-full h-[52px] px-4 rounded-full border-2 transition-all focus:outline-none text-sm font-medium ${
                    errors.email
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-400 bg-white hover:border-gray-500 focus:border-teal-600'
                  }`}
                />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[55px] mt-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 disabled:opacity-50 transition-all"
              >
                {loading ? 'Loading...' : 'Subscribe'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
