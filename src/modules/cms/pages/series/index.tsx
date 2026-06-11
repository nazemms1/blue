import { Stack, Select, Text, Box, Group, Badge } from "@mantine/core";
import { IconStar, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { PageHeader } from "@shared/ui";
import { DataTable, type DataTableColumn } from "@shared/ui";
import { useSeriesStore, type Series } from "@modules/cms/model";
import { SeriesRowActions, SeriesStatusBadge, SeriesMetaText } from "@modules/cms/entities/series";
import { AppButton } from "@shared/components";
import { useNavigate } from "react-router-dom";

export function CmsVodSeriesPage() {
  const navigate = useNavigate();
  const { seriesList, loading, fetchSeries, deleteSeries } = useSeriesStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => { fetchSeries(); }, [fetchSeries]);

  const filtered = seriesList.filter((s) => {
    const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns: DataTableColumn<Series>[] = [
    { key: "title", label: "Series", width: 300, render: (_, row) => (
      <Box>
        <Text size="md" fw={700} lineClamp={1}>{row.title}</Text>
        <SeriesMetaText series={row} />
      </Box>
    )},
    { key: "genres", label: "Genres", width: 160, render: (_, row) => (
      <Group gap={4}>{row.genres.map((g) => <Badge key={g} size="xs" variant="light">{g}</Badge>)}</Group>
    )},
    { key: "rating", label: "Rating", width: 90, render: (_, row) => (
      <Group gap={4}><IconStar size={12} color="var(--mantine-color-yellow-6)" /><Text size="sm" fw={600}>{row.rating.toFixed(1)}</Text></Group>
    )},
    { key: "status", label: "Status", width: 110, render: (_, row) => <SeriesStatusBadge status={row.status} /> },
  ];

  return (
    <Stack gap="lg">
      <PageHeader title="VOD Series" description="Manage series with seasons and episodes." actions={<AppButton leftSection={<IconPlus size={16} />} onClick={() => navigate("/cms/vod/series/new")}>New Series</AppButton>} />
      <DataTable
        columns={columns} data={filtered} loading={loading}
        onSearch={setSearch} searchPlaceholder="Search series..."
        filters={
          <Select data={[
            { value: "all", label: "All Statuses" },
            { value: "published", label: "Published" },
            { value: "draft", label: "Draft" },
            { value: "archived", label: "Archived" },
          ]} value={statusFilter} onChange={(v) => setStatusFilter(v ?? "all")} placeholder="Filter Status" w={180} radius="md" variant="filled" />
        }
        rowActions={(row) => <SeriesRowActions series={row} onDelete={deleteSeries} />}
        emptyMessage="No series found" emptyDescription="Add your first series to get started."
      />
    </Stack>
  );
}
