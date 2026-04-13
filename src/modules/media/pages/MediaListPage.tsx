import { Stack, ActionIcon, Group, Text, Badge } from '@mantine/core'
import { IconUpload, IconTrash, IconPhoto } from '@tabler/icons-react'
import { AppButton } from '@shared/components'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { PageHeader } from '@shared/ui'
import { DataTable, type DataTableColumn } from '@shared/ui'
import { useMediaStore } from '../model/store'
import { UploadMedia } from '../features/UploadMedia'
import { DeleteMedia } from '../features/DeleteMedia'
import type { MediaItem } from '../model/types'
import { formatDate } from '@shared/utils'

function formatBytes(bytes: number): string {
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

export function MediaListPage() {
  const { items, loading, fetchItems, deleteItem, uploadItem } = useMediaStore()
  const [uploadOpened, { open: openUpload, close: closeUpload }] = useDisclosure(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const deleteTarget = items.find((i) => i.id === deleteId)

  const filteredItems = items.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase())
  )

  const columns: DataTableColumn<MediaItem>[] = [
    {
      key: 'name',
      label: 'Asset Name',
      render: (_, row) => (
        <Group gap="xs">
          <IconPhoto size={18} color="rgba(0,0,0,0.3)"/>
          <Text size="sm" fw={700}>{row.name}</Text>
        </Group>
      ),
    },
    {
      key: 'type',
      label: 'Format',
      render: (val) => <Badge variant="light" size="sm" radius="md">{val}</Badge>,
      width: 120,
    },
    {
      key: 'size',
      label: 'File Size',
      render: (val) => <Text size="sm" fw={600} c="dimmed">{formatBytes(val)}</Text>,
      width: 120,
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => (
        <Badge color={val === 'active' ? 'green' : 'gray'} variant="filled" size="sm" radius="md">
          {val}
        </Badge>
      ),
      width: 120,
    },
    {
      key: 'createdAt',
      label: 'Added Date',
      render: (val) => <Text size="sm" c="dimmed">{formatDate(val)}</Text>,
      width: 140,
    },
  ]

  return (
    <Stack gap="lg">
      <PageHeader
        title="Media Library"
        description="View and manage all uploaded digital assets"
        actions={
          <AppButton leftSection={<IconUpload size={16} />} onClick={openUpload}>
            Upload Asset
          </AppButton>
        }
      />

      <DataTable
        columns={columns}
        data={filteredItems}
        loading={loading}
        onSearch={setSearch}
        searchPlaceholder="Find asset by name..."
        rowActions={(row) => (
          <ActionIcon
            variant="subtle"
            color="red"
            size="md"
            onClick={() => setDeleteId(row.id)}
          >
            <IconTrash size={18} />
          </ActionIcon>
        )}
        emptyMessage="Library is empty"
        emptyDescription="Start by uploading your first media file"
      />

      <UploadMedia
        opened={uploadOpened}
        onClose={closeUpload}
        onUpload={uploadItem}
      />

      <DeleteMedia
        itemId={deleteId}
        itemName={deleteTarget?.name}
        onClose={() => setDeleteId(null)}
        onDelete={deleteItem}
      />
    </Stack>
  )
}
