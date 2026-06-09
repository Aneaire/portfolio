"use client";

import Container from "@/components/Common/Container";
import Quote from "@/components/Common/Quote";
import { projects, Project } from "@/constant/fixedText";
import { useState, useMemo, useEffect } from "react";
import { ExternalLink, ArrowRight, ChevronDown, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ImageLightbox from "@/components/ui/ImageLightbox";

type ProjectStatus = "all" | "live" | "upcoming" | "down";

const statusConfig = {
  all: { label: "All" },
  live: { label: "Live" },
  upcoming: { label: "Coming Soon" },
  down: { label: "Archived" },
};

const statusColors: Record<Project["status"], string> = {
  live: "bg-primary",
  upcoming: "bg-yellow-400",
  down: "bg-muted-foreground",
};

const statusLabels: Record<Project["status"], string> = {
  live: "Live",
  upcoming: "Soon",
  down: "Archived",
};

const ProjectDetail = ({ project }: { project: Project }) => {
  const [lightbox, setLightbox] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [project.name]);

  return (
  <div className="flex flex-col gap-5">
    {lightbox && project.image && (
      <ImageLightbox
        src={project.image}
        alt={project.name}
        onClose={() => setLightbox(false)}
      />
    )}

    <div>
      <div className="mb-1 flex items-center gap-3">
        <h2 className="text-2xl font-bold text-foreground">{project.name}</h2>
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            statusColors[project.status],
          )}
        />
        <span className="text-xs text-muted-foreground">
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
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60 transition-colors hover:text-primary"
      >
        <ExternalLink className="h-3 w-3 shrink-0" />
        {project.link.replace(/^https?:\/\//, "")}
      </a>
    )}

    <div
      className={cn(
        "group relative aspect-[16/9] overflow-hidden border border-border bg-muted",
        project.image && "cursor-zoom-in",
      )}
      onClick={() => project.image && setLightbox(true)}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}
      {project.image ? (
        <>
          <Image
            alt={project.name}
            src={project.image}
            width={800}
            height={450}
            className={cn(
              "h-full w-full object-cover object-top transition-all duration-300 group-hover:scale-[1.02]",
              imageLoaded ? "opacity-100" : "opacity-0",
            )}
            priority
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/30">
            <ZoomIn className="h-6 w-6 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="text-xs text-muted-foreground">No preview</span>
        </div>
      )}
    </div>

    <p className="text-sm leading-relaxed text-muted-foreground">
      {project.desc}
    </p>

    {project.tools && project.tools.length > 0 && (
      <div>
        <p className="section-label mb-2">Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="border border-border px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    )}

    {project.link && (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-2 self-start border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        Visit Project
        <ArrowRight className="h-3.5 w-3.5" />
      </a>
    )}
  </div>
  );
};

const ProjectsPage = () => {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(0);

  const filteredProjects = useMemo(() => {
    if (statusFilter === "all") return projects;
    return projects.filter((p) => p.status === statusFilter);
  }, [statusFilter]);

  const statusCounts = useMemo(
    () => ({
      all: projects.length,
      live: projects.filter((p) => p.status === "live").length,
      upcoming: projects.filter((p) => p.status === "upcoming").length,
      down: projects.filter((p) => p.status === "down").length,
    }),
    [],
  );

  const clampedIndex = Math.min(selectedIndex, Math.max(filteredProjects.length - 1, 0));
  const selectedProject = filteredProjects[clampedIndex];

  const handleFilterChange = (f: ProjectStatus) => {
    setStatusFilter(f);
    setSelectedIndex(0);
    setExpandedMobile(0);
  };

  const handleRowClick = (i: number) => {
    setSelectedIndex(i);
    setExpandedMobile(expandedMobile === i ? null : i);
  };

  return (
    <Container title="Projects">
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(statusConfig) as ProjectStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
              className={cn(
                "border px-3 py-1.5 text-xs font-medium transition-colors duration-200",
                statusFilter === status
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
              )}
            >
              {statusConfig[status].label}
              <span className="ml-2 opacity-50">({statusCounts[status]})</span>
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="border border-border py-12 text-center">
            <p className="text-sm text-muted-foreground">No projects found.</p>
          </div>
        ) : (
          <>
            {/* Desktop: split panel */}
            <div className="hidden lg:flex lg:gap-px lg:border lg:border-border lg:bg-border">
              {/* Left: project index */}
              <div className="w-72 shrink-0 bg-background">
                {filteredProjects.map((project, i) => (
                  <button
                    key={project.name}
                    onClick={() => setSelectedIndex(i)}
                    className={cn(
                      "group flex w-full items-center gap-4 border-b border-border px-5 py-4 text-left transition-colors duration-150 last:border-b-0",
                      clampedIndex === i
                        ? "bg-card"
                        : "bg-background hover:bg-card/60",
                    )}
                  >
                    <span className="section-label w-6 shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "truncate text-sm font-medium transition-colors",
                          clampedIndex === i
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground",
                        )}
                      >
                        {project.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground/60">
                        {project.nameDesc}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full",
                        statusColors[project.status],
                      )}
                    />
                  </button>
                ))}
              </div>

              {/* Right: detail panel */}
              <div className="flex-1 bg-card p-8">
                {selectedProject && <ProjectDetail key={selectedProject.name} project={selectedProject} />}
              </div>
            </div>

            {/* Mobile: expandable rows */}
            <div className="flex flex-col gap-px border border-border bg-border lg:hidden">
              {filteredProjects.map((project, i) => (
                <div key={project.name} className="bg-background">
                  <button
                    onClick={() => handleRowClick(i)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  >
                    <span className="section-label w-6 shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {project.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground/60">
                        {project.nameDesc}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full",
                        statusColors[project.status],
                      )}
                    />
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                        expandedMobile === i && "rotate-180",
                      )}
                    />
                  </button>

                  {expandedMobile === i && (
                    <div className="border-t border-border bg-card px-5 pb-6 pt-5">
                      <ProjectDetail project={project} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* GitHub CTA */}
        <div className="border border-border bg-card p-6 text-center">
          <p className="mb-3 text-xs text-muted-foreground">
            Want to see more of my work?
          </p>
          <a
            href="https://github.com/Aneaire"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View GitHub Profile
          </a>
        </div>

        <Quote />
      </div>
    </Container>
  );
};

export default ProjectsPage;
