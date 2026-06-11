import { Stack, Select, Text, Box, Group, Avatar } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { PageHeader } from "@shared/ui";
import { DataTable, type DataTableColumn } from "@shared/ui";
import { useMusicStore, type Singer } from "@modules/cms/model";
import { SingerRowActions, SingerMetaText } from "@modules/cms/entities/music";
import { AppButton } from "@shared/components";
import { useNavigate } from "react-router-dom";

export function CmsMusicSingersPage() {
  const navigate = useNavigate();
  const { singers, loading, fetchSingers, deleteSinger } = useMusicStore();
  const [search, setSearch] = useState("");

  useEffect(() => { fetchSingers(); }, [fetchSingers]);

  const filtered = singers.filter((s) => !search || s.name.toLowerCase().includes(search.toLowerCase()));

  const columns: DataTableColumn<Singer>[] = [
    { key: "name", label: "Singer", width: 280, render: (_, row) => (
      <Group gap="sm">
        <Avatar src={row.imageUrl} size={36} radius="xl" />
        <Box><Text size="sm" fw={700}>{row.name}</Text><SingerMetaText singer={row} /></Box>
      </Group>
    )},
    { key: "genres", label: "Genres", width: 160, render: (_, row) => <Text size="sm">{row.genres.join(", ")}</Text> },
  ];

  return (
    <Stack gap="lg">
      <PageHeader title="Music Singers" description="Manage singers and their discographies." actions={<AppButton leftSection={<IconPlus size={16} />} onClick={() => navigate("/cms/music/singers/new")}>New Singer</AppButton>} />
      <DataTable columns={columns} data={filtered} loading={loading} onSearch={setSearch} searchPlaceholder="Search singers..."
        rowActions={(row) => <SingerRowActions singer={row} onDelete={deleteSinger} />}
        emptyMessage="No singers found" emptyDescription="Add your first singer." />
    </Stack>
  );
}
