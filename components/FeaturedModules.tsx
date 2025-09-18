import { LearningModule } from '@/types'
import DifficultyBadge from './DifficultyBadge'
import SubjectBadge from './SubjectBadge'
import Link from 'next/link'

interface FeaturedModulesProps {
  modules: LearningModule[]
}

export default function FeaturedModules({ modules }: FeaturedModulesProps) {
  if (!modules || modules.length === 0) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Modules</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">No modules available at the moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Featured Modules</h2>
        <Link href="/modules" className="text-primary-600 hover:text-primary-700 font-medium">
          View all →
        </Link>
      </div>
      
      <div className="space-y-4">
        {modules.map((module) => {
          if (!module || !module.id) {
            return null
          }

          const imageUrl = module.metadata?.module_image?.imgix_url 
            ? `${module.metadata.module_image.imgix_url}?w=400&h=200&fit=crop&auto=format,compress`
            : '/placeholder-module.jpg'

          const subject = module.metadata?.subject?.value || 'General'
          const difficulty = module.metadata?.difficulty_level?.value || 'Beginner'
          const duration = module.metadata?.estimated_duration || 0

          return (
            <Link 
              key={module.id}
              href={`/modules/${module.slug}`}
              className="block hover:scale-[1.02] transition-transform duration-200"
            >
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex gap-4">
                  <img
                    src={imageUrl}
                    alt={module.metadata?.module_title || module.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate mb-1">
                      {module.metadata?.module_title || module.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {module.metadata?.description || 'No description available'}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <SubjectBadge subject={subject} />
                      <DifficultyBadge level={difficulty} />
                      {duration > 0 && (
                        <span className="text-xs text-gray-500">
                          {duration} min
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}