# GROWTH_LOG.md

## How To Use This File

Record every growth-relevant edit here. Keep entries short, factual, and useful for future agents.

## Change Log

## Change Log

### 2026-10-01 - Public page render-quality repair

- Task: Repair the homepage and inner pages so the first screen carries a positioning line, key facts and priority entry points, and so authoring-pipeline artifacts never reach a public page.
- Defects found:  (0 finding(s)) across 0 page(s).
- Files changed: `src/data/pages/*.ts` and `src/data/faq.ts` (fold and module data), `src/components/content/ModuleRenderer.tsx` (prose body now renders Markdown), `src/lib/markdown.tsx` (new minimal Markdown-to-React renderer), `src/styles/modules.css` (prose body rules), `scripts/validate-render-integrity.ts` (new regression), `package.json` (new `validate:render` step in the `verify` chain).
- URLs affected: None. Titles, H1s, canonicals, CTAs, page types and internal-link roles are unchanged, so `CONTENT_INDEX.md` is not revised.
- SEO/GEO changed: FAQ entries that previously existed only as a Markdown module are now real entries in `src/data/faq.ts` and render through the accessible FAQ block, so FAQPage schema coverage is no longer limited to the pre-existing entries. `hero.subtitle` is now a positioning line and `quickAnswer` is the concise answer, so the fold is a summary rather than a duplicate of the article.
- Copy changed: Reader copy no longer refers to the build-now brief, the game-check brief, the research cut-off date or the source-tier labels. Game facts, URLs, keyword intent, ad units and analytics are unchanged.
- Verification: `npm run verify` (typecheck, lint, template, content, render integrity, IndexNow tests, static export, rendered SEO) passes; a full-text scan of every exported page finds no raw heading markers, pipeline headings, research metadata or literal question/answer labels; a content-conservation check against the previous commit confirms no reader copy, page identity or SEO field was lost.


## 2026-10-01 — shared Worker deployment maintenance

User-authorized routing migration to `guide-pool-08` / Worker `moggedlooksmaxxordie-wiki`; source push is connected to the shared Cloudflare Git build via the repository deploy hook. Content and public URL identities are unchanged. Completion is tracked by the central group migration report and live source/version verification.
