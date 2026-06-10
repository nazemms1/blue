import { Select, Text, Box } from '@mantine/core'
import { useState } from 'react'
import type { BillingRecord } from '../model/types'
import { DataTable, type DataTableColumn } from '@shared/ui'
import { BillingRecordRowActions, BillingRecordStatusBadge, BillingRecordMetaText } from '../entities/BillingRecordRow'

interface BillingRecordsTableProps {
  articles: BillingRecord[]
  loading?: boolean
  onDelete: (id: string) => void
}

const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'canceled', label: 'Canceled' },
]

export function BillingRecordsTable({ articles, loading, onDelete }: BillingRecordsTableProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = articles.filter((a) => {
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const columns: DataTableColumn<BillingRecord>[] = [
    {
      key: 'title',
      label: 'Record Details',
      render: (_, row) => (
        <Box>
          <Text size="md" fw={700} c="slate.9" lineClamp={1}>
            {row.title}
          </Text>
          <BillingRecordMetaText article={row} />
        </Box>
      ),
    },
    {
      key: 'author',
      label: 'Manager',
      render: (_, row) => (
        <Text size="sm" fw={600} c="slate.7">
          {row.author}
        </Text>
      ),
      width: 160,
    },
    {
      key: 'status',
      label: 'Payment Status',
      render: (_, row) => <BillingRecordStatusBadge status={row.status} />,
      width: 140,
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={filtered}
      loading={loading}
      onSearch={setSearch}
      searchPlaceholder="Search by title or content..."
      filters={
        <Select
          data={STATUS_FILTER_OPTIONS}
          value={statusFilter}
          onChange={(v) => setStatusFilter(v ?? 'all')}
          placeholder="Filter Status"
          w={180}
          radius="md"
          variant="filled"
          styles={{
            input: { 
              backgroundColor: '#f8fafc', 
              border: '1px solid rgba(0,0,0,0.05)',
              height: '48px',
              fontWeight: 600
            }
          }}
        />
      }
      rowActions={(row) => (
        <BillingRecordRowActions article={row} onDelete={onDelete} />
      )}
      emptyMessage="No billing records found"
      emptyDescription="Try clearing your filters or search query"
    />
  )
}
