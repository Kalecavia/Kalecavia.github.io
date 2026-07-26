export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <a className="brand footer-brand" href="/">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>WORLD PULSE</span>
        </a>
        <p>63 lopende tellers, uitgelegd in gewone taal.</p>
      </div>
      <div className="footer-links">
        <a href="/wereldmeters">Alle wereldtellers</a>
        <a href="/bronnen">Bronnen & methode</a>
        <a href="/over-de-site">Over de site</a>
        <a href="#top">Terug naar boven ↑</a>
      </div>
      <p className="footer-meta">
        Lopende rekensommen op basis van actuele bronwaarden. Geen analytics,
        accounts of advertentietracking.
      </p>
    </footer>
  );
}
