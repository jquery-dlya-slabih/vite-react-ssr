import { HydrationBoundary, QueryClientProvider, dehydrate, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Response, Request } from 'express';
import { Writable } from 'node:stream';
import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';
import type { StaticHandlerContext } from 'react-router';
import serialize from 'serialize-javascript';

import { HTML_DIVIDER } from '@/constants';
import createRoutes from '@/createRoutes.tsx';

export async function render(req: Request, res: Response, template: string) {
  res.startTime('data', 'fetching initial data');

  const queryClient = new QueryClient();
  const routes = createRoutes(queryClient);
  const { query, dataRoutes } = createStaticHandler(routes);
  const request = new Request(`https://localhost.com${req.originalUrl}`);
  const context = (await query(request)) as StaticHandlerContext;
  const router = createStaticRouter(dataRoutes, context);
  const dehydratedState = dehydrate(queryClient);

  res.endTime('data');

  return new Promise((resolve) => {
    res.startTime('render', 'rendering of react');
    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <StaticRouterProvider router={router} context={context} />
            <ReactQueryDevtools />
          </HydrationBoundary>
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

            res.endTime('render');
            resolve(html);
          });

          pipe(writeable);
        }
      }
    );
  });
}
