import { Stack, Select, Text, Box } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { PageHeader } from "@shared/ui";
import { DataTable, type DataTableColumn } from "@shared/ui";
import { usePlaysStore, type Movie } from "@modules/cms/model";
import { MovieRowActions, MovieStatusBadge, MovieRatingBadge, MovieMetaText } from "@modules/cms/entities/movies";
import { AppButton } from "@shared/components";
import { useNavigate } from "react-router-dom";

export function CmsVodPlaysPage() {
  const navigate = useNavigate();
  const { plays, loading, fetchPlays, deletePlay } = usePlaysStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => { fetchPlays(); }, [fetchPlays]);

  const filtered = plays.filter((p) => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns: DataTableColumn<Movie>[] = [
    { key: "title", label: "Play", width: 300, render: (_, row) => (<Box><Text size="md" fw={700} lineClamp={1}>{row.title}</Text><MovieMetaText movie={row} /></Box>) },
    { key: "rating", label: "Rating", width: 100, render: (_, row) => <MovieRatingBadge rating={row.rating} /> },
    { key: "duration", label: "Duration", width: 100, render: (_, row) => <Text size="sm">{Math.floor(row.duration / 60)}h {row.duration % 60}m</Text> },
    { key: "status", label: "Status", width: 110, render: (_, row) => <MovieStatusBadge status={row.status} /> },
  ];

  return (
    <Stack gap="lg">
      <PageHeader title="VOD Plays" description="Manage theatrical plays and stage performances." actions={<AppButton leftSection={<IconPlus size={16} />} onClick={() => navigate("/cms/vod/plays/new")}>New Play</AppButton>} />
      <DataTable columns={columns} data={filtered} loading={loading} onSearch={setSearch} searchPlaceholder="Search plays..."
        filters={<Select data={[{ value: "all", label: "All Statuses" }, { value: "published", label: "Published" }, { value: "draft", label: "Draft" }, { value: "archived", label: "Archived" }]} value={statusFilter} onChange={(v) => setStatusFilter(v ?? "all")} placeholder="Filter Status" w={180} radius="md" variant="filled" />}
        rowActions={(row) => <MovieRowActions movie={row} onDelete={deletePlay} editPath="/cms/vod/plays/" />}
        emptyMessage="No plays found" emptyDescription="Add your first play to get started." />
    </Stack>
  );
}
