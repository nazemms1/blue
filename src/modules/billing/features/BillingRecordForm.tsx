import {
  Stack,
  TextInput,
  Textarea,
  Select,
  TagsInput,
  Group,
  Card,
  Title,
} from '@mantine/core'
import { AppButton } from '@shared/components'
import { useState } from 'react'
import type { BillingRecord, BillingRecordFormValues } from '../model/types'

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'canceled', label: 'Canceled' },
]

const CATEGORY_OPTIONS = [
  { value: 'Fees', label: 'Fees' },
  { value: 'Subscription', label: 'Subscription' },
  { value: 'One-time', label: 'One-time' },
  { value: 'Refund', label: 'Refund' },
]

interface BillingRecordFormProps {
  initial?: BillingRecord
  onSubmit: (values: BillingRecordFormValues) => Promise<void>
  loading?: boolean
  onCancel?: () => void
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function BillingRecordForm({ initial, onSubmit, loading, onCancel }: BillingRecordFormProps) {
  const [values, setValues] = useState<BillingRecordFormValues>({
    title: initial?.title ?? '',
    slug: initial?.slug ?? '',
    excerpt: initial?.excerpt ?? '',
    body: initial?.body ?? '',
    status: initial?.status ?? 'pending',
    category: initial?.category ?? '',
    tags: initial?.tags ?? [],
  })
  const [errors, setErrors] = useState<Partial<Record<keyof BillingRecordFormValues, string>>>({})

  const set = <K extends keyof BillingRecordFormValues>(key: K, value: BillingRecordFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }))

  const validate = (): boolean => {
    const e: typeof errors = {}
    if (!values.title.trim()) e.title = 'Title is required'
    if (!values.slug.trim()) e.slug = 'Slug is required'
    if (!values.category) e.category = 'Category is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    await onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="lg">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={5} mb="md">
            Record details
          </Title>
          <Stack gap="md">
            <TextInput
              label="Title"
              placeholder="Enter record title"
              value={values.title}
              error={errors.title}
              onChange={(e) => {
                const title = e.currentTarget.value
                set('title', title)
                if (!initial) set('slug', slugify(title))
              }}
              required
            />

            <TextInput
              label="Slug"
              placeholder="url-friendly-slug"
              value={values.slug}
              error={errors.slug}
              onChange={(e) => set('slug', e.currentTarget.value)}
              required
            />

            <Textarea
              label="Short Description"
              placeholder="Short description for listings"
              value={values.excerpt}
              onChange={(e) => set('excerpt', e.currentTarget.value)}
              minRows={2}
              autosize
            />

            <Textarea
              label="Details"
              placeholder="Record details (Markdown supported)"
              value={values.body}
              onChange={(e) => set('body', e.currentTarget.value)}
              minRows={8}
              autosize
              styles={{ input: { fontFamily: 'monospace' } }}
            />
          </Stack>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={5} mb="md">
            Billing
          </Title>
          <Stack gap="md">
            <Select
              label="Status"
              data={STATUS_OPTIONS}
              value={values.status}
              onChange={(v) => set('status', (v as BillingRecordFormValues['status']) ?? 'pending')}
            />

            <Select
              label="Category"
              data={CATEGORY_OPTIONS}
              value={values.category}
              error={errors.category}
              onChange={(v) => set('category', v ?? '')}
              placeholder="Select category"
              required
            />

            <TagsInput
              label="Tags"
              placeholder="Add tags and press Enter"
              value={values.tags}
              onChange={(t) => set('tags', t)}
            />
          </Stack>
        </Card>

        <Group justify="flex-end" gap="sm">
          {onCancel && (
            <AppButton variant="secondary" onClick={onCancel} disabled={loading}>
              Cancel
            </AppButton>
          )}
          <AppButton type="submit" loading={loading}>
            {initial ? 'Save changes' : 'Create record'}
          </AppButton>
        </Group>
      </Stack>
    </form>
  )
}
