import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const publicRoutes = [
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

async function createWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function render(worker, pathname = "/") {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete World Pulse home page", async () => {
  const worker = await createWorker();
  const response = await render(worker);

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>World Pulse/);
  assert.match(html, /De wereld telt/);
  assert.match(html, /Time never stops/);
  assert.match(html, /Bevolking/);
  assert.match(html, /Voedsel &amp; water/);
  assert.match(html, /Energie &amp; uitstoot/);
  assert.match(html, /Bronnen &amp; methode/);
  assert.match(html, /WORLDOMETER-REFERENTIE/);
  assert.match(html, /63 lopende tellers/i);
  assert.match(html, /world-orbit-poster\.webp/);
  assert.match(html, /world-orbit-flow\.mp4/);
  assert.match(html, /<video\b/);
  assert.match(html, /aria-label="Hoofdnavigatie"/);
  assert.match(html, /href="#main"/);
  assert.equal((html.match(/--wm-title-length:\d+/g) ?? []).length, 8);
  assert.doesNotMatch(html, /react-loading-skeleton|codex-preview/i);
});

test("server-renders every public route", async () => {
  const worker = await createWorker();
  const routes = [
    ["/wereldmeters", /63 WORLDOMETER-REFERENTIES/],
    ["/wereld", /Wereldbeeld/],
    ["/bevolking", /Bevolking/],
    ["/voedsel-en-water", /Voedsel/],
    ["/energie-en-uitstoot", /Energie/],
    ["/gezondheid", /Gezondheid/],
    ["/bronnen", /Bronnen/],
    ["/over-de-site", /Data als verhaal/],
  ];

  for (const [pathname, marker] of routes) {
    const response = await render(worker, pathname);
    assert.equal(response.status, 200, `${pathname} should return 200`);
    const html = await response.text();
    assert.match(html, marker);
    assert.match(html, /media-stage/);
  }
});

test("renders all 63 Worldometer reference counters with plain explanations", async () => {
  const worker = await createWorker();
  const response = await render(worker, "/wereldmeters");
  const html = await response.text();
  const cards = html.match(/class="wm-card(?:\s|")/g) ?? [];

  assert.equal(cards.length, 63);
  assert.match(html, /Hoe werkt dit\?/);
  assert.match(html, /Worldometer-referentie/);
  assert.match(html, /Een lopend getal is nog geen live meting/);
});

test("keeps every visible internal link on a real route or page anchor", async () => {
  const worker = await createWorker();
  const knownRoutes = new Set(publicRoutes);

  for (const pathname of publicRoutes) {
    const response = await render(worker, pathname);
    const html = await response.text();
    const hrefs = [...html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)].map(
      ([, href]) => href,
    );

    for (const href of hrefs) {
      if (!href.startsWith("/") || href.startsWith("/assets/")) continue;
      const route = href.split("#", 1)[0];
      assert.ok(knownRoutes.has(route), `${pathname} links to unknown ${href}`);
    }
  }
});

test("keeps data and documentation explicit, with no starter preview", async () => {
  const [data, liveData, research, architecture, globalStyles, packageJson] =
    await Promise.all([
      readFile(new URL("../data/world-data.ts", import.meta.url), "utf8"),
      readFile(new URL("../data/worldometer-data.ts", import.meta.url), "utf8"),
      readFile(new URL("../docs/RESEARCH.md", import.meta.url), "utf8"),
      readFile(new URL("../docs/ARCHITECTURE.md", import.meta.url), "utf8"),
      readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
      readFile(new URL("../package.json", import.meta.url), "utf8"),
    ]);

  assert.match(data, /status:\s*"modeled"/);
  assert.match(data, /sourceId:/);
  assert.match(data, /caveat:/);
  assert.match(liveData, /counterCount:\s*63/);
  assert.match(liveData, /capturedAt:/);
  assert.match(liveData, /explanation:/);
  assert.match(research, /UN World Population Prospects 2024/);
  assert.match(architecture, /prefers-reduced-motion/);
  assert.match(globalStyles, /container-type:\s*inline-size/);
  assert.match(globalStyles, /180cqw\s*\/\s*var\(--wm-title-length/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  const previewEntries = await readdir(
    new URL("app/_sites-preview", projectRoot),
  ).catch((error) => {
    if (error?.code === "ENOENT") return [];
    throw error;
  });

  assert.deepEqual(previewEntries, []);
});

test("ships an optimized social preview and valid external source URLs", async () => {
  const [socialImage, data] = await Promise.all([
    stat(new URL("../public/media/world-pulse-social.webp", import.meta.url)),
    readFile(new URL("../data/world-data.ts", import.meta.url), "utf8"),
  ]);

  assert.ok(socialImage.size > 10_000, "social preview should not be empty");
  assert.ok(socialImage.size < 500_000, "social preview exceeds 500 KB budget");

  const sourceUrls = [...data.matchAll(/url:\s*"([^"]+)"/g)].map(
    ([, url]) => url,
  );
  assert.ok(sourceUrls.length >= 8);
  sourceUrls.forEach((url) => {
    const parsed = new URL(url);
    assert.equal(parsed.protocol, "https:");
  });
});

test("ships optimized posters and looping delivery clips within budget", async () => {
  const posterNames = [
    "world-orbit-poster.webp",
    "population-city-poster.webp",
    "food-water-poster.webp",
    "energy-grid-poster.webp",
    "health-human-poster.webp",
    "sources-archive-poster.webp",
    "studio-method-poster.webp",
  ];
  const videoNames = [
    "world-orbit.mp4",
    "world-orbit-flow.mp4",
    "population-city.mp4",
    "food-water.mp4",
    "energy-grid.mp4",
    "health-human.mp4",
  ];

  for (const name of posterNames) {
    const file = await stat(
      new URL(`../public/media/world-rich/${name}`, import.meta.url),
    );
    assert.ok(file.size > 50_000, `${name} is unexpectedly small`);
    assert.ok(file.size < 350_000, `${name} exceeds the 350 KB poster budget`);
  }

  for (const name of videoNames) {
    const file = await stat(
      new URL(`../public/media/world-rich/${name}`, import.meta.url),
    );
    assert.ok(file.size > 100_000, `${name} is unexpectedly small`);
    assert.ok(file.size < 3_000_000, `${name} exceeds the 3 MB clip budget`);
  }
});
