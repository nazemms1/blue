import { lazy } from 'react'

export const SelectModulePage = lazy(() =>
  import('./SelectModulePage').then((m) => ({ default: m.SelectModulePage }))
)
