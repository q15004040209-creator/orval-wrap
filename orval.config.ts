import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    // Input: OpenAPI schema file (YAML or JSON)
    input: './openapi.yaml',

    // Output: Generated TypeScript file
    output: './src/gen/petstore.ts',

    // HTTP client: axios | fetch | hono | angular
    httpClient: 'axios',

    // Client framework: react-query | vue-query | svelte-query | solid-query | angular | hono | fetch
    client: 'react-query',

    // Generate mock data
    mock: true,

    // Generate Zod schemas for runtime validation
    schema: true,

    // Clean output directory before generation
    clean: true,

    // Override generated code
    override: {
      // Custom mutator for axios instance injection
      mutator: {
        path: './src/custom-client.ts',
        name: 'customClient',
      },
      // Use named exports
      useNamedExports: true,
      // Auto-enable named imports
      useNamedImports: true,
    },
  },

  // Another API example: with fetch client
  anotherApi: {
    input: './openapi.json',
    output: './src/gen/anotherApi.ts',
    httpClient: 'fetch',
    client: 'fetch',
    mock: true,
    schema: true,
    clean: true,
  },
});
