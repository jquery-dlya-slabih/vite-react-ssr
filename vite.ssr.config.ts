import UnpluginUnused from 'unplugin-unused/vite';
import { defineConfig } from 'vite';
import unusedCode from 'vite-plugin-unused-code';

import { getTSConfigPaths, getSVGR, depsUsedInServerTs } from './vite.shared.ts';

export default defineConfig({
  base: '/client',
  plugins: [
    getTSConfigPaths(),
    getSVGR(),
    unusedCode({
      patterns: ['src/**/*.*'],
      exclude: [
        'src/entry-client.tsx',
        'src/*.css',
        'src/*.d.ts',
        'src/**/*.svg',
        'src/tests.helper.tsx',
        'src/**/*.test.ts?(x)'
      ],
      failOnHint: true
    }),
    UnpluginUnused({
      ignore: depsUsedInServerTs
    })
  ]
});
