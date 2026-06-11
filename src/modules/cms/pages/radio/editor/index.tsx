import { Stack } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { AppButton } from "@shared/components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { PageHeader } from "@shared/ui";
import { useRadioStore } from "@modules/cms/model";
import { RadioForm, type RadioFormValues } from "@modules/cms/features/radio-form/RadioForm";

export function CmsRadioEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getById, createStation, updateStation } = useRadioStore();
  const [loading, setLoading] = useState(false);

  const existing = id ? getById(id) : null;
  const isEditing = Boolean(id && existing);

  const handleSubmit = async (values: RadioFormValues) => {
    setLoading(true);
    try {
      if (isEditing && id) {
        await updateStation(id, values);
        notifications.show({ title: "Station updated", message: `"${values.name}" has been saved.`, color: "green" });
      } else {
        await createStation(values);
        notifications.show({ title: "Station created", message: `"${values.name}" has been created.`, color: "green" });
      }
      navigate("/cms/streaming/radio");
    } catch {
      notifications.show({ title: "Error", message: "Failed to save station.", color: "red" });
    } finally {
      setLoading(false);
    }
  };

  if (id && !existing) {
    return (
      <Stack gap="lg" maw={860} mx="auto">
        <PageHeader title="Station not found" description="The requested radio station does not exist." />
      </Stack>
    );
  }

  return (
    <Stack gap="lg" maw={860} mx="auto">
      <PageHeader
        title={isEditing ? "Edit Radio Station" : "New Radio Station"}
        description={isEditing ? `Editing: ${existing?.name}` : "Create a new radio station"}
        actions={
          <AppButton variant="secondary" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate("/cms/streaming/radio")}>
            Back to Radio
          </AppButton>
        }
      />
      <RadioForm initial={existing ?? undefined} onSubmit={handleSubmit} loading={loading} onCancel={() => navigate("/cms/streaming/radio")} />
    </Stack>
  );
}
