'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CompanyForm, CompanyData } from '../../components/CompanyForm'
import { Mail } from 'lucide-react'

interface EmailResponse {
  subject: string
  body: string
  recipient: string
}

export default function Generate() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [emails, setEmails] = useState<EmailResponse[]>([])
  const [error, setError] = useState('')

  const handleSubmit = async (data: CompanyData) => {
    try {
      // Get company settings from localStorage
      const savedSettings = localStorage.getItem('companySettings')
      const senderInfo = savedSettings ? JSON.parse(savedSettings) : {}

      // Prepare data with company settings
      const requestData = {
        company: data.company_name || data.website
          .replace(/^https?:\/\//, '')  // Remove http:// or https://
          .replace(/^www\./, '')        // Remove www.
          .split('/')[0]                // Remove paths
          .split('.')[0],               // Remove .com etc
        website: data.website,
        address: '',
        linkedin_url: '',
        industry: data.industry,
        company_size: '1-100',
        decision_maker: data.decision_maker || 'Decision Maker',
        title: data.title || 'Manager',
        email: data.email || '',
        linkedin_profile: '',
        sender_info: {
          name: senderInfo.name || '[Your Company]',
          description: senderInfo.description || '',
          value_proposition: senderInfo.value_proposition || '',
          achievements: senderInfo.achievements || '',
          target_market: senderInfo.target_market || ''
        }
      }

      const response = await fetch('https://emailscraper-backend-919074092411.us-west1.run.app/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      const responseData = await response.json()
      
      if (!response.ok) {
        throw new Error(responseData.detail || 'Failed to generate email')
      }

      setEmails([responseData, ...emails])
      setError('')
      return responseData
    } catch (err) {
      console.error('Error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to the server. Please try again.'
      setError(errorMessage)
      throw err
    }
  }

  const openMailApp = (email: EmailResponse) => {
    const mailtoLink = `mailto:${encodeURIComponent(email.recipient)}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`
    window.location.href = mailtoLink
  }

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Generate Your Email</h1>
          <p className="text-xl text-gray-600 mb-8">
            Enter your target company&apos;s website and we&apos;ll generate a personalized email for you.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(true)}
            className="button-gradient"
          >
            Start New Email
          </motion.button>
        </motion.div>

        <CompanyForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {emails.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {emails.map((email, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="mb-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">To: {email.recipient}</h3>
                    <p className="text-purple-600 font-medium">{email.subject}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openMailApp(email)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Send Email
                  </motion.button>
                </div>
                <div className="whitespace-pre-wrap text-gray-700">
                  {email.body}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  )
}
