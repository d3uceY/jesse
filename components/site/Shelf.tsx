import { shelf } from "@/lib/site-data";
import Arrow from "./Arrow";

const FIRST = 4;

export default function Shelf() {
  const head = shelf.slice(0, FIRST);
  const rest = shelf.slice(FIRST);

  const row = (item: (typeof shelf)[number]) => (
    <li className="shelf__row" key={item.name}>
      <span className="shelf__name">{item.name}</span>
      <span className="shelf__note">{item.note}</span>
      <span className="shelf__slot">
        <span className="shelf__kind">{item.kind}</span>
        <img
        className="shelf__logo"
        src={item.logo}
        alt=""
        width={192}
        height={192}
        loading="lazy"
        decoding="async"
      />
      </span>
      <a
        className="shelf__go"
        href={item.href}
        target="_blank"
        rel="noreferrer"
        aria-label={item.name + " on GitHub"}
      >
        <Arrow />
      </a>
    </li>
  );

  return (
    <section className="shelf" id="shelf" data-section data-nav="paper">
      <div className="sec-head grid">
        <p className="eyebrow t-medium">
          <span className="eyebrow__mark" aria-hidden="true" />
          {" everything else"}
        </p>
        <p className="sec-head__label t-medium" aria-hidden="true">
          shelf
        </p>
      </div>

      <div className="shelf__intro grid">
        <h2 className="shelf__title t-large" data-reveal>
          the rest{" "}
          <br />
          of the shelf
        </h2>
        <p className="shelf__copy t-body-large">
          Small tools and half-finished experiments. Plus, i don&apos;t want to bloat your context window. Lol
        </p>
      </div>

      <div className="shelf__body" data-archive>
        <ul className="shelf__list" role="list">
          {head.map(row)}
        </ul>

        {/* Collapsed by CSS, so the markup stays in the HTML for crawlers;
            archive.js marks it inert while it is 0px tall so it never becomes
            an invisible tab stop. */}
        <div className="shelf__rest" id="shelf-rest" data-archive-panel>
          <ul className="shelf__list" role="list">
            {rest.map(row)}
          </ul>
        </div>

        <button
          className="shelf__toggle"
          type="button"
          data-archive-toggle
          aria-expanded="false"
          aria-controls="shelf-rest"
        >
          <span className="shelf__toggle-label" data-archive-toggle-label>
            show the other {rest.length}
          </span>
          <span className="shelf__toggle-mark" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
