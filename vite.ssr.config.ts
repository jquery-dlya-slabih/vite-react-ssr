import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import unusedCode from 'vite-plugin-unused-code';

import { alias, getSVGR } from './vite.shared.ts';

export default defineConfig({
  base: '/client',
  resolve: {
    alias
  },
  plugins: [
    react(),
    getSVGR(),
    unusedCode({
      patterns: ['src/**/*.*'],
      exclude: ['src/entry-client.tsx', 'src/index.css', 'src/*.d.ts', 'src/**/*.svg'],
      failOnHint: true
    })
  ]
});
