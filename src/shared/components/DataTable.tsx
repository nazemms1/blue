import { Table, Text, ScrollArea, Skeleton, Stack } from '@mantine/core'
import type { ReactNode } from 'react'

export interface Column<T> {
  key: string
  header: string
  render?: (row: T) => ReactNode
  width?: number | string
}

interface DataTableProps<T extends object> {
  columns: Column<T>[]
  data: T[]
  rowKey: keyof T
  loading?: boolean
  emptyMessage?: string
}

function SkeletonRows({ cols, rows }: { cols: number; rows: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, ri) => (
        <Table.Tr key={ri}>
          {Array.from({ length: cols }).map((_, ci) => (
            <Table.Td key={ci}>
              <Skeleton height={16} radius="sm" />
            </Table.Td>
          ))}
        </Table.Tr>
      ))}
    </>
  )
}

export function DataTable<T extends object>({
  columns,
  data,
  rowKey,
  loading = false,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  return (
    <ScrollArea>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            {columns.map((col) => (
              <Table.Th key={col.key} w={col.width}>
                {col.header}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <SkeletonRows cols={columns.length} rows={5} />
          ) : data.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={columns.length}>
                <Stack align="center" py="xl">
                  <Text c="dimmed" size="sm">
                    {emptyMessage}
                  </Text>
                </Stack>
              </Table.Td>
            </Table.Tr>
          ) : (
            data.map((row) => (
              <Table.Tr key={String(row[rowKey])}>
                {columns.map((col) => (
                  <Table.Td key={col.key}>
                    {col.render
                      ? col.render(row)
                      : (row as Record<string, unknown>)[col.key] as ReactNode}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  )
}
