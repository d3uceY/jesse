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
          I&apos;m Jesse. I build software for the desktop and the terminal,
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
            <h3 className="t-medium">The pattern</h3>
            <p className="t-body">
              Avnac exists because I wanted a design tool that opened in under a
              second. Vectile exists because I wanted to search my own notes
              without uploading them. Clipcat exists because I kept losing what I
              had copied. Notice the friction, build the thing, use it the next
              day.
            </p>
          </article>
          <article className="about__block">
            <h3 className="t-medium">Go behind, TypeScript in front</h3>
            <p className="t-body">
              Most of these are Wails apps. Go handles files, indexing and the
              parts that touch the OS; the screen is TypeScript, or Elm when the
              UI has enough state to deserve it. Rust turns up where a job has to
              start fast and stay small.
            </p>
          </article>
          <p className="about__statement" data-reveal>
            Every app on this page is installed on my machine and opened most
            days. Nothing here was built for a pitch deck.
          </p>
        </div>
      </div>
    </section>
  );
}
