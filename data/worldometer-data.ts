export type WorldometerCategoryId =
  | "population"
  | "economy"
  | "society"
  | "environment"
  | "food"
  | "water"
  | "energy"
  | "health";

export type WorldometerReset = "never" | "day" | "year";

export type WorldometerCounter = {
  id: string;
  category: WorldometerCategoryId;
  label: string;
  baseValue: number;
  ratePerSecond: number;
  reset: WorldometerReset;
  unit: string;
  prefix?: string;
  decimals?: number;
  direction?: "up" | "down" | "still";
  explanation: string;
  context: string;
};

export type WorldometerCategory = {
  id: WorldometerCategoryId;
  label: string;
  shortLabel: string;
  intro: string;
  accent: "cyan" | "green" | "coral" | "sand";
};

export const worldometerReference = {
  capturedAt: "2026-07-26T20:20:43.734Z",
  capturedLocal: "26 juli 2026, 22:20 CEST",
  counterCount: 63,
  sourceUrl: "https://www.worldometers.info/",
  sourceLabel: "Worldometer — real time world statistics",
  sourcesUrl: "https://www.worldometers.info/sources/",
  note: "Startwaarden en zichtbare rekensnelheden gecontroleerd op de hoofdpagina van Worldometer.",
} as const;

const capturedDaySeconds = 22 * 60 * 60 + 20 * 60 + 43.734;
const capturedYearSeconds = 206 * 24 * 60 * 60 + capturedDaySeconds;

const todayRate = (value: number) => value / capturedDaySeconds;
const yearRate = (value: number) => value / capturedYearSeconds;

export const worldometerCategories: WorldometerCategory[] = [
  {
    id: "population",
    label: "Wereldbevolking",
    shortLabel: "Mensen",
    intro:
      "Geboorte en overlijden worden nergens wereldwijd seconde voor seconde geregistreerd. Deze tellers verdelen recente jaarschattingen over de tijd.",
    accent: "cyan",
  },
  {
    id: "economy",
    label: "Overheid & productie",
    shortLabel: "Geld",
    intro:
      "Hier zie je hoe snel grote geldstromen en productieaantallen oplopen. Het zijn wereldwijde gemiddelden, geen kassabon van ieder land.",
    accent: "sand",
  },
  {
    id: "society",
    label: "Media & digitaal leven",
    shortLabel: "Media",
    intro:
      "Een dag online is enorm druk. Deze tellers maken de schaal van apparaten, berichten en zoekopdrachten zichtbaar.",
    accent: "cyan",
  },
  {
    id: "environment",
    label: "Milieu",
    shortLabel: "Planeet",
    intro:
      "Deze meters laten zien hoeveel druk er in een jaar bijkomt. Een teller die op 1 januari opnieuw begint, wist de werkelijke schade natuurlijk niet uit.",
    accent: "coral",
  },
  {
    id: "food",
    label: "Voedsel",
    shortLabel: "Voedsel",
    intro:
      "Tekort en overconsumptie bestaan tegelijk. De cijfers gaan over mensen, niet over schuld of karakter.",
    accent: "sand",
  },
  {
    id: "water",
    label: "Water",
    shortLabel: "Water",
    intro:
      "Water is overal, veilig drinkwater niet. Gebruik, toegang en ziekte vertellen daarom drie verschillende verhalen.",
    accent: "green",
  },
  {
    id: "energy",
    label: "Energie",
    shortLabel: "Energie",
    intro:
      "De wereld gebruikt ieder moment energie. De voorraadmeters zijn scenario’s bij het huidige gebruik, geen exacte aftelklok tot de laatste druppel.",
    accent: "green",
  },
  {
    id: "health",
    label: "Gezondheid",
    shortLabel: "Gezondheid",
    intro:
      "Achter ieder cijfer zit een mens. De tellers hieronder zijn afgeronde wereldschattingen en vragen om rustige, menselijke uitleg.",
    accent: "coral",
  },
];

