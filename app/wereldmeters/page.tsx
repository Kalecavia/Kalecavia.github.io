import type { Metadata } from "next";
import { MediaStage } from "../components/MediaStage";
import {
  WorldometerCounterWall,
  WorldometerTickerRail,
} from "../components/WorldometerCounters";
import { mediaAssets } from "@/data/site-media";
import { sitePath } from "@/lib/site-path";

export const metadata: Metadata = {
  title: "63 lopende wereldtellers — World Pulse",
  description:
    "Bevolking, geld, media, milieu, voedsel, water, energie en gezondheid in 63 lopende tellers met uitleg in gewone taal.",
};

export default function WorldMetersPage() {
  return (
    <main className="meters-page" id="main">
      <section className="meters-hero">
        <div className="meters-hero__copy">
          <p className="eyebrow">WORLD PULSE / 63 WORLDOMETER-REFERENTIES</p>
          <h1>
            Zie de wereld <em>doorlopen.</em>
          </h1>
          <p>
            Van geboortes en energie tot zoekopdrachten en schoon water. Niet
            verstopt achter vaktaal, maar uitgelegd alsof je het aan een slimme
            vriend vertelt.
          </p>
          <div className="meters-hero__actions">
            <a className="primary-button" href="#alle-meters">
              Open alle tellers <span>↓</span>
            </a>
            <a className="text-link" href={sitePath("/bronnen")}>
              Hoe de rekensom werkt ↗
            </a>
          </div>
        </div>
        <MediaStage
          asset={mediaAssets.world}
          className="meters-hero__media"
          priority
        />
        <div className="meters-hero__score" aria-label="63 tellers, 8 thema's">
          <strong>63</strong>
          <span>lopende tellers</span>
          <i />
          <strong>08</strong>
          <span>wereldthema’s</span>
        </div>
      </section>

      <WorldometerTickerRail />

      <div className="section-wrap meters-wall-wrap" id="alle-meters">
        <WorldometerCounterWall showNavigation />
      </div>

      <section className="meters-explainer section-wrap">
        <div>
          <p className="eyebrow">In één minuut begrepen</p>
          <h2>Een lopend getal is nog geen live meting.</h2>
        </div>
        <div className="meters-explainer__steps">
          <article>
            <span>01</span>
            <h3>Er is een betrouwbare jaarschatting</h3>
            <p>
              Organisaties zoals de VN, WHO en Wereldbank verzamelen gegevens
              van landen. Dat kost tijd.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Worldometer maakt er een tempo van</h3>
            <p>
              Een jaartotaal wordt verdeeld over maanden, dagen en seconden.
              Daardoor zie je de schaal bewegen.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Wij tonen de uitleg naast het getal</h3>
            <p>
              Je ziet waar de teller vandaan komt, wanneer hij opnieuw begint en
              waarom het nooit een exacte hoofdentelling is.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
