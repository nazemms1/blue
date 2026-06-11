import { Stack, TextInput, Select, Group, Card, Title, Switch } from "@mantine/core";
import { AppButton } from "@shared/components";
import { useState } from "react";
import type { Channel } from "@modules/cms/model";

export interface ChannelFormValues {
  name: string;
  nameAr: string;
  category: string;
  streamUrl: string;
  isActive: boolean;
  status: "draft" | "published" | "archived";
}

const CATEGORY_OPTIONS = [
  { value: "Entertainment", label: "Entertainment" },
  { value: "Sports", label: "Sports" },
  { value: "News", label: "News" },
  { value: "Documentary", label: "Documentary" },
  { value: "Kids", label: "Kids" },
];
const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

interface ChannelFormProps {
  initial?: Channel;
  onSubmit: (values: ChannelFormValues) => Promise<void>;
  loading?: boolean;
  onCancel?: () => void;
}

export function ChannelForm({ initial, onSubmit, loading, onCancel }: ChannelFormProps) {
  const [values, setValues] = useState<ChannelFormValues>({
    name: initial?.name ?? "",
    nameAr: initial?.nameAr ?? "",
    category: initial?.categoryName ?? "",
    streamUrl: initial?.streamUrl ?? "",
    isActive: initial?.isActive ?? false,
    status: initial?.status ?? "draft",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ChannelFormValues, string>>>({});

  const set = <K extends keyof ChannelFormValues>(key: K, value: ChannelFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!values.name.trim()) e.name = "Name is required";
    if (!values.category.trim()) e.category = "Category is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="lg">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={5} mb="md">Channel Details</Title>
          <Stack gap="md">
            <TextInput label="Name (EN)" placeholder="Channel name" value={values.name} error={errors.name} required
              onChange={(e) => set("name", e.currentTarget.value)} />
            <TextInput label="Name (AR)" placeholder="اسم القناة" value={values.nameAr} onChange={(e) => set("nameAr", e.currentTarget.value)} />
            <Select label="Category" data={CATEGORY_OPTIONS} value={values.category} error={errors.category} required
              onChange={(v) => set("category", v ?? "")} placeholder="Select category" />
            <TextInput label="Stream URL" placeholder="https://stream.example.com/channel" value={values.streamUrl} onChange={(e) => set("streamUrl", e.currentTarget.value)} />
            <Switch label="Active" checked={values.isActive} onChange={(e) => set("isActive", e.currentTarget.checked)} />
          </Stack>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={5} mb="md">Status</Title>
          <Stack gap="md">
            <Select label="Status" data={STATUS_OPTIONS} value={values.status} onChange={(v) => set("status", (v as ChannelFormValues["status"]) ?? "draft")} />
          </Stack>
        </Card>

        <Group justify="flex-end" gap="sm">
          {onCancel && <AppButton variant="secondary" onClick={onCancel} disabled={loading}>Cancel</AppButton>}
          <AppButton type="submit" loading={loading}>{initial ? "Save changes" : "Create channel"}</AppButton>
        </Group>
      </Stack>
    </form>
  );
}
