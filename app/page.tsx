"use client";

import Container from "@/components/Common/Container";
import SkillCard from "@/components/Common/SkillCard";
import Quote from "@/components/Common/Quote";
import { homeText, projects, skillList } from "@/constant/fixedText";
import ProjectCard from "./projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Cpu, Zap, Layers, Sparkles } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="glass-effect relative mb-8 animate-fade-in-up overflow-hidden rounded-2xl p-8">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 animate-pulse text-primary" />
          <span className="text-sm font-medium text-primary">
            Available for opportunities
          </span>
        </div>

        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          <span className="text-gradient">Software Developer</span>
          <br />
          <span className="text-muted-foreground">
            & AI Automation Specialist
          </span>
        </h1>

        <p className="mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {homeText.description}
        </p>

        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/projects">
              <Code className="mr-2 h-4 w-4" />
              View Projects
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/30 hover:bg-primary/10"
            asChild
          >
            <Link href="/contact">
              <Zap className="mr-2 h-4 w-4" />
              Get In Touch
            </Link>
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap gap-6 border-t border-border/50 pt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Cpu className="h-4 w-4 text-primary" />
            <span>AI-Powered Development</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Layers className="h-4 w-4 text-secondary" />
            <span>Full-Stack Solutions</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-primary" />
            <span>40-60% Faster Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof homeText.others)[0];
  index: number;
}) => {
  return (
    <div className="glass-effect group relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            {index === 0 && <Cpu className="h-5 w-5 text-primary" />}
            {index === 1 && <Code className="h-5 w-5 text-primary" />}
            {index === 2 && <Zap className="h-5 w-5 text-primary" />}
            {index === 3 && <Sparkles className="h-5 w-5 text-primary" />}
          </div>
          <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {service.title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </div>
    </div>
  );
};

const FeaturedSkills = () => {
  const featuredSkills = [
    skillList.find((skill) => skill.name === "TypeScript")!,
    skillList.find((skill) => skill.name === "React")!,
    skillList.find((skill) => skill.name === "NextJS")!,
    skillList.find((skill) => skill.name === "Claude")!,
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Layers className="h-5 w-5 text-primary" />
          Core Technologies
        </h2>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="hover:bg-primary/10 hover:text-primary"
        >
          <Link href="/skills">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="skill-card-wrapper">
        {featuredSkills.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  );
};

const FeaturedProject = () => {
  const featuredProject =
    projects.find((p) => p.status === "live") || projects[1];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Code className="h-5 w-5 text-secondary" />
          Featured Project
        </h2>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="hover:bg-primary/10 hover:text-primary"
        >
          <Link href="/projects">
            All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <ProjectCard project={featuredProject} featured />
    </div>
  );
};

export default function Home() {
  return (
    <Container title="Welcome">
      <HeroSection />

      <section
        className="animate-fade-in-up space-y-8"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {homeText.others.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </section>

      <section
        className="mt-8 animate-fade-in-up space-y-6"
        style={{ animationDelay: "0.4s" }}
      >
        <FeaturedSkills />
      </section>

      <section
        className="mt-8 animate-fade-in-up space-y-6"
        style={{ animationDelay: "0.6s" }}
      >
        <FeaturedProject />
      </section>

      <section
        className="mt-8 animate-fade-in-up"
        style={{ animationDelay: "0.8s" }}
      >
        <Quote />
      </section>
    </Container>
  );
}
