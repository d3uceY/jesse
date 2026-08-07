"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/lib/site-data";

gsap.registerPlugin(useGSAP);

/**
 * Projects grid. The flagship (Avnac Studio) shows its screenshot inline as a
 * framed plate. Every other card with a screenshot stays text-only and reveals
 * that screenshot in a floating preview that follows the cursor on hover —
 * the award-site pattern, driven by gsap.quickTo for a smooth 60fps follow.
 */
export default function Projects() {
  const scope = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const preview = previewRef.current;
      if (!preview || !scope.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const img = preview.querySelector<HTMLImageElement>("img");
      const name = preview.querySelector<HTMLElement>(".cursor-preview__name");
      const cards = Array.from(
        scope.current.querySelectorAll<HTMLElement>("[data-preview]")
      );
      if (!img || !name || cards.length === 0) return;

      const xTo = gsap.quickTo(preview, "x", { duration: 0.35, ease: "power3" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.35, ease: "power3" });

      const move = (e: MouseEvent) => {
        xTo(e.clientX + 18);
        yTo(e.clientY + 18);
      };

      const onEnter = (e: MouseEvent) => {
        const card = e.currentTarget as HTMLElement;
        const src = card.dataset.preview;
        if (!src) return;
        img.src = src;
        name.textContent = card.dataset.name ?? "";
        move(e);
        gsap.to(preview, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.3,
          ease: "power3.out",
        });
      };
      const onLeave = () => {
        gsap.to(preview, {
          autoAlpha: 0,
          scale: 0.85,
          duration: 0.25,
          ease: "power3.in",
        });
      };

      cards.forEach((card) => {
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mousemove", move);
        card.addEventListener("mouseleave", onLeave);
      });

      return () => {
        cards.forEach((card) => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mousemove", move);
          card.removeEventListener("mouseleave", onLeave);
        });
        gsap.killTweensOf(preview);
      };
    },
    { scope }
  );

  return (
    <section className="projects" ref={scope}>
      <div className="projects__section-label reveal">[ PROJECTS · DESKTOP & TOOLS ]</div>
      <div className="projects__grid">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            data-preview={project.featured ? undefined : project.image}
            data-name={project.name}
            className={`project-card reveal${project.featured ? " project-card--featured" : ""}`}
          >
            <span className="project-card__scan" aria-hidden="true" />
            {project.featured && project.image && (
              <figure className="project-card__shot">
                <div className="project-card__shot-bar">
                  <span className="project-card__shot-dots" aria-hidden="true">
                    <span className="project-card__shot-dot project-card__shot-dot--red" />
                    <span className="project-card__shot-dot" />
                    <span className="project-card__shot-dot" />
                  </span>
                  <span className="project-card__shot-name">{project.name}</span>
                </div>
                <div className="project-card__shot-screen">
                  <img
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    loading="lazy"
                  />
                </div>
              </figure>
            )}
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

      <div className="cursor-preview" ref={previewRef} aria-hidden="true">
        <div className="cursor-preview__screen">
          <img alt="" />
        </div>
        <div className="cursor-preview__name" />
      </div>
    </section>
  );
}
