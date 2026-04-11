import { TextInput } from '@mantine/core'
import { IconSearch, IconX } from '@tabler/icons-react'
import { useState, useEffect } from 'react'

interface SearchInputProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  debounce?: number
}

export function SearchInput({
  value = '',
  onChange,
  placeholder = 'Search…',
  debounce = 300,
}: SearchInputProps) {
  const [local, setLocal] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => onChange(local), debounce)
    return () => clearTimeout(timer)
  }, [local, debounce, onChange])

  useEffect(() => {
    setLocal(value)
  }, [value])

  return (
    <TextInput
      leftSection={<IconSearch size={16} />}
      rightSection={
        local ? (
          <IconX
            size={16}
            style={{ cursor: 'pointer' }}
            onClick={() => setLocal('')}
          />
        ) : null
      }
      placeholder={placeholder}
      value={local}
      onChange={(e) => setLocal(e.currentTarget.value)}
    />
  )
}
