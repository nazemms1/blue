import { Stack } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { AppButton } from "@shared/components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { PageHeader } from "@shared/ui";
import { useMoviesStore } from "@modules/cms/model";
import { MovieForm, type MovieFormValues } from "@modules/cms/features/movie-form/MovieForm";

export function CmsMovieEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getById, createMovie, updateMovie } = useMoviesStore();
  const [loading, setLoading] = useState(false);

  const existing = id ? getById(id) : null;
  const isEditing = Boolean(id && existing);

  const handleSubmit = async (values: MovieFormValues) => {
    setLoading(true);
    try {
      if (isEditing && id) {
        await updateMovie(id, values);
        notifications.show({ title: "Movie updated", message: `"${values.title}" has been saved.`, color: "green" });
      } else {
        await createMovie(values);
        notifications.show({ title: "Movie created", message: `"${values.title}" has been created.`, color: "green" });
      }
      navigate("/cms/vod/movies");
    } catch {
      notifications.show({ title: "Error", message: "Failed to save movie.", color: "red" });
    } finally {
      setLoading(false);
    }
  };

  if (id && !existing) {
    return (
      <Stack gap="lg" maw={860} mx="auto">
        <PageHeader title="Movie not found" description="The requested movie does not exist." />
      </Stack>
    );
  }

  return (
    <Stack gap="lg" maw={860} mx="auto">
      <PageHeader
        title={isEditing ? "Edit Movie" : "New Movie"}
        description={isEditing ? `Editing: ${existing?.title}` : "Create a new movie"}
        actions={
          <AppButton variant="secondary" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate("/cms/vod/movies")}>
            Back to Movies
          </AppButton>
        }
      />
      <MovieForm initial={existing ?? undefined} onSubmit={handleSubmit} loading={loading} onCancel={() => navigate("/cms/vod/movies")} />
    </Stack>
  );
}
