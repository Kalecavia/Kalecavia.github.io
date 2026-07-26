import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const clientDir = path.join(root, "dist", "client");
const serverEntry = path.join(root, "dist", "server", "index.js");
const outputDir = path.join(root, "pages-dist");
const siteOrigin = process.env.PAGES_ORIGIN ?? "https://kalecavia.github.io";
const routes = [
  "/",
  "/wereldmeters",
  "/wereld",
  "/bevolking",
  "/voedsel-en-water",
  "/energie-en-uitstoot",
  "/gezondheid",
  "/bronnen",
  "/over-de-site",
];
const nestedRouteSet = new Set(routes.filter((route) => route !== "/"));

if (path.basename(outputDir) !== "pages-dist") {
  throw new Error("Refusing to clean an unexpected GitHub Pages output path.");
}

await rm(outputDir, { force: true, recursive: true });
await cp(clientDir, outputDir, { recursive: true });

const workerUrl = pathToFileURL(serverEntry);
workerUrl.searchParams.set("pages-build", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};
const context = {
  passThroughOnException() {},
  waitUntil() {},
};

async function render(pathname, allowNotFound = false) {
  const response = await worker.fetch(
    new Request(new URL(pathname, siteOrigin), {
      headers: { accept: "text/html" },
    }),
    env,
    context,
  );

  if (!response.ok && !(allowNotFound && response.status === 404)) {
    throw new Error(
      `Static render failed for ${pathname}: HTTP ${response.status}`,
    );
  }

  const html = await response.text();

  // Static hosts resolve directory routes most reliably with a trailing slash.
  // Only known application routes are rewritten; assets and page anchors stay
  // untouched.
  return html.replace(
    /href="(\/[^"#?]+)(#[^"]*)?"/g,
    (match, route, hash = "") =>
      nestedRouteSet.has(route) ? `href="${route}/${hash}"` : match,
  );
}

for (const route of routes) {
  const routeDir =
    route === "/" ? outputDir : path.join(outputDir, route.slice(1));
  await mkdir(routeDir, { recursive: true });
  await writeFile(
    path.join(routeDir, "index.html"),
    await render(route),
    "utf8",
  );
}

await writeFile(
  path.join(outputDir, "404.html"),
  await render("/404", true),
  "utf8",
);
await writeFile(path.join(outputDir, ".nojekyll"), "", "utf8");

console.log(
  `GitHub Pages export complete: ${routes.length} routes in ${outputDir}`,
);
