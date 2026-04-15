import { Stack, Card, Text, Group, ThemeIcon } from "@mantine/core";
import { IconUpload, IconArrowLeft } from "@tabler/icons-react";
import { AppButton } from "@shared/components";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { PageHeader } from "@shared/ui";
import { useCmsStore } from "@modules/cms/entities/asset";
import { UploadCmsAsset } from "@modules/cms/features/upload-asset";

export function CmsUploadPage() {
  const navigate = useNavigate();
  const { uploadItem } = useCmsStore();
  const [opened, { open, close }] = useDisclosure(true);

  const handleUpload = async (file: File, tags: string[]) => {
    await uploadItem(file, tags);
    navigate("/cms/library");
  };

  return (
    <Stack gap="lg">
      <PageHeader
        title="Upload CMS Asset"
        description="Add new assets to the CMS library"
        actions={
          <AppButton
            variant="secondary"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => navigate("/cms")}
          >
            Back to Library
          </AppButton>
        }
      />

      <Card shadow="sm" p="xl" radius="md" withBorder maw={600}>
        <Stack align="center" gap="lg" py="xl">
          <ThemeIcon size={64} radius="xl" variant="light" color="blue">
            <IconUpload size={32} />
          </ThemeIcon>
          <div style={{ textAlign: "center" }}>
            <Text fw={600} size="lg">
              Ready to upload
            </Text>
            <Text size="sm" c="dimmed" mt={4}>
              Click the button below to open the upload dialog
            </Text>
          </div>
          <Group>
            <AppButton leftSection={<IconUpload size={16} />} onClick={open}>
              Select File
            </AppButton>
          </Group>
        </Stack>
      </Card>

      <UploadCmsAsset opened={opened} onClose={close} onUpload={handleUpload} />
    </Stack>
  );
}
