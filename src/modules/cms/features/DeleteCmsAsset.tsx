import { useState } from 'react'
import { notifications } from '@mantine/notifications'
import { ConfirmModal } from '@shared/ui'

interface DeleteCmsAssetProps {
  itemId: string | null
  itemName?: string
  onClose: () => void
  onDelete: (id: string) => Promise<void>
}

export function DeleteCmsAsset({
  itemId,
  itemName,
  onClose,
  onDelete,
}: DeleteCmsAssetProps) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    if (!itemId) return
    setLoading(true)
    try {
      await onDelete(itemId)
      notifications.show({
        title: 'Deleted',
        message: `"${itemName ?? itemId}" has been deleted.`,
        color: 'red',
      })
      onClose()
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Could not delete item.',
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ConfirmModal
      opened={itemId !== null}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Delete CMS asset"
      message={`Are you sure you want to delete "${itemName ?? itemId}"? This action cannot be undone.`}
      confirmLabel="Delete"
      loading={loading}
      danger
    />
  )
}
