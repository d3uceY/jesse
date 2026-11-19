import { site } from "@/lib/site-data";
import Arrow from "./Arrow";

type Win = {
  index: number;
  src: string;
  width: number;
  height: number;
};

const WINDOWS: Win[] = [
  { index: 0, src: "/assets/media/hero-nooboo.webp", width: 1200, height: 750 },
  { index: 1, src: "/assets/media/hero-spriteware.webp", width: 1200, height: 750 },
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
        d3uceY
      </h1>

      {/* The wordmark is the h1 for the design's sake; this is the sentence a
          crawler and a screen reader need first. Visually clipped, textually
          the page summary. */}
      <p className="sr-only">
        Jesse (d3uceY) is an independent software developer who builds
        open-source desktop apps and command-line tools, including Avnac Studio,
        Vectile, Clipcat, SpriteWare and NooBoo.
      </p>

      <div className="hero__stage">
        {WINDOWS.map((win) => (
          <Window win={win} key={win.src} />
        ))}
      </div>

      <div className="hero__foot grid">
        <p className="hero__tagline t-label">{site.tagline}</p>

        <div className="hero__meta t-label">
          <span>
            Wetin you dey think tho?
          </span>{" "}
          <span className="hero__pipe" aria-hidden="true">
            |
          </span>{" "}
          <span className="hero__scroll">
            Scroll to explore <Arrow dir="s" />
          </span>
        </div>

        <p className="hero__hint">
          <button
            className="hint"
            type="button"
            data-panel-toggle
            aria-controls="panel"
            aria-expanded="false"
          >
            press &apos;m&apos; for index
          </button>
        </p>
      </div>
    </section>
  );
}
