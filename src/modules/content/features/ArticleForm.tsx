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
import type { Article, ArticleFormValues } from '../model/types'

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
]

const CATEGORY_OPTIONS = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Design', label: 'Design' },
  { value: 'Business', label: 'Business' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'News', label: 'News' },
]

interface ArticleFormProps {
  initial?: Article
  onSubmit: (values: ArticleFormValues) => Promise<void>
  loading?: boolean
  onCancel?: () => void
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function ArticleForm({ initial, onSubmit, loading, onCancel }: ArticleFormProps) {
  const [values, setValues] = useState<ArticleFormValues>({
    title: initial?.title ?? '',
    slug: initial?.slug ?? '',
    excerpt: initial?.excerpt ?? '',
    body: initial?.body ?? '',
    status: initial?.status ?? 'draft',
    category: initial?.category ?? '',
    tags: initial?.tags ?? [],
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ArticleFormValues, string>>>({})

  const set = <K extends keyof ArticleFormValues>(key: K, value: ArticleFormValues[K]) =>
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
            Article details
          </Title>
          <Stack gap="md">
            <TextInput
              label="Title"
              placeholder="Enter article title"
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
              label="Excerpt"
              placeholder="Short description for listings"
              value={values.excerpt}
              onChange={(e) => set('excerpt', e.currentTarget.value)}
              minRows={2}
              autosize
            />

            <Textarea
              label="Body"
              placeholder="Article content (Markdown supported)"
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
            Publishing
          </Title>
          <Stack gap="md">
            <Select
              label="Status"
              data={STATUS_OPTIONS}
              value={values.status}
              onChange={(v) => set('status', (v as ArticleFormValues['status']) ?? 'draft')}
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
            {initial ? 'Save changes' : 'Create article'}
          </AppButton>
        </Group>
      </Stack>
    </form>
  )
}
