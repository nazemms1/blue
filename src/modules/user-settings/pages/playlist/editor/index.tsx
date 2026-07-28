import { Stack } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { AppButton } from "@shared/components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { PageHeader } from "@shared/ui";
import { usePlaylistStore } from "@modules/user-settings/model";
import { PlaylistForm, type PlaylistFormValues } from "@modules/user-settings/features/playlist-form/PlaylistForm";

export function PlaylistEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playlists, creationEnabled, createPlaylist, updatePlaylist } = usePlaylistStore();
  const [loading, setLoading] = useState(false);

  const existing = id ? playlists.find((p) => p.id === id) : null;
  const isEditing = Boolean(id && existing);

  if (!isEditing && !creationEnabled) {
    return (
      <Stack gap="lg" maw={860} mx="auto">
        <PageHeader
          title="Playlist creation disabled"
          description="Creating new playlists from the dashboard is currently turned off."
          actions={
            <AppButton variant="secondary" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate("/user-settings/playlists")}>
              Back to Playlists
            </AppButton>
          }
        />
      </Stack>
    );
  }

  const handleSubmit = async (values: PlaylistFormValues) => {
    setLoading(true);
    try {
      if (isEditing && id) {
        await updatePlaylist(id, values);
        notifications.show({ title: "Playlist updated", message: `"${values.name}" has been saved.`, color: "green" });
      } else {
        await createPlaylist(values);
        notifications.show({ title: "Playlist created", message: `"${values.name}" has been created.`, color: "green" });
      }
      navigate("/user-settings/playlists");
    } catch {
      notifications.show({ title: "Error", message: "Failed to save playlist.", color: "red" });
    } finally {
      setLoading(false);
    }
  };

  if (id && !existing) {
    return (
      <Stack gap="lg" maw={860} mx="auto">
        <PageHeader title="Playlist not found" description="The requested playlist does not exist." />
      </Stack>
    );
  }

  return (
    <Stack gap="lg" maw={860} mx="auto">
      <PageHeader
        title={isEditing ? "Edit Playlist" : "New Playlist"}
        description={isEditing ? `Editing: ${existing?.name}` : "Create a new playlist"}
        actions={
          <AppButton variant="secondary" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate("/user-settings/playlists")}>
            Back to Playlists
          </AppButton>
        }
      />
      <PlaylistForm initial={existing ?? undefined} onSubmit={handleSubmit} loading={loading} onCancel={() => navigate("/user-settings/playlists")} />
    </Stack>
  );
}
