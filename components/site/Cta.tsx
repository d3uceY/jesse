import { site } from "@/lib/site-data";

/**
 * The pixel artifacts are SpriteWare sprites (12×12 and 5×5) scaled up with
 * nearest-neighbour rendering. They drift against the scroll and fade in as
 * the section arrives; the sparkle runs a two-frame twinkle.
 */
const PIXELS = [
  { cls: "cta__pixel--a", src: "/assets/pixel/gem-amber.png", drift: 26 },
  { cls: "cta__pixel--b", src: "/assets/pixel/gem-teal.png", drift: -16 },
  { cls: "cta__pixel--c", src: "/assets/pixel/mark-gem.png", drift: 34 },
  { cls: "cta__pixel--d", src: "/assets/pixel/gem-amber.png", drift: -28 },
];

export default function Cta() {
  return (
    <section className="cta" id="contact" data-section data-nav="paper">
      <div className="cta__frame" data-cta-frame>
        <div className="cta__pixels" aria-hidden="true">
          {PIXELS.map((pixel) => (
            <img
              className={"cta__pixel " + pixel.cls}
              key={pixel.cls}
              src={pixel.src}
              alt=""
              data-pixel={pixel.drift}
            />
          ))}
          <span className="cta__pixel cta__pixel--e cta__pixel--spark" data-pixel="-22" />
          <span className="cta__pixel cta__pixel--f cta__pixel--spark" data-pixel="18" />
        </div>

        <div className="cta__content">
          <h2 className="cta__line t-xl" data-reveal>
            got something
            <br />
            that needs building?
          </h2>

          <a className="btn btn--lg" href={site.mailto}>
            <span className="btn__mark" aria-hidden="true" />
            <span className="btn__mask">
              <span className="btn__label">tell me what you need</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
