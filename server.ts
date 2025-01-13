import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import compression from 'compression';
import type { ViteDevServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const templatePath = isProduction ? 'dist/client/index.html' : 'index.html';
const serverEntry = isProduction ? './dist/server/entry-server.js' : 'src/entry-server.tsx';

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
      appType: 'custom'
    });

    app.use(vite.middlewares);
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    let render;

    try {
      let template = fs.readFileSync(path.resolve(__dirname, templatePath), 'utf-8');

      if (!isProduction) {
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule(serverEntry)).render;
      } else {
        render = (await import(serverEntry)).render;
      }

      const appHtml = await render();
      const html = template.replace(`<!--ssr-outlet-->`, appHtml.html);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      vite?.ssrFixStacktrace(error as Error);
      next(error);
    }
  });

  app.listen(3000, () => {
    console.info(`Server started at http://localhost:3000`);
  });
}

createServer();
