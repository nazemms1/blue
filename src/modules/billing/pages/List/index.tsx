import { Stack } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { AppButton } from '@shared/components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@shared/ui'
import { useBillingStore } from '../../model/store'
import { BillingRecordsTable } from '../../widgets/BillingRecordsTable'
import { DeleteBillingRecord } from '../../features/DeleteBillingRecord'

export function BillingListPage() {
  const { records, loading, fetchRecords, deleteRecord } = useBillingStore()
  const navigate = useNavigate()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  const deleteTarget = records.find((r) => r.id === deleteId)

  return (
    <Stack gap="lg">
      <PageHeader
        title="Billing Records"
        description="View and manage all financial records"
        actions={
          <AppButton leftSection={<IconPlus size={16} />} onClick={() => navigate('/billing/articles/new')}>
            New Record
          </AppButton>
        }
      />

      <BillingRecordsTable articles={records} loading={loading} onDelete={setDeleteId} />

      <DeleteBillingRecord
        articleId={deleteId}
        articleTitle={deleteTarget?.title}
        onClose={() => setDeleteId(null)}
        onDelete={deleteRecord}
      />
    </Stack>
  )
}
