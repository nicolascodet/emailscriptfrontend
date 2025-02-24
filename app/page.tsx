'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Mail, Sparkles, Target, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-8">
            Generate <span className="gradient-text">Personalized</span> Cold Emails
            <br /> That Actually Convert
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Our AI analyzes company websites and creates engaging, personalized emails
            that resonate with your prospects. No more generic templates.
          </p>
          <Link href="/generate">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-gradient"
            >
              Start Generating Emails <ArrowRight className="inline-block ml-2" />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <Target className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Highly Targeted</h3>
              <p className="text-gray-600">
                Our AI analyzes company websites to understand their values, achievements,
                and pain points.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <Sparkles className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">AI-Powered</h3>
              <p className="text-gray-600">
                Advanced AI ensures each email is unique, engaging, and resonates with
                your prospect.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="card"
            >
              <Zap className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-gray-600">
                Generate hundreds of personalized emails in minutes, not hours.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Ready to Transform Your Cold Emails?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Join hundreds of companies using our AI to generate high-converting cold emails.
          </p>
          <Link href="/generate">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-gradient"
            >
              Get Started Now <Mail className="inline-block ml-2" />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </main>
  )
}
