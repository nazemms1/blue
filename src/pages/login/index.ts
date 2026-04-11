import { lazy } from 'react'

export const LoginPage = lazy(() =>
  import('./LoginPage').then((m) => ({ default: m.LoginPage }))
)
