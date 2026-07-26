import { sourceById, type Indicator } from "@/data/world-data";

const statusLabels = {
  observed: "gerapporteerd",
  modeled: "beste schatting",
  projected: "verwachting",
  derived: "berekend",
} as const;

export function MetricCard({
  indicator,
  featured = false,
  visualIndex = 0,
}: {
  indicator: Indicator;
  featured?: boolean;
  visualIndex?: number;
}) {
  const source = sourceById[indicator.sourceId];
  const visualVariant = visualIndex % 6;

  return (
    <article
      className={`metric-card metric-card--visual-${visualVariant}${featured ? " metric-card-featured" : ""}`}
    >
      <div className="metric-meta">
        <span>{indicator.period}</span>
        <span>{statusLabels[indicator.status]}</span>
      </div>
      <div className="metric-signal" aria-hidden="true">
        <span className="metric-signal__axis" />
        {Array.from({ length: 10 }, (_, index) => (
          <i key={index} />
        ))}
      </div>
      <p className="metric-label">{indicator.label}</p>
      <p className="metric-value">{indicator.display}</p>
      <p className="metric-unit">{indicator.unit}</p>
      <p className="metric-description">{indicator.description}</p>
      <details className="metric-note">
        <summary>Wat moet je hierbij weten?</summary>
        <p>{indicator.caveat}</p>
        <p>Nieuwe cijfers: {indicator.cadence.toLocaleLowerCase("nl-NL")}.</p>
        <a href={source.url} target="_blank" rel="noreferrer">
          Bekijk de bron bij {source.publisher} ↗
        </a>
      </details>
    </article>
  );
}
