import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Writable } from 'node:stream';
import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import serialize from 'serialize-javascript';

import { HTML_DIVIDER } from '@/constants';
import preloadData from '@/preloadData.ts';
import Router from '@/router.tsx';

export async function render(url: string, template: string) {
  const { queryClient, dehydratedState } = await preloadData(url);

  return new Promise((resolve) => {
    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <StaticRouter location={url}>
              <Router />
            </StaticRouter>
          </HydrationBoundary>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </StrictMode>,
      {
        onAllReady() {
          const chunks: string[] = [];
          const writeable = new Writable({
            write(chunk, _encoding, callback) {
              chunks.push(chunk.toString());
              callback();
            }
          });

          writeable.on('finish', () => {
            const [head, body] = chunks.join('').split(HTML_DIVIDER);
            const rqs = serialize(dehydratedState);

            const html = template
              .replace('<!--head-outlet-->', head)
              .replace('<!--ssr-outlet-->', body)
              .replace('<!--rqs-outlet-->', `window.__REACT_QUERY_STATE__ = ${rqs};`);

            queryClient.clear();
            resolve(html);
          });

          pipe(writeable);
        }
      }
    );
  });
}
