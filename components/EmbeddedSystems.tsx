import { embeddedProjects } from "@/lib/site-data";

export default function EmbeddedSystems() {
  return (
    <section className="embedded">
      <div className="embedded__section-label reveal">[ EMBEDDED SYSTEMS & IoT ]</div>
      <div className="embedded__grid">
        {embeddedProjects.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="embedded-card reveal"
          >
            <span className="embedded-card__scan" aria-hidden="true" />
            <div className="embedded-card__name">
              <span className="embedded-card__cursor" aria-hidden="true">
                ▮
              </span>
              {project.name}
            </div>
            <div className="embedded-card__desc">{project.desc}</div>
            <div className="embedded-card__tags">
              {project.tags.map((tag) => (
                <span className="embedded-card__tag" key={tag}>
                  {tag}
                </span>
              ))}
              <span className={`embedded-card__status${project.status === "ONGOING" ? " embedded-card__status--amber" : ""}`}>
                {project.status}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
