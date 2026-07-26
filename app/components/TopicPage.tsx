import { indicatorById, sourceById, type Topic } from "@/data/world-data";
import type { WorldometerCategoryId } from "@/data/worldometer-data";
import { topicMedia } from "@/data/site-media";
import { sitePath } from "@/lib/site-path";
import { MediaStage } from "./MediaStage";
import { MetricCard } from "./MetricCard";
import { WorldometerCounterWall } from "./WorldometerCounters";

const counterCategoriesByTopic: Record<string, WorldometerCategoryId[]> = {
  wereld: [
    "population",
    "economy",
    "society",
    "environment",
    "food",
    "water",
    "energy",
    "health",
  ],
  bevolking: ["population"],
  "voedsel-en-water": ["food", "water"],
  "energie-en-uitstoot": ["environment", "energy"],
  gezondheid: ["health"],
};

export function TopicPage({ topic }: { topic: Topic }) {
  const metrics = topic.metricIds.map((id) => indicatorById[id]);
  const media = topicMedia[topic.slug as keyof typeof topicMedia];
  const usedSources = Array.from(
    new Set(metrics.map((metric) => metric.sourceId)),
  ).map((id) => sourceById[id]);

  return (
    <main className={`topic-page accent-${topic.accent}`} id="main">
      <section className="topic-hero topic-hero--media">
        <div className="topic-hero__copy">
          <div className="topic-orbit" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <p className="eyebrow">{topic.eyebrow}</p>
          <h1>{topic.title}</h1>
          <p className="topic-intro">{topic.intro}</p>
          <a className="text-link" href="#kerncijfers">
            Bekijk kerncijfers <span>↓</span>
          </a>
        </div>
        <MediaStage asset={media.hero} className="topic-hero__media" priority />
      </section>

      <div className="section-wrap counter-wrap">
        <WorldometerCounterWall
          categories={counterCategoriesByTopic[topic.slug]}
          compact
          heading={`Wat er nu doorloopt rond ${topic.title.toLocaleLowerCase("nl-NL")}`}
          intro="De cijfers starten bij de actuele Worldometer-referentie en lopen verder met dezelfde gemiddelde snelheid. Onder iedere teller staat in gewone taal wat je ziet."
          limitPerCategory={topic.slug === "wereld" ? 1 : undefined}
        />
      </div>

      <section className="section-wrap" id="kerncijfers">
        <div className="section-heading">
          <p className="eyebrow">Even uitzoomen</p>
          <h2>De cijfers die meer uitleg nodig hebben.</h2>
        </div>
        <div className="metric-grid">
          {metrics.map((metric, index) => (
            <MetricCard
              featured={index === 0}
              indicator={metric}
              key={metric.id}
              visualIndex={index}
            />
          ))}
        </div>
      </section>

      <section className="editorial-grid editorial-grid--media section-wrap">
        {topic.chapters.map((chapter, index) => (
          <article key={chapter.title}>
            <MediaStage
              asset={media.chapters[index]}
              className="chapter-media"
              imageOnly
            />
            <div className="chapter-body">
              <span className="chapter-index">0{index + 1}</span>
              <h2>{chapter.title}</h2>
              <p>{chapter.body}</p>
              <div
                aria-hidden="true"
                className={`chapter-diagram chapter-diagram--${index}`}
              >
                {Array.from({ length: 7 }, (_, signalIndex) => (
                  <i key={signalIndex} />
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="source-strip section-wrap">
        <div>
          <p className="eyebrow">Gebruikte datasets</p>
          <h2>Controleer het spoor.</h2>
          <div className="source-spectrum" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => (
              <i key={index} />
            ))}
          </div>
        </div>
        <div className="source-list">
          {usedSources.map((source, index) => (
            <a
              href={source.url}
              key={source.id}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                {String(index + 1).padStart(2, "0")} / {source.publisher}
              </span>
              {source.name}
              <i>↗</i>
            </a>
          ))}
        </div>
      </section>

      {topic.next ? (
        <a className="next-chapter" href={sitePath(topic.next.href)}>
          <span>Volgende laag</span>
          <strong>{topic.next.label}</strong>
          <i>→</i>
        </a>
      ) : null}
    </main>
  );
}
