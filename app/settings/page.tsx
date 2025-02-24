'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Globe } from 'lucide-react'

interface CompanySettings {
  name: string
  website: string
  description: string
  value_proposition: string
  achievements: string
  target_market: string
}

export default function Settings() {
  const [settings, setSettings] = useState<CompanySettings>({
    name: '',
    website: '',
    description: '',
    value_proposition: '',
    achievements: '',
    target_market: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('companySettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Save to localStorage
      localStorage.setItem('companySettings', JSON.stringify(settings))
      
      // Optional: Analyze website if provided
      if (settings.website) {
        const response = await fetch('https://emailscraper-backend-919074092411.us-west1.run.app/analyze-company', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: settings.website }),
        })
        
        if (response.ok) {
          const data = await response.json()
          setSettings(prev => ({
            ...prev,
            description: data.description || prev.description,
            value_proposition: data.value_proposition || prev.value_proposition,
            achievements: data.achievements || prev.achievements,
            target_market: data.target_market || prev.target_market,
          }))
          localStorage.setItem('companySettings', JSON.stringify(settings))
        }
      }
      
      setMessage('Settings saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error:', error)
      setMessage('Error saving settings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Company Settings</h1>
          <p className="text-xl text-gray-600 mb-8">
            Configure your company information for email generation
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-xl shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your Company Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Website
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={settings.website}
                  onChange={(e) => {
                    let url = e.target.value;
                    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
                      url = 'https://' + url;
                    }
                    setSettings({ ...settings, website: url });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="example.com"
                />
                <button
                  type="button"
                  onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Analyze
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Description
            </label>
            <textarea
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              placeholder="Describe what your company does"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Value Proposition
            </label>
            <textarea
              value={settings.value_proposition}
              onChange={(e) => setSettings({ ...settings, value_proposition: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
              placeholder="What unique value do you offer to clients?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Achievements
            </label>
            <textarea
              value={settings.achievements}
              onChange={(e) => setSettings({ ...settings, achievements: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
              placeholder="List your company&apos;s key achievements and statistics"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Market
            </label>
            <textarea
              value={settings.target_market}
              onChange={(e) => setSettings({ ...settings, target_market: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
              placeholder="Describe your ideal customers and target market"
            />
          </div>

          <div className="flex justify-end gap-4">
            {message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={message.includes('Error') ? 'text-red-600' : 'text-green-600'}
              >
                {message}
              </motion.p>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Save Settings
            </motion.button>
          </div>
        </motion.form>
      </div>
    </main>
  )
}
