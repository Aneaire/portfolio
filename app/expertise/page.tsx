import Container from "@/components/Common/Container";
import Quote from "@/components/Common/Quote";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Code2,
  Database,
  LayoutPanelTop,
  Workflow,
  Wrench,
} from "lucide-react";

const fullStackAreas = [
  {
    title: "Frontend Systems",
    description:
      "Responsive interfaces built with React, Next.js, TypeScript, Tailwind, and component-driven architecture.",
    icon: LayoutPanelTop,
  },
  {
    title: "Backend Architecture",
    description:
      "APIs, business logic, integrations, and application structure designed for performance, maintainability, and scale.",
    icon: Code2,
  },
  {
    title: "Data & Infrastructure",
    description:
      "Databases, cloud services, deployment workflows, and data pipelines that support reliable production systems.",
    icon: Database,
  },
];

const aiAreas = [
  {
    title: "Agent-Based Applications",
    description:
      "AI systems built for real workflows, internal tooling, and user-facing experiences with clear business value.",
    icon: Bot,
  },
  {
    title: "RAG & AI Integrations",
    description:
      "Context-aware AI features powered by retrieval pipelines, external tools, and modern model APIs.",
    icon: BrainCircuit,
  },
  {
    title: "Automation Workflows",
    description:
      "Operational automations using n8n, Zapier, cloud functions, and custom logic to reduce manual work.",
    icon: Workflow,
  },
];

const strengths = [
  "Strong frontend and backend delivery across modern TypeScript stacks",
  "Practical AI engineering focused on useful, shippable systems",
  "Experience building internal tools, automations, and production-ready apps",
  "Fast iteration with AI-assisted workflows without sacrificing code quality",
];

export default function ExpertisePage() {
  return (
    <Container title="Expertise">
      <div className="space-y-10">
        <div className="border-l-2 border-border pl-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            My work is centered on two core strengths: <span className="font-medium text-foreground">full-stack development</span>{" "}
            and <span className="font-medium text-foreground">AI engineering</span>. Together, they let me build
            products that are polished on the surface, dependable underneath, and more efficient
            through smart automation.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-px border border-border bg-border lg:grid-cols-2">
          <div className="bg-card p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-border bg-background">
                <Code2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="section-label">Specialty 01</p>
                <h2 className="text-2xl font-bold text-foreground">Full-Stack Development</h2>
              </div>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              I build end-to-end web products, from interface design and frontend behavior to APIs,
              data models, integrations, and deployment. My approach is focused on shipping clean,
              scalable software that solves real business problems.
            </p>

            <div className="space-y-px border border-border bg-border">
              {fullStackAreas.map((item) => (
                <div key={item.title} className="flex gap-4 bg-background p-4">
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-border bg-background">
                <Wrench className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="section-label">Specialty 02</p>
                <h2 className="text-2xl font-bold text-foreground">AI Engineering</h2>
              </div>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              I build practical AI systems that support workflows, internal operations, and customer
              experiences. That includes agent-based applications, retrieval-powered features, and
              automation that helps teams move faster with less manual effort.
            </p>

            <div className="space-y-px border border-border bg-border">
              {aiAreas.map((item) => (
                <div key={item.title} className="flex gap-4 bg-background p-4">
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5">
            <p className="section-label mb-2">Approach</p>
            <h2 className="text-2xl font-bold">What I Bring</h2>
            <div className="mt-2 h-px w-8 bg-primary" />
          </div>

          <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
            {strengths.map((item) => (
              <div key={item} className="bg-card p-5 text-sm text-muted-foreground">
                <span className="mr-2 text-primary">•</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="border border-border bg-card p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-label mb-2">Next</p>
              <h2 className="text-2xl font-bold">See the tools and the work behind it</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Explore the full stack, AI tools, and selected projects that support these two areas.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/skills"
                className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                View Skills
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <Quote />
      </div>
    </Container>
  );
}
