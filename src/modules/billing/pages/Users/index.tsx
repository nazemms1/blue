import { Stack, Badge, ActionIcon, Group, Text, Avatar } from "@mantine/core";
import { IconEdit, IconTrash, IconUserPlus } from "@tabler/icons-react";
import { PageHeader, DataTable, type DataTableColumn } from "@shared/ui";
import { AppButton } from "@shared/components";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: "online" | "offline";
}

const MOCK_USERS: User[] = [
  { id: "1", name: "Ahmed Salem", email: "ahmed@example.com", role: "Super Admin", lastLogin: "2 mins ago", status: "online" },
  { id: "2", name: "Laila H.", email: "laila@example.com", role: "Accountant", lastLogin: "1 hour ago", status: "online" },
  { id: "3", name: "Omar Khalid", email: "omar@example.com", role: "Manager", lastLogin: "Yesterday", status: "offline" },
  { id: "4", name: "Fatima Noor", email: "fatima@example.com", role: "Clerk", lastLogin: "3 days ago", status: "offline" },
];

export function BillingUsersPage() {
  const columns: DataTableColumn<User>[] = [
    { 
      key: "name", 
      label: "User", 
      render: (_, row) => (
        <Group gap="sm">
          <Avatar radius="xl" color="blue" src={null}>{row.name[0]}</Avatar>
          <div>
            <Text size="sm" fw={700}>{row.name}</Text>
            <Text size="xs" c="dimmed">{row.email}</Text>
          </div>
        </Group>
      ) 
    },
    { key: "role", label: "Position" },
    { key: "lastLogin", label: "Last Activity" },
    { 
      key: "status", 
      label: "Status", 
      render: (val) => (
        <Badge variant="dot" color={val === "online" ? "green" : "gray"}>
          {val}
        </Badge>
      ) 
    },
  ];

  return (
    <Stack gap="xl">
      <PageHeader 
        title="Users" 
        description="Monitor system access and manage staff roles"
        actions={
          <AppButton leftSection={<IconUserPlus size={18}/>}>Invite User</AppButton>
        }
      />
      
      <DataTable 
        data={MOCK_USERS} 
        columns={columns} 
        onSearch={(q) => console.log("Search Users:", q)}
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
