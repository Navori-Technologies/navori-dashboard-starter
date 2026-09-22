'use client';

import { useQuery } from '@apollo/client/react';
import { SESSION_QUERY, type SessionUser } from '@/graphql/auth';

/**
 * Client-side read of the current Keystone session. The dashboard layout
 * already validated the session server-side (see `getSession` in
 * features/auth/session.ts) — this just gives Client Components (sidebar,
 * nav dropdown, …) reactive access to the same data.
 */
export function useSession() {
  const { data, loading } = useQuery<{ authenticatedItem: SessionUser | null }>(SESSION_QUERY);

  return { user: data?.authenticatedItem ?? null, loading };
}
