import { Stack, TextInput, Textarea, Group, Card, Title, Switch } from "@mantine/core";
import { AppButton } from "@shared/components";
import { useState } from "react";
import type { Playlist } from "@modules/user-settings/model";

export interface PlaylistFormValues {
  name: string;
  description: string;
  isPublic: boolean;
}

interface PlaylistFormProps {
  initial?: Playlist;
  onSubmit: (values: PlaylistFormValues) => Promise<void>;
  loading?: boolean;
  onCancel?: () => void;
}

export function PlaylistForm({ initial, onSubmit, loading, onCancel }: PlaylistFormProps) {
  const [values, setValues] = useState<PlaylistFormValues>({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    isPublic: initial?.isPublic ?? false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PlaylistFormValues, string>>>({});

  const set = <K extends keyof PlaylistFormValues>(key: K, value: PlaylistFormValues[K]) =>
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
          <Title order={5} mb="md">Playlist Details</Title>
          <Stack gap="md">
            <TextInput label="Name" placeholder="Playlist name" value={values.name} error={errors.name} required
              onChange={(e) => set("name", e.currentTarget.value)} />
            <Textarea label="Description" placeholder="Playlist description" value={values.description}
              onChange={(e) => set("description", e.currentTarget.value)} minRows={3} autosize />
            <Switch label="Public playlist" checked={values.isPublic} onChange={(e) => set("isPublic", e.currentTarget.checked)} />
          </Stack>
        </Card>

        <Group justify="flex-end" gap="sm">
          {onCancel && <AppButton variant="secondary" onClick={onCancel} disabled={loading}>Cancel</AppButton>}
          <AppButton type="submit" loading={loading}>{initial ? "Save changes" : "Create playlist"}</AppButton>
        </Group>
      </Stack>
    </form>
  );
}
