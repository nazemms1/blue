import { useState, useCallback } from "react";
import type { Singer, Album, Song } from "./types";
import { generateId } from "@shared/utils";

const MOCK_SINGERS: Singer[] = [
  {
    id: generateId(), name: "Ahmad Fares", imageUrl: "https://picsum.photos/seed/singer1/200/200",
    bio: "Legendary Arabic singer with over 20 years of experience.", genres: ["Pop", "Classical"],
    createdAt: "2023-01-01T08:00:00Z", updatedAt: "2025-06-01T12:00:00Z",
    albums: [
      {
        id: generateId(), singerId: "", title: "Nights of Cairo", coverUrl: "https://picsum.photos/seed/album1/300/300",
        releaseDate: "2024-03-15", createdAt: "2024-03-01T08:00:00Z", updatedAt: "2024-03-15T12:00:00Z",
        songs: [
          { id: generateId(), albumId: "", title: "Cairo Moon", duration: 285, plays: 1250000, genres: ["Pop"], status: "published", createdAt: "2024-03-10T08:00:00Z", updatedAt: "2024-03-15T12:00:00Z" },
          { id: generateId(), albumId: "", title: "Desert Wind", duration: 312, plays: 980000, genres: ["Classical"], status: "published", createdAt: "2024-03-10T08:00:00Z", updatedAt: "2024-03-15T12:00:00Z" },
          { id: generateId(), albumId: "", title: "Nile Dreams", duration: 245, plays: 750000, genres: ["Pop"], status: "published", createdAt: "2024-03-10T08:00:00Z", updatedAt: "2024-03-15T12:00:00Z" },
        ],
      },
      {
        id: generateId(), singerId: "", title: "Eternal Melodies", coverUrl: "https://picsum.photos/seed/album2/300/300",
        releaseDate: "2025-01-20", createdAt: "2025-01-01T08:00:00Z", updatedAt: "2025-01-20T12:00:00Z",
        songs: [
          { id: generateId(), albumId: "", title: "Timeless", duration: 298, plays: 560000, genres: ["Classical"], status: "published", createdAt: "2025-01-10T08:00:00Z", updatedAt: "2025-01-20T12:00:00Z" },
          { id: generateId(), albumId: "", title: "Golden Hour", duration: 267, plays: 420000, genres: ["Pop"], status: "draft", createdAt: "2025-01-10T08:00:00Z", updatedAt: "2025-01-20T12:00:00Z" },
        ],
      },
    ],
  },
  {
    id: generateId(), name: "Layla El-Amin", imageUrl: "https://picsum.photos/seed/singer2/200/200",
    bio: "Rising star in the Arabic pop scene.", genres: ["Pop"],
    createdAt: "2024-06-01T08:00:00Z", updatedAt: "2025-05-01T12:00:00Z",
    albums: [
      {
        id: generateId(), singerId: "", title: "First Light", coverUrl: "https://picsum.photos/seed/album3/300/300",
        releaseDate: "2024-09-10", createdAt: "2024-09-01T08:00:00Z", updatedAt: "2024-09-10T12:00:00Z",
        songs: [
          { id: generateId(), albumId: "", title: "Shine", duration: 210, plays: 890000, genres: ["Pop"], status: "published", createdAt: "2024-09-05T08:00:00Z", updatedAt: "2024-09-10T12:00:00Z" },
          { id: generateId(), albumId: "", title: "Dancing in Paris", duration: 195, plays: 670000, genres: ["Pop"], status: "published", createdAt: "2024-09-05T08:00:00Z", updatedAt: "2024-09-10T12:00:00Z" },
        ],
      },
    ],
  },
  {
    id: generateId(), name: "Omar Khaled", imageUrl: "https://picsum.photos/seed/singer3/200/200",
    bio: "Traditional Arabic music composer and performer.", genres: ["Classical", "Traditional"],
    createdAt: "2022-01-01T08:00:00Z", updatedAt: "2025-04-01T12:00:00Z",
    albums: [
      {
        id: generateId(), singerId: "", title: "Oud Stories", coverUrl: "https://picsum.photos/seed/album4/300/300",
        releaseDate: "2023-11-20", createdAt: "2023-11-01T08:00:00Z", updatedAt: "2023-11-20T12:00:00Z",
        songs: [
          { id: generateId(), albumId: "", title: "The Oud Lament", duration: 420, plays: 340000, genres: ["Classical"], status: "published", createdAt: "2023-11-10T08:00:00Z", updatedAt: "2023-11-20T12:00:00Z" },
          { id: generateId(), albumId: "", title: "Dance of the Dervish", duration: 380, plays: 280000, genres: ["Traditional"], status: "archived", createdAt: "2023-11-10T08:00:00Z", updatedAt: "2023-11-20T12:00:00Z" },
        ],
      },
    ],
  },
];

export function useMusicStore() {
  const [singers, setSingers] = useState<Singer[]>(MOCK_SINGERS);
  const [loading, setLoading] = useState(false);

  const allSongs = singers.flatMap((s) => s.albums.flatMap((a) => a.songs.map((song) => ({ ...song, singerName: s.name, albumTitle: a.title }))));
  const allAlbums = singers.flatMap((s) => s.albums.map((a) => ({ ...a, singerName: s.name })));

  const fetchSingers = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
  }, []);

  const deleteSinger = useCallback(async (id: string) => {
    await new Promise((r) => setTimeout(r, 300));
    setSingers((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const createSinger = useCallback(async (values: Partial<Singer>): Promise<Singer> => {
    await new Promise((r) => setTimeout(r, 500));
    const singer = {
      id: generateId(),
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Singer;
    setSingers((prev) => [singer, ...prev]);
    return singer;
  }, []);

  const updateSinger = useCallback(async (id: string, values: Partial<Singer>): Promise<Singer> => {
    await new Promise((r) => setTimeout(r, 500));
    let updated: Singer | null = null;
    setSingers((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        updated = { ...s, ...values, updatedAt: new Date().toISOString() };
        return updated;
      })
    );
    if (!updated) throw new Error("Singer not found");
    return updated;
  }, []);

  const updateSongById = useCallback(async (id: string, values: Partial<Song>): Promise<Song> => {
    await new Promise((r) => setTimeout(r, 500));
    let updated: Song | null = null;
    const newSingers = singers.map((s) => ({
      ...s,
      albums: s.albums.map((a) => ({
        ...a,
        songs: a.songs.map((song) => {
          if (song.id !== id) return song;
          updated = { ...song, ...values, updatedAt: new Date().toISOString() };
          return updated;
        }),
      })),
    }));
    if (!updated) throw new Error("Song not found");
    setSingers(newSingers);
    return updated;
  }, [singers]);

  const getSongById = useCallback((id: string) => {
    for (const s of singers) {
      for (const a of s.albums) {
        const found = a.songs.find((song) => song.id === id);
        if (found) return { song: found, singerName: s.name, albumTitle: a.title };
      }
    }
    return null;
  }, [singers]);

  return { singers, allAlbums, allSongs, loading, fetchSingers, deleteSinger, createSinger, updateSinger, updateSongById, getSongById };
}

export type { Singer, Album, Song };
