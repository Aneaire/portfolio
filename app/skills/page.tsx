"use client";

import Container from "@/components/Common/Container";
import SkillCard from "@/components/Common/SkillCard";
import Quote from "@/components/Common/Quote";
import { skillList, ISKillList } from "@/constant/fixedText";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type SkillCategory = "all" | "frontend" | "backend" | "ai" | "tools" | "database";

interface CategoryInfo {
  id: SkillCategory;
  label: string;
  skills: string[];
}

const categories: CategoryInfo[] = [
  { id: "all", label: "All Skills", skills: [] },
  {
    id: "frontend",
    label: "Frontend",
    skills: ["React", "NextJS", "React Native", "TailwindCSS", "Shadcn UI", "Figma"],
  },
  {
    id: "backend",
    label: "Backend",
    skills: ["Node JS", "TypeScript", "Hono", "Convex"],
  },
  {
    id: "ai",
    label: "AI & Automation",
    skills: ["Claude", "OpenCode", "N8N", "Zapier", "AI tools", "Pi", "Ollama"],
  },
  {
    id: "database",
    label: "Database",
    skills: ["PostgresQL", "Supabase", "Appwrite", "Drizzle", "Mapbox", "Pinecone"],
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    skills: ["Git & GitHub", "Docker", "Stripe", "Paymongo", "Posthog", "Google Services"],
  },
];

const SkillsPage = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");

  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") return skillList;
    const category = categories.find((c) => c.id === activeCategory);
    return skillList.filter((skill) => category?.skills.includes(skill.name));
  }, [activeCategory]);

  return (
    <Container title="Skills & Expertise">
      <div className="space-y-8">
        <div className="border-l-2 border-border pl-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Software Developer specializing in{" "}
            <span className="text-foreground font-medium">AI Automation</span>{" "}
            and full-stack development. Strong engineering fundamentals with
            cutting-edge tools to build solutions that drive business efficiency.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "border px-3 py-1.5 text-xs font-medium transition-colors duration-200",
                activeCategory === category.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.04}s` }}
            >
              <SkillCard {...skill} showDescription={false} />
            </div>
          ))}
        </div>

        <div className="pt-4">
          <Quote />
        </div>
      </div>
    </Container>
  );
};

export default SkillsPage;
