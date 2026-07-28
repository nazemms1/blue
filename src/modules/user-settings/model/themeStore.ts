import { useState, useCallback } from "react";
import type { ThemeSettings, ThemeMode } from "./types";
import { generateId } from "@shared/utils";

const MOCK_THEME: ThemeSettings = {
  id: generateId(),
  mode: "system",
  accentColor: "blue",
  compactLayout: false,
  createdAt: "2025-01-01T08:00:00Z",
  updatedAt: "2025-01-01T08:00:00Z",
};

export function useThemeStore() {
  const [theme, setTheme] = useState<ThemeSettings>(MOCK_THEME);
  const [loading, setLoading] = useState(false);

  const fetchTheme = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    setLoading(false);
  }, []);

  const updateTheme = useCallback(
    async (values: Partial<Pick<ThemeSettings, "mode" | "accentColor" | "compactLayout">>): Promise<ThemeSettings> => {
      await new Promise((r) => setTimeout(r, 400));
      let updated!: ThemeSettings;
      setTheme((prev) => {
        updated = { ...prev, ...values, updatedAt: new Date().toISOString() };
        return updated;
      });
      return updated;
    },
    [],
  );

  return { theme, loading, fetchTheme, updateTheme };
}

export type { ThemeSettings, ThemeMode };
