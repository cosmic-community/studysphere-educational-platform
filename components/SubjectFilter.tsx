'use client'

import { useState } from 'react'

interface SubjectFilterProps {
  subjects: string[]
  onFilter: (subject: string) => void
  activeFilter: string
}

export default function SubjectFilter({ subjects, onFilter, activeFilter }: SubjectFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleFilterChange = (subject: string) => {
    onFilter(subject)
    setIsOpen(false)
  }

  // Ensure we have a valid subjects array
  const validSubjects = Array.isArray(subjects) ? subjects.filter(Boolean) : []

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      >
        <span>{activeFilter || 'All Subjects'}</span>
        <svg
          className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1">
            <button
              onClick={() => handleFilterChange('')}
              className={`block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                !activeFilter ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
              }`}
            >
              All Subjects
            </button>
            {validSubjects.map((subject) => (
              <button
                key={subject}
                onClick={() => handleFilterChange(subject)}
                className={`block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                  activeFilter === subject ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
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