import type { ReactNode } from "react";

/**
 * Minimal Markdown renderer for guide module prose.
 *
 * Page content is authored as Markdown, but a prose module body is rendered
 * straight into a single `<p>`, so a body with sections, bullet lists or links
 * collapses into one flattened paragraph and shows its `##` markers. This turns
 * a body back into the elements it was written as: headings, paragraphs, lists
 * and links, plus inline bold/italic/code.
 *
 * It is deliberately small and total: anything it does not recognise is emitted
 * as text, so no authoring content is ever dropped or silently reordered.
 */

type Block =
  | { kind: "heading"; level: number; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "table"; header: string[]; rows: string[][] };

const HEADING_RE = /^(#{2,6})\s+(.*\S)\s*$/;
const BULLET_RE = /^[-*+]\s+(.*\S)\s*$/;
const ORDERED_RE = /^\d+[.)]\s+(.*\S)\s*$/;
// A pipe-delimited row, and the `| --- | --- |` rule that marks the header.
const TABLE_ROW_RE = /^\s*\|(.+)\|\s*$/;
const TABLE_RULE_RE = /^\s*\|(?:\s*:?-{2,}:?\s*\|)+\s*$/;

const tableCells = (line: string): string[] =>
  line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());

/** True when a chunk of lines is a Markdown table, with or without a header. */
function asTable(lines: string[]): { header: string[]; rows: string[][] } | null {
  if (lines.length < 2 || !lines.every((line) => TABLE_ROW_RE.test(line))) return null;
  if (TABLE_RULE_RE.test(lines[1])) {
    const header = tableCells(lines[0]);
    const rows = lines.slice(2).map(tableCells);
    return rows.every((row) => row.length === header.length) ? { header, rows } : null;
  }
  const rows = lines.map(tableCells);
  const width = rows[0].length;
  return rows.every((row) => row.length === width) ? { header: [], rows } : null;
}

function splitBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of body.split(/\n{2,}/)) {
    const lines = chunk.split("\n").filter((line) => line.trim().length > 0);
    if (!lines.length) continue;

    const heading = HEADING_RE.exec(lines[0]);
    if (heading) {
      blocks.push({ kind: "heading", level: heading[1].length, text: heading[2] });
      continue;
    }
    if (lines.every((line) => BULLET_RE.test(line))) {
      blocks.push({ kind: "list", ordered: false, items: lines.map((l) => BULLET_RE.exec(l)![1]) });
      continue;
    }
    if (lines.every((line) => ORDERED_RE.test(line))) {
      blocks.push({ kind: "list", ordered: true, items: lines.map((l) => ORDERED_RE.exec(l)![1]) });
      continue;
    }
    const table = asTable(lines);
    if (table) {
      blocks.push({ kind: "table", ...table });
      continue;
    }
    blocks.push({ kind: "paragraph", text: lines.join(" ") });
  }
  return blocks;
}

/** Inline emphasis, code and links, in one pass over a single text run. */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // `code` | **bold** | *italic* | [label](href)
  const pattern =
    /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*\n]+\*)|(\[[^\]]+\]\((?:https?:\/\/|\/)[^)\s]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    const key = `${keyPrefix}-i${i++}`;
    if (token.startsWith("`")) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("[")) {
      const label = token.slice(1, token.indexOf("]"));
      const href = token.slice(token.indexOf("](") + 2, -1);
      const external = href.startsWith("http");
      nodes.push(
        <a key={key} href={href} {...(external ? { rel: "noopener noreferrer", target: "_blank" } : {})}>{label}</a>,
      );
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/**
 * Inline Markdown only: no block elements, for a field the page shell already
 * places inside a single element such as the Quick Answer callout. Authored
 * copy in those fields may still contain a link, and rendering it as literal
 * `[label](url)` text is the same defect as an unrendered `##` marker.
 */
export function renderInlineMarkdown(text: string): ReactNode {
  return <>{renderInline(String(text ?? ""), "inline")}</>;
}

export function renderMarkdown(body: string): ReactNode {
  return (
    <>
      {splitBlocks(body).map((block, index) => {
        const key = `md-${index}`;
        if (block.kind === "heading") {
          // Inside a module the module heading is already an <h2>, so section
          // headings step down one level to keep the document outline valid.
          const Tag = `h${Math.min(block.level + 1, 6)}` as "h3" | "h4" | "h5" | "h6";
          return <Tag key={key}>{renderInline(block.text, key)}</Tag>;
        }
        if (block.kind === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return (
            <Tag key={key}>
              {block.items.map((item, i) => (
                <li key={`${key}-${i}`}>{renderInline(item, `${key}-${i}`)}</li>
              ))}
            </Tag>
          );
        }
        if (block.kind === "table") {
          return (
            <div className="table-scroll" key={key}>
              <table>
                {block.header.length > 0 && (
                  <thead>
                    <tr>
                      {block.header.map((cell, i) => (
                        <th key={`${key}-h${i}`} scope="col">
                          {renderInline(cell, `${key}-h${i}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {block.rows.map((row, r) => (
                    <tr key={`${key}-r${r}`}>
                      {row.map((cell, c) => (
                        <td key={`${key}-r${r}c${c}`}>{renderInline(cell, `${key}-r${r}c${c}`)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return <p key={key}>{renderInline(block.text, key)}</p>;
      })}
    </>
  );
}
