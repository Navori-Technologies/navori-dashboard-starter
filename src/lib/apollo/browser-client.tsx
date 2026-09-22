'use client';

import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache
} from '@apollo/client-integration-nextjs';
import type * as React from 'react';

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_KEYSTONE_GRAPHQL_URL,
      // Send/receive the Keystone session cookie on same-site requests.
      // If the dashboard and Keystone live on different origins, Keystone's
      // CORS config needs `credentials: true` with an explicit origin allow-list.
      credentials: 'include'
    })
  });
}

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
