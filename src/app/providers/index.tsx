import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { theme } from '../theme'
import { AuthProvider } from './AuthProvider'
import type { ReactNode } from 'react'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" zIndex={1000} />
      <ModalsProvider>
        <AuthProvider>{children}</AuthProvider>
      </ModalsProvider>
    </MantineProvider>
  )
}

export { useAuthContext } from './AuthProvider'
