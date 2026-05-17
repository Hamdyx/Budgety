import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    testTimeout: 15000,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true,
    env: {
      VITE_API_URL: 'http://localhost:8000',
      VITE_EXCHANGE_RATE_API_KEY: 'test-exchange-api-key',
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/tests/**',
        '**/*.d.ts',
        '**/__tests__/**',
        '**/*.test.{ts,tsx}',
        '**/index.ts',
        'src/types/**',
        'src/app/routes.tsx',
      ],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
});
