import { Stack } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { AppButton } from "@shared/components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { PageHeader } from "@shared/ui";
import { useChannelsStore } from "@modules/cms/model";
import { ChannelForm, type ChannelFormValues } from "@modules/cms/features/channel-form/ChannelForm";

export function CmsChannelEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { channels, createChannel, updateChannel } = useChannelsStore();
  const [loading, setLoading] = useState(false);

  const existing = id ? channels.find((c) => c.id === id) ?? null : null;
  const isEditing = Boolean(id && existing);

  const handleSubmit = async (values: ChannelFormValues) => {
    setLoading(true);
    try {
      if (isEditing && id) {
        await updateChannel(id, values);
        notifications.show({ title: "Channel updated", message: `"${values.name}" has been saved.`, color: "green" });
      } else {
        await createChannel(values);
        notifications.show({ title: "Channel created", message: `"${values.name}" has been created.`, color: "green" });
      }
      navigate("/cms/streaming/channels");
    } catch {
      notifications.show({ title: "Error", message: "Failed to save channel.", color: "red" });
    } finally {
      setLoading(false);
    }
  };

  if (id && !existing) {
    return (
      <Stack gap="lg" maw={860} mx="auto">
        <PageHeader title="Channel not found" description="The requested channel does not exist." />
      </Stack>
    );
  }

  return (
    <Stack gap="lg" maw={860} mx="auto">
      <PageHeader
        title={isEditing ? "Edit Channel" : "New Channel"}
        description={isEditing ? `Editing: ${existing?.name}` : "Create a new channel"}
        actions={
          <AppButton variant="secondary" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate("/cms/streaming/channels")}>
            Back to Channels
          </AppButton>
        }
      />
      <ChannelForm initial={existing ?? undefined} onSubmit={handleSubmit} loading={loading} onCancel={() => navigate("/cms/streaming/channels")} />
    </Stack>
  );
}
