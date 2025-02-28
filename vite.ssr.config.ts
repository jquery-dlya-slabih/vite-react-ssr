import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import unusedCode from 'vite-plugin-unused-code';

import alias from './vite.alias.ts';

export default defineConfig({
  base: '/client',
  resolve: {
    alias
  },
  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react',
      svgrOptions: {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx']
      }
    }),
    unusedCode({
      patterns: ['src/**/*.*'],
      exclude: ['src/entry-client.tsx', 'src/index.css', 'src/*.d.ts', 'src/**/*.svg'],
      failOnHint: false
    })
  ]
});
