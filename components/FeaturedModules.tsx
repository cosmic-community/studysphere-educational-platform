import { FaBookOpen, FaClock, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import type { LearningModule } from '@/types'
import DifficultyBadge from '@/components/DifficultyBadge'
import SubjectBadge from '@/components/SubjectBadge'

interface FeaturedModulesProps {
  modules: LearningModule[]
}

export default function FeaturedModules({ modules }: FeaturedModulesProps) {
  if (!modules || modules.length === 0) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Modules</h2>
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <FaBookOpen className="text-4xl mx-auto" />
          </div>
          <p className="text-gray-600">No modules available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Featured Modules</h2>
        <Link 
          href="/modules" 
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
        >
          View All
          <FaArrowRight className="text-sm" />
        </Link>
      </div>
      
      <div className="space-y-4">
        {modules.map((module) => (
          <Link 
            key={module.id} 
            href={`/modules/${module.slug}`}
            className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-start gap-4">
              {module.metadata?.module_image?.imgix_url && (
                <img
                  src={`${module.metadata.module_image.imgix_url}?w=120&h=80&fit=crop&auto=format,compress`}
                  alt={module.metadata?.module_title || module.title}
                  className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                />
              )}
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                  {module.metadata?.module_title || module.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {module.metadata?.description || ''}
                </p>
                
                <div className="flex items-center gap-3 flex-wrap">
                  {module.metadata?.subject && (
                    <SubjectBadge subject={module.metadata.subject.value} />
                  )}
                  
                  {module.metadata?.difficulty_level && (
                    <DifficultyBadge difficulty={module.metadata.difficulty_level.value} />
                  )}
                  
                  {module.metadata?.estimated_duration && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <FaClock />
                      <span>{module.metadata.estimated_duration} min</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <FaArrowRight className="text-gray-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}