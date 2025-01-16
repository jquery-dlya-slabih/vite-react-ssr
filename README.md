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
5. open page on https://ssr-local.com:3000

# TO DO

- critical css
- e2e + unit tests
- ssg
- tailwind
- https://vite-pwa-org.netlify.app/ offline mode
- eslint / stylelint
- scss
- modulepreload / preload
- 103 Early Hints
- fonts

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname
    }
  }
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules
  }
});
```
