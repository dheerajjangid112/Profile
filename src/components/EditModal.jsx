import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { verifyAdminPassword } from '../lib/adminAuth'

export default function EditModal({ isOpen, onClose, onSave, currentData }) {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  const [formData, setFormData] = useState(currentData || {
    username: '',
    avatar: '',
    links: []
  })

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setIsVerifying(true)

    try {
      const isValid = await verifyAdminPassword(password)

      if (isValid) {
        setIsAuthenticated(true)
        setPasswordError('')
        setPassword('')
      } else {
        setPasswordError('Incorrect password')
        setPassword('')
      }
    } finally {
      setIsVerifying(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...formData.links]
    newLinks[index] = { ...newLinks[index], [field]: value }
    setFormData(prev => ({ ...prev, links: newLinks }))
  }

  const handleAddLink = () => {
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, { id: Date.now(), title: '', url: '', icon: 'instagram', subtitle: '' }]
    }))
  }

  const handleRemoveLink = (index) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }))
  }

  const handleSave = () => {
    onSave(formData)
    setIsAuthenticated(false)
    setFormData({ username: '', avatar: '', links: [] })
  }

  const handleClose = () => {
    setIsAuthenticated(false)
    setPassword('')
    setPasswordError('')
    setFormData({ username: '', avatar: '', links: [] })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between p-4">
          <h2 className="text-lg font-bold text-gray-900">
            {isAuthenticated ? 'Edit Profile' : 'Admin Access'}
          </h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-all"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {!isAuthenticated ? (
            /* Password Form */
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter Admin Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
                  disabled={isVerifying}
                  autoFocus
                />
                {passwordError && (
                  <p className="text-red-600 text-sm mt-2">{passwordError}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-2 bg-teal-650 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all"
              >
                {isVerifying ? 'Checking...' : 'Unlock'}
              </button>
            </form>
          ) : (
            /* Edit Form */
            <form className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
                />
              </div>

              {/* Avatar URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Avatar URL
                </label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 text-xs"
                />
              </div>

              {/* Links Section */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-700">Links</h3>
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition-all"
                  >
                    + Add
                  </button>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {formData.links.map((link, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold text-gray-600">Link {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveLink(index)}
                          className="text-red-500 hover:text-red-700 text-sm font-semibold"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="space-y-2 text-sm">
                        <input
                          type="text"
                          placeholder="Title"
                          value={link.title}
                          onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Subtitle"
                          value={link.subtitle || ''}
                          onChange={(e) => handleLinkChange(index, 'subtitle', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                        />
                        <input
                          type="url"
                          placeholder="URL"
                          value={link.url}
                          onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                        />
                        <select
                          value={link.icon}
                          onChange={(e) => handleLinkChange(index, 'icon', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                        >
                          <option value="spotify">Spotify</option>
                          <option value="snapchat">Snapchat</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="instagram">Instagram</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsAuthenticated(false)}
                  className="flex-1 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-all"
                >
                  Lock
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
