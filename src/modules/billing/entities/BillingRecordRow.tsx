import { Badge, Text, Group, ActionIcon } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import type { BillingRecord } from '../model/types'
import { formatDate } from '@shared/utils'

interface BillingRecordRowActionsProps {
  article: BillingRecord
  onDelete: (id: string) => void
}

export function BillingRecordRowActions({ article, onDelete }: BillingRecordRowActionsProps) {
  const navigate = useNavigate()
  return (
    <Group gap={4} wrap="nowrap">
      <ActionIcon
        variant="subtle"
        size="sm"
        onClick={() => navigate(`/billing/articles/${article.id}/edit`)}
      >
        <IconEdit size={14} />
      </ActionIcon>
      <ActionIcon
        variant="subtle"
        color="red"
        size="sm"
        onClick={() => onDelete(article.id)}
      >
        <IconTrash size={14} />
      </ActionIcon>
    </Group>
  )
}

const statusColors = {
  pending: 'yellow',
  paid: 'green',
  canceled: 'gray',
} as const

export function BillingRecordStatusBadge({ status }: { status: BillingRecord['status'] }) {
  return (
    <Badge color={statusColors[status]} variant="light" size="sm">
      {status}
    </Badge>
  )
}

export function BillingRecordMetaText({ article }: { article: BillingRecord }) {
  return (
    <Group gap="xs">
      <Text size="xs" c="dimmed">
        {article.category}
      </Text>
      <Text size="xs" c="dimmed">
        ·
      </Text>
      <Text size="xs" c="dimmed">
        {formatDate(article.createdAt)}
      </Text>
    </Group>
  )
}
