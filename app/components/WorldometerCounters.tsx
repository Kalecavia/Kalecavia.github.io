"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  worldometerCategories,
  worldometerCounterById,
  worldometerCountersByCategory,
  worldometerReference,
  type WorldometerCategoryId,
  type WorldometerCounter,
} from "@/data/worldometer-data";

type WorldometerCounterWallProps = {
  categories?: WorldometerCategoryId[];
  compact?: boolean;
  heading?: string;
  intro?: string;
  limitPerCategory?: number;
  showNavigation?: boolean;
};

const railIds = [
  "current-population",
  "births-today",
  "emails-today",
  "co2-emissions-year",
  "water-used-year",
  "energy-used-today",
  "renewable-energy-today",
  "cigarettes-today",
  "traffic-deaths-year",
];

function secondsSinceLocalDayStart(now: number) {
  const date = new Date(now);
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.max(0, (now - start.getTime()) / 1000);
}

function secondsSinceLocalYearStart(now: number) {
  const date = new Date(now);
  const start = new Date(date.getFullYear(), 0, 1);
  return Math.max(0, (now - start.getTime()) / 1000);
}

function counterValue(counter: WorldometerCounter, now: number) {
  if (now === 0) return counter.baseValue;

  if (counter.reset === "day") {
    return counter.ratePerSecond * secondsSinceLocalDayStart(now);
  }

  if (counter.reset === "year") {
    return counter.ratePerSecond * secondsSinceLocalYearStart(now);
  }

  const elapsed = (now - Date.parse(worldometerReference.capturedAt)) / 1000;
  return Math.max(0, counter.baseValue + counter.ratePerSecond * elapsed);
}

function useWorldometerClock() {
  const [now, setNow] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const update = () => setNow(Date.now());
    update();
    const interval = window.setInterval(update, reducedMotion ? 1000 : 200);
    return () => window.clearInterval(interval);
  }, []);

  return now;
}

function formatCounter(counter: WorldometerCounter, value: number) {
  return `${counter.prefix ? `${counter.prefix} ` : ""}${new Intl.NumberFormat(
    "nl-NL",
    {
      minimumFractionDigits: counter.decimals ?? 0,
      maximumFractionDigits: counter.decimals ?? 0,
    },
  ).format(value)}`;
}

function CounterCard({
  compact,
  counter,
  now,
}: {
  compact: boolean;
  counter: WorldometerCounter;
  now: number;
}) {
  const value = counterValue(counter, now);
  const period =
    counter.reset === "day"
      ? "VANDAAG"
      : counter.reset === "year"
        ? "DIT JAAR"
        : counter.direction === "still"
          ? "REFERENTIE"
          : "LOOPT DOOR";

  return (
    <article
      className={`wm-card wm-card--${counter.category}${compact ? " wm-card--compact" : ""}`}
    >
      <div className="wm-card__status">
        <span className="wm-live-dot" aria-hidden="true" />
        <span>{period}</span>
        <i aria-hidden="true" />
      </div>
      <strong aria-live="off">{formatCounter(counter, value)}</strong>
      <h3>{counter.label}</h3>
      <span className="wm-card__unit">{counter.unit}</span>
      <p>{counter.explanation}</p>
      {!compact ? <p className="wm-card__context">{counter.context}</p> : null}
      <div className="wm-card__signal" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <i key={index} />
        ))}
      </div>
      <a
        className="wm-card__source"
        href={worldometerReference.sourceUrl}
        rel="noreferrer"
        target="_blank"
      >
        Worldometer-referentie <span>↗</span>
      </a>
    </article>
  );
}

