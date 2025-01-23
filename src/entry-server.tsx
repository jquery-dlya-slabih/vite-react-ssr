import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';

import Router from '@/router.tsx';
import preloadData from '@/preloadData.ts';

export async function render(url: string) {
  const { queryClient, dehydratedState } = await preloadData(url);

  const app = renderToString(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <StaticRouter location={url}>
            <Router />
          </StaticRouter>
        </HydrationBoundary>
      </QueryClientProvider>
    </StrictMode>
  );

  const head = app.split('<!--$-->')[0];

  queryClient.clear();

  return { app, dehydratedState, head };
}
