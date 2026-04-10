"use client";

import { Project } from "@/constant/fixedText";
import { ExternalLink, ArrowRight, ZoomIn } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ImageLightbox from "@/components/ui/ImageLightbox";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const statusColors = {
  live: "text-primary",
  upcoming: "text-yellow-400",
  down: "text-muted-foreground",
};

const statusLabels = {
  live: "Live",
  upcoming: "Coming Soon",
  down: "Archived",
};

const ProjectCard = ({ project, featured = false }: ProjectCardProps) => {
  const [lightbox, setLightbox] = useState(false);

  return (
    <div
      className={cn(
        "group bg-card transition-colors duration-200 hover:bg-muted",
        featured ? "p-6" : "p-5",
      )}
    >
      {lightbox && project.image && (
        <ImageLightbox
          src={project.image}
          alt={project.name}
          onClose={() => setLightbox(false)}
        />
      )}

      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-3">
            <h3
              className={cn(
                "font-bold text-foreground",
                featured ? "text-xl" : "text-base",
              )}
            >
              {project.name}
            </h3>
            <span className={cn("text-xs font-medium", statusColors[project.status])}>
              {statusLabels[project.status]}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{project.nameDesc}</p>
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View project"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 inline-flex items-center gap-1 text-xs text-muted-foreground/60 transition-colors hover:text-primary"
        >
          <ExternalLink className="h-3 w-3 shrink-0" />
          {project.link.replace(/^https?:\/\//, "")}
        </a>
      )}

      {project.tools && project.tools.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="border border-border px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tool}
            </span>
          ))}
        </div>
      )}

      <div
        className={cn(
          "relative mb-4 aspect-[16/9] overflow-hidden border border-border bg-muted",
          project.image && "cursor-zoom-in",
        )}
        onClick={() => project.image && setLightbox(true)}
      >
        {project.image ? (
          <>
            <Image
              alt={project.name}
              src={project.image}
              fill
              quality={90}
              className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, 1024px"
                  : "(max-width: 768px) 100vw, 512px"
              }
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/30">
              <ZoomIn className="h-5 w-5 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-xs text-muted-foreground">No preview</span>
          </div>
        )}
      </div>

      <p
        className={cn(
          "leading-relaxed text-muted-foreground",
          featured ? "mb-4 text-sm" : "mb-3 text-xs",
        )}
      >
        {project.desc}
      </p>

      {featured && project.link && (
        <div className="flex items-center border-t border-border pt-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            Explore
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
