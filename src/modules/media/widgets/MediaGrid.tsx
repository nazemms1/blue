import { SimpleGrid, Group, Select } from '@mantine/core'
import { useState } from 'react'
import type { MediaItem, MediaType } from '../model/types'
import { MediaCard } from '../entities/MediaCard'
import { SearchInput } from '@shared/components'
import { EmptyState } from '@shared/ui'
import { IconPhoto } from '@tabler/icons-react'

interface MediaGridProps {
  items: MediaItem[]
  onDelete?: (id: string) => void
  onArchive?: (id: string) => void
}

const TYPE_OPTIONS = [
  { value: '', label: 'All types' },
  { value: 'image', label: 'Images' },
  { value: 'video', label: 'Videos' },
  { value: 'audio', label: 'Audio' },
  { value: 'document', label: 'Documents' },
]

export function MediaGrid({ items, onDelete, onArchive }: MediaGridProps) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('')

  const filtered = items.filter((item) => {
    const matchesSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.filename.toLowerCase().includes(search.toLowerCase())
    const matchesType = !typeFilter || item.type === (typeFilter as MediaType)
    return matchesSearch && matchesType
  })

  return (
    <div>
      <Group mb="md" gap="sm">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search media…"
        />
        <Select
          data={TYPE_OPTIONS}
          value={typeFilter}
          onChange={(v) => setTypeFilter(v ?? '')}
          placeholder="All types"
          w={140}
          clearable
        />
      </Group>

      {filtered.length === 0 ? (
        <EmptyState
          title="No media found"
          description={search ? 'Try a different search term.' : 'Upload your first asset to get started.'}
          icon={<IconPhoto size={28} />}
        />
      ) : (
        <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4 }} spacing="md">
          {filtered.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              onDelete={onDelete}
              onArchive={onArchive}
            />
          ))}
        </SimpleGrid>
      )}
    </div>
  )
}
