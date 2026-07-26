import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const requestedBasePath = process.env.PAGES_BASE_PATH ?? "/world-pulse";
const siteBasePath = `/${requestedBasePath.replace(/^\/+|\/+$/g, "")}`;
const siteBaseUrl = `${siteBasePath}/`;
const npmCli = process.env.npm_execpath;

if (!npmCli) {
  throw new Error("Run the Pages exporter through `npm run build:pages`.");
}

const build = spawnSync(process.execPath, [npmCli, "run", "build"], {
  cwd: root,
  env: {
    ...process.env,
    PAGES_BASE_PATH: siteBasePath,
  },
  stdio: "inherit",
});

if (build.error) throw build.error;
if (build.status !== 0) {
  throw new Error(`GitHub Pages build failed with exit code ${build.status}.`);
}

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
const nestedRouteSet = new Set(
  routes
    .filter((route) => route !== "/")
    .map((route) => `${siteBasePath}${route}`),
);

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
  const html = await render(route);

  if (route === "/") {
    const requiredProjectPaths = [
      `href="${siteBaseUrl}wereldmeters/"`,
      `href="${siteBaseUrl}assets/`,
      `src="${siteBaseUrl}media/`,
      `poster="${siteBaseUrl}media/`,
    ];

    for (const marker of requiredProjectPaths) {
      if (!html.includes(marker)) {
        throw new Error(`GitHub Pages export missed project path: ${marker}`);
      }
    }
  }

  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), html, "utf8");
}

await writeFile(
  path.join(outputDir, "404.html"),
  await render("/404", true),
  "utf8",
);
await writeFile(path.join(outputDir, ".nojekyll"), "", "utf8");

console.log(
  `GitHub Pages export complete: ${routes.length} routes for ${siteOrigin}${siteBaseUrl}`,
);
