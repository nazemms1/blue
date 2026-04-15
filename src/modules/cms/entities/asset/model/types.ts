import type { BaseEntity } from "@shared/types";

export type CmsType = "image" | "video" | "document" | "audio";

export type CmsStatus = "active" | "archived";

export interface CmsItem extends BaseEntity {
  name: string;
  filename: string;
  url: string;
  thumbnailUrl?: string;
  type: CmsType;
  size: number;
  mimeType: string;
  status: CmsStatus;
  tags: string[];
  uploadedBy: string;
}

export interface CmsUploadPayload {
  file: File;
  tags?: string[];
}

export interface CmsFilters {
  search?: string;
  type?: CmsType | "";
  status?: CmsStatus | "";
  page?: number;
  limit?: number;
}
