import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { dehydrate, HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Router from '@/router.tsx';
import { getToDo } from '@/api.ts';

export async function render(url: string) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['todos'], queryFn: getToDo });
  const dehydratedState = dehydrate(queryClient);

  const html = renderToString(
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

  queryClient.clear();

  return { html, dehydratedState };
}
