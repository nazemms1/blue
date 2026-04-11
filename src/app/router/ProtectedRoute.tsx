import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '@app/providers'
import type { Permission } from '@shared/types'
import type { ReactNode } from 'react'

// Redirects to /login if not authenticated
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthContext()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

// Redirects to /select-module if authenticated but missing the required permission
export function PermissionRoute({
  permission,
  children,
}: {
  permission: Permission
  children: ReactNode
}) {
  const { can } = useAuthContext()

  if (!can(permission)) {
    return <Navigate to="/select-module" replace />
  }

  return <>{children}</>
}
