import { site } from "@/lib/site-data";

export default function Cta() {
  return (
    <section className="cta" id="contact" data-section data-nav="paper">
      <div className="cta__frame" data-cta-frame>
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
