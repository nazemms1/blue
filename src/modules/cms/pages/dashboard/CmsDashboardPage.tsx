import { Stack } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { AppButton } from "@shared/components";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { PageHeader } from "@shared/ui";
import { useCmsStore } from "@modules/cms/entities/asset";
import { CmsStatsBar } from "@modules/cms/widgets/asset-stats";
import { CmsGrid } from "@modules/cms/widgets/asset-grid";
import { UploadCmsAsset } from "@modules/cms/features/upload-asset";
import { DeleteCmsAsset } from "@modules/cms/features/delete-asset";

export function CmsDashboardPage() {
  const { items, loading, fetchItems, deleteItem, uploadItem } = useCmsStore();
  const [uploadOpened, { open: openUpload, close: closeUpload }] =
    useDisclosure(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const deleteTarget = items.find((i) => i.id === deleteId);

  return (
    <Stack gap="lg">
      <PageHeader
        title="CMS Library"
        description="Manage all your digital assets"
        actions={
          <AppButton
            leftSection={<IconUpload size={16} />}
            onClick={openUpload}
          >
            Upload
          </AppButton>
        }
      />

      <CmsStatsBar items={items} />

      <CmsGrid
        items={items}
        onDelete={setDeleteId}
        onArchive={(id) => console.info("Archive", id)}
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
  );
}
