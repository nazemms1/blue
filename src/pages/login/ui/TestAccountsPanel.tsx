import {
  Stack,
  Group,
  Text,
  Badge,
  UnstyledButton,
  Box,
  Avatar,
} from '@mantine/core'
import { IconPhoto, IconFileText, IconShieldHalf } from '@tabler/icons-react'
import type { Permission } from '@shared/types'

interface TestAccount {
  name: string
  email: string
  password: string
  role: string
  permissions: Permission[]
}

 const TEST_ACCOUNTS: TestAccount[] = [
  {
    name: 'Admin User',
    email: 'admin@blue.dev',
    password: 'admin123',
    role: 'Admin',
    permissions: ['media', 'billing'],
  },
  {
    name: 'Media Editor',
    email: 'media@blue.dev',
    password: 'media123',
    role: 'Editor',
    permissions: ['media'],
  },
  {
    name: 'Billing Manager',
    email: 'billing@blue.dev',
    password: 'billing123',
    role: 'Editor',
    permissions: ['billing'],
  },
]

const PERMISSION_META: Record<Permission, { label: string; color: string; icon: React.ReactNode }> = {
  media: { label: 'Media', color: 'violet', icon: <IconPhoto size={10} /> },
  billing: { label: 'Billing', color: 'blue', icon: <IconFileText size={10} /> },
}

const ROLE_COLORS: Record<string, string> = {
  Admin: 'blue',
  Editor: 'teal',
}

interface TestAccountsPanelProps {
  onSelect: (email: string, password: string) => void
}

export function TestAccountsPanel({ onSelect }: TestAccountsPanelProps) {
  return (
    <Stack gap="xs">
      {TEST_ACCOUNTS.map((acc) => (
        <UnstyledButton
          key={acc.email}
          onClick={() => onSelect(acc.email, acc.password)}
          style={{
            display: 'block',
            width: '100%',
            borderRadius: 'var(--mantine-radius-md)',
            transition: 'background 120ms ease',
          }}
          styles={{
            root: {
              ':hover': {
                background: 'var(--mantine-color-default-hover)',
              },
            },
          }}
        >
          <Box
            p="sm"
            style={{
              border: '1px solid var(--mantine-color-default-border)',
              borderRadius: 'var(--mantine-radius-md)',
              transition: 'border-color 120ms ease, box-shadow 120ms ease',
            }}
          >
            <Group justify="space-between" wrap="nowrap" gap="xs">
              <Group gap="sm" wrap="nowrap" style={{ minWidth: 0 }}>
                <Avatar
                  size={32}
                  radius="xl"
                  color={ROLE_COLORS[acc.role] ?? 'gray'}
                  name={acc.name}
                />
                <Stack gap={2} style={{ minWidth: 0 }}>
                  <Group gap={6} wrap="nowrap">
                    <Text size="sm" fw={600} truncate>
                      {acc.name}
                    </Text>
                    <Badge
                      size="xs"
                      variant="light"
                      color={ROLE_COLORS[acc.role] ?? 'gray'}
                      leftSection={<IconShieldHalf size={9} />}
                    >
                      {acc.role}
                    </Badge>
                  </Group>
                  <Text size="xs" c="dimmed" truncate>
                    {acc.email}
                  </Text>
                </Stack>
              </Group>

              <Group gap={4} wrap="nowrap" style={{ flexShrink: 0 }}>
                {acc.permissions.map((p) => {
                  const meta = PERMISSION_META[p]
                  return (
                    <Badge
                      key={p}
                      size="xs"
                      variant="light"
                      color={meta.color}
                      leftSection={meta.icon}
                    >
                      {meta.label}
                    </Badge>
                  )
                })}
              </Group>
            </Group>
          </Box>
        </UnstyledButton>
      ))}
    </Stack>
  )
}
