import { Stack, Select, Text, Box } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { AppButton } from "@shared/components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@shared/ui";
import { DataTable, type DataTableColumn } from "@shared/ui";
import { useMoviesStore, type Movie } from "@modules/cms/model";
import { MovieRowActions, MovieStatusBadge, MovieRatingBadge, MovieMetaText } from "@modules/cms/entities/movies";

export function CmsVodMoviesPage() {
  const { movies, loading, fetchMovies, deleteMovie } = useMoviesStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => { fetchMovies(); }, [fetchMovies]);

  const filtered = movies.filter((m) => {
    const matchSearch = !search || m.title.toLowerCase().includes(search.toLowerCase()) || m.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns: DataTableColumn<Movie>[] = [
    { key: "title", label: "Title", width: 280, render: (_, row) => (
      <Box>
        <Text size="md" fw={700} lineClamp={1}>{row.title}</Text>
        <MovieMetaText movie={row} />
      </Box>
    )},
    { key: "rating", label: "Rating", width: 100, render: (_, row) => <MovieRatingBadge rating={row.rating} /> },
    { key: "duration", label: "Duration", width: 100, render: (_, row) => <Text size="sm">{Math.floor(row.duration / 60)}h {row.duration % 60}m</Text> },
    { key: "status", label: "Status", width: 110, render: (_, row) => <MovieStatusBadge status={row.status} /> },
  ];

  return (
    <Stack gap="lg">
      <PageHeader
        title="VOD Movies"
        description="Manage movie collections, metadata, and publishing workflows."
        actions={<AppButton leftSection={<IconPlus size={16} />} onClick={() => navigate("/cms/vod/movies/new")}>New Movie</AppButton>}
      />
      <DataTable
        columns={columns} data={filtered} loading={loading}
        onSearch={setSearch} searchPlaceholder="Search movies..."
        filters={
          <Select data={[
            { value: "all", label: "All Statuses" },
            { value: "published", label: "Published" },
            { value: "draft", label: "Draft" },
            { value: "archived", label: "Archived" },
          ]} value={statusFilter} onChange={(v) => setStatusFilter(v ?? "all")} placeholder="Filter Status" w={180} radius="md" variant="filled" />
        }
        rowActions={(row) => <MovieRowActions movie={row} onDelete={deleteMovie} />}
        emptyMessage="No movies found" emptyDescription="Upload your first movie to get started."
      />
    </Stack>
  );
}
