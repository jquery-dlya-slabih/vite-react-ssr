import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import UnpluginDetectDuplicatedDeps from 'unplugin-detect-duplicated-deps/vite';
import UnpluginUnused from 'unplugin-unused/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import unusedCode from 'vite-plugin-unused-code';

import manifest from './pwa.manifest.ts';
import { getTSConfigPaths, getSVGR, getViteImageOptimizer, depsUsedInServerTs, cssConfig } from './vite.shared.ts';

export default defineConfig({
  base: '/client',
  css: cssConfig.css,
  build: {
    manifest: true,
    ...cssConfig.build
  },
  server: {
    hmr: {
      host: '127.0.0.1'
    }
  },
  plugins: [
    getTSConfigPaths(),
    tailwindcss(),
    react(),
    getSVGR(),
    getViteImageOptimizer(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      manifest,
      outDir: 'dist',
      workbox: {
        globPatterns: ['**/*.{js,css,svg,png,webp}'],
        navigateFallback: null
      }
    }),
    viteStaticCopy({
      targets: [{ src: 'public/robots.txt', dest: '..' }]
    }),
    unusedCode({
      patterns: ['src/entry-client.tsx', 'src/index.css'],
      failOnHint: true
    }),
    UnpluginUnused({
      ignore: [...depsUsedInServerTs, 'serialize-javascript']
    }),
    UnpluginDetectDuplicatedDeps({
      throwErrorWhenDuplicated: true
    })
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts'
  }
});
