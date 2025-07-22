/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
console.log('process.env.VITE_PORT', process.env.VITE_PORT);
// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true,
    port: parseInt(process.env.VITE_PORT ?? '5173'),
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  }
});