export function WorldometerTickerRail() {
  const now = useWorldometerClock();
  const counters = railIds.map((id) => worldometerCounterById[id]);

  return (
    <section className="wm-rail" aria-label="Lopende wereldtellers">
      <div className="wm-rail__label">
        <span className="wm-live-dot" aria-hidden="true" />
        <strong>WORLD PULSE / NOW</strong>
        <small>9 van 63 lopende tellers</small>
      </div>
      <div className="wm-rail__viewport">
        <div className="wm-rail__track">
          {[...counters, ...counters].map((counter, index) => (
            <article
              aria-hidden={index >= counters.length}
              key={`${counter.id}-${index}`}
            >
              <span>{counter.label}</span>
              <strong>
                {formatCounter(counter, counterValue(counter, now))}
              </strong>
              <small>{counter.unit}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorldometerCounterWall({
  categories,
  compact = false,
  heading = "De wereld loopt door terwijl je kijkt.",
  intro = "63 tellers, gebaseerd op de actuele Worldometer-referentie. Klik niet weg van de uitleg: die vertelt wat het getal wél en niet betekent.",
  limitPerCategory,
  showNavigation = false,
}: WorldometerCounterWallProps) {
  const now = useWorldometerClock();
  const selectedCategories = useMemo(
    () =>
      worldometerCategories.filter(
        (category) => !categories || categories.includes(category.id),
      ),
    [categories],
  );

  return (
    <section className={`wm-wall${compact ? " wm-wall--compact" : ""}`}>
      <header className="wm-wall__header">
        <div>
          <p className="eyebrow">
            <span className="wm-live-dot" aria-hidden="true" />
            WORLDOMETER-REFERENTIE / LOPENDE REKENSOM
          </p>
          <h2>{heading}</h2>
        </div>
        <div className="wm-wall__intro">
          <p>{intro}</p>
          <a
            href={worldometerReference.sourceUrl}
            rel="noreferrer"
            target="_blank"
          >
            Bekijk Worldometer ↗
          </a>
        </div>
      </header>

      <div className="wm-proofline">
        <span>63 TELLERS IN HET VOLLEDIGE OVERZICHT</span>
        <span>STARTWAARDEN: {worldometerReference.capturedLocal}</span>
        <span>GEEN SENSOR — WEL EEN ACTUELE REKENSNELHEID</span>
      </div>

      {showNavigation ? (
        <nav className="wm-category-nav" aria-label="Telleronderwerpen">
          {selectedCategories.map((category, index) => (
            <a href={`#meters-${category.id}`} key={category.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {category.shortLabel}
            </a>
          ))}
        </nav>
      ) : null}

      <div className="wm-sections">
        {selectedCategories.map((category) => {
          const counters = limitPerCategory
            ? worldometerCountersByCategory[category.id].slice(
                0,
                limitPerCategory,
              )
            : worldometerCountersByCategory[category.id];

          return (
            <section
              className={`wm-category wm-category--${category.accent}`}
              id={`meters-${category.id}`}
              key={category.id}
            >
              <header>
                <div className="wm-category__orbit" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <p className="eyebrow">{category.label}</p>
                <h2
                  style={
                    {
                      "--wm-title-length": category.shortLabel.length,
                    } as CSSProperties
                  }
                >
                  {category.shortLabel}
                </h2>
                <p>{category.intro}</p>
                <span>
                  {counters.length} van{" "}
                  {worldometerCountersByCategory[category.id].length} tellers
                </span>
              </header>
              <div className="wm-grid">
                {counters.map((counter) => (
                  <CounterCard
                    compact={compact}
                    counter={counter}
                    key={counter.id}
                    now={now}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <footer className="wm-wall__footer">
        <p>
          <strong>Hoe werkt dit?</strong> De startwaarden zijn gecontroleerd bij
          Worldometer. Daarna loopt iedere teller verder met hetzelfde
          gemiddelde tempo. Dag- en jaartellers beginnen lokaal opnieuw.
        </p>
        <a
          href={worldometerReference.sourcesUrl}
          rel="noreferrer"
          target="_blank"
        >
          Open de bronnenlijst van Worldometer ↗
        </a>
      </footer>
    </section>
  );
}
