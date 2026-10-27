// Makes a copy of the static export viewable straight from disk (file://) for previews.
// Next.js scripts do not start with relative paths, so the copy shows the static design
// (animations and forms need the real site in out/ served by a web host).
// Rewrites
// or from any sub-folder: absolute "/..." URLs become relative, and links to page
// folders point at their index.html.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.argv[2] ?? "out";

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const isPageLink = (url) => !/\.[a-z0-9]+([?#].*)?$/i.test(url.split(/[?#]/)[0]);

for (const file of walk(root).filter((f) => f.endsWith(".html"))) {
  const depth = relative(root, file).split(sep).length - 1;
  const prefix = depth === 0 ? "./" : "../".repeat(depth);
  let html = readFileSync(file, "utf8");
  // href="/about/" -> "../about/index.html", src="/_next/x.js" -> "../_next/x.js"
  html = html.replace(/(\s(?:href|src|action|content|imageSrcSet|srcSet)=")\/(?!\/)([^"]*)"/g, (_m, attr, rest) => {
    let url = rest;
    if (attr.includes("href") && isPageLink(url)) {
      const [path, hash = ""] = url.split("#");
      const [p, q] = path.split("?");
      url = `${p}${p === "" || p.endsWith("/") ? "" : "/"}index.html${q ? `?${q}` : ""}${hash ? `#${hash}` : ""}`;
    }
    return `${attr}${prefix}${url}"`;
  });
  writeFileSync(file, html);
}
console.log("Rewrote HTML in", root, "to relative paths");
