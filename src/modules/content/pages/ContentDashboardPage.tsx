import { Stack } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { AppButton } from '@shared/components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@shared/ui'
import { useContentStore } from '../model/store'
import { ContentStatsBar } from '../widgets/ContentStatsBar'
import { ArticlesTable } from '../widgets/ArticlesTable'
import { DeleteArticle } from '../features/DeleteArticle'

export function ContentDashboardPage() {
  const { articles, loading, fetchArticles, deleteArticle } = useContentStore()
  const navigate = useNavigate()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  const deleteTarget = articles.find((a) => a.id === deleteId)

  return (
    <Stack gap="lg">
      <PageHeader
        title="Content"
        description="Manage articles and published content"
        actions={
          <AppButton leftSection={<IconPlus size={16} />} onClick={() => navigate('/content/articles/new')}>
            New Article
          </AppButton>
        }
      />

      <ContentStatsBar articles={articles} />

      <ArticlesTable articles={articles} loading={loading} onDelete={setDeleteId} />

      <DeleteArticle
        articleId={deleteId}
        articleTitle={deleteTarget?.title}
        onClose={() => setDeleteId(null)}
        onDelete={deleteArticle}
      />
    </Stack>
  )
}
