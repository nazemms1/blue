import { Stack, Badge, ActionIcon, Group, Text } from "@mantine/core";
import { IconCreditCard, IconReceipt, IconDownload, IconEye } from "@tabler/icons-react";
import { PageHeader, DataTable, type DataTableColumn } from "@shared/ui";
import { AppButton } from "@shared/components";
import { useNavigate } from "react-router-dom";

interface Payment {
  id: string;
  transactionId: string;
  client: string;
  date: string;
  amount: string;
  method: string;
  status: "completed" | "processing" | "failed";
}

const MOCK_PAYMENTS: Payment[] = [
  { id: "1", transactionId: "TXN-98213", client: "Al-Noor Enterprises", date: "2026-04-10", amount: "$1,250", method: "Bank Transfer", status: "completed" },
  { id: "2", transactionId: "TXN-98214", client: "Global Logistics Ltd", date: "2026-04-11", amount: "$3,400", method: "Visa **** 4242", status: "completed" },
  { id: "3", transactionId: "TXN-98215", client: "Creative Agency", date: "2026-04-12", amount: "$890", method: "PayPal", status: "processing" },
  { id: "4", transactionId: "TXN-98216", client: "Startup Inc.", date: "2026-04-12", amount: "$2,100", method: "MasterCard **** 1111", status: "failed" },
];

export function BillingPaymentPage() {
  const navigate = useNavigate();

  const columns: DataTableColumn<Payment>[] = [
    { key: "transactionId", label: "ID", render: (val) => <Text size="xs" fw={700} ff="monospace">{val}</Text> },
    { key: "client", label: "Client" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount", render: (val) => <Text fw={800}>{val}</Text> },
    { key: "method", label: "Method" },
    { 
      key: "status", 
      label: "Status", 
      render: (val) => (
        <Badge 
          variant="filled" 
          color={val === "completed" ? "green" : val === "processing" ? "yellow" : "red"}
          size="sm"
        >
          {val}
        </Badge>
      ) 
    },
  ];

  return (
    <Stack gap="xl">
      <PageHeader 
        title="Payments" 
        description="Transaction history and payment processing logs"
        actions={
          <AppButton leftSection={<IconCreditCard size={18}/>} variant="success">Process New Payment</AppButton>
        }
      />
      
      <DataTable 
        data={MOCK_PAYMENTS} 
        columns={columns} 
        onSearch={(q) => console.log("Search Payments:", q)}
        rowActions={(row) => (
          <Group gap="xs">
            <ActionIcon variant="subtle" color="blue" onClick={() => navigate(`/billing/payments/${row.id}/view`)}>
              <IconEye size={18}/>
            </ActionIcon>
            <ActionIcon variant="subtle" color="blue"><IconReceipt size={18}/></ActionIcon>
            <ActionIcon variant="subtle" color="gray"><IconDownload size={18}/></ActionIcon>
          </Group>
        )}
        emptyMessage="No payments found"
        emptyDescription="Try clearing your filters"
      />
    </Stack>
  );
}
