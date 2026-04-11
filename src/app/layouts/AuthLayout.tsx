import { Box, Center, Text, Stack, ThemeIcon, Group } from "@mantine/core";
import {
  IconLayoutGrid,
  IconPhoto,
  IconFileText,
  IconShieldCheck,
} from "@tabler/icons-react";
import type { ReactNode } from "react";

const features = [
  {
    icon: <IconPhoto size={18} />,
    label: "Media Library",
    description: "Manage all your digital assets in one place",
  },
  {
    icon: <IconFileText size={18} />,
    label: "Content Editor",
    description: "Publish articles and structured content",
  },
  {
    icon: <IconShieldCheck size={18} />,
    label: "Role-Based Access",
    description: "Granular permissions per module",
  },
];

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box style={{ display: "flex", minHeight: "100vh" }}>
      <Box
        style={{
          flex: "0 0 42%",
          background:
            "linear-gradient(150deg, #1a1d2e 0%, #0d1117 55%, #111827 100%)",
          position: "relative",
          overflow: "hidden",
          display: "none",
        }}
        className="auth-left-panel"
      >
        <Box
          style={{
            position: "absolute",
            top: -140,
            left: -140,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.20) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <Box
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <Box
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />

        <Stack
          justify="space-between"
          h="100%"
          p={40}
          style={{ position: "relative", zIndex: 1 }}
        >
          <Group gap={10}>
            <ThemeIcon
              size={38}
              radius="md"
              variant="gradient"
              gradient={{ from: "blue", to: "violet", deg: 135 }}
            >
              <IconLayoutGrid size={20} />
            </ThemeIcon>
            <Text
              fw={800}
              size="lg"
              c="white"
              style={{ letterSpacing: "-0.01em" }}
            >
              Blue
            </Text>
          </Group>

          <Stack gap={40}>
            <Stack gap={12}>
              <Text
                c="white"
                fw={700}
                lh={1.2}
                style={{ fontSize: "2rem", letterSpacing: "-0.03em" }}
              >
                Your content,
                <br />
                <Text
                  component="span"
                  fw={700}
                  lh={1.2}
                  style={{
                    fontSize: "2rem",
                    letterSpacing: "-0.03em",
                    background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  perfectly managed.
                </Text>
              </Text>
              <Text
                size="sm"
                lh={1.7}
                maw={300}
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                A modular CMS built for teams who need clear separation between
                media assets and editorial content.
              </Text>
            </Stack>

            <Stack gap={20}>
              {features.map((f) => (
                <Group key={f.label} gap={14} align="flex-start">
                  <ThemeIcon
                    size={36}
                    radius="md"
                    style={{
                      background: "rgba(59,130,246,0.14)",
                      border: "1px solid rgba(59,130,246,0.2)",
                      flexShrink: 0,
                      color: "#93c5fd",
                    }}
                  >
                    {f.icon}
                  </ThemeIcon>
                  <Stack gap={2}>
                    <Text size="sm" fw={600} c="white">
                      {f.label}
                    </Text>
                    <Text size="xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {f.description}
                    </Text>
                  </Stack>
                </Group>
              ))}
            </Stack>
          </Stack>

          <Text size="xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Blue · All rights reserved
          </Text>
        </Stack>
      </Box>

      <Box style={{ flex: 1, display: "flex" }}>
        <Center
          style={{
            flex: 1,
            background: "var(--mantine-color-body)",
            padding: "2rem 1rem",
          }}
        >
          <Box style={{ width: "100%", maxWidth: 440 }}>{children}</Box>
        </Center>
      </Box>

      <style>{`
        @media (min-width: 768px) {
          .auth-left-panel {
            display: flex !important;
          }
        }
      `}</style>
    </Box>
  );
}
