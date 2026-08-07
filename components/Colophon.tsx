import { colophonItems } from "@/lib/site-data";

export default function Colophon() {
  return (
    <footer className="colophon reveal">
      <div className="colophon__label">[ COLOPHON ]</div>

      <div className="colophon__grid">
        {colophonItems.map((item) => (
          <div className="colophon__cell" key={item.key}>
            <div className="colophon__key">{item.key}</div>
            <div className={`colophon__value${item.tone === "ok" ? " colophon__value--ok" : ""}`}>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
