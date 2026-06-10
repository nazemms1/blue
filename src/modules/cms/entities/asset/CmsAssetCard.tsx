import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  ActionIcon,
  Menu,
  Stack,
  Tooltip,
} from "@mantine/core";
import {
  IconDotsVertical,
  IconTrash,
  IconArchive,
  IconDownload,
} from "@tabler/icons-react";
import type { CmsItem } from "./model/types";
import { StatusBadge } from "@shared/ui";

interface CmsAssetCardProps {
  item: CmsItem;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

export function CmsAssetCard({ item, onDelete, onArchive }: CmsAssetCardProps) {
  return (
    <Card shadow="sm" p="sm" radius="md" withBorder>
      <Card.Section>
        <Image
          src={item.thumbnailUrl ?? item.url}
          height={140}
          alt={item.name}
          fallbackSrc="https://placehold.co/400x140?text=No+Preview"
        />
      </Card.Section>

      <Stack gap={6} mt="sm">
        <Group justify="space-between" align="flex-start" gap={4}>
          <Text fw={500} size="sm" lineClamp={1} style={{ flex: 1 }}>
            {item.name}
          </Text>
          <Menu shadow="md" width={160} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="subtle" size="sm" color="gray">
                <IconDotsVertical size={14} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconDownload size={14} />}
                component="a"
                href={item.url}
                target="_blank"
              >
                Download
              </Menu.Item>
              {onArchive && (
                <Menu.Item
                  leftSection={<IconArchive size={14} />}
                  onClick={() => onArchive(item.id)}
                >
                  Archive
                </Menu.Item>
              )}
              {onDelete && (
                <Menu.Item
                  leftSection={<IconTrash size={14} />}
                  color="red"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Group gap={6} wrap="nowrap">
          <Badge size="xs" variant="outline" color="gray">
            {item.type}
          </Badge>
          <Tooltip label={item.filename}>
            <Text size="xs" c="dimmed" lineClamp={1}>
              {formatBytes(item.size)}
            </Text>
          </Tooltip>
          <StatusBadge status={item.status} />
        </Group>
      </Stack>
    </Card>
  );
}
