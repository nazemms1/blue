import { useState } from 'react'
import { notifications } from '@mantine/notifications'
import { ConfirmModal } from '@shared/ui'

interface DeleteArticleProps {
  articleId: string | null
  articleTitle?: string
  onClose: () => void
  onDelete: (id: string) => Promise<void>
}

export function DeleteArticle({
  articleId,
  articleTitle,
  onClose,
  onDelete,
}: DeleteArticleProps) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    if (!articleId) return
    setLoading(true)
    try {
      await onDelete(articleId)
      notifications.show({
        title: 'Article deleted',
        message: `"${articleTitle ?? articleId}" has been deleted.`,
        color: 'red',
      })
      onClose()
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Could not delete article.',
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ConfirmModal
      opened={articleId !== null}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Delete article"
      message={`Are you sure you want to delete "${articleTitle ?? articleId}"? This action cannot be undone.`}
      confirmLabel="Delete"
      loading={loading}
      danger
    />
  )
}
