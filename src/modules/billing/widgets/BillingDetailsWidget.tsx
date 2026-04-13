import {
  Stack, Group, Text, Badge, Card, Tabs, Paper, Divider,
  SimpleGrid, ThemeIcon, Title, ActionIcon, Avatar
} from "@mantine/core";
import {
  IconInfoCircle, IconFileText, IconHistory, IconUser,
  IconCalendar, IconMail, IconPhone, IconDownload,
  IconDotsVertical, IconReceipt2, IconCloudUpload
} from "@tabler/icons-react";
import { AppButton } from "@shared/components";

interface Props {
  type: string | undefined;
  id: string | undefined;
}

function GridSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack gap="md">
      <Title order={5} c="blue.8">{title}</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
        {children}
      </SimpleGrid>
    </Stack>
  );
}

function DetailItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <Stack gap={2}>
      <Text size="xs" c="dimmed" tt="uppercase" fw={800} >{label}</Text>
      <Group gap="xs">
        <ThemeIcon variant="subtle" color="gray" size="xs">{icon}</ThemeIcon>
        <Text size="sm" fw={600}>{value}</Text>
      </Group>
    </Stack>
  );
}

function FileCard({ name, size, type }: { name: string; size: string; type: string }) {
  return (
    <Paper withBorder p="sm" radius="md">
      <Group justify="space-between">
        <Group>
          <ThemeIcon color="blue.1" c="blue.7" size="lg" radius="md"><IconFileText size={20} /></ThemeIcon>
          <div>
            <Text size="sm" fw={700}>{name}</Text>
            <Text size="xs" c="dimmed">{size} • {type}</Text>
          </div>
        </Group>
        <ActionIcon variant="light" color="blue"><IconDownload size={18} /></ActionIcon>
      </Group>
    </Paper>
  );
}

function HistoryItem({ title, time, user }: { title: string; time: string; user: string }) {
  return (
    <Paper p="sm" withBorder radius="md">
      <Group justify="space-between">
        <Group gap="md">
          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--mantine-color-blue-4)' }} />
          <div>
            <Text size="sm" fw={700}>{title}</Text>
            <Text size="xs" c="dimmed">By {user}</Text>
          </div>
        </Group>
        <Text size="xs" c="dimmed">{time}</Text>
      </Group>
    </Paper>
  );
}

export function BillingDetailsWidget({ type, id }: Props) {
  const entityTitle = type ? type.charAt(0).toUpperCase() + type.slice(1) : "Entity";

  return (
    <Stack gap="lg">
      <Card withBorder padding="xl" radius="md" style={{ background: 'linear-gradient(to right, #ffffff, #fcfcfd)' }}>
        <Group justify="space-between" align="flex-start">
          <Group gap="xl">
            <ThemeIcon size={64} radius="md" variant="light" color="blue">
              <IconReceipt2 size={32} />
            </ThemeIcon>
            <Stack gap={2}>
              <Title order={3}>{entityTitle} Information — {id}</Title>
              <Group gap="xs">
                <Text size="sm" c="dimmed">Reference: <Text component="span" fw={700} c="dark">INV-2026-9932</Text></Text>
                <Divider orientation="vertical" />
                <Text size="sm" c="dimmed">Module: <Text component="span" fw={600} c="blue">{entityTitle}</Text></Text>
              </Group>
            </Stack>
          </Group>
          <Group gap="sm">
            <AppButton variant="secondary">Archive</AppButton>
            <AppButton variant="primary">Update Details</AppButton>
            <ActionIcon variant="subtle" size="lg" radius="md"><IconDotsVertical size={20} /></ActionIcon>
          </Group>
        </Group>
      </Card>

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        <Paper withBorder p="md" radius="md">
          <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={5}>Total Value</Text>
          <Text size="xl" fw={800}>$12,450.00</Text>
          <Badge color="blue" variant="light" size="sm" mt={5}>Fiscal Year 2026</Badge>
        </Paper>
        <Paper withBorder p="md" radius="md">
          <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={5}>Operational Status</Text>
          <Text size="xl" fw={800} c="green">Completed</Text>
          <Text size="xs" c="dimmed" mt={5}>Verified on 12/04/2026</Text>
        </Paper>
        <Paper withBorder p="md" radius="md">
          <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={5}>Assigned Representative</Text>
          <Group gap="sm" mt={4}>
            <Avatar size="sm" color="blue">JD</Avatar>
            <Text size="md" fw={700}>John Doe</Text>
          </Group>
        </Paper>
      </SimpleGrid>

      <Tabs defaultValue="overview" variant="pills" radius="md" styles={{
        tab: { fontWeight: 600, fontSize: '13px' }
      }}>
        <Paper withBorder p="lg" radius="md">
          <Tabs.List mb="xl">
            <Tabs.Tab value="overview" leftSection={<IconInfoCircle size={16} />}>Overview</Tabs.Tab>
            <Tabs.Tab value="documents" leftSection={<IconFileText size={16} />}>Related Documents</Tabs.Tab>
            <Tabs.Tab value="history" leftSection={<IconHistory size={16} />}>Audit Trail</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview">
            <GridSection title="Primary Contact">
              <DetailItem label="Full Name" value="Mohammed Al-Qasimi" icon={<IconUser size={14} />} />
              <DetailItem label="Email Address" value="m.qasimi@enterprise.com" icon={<IconMail size={14} />} />
              <DetailItem label="Phone Number" value="+966 50 123 4567" icon={<IconPhone size={14} />} />
              <DetailItem label="Last Update" value="2 hours ago" icon={<IconCalendar size={14} />} />
            </GridSection>

            <Divider my="xl" />

            <GridSection title="Internal Description">
              <Text size="sm" lh={1.8}>
                Detailed internal notes for the {type} record. This entry represents a high-priority
                financial transaction that has been cleared through the central auditing office.
                All digital signatures are valid and the hardcopy is archived in the central vaults.
              </Text>
            </GridSection>
          </Tabs.Panel>

          <Tabs.Panel value="documents">
            <Stack gap="md">
              <Group justify="space-between">
                <Title order={5}>Files & Attachments</Title>
                <AppButton variant="secondary" size="xs" leftSection={<IconCloudUpload size={14} />}>Upload New</AppButton>
              </Group>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <FileCard name="Transaction_Receipt.pdf" size="1.2 MB" type="PDF" />
                <FileCard name="ID_Copy.jpg" size="450 KB" type="Image" />
              </SimpleGrid>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="history">
            <Stack gap="xs">
              <HistoryItem title="Record Updated" time="Today, 10:45 AM" user="Admin" />
              <HistoryItem title="Document Downloaded" time="Yesterday, 04:20 PM" user="Ahmed S." />
              <HistoryItem title="Record Created" time="10 Apr 2026, 09:00 AM" user="System" />
            </Stack>
          </Tabs.Panel>
        </Paper>
      </Tabs>
    </Stack>
  );
}
