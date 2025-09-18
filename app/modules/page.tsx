import { getLearningModules } from '@/lib/cosmic'
import ModuleCard from '@/components/ModuleCard'
import SubjectFilter from '@/components/SubjectFilter'
import { FaBookOpen } from 'react-icons/fa'

export const metadata = {
  title: 'Learning Modules - StudySphere',
  description: 'Explore interactive learning modules across various subjects and difficulty levels.',
}

export default async function ModulesPage() {
  const modules = await getLearningModules()
  const activeModules = modules.filter(module => module.metadata?.is_active !== false)

  // Group modules by subject
  const modulesBySubject = activeModules.reduce((acc, module) => {
    const subject = module.metadata?.subject?.value || 'Other'
    if (!acc[subject]) {
      acc[subject] = []
    }
    acc[subject].push(module)
    return acc
  }, {} as Record<string, typeof modules>)

  const subjects = Object.keys(modulesBySubject)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center mb-4">
          <FaBookOpen className="text-4xl text-primary-600 mr-4" />
          <h1 className="text-4xl font-bold text-gray-900">Learning Modules</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our comprehensive collection of interactive learning modules designed to enhance 
          your educational journey across various subjects and difficulty levels.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">{activeModules.length}</div>
          <div className="text-gray-600">Total Modules</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-secondary-600 mb-2">{subjects.length}</div>
          <div className="text-gray-600">Subjects Available</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-accent-600 mb-2">
            {Math.round(activeModules.reduce((acc, module) => acc + (module.metadata?.estimated_duration || 0), 0) / 60)}h
          </div>
          <div className="text-gray-600">Total Duration</div>
        </div>
      </div>

      {/* Subject Filter */}
      <SubjectFilter subjects={subjects} />

      {/* Modules by Subject */}
      {subjects.map(subject => {
        const subjectModules = modulesBySubject[subject]
        if (!subjectModules || subjectModules.length === 0) return null

        return (
          <section key={subject} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {subject}
              </span>
              <span className="ml-3 text-lg font-normal text-gray-500">
                ({subjectModules.length} modules)
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjectModules.map(module => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          </section>
        )
      })}

      {activeModules.length === 0 && (
        <div className="text-center py-12">
          <FaBookOpen className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Modules Available</h3>
          <p className="text-gray-600">
            Learning modules will appear here when they are added to the system.
          </p>
        </div>
      )}
    </div>
  )
}