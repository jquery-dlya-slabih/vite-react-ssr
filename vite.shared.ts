import svgr from 'vite-plugin-svgr';

export const alias = {
  '@/': '/src/'
};

export const getSVGR = () =>
  svgr({
    include: '**/*.svg?react',
    svgrOptions: {
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx']
    }
  });
