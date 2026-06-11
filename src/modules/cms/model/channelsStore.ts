import { useState, useCallback } from "react";
import type { Channel, ChannelCategory } from "./types";
import { generateId } from "@shared/utils";

const MOCK_CATEGORIES: ChannelCategory[] = [
  { id: generateId(), name: "Entertainment", sortOrder: 1, createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Sports", sortOrder: 2, createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "News", sortOrder: 3, createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Documentary", sortOrder: 4, createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
  { id: generateId(), name: "Kids", sortOrder: 5, createdAt: "2023-01-01T08:00:00Z", updatedAt: "2023-01-01T08:00:00Z" },
];

const MOCK_CHANNELS: Channel[] = [
  { id: generateId(), name: "Blue One", categoryId: MOCK_CATEGORIES[0].id, categoryName: "Entertainment", logoUrl: "https://picsum.photos/seed/ch1/200/200", streamUrl: "https://stream.example.com/blueone", isActive: true, status: "published", createdAt: "2023-01-15T08:00:00Z", updatedAt: "2025-06-01T12:00:00Z" },
  { id: generateId(), name: "Sports HD", categoryId: MOCK_CATEGORIES[1].id, categoryName: "Sports", logoUrl: "https://picsum.photos/seed/ch2/200/200", streamUrl: "https://stream.example.com/sports", isActive: true, status: "published", createdAt: "2023-02-01T08:00:00Z", updatedAt: "2025-05-15T12:00:00Z" },
  { id: generateId(), name: "News Network", categoryId: MOCK_CATEGORIES[2].id, categoryName: "News", logoUrl: "https://picsum.photos/seed/ch3/200/200", streamUrl: "https://stream.example.com/news", isActive: true, status: "published", createdAt: "2023-03-10T08:00:00Z", updatedAt: "2025-04-20T12:00:00Z" },
  { id: generateId(), name: "Discovery World", categoryId: MOCK_CATEGORIES[3].id, categoryName: "Documentary", logoUrl: "https://picsum.photos/seed/ch4/200/200", streamUrl: "https://stream.example.com/discovery", isActive: false, status: "published", createdAt: "2023-04-05T08:00:00Z", updatedAt: "2025-03-10T12:00:00Z" },
  { id: generateId(), name: "Cartoon Planet", categoryId: MOCK_CATEGORIES[4].id, categoryName: "Kids", logoUrl: "https://picsum.photos/seed/ch5/200/200", isActive: true, status: "draft", createdAt: "2024-06-01T08:00:00Z", updatedAt: "2025-02-15T12:00:00Z" },
  { id: generateId(), name: "Cinema Max", categoryId: MOCK_CATEGORIES[0].id, categoryName: "Entertainment", logoUrl: "https://picsum.photos/seed/ch6/200/200", streamUrl: "https://stream.example.com/cinema", isActive: true, status: "published", createdAt: "2023-05-20T08:00:00Z", updatedAt: "2025-06-10T12:00:00Z" },
  { id: generateId(), name: "Sports Extra", categoryId: MOCK_CATEGORIES[1].id, categoryName: "Sports", isActive: true, status: "archived", createdAt: "2023-07-01T08:00:00Z", updatedAt: "2024-12-01T12:00:00Z" },
];

export function useChannelsStore() {
  const [channels, setChannels] = useState<Channel[]>(MOCK_CHANNELS);
  const [categories] = useState<ChannelCategory[]>(MOCK_CATEGORIES);
  const [loading, setLoading] = useState(false);

  const fetchChannels = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
  }, []);

  const deleteChannel = useCallback(async (id: string) => {
    await new Promise((r) => setTimeout(r, 300));
    setChannels((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const createChannel = useCallback(async (values: Partial<Channel>): Promise<Channel> => {
    await new Promise((r) => setTimeout(r, 500));
    const channel: Channel = {
      id: generateId(),
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setChannels((prev) => [channel, ...prev]);
    return channel;
  }, []);

  const updateChannel = useCallback(async (id: string, values: Partial<Channel>): Promise<Channel> => {
    await new Promise((r) => setTimeout(r, 500));
    let updated: Channel | null = null;
    setChannels((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        updated = { ...c, ...values, updatedAt: new Date().toISOString() };
        return updated;
      })
    );
    if (!updated) throw new Error("Channel not found");
    return updated;
  }, []);

  return { channels, categories, loading, fetchChannels, deleteChannel, createChannel, updateChannel };
}

export type { Channel, ChannelCategory };
