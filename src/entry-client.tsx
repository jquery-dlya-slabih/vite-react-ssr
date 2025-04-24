import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import createRoutes from '@/createRoutes.tsx';
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000
    }
  }
});

const routes = createRoutes(queryClient);
const router = createBrowserRouter(routes);
const dehydratedState = window.__REACT_QUERY_STATE__;
const root = document.getElementById('root');

if (root) {
  hydrateRoot(
    root,
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </HydrationBoundary>
      </QueryClientProvider>
    </StrictMode>
  );
} else {
  throw new Error('Container not found, must be HTMLElement');
}
