interface SubjectBadgeProps {
  subject: string
}

export default function SubjectBadge({ subject }: SubjectBadgeProps) {
  const getBadgeStyles = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'mathematics':
        return 'badge bg-blue-100 text-blue-800'
      case 'science':
        return 'badge bg-purple-100 text-purple-800'
      case 'english':
        return 'badge bg-indigo-100 text-indigo-800'
      case 'history':
        return 'badge bg-orange-100 text-orange-800'
      case 'geography':
        return 'badge bg-teal-100 text-teal-800'
      default:
        return 'badge bg-gray-100 text-gray-800'
    }
  }

  return (
    <span className={getBadgeStyles(subject)}>
      {subject}
    </span>
  )
}