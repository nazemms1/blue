import { Stack, Badge, ActionIcon, Group, Text } from "@mantine/core";
import { IconFileText, IconDownload, IconChartBar, IconEye } from "@tabler/icons-react";
import { PageHeader, DataTable, type DataTableColumn } from "@shared/ui";
import { AppButton } from "@shared/components";

interface Report {
  id: string;
  title: string;
  type: string;
  generatedDate: string;
  size: string;
  status: "ready" | "generating" | "failed";
}

const MOCK_REPORTS: Report[] = [
  { id: "1", title: "Monthly Financial Audit - Q1", type: "Financial", generatedDate: "2026-04-01", size: "2.4 MB", status: "ready" },
  { id: "2", title: "Tax Compliance Summary 2025", type: "Tax", generatedDate: "2026-03-15", size: "1.1 MB", status: "ready" },
  { id: "3", title: "Client Outstanding Analysis", type: "Internal", generatedDate: "2026-04-12", size: "0.5 MB", status: "generating" },
  { id: "4", title: "Annual Revenue Forecast", type: "Financial", generatedDate: "2026-01-10", size: "5.8 MB", status: "failed" },
];

export function BillingReportsPage() {
  const columns: DataTableColumn<Report>[] = [
    { 
      key: "title", 
      label: "Report Name", 
      render: (val) => (
        <Group gap="xs">
          <IconFileText size={18} color="rgba(0,0,0,0.3)"/>
          <Text fw={700}>{val}</Text>
        </Group>
      ) 
    },
    { key: "type", label: "Category" },
    { key: "generatedDate", label: "Created On" },
    { key: "size", label: "File Size" },
    { 
      key: "status", 
      label: "Status", 
      render: (val) => (
        <Badge 
          variant="dot" 
          color={val === "ready" ? "blue" : val === "generating" ? "yellow" : "red"}
        >
          {val}
        </Badge>
      ) 
    },
  ];

  return (
    <Stack gap="xl">
      <PageHeader 
        title="Reports" 
        description="Comprehensive analysis and downloadable financial insights"
        actions={
          <AppButton leftSection={<IconChartBar size={18}/>}>Generate New Report</AppButton>
        }
      />
      
      <DataTable 
        data={MOCK_REPORTS} 
        columns={columns} 
        onSearch={(q) => console.log("Search Reports:", q)}
        rowActions={(row) => (
          <Group gap="xs">
            <ActionIcon variant="light" color="blue"><IconEye size={18}/></ActionIcon>
            <ActionIcon variant="subtle" color={row.status === "ready" ? "green" : "gray"} disabled={row.status !== "ready"}>
              <IconDownload size={18}/>
            </ActionIcon>
          </Group>
        )}
      />
    </Stack>
  );
}
