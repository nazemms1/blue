import type { BaseEntity } from '@shared/types'

export type BillingStatus = 'pending' | 'paid' | 'canceled'

export interface BillingRecord extends BaseEntity {
  title: string
  slug: string
  excerpt: string
  body: string
  status: BillingStatus
  author: string
  category: string
  tags: string[]
  publishedAt?: string
}

export interface BillingRecordFormValues {
  title: string
  slug: string
  excerpt: string
  body: string
  status: BillingStatus
  category: string
  tags: string[]
}

export interface BillingFilters {
  search?: string
  status?: BillingStatus | ''
  category?: string
  page?: number
  limit?: number
}
