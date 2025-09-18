'use client'

import { useState } from 'react'
import type { LearningModule } from '@/types'

interface SubjectFilterProps {
  modules: LearningModule[]
  onFilterChange: (filteredModules: LearningModule[]) => void
}

export default function SubjectFilter({ modules, onFilterChange }: SubjectFilterProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>('all')

  // Get unique subjects from modules
  const subjects = Array.from(
    new Set(
      modules
        .map(module => module.metadata?.subject?.value)
        .filter(Boolean)
    )
  )

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject)
    
    if (subject === 'all') {
      onFilterChange(modules)
    } else {
      const filtered = modules.filter(
        module => module.metadata?.subject?.value === subject
      )
      onFilterChange(filtered)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => handleSubjectChange('all')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
          selectedSubject === 'all'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        All Subjects
      </button>
      
      {subjects.map((subject) => (
        <button
          key={subject}
          onClick={() => handleSubjectChange(subject)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            selectedSubject === subject
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {subject}
        </button>
      ))}
    </div>
  )
}