import {
  AppShell,
  Burger,
  Group,
  Text,
  Avatar,
  Menu,
  UnstyledButton,
  Divider,
  ScrollArea,
  ThemeIcon,
  Stack,
  Box,
  Breadcrumbs,
  Anchor,
  ActionIcon,
  Tooltip,
  Badge,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  IconPhoto,
  IconFileText,
  IconLogout,
  IconLayoutGrid,
  IconChevronRight,
  IconBell,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useAuthContext } from "@app/providers";
import type { Permission } from "@shared/types";
import classes from "./AppShellLayout.module.css";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  permission: Permission;
}

const ALL_NAV_ITEMS: NavItem[] = [
  { label: "Media", href: "/media", icon: IconPhoto, permission: "media" },
  {
    label: "Content",
    href: "/content",
    icon: IconFileText,
    permission: "content",
  },
];

const ROUTE_LABELS: Record<string, string> = {
  "select-module": "Home",
  media: "Media",
  content: "Content",
  library: "Library",
  upload: "Upload",
  articles: "Articles",
  new: "New Article",
  edit: "Edit",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function useBreadcrumbs(pathname: string) {
  const segments = pathname.replace(/^\//, "").split("/").filter(Boolean);
  // Skip dynamic segments like UUIDs
  const filtered = segments.filter((s) => !s.match(/^[0-9a-f-]{8,}$/i));

  return filtered.map((seg, i) => ({
    label: ROUTE_LABELS[seg] ?? seg,
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === filtered.length - 1,
  }));
}

export function AppShellLayout() {
  const [mobileOpen, { toggle }] = useDisclosure();
  const { user, can, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const visibleNavItems = ALL_NAV_ITEMS.filter((item) => can(item.permission));
  const breadcrumbs = useBreadcrumbs(location.pathname);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppShell
      header={{ height: 54 }}
      navbar={{
        width: 240,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpen },
      }}
      padding={0}
      styles={{
        header: {
          backgroundColor: "var(--mantine-color-white)",
          borderBottom: "1px solid var(--mantine-color-gray-2)",
        },
        navbar: {
          backgroundColor: "var(--mantine-color-white)",
          borderRight: "1px solid var(--mantine-color-gray-2)",
        },
        main: {
          backgroundColor: "var(--mantine-color-gray-0)",
        },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="lg" justify="space-between" wrap="nowrap">
          <Group gap="xs" wrap="nowrap" style={{ minWidth: 0 }}>
            <Burger
              opened={mobileOpen}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />

            {breadcrumbs.length > 0 && (
              <Breadcrumbs
                separator={
                  <IconChevronRight
                    size={13}
                    color="var(--mantine-color-gray-4)"
                  />
                }
                separatorMargin={4}
                visibleFrom="sm"
              >
                {breadcrumbs.map((crumb) =>
                  crumb.isLast ? (
                    <Text
                      key={crumb.href}
                      size="sm"
                      fw={600}
                      c="gray.8"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {crumb.label}
                    </Text>
                  ) : (
                    <Anchor
                      key={crumb.href}
                      size="sm"
                      c="dimmed"
                      fw={400}
                      onClick={() => navigate(crumb.href)}
                      style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                      underline="never"
                    >
                      {crumb.label}
                    </Anchor>
                  ),
                )}
              </Breadcrumbs>
            )}
          </Group>

          <Group gap={4} wrap="nowrap">
            <Tooltip label="Notifications" withArrow position="bottom">
              <ActionIcon variant="subtle" color="gray" size="lg" radius="md">
                <IconBell size={18} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Settings" withArrow position="bottom">
              <ActionIcon variant="subtle" color="gray" size="lg" radius="md">
                <IconSettings size={18} />
              </ActionIcon>
            </Tooltip>

            <Divider orientation="vertical" mx={6} />

            <Menu shadow="md" width={220} position="bottom-end" offset={8}>
              <Menu.Target>
                <UnstyledButton className={classes.headerUserButton}>
                  <Avatar
                    size={30}
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: "blue", to: "violet", deg: 135 }}
                  >
                    {getInitials(user?.name ?? "U")}
                  </Avatar>
                  <Box visibleFrom="sm" style={{ lineHeight: 1 }}>
                    <Text size="sm" fw={500} style={{ lineHeight: 1.35 }}>
                      {user?.name}
                    </Text>
                    <Text size="xs" c="dimmed" style={{ lineHeight: 1.35 }}>
                      {user?.role}
                    </Text>
                  </Box>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Box px="sm" py={8}>
                  <Text size="sm" fw={600}>
                    {user?.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {user?.email}
                  </Text>
                </Box>
                <Divider />
                <Menu.Item leftSection={<IconUser size={14} />} mt={4}>
                  Profile
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings size={14} />}>
                  Settings
                </Menu.Item>
                <Divider my={4} />
                <Menu.Item
                  leftSection={<IconLogout size={14} />}
                  color="red"
                  onClick={handleLogout}
                >
                  Sign out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <Box
          px={16}
          py={14}
          style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}
        >
          <Group justify="space-between" align="center">
            <Group
              gap={10}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/select-module")}
            >
              <ThemeIcon
                size={34}
                radius="md"
                variant="gradient"
                gradient={{ from: "blue", to: "violet", deg: 135 }}
              >
                <IconLayoutGrid size={18} />
              </ThemeIcon>
              <Box>
                <Text
                  fw={800}
                  size="md"
                  lh={1.2}
                  style={{ letterSpacing: "-0.025em" }}
                >
                  Blue
                </Text>
                <Text
                  size="10px"
                  c="dimmed"
                  lh={1}
                  style={{
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  CMS
                </Text>
              </Box>
            </Group>
            <Badge
              size="xs"
              variant="light"
              color="blue"
              radius="sm"
              style={{ fontWeight: 500, letterSpacing: "0.02em" }}
            >
              v1
            </Badge>
          </Group>
        </Box>

        <AppShell.Section grow component={ScrollArea} px={10} pt={12} pb={4}>
          <Text
            size="xs"
            fw={600}
            c="dimmed"
            px={12}
            mb={6}
            style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}
          >
            Modules
          </Text>
          <Stack gap={2}>
            {visibleNavItems.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <UnstyledButton
                  key={item.href}
                  onClick={() => navigate(item.href)}
                  className={`${classes.navItem} ${isActive ? classes.navItemActive : ""}`}
                >
                  <Icon size={17} className={classes.navIcon} />
                  {item.label}
                </UnstyledButton>
              );
            })}
          </Stack>
        </AppShell.Section>

        <Box
          p={10}
          style={{ borderTop: "1px solid var(--mantine-color-gray-2)" }}
        >
          <Group gap={10} className={classes.userButton} wrap="nowrap">
            <Avatar
              size={32}
              radius="xl"
              variant="gradient"
              gradient={{ from: "blue", to: "violet", deg: 135 }}
              style={{ flexShrink: 0 }}
            >
              {getInitials(user?.name ?? "U")}
            </Avatar>
            <Box style={{ flex: 1, minWidth: 0 }}>
              <Text
                size="sm"
                fw={600}
                lh={1.35}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.name}
              </Text>
              <Text
                size="xs"
                c="dimmed"
                lh={1.35}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.email}
              </Text>
            </Box>
            <Tooltip label="Sign out" withArrow position="right">
              <ActionIcon
                variant="subtle"
                color="red"
                size="sm"
                radius="md"
                style={{ flexShrink: 0 }}
                onClick={handleLogout}
              >
                <IconLogout size={15} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Box>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box p="xl">
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
