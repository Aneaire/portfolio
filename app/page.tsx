"use client";

import SkillCard from "@/components/Common/SkillCard";
import Quote from "@/components/Common/Quote";
import { homeText, projects, skillList } from "@/constant/fixedText";
import ProjectCard from "./projects/ProjectCard";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
      isDeleting ? 40 : 90,
    );
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <span className="text-primary">|</span>
    </span>
  );
};

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

const HeroSection = () => {
  const [previewVisible, setPreviewVisible] = useState(false);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="relative mb-16 overflow-hidden border border-border"
    >
      {/* Video background */}
      <video
        src="/showreel.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      {/* Dark gradient overlay — heavier on the left where text lives */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
      <div className="relative px-8 pt-8 pb-12">
      <motion.div variants={fadeUp} custom={0} className="mb-5 flex items-center gap-3">
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Available for opportunities
        </span>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        custom={1}
        className="mb-2 text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-7xl"
      >
        I build things
        <br />
        that work.
      </motion.h1>

      <motion.div
        variants={fadeUp}
        custom={1.5}
        className="mb-4 text-xl font-medium text-muted-foreground md:text-2xl"
      >
        <TypeWriter
          words={[
            "AI-powered apps",
            "multi-agent systems",
            "full-stack solutions",
            "smart automations",
          ]}
          className="text-primary font-semibold"
        />
      </motion.div>

      <motion.p
        variants={fadeUp}
        custom={2}
        className="mb-10 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base"
      >
        Software Developer & AI Automation Specialist. Full-stack engineering
        combined with Claude, Codex, and multi-agent orchestration — shipping
        production systems 40–60% faster.
      </motion.p>

      <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          See My Work
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Let&apos;s Talk
        </Link>
      </motion.div>
      </div>

      {/* Hover trigger zone — right half, desktop only */}
      <div
        className="absolute inset-y-0 right-0 z-10 hidden w-1/2 md:flex items-center justify-center"
        onMouseEnter={() => setPreviewVisible(true)}
      >
        <div className="flex flex-col items-center gap-2 opacity-50">
          <ArrowRight className="h-8 w-8 text-foreground" />
          <span className="text-[10px] uppercase tracking-widest text-foreground">hover</span>
        </div>
      </div>

      {/* Full-card takeover — desktop only */}
      <AnimatePresence>
        {previewVisible && (
          <motion.div
            initial={{ clipPath: "inset(0 0 0 100%)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0 0%)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 0 100%)", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-20 hidden md:block"
            onMouseLeave={() => setPreviewVisible(false)}
          >
            <video
              src="/showreel.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const stats = [
  { value: "7+", label: "Projects Shipped" },
  { value: "24+", label: "Technologies" },
  { value: "40–60%", label: "Faster Delivery" },
  { value: "4", label: "Service Areas" },
];

const StatsSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="mb-16 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          variants={fadeUp}
          custom={i}
          className="flex flex-col items-center justify-center bg-card py-8 text-center"
        >
          <div className="text-3xl font-bold text-primary md:text-4xl">
            {stat.value}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="mb-16"
    >
      <motion.div variants={fadeUp} custom={0} className="mb-8">
        <p className="section-label mb-2">What I Do</p>
        <h2 className="text-2xl font-bold">Services</h2>
        <div className="mt-2 h-px w-8 bg-primary" />
      </motion.div>

      <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
        {homeText.others.map((service, index) => (
          <motion.div
            key={service.title}
            variants={fadeUp}
            custom={index + 1}
            className="bg-card p-6 transition-colors duration-200 hover:bg-muted"
          >
            <p className="section-label mb-3">0{index + 1}</p>
            <h3 className="mb-3 text-base font-semibold text-foreground">
              {service.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </motion.div>
        ))}
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
  ].filter(Boolean);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="mb-16"
    >
      <motion.div variants={fadeUp} custom={0} className="mb-6 flex items-end justify-between">
        <div>
          <p className="section-label mb-2">Tech</p>
          <h2 className="text-2xl font-bold">Core Stack</h2>
          <div className="mt-2 h-px w-8 bg-primary" />
        </div>
        <Link
          href="/skills"
          className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          All 24+ skills
          <ArrowRight className="h-3 w-3" />
        </Link>
      </motion.div>

      <motion.div variants={fadeUp} custom={1} className="skill-card-wrapper">
        {featuredSkills.map((skill) => (
          <SkillCard key={skill.name} {...skill} showDescription={false} />
        ))}
      </motion.div>
    </motion.section>
  );
};

const FeaturedProjects = () => {
  const featuredNames = ["Hometown Roofing TX", "HiGantic", "WellChat AI"];
  const featured = featuredNames
    .map((name) => projects.find((p) => p.name === name))
    .filter(Boolean) as typeof projects;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="mb-16"
    >
      <motion.div variants={fadeUp} custom={0} className="mb-6 flex items-end justify-between">
        <div>
          <p className="section-label mb-2">Work</p>
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <div className="mt-2 h-px w-8 bg-primary" />
        </div>
        <Link
          href="/projects"
          className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          View All
          <ArrowRight className="h-3 w-3" />
        </Link>
      </motion.div>

      <div className="space-y-px border border-border bg-border">
        <motion.div variants={fadeUp} custom={1}>
          <ProjectCard project={featured[0]} featured />
        </motion.div>
        <div className="grid grid-cols-1 gap-px md:grid-cols-2">
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
      viewport={{ once: true }}
      variants={stagger}
      className="mb-12"
    >
      <motion.div
        variants={fadeUp}
        custom={0}
        className="border border-border bg-card p-10 text-center md:p-16"
      >
        <p className="section-label mb-4">Next Step</p>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Ready to build something?
        </h2>
        <p className="mx-auto mb-8 max-w-md text-sm text-muted-foreground">
          Whether it&apos;s an AI-powered app, a workflow automation, or a
          full-stack platform — let&apos;s make it happen.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start a Conversation
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Download Resume
          </a>
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
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Quote />
      </motion.div>
    </div>
  );
}
