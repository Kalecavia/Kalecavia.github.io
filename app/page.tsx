import type { Metadata } from "next";
import { LivePopulation } from "./components/LivePopulation";
import { MediaStage } from "./components/MediaStage";
import { WorldScene } from "./components/WorldScene";
import {
  WorldometerCounterWall,
  WorldometerTickerRail,
} from "./components/WorldometerCounters";
import { indicatorById } from "@/data/world-data";
import { mediaAssets } from "@/data/site-media";

export const metadata: Metadata = {
  title: "World Pulse — De realtime-achtige polsslag van de planeet",
  description:
    "Een cinematografische 3D-datareis door bevolking, water, voedsel, energie, uitstoot en gezondheid.",
};

const populationGrowth = indicatorById["population-growth"];
const urbanShare = indicatorById["urban-share"];
const cereal = indicatorById["cereal-production"];
const water = indicatorById["water-scarcity"];
const emissions = indicatorById["total-co2"];
const electricity = indicatorById["electricity-access"];
const life = indicatorById["life-expectancy"];
const healthyLife = indicatorById["healthy-life"];

export default function Home() {
  return (
    <main className="home-shell" id="main">
      <WorldScene />

      <div className="home-narrative">
        <section className="story-chapter hero-chapter" id="world-pulse">
          <div className="chapter-copy hero-copy">
            <p className="eyebrow">WORLD PULSE / PLANETARY SYSTEMS 2026</p>
            <h1>
              De wereld telt.
              <br />
              <em>Wij maken het systeem zichtbaar.</em>
            </h1>
            <p className="hero-intro">
              Bevolking groeit. Water stroomt. Energie beweegt. Uitstoot stapelt
              zich op. Hier zie je de wereld niet als rapport, maar als iets dat
              zichtbaar blijft doortellen.
            </p>
            <LivePopulation />
            <div className="hero-actions">
              <a className="primary-button" href="#time-never-stops">
                Start de reis <span>↓</span>
              </a>
              <a className="text-link" href="/wereldmeters">
                Open 63 lopende tellers ↗
              </a>
            </div>
          </div>
          <MediaStage
            asset={mediaAssets.world}
            className="home-hero-media"
            priority
          />
          <div className="hero-aside" aria-hidden="true">
            <span>LAT 52.1° N</span>
            <span>LONG 4.5° E</span>
            <span>FRAME 001 / 007</span>
          </div>
        </section>

        <WorldometerTickerRail />

        <section className="home-counter-section">
          <WorldometerCounterWall
            compact
            heading="De belangrijkste wereldtellers bewegen nu mee."
            intro="Een snelle selectie uit alle acht thema’s. Op de volledige meterspagina staan alle 63 tellers met uitleg."
            limitPerCategory={2}
          />
          <a className="meters-cta" href="/wereldmeters">
            <span>63 lopende tellers</span>
            <strong>Open het volledige wereldbeeld</strong>
            <i>→</i>
          </a>
        </section>

        <section className="story-chapter split-chapter" id="time-never-stops">
          <div className="chapter-number">01 / TIME</div>
          <div className="chapter-copy">
            <p className="eyebrow">Time never stops</p>
            <h2>
              De wereld wacht niet op een <em>nieuw rapport</em>.
            </h2>
            <p>
              Grote onderzoeken verschijnen vaak één keer per jaar. Toch gaan
              geboortes, energiegebruik en uitstoot iedere seconde door. Daarom
              laten we het gemiddelde tempo ertussen zien.
            </p>
            <div className="inline-stats">
              <article>
                <strong>{populationGrowth.display}</strong>
                <span>{populationGrowth.unit}</span>
              </article>
              <article>
                <strong>{emissions.display}</strong>
                <span>{emissions.unit}</span>
              </article>
            </div>
            <p className="data-note">
              Simpel gezegd: een betrouwbare startwaarde plus een gemiddelde
              snelheid. Geen sensor die ieder mens of iedere ton rechtstreeks
              ziet.
            </p>
          </div>
          <MediaStage
            asset={mediaAssets.sources}
            className="story-media story-media--time"
            imageOnly
          />
        </section>

        <section className="story-chapter offset-chapter" id="people">
          <div className="chapter-number">02 / PEOPLE</div>
          <div className="chapter-copy">
            <p className="eyebrow">Menselijke dichtheid</p>
            <h2>
              Miljarden levens.
              <br />
              <em>Ongelijk verdeeld.</em>
            </h2>
            <p>
              Er komen nog steeds mensen bij, maar langzamer dan vroeger.
              Sommige landen groeien snel, andere worden ouder en kleiner. Eén
              wereldtotaal laat die verschillen niet zien.
            </p>
            <div className="focus-stat">
              <span>{urbanShare.label}</span>
              <strong>{urbanShare.display}</strong>
              <small>{urbanShare.period}</small>
            </div>
            <a className="chapter-link" href="/bevolking">
              Open bevolkingsdata <span>→</span>
            </a>
          </div>
          <MediaStage
            asset={mediaAssets.population}
            className="story-media story-media--people"
          />
        </section>

        <section className="story-chapter split-chapter" id="resources">
          <div className="chapter-number">03 / RESOURCES</div>
          <div className="chapter-copy">
            <p className="eyebrow">Voedsel, water, energie</p>
            <h2>
              Hulpbronnen volgen geen <em>landsgrenzen</em>.
            </h2>
            <p>
              Zonder water geen oogst. Zonder energie geen pomp, koeling of
              transport. Er is wereldwijd veel voedsel en water, maar niet
              iedereen kan er veilig en betaalbaar bij.
            </p>
            <div className="inline-stats three">
              <article>
                <strong>{cereal.display}</strong>
                <span>graan geproduceerd in 2024</span>
              </article>
              <article>
                <strong>{water.display}</strong>
                <span>mensen met seizoensschaarste</span>
              </article>
              <article>
                <strong>{electricity.display}</strong>
                <span>toegang tot elektriciteit</span>
              </article>
            </div>
            <a className="chapter-link" href="/voedsel-en-water">
              Volg de hulpbronnenstroom <span>→</span>
            </a>
          </div>
          <MediaStage
            asset={mediaAssets.foodWater}
            className="story-media story-media--resources"
          />
        </section>

        <section className="story-chapter pressure-chapter" id="pressure">
          <div className="chapter-number">04 / PRESSURE</div>
          <div className="chapter-copy">
            <p className="eyebrow">Planetary pressure</p>
            <h2>
              Wat we uitstoten verdwijnt niet wanneer de teller <em>reset</em>.
            </h2>
            <p>
              Een jaarteller springt op 1 januari terug naar nul. De CO₂ in de
              lucht doet dat niet. Schone energie groeit, maar olie, gas en
              kolen leveren nog steeds het grootste deel.
            </p>
            <div className="pressure-value">
              <span>{emissions.period}</span>
              <strong>{emissions.display}</strong>
              <small>{emissions.unit}</small>
            </div>
            <a className="chapter-link" href="/energie-en-uitstoot">
              Bekijk energie en uitstoot <span>→</span>
            </a>
          </div>
          <MediaStage
            asset={mediaAssets.energy}
            className="story-media story-media--pressure"
          />
        </section>

        <section
          className="story-chapter offset-chapter human-chapter"
          id="human"
        >
          <div className="chapter-number">05 / HUMAN</div>
          <div className="chapter-copy">
            <p className="eyebrow">Human reality</p>
            <h2>
              Achter ieder wereldgemiddelde zit een <em>afstand</em>.
            </h2>
            <p>
              Schoon water, elektriciteit en goede zorg lijken vanzelfsprekend
              tot ze ontbreken. Een wereldgemiddelde vertelt daarom nooit hoe
              het leven van één gezin eruitziet.
            </p>
            <div className="life-pair">
              <article>
                <strong>{life.display}</strong>
                <span>{life.label}</span>
              </article>
              <i aria-hidden="true" />
              <article>
                <strong>{healthyLife.display}</strong>
                <span>{healthyLife.label}</span>
              </article>
            </div>
            <a className="chapter-link" href="/gezondheid">
              Ga naar menselijke uitkomsten <span>→</span>
            </a>
          </div>
          <MediaStage
            asset={mediaAssets.health}
            className="story-media story-media--human"
          />
        </section>

        <section className="story-chapter final-chapter" id="system">
          <div className="chapter-copy">
            <p className="eyebrow">06 / UNDERSTAND THE SYSTEM</p>
            <h2>
              Geen cijfer is het verhaal.
              <br />
              <em>De relatie ertussen wel.</em>
            </h2>
            <p>
              Kijk naar de losse tellers, lees wat ze betekenen en verbind ze
              daarna met elkaar. De wereld is groter dan één score, maar ieder
              getal kan wel een deur naar het verhaal openen.
            </p>
            <div className="theme-links">
              <a href="/wereldmeters">
                <span>00</span>Live wereldmeters<i>↗</i>
              </a>
              <a href="/wereld">
                <span>01</span>Wereldbeeld<i>↗</i>
              </a>
              <a href="/bevolking">
                <span>02</span>Bevolking<i>↗</i>
              </a>
              <a href="/voedsel-en-water">
                <span>03</span>Voedsel & water<i>↗</i>
              </a>
              <a href="/energie-en-uitstoot">
                <span>04</span>Energie & uitstoot<i>↗</i>
              </a>
              <a href="/gezondheid">
                <span>05</span>Gezondheid<i>↗</i>
              </a>
              <a href="/bronnen">
                <span>06</span>Bronnen & methode<i>↗</i>
              </a>
            </div>
          </div>
          <MediaStage
            asset={mediaAssets.studio}
            className="story-media story-media--final"
            imageOnly
          />
        </section>
      </div>
    </main>
  );
}
