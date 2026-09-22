<h1 align="center">Navori Dashboard Starter</h1>

<div align="center">Navori's opinionated admin dashboard starter — Next.js 16, shadcn/ui, Tailwind CSS, TypeScript, and direct session auth against a Keystone 6 GraphQL backend</div>

<br />

<div align="center">
  <img src="/public/shadcn-dashboard.png" alt="Dashboard screenshot" style="max-width: 100%; border-radius: 8px;" />
</div>

<br />

<p align="center">
  <a href="https://github.com/navori/dashboard-starter/blob/main/LICENSE"><img src="https://img.shields.io/github/license/navori/dashboard-starter" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/Next.js-16-black" alt="Next.js" />
</p>

## Overview

A free, open source (MIT) admin dashboard starter built with Next.js 16, shadcn/ui on Base UI primitives, TypeScript, and Tailwind CSS v4.

Every feature is a working, production-ready implementation, not static demo UI. Tables search, filter, sort, and paginate for real. Forms validate and mutate with cache invalidation.
Auth authenticates directly against a Keystone 6 GraphQL backend end-to-end — same users/sessions as Keystone's Admin UI and any other client.

Clone it, strip what you don't need with the built-in cleanup script, and start building on patterns you'd write yourself. It works well as a base for SaaS apps, internal tools, and admin panels.

### Why This Template

Most dashboard templates are static demo boilerplates: screens that look finished but need rebuilding the moment you wire in real data. This starter takes the opposite approach:

- **Everything actually works.** Data tables run end-to-end: server prefetch, client-side React Query cache, and URL-synced search, filtering, sorting, and pagination via nuqs. Forms are built from reusable, composable fields with Zod validation, including advanced patterns like multi-step and dialog/sheet forms, with real create/update mutations and cache invalidation on success.
- **Industry-standard implementations.** The data layer follows the official TanStack Query SSR pattern (server prefetch + `HydrationBoundary` + `useSuspenseQuery`), typed end to end, organized in a feature-based structure with a clean API layer per feature. These are patterns you copy into production code as-is, not mockups you rebuild from scratch.
- **Minimal by design.** Deliberately lean, with no bloated boilerplate, so you spend your time tweaking it to your use case, not deleting someone else's code. The built-in [cleanup script](#cleanup-script-start-minimal-in-60-seconds) strips any feature you don't need in under a minute.

### Tech Stack

