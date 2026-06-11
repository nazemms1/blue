import { Stack, TextInput, Textarea, Select, Group, Card, Title, NumberInput, Switch, TagsInput, MultiSelect } from "@mantine/core";
import { AppButton } from "@shared/components";
import { useState } from "react";
import type { Movie } from "@modules/cms/model";

export interface MovieFormValues {
  title: string;
  titleAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  duration: number;
  releaseDate: string;
  genres: string[];
  directors: string[];
  writers: string[];
  stars: string[];
  price: number;
  cost: number;
  isPaid: boolean;
  isAdult: boolean;
  status: "draft" | "published" | "archived";
}

const GENRE_OPTIONS = ["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Thriller", "Romance", "Animation", "Musical", "Documentary"];
const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

interface MovieFormProps {
  initial?: Movie;
  onSubmit: (values: MovieFormValues) => Promise<void>;
  loading?: boolean;
  onCancel?: () => void;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function MovieForm({ initial, onSubmit, loading, onCancel }: MovieFormProps) {
  const [values, setValues] = useState<MovieFormValues>({
    title: initial?.title ?? "",
    titleAr: initial?.titleAr ?? "",
    slug: initial?.slug ?? "",
    description: initial?.description ?? "",
    descriptionAr: initial?.descriptionAr ?? "",
    duration: initial?.duration ?? 0,
    releaseDate: initial?.releaseDate ?? "",
    genres: initial?.genres ?? [],
    directors: initial?.directors ?? [],
    writers: initial?.writers ?? [],
    stars: initial?.stars ?? [],
    price: initial?.price ?? 0,
    cost: initial?.cost ?? 0,
    isPaid: initial?.isPaid ?? false,
    isAdult: initial?.isAdult ?? false,
    status: initial?.status ?? "draft",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof MovieFormValues, string>>>({});

  const set = <K extends keyof MovieFormValues>(key: K, value: MovieFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!values.title.trim()) e.title = "Title is required";
    if (!values.slug.trim()) e.slug = "Slug is required";
    if (!values.releaseDate) e.releaseDate = "Release date is required";
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
          <Title order={5} mb="md">Movie Details</Title>
          <Stack gap="md">
            <TextInput label="Title (EN)" placeholder="Movie title" value={values.title} error={errors.title} required
              onChange={(e) => { const v = e.currentTarget.value; set("title", v); if (!initial) set("slug", slugify(v)); }} />
            <TextInput label="Title (AR)" placeholder="عنوان الفيلم" value={values.titleAr} onChange={(e) => set("titleAr", e.currentTarget.value)} />
            <TextInput label="Slug" placeholder="movie-slug" value={values.slug} error={errors.slug} required
              onChange={(e) => set("slug", e.currentTarget.value)} />
            <Group grow>
              <NumberInput label="Duration (min)" placeholder="e.g. 120" value={values.duration} onChange={(v) => set("duration", Number(v) || 0)} min={0} />
              <TextInput label="Release Date" type="date" value={values.releaseDate} error={errors.releaseDate} required
                onChange={(e) => set("releaseDate", e.currentTarget.value)} />
            </Group>
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
          <Title order={5} mb="md">Cast & Crew</Title>
          <Stack gap="md">
            <TagsInput label="Directors" placeholder="Add directors" value={values.directors} onChange={(v) => set("directors", v)} />
            <TagsInput label="Writers" placeholder="Add writers" value={values.writers} onChange={(v) => set("writers", v)} />
            <TagsInput label="Stars" placeholder="Add stars" value={values.stars} onChange={(v) => set("stars", v)} />
          </Stack>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={5} mb="md">Pricing & Status</Title>
          <Stack gap="md">
            <Group grow>
              <NumberInput label="Price ($)" placeholder="0.00" value={values.price} onChange={(v) => set("price", Number(v) || 0)} min={0} decimalScale={2} fixedDecimalScale />
              <NumberInput label="Cost ($)" placeholder="0.00" value={values.cost} onChange={(v) => set("cost", Number(v) || 0)} min={0} decimalScale={2} fixedDecimalScale />
            </Group>
            <Group grow>
              <Switch label="Paid content" checked={values.isPaid} onChange={(e) => set("isPaid", e.currentTarget.checked)} />
              <Switch label="+18 Adult content" checked={values.isAdult} onChange={(e) => set("isAdult", e.currentTarget.checked)} />
            </Group>
            <Select label="Status" data={STATUS_OPTIONS} value={values.status} onChange={(v) => set("status", (v as MovieFormValues["status"]) ?? "draft")} />
          </Stack>
        </Card>

        <Group justify="flex-end" gap="sm">
          {onCancel && <AppButton variant="secondary" onClick={onCancel} disabled={loading}>Cancel</AppButton>}
          <AppButton type="submit" loading={loading}>{initial ? "Save changes" : "Create movie"}</AppButton>
        </Group>
      </Stack>
    </form>
  );
}
