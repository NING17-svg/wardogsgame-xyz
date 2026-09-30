# GROWTH_LOG.md

## How To Use This File

Record every growth-relevant edit here. Keep entries short, factual, and useful for future agents.

## Change Log

### 2026-10-01 - Public page render-quality repair

- Task: Repair the homepage and inner pages so the first screen carries a positioning line, key facts and priority entry points, and so authoring-pipeline artifacts never reach a public page.
- Defects found: `hero.subtitle` and `quickAnswer` each held the whole ~4.8k-character research deliverable; a `quick-answer` module repeated `quickAnswer` verbatim; `##` markers, bullet lists and links rendered as literal Markdown; and the pipeline's own Sources, Internal Link Requirements and Fact Boundaries sections were published as reader content.
- Files changed: `src/data/pages/home.ts`, `src/data/pages/fixed-pages.ts`, `src/data/faq.ts` (fold and module data), `src/components/content/ModuleRenderer.tsx` (prose body now renders Markdown), `src/lib/markdown.tsx` (new minimal Markdown-to-React renderer), `src/styles/modules.css` (prose body rules), `scripts/validate-render-integrity.ts` (new regression), `package.json` (new `validate:render` step in the `verify` chain).
- URLs affected: None. Titles, H1s, canonicals, CTAs, page types and internal-link roles are unchanged, so `CONTENT_INDEX.md` is not revised.
- SEO/GEO changed: FAQ entries that previously existed only as a Markdown module are now real entries in `src/data/faq.ts` and render through the accessible FAQ block, so FAQPage schema coverage rises from 6 to 59 items. `hero.subtitle` is now one sentence and `quickAnswer` is the concise answer, so the fold is a summary rather than a duplicate of the article.
- Copy changed: Reader copy no longer refers to the build-now brief, the research cut-off date or the source-tier labels. Game facts, AppID 1867240, launch date, prices, platform scope, keyword intent, ad units and analytics are unchanged.
- Verification: `npm run verify` (typecheck, lint, template, content, render integrity, IndexNow tests, static export, rendered SEO) passes; a full-text scan of all 17 built pages finds no raw heading markers, pipeline headings, research metadata or literal question/answer labels; desktop (1440) and mobile (390) renders were spot-checked with no horizontal overflow.

### 2026-08-12 - Static discovery and review freshness baseline added

- Task: Add locale-aware static search, automatic recent updates, visible review dates, and browser metadata/security defaults to the shared template.
- Files changed: Header/search components, content helpers, locale UI labels, homepage/page hero rendering, manifest/favicon metadata, Next.js security headers, and deterministic validators.
- URLs affected: No existing URLs changed; search results use the final route manifest URLs and recent updates use existing indexable pages.
- SEO/GEO changed: Last reviewed dates are public on every page; the homepage surfaces recent non-trust content by deterministic `lastReviewed` order; locale search never falls back across locales. Search indexes are emitted as per-locale force-static resources and lazy-loaded so full-site index data is not repeated in every page payload.
- Browser baseline: Neutral SVG favicon, web manifest, `X-Content-Type-Options`, `Referrer-Policy`, and `X-Frame-Options` are wired without adding a restrictive CSP.
- Verification: Typecheck, lint, template/content/SEO validation, and full verify are required before launch.

### 2026-07-21 - V3 locale and entity routing added

- Task: Upgrade the shared template for configuration-driven locale routes and programmatic entity pages.
- Files changed: Site/page/entity types, locale and entity generators, dynamic routes, metadata, sitemap, validators, and template documentation.
- URLs affected: Existing primary-locale URLs retain their paths; additional locale and entity routes are generated from configuration.
- SEO changed: Canonical, hreflang, x-default, Open Graph locale, multilingual sitemap alternates, and final route-manifest validation are now data-driven.
- Entity changed: Generic entity Hubs/details now render source links, relationships, and optional registered local images from one base fact package.
- Verification: Typecheck, template validation, content validation, rendered SEO validation, route-manifest generation, and multilingual entity fixtures.

### 2026-09-28 - WARDOGS Adsterra six-unit integration

- Task: Replace empty Adsterra placeholders with the fixed six-unit codes (Native Banner, Banner 728x90, Banner 468x60, Banner 320x50, Banner 160x600, Smartlink) on the canonical `src/data/ads.ts`.
- Files changed: `src/data/ads.ts`.
- URLs affected: None; placements and slot components are unchanged.
- Ad baseline: All six values are non-empty and match the platform-side codes; Smartlink is an HTTPS URL, the other five are executable banner/native script blocks. Empty values no longer present, so the ad slots now run real Adsterra markup under the existing `AdSlot` / `Smartlink` components without changing layout.
- Follow-up: `adsterra-integrator` will continue with local validation and target repo push; registry terminal state is owned by the shared publisher after the completion validator passes.

### 2026-09-28 - WARDOGS launch V3 site configuration

- Task: Configure the WARDOGS Guide site (wardogsgame.xyz) with the V3 launch content package, primary locale en-US, and 16 fixed pages.
- Files changed: `src/data/site.ts` (game identity, domain, official sources), `src/data/navigation.ts` (primary and footer navigation), `src/data/pages/fixed-pages.ts` and `src/data/pages/home.ts` (assembled pages), `src/data/faq.ts` (FAQ schema-eligible items), `src/lib/content.ts` (route wiring, removed template placeholder pages), `scripts/validate-template-contract.ts` (dynamic fixture selection), removed `wiki-pages.ts`, `guide-pages.ts`, `release-pages.ts`, `site-pages.ts`.
- URLs affected: 15 new fixed pages (/about, /release, /steam, /platforms, /multi-platform, /closed-beta, /tags, /gameplay, /control-zone, /economy, /roles, /vehicles, /maps, /system-requirements, /trailer, /reviews) plus the home route.
- SEO/GEO changed: Each page now exposes canonical, hreflang en-US, and a Quick Answer callout sourced from the V3 content package. The home links to the 15 fixed pages through hero CTAs and recent-updates modules.
- Verification: `npm run verify` passes (typecheck, lint, template validation, content validation, indexnow, build, rendered SEO), V3 route contract validator passes against the Site Plan and content package.

### 2026-09-28 - WARDOGS Guide baseline bootstrap

- Task: Initial V3 template baseline for `wardogsgame.xyz`.
- Files changed: Template project baseline; `package.json` and `wrangler.jsonc` renamed; `src/data/site.ts` set to WARDOGS Guide defaults.
- URLs affected: All template-default routes; will be replaced by the V3 configuration commit.
- SEO/GEO changed: README updated to WARDOGS Guide description.
- Verification: `npm run verify` passes against the empty baseline.

### YYYY-MM-DD - Template baseline initialized

- Task: Create the initial generated guide-site baseline.
- Files changed: Template project files.
- URLs affected: `/`, `/wiki`, `/guides`, `/release-date`, `/faq`, `/about`, `/contact`, `/privacy-policy`, `/terms`.
- Content changed: Neutral placeholder content only.
- Ad baseline: Fixed Adsterra-ready modules are present and disabled; no ad markup or request is emitted.
- Follow-up: Replace this entry with a real launch/configuration entry when the one-click builder fills the site for a specific game.
