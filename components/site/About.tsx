export default function About() {
  return (
    <section className="about" id="about" data-section data-nav="paper">
      <div className="grid">
        <p className="eyebrow t-medium">
          <span className="eyebrow__mark" aria-hidden="true" />
          {" the person behind all this"}
        </p>
      </div>

      <div className="about__head grid">
        <h2 className="about__lede t-medium" data-reveal>
          I&apos;m Jesse. I build software for the web, desktop and the terminal,
          usually because something I do every day is slower than it should be.
        </h2>
        <p className="about__word t-medium" aria-hidden="true">
          jesse
        </p>
      </div>

      <div className="about__body grid">
        <div className="about__left">
          <figure className="about__figure" data-parallax="14">
            <img
              src="/assets/media/desk.webp"
              alt="A desk at night: a monitor, a laptop and a keyboard, lit by one lamp"
              width="960"
              height="720"
              loading="lazy"
            />
          </figure>
        </div>

        <div className="about__right">
          <article className="about__block">
            <h3 className="t-medium">Why i build</h3>
            <p className="t-body">
              Vectile exists because I wanted to find my own notes and PDFs without knowing its content.
              Clipcat exists because I kept losing what I
              had copied and Windows sucks a*s. My software exists to fix everyday annoyances.
            </p>
          </article>
          <article className="about__block">
            <h3 className="t-medium">Go, Rust behind, TypeScript in front</h3>
            <p className="t-body">
              I use Go and Rust, and TypeScript for most of my backends and desktop applications.
              Go when i need to build a desktop application or cli tool quickly. 
              Rust when i need that sweet sweet performance and TypeScript for frontends mostly.
            </p>
          </article>
          <p className="about__statement" data-reveal>
            Every app on this page is installed on my machine and used most days. The sprite assets you see in this site were generated with SpriteWare.
          </p>
        </div>
      </div>
    </section>
  );
}
