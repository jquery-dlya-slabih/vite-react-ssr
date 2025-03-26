import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

import { getTSConfigPaths, getSVGR, getViteImageOptimizer } from './vite.shared.ts';

export default defineConfig({
  base: '/client',
  plugins: [getTSConfigPaths(), tailwindcss(), react(), getSVGR(), getViteImageOptimizer()]
});
