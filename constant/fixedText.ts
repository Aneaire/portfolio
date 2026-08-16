export const skills = [
  "TypeScript",
  "React/Native",
  "Back-end",
  "Node JS / Hono",
  "Zapier",
  "N8N",
  "AI tools",
];

export const homeText = {
  title: "Full Stack Developer & AI Engineer",
  description:
    "Hello! I'm Angelo Santiago, a Full Stack Developer and AI Engineer focused on building scalable web applications, automation systems, and AI-powered tools. I combine strong software engineering fundamentals with practical AI implementation to create products that improve business efficiency and user experience. My experience spans frontend and backend development, workflow automation, agent-based applications, and data pipelines, supported by modern AI tooling that helps accelerate delivery while maintaining code quality, performance, and reliability.",
  others: [
    {
      title: "Full-Stack Development",
      description:
        "I build responsive, scalable web applications across the frontend and backend using modern JavaScript and TypeScript frameworks. My focus is clean architecture, strong performance, and reliable product delivery.",
    },
    {
      title: "AI Engineering",
      description:
        "I build AI-powered features, agent-based workflows, and automation systems that help teams move faster. My work includes practical AI integrations, RAG applications, and internal tools for real business use cases.",
    },
    {
      title: "CRM & Business Systems",
      description:
        "I connect HubSpot and Salesforce with websites, forms, APIs, and internal tools to keep customer data reliable and automate lead and lifecycle workflows.",
    },
  ],
};

export const personalInfo = {
  name: "Angelo Santiago",
  location: "Pampanga, Philippines",
  email: "gelosantiago.dev@gmail.com",
  number: "09757051714",
};

export const navLink: {
  name: string;
  href: string;
  variant: "outline" | "accent";
}[] = [
  {
    name: "Introduction",
    href: "/",
    variant: "outline",
  },
  {
    name: "Expertise",
    href: "/expertise",
    variant: "outline",
  },
  {
    name: "Skills",
    href: "/skills",
    variant: "outline",
  },
  {
    name: "Experience",
    href: "/experience",
    variant: "outline",
  },
  {
    name: "Projects",
    href: "/projects",
    variant: "outline",
  },

  {
    name: "Contact",
    href: "/contact",
    variant: "accent",
  },
];

export type ISKillList = {
  name: string;
  icon: string;
  desc: string;
  alt: string;
  link: string;
  invert?: boolean;
};

