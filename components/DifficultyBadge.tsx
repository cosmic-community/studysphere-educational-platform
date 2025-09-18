interface DifficultyBadgeProps {
  level: string
}

export default function DifficultyBadge({ level }: DifficultyBadgeProps) {
  const getDifficultyStyle = (difficulty: string) => {
    const normalizedDifficulty = difficulty.toLowerCase()
    
    switch (normalizedDifficulty) {
      case 'beginner':
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'intermediate':
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'advanced':
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyStyle(level)}`}>
      {level}
    </span>
  )
}