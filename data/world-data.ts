export type DataStatus = "observed" | "modeled" | "projected" | "derived";

export type Source = {
  id: string;
  name: string;
  publisher: string;
  url: string;
  retrieved: string;
  note: string;
};

export type Indicator = {
  id: string;
  label: string;
  value: number;
  display: string;
  unit: string;
  period: string;
  sourceId: Source["id"];
  status: DataStatus;
  cadence: string;
  description: string;
  caveat: string;
  ratePerSecond?: number;
};

export type Topic = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  accent: "cyan" | "green" | "coral" | "sand";
  metricIds: Indicator["id"][];
  chapters: {
    title: string;
    body: string;
  }[];
  next?: {
    href: string;
    label: string;
  };
};

export const sources: Source[] = [
  {
    id: "worldometer-counters-2026",
    name: "Worldometer — real time world statistics",
    publisher: "Worldometer",
    url: "https://www.worldometers.info/",
    retrieved: "2026-07-26",
    note: "Referentie voor 63 lopende tellers. De startwaarden en zichtbare rekensnelheden zijn op dezelfde avond gecontroleerd.",
  },
  {
    id: "un-wpp-2024",
    name: "World Population Prospects 2024",
    publisher: "United Nations Population Division",
    url: "https://www.un.org/development/desa/pd/world-population-prospects-2024",
    retrieved: "2026-07-26",
    note: "Officiële VN-schattingen en verwachtingen voor 237 landen en gebieden.",
  },
  {
    id: "worldometer-population-2026",
    name: "World population and demographics 2026",
    publisher: "Worldometer, based on UN WPP 2024",
    url: "https://www.worldometers.info/world-population/",
    retrieved: "2026-07-26",
    note: "Worldometer vertaalt de nieuwste VN-schattingen naar een doorlopende bevolkingsklok.",
  },
  {
    id: "jmp-2025",
    name: "Progress on household drinking water, sanitation and hygiene 2000–2024",
    publisher: "WHO/UNICEF Joint Monitoring Programme",
    url: "https://washdata.org/reports/jmp-2025-wash-households",
    retrieved: "2026-07-26",
    note: "Wereldwijde cijfers over drinkwater, toiletten en hygiëne, met extra aandacht voor verschillen tussen groepen.",
  },
  {
    id: "aquastat-water-use",
    name: "AQUASTAT water-use methodology",
    publisher: "Food and Agriculture Organization",
    url: "https://www.fao.org/aquastat/en/overview/methodology/water-use/",
    retrieved: "2026-07-26",
    note: "Legt uit hoe watergebruik door landbouw, huishoudens en industrie wordt geteld.",
  },
  {
    id: "un-water-scarcity",
    name: "Water scarcity facts",
    publisher: "UN-Water",
    url: "https://www.unwater.org/water-facts/water-scarcity",
    retrieved: "2026-07-26",
    note: "VN-overzicht van waterschaarste. Ieder cijfer houdt het jaar van het oorspronkelijke onderzoek.",
  },
  {
    id: "faostat-production-2024",
    name: "Agricultural production statistics 2010–2024",
    publisher: "Food and Agriculture Organization",
    url: "https://www.fao.org/statistics/highlights-archive/highlights-detail/agricultural-production-statistics-2010-2024/en",
    retrieved: "2026-07-26",
    note: "Wereldwijde productie van gewassen en dierlijke producten tot en met 2024.",
  },
  {
    id: "sdg7-2026",
    name: "Tracking SDG 7 — 2026 release",
    publisher: "IEA, IRENA, UNSD, World Bank and WHO",
    url: "https://www.worldbank.org/en/news/press-release/2026/06/16/accelerating-universal-energy-access",
    retrieved: "2026-07-26",
    note: "Gezamenlijke stand van zaken over toegang tot elektriciteit en schoon koken in 2024.",
  },
  {
    id: "gcb-2024",
    name: "Global Carbon Budget 2024",
    publisher: "Global Carbon Project",
    url: "https://globalcarbonbudget.org/gcb-2024/",
    retrieved: "2026-07-26",
    note: "Jaarlijkse wereldbalans van CO₂ uit fossiele brandstoffen, landgebruik en natuurlijke opname.",
  },
  {
    id: "who-ghe-2021",
    name: "Global Health Estimates — life expectancy",
    publisher: "World Health Organization",
    url: "https://www.who.int/data/gho/data/themes/mortality-and-global-health-estimates/ghe-life-expectancy-and-healthy-life-expectancy",
    retrieved: "2026-07-26",
    note: "Vergelijkbare WHO-schattingen van levensduur. De nieuwste wereldwaarden hier gaan over 2021.",
  },
];

