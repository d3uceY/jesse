import { products } from "@/lib/site-data";
import Arrow from "./Arrow";

export default function Apps() {
  return (
    <section className="apps" id="apps" data-section data-nav="ink">
      <div className="sec-head grid">
        <p className="eyebrow t-medium">
          <span className="eyebrow__mark" aria-hidden="true" />
          {" the ones that shipped"}
        </p>
        <p className="sec-head__label t-medium" aria-hidden="true">
          apps
        </p>
      </div>

      <div className="apps__intro grid">
        <h2 className="apps__title t-large" data-reveal>
          five things
          <br />
          you can install
        </h2>
        <p className="apps__copy t-body-large">
          Desktop apps, mostly. All Open source btw. I need contributors lmao.
        </p>
      </div>

      <ol className="apps__list">
        {products.map((app, index) => (
          <li
            className={
              "apps__row grid" + (index % 2 === 1 ? " apps__row--flip" : "")
            }
            key={app.id}
          >
            <div className="apps__meta">
              <div className="apps__name-row">
                <img
                  className="apps__logo"
                  src={app.logo}
                  alt=""
                  width="96"
                  height="96"
                  loading="lazy"
                />
                <h3 className="apps__name">{app.name}</h3>
              </div>

              <p className="apps__lede t-medium">{app.lede}</p>
              <p className="apps__body t-body">{app.body}</p>

              <ul className="apps__facts" aria-label="At a glance">
                {app.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>

              <a
                className="apps__link"
                href={app.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{app.hrefLabel}</span>
                <Arrow className="apps__link-arrow" />
              </a>
            </div>

            <figure className="apps__shot" data-parallax="8">
              <img
                src={app.shot}
                alt={app.alt}
                width="1600"
                height="1000"
                loading="lazy"
              />
            </figure>
          </li>
        ))}
      </ol>
    </section>
  );
}
