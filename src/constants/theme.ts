/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css";

import { Platform } from "react-native";

export type Priority = "high" | "medium" | "low";

export const Colors = {
  light: {
    text: "#18181B",
    background: "#FAFAF9",
    surface: "#FFFFFF",

    muted: "#71717A",
    border: "#E7E5E4",

    primary: "#EA580C",
    onPrimary: "#FFFFFF",

    success: "#16A34A",
    warning: "#D97706",
    danger: "#DC2626",

    tint: "#EA580C",

    icon: "#57534E",
    tabIconDefault: "#A8A29E",
    tabIconSelected: "#EA580C",

    backgroundElement: "#FFFFFF",
    backgroundSelected: "#FFF1E8",

    textSecondary: "#78716C",

    priority: {
      high: {
        background: "#FEF2F2",
        border: "#DC2626",
        indicator: "#DC2626",
        text: "#B91C1C",
      },
      medium: {
        background: "#FFF7ED",
        border: "#EA580C",
        indicator: "#EA580C",
        text: "#9A3412",
      },
      low: {
        background: "#F0FDF4",
        border: "#16A34A",
        indicator: "#16A34A",
        text: "#166534",
      },
    },
  },

  dark: {
    text: "#FAFAFA",

    background: "#090909",
    surface: "#141414",

    muted: "#A1A1AA",
    border: "#292524",

    primary: "#FB923C",
    onPrimary: "#18181B",

    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#F87171",

    tint: "#FB923C",

    icon: "#A8A29E",
    tabIconDefault: "#78716C",
    tabIconSelected: "#FB923C",

    backgroundElement: "#141414",
    backgroundSelected: "#2A1810",

    textSecondary: "#A8A29E",

    priority: {
      high: {
        background: "#2A1114",
        border: "#F87171",
        indicator: "#F87171",
        text: "#FCA5A5",
      },
      medium: {
        background: "#29170C",
        border: "#FB923C",
        indicator: "#FB923C",
        text: "#FDBA74",
      },
      low: {
        background: "#0C2817",
        border: "#22C55E",
        indicator: "#22C55E",
        text: "#86EFAC",
      },
    },
  },
} as const;

type Theme = typeof Colors.light;

export type ThemeColor = {
  [Key in keyof Theme]: Theme[Key] extends string ? Key : never;
}[keyof Theme];

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
