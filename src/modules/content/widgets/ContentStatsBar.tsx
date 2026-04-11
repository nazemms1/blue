import { SimpleGrid } from '@mantine/core'
import { IconFileText, IconChecks, IconPencil, IconArchive } from '@tabler/icons-react'
import type { Article } from '../model/types'
import { AppCard } from '@shared/components'

interface ContentStatsBarProps {
  articles: Article[]
}

export function ContentStatsBar({ articles }: ContentStatsBarProps) {
  const published = articles.filter((a) => a.status === 'published').length
  const drafts = articles.filter((a) => a.status === 'draft').length
  const archived = articles.filter((a) => a.status === 'archived').length

  const stats = [
    { label: 'Total', value: articles.length, icon: <IconFileText size={20} />, color: 'blue' },
    { label: 'Published', value: published, icon: <IconChecks size={20} />, color: 'green' },
    { label: 'Drafts', value: drafts, icon: <IconPencil size={20} />, color: 'yellow' },
    { label: 'Archived', value: archived, icon: <IconArchive size={20} />, color: 'gray' },
  ]

  return (
    <SimpleGrid cols={{ base: 2, sm: 4 }} mb="xl">
      {stats.map((stat) => (
        <AppCard.Stat
          key={stat.label}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </SimpleGrid>
  )
}
