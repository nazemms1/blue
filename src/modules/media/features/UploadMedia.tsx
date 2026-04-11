import {
  Group,
  Modal,
  Stack,
  Text,
  TagsInput,
  Progress,
  ThemeIcon,
  Center,
} from '@mantine/core'
import { AppButton } from '@shared/components'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { useState, useRef } from 'react'
import { notifications } from '@mantine/notifications'

interface UploadMediaProps {
  opened: boolean
  onClose: () => void
  onUpload: (file: File, tags: string[]) => Promise<unknown>
}

export function UploadMedia({ opened, onClose, onUpload }: UploadMediaProps) {
  const [file, setFile] = useState<File | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (dropped) setFile(dropped)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) setFile(selected)
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? 90 : p + 10))
    }, 80)
    try {
      await onUpload(file, tags)
      clearInterval(interval)
      setProgress(100)
      notifications.show({
        title: 'Upload complete',
        message: `${file.name} has been uploaded.`,
        color: 'green',
      })
      handleClose()
    } catch {
      clearInterval(interval)
      notifications.show({
        title: 'Upload failed',
        message: 'Please try again.',
        color: 'red',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleClose = () => {
    if (uploading) return
    setFile(null)
    setTags([])
    setProgress(0)
    onClose()
  }

  return (
    <Modal opened={opened} onClose={handleClose} title="Upload Media" centered size="md">
      <Stack gap="md">
        <div
          style={{
            border: '2px dashed var(--mantine-color-blue-3)',
            borderRadius: 'var(--mantine-radius-md)',
            padding: 'var(--mantine-spacing-xl)',
            cursor: 'pointer',
            background: file ? 'var(--mantine-color-blue-0)' : undefined,
          }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
          />
          <Center>
            <Stack align="center" gap="xs">
              <ThemeIcon size={48} radius="xl" variant="light" color="blue">
                {file ? <IconPhoto size={24} /> : <IconUpload size={24} />}
              </ThemeIcon>
              {file ? (
                <Group gap={4}>
                  <Text size="sm" fw={500}>
                    {file.name}
                  </Text>
                  <IconX
                    size={14}
                    style={{ cursor: 'pointer', color: 'var(--mantine-color-red-5)' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setFile(null)
                    }}
                  />
                </Group>
              ) : (
                <>
                  <Text size="sm" fw={500}>
                    Drag & drop or click to select
                  </Text>
                  <Text size="xs" c="dimmed">
                    Images, videos, audio, documents
                  </Text>
                </>
              )}
            </Stack>
          </Center>
        </div>

        <TagsInput
          label="Tags"
          placeholder="Add tags and press Enter"
          value={tags}
          onChange={setTags}
        />

        {uploading && (
          <Progress value={progress} animated size="sm" />
        )}

        <Group justify="flex-end" gap="sm">
          <AppButton variant="secondary" onClick={handleClose} disabled={uploading}>
            Cancel
          </AppButton>
          <AppButton
            leftSection={<IconUpload size={16} />}
            onClick={handleUpload}
            disabled={!file}
            loading={uploading}
          >
            Upload
          </AppButton>
        </Group>
      </Stack>
    </Modal>
  )
}
