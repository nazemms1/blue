import { Badge, Text, Group, ActionIcon, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash,   } from "@tabler/icons-react";
import type { Series } from "@modules/cms/model";
import { formatDate } from "@shared/utils";
import { useNavigate } from "react-router-dom";

interface SeriesRowActionsProps {
  series: Series;
  onDelete: (id: string) => void;
  editPath?: string;
}

export function SeriesRowActions({ series, onDelete, editPath = "/cms/vod/series/" }: SeriesRowActionsProps) {
  const navigate = useNavigate();
  return (
    <Group gap={4} wrap="nowrap">
      <Tooltip label="Edit">
        <ActionIcon variant="subtle" size="sm" onClick={() => navigate(`${editPath}${series.id}/edit`)}><IconEdit size={14} /></ActionIcon>
      </Tooltip>
      <Tooltip label="Delete">
        <ActionIcon variant="subtle" color="red" size="sm" onClick={() => onDelete(series.id)}>
          <IconTrash size={14} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}

export function SeriesStatusBadge({ status }: { status: Series["status"] }) {
  const color = { draft: "yellow", published: "green", archived: "gray" } as const;
  return <Badge color={color[status]} variant="light" size="sm">{status}</Badge>;
}

export function SeriesMetaText({ series }: { series: Series }) {
  const totalEpisodes = series.seasons.reduce((acc, s) => acc + s.episodes.length, 0);
  return (
    <Group gap="xs">
      <Text size="xs" c="dimmed">{series.seasons.length} seasons</Text>
      <Text size="xs" c="dimmed">·</Text>
      <Text size="xs" c="dimmed">{totalEpisodes} episodes</Text>
      <Text size="xs" c="dimmed">·</Text>
      <Text size="xs" c="dimmed">{formatDate(series.createdAt)}</Text>
    </Group>
  );
}
