import { Stack } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { AppButton } from "@shared/components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { PageHeader } from "@shared/ui";
import { useSeriesStore } from "@modules/cms/model";
import { SeriesForm, type SeriesFormValues } from "@modules/cms/features/series-form/SeriesForm";

export function CmsSeriesEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getById, createSeries, updateSeries } = useSeriesStore();
  const [loading, setLoading] = useState(false);

  const existing = id ? getById(id) : null;
  const isEditing = Boolean(id && existing);

  const handleSubmit = async (values: SeriesFormValues) => {
    setLoading(true);
    try {
      if (isEditing && id) {
        await updateSeries(id, values);
        notifications.show({ title: "Series updated", message: `"${values.title}" has been saved.`, color: "green" });
      } else {
        await createSeries(values);
        notifications.show({ title: "Series created", message: `"${values.title}" has been created.`, color: "green" });
      }
      navigate("/cms/vod/series");
    } catch {
      notifications.show({ title: "Error", message: "Failed to save series.", color: "red" });
    } finally {
      setLoading(false);
    }
  };

  if (id && !existing) {
    return (
      <Stack gap="lg" maw={860} mx="auto">
        <PageHeader title="Series not found" description="The requested series does not exist." />
      </Stack>
    );
  }

  return (
    <Stack gap="lg" maw={860} mx="auto">
      <PageHeader
        title={isEditing ? "Edit Series" : "New Series"}
        description={isEditing ? `Editing: ${existing?.title}` : "Create a new series"}
        actions={
          <AppButton variant="secondary" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate("/cms/vod/series")}>
            Back to Series
          </AppButton>
        }
      />
      <SeriesForm initial={existing ?? undefined} onSubmit={handleSubmit} loading={loading} onCancel={() => navigate("/cms/vod/series")} />
    </Stack>
  );
}
