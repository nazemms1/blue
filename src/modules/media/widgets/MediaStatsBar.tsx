import { SimpleGrid } from '@mantine/core'
import { IconPhoto, IconVideo, IconFile, IconDatabase } from '@tabler/icons-react'
import type { MediaItem } from '../model/types'
import { AppCard } from '@shared/components'

interface MediaStatsBarProps {
  items: MediaItem[]
}

function formatBytes(bytes: number): string {
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(1)} MB`
  return `${(bytes / 1073741824).toFixed(1)} GB`
}

export function MediaStatsBar({ items }: MediaStatsBarProps) {
  const images = items.filter((i) => i.type === 'image').length
  const videos = items.filter((i) => i.type === 'video').length
  const docs = items.filter((i) => i.type === 'document').length
  const totalSize = items.reduce((acc, i) => acc + i.size, 0)

  const stats = [
    { label: 'Images', value: images, icon: <IconPhoto size={20} />, color: 'blue' },
    { label: 'Videos', value: videos, icon: <IconVideo size={20} />, color: 'violet' },
    { label: 'Documents', value: docs, icon: <IconFile size={20} />, color: 'orange' },
    { label: 'Total size', value: formatBytes(totalSize), icon: <IconDatabase size={20} />, color: 'green' },
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
