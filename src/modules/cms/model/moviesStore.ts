import { useState, useCallback } from "react";
import type { Movie } from "./types";
import { generateId } from "@shared/utils";

const GENRES = ["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Thriller", "Romance", "Animation"];

const MOCK_MOVIES: Movie[] = [
  { id: generateId(), title: "The Last Horizon", slug: "the-last-horizon", description: "A gripping tale of survival in a post-apocalyptic world where hope is the only weapon left.", duration: 148, releaseDate: "2025-03-15", rating: 8.4, voteCount: 12450, directors: ["James Cameron"], writers: ["Sarah Mitchell"], stars: ["John Doe", "Jane Smith", "Robert Downey"], genres: ["Action", "Sci-Fi"], posterUrl: "https://picsum.photos/seed/movie1/300/450", price: 14.99, cost: 5.00, isPaid: true, productionRating: 4.5, isAdult: false, status: "published", createdAt: "2025-01-10T08:00:00Z", updatedAt: "2025-03-10T12:00:00Z" },
  { id: generateId(), title: "Whispers in the Dark", slug: "whispers-in-the-dark", description: "A psychological thriller that keeps you on the edge of your seat.", duration: 122, releaseDate: "2025-06-20", rating: 7.9, voteCount: 8900, directors: ["Alfred Hitchcock"], writers: ["Paul Thomas"], stars: ["Emma Wilson", "Tom Hardy", "Lily Collins"], genres: ["Thriller", "Horror"], posterUrl: "https://picsum.photos/seed/movie2/300/450", price: 12.99, cost: 4.50, isPaid: true, productionRating: 4.2, isAdult: true, status: "published", createdAt: "2025-02-05T10:00:00Z", updatedAt: "2025-06-01T14:00:00Z" },
  { id: generateId(), title: "Summer Love", slug: "summer-love", description: "A heartwarming romantic comedy set in the beautiful beaches of the Mediterranean.", duration: 110, releaseDate: "2025-07-10", rating: 7.2, voteCount: 5600, directors: ["Nora Ephron"], writers: ["Nora Ephron"], stars: ["Brad Pitt", "Angelina Zoe", "Chris Evans"], genres: ["Romance", "Comedy"], posterUrl: "https://picsum.photos/seed/movie3/300/450", price: 9.99, cost: 3.00, isPaid: false, productionRating: 3.8, isAdult: false, status: "published", createdAt: "2025-03-01T09:00:00Z", updatedAt: "2025-07-01T11:00:00Z" },
  { id: generateId(), title: "The Darkened Realm", slug: "the-darkened-realm", description: "An epic fantasy adventure through mystical lands and ancient magic.", duration: 165, releaseDate: "2025-12-25", rating: 9.1, voteCount: 22000, directors: ["Peter Jackson"], writers: ["Christopher Tolkien", "John Ronald"], stars: ["Ian McKellen", "Viggo Mortensen", "Elijah Wood"], genres: ["Action", "Drama"], posterUrl: "https://picsum.photos/seed/movie4/300/450", price: 19.99, cost: 8.00, isPaid: true, productionRating: 4.9, isAdult: false, status: "draft", createdAt: "2025-04-15T11:00:00Z", updatedAt: "2025-11-20T16:00:00Z" },
  { id: generateId(), title: "Laugh Factory", slug: "laugh-factory", description: "A hilarious look behind the scenes of a struggling comedy club in New York.", duration: 98, releaseDate: "2025-05-05", rating: 6.8, voteCount: 3400, directors: ["Judd Apatow"], writers: ["Mike Myers"], stars: ["Adam Sandler", "Kevin Hart", "Amy Schumer"], genres: ["Comedy"], posterUrl: "https://picsum.photos/seed/movie5/300/450", price: 7.99, cost: 2.00, isPaid: false, productionRating: 3.5, isAdult: true, status: "published", createdAt: "2025-01-20T07:00:00Z", updatedAt: "2025-05-01T10:00:00Z" },
  { id: generateId(), title: "Beyond the Stars", slug: "beyond-the-stars", description: "A breathtaking space odyssey about humanity's first interstellar colony.", duration: 155, releaseDate: "2026-01-15", rating: 8.8, voteCount: 16700, directors: ["Christopher Nolan"], writers: ["Jonathan Nolan"], stars: ["Matthew McConaughey", "Anne Hathaway", "Michael Caine"], genres: ["Sci-Fi", "Drama"], posterUrl: "https://picsum.photos/seed/movie6/300/450", price: 16.99, cost: 6.00, isPaid: true, productionRating: 4.7, isAdult: false, status: "draft", createdAt: "2025-06-01T12:00:00Z", updatedAt: "2025-12-10T15:00:00Z" },
  { id: generateId(), title: "The Forgotten Kingdom", slug: "the-forgotten-kingdom", description: "An archaeological discovery leads to an ancient civilization hidden beneath the desert.", duration: 135, releaseDate: "2025-09-30", rating: 7.5, voteCount: 7800, directors: ["Steven Spielberg"], writers: ["David Koepp"], stars: ["Harrison Ford", "Phoebe Waller-Bridge"], genres: ["Action", "Thriller"], posterUrl: "https://picsum.photos/seed/movie7/300/450", price: 13.99, cost: 5.50, isPaid: true, productionRating: 4.0, isAdult: false, status: "published", createdAt: "2025-05-10T14:00:00Z", updatedAt: "2025-09-15T09:00:00Z" },
  { id: generateId(), title: "Crying Skies", slug: "crying-skies", description: "A poignant drama about love and loss during wartime.", duration: 140, releaseDate: "2025-11-11", rating: 8.1, voteCount: 10200, directors: ["Steven Spielberg"], writers: ["Robert Rodat"], stars: ["Tom Hanks", "Saving Ryan"], genres: ["Drama", "Romance"], posterUrl: "https://picsum.photos/seed/movie8/300/450", price: 11.99, cost: 4.00, isPaid: true, productionRating: 4.4, isAdult: false, status: "archived", createdAt: "2025-07-20T16:00:00Z", updatedAt: "2025-11-05T13:00:00Z" },
];

