'use client'

import { useState, useEffect } from 'react'
import { getLearningModules } from '@/lib/cosmic'
import type { LearningModule } from '@/types'
import SubjectFilter from '@/components/SubjectFilter'
import ModuleCard from '@/components/ModuleCard'
import { FaBookOpen } from 'react-icons/fa'

export default function ModulesPage() {
  const [modules, setModules] = useState<LearningModule[]>([])
  const [filteredModules, setFilteredModules] = useState<LearningModule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchModules() {
      try {
        setLoading(true)
        const data = await getLearningModules()
        const activeModules = data.filter(module => module.metadata?.is_active !== false)
        setModules(activeModules)
        setFilteredModules(activeModules)
      } catch (err) {
        setError('Failed to load learning modules')
        console.error('Error fetching modules:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchModules()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading modules...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <FaBookOpen className="text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Modules</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our comprehensive collection of interactive learning modules designed to enhance your educational experience.
        </p>
      </div>

      {/* Filter Section */}
      {modules.length > 0 && (
        <SubjectFilter 
          modules={modules} 
          onFilterChange={setFilteredModules}
        />
      )}

      {/* Modules Grid */}
      {filteredModules.length === 0 ? (
        <div className="text-center py-12">
          <FaBookOpen className="text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No modules found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      )}

      {/* Stats */}
      {modules.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Showing {filteredModules.length} of {modules.length} modules
          </p>
        </div>
      )}
    </div>
  )
}