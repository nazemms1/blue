import { useState, useCallback } from "react";
import type { RadioStation } from "./types";
import { generateId } from "@shared/utils";

const MOCK_RADIO: RadioStation[] = [
  { id: generateId(), name: "Blue FM", streamUrl: "https://stream.example.com/bluefm", imageUrl: "https://picsum.photos/seed/radio1/200/200", isOnline: true, genres: ["Pop", "Top 40"], status: "published", createdAt: "2023-01-01T08:00:00Z", updatedAt: "2025-06-01T12:00:00Z" },
  { id: generateId(), name: "Jazz Fusion", streamUrl: "https://stream.example.com/jazz", imageUrl: "https://picsum.photos/seed/radio2/200/200", isOnline: true, genres: ["Jazz", "Blues"], status: "published", createdAt: "2023-03-15T08:00:00Z", updatedAt: "2025-05-15T12:00:00Z" },
  { id: generateId(), name: "Rock Arena", streamUrl: "https://stream.example.com/rock", imageUrl: "https://picsum.photos/seed/radio3/200/200", isOnline: true, genres: ["Rock", "Metal"], status: "published", createdAt: "2023-06-01T08:00:00Z", updatedAt: "2025-04-10T12:00:00Z" },
  { id: generateId(), name: "Classical Vibes", streamUrl: "https://stream.example.com/classical", imageUrl: "https://picsum.photos/seed/radio4/200/200", isOnline: false, genres: ["Classical"], status: "published", createdAt: "2024-01-10T08:00:00Z", updatedAt: "2025-03-20T12:00:00Z" },
  { id: generateId(), name: "Hip Hop Nation", streamUrl: "https://stream.example.com/hiphop", imageUrl: "https://picsum.photos/seed/radio5/200/200", isOnline: true, genres: ["Hip Hop", "R&B"], status: "draft", createdAt: "2025-02-01T08:00:00Z", updatedAt: "2025-06-10T12:00:00Z" },
  { id: generateId(), name: "News Talk 24", streamUrl: "https://stream.example.com/news", isOnline: true, genres: ["News", "Talk"], status: "published", createdAt: "2022-11-01T08:00:00Z", updatedAt: "2025-06-15T12:00:00Z" },
];

export function useRadioStore() {
  const [stations, setStations] = useState<RadioStation[]>(MOCK_RADIO);
  const [loading, setLoading] = useState(false);

  const fetchStations = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
  }, []);

  const getById = useCallback((id: string) => stations.find((s) => s.id === id) ?? null, [stations]);

  const deleteStation = useCallback(async (id: string) => {
    await new Promise((r) => setTimeout(r, 300));
    setStations((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const createStation = useCallback(async (values: Partial<RadioStation>): Promise<RadioStation> => {
    await new Promise((r) => setTimeout(r, 500));
    const station: RadioStation = {
      id: generateId(),
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setStations((prev) => [station, ...prev]);
    return station;
  }, []);

  const updateStation = useCallback(async (id: string, values: Partial<RadioStation>): Promise<RadioStation> => {
    await new Promise((r) => setTimeout(r, 500));
    let updated: RadioStation | null = null;
    setStations((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        updated = { ...s, ...values, updatedAt: new Date().toISOString() };
        return updated;
      })
    );
    if (!updated) throw new Error("Station not found");
    return updated;
  }, []);

  return { stations, loading, fetchStations, getById, deleteStation, createStation, updateStation };
}

export type { RadioStation };
