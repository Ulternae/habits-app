/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css";

import { Platform } from "react-native";

export type Priority = "high" | "medium" | "low";

export const Colors = {
  light: {
    text: "#000000",
    background: "#ffffff",
    backgroundElement: "#F0F0F3",
    backgroundSelected: "#E0E1E6",
    textSecondary: "#60646C",
    priority: {
      high: {
        background: "#FDE8E7",
        border: "#B42318",
        indicator: "#D92D20",
        text: "#8B1E1E",
      },
      medium: {
        background: "#FFF4D6",
        border: "#B7791F",
        indicator: "#D69E2E",
        text: "#7A4E00",
      },
      low: {
        background: "#E7F5EC",
        border: "#2F855A",
        indicator: "#38A169",
        text: "#1F6B45",
      },
    },
  },
  dark: {
    text: "#ffffff",
    background: "#000000",
    backgroundElement: "#212225",
    backgroundSelected: "#2E3135",
    textSecondary: "#B0B4BA",
    priority: {
      high: {
        background: "#4A1F1F",
        border: "#F97066",
        indicator: "#F97066",
        text: "#FFB4AB",
      },
      medium: {
        background: "#4A3514",
        border: "#F5B544",
        indicator: "#F5B544",
        text: "#FFD58A",
      },
      low: {
        background: "#173B2A",
        border: "#69D09B",
        indicator: "#69D09B",
        text: "#A7F3C2",
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
