import { createApiClient } from "@shared/api";
import type {
  BillingRecord,
  BillingRecordFormValues,
  BillingFilters,
} from "../model/types";
import type { PaginatedResponse } from "@shared/types";
import { buildQueryString } from "@shared/utils";

const client = createApiClient(
  import.meta.env.VITE_BILLING_API_URL ??
    import.meta.env.VITE_API_URL ??
    "/api",
);

export const billingApi = {
  list: (filters?: BillingFilters) => {
    const qs = filters
      ? buildQueryString(filters as Record<string, string | number | boolean>)
      : "";
    return client.get<PaginatedResponse<BillingRecord>>(
      `/billing/records${qs ? `?${qs}` : ""}`,
    );
  },
  getById: (id: string) => client.get<BillingRecord>(`/billing/records/${id}`),
  create: (payload: BillingRecordFormValues) =>
    client.post<BillingRecord>("/billing/records", payload),
  update: (id: string, payload: Partial<BillingRecordFormValues>) =>
    client.patch<BillingRecord>(`/billing/records/${id}`, payload),
  delete: (id: string) => client.delete<void>(`/billing/records/${id}`),
};
