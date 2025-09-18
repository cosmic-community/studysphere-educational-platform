interface DifficultyBadgeProps {
  level: string
}

export default function DifficultyBadge({ level }: DifficultyBadgeProps) {
  const getBadgeStyles = (level: string) => {
    const normalizedLevel = level.toLowerCase()
    
    switch (normalizedLevel) {
      case 'easy':
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'medium':
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'hard':
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getBadgeStyles(level)}`}>
      {level}
    </span>
  )
}