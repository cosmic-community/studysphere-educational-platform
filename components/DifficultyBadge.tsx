interface DifficultyBadgeProps {
  level: string
}

export default function DifficultyBadge({ level }: DifficultyBadgeProps) {
  const getBadgeStyles = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'badge bg-green-100 text-green-800'
      case 'intermediate':
        return 'badge bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'badge bg-red-100 text-red-800'
      default:
        return 'badge bg-gray-100 text-gray-800'
    }
  }

  return (
    <span className={getBadgeStyles(level)}>
      {level}
    </span>
  )
}