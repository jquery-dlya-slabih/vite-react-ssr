import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import unusedCode from 'vite-plugin-unused-code';

import { getTSConfigPaths, getSVGR } from './vite.shared.ts';

export default defineConfig({
  base: '/client',
  plugins: [
    getTSConfigPaths(),
    react(),
    getSVGR(),
    unusedCode({
      patterns: ['src/**/*.*'],
      exclude: [
        'src/entry-client.tsx',
        'src/index.css',
        'src/*.d.ts',
        'src/**/*.svg',
        'src/tests.helper.tsx',
        'src/**/*.test.ts?(x)'
      ],
      failOnHint: true
    })
  ]
});
