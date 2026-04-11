import {
  Card,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Badge,
  Box,
  type CardProps,
  type MantineColor,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import type { ReactNode } from "react";

const SHADOW_REST = "0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)";
const SHADOW_HOVER = "0 2px 4px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.09)";

interface AppCardProps extends Omit<CardProps, "onClick"> {
  clickable?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export function AppCard({
  clickable = false,
  onClick,
  children,
  style,
  ...rest
}: AppCardProps) {
  return (
    <Card
      radius="lg"
      withBorder
      padding="lg"
      onClick={onClick}
      style={{
        backgroundColor: "var(--mantine-color-white)",
        borderColor: "var(--mantine-color-gray-2)",
        boxShadow: SHADOW_REST,
        transition:
          "box-shadow 200ms ease, border-color 200ms ease, transform 200ms ease",
        cursor: clickable ? "pointer" : undefined,
        ...(style as object),
      }}
      styles={{
        root: {
          "&:hover": clickable
            ? {
                borderColor: "var(--mantine-color-gray-3)",
                boxShadow: SHADOW_HOVER,
                transform: "translateY(-2px)",
              }
            : undefined,
          "&:active": clickable
            ? {
                transform: "translateY(0)",
                boxShadow: SHADOW_REST,
                transitionDuration: "80ms",
              }
            : undefined,
        },
      }}
      {...rest}
    >
      {children}
    </Card>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color: MantineColor;
  trend?: string;
  trendUp?: boolean;
}

function StatCard({
  label,
  value,
  icon,
  color,
  trend,
  trendUp,
}: StatCardProps) {
  return (
    <AppCard padding="lg" style={{ position: "relative", overflow: "hidden" }}>
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 3,
          height: "100%",
          background: `var(--mantine-color-${color}-5)`,
          borderRadius: "var(--mantine-radius-lg) 0 0 var(--mantine-radius-lg)",
        }}
      />

      <Group justify="space-between" align="flex-start" pl={8}>
        <Stack gap={4}>
          <Text
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "var(--mantine-color-gray-9)",
            }}
          >
            {value}
          </Text>
          <Text
            size="xs"
            fw={500}
            c="dimmed"
            style={{ textTransform: "uppercase", letterSpacing: "0.04em" }}
          >
            {label}
          </Text>
          {trend && (
            <Text size="xs" fw={500} c={trendUp ? "teal.6" : "red.6"} mt={2}>
              {trend}
            </Text>
          )}
        </Stack>

        <ThemeIcon
          size={44}
          radius="md"
          color={color}
          variant="light"
          style={{
            boxShadow: `0 2px 8px color-mix(in srgb, var(--mantine-color-${color}-5) 20%, transparent)`,
          }}
        >
          {icon}
        </ThemeIcon>
      </Group>
    </AppCard>
  );
}

interface ModuleCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: MantineColor;
  badge?: string;
  onClick: () => void;
}

function ModuleCard({
  title,
  description,
  icon,
  color,
  badge,
  onClick,
}: ModuleCardProps) {
  return (
    <AppCard clickable onClick={onClick} padding="xl">
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <ThemeIcon
            size={52}
            radius="xl"
            color={color}
            variant="light"
            style={{
              boxShadow: `0 4px 12px color-mix(in srgb, var(--mantine-color-${color}-5) 20%, transparent)`,
            }}
          >
            {icon}
          </ThemeIcon>
          {badge && (
            <Badge color={color} variant="light" radius="sm" size="sm" fw={500}>
              {badge}
            </Badge>
          )}
        </Group>

        <Stack gap={6}>
          <Text fw={700} size="md" style={{ letterSpacing: "-0.01em" }}>
            {title}
          </Text>
          <Text size="sm" c="dimmed" lh={1.6}>
            {description}
          </Text>
        </Stack>

        <Group
          gap={5}
          style={{
            color: `var(--mantine-color-${color}-6)`,
            marginTop: 4,
          }}
        >
          <Text size="sm" fw={600}>
            Open {title}
          </Text>
          <IconArrowRight
            size={14}
            style={{
              transition: "transform 160ms ease",
            }}
          />
        </Group>
      </Stack>
    </AppCard>
  );
}

AppCard.Stat = StatCard;
AppCard.Module = ModuleCard;
