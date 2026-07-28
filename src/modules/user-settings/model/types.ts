import type { BaseEntity } from "@shared/types";

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeSettings extends BaseEntity {
  mode: ThemeMode;
  accentColor: string;
  compactLayout: boolean;
}

export interface Playlist extends BaseEntity {
  name: string;
  description: string;
  trackCount: number;
  isPublic: boolean;
}

export interface PlaylistCategory extends BaseEntity {
  name: string;
  enabled: boolean;
}
