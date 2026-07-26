const navigation = [
  { href: "/wereldmeters", label: "Live meters" },
  { href: "/wereld", label: "Wereld" },
  { href: "/bevolking", label: "Bevolking" },
  { href: "/voedsel-en-water", label: "Voedsel & water" },
  { href: "/energie-en-uitstoot", label: "Energie & uitstoot" },
  { href: "/gezondheid", label: "Gezondheid" },
  { href: "/bronnen", label: "Bronnen" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="World Pulse — home">
        <span className="brand-mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>WORLD PULSE</span>
      </a>

      <nav className="desktop-nav" aria-label="Hoofdnavigatie">
        {navigation.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <details className="mobile-nav">
        <summary aria-label="Menu openen">
          <span />
          <span />
        </summary>
        <nav aria-label="Mobiele navigatie">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
          <a href="/over-de-site">Over de site</a>
        </nav>
      </details>
    </header>
  );
}
