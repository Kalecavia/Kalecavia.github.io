export type MediaVariant =
  | "orbit"
  | "city"
  | "flow"
  | "grid"
  | "human"
  | "archive"
  | "studio";

export type MediaAsset = {
  poster: string;
  video?: string;
  alt: string;
  eyebrow: string;
  caption: string;
  explanation: string;
  variant: MediaVariant;
  credit: string;
};

export const mediaAssets = {
  world: {
    poster: "/media/world-rich/world-orbit-poster.webp",
    video: "/media/world-rich/world-orbit-flow.mp4",
    alt: "De aarde vanuit een lage baan met stadslicht langs de nachtzijde",
    eyebrow: "ORBITAL VIEW / 001",
    caption: "Eén aarde, maar niet voor iedereen dezelfde wereld.",
    explanation:
      "De stadslichten laten zien waar veel mensen en infrastructuur samenkomen. Donkere gebieden zijn niet leeg: ze kunnen dunbevolkt zijn of minder toegang tot elektriciteit hebben.",
    variant: "orbit",
    credit:
      "Fotomaster: GPT Image · videolaag: Google Flow Pro, vanuit dezelfde 4K-referentie",
  },
  population: {
    poster: "/media/world-rich/population-city-poster.webp",
    video: "/media/world-rich/population-city.mp4",
    alt: "Fotorealistische luchtfoto van een dicht verlichte metropool",
    eyebrow: "HUMAN DENSITY / 002",
    caption: "Een stad groeit straat voor straat, huis voor huis.",
    explanation:
      "Vanuit de lucht lijkt een stad één lichtpatroon. Op straat gaat het om woningen, banen, files, scholen en miljoenen dagelijkse keuzes.",
    variant: "city",
    credit: "Fotomaster: GPT Image · videolaag: Pexels / Alex Sanchez",
  },
  foodWater: {
    poster: "/media/world-rich/food-water-poster.webp",
    video: "/media/world-rich/food-water.mp4",
    alt: "Fotorealistisch irrigatielandschap met landbouwvelden en waterbassins",
    eyebrow: "RESOURCE FLOW / 003",
    caption:
      "Een groen veld begint vaak bij water dat ergens anders vandaan komt.",
    explanation:
      "Kanalen en pompen maken landbouw mogelijk, maar gebruiken ook water dat huishoudens, natuur en industrie nodig hebben. Daarom is niet alleen de hoeveelheid, maar vooral de verdeling belangrijk.",
    variant: "flow",
    credit: "Fotomaster: GPT Image · videolaag: Pexels / Lê Cuộc",
  },
  energy: {
    poster: "/media/world-rich/energy-grid-poster.webp",
    video: "/media/world-rich/energy-grid.mp4",
    alt: "Fotorealistische kustvlakte met windturbines en zonnepanelen",
    eyebrow: "ENERGY FIELD / 004",
    caption:
      "Schone stroom groeit, terwijl de totale energievraag ook blijft groeien.",
    explanation:
      "Wind en zon leveren steeds meer energie. Toch draaien veel fabrieken, voertuigen en verwarmingssystemen nog op olie, gas of kolen.",
    variant: "grid",
    credit: "Fotomaster: GPT Image · videolaag: Pexels / Jakub Zerdzicki",
  },
  health: {
    poster: "/media/world-rich/health-human-poster.webp",
    video: "/media/world-rich/health-human.mp4",
    alt: "Fotorealistische zorgmedewerkers en bewoners bij een lokale kliniek",
    eyebrow: "HUMAN OUTCOME / 005",
    caption:
      "Gezondheid begint vaak lang voordat iemand een kliniek binnenloopt.",
    explanation:
      "Schoon water, goed eten, een veilig huis, onderwijs en betaalbare zorg bepalen samen hoe gezond mensen kunnen leven.",
    variant: "human",
    credit: "Fotomaster: GPT Image · videolaag: Pexels / Andy Coffie",
  },
  sources: {
    poster: "/media/world-rich/sources-archive-poster.webp",
    alt: "Fotorealistische onderzoeksruimte met kaarten, boeken en datadocumenten",
    eyebrow: "EVIDENCE ROOM / 006",
    caption:
      "Een getal wordt pas bruikbaar wanneer je weet waar het vandaan komt.",
    explanation:
      "Een bron vertelt wie heeft gemeten, uit welk jaar het cijfer komt en waar onzekerheid zit. Daarom tonen we die informatie naast de cijfers.",
    variant: "archive",
    credit: "Fotomaster: GPT Image",
  },
  studio: {
    poster: "/media/world-rich/studio-method-poster.webp",
    alt: "Fotorealistische ontwerpstudio met wereldkaart en datavisualisaties",
    eyebrow: "STORY LAB / 007",
    caption: "De techniek is het podium; de uitleg blijft het belangrijkste.",
    explanation:
      "Beeld en beweging trekken aandacht. Daarna moet de tekst in gewone taal vertellen wat een teller betekent en waarom je hem niet blind moet geloven.",
    variant: "studio",
    credit: "Fotomaster: GPT Image",
  },
} satisfies Record<string, MediaAsset>;

export const topicMedia = {
  wereld: {
    hero: mediaAssets.world,
    chapters: [mediaAssets.population, mediaAssets.energy],
  },
  bevolking: {
    hero: mediaAssets.population,
    chapters: [mediaAssets.population, mediaAssets.world],
  },
  "voedsel-en-water": {
    hero: mediaAssets.foodWater,
    chapters: [mediaAssets.foodWater, mediaAssets.health],
  },
  "energie-en-uitstoot": {
    hero: mediaAssets.energy,
    chapters: [mediaAssets.energy, mediaAssets.world],
  },
  gezondheid: {
    hero: mediaAssets.health,
    chapters: [mediaAssets.health, mediaAssets.foodWater],
  },
} satisfies Record<
  string,
  {
    hero: MediaAsset;
    chapters: readonly [MediaAsset, MediaAsset];
  }
>;
