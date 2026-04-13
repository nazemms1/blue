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
  IconLayoutDashboard,
  IconBuildingCommunity,
  IconUsers,
  IconUserCheck,
  IconReceipt,
  IconUpload,
  IconArrowLeft,
  IconCoins,
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
    label: "Billing",
    href: "/billing",
    icon: IconCoins,
    permission: "billing",
  },
];

const MODULE_MENUS: Record<string, NavItem[]> = {
  billing: [
    { label: "Dashboard", href: "/billing", icon: IconLayoutDashboard, permission: "billing" },
    { label: "Billing Records", href: "/billing/articles", icon: IconReceipt, permission: "billing" },
    { label: "Departments", href: "/billing/departments", icon: IconBuildingCommunity, permission: "billing" },
    { label: "Users", href: "/billing/users", icon: IconUsers, permission: "billing" },
    { label: "Clients", href: "/billing/clients", icon: IconUserCheck, permission: "billing" },
    { label: "Reports", href: "/billing/reports", icon: IconFileText, permission: "billing" },
  ],
  media: [
    { label: "Dashboard", href: "/media", icon: IconLayoutDashboard, permission: "media" },
    { label: "Library", href: "/media/library", icon: IconPhoto, permission: "media" },
    { label: "Upload", href: "/media/upload", icon: IconUpload, permission: "media" },
  ]
}