- Framework - [Next.js 16](https://nextjs.org/16)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - Direct session auth against [Keystone 6](https://keystonejs.com) via [Apollo Client](https://www.apollographql.com/docs/react)
- Error tracking - [Sentry](https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy26q2-nextjs&utm_content=github-banner-project-tryfree)
- Styling - [Tailwind CSS v4](https://tailwindcss.com)
- Components - [shadcn/ui](https://ui.shadcn.com) on [Base UI](https://base-ui.com) primitives
- Charts - [Recharts](https://recharts.org) • [Evil Charts](https://evilcharts.com/)
- Schema validation - [Zod](https://zod.dev)
- Data fetching - [TanStack React Query](https://tanstack.com/query)
- State management - [Zustand](https://zustand-demo.pmnd.rs)
- Search param state - [Nuqs](https://nuqs.47ng.com/)
- Tables - [TanStack Data Tables](https://ui.shadcn.com/docs/components/data-table) • [Dice Table](https://www.diceui.com/docs/components/data-table)
- Forms - [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev)
- Command+K interface - [kbar](https://kbar.vercel.app/)
- Linter / Formatter - [OxLint](https://oxc.rs/docs/guide/usage/linter) • [Oxfmt](https://oxc.rs/docs/guide/usage/formatter)
- Pre-commit hooks - [Husky](https://typicode.github.io/husky/)
- Themes - [tweakcn](https://tweakcn.com/)

_Looking for a TanStack Start version? Here's the [repo](https://git.new/tanstack-start-dashboard)._

## Features

- Pre-built dashboard layout with sidebar, header, and content area
- Analytics overview page with cards and charts
- Data tables with React Query prefetch, client-side cache, search, filter, and pagination
- Authentication against a Keystone GraphQL backend — same users/sessions as Keystone Admin UI and other clients
- Client-side RBAC navigation that filters menu items by the signed-in user's role
- Infobar component for tips, status messages, or contextual notes on any page
- shadcn/ui components on Base UI primitives, styled with Tailwind CSS
- Six-plus themes with a theme switcher
- Feature-based folder structure
- A starting point for SaaS dashboards, internal tools, and client admin panels

## Use Cases

A few things you can build with it:

- SaaS admin dashboards
- Internal tools and operations panels
- Analytics dashboards
- Client project admin panels
- A boilerplate for new Next.js shadcn projects

## Pages

| Page                                                                                                                                                                  | Notes                                                                                                                                                                                |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sign in                | Email/password login against Keystone's `authenticateUserWithPassword`, via a TanStack Form. |
| Dashboard Overview     | Cards and Recharts graphs. Parallel routes give each section its own loading and error state.                                                                                       |
| Product List (Table)   | TanStack Table plus React Query (server prefetch, client cache) with nuqs URL state for search, filter, and pagination. `shallow: true` keeps interactions on the client.           |
| Create Product Form    | TanStack Form and Zod with `useMutation` for create and update. Cache is invalidated on success.                                                                                    |
| Users (Table)          | Same setup as Products: React Query with nuqs, server prefetch, and client-side pagination and filtering.                                                                           |
| React Query Demo       | A Pokemon API example showing the server prefetch, `HydrationBoundary`, and `useSuspenseQuery` pattern with client-side cache. |
| Profile                | Reads the current Keystone session (name, email, role) — extend it to hit your own update-profile mutation. |
| Kanban Board           | Drag-and-drop task board built with dnd-kit and Zustand. Column sorting, priority badges, assignees, and due dates. |
| Chat                   | Messaging UI with a conversation list, message bubbles, quick replies, attachments, and an auto-reply demo. Multi-panel layout that works on mobile. |
| AI Chat                | Scripted AI chat that streams a predefined conversation through the real `useChat` lifecycle — no model, API route, or key. Built with the shadcn chat components (MessageScroller, Bubble, Marker). |
| Notifications          | Notification center with a header badge, popover preview, and a full page with All / Unread / Read tabs. Includes mark-as-read and mark-all-as-read. |
| Not Found              | A root-level not-found page.                                                                                                                                                        |
| Global Error           | A shared error page wired to Sentry for logging, reports, and session replay. |

## Folder Structure

```plaintext
src/
├── app/                           # Next.js App Router directory
│   ├── auth/                      # Auth pages (sign-in, sign-up)
│   ├── dashboard/                 # Dashboard route group
│   │   ├── overview/              # Analytics with parallel routes
│   │   ├── product/               # Product CRUD pages (React Query)
│   │   ├── users/                 # Users table (React Query + nuqs)
│   │   ├── react-query/           # React Query demo page
│   │   ├── kanban/                # Task board page
│   │   ├── chat/                  # Messaging page
│   │   ├── ai-chat/               # AI chat streaming demo
│   │   ├── notifications/         # Notifications page
│   │   └── profile/               # User profile
│   └── api/                       # API routes
│
├── components/                    # Shared components
│   ├── ui/                        # UI primitives (buttons, inputs, dialogs, etc.)
│   ├── layout/                    # Layout components (header, sidebar, etc.)
│   ├── themes/                    # Theme system (selector, mode toggle, config)
│   └── kbar/                      # Command+K interface
│
├── features/                      # Feature-based modules
│   ├── overview/                  # Dashboard analytics (charts, cards)
│   ├── products/                  # Product listing, form, tables (React Query)
│   ├── users/                     # User management table (React Query)
│   ├── react-query-demo/          # React Query demo (Pokemon API)
│   ├── kanban/                    # Drag-drop task board
│   ├── chat/                      # Messaging (conversations, bubbles, composer)
│   ├── ai-chat/                   # Scripted useChat streaming demo (shadcn chat UI)
│   ├── notifications/             # Notification center & store
│   ├── auth/                      # Auth components
│   └── profile/                   # Profile form schemas
│
├── lib/                           # Core utilities (query-client, searchparams, etc.)
├── hooks/                         # Custom hooks
├── config/                        # Navigation, infobar, data table config
├── constants/                     # Mock data
├── styles/                        # Global CSS & theme files
│   └── themes/                    # Individual theme CSS files
└── types/                         # TypeScript types
```

## Getting Started

> [!NOTE]
> This starter uses Next.js 16 (App Router) with React 19 and shadcn/ui. To run it locally:

Clone the repo:

```
git clone https://github.com/navori/dashboard-starter.git
```

- `bun install`
- Copy the example env file: `cp env.example.txt .env.local`
- Fill in the required variables in `.env.local`
- `bun run dev`

##### Environment variables

See `env.example.txt` for the variables you need. They cover authentication and error tracking.

##### Keystone auth setup

For setting up auth against your Keystone GraphQL backend, see [keystone_auth.md](./docs/keystone_auth.md). That doc also covers `bun run codegen`, wired up but not run against a real schema yet.

The app should now be running at http://localhost:3000.

> [!WARNING]
> After cloning or forking, be careful when pulling the latest changes. Updates can cause merge conflicts.

---

## Cleanup Script: Start Minimal in 60 Seconds

Most starters make you hand-delete demo pages and rip out dependencies. This one ships with a cleanup script that removes the optional features you don't need (folders, files, dependencies, docs, and env entries), leaving a minimal base to build on. Run `--list` to see what's removable:

```bash
bun run cleanup --interactive    # interactive mode
bun run cleanup --list           # see available features
bun run cleanup --dry-run chat   # preview before removing
bun run cleanup kanban chat      # remove specific features
```

Run `bun run cleanup --help` for all options (with npm, pass flags after `--`: `npm run cleanup -- --list`). The replacement files it writes live in `scripts/cleanup-templates/` as real, typechecked code. When you're done, delete `scripts/cleanup.js`, `scripts/cleanup-templates/`, and the `cleanup` entry in `package.json`.

## FAQ

**Is it production ready?**
Yes. Every feature is a complete, working implementation: authentication, CRUD flows, table search/filter/sort/pagination, and form validation with mutations all function end-to-end. It's a starting point for real applications, not a visual mockup.

**How is this different from other dashboard templates?**
Most dashboard templates are static demo boilerplates: screens that look finished but need rebuilding once you wire in real data. Here the tables, forms, and auth all work end-to-end, the implementations follow official TanStack and Next.js patterns, and a cleanup script keeps the base minimal so you tweak it to your use case instead of deleting code.

**Is it free for commercial use?**
Yes. MIT-licensed and free for both personal and commercial projects: no paid tier, no license keys.

**Can I use it without Keystone?**
Yes — auth is a thin layer (`src/graphql/auth.ts`, `src/lib/apollo/*`, `src/features/auth/*`) over a few standard GraphQL documents. Swap them for your own backend's mutations/queries, or a different identity provider entirely.

**How do I remove demo pages or features I don't need?**
Run `bun run cleanup --interactive` and pick what to strip, or `bun run cleanup --list` to see what can be removed.

**Does it support Next.js 16, React 19, and Tailwind CSS v4?**
Yes. The template is built on Next.js 16 (App Router), React 19, and Tailwind CSS v4, with shadcn/ui on Base UI primitives, and is actively maintained to track new releases.

**Can I use npm instead of Bun?**
Yes. Bun is preferred, but npm works too, and the repo even ships both Node.js and Bun Dockerfiles for deployment.

**Does it work with AI coding assistants?**
Yes. The repo ships AGENTS.md and CLAUDE.md with the project's conventions, plus a bundled Claude Code skill (`.claude/skills/kiranism-shadcn-dashboard`) that teaches agents how to add pages, tables, forms, and navigation the template way. Works with Claude Code, Cursor, and any tool that reads AGENTS.md.

**What data fetching pattern does it use?**
TanStack React Query with the official SSR pattern: `prefetchQuery` on the server, `HydrationBoundary` with `dehydrate` for hydration, and `useSuspenseQuery` on the client, plus nuqs for URL-synced search-param state. Mutations invalidate the cache on success.

**How do I deploy it?**
Deploy to Vercel out of the box, or use the included Docker setups: a Node.js Dockerfile and a Bun Dockerfile, both using Next.js standalone output mode. See the [deployment guide](./docs/deployment.md).

## Deploy

Deploy to Vercel out of the box, or use the included Docker setups: a Node.js Dockerfile and a Bun Dockerfile, both using Next.js standalone output mode. Full guide: [docs/deployment.md](./docs/deployment.md).

### Credits

This is Navori's opinionated fork of [Kiranism/next-shadcn-dashboard-starter](https://github.com/Kiranism/next-shadcn-dashboard-starter), the free, open source Next.js + shadcn/ui admin dashboard starter this template was originally built from. It's still MIT-licensed (see [LICENSE](./LICENSE)) — go star the original if this saved you time.

<!--

SEO keywords:

open source admin dashboard, nextjs admin dashboard, nextjs dashboard template,

shadcn ui dashboard, admin dashboard starter, next.js 16, typescript dashboard,

dashboard ui template, nextjs shadcn admin panel, react admin dashboard,

tailwind css admin dashboard, production ready admin dashboard template,

free react admin dashboard, nextjs 16 dashboard starter, working crud dashboard

-->

