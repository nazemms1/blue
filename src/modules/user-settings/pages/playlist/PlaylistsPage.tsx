import { SimpleGrid, Group, Text, Stack, Switch, ThemeIcon, Box, Badge } from "@mantine/core";
import {
  IconPlus,
  IconLock,
  IconLockOpen,
  IconMusic,
  IconGuitarPick,
  IconPiano,
  IconSnowflake,
  IconBarbell,
  IconVinyl,
  IconMicrophone,
  IconDrone,
  IconCategory,
} from "@tabler/icons-react";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { PageHeader } from "@shared/ui";
import { usePlaylistStore, type PlaylistCategory } from "@modules/user-settings/model";
import { AppButton, AppCard } from "@shared/components";
import { useNavigate } from "react-router-dom";
import type { MantineColor } from "@mantine/core";

const CATEGORY_STYLE: Record<string, { icon: React.ElementType; color: MantineColor }> = {
  Pop: { icon: IconMusic, color: "pink" },
  Rock: { icon: IconGuitarPick, color: "red" },
  Jazz: { icon: IconPiano, color: "yellow" },
  Chill: { icon: IconSnowflake, color: "cyan" },
  Workout: { icon: IconBarbell, color: "orange" },
  Classical: { icon: IconVinyl, color: "grape" },
  "Hip Hop": { icon: IconMicrophone, color: "violet" },
  Traditional: { icon: IconDrone, color: "teal" },
};

function getCategoryStyle(name: string) {
  return CATEGORY_STYLE[name] ?? { icon: IconCategory, color: "blue" as MantineColor };
}

export function PlaylistsPage() {
  const navigate = useNavigate();
  const { categories, creationEnabled, loading, fetchPlaylists, toggleCategory, setCreationAllowed } = usePlaylistStore();

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const handleToggleCategory = async (category: PlaylistCategory) => {
    await toggleCategory(category.id);
    notifications.show({
      title: category.enabled ? "Category disabled" : "Category enabled",
      message: `"${category.name}" is now ${category.enabled ? "hidden from" : "available in"} playlists.`,
      color: category.enabled ? "gray" : "green",
    });
  };

  const handleToggleCreation = async (allowed: boolean) => {
    await setCreationAllowed(allowed);
    notifications.show({
      title: allowed ? "Playlist creation enabled" : "Playlist creation disabled",
      message: allowed
        ? "Users can now create new playlists from the dashboard."
        : "Users can no longer create new playlists from the dashboard.",
      color: allowed ? "green" : "orange",
    });
  };

  const enabledCount = categories.filter((c) => c.enabled).length;

  return (
    <Stack gap="lg">
      <PageHeader
        title="Playlist"
        description="Control which categories users can build playlists from."
        actions={
          creationEnabled ? (
            <AppButton leftSection={<IconPlus size={16} />} onClick={() => navigate("/user-settings/playlists/new")}>
              New Playlist
            </AppButton>
          ) : undefined
        }
      />

      <AppCard padding="lg" style={{ position: "relative", overflow: "hidden" }}>
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 3,
            height: "100%",
            background: `var(--mantine-color-${creationEnabled ? "green" : "orange"}-5)`,
          }}
        />
        <Group justify="space-between" align="center" pl={8}>
          <Group gap="md">
            <ThemeIcon
              size={44}
              radius="md"
              color={creationEnabled ? "green" : "orange"}
              variant="light"
            >
              {creationEnabled ? <IconLockOpen size={22} /> : <IconLock size={22} />}
            </ThemeIcon>
            <Stack gap={2}>
              <Text fw={700} size="sm">Allow playlist creation</Text>
              <Text size="xs" c="dimmed">
                {creationEnabled
                  ? "Users can create new playlists and edit categories from the dashboard."
                  : "New playlist creation and category changes are locked for all users."}
              </Text>
            </Stack>
          </Group>
          <Switch
            size="lg"
            checked={creationEnabled}
            onChange={(e) => handleToggleCreation(e.currentTarget.checked)}
          />
        </Group>
      </AppCard>

      <Group justify="space-between" align="center" mt="xs">
        <Text size="sm" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.04em" }}>
          Categories
        </Text>
        <Badge variant="light" color="gray" radius="sm">
          {enabledCount} of {categories.length} enabled
        </Badge>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        {categories.map((category) => {
          const { icon: Icon, color } = getCategoryStyle(category.name);
          const disabled = !creationEnabled;
          return (
            <AppCard
              key={category.id}
              padding="lg"
              style={{
                position: "relative",
                overflow: "hidden",
                opacity: loading ? 0.6 : disabled ? 0.55 : 1,
                filter: category.enabled ? undefined : "grayscale(0.4)",
              }}
            >
              <Box
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 3,
                  height: "100%",
                  background: category.enabled
                    ? `var(--mantine-color-${color}-5)`
                    : "var(--mantine-color-gray-4)",
                }}
              />
              <Stack gap="md" pl={4}>
                <Group justify="space-between" align="flex-start">
                  <ThemeIcon
                    size={44}
                    radius="md"
                    color={category.enabled ? color : "gray"}
                    variant="light"
                  >
                    <Icon size={22} />
                  </ThemeIcon>
                  <Switch
                    checked={category.enabled}
                    disabled={disabled}
                    onChange={() => handleToggleCategory(category)}
                  />
                </Group>
                <Stack gap={2}>
                  <Text fw={700} size="md" style={{ letterSpacing: "-0.01em" }}>
                    {category.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {category.enabled ? "Visible to users" : "Hidden from users"}
                  </Text>
                </Stack>
              </Stack>
            </AppCard>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
