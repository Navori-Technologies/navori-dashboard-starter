# Navigation RBAC System

## Overview

This document explains the fully client-side RBAC (Role-Based Access Control) system for navigation items.

**Key Insight**: Navigation visibility is UX only, not security. We check everything client-side against the signed-in user's Keystone `role` — see `docs/keystone_auth.md` for how the session itself is fetched.

## Architecture

### Core Files

1. **`src/hooks/use-nav.ts`** - Single hook that handles all filtering logic (fully client-side)
2. **`src/features/auth/hooks/use-session.ts`** - Apollo `useQuery` of Keystone's `authenticatedItem`, the source of `role`
3. **`src/types/index.ts`** - Type definitions with `access` property (`{ role?: string }`)

### Why Client-Side?

- **Navigation visibility is UX only** - Users can't bypass security by seeing/hiding nav items
- **The session is already in the Apollo cache** - `useSession()` reads it, no extra request
- **Instant filtering** - no loading states, no UI flashing once the session has resolved

**Note**: For actual security (GraphQL mutations/queries, page protection), always enforce checks server-side — Keystone's own `access/*` functions do this. Navigation filtering never replaces that.

## Usage

### In `nav-config.ts`

```typescript
{
  title: 'Admin Panel',
  url: '/dashboard/admin',
  icon: 'settings',
  access: { role: 'admin' } // Matches authenticatedItem.role
}
```

Omit `access` for items that should always be visible to any signed-in user.

### In Components

```typescript
import { useFilteredNavItems } from '@/hooks/use-nav';

function MyComponent() {
  const filteredItems = useFilteredNavItems(navItems);
  // filteredItems is automatically filtered based on role
}
```

## Adding New Items

Just add to `nav-config.ts`:

```typescript
{
  title: 'New Feature',
  url: '/dashboard/new',
  icon: 'star',
  access: { role: 'authority' }
}
```

The system automatically filters it in both the sidebar and the kbar (Cmd+K) — both read from the same `navGroups` config.

## Best Practices

1. **Don't add `access` unless you need it** - items without it are visible to every signed-in user
2. **Match the exact Keystone role string** - `role` is compared with `===` against `authenticatedItem.role`, no normalization
3. **Never rely on this for security** - a hidden nav item doesn't stop a direct request; gate the actual page/query server-side too
