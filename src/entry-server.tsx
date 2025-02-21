import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Transform } from 'node:stream';

import { HTML_DIVIDER } from '@/constants';

import type { Response } from 'express';

import Router from '@/router.tsx';
import preloadData from '@/preloadData.ts';
import serialize from 'serialize-javascript';

export async function render(url: string, res: Response, template: string) {
  const { queryClient, dehydratedState } = await preloadData(url);

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
      onShellReady() {
        res.setHeader('content-type', 'text/html');

        const [head, tail] = template.split('<!--ssr-outlet-->');
        const [headOpener, headCloser] = head.split('<!--head-outlet-->');

        res.write(headOpener);

        const transformStream = new Transform({
          transform(chunk, _encoding, callback) {
            if (chunk.includes(HTML_DIVIDER)) {
              const [preload, app] = chunk.toString().split(HTML_DIVIDER);
              res.write(preload + headCloser + app);
            } else {
              res.write(chunk);
            }

            callback();
          }
        });

        const rqs = serialize(dehydratedState);

        queryClient.clear();

        transformStream.on('finish', () => {
          res.end(tail.replace('<!--rqs-outlet-->', `window.__REACT_QUERY_STATE__ = ${rqs};`));
        });

        pipe(transformStream);
      }
    }
  );
}
