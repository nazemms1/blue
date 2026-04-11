import { Badge } from '@mantine/core'

type Status = 'active' | 'inactive' | 'draft' | 'published' | 'archived'

const colorMap: Record<Status, string> = {
  active: 'green',
  inactive: 'gray',
  draft: 'yellow',
  published: 'blue',
  archived: 'red',
}

interface StatusBadgeProps {
  status: Status
  label?: string
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <Badge color={colorMap[status]} variant="light">
      {label ?? status}
    </Badge>
  )
}
