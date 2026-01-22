# IT Specialist & Full-Stack Development Interview Q&A

## Technical Foundation

### Q1: Walk through your typical tech stack and why you chose those technologies.
**Answer:**
**My primary stack:**

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React/Next.js + TypeScript | Type safety, excellent DX, server-side rendering |
| **Styling** | Tailwind CSS + Shadcn UI | Rapid development, consistent design system |
| **Backend** | Node.js + Hono | Fast, lightweight, great TypeScript support |
| **Database** | PostgreSQL + Drizzle ORM | Type-safe queries, reliable, scalable |
| **Auth** | Custom JWT or Supabase Auth | Flexibility vs speed tradeoff |
| **Hosting** | Vercel / Cloud Run | Easy deployment, auto-scaling |
| **Automation** | N8N / Zapier | Connect systems, automate workflows |

**Why this combination:**
- Full TypeScript end-to-end for type safety
- Modern tooling that increases development speed
- Scalable from MVP to production
- Great developer experience reduces bugs

---

### Q2: Explain how you approach database design for a new project.
**Answer:**
**My process:**

1. **Understand requirements**: What data entities exist? How do they relate?

2. **Identify core entities**: Users, their actions, and business objects

3. **Define relationships**:
   - One-to-many (User → Orders)
   - Many-to-many (Products ↔ Categories)
   - One-to-one (User → Profile)

4. **Design schema with Drizzle**:
   ```typescript
   export const users = pgTable('users', {
     id: uuid('id').primaryKey().defaultRandom(),
     email: varchar('email', { length: 255 }).notNull().unique(),
     createdAt: timestamp('created_at').defaultNow(),
   });

   export const orders = pgTable('orders', {
     id: uuid('id').primaryKey().defaultRandom(),
     userId: uuid('user_id').references(() => users.id),
     status: varchar('status', { length: 50 }).notNull(),
   });
   ```

5. **Optimize**:
   - Add indexes for frequently queried columns
   - Consider denormalization for read-heavy workloads
   - Plan for soft deletes if needed

---

### Q3: How do you ensure application security?
**Answer:**
**Security checklist I follow:**

**Authentication & Authorization:**
- Secure password hashing (bcrypt, argon2)
- JWT with short expiry + refresh tokens
- Role-based access control (RBAC)
- Validate permissions on every request

**Input validation:**
- Sanitize all user inputs
- Use parameterized queries (Drizzle handles this)
- Validate on both client and server

**Infrastructure:**
- HTTPS everywhere
- Secure HTTP headers (CORS, CSP, HSTS)
- Environment variables for secrets
- Regular dependency updates

**Data protection:**
- Encrypt sensitive data at rest
- Audit logging for sensitive operations
- Data backup and recovery plans

**OWASP Top 10 awareness:**
- Injection, XSS, CSRF prevention
- Broken authentication checks
- Security misconfiguration reviews

---

### Q4: Describe your development workflow from feature request to deployment.
**Answer:**
**My workflow:**

1. **Requirements**:
   - Clarify scope with stakeholders
   - Break down into user stories/tasks
   - Estimate complexity

2. **Planning**:
   - Design database changes
   - Plan API endpoints
   - Sketch UI components

3. **Development**:
   - Create feature branch
   - Write code with AI assistance
   - Write tests alongside code
   - Self-review before PR

4. **Review & Testing**:
   - Create pull request with clear description
   - Automated tests run (CI/CD)
   - Code review by team
   - Address feedback

5. **Deployment**:
   - Merge to main
   - Automatic deployment to staging
   - QA verification
   - Production deployment
   - Monitor for issues

---

### Q5: How do you handle state management in React applications?
**Answer:**
**My approach by scale:**

**Simple apps**: React's built-in useState/useReducer + Context
```typescript
const [user, setUser] = useState<User | null>(null);
```

**Medium complexity**: Zustand (lightweight, simple)
```typescript
const useStore = create<Store>((set) => ({
  users: [],
  addUser: (user) => set((state) => ({
    users: [...state.users, user]
  })),
}));
```

