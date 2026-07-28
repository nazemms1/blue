import { lazy } from "react";

export const UserSettingsDashboardPage = lazy(() =>
  import("./dashboard").then((m) => ({ default: m.UserSettingsDashboardPage })),
);
export const UserSettingsThemePage = lazy(() =>
  import("./theme").then((m) => ({ default: m.ThemePage })),
);
export const UserSettingsPlaylistsPage = lazy(() =>
  import("./playlist").then((m) => ({ default: m.PlaylistsPage })),
);
export const UserSettingsPlaylistEditorPage = lazy(() =>
  import("./playlist/editor").then((m) => ({ default: m.PlaylistEditorPage })),
);
