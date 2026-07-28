import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { PermissionRoute } from "@app/router/ProtectedRoute";
import { ErrorBoundary, LoadingOverlay } from "@shared/ui";
import {
  UserSettingsDashboardPage,
  UserSettingsThemePage,
  UserSettingsPlaylistsPage,
  UserSettingsPlaylistEditorPage,
} from "../../pages";
import { USER_SETTINGS_ROUTES } from "../config/routes";
import { UserSettingsErrorFallback } from "../UserSettingsErrorFallback";

const withUserSettingsSuspense = (children: React.ReactNode) => (
  <ErrorBoundary FallbackComponent={UserSettingsErrorFallback}>
    <Suspense fallback={<LoadingOverlay fullPage />}>{children}</Suspense>
  </ErrorBoundary>
);

const W = (page: React.ReactNode) => (
  <PermissionRoute permission="userSettings">{withUserSettingsSuspense(page)}</PermissionRoute>
);

export const userSettingsRoutes: RouteObject[] = [
  { path: USER_SETTINGS_ROUTES.dashboard, element: W(<UserSettingsDashboardPage />) },
  { path: USER_SETTINGS_ROUTES.theme, element: W(<UserSettingsThemePage />) },
  { path: USER_SETTINGS_ROUTES.playlists, element: W(<UserSettingsPlaylistsPage />) },
  { path: USER_SETTINGS_ROUTES.playlistsNew, element: W(<UserSettingsPlaylistEditorPage />) },
  { path: USER_SETTINGS_ROUTES.playlistsEdit, element: W(<UserSettingsPlaylistEditorPage />) },
];
