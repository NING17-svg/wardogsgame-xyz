import type { ThemeConfig } from "@/types/theme";

export const theme = {
  mode: "dark",
  tokens: {
    pageBg: "#15181c",
    surface1: "#22272d",
    surface2: "#2c3239",
    surface3: "#3a4149",
    surfaceInverse: "#0d1014",
    textPrimary: "#e8ecef",
    textMuted: "#a3acb5",
    textInverse: "#f6f8fa",
    textOnAccentPrimary: "#1a0f04",
    textLink: "#f0b53d",
    focusRing: "#f0b53d",
    line: "#3a4149",
    lineStrong: "#5b6470",
    accentPrimary: "#e0a32a",
    accentSecondary: "#8a6f3a",
    accentBright: "#f7c860",
    statusConfirmed: "#5fb27a",
    statusCaution: "#d39142",
    statusUnknown: "#8a929b",
  },
  typography: {
    headingFamily:
      "'Barlow Condensed', 'Oswald', 'Inter', system-ui, sans-serif",
    bodyFamily: "'Inter', 'Source Sans 3', system-ui, sans-serif",
    headingWeight: 700,
  },
  shape: {
    radius: "6px",
    borderWidth: "1px",
    shadow: "0 1px 2px rgba(0,0,0,0.45)",
    hoverLift: "2px",
  },
  density: "comfortable",
  background: { mode: "gradient", overlay: 0.55, position: "top center" },
  variants: {
    home: "media-hero",
    hub: "card-grid",
    content: "reading-right-rail",
    workspace: "full-width",
  },
  decoration: { motif: "grid", intensity: "low" },
} satisfies ThemeConfig;
