import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

import pluginQuery from '@tanstack/eslint-plugin-query';

import unicorn from 'eslint-plugin-unicorn';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

import prettier from 'eslint-config-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const configDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(configDir, '..');

export default defineConfig([
  globalIgnores(['dist']),

  {
    files: ['**/*.{ts,tsx}'],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      ...pluginQuery.configs['flat/recommended'],
      reactRefresh.configs.vite,
      unicorn.configs.recommended,
      prettier,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    plugins: {
      react,
      unicorn,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },

    settings: {
      'import/resolver': {
        typescript: { project: path.join(repoRoot, 'tsconfig.json') },
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      },
    },

    rules: {
      /**
       * Architecture
       */
      'no-restricted-imports': ['error', { patterns: ['../*', '../**'] }],

      'import/no-restricted-paths': [
        'error',
        {
          basePath: repoRoot,
          zones: [
            {
              target: './frontend',
              from: './backend',
              message: 'Frontend must not import backend code.',
            },
            {
              target: './backend',
              from: './frontend',
              message: 'Backend must not import frontend code.',
            },
          ],
        },
      ],

      /**
       * Imports
       */
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'], // external
            ['^@/'], // alias
            ['^\\.'], // relative
            ['^\\u0000'], // side effects
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      /**
       * Unused imports
       */
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],

      /**
       * Overrides
       */
      'unicorn/prefer-query-selector': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'react-refresh/only-export-components': 'off',

      /**
       * File naming
       */
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['^[A-Z][a-zA-Z0-9]*\\.tsx$', '^use[A-Z][a-zA-Z0-9]*\\.ts'],
        },
      ],
    },
  },
]);
