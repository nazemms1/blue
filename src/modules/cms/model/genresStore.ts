import { useState, useCallback } from "react";
import type { CmsGenre } from "./types";
import { generateId } from "@shared/utils";

const MOCK_GENRES: CmsGenre[] = [
  { id: generateId(), name: "Action", sortOrder: 1, contentType: "vod", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Comedy", sortOrder: 2, contentType: "vod", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Drama", sortOrder: 3, contentType: "vod", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Horror", sortOrder: 4, contentType: "vod", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Sci-Fi", sortOrder: 5, contentType: "vod", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Romance", sortOrder: 6, contentType: "vod", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Thriller", sortOrder: 7, contentType: "vod", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Animation", sortOrder: 8, contentType: "vod", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Pop", sortOrder: 1, contentType: "music", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Classical", sortOrder: 2, contentType: "music", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Rock", sortOrder: 3, contentType: "music", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Hip Hop", sortOrder: 4, contentType: "music", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Jazz", sortOrder: 5, contentType: "music", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Entertainment", sortOrder: 1, contentType: "streaming", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Sports", sortOrder: 2, contentType: "streaming", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "News", sortOrder: 3, contentType: "streaming", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Documentary", sortOrder: 4, contentType: "streaming", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Kids", sortOrder: 5, contentType: "streaming", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
];

export function useGenresStore() {
  const [genres, setGenres] = useState<CmsGenre[]>(MOCK_GENRES);
  const [loading, setLoading] = useState(false);

  const fetchGenres = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
  }, []);

  const deleteGenre = useCallback(async (id: string) => {
    await new Promise((r) => setTimeout(r, 300));
    setGenres((prev) => prev.filter((g) => g.id !== id));
  }, []);

  return { genres, loading, fetchGenres, deleteGenre };
}

export type { CmsGenre };
