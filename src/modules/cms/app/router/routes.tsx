import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { PermissionRoute } from "@app/router/ProtectedRoute";
import { ErrorBoundary, LoadingOverlay } from "@shared/ui";
import {
  CmsDashboardPage, CmsListPage, CmsUploadPage, CmsAdsPage,
  CmsMovieEditorPage, CmsPlayEditorPage, CmsSeriesEditorPage, CmsTvShowEditorPage,
  CmsSingerEditorPage, CmsSongEditorPage, CmsRadioEditorPage, CmsChannelEditorPage, CmsAdEditorPage,
  CmsVodMoviesPage, CmsVodSeriesPage, CmsVodPlaysPage, CmsVodGenresPage, CmsVodTvShowsPage,
  CmsMusicSingersPage, CmsMusicSongsPage, CmsMusicGenresPage,
  CmsStreamingRadioPage, CmsStreamingChannelsPage, CmsStreamingGenresPage,
} from "../../pages";
import { CMS_ROUTES } from "../config/routes";
import { CmsErrorFallback } from "../CmsErrorFallback";

const withCmsSuspense = (children: React.ReactNode) => (
  <ErrorBoundary FallbackComponent={CmsErrorFallback}>
    <Suspense fallback={<LoadingOverlay fullPage />}>{children}</Suspense>
  </ErrorBoundary>
);

const W = (page: React.ReactNode) => <PermissionRoute permission="cms">{withCmsSuspense(page)}</PermissionRoute>;

export const cmsRoutes: RouteObject[] = [
  { path: CMS_ROUTES.dashboard, element: W(<CmsDashboardPage />) },
  { path: CMS_ROUTES.library, element: W(<CmsListPage />) },
  { path: CMS_ROUTES.upload, element: W(<CmsUploadPage />) },
  { path: CMS_ROUTES.ads, element: W(<CmsAdsPage />) },
  { path: CMS_ROUTES.adsNew, element: W(<CmsAdEditorPage />) },
  { path: CMS_ROUTES.adsEdit, element: W(<CmsAdEditorPage />) },

  { path: CMS_ROUTES.vodMovies, element: W(<CmsVodMoviesPage />) },
  { path: CMS_ROUTES.vodMoviesNew, element: W(<CmsMovieEditorPage />) },
  { path: CMS_ROUTES.vodMoviesEdit, element: W(<CmsMovieEditorPage />) },
  { path: CMS_ROUTES.vodSeries, element: W(<CmsVodSeriesPage />) },
  { path: CMS_ROUTES.vodSeriesNew, element: W(<CmsSeriesEditorPage />) },
  { path: CMS_ROUTES.vodSeriesEdit, element: W(<CmsSeriesEditorPage />) },
  { path: CMS_ROUTES.vodPlays, element: W(<CmsVodPlaysPage />) },
  { path: CMS_ROUTES.vodPlaysNew, element: W(<CmsPlayEditorPage />) },
  { path: CMS_ROUTES.vodPlaysEdit, element: W(<CmsPlayEditorPage />) },
  { path: CMS_ROUTES.vodGenres, element: W(<CmsVodGenresPage />) },
  { path: CMS_ROUTES.vodTvShows, element: W(<CmsVodTvShowsPage />) },
  { path: CMS_ROUTES.vodTvShowsNew, element: W(<CmsTvShowEditorPage />) },
  { path: CMS_ROUTES.vodTvShowsEdit, element: W(<CmsTvShowEditorPage />) },

  { path: CMS_ROUTES.musicSingers, element: W(<CmsMusicSingersPage />) },
  { path: CMS_ROUTES.musicSingersNew, element: W(<CmsSingerEditorPage />) },
  { path: CMS_ROUTES.musicSingersEdit, element: W(<CmsSingerEditorPage />) },
  { path: CMS_ROUTES.musicSongs, element: W(<CmsMusicSongsPage />) },
  { path: CMS_ROUTES.musicSongsEdit, element: W(<CmsSongEditorPage />) },
  { path: CMS_ROUTES.musicGenres, element: W(<CmsMusicGenresPage />) },

  { path: CMS_ROUTES.streamingRadio, element: W(<CmsStreamingRadioPage />) },
  { path: CMS_ROUTES.streamingRadioNew, element: W(<CmsRadioEditorPage />) },
  { path: CMS_ROUTES.streamingRadioEdit, element: W(<CmsRadioEditorPage />) },
  { path: CMS_ROUTES.streamingChannels, element: W(<CmsStreamingChannelsPage />) },
  { path: CMS_ROUTES.streamingChannelsNew, element: W(<CmsChannelEditorPage />) },
  { path: CMS_ROUTES.streamingChannelsEdit, element: W(<CmsChannelEditorPage />) },
  { path: CMS_ROUTES.streamingGenres, element: W(<CmsStreamingGenresPage />) },
];
