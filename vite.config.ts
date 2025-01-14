import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: '/client',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: 'public/robots.txt', dest: '..' }]
    })
  ]
});
