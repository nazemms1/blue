import { createApiClient } from "@shared/api";
import type { CmsItem, CmsFilters } from "../model/types";
import type { PaginatedResponse } from "@shared/types";
import { buildQueryString } from "@shared/utils";

const client = createApiClient(
  import.meta.env.VITE_CMS_API_URL ?? import.meta.env.VITE_API_URL ?? "/api",
);

export const cmsApi = {
  list: (filters?: CmsFilters) => {
    const qs = filters
      ? buildQueryString(filters as Record<string, string | number | boolean>)
      : "";
    return client.get<PaginatedResponse<CmsItem>>(`/cms${qs ? `?${qs}` : ""}`);
  },
  getById: (id: string) => client.get<CmsItem>(`/cms/${id}`),
  delete: (id: string) => client.delete<void>(`/cms/${id}`),
  update: (id: string, payload: Partial<CmsItem>) =>
    client.patch<CmsItem>(`/cms/${id}`, payload),
};
