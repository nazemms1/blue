import { Stack, Text,   } from "@mantine/core";
import { useEffect, useState } from "react";
import { PageHeader } from "@shared/ui";
import { DataTable, type DataTableColumn } from "@shared/ui";
import { useMusicStore } from "@modules/cms/model";
import { SongRowActions } from "@modules/cms/entities/music";
 
interface SongRow {
  id: string;
  title: string;
  singerName: string;
  albumTitle: string;
  duration: number;
  plays: number;
  genres: string[];
  status: string;
  createdAt: string;
}

export function CmsMusicSongsPage() {
  const { allSongs, loading, fetchSingers } = useMusicStore();
  const [search, setSearch] = useState("");

  useEffect(() => { fetchSingers(); }, [fetchSingers]);

  const filtered = allSongs.filter((s) =>
    !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.singerName.toLowerCase().includes(search.toLowerCase())
  );

  const columns: DataTableColumn<SongRow>[] = [
    { key: "title", label: "Song", width: 220, render: (_, row) => <Text size="sm" fw={600}>{row.title}</Text> },
    { key: "singerName", label: "Singer", width: 160, render: (_, row) => <Text size="sm">{row.singerName}</Text> },
    { key: "albumTitle", label: "Album", width: 160, render: (_, row) => <Text size="sm" c="dimmed">{row.albumTitle}</Text> },
    { key: "duration", label: "Duration", width: 100, render: (_, row) => <Text size="sm">{Math.floor(row.duration / 60)}:{String(row.duration % 60).padStart(2, "0")}</Text> },
    { key: "plays", label: "Plays", width: 100, render: (_, row) => <Text size="sm">{(row.plays / 1000).toFixed(0)}K</Text> },
  ];

  return (
    <Stack gap="lg">
      <PageHeader title="Music Songs" description="Manage all songs across singers and albums." />
      <DataTable columns={columns} data={filtered} loading={loading} onSearch={setSearch} searchPlaceholder="Search songs or singers..."
        rowActions={(row) => <SongRowActions songId={row.id} onDelete={() => {}} />}
        emptyMessage="No songs found" emptyDescription="Upload your first song." />
    </Stack>
  );
}
