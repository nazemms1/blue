import { Stack } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { AppButton } from "@shared/components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { PageHeader } from "@shared/ui";
import { useMusicStore } from "@modules/cms/model";
import { SingerForm, type SingerFormValues } from "@modules/cms/features/singer-form/SingerForm";

export function CmsMusicSingerEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { singers, createSinger, updateSinger } = useMusicStore();
  const [loading, setLoading] = useState(false);

  const existing = id ? singers.find((s) => s.id === id) : null;
  const isEditing = Boolean(id && existing);

  const handleSubmit = async (values: SingerFormValues) => {
    setLoading(true);
    try {
      if (isEditing && id) {
        await updateSinger(id, values);
        notifications.show({ title: "Singer updated", message: `"${values.name}" has been saved.`, color: "green" });
      } else {
        await createSinger(values);
        notifications.show({ title: "Singer created", message: `"${values.name}" has been created.`, color: "green" });
      }
      navigate("/cms/music/singers");
    } catch {
      notifications.show({ title: "Error", message: "Failed to save singer.", color: "red" });
    } finally {
      setLoading(false);
    }
  };

  if (id && !existing) {
    return (
      <Stack gap="lg" maw={860} mx="auto">
        <PageHeader title="Singer not found" description="The requested singer does not exist." />
      </Stack>
    );
  }

  return (
    <Stack gap="lg" maw={860} mx="auto">
      <PageHeader
        title={isEditing ? "Edit Singer" : "New Singer"}
        description={isEditing ? `Editing: ${existing?.name}` : "Create a new singer"}
        actions={
          <AppButton variant="secondary" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate("/cms/music/singers")}>
            Back to Singers
          </AppButton>
        }
      />
      <SingerForm initial={existing ?? undefined} onSubmit={handleSubmit} loading={loading} onCancel={() => navigate("/cms/music/singers")} />
    </Stack>
  );
}
