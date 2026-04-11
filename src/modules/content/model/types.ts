import type { BaseEntity } from '@shared/types'

export type ArticleStatus = 'draft' | 'published' | 'archived'

export interface Article extends BaseEntity {
  title: string
  slug: string
  excerpt: string
  body: string
  status: ArticleStatus
  author: string
  category: string
  tags: string[]
  publishedAt?: string
}

export interface ArticleFormValues {
  title: string
  slug: string
  excerpt: string
  body: string
  status: ArticleStatus
  category: string
  tags: string[]
}

export interface ContentFilters {
  search?: string
  status?: ArticleStatus | ''
  category?: string
  page?: number
  limit?: number
}
