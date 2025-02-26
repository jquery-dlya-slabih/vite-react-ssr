import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import alias from './vite.alias.ts';

export default defineConfig({
  base: '/client',
  resolve: {
    alias
  },
  plugins: [react()]
});