const ROUTE_LABELS: Record<string, string> = {
  "select-module": "Home",
  media: "Media",
  billing: "Billing",
  library: "Library",
  upload: "Upload",
  articles: "Articles",
  new: "New",
  edit: "Edit",
  departments: "Departments",
  users: "Users",
  clients: "Clients",
  reports: "Reports",
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
      header={{ height: 64 }}
      navbar={{
        width: 260,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpen },
      }}
      padding={0}
      styles={{
        header: {
          border: 0,
        },
        navbar: {
          backgroundColor: "#0f172a",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        },
        main: {
          backgroundColor: "var(--mantine-color-gray-0)",
        },
      }}
    >
      <AppShell
        header={{ height: 64 }}
        navbar={{
          width: 260,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpen },
        }}
        padding={0}
        styles={{
          header: {
            border: 0,
          },
          navbar: {
            backgroundColor: "#0f172a",
            borderRight: "1px solid rgba(255,255,255,0.05)",
          },
          main: {
            backgroundColor: "var(--mantine-color-gray-0)",
          },
        }}
      >
        <AppShell.Header className={classes.header}>
          <Group h="100%" px={24} justify="space-between" wrap="nowrap">
            <Group gap="xl" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
              <Group gap="xs" wrap="nowrap">
                <Burger
                  opened={mobileOpen}
                  onClick={toggle}
                  hiddenFrom="sm"
                  size="sm"
                  color="white"
                />

                {breadcrumbs.length > 0 ? (
                  <Breadcrumbs
                    separator={
                      <IconChevronRight
                        size={14}
                        stroke={2.5}
                        color="rgba(255,255,255,0.15)"
                      />
                    }
                    separatorMargin={16}
                    visibleFrom="sm"
                  >
                    <UnstyledButton
                      onClick={() => navigate("/select-module")}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'rgba(255,255,255,0.4)',
                        transition: 'color 150ms ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                    >
                      <IconLayoutGrid size={20} stroke={2} />
                    </UnstyledButton>
                    {breadcrumbs.map((crumb) =>
                      crumb.isLast ? (
                        <Badge
                          key={crumb.href}
                          variant="filled"
                          color="blue.8"
                          size="lg"
                          radius="md"
                          px={12}
                          style={{ textTransform: 'none', fontWeight: 800, fontSize: '13px', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)' }}
                        >
                          {crumb.label}
                        </Badge>
                      ) : (
                        <Anchor
                          key={crumb.href}
                          size="sm"
                          c="gray.5"
                          fw={600}
                          onClick={() => navigate(crumb.href)}
                          style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                          underline="never"
                        >
                          {crumb.label}
                        </Anchor>
                      ),
                    )}
                  </Breadcrumbs>
                ) : (
                  <Text size="sm" fw={800} c="gray.5" style={{ letterSpacing: '0.02em' }} visibleFrom="sm">Explore Workspace</Text>
                )}
              </Group>
            </Group>

            <Group gap="md" wrap="nowrap">
              <Group gap={8} wrap="nowrap" visibleFrom="sm">
                <Tooltip label="Support & Help" withArrow position="bottom">
                  <ActionIcon variant="subtle" className={classes.actionButton} size="lg" radius="md">
                    <IconSettings size={20} stroke={1.5} />
                  </ActionIcon>
                </Tooltip>

                <Tooltip label="Notifications" withArrow position="bottom">
                  <Box style={{ position: 'relative' }}>
                    <ActionIcon variant="subtle" className={classes.actionButton} size="lg" radius="md">
                      <IconBell size={20} stroke={1.5} />
                    </ActionIcon>
                    <Badge
                      size="8px"
                      circle
                      color="red"
                      style={{ position: 'absolute', top: 6, right: 6, border: '2px solid #0f172a' }}
                    />
                  </Box>
                </Tooltip>
              </Group>

              <Divider orientation="vertical" mx={4} color="rgba(255,255,255,0.1)" />

              <Menu shadow="xl" width={260} position="bottom-end" offset={12} withArrow transitionProps={{ transition: 'pop-top-right' }}>
                <Menu.Target>
                  <UnstyledButton className={classes.headerUserButton}>
                    <Box mr={10} visibleFrom="sm" style={{ textAlign: 'right' }}>
                      <Text size="xs" fw={800} c="white" lh={1}>
                        {user?.name?.split(' ')[0]}
                      </Text>
                      <Text size="10px" fw={700} c="blue.4" mt={1} style={{ textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                        Online
                      </Text>
                    </Box>
                    <Avatar
                      size={34}
                      radius="md"
                      variant="gradient"
                      gradient={{ from: "blue.6", to: "cyan.4", deg: 135 }}
                      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                    >
                      {getInitials(user?.name ?? "U")}
                    </Avatar>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown p={12}>
                  <Group p="xs" mb="xs" gap="md">
                    <Avatar size={48} radius="lg" variant="gradient" gradient={{ from: "blue.6", to: "cyan.4", deg: 135 }}>
                      {getInitials(user?.name ?? "U")}
                    </Avatar>
                    <Box style={{ flex: 1 }}>
                      <Text size="md" fw={800} lh={1.1}>
                        {user?.name}
                      </Text>
                      <Text size="xs" c="dimmed" mt={2}>
                        {user?.email}
                      </Text>
                    </Box>
                  </Group>

                  <Divider my={10} color="gray.1" />

                  <Menu.Label>User Account</Menu.Label>
                  <Menu.Item leftSection={<IconUser size={18} stroke={1.5} />} mb={2}>
                    Personal Profile
                  </Menu.Item>
                  <Menu.Item leftSection={<IconSettings size={18} stroke={1.5} />}>
                    Security Settings
                  </Menu.Item>

                  <Divider my={10} color="gray.1" />

                  <Menu.Item
                    leftSection={<IconLogout size={18} stroke={1.5} />}
                    color="red"
                    fw={700}
                    onClick={handleLogout}
                  >
                    Sign Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p={0} className={classes.navSection}>
          <Box
            px={20}
            py={18}
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <Group justify="space-between" align="center">
              <Group
                gap={12}
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/select-module")}
              >
                <ThemeIcon
                  size={38}
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: "blue.6", to: "cyan.4", deg: 45 }}
                  style={{ boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)' }}
                >
                  <IconLayoutGrid size={20} />
                </ThemeIcon>
                <Box>
                  <Text
                    fw={900}
                    size="18px"
                    lh={1}
                    c="white"
                    style={{ letterSpacing: "-0.5px" }}
                  >
                    Blue
                  </Text>
                  <Text
                    size="9px"
                    fw={800}
                    c="blue.4"
                    lh={1.4}
                    style={{
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                 
                  </Text>
                </Box>
              </Group>
              <Badge
                size="xs"
                variant="filled"
                color="blue.8"
                radius="sm"
                style={{ fontWeight: 800 }}
              >
                v1.0
              </Badge>
            </Group>
          </Box>

          <AppShell.Section grow component={ScrollArea} px={14} pt={24} pb={12}>
            {(() => {
              const activeModuleKey = ALL_NAV_ITEMS.find((item) =>
                location.pathname.startsWith(item.href)
              )?.href.replace("/", "");

              const moduleItems = activeModuleKey ? MODULE_MENUS[activeModuleKey] : null;

              if (moduleItems) {
                return (
                  <Stack gap={4}>
                    <Box px={12} mb={12}>
                      <Text
                        size="10px"
                        fw={800}
                        c="white"
                        style={{ letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5 }}
                      >
                        {activeModuleKey} workspace
                      </Text>
                    </Box>
                    {moduleItems
                      .filter((item) => can(item.permission))
                      .map((item) => {
                        const isActive =
                          item.href === "/" + activeModuleKey
                            ? location.pathname === item.href
                            : location.pathname.startsWith(item.href);
                        const Icon = item.icon;
                        return (
                          <UnstyledButton
                            key={item.href}
                            onClick={() => navigate(item.href)}
                            className={`${classes.navItem} ${isActive ? classes.navItemActive : ""}`}
                          >
                            <Icon size={20} className={classes.navIcon} stroke={isActive ? 2 : 1.5} />
                            <Text size="sm" fw={isActive ? 600 : 500}>
                              {item.label}
                            </Text>
                          </UnstyledButton>
                        );
                      })}

                    <Box mt={24} px={12}>
                      <Divider
                        my="md"
                        label={
                          <Text size="9px" fw={800} c="slate.6" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.4 }}>
                            System Tools
                          </Text>
                        }
                        labelPosition="center"
                        styles={{ label: { backgroundColor: 'transparent' } }}
                      />
                    </Box>

                    <UnstyledButton
                      onClick={() => navigate("/select-module")}
                      className={`${classes.navItem} ${classes.switchButton}`}
                    >
                      <IconArrowLeft size={19} className={classes.navIcon} />
                      <Text size="sm">Switch Module</Text>
                    </UnstyledButton>
                  </Stack>
                );
              }

              return (
                <>
                  <Box px={12} mb={12}>
                    <Text
                      size="10px"
                      fw={800}
                      c="white"
                      style={{ letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5 }}
                    >
                      Available Modules
                    </Text>
                  </Box>
                  <Stack gap={4}>
                    {visibleNavItems.map((item) => {
                      const isActive = location.pathname.startsWith(item.href);
                      const Icon = item.icon;
                      return (
                        <UnstyledButton
                          key={item.href}
                          onClick={() => navigate(item.href)}
                          className={`${classes.navItem} ${isActive ? classes.navItemActive : ""}`}
                        >
                          <Icon size={20} className={classes.navIcon} />
                          <Text size="sm" fw={isActive ? 600 : 500}>
                            {item.label}
                          </Text>
                        </UnstyledButton>
                      );
                    })}
                  </Stack>
                </>
              );
            })()}
          </AppShell.Section>

          <Box
            p={16}
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <UnstyledButton className={classes.userButton}>
              <Group gap={12} wrap="nowrap" style={{ flex: 1 }}>
                <Avatar
                  size={38}
                  radius="lg"
                  variant="gradient"
                  gradient={{ from: "blue.6", to: "cyan.5", deg: 135 }}
                  style={{ flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                >
                  {getInitials(user?.name ?? "U")}
                </Avatar>
                <Box style={{ flex: 1, minWidth: 0 }}>
                  <Text
                    size="sm"
                    fw={700}
                    c="white"
                    lh={1.2}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user?.name}
                  </Text>
                  <Text
                    size="10px"
                    fw={600}
                    c="slate.5"
                    lh={1.2}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {user?.role}
                  </Text>
                </Box>
                <Tooltip label="Logout" withArrow position="right">
                  <ActionIcon
                    variant="subtle"
                    color="red.4"
                    size="lg"
                    radius="md"
                    onClick={handleLogout}
                  >
                    <IconLogout size={18} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </UnstyledButton>
          </Box>
        </AppShell.Navbar>

        <AppShell.Main>
          <Box p="xl">
            <Outlet />
          </Box>
        </AppShell.Main>
      </AppShell>
    </AppShell>
  );
}
