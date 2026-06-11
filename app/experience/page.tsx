"use client";

import Container from "@/components/Common/Container";
import Quote from "@/components/Common/Quote";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, TrendingUp, Zap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const achievements = [
  {
    label: "Multi-agent Systems",
    desc: "Designed and deployed streamlined multi-agent systems for complex workflow automation",
    icon: Zap,
  },
  {
    label: "Development Acceleration",
    desc: "Achieved 40-60% faster delivery cycles through AI-enhanced development",
    icon: TrendingUp,
  },
  {
    label: "Cost Reduction",
    desc: "Reduced operational costs by 30-40% through intelligent automation",
    icon: TrendingUp,
  },
  {
    label: "Productivity Gains",
    desc: "Delivered 25%+ productivity improvements through workflow optimization",
    icon: Zap,
  },
  {
    label: "Scalability",
    desc: "Designed and deployed scalable AI solutions handling business growth seamlessly",
    icon: TrendingUp,
  },
  {
    label: "Quality Assurance",
    desc: "Maintained exceptional code quality while accelerating development timelines",
    icon: Zap,
  },
];

const responsibilities = [
  "Developed and deployed scalable web applications using React, Next.js, Node.js, and TypeScript",
  "Designed and implemented multi-agent orchestration systems powered by Agentic AI and RAG architectures",
  "Built intelligent agent workflows that collaborate, reason, and deliver context-aware responses at scale",
  "Implemented AI-powered automation solutions using Zapier, N8N, and Google Cloud Functions",
  "Designed and maintained data pipelines and cloud architecture for optimal performance",
  "Leveraged AI development tools (Claude, OpenCode) to accelerate delivery by 40-60%",
  "Reduced operational costs by 30-40% through intelligent automation implementations",
  "Achieved 25%+ productivity gains through workflow optimization and automation",
];

const ExperiencePage = () => {
  return (
    <Container title="Experience">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="space-y-10"
      >
        {/* Summary */}
        <motion.div variants={fadeUp} custom={0} className="border-l-2 border-border pl-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Software Developer with{" "}
            <span className="font-medium text-foreground">3 years of professional experience</span>,
            specializing in{" "}
            <span className="font-medium text-foreground">Multi-agent AI Orchestration</span> and
            Agentic RAG solutions. Combining strong software engineering fundamentals with
            cutting-edge AI tools to build applications that drive business efficiency and deliver
            40-60% faster development cycles.
          </p>
        </motion.div>

        {/* Work Experience */}
        <motion.section variants={fadeUp} custom={1}>
          <div className="mb-5">
            <p className="section-label mb-2">Career</p>
            <h2 className="text-2xl font-bold">Work Experience</h2>
            <div className="mt-2 h-px w-8 bg-primary" />
          </div>

          <div className="border border-border bg-card p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Full Stack Developer</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Expert Solution Outsourcing
                  </p>
                </div>
              </div>
              <span className="shrink-0 border border-border px-3 py-1 text-xs text-muted-foreground">
                2022 — 2025
              </span>
            </div>

            <div className="mt-2 h-px w-full bg-border" />

            <ul className="mt-5 space-y-3">
              {responsibilities.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Key Achievements */}
        <motion.section variants={fadeUp} custom={2}>
          <div className="mb-5">
            <p className="section-label mb-2">Impact</p>
            <h2 className="text-2xl font-bold">Key Achievements</h2>
            <div className="mt-2 h-px w-8 bg-primary" />
          </div>

          <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 md:grid-cols-3">
            {achievements.map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                custom={i + 3}
                className="bg-card p-5 transition-colors duration-200 hover:bg-muted"
              >
                <div className="mb-3 flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section variants={fadeUp} custom={9}>
          <div className="mb-5">
            <p className="section-label mb-2">Education</p>
            <h2 className="text-2xl font-bold">Academic Background</h2>
            <div className="mt-2 h-px w-8 bg-primary" />
          </div>

          <div className="border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background">
                <GraduationCap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Bachelor of Information Technology
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Don Honorio Ventura Technological University
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.div variants={fadeUp} custom={10} className="pt-2">
          <Quote />
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default ExperiencePage;
