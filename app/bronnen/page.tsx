import type { Metadata } from "next";
import { indicators, sourceById, sources } from "@/data/world-data";
import { mediaAssets } from "@/data/site-media";
import { MediaStage } from "../components/MediaStage";
import { WorldometerCounterWall } from "../components/WorldometerCounters";

export const metadata: Metadata = {
  title: "Bronnen & methode",
  description:
    "Datasetregister, definities, peildata, updatefrequenties en beperkingen van World Pulse.",
};

const statusLabels = {
  observed: "gerapporteerd",
  modeled: "beste schatting",
  projected: "verwachting",
  derived: "berekend",
} as const;

export default function SourcesPage() {
  return (
    <main className="method-page" id="main">
      <section className="method-hero method-hero--media">
        <div>
          <p className="eyebrow">SOURCES / METHODOLOGY / LIMITS</p>
          <h1>
            Een teller zonder uitleg is maar een <em>knipperend getal</em>.
          </h1>
          <p>
            We nemen de zichtbare startwaarden en snelheden van Worldometer als
            referentie. Daarna leggen we bij iedere teller uit wat er echt wordt
            geschat, wanneer hij opnieuw begint en waarom het nooit een perfecte
            meting is.
          </p>
        </div>
        <MediaStage asset={mediaAssets.sources} priority />
      </section>

      <section className="method-principles section-wrap">
        <article>
          <span>01</span>
          <div
            className="principle-mark principle-mark--date"
            aria-hidden="true"
          >
            <i />
            <i />
            <i />
          </div>
          <h2>Eerst: uit welk jaar komt het?</h2>
          <p>
            Een cijfer kan vandaag op het scherm staan en toch uit een onderzoek
            van jaren geleden komen. Daarom tonen we altijd de periode.
          </p>
        </article>
        <article>
          <span>02</span>
          <div
            className="principle-mark principle-mark--status"
            aria-hidden="true"
          >
            <i />
            <i />
            <i />
          </div>
          <h2>Daarna: is het gemeten of berekend?</h2>
          <p>
            Sommige cijfers komen uit registraties, andere uit modellen. We
            noemen dat verschil in gewone woorden bij ieder getal.
          </p>
        </article>
        <article>
          <span>03</span>
          <div
            className="principle-mark principle-mark--pulse"
            aria-hidden="true"
          >
            <i />
            <i />
            <i />
          </div>
          <h2>Tot slot: beweging is een rekensom</h2>
          <p>
            Een jaartotaal kan over seconden worden verdeeld. Zo voel je de
            schaal, maar er ontstaat geen nieuwe informatie.
          </p>
        </article>
      </section>

      <div className="section-wrap counter-wrap">
        <WorldometerCounterWall
          compact
          heading="Zo ziet een eerlijke lopende teller eruit."
          intro="De cijfers bewegen, de uitleg blijft ernaast staan. Deze selectie toont één voorbeeld uit ieder thema."
          limitPerCategory={1}
        />
      </div>

      <section className="section-wrap">
        <div className="section-heading">
          <p className="eyebrow">Waar komen de cijfers vandaan?</p>
          <h2>Open de bron en controleer ons.</h2>
        </div>
        <div className="dataset-list">
          {sources.map((source, index) => (
            <article key={source.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div className="dataset-signal" aria-hidden="true">
                {Array.from({ length: 5 }, (_, signalIndex) => (
                  <i key={signalIndex} />
                ))}
              </div>
              <div>
                <p>{source.publisher}</p>
                <h3>{source.name}</h3>
                <small>Geraadpleegd {source.retrieved}</small>
              </div>
              <p>{source.note}</p>
              <a href={source.url} target="_blank" rel="noreferrer">
                Open bron ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap indicator-register">
        <div className="section-heading">
          <p className="eyebrow">De kleine letters, leesbaar gemaakt</p>
          <h2>Wat tellen we precies?</h2>
        </div>
        <div
          className="table-scroll"
          role="region"
          aria-label="Indicatorregister"
          tabIndex={0}
        >
          <div className="table-scan" aria-hidden="true" />
          <table>
            <thead>
              <tr>
                <th>Indicator</th>
                <th>Waarde</th>
                <th>Periode</th>
                <th>Status</th>
                <th>Update</th>
                <th>Bron</th>
              </tr>
            </thead>
            <tbody>
              {indicators.map((indicator) => (
                <tr key={indicator.id}>
                  <th>{indicator.label}</th>
                  <td>{indicator.display}</td>
                  <td>{indicator.period}</td>
                  <td>{statusLabels[indicator.status]}</td>
                  <td>{indicator.cadence}</td>
                  <td>
                    <a
                      href={sourceById[indicator.sourceId].url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {sourceById[indicator.sourceId].publisher} ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="limitations section-wrap">
        <div>
          <p className="eyebrow">Leeswijzer</p>
          <h2>Vijf dingen om te onthouden.</h2>
          <ul>
            <li>Niemand leeft precies zoals het wereldgemiddelde.</li>
            <li>Landen tellen niet alles op precies dezelfde manier.</li>
            <li>Een verwachting is geen zekere toekomst.</li>
            <li>
              Meer productie betekent niet automatisch dat iedereen meer krijgt.
            </li>
            <li>
              Veel cijfers achter de komma maken een schatting niet
              betrouwbaarder.
            </li>
          </ul>
        </div>
        <MediaStage asset={mediaAssets.world} imageOnly />
      </section>
    </main>
  );
}
