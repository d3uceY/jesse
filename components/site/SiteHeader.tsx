import { site } from "@/lib/site-data";

const NAV = [
  { href: "#about", label: "About," },
  { href: "#apps", label: "Apps," },
  { href: "#shelf", label: "Shelf," },
  { href: "#questions", label: "Questions" },
];

export default function SiteHeader() {
  return (
    <header className="site-header" data-header>
      <div className="site-header__inner grid">
        <a className="site-header__brand" href="#top" data-nav-link>
          d3ucey
        </a>

        <nav className="site-header__nav" aria-label="Sections">
          {NAV.map((item) => (
            <a className="nav-link" href={item.href} data-nav-link key={item.href}>
              <span className="nav-link__mask">
                <span className="nav-link__label">{item.label}</span>
                <span className="nav-link__label" aria-hidden="true">
                  {item.label}
                </span>
              </span>
            </a>
          ))}
        </nav>

        <div className="site-header__cta">
          <button
            className="panel-toggle"
            type="button"
            data-panel-toggle
            aria-expanded="false"
            aria-controls="panel"
          >
            <span className="panel-toggle__mask">
              <span className="panel-toggle__label">index</span>
            </span>
          </button>
          <a className="btn" href={site.mailto} data-nav-link>
            <span className="btn__mark" aria-hidden="true" />
            <span className="btn__mask">
              <span className="btn__label" data-btn-label>
                Say hello
              </span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
