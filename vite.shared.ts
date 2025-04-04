import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import type { CSSOptions, BuildEnvironmentOptions } from 'vite';
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

export const depsUsedInServerTs = ['compression', 'express', 'ioredis', 'vite-plugin-mkcert', 'server-timing'];

export const cssConfig: { css: CSSOptions; build: BuildEnvironmentOptions } = {
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('defaults and fully supports es6-module'))
    }
  },
  build: {
    cssMinify: 'lightningcss'
  }
};
