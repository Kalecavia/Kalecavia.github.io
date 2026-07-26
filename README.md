# World Pulse

World Pulse is een Nederlandstalige, cinematografische 3D-datareis door de
systemen die de wereld laten bewegen: bevolking, voedsel, water, energie,
uitstoot en gezondheid.

De site gebruikt één gedeelde Three.js-scène die tijdens het scrollen van
toestand verandert, zeven hyperrealistische fotografische routewerelden en vijf
korte videolagen. Een aparte wereldmetersroute toont 63 lopende tellers uit de
acht hoofdcategorieën van Worldometer. Alle cijfers hebben een zichtbare bron,
meetperiode, status en uitleg in gewone taal. De lopende cijfers zijn
berekeningen vanaf een vastgelegde Worldometer-referentie en geen live sensoren.

## Vereisten

- Node.js `>=22.13.0`
- Een moderne browser met WebGL voor de volledige 3D-ervaring

## Starten

```bash
npm install
npm run dev
```

Open daarna `http://localhost:3000`.

## Validatie

```bash
npm run lint
npx tsc --noEmit
npm test
```

`npm test` bouwt eerst de volledige site en controleert daarna de
server-rendered HTML van alle publieke routes.

## Routes

- `/` — de hoofdreis in zeven hoofdstukken
- `/wereldmeters` — alle 63 lopende Worldometer-referentietellers
- `/wereld` — systeemoverzicht
- `/bevolking`
- `/voedsel-en-water`
- `/energie-en-uitstoot`
- `/gezondheid`
- `/bronnen` — bronregister en methode
- `/over-de-site` — concept, principes en beperkingen

## Architectuur

- `app/` — routes, UI en de scrollgestuurde WebGL-scène
- `data/world-data.ts` — typed bronregister en indicatoren
- `data/worldometer-data.ts` — 63 referentietellers, categorieën en rekenregels
- `data/site-media.ts` — route- en mediaregister
- `assets/` — 4K foto- en videomasters
- `public/media/world-rich/` — geoptimaliseerde browserdelivery
- `scripts/process-media.py` — reproduceerbare poster- en videotranscoding
- `docs/` — brief, research, benchmarkanalyse, beslissingen en assetmanifest
- `tests/` — server-render en routetests

De site heeft geen database, accounts, analytics, trackers of externe
runtime-API's nodig. Daardoor blijft de publieke leeservaring statisch,
privacyvriendelijk en robuust.

## Performance en toegankelijkheid

- één WebGL-renderer en één canvas;
- capped device-pixel-ratio en kleinere particle-set op mobiel/save-data;
- pauze bij verborgen tab of wanneer de hoofdreis buiten beeld is;
- `prefers-reduced-motion` houdt de scène stabiel;
- video start alleen nabij de viewport en pauzeert daarbuiten;
- reduced motion en `Save-Data` gebruiken uitsluitend de poster;
- vijf H.264-clips blijven elk onder 3 MB en posters onder 350 KB;
- een CSS-fallback verschijnt als WebGL niet kan starten;
- toetsenbordfocus, skiplink en semantische landmarks;
- kerninformatie blijft als normale HTML beschikbaar.

## Data

De 63 wereldmeters zijn vastgelegd vanaf de publieke Worldometer-homepage op 26
juli 2026. Waar een teller daar zichtbaar bewoog, gebruikt World Pulse de
waargenomen verandering als rekensnelheid. Iedere kaart noemt Worldometer als
referentie en legt in eenvoudige taal uit wat het cijfer wel en niet betekent.

De verdiepende indicatoren komen uit onder meer UN DESA, WHO, FAO, UN-Water,
IEA, World Bank/Tracking SDG7 en het Global Carbon Project. Zie `/bronnen` en
`docs/RESEARCH.md` voor URL's, perioden en definities. Er draait geen kwetsbare
runtime-scraper: een nieuwe referentie wordt pas na broncontrole in de
versiebeheerde dataset opgenomen.

## Deployment

Het project bouwt zowel de oorspronkelijke vinext/Worker-versie als een
volledig statische GitHub Pages-versie:

```bash
npm run build
npm run build:pages
```

`build:pages` rendert alle negen publieke routes naar `pages-dist/`, kopieert
de geoptimaliseerde scripts, beelden en videolagen en gebruikt de projectbasis
`/world-pulse/`. De workflow in
`.github/workflows/deploy-pages.yml` valideert en publiceert iedere push naar
`main` automatisch op `https://kalecavia.github.io/world-pulse/`.
