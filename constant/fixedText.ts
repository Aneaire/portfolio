export const skills = [
  "TypeScript",
  // Frontend Development
  "React",
  "React Native",
  "NextJS",
  "TailwindCSS",

  // Backend Development
  "Express",
  "Appwrite",
  "NodeJS",

  // Database
  "Postgres",
  "Supabase",
  "Drizzle",

  // DevOps and Tools
  "Docker",
  "Git",
];

export const homeText = {
  title: "The Journey of a Productive Developer",
  description:
    "Hello! I'm Angelo Santiago, a passionate and productive developer dedicated to crafting elegant and efficient solutions. In the dynamic world of technology, being productive isn't just about writing code; it's about mastering workflows, optimizing processes, and continuously learning. I believe that productivity stems from a blend of technical expertise, time management, and a collaborative spirit. My approach ensures that I deliver high-quality projects that not only meet but exceed expectations.",
  others: [
    {
      title: "Embracing Continuous Learning",
      description:
        "Productivity, to me, is also about staying curious and adaptable. The tech landscape is constantly evolving, and I thrive on exploring new trends, tools, and methodologies. Whether it's diving into a new programming language, experimenting with the latest frameworks, or understanding emerging technologies like AI and blockchain, I am always eager to expand my skill set. This commitment to learning ensures that my solutions are not only current but also innovative and robust.",
    },
    {
      title: "Building and Collaborating",
      description:
        "Being a productive developer means more than just individual work. I value collaboration and believe in the power of community. Engaging with other developers, participating in open-source projects, and contributing to developer communities are integral parts of my professional life. This collaborative spirit helps me stay connected with the broader tech ecosystem, learn from others, and share my knowledge.",
    },
    {
      title: "Crafting User-Centric Solutions",
      description:
        "At the heart of my work is a focus on the end-user. I aim to create intuitive and user-friendly applications that provide real value. My development process involves constant feedback loops, user testing, and a keen eye on user experience (UX) principles. This approach helps in building applications that are not only functional but also delightful to use.",
    },
    {
      title: "Sharing Knowledge and Experiences",
      description:
        "I believe in sharing what I learn. Through blogs, talks, and tutorials, I enjoy teaching others and demystifying complex concepts. This not only reinforces my understanding but also helps the community grow. Whether you're a seasoned developer or just starting out, I hope my insights can inspire and assist you in your own journey.",
    },
  ],
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
    name: "Capabilities",
    href: "/capabilities",
    variant: "outline",
  },
  {
    name: "Contact",
    href: "/contact",
    variant: "accent",
  },
];

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
];
