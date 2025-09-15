'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaqItem } from './faqServer'

interface FaqClientProps {
  faqs: FaqItem[]
  searchable?: boolean
  categoryFilter?: boolean
}

export function FaqClient({ faqs, searchable = true, categoryFilter = false }: FaqClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Auto-detect categories from questions
  const categories = React.useMemo(() => {
    const cats = new Set<string>()
    faqs.forEach(faq => {
      const question = faq.question.toLowerCase()
      if (question.includes('price') || question.includes('cost') || question.includes('rupees')) {
        cats.add('pricing')
      } else if (question.includes('range') || question.includes('battery') || question.includes('charging')) {
        cats.add('battery')
      } else if (question.includes('service') || question.includes('warranty') || question.includes('support')) {
        cats.add('service')
      } else if (question.includes('feature') || question.includes('experience') || question.includes('variant')) {
        cats.add('features')
      } else {
        cats.add('general')
      }
    })
    return Array.from(cats)
  }, [faqs])

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setOpenIndex(null) // Close any open FAQ when searching
  }

  return (
    <div className="w-full">
      
      {/* Search Bar */}
      {searchable && (
        <div className="mb-8">
          <div className="relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors duration-200 text-gray-900 placeholder-gray-500 font-[Inter]"
            />
          </div>
        </div>
      )}

      {/* Category Filter */}
      {categoryFilter && categories.length > 1 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              selectedCategory === 'all'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Search Results Count */}
      {searchQuery && (
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            {filteredFaqs.length === 0 
              ? 'No FAQs found matching your search'
              : `Found ${filteredFaqs.length} FAQ${filteredFaqs.length === 1 ? '' : 's'} matching "${searchQuery}"`
            }
          </p>
        </div>
      )}

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-gray-200 bg-white hover:border-gray-300 transition-colors duration-200"
          >
            {/* Question */}
            <button
              onClick={() => toggleFaq(index)}
              className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset group"
              aria-expanded={openIndex === index}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-black group-hover:text-green-600 transition-colors duration-200 pr-4 font-[Inter] leading-tight">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 ml-4">
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-6 h-6 flex items-center justify-center"
                  >
                    <svg 
                      className={`w-5 h-5 transition-colors duration-200 ${
                        openIndex === index ? 'text-green-500' : 'text-gray-400 group-hover:text-green-500'
                      }`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </button>

            {/* Answer */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 border-t border-gray-100">
                    <div className="pt-4">
                      <div className="w-12 h-0.5 bg-green-500 mb-4" />
                      <p className="text-gray-700 leading-relaxed text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* No Results State */}
      {filteredFaqs.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.09A8.001 8.001 0 0112 21a7.962 7.962 0 005.291-2.09A8.001 8.001 0 0012 3a8.001 8.001 0 00-5.291 2.09" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No matching FAQs found</h3>
          <p className="text-gray-600 mb-6">Try searching with different keywords or browse all FAQs</p>
          <button
            onClick={() => setSearchQuery('')}
            className="inline-flex items-center px-4 py-2 bg-green-500 text-white font-medium hover:bg-green-600 transition-colors duration-200"
          >
            Clear Search
          </button>
        </div>
      )}

     
    </div>
  )
}