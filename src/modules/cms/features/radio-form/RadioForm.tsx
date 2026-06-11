import { Stack, TextInput, Select, Group, Card, Title, Switch, MultiSelect } from "@mantine/core";
import { AppButton } from "@shared/components";
import { useState } from "react";
import type { RadioStation } from "@modules/cms/model";

export interface RadioFormValues {
  name: string;
  nameAr: string;
  streamUrl: string;
  isOnline: boolean;
  genres: string[];
  status: "draft" | "published" | "archived";
}

const GENRE_OPTIONS = ["Pop", "Top 40", "Jazz", "Blues", "Rock", "Metal", "Classical", "Hip Hop", "R&B", "News", "Talk"];
const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

interface RadioFormProps {
  initial?: RadioStation;
  onSubmit: (values: RadioFormValues) => Promise<void>;
  loading?: boolean;
  onCancel?: () => void;
}

export function RadioForm({ initial, onSubmit, loading, onCancel }: RadioFormProps) {
  const [values, setValues] = useState<RadioFormValues>({
    name: initial?.name ?? "",
    nameAr: initial?.nameAr ?? "",
    streamUrl: initial?.streamUrl ?? "",
    isOnline: initial?.isOnline ?? false,
    genres: initial?.genres ?? [],
    status: initial?.status ?? "draft",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RadioFormValues, string>>>({});

  const set = <K extends keyof RadioFormValues>(key: K, value: RadioFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!values.name.trim()) e.name = "Name is required";
    if (!values.streamUrl.trim()) e.streamUrl = "Stream URL is required";
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
          <Title order={5} mb="md">Radio Station Details</Title>
          <Stack gap="md">
            <TextInput label="Name (EN)" placeholder="Station name" value={values.name} error={errors.name} required
              onChange={(e) => set("name", e.currentTarget.value)} />
            <TextInput label="Name (AR)" placeholder="اسم المحطة" value={values.nameAr} onChange={(e) => set("nameAr", e.currentTarget.value)} />
            <TextInput label="Stream URL" placeholder="https://stream.example.com/station" value={values.streamUrl} error={errors.streamUrl} required
              onChange={(e) => set("streamUrl", e.currentTarget.value)} />
            <Switch label="Online" checked={values.isOnline} onChange={(e) => set("isOnline", e.currentTarget.checked)} />
            <MultiSelect label="Genres" data={GENRE_OPTIONS} value={values.genres} onChange={(v) => set("genres", v)} placeholder="Select genres" />
          </Stack>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={5} mb="md">Status</Title>
          <Stack gap="md">
            <Select label="Status" data={STATUS_OPTIONS} value={values.status} onChange={(v) => set("status", (v as RadioFormValues["status"]) ?? "draft")} />
          </Stack>
        </Card>

        <Group justify="flex-end" gap="sm">
          {onCancel && <AppButton variant="secondary" onClick={onCancel} disabled={loading}>Cancel</AppButton>}
          <AppButton type="submit" loading={loading}>{initial ? "Save changes" : "Create station"}</AppButton>
        </Group>
      </Stack>
    </form>
  );
}
