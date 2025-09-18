import { FaBookOpen, FaQuestionCircle, FaChartLine, FaShieldAlt, FaCalendarAlt, FaCog } from 'react-icons/fa'
import { getLearningModules, getProgressRecords, getSystemConfigurations } from '@/lib/cosmic'
import Link from 'next/link'
import StatsOverview from '@/components/StatsOverview'
import RecentProgress from '@/components/RecentProgress'
import FeaturedModules from '@/components/FeaturedModules'

export default async function HomePage() {
  // Fetch initial data for overview
  const [modules, progressRecords, systemConfigs] = await Promise.all([
    getLearningModules(),
    getProgressRecords(),
    getSystemConfigurations()
  ])

  const activeModules = modules.filter(module => module.metadata?.is_active !== false)
  const completedProgress = progressRecords.filter(record => 
    record.metadata?.completion_status?.key === 'completed'
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            StudySphere
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          A comprehensive educational platform that combines interactive learning modules, intelligent quiz systems, 
          and smart study management to create an optimal learning environment for students.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/modules" className="btn-primary text-lg px-8 py-3">
            Explore Modules
          </Link>
          <Link href="/progress" className="btn-secondary text-lg px-8 py-3">
            View Progress
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <StatsOverview 
        totalModules={activeModules.length}
        completedModules={completedProgress.length}
        totalProgress={progressRecords.length}
        activeConfigs={systemConfigs.filter(config => config.metadata?.is_active).length}
      />

      {/* Featured Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <FeaturedModules modules={activeModules.slice(0, 3)} />
        <RecentProgress progressRecords={progressRecords.slice(0, 3)} />
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Link href="/modules" className="card hover:scale-105 transition-transform duration-200">
          <div className="flex items-center mb-4">
            <FaBookOpen className="text-3xl text-primary-600 mr-4" />
            <h3 className="text-xl font-semibold text-gray-900">Learning Modules</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Interactive educational content with multimedia support across various subjects and difficulty levels.
          </p>
          <div className="text-primary-600 font-medium">
            {activeModules.length} modules available →
          </div>
        </Link>

        <Link href="/quiz" className="card hover:scale-105 transition-transform duration-200">
          <div className="flex items-center mb-4">
            <FaQuestionCircle className="text-3xl text-secondary-600 mr-4" />
            <h3 className="text-xl font-semibold text-gray-900">Quiz System</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Comprehensive assessments with multiple question types and instant feedback to test your knowledge.
          </p>
          <div className="text-secondary-600 font-medium">
            Take a quiz →
          </div>
        </Link>

        <Link href="/progress" className="card hover:scale-105 transition-transform duration-200">
          <div className="flex items-center mb-4">
            <FaChartLine className="text-3xl text-accent-600 mr-4" />
            <h3 className="text-xl font-semibold text-gray-900">Progress Tracking</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Detailed analytics on student performance, completion rates, and learning achievements.
          </p>
          <div className="text-accent-600 font-medium">
            View analytics →
          </div>
        </Link>

        <Link href="/blocking" className="card hover:scale-105 transition-transform duration-200">
          <div className="flex items-center mb-4">
            <FaShieldAlt className="text-3xl text-red-600 mr-4" />
            <h3 className="text-xl font-semibold text-gray-900">App Blocking</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Smart rules to eliminate distractions during study sessions and maintain focus.
          </p>
          <div className="text-red-600 font-medium">
            Manage rules →
          </div>
        </Link>

        <Link href="/schedules" className="card hover:scale-105 transition-transform duration-200">
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="text-3xl text-purple-600 mr-4" />
            <h3 className="text-xl font-semibold text-gray-900">Study Schedules</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Flexible scheduling system with customizable time blocks for optimal learning.
          </p>
          <div className="text-purple-600 font-medium">
            Create schedule →
          </div>
        </Link>

        <Link href="/settings" className="card hover:scale-105 transition-transform duration-200">
          <div className="flex items-center mb-4">
            <FaCog className="text-3xl text-gray-600 mr-4" />
            <h3 className="text-xl font-semibold text-gray-900">System Settings</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Administrative controls and platform configuration for personalized learning.
          </p>
          <div className="text-gray-600 font-medium">
            Configure system →
          </div>
        </Link>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Start Learning?
        </h2>
        <p className="text-xl text-primary-100 mb-6 max-w-2xl mx-auto">
          Join thousands of students who are already using StudySphere to enhance their educational journey.
        </p>
        <Link href="/modules" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
          Get Started Today
        </Link>
      </div>
    </div>
  )
}