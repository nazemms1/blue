import { Stack } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { AppButton } from "@shared/components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { PageHeader } from "@shared/ui";
import { useAdsStore } from "@modules/cms/model";
import { AdsForm, type AdsFormValues } from "@modules/cms/features/ads-form/AdsForm";

export function CmsAdsEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ads, createAd, updateAd } = useAdsStore();
  const [loading, setLoading] = useState(false);

  const existing = id ? ads.find((a) => a.id === id) ?? null : null;
  const isEditing = Boolean(id && existing);

  const handleSubmit = async (values: AdsFormValues) => {
    setLoading(true);
    try {
      if (isEditing && id) {
        await updateAd(id, values);
        notifications.show({ title: "Ad updated", message: `"${values.title}" has been saved.`, color: "green" });
      } else {
        await createAd(values);
        notifications.show({ title: "Ad created", message: `"${values.title}" has been created.`, color: "green" });
      }
      navigate("/cms/ads");
    } catch {
      notifications.show({ title: "Error", message: "Failed to save ad.", color: "red" });
    } finally {
      setLoading(false);
    }
  };

  if (id && !existing) {
    return (
      <Stack gap="lg" maw={860} mx="auto">
        <PageHeader title="Ad not found" description="The requested ad does not exist." />
      </Stack>
    );
  }

  return (
    <Stack gap="lg" maw={860} mx="auto">
      <PageHeader
        title={isEditing ? "Edit Ad Campaign" : "New Ad Campaign"}
        description={isEditing ? `Editing: ${existing?.title}` : "Create a new ad campaign"}
        actions={
          <AppButton variant="secondary" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate("/cms/ads")}>
            Back to Ads
          </AppButton>
        }
      />
      <AdsForm initial={existing ?? undefined} onSubmit={handleSubmit} loading={loading} onCancel={() => navigate("/cms/ads")} />
    </Stack>
  );
}
