import { Button, type ButtonProps } from "@mantine/core";
import type { ReactNode } from "react";

type AppButtonVariant = "primary" | "secondary" | "danger" | "success";

interface AppButtonProps extends Omit<ButtonProps, "variant" | "color"> {
  variant?: AppButtonVariant;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
}

const variantStyles: Record<
  AppButtonVariant,
  { mantineVariant: ButtonProps["variant"]; color?: string; styles: ButtonProps["styles"] }
> = {
  primary: {
    mantineVariant: "gradient",
    styles: {
      root: {
        background: "linear-gradient(135deg, var(--mantine-color-blue-6), var(--mantine-color-violet-6))",
        boxShadow: "0 2px 8px rgba(59, 130, 246, 0.25), 0 1px 2px rgba(0,0,0,0.08)",
        border: "none",
        fontWeight: 600,
        letterSpacing: "0.01em",
        transition: "box-shadow 150ms ease, transform 150ms ease, filter 150ms ease",
        "&:hover:not([data-disabled])": {
          filter: "brightness(1.08)",
          boxShadow: "0 4px 16px rgba(59, 130, 246, 0.35), 0 1px 4px rgba(0,0,0,0.1)",
          transform: "translateY(-1px)",
        },
        "&:active:not([data-disabled])": {
          transform: "translateY(0)",
          filter: "brightness(0.97)",
          boxShadow: "0 1px 4px rgba(59, 130, 246, 0.2)",
          transitionDuration: "60ms",
        },
      },
    },
  },
  success: {
    mantineVariant: "gradient",
    styles: {
      root: {
        background: "linear-gradient(135deg, #10b981, #059669)",
        boxShadow: "0 2px 8px rgba(16, 185, 129, 0.25), 0 1px 2px rgba(0,0,0,0.08)",
        border: "none",
        fontWeight: 600,
        "&:hover:not([data-disabled])": {
          filter: "brightness(1.08)",
          boxShadow: "0 4px 16px rgba(16, 185, 129, 0.35)",
          transform: "translateY(-1px)",
        },
      },
    },
  },
  secondary: {
    mantineVariant: "default",
    styles: {
      root: {
        backgroundColor: "var(--mantine-color-white)",
        borderColor: "var(--mantine-color-gray-3)",
        color: "var(--mantine-color-gray-7)",
        fontWeight: 500,
        transition: "border-color 150ms ease, background 150ms ease, box-shadow 150ms ease",
        "&:hover:not([data-disabled])": {
          backgroundColor: "var(--mantine-color-gray-0)",
          borderColor: "var(--mantine-color-gray-4)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        },
        "&:active:not([data-disabled])": {
          backgroundColor: "var(--mantine-color-gray-1)",
          transitionDuration: "60ms",
        },
      },
    },
  },
  danger: {
    mantineVariant: "filled",
    color: "red",
    styles: {
      root: {
        boxShadow: "0 2px 8px rgba(239, 68, 68, 0.2), 0 1px 2px rgba(0,0,0,0.08)",
        fontWeight: 600,
        transition: "box-shadow 150ms ease, transform 150ms ease, filter 150ms ease",
        "&:hover:not([data-disabled])": {
          filter: "brightness(1.06)",
          boxShadow: "0 4px 14px rgba(239, 68, 68, 0.3)",
          transform: "translateY(-1px)",
        },
        "&:active:not([data-disabled])": {
          transform: "translateY(0)",
          transitionDuration: "60ms",
        },
      },
    },
  },
};

export function AppButton({
  variant = "primary",
  onClick,
  type = "button",
  children,
  ...rest
}: AppButtonProps) {
  const config = variantStyles[variant] || variantStyles.primary;
  const { mantineVariant, color, styles } = config;

  return (
    <Button
      variant={mantineVariant}
      gradient={variant === "primary" ? { from: "blue", to: "violet", deg: 135 } : undefined}
      color={color}
      onClick={onClick}
      type={type}
      styles={styles}
      radius="md"
      {...rest}
    >
      {children}
    </Button>
  );
}
