# Research and data strategy

Research date: 26 July 2026.

## Worldometer as starting point

Worldometer groups its public homepage counters around population, government
and economics, society and media, environment, food, water, energy and health.
World Pulse now mirrors all 63 visible homepage meters as a dated reference
snapshot instead of using only the taxonomy.

The snapshot was captured on 26 July 2026 at 20:20:43 UTC. A second visible DOM
reading 12.094 seconds later was used to calculate movement only for counters
that changed. Daily and yearly counters keep their own reset boundary. Static
facts remain static. Worldometer is cited on every counter and its own source
register remains linked from the interface.

This is not an undocumented claim of measured real-time telemetry. Worldometer
itself describes several headline clocks as estimates or projections based on
sources such as the UN, World Bank, WHO, FAO and national statistical systems.
World Pulse therefore calls them running estimates and keeps the capture time
visible.

## Worldometer counter inventory

| Category               | Counters |
| ---------------------- | -------: |
| Population             |        7 |
| Government and economy |        6 |
| Society and media      |       10 |
| Environment            |        5 |
| Food                   |        6 |
| Water                  |        3 |
| Energy                 |       11 |
| Health                 |       15 |
| **Total**              |   **63** |

## Preferred sources

| Domain                  | Preferred source                                           | Why                                                                                       |
| ----------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Population              | UN World Population Prospects 2024                         | Official estimates and projections through 2100, with methodology.                        |
| Population presentation | Worldometer                                                | Clear derivative presentation; used only when the UN-derived value and date are explicit. |
| Water access            | WHO/UNICEF JMP 2025                                        | Official household water, sanitation and hygiene progress series through 2024.            |
| Water withdrawals       | FAO AQUASTAT / UN-Water                                    | Sector definitions, country reporting and methodological caveats.                         |
| Food                    | FAOSTAT                                                    | Public agricultural production series for 245+ countries and territories.                 |
| Energy                  | IEA Global Energy Review 2026 and Tracking SDG 7           | Current energy-system estimates and access indicators.                                    |
| Carbon                  | Global Carbon Budget 2024                                  | Transparent annual fossil and land-use CO₂ budget.                                        |
| Health                  | WHO Global Health Estimates / World Health Statistics 2024 | Comparable health estimates with uncertainty and definitions.                             |

## Included snapshot facts

- Modeled 2026 population: 8.3007 billion; annual net change about 69.1 million.
  Worldometer presentation based on UN WPP 2024.
- Urban population share: 58.5% in 2026, same derivative source.
- Population is projected by the UN to peak near 10.3 billion in the
  mid-2080s.
- Fossil CO₂ emissions: 37.4 Gt in 2024; total including land-use change:
  41.6 Gt. Global Carbon Budget 2024.
- Global cereal production: 3.1 Gt in 2024. FAOSTAT release.
- Agriculture accounts for roughly 69% of global withdrawals in AQUASTAT's
  long-run overview; newer UN-Water summaries cite 72%. The site labels the
  source/version rather than blending these values.
- About four billion people experience severe water scarcity during at least
  one month of the year. UN-Water cites the underlying 2016 study.
- Global electricity access was about 92% in 2024; roughly 655 million people
  remained without access. Tracking SDG 7, 2026 release.
- WHO's latest comparable global life-expectancy series currently displayed in
  this site uses 71.4 years for 2021; it should not be misread as a 2026
  observation.

## Update policy

The MVP is a source-verified static snapshot. Updates are deliberate:

1. replace values only after checking the primary release;
2. capture the Worldometer homepage and update its reference timestamp;
3. preserve the previous snapshot in version control;
4. review observed counter rates separately from headline totals;
5. never silently relabel projections as observations.

## Limitations

- Global aggregates hide country and regional inequality.
- Several sources publish on different schedules.
- Health and access statistics are modeled from incomplete national reporting.
- “Current” population is a continuously interpolated estimate, not a census.
- Cross-source totals can differ because definitions and revisions differ.

## Primary links

- https://www.un.org/development/desa/pd/world-population-prospects-2024
- https://www.worldometers.info/
- https://www.worldometers.info/sources/
- https://www.worldometers.info/population/
- https://washdata.org/reports/jmp-2025-wash-households
- https://www.fao.org/aquastat/en/overview/methodology/water-use/
- https://www.fao.org/statistics/highlights-archive/highlights-detail/agricultural-production-statistics-2010-2024/en
- https://www.iea.org/reports/global-energy-review-2026
- https://globalcarbonbudget.org/gcb-2024/
- https://www.who.int/publications/b/74273
