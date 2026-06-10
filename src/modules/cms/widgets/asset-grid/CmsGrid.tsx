import { SimpleGrid, Group, Select } from "@mantine/core";
import { useState } from "react";
import { CmsAssetCard, type CmsItem, type CmsType } from "@modules/cms/entities/asset";
import { SearchInput } from "@shared/components";
import { EmptyState } from "@shared/ui";
import { IconPhoto } from "@tabler/icons-react";

interface CmsGridProps {
  items: CmsItem[];
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
}

const TYPE_OPTIONS = [
  { value: "", label: "All types" },
  { value: "image", label: "Images" },
  { value: "video", label: "Videos" },
  { value: "audio", label: "Audio" },
  { value: "document", label: "Documents" },
];

export function CmsGrid({ items, onDelete, onArchive }: CmsGridProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const filtered = items.filter((item) => {
    const matchesSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.filename.toLowerCase().includes(search.toLowerCase());
    const matchesType = !typeFilter || item.type === (typeFilter as CmsType);
    return matchesSearch && matchesType;
  });

  return (
    <div>
      <Group mb="md" gap="sm">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search CMS assets…"
        />
        <Select
          data={TYPE_OPTIONS}
          value={typeFilter}
          onChange={(v) => setTypeFilter(v ?? "")}
          placeholder="All types"
          w={140}
          clearable
        />
      </Group>

      {filtered.length === 0 ? (
        <EmptyState
          title="No CMS assets found"
          description={
            search
              ? "Try a different search term."
              : "Upload your first asset to get started."
          }
          icon={<IconPhoto size={28} />}
        />
      ) : (
        <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4 }} spacing="md">
          {filtered.map((item) => (
            <CmsAssetCard
              key={item.id}
              item={item}
              onDelete={onDelete}
              onArchive={onArchive}
            />
          ))}
        </SimpleGrid>
      )}
    </div>
  );
}
