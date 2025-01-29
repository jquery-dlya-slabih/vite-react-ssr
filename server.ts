import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import compression from 'compression';
import mkcert from 'vite-plugin-mkcert';
import tailwindcss from '@tailwindcss/vite';

import type { ViteDevServer } from 'vite';
import type { DehydratedState } from '@tanstack/react-query';

import alias from './vite.alias.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const templatePath = isProduction ? 'dist/client/index.html' : 'index.html';
const serverEntry = isProduction ? './dist/server/entry-server.js' : 'src/entry-server.tsx';
const PORT = 3000;
const DOMAIN = isProduction ? 'localhost' : 'ssr-local.com';

async function createServer() {
  const app = express();

  if (isProduction) {
    app.use(compression());
    app.use(express.static('dist'));
  }

  let vite: ViteDevServer;

  if (!isProduction) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      resolve: {
        alias
      },
      plugins: [
        tailwindcss(),
        mkcert({
          hosts: [DOMAIN],
          savePath: 'ssl'
        })
      ]
    });

    app.use(vite.middlewares);
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    let render: (url: string) => Promise<{ app: string; dehydratedState: DehydratedState; head: string }>;

    try {
      let template = fs.readFileSync(path.resolve(__dirname, templatePath), 'utf-8');

      if (!isProduction) {
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule(serverEntry)).render;
      } else {
        render = (await import(serverEntry)).render;
      }

      const renderData = await render(url);
      const rqs = JSON.stringify(renderData.dehydratedState);

      const html = template
        .replace(`<!--head-outlet-->`, renderData.head)
        .replace(`<!--ssr-outlet-->`, renderData.app)
        .replace(`<!--rqs-outlet-->`, `window.__REACT_QUERY_STATE__ = ${rqs};`);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      vite?.ssrFixStacktrace(error as Error);
      console.error(error);
      res
        .status(500)
        .end(
          'OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!'
        );
    }
  });

  if (isProduction) {
    app.listen(PORT, () => {
      console.info(`Server started at http://localhost:3000`);
    });
  } else {
    https
      .createServer(
        {
          cert: fs.readFileSync('ssl/cert.pem'),
          key: fs.readFileSync('ssl/dev.pem')
        },
        app
      )
      .listen(PORT, DOMAIN, () => {
        console.info(`Server started at https://${DOMAIN}:${PORT}`);
      });
  }
}

createServer();