export const worldometerCounters: WorldometerCounter[] = [
  {
    id: "current-population",
    category: "population",
    label: "Mensen op aarde",
    baseValue: 8_306_963_277,
    ratePerSecond: 2.232512,
    reset: "never",
    unit: "mensen",
    direction: "up",
    explanation:
      "Dit is de geschatte wereldbevolking op dit moment. Er bestaat geen centrale registratie die ieder mens live telt.",
    context:
      "De teller groeit doordat er wereldwijd meer mensen worden geboren dan overlijden.",
  },
  {
    id: "births-year",
    category: "population",
    label: "Geboren dit jaar",
    baseValue: 75_050_998,
    ratePerSecond: yearRate(75_050_998),
    reset: "year",
    unit: "mensen",
    direction: "up",
    explanation:
      "Een berekende schatting van het aantal geboortes sinds 1 januari.",
    context:
      "De snelheid komt uit jaarlijkse bevolkingsramingen en loopt tussen officiële updates gelijkmatig door.",
  },
  {
    id: "births-today",
    category: "population",
    label: "Geboren vandaag",
    baseValue: 337_751,
    ratePerSecond: todayRate(337_751),
    reset: "day",
    unit: "mensen",
    direction: "up",
    explanation:
      "Het geschatte aantal kinderen dat sinds middernacht is geboren.",
    context:
      "De teller begint iedere dag opnieuw; echte geboorteregistraties komen veel later binnen.",
  },
  {
    id: "deaths-year",
    category: "population",
    label: "Overleden dit jaar",
    baseValue: 35_364_382,
    ratePerSecond: yearRate(35_364_382),
    reset: "year",
    unit: "mensen",
    direction: "up",
    explanation:
      "Een wereldwijde schatting van alle overlijdens sinds 1 januari.",
    context:
      "Landen registreren sterfte op verschillende manieren en met verschillende vertragingen.",
  },
  {
    id: "deaths-today",
    category: "population",
    label: "Overleden vandaag",
    baseValue: 159_150,
    ratePerSecond: todayRate(159_150),
    reset: "day",
    unit: "mensen",
    direction: "up",
    explanation:
      "Het geschatte aantal mensen dat sinds middernacht is overleden.",
    context:
      "Dit is een modeltempo, geen live koppeling met ziekenhuizen of bevolkingsregisters.",
  },
  {
    id: "population-growth-year",
    category: "population",
    label: "Bevolkingsgroei dit jaar",
    baseValue: 39_686_616,
    ratePerSecond: yearRate(39_686_616),
    reset: "year",
    unit: "mensen erbij",
    direction: "up",
    explanation:
      "Het verschil tussen geschatte geboortes en overlijdens sinds 1 januari.",
    context:
      "Wereldwijd is het saldo positief, maar sommige landen krimpen al.",
  },
  {
    id: "population-growth-today",
    category: "population",
    label: "Bevolkingsgroei vandaag",
    baseValue: 178_601,
    ratePerSecond: todayRate(178_601),
    reset: "day",
    unit: "mensen erbij",
    direction: "up",
    explanation:
      "Het geschatte aantal mensen dat er vandaag per saldo bij is gekomen.",
    context:
      "Geboortes minus overlijdens levert het tempo op dat je hier ziet.",
  },
  {
    id: "healthcare-spend-today",
    category: "economy",
    label: "Publieke zorguitgaven vandaag",
    baseValue: 17_015_784_008,
    ratePerSecond: todayRate(17_015_784_008),
    reset: "day",
    unit: "Amerikaanse dollar",
    prefix: "$",
    direction: "up",
    explanation:
      "Een schatting van wat overheden wereldwijd vandaag aan zorg uitgeven.",
    context:
      "Een groot bedrag zegt nog niets over hoeveel zorg één persoon werkelijk krijgt.",
  },
  {
    id: "education-spend-today",
    category: "economy",
    label: "Publieke onderwijsuitgaven vandaag",
    baseValue: 11_135_557_695,
    ratePerSecond: todayRate(11_135_557_695),
    reset: "day",
    unit: "Amerikaanse dollar",
    prefix: "$",
    direction: "up",
    explanation:
      "Een schatting van de wereldwijde overheidsuitgaven aan onderwijs vandaag.",
    context:
      "De teller telt dollars op; de kwaliteit en bereikbaarheid verschillen sterk per land.",
  },
  {
    id: "military-spend-today",
    category: "economy",
    label: "Publieke militaire uitgaven vandaag",
    baseValue: 4_475_832_522,
    ratePerSecond: todayRate(4_475_832_522),
    reset: "day",
    unit: "Amerikaanse dollar",
    prefix: "$",
    direction: "up",
    explanation:
      "Een geschatte dagwaarde van alle militaire overheidsuitgaven samen.",
    context:
      "Begrotingen worden omgerekend naar één gemiddeld tempo per seconde.",
  },
  {
    id: "cars-produced-year",
    category: "economy",
    label: "Auto’s gemaakt dit jaar",
    baseValue: 52_214_376,
    ratePerSecond: yearRate(52_214_376),
    reset: "year",
    unit: "auto’s",
    direction: "up",
    explanation:
      "Een schatting van het aantal geproduceerde personenauto’s sinds 1 januari.",
    context:
      "De echte productie gaat in pieken en pauzes; de teller maakt er een gelijkmatig tempo van.",
  },
  {
    id: "bicycles-produced-year",
    category: "economy",
    label: "Fietsen gemaakt dit jaar",
    baseValue: 91_895_915,
    ratePerSecond: yearRate(91_895_915),
    reset: "year",
    unit: "fietsen",
    direction: "up",
    explanation:
      "Een wereldwijde schatting van het aantal geproduceerde fietsen dit jaar.",
    context:
      "Het cijfer laat schaal zien, niet hoeveel fietsen verkocht of dagelijks gebruikt worden.",
  },
  {
    id: "computers-produced-year",
    category: "economy",
    label: "Computers gemaakt dit jaar",
    baseValue: 126_152_722,
    ratePerSecond: yearRate(126_152_722),
    reset: "year",
    unit: "computers",
    direction: "up",
    explanation:
      "Een schatting van de wereldwijde computerproductie sinds 1 januari.",
    context:
      "Onder ‘computer’ vallen verschillende soorten apparaten en marktrapportages.",
  },
  {
    id: "book-titles-year",
    category: "society",
    label: "Nieuwe boektitels dit jaar",
    baseValue: 1_638_647,
    ratePerSecond: yearRate(1_638_647),
    reset: "year",
    unit: "titels",
    direction: "up",
    explanation:
      "Het geschatte aantal nieuwe boektitels dat dit jaar wereldwijd verschijnt.",
    context:
      "Herdrukken en publicatievormen worden niet overal op dezelfde manier geteld.",
  },
  {
    id: "newspapers-today",
    category: "society",
    label: "Kranten verspreid vandaag",
    baseValue: 419_501_225,
    ratePerSecond: todayRate(419_501_225),
    reset: "day",
    unit: "exemplaren",
    direction: "up",
    explanation:
      "Een schatting van het aantal papieren kranten dat vandaag wordt verspreid.",
    context:
      "De oplage daalt in veel landen, maar wereldwijd gaat het nog steeds om honderden miljoenen.",
  },
  {
    id: "televisions-today",
    category: "society",
    label: "Televisies verkocht vandaag",
    baseValue: 633_157,
    ratePerSecond: todayRate(633_157),
    reset: "day",
    unit: "televisies",
    direction: "up",
    explanation: "Een geschat dagtotaal van verkochte televisietoestellen.",
    context:
      "Verkoopgegevens komen uit marktmodellen en zijn niet rechtstreeks aan alle winkels gekoppeld.",
  },
  {
    id: "phones-today",
    category: "society",
    label: "Mobiele telefoons verkocht vandaag",
    baseValue: 7_794_085,
    ratePerSecond: todayRate(7_794_085),
    reset: "day",
    unit: "telefoons",
    direction: "up",
    explanation:
      "Een schatting van het aantal mobiele telefoons dat vandaag wereldwijd wordt verkocht.",
    context:
      "De teller laat marktvolume zien; tweedehands toestellen vallen hier meestal buiten.",
  },
  {
    id: "videogames-spend-today",
    category: "society",
    label: "Uitgegeven aan videogames vandaag",
    baseValue: 324_969_349,
    ratePerSecond: todayRate(324_969_349),
    reset: "day",
    unit: "Amerikaanse dollar",
    prefix: "$",
    direction: "up",
    explanation:
      "Een schatting van alle uitgaven aan games en bijbehorende digitale aankopen vandaag.",
    context:
      "Het gaat om een marktmodel, niet om een live optelsom van iedere betaling.",
  },
  {
    id: "internet-users",
    category: "society",
    label: "Mensen die internet gebruiken",
    baseValue: 7_285_470_859,
    ratePerSecond: 17.446668,
    reset: "never",
    unit: "mensen",
    direction: "up",
    explanation:
      "Een schatting van het aantal mensen dat toegang heeft tot en gebruikmaakt van internet.",
    context:
      "Online zijn zegt nog niets over snelheid, prijs, vrijheid of digitale vaardigheden.",
  },
  {
    id: "emails-today",
    category: "society",
    label: "E-mails verstuurd vandaag",
    baseValue: 309_905_842_849,
    ratePerSecond: todayRate(309_905_842_849),
    reset: "day",
    unit: "e-mails",
    direction: "up",
    explanation:
      "Een model van het totale e-mailverkeer sinds middernacht, inclusief veel automatische berichten.",
    context: "Een groot deel bestaat uit nieuwsbrieven, systeemmail en spam.",
  },
  {
    id: "blog-posts-today",
    category: "society",
    label: "Blogberichten vandaag",
    baseValue: 12_867_582,
    ratePerSecond: todayRate(12_867_582),
    reset: "day",
    unit: "berichten",
    direction: "up",
    explanation:
      "Een schatting van het aantal nieuwe blogberichten dat vandaag online verschijnt.",
    context:
      "Niet elk platform is zichtbaar voor dezelfde meetdiensten, dus dit blijft een benadering.",
  },
  {
    id: "tweets-today",
    category: "society",
    label: "Posts op X/Twitter vandaag",
    baseValue: 1_012_283_377,
    ratePerSecond: todayRate(1_012_283_377),
    reset: "day",
    unit: "posts",
    direction: "up",
    explanation:
      "Een schatting van het aantal korte berichten dat vandaag op X/Twitter wordt geplaatst.",
    context:
      "Platformtoegang en telmethoden veranderen; lees dit vooral als een orde van grootte.",
  },
  {
    id: "searches-today",
    category: "society",
    label: "Google-zoekopdrachten vandaag",
    baseValue: 12_806_770_999,
    ratePerSecond: todayRate(12_806_770_999),
    reset: "day",
    unit: "zoekopdrachten",
    direction: "up",
    explanation:
      "Een schatting van het aantal zoekopdrachten dat Google vandaag verwerkt.",
    context:
      "Google publiceert geen volledig live totaal; de teller gebruikt marktaandeel en verkeersramingen.",
  },
  {
    id: "forest-loss-year",
    category: "environment",
    label: "Bos verloren dit jaar",
    baseValue: 2_947_628,
    ratePerSecond: yearRate(2_947_628),
    reset: "year",
    unit: "hectare",
    direction: "up",
    explanation:
      "Een schatting van het bosoppervlak dat sinds 1 januari verloren is gegaan.",
    context:
      "Eén hectare is ongeveer anderhalf voetbalveld. Niet ieder type bos heeft dezelfde natuurwaarde.",
  },
  {
    id: "soil-erosion-year",
    category: "environment",
    label: "Land verloren door bodemerosie",
    baseValue: 3_968_304,
    ratePerSecond: yearRate(3_968_304),
    reset: "year",
    unit: "hectare",
    direction: "up",
    explanation:
      "Een schatting van grond die dit jaar door wind en water ernstig is aangetast.",
    context:
      "Vruchtbare bodem ontstaat langzaam maar kan in korte tijd wegspoelen of wegwaaien.",
  },
  {
    id: "co2-emissions-year",
    category: "environment",
    label: "CO₂ uitgestoten dit jaar",
    baseValue: 22_733_510_259,
    ratePerSecond: yearRate(22_733_510_259),
    reset: "year",
    unit: "ton CO₂",
    direction: "up",
    explanation:
      "De geschatte hoeveelheid koolstofdioxide die sinds 1 januari is uitgestoten.",
    context:
      "De teller begint opnieuw, maar CO₂ kan tientallen tot honderden jaren invloed houden.",
  },
  {
    id: "desertification-year",
    category: "environment",
    label: "Verwoestijning dit jaar",
    baseValue: 6_801_530,
    ratePerSecond: yearRate(6_801_530),
    reset: "year",
    unit: "hectare",
    direction: "up",
    explanation:
      "Een schatting van land dat dit jaar droger en minder productief is geworden.",
    context:
      "Verwoestijning betekent niet altijd nieuw zand; het gaat om verlies van gezonde bodem en begroeiing.",
  },
  {
    id: "toxic-chemicals-year",
    category: "environment",
    label: "Giftige stoffen in het milieu",
    baseValue: 5_550_263,
    ratePerSecond: yearRate(5_550_263),
    reset: "year",
    unit: "ton",
    direction: "up",
    explanation:
      "Een schatting van schadelijke chemische stoffen die dit jaar in het milieu terechtkomen.",
    context:
      "De schade hangt sterk af van het soort stof, de hoeveelheid en waar die vrijkomt.",
  },
  {
    id: "undernourished-people",
    category: "food",
    label: "Mensen met te weinig voedsel",
    baseValue: 899_069_146,
    ratePerSecond: 0.330743,
    reset: "never",
    unit: "mensen",
    direction: "up",
    explanation:
      "Een schatting van mensen die langere tijd niet genoeg energie uit voedsel krijgen.",
    context:
      "Dit gaat niet om een dag zonder maaltijd, maar om aanhoudende voedselonzekerheid.",
  },
  {
    id: "overweight-people",
    category: "food",
    label: "Mensen met overgewicht",
    baseValue: 1_798_553_379,
    ratePerSecond: 0.578799,
    reset: "never",
    unit: "mensen",
    direction: "up",
    explanation:
      "Een modelschatting op basis van lengte en gewicht van volwassenen.",
    context:
      "Een lichaamsmaat vertelt niet het hele gezondheidsverhaal en mag nooit als oordeel over mensen worden gebruikt.",
  },
  {
    id: "obese-people",
    category: "food",
    label: "Mensen met ernstig overgewicht",
    baseValue: 918_891_163,
    ratePerSecond: 0.826856,
    reset: "never",
    unit: "mensen",
    direction: "up",
    explanation:
      "Een wereldwijde schatting volgens de gebruikelijke BMI-grens voor obesitas.",
    context:
      "BMI is een grove bevolkingsmaat en geen volledige diagnose voor één persoon.",
  },
  {
    id: "hunger-deaths-today",
    category: "food",
    label: "Overleden door honger vandaag",
    baseValue: 28_525,
    ratePerSecond: todayRate(28_525),
    reset: "day",
    unit: "mensen",
    direction: "up",
    explanation:
      "Een schatting van sterfte waarbij langdurig voedseltekort een belangrijke rol speelt.",
    context:
      "Doodsoorzaken overlappen vaak met ziekte en armoede; het exacte aantal is onzeker.",
  },
  {
    id: "obesity-cost-usa-today",
    category: "food",
    label: "Zorgkosten door obesitas in de VS vandaag",
    baseValue: 674_276_636,
    ratePerSecond: todayRate(674_276_636),
    reset: "day",
    unit: "Amerikaanse dollar",
    prefix: "$",
    direction: "up",
    explanation:
      "Een Amerikaanse schatting van medische kosten die samenhangen met obesitas.",
    context:
      "Dit cijfer gaat alleen over de Verenigde Staten en is niet één op één naar andere landen te vertalen.",
  },
  {
    id: "weight-loss-spend-usa-today",
    category: "food",
    label: "Uitgegeven aan afslanken in de VS vandaag",
    baseValue: 176_332_687,
    ratePerSecond: todayRate(176_332_687),
    reset: "day",
    unit: "Amerikaanse dollar",
    prefix: "$",
    direction: "up",
    explanation:
      "Een schatting van Amerikaanse uitgaven aan programma’s en producten voor gewichtsverlies.",
    context:
      "Het meet een markt, niet hoeveel behandelingen gezond of effectief zijn.",
  },
  {
    id: "water-used-year",
    category: "water",
    label: "Water gebruikt dit jaar",
    baseValue: 2_722_302_080,
    ratePerSecond: yearRate(2_722_302_080),
    reset: "year",
    unit: "miljoen liter",
    direction: "up",
    explanation:
      "Een schatting van het water dat huishoudens, landbouw en industrie dit jaar gebruiken.",
    context:
      "Een miljoen liter past ongeveer in vierhonderd olympische zwembadbanen van één meter diep.",
  },
  {
    id: "water-disease-deaths-year",
    category: "water",
    label: "Overleden door watergerelateerde ziekte",
    baseValue: 477_269,
    ratePerSecond: yearRate(477_269),
    reset: "year",
    unit: "mensen dit jaar",
    direction: "up",
    explanation:
      "Een schatting van sterfte door ziekten die samenhangen met onveilig water en slechte sanitatie.",
    context:
      "Veel van deze sterfte is te voorkomen met schoon water, toiletten en eenvoudige gezondheidszorg.",
  },
  {
    id: "unsafe-water-people",
    category: "water",
    label: "Zonder veilige drinkwaterbron",
    baseValue: 744_088_381,
    ratePerSecond: -0.248057,
    reset: "never",
    unit: "mensen",
    direction: "down",
    explanation:
      "Een schatting van mensen zonder betrouwbare toegang tot veilig drinkwater.",
    context:
      "De langzame daling is vooruitgang, maar nog altijd gaat het om honderden miljoenen mensen.",
  },
  {
    id: "energy-used-today",
    category: "energy",
    label: "Energie gebruikt vandaag",
    baseValue: 412_511_222,
    ratePerSecond: todayRate(412_511_222),
    reset: "day",
    unit: "MWh",
    direction: "up",
    explanation:
      "Een schatting van al het wereldwijde energiegebruik sinds middernacht.",
    context:
      "Eén megawattuur is ongeveer wat een Nederlands huishouden in enkele maanden aan stroom gebruikt.",
  },
  {
    id: "nonrenewable-energy-today",
    category: "energy",
    label: "Uit niet-hernieuwbare bronnen",
    baseValue: 364_149_549,
    ratePerSecond: todayRate(364_149_549),
    reset: "day",
    unit: "MWh",
    direction: "up",
    explanation:
      "Het deel van het energiegebruik dat vandaag uit olie, gas, kolen en andere eindige bronnen komt.",
    context: "Dit is nog steeds het grootste deel van de mondiale energiemix.",
  },
  {
    id: "renewable-energy-today",
    category: "energy",
    label: "Uit hernieuwbare bronnen",
    baseValue: 48_361_673,
    ratePerSecond: todayRate(48_361_673),
    reset: "day",
    unit: "MWh",
    direction: "up",
    explanation:
      "Het geschatte energiegebruik uit zon, wind, waterkracht en andere hernieuwbare bronnen vandaag.",
    context:
      "Hernieuwbaar groeit snel, maar begint wereldwijd nog vanaf een veel kleiner aandeel.",
  },
  {
    id: "solar-energy-today",
    category: "energy",
    label: "Zonne-energie die de aarde bereikt",
    baseValue: 2_727_997_064_848,
    ratePerSecond: todayRate(2_727_997_064_848),
    reset: "day",
    unit: "MWh",
    direction: "up",
    explanation:
      "De hoeveelheid energie uit zonlicht die vandaag op de aarde valt.",
    context:
      "Slechts een klein deel kan technisch en praktisch worden omgezet in bruikbare elektriciteit.",
  },
  {
    id: "oil-pumped-today",
    category: "energy",
    label: "Ruwe olie opgepompt vandaag",
    baseValue: 71_511_745,
    ratePerSecond: todayRate(71_511_745),
    reset: "day",
    unit: "vaten",
    direction: "up",
    explanation:
      "Een schatting van de hoeveelheid ruwe olie die vandaag uit de grond wordt gehaald.",
    context:
      "Eén vat is 159 liter. De productie loopt in werkelijkheid niet overal gelijkmatig.",
  },
  {
    id: "oil-left",
    category: "energy",
    label: "Bewezen olievoorraad",
    baseValue: 1_747_618_168_588,
    ratePerSecond: -976.765338,
    reset: "never",
    unit: "vaten",
    direction: "down",
    explanation:
      "Een schatting van olie die met huidige kennis en prijzen winbaar wordt geacht.",
    context:
      "Nieuwe vondsten, techniek en prijzen kunnen deze voorraad juist groter of kleiner maken.",
  },
  {
    id: "oil-days-left",
    category: "energy",
    label: "Oliejaren bij huidig gebruik",
    baseValue: 20_717,
    ratePerSecond: 0,
    reset: "never",
    unit: "dagen, ongeveer 57 jaar",
    direction: "still",
    explanation:
      "Voorraad gedeeld door het huidige productietempo levert ongeveer 57 jaar op.",
    context:
      "Dit is een scenario, geen voorspelde datum waarop olie plotseling op is.",
  },
  {
    id: "gas-left",
    category: "energy",
    label: "Bewezen aardgasvoorraad",
    baseValue: 207_018_866_886_289,
    ratePerSecond: -133_829.336861,
    reset: "never",
    unit: "m³",
    direction: "down",
    explanation:
      "Een schatting van aardgas dat met huidige kennis en omstandigheden winbaar is.",
    context:
      "Voorraadcijfers veranderen door nieuwe velden, techniek, prijzen en politieke keuzes.",
  },
  {
    id: "gas-days-left",
    category: "energy",
    label: "Gasjaren bij huidig gebruik",
    baseValue: 17_913,
    ratePerSecond: 0,
    reset: "never",
    unit: "dagen, ongeveer 49 jaar",
    direction: "still",
    explanation:
      "Voorraad gedeeld door het huidige productietempo komt uit op ongeveer 49 jaar.",
    context:
      "Minder verbruik verlengt die periode; meer verbruik verkort haar.",
  },
  {
    id: "coal-left",
    category: "energy",
    label: "Bewezen steenkoolvoorraad",
    baseValue: 1_143_518_113_082,
    ratePerSecond: -275.921945,
    reset: "never",
    unit: "ton",
    direction: "down",
    explanation:
      "Een schatting van steenkool die onder huidige omstandigheden winbaar is.",
    context:
      "Dat iets winbaar is, betekent niet dat verbranding klimaatveilig of economisch verstandig is.",
  },
  {
    id: "coal-days-left",
    category: "energy",
    label: "Kolenjaren bij huidig gebruik",
    baseValue: 47_983,
    ratePerSecond: 0,
    reset: "never",
    unit: "dagen, ongeveer 131 jaar",
    direction: "still",
    explanation:
      "Voorraad gedeeld door het huidige productietempo geeft ongeveer 131 jaar.",
    context:
      "Klimaatbeleid kan het gebruik veel eerder doen dalen dan de voorraad opraakt.",
  },
  {
    id: "infectious-deaths-year",
    category: "health",
    label: "Overleden aan besmettelijke ziekten",
    baseValue: 7_357_450,
    ratePerSecond: yearRate(7_357_450),
    reset: "year",
    unit: "mensen dit jaar",
    direction: "up",
    explanation:
      "Een schatting van sterfte door ziekten die van mens, dier of omgeving kunnen worden overgedragen.",
    context:
      "De categorie omvat veel verschillende ziekten en de registratie is niet overal even volledig.",
  },
  {
    id: "flu-deaths-year",
    category: "health",
    label: "Overleden aan seizoensgriep",
    baseValue: 294_598,
    ratePerSecond: yearRate(294_598),
    reset: "year",
    unit: "mensen dit jaar",
    direction: "up",
    explanation: "Een schatting van wereldwijde sterfte door seizoensgriep.",
    context:
      "Griep wordt niet altijd getest of als hoofddoodsoorzaak geregistreerd.",
  },
  {
    id: "under-five-deaths-year",
    category: "health",
    label: "Kinderen overleden vóór hun vijfde",
    baseValue: 4_307_934,
    ratePerSecond: yearRate(4_307_934),
    reset: "year",
    unit: "kinderen dit jaar",
    direction: "up",
    explanation:
      "Een schatting van kinderen die dit jaar voor hun vijfde verjaardag overlijden.",
    context:
      "Veel sterfte hangt samen met geboortezorg, infecties, voeding en toegang tot eenvoudige behandeling.",
  },
  {
    id: "abortions-year",
    category: "health",
    label: "Abortussen dit jaar",
    baseValue: 25_832_753,
    ratePerSecond: yearRate(25_832_753),
    reset: "year",
    unit: "ingrepen",
    direction: "up",
    explanation:
      "Een wereldwijde schatting op basis van gezondheidsdata en onderzoeken.",
    context:
      "Registratie, wetgeving en toegang verschillen sterk. Lees dit cijfer daarom als een brede raming.",
  },
  {
    id: "maternal-deaths-year",
    category: "health",
    label: "Moeders overleden rond zwangerschap",
    baseValue: 175_177,
    ratePerSecond: yearRate(175_177),
    reset: "year",
    unit: "mensen dit jaar",
    direction: "up",
    explanation:
      "Een schatting van sterfte tijdens zwangerschap, bevalling of kort daarna.",
    context:
      "Goede verloskundige zorg en snelle behandeling kunnen veel van deze sterfte voorkomen.",
  },
  {
    id: "hiv-people",
    category: "health",
    label: "Mensen die leven met hiv",
    baseValue: 47_500_826,
    ratePerSecond: 0,
    reset: "never",
    unit: "mensen",
    direction: "still",
    explanation:
      "Een wereldwijde schatting van mensen die met het hiv-virus leven.",
    context:
      "Behandeling kan mensen lang en gezond laten leven en overdracht sterk verminderen.",
  },
  {
    id: "hiv-deaths-year",
    category: "health",
    label: "Overleden door hiv/aids",
    baseValue: 952_751,
    ratePerSecond: yearRate(952_751),
    reset: "year",
    unit: "mensen dit jaar",
    direction: "up",
    explanation:
      "Een schatting van sterfte door aandoeningen die samenhangen met hiv en aids.",
    context:
      "Toegang tot testen en medicijnen bepaalt sterk hoeveel mensen overlijden.",
  },
  {
    id: "cancer-deaths-year",
    category: "health",
    label: "Overleden aan kanker",
    baseValue: 4_654_713,
    ratePerSecond: yearRate(4_654_713),
    reset: "year",
    unit: "mensen dit jaar",
    direction: "up",
    explanation:
      "Een schatting van wereldwijde sterfte door alle vormen van kanker samen.",
    context:
      "Kanker is geen enkele ziekte. Kans op diagnose en behandeling verschilt sterk per land.",
  },
  {
    id: "malaria-deaths-year",
    category: "health",
    label: "Overleden aan malaria",
    baseValue: 223_494,
    ratePerSecond: yearRate(223_494),
    reset: "year",
    unit: "mensen dit jaar",
    direction: "up",
    explanation: "Een schatting van sterfte door malaria sinds 1 januari.",
    context:
      "Muskietennetten, snelle tests, medicijnen en bestrijding van muggen voorkomen veel sterfte.",
  },
  {
    id: "cigarettes-today",
    category: "health",
    label: "Sigaretten gerookt vandaag",
    baseValue: 14_119_003_284,
    ratePerSecond: todayRate(14_119_003_284),
    reset: "day",
    unit: "sigaretten",
    direction: "up",
    explanation:
      "Een schatting van het aantal sigaretten dat wereldwijd sinds middernacht is gerookt.",
    context:
      "De teller maakt zichtbaar hoe groot de markt en de dagelijkse blootstelling zijn.",
  },
  {
    id: "smoking-deaths-year",
    category: "health",
    label: "Overleden door roken",
    baseValue: 2_833_226,
    ratePerSecond: yearRate(2_833_226),
    reset: "year",
    unit: "mensen dit jaar",
    direction: "up",
    explanation:
      "Een schatting van sterfte door ziekten die aan tabaksgebruik worden toegeschreven.",
    context:
      "De gevolgen ontstaan vaak pas jaren na het roken en worden statistisch toegerekend.",
  },
  {
    id: "alcohol-deaths-year",
    category: "health",
    label: "Overleden door alcohol",
    baseValue: 1_417_507,
    ratePerSecond: yearRate(1_417_507),
    reset: "year",
    unit: "mensen dit jaar",
    direction: "up",
    explanation:
      "Een schatting van sterfte door ziekte, vergiftiging en ongevallen waarbij alcohol een rol speelt.",
    context: "Omdat oorzaken overlappen, blijft het exacte aantal onzeker.",
  },
  {
    id: "suicides-year",
    category: "health",
    label: "Mensen overleden door zelfdoding",
    baseValue: 607_758,
    ratePerSecond: yearRate(607_758),
    reset: "year",
    unit: "mensen dit jaar",
    direction: "up",
    explanation:
      "Een gevoelige wereldwijde schatting op basis van geregistreerde doodsoorzaken.",
    context:
      "Registratie is niet overal volledig. Achter ieder cijfer staat een persoon en een omgeving.",
  },
  {
    id: "illegal-drugs-spend-year",
    category: "health",
    label: "Uitgegeven aan illegale drugs",
    baseValue: 226_729_591_649,
    ratePerSecond: yearRate(226_729_591_649),
    reset: "year",
    unit: "Amerikaanse dollar",
    prefix: "$",
    direction: "up",
    explanation:
      "Een grove schatting van de wereldwijde illegale drugsmarkt dit jaar.",
    context:
      "Illegale markten zijn per definitie moeilijk te meten; dit cijfer heeft een ruime onzekerheidsmarge.",
  },
  {
    id: "traffic-deaths-year",
    category: "health",
    label: "Overleden in het verkeer",
    baseValue: 765_060,
    ratePerSecond: yearRate(765_060),
    reset: "year",
    unit: "mensen dit jaar",
    direction: "up",
    explanation: "Een schatting van het aantal verkeersdoden sinds 1 januari.",
    context:
      "Veilige wegen, lagere snelheid, gordels, helmen en snelle hulp kunnen veel sterfte voorkomen.",
  },
];

export const worldometerCounterById = Object.fromEntries(
  worldometerCounters.map((counter) => [counter.id, counter]),
) as Record<string, WorldometerCounter>;

export const worldometerCategoryById = Object.fromEntries(
  worldometerCategories.map((category) => [category.id, category]),
) as Record<WorldometerCategoryId, WorldometerCategory>;

export const worldometerCountersByCategory = Object.fromEntries(
  worldometerCategories.map((category) => [
    category.id,
    worldometerCounters.filter((counter) => counter.category === category.id),
  ]),
) as Record<WorldometerCategoryId, WorldometerCounter[]>;
