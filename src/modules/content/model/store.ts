import { useState, useCallback } from 'react'
import type { Article, ArticleFormValues } from './types'
import { generateId } from '@shared/utils'

const CATEGORIES = ['Technology', 'Design', 'Business', 'Marketing', 'News']

const MOCK_ARTICLES: Article[] = Array.from({ length: 10 }, (_, i) => ({
  id: generateId(),
  title: [
    'Getting Started with Feature-Sliced Design',
    'Building Scalable React Applications',
    'The Power of Mantine UI Components',
    'TypeScript Best Practices in 2025',
    'Designing for Accessibility',
    'State Management Patterns',
    'REST vs GraphQL: A Comparison',
    'Micro-frontends Architecture',
    'CI/CD for Frontend Teams',
    'Performance Optimisation Tips',
  ][i],
  slug: `article-${i + 1}`,
  excerpt: 'A deep dive into modern frontend engineering patterns and best practices.',
  body: '# Introduction\n\nThis article explores the topic in depth...',
  status: (['draft', 'published', 'published', 'archived', 'published'] as const)[i % 5],
  author: 'Admin User',
  category: CATEGORIES[i % CATEGORIES.length],
  tags: i % 2 === 0 ? ['frontend', 'react'] : ['architecture'],
  publishedAt: i % 3 !== 0 ? new Date(Date.now() - i * 86400000).toISOString() : undefined,
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
}))

export function useContentStore() {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES)
  const [loading, setLoading] = useState(false)

  const fetchArticles = useCallback(async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    setLoading(false)
  }, [])

  const getById = useCallback(
    (id: string) => articles.find((a) => a.id === id) ?? null,
    [articles]
  )

  const createArticle = useCallback(async (values: ArticleFormValues): Promise<Article> => {
    await new Promise((r) => setTimeout(r, 500))
    const article: Article = {
      ...values,
      id: generateId(),
      author: 'Admin User',
      publishedAt: values.status === 'published' ? new Date().toISOString() : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setArticles((prev) => [article, ...prev])
    return article
  }, [])

  const updateArticle = useCallback(async (id: string, values: Partial<ArticleFormValues>): Promise<Article> => {
    await new Promise((r) => setTimeout(r, 500))
    let updated: Article | null = null
    setArticles((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a
        updated = { ...a, ...values, updatedAt: new Date().toISOString() }
        return updated
      })
    )
    if (!updated) throw new Error('Article not found')
    return updated
  }, [])

  const deleteArticle = useCallback(async (id: string) => {
    await new Promise((r) => setTimeout(r, 300))
    setArticles((prev) => prev.filter((a) => a.id !== id))
  }, [])

  return {
    articles,
    loading,
    fetchArticles,
    getById,
    createArticle,
    updateArticle,
    deleteArticle,
  }
}
