import { manifestTheses } from "@/lib/site-data";

export default function Manifest() {
  return (
    <section className="manifest">
      <div className="manifest__section-label">[ THE ENGINEER ]</div>

      {manifestTheses.map((thesis) => (
        <div className="manifest__thesis reveal" key={thesis.num}>
          <div className="manifest__num">{thesis.num}</div>
          <h2 className="manifest__headline">{thesis.headline}</h2>
          <p className="manifest__body">{thesis.body}</p>
          <div className="manifest__footnote">{thesis.footnote}</div>
        </div>
      ))}
    </section>
  );
}
