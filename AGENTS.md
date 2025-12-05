# AGENTS.md

## Build/Lint/Test Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint (Next.js core web vitals)
- No test framework configured

## Code Style Guidelines

### Imports & Structure
- Use named exports for components
- Structure files: exported component, subcomponents, helpers, static content, types
- Use `@/*` path aliases

### TypeScript
- Strict mode enabled
- Prefer interfaces over types
- Use functional components with TypeScript interfaces
- Avoid enums; use maps instead

### Naming Conventions
- Lowercase with dashes for directories (e.g., `components/auth-wizard`)
- Descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`)

### Formatting
- Prettier with Tailwind CSS plugin
- Declarative JSX
- Concise syntax for simple statements

### UI & Styling
- Shadcn UI, Radix UI, and Tailwind CSS
- Mobile-first responsive design
- Minimize 'use client'; favor React Server Components

### Performance
- Limit 'use client' to small components needing Web APIs
- Use Suspense with fallbacks for client components
- Dynamic loading for non-critical components
- Optimize images (WebP, lazy loading)

## Cursor Rules
You are an expert in TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI and Tailwind.

- Write concise, technical TypeScript code with accurate examples
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use 'nuqs' for URL search parameter state management
- Optimize Web Vitals (LCP, CLS, FID)
- Follow Next.js docs for Data Fetching, Rendering, and Routing