export const skillList = [
  {
    name: "TypeScript",
    icon: "/typescript.svg",
    desc: "TypeScript is a strongly typed programming language that builds on top of JavaScript, providing better tooling at any scale.",
    alt: "TypeScript icon representing a strongly typed programming language for scalable JavaScript applications",
    link: "https://www.typescriptlang.org/",
  },
  {
    name: "React",
    icon: "/react.svg",
    desc: "React is a popular JavaScript library for building user interfaces.",
    alt: "React icon representing a JavaScript library for building user interfaces",
    link: "https://reactjs.org/",
  },
  {
    name: "NextJS",
    icon: "/next-js.svg",
    desc: "Next.js is a powerful React framework that enables server-side rendering and enhanced SEO.",
    alt: "Next.js icon representing a React framework for server-side rendering and SEO",
    link: "https://nextjs.org/",
    invert: true,
  },
  {
    name: "React Native",
    icon: "/android.svg",
    desc: "React Native is a framework for building native mobile applications using JavaScript and React.",
    alt: "React Native icon representing a framework for building native mobile applications",
    link: "https://reactnative.dev/",
  },
  {
    name: "Node JS",
    icon: "/nodejs.svg",
    desc: "Node.js is a JavaScript runtime that allows server-side execution of JavaScript code, built on Chrome's V8 engine.",
    alt: "Node.js icon representing a JavaScript runtime for server-side code execution",
    link: "https://nodejs.org/",
  },
  {
    name: "Figma",
    icon: "/figma.svg",
    desc: "Figma is a collaborative design tool used for creating user interfaces for web and mobile applications.",
    alt: "Figma icon representing a collaborative design tool for web and mobile applications",
    link: "https://www.figma.com/",
  },
  {
    name: "TailwindCSS",
    icon: "/tailwind.svg",
    desc: "Tailwind CSS is a utility-first CSS framework that allows for rapid UI development.",
    alt: "Tailwind CSS icon representing a utility-first CSS framework for rapid UI development",
    link: "https://tailwindcss.com/",
  },
  {
    name: "Shadcn UI",
    icon: "/shadcn.svg",
    desc: "Shadcn UI is a modern UI framework designed for building visually appealing web applications.",
    alt: "Shadcn UI icon representing a modern UI framework for web application development",
    link: "https://ui.shadcn.com",
    invert: true,
  },
  {
    name: "Git & GitHub",
    icon: "/git.svg",
    desc: "Git & GitHub are essential tools for version control and collaborative software development.",
    alt: "Git & GitHub icon representing tools for version control and collaborative development",
    link: "https://github.com/",
  },
  {
    name: "Docker",
    icon: "/docker.svg",
    desc: "Docker is a platform for developing, shipping, and running applications inside containers.",
    alt: "Docker icon representing a containerization platform for application development and deployment",
    link: "https://www.docker.com/",
  },
  {
    name: "Stripe",
    icon: "/stripe-4.svg",
    desc: "Stripe is a powerful payment processing platform used by businesses to handle online transactions.",
    alt: "Stripe icon representing a payment processing platform for online transactions",
    link: "https://stripe.com/",
  },
  {
    name: "Paymongo",
    icon: "/paymongo.svg",
    desc: "Paymongo is a payment gateway service, particularly popular in the Philippines for handling Gcash payments.",
    alt: "Paymongo icon representing a payment gateway service for Gcash payments",
    link: "https://www.paymongo.com/",
  },
  {
    name: "Posthog",
    icon: "/posthog.svg",
    desc: "Posthog is a comprehensive data analytics platform designed for tracking and understanding user behavior.",
    alt: "Posthog icon representing a data analytics platform for user behavior tracking",
    link: "https://posthog.com/",
  },
  {
    name: "Appwrite",
    icon: "/appwrite.svg",
    desc: "Appwrite is a Backend as a Service (BaaS) platform that simplifies backend development with secure and scalable solutions.",
    alt: "Appwrite icon representing a BaaS platform for secure and scalable backend development",
    link: "https://appwrite.io/",
  },
  {
    name: "Supabase",
    icon: "/supabase.svg",
    desc: "Supabase is an open-source database platform that provides an easy and scalable backend for modern web applications.",
    alt: "Supabase icon representing an open-source database platform for modern web applications",
    link: "https://supabase.com/",
  },
  {
    name: "PostgresQL",
    icon: "/postgresql.svg",
    desc: "PostgreSQL is a robust open-source relational database management system known for its reliability and performance.",
    alt: "PostgreSQL icon representing an open-source relational database management system",
    link: "https://www.postgresql.org/",
  },
  {
    name: "Drizzle",
    icon: "/drizzle.png",
    desc: "Drizzle is a lightweight database toolkit designed to simplify backend development with a focus on security and ease of use.",
    alt: "Drizzle icon representing a lightweight database toolkit for secure and easy backend development",
    link: "https://drizzle.team/",
  },
  {
    name: "Mapbox",
    icon: "/mapbox.svg",
    desc: "Mapbox is a powerful map API that enables the integration of custom maps into web and mobile applications.",
    alt: "Mapbox icon representing a map API for custom maps in web and mobile applications",
    link: "https://www.mapbox.com/",
  },
  {
    name: "N8N",
    icon: "/n8n.svg",
    desc: "n8n is a powerful workflow automation tool that enables you to connect various apps and automate tasks with a visual interface.",
    alt: "n8n icon representing a workflow automation tool for connecting apps and automating tasks",
    link: "https://n8n.io/",
  },
  {
    name: "Zapier",
    icon: "/zapier.png",
    desc: "Zapier is a popular automation platform that allows you to integrate and automate workflows between thousands of apps without code.",
    alt: "Zapier icon representing an automation platform for integrating and automating workflows",
    link: "https://zapier.com/",
  },
  {
    name: "Claude",
    icon: "/claude.svg",
    desc: "Claude is an advanced AI assistant that accelerates software development through intelligent code generation, debugging, and optimization.",
    alt: "Claude icon representing an AI assistant for accelerated software development",
    link: "https://claude.ai/",
  },
  {
    name: "OpenCode",
    icon: "/opencode.svg",
    desc: "OpenCode is an AI-powered development tool that enhances coding productivity with intelligent assistance and automation.",
    alt: "OpenCode icon representing an AI-powered development tool for enhanced productivity",
    link: "https://opencode.ai/",
  },
  {
    name: "Convex",
    icon: "/convex.png",
    desc: "Convex is a backend platform that provides a database, serverless functions, and real-time subscriptions for building full-stack applications.",
    alt: "Convex icon representing a backend platform for full-stack applications",
    link: "https://convex.dev/",
  },
  {
    name: "T3 Code",
    icon: "/t3code.svg",
    desc: "T3 Code is an AI-powered coding agent built by Ping.gg that runs in your terminal, helping you write, refactor, and debug code through natural language conversation.",
    alt: "T3 Code icon representing an AI-powered terminal coding agent",
    link: "https://github.com/pingdotgg/t3code",
  },
  {
    name: "Bun",
    icon: "/bun.svg",
    desc: "Bun is an all-in-one JavaScript runtime, bundler, transpiler, and package manager built for speed, designed as a drop-in replacement for Node.js.",
    alt: "Bun icon representing a fast JavaScript runtime and package manager",
    link: "https://bun.sh/",
  },
  {
    name: "Google Services",
    icon: "/google.svg",
    desc: "Google Services covers a broad suite of APIs and platforms including Google Maps, Gmail, Google Calendar, Drive, OAuth, and Cloud services for building integrated applications.",
    alt: "Google icon representing Google APIs and services",
    link: "https://developers.google.com/",
  },
  {
    name: "Pi",
    icon: "/pi.svg",
    desc: "Pi is a developer platform by Inflection AI for building and deploying AI-powered applications with conversational intelligence.",
    alt: "Pi icon representing a developer platform for AI-powered applications",
    link: "https://pi.dev/",
  },
  {
    name: "Pinecone",
    icon: "/pinecone.png",
    desc: "Pinecone is a managed vector database built for AI applications, enabling fast and scalable similarity search for RAG pipelines and semantic search.",
    alt: "Pinecone icon representing a managed vector database for AI and RAG applications",
    link: "https://www.pinecone.io/",
  },
  {
    name: "Ollama",
    icon: "/ollama.png",
    desc: "Ollama is a tool for running large language models locally, enabling private and offline AI inference without relying on cloud APIs.",
    alt: "Ollama icon representing a local LLM runtime for private AI inference",
    link: "https://ollama.com/",
    invert: true,
  },
  {
    name: "AI SDK",
    icon: "/ai-sdk.svg",
    desc: "AI SDK is a TypeScript toolkit for building AI-powered applications with a unified API across multiple LLM providers like OpenAI, Anthropic, and Google.",
    alt: "AI SDK icon representing a TypeScript toolkit for building AI applications",
    link: "https://ai-sdk.dev/",
  },
  {
    name: "Agent SDK",
    icon: "/claude.svg",
    desc: "Claude Agent SDK enables programmatic interaction with Claude Code, allowing developers to build applications that leverage Claude's capabilities for code generation, tool execution, and agentic workflows.",
    alt: "Claude Agent SDK icon representing Anthropic's SDK for building agentic applications",
    link: "https://github.com/anthropics/claude-code-sdk-python",
  },
  {
    name: "Railway",
    icon: "/railway.svg",
    desc: "Railway is a cloud platform for deploying, managing, and scaling applications and databases with instant deployments and infrastructure automation.",
    alt: "Railway icon representing a cloud deployment platform for applications",
    link: "https://railway.app/",
  },
  {
    name: "HubSpot",
    icon: "/hubspot.svg",
    desc: "HubSpot is a CRM platform for managing marketing, sales, customer service, content, and business automation in one connected system.",
    alt: "HubSpot icon representing a CRM platform for marketing, sales, and customer automation",
    link: "https://www.hubspot.com/",
  },
  {
    name: "Salesforce",
    icon: "/salesforce.svg",
    desc: "Salesforce is a cloud CRM platform for building connected sales, service, marketing, analytics, and business workflows.",
    alt: "Salesforce icon representing a cloud CRM platform for sales, service, and business workflows",
    link: "https://www.salesforce.com/",
  },
];

