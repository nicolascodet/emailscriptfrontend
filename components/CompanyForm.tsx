import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, X } from 'lucide-react'

interface CompanyFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CompanyData) => void
}

export interface CompanyData {
  website: string
  industry: string
  company_name?: string
  decision_maker?: string
  title?: string
  email?: string
}

export function CompanyForm({ isOpen, onClose, onSubmit }: CompanyFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CompanyData>({
    website: '',
    industry: '',
    company_name: '',
    decision_maker: '',
    title: '',
    email: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return;
    
    setLoading(true)
    try {
      await onSubmit(formData)
      setFormData({
        website: '',
        industry: '',
        company_name: '',
        decision_maker: '',
        title: '',
        email: '',
      })
      onClose()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-lg font-medium">
                    Generate Email
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website URL *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.website}
                      onChange={(e) => {
                        let url = e.target.value;
                        // Add https:// if no protocol is specified
                        if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
                          url = 'https://' + url;
                        }
                        setFormData({ ...formData, website: url });
                      }}
                      placeholder="example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value })
                      }
                      placeholder="Healthcare, Technology, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.company_name}
                      onChange={(e) =>
                        setFormData({ ...formData, company_name: e.target.value })
                      }
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Decision Maker's Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.decision_maker}
                      onChange={(e) =>
                        setFormData({ ...formData, decision_maker: e.target.value })
                      }
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Optional"
                    />
                  </div>

                  <p className="text-sm text-gray-500">
                    We&apos;ll analyze the website to create a personalized email.
                  </p>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      We&apos;ll need a few more details
                    </label>
                  </div>

                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      type="submit"
                      className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Generating Email...
                        </>
                      ) : (
                        'Generate Email'
                      )}
                    </motion.button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
