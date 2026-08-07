import { projects } from "@/lib/site-data";

export default function Projects() {
  return (
    <section className="projects">
      <div className="projects__section-label reveal">[ PROJECTS · DESKTOP & TOOLS ]</div>
      <div className="projects__grid">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`project-card reveal${project.featured ? " project-card--featured" : ""}`}
          >
            <span className="project-card__scan" aria-hidden="true" />
            <div className="project-card__top">
              <div className="project-card__name">
                <span className="project-card__cursor" aria-hidden="true">
                  ▮
                </span>
                {project.name}
              </div>
              <div className="project-card__desc">{project.desc}</div>
            </div>
            <div className="project-card__meta">
              <span className="project-card__tag">{project.tag}</span>
              <span className="project-card__badge">{project.badge}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
