import { Stack } from '@mantine/core'
import { IconUpload } from '@tabler/icons-react'
import { AppButton } from '@shared/components'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { PageHeader } from '@shared/ui'
import { useMediaStore } from '../model/store'
import { MediaStatsBar } from '../widgets/MediaStatsBar'
import { MediaGrid } from '../widgets/MediaGrid'
import { UploadMedia } from '../features/UploadMedia'
import { DeleteMedia } from '../features/DeleteMedia'

export function MediaDashboardPage() {
  const { items, loading, fetchItems, deleteItem, uploadItem } = useMediaStore()
  const [uploadOpened, { open: openUpload, close: closeUpload }] = useDisclosure(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const deleteTarget = items.find((i) => i.id === deleteId)

  return (
    <Stack gap="lg">
      <PageHeader
        title="Media Library"
        description="Manage all your digital assets"
        actions={
          <AppButton leftSection={<IconUpload size={16} />} onClick={openUpload}>
            Upload
          </AppButton>
        }
      />

      <MediaStatsBar items={items} />

      <MediaGrid
        items={items}
        onDelete={setDeleteId}
        onArchive={(id) => console.info('Archive', id)}
      />

      {loading && null}

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
