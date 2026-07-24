import { projects } from "@/lib/site-data";

export default function Projects() {
  return (
    <section className="projects">
      <div className="projects__section-label">[ PROJECTS · DESKTOP & TOOLS ]</div>
      <div className="projects__grid">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`project-card reveal${project.featured ? " project-card--featured" : ""}`}
          >
            <div className="project-card__top">
              <div className="project-card__name">{project.name}</div>
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
