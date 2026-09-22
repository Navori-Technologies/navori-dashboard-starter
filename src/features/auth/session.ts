import 'server-only';

import { query } from '@/lib/apollo/rsc-client';
import { SESSION_QUERY, type SessionUser } from '@/graphql/auth';

/**
 * Reads the current Keystone session from the incoming request's cookies.
 * Returns `null` when signed out — callers decide whether to redirect.
 */
export async function getSession(): Promise<SessionUser | null> {
  const { data } = await query<{ authenticatedItem: SessionUser | null }>({
    query: SESSION_QUERY
  });
  return data?.authenticatedItem ?? null;
}
