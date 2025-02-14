import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HTML_DIVIDER } from '@/constants';

import Router from '@/router.tsx';
import preloadData from '@/preloadData.ts';

export async function render(url: string) {
  const { queryClient, dehydratedState } = await preloadData(url);

  const html = renderToString(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <StaticRouter location={url}>
            <Router />
          </StaticRouter>
        </HydrationBoundary>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </StrictMode>
  );

  const [head, body] = html.split(HTML_DIVIDER);
  const app = body.replace(HTML_DIVIDER, '');

  queryClient.clear();

  return { app, dehydratedState, head };
}
