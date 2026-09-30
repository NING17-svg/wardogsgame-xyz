/**
 * Render-integrity regression for public page content.
 *
 * The authoring pipeline writes a page's whole research deliverable as one
 * Markdown document. When those sections land in `hero.subtitle`,
 * `quickAnswer` or a module body, the public page shows a duplicated fold, raw
 * `##` markers, and the pipeline's own Sources / Internal Link Requirements /
 * Fact Boundaries sections. Each assertion below pins one of those, so the
 * defects cannot come back unnoticed.
 *
 * Run: npm run validate:render
 */
import { homePage } from "../src/data/pages/home";
import { fixedPages } from "../src/data/pages/fixed-pages";
import { faqItems } from "../src/data/faq";

const pages = [homePage, ...fixedPages];

const HERO_SUBTITLE_MAX = 320;
const QUICK_ANSWER_MAX = 700;
const FOLD_LEAK_FACTOR = 3;
const HEADING_RE = /^#{2,6}\s+\S/m;

const PIPELINE_MODULE_IDS = new Set([
  "sources",
  "internal-links",
  "internal-link-requirements",
  "internal-links-required",
  "fact-boundaries",
  "fact-boundary",
  "evidence",
  "writer-notes",
  "editor-notes",
]);

const RESEARCH_METADATA_RE =
  /\((?:official\/(?:store|site)|media\/(?:interview|review)|community\/video|wiki\/reference),\s*checked\s*\d{4}-\d{2}-\d{2}\)|`checked\s*\d{4}-\d{2}-\d{2}`|\bgame-check brief\b|\bbuild-now brief\b/i;

const failures: string[] = [];
const fail = (page: string, message: string) => failures.push(`${page}: ${message}`);
const norm = (value: string) => value.replace(/\s+/g, " ").trim();

const faqIds = new Set(faqItems.map((item) => item.id));

for (const page of pages) {
  const where = page.url || "/";
  const subtitle = (page.hero?.subtitle ?? "").trim();
  const quick = (page.quickAnswer ?? "").trim();

  // The fold carries a positioning line and the answer, not the article.
  if (HEADING_RE.test(subtitle)) fail(where, "hero.subtitle contains raw Markdown heading markers");
  if (HEADING_RE.test(quick)) fail(where, "quickAnswer contains raw Markdown heading markers");
  if (subtitle.length > HERO_SUBTITLE_MAX * FOLD_LEAK_FACTOR) {
    fail(where, `hero.subtitle holds an article body (${subtitle.length} chars)`);
  }
  if (quick.length > QUICK_ANSWER_MAX * FOLD_LEAK_FACTOR) {
    fail(where, `quickAnswer holds an article body (${quick.length} chars)`);
  }

  for (const id of page.faqIds ?? []) {
    if (!faqIds.has(id)) fail(where, `faqId "${id}" has no entry in src/data/faq.ts`);
  }

  const quickNorm = norm(quick);
  for (const guideModule of page.modules ?? []) {
    const id = guideModule.id;
    const body = "body" in guideModule && typeof guideModule.body === "string" ? guideModule.body : "";
    const bodyNorm = norm(body);

    if (PIPELINE_MODULE_IDS.has(id.toLowerCase())) {
      fail(where, `module "${id}" is an authoring-pipeline artifact rendered on a public page`);
    }
    if (RESEARCH_METADATA_RE.test(body)) {
      fail(where, `module "${id}" exposes research metadata (source tier, checked date, brief)`);
    }
    if (quickNorm.length > 200 && bodyNorm.includes(quickNorm)) {
      fail(where, `module "${id}" repeats quickAnswer; the page shell already renders it`);
    }
    if (body === "" && !("items" in guideModule) && !("rows" in guideModule)) {
      fail(where, `module "${id}" has no content, so it renders a bare heading`);
    }
    if (/^\s*(?:[-*+]\s*)?\*\*(question|answer)\*\*\s*:/im.test(body)) {
      fail(where, `module "${id}" renders literal question/answer labels`);
    }
  }
}

if (failures.length) {
  console.error(`render-integrity: ${failures.length} problem(s)`);
  for (const failure of failures.slice(0, 40)) console.error(`  - ${failure}`);
  if (failures.length > 40) console.error(`  ... and ${failures.length - 40} more`);
  process.exit(1);
}

console.log(`render-integrity: ${pages.length} page(s) clean`);
