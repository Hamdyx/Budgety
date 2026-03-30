import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      app: fileURLToPath(new URL('./src/app', import.meta.url)),
      assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
      Components: fileURLToPath(new URL('./src/Components', import.meta.url)),
      features: fileURLToPath(new URL('./src/features', import.meta.url)),
      types: fileURLToPath(new URL('./src/types', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true,
  },
});
