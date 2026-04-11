import { Stack } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { AppButton } from '@shared/components'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { notifications } from '@mantine/notifications'
import { PageHeader } from '@shared/ui'
import { useContentStore } from '../model/store'
import { ArticleForm } from '../features/ArticleForm'
import type { ArticleFormValues } from '../model/types'

export function ContentEditorPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getById, createArticle, updateArticle } = useContentStore()
  const [loading, setLoading] = useState(false)

  const existing = id ? getById(id) : null
  const isEditing = Boolean(id && existing)

  const handleSubmit = async (values: ArticleFormValues) => {
    setLoading(true)
    try {
      if (isEditing && id) {
        await updateArticle(id, values)
        notifications.show({
          title: 'Article updated',
          message: `"${values.title}" has been saved.`,
          color: 'green',
        })
      } else {
        const article = await createArticle(values)
        notifications.show({
          title: 'Article created',
          message: `"${article.title}" has been created.`,
          color: 'green',
        })
      }
      navigate('/content/articles')
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Failed to save article.',
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack gap="lg" maw={860} mx="auto">
      <PageHeader
        title={isEditing ? 'Edit Article' : 'New Article'}
        description={isEditing ? `Editing: ${existing?.title}` : 'Create a new article'}
        actions={
          <AppButton
            variant="secondary"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => navigate('/content/articles')}
          >
            Back to Articles
          </AppButton>
        }
      />

      <ArticleForm
        initial={existing ?? undefined}
        onSubmit={handleSubmit}
        loading={loading}
        onCancel={() => navigate('/content/articles')}
      />
    </Stack>
  )
}
