import js from '@eslint/js';
import globals from 'globals';

import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import pluginQuery from '@tanstack/eslint-plugin-query';
import react from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
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
      ...pluginQuery.configs['flat/recommended'],
      reactRefresh.configs.vite,
      eslintPluginUnicorn.configs.recommended,
      eslintConfigPrettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      unicorn: eslintPluginUnicorn,
      'simple-import-sort': simpleImportSort,
      react,
      'unused-imports': unusedImports,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'], // React + external packages
            ['^@/'], // alias imports
            ['^\\.'], // relative imports
            ['^\\u0000'], // side effects (css)
          ],
        },
      ],
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'simple-import-sort/exports': 'error',
      'unicorn/prefer-query-selector': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'react-refresh/only-export-components': 'off',
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['^[A-Z][a-zA-Z0-9]*\\.tsx$'],
        },
      ],
    },
  },
]);
