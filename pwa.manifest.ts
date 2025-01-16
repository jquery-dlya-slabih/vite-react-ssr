import type { ManifestOptions } from 'vite-plugin-pwa';

const manifest: Partial<ManifestOptions> = {
  name: 'Server-side rendering template',
  short_name: 'SSR',
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
      sizes: '667x320',
      type: 'image/webp',
      form_factor: 'wide'
    },
    {
      src: '/client/mobile_screenshot.webp',
      sizes: '320x701',
      type: 'image/webp',
      form_factor: 'narrow'
    }
  ]
};

export default manifest;
