import { Center, Loader } from '@mantine/core'

interface LoadingOverlayProps {
  visible?: boolean
  fullPage?: boolean
}

export function LoadingOverlay({ visible = true, fullPage = false }: LoadingOverlayProps) {
  if (!visible) return null
  return (
    <Center h={fullPage ? '100vh' : '100%'} py="xl">
      <Loader size="lg" />
    </Center>
  )
}
