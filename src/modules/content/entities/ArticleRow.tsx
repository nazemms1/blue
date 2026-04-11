import { Badge, Text, Group, ActionIcon } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import type { Article } from '../model/types'
import { formatDate } from '@shared/utils'

interface ArticleRowActionsProps {
  article: Article
  onDelete: (id: string) => void
}

export function ArticleRowActions({ article, onDelete }: ArticleRowActionsProps) {
  const navigate = useNavigate()
  return (
    <Group gap={4} wrap="nowrap">
      <ActionIcon
        variant="subtle"
        size="sm"
        onClick={() => navigate(`/content/articles/${article.id}/edit`)}
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
  draft: 'yellow',
  published: 'green',
  archived: 'gray',
} as const

export function ArticleStatusBadge({ status }: { status: Article['status'] }) {
  return (
    <Badge color={statusColors[status]} variant="light" size="sm">
      {status}
    </Badge>
  )
}

export function ArticleMetaText({ article }: { article: Article }) {
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
