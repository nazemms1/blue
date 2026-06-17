import { Stack, TextInput, Select, Group, Card, Title, NumberInput } from "@mantine/core";
import { AppButton } from "@shared/components";
import { useState } from "react";
import type { Ad, AdPlacement } from "@modules/cms/model";

export interface AdsFormValues {
  title: string;
  placement: AdPlacement;
  targetUrl: string;
  impressions: number;
  clicks: number;
  startDate: string;
  endDate: string;
  status: "active" | "paused" | "expired";
}

const PLACEMENT_OPTIONS = [
  { value: "banner", label: "Banner" },
  { value: "sidebar", label: "Sidebar" },
  { value: "popup", label: "Popup" },
  { value: "video-pre-roll", label: "Video Pre-Roll" },
  { value: "video-mid-roll", label: "Video Mid-Roll" },
];
const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "expired", label: "Expired" },
];

interface AdsFormProps {
  initial?: Ad;
  onSubmit: (values: AdsFormValues) => Promise<void>;
  loading?: boolean;
  onCancel?: () => void;
}

export function AdsForm({ initial, onSubmit, loading, onCancel }: AdsFormProps) {
  const [values, setValues] = useState<AdsFormValues>({
    title: initial?.title ?? "",
    placement: initial?.placement ?? "banner",
    targetUrl: initial?.targetUrl ?? "",
    impressions: initial?.impressions ?? 0,
    clicks: initial?.clicks ?? 0,
    startDate: initial?.startDate ?? "",
    endDate: initial?.endDate ?? "",
    status: initial?.status ?? "active",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AdsFormValues, string>>>({});

  const set = <K extends keyof AdsFormValues>(key: K, value: AdsFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!values.title.trim()) e.title = "Title is required";
    if (!values.targetUrl.trim()) e.targetUrl = "Target URL is required";
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
          <Title order={5} mb="md">Ad Details</Title>
          <Stack gap="md">
            <TextInput label="Title" placeholder="Campaign title" value={values.title} error={errors.title} required
              onChange={(e) => set("title", e.currentTarget.value)} />
            <Select label="Placement" data={PLACEMENT_OPTIONS} value={values.placement}
              onChange={(v) => set("placement", (v as AdPlacement) ?? "banner")} placeholder="Select placement" />
            <TextInput label="Target URL" placeholder="https://example.com/landing" value={values.targetUrl} error={errors.targetUrl} required
              onChange={(e) => set("targetUrl", e.currentTarget.value)} />
          </Stack>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={5} mb="md">Stats</Title>
          <Group grow>
            <NumberInput label="Impressions" placeholder="0" value={values.impressions} onChange={(v) => set("impressions", Number(v) || 0)} min={0} />
            <NumberInput label="Clicks" placeholder="0" value={values.clicks} onChange={(v) => set("clicks", Number(v) || 0)} min={0} />
          </Group>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={5} mb="md">Schedule</Title>
          <Group grow>
            <TextInput label="Start Date" type="date" value={values.startDate} onChange={(e) => set("startDate", e.currentTarget.value)} />
            <TextInput label="End Date" type="date" value={values.endDate} onChange={(e) => set("endDate", e.currentTarget.value)} />
          </Group>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={5} mb="md">Status</Title>
          <Stack gap="md">
            <Select label="Status" data={STATUS_OPTIONS} value={values.status} onChange={(v) => set("status", (v as AdsFormValues["status"]) ?? "active")} />
          </Stack>
        </Card>

        <Group justify="flex-end" gap="sm">
          {onCancel && <AppButton variant="secondary" onClick={onCancel} disabled={loading}>Cancel</AppButton>}
          <AppButton type="submit" loading={loading}>{initial ? "Save changes" : "Create ad"}</AppButton>
        </Group>
      </Stack>
    </form>
  );
}
