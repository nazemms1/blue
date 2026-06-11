import { Stack, TextInput, Textarea, Select, Group, Card, Title, NumberInput, MultiSelect, Text } from "@mantine/core";
import { AppButton } from "@shared/components";
import { useState } from "react";
import type { Song } from "@modules/cms/model";

export interface SongFormValues {
  title: string;
  titleAr: string;
  duration: number;
  plays: number;
  genres: string[];
  status: "draft" | "published" | "archived";
}

const GENRE_OPTIONS = ["Pop", "Classical", "Rock", "Hip Hop", "Jazz", "Traditional", "R&B", "Blues", "Metal"];
const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

interface SongFormProps {
  initial?: Song & { singerName?: string; albumTitle?: string };
  onSubmit: (values: SongFormValues) => Promise<void>;
  loading?: boolean;
  onCancel?: () => void;
}

export function SongForm({ initial, onSubmit, loading, onCancel }: SongFormProps) {
  const [values, setValues] = useState<SongFormValues>({
    title: initial?.title ?? "",
    titleAr: initial?.titleAr ?? "",
    duration: initial?.duration ?? 0,
    plays: initial?.plays ?? 0,
    genres: initial?.genres ?? [],
    status: initial?.status ?? "draft",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SongFormValues, string>>>({});

  const set = <K extends keyof SongFormValues>(key: K, value: SongFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!values.title.trim()) e.title = "Title is required";
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
          <Title order={5} mb="md">Song Details</Title>
          <Stack gap="md">
            {initial?.singerName && <Text size="sm" c="dimmed">Singer: {initial.singerName} · Album: {initial.albumTitle}</Text>}
            <TextInput label="Title (EN)" placeholder="Song title" value={values.title} error={errors.title} required
              onChange={(e) => set("title", e.currentTarget.value)} />
            <TextInput label="Title (AR)" placeholder="عنوان الأغنية" value={values.titleAr} onChange={(e) => set("titleAr", e.currentTarget.value)} />
            <Group grow>
              <NumberInput label="Duration (sec)" placeholder="e.g. 240" value={values.duration} onChange={(v) => set("duration", Number(v) || 0)} min={0} />
              <NumberInput label="Plays" placeholder="e.g. 1000000" value={values.plays} onChange={(v) => set("plays", Number(v) || 0)} min={0} />
            </Group>
            <MultiSelect label="Genres" data={GENRE_OPTIONS} value={values.genres} onChange={(v) => set("genres", v)} placeholder="Select genres" />
          </Stack>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={5} mb="md">Status</Title>
          <Stack gap="md">
            <Select label="Status" data={STATUS_OPTIONS} value={values.status} onChange={(v) => set("status", (v as SongFormValues["status"]) ?? "draft")} />
          </Stack>
        </Card>

        <Group justify="flex-end" gap="sm">
          {onCancel && <AppButton variant="secondary" onClick={onCancel} disabled={loading}>Cancel</AppButton>}
          <AppButton type="submit" loading={loading}>{initial ? "Save changes" : "Create song"}</AppButton>
        </Group>
      </Stack>
    </form>
  );
}
