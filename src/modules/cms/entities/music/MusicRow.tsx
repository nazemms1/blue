import {   Text, Group, ActionIcon, Tooltip,   } from "@mantine/core";
import { IconEdit, IconTrash,   } from "@tabler/icons-react";
import type { Singer,   } from "@modules/cms/model";
 import { useNavigate } from "react-router-dom";

interface SingerRowActionsProps {
  singer: Singer;
  onDelete: (id: string) => void;
}

export function SingerRowActions({ singer, onDelete }: SingerRowActionsProps) {
  const navigate = useNavigate();
  return (
    <Group gap={4} wrap="nowrap">
      <Tooltip label="Edit"><ActionIcon variant="subtle" size="sm" onClick={() => navigate(`/cms/music/singers/${singer.id}/edit`)}><IconEdit size={14} /></ActionIcon></Tooltip>
      <Tooltip label="Delete">
        <ActionIcon variant="subtle" color="red" size="sm" onClick={() => onDelete(singer.id)}>
          <IconTrash size={14} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}

export function SingerMetaText({ singer }: { singer: Singer }) {
  const totalSongs = singer.albums.reduce((acc, a) => acc + a.songs.length, 0);
  return (
    <Group gap="xs">
      <Text size="xs" c="dimmed">{singer.albums.length} albums</Text>
      <Text size="xs" c="dimmed">·</Text>
      <Text size="xs" c="dimmed">{totalSongs} songs</Text>
    </Group>
  );
}

interface SongRowActionsProps {
  songId: string;
  onDelete: () => void;
}

export function SongRowActions({ songId, onDelete }: SongRowActionsProps) {
  const navigate = useNavigate();
  return (
    <Group gap={4} wrap="nowrap">
      <Tooltip label="Edit"><ActionIcon variant="subtle" size="sm" onClick={() => navigate(`/cms/music/songs/${songId}/edit`)}><IconEdit size={14} /></ActionIcon></Tooltip>
      <Tooltip label="Delete">
        <ActionIcon variant="subtle" color="red" size="sm" onClick={onDelete}><IconTrash size={14} /></ActionIcon>
      </Tooltip>
    </Group>
  );
}
