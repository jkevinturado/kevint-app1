import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginRecommended from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    '**/node_modules',
    '**/coverage',
    '**/dist',
    '**/cdk.out',
    'eslint.config.mjs',
  ]),
  {
    extends: fixupConfigRules(
      compat.extends(
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript'
      )
    ),

    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
    },

    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.node,
      },

      parser: tsParser,
    },

    settings: {
      'import/resolver': {
        typescript: {},
      },
    },

    rules: {
      camelcase: [
        'error',
        {
          properties: 'always',
        },
      ],

      'id-length': 'error',
      'new-cap': 'error',
      'no-underscore-dangle': 'error',
      radix: 'off',

      'import/extensions': [
        'error',
        {
          extensions: ['.js', '.ts'],
        },
      ],

      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'operator-linebreak': 'off',
      'quote-props': 'off',
      'implicit-arrow-linebreak': 'off',
    },
  },
  eslintPluginRecommended,
]);