export type Project = {
  name: string;
  nameDesc: string;
  desc: string;
  image: string;
  link?: string;
  tools?: string[];
  status: "live" | "upcoming" | "down";
};

export const projects: Project[] = [
  {
    name: "HiGantic",
    nameDesc: "Owner · AI Agent Builder Platform",
    desc: "HiGantic is a full-stack SaaS platform for creating and managing custom AI agents through conversation. Users build specialized agents with persistent memory, 50+ built-in tools, autonomous workspaces (tasks, notes, spreadsheets), event-driven automations, and integrations with Slack, Notion, Google Workspace, and more. Built as a monorepo with React 19, Convex for real-time backend, Hono for the agent runtime, and the AI SDK by Vercel powering the agentic loop with multi-model support. Features a credential vault, webhooks, scheduled actions, and inter-agent messaging.",
    image: "/higantic.png",
    link: "https://higantic.com",
    status: "live",
  },
  {
    name: "Hometown Roofing TX",
    nameDesc: "Roofing & Restoration Business Site",
    desc: "Completely rebuilt the Hometown Roofing & Restoration website from Wix to a custom React application — delivering a faster, fully responsive, and maintainable site. Migrated all existing content and pages while modernizing the UI. Implemented form automations using n8n to handle lead capture and service inquiries, and set up automated email drip campaigns to nurture prospects from first contact through follow-up — replacing manual outreach with a hands-off pipeline that runs on submission.",
    image: "/hometownroofing.png",
    link: "https://www.hometownroofingtx.com",
    status: "live",
  },
  {
    name: "Hometown AI",
    nameDesc: "Internal AI Platform — Hometown Roofing & Restoration TX",
    desc: "A web-accessible internal AI platform built exclusively for Hometown Roofing & Restoration TX employees. Features a Sales Training Mode where the AI role-plays as a homeowner across real-world scenarios (cold calls, door knocks, insurance claims, storm chaser skeptics) so reps can practice pitches before going into the field. Includes a Knowledge Base powered by RAG (Retrieval-Augmented Generation) — company documents, SOPs, and FAQs are embedded and retrieved at query time, giving the AI grounded, company-specific answers instead of hallucinated ones. Also provides a Basic Chat for general employee queries, image generation for marketing and field use, and an admin layer for managing users and content. Extended the RAG layer into a public-facing API so the same company knowledge base powers customer-side queries on the main site — letting homeowners get accurate, context-aware answers about services, claims, and coverage without ever reaching a human. Built to give every employee — from new trainees to senior reps — on-demand access to AI without needing any technical background.",
    image: "/hometown-ai.png",
    status: "live",
  },
  {
    name: "WellChat AI",
    nameDesc: "AI Mental Health Companion",
    desc: "WellChat is an AI-powered mental health support platform featuring adaptive persona-based therapy conversations powered by Google Gemini. A dual-AI architecture selects the best therapeutic persona (Empathetic Listener, Supportive Guide, Motivational Coach) per message, with crisis detection that overrides usage limits. Includes session management, a role-play training system, an audiobook library, a story maker, and a full admin dashboard. Built with React 19, TanStack Router, Convex for real-time backend, Clerk auth, and a premium subscription system via PayMongo.",
    image: "/aicompanion.png",
    link: "https://wellchat-omega.vercel.app/",
    status: "live",
  },
  {
    name: "François Portfolio",
    nameDesc: "Creative Multimedia Portfolio",
    desc: "A personal portfolio site built for Francis Pangilinan — a multimedia specialist offering Graphic Design, Video Editing, and Web Design. Features a cinematic hero with video showreel, a varied portfolio grid, service listings, and client testimonials. Built with Next.js and React 19, with a dark editorial aesthetic designed to let the creative work take center stage.",
    image: "/francois.png",
    status: "live",
    link: "https://francois-portfolio-nu.vercel.app/",
  },
  {
    name: "n8n Automation Suite",
    nameDesc: "Business Workflow Automations",
    desc: "A collection of production n8n workflows hosted on Railway, powering end-to-end business automation — from lead capture to campaign delivery. Includes webhook-driven contact forms, quote request handlers, booking report generators, hero assessment notifications, and automated email drip campaigns. Also handles data processing pipelines that transform raw incoming data into clean, readable formats for downstream consumption. Each workflow integrates with external services and internal APIs, replacing manual processes with event-driven pipelines that trigger on form submission, schedule, or API call — handling everything from customer inquiries to internal team notifications without human intervention.",
    image: "/n8n-automations.png",
    status: "live",
  },
  {
    name: "ANEAIRE AI Coding Agent",
    nameDesc: "Internal AI Developer Tooling",
    desc: "Designed and deployed a custom AI coding agent for the ANEAIRE tech team — purpose-built around the company's infrastructure, codebase conventions, and internal tooling. Unlike generic AI assistants, this agent is context-aware from day one: it understands the team's architecture (Convex, Next.js, Hono, Claude SDK), reads project-specific files, and retains knowledge across the conversation to provide increasingly accurate suggestions. Enables every engineer to leverage AI pair-programming at the company level — accelerating feature delivery, reducing onboarding time for new devs, and keeping the entire team aligned on internal patterns and best practices.",
    image: "/aneaire-agent.png",
    status: "live",
  },
  {
    name: "SchoolSync Scheduler",
    nameDesc: "Scheduler App",
    desc: "Scheduler is a web-based application for efficiently managing and organizing class schedules in educational institutions. Built with Next.js and TypeScript, it features a modern tech stack including React for the frontend, Drizzle ORM for database management, TursoDB for data storage, and TanStack tools (such as React Query) for advanced data fetching and state management. The application is structured with well-defined API routes to handle backend operations, while the frontend seamlessly interacts with these APIs to provide a responsive and user-friendly scheduling experience. This setup streamlines the assignment of courses, teachers, rooms, and sections, helping administrators avoid conflicts and optimize scheduling.",
    image: "/scheduler.png",
    link: "https://school-schedule-management-frds.vercel.app/",
    status: "live",
  },
  {
    name: "Noonu",
    nameDesc: "Anime Streaming App",
    desc: "A platform designed for anime streaming, built with Next.js and utilizing Tanstack Query for efficient API request management. The site features server-side caching for optimal performance and uses cookies to track watched episodes and previously viewed anime, ensuring a personalized and seamless user experience.",
    image: "/anime.png",
    link: "https://noonu.vercel.app/",
    status: "live",
  },
  {
    name: "Moonu",
    nameDesc: "Manga App",
    desc: "A platform designed for manga reading, built with Next.js and utilizing Tanstack Query for efficient API request management. The site features server-side caching for optimal performance and uses cookies to track read chapters and previously viewed manga, ensuring a personalized and seamless user experience ( credit to mangadex API ).",
    image: "/manga.png",
    link: "https://moonu.vercel.app/",
    status: "live",
  },
  {
    name: "Lets Be Friend’s",
    nameDesc: "Web & Mobile App",
    desc: "Let's Be Friends is a social networking app built with React 18, featuring a page-based router for intuitive navigation. The app leverages Appwrite for backend services and integrates Node.js with Express to enhance security, particularly for its messaging and payment features. Given the high level of user interaction, stringent document security measures are implemented. The application is hosted on Hostinger and utilizes Tailwind CSS and Shadcn for modern and responsive design. For the payment processing, Let's Be Friends uses PayMongo, ensuring secure and seamless transactions.",
    image: "/lbf.png",
    link: "https://letsbefriends.site/",
    status: "down",
  },
  {
    name: "Personalized Gallery",
    nameDesc: "Manga App",
    desc: "Personalized Gallery is an innovative app designed to offer users a curated and personalized collection of images and media. Built using the T3 Stack, which includes Next.js, TypeScript, and Tailwind CSS, the app provides a smooth and modern user experience. It leverages Drizzle ORM for seamless database interactions with PostgreSQL, ensuring robust data management and type safety across the application. Deployed on Vercel, Personalized Gallery guarantees high performance and reliability. The app also integrates PostHog for advanced analytics, allowing for detailed insights into user behavior and app usage, which helps in continuously refining and enhancing the user experience.",
    image: "/t3gallery.png",
    link: "https://gel-gallery.vercel.app/",
    status: "live",
  },
  {
    name: "Mihon",
    nameDesc: "web for discovering anime's",
    desc: "A Platform designed for Discovering anime, built with plaine HTML, CSS and Javascript. with the help of Anime API https://api.jikan.moe/v4/top/anime.",
    image: "/mihon.png",
    link: "https://mihon-angelo.tiiny.site/",
    status: "live",
  },
];
