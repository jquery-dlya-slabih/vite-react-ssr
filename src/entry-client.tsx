import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './app.tsx';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((error) => console.error(error));
  });
}

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App />
  </StrictMode>
);
