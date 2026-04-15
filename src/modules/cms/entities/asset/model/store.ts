import { useState, useCallback } from "react";
import type { CmsItem, CmsFilters } from "./types";
import { generateId } from "@shared/utils";

const MOCK_ITEMS: CmsItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: generateId(),
  name: `Asset ${i + 1}`,
  filename: `asset-${i + 1}.${i % 3 === 0 ? "mp4" : "jpg"}`,
  url: `https://picsum.photos/seed/${i + 1}/400/300`,
  thumbnailUrl: `https://picsum.photos/seed/${i + 1}/80/80`,
  type: i % 3 === 0 ? "video" : "image",
  size: Math.floor(Math.random() * 5000000) + 100000,
  mimeType: i % 3 === 0 ? "video/mp4" : "image/jpeg",
  status: i % 5 === 0 ? "archived" : "active",
  tags: i % 2 === 0 ? ["featured"] : [],
  uploadedBy: "Admin User",
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

export function useCmsStore() {
  const [items, setItems] = useState<CmsItem[]>(MOCK_ITEMS);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchItems = useCallback(async (_filters?: CmsFilters) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
  }, []);

  const deleteItem = useCallback(async (id: string) => {
    await new Promise((r) => setTimeout(r, 300));
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const uploadItem = useCallback(async (file: File, tags: string[] = []) => {
    await new Promise((r) => setTimeout(r, 800));
    const newItem: CmsItem = {
      id: generateId(),
      name: file.name.replace(/\.[^/.]+$/, ""),
      filename: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video/")
        ? "video"
        : file.type.startsWith("audio/")
          ? "audio"
          : "image",
      size: file.size,
      mimeType: file.type,
      status: "active",
      tags,
      uploadedBy: "Admin User",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setItems((prev) => [newItem, ...prev]);
    return newItem;
  }, []);

  return { items, loading, fetchItems, deleteItem, uploadItem };
}
