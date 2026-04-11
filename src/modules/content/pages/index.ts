import { lazy } from 'react'

export const ContentDashboardPage = lazy(() =>
  import('./ContentDashboardPage').then((m) => ({ default: m.ContentDashboardPage }))
)

export const ContentListPage = lazy(() =>
  import('./ContentListPage').then((m) => ({ default: m.ContentListPage }))
)

export const ContentEditorPage = lazy(() =>
  import('./ContentEditorPage').then((m) => ({ default: m.ContentEditorPage }))
)
