import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

import alias from './vite.alias.ts';
import manifest from './pwa.manifest.ts';

export default defineConfig({
  base: '/client',
  resolve: {
    alias
  },
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      manifest,
      outDir: 'dist',
      workbox: {
        globPatterns: ['**/client/**/*.{js,css,svg,png,webp}'],
        navigateFallback: null
      }
    }),
    viteStaticCopy({
      targets: [{ src: 'public/robots.txt', dest: '..' }]
    })
  ]
});
