import { useState, useCallback } from "react";
import type { Series, Season, Episode } from "./types";
import { generateId } from "@shared/utils";

const MOCK_SERIES: Series[] = [
  {
    id: generateId(),
    title: "Game of Empires",
    slug: "game-of-empires",
    description: "In a fictional world, noble families battle for control of the Iron Crown.",
    posterUrl: "https://picsum.photos/seed/series1/300/450",
    genres: ["Action", "Drama"],
    rating: 9.3,
    status: "published",
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2025-06-01T12:00:00Z",
    seasons: [
      {
        id: generateId(), seriesId: "", title: "Season 1", seasonNumber: 1,
        posterUrl: "https://picsum.photos/seed/s1/300/450",
        createdAt: "2024-01-15T08:00:00Z", updatedAt: "2024-06-01T12:00:00Z",
        episodes: [
          { id: generateId(), seasonId: "", title: "Winter Is Coming", episodeNumber: 1, duration: 62, description: "The pilot episode introduces the main families.", status: "published", createdAt: "2024-01-15T08:00:00Z", updatedAt: "2024-01-15T08:00:00Z" },
          { id: generateId(), seasonId: "", title: "The Kingsroad", episodeNumber: 2, duration: 58, description: "Characters begin their journeys.", status: "published", createdAt: "2024-01-22T08:00:00Z", updatedAt: "2024-01-22T08:00:00Z" },
          { id: generateId(), seasonId: "", title: "Lord Snow", episodeNumber: 3, duration: 55, description: "New alliances are formed.", status: "published", createdAt: "2024-01-29T08:00:00Z", updatedAt: "2024-01-29T08:00:00Z" },
        ],
      },
      {
        id: generateId(), seriesId: "", title: "Season 2", seasonNumber: 2,
        posterUrl: "https://picsum.photos/seed/s2/300/450",
        createdAt: "2024-08-01T08:00:00Z", updatedAt: "2025-03-01T12:00:00Z",
        episodes: [
          { id: generateId(), seasonId: "", title: "The North Remembers", episodeNumber: 1, duration: 60, description: "Season 2 premiere.", status: "published", createdAt: "2024-08-01T08:00:00Z", updatedAt: "2024-08-01T08:00:00Z" },
          { id: generateId(), seasonId: "", title: "The Night Lands", episodeNumber: 2, duration: 57, description: "Dark forces gather.", status: "published", createdAt: "2024-08-08T08:00:00Z", updatedAt: "2024-08-08T08:00:00Z" },
        ],
      },
    ],
  },
  {
    id: generateId(),
    title: "BreakingBad",
    slug: "breaking-bad",
    description: "A high school chemistry teacher turned methamphetamine producer.",
    posterUrl: "https://picsum.photos/seed/series2/300/450",
    genres: ["Drama", "Thriller"],
    rating: 9.5,
    status: "published",
    createdAt: "2023-01-20T08:00:00Z",
    updatedAt: "2024-12-01T12:00:00Z",
    seasons: [
      {
        id: generateId(), seriesId: "", title: "Season 1", seasonNumber: 1,
        createdAt: "2023-01-20T08:00:00Z", updatedAt: "2023-04-01T12:00:00Z",
        episodes: [
          { id: generateId(), seasonId: "", title: "Pilot", episodeNumber: 1, duration: 58, description: "Walter White discovers he has cancer.", status: "published", createdAt: "2023-01-20T08:00:00Z", updatedAt: "2023-01-20T08:00:00Z" },
          { id: generateId(), seasonId: "", title: "Cat's in the Bag", episodeNumber: 2, duration: 48, description: "Walt and Jesse face consequences.", status: "published", createdAt: "2023-01-27T08:00:00Z", updatedAt: "2023-01-27T08:00:00Z" },
        ],
      },
    ],
  },
  {
    id: generateId(),
    title: "Stranger Times",
    slug: "stranger-times",
    description: "A group of kids uncover supernatural mysteries in their small town.",
    posterUrl: "https://picsum.photos/seed/series3/300/450",
    genres: ["Sci-Fi", "Horror"],
    rating: 8.7,
    status: "published",
    createdAt: "2024-07-01T08:00:00Z",
    updatedAt: "2025-05-01T12:00:00Z",
    seasons: [
      {
        id: generateId(), seriesId: "", title: "Season 1", seasonNumber: 1,
        posterUrl: "https://picsum.photos/seed/s3s1/300/450",
        createdAt: "2024-07-01T08:00:00Z", updatedAt: "2024-10-01T12:00:00Z",
        episodes: [
          { id: generateId(), seasonId: "", title: "The Vanishing", episodeNumber: 1, duration: 55, description: "A boy disappears.", status: "published", createdAt: "2024-07-01T08:00:00Z", updatedAt: "2024-07-01T08:00:00Z" },
          { id: generateId(), seasonId: "", title: "The Weirdo", episodeNumber: 2, duration: 52, description: "A strange girl appears.", status: "published", createdAt: "2024-07-08T08:00:00Z", updatedAt: "2024-07-08T08:00:00Z" },
          { id: generateId(), seasonId: "", title: "Holly, Jolly", episodeNumber: 3, duration: 50, description: "Christmas brings new dangers.", status: "published", createdAt: "2024-07-15T08:00:00Z", updatedAt: "2024-07-15T08:00:00Z" },
        ],
      },
    ],
  },
];

export function useSeriesStore() {
  const [seriesList, setSeriesList] = useState<Series[]>(MOCK_SERIES);
  const [loading, setLoading] = useState(false);

  const fetchSeries = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
  }, []);

  const getById = useCallback((id: string) => seriesList.find((s) => s.id === id) ?? null, [seriesList]);

  const deleteSeries = useCallback(async (id: string) => {
    await new Promise((r) => setTimeout(r, 300));
    setSeriesList((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const createSeries = useCallback(async (values: Partial<Series>): Promise<Series> => {
    await new Promise((r) => setTimeout(r, 500));
    const series: Series = {
      id: generateId(),
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSeriesList((prev) => [series, ...prev]);
    return series;
  }, []);

  const updateSeries = useCallback(async (id: string, values: Partial<Series>): Promise<Series> => {
    await new Promise((r) => setTimeout(r, 500));
    let updated: Series | null = null;
    setSeriesList((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        updated = { ...s, ...values, updatedAt: new Date().toISOString() };
        return updated;
      })
    );
    if (!updated) throw new Error("Series not found");
    return updated;
  }, []);

  return { seriesList, loading, fetchSeries, getById, deleteSeries, createSeries, updateSeries };
}

export type { Series, Season, Episode };
