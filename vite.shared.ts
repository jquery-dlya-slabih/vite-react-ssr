import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export const getTSConfigPaths = () => tsconfigPaths();

export const getSVGR = () =>
  svgr({
    include: '**/*.svg?react',
    svgrOptions: {
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx']
    }
  });

export const getViteImageOptimizer = () => ViteImageOptimizer();

export const depsUsedInServerTs = ['compression', 'express', 'ioredis', 'vite-plugin-mkcert', 'open'];
