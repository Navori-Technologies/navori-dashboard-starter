import { config as loadEnv } from 'dotenv';
import type { CodegenConfig } from '@graphql-codegen/cli';

// codegen runs as a plain Node script, so Next.js's automatic .env loading
// doesn't apply here — load .env.local by hand.
loadEnv({ path: '.env.local' });

// Setup only: this repo doesn't ship a live Keystone schema to introspect
// against. Point `schema` at your running backend (or a local `schema.graphql`
// SDL file exported from Keystone) before running `bun run codegen`.
const schemaUrl = process.env.KEYSTONE_GRAPHQL_URL ?? process.env.NEXT_PUBLIC_KEYSTONE_GRAPHQL_URL;

const config: CodegenConfig = {
  schema: schemaUrl,
  documents: ['src/**/*.{ts,tsx}', '!src/gql/**/*'],
  ignoreNoDocuments: true,
  generates: {
    // Client Preset: typed document nodes (works directly with Apollo
    // Client's `useQuery`/`useMutation` — no separate hooks plugin needed).
    './src/gql/': {
      preset: 'client',
      plugins: []
    }
  }
};

export default config;