export const indicators: Indicator[] = [
  {
    id: "population-2026",
    label: "Wereldbevolking",
    value: 8_300_678_395,
    display: "8,30 mld",
    unit: "mensen",
    period: "modelwaarde voor 1 juli 2026",
    sourceId: "worldometer-population-2026",
    status: "modeled",
    cadence: "Jaarlijks herijkt; tussentijds geïnterpoleerd",
    description:
      "Een demografische schatting, geen meting die op dit moment bij ieder mens wordt uitgevoerd.",
    caveat:
      "De teller animeert lineair vanaf de referentiedatum en is uitsluitend een illustratie van de geschatte jaarlijkse groei.",
    ratePerSecond: 69_065_325 / 31_556_952,
  },
  {
    id: "population-growth",
    label: "Netto groei per jaar",
    value: 69_065_325,
    display: "+69,1 mln",
    unit: "mensen per jaar",
    period: "2026-model",
    sourceId: "worldometer-population-2026",
    status: "modeled",
    cadence: "Jaarlijks",
    description:
      "Het geschatte saldo van geboortes, sterfte en internationale migratie op wereldniveau.",
    caveat: "Het groeitempo verschilt sterk per regio en neemt wereldwijd af.",
  },
  {
    id: "urban-share",
    label: "Woont stedelijk",
    value: 58.5,
    display: "58,5%",
    unit: "van de wereldbevolking",
    period: "2026-model",
    sourceId: "worldometer-population-2026",
    status: "modeled",
    cadence: "Jaarlijks",
    description:
      "Meer dan de helft van de wereldbevolking woont in gebieden die nationaal als stedelijk zijn geclassificeerd.",
    caveat: "De definitie van ‘stedelijk’ verschilt per land.",
  },
  {
    id: "population-peak",
    label: "Verwachte bevolkingspiek",
    value: 10.3,
    display: "≈10,3 mld",
    unit: "mensen",
    period: "midden jaren 2080",
    sourceId: "un-wpp-2024",
    status: "projected",
    cadence: "Bij elke VN-revisie",
    description:
      "De centrale VN-projectie bereikt waarschijnlijk deze eeuw een piek en vlakt daarna af.",
    caveat:
      "Een projectie is een plausibel scenario, geen voorspelling met zekerheid.",
  },
  {
    id: "cereal-production",
    label: "Graanproductie",
    value: 3.1,
    display: "3,1 Gt",
    unit: "ton",
    period: "2024",
    sourceId: "faostat-production-2024",
    status: "observed",
    cadence: "Jaarlijks",
    description:
      "De mondiale productie van granen nam sinds 2010 vooral door hogere opbrengsten toe.",
    caveat:
      "Productievolume zegt niet hoeveel voedsel mensen bereikt of hoeveel onderweg verloren gaat.",
  },
  {
    id: "meat-production",
    label: "Vleesproductie",
    value: 374,
    display: "374 mln t",
    unit: "ton",
    period: "2024",
    sourceId: "faostat-production-2024",
    status: "observed",
    cadence: "Jaarlijks",
    description: "Wereldwijde productie van geregistreerde vleessoorten.",
    caveat:
      "Productie en consumptie zijn ongelijk verdeeld en hebben verschillende lokale impacts.",
  },
  {
    id: "agri-water-share",
    label: "Wateronttrekking voor landbouw",
    value: 69,
    display: "69%",
    unit: "van mondiale onttrekking",
    period: "AQUASTAT-overzicht",
    sourceId: "aquastat-water-use",
    status: "derived",
    cadence: "Periodiek, per land verschillend",
    description:
      "Landbouw is wereldwijd de grootste onttrekker van zoet water; het aandeel verschilt enorm per regio.",
    caveat:
      "Onttrekking is niet hetzelfde als consumptie: een deel stroomt terug, vaak met veranderde kwaliteit.",
  },
  {
    id: "water-scarcity",
    label: "Ervaart ernstige waterschaarste",
    value: 4,
    display: "≈4 mld",
    unit: "mensen, minstens één maand per jaar",
    period: "onderliggende studie 2016",
    sourceId: "un-water-scarcity",
    status: "modeled",
    cadence: "Onregelmatig",
    description:
      "Seizoensschaarste kan groot zijn, ook in landen met een gunstig jaargemiddelde.",
    caveat:
      "Dit is geen actuele dagteller; UN-Water verwijst naar een veelgebruikte mondiale studie uit 2016.",
  },
  {
    id: "water-access-gained",
    label: "Kreeg veilig beheerd drinkwater",
    value: 2.2,
    display: "2,2 mld",
    unit: "mensen extra",
    period: "toename 2000–2024",
    sourceId: "jmp-2025",
    status: "modeled",
    cadence: "Periodieke JMP-update",
    description:
      "De vooruitgang sinds 2000 is groot, maar nationale gemiddelden verbergen hardnekkige ongelijkheid.",
    caveat:
      "‘Veilig beheerd’ vereist beschikbaarheid, toegankelijkheid en waterkwaliteit.",
  },
  {
    id: "electricity-access",
    label: "Toegang tot elektriciteit",
    value: 92,
    display: "92%",
    unit: "van de wereldbevolking",
    period: "2024",
    sourceId: "sdg7-2026",
    status: "modeled",
    cadence: "Jaarlijks",
    description:
      "De wereldwijde toegang stagneerde rond 92%; de resterende kloof concentreert zich sterk in Sub-Sahara-Afrika.",
    caveat:
      "Toegang zegt niets over betrouwbaarheid, betaalbaarheid of hoeveelheid stroom.",
  },
  {
    id: "without-electricity",
    label: "Zonder elektriciteit",
    value: 655,
    display: "655 mln",
    unit: "mensen",
    period: "2024",
    sourceId: "sdg7-2026",
    status: "modeled",
    cadence: "Jaarlijks",
    description:
      "Het tempo van uitbreiding moet volgens de SDG 7-custodians sterk omhoog om universele toegang te halen.",
    caveat:
      "Dit is een afgeronde modelraming op basis van nationale en huishouddata.",
  },
  {
    id: "fossil-co2",
    label: "Fossiele CO₂-uitstoot",
    value: 37.4,
    display: "37,4 Gt",
    unit: "CO₂ per jaar",
    period: "2024-projectie",
    sourceId: "gcb-2024",
    status: "projected",
    cadence: "Jaarlijks",
    description:
      "Fossiele emissies bereikten in de 2024-budgetraming opnieuw een recordniveau.",
    caveat:
      "De raming bevat een onzekerheidsmarge en wordt na afloop van het jaar herzien.",
  },
  {
    id: "total-co2",
    label: "Totale CO₂-uitstoot",
    value: 41.6,
    display: "41,6 Gt",
    unit: "fossiel + landgebruik",
    period: "2024-projectie",
    sourceId: "gcb-2024",
    status: "projected",
    cadence: "Jaarlijks",
    description:
      "Landgebruiksverandering voegt naar schatting 4,2 Gt toe aan de fossiele uitstoot.",
    caveat:
      "Dit is een jaarlijkse stroom, niet de totale historische hoeveelheid in de atmosfeer.",
  },
  {
    id: "life-expectancy",
    label: "Levensverwachting bij geboorte",
    value: 71.4,
    display: "71,4 jaar",
    unit: "wereldgemiddelde",
    period: "2021",
    sourceId: "who-ghe-2021",
    status: "modeled",
    cadence: "Periodieke WHO-revisie",
    description:
      "Na jaren vooruitgang bracht de pandemie het wereldgemiddelde terug tot ongeveer het niveau van 2012.",
    caveat:
      "Een wereldgemiddelde verbergt grote verschillen naar land, inkomen, geslacht en toegang tot zorg.",
  },
  {
    id: "healthy-life",
    label: "Gezonde levensverwachting",
    value: 61.9,
    display: "61,9 jaar",
    unit: "wereldgemiddelde",
    period: "2021",
    sourceId: "who-ghe-2021",
    status: "modeled",
    cadence: "Periodieke WHO-revisie",
    description:
      "Het geschatte aantal jaren dat mensen gemiddeld in goede gezondheid leven.",
    caveat:
      "Dit is een gemodelleerde samengestelde maat met onzekerheidsintervallen.",
  },
  {
    id: "polluting-cooking",
    label: "Afhankelijk van vervuilende kooktechnieken",
    value: 2,
    display: "≈2 mld",
    unit: "mensen",
    period: "2024",
    sourceId: "sdg7-2026",
    status: "modeled",
    cadence: "Jaarlijks",
    description:
      "Gebrek aan schoon koken verbindt energiearmoede direct met blootstelling aan schadelijke lucht.",
    caveat:
      "De indicator combineert diverse brandstoffen, technieken en nationale datakwaliteit.",
  },
];

