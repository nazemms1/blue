import type { Permission } from "@shared/types";
import { IconLayoutDashboard, IconPalette, IconPlaylist } from "@tabler/icons-react";
import { USER_SETTINGS_ROUTES, userSettingsPath } from "../config/routes";

interface UserSettingsNavBase {
  label: string;
  permission: Permission;
}

export interface UserSettingsNavLink extends UserSettingsNavBase {
  type: "link";
  href: string;
  icon: React.ElementType;
}

export type UserSettingsNavItem = UserSettingsNavLink;

export const USER_SETTINGS_WORKSPACE_ITEMS: UserSettingsNavItem[] = [
  {
    type: "link",
    label: "Dashboard",
    href: userSettingsPath(USER_SETTINGS_ROUTES.dashboard),
    icon: IconLayoutDashboard,
    permission: "userSettings",
  },
  {
    type: "link",
    label: "Theme",
    href: userSettingsPath(USER_SETTINGS_ROUTES.theme),
    icon: IconPalette,
    permission: "userSettings",
  },
  {
    type: "link",
    label: "Playlist",
    href: userSettingsPath(USER_SETTINGS_ROUTES.playlists),
    icon: IconPlaylist,
    permission: "userSettings",
  },
];

export const userSettingsMenuItems = USER_SETTINGS_WORKSPACE_ITEMS;
