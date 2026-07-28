export const USER_SETTINGS_ROUTES = {
  dashboard: "user-settings",
  theme: "user-settings/theme",
  playlists: "user-settings/playlists",
  playlistsNew: "user-settings/playlists/new",
  playlistsEdit: "user-settings/playlists/:id/edit",
} as const;

export function userSettingsPath(
  route: (typeof USER_SETTINGS_ROUTES)[keyof typeof USER_SETTINGS_ROUTES],
): string {
  return `/${route}`;
}
