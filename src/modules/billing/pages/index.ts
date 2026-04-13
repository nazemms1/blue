import { lazy } from 'react'

export const BillingDashboardPage = lazy(() =>
  import('./Dashboard').then((m) => ({ default: m.BillingDashboardPage }))
)

export const BillingListPage = lazy(() =>
  import('./List').then((m) => ({ default: m.BillingListPage }))
)

export const BillingEditorPage = lazy(() =>
  import('./Editor').then((m) => ({ default: m.BillingEditorPage }))
)

export const BillingDepartmentsPage = lazy(() =>
  import('./Departments').then((m) => ({ default: m.BillingDepartmentsPage }))
)

export const BillingUsersPage = lazy(() =>
  import('./Users').then((m) => ({ default: m.BillingUsersPage }))
)

export const BillingClientsPage = lazy(() =>
  import('./Clients').then((m) => ({ default: m.BillingClientsPage }))
)

export const BillingReportsPage = lazy(() =>
  import('./Reports').then((m) => ({ default: m.BillingReportsPage }))
)

export const BillingPaymentPage = lazy(() =>
  import('./Payments').then((m) => ({ default: m.BillingPaymentPage }))
)

export const BillingDetailsPage = lazy(() =>
  import('./Details/BillingDetailsPage').then((m) => ({ default: m.BillingDetailsPage }))
)