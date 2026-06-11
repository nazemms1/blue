import { Stack, Select, Text, Box, Badge, Group } from "@mantine/core";
import { IconAd, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { PageHeader } from "@shared/ui";
import { DataTable, type DataTableColumn } from "@shared/ui";
import { useAdsStore, type Ad } from "@modules/cms/model";
import { formatDate } from "@shared/utils";
import { AppButton } from "@shared/components";
import { useNavigate } from "react-router-dom";

const placementColors: Record<string, string> = {
  banner: "blue", sidebar: "violet", popup: "orange", "video-pre-roll": "cyan", "video-mid-roll": "pink",
};

export function CmsAdsPage() {
  const navigate = useNavigate();
  const { ads, loading, fetchAds, deleteAd } = useAdsStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => { fetchAds(); }, [fetchAds]);

  const filtered = ads.filter((a) => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns: DataTableColumn<Ad>[] = [
    { key: "title", label: "Campaign", width: 220, render: (_, row) => <Text size="sm" fw={700}>{row.title}</Text> },
    { key: "placement", label: "Placement", width: 140, render: (_, row) => <Badge size="sm" color={placementColors[row.placement]} variant="light">{row.placement}</Badge> },
    { key: "impressions", label: "Impressions", width: 120, render: (_, row) => <Text size="sm">{row.impressions.toLocaleString()}</Text> },
    { key: "clicks", label: "Clicks", width: 100, render: (_, row) => <Text size="sm">{row.clicks.toLocaleString()}</Text> },
    { key: "startDate", label: "Period", width: 180, render: (_, row) => <Text size="xs" c="dimmed">{formatDate(row.startDate)} — {formatDate(row.endDate)}</Text> },
    { key: "status", label: "Status", width: 100, render: (_, row) => {
      const c = { active: "green", paused: "yellow", expired: "gray" } as const;
      return <Badge color={c[row.status]} variant="light" size="sm">{row.status}</Badge>;
    }},
  ];

  return (
    <Stack gap="lg">
      <PageHeader title="Ad Campaigns" description="Manage ad placements, campaigns, and schedules." actions={<AppButton leftSection={<IconPlus size={16} />} onClick={() => navigate("/cms/ads/new")}>New Campaign</AppButton>} />
      <DataTable columns={columns} data={filtered} loading={loading} onSearch={setSearch} searchPlaceholder="Search campaigns..."
        filters={<Select data={[{ value: "all", label: "All" }, { value: "active", label: "Active" }, { value: "paused", label: "Paused" }, { value: "expired", label: "Expired" }]} value={statusFilter} onChange={(v) => setStatusFilter(v ?? "all")} placeholder="Filter Status" w={160} radius="md" variant="filled" />}
        rowActions={(row) => (
          <Group gap={4} wrap="nowrap">
            <Badge color={placementColors[row.placement]} size="sm">{row.placement}</Badge>
          </Group>
        )}
        emptyMessage="No campaigns found" emptyDescription="Create your first ad campaign." />
    </Stack>
  );
}
