import type { BaseEntity } from '@shared/types'

export type MediaType = 'image' | 'video' | 'document' | 'audio'

export type MediaStatus = 'active' | 'archived'

export interface MediaItem extends BaseEntity {
  name: string
  filename: string
  url: string
  thumbnailUrl?: string
  type: MediaType
  size: number
  mimeType: string
  status: MediaStatus
  tags: string[]
  uploadedBy: string
}

export interface MediaUploadPayload {
  file: File
  tags?: string[]
}

export interface MediaFilters {
  search?: string
  type?: MediaType | ''
  status?: MediaStatus | ''
  page?: number
  limit?: number
}
