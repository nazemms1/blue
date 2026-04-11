import { lazy } from 'react'

export const MediaDashboardPage = lazy(() =>
  import('./MediaDashboardPage').then((m) => ({ default: m.MediaDashboardPage }))
)

export const MediaListPage = lazy(() =>
  import('./MediaListPage').then((m) => ({ default: m.MediaListPage }))
)

export const MediaUploadPage = lazy(() =>
  import('./MediaUploadPage').then((m) => ({ default: m.MediaUploadPage }))
)
