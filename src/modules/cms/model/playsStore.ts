import { useState, useCallback } from "react";
import type { Movie } from "./types";
import { generateId } from "@shared/utils";

const MOCK_PLAYS: Movie[] = [
  { id: generateId(), title: "Romeo and Juliet", slug: "romeo-and-juliet", description: "The classic tale of star-crossed lovers.", duration: 155, releaseDate: "2025-02-14", rating: 8.2, voteCount: 5600, directors: ["William Shakespeare"], writers: ["William Shakespeare"], stars: ["Leonardo DiCaprio", "Claire Danes"], genres: ["Drama", "Romance"], posterUrl: "https://picsum.photos/seed/play1/300/450", price: 9.99, cost: 3.00, isPaid: false, productionRating: 4.1, isAdult: false, status: "published", createdAt: "2025-01-01T08:00:00Z", updatedAt: "2025-02-10T12:00:00Z" },
  { id: generateId(), title: "The Phantom of the Opera", slug: "phantom-of-opera", description: "A mysterious phantom haunts the Paris Opera House.", duration: 165, releaseDate: "2025-05-20", rating: 8.8, voteCount: 8200, directors: ["Andrew Lloyd Webber"], writers: ["Gaston Leroux"], stars: ["Michael Crawford", "Sarah Brightman"], genres: ["Drama", "Romance"], posterUrl: "https://picsum.photos/seed/play2/300/450", price: 14.99, cost: 5.00, isPaid: true, productionRating: 4.6, isAdult: false, status: "published", createdAt: "2025-03-15T08:00:00Z", updatedAt: "2025-05-15T12:00:00Z" },
  { id: generateId(), title: "Les Misérables", slug: "les-miserables", description: "An epic story of redemption during the French Revolution.", duration: 180, releaseDate: "2025-08-10", rating: 9.0, voteCount: 11000, directors: ["Tom Hooper"], writers: ["Victor Hugo"], stars: ["Hugh Jackman", "Russell Crowe", "Anne Hathaway"], genres: ["Drama", "Musical"], posterUrl: "https://picsum.photos/seed/play3/300/450", price: 16.99, cost: 6.00, isPaid: true, productionRating: 4.8, isAdult: false, status: "draft", createdAt: "2025-06-01T08:00:00Z", updatedAt: "2025-08-01T12:00:00Z" },
  { id: generateId(), title: "Hamilton", slug: "hamilton", description: "The story of Alexander Hamilton told through hip-hop.", duration: 160, releaseDate: "2025-11-01", rating: 9.3, voteCount: 15000, directors: ["Lin-Manuel Miranda"], writers: ["Lin-Manuel Miranda"], stars: ["Lin-Manuel Miranda", "Leslie Odom Jr."], genres: ["Musical", "Drama"], posterUrl: "https://picsum.photos/seed/play4/300/450", price: 19.99, cost: 7.00, isPaid: true, productionRating: 4.9, isAdult: false, status: "published", createdAt: "2025-09-01T08:00:00Z", updatedAt: "2025-10-15T12:00:00Z" },
];

export function usePlaysStore() {
  const [plays, setPlays] = useState<Movie[]>(MOCK_PLAYS);
  const [loading, setLoading] = useState(false);
  const fetchPlays = useCallback(async () => { setLoading(true); await new Promise((r) => setTimeout(r, 400)); setLoading(false); }, []);
  const getById = useCallback((id: string) => plays.find((p) => p.id === id) ?? null, [plays]);

  const deletePlay = useCallback(async (id: string) => { await new Promise((r) => setTimeout(r, 300)); setPlays((prev) => prev.filter((p) => p.id !== id)); }, []);

  const createPlay = useCallback(async (values: Partial<Movie>): Promise<Movie> => {
    await new Promise((r) => setTimeout(r, 500));
    const play: Movie = {
      id: generateId(),
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPlays((prev) => [play, ...prev]);
    return play;
  }, []);

  const updatePlay = useCallback(async (id: string, values: Partial<Movie>): Promise<Movie> => {
    await new Promise((r) => setTimeout(r, 500));
    let updated: Movie | null = null;
    setPlays((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        updated = { ...p, ...values, updatedAt: new Date().toISOString() };
        return updated;
      })
    );
    if (!updated) throw new Error("Play not found");
    return updated;
  }, []);

  return { plays, loading, fetchPlays, getById, deletePlay, createPlay, updatePlay };
}
