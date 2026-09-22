'use client';
import React from 'react';
import { ApolloProvider } from '@/lib/apollo/browser-client';
import { ActiveThemeProvider } from '../themes/active-theme';
import QueryProvider from './query-provider';

export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <ApolloProvider>
          <QueryProvider>{children}</QueryProvider>
        </ApolloProvider>
      </ActiveThemeProvider>
    </>
  );
}
