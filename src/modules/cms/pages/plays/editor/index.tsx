import { Stack } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { AppButton } from "@shared/components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { PageHeader } from "@shared/ui";
import { usePlaysStore } from "@modules/cms/model";
import { MovieForm, type MovieFormValues } from "@modules/cms/features/movie-form/MovieForm";

export function CmsPlayEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getById, createPlay, updatePlay } = usePlaysStore();
  const [loading, setLoading] = useState(false);

  const existing = id ? getById(id) : null;
  const isEditing = Boolean(id && existing);

  const handleSubmit = async (values: MovieFormValues) => {
    setLoading(true);
    try {
      if (isEditing && id) {
        await updatePlay(id, values);
        notifications.show({ title: "Play updated", message: `"${values.title}" has been saved.`, color: "green" });
      } else {
        await createPlay(values);
        notifications.show({ title: "Play created", message: `"${values.title}" has been created.`, color: "green" });
      }
      navigate("/cms/vod/plays");
    } catch {
      notifications.show({ title: "Error", message: "Failed to save play.", color: "red" });
    } finally {
      setLoading(false);
    }
  };

  if (id && !existing) {
    return (
      <Stack gap="lg" maw={860} mx="auto">
        <PageHeader title="Play not found" description="The requested play does not exist." />
      </Stack>
    );
  }

  return (
    <Stack gap="lg" maw={860} mx="auto">
      <PageHeader
        title={isEditing ? "Edit Play" : "New Play"}
        description={isEditing ? `Editing: ${existing?.title}` : "Create a new play"}
        actions={
          <AppButton variant="secondary" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate("/cms/vod/plays")}>
            Back to Plays
          </AppButton>
        }
      />
      <MovieForm initial={existing ?? undefined} onSubmit={handleSubmit} loading={loading} onCancel={() => navigate("/cms/vod/plays")} />
    </Stack>
  );
}
