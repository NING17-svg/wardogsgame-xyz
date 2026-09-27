import { site } from "@/data/site";

export interface LocalizedNavigationItem {
  href: string;
  labels: Record<string, string>;
}

export const primaryNavigation: LocalizedNavigationItem[] = [
  { href: "/", labels: { "en-US": "Home" } },
  { href: "/about", labels: { "en-US": "About" } },
  { href: "/release", labels: { "en-US": "Release" } },
  { href: "/platforms", labels: { "en-US": "Platforms" } },
  { href: "/gameplay", labels: { "en-US": "Gameplay" } },
  { href: "/control-zone", labels: { "en-US": "Control Zone" } },
  { href: "/roles", labels: { "en-US": "Roles" } },
  { href: "/vehicles", labels: { "en-US": "Vehicles" } },
];

export const footerNavigation: LocalizedNavigationItem[] = [
  { href: "/about", labels: { "en-US": "About" } },
  { href: "/release", labels: { "en-US": "Release" } },
  { href: "/steam", labels: { "en-US": "Steam" } },
  { href: "/system-requirements", labels: { "en-US": "System Requirements" } },
];

export function navigationLabel(
  item: LocalizedNavigationItem,
  locale: string,
): string {
  return (
    item.labels[locale] ||
    item.labels[site.primaryLocale] ||
    Object.values(item.labels)[0]
  );
}
