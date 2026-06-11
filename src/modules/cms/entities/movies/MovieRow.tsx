import { Badge, Text, Group, ActionIcon, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash, IconStar } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "@modules/cms/model";
import { formatDate } from "@shared/utils";

interface MovieRowActionsProps {
  movie: Movie;
  onDelete: (id: string) => void;
  editPath?: string;
}

export function MovieRowActions({ movie, onDelete, editPath = "/cms/vod/movies/" }: MovieRowActionsProps) {
  const navigate = useNavigate();
  return (
    <Group gap={4} wrap="nowrap">
      <Tooltip label="Edit">
        <ActionIcon variant="subtle" size="sm" onClick={() => navigate(`${editPath}${movie.id}/edit`)}>
          <IconEdit size={14} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Delete">
        <ActionIcon variant="subtle" color="red" size="sm" onClick={() => onDelete(movie.id)}>
          <IconTrash size={14} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}

export function MovieStatusBadge({ status }: { status: Movie["status"] }) {
  const color = { draft: "yellow", published: "green", archived: "gray" } as const;
  return <Badge color={color[status]} variant="light" size="sm">{status}</Badge>;
}

export function MovieRatingBadge({ rating }: { rating: number }) {
  return (
    <Group gap={4}>
      <IconStar size={12} color="var(--mantine-color-yellow-6)" />
      <Text size="sm" fw={600}>{rating.toFixed(1)}</Text>
    </Group>
  );
}

export function MovieMetaText({ movie }: { movie: Movie }) {
  return (
    <Group gap="xs">
      <Text size="xs" c="dimmed">{movie.genres.join(", ")}</Text>
      <Text size="xs" c="dimmed">·</Text>
      <Text size="xs" c="dimmed">{formatDate(movie.releaseDate)}</Text>
    </Group>
  );
}
