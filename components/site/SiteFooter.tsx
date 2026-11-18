import { products, shelf, site } from "@/lib/site-data";
import Arrow from "./Arrow";

export default function SiteFooter() {
  return (
    <footer className="footer" data-section data-nav="paper">
      <div className="footer__top grid">
        <p className="footer__brand">{site.handle}</p>

        <nav className="footer__col" aria-label="Apps">
          <p className="footer__heading t-medium">
            <span className="eyebrow__mark" aria-hidden="true" />
            {" apps"}
          </p>
          {products.map((app) => (
            <a
              className="footer__link"
              href={app.href}
              target="_blank"
              rel="noreferrer"
              key={app.id}
            >
              {app.name}
            </a>
          ))}
        </nav>

        <nav className="footer__col" aria-label="Shelf">
          <p className="footer__heading t-medium">
            <span className="eyebrow__mark" aria-hidden="true" />
            {" shelf"}
          </p>
          {shelf.slice(0, 5).map((item) => (
            <a
              className="footer__link"
              href={item.href}
              target="_blank"
              rel="noreferrer"
              key={item.name}
            >
              {item.name}
            </a>
          ))}
          <a className="footer__link" href="#shelf">
            all of them
          </a>
        </nav>

        <div className="footer__col">
          <p className="footer__heading t-medium">
            <span className="eyebrow__mark" aria-hidden="true" />
            {" elsewhere"}
          </p>
          <a className="footer__link" href={site.mailto}>
            {site.email}
          </a>
          <a
            className="footer__link"
            href={site.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="footer__link"
            href="https://avnac.design/studio"
            target="_blank"
            rel="noreferrer"
          >
            Avnac
          </a>
          <a
            className="footer__link"
            href="https://getclipcat.com/"
            target="_blank"
            rel="noreferrer"
          >
            Clipcat
          </a>
          <a className="footer__link" href="#top">
            back to top
          </a>
        </div>

        <div className="footer__cta">
          <a className="btn" href={site.mailto}>
            <span className="btn__mark" aria-hidden="true" />
            <span className="btn__mask">
              <span className="btn__label">Say hello</span>
            </span>
          </a>
        </div>
      </div>

      <div className="footer__bottom grid">
        <p className="footer__fine">© 2026 {site.name} / d3uceY</p>
        <a className="footer__fine" href="#top" data-back-to-top>
          <Arrow dir="n" /> back to top
        </a>
        <p className="footer__fine footer__legal">next.js, gsap, lenis</p>
      </div>
    </footer>
  );
}
