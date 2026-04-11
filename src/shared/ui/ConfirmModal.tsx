import { Group, Modal, Text } from '@mantine/core'
import { AppButton } from '@shared/components'

interface ConfirmModalProps {
  opened: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  loading?: boolean
  danger?: boolean
}

export function ConfirmModal({
  opened,
  onClose,
  onConfirm,
  title = 'Confirm action',
  message = 'Are you sure you want to proceed?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
  danger = false,
}: ConfirmModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered size="sm">
      <Text size="sm" c="dimmed" mb="lg">
        {message}
      </Text>
      <Group justify="flex-end" gap="sm">
        <AppButton variant="secondary" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </AppButton>
        <AppButton
          variant={danger ? 'danger' : 'primary'}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmLabel}
        </AppButton>
      </Group>
    </Modal>
  )
}
