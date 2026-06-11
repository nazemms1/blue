import { Badge, Text, Group, ActionIcon, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash, IconEye } from "@tabler/icons-react";
import type { Channel } from "@modules/cms/model";
import { formatDate } from "@shared/utils";
import { useNavigate } from "react-router-dom";

interface ChannelRowActionsProps {
  channel: Channel;
  onDelete: (id: string) => void;
}

export function ChannelRowActions({ channel, onDelete }: ChannelRowActionsProps) {
  const navigate = useNavigate();
  return (
    <Group gap={4} wrap="nowrap">
      <Tooltip label="Edit">
        <ActionIcon variant="subtle" size="sm" onClick={() => navigate(`/cms/streaming/channels/${channel.id}/edit`)}><IconEdit size={14} /></ActionIcon>
      </Tooltip>
      <Tooltip label="Preview">
        <ActionIcon variant="subtle" size="sm"><IconEye size={14} /></ActionIcon>
      </Tooltip>
      <Tooltip label="Delete">
        <ActionIcon variant="subtle" color="red" size="sm" onClick={() => onDelete(channel.id)}>
          <IconTrash size={14} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}

export function ChannelStatusBadge({ status }: { status: Channel["status"] }) {
  const color = { draft: "yellow", published: "green", archived: "gray" } as const;
  return <Badge color={color[status]} variant="light" size="sm">{status}</Badge>;
}

export function ChannelActiveBadge({ isActive }: { isActive: boolean }) {
  return (
    <Badge color={isActive ? "teal" : "red"} variant="dot" size="sm">
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}
