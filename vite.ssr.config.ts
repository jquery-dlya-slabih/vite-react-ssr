import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import unusedCode from 'vite-plugin-unused-code';

import alias from './vite.alias.ts';

export default defineConfig({
  base: '/client',
  resolve: {
    alias
  },
  plugins: [
    react(),
    unusedCode({
      patterns: ['src/**/*.*'],
      exclude: ['src/entry-client.tsx', 'src/index.css', 'src/*.d.ts'],
      failOnHint: true
    })
  ]
});
