import { Stack } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { AppButton } from "@shared/components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { PageHeader } from "@shared/ui";
import { useTvShowsStore } from "@modules/cms/model";
import { SeriesForm, type SeriesFormValues } from "@modules/cms/features/series-form/SeriesForm";

export function CmsTvShowEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getById, createTvShow, updateTvShow } = useTvShowsStore();
  const [loading, setLoading] = useState(false);

  const existing = id ? getById(id) : null;
  const isEditing = Boolean(id && existing);

  const handleSubmit = async (values: SeriesFormValues) => {
    setLoading(true);
    try {
      if (isEditing && id) {
        await updateTvShow(id, values);
        notifications.show({ title: "TV show updated", message: `"${values.title}" has been saved.`, color: "green" });
      } else {
        await createTvShow(values);
        notifications.show({ title: "TV show created", message: `"${values.title}" has been created.`, color: "green" });
      }
      navigate("/cms/vod/tv-shows");
    } catch {
      notifications.show({ title: "Error", message: "Failed to save TV show.", color: "red" });
    } finally {
      setLoading(false);
    }
  };

  if (id && !existing) {
    return (
      <Stack gap="lg" maw={860} mx="auto">
        <PageHeader title="TV show not found" description="The requested TV show does not exist." />
      </Stack>
    );
  }

  return (
    <Stack gap="lg" maw={860} mx="auto">
      <PageHeader
        title={isEditing ? "Edit TV Show" : "New TV Show"}
        description={isEditing ? `Editing: ${existing?.title}` : "Create a new TV show"}
        actions={
          <AppButton variant="secondary" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate("/cms/vod/tv-shows")}>
            Back to TV Shows
          </AppButton>
        }
      />
      <SeriesForm initial={existing ?? undefined} onSubmit={handleSubmit} loading={loading} onCancel={() => navigate("/cms/vod/tv-shows")} />
    </Stack>
  );
}
