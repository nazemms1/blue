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
  import('./Placeholder').then((m) => ({ 
    default: () => m.BillingPlaceholderPage({ title: 'Departments', description: 'Manage billing departments and cost centers' }) 
  }))
)

export const BillingUsersPage = lazy(() =>
  import('./Placeholder').then((m) => ({ 
    default: () => m.BillingPlaceholderPage({ title: 'Users', description: 'Manage billing users and access permissions' }) 
  }))
)

export const BillingClientsPage = lazy(() =>
  import('./Placeholder').then((m) => ({ 
    default: () => m.BillingPlaceholderPage({ title: 'Clients', description: 'Manage billing clients and accounts' }) 
  }))
)

export const BillingReportsPage = lazy(() =>
  import('./Placeholder').then((m) => ({ 
    default: () => m.BillingPlaceholderPage({ title: 'Reports', description: 'View and export billing and financial reports' }) 
  }))
)

export const BillingPaymentPage = lazy(() =>
  import('./Placeholder').then((m) => ({ 
    default: () => m.BillingPlaceholderPage({ title: 'Payment', description: 'Manage payments and billing transactions' }) 
  }))
)