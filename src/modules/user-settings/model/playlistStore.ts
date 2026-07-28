import { useState, useCallback } from "react";
import type { Playlist, PlaylistCategory } from "./types";
import { generateId } from "@shared/utils";

const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: generateId(),
    name: "Morning Drive",
    description: "Upbeat tracks to start the day.",
    trackCount: 24,
    isPublic: true,
    createdAt: "2024-11-01T08:00:00Z",
    updatedAt: "2025-05-01T12:00:00Z",
  },
  {
    id: generateId(),
    name: "Late Night Focus",
    description: "Instrumental tracks for deep work.",
    trackCount: 41,
    isPublic: false,
    createdAt: "2024-12-15T08:00:00Z",
    updatedAt: "2025-06-10T12:00:00Z",
  },
  {
    id: generateId(),
    name: "Weekend Favorites",
    description: "A mix of the most played tracks.",
    trackCount: 18,
    isPublic: true,
    createdAt: "2025-02-01T08:00:00Z",
    updatedAt: "2025-07-01T12:00:00Z",
  },
];

const MOCK_CATEGORIES: PlaylistCategory[] = [
  "Pop", "Rock", "Jazz", "Chill", "Workout", "Classical", "Hip Hop", "Traditional",
].map((name, i) => ({
  id: generateId(),
  name,
  enabled: i % 3 !== 2,
  createdAt: "2025-01-01T08:00:00Z",
  updatedAt: "2025-01-01T08:00:00Z",
}));

export function usePlaylistStore() {
  const [playlists, setPlaylists] = useState<Playlist[]>(MOCK_PLAYLISTS);
  const [categories, setCategories] = useState<PlaylistCategory[]>(MOCK_CATEGORIES);
  const [creationEnabled, setCreationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPlaylists = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
  }, []);

  const deletePlaylist = useCallback(async (id: string) => {
    await new Promise((r) => setTimeout(r, 300));
    setPlaylists((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const createPlaylist = useCallback(async (values: Partial<Playlist>): Promise<Playlist> => {
    await new Promise((r) => setTimeout(r, 500));
    const playlist = {
      id: generateId(),
      trackCount: 0,
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Playlist;
    setPlaylists((prev) => [playlist, ...prev]);
    return playlist;
  }, []);

  const updatePlaylist = useCallback(async (id: string, values: Partial<Playlist>): Promise<Playlist> => {
    await new Promise((r) => setTimeout(r, 500));
    let updated: Playlist | null = null;
    setPlaylists((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        updated = { ...p, ...values, updatedAt: new Date().toISOString() };
        return updated;
      }),
    );
    if (!updated) throw new Error("Playlist not found");
    return updated;
  }, []);

  const toggleCategory = useCallback(async (id: string) => {
    await new Promise((r) => setTimeout(r, 200));
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled, updatedAt: new Date().toISOString() } : c)),
    );
  }, []);

  const setCreationAllowed = useCallback(async (allowed: boolean) => {
    await new Promise((r) => setTimeout(r, 200));
    setCreationEnabled(allowed);
  }, []);

  return {
    playlists,
    categories,
    creationEnabled,
    loading,
    fetchPlaylists,
    deletePlaylist,
    createPlaylist,
    updatePlaylist,
    toggleCategory,
    setCreationAllowed,
  };
}

export type { Playlist, PlaylistCategory };
