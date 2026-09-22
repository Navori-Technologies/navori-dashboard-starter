import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient
} from '@apollo/client-integration-nextjs';
import { cookies } from 'next/headers';

// One Apollo Client instance per request, shared across every Server
// Component in that request (see @apollo/client-integration-nextjs). The
// browser doesn't forward cookies to RSC `fetch()` calls automatically, so
// we attach the incoming request's cookies by hand on every request.
export const { getClient, query } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.KEYSTONE_GRAPHQL_URL ?? process.env.NEXT_PUBLIC_KEYSTONE_GRAPHQL_URL,
      fetchOptions: { cache: 'no-store' },
      async fetch(uri, options) {
        const cookieStore = await cookies();
        return fetch(uri, {
          ...options,
          headers: { ...options?.headers, cookie: cookieStore.toString() }
        });
      }
    })
  });
});
