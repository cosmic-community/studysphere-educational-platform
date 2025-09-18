import Link from 'next/link'
import { FaClock, FaUser } from 'react-icons/fa'
import type { LearningModule } from '@/types'
import DifficultyBadge from './DifficultyBadge'
import SubjectBadge from './SubjectBadge'

interface FeaturedModulesProps {
  modules: LearningModule[]
}

export default function FeaturedModules({ modules }: FeaturedModulesProps) {
  if (!modules || modules.length === 0) {
    return (
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Learning Modules</h2>
        <div className="text-center text-gray-500 py-8">
          <p>No learning modules available at the moment.</p>
          <p className="text-sm mt-2">Check back later for new content!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Learning Modules</h2>
      <div className="space-y-4">
        {modules.map((module) => {
          const subject = module.metadata?.subject?.value || 'General'
          const difficultyLevel = module.metadata?.difficulty_level?.value || 'Beginner'
          const estimatedDuration = module.metadata?.estimated_duration || 30
          const imageUrl = module.metadata?.module_image?.imgix_url

          return (
            <div key={module.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start space-x-4">
                {imageUrl && (
                  <img
                    src={`${imageUrl}?w=160&h=120&fit=crop&auto=format,compress`}
                    alt={module.metadata?.module_title || module.title}
                    className="w-20 h-15 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        <Link 
                          href={`/modules/${module.slug}`}
                          className="hover:text-primary-600 transition-colors duration-200"
                        >
                          {module.metadata?.module_title || module.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {module.metadata?.description || 'No description available.'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <SubjectBadge subject={subject} />
                      <DifficultyBadge level={difficultyLevel} />
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaClock className="mr-1" />
                      {estimatedDuration} min
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-6 text-center">
        <Link 
          href="/modules" 
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          View All Modules →
        </Link>
      </div>
    </div>
  )
}