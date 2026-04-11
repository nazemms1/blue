import { Group, Title, Text, type TitleOrder } from '@mantine/core'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  order?: TitleOrder
  actions?: ReactNode
}

export function PageHeader({
  title,
  description,
  order = 2,
  actions,
}: PageHeaderProps) {
  return (
    <Group justify="space-between" align="flex-start" mb="xl">
      <div>
        <Title order={order}>{title}</Title>
        {description && (
          <Text c="dimmed" size="sm" mt={4}>
            {description}
          </Text>
        )}
      </div>
      {actions && <Group>{actions}</Group>}
    </Group>
  )
}
