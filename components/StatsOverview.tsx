import { FaBookOpen, FaCheckCircle, FaChartLine, FaCog } from 'react-icons/fa'

interface StatsOverviewProps {
  totalModules: number
  completedModules: number
  totalProgress: number
  activeConfigs: number
}

export default function StatsOverview({ 
  totalModules, 
  completedModules, 
  totalProgress, 
  activeConfigs 
}: StatsOverviewProps) {
  const completionRate = totalProgress > 0 ? Math.round((completedModules / totalProgress) * 100) : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div className="card text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary-100 rounded-full">
            <FaBookOpen className="text-2xl text-primary-600" />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{totalModules}</div>
        <div className="text-gray-600">Learning Modules</div>
      </div>

      <div className="card text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-secondary-100 rounded-full">
            <FaCheckCircle className="text-2xl text-secondary-600" />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{completedModules}</div>
        <div className="text-gray-600">Completed</div>
      </div>

      <div className="card text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-accent-100 rounded-full">
            <FaChartLine className="text-2xl text-accent-600" />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{completionRate}%</div>
        <div className="text-gray-600">Success Rate</div>
      </div>

      <div className="card text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <FaCog className="text-2xl text-purple-600" />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{activeConfigs}</div>
        <div className="text-gray-600">Active Settings</div>
      </div>
    </div>
  )
}