import { createApiClient } from '@shared/api'
import type { MediaItem, MediaFilters } from '../model/types'
import type { PaginatedResponse } from '@shared/types'
import { buildQueryString } from '@shared/utils'

 const client = createApiClient(
  import.meta.env.VITE_MEDIA_API_URL ?? import.meta.env.VITE_API_URL ?? '/api'
)

export const mediaApi = {
  list: (filters?: MediaFilters) => {
    const qs = filters
      ? buildQueryString(filters as Record<string, string | number | boolean>)
      : ''
    return client.get<PaginatedResponse<MediaItem>>(`/media${qs ? `?${qs}` : ''}`)
  },
  getById: (id: string) => client.get<MediaItem>(`/media/${id}`),
  delete: (id: string) => client.delete<void>(`/media/${id}`),
  update: (id: string, payload: Partial<MediaItem>) =>
    client.patch<MediaItem>(`/media/${id}`, payload),
}
