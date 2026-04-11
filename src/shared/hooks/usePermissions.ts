import { useCallback } from 'react'
import type { Permission } from '@shared/types'

interface UsePermissionsOptions {
  permissions: Permission[]
}

export function usePermissions({ permissions }: UsePermissionsOptions) {
  const can = useCallback(
    (permission: Permission): boolean => permissions.includes(permission),
    [permissions]
  )

  const canAny = useCallback(
    (...perms: Permission[]): boolean => perms.some((p) => permissions.includes(p)),
    [permissions]
  )

  const canAll = useCallback(
    (...perms: Permission[]): boolean => perms.every((p) => permissions.includes(p)),
    [permissions]
  )

  return { can, canAny, canAll }
}
