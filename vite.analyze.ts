import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

import { getTSConfigPaths, getSVGR, getViteImageOptimizer, cssConfig } from './vite.shared.ts';

export default defineConfig({
  base: '/client',
  ...cssConfig,
  plugins: [getTSConfigPaths(), tailwindcss(), react(), getSVGR(), getViteImageOptimizer()]
});
