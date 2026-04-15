import { Alert, Button, Card, Code, Group, Stack, Text, Title } from "@mantine/core";
import { IconAlertTriangle, IconRefresh, IconHome2 } from "@tabler/icons-react";
import type { ErrorFallbackProps } from "@shared/ui";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

type AppErrorFallbackProps = Partial<ErrorFallbackProps>;

function toAppError(err: unknown): Error {
  if (err instanceof Error) return err;
  if (isRouteErrorResponse(err)) {
    return new Error(`${err.status} ${err.statusText}`.trim());
  }
  return new Error("Unknown global application error");
}

export function AppErrorFallback({ error, reset }: AppErrorFallbackProps) {
  const routeError = useRouteError();
  const resolvedError = toAppError(error ?? routeError);
  const handleRetry = () => {
    if (reset) {
      reset();
      return;
    }
    window.location.reload();
  };

  return (
    <Stack justify="center" align="center" mih="100vh" p="xl">
      <Card withBorder radius="md" p="xl" maw={760} w="100%">
        <Stack gap="lg">
          <Group justify="space-between" align="flex-start">
            <Stack gap={4}>
              <Title order={2}>Application encountered a critical error</Title>
              <Text c="dimmed">
                A global render failure occurred. This fallback is the final safety net.
              </Text>
            </Stack>
            <IconAlertTriangle size={30} color="var(--mantine-color-red-6)" />
          </Group>

          <Alert color="red" variant="light" title="Global boundary active">
            The main application UI is intentionally replaced to prevent inconsistent state.
          </Alert>

          <Group>
            <Button leftSection={<IconRefresh size={16} />} onClick={handleRetry}>
              Retry Render
            </Button>
            <Button
              variant="light"
              leftSection={<IconHome2 size={16} />}
              onClick={() => window.location.assign("/")}
            >
              Reload Home
            </Button>
          </Group>

          <Code block>{resolvedError.message}</Code>
        </Stack>
      </Card>
    </Stack>
  );
}
