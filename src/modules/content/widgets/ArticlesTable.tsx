import { Group, Select, Text } from '@mantine/core'
import { useState } from 'react'
import type { Article } from '../model/types'
import { DataTable, type Column, SearchInput } from '@shared/components'
import { ArticleRowActions, ArticleStatusBadge, ArticleMetaText } from '../entities/ArticleRow'

interface ArticlesTableProps {
  articles: Article[]
  loading?: boolean
  onDelete: (id: string) => void
}

const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
]

export function ArticlesTable({ articles, loading, onDelete }: ArticlesTableProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = articles.filter((a) => {
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !statusFilter || a.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const columns: Column<Article>[] = [
    {
      key: 'title',
      header: 'Title',
      render: (row) => (
        <div>
          <Text size="sm" fw={500} lineClamp={1}>
            {row.title}
          </Text>
          <ArticleMetaText article={row} />
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <ArticleStatusBadge status={row.status} />,
      width: 110,
    },
    {
      key: 'author',
      header: 'Author',
      render: (row) => <Text size="sm">{row.author}</Text>,
      width: 130,
    },
    {
      key: 'actions',
      header: '',
      render: (row) => <ArticleRowActions article={row} onDelete={onDelete} />,
      width: 80,
    },
  ]

  return (
    <div>
      <Group mb="md" gap="sm">
        <SearchInput value={search} onChange={setSearch} placeholder="Search articles…" />
        <Select
          data={STATUS_FILTER_OPTIONS}
          value={statusFilter}
          onChange={(v) => setStatusFilter(v ?? '')}
          placeholder="All statuses"
          w={150}
          clearable
        />
      </Group>

      <DataTable
        columns={columns}
        data={filtered}
        rowKey="id"
        loading={loading}
        emptyMessage="No articles found."
      />
    </div>
  )
}
