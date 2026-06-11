import { Stack, TextInput, Textarea, Select, Group, Card, Title, MultiSelect } from "@mantine/core";
import { AppButton } from "@shared/components";
import { useState } from "react";
import type { Series } from "@modules/cms/model";

export interface SeriesFormValues {
  title: string;
  titleAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  genres: string[];
  status: "draft" | "published" | "archived";
}

const GENRE_OPTIONS = ["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Thriller", "Romance", "Animation", "Documentary", "Reality", "Cooking"];
const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

interface SeriesFormProps {
  initial?: Series;
  onSubmit: (values: SeriesFormValues) => Promise<void>;
  loading?: boolean;
  onCancel?: () => void;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function SeriesForm({ initial, onSubmit, loading, onCancel }: SeriesFormProps) {
  const [values, setValues] = useState<SeriesFormValues>({
    title: initial?.title ?? "",
    titleAr: initial?.titleAr ?? "",
    slug: initial?.slug ?? "",
    description: initial?.description ?? "",
    descriptionAr: initial?.descriptionAr ?? "",
    genres: initial?.genres ?? [],
    status: initial?.status ?? "draft",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SeriesFormValues, string>>>({});

  const set = <K extends keyof SeriesFormValues>(key: K, value: SeriesFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!values.title.trim()) e.title = "Title is required";
    if (!values.slug.trim()) e.slug = "Slug is required";
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
          <Title order={5} mb="md">Series Details</Title>
          <Stack gap="md">
            <TextInput label="Title (EN)" placeholder="Series title" value={values.title} error={errors.title} required
              onChange={(e) => { const v = e.currentTarget.value; set("title", v); if (!initial) set("slug", slugify(v)); }} />
            <TextInput label="Title (AR)" placeholder="عنوان المسلسل" value={values.titleAr} onChange={(e) => set("titleAr", e.currentTarget.value)} />
            <TextInput label="Slug" placeholder="series-slug" value={values.slug} error={errors.slug} required
              onChange={(e) => set("slug", e.currentTarget.value)} />
            <MultiSelect label="Genres" data={GENRE_OPTIONS} value={values.genres} onChange={(v) => set("genres", v)} placeholder="Select genres" />
          </Stack>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={5} mb="md">Description</Title>
          <Stack gap="md">
            <Textarea label="Description (EN)" placeholder="English description" value={values.description} onChange={(e) => set("description", e.currentTarget.value)} minRows={3} autosize />
            <Textarea label="Description (AR)" placeholder="الوصف بالعربية" value={values.descriptionAr} onChange={(e) => set("descriptionAr", e.currentTarget.value)} minRows={3} autosize />
          </Stack>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={5} mb="md">Status</Title>
          <Stack gap="md">
            <Select label="Status" data={STATUS_OPTIONS} value={values.status} onChange={(v) => set("status", (v as SeriesFormValues["status"]) ?? "draft")} />
          </Stack>
        </Card>

        <Group justify="flex-end" gap="sm">
          {onCancel && <AppButton variant="secondary" onClick={onCancel} disabled={loading}>Cancel</AppButton>}
          <AppButton type="submit" loading={loading}>{initial ? "Save changes" : "Create series"}</AppButton>
        </Group>
      </Stack>
    </form>
  );
}
