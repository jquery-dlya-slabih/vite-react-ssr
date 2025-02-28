# ssr

Server side rendering template

## For dev

1. clone project `git clone https://github.com/jquery-dlya-slabih/ssr.git`
2. install pnpm 10.x version `npm install -g pnpm@latest-10`
3. install deps `pnpm i --frozen-lockfile`
4. run dev `pnpm run dev`

## For prod

1. install deps `pnpm i --frozen-lockfile`
2. npm run build
3. npm run prod

## Commands

| description                    | command                  |
| ------------------------------ | ------------------------ |
| run dev build with dev server  | `npm run dev`            |
| run build                      | `npm run build`          |
| run prod server (build needed) | `npm run prod`           |
| run linting                    | `npm run lint`           |
| run prettier check             | `npm run prettier:check` |
| run prettier write             | `npm run prettier:write` |
| run type checking              | `npm run types`          |
| run bundle analyzer            | `npm run analyze`        |

## Serving static files

If you are using **nginx** or something else for serving static and compression, delete this strings from file `server.ts` and **compression** dependencies from file `package.json`.

```ts
if (isProduction) {
  app.use(compression());
  app.use(express.static('dist'));
}
```

You may need to additionally reconfigure the public path. This can be done by setting `base` in the `vite.config.ts` file.
The same goes for using the **vite-plugin-static-copy** plugin. It’s better to put the `robots.txt` file in the required section of the site at the CD stage. And remove the logic for copy file in the root from the CI stage.

# Hooks

There is a `pre-push` hook in the `.githooks` folder. If you want to add another hook, for example `pre-commit`, then you need:

1. create a file with name `pre-commit` in `.githooks` folder
2. in project root use command `chmod +x .githooks/pre-commit`
3. fill new hook with any commands, like `pre-push` hook

If you want to delete all hooks:

1. remove `.githooks` folder
2. remove `prepare` command in `package.json`
3. in project root use command `git config --unset core.hooksPath`

# HTTPS

1. use command `sudo nano /etc/hosts`
2. add `127.0.0.1 ssr-local.com`
3. save file
4. use command `npm run dev`

# Aliasing

1. add alias in file `vite.alias.ts`
2. add alias in file `tsconfig.app.json`

# Test users

| login  | password   |
| ------ | ---------- |
| avat   | avatpass   |
| emilys | emilyspass |

# Redis

Cache for all html pages. Cache expiration eq 10 min.

1. install redis `brew install redis`
2. run redis `redis-server`
3. change value of env `DISABLE_REDIS_CACHE` in `package.json` to `false`
4. use `npm run dev` command

For reset all cache use `/reset_redis_cache` handler.

# TO DO

- https://github.com/vitejs/vite/blob/v6.0.9/packages/vite/CHANGELOG.md#609-2025-01-20 - new vite release breaks hmr
- critical css
- e2e + unit tests
- ssg
- https://vite-pwa-org.netlify.app/ offline mode
- modulepreload / preload
- fastify, http2, early hints
- https://lightningcss.dev/
- swc
