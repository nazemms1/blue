import { Accordion, Alert, Button, Card, Code, Group, Stack, Text, Title } from "@mantine/core";
import { IconAlertTriangle, IconRefresh, IconHome2 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import type { ErrorFallbackProps } from "@shared/ui";
import { CMS_ROUTES, cmsPath } from "../config";

export function CmsErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <Card withBorder radius="md" p="xl" maw={720} mx="auto" mt="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="flex-start">
          <Stack gap={4}>
            <Title order={3}>CMS page failed to load</Title>
            <Text c="dimmed">
              Something went wrong while rendering this CMS view. You can retry safely
              without leaving the dashboard shell.
            </Text>
          </Stack>
          <IconAlertTriangle size={28} color="var(--mantine-color-orange-6)" />
        </Group>

        <Alert color="orange" variant="light" title="Isolated module failure">
          The error is scoped to CMS route content. Navigation and the rest of the app
          stay available.
        </Alert>

        <Group>
          <Button leftSection={<IconRefresh size={16} />} onClick={reset}>
            Retry
          </Button>
          <Button
            variant="light"
            component={Link}
            to={cmsPath(CMS_ROUTES.dashboard)}
            leftSection={<IconHome2 size={16} />}
          >
            Back to Dashboard
          </Button>
        </Group>

        <Accordion variant="separated" radius="md">
          <Accordion.Item value="details">
            <Accordion.Control>Technical details</Accordion.Control>
            <Accordion.Panel>
              <Code block>{error.message || "Unknown CMS rendering error"}</Code>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </Card>
  );
}
