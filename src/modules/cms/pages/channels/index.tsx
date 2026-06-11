import { Stack, Select, Text,  Group, Avatar } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { PageHeader } from "@shared/ui";
import { DataTable, type DataTableColumn } from "@shared/ui";
import { useChannelsStore, type Channel } from "@modules/cms/model";
import { ChannelRowActions, ChannelStatusBadge, ChannelActiveBadge } from "@modules/cms/entities/channels";
import { AppButton } from "@shared/components";
import { useNavigate } from "react-router-dom";

export function CmsStreamingChannelsPage() {
  const navigate = useNavigate();
  const { channels, loading, fetchChannels, deleteChannel } = useChannelsStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => { fetchChannels(); }, [fetchChannels]);

  const filtered = channels.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns: DataTableColumn<Channel>[] = [
    { key: "name", label: "Channel", width: 220, render: (_, row) => (
      <Group gap="sm">
        {row.logoUrl ? <Avatar src={row.logoUrl} size={28} /> : null}
        <Text size="sm" fw={700}>{row.name}</Text>
      </Group>
    )},
    { key: "categoryName", label: "Category", width: 140, render: (_, row) => <Text size="sm" c="dimmed">{row.categoryName}</Text> },
    { key: "isActive", label: "Active", width: 100, render: (_, row) => <ChannelActiveBadge isActive={row.isActive} /> },
    { key: "status", label: "Status", width: 110, render: (_, row) => <ChannelStatusBadge status={row.status} /> },
  ];

  return (
    <Stack gap="lg">
      <PageHeader title="Streaming Channels" description="Manage TV channels and live streams." actions={<AppButton leftSection={<IconPlus size={16} />} onClick={() => navigate("/cms/streaming/channels/new")}>New Channel</AppButton>} />
      <DataTable columns={columns} data={filtered} loading={loading} onSearch={setSearch} searchPlaceholder="Search channels..."
        filters={<Select data={[{ value: "all", label: "All" }, { value: "published", label: "Published" }, { value: "draft", label: "Draft" }, { value: "archived", label: "Archived" }]} value={statusFilter} onChange={(v) => setStatusFilter(v ?? "all")} placeholder="Filter" w={160} radius="md" variant="filled" />}
        rowActions={(row) => <ChannelRowActions channel={row} onDelete={deleteChannel} />}
        emptyMessage="No channels found" />
    </Stack>
  );
}
