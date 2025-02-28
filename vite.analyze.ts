import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { alias, getSVGR } from './vite.shared.ts';

export default defineConfig({
  base: '/client',
  resolve: {
    alias
  },
  plugins: [tailwindcss(), react(), getSVGR()]
});