export const indicatorById = Object.fromEntries(
  indicators.map((indicator) => [indicator.id, indicator]),
) as Record<string, Indicator>;

export const sourceById = Object.fromEntries(
  sources.map((source) => [source.id, source]),
) as Record<string, Source>;

export const topics: Topic[] = [
  {
    slug: "wereld",
    eyebrow: "Wereldbeeld / 01",
    title: "Alles gebeurt tegelijk.",
    intro:
      "Terwijl jij deze zin leest, worden mensen geboren, wordt energie gebruikt en stroomt water door steden en velden. Hier zie je hoe die verhalen met elkaar verbonden zijn.",
    accent: "cyan",
    metricIds: [
      "population-2026",
      "cereal-production",
      "electricity-access",
      "total-co2",
      "life-expectancy",
      "water-scarcity",
    ],
    chapters: [
      {
        title: "Het ene getal duwt tegen het andere",
        body: "Meer mensen hebben woningen, eten, water en energie nodig. Hoe zwaar dat op de planeet drukt, hangt vooral af van wat we gebruiken, hoe we het maken en hoe eerlijk we het verdelen.",
      },
      {
        title: "Grote getallen hebben vertaling nodig",
        body: "Een miljard is moeilijk voor te stellen. Daarom vertellen we bij ieder getal wat er wordt geteld, over welke periode en waarom het een schatting blijft.",
      },
    ],
    next: { href: "/bevolking", label: "Volg de menselijke laag" },
  },
  {
    slug: "bevolking",
    eyebrow: "Mensen / 02",
    title: "We groeien nog, maar niet overal.",
    intro:
      "Er komen wereldwijd nog mensen bij, maar het tempo daalt. Tegelijk groeien jonge regio’s snel, terwijl andere landen ouder worden en soms al krimpen.",
    accent: "cyan",
    metricIds: [
      "population-2026",
      "population-growth",
      "urban-share",
      "population-peak",
    ],
    chapters: [
      {
        title: "Niemand telt acht miljard hoofden tegelijk",
        body: "Landen houden volkstellingen en registraties bij. De VN maakt daar een wereldschatting van. De teller verdeelt de verwachte groei over seconden, zodat je het tempo kunt zien.",
      },
      {
        title: "Eén totaal verbergt grote verschillen",
        body: "In veel Afrikaanse landen groeit de bevolking snel. Delen van Europa en Oost-Azië krimpen al. De wereldteller gaat omhoog, maar het lokale verhaal kan precies andersom zijn.",
      },
    ],
    next: { href: "/voedsel-en-water", label: "Bekijk de hulpbronnenlaag" },
  },
  {
    slug: "voedsel-en-water",
    eyebrow: "Eten & drinken / 03",
    title: "Er is veel. Toch krijgt niet iedereen genoeg.",
    intro:
      "De wereld produceert enorme hoeveelheden voedsel en gebruikt nog grotere hoeveelheden water. Het probleem is vaak niet alleen hoeveel er is, maar wie erbij kan.",
    accent: "green",
    metricIds: [
      "cereal-production",
      "meat-production",
      "agri-water-share",
      "water-scarcity",
      "water-access-gained",
    ],
    chapters: [
      {
        title: "Een bord eten begint bij water",
        body: "Gewassen, vee en voedselverwerking gebruiken veel water. In droge gebieden moeten boeren, steden, fabrieken en natuur vaak uit dezelfde rivier of grondwaterlaag putten.",
      },
      {
        title: "Productie alleen lost honger niet op",
        body: "Voedsel moet veilig worden opgeslagen, vervoerd en betaalbaar verkocht. Oorlog, armoede, slechte wegen of een mislukte oogst kunnen de toegang breken terwijl er wereldwijd genoeg wordt gemaakt.",
      },
    ],
    next: { href: "/energie-en-uitstoot", label: "Volg energie en uitstoot" },
  },
  {
    slug: "energie-en-uitstoot",
    eyebrow: "Energie / 04",
    title: "Energie maakt bijna alles mogelijk.",
    intro:
      "Licht, vervoer, verwarming, ziekenhuizen en internet draaien op energie. Steeds meer daarvan komt uit zon en wind, maar olie, gas en kolen zijn nog lang niet verdwenen.",
    accent: "coral",
    metricIds: [
      "electricity-access",
      "without-electricity",
      "fossil-co2",
      "total-co2",
      "polluting-cooking",
    ],
    chapters: [
      {
        title: "Meer stroom kan levens direct verbeteren",
        body: "Elektriciteit maakt koeling van medicijnen, verlichting op school en veilig koken mogelijk. Het verschil zit in waar die stroom vandaan komt en of mensen haar kunnen betalen.",
      },
      {
        title: "CO₂ verdwijnt niet met de jaarwisseling",
        body: "De uitstootmeter begint ieder jaar opnieuw. De gassen in de lucht stapelen zich wel op. Daarom telt niet alleen de uitstoot van vandaag, maar ook alles wat eerder is uitgestoten.",
      },
    ],
    next: { href: "/gezondheid", label: "Ga naar menselijke uitkomsten" },
  },
  {
    slug: "gezondheid",
    eyebrow: "Gezondheid / 05",
    title: "Gezondheid begint buiten het ziekenhuis.",
    intro:
      "Schoon water, goed eten, veilig werk, onderwijs en een arts in de buurt bepalen samen hoe lang en gezond iemand kan leven.",
    accent: "sand",
    metricIds: ["life-expectancy", "healthy-life", "polluting-cooking"],
    chapters: [
      {
        title: "Niemand leeft in het wereldgemiddelde",
        body: "Een gemiddelde van ruim zeventig jaar betekent niet dat iedereen die leeftijd haalt. Inkomen, woonplaats, geslacht en toegang tot zorg maken enorme verschillen.",
      },
      {
        title: "Gezondheidsdata komt later binnen",
        body: "Een ziekenhuis weet wat er vandaag gebeurt, maar een betrouwbaar wereldtotaal kost jaren om te verzamelen. De lopende tellers tonen daarom een berekend tempo tussen oudere, gecontroleerde schattingen.",
      },
    ],
    next: { href: "/bronnen", label: "Controleer data en methode" },
  },
];

export function getTopic(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}
