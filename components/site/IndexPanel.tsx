import { products, shelf, site } from "@/lib/site-data";

const LINKS = [
  { href: "#about", label: "about" },
  { href: "#apps", label: "apps" },
  { href: "#shelf", label: "shelf" },
  { href: "#questions", label: "questions" },
  { href: "#contact", label: "contact" },
];

export default function IndexPanel() {
  return (
    <aside
      className="panel"
      id="panel"
      data-panel
      aria-label="Index"
      aria-hidden="true"
      tabIndex={-1}
      inert={true}
    >
      <div className="panel__head">
        <p className="t-small">index</p>
        <button
          className="panel__close"
          type="button"
          data-panel-close
          aria-label="Close index (Esc)"
        >
          esc
        </button>
      </div>

      <nav className="panel__nav" aria-label="Index">
        {LINKS.map((link) => (
          <a
            className="panel__link"
            href={link.href}
            data-panel-link
            key={link.href}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="panel__foot">
        <a className="panel__mail t-small" href={site.mailto}>
          {site.email}
        </a>
        <a
          className="panel__mail t-small"
          href={site.github}
          target="_blank"
          rel="noreferrer"
        >
          github.com/d3uceY
        </a>
        <p className="panel__note t-label">
          {products.length + shelf.length} tools, one person
        </p>
      </div>
    </aside>
  );
}
