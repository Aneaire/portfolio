import { Project } from "@/constant/fixedText";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const ProjectCard = ({ project, featured = false }: ProjectCardProps) => {
  const statusColors = {
    live: "bg-green-500/10 text-green-400 border-green-500/30",
    upcoming: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    down: "bg-red-500/10 text-red-400 border-red-500/30",
  };

  const statusLabels = {
    live: "Live",
    upcoming: "Coming Soon",
    down: "Archived",
  };

  return (
    <div
      className={cn(
        "glass-effect group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10",
        featured ? "px-6 pb-6 pt-4" : "px-4 pb-4 pt-3",
      )}
    >
      <div className="from-primary/3 to-secondary/3 absolute inset-0 bg-gradient-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <h3
                className={cn(
                  "font-bold text-foreground",
                  featured ? "text-2xl" : "text-xl",
                )}
              >
                {project.name}
              </h3>
              <Badge
                variant="outline"
                className={cn(statusColors[project.status], "border")}
              >
                {statusLabels[project.status]}
              </Badge>
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              {project.nameDesc}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View project"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 inline-flex items-center gap-1.5 truncate text-sm text-primary/80 transition-colors hover:text-primary"
          >
            <ExternalLink className="h-3 w-3 shrink-0" />
            {project.link.replace(/^https?:\/\//, "")}
          </a>
        )}

        <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl border border-border/50 bg-muted/30">
          {project.image ? (
            <Image
              alt={project.name}
              src={project.image}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, 800px"
                  : "(max-width: 768px) 100vw, 400px"
              }
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <span className="text-sm">No screenshot available</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <p
          className={cn(
            "leading-relaxed text-muted-foreground",
            featured ? "mb-4 text-base" : "mb-3 text-sm",
          )}
        >
          {project.desc}
        </p>

        {featured && (
          <div className="flex items-center gap-4 border-t border-border/50 pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>View Project</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="ml-auto hover:bg-primary/10 hover:text-primary"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                Explore
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