export function useMoviesStore() {
  const [movies, setMovies] = useState<Movie[]>(MOCK_MOVIES);
  const [loading, setLoading] = useState(false);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
  }, []);

  const getById = useCallback((id: string) => movies.find((m) => m.id === id) ?? null, [movies]);

  const deleteMovie = useCallback(async (id: string) => {
    await new Promise((r) => setTimeout(r, 300));
    setMovies((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const createMovie = useCallback(async (values: Partial<Movie>): Promise<Movie> => {
    await new Promise((r) => setTimeout(r, 500));
    const movie: Movie = {
      id: generateId(),
      title: values.title ?? "",
      titleAr: values.titleAr,
      slug: values.slug ?? "",
      description: values.description ?? "",
      descriptionAr: values.descriptionAr,
      duration: values.duration ?? 0,
      releaseDate: values.releaseDate ?? "",
      rating: 0,
      voteCount: 0,
      directors: values.directors ?? [],
      writers: values.writers ?? [],
      stars: values.stars ?? [],
      genres: values.genres ?? [],
      posterUrl: values.posterUrl,
      trailerUrl: values.trailerUrl,
      mediaUrl: values.mediaUrl,
      price: values.price ?? 0,
      cost: values.cost ?? 0,
      isPaid: values.isPaid ?? false,
      productionRating: values.productionRating ?? 0,
      isAdult: values.isAdult ?? false,
      status: values.status ?? "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setMovies((prev) => [movie, ...prev]);
    return movie;
  }, []);

  const updateMovie = useCallback(async (id: string, values: Partial<Movie>): Promise<Movie> => {
    await new Promise((r) => setTimeout(r, 500));
    let updated: Movie | null = null;
    setMovies((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        updated = { ...m, ...values, updatedAt: new Date().toISOString() };
        return updated;
      })
    );
    if (!updated) throw new Error("Movie not found");
    return updated;
  }, []);

  return { movies, loading, fetchMovies, getById, deleteMovie, createMovie, updateMovie, allGenres: GENRES };
}

export type { Movie };
