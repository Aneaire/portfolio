"use client";

import Container from "@/components/Common/Container";
import SkillCard from "@/components/Common/SkillCard";
import Quote from "@/components/Common/Quote";
import { skillList, ISKillList } from "@/constant/fixedText";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Code,
  Layout,
  Server,
  Brain,
  Terminal,
  Cloud,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SkillCategory =
  | "all"
  | "frontend"
  | "backend"
  | "ai"
  | "tools"
  | "database";

interface CategoryInfo {
  id: SkillCategory;
  label: string;
  icon: React.ReactNode;
  skills: string[];
}

const categories: CategoryInfo[] = [
  {
    id: "all",
    label: "All Skills",
    icon: <Terminal className="h-4 w-4" />,
    skills: [],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: <Layout className="h-4 w-4" />,
    skills: [
      "React",
      "NextJS",
      "React Native",
      "TailwindCSS",
      "Shadcn UI",
      "Figma",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: <Server className="h-4 w-4" />,
    skills: ["Node JS", "TypeScript", "Hono", "Convex"],
  },
  {
    id: "ai",
    label: "AI & Automation",
    icon: <Brain className="h-4 w-4" />,
    skills: ["Claude", "OpenCode", "N8N", "Zapier", "AI tools"],
  },
  {
    id: "database",
    label: "Database",
    icon: <Database className="h-4 w-4" />,
    skills: ["PostgresQL", "Supabase", "Appwrite", "Drizzle", "Mapbox"],
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    icon: <Code className="h-4 w-4" />,
    skills: ["Git & GitHub", "Docker", "Stripe", "Paymongo", "Posthog"],
  },
];

function Database({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

const SkillsPage = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");

  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") return skillList;
    const category = categories.find((c) => c.id === activeCategory);
    return skillList.filter((skill) => category?.skills.includes(skill.name));
  }, [activeCategory]);

  const getCategoryGradient = (category: SkillCategory) => {
    const gradients: Record<SkillCategory, string> = {
      all: "from-primary to-secondary",
      frontend: "from-blue-500 to-cyan-500",
      backend: "from-green-500 to-emerald-500",
      ai: "from-purple-500 to-pink-500",
      database: "from-orange-500 to-amber-500",
      tools: "from-violet-500 to-purple-500",
    };
    return gradients[category];
  };

  return (
    <Container title="Skills & Expertise">
      <div className="space-y-8">
        <div className="glass-effect rounded-xl p-6">
          <p className="leading-relaxed text-muted-foreground">
            As a{" "}
            <span className="font-medium text-primary">Software Developer</span>{" "}
            specializing in
            <span className="font-medium text-secondary">
              {" "}
              AI Automation
            </span>{" "}
            and
            <span className="font-medium text-primary"> Data Engineering</span>,
            I combine strong engineering fundamentals with cutting-edge tools to
            build solutions that drive business efficiency. My expertise spans
            full-stack development, workflow automation, and scalable data
            pipeline architecture.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "transition-all duration-300",
                activeCategory === category.id
                  ? "bg-primary hover:bg-primary/90"
                  : "hover:bg-primary/10 hover:text-primary",
              )}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>

        <div className="animate-fade-in-up">
          <div className="flex flex-wrap gap-4">
            {filteredSkills.map((skill, index) => (
              <div
                key={skill.name}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <SkillCard {...skill} showDescription={false} />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Quote />
        </div>
      </div>
    </Container>
  );
};

export default SkillsPage;
