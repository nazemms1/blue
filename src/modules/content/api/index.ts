import { createApiClient } from "@shared/api";
import type {
  Article,
  ArticleFormValues,
  ContentFilters,
} from "../model/types";
import type { PaginatedResponse } from "@shared/types";
import { buildQueryString } from "@shared/utils";

const client = createApiClient(
  import.meta.env.VITE_CONTENT_API_URL ??
    import.meta.env.VITE_API_URL ??
    "/api",
);

export const contentApi = {
  list: (filters?: ContentFilters) => {
    const qs = filters
      ? buildQueryString(filters as Record<string, string | number | boolean>)
      : "";
    return client.get<PaginatedResponse<Article>>(
      `/content/articles${qs ? `?${qs}` : ""}`,
    );
  },
  getById: (id: string) => client.get<Article>(`/content/articles/${id}`),
  create: (payload: ArticleFormValues) =>
    client.post<Article>("/content/articles", payload),
  update: (id: string, payload: Partial<ArticleFormValues>) =>
    client.patch<Article>(`/content/articles/${id}`, payload),
  delete: (id: string) => client.delete<void>(`/content/articles/${id}`),
};
