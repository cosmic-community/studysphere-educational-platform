// app/modules/[slug]/page.tsx
import { getLearningModule, getQuizQuestionsByModule } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { FaClock, FaUser, FaGraduationCap, FaQuestionCircle } from 'react-icons/fa'
import Link from 'next/link'
import DifficultyBadge from '@/components/DifficultyBadge'
import SubjectBadge from '@/components/SubjectBadge'

interface ModulePageProps {
  params: Promise<{ slug: string }>
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { slug } = await params
  const module = await getLearningModule(slug)
  
  if (!module) {
    notFound()
  }

  // Get quiz questions for this module
  const quizQuestions = await getQuizQuestionsByModule(module.id)

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {module.metadata?.subject && (
            <SubjectBadge subject={module.metadata.subject.value} />
          )}
          {module.metadata?.difficulty_level && (
            <DifficultyBadge level={module.metadata.difficulty_level.value} />
          )}
          <div className="flex items-center text-gray-600">
            <FaClock className="mr-2" />
            <span>{formatDuration(module.metadata?.estimated_duration || 0)}</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {module.metadata?.module_title || module.title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-6">
          {module.metadata?.description}
        </p>

        {/* Module Image */}
        {module.metadata?.module_image && (
          <div className="mb-8">
            <img 
              src={`${module.metadata.module_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={module.metadata.module_title || module.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-xl shadow-sm"
            />
          </div>
        )}
      </div>

      {/* Module Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card text-center py-4">
          <FaClock className="text-2xl text-primary-600 mx-auto mb-2" />
          <div className="font-semibold text-gray-900">Duration</div>
          <div className="text-sm text-gray-600">
            {formatDuration(module.metadata?.estimated_duration || 0)}
          </div>
        </div>
        
        <div className="card text-center py-4">
          <FaGraduationCap className="text-2xl text-secondary-600 mx-auto mb-2" />
          <div className="font-semibold text-gray-900">Level</div>
          <div className="text-sm text-gray-600">
            {module.metadata?.difficulty_level?.value || 'Not specified'}
          </div>
        </div>
        
        <div className="card text-center py-4">
          <FaQuestionCircle className="text-2xl text-accent-600 mx-auto mb-2" />
          <div className="font-semibold text-gray-900">Questions</div>
          <div className="text-sm text-gray-600">
            {quizQuestions.length} available
          </div>
        </div>
        
        <div className="card text-center py-4">
          <FaUser className="text-2xl text-purple-600 mx-auto mb-2" />
          <div className="font-semibold text-gray-900">Subject</div>
          <div className="text-sm text-gray-600">
            {module.metadata?.subject?.value || 'General'}
          </div>
        </div>
      </div>

      {/* Learning Content */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Content</h2>
        {module.metadata?.learning_content ? (
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: module.metadata.learning_content }}
          />
        ) : (
          <p className="text-gray-600">No learning content available for this module.</p>
        )}
      </div>

      {/* Prerequisites */}
      {module.metadata?.prerequisites && module.metadata.prerequisites.length > 0 && (
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Prerequisites</h2>
          <div className="space-y-3">
            {module.metadata.prerequisites.map(prerequisite => (
              <div key={prerequisite.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">
                    {prerequisite.metadata?.module_title || prerequisite.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {prerequisite.metadata?.subject?.value} • {prerequisite.metadata?.difficulty_level?.value}
                  </div>
                </div>
                <Link 
                  href={`/modules/${prerequisite.slug}`}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Module →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Section */}
      {quizQuestions.length > 0 && (
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Available</h2>
          <p className="text-gray-600 mb-4">
            Test your knowledge with {quizQuestions.length} questions covering this module's content.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {['easy', 'medium', 'hard'].map(level => {
              const levelQuestions = quizQuestions.filter(q => q.metadata?.difficulty_level?.key === level)
              return (
                <div key={level} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-900 capitalize">{level}</div>
                  <div className="text-sm text-gray-600">{levelQuestions.length} questions</div>
                </div>
              )
            })}
          </div>
          <Link 
            href={`/quiz?module=${module.id}`}
            className="btn-primary"
          >
            Take Quiz
          </Link>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Link 
          href="/modules"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Modules
        </Link>
        
        {quizQuestions.length > 0 && (
          <Link 
            href={`/quiz?module=${module.id}`}
            className="btn-secondary"
          >
            Start Learning
          </Link>
        )}
      </div>
    </div>
  )
}