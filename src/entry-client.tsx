import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Router from '@/router.tsx';

import '@/index.css';

declare global {
  interface Window {
    __REACT_QUERY_STATE__: string;
  }
}

if ('serviceWorker' in navigator && !import.meta.env.DEV) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((error) => console.error(error));
  });
}

const dehydratedState = window.__REACT_QUERY_STATE__;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000
    }
  }
});

const root = document.getElementById('root');

if (root) {
  hydrateRoot(
    root,
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </HydrationBoundary>
      </QueryClientProvider>
    </StrictMode>
  );
} else {
  throw new Error('Container not found, must be HTMLElement');
}
