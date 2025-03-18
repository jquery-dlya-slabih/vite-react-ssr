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
      src: '/client/192x192.png',
      type: 'image/png',
      sizes: '192x192'
    },
    {
      src: '/client/512x512.png',
      type: 'image/png',
      sizes: '512x512'
    },
    {
      src: '/client/512x512.png',
      type: 'image/png',
      sizes: '512x512',
      purpose: 'any'
    },
    {
      src: '/client/512x512.png',
      type: 'image/png',
      sizes: '512x512',
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
