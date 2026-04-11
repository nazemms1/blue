import { Stack, Text, ThemeIcon } from '@mantine/core'
import { IconInbox } from '@tabler/icons-react'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

export function EmptyState({
  title = 'No items found',
  description = 'There is nothing here yet.',
  icon,
  action,
}: EmptyStateProps) {
  return (
    <Stack align="center" gap="md" py="xl">
      <ThemeIcon size={56} radius="xl" variant="light" color="gray">
        {icon ?? <IconInbox size={28} />}
      </ThemeIcon>
      <Stack align="center" gap={4}>
        <Text fw={500}>{title}</Text>
        <Text size="sm" c="dimmed">
          {description}
        </Text>
      </Stack>
      {action}
    </Stack>
  )
}
