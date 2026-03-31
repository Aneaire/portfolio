"use client";

import SkillCard from "@/components/Common/SkillCard";
import Quote from "@/components/Common/Quote";
import { homeText, projects, skillList } from "@/constant/fixedText";
import ProjectCard from "./projects/ProjectCard";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  Cpu,
  Zap,
  Layers,
  Sparkles,
  Bot,
  Rocket,
  TrendingUp,
  MousePointerClick,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const TypeWriter = ({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];

    if (!isDeleting && currentText === word) {
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setCurrentText(
          isDeleting
            ? word.slice(0, currentText.length - 1)
            : word.slice(0, currentText.length + 1),
        );
      },
      isDeleting ? 50 : 100,
    );
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const HeroSection = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative mb-12 overflow-hidden rounded-3xl border border-border/50 bg-card/40 px-6 py-12 backdrop-blur-2xl md:px-12 md:py-16"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[80px]" />

      <div className="relative z-10 max-w-3xl">
        <motion.div variants={fadeUp} custom={0} className="mb-6 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm font-medium text-green-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={1}
          className="mb-1 text-4xl font-bold leading-tight tracking-tight md:text-6xl"
        >
          I build things that work.
        </motion.h1>
        <motion.div
          variants={fadeUp}
          custom={1.5}
          className="mb-3 text-lg font-medium text-muted-foreground md:text-2xl"
        >
          <TypeWriter
            words={[
              "AI-powered apps",
              "multi-agent systems",
              "full-stack solutions",
              "smart automations",
            ]}
            className="text-gradient font-semibold"
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="mb-3 text-lg font-medium text-muted-foreground md:text-xl"
        >
          that ship <span className="text-primary font-semibold">40-60% faster</span> without compromising quality.
        </motion.p>

        <motion.p
          variants={fadeUp}
          custom={3}
          className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground/80"
        >
          Software Developer & AI Automation Specialist combining full-stack
          engineering with Claude, Codex, and multi-agent orchestration to
          deliver production-ready systems at speed.
        </motion.p>

        <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-4">
          <Button
            size="lg"
            className="group bg-primary px-6 text-base font-semibold hover:bg-primary/90"
            asChild
          >
            <Link href="/projects">
              <Rocket className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
              See My Work
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/30 px-6 text-base hover:bg-primary/10"
            asChild
          >
            <Link href="/contact">
              <Zap className="mr-2 h-5 w-5" />
              Let&apos;s Talk
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const stats = [
  { value: "7+", label: "Projects Shipped", icon: Rocket },
  { value: "24+", label: "Technologies", icon: Layers },
  { value: "40-60%", label: "Faster Delivery", icon: TrendingUp },
  { value: "4", label: "Service Areas", icon: Bot },
];

const StatsSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          variants={fadeUp}
          custom={i}
          className="glass-effect group rounded-2xl p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
        >
          <stat.icon className="mx-auto mb-3 h-6 w-6 text-primary transition-transform duration-500 group-hover:scale-110" />
          <div className="text-2xl font-bold text-foreground md:text-3xl">
            {stat.value}
          </div>
          <div className="mt-1 text-xs font-medium text-muted-foreground md:text-sm">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const serviceIcons = [Cpu, Code, Zap, Sparkles];

const ServicesSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.div variants={fadeUp} custom={0} className="mb-6 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <MousePointerClick className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">What I Do</h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {homeText.others.map((service, index) => {
          const Icon = serviceIcons[index];
          return (
            <motion.div
              key={service.title}
              variants={fadeUp}
              custom={index + 1}
              className="glass-effect group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

const FeaturedSkills = () => {
  const featuredSkills = [
    skillList.find((skill) => skill.name === "TypeScript")!,
    skillList.find((skill) => skill.name === "React")!,
    skillList.find((skill) => skill.name === "NextJS")!,
    skillList.find((skill) => skill.name === "Claude")!,
    skillList.find((skill) => skill.name === "Node JS")!,
    skillList.find((skill) => skill.name === "Convex")!,
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.div variants={fadeUp} custom={0} className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10">
            <Layers className="h-4 w-4 text-secondary" />
          </div>
          <h2 className="text-2xl font-bold">Core Stack</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="group hover:bg-primary/10 hover:text-primary"
        >
          <Link href="/skills">
            All 24+ skills
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </motion.div>

      <motion.div variants={fadeUp} custom={1} className="skill-card-wrapper">
        {featuredSkills.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </motion.div>
    </motion.section>
  );
};

const FeaturedProjects = () => {
  const featured = projects.filter((p) => p.status === "live").slice(0, 3);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.div variants={fadeUp} custom={0} className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Code className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Featured Projects</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="group hover:bg-primary/10 hover:text-primary"
        >
          <Link href="/projects">
            View All
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </motion.div>

      <div className="space-y-4">
        <motion.div variants={fadeUp} custom={1}>
          <ProjectCard project={featured[0]} featured />
        </motion.div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {featured.slice(1).map((project, i) => (
            <motion.div key={project.name} variants={fadeUp} custom={i + 2}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const CTASection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="mb-8"
    >
      <motion.div
        variants={fadeUp}
        custom={0}
        className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/60 to-secondary/10 p-8 text-center backdrop-blur-xl md:p-12"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-secondary/10 blur-[80px]" />

        <div className="relative z-10">
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            Ready to build something{" "}
            <span className="text-gradient">amazing</span>?
          </h2>
          <p className="mx-auto mb-6 max-w-lg text-muted-foreground">
            Whether it&apos;s an AI-powered app, a workflow automation, or a
            full-stack platform — let&apos;s make it happen.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="group bg-primary px-8 text-base font-semibold hover:bg-primary/90"
              asChild
            >
              <Link href="/contact">
                Start a Conversation
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/50 px-8 text-base hover:bg-card/80"
              asChild
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default function Home() {
  return (
    <div className="mx-auto mt-2 w-full max-w-5xl">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <FeaturedSkills />
      <FeaturedProjects />
      <CTASection />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <Quote />
      </motion.div>
    </div>
  );
}
