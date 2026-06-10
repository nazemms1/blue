import {
  Table,
  ScrollArea,
  TextInput,
  Group,
 
  Text,
  LoadingOverlay,
  Box,
  Pagination,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState, useRef, type ReactNode } from "react";
import classes from "./DataTable.module.css";
import { EmptyState } from "../EmptyState";

export interface DataTableColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: number;
  render?: (value: any, row: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  filters?: ReactNode;
  rowActions?: (row: T) => ReactNode;
  pagination?: {
    total: number;
    page: number;
    onChange: (page: number) => void;
  };
  emptyMessage?: string;
  emptyDescription?: string;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  searchPlaceholder = "Search...",
  onSearch,
  filters,
  rowActions,
  pagination,
  emptyMessage = "No data found",
  emptyDescription = "Try adjusting your search or filters",
}: DataTableProps<T>) {
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(
    Object.fromEntries(columns.map(c => [c.key, c.width || 150]))
  );
  
  const resizingColumn = useRef<{ key: string; startX: number; startWidth: number } | null>(null);

  const onMouseDown = (key: string, e: React.MouseEvent) => {
    resizingColumn.current = {
      key,
      startX: e.pageX,
      startWidth: columnWidths[key],
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!resizingColumn.current) return;
    const { key, startX, startWidth } = resizingColumn.current;
    const delta = e.pageX - startX;
    setColumnWidths(prev => ({
      ...prev,
      [key]: Math.max(50, startWidth + delta),
    }));
  };

  const onMouseUp = () => {
    resizingColumn.current = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  return (
    <div className={classes.tableWrapper}>
      <LoadingOverlay visible={loading} overlayProps={{ blur: 1 }} />

      {/* Toolbar */}
      <Group justify="space-between" className={classes.toolbar} wrap="wrap">
        <Group style={{ flex: 1 }}>
          {onSearch && (
            <TextInput
              placeholder={searchPlaceholder}
              className={classes.searchInput}
              leftSection={<IconSearch size={16} stroke={1.5} />}
              onChange={(e) => onSearch(e.currentTarget.value)}
              radius="md"
            />
          )}
          {filters}
        </Group>
      </Group>

      {/* Table Container */}
      <div className={classes.tableContainer}>
        <ScrollArea offsetScrollbars>
          <Table verticalSpacing="xs" className={classes.table} layout="fixed">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} style={{ width: columnWidths[col.key] }}>
                    <div className={classes.headerCell}>
                      <span className={classes.headerLabel}>{col.label}</span>
                      <div 
                        className={classes.resizer} 
                        onMouseDown={(e) => onMouseDown(col.key, e)}
                      />
                    </div>
                  </th>
                ))}
                {rowActions && <th style={{ width: 60, textAlign: 'center' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={row.id} style={{ '--row-index': index } as any}>
                    {columns.map((col) => (
                      <td key={col.key} style={{ width: columnWidths[col.key] }}>
                        <div className={classes.cellContent}>
                          {col.render
                            ? col.render((row as any)[col.key], row)
                            : (row as any)[col.key]?.toString() || "—"}
                        </div>
                      </td>
                    ))}
                    {rowActions && (
                      <td className={classes.actionsCell}>
                        {rowActions(row)}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                !loading && (
                  <tr>
                    <td colSpan={columns.length + (rowActions ? 1 : 0)}>
                      <Box py={80}>
                        <EmptyState 
                          title={emptyMessage} 
                          description={emptyDescription} 
                        />
                      </Box>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </ScrollArea>
      </div>

      {/* Pagination */}
      {pagination && data.length > 0 && (
        <Group justify="space-between" className={classes.pagination}>
          <Text size="xs" c="dimmed" fw={600}>
            Showing {data.length} entries
          </Text>
          <Pagination
            total={pagination.total}
            value={pagination.page}
            onChange={pagination.onChange}
            radius="md"
            size="sm"
          />
        </Group>
      )}
    </div>
  );
}
