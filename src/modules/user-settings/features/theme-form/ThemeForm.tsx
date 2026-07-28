import { Stack, Group, Card, Title, SegmentedControl, ColorSwatch, Switch, Text } from "@mantine/core";
import { AppButton } from "@shared/components";
import { useState } from "react";
import type { ThemeSettings, ThemeMode } from "@modules/user-settings/model";

export interface ThemeFormValues {
  mode: ThemeMode;
  accentColor: string;
  compactLayout: boolean;
}

const ACCENT_COLORS = ["blue", "violet", "teal", "orange", "pink", "grape"];

interface ThemeFormProps {
  initial?: ThemeSettings;
  onSubmit: (values: ThemeFormValues) => Promise<void>;
  loading?: boolean;
  onCancel?: () => void;
}

export function ThemeForm({ initial, onSubmit, loading, onCancel }: ThemeFormProps) {
  const [values, setValues] = useState<ThemeFormValues>({
    mode: initial?.mode ?? "system",
    accentColor: initial?.accentColor ?? "blue",
    compactLayout: initial?.compactLayout ?? false,
  });

  const set = <K extends keyof ThemeFormValues>(key: K, value: ThemeFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="lg">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={5} mb="md">Appearance</Title>
          <Stack gap="md">
            <SegmentedControl
              value={values.mode}
              onChange={(v) => set("mode", v as ThemeMode)}
              data={[
                { label: "Light", value: "light" },
                { label: "Dark", value: "dark" },
                { label: "System", value: "system" },
              ]}
            />
            <Switch
              label="Compact layout"
              checked={values.compactLayout}
              onChange={(e) => set("compactLayout", e.currentTarget.checked)}
            />
          </Stack>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={5} mb="md">Accent Color</Title>
          <Group gap="sm">
            {ACCENT_COLORS.map((color) => (
              <Stack key={color} align="center" gap={4}>
                <ColorSwatch
                  color={`var(--mantine-color-${color}-6)`}
                  size={32}
                  onClick={() => set("accentColor", color)}
                  style={{
                    cursor: "pointer",
                    outline: values.accentColor === color ? `2px solid var(--mantine-color-${color}-6)` : "none",
                    outlineOffset: 2,
                  }}
                />
                <Text size="xs" c="dimmed" tt="capitalize">{color}</Text>
              </Stack>
            ))}
          </Group>
        </Card>

        <Group justify="flex-end" gap="sm">
          {onCancel && <AppButton variant="secondary" onClick={onCancel} disabled={loading}>Cancel</AppButton>}
          <AppButton type="submit" loading={loading}>Save changes</AppButton>
        </Group>
      </Stack>
    </form>
  );
}