**Server state**: TanStack Query (React Query)
```typescript
const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});
```

**Why I prefer Zustand + React Query:**
- Separates server state from UI state
- Automatic caching, refetching, synchronization
- Minimal boilerplate
- Great DevTools

---

## Problem-Solving

### Q6: How would you debug a slow-loading page?
**Answer:**
**Systematic approach:**

1. **Identify the bottleneck**:
   - Browser DevTools → Network tab: Slow API calls?
   - Performance tab: Expensive renders?
   - Lighthouse audit: Overall metrics

2. **Common culprits and fixes**:

   | Issue | Solution |
   |-------|----------|
   | Large bundle | Code splitting, lazy loading |
   | Slow API | Add caching, optimize queries |
   | Too many renders | React.memo, useMemo, useCallback |
   | Large images | Next/Image optimization, WebP |
   | No caching | Implement HTTP caching, CDN |
   | N+1 queries | Eager loading, batching |

3. **Implementation example**:
   ```typescript
   // Before: loads everything
   import HeavyComponent from './HeavyComponent';

   // After: lazy load
   const HeavyComponent = lazy(() => import('./HeavyComponent'));
   ```

4. **Measure again**: Verify improvements with metrics

---

### Q7: Describe how you would set up a new project from scratch.
**Answer:**
**My setup process:**

1. **Initialize**:
   ```bash
   npx create-next-app@latest my-app --typescript --tailwind --app
   cd my-app
   ```

2. **Add tooling**:
   - ESLint + Prettier configuration
   - Husky for pre-commit hooks
   - VS Code settings for team

3. **Database setup**:
   ```bash
   npm install drizzle-orm postgres
   npm install -D drizzle-kit
   ```

4. **Project structure**:
   ```
   /app          # Next.js app router
   /components   # Reusable UI components
   /lib          # Utilities, API clients
   /db           # Schema, migrations
   /hooks        # Custom React hooks
   /types        # TypeScript types
   ```

5. **Environment setup**:
   - `.env.example` with required variables
   - Development and production configs

6. **CI/CD**:
   - GitHub Actions for testing
   - Vercel/Railway for deployment

---

### Q8: How do you handle errors and logging in production applications?
**Answer:**
**Error handling strategy:**

**Frontend:**
```typescript
// Global error boundary
class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    // Log to service like Sentry
    logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

**Backend:**
```typescript
// Centralized error handler
app.use((err, req, res, next) => {
  logger.error({
    error: err.message,
    stack: err.stack,
    path: req.path,
    userId: req.user?.id,
  });

  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Something went wrong'
      : err.message
  });
});
```

**Logging best practices:**
- Structured logging (JSON format)
- Log levels (error, warn, info, debug)
- Include context (user ID, request ID)
- Never log sensitive data (passwords, tokens)
- Use services like Posthog for analytics

---

### Q9: Explain Docker and how you use it in development.
**Answer:**
**Docker basics:**
Docker packages applications with their dependencies into containers that run consistently anywhere.

**How I use it:**

**Development environment:**
```dockerfile
# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret
```

**Benefits:**
- Consistent environment across team
- Easy to spin up databases, caches
- Mirrors production environment
- Simple onboarding for new developers

---

### Q10: How do you approach learning new technologies quickly?
**Answer:**
**My learning framework:**

1. **Understand the "why"**: What problem does it solve? Why is it better?

2. **Official docs first**: Get the canonical understanding

3. **Build something small**: Todo app, API client - hands-on learning

4. **Use AI assistance**: Ask Claude to explain concepts, review code

5. **Read real codebases**: See how others use it in production

6. **Teach it**: Writing about it or explaining to others solidifies understanding

**Recent example:**
*"When learning Drizzle ORM, I:
1. Read the docs to understand the type-safe query approach
2. Built a simple CRUD API
3. Used Claude to explain the query builder patterns
4. Migrated a small existing project from Prisma
5. Now I can confidently use it in production"*

**Time allocation:**
- 20% reading/watching
- 80% building and experimenting
