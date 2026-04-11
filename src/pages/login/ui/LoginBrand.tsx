import { Group, Text, ThemeIcon } from "@mantine/core";
import { IconLayoutGrid } from "@tabler/icons-react";

export function LoginBrand() {
  return (
    <>
      <Group
        gap={10}
        justify="center"
        className="login-brand-mobile"
        style={{ display: "none" }}
      >
        <ThemeIcon
          size={40}
          radius="md"
          variant="gradient"
          gradient={{ from: "blue", to: "violet", deg: 135 }}
        >
          <IconLayoutGrid size={22} />
        </ThemeIcon>
        <Text fw={800} size="xl" style={{ letterSpacing: "-0.02em" }}>
          Blue
        </Text>
      </Group>

      <style>{`
        @media (max-width: 767px) {
          .login-brand-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
