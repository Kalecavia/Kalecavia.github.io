"use client";

import { useEffect, useMemo, useState } from "react";
import {
  worldometerCounterById,
  worldometerReference,
} from "@/data/worldometer-data";

const referenceDate = Date.parse(worldometerReference.capturedAt);
const population = worldometerCounterById["current-population"];

function estimatePopulation(now: number) {
  const elapsedSeconds = Math.max(0, (now - referenceDate) / 1000);
  return Math.round(
    population.baseValue + elapsedSeconds * population.ratePerSecond,
  );
}

export function LivePopulation() {
  const [value, setValue] = useState(population.baseValue);
  const formatter = useMemo(
    () => new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 }),
    [],
  );

  useEffect(() => {
    const update = () => setValue(estimatePopulation(Date.now()));
    update();
    const interval = window.setInterval(update, 250);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="live-population"
      aria-label={`Lopende schatting van de wereldbevolking: ongeveer ${formatter.format(value)} mensen`}
    >
      <span aria-hidden="true">{formatter.format(value)}</span>
      <small>
        WORLDOMETER-REFERENTIE · GEMIDDELD +2,23 PER SECONDE · LOPENDE SCHATTING
      </small>
    </div>
  );
}
