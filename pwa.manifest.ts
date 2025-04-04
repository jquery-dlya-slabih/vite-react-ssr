import type { ManifestOptions } from 'vite-plugin-pwa';

const manifest: Partial<ManifestOptions> = {
  name: 'Goods and blog',
  short_name: 'G&B',
  display: 'standalone',
  theme_color: '#242424',
  background_color: '#242424',
  start_url: '/',
  scope: '/',
  orientation: 'portrait',
  lang: 'en',
  icons: [
    {
      src: '/client/pwa-64x64.png',
      sizes: '64x64',
      type: 'image/png'
    },
    {
      src: '/client/pwa-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/client/pwa-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    },
    {
      src: '/client/maskable-icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable'
    }
  ],
  screenshots: [
    {
      src: '/client/screenshot.webp',
      sizes: '1497x664',
      type: 'image/webp',
      form_factor: 'wide'
    },
    {
      src: '/client/mobile_screenshot.webp',
      sizes: '320x544',
      type: 'image/webp',
      form_factor: 'narrow'
    }
  ]
};

export default manifest;
