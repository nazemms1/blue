import { Stack } from "@mantine/core";
import { PageHeader } from "@shared/ui";

interface BillingPlaceholderPageProps {
  title: string;
  description: string;
}

export function BillingPlaceholderPage({ title, description }: BillingPlaceholderPageProps) {
  return (
    <Stack gap="lg">
      <PageHeader
        title={title}
        description={description}
      />
      <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'var(--mantine-color-white)', borderRadius: '8px', border: '1px dashed var(--mantine-color-gray-3)' }}>
        {title} content will be implemented here.
      </div>
    </Stack>
  );
}
