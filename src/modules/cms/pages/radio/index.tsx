import { Stack, Select, Text,   } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { PageHeader } from "@shared/ui";
import { DataTable, type DataTableColumn } from "@shared/ui";
import { useRadioStore, type RadioStation } from "@modules/cms/model";
import { RadioRowActions, RadioStatusBadge } from "@modules/cms/entities/radio";
 
import { AppButton } from "@shared/components";
import { useNavigate } from "react-router-dom";

export function CmsStreamingRadioPage() {
  const navigate = useNavigate();
  const { stations, loading, fetchStations, deleteStation } = useRadioStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => { fetchStations(); }, [fetchStations]);

  const filtered = stations.filter((s) => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns: DataTableColumn<RadioStation>[] = [
    { key: "name", label: "Station", width: 220, render: (_, row) => <Text size="sm" fw={700}>{row.name}</Text> },
    { key: "genres", label: "Genres", width: 180, render: (_, row) => <Text size="sm" c="dimmed">{row.genres.join(", ")}</Text> },
    { key: "isOnline", label: "Status", width: 110, render: (_, row) => <RadioStatusBadge isOnline={row.isOnline} /> },
    { key: "stream", label: "Stream", width: 300, render: (_, row) => row.streamUrl ? <Text size="xs" c="dimmed" lineClamp={1}>{row.streamUrl}</Text> : <Text size="xs" c="red">No stream</Text> },
  ];

  return (
    <Stack gap="lg">
      <PageHeader title="Streaming Radio" description="Manage radio stations and live streams." actions={<AppButton leftSection={<IconPlus size={16} />} onClick={() => navigate("/cms/streaming/radio/new")}>New Station</AppButton>} />
      <DataTable columns={columns} data={filtered} loading={loading} onSearch={setSearch} searchPlaceholder="Search radio stations..."
        filters={<Select data={[{ value: "all", label: "All" }, { value: "published", label: "Published" }, { value: "draft", label: "Draft" }, { value: "archived", label: "Archived" }]} value={statusFilter} onChange={(v) => setStatusFilter(v ?? "all")} placeholder="Filter" w={160} radius="md" variant="filled" />}
        rowActions={(row) => <RadioRowActions station={row} onDelete={deleteStation} />}
        emptyMessage="No radio stations found" />
    </Stack>
  );
}
