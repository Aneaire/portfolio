"use client";

import Container from "@/components/Common/Container";
import Quote from "@/components/Common/Quote";
import { projects } from "@/constant/fixedText";
import ProjectCard from "./ProjectCard";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectStatus = "all" | "live" | "upcoming" | "down";

const ProjectsPage = () => {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus>("all");

  const filteredProjects = useMemo(() => {
    if (statusFilter === "all") return projects;
    return projects.filter((project) => project.status === statusFilter);
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

  const statusConfig = {
    all: {
      label: "All Projects",
      icon: <Filter className="h-4 w-4" />,
      color: "text-primary",
    },
    live: {
      label: "Live",
      icon: <CheckCircle2 className="h-4 w-4" />,
      color: "text-green-400",
    },
    upcoming: {
      label: "Coming Soon",
      icon: <Clock className="h-4 w-4" />,
      color: "text-yellow-400",
    },
    down: {
      label: "Archived",
      icon: <XCircle className="h-4 w-4" />,
      color: "text-red-400",
    },
  };

  return (
    <Container title="Projects">
      <div className="space-y-8">
        <div className="glass-effect rounded-xl p-6">
          <p className="leading-relaxed text-muted-foreground">
            Here&apos;s a collection of my recent work. Each project represents
            a unique challenge and opportunity to create impactful solutions.
            From AI-powered applications to full-stack web platforms, these
            projects showcase my expertise in building modern, scalable
            applications.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(Object.keys(statusConfig) as ProjectStatus[]).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className={cn(
                "transition-all duration-300",
                statusFilter === status
                  ? "bg-primary hover:bg-primary/90"
                  : "hover:bg-primary/10 hover:text-primary",
              )}
            >
              <span className="mr-2">{statusConfig[status].icon}</span>
              {statusConfig[status].label}
              <span
                className={cn(
                  "ml-2 text-xs",
                  statusFilter === status
                    ? "text-primary-foreground/70"
                    : statusConfig[status].color,
                )}
              >
                ({statusCounts[status]})
              </span>
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.name}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="glass-effect rounded-xl py-12 text-center">
            <p className="text-muted-foreground">
              No projects found with this filter.
            </p>
          </div>
        )}

        <div className="glass-effect flex flex-col items-center justify-center gap-4 rounded-xl py-8">
          <p className="text-muted-foreground">Want to see more of my work?</p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
            <a
              href="https://github.com/Aneaire"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View GitHub Profile
            </a>
          </Button>
        </div>

        <Quote />
      </div>
    </Container>
  );
};

export default ProjectsPage;
