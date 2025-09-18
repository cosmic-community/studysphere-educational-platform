import Link from 'next/link'
import { FaClock, FaUser } from 'react-icons/fa'
import type { LearningModule } from '@/types'
import DifficultyBadge from './DifficultyBadge'
import SubjectBadge from './SubjectBadge'

interface ModuleCardProps {
  module: LearningModule
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <Link href={`/modules/${module.slug}`} className="block">
      <div className="card hover:scale-105 transition-transform duration-200">
        {/* Module Image */}
        {module.metadata?.module_image && (
          <div className="mb-4 -mx-6 -mt-6">
            <img 
              src={`${module.metadata.module_image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
              alt={module.metadata.module_title || module.title}
              width={300}
              height={150}
              className="w-full h-40 object-cover rounded-t-xl"
            />
          </div>
        )}

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {module.metadata?.subject && (
            <SubjectBadge subject={module.metadata.subject.value} />
          )}
          {module.metadata?.difficulty_level && (
            <DifficultyBadge level={module.metadata.difficulty_level.value} />
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {module.metadata?.module_title || module.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {module.metadata?.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <FaClock className="mr-1" />
            <span>{formatDuration(module.metadata?.estimated_duration || 0)}</span>
          </div>
          
          <div className="flex items-center">
            <FaUser className="mr-1" />
            <span>{module.metadata?.subject?.value || 'General'}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-200">
            Start Learning →
          </div>
        </div>
      </div>
    </Link>
  )
}