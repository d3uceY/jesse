import { faqs, products, shelf, site } from "@/lib/site-data";
import { SITE_URL, pageUrl } from "@/lib/seo";

// Static export needs this route resolved at build time, which is also what
// makes the file a plain out/llms.txt on Pages.
export const dynamic = "force-static";

/**
 * llms.txt — the same content index llms.txt.org describes, generated from the
 * data the page renders. Answer engines that never execute JavaScript can read
 * every tool and answer from this one file instead of guessing at hydrated DOM.
 */
export function GET() {
  const lines: string[] = [];

  lines.push("# d3uceY — Jesse", "");
  lines.push(
    "> Jesse (d3uceY) is an independent software developer who builds open-source desktop apps and command-line tools. This site is the index for fifteen of them.",
    "",
  );
  lines.push(`- Site: ${SITE_URL}`);
  lines.push(`- Author: ${site.name} (${site.handle})`);
  lines.push(`- Email: ${site.email}`);
  lines.push(`- GitHub: ${site.github}`);
  lines.push(`- X: ${site.x} (${site.xHandle})`);
  lines.push("- Language: English");
  lines.push("");

  lines.push(`## Shipped apps (${products.length})`, "");
  for (const app of products) {
    lines.push(`### ${app.name}`, "");
    lines.push(`- URL: ${app.href}`);
    lines.push(`- Summary: ${app.lede}`);
    lines.push(`- Details: ${app.body}`);
    lines.push(`- Facts: ${app.facts.join("; ")}`);
    lines.push(`- Screenshot: ${pageUrl(app.shot)}`);
    lines.push("");
  }

  lines.push(`## The rest of the shelf (${shelf.length})`, "");
  for (const item of shelf) {
    lines.push(`- [${item.name}](${item.href}) — ${item.note} (${item.kind})`);
  }
  lines.push("");

  lines.push("## Questions", "");
  for (const item of faqs) {
    lines.push(`### ${item.question}`, "");
    lines.push(item.answer.trim(), "");
  }

  lines.push("## Contact", "");
  lines.push(
    `Work, bugs and contributions: ${site.email} — or open an issue on ${site.github}, or message ${site.xHandle} on X.`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
