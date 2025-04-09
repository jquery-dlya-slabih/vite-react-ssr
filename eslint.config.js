import eslint from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import vitest from '@vitest/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import eslintPluginJestDom from 'eslint-plugin-jest-dom';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import playwright from 'eslint-plugin-playwright';
import reactPlugin from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import sonarjs from 'eslint-plugin-sonarjs';
import testingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  { ignores: ['dist', 'eslint.config.js'] },
  reactRefresh.configs.vite,
  eslint.configs.recommended,
  ...tsEslint.configs.strict,
  sonarjs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: 'tsconfig.app.json'
        }
      }
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
        ...globals.node
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/no-autofocus': 'off'
    }
  },
  ...pluginQuery.configs['flat/recommended'],
  {
    files: ['**/*.test.ts?(x)'],
    ...vitest.configs.recommended
  },
  {
    files: ['**/*.test.tsx'],
    ...testingLibrary.configs['flat/react']
  },
  {
    files: ['**/*.test.tsx'],
    ...eslintPluginJestDom.configs['flat/recommended']
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**'],
    rules: playwright.configs['flat/recommended'].rules
  }
);
