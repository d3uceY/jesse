import PixelSheet from "./PixelSheet";
import { faqs } from "@/lib/site-data";

const DESK_TIMINGS = [320, 260, 320, 260];

export default function Faq() {
  return (
    <section className="faq" id="questions" data-section data-nav="ink">
      <div className="sec-head grid">
        <p className="eyebrow t-medium">
          <span className="eyebrow__mark" aria-hidden="true" />
          {" any questions?"}
        </p>
        <p className="sec-head__label t-medium" aria-hidden="true">
          faq
        </p>
      </div>

      <div className="faq__body grid">
        <div className="faq__aside">
          <h2 className="faq__title t-large" data-reveal>
            the bits
            <br />
            people ask
          </h2>

          <figure className="faq__figure" data-figure-scroll="faq">
            <PixelSheet
              className="faq__sprite"
              src="/assets/pixel/faq-desk.png"
              frames={4}
              frameWidth={96}
              frameHeight={64}
              timings={DESK_TIMINGS}
              label="A pixel-art desk at night: a monitor showing a small cat, a plant, a mug and a window full of stars"
            />
          </figure>
        </div>

        <div className="faq__list" data-faq>
          {faqs.map((item, index) => (
            <div className="faq__item" key={item.question}>
              <button
                className="faq__trigger"
                type="button"
                aria-expanded="false"
                aria-controls={"faq-a-" + index}
                id={"faq-q-" + index}
                data-faq-trigger
              >
                <span className="faq__q t-medium">{item.question}</span>
                <span className="faq__mark" aria-hidden="true" />
              </button>
              <div
                className="faq__panel"
                id={"faq-a-" + index}
                role="region"
                aria-labelledby={"faq-q-" + index}
              >
                <p className="faq__a t-body">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
