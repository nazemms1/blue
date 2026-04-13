import { Stack } from '@mantine/core'
import { IconUpload } from '@tabler/icons-react'
import { AppButton } from '@shared/components'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { PageHeader } from '@shared/ui'
import { useCmsStore } from "../model/store";
import { CmsStatsBar } from "../widgets/CmsStatsBar";
import { CmsGrid } from "../widgets/CmsGrid";
import { UploadCmsAsset } from "../features/UploadCmsAsset";
import { DeleteCmsAsset } from "../features/DeleteCmsAsset";

export function CmsDashboardPage() {
  const { items, loading, fetchItems, deleteItem, uploadItem } = useCmsStore()
  const [uploadOpened, { open: openUpload, close: closeUpload }] = useDisclosure(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const deleteTarget = items.find((i) => i.id === deleteId)

  return (
    <Stack gap="lg">
      <PageHeader
        title="CMS Library"
        description="Manage all your digital assets"
        actions={
          <AppButton leftSection={<IconUpload size={16} />} onClick={openUpload}>
            Upload
          </AppButton>
        }
      />

      <CmsStatsBar items={items} />

      <CmsGrid
        items={items}
        onDelete={setDeleteId}
        onArchive={(id) => console.info('Archive', id)}
      />

      {loading && null}

      <UploadCmsAsset
        opened={uploadOpened}
        onClose={closeUpload}
        onUpload={uploadItem}
      />

      <DeleteCmsAsset
        itemId={deleteId}
        itemName={deleteTarget?.name}
        onClose={() => setDeleteId(null)}
        onDelete={deleteItem}
      />
    </Stack>
  )
}
