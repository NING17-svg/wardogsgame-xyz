import type { SiteLocaleConfig } from "@/types/localization";

export interface SiteOfficialSource {
  label: string;
  href: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  brandMark?: string;
  gameName: string;
  domain: string;
  baseUrl: string;
  description: string;
  tagline: string;
  primaryLocale: string;
  locales: SiteLocaleConfig[];
  author: string;
  gaMeasurementId: string;
  bingSiteAuthCode: string;
  officialSources: SiteOfficialSource[];
  disclaimer: string;
}

export const site: SiteConfig = {
  name: "WARDOGS Guide",
  brandMark: "WD",
  gameName: "WARDOGS",
  domain: "wardogsgame.xyz",
  baseUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://wardogsgame.xyz").replace(/\/$/, ""),
  description:
    "An unofficial launch-window guide hub for WARDOGS — identity, Steam release, Control Zone mode, persistent cash economy, roles, vehicles, maps and system requirements.",
  tagline:
    "WARDOGS launch-window guide: identity, Steam release, Control Zone scoring, economy, roles, vehicles, and maps.",
  primaryLocale: "en-US",
  locales: [
    {
      code: "en-US",
      label: "English",
      pathPrefix: "",
      htmlLang: "en-US",
      openGraphLocale: "en_US",
      ui: {
        searchOpen: "Search",
        searchClose: "Close search",
        searchPlaceholder: "Search this guide",
        searchSubmit: "Search",
        searchLoading: "Loading search…",
        searchError: "Search is unavailable right now.",
        searchNoResults: "No matching pages found.",
        recentUpdates: "Recent updates",
        lastReviewed: "Last reviewed",
      },
    },
  ],
  author: "WARDOGS Guide",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
  bingSiteAuthCode: process.env.NEXT_PUBLIC_BING_SITE_AUTH_CODE || "",
  officialSources: [
    {
      label: "WARDOGS on Steam (AppID 1867240)",
      href: "https://store.steampowered.com/app/1867240",
      description:
        "Official Steam store page with Steam Early Access launch date and pricing.",
    },
    {
      label: "BULKHEAD developer site",
      href: "https://bulkhead.co.uk",
      description: "Official developer site and FAQ for identity confirmation.",
    },
    {
      label: "Team17 publisher site",
      href: "https://www.team17.com",
      description: "Official publisher site for WARDOGS identity confirmation.",
    },
  ],
  disclaimer:
    "This is an unofficial fan guide compiled from publicly available sources for WARDOGS. Facts are dated to the 2026-09-28 research cut-off.",
};
