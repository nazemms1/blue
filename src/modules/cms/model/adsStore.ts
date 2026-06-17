import { useState, useCallback } from "react";
import { generateId } from "@shared/utils";

export type AdStatus = "active" | "paused" | "expired";
export type AdPlacement = "banner" | "sidebar" | "popup" | "video-pre-roll" | "video-mid-roll";

export interface Ad {
  id: string;
  title: string;
  placement: AdPlacement;
  imageUrl?: string;
  targetUrl: string;
  impressions: number;
  clicks: number;
  status: AdStatus;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

const MOCK_ADS: Ad[] = [
  { id: generateId(), title: "Summer Sale Banner", placement: "banner", targetUrl: "https://example.com/summer", impressions: 45000, clicks: 1200, status: "active", startDate: "2025-06-01", endDate: "2025-08-31", createdAt: "2025-05-15T08:00:00Z", updatedAt: "2025-06-01T12:00:00Z" },
  { id: generateId(), title: "New Movie Promo", placement: "video-pre-roll", targetUrl: "https://example.com/movie", impressions: 89000, clicks: 3400, status: "active", startDate: "2025-03-01", endDate: "2025-07-31", createdAt: "2025-02-20T08:00:00Z", updatedAt: "2025-03-01T12:00:00Z" },
  { id: generateId(), title: "Sidebar Subscription", placement: "sidebar", targetUrl: "https://example.com/subscribe", impressions: 22000, clicks: 890, status: "paused", startDate: "2025-04-01", endDate: "2025-06-30", createdAt: "2025-03-25T08:00:00Z", updatedAt: "2025-05-01T12:00:00Z" },
  { id: generateId(), title: "PopUp Newsletter", placement: "popup", targetUrl: "https://example.com/newsletter", impressions: 12000, clicks: 450, status: "expired", startDate: "2025-01-01", endDate: "2025-03-31", createdAt: "2024-12-20T08:00:00Z", updatedAt: "2025-04-01T12:00:00Z" },
  { id: generateId(), title: "Mid-Roll Ad Campaign", placement: "video-mid-roll", targetUrl: "https://example.com/premium", impressions: 67000, clicks: 2100, status: "active", startDate: "2025-05-15", endDate: "2025-09-15", createdAt: "2025-05-01T08:00:00Z", updatedAt: "2025-05-15T12:00:00Z" },
];

export function useAdsStore() {
  const [ads, setAds] = useState<Ad[]>(MOCK_ADS);
  const [loading, setLoading] = useState(false);
  const fetchAds = useCallback(async () => { setLoading(true); await new Promise((r) => setTimeout(r, 400)); setLoading(false); }, []);
  const deleteAd = useCallback(async (id: string) => { await new Promise((r) => setTimeout(r, 300)); setAds((prev) => prev.filter((a) => a.id !== id)); }, []);

  const createAd = useCallback(async (values: Partial<Ad>): Promise<Ad> => {
    await new Promise((r) => setTimeout(r, 500));
    const ad = {
      id: generateId(),
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Ad;
    setAds((prev) => [ad, ...prev]);
    return ad;
  }, []);

  const updateAd = useCallback(async (id: string, values: Partial<Ad>): Promise<Ad> => {
    await new Promise((r) => setTimeout(r, 500));
    let updated: Ad | null = null;
    setAds((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        updated = { ...a, ...values, updatedAt: new Date().toISOString() };
        return updated;
      })
    );
    if (!updated) throw new Error("Ad not found");
    return updated;
  }, []);

  return { ads, loading, fetchAds, deleteAd, createAd, updateAd };
}
