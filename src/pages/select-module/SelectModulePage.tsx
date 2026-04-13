import { SimpleGrid, Stack, Alert } from "@mantine/core";
import { IconPhoto, IconFileText, IconLock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@shared/ui";
import { AppCard } from "@shared/components";
import { useAuthContext } from "@app/providers";
import type { Permission } from "@shared/types";
import type { MantineColor } from "@mantine/core";

interface ModuleCard {
  id: string;
  permission: Permission;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: MantineColor;
  badge: string;
}

const ALL_MODULES: ModuleCard[] = [
  {
    id: "media",
    permission: "media",
    title: "Media",
    description:
      "Upload, organise and manage images, videos, and all digital assets for your projects.",
    href: "/media",
    icon: <IconPhoto size={28} />,
    color: "violet",
    badge: "Assets",
  },
  {
    id: "billing",
    permission: "billing",
    title: "Billing",
    description:
      "Manage invoices, subscriptions, payments, and financial records for your platform.",
    href: "/billing",
    icon: <IconFileText size={28} />,
    color: "blue",
    badge: "Billing",
  },
];

export function SelectModulePage() {
  const navigate = useNavigate();
  const { user, can } = useAuthContext();

  const accessibleModules = ALL_MODULES.filter((m) => can(m.permission));

  return (
    <Stack gap="xl" mx="auto">
      <PageHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] ?? "there"}`}
        description="Select a module to get started."
        order={2}
      />

      {accessibleModules.length === 0 && (
        <Alert icon={<IconLock size={16} />} color="orange" variant="light">
          Your account has no module permissions assigned. Contact an
          administrator.
        </Alert>
      )}

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        {accessibleModules.map((mod) => (
          <AppCard.Module
            key={mod.id}
            title={mod.title}
            description={mod.description}
            icon={mod.icon}
            color={mod.color}
            badge={mod.badge}
            onClick={() => navigate(mod.href)}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
