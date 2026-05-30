import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import tseslint from 'typescript-eslint';
import { importX } from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import globals from 'globals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  globalIgnores([
    '**/node_modules',
    '**/dist',
    '**/cdk.out',
    '**/coverage',
    'eslint.config.mjs',
  ]),

  // ## JSON files
  {
    files: ['**/*.json'],
    ignores: ['**/package-lock.json', '**/tsconfig*.json'],
    language: 'json/json',
    ...json.configs.recommended,
  },

  // tsconfig files use JSONC (JSON with comments)
  {
    files: ['**/tsconfig*.json'],
    language: 'json/jsonc',
    ...json.configs.recommended,
  },

  // ## Markdown files
  {
    files: ['**/*.md'],
    language: 'markdown/gfm',
    ...markdown.configs.recommended,
  },

  // ## TypeScript / JavaScript files

  // Base JavaScript recommended rules (catches common JS mistakes)
  { ...js.configs.recommended, files: ['**/*.{js,mjs,cjs,ts}'] },

  // TypeScript recommended rules (catches common type errors)
  ...tseslint.configs.recommended.map((c) => ({ ...c, files: ['**/*.ts'] })),

  // Check that imports resolve correctly with TypeScript support
  { ...importX.flatConfigs.recommended, files: ['**/*.{js,mjs,cjs,ts}'] },
  { ...importX.flatConfigs.typescript, files: ['**/*.ts'] },

  // ## Project-wide settings and custom rule overrides
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
    },

    settings: {
      // Use the TypeScript-aware module resolver (understands paths, aliases, etc.)
      'import-x/resolver-next': [createTypeScriptImportResolver()],
    },

    rules: {
      // Enforce camelCase for object properties (e.g. API responses)
      'camelcase': [
        'error',
        {
          properties: 'always',
        },
      ],

      // Enforce minimum identifier length (e.g. avoid single-letter variable names)
      'id-length': 'error',
      // Enforce capitalized constructors (e.g. class names)
      'new-cap': 'error',
      // Enforce no dangling underscores (e.g. private properties)
      'no-underscore-dangle': 'error',

      // Allow unquoted object properties (e.g. API responses with non-standard keys)
      'quote-props': 'off',

      // Allow arrow functions without parentheses for single parameters (e.g. simple callbacks)
      'implicit-arrow-linebreak': 'off',

      // TypeScript already validates module resolution, so turn this off
      'import-x/no-unresolved': 'off',

      // Not enforced in this project
      'import-x/prefer-default-export': 'off',
      'import-x/no-extraneous-dependencies': 'off',
    },
  },

  eslintPluginPrettierRecommended,
]);
