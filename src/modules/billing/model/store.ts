import { useState, useCallback } from 'react'
import type { BillingRecord, BillingRecordFormValues } from './types'
import { generateId } from '@shared/utils'

const CATEGORIES = ['Technology', 'Design', 'Business', 'Marketing', 'News']

const MOCK_RECORDS: BillingRecord[] = Array.from({ length: 10 }, (_, i) => ({
  id: generateId(),
  title: [
    'Monthly Subscription - Plan Pro',
    'Invoice #2024-001 - Web Development',
    'AWS Infrastructure Costs - March',
    'Domain Renewal: blue.dev',
    'Vercel Pro Plan Payment',
    'GitHub Enterprise Subscription',
    'Sentry Error Tracking - Annual',
    'Postmark Email API Credits',
    'Cloudflare Security Services',
    'Stripe Processing Fees Export',
  ][i],
  slug: `billing-${i + 1}`,
  excerpt: 'Financial transaction record and billing details for project services.',
  body: '# Billing Summary\n\nThis record contains detailed information about the transaction...',
  status: (['pending', 'paid', 'paid', 'canceled', 'paid'] as const)[i % 5],
  author: 'Admin User',
  category: CATEGORIES[i % CATEGORIES.length],
  tags: i % 2 === 0 ? ['invoice', 'payment'] : ['subscription'],
  publishedAt: i % 3 !== 0 ? new Date(Date.now() - i * 86400000).toISOString() : undefined,
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
}))

export function useBillingStore() {
  const [records, setRecords] = useState<BillingRecord[]>(MOCK_RECORDS)
  const [loading, setLoading] = useState(false)

  const fetchRecords = useCallback(async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    setLoading(false)
  }, [])

  const getById = useCallback(
    (id: string) => records.find((r) => r.id === id) ?? null,
    [records]
  )

  const createRecord = useCallback(async (values: BillingRecordFormValues): Promise<BillingRecord> => {
    await new Promise((r) => setTimeout(r, 500))
    const record: BillingRecord = {
      ...values,
      id: generateId(),
      author: 'Admin User',
      publishedAt: values.status === 'paid' ? new Date().toISOString() : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setRecords((prev) => [record, ...prev])
    return record
  }, [])

  const updateRecord = useCallback(async (id: string, values: Partial<BillingRecordFormValues>): Promise<BillingRecord> => {
    await new Promise((r) => setTimeout(r, 500))
    let updated: BillingRecord | null = null
    setRecords((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r
        updated = { ...r, ...values, updatedAt: new Date().toISOString() }
        return updated
      })
    )
    if (!updated) throw new Error('Record not found')
    return updated
  }, [])

  const deleteRecord = useCallback(async (id: string) => {
    await new Promise((r) => setTimeout(r, 300))
    setRecords((prev) => prev.filter((r) => r.id !== id))
  }, [])

  return {
    records,
    loading,
    fetchRecords,
    getById,
    createRecord,
    updateRecord,
    deleteRecord,
  }
}
