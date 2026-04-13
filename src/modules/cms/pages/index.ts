import { lazy } from 'react'

export const CmsDashboardPage = lazy(() =>
  import("./CmsDashboardPage").then((m) => ({ default: m.CmsDashboardPage }))
)

export const CmsListPage = lazy(() =>
  import("./CmsListPage").then((m) => ({ default: m.CmsListPage }))
)

export const CmsUploadPage = lazy(() =>
  import("./CmsUploadPage").then((m) => ({ default: m.CmsUploadPage }))
)

export const CmsAdsPage = lazy(() =>
  import("./CmsAdsPage").then((m) => ({ default: m.CmsAdsPage }))
)

export const CmsVodMoviesPage = lazy(() =>
  import("./CmsVodMoviesPage").then((m) => ({ default: m.CmsVodMoviesPage }))
)

export const CmsVodSeriesPage = lazy(() =>
  import("./CmsVodSeriesPage").then((m) => ({ default: m.CmsVodSeriesPage }))
)

export const CmsVodPlaysPage = lazy(() =>
  import("./CmsVodPlaysPage").then((m) => ({ default: m.CmsVodPlaysPage }))
)

export const CmsVodGenresPage = lazy(() =>
  import("./CmsVodGenresPage").then((m) => ({ default: m.CmsVodGenresPage }))
)

export const CmsVodTvShowsPage = lazy(() =>
  import("./CmsVodTvShowsPage").then((m) => ({ default: m.CmsVodTvShowsPage }))
)

export const CmsMusicSingersPage = lazy(() =>
  import("./CmsMusicSingersPage").then((m) => ({ default: m.CmsMusicSingersPage }))
)

export const CmsMusicSongsPage = lazy(() =>
  import("./CmsMusicSongsPage").then((m) => ({ default: m.CmsMusicSongsPage }))
)

export const CmsMusicGenresPage = lazy(() =>
  import("./CmsMusicGenresPage").then((m) => ({ default: m.CmsMusicGenresPage }))
)

export const CmsStreamingRadioPage = lazy(() =>
  import("./CmsStreamingRadioPage").then((m) => ({ default: m.CmsStreamingRadioPage }))
)

export const CmsStreamingChannelsPage = lazy(() =>
  import("./CmsStreamingChannelsPage").then((m) => ({ default: m.CmsStreamingChannelsPage }))
)
