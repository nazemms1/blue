import { Group, Select, Text } from '@mantine/core'
import { useState } from 'react'
import type { BillingRecord } from '../model/types'
import { DataTable, type Column, SearchInput } from '@shared/components'
import { BillingRecordRowActions, BillingRecordStatusBadge, BillingRecordMetaText } from '../entities/BillingRecordRow'

interface BillingRecordsTableProps {
  articles: BillingRecord[]
  loading?: boolean
  onDelete: (id: string) => void
}

const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'canceled', label: 'Canceled' },
]

export function BillingRecordsTable({ articles, loading, onDelete }: BillingRecordsTableProps) {
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

  const columns: Column<BillingRecord>[] = [
    {
      key: 'title',
      header: 'Title',
      render: (row) => (
        <div>
          <Text size="sm" fw={500} lineClamp={1}>
            {row.title}
          </Text>
          <BillingRecordMetaText article={row} />
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <BillingRecordStatusBadge status={row.status} />,
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
      render: (row) => <BillingRecordRowActions article={row} onDelete={onDelete} />,
      width: 80,
    },
  ]

  return (
    <div>
      <Group mb="md" gap="sm">
        <SearchInput value={search} onChange={setSearch} placeholder="Search records…" />
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
        emptyMessage="No billing records found."
      />
    </div>
  )
}
