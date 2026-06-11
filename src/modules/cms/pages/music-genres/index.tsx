import { Stack, Select, Text, Badge } from "@mantine/core";
import { useEffect, useState } from "react";
import { PageHeader } from "@shared/ui";
import { DataTable, type DataTableColumn } from "@shared/ui";
import { useGenresStore, type CmsGenre } from "@modules/cms/model";

export function CmsMusicGenresPage() {
  const { genres, loading, fetchGenres } = useGenresStore();
  const [search, setSearch] = useState("");

  useEffect(() => { fetchGenres(); }, [fetchGenres]);

  const filtered = genres
    .filter((g) => g.contentType === "music")
    .filter((g) => !search || g.name.toLowerCase().includes(search.toLowerCase()));

  const columns: DataTableColumn<CmsGenre>[] = [
    { key: "name", label: "Genre Name", render: (_, row) => <Text size="sm" fw={600}>{row.name}</Text> },
    { key: "sortOrder", label: "Sort Order", width: 120, render: (_, row) => <Text size="sm">{row.sortOrder}</Text> },
    { key: "contentType", label: "Type", width: 120, render: (_, row) => <Badge size="sm" variant="light" color="violet">{row.contentType}</Badge> },
  ];

  return (
    <Stack gap="lg">
      <PageHeader title="Music Genres" description="Manage music genre categories." />
      <DataTable columns={columns} data={filtered} loading={loading} onSearch={setSearch} searchPlaceholder="Search genres..."
        emptyMessage="No genres found" />
    </Stack>
  );
}
