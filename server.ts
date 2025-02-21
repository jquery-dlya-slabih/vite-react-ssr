import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import compression from 'compression';
import mkcert from 'vite-plugin-mkcert';
import tailwindcss from '@tailwindcss/vite';
import Redis from 'ioredis';

import type { ViteDevServer } from 'vite';
import type { Request, Response } from 'express';

import alias from './vite.alias.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const templatePath = isProduction ? 'dist/client/index.html' : 'index.html';
const serverEntry = isProduction ? './dist/server/entry-server.js' : 'src/entry-server.tsx';
const PORT = 3000;
const DOMAIN = isProduction ? 'localhost' : 'ssr-local.com';
const IS_REDIS_DISABLED = process.env.DISABLE_REDIS_CACHE === 'true';

async function renderHTML(req: Request, res: Response, vite: ViteDevServer) {
  const url = req.originalUrl;
  let render: (url: string, res: Response, template: string) => Promise<void>;
  let template = fs.readFileSync(path.resolve(__dirname, templatePath), 'utf-8');

  if (!isProduction) {
    template = await vite.transformIndexHtml(url, template);
    render = (await vite.ssrLoadModule(serverEntry)).render;
  } else {
    render = (await import(serverEntry)).render;
  }

  await render(url, res, template);
}

async function createServer() {
  const app = express();
  const redis = IS_REDIS_DISABLED ? undefined : new Redis({ commandTimeout: 50 });

  if (isProduction) {
    app.use(compression());
    app.use(express.static('dist'));
  }

  let vite: ViteDevServer;

  if (!isProduction) {
    vite = await createViteServer({
      server: {
        middlewareMode: true
      },
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

  app.use('/reset_redis_cache', async (_req, res) => {
    const data = await redis?.flushall().catch(() => console.log('redis reset cache error'));

    res.status(200).json(data || 'NOT OK');
  });

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      const cacheData = await redis?.get(url).catch(() => console.log('redis get cache error'));

      if (cacheData) {
        res.status(200).set({ 'Content-Type': 'text/html' }).end(cacheData);
      } else {
        await renderHTML(req, res, vite);
        // redis?.set(url, html, 'EX', 60 * 10).catch(() => console.log('redis set cache error'));
      }
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
