import {
  TextInput,
  PasswordInput,
  Stack,
  Text,
  Transition,
  Box,
  Divider,
  Group,
} from '@mantine/core'
import { AppButton } from '@shared/components'
import { IconAt, IconLock, IconAlertCircle, IconArrowRight } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { notifications } from '@mantine/notifications'
import { useAuthContext } from '@app/providers'

interface LoginFormProps {
  email: string
  password: string
  onEmailChange: (v: string) => void
  onPasswordChange: (v: string) => void
}

export function LoginForm({ email, password, onEmailChange, onPasswordChange }: LoginFormProps) {
  const { login } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ??
    '/select-module'

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [touched, setTouched] = useState({ email: false, password: false })

  const emailError = touched.email && !email ? 'Email is required' : null
  const passwordError = touched.password && !password ? 'Password is required' : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ email: true, password: true })
    if (!email || !password) return

    setError(null)
    setLoading(true)
    try {
      const user = await login({ email, password })
      notifications.show({
        title: `Welcome back, ${user.name.split(' ')[0]}!`,
        message: 'You have been signed in successfully.',
        color: 'green',
        autoClose: 3000,
      })
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack gap={0}>
       <Stack gap={4} mb="xl">
        <Text
          size="1.6rem"
          fw={700}
          style={{ letterSpacing: '-0.025em', lineHeight: 1.2 }}
        >
          Sign in
        </Text>
        <Text size="sm" c="dimmed">
          Enter your credentials to access the dashboard
        </Text>
      </Stack>

      <form onSubmit={handleSubmit} noValidate>
        <Stack gap="md">
           <Transition mounted={Boolean(error)} transition="slide-down" duration={200}>
            {(styles) => (
              <Box
                style={{
                  ...styles,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '10px 14px',
                  borderRadius: 'var(--mantine-radius-md)',
                  background: 'var(--mantine-color-red-0)',
                  border: '1px solid var(--mantine-color-red-3)',
                }}
              >
                <IconAlertCircle
                  size={16}
                  style={{
                    color: 'var(--mantine-color-red-6)',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                />
                <Text size="sm" c="red.7">
                  {error}
                </Text>
              </Box>
            )}
          </Transition>

          <TextInput
            label="Email address"
            placeholder="you@example.com"
            value={email}
            error={emailError}
            leftSection={<IconAt size={15} />}
            onChange={(e) => {
              onEmailChange(e.currentTarget.value)
              setError(null)
            }}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            type="email"
            autoComplete="email"
            size="md"
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            error={passwordError}
            leftSection={<IconLock size={15} />}
            onChange={(e) => {
              onPasswordChange(e.currentTarget.value)
              setError(null)
            }}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            autoComplete="current-password"
            size="md"
          />

          <AppButton
            type="submit"
            fullWidth
            size="md"
            loading={loading}
            mt={4}
            rightSection={!loading ? <IconArrowRight size={16} /> : null}
          >
            Sign in
          </AppButton>
        </Stack>
      </form>

      <Divider
        mt="xl"
        label={
          <Group gap={6}>
            <Text size="xs" c="dimmed">
              Quick access — test accounts
            </Text>
          </Group>
        }
        labelPosition="center"
      />
    </Stack>
  )
}
