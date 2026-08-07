"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/lib/site-data";

gsap.registerPlugin(useGSAP);

/**
 * Projects grid. The flagship (Avnac Studio) shows its screenshot inline as a
 * framed plate. Every other card stays text-only and, on hover:
 *  - a floating screenshot preview follows the cursor (gsap.quickTo), and
 *  - the project logo pops up from outside the card's bottom edge (clipped by
 *    overflow:hidden) with a back.out settle — the award-site hover trick.
 */
export default function Projects() {
  const scope = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!scope.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Hover interactions are desktop-only: on mobile there's no cursor to
      // follow and no hover, so the logos are shown statically via CSS instead.
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const preview = previewRef.current;
        if (!preview) return;

        const img = preview.querySelector<HTMLImageElement>("img");
        const name = preview.querySelector<HTMLElement>(".cursor-preview__name");
        const cards = Array.from(
          scope.current!.querySelectorAll<HTMLElement>("[data-preview], [data-logo]")
        );
        if (!img || !name || cards.length === 0) return;

        const xTo = gsap.quickTo(preview, "x", { duration: 0.35, ease: "power3" });
        const yTo = gsap.quickTo(preview, "y", { duration: 0.35, ease: "power3" });

        const move = (e: MouseEvent) => {
          xTo(e.clientX + 18);
          yTo(e.clientY + 18);
        };

        const cleanup: Array<{
          card: HTMLElement;
          onEnter: (e: MouseEvent) => void;
          onMove: (e: MouseEvent) => void;
          onLeave: () => void;
        }> = [];

        cards.forEach((card) => {
          const logo = card.querySelector<HTMLElement>(".project-card__logo");
          const src = card.dataset.preview;

          // Park the logo fully below the card's bottom edge (hidden by overflow).
          if (logo) {
            gsap.set(logo, {
              yPercent: 130,
              rotation: -8,
              scale: 0.7,
              opacity: 1,
              transformOrigin: "50% 100%",
            });
          }

          const onEnter = (e: MouseEvent) => {
            if (src) {
              img.src = src;
              name.textContent = card.dataset.name ?? "";
              move(e);
              gsap.to(preview, {
                autoAlpha: 1,
                scale: 1,
                duration: 0.3,
                ease: "power3.out",
              });
            }
            if (logo) {
              gsap.to(logo, {
                yPercent: 0,
                rotation: 0,
                scale: 1,
                duration: 0.65,
                ease: "back.out(1.7)",
              });
            }
          };
          const onLeave = () => {
            if (src) {
              gsap.to(preview, {
                autoAlpha: 0,
                scale: 0.85,
                duration: 0.25,
                ease: "power3.in",
              });
            }
            if (logo) {
              gsap.to(logo, {
                yPercent: 130,
                rotation: -8,
                scale: 0.7,
                duration: 0.4,
                ease: "power2.in",
              });
            }
          };
          const onMove = (e: MouseEvent) => {
            if (src) move(e);
          };

          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mousemove", onMove);
          card.addEventListener("mouseleave", onLeave);
          cleanup.push({ card, onEnter, onMove, onLeave });
        });

        return () => {
          cleanup.forEach(({ card, onEnter, onMove, onLeave }) => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mousemove", onMove);
            card.removeEventListener("mouseleave", onLeave);
          });
          gsap.killTweensOf(preview);
        };
      });

      return () => mm.revert();
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
            data-logo={project.logo}
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
            {project.logo && (
              <span className="project-card__logo" aria-hidden="true">
                <img src={project.logo} alt="" />
              </span>
            )}
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
