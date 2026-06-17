import { useState, useCallback } from "react";
import type { Series } from "./types";
import { generateId } from "@shared/utils";

const MOCK_TVSHOWS: Series[] = [
  { id: generateId(), title: "The Office", slug: "the-office", description: "A mockumentary about office workers.", posterUrl: "https://picsum.photos/seed/tv1/300/450", genres: ["Comedy"], rating: 8.9, status: "published", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2024-06-01T12:00:00Z", seasons: [{ id: generateId(), seriesId: "", title: "Season 1", seasonNumber: 1, createdAt: "2023-01-01T08:00:00Z", updatedAt: "2024-06-01T12:00:00Z", episodes: [{ id: generateId(), seasonId: "", title: "Pilot", episodeNumber: 1, duration: 22, description: "The first day.", status: "published", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" }] }] },
  { id: generateId(), title: "Friends", slug: "friends", description: "Six friends navigate life in New York City.", posterUrl: "https://picsum.photos/seed/tv2/300/450", genres: ["Comedy", "Romance"], rating: 9.0, status: "published", createdAt: "2022-06-01T08:00:00Z", updatedAt: "2024-01-01T12:00:00Z", seasons: [{ id: generateId(), seriesId: "", title: "Season 1", seasonNumber: 1, createdAt: "2022-06-01T08:00:00Z", updatedAt: "2024-01-01T12:00:00Z", episodes: [{ id: generateId(), seasonId: "", title: "The One Where It All Begins", episodeNumber: 1, duration: 22, description: "Rachel arrives at Central Perk.", status: "published", createdAt: "2022-06-01T08:00:00Z", updatedAt: "2022-06-01T08:00:00Z" }] }] },
  { id: generateId(), title: "Planet Earth II", slug: "planet-earth-2", description: "A documentary series exploring nature.", posterUrl: "https://picsum.photos/seed/tv3/300/450", genres: ["Documentary"], rating: 9.5, status: "published", createdAt: "2024-03-01T08:00:00Z", updatedAt: "2024-09-01T12:00:00Z", seasons: [{ id: generateId(), seriesId: "", title: "Season 1", seasonNumber: 1, createdAt: "2024-03-01T08:00:00Z", updatedAt: "2024-09-01T12:00:00Z", episodes: [{ id: generateId(), seasonId: "", title: "Islands", episodeNumber: 1, duration: 50, description: "Exploring remote islands.", status: "published", createdAt: "2024-03-01T08:00:00Z", updatedAt: "2024-03-01T08:00:00Z" }] }] },
  { id: generateId(), title: "MasterChef", slug: "masterchef", description: "Amateur chefs compete for the title.", posterUrl: "https://picsum.photos/seed/tv4/300/450", genres: ["Reality", "Cooking"], rating: 7.8, status: "draft", createdAt: "2025-01-01T08:00:00Z", updatedAt: "2025-05-01T12:00:00Z", seasons: [{ id: generateId(), seriesId: "", title: "Season 1", seasonNumber: 1, createdAt: "2025-01-01T08:00:00Z", updatedAt: "2025-05-01T12:00:00Z", episodes: [] }] },
];

export function useTvShowsStore() {
  const [tvShows, setTvShows] = useState<Series[]>(MOCK_TVSHOWS);
  const [loading, setLoading] = useState(false);
  const fetchTvShows = useCallback(async () => { setLoading(true); await new Promise((r) => setTimeout(r, 400)); setLoading(false); }, []);
  const getById = useCallback((id: string) => tvShows.find((t) => t.id === id) ?? null, [tvShows]);

  const deleteTvShow = useCallback(async (id: string) => { await new Promise((r) => setTimeout(r, 300)); setTvShows((prev) => prev.filter((t) => t.id !== id)); }, []);

  const createTvShow = useCallback(async (values: Partial<Series>): Promise<Series> => {
    await new Promise((r) => setTimeout(r, 500));
    const show = {
      id: generateId(),
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Series;
    setTvShows((prev) => [show, ...prev]);
    return show;
  }, []);

  const updateTvShow = useCallback(async (id: string, values: Partial<Series>): Promise<Series> => {
    await new Promise((r) => setTimeout(r, 500));
    let updated: Series | null = null;
    setTvShows((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        updated = { ...t, ...values, updatedAt: new Date().toISOString() };
        return updated;
      })
    );
    if (!updated) throw new Error("TV show not found");
    return updated;
  }, []);

  return { tvShows, loading, fetchTvShows, getById, deleteTvShow, createTvShow, updateTvShow };
}
