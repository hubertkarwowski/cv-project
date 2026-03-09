import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import pluginQuery from '@tanstack/eslint-plugin-query';

import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      pluginQuery.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintPluginUnicorn.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      unicorn: eslintPluginUnicorn,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'], // side effects
            ['^@?\\w'], // external packages
            ['^@/'], // @ alias imports
            ['^\\.'], // relative imports
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
]);
