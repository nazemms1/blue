import { IconEdit, IconTrash, IconUserPlus, IconExternalLink, IconEye } from "@tabler/icons-react";
import { PageHeader, DataTable, type DataTableColumn } from "@shared/ui";
import { AppButton } from "@shared/components";
import { useNavigate } from "react-router-dom";
import { ActionIcon, Badge, Group, Stack,Text } from "@mantine/core";

interface Client {
  id: string;
  company: string;
  contact: string;
  totalInvoiced: string;
  balance: string;
  status: "active" | "archived";
}

const MOCK_CLIENTS: Client[] = [
  { id: "1", company: "Al-Noor Enterprises", contact: "Sameer J.", totalInvoiced: "$12,400", balance: "$2,100", status: "active" },
  { id: "2", company: "Global Logistics Ltd", contact: "Robert M.", totalInvoiced: "$45,000", balance: "$0", status: "active" },
  { id: "3", company: "Creative Agency", contact: "Elena Fisher", totalInvoiced: "$8,900", balance: "$450", status: "active" },
  { id: "4", company: "Old Supplies Co.", contact: "Mark T.", totalInvoiced: "$2,300", balance: "$0", status: "archived" },
];

export function BillingClientsPage() {
  const navigate = useNavigate();

  const columns: DataTableColumn<Client>[] = [
    { key: "company", label: "Company Name", render: (val) => <Text fw={700} c="blue.7">{val}</Text> },
    { key: "contact", label: "Primary Contact" },
    { key: "totalInvoiced", label: "Total Revenue" },
    { 
      key: "balance", 
      label: "Outstanding", 
      render: (val) => <Text fw={700} color={val !== "$0" ? "red.7" : "green.7"}>{val}</Text> 
    },
    { 
      key: "status", 
      label: "Status", 
      render: (val) => (
        <Badge variant="filled" color={val === "active" ? "blue" : "gray"}>
          {val}
        </Badge>
      ) 
    },
  ];

  return (
    <Stack gap="xl">
      <PageHeader 
        title="Clients" 
        description="Relationship management and client financial summaries"
        actions={
          <AppButton leftSection={<IconUserPlus size={18}/>}>Add Client</AppButton>
        }
      />
      
      <DataTable 
        data={MOCK_CLIENTS} 
        columns={columns} 
        onSearch={(q) => console.log("Search Clients:", q)}
        rowActions={(row) => (
          <Group gap="xs">
            <ActionIcon variant="subtle" color="blue" onClick={() => navigate(`/billing/clients/${row.id}/view`)}>
              <IconEye size={18}/>
            </ActionIcon>
            <ActionIcon variant="light" color="blue"><IconExternalLink size={18}/></ActionIcon>
            <ActionIcon variant="subtle" color="gray"><IconEdit size={18}/></ActionIcon>
            <ActionIcon variant="subtle" color="red"><IconTrash size={18}/></ActionIcon>
          </Group>
        )}
      />
    </Stack>
  );
}
