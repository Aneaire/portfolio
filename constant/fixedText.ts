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
  title: "Software Developer & Multi-agent AI Orchestration Specialist",
  description:
    "Hello! I'm Angelo Santiago, a Software Developer specializing in AI-powered automation and data engineering solutions. I combine strong software engineering fundamentals with cutting-edge AI tools and data processing technologies to build applications that not only function flawlessly but also drive business efficiency. My expertise spans full-stack development, workflow automation, AI-enhanced development practices, and scalable data pipeline architecture using Claude, Codex, and OpenCode. This comprehensive focus ensures clients receive robust, scalable software solutions that deliver 40-60% faster development cycles while maintaining exceptional quality and reducing operational costs.",
  others: [
    {
      title: "Multi-agent Orchestration & Agentic RAG Solutions",
      description:
        "I design and implement streamlined multi-agent systems powered by Agentic AI and RAG architectures. Using modern orchestration frameworks, I build intelligent agents that collaborate, reason, and deliver context-aware responses at scale. My solutions leverage advanced AI patterns to automate complex workflows, enhance decision-making, and ensure reliable, production-ready systems that adapt to evolving business requirements.",
    },
    {
      title: "Full-Stack Software Development",
      description:
        "I build robust, scalable applications using modern frameworks like React, Next.js, Node.js, and TypeScript. My software engineering expertise ensures clean, maintainable code with proper architecture, testing, and deployment practices. From responsive web applications to mobile solutions, I deliver high-quality software that meets business requirements while following industry best practices for security, performance, and user experience.",
    },
    {
      title: "AI-Enhanced Workflow Automation",
      description:
        "I integrate AI automation with traditional software development to create intelligent workflows that boost productivity. Using Zapier, N8N, and custom Google Cloud Functions, I eliminate repetitive tasks and deliver 25%+ productivity gains. My solutions combine robust software architecture with AI-powered automation, ensuring reliable systems that handle complex business processes while reducing manual errors and operational overhead.",
    },
    {
      title: "AI-Powered Development Acceleration",
      description:
        "I leverage AI tools like Claude, Codex, and OpenCode to enhance traditional software development, achieving 40-60% faster delivery without compromising quality. This AI-assisted approach combines solid engineering practices with intelligent code generation, automated testing, and rapid prototyping. The result is faster time-to-market, reduced development costs, and competitive advantage while maintaining the reliability and maintainability of well-engineered software solutions.",
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
    name: "Skills",
    href: "/skills",
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
];

export type Project = {
  name: string;
  nameDesc: string;
  desc: string;
  image: string;
  link: string;
  status: "live" | "upcoming" | "down";
};

export const projects: Project[] = [
  {
    name: "HiGantic",
    nameDesc: "AI Agent Builder Platform",
    desc: "HiGantic is a full-stack SaaS platform for creating and managing custom AI agents through conversation. Users build specialized agents with persistent memory, 50+ built-in tools, autonomous workspaces (tasks, notes, spreadsheets), event-driven automations, and integrations with Slack, Notion, Google Workspace, and more. Built as a monorepo with React 19, Convex for real-time backend, Hono for the agent runtime, and Claude Agent SDK powering the agentic loop via MCP. Features multi-model support, a credential vault, webhooks, scheduled actions, and inter-agent messaging.",
    image: "/higantic.png",
    link: "https://higantic.vercel.app/",
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
