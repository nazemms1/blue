import { Stack } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { AppButton } from "@shared/components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { PageHeader } from "@shared/ui";
import { useMusicStore } from "@modules/cms/model";
import { SongForm, type SongFormValues } from "@modules/cms/features/song-form/SongForm";

export function CmsSongEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSongById, updateSongById } = useMusicStore();
  const [loading, setLoading] = useState(false);

  const result = id ? getSongById(id) : null;
  const existing = result?.song ?? null;
  const isEditing = Boolean(id && existing);

  const handleSubmit = async (values: SongFormValues) => {
    setLoading(true);
    try {
      if (isEditing && id) {
        await updateSongById(id, values);
        notifications.show({ title: "Song updated", message: `"${values.title}" has been saved.`, color: "green" });
      }
      navigate("/cms/music/songs");
    } catch {
      notifications.show({ title: "Error", message: "Failed to save song.", color: "red" });
    } finally {
      setLoading(false);
    }
  };

  if (id && !existing) {
    return (
      <Stack gap="lg" maw={860} mx="auto">
        <PageHeader title="Song not found" description="The requested song does not exist." />
      </Stack>
    );
  }

  return (
    <Stack gap="lg" maw={860} mx="auto">
      <PageHeader
        title="Edit Song"
        description={isEditing ? `Editing: ${existing?.title}` : "Song details"}
        actions={
          <AppButton variant="secondary" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate("/cms/music/songs")}>
            Back to Songs
          </AppButton>
        }
      />
      <SongForm
        initial={existing ? { ...existing, singerName: result?.singerName, albumTitle: result?.albumTitle } : undefined}
        onSubmit={handleSubmit}
        loading={loading}
        onCancel={() => navigate("/cms/music/songs")}
      />
    </Stack>
  );
}
