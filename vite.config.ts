import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/client',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      outDir: 'dist',
      workbox: {
        globPatterns: ['**/client/**/*.{js,css,svg}'],
        navigateFallback: null
      }
    }),
    viteStaticCopy({
      targets: [{ src: 'public/robots.txt', dest: '..' }]
    })
  ]
});
