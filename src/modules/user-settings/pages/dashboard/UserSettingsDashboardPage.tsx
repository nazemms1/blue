import { Stack, SimpleGrid, Card, Group, Text, ThemeIcon, Title } from "@mantine/core";
import { IconPalette, IconPlaylist } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@shared/ui";
import { USER_SETTINGS_ROUTES, userSettingsPath } from "@modules/user-settings/app/config";

const SECTIONS = [
  {
    label: "Theme",
    description: "Customize appearance, accent color, and layout density.",
    icon: IconPalette,
    href: userSettingsPath(USER_SETTINGS_ROUTES.theme),
  },
  {
    label: "Playlist",
    description: "Manage your playlists and their visibility.",
    icon: IconPlaylist,
    href: userSettingsPath(USER_SETTINGS_ROUTES.playlists),
  },
];

export function UserSettingsDashboardPage() {
  const navigate = useNavigate();

  return (
    <Stack gap="lg">
      <PageHeader title="User Settings" description="Manage your personal preferences and access." />

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Card
              key={section.href}
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
              style={{ cursor: "pointer" }}
              onClick={() => navigate(section.href)}
            >
              <Group gap="md" align="flex-start">
                <ThemeIcon size={44} radius="md" variant="light">
                  <Icon size={22} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Title order={5}>{section.label}</Title>
                  <Text size="sm" c="dimmed">{section.description}</Text>
                </Stack>
              </Group>
            </Card>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
