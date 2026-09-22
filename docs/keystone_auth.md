# Keystone Auth Setup Guide

This dashboard authenticates directly against a [Keystone 6](https://keystonejs.com) GraphQL API's session-based auth (`@keystone-6/auth`'s `createAuth`), instead of a separate identity provider. That means:

- The dashboard, Keystone's own Admin UI, and any other client (e.g. a React Native app) share **the same users and sessions**.
- There's no user-sync step between systems — Keystone's `User` list and its `access/*` control functions are the single source of truth.
- A mobile client that can't rely on cookies can bridge its own `Authorization: Bearer <token>` header into the same session cookie server-side (see your Keystone backend's auth middleware) — the dashboard doesn't need anything extra for that to work.

## Required Keystone schema shape

The GraphQL documents in `src/graphql/auth.ts` assume the standard `createAuth` output:

```ts
// keystone.ts (backend)
const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: 'id name email role'
});
```

This gives you, on the Keystone side:

- `authenticateUserWithPassword(email, password)` — a union of `UserAuthenticationWithPasswordSuccess { item }` / `UserAuthenticationWithPasswordFailure { message }`
- `authenticatedItem` — the current session's `User`, or `null`
- `endSession` — logs out

If your `User` list has different field names (or `sessionData` doesn't include `role`), update `SESSION_QUERY` / `LOGIN_MUTATION` in `src/graphql/auth.ts` and `SessionUser` accordingly. Once you wire up GraphQL Codegen against your real schema, replace the hand-written documents with generated types.

## Environment variables

```env
# Public — used by the browser Apollo Client
NEXT_PUBLIC_KEYSTONE_GRAPHQL_URL="http://localhost:3001/api/graphql"

# Optional — internal/server-only URL for Server Component requests, when it
# differs from the public one (e.g. a Docker service name). Falls back to
# NEXT_PUBLIC_KEYSTONE_GRAPHQL_URL when unset.
KEYSTONE_GRAPHQL_URL=

# Optional — override if your Keystone `sessionStrategy` uses a cookie name
# other than the `keystonejs-session` default.
KEYSTONE_SESSION_COOKIE_NAME=
```

## How the pieces fit together

- `src/lib/apollo/rsc-client.ts` — one Apollo Client per request (`registerApolloClient`) for Server Components, forwarding the incoming request's cookies to Keystone by hand (RSC `fetch()` doesn't do this automatically).
- `src/lib/apollo/browser-client.tsx` — the Client Component Apollo provider (`ApolloNextAppProvider`), `credentials: 'include'` so the browser sends/receives the session cookie.
- `src/features/auth/session.ts` — `getSession()`, the server-side helper used to gate routes (`src/app/dashboard/layout.tsx`, `src/app/page.tsx`).
- `src/features/auth/hooks/use-session.ts` / `use-sign-out.ts` — client-side equivalents for Client Components (sidebar, nav dropdown, role-gated UI).
- `src/proxy.ts` — a cheap cookie-presence check only (no GraphQL round-trip); it keeps signed-out visitors out of `/dashboard` and signed-in visitors out of `/auth`. The real session check happens server-side against Keystone in the layout, and Keystone's own access control enforces everything on every GraphQL request regardless.
- `src/features/auth/components/user-auth-form.tsx` — the login form (email + password via `LOGIN_MUTATION`).

## Role-based navigation

`src/config/nav-config.ts` items can gate on `access: { role: 'admin' }`, matching against Keystone's `authenticatedItem.role`. See `docs/nav-rbac.md`. This is a UX-only check — real authorization always happens in Keystone's `access/*` functions.

## GraphQL Codegen (setup only — nothing generated yet)

`codegen.ts` at the repo root is wired up with [`@graphql-codegen/cli`](https://the-guild.dev/graphql/codegen) and the `client` preset (typed document nodes — no separate hooks plugin needed, they drop straight into Apollo's `useQuery`/`useMutation`). It isn't run against a real schema yet, since this repo doesn't ship a live Keystone backend to introspect.

Once your Keystone server is running:

1. Point `KEYSTONE_GRAPHQL_URL` (or `NEXT_PUBLIC_KEYSTONE_GRAPHQL_URL`) in `.env.local` at it.
2. Run `bun run codegen` (or `bun run codegen:watch` while developing) — this writes typed documents to `src/gql/` (gitignored — it's a build artifact of your schema, not source).
3. Replace the hand-written documents in `src/graphql/auth.ts` with generated ones, and write new features' queries/mutations the same way instead of hand-typing GraphQL documents.

If you're bringing over an existing GraphQL setup (e.g. from another Keystone-backed project), you likely already have working `codegen.ts` plugins/config to port in — this file is a minimal starting point, not a fixed contract.
