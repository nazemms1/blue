import { Badge, Text, Group, ActionIcon, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash, IconPlayerPlay } from "@tabler/icons-react";
import type { RadioStation } from "@modules/cms/model";
import { formatDate } from "@shared/utils";
import { useNavigate } from "react-router-dom";

interface RadioRowActionsProps {
  station: RadioStation;
  onDelete: (id: string) => void;
}

export function RadioRowActions({ station, onDelete }: RadioRowActionsProps) {
  const navigate = useNavigate();
  return (
    <Group gap={4} wrap="nowrap">
      <Tooltip label="Edit">
        <ActionIcon variant="subtle" size="sm" onClick={() => navigate(`/cms/streaming/radio/${station.id}/edit`)}><IconEdit size={14} /></ActionIcon>
      </Tooltip>
      <Tooltip label="Play">
        <ActionIcon variant="subtle" size="sm" color="green" component="a" href={station.streamUrl} target="_blank">
          <IconPlayerPlay size={14} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Delete">
        <ActionIcon variant="subtle" color="red" size="sm" onClick={() => onDelete(station.id)}>
          <IconTrash size={14} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}

export function RadioStatusBadge({ isOnline }: { isOnline: boolean }) {
  return (
    <Badge color={isOnline ? "green" : "gray"} variant="light" size="sm">
      {isOnline ? "Online" : "Offline"}
    </Badge>
  );
}
