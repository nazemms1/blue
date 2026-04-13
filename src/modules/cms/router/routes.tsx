import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { PermissionRoute } from "@app/router/ProtectedRoute";
import { LoadingOverlay } from "@shared/ui";
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
} from "../pages";
import { CMS_ROUTES } from "../config/routes";

// eslint-disable-next-line react-refresh/only-export-components
const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingOverlay fullPage />}>{children}</Suspense>
);

export const cmsRoutes: RouteObject[] = [
  {
    path: CMS_ROUTES.dashboard,
    element: (
      <PermissionRoute permission="cms">
        <S>
          <CmsDashboardPage />
        </S>
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.library,
    element: (
      <PermissionRoute permission="cms">
        <S>
          <CmsListPage />
        </S>
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.upload,
    element: (
      <PermissionRoute permission="cms">
        <S>
          <CmsUploadPage />
        </S>
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.ads,
    element: (
      <PermissionRoute permission="cms">
        <S>
          <CmsAdsPage />
        </S>
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.vodMovies,
    element: (
      <PermissionRoute permission="cms">
        <S>
          <CmsVodMoviesPage />
        </S>
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.vodSeries,
    element: (
      <PermissionRoute permission="cms">
        <S>
          <CmsVodSeriesPage />
        </S>
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.vodPlays,
    element: (
      <PermissionRoute permission="cms">
        <S>
          <CmsVodPlaysPage />
        </S>
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.vodGenres,
    element: (
      <PermissionRoute permission="cms">
        <S>
          <CmsVodGenresPage />
        </S>
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.vodTvShows,
    element: (
      <PermissionRoute permission="cms">
        <S>
          <CmsVodTvShowsPage />
        </S>
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.musicSingers,
    element: (
      <PermissionRoute permission="cms">
        <S>
          <CmsMusicSingersPage />
        </S>
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.musicSongs,
    element: (
      <PermissionRoute permission="cms">
        <S>
          <CmsMusicSongsPage />
        </S>
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.musicGenres,
    element: (
      <PermissionRoute permission="cms">
        <S>
          <CmsMusicGenresPage />
        </S>
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.streamingRadio,
    element: (
      <PermissionRoute permission="cms">
        <S>
          <CmsStreamingRadioPage />
        </S>
      </PermissionRoute>
    ),
  },
  {
    path: CMS_ROUTES.streamingChannels,
    element: (
      <PermissionRoute permission="cms">
        <S>
          <CmsStreamingChannelsPage />
        </S>
      </PermissionRoute>
    ),
  },
];

