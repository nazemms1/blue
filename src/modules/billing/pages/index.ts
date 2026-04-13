import { lazy } from 'react'

export const BillingDashboardPage = lazy(() =>
  import('./BillingDashboardPage').then((m) => ({ default: m.BillingDashboardPage }))
)

export const BillingListPage = lazy(() =>
  import('./BillingListPage').then((m) => ({ default: m.BillingListPage }))
)

export const BillingEditorPage = lazy(() =>
  import('./BillingEditorPage').then((m) => ({ default: m.BillingEditorPage }))
)

export const BillingDepartmentsPage = lazy(() =>
  import('./BillingPlaceholderPage').then((m) => ({ 
    default: () => m.BillingPlaceholderPage({ title: 'Departments', description: 'Manage billing departments and cost centers' }) 
  }))
)

export const BillingUsersPage = lazy(() =>
  import('./BillingPlaceholderPage').then((m) => ({ 
    default: () => m.BillingPlaceholderPage({ title: 'Users', description: 'Manage billing users and access permissions' }) 
  }))
)

export const BillingClientsPage = lazy(() =>
  import('./BillingPlaceholderPage').then((m) => ({ 
    default: () => m.BillingPlaceholderPage({ title: 'Clients', description: 'Manage billing clients and accounts' }) 
  }))
)

export const BillingReportsPage = lazy(() =>
  import('./BillingPlaceholderPage').then((m) => ({ 
    default: () => m.BillingPlaceholderPage({ title: 'Reports', description: 'View and export billing and financial reports' }) 
  }))
)
