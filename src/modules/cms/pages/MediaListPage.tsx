import { Stack, ActionIcon, Group, Text, Badge } from "@mantine/core";
import { IconUpload, IconTrash, IconPhoto } from "@tabler/icons-react";
import { AppButton } from "@shared/components";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { PageHeader } from "@shared/ui";
import { DataTable, type Column } from "@shared/components";
import { useCmsStore } from "../model/store";
import { UploadCmsAsset } from "../features/UploadCmsAsset";
import { DeleteCmsAsset } from "../features/DeleteCmsAsset";
import type { CmsItem } from "../model/types";
import { formatDate } from "@shared/utils";

function formatBytes(bytes: number): string {
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

export function MediaListPage() {
  const { items, loading, fetchItems, deleteItem, uploadItem } = useCmsStore();
  const [uploadOpened, { open: openUpload, close: closeUpload }] =
    useDisclosure(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const deleteTarget = items.find((i) => i.id === deleteId);

  const columns: Column<CmsItem>[] = [
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <Group gap="xs">
          <IconPhoto size={16} />
          <Text size="sm">{row.name}</Text>
        </Group>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (row) => (
        <Badge variant="light" size="sm">
          {row.type}
        </Badge>
      ),
      width: 100,
    },
    {
      key: "size",
      header: "Size",
      render: (row) => <Text size="sm">{formatBytes(row.size)}</Text>,
      width: 100,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge
          color={row.status === "active" ? "green" : "gray"}
          variant="light"
          size="sm"
        >
          {row.status}
        </Badge>
      ),
      width: 100,
    },
    {
      key: "createdAt",
      header: "Uploaded",
      render: (row) => <Text size="sm">{formatDate(row.createdAt)}</Text>,
      width: 120,
    },
    {
      key: "actions",
      header: "",
      render: (row) => (
        <ActionIcon
          variant="subtle"
          color="red"
          size="sm"
          onClick={() => setDeleteId(row.id)}
        >
          <IconTrash size={14} />
        </ActionIcon>
      ),
      width: 48,
    },
  ];

  return (
    <Stack gap="lg">
      <PageHeader
        title="Media Library — List"
        description="Tabular view of all media assets"
        actions={
          <AppButton
            leftSection={<IconUpload size={16} />}
            onClick={openUpload}
          >
            Upload
          </AppButton>
        }
      />

      <DataTable
        columns={columns}
        data={items}
        rowKey="id"
        loading={loading}
        emptyMessage="No media assets uploaded yet."
      />

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
