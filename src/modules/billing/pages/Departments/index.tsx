import { Stack, Badge, ActionIcon, Group, Text } from "@mantine/core";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { PageHeader, DataTable, type DataTableColumn } from "@shared/ui";
import { AppButton } from "@shared/components";

interface Department {
  id: string;
  name: string;
  code: string;
  manager: string;
  employees: number;
  status: "active" | "inactive";
}

const MOCK_DEPARTMENTS: Department[] = [
  { id: "1", name: "Financial Services", code: "FIN-01", manager: "John Doe", employees: 12, status: "active" },
  { id: "2", name: "Human Resources", code: "HR-05", manager: "Jane Smith", employees: 5, status: "inactive" },
  { id: "3", name: "Information Technology", code: "IT-10", manager: "Mike Chen", employees: 25, status: "active" },
  { id: "4", name: "Marketing & Sales", code: "MKT-02", manager: "Sarah Wilson", employees: 18, status: "active" },
];

export function BillingDepartmentsPage() {
  const columns: DataTableColumn<Department>[] = [
    { key: "name", label: "Department Name", render: (val) => <Text fw={700}>{val}</Text> },
    { key: "code", label: "Group Code" },
    { key: "manager", label: "Lead Manager" },
    { key: "employees", label: "Staff Count" },
    { 
      key: "status", 
      label: "Status", 
      render: (val) => (
        <Badge variant="light" color={val === "active" ? "green" : "red"}>
          {val}
        </Badge>
      ) 
    },
  ];

  return (
    <Stack gap="xl">
      <PageHeader 
        title="Departments" 
        description="Manage organizational departments and business units"
        actions={
          <AppButton leftSection={<IconPlus size={18}/>}>Create Department</AppButton>
        }
      />
      
      <DataTable 
        data={MOCK_DEPARTMENTS} 
        columns={columns} 
        onSearch={(q) => console.log("Search Departments:", q)}
        rowActions={( ) => (
          <Group gap="xs">
            <ActionIcon variant="subtle" color="blue"><IconEdit size={18}/></ActionIcon>
            <ActionIcon variant="subtle" color="red"><IconTrash size={18}/></ActionIcon>
          </Group>
        )}
      />
    </Stack>
  );
}
