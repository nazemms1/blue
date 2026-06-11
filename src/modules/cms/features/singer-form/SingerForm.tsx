import { Stack, TextInput, Textarea, Select, Group, Card, Title, MultiSelect } from "@mantine/core";
import { AppButton } from "@shared/components";
import { useState } from "react";
import type { Singer } from "@modules/cms/model";

export interface SingerFormValues {
  name: string;
  nameAr: string;
  bio: string;
  genres: string[];
  status: "draft" | "published" | "archived";
}

const GENRE_OPTIONS = ["Pop", "Classical", "Rock", "Hip Hop", "Jazz", "Traditional", "R&B"];
const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

interface SingerFormProps {
  initial?: Singer;
  onSubmit: (values: SingerFormValues) => Promise<void>;
  loading?: boolean;
  onCancel?: () => void;
}

export function SingerForm({ initial, onSubmit, loading, onCancel }: SingerFormProps) {
  const [values, setValues] = useState<SingerFormValues>({
    name: initial?.name ?? "",
    nameAr: initial?.nameAr ?? "",
    bio: initial?.bio ?? "",
    genres: initial?.genres ?? [],
    status: initial?.status ?? "draft",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SingerFormValues, string>>>({});

  const set = <K extends keyof SingerFormValues>(key: K, value: SingerFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!values.name.trim()) e.name = "Name is required";
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
          <Title order={5} mb="md">Singer Details</Title>
          <Stack gap="md">
            <TextInput label="Name (EN)" placeholder="Singer name" value={values.name} error={errors.name} required
              onChange={(e) => set("name", e.currentTarget.value)} />
            <TextInput label="Name (AR)" placeholder="اسم المطرب" value={values.nameAr} onChange={(e) => set("nameAr", e.currentTarget.value)} />
            <MultiSelect label="Genres" data={GENRE_OPTIONS} value={values.genres} onChange={(v) => set("genres", v)} placeholder="Select genres" />
          </Stack>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={5} mb="md">Bio</Title>
          <Stack gap="md">
            <Textarea label="Bio" placeholder="Singer biography" value={values.bio} onChange={(e) => set("bio", e.currentTarget.value)} minRows={3} autosize />
          </Stack>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={5} mb="md">Status</Title>
          <Stack gap="md">
            <Select label="Status" data={STATUS_OPTIONS} value={values.status} onChange={(v) => set("status", (v as SingerFormValues["status"]) ?? "draft")} />
          </Stack>
        </Card>

        <Group justify="flex-end" gap="sm">
          {onCancel && <AppButton variant="secondary" onClick={onCancel} disabled={loading}>Cancel</AppButton>}
          <AppButton type="submit" loading={loading}>{initial ? "Save changes" : "Create singer"}</AppButton>
        </Group>
      </Stack>
    </form>
  );
}
