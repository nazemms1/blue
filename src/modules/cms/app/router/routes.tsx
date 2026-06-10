import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { PermissionRoute } from "@app/router/ProtectedRoute";
import { ErrorBoundary, LoadingOverlay } from "@shared/ui";
import {
  CmsDashboardPage,
  CmsListPage,
  CmsUploadPage,
  CmsAdsPage,
  CmsVodMoviesPage,
  CmsVodSeriesPage,
  CmsVodPlaysPage,
  CmsVodGenresPage,
  CmsVodTvShowsPage,
  CmsMusicSingersPage,
  CmsMusicSongsPage,
  CmsMusicGenresPage,
  CmsStreamingRadioPage,
  CmsStreamingChannelsPage,
  CmsStreamingGenresPage,
} from "../../pages";
import { CMS_ROUTES } from "../config/routes";
import { CmsErrorFallback } from "../CmsErrorFallback";

const withCmsSuspense = (children: React.ReactNode) => (
  <ErrorBoundary FallbackComponent={CmsErrorFallback}>
    <Suspense fallback={<LoadingOverlay fullPage />}>{children}</Suspense>
  </ErrorBoundary>
);

export const cmsRoutes: RouteObject[] = [
  {
    path: CMS_ROUTES.dashboard,
    element: (
      <PermissionRoute permission="cms">
        {withCmsSuspense(<CmsDashboardPage />)}
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.library,
    element: (
      <PermissionRoute permission="cms">
        {withCmsSuspense(<CmsListPage />)}
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.upload,
    element: (
      <PermissionRoute permission="cms">
        {withCmsSuspense(<CmsUploadPage />)}
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.ads,
    element: (
      <PermissionRoute permission="cms">
        {withCmsSuspense(<CmsAdsPage />)}
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.vodMovies,
    element: (
      <PermissionRoute permission="cms">
        {withCmsSuspense(<CmsVodMoviesPage />)}
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.vodSeries,
    element: (
      <PermissionRoute permission="cms">
        {withCmsSuspense(<CmsVodSeriesPage />)}
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.vodPlays,
    element: (
      <PermissionRoute permission="cms">
        {withCmsSuspense(<CmsVodPlaysPage />)}
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.vodGenres,
    element: (
      <PermissionRoute permission="cms">
        {withCmsSuspense(<CmsVodGenresPage />)}
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.vodTvShows,
    element: (
      <PermissionRoute permission="cms">
        {withCmsSuspense(<CmsVodTvShowsPage />)}
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.musicSingers,
    element: (
      <PermissionRoute permission="cms">
        {withCmsSuspense(<CmsMusicSingersPage />)}
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.musicSongs,
    element: (
      <PermissionRoute permission="cms">
        {withCmsSuspense(<CmsMusicSongsPage />)}
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.musicGenres,
    element: (
      <PermissionRoute permission="cms">
        {withCmsSuspense(<CmsMusicGenresPage />)}
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.streamingRadio,
    element: (
      <PermissionRoute permission="cms">
        {withCmsSuspense(<CmsStreamingRadioPage />)}
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.streamingChannels,
    element: (
      <PermissionRoute permission="cms">
        {withCmsSuspense(<CmsStreamingChannelsPage />)}
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.streamingGenres,
    element: (
      <PermissionRoute permission="cms">
        {withCmsSuspense(<CmsStreamingGenresPage />)}
      </PermissionRoute>
    ),
  },
];
