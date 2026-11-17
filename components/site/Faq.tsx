import { faqs, site } from "@/lib/site-data";

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
          <p className="faq__note t-body">
            If it isn&apos;t here, ask me on GitHub. I answer slower on weekends,
            but I do answer.
          </p>
          <a
            className="faq__link"
            href={site.github}
            target="_blank"
            rel="noreferrer"
          >
            github.com/d3uceY ↗
          </a>
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
