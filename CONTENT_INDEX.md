# CONTENT_INDEX.md

## How To Use This File

Use this index to find the current role of each URL before editing. Update it whenever URLs, page roles, metadata, CTAs, schema, or internal-link responsibilities change.

## Page Inventory

Primary locale `en-US`. All routes use the site root (`/`).

| URL | Page ID | Type | Primary Keyword | Search Intent | Internal-Link Role |
| --- | --- | --- | --- | --- | --- |
| `/` | home | Home | WARDOGS game | Confirm identity, launch date, EA price, mode | Hub |
| `/about` | overview | Explanation | what is WARDOGS | Identity, BULKHEAD developer, Team17 publisher | Cluster hub (Identity & launch window) |
| `/release` | release-status | Status | WARDOGS release date | EA launch date, pricing, status change log | Cluster hub (Identity & launch window) |
| `/steam` | steam-availability | Status | WARDOGS Steam AppID | Steam listing, Easy Anti-Cheat, 14 UI languages | Cluster member |
| `/platforms` | platforms | Status | WARDOGS platforms | Confirmed platforms at EA launch | Cluster hub (Platforms & mode) |
| `/multi-platform` | multi-platform | Status | WARDOGS PS5 / Xbox Series X|S | Unannounced-platform status | Cluster member |
| `/closed-beta` | closed-beta | Status | WARDOGS Closed Beta | 2026-08-21 to 2026-08-23 pre-launch test | Cluster member |
| `/tags` | tags | Reference | WARDOGS Steam tags | Genre and tag set | Cluster member |
| `/gameplay` | gameplay-loop | Explanation | WARDOGS gameplay | 100-player three-squad tactical FPS loop | Cluster hub (Gameplay & economy) |
| `/control-zone` | control-zone | Explanation | WARDOGS Control Zone | 2x2km Control Zone race details | Cluster hub (Platforms & mode) |
| `/economy` | economy | Reference | WARDOGS gold bars | Persistent cash economy, gold bars, Black Market, Vault | Cluster hub (Gameplay & economy) |
| `/roles` | roles | Reference | WARDOGS class roles | Deployable role set (ghillie suit, arms dealer, helicopter, artillery, builder, medic) | Cluster hub (Roles, vehicles & maps) |
| `/vehicles` | vehicles | Reference | WARDOGS launch vehicles | Helicopter, tank, artillery; future fighter jets | Cluster member |
| `/maps` | maps | Reference | WARDOGS maps | Launch map roster | Cluster member |
| `/system-requirements` | system-requirements | Reference | WARDOGS system requirements | Windows minimum and recommended specs | Cluster member |
| `/trailer` | trailer | Reference | WARDOGS trailer | Steam store trailer and BULKHD reveal | Cluster member |
| `/reviews` | reviews | Status | WARDOGS EA reviews | EA review band and pre-launch wishlist signal | Cluster member |

## Page Inventory Notes

- All pages are sourced from `site-launch/tasks/wardogsgame-xyz/content/content-package.json` and `locales/en-US/*.md`.
- Site Plan declares `entity_families: []` and `tool_pages: []`; no entity or tool routes exist for first launch.
- Theme Spec declares one shared dark theme; no per-locale token set exists.

## Generated Route Families

- Fixed pages: authored in `src/data/pages/fixed-pages.ts` and `src/data/pages/home.ts`.
- Entity Hubs and details: none for first launch (`src/data/entities.ts` is empty).
- Final route inventory: `npm run routes:manifest`.
- Validation: `python3 site-launch/roles/one-click-builder/skills/site-launch-verifier/scripts/validate_v3_route_contract.py`.

## Content Clusters

- Identity & launch window: /about, /release, /steam, /closed-beta, /reviews.
- Platforms & mode: /platforms, /multi-platform, /tags, /control-zone.
- Gameplay & economy: /gameplay, /economy.
- Roles, vehicles & maps: /roles, /vehicles, /maps.
- Reference: /system-requirements, /trailer.

## Internal Linking Map

- /overview → /release, /platforms, /tags, /control-zone, /gameplay, /roles, /vehicles, /maps.
- /release → /steam, /platforms, /reviews, /closed-beta, /multi-platform.
- /steam → /system-requirements, /release, /platforms, /trailer.
- /platforms → /steam, /release, /system-requirements, /multi-platform.
- /multi-platform → /release, /platforms.
- /closed-beta → /release, /platforms.
- /tags → /about, /control-zone, /gameplay.
- /gameplay → /control-zone, /economy, /roles, /vehicles, /maps.
- /control-zone → /gameplay, /economy, /maps, /roles, /vehicles.
- /economy → /gameplay, /control-zone, /roles, /vehicles.
- /roles → /gameplay, /control-zone, /vehicles, /economy.
- /vehicles → /gameplay, /control-zone, /economy, /roles.
- /maps → /control-zone, /gameplay, /vehicles, /roles.
- /system-requirements → /steam, /platforms.
- /trailer → /steam, /about.
- /reviews → /release, /steam, /closed-beta.
- Home links to all 15 fixed pages plus the home itself.

## Open Questions

- Specific weapon and vehicle pricing, gold bar exchange rates, post-EA roadmap and DLC plans are labelled 'not announced as of 2026-09-28' on the relevant pages.
- Console release plans (PS5, Xbox Series X|S, Switch, Switch 2) and Steam Deck verified status are not announced as of 2026-09-28.
