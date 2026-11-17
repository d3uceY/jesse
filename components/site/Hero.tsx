import { products, shelf, site } from "@/lib/site-data";

type Win = {
  index: number;
  src: string;
  width: number;
  height: number;
};

const WINDOWS: Win[] = [
  { index: 0, src: "/assets/media/hero-avnac.webp", width: 1200, height: 750 },
  { index: 1, src: "/assets/media/hero-vectile.webp", width: 1200, height: 750 },
  { index: 2, src: "/assets/media/hero-clipcat.webp", width: 1200, height: 750 },
];

function Window({ win }: { win: Win }) {
  return (
    <figure
      className={"hero__win hero__win--" + win.index}
      data-hero-photo={win.index}
      aria-hidden="true"
    >
      <div className="hero__tilt">
        <div className="hero__layer" data-hero-fly>
          <div className="hero__layer" data-hero-velocity>
            <div className="hero__layer" data-hero-float>
              <div className="hero__layer" data-hero-bob>
                <img
                  className="hero__img"
                  src={win.src}
                  alt=""
                  width={win.width}
                  height={win.height}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top" data-section data-nav="ink">
      <h1 className="hero__title" data-hero-title>
        d3ucey
      </h1>

      <div className="hero__stage">
        {WINDOWS.map((win) => (
          <Window win={win} key={win.src} />
        ))}
      </div>

      <div className="hero__foot grid">
        <p className="hero__tagline t-label">{site.tagline}</p>

        <div className="hero__meta t-label">
          <span>
            {products.length + shelf.length} tools, one person
          </span>{" "}
          <span className="hero__pipe" aria-hidden="true">
            |
          </span>{" "}
          <span>Scroll to explore ↓</span>
        </div>

        <p className="hero__hint">
          <button className="hint" type="button" data-panel-toggle>
            press &apos;m&apos; for index
          </button>
        </p>
      </div>
    </section>
  );
}
