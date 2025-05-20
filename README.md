# ssr

Server side rendering template with ton of features.

## Locking Environment Versions

It's considered good practice to lock the versions of your environment tools, such as Node.js and pnpm. To do this,
you can specify the required versions in the `engines` field in `package.json` and configure enforcement using the
`.npmrc` file in your project's root.

If needed, you can disable strict version checks by setting `engine-strict=false` in `.npmrc`.

## For dev

1. clone project `git clone https://github.com/jquery-dlya-slabih/ssr.git`
2. install pnpm 10.x version `npm install -g pnpm@10.11.0`
3. install deps `pnpm install`
4. run dev `pnpm dev`

## For prod

1. install deps `pnpm install --frozen-lockfile`
2. pnpm build
3. pnpm prod

## Commands

| description                         | command                    |
| ----------------------------------- | -------------------------- |
| run dev build with dev server       | `pnpm dev`                 |
| run prod build                      | `pnpm build`               |
| run prod server (prod build needed) | `pnpm prod`                |
| run linting                         | `pnpm lint`                |
| run prettier check                  | `pnpm prettier:check`      |
| run prettier write                  | `pnpm prettier:write`      |
| run type checking                   | `pnpm types`               |
| run bundle analyzer                 | `pnpm analyze`             |
| run unit tests                      | `pnpm test`                |
| show unit tests information         | `pnpm test:ui`             |
| run e2e tests                       | `pnpm e2e`                 |
| run e2e tests in ui                 | `pnpm e2e:ui`              |
| show e2e tests information          | `pnpm e2e:report`          |
| run e2e codegen                     | `pnpm e2e:codegen`         |
| generate assets for pwa             | `pnpm generate-pwa-assets` |
| run docker image build              | `pnpm docker:build`        |
| start docker container              | `pnpm docker:run`          |
| stop docker container               | `pnpm docker:stop`         |
| up docker compose                   | `pnpm docker:compose`      |

## Serving static files

If you're using **NGINX** or another solution for static file **serving** and **compression**, you can remove these lines
from `server.ts` and delete the **compression** dependency from `package.json`.

```ts
if (isProduction) {
  app.use(compression());
  app.use(express.static('dist'));
}
```

You may need to additionally reconfigure the public path. This can be done by setting `base` in the `vite.config.ts` file.
The same goes for using the **vite-plugin-static-copy** plugin. It’s better to put the `robots.txt` file in the
required section of the site at the CD stage. And remove the logic for copy file in the root from the CI stage.

## Hooks

There is a `pre-push` hook in the `.githooks` folder. If you want to add another hook, for example `pre-commit`, then you need:

1. create a file with name `pre-commit` in `.githooks` folder
2. in project root use command `chmod +x .githooks/pre-commit`
3. fill new hook with any commands, like `pre-push` hook

If you want to delete all hooks:

1. remove `.githooks` folder
2. remove `prepare` command in `package.json`
3. in project root use command `git config --unset core.hooksPath`

## HTTPS

1. use command `sudo nano /etc/hosts`
2. add `127.0.0.1 ssr-local.com`
3. save file
4. use command `pnpm dev`

A DNS reset may be necessary. On macOS, the simplest solution is to restart the system.

## Aliasing

For aliasing just add alias in file `tsconfig.app.json`.

## Test users

| login  | password   |
| ------ | ---------- |
| avat   | avatpass   |
| emilys | emilyspass |

## Redis

Cache for all HTML pages. Cache expiration eq 10 min.

1. install redis `brew install redis`
2. run redis `redis-server`
3. change value of `REDIS` env in `.env` to `true`
4. use `pnpm dev` command

For reset all cache use `/reset_redis_cache` handler.

## Docker

`Docker` should only be used in `production`. There’s no practical reason to use it in `development` mode.

If you don't need `Redis`, you can safely remove `docker compose` related things.

If you encounter a **pnpm** installation error like: `Error: Error when performing the request to
https://registry.npmjs.org/pnpm/-/pnpm-10.11.0.tgz; for troubleshooting help,
see https://github.com/nodejs/corepack#troubleshooting.`). Try running the `docker:build` command again.

## Server timing API

To enable https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Server-Timing just use query flag `timing=true`.

Example:

- W/o timing https://ssr-local.com:3000, https://ssr-local.com:3000/posts/5;
- With timing https://ssr-local.com:3000/?timing=true, https://ssr-local.com:3000/posts/5?timing=true.

To view data, go to chrome **devtools**, **network** tab, next select your **html**-file and choose **timing** tab.

## Tests

- Test runner https://vitest.dev/
- Render react components https://testing-library.com/docs/react-testing-library/intro/
- Custom matchers to test the state of the DOM https://github.com/testing-library/jest-dom
- E2E tests https://playwright.dev/

## Generating pwa assets

For generating pwa assets:

1. add to `public` folder your icon, name of icon must be `favicon.svg`
2. use command `pnpm generate-pwa-assets`

If you have any problems with canvas on macOS, use command `brew install pkg-config cairo pango libpng jpeg giflib librsvg`.

## Lightning CSS

Tailwind CSS v4.0 is designed for and tested on modern browsers, and the core functionality of the framework
specifically depends on these browser versions:

- Chrome 111 (released March 2023)
- Safari 16.4 (released March 2023)
- Firefox 128 (released July 2024)

For this reason, we need to transpile the code to older browsers. List of supported browsers
[here](https://browserslist.dev/?q=ZGVmYXVsdHMgYW5kIGZ1bGx5IHN1cHBvcnRzIGVzNi1tb2R1bGU%3D).

Alternatively, if you only need to support browsers compatible with Tailwind, you can safely remove Lightning CSS.

## Contributing

Feel free to open an issue or submit PRs.
