import { FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa'
import type { ProgressRecord } from '@/types'

interface RecentProgressProps {
  progressRecords: ProgressRecord[]
}

export default function RecentProgress({ progressRecords }: RecentProgressProps) {
  if (!progressRecords || progressRecords.length === 0) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Progress</h2>
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <FaClock className="text-4xl mx-auto" />
          </div>
          <p className="text-gray-600">No progress records found</p>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500" />
      case 'in_progress':
        return <FaClock className="text-yellow-500" />
      default:
        return <FaExclamationCircle className="text-red-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-red-600 bg-red-100'
    }
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Progress</h2>
      <div className="space-y-4">
        {progressRecords.map((record) => (
          <div key={record.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {record.metadata?.learning_module?.title || 'Unknown Module'}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  {getStatusIcon(record.metadata?.completion_status?.key || '')}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.metadata?.completion_status?.key || '')}`}>
                    {record.metadata?.completion_status?.value || 'Unknown'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {record.metadata?.quiz_score && (
                    <div className="mb-1">
                      Score: {record.metadata.quiz_score}% 
                      {record.metadata?.pass_mark_achieved ? (
                        <span className="text-green-600 ml-1">✓ Passed</span>
                      ) : (
                        <span className="text-red-600 ml-1">✗ Failed</span>
                      )}
                    </div>
                  )}
                  {record.metadata?.time_spent_minutes && (
                    <div className="mb-1">
                      Time spent: {record.metadata.time_spent_minutes} minutes
                    </div>
                  )}
                  {record.metadata?.attempts_count && (
                    <div>
                      Attempts: {record.metadata.attempts_count}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {record.metadata?.notes && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-600">{record.metadata.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}