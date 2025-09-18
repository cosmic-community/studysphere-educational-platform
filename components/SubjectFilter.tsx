'use client'

import { useState } from 'react'

interface SubjectFilterProps {
  subjects: string[]
  selectedSubject: string | null
  onSubjectChange: (subject: string | null) => void
}

export default function SubjectFilter({ 
  subjects, 
  selectedSubject, 
  onSubjectChange 
}: SubjectFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubjectSelect = (subject: string | null) => {
    onSubjectChange(subject)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-w-[120px] text-left"
      >
        {selectedSubject || 'All Subjects'}
        <svg 
          className="ml-2 h-4 w-4 inline-block" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1">
            <button
              onClick={() => handleSubjectSelect(null)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                !selectedSubject ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
              }`}
            >
              All Subjects
            </button>
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => handleSubjectSelect(subject)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                  selectedSubject === subject ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}