import type { Metadata } from "next";
import { mediaAssets } from "@/data/site-media";
import { MediaStage } from "../components/MediaStage";

export const metadata: Metadata = {
  title: "Over de site",
  description:
    "Waarom World Pulse bestaat en hoe design, data, 3D, performance en toegankelijkheid samenkomen.",
};

export default function AboutPage() {
  return (
    <main className="about-page" id="main">
      <section className="about-hero about-hero--media">
        <div>
          <p className="eyebrow">ABOUT / WORLD PULSE</p>
          <h1>
            Data als verhaal.
            <br />
            <em>Niet als decor.</em>
          </h1>
          <p>
            World Pulse bouwt voort op de lopende wereldtellers van Worldometer.
            We geven ze meer beeld, meer beweging en vooral uitleg die je niet
            eerst drie keer hoeft te lezen.
          </p>
        </div>
        <MediaStage asset={mediaAssets.studio} priority />
      </section>

      <section className="about-grid section-wrap">
        <article>
          <span>01 / DOEL</span>
          <div className="about-glyph about-glyph--system" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <h2>Grote getallen begrijpelijk maken</h2>
          <p>
            Acht miljard mensen of miljarden tonnen CO₂ zijn bijna niet voor te
            stellen. Beweging laat de snelheid voelen; gewone taal legt uit wat
            er werkelijk wordt geteld.
          </p>
        </article>
        <article>
          <span>02 / ONTWERP</span>
          <div className="about-glyph about-glyph--world" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <h2>Een wereld die blijft bewegen</h2>
          <p>
            De wereldbol, videolagen en 63 tellers lopen samen door. Zo voelt de
            site minder als een rapport en meer als een venster op wat er nu
            gebeurt.
          </p>
        </article>
        <article>
          <span>03 / TOEGANKELIJKHEID</span>
          <div className="about-glyph about-glyph--access" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <h2>Ook bruikbaar zonder effecten</h2>
          <p>
            Alle cijfers en uitleg staan ook gewoon in tekst. Met minder
            beweging, zonder 3D of alleen met een toetsenbord blijft alles
            leesbaar.
          </p>
        </article>
        <article>
          <span>04 / PRIVACY</span>
          <div className="about-glyph about-glyph--privacy" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <h2>Wij volgen jou niet</h2>
          <p>
            Geen account, advertentietracker of verborgen profiel. Alleen de
            tellers bewegen; jouw gedrag wordt niet gevolgd.
          </p>
        </article>
      </section>

      <section className="build-note build-note--media section-wrap">
        <MediaStage asset={mediaAssets.world} imageOnly />
        <div className="build-note__copy">
          <div>
            <p className="eyebrow">Techniek</p>
            <h2>Snel laden, rijk bewegen.</h2>
          </div>
          <p>
            Video’s laden pas vlak voordat je ze ziet en pauzeren buiten beeld.
            Op een tragere verbinding blijft een scherpe foto staan. Mobiel
            gebruikt bewust minder 3D-kracht.
          </p>
          <a className="primary-button" href="/wereldmeters">
            Open alle 63 tellers <span>→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
