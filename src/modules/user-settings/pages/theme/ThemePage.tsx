import { Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { PageHeader } from "@shared/ui";
import { useThemeStore } from "@modules/user-settings/model";
import { ThemeForm, type ThemeFormValues } from "@modules/user-settings/features/theme-form/ThemeForm";

export function ThemePage() {
  const { theme, fetchTheme, updateTheme } = useThemeStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTheme();
  }, [fetchTheme]);

  const handleSubmit = async (values: ThemeFormValues) => {
    setLoading(true);
    try {
      await updateTheme(values);
      notifications.show({ title: "Theme updated", message: "Your appearance preferences have been saved.", color: "green" });
    } catch {
      notifications.show({ title: "Error", message: "Failed to save theme settings.", color: "red" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack gap="lg" maw={860} mx="auto">
      <PageHeader title="Theme" description="Customize how the app looks for you." />
      <ThemeForm initial={theme} onSubmit={handleSubmit} loading={loading} />
    </Stack>
  );
}
