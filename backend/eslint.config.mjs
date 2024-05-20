import { defineConfig } from 'eslint-define-config';
import { eslintConfig } from '@eslint/eslintrc';

export default defineConfig({
  // Remove the "extends" key
  // extends: [
  //   'eslint:recommended',
  //   'plugin:import/recommended',
  //   'plugin:security/recommended',
  //   '@eslint/js/recommended',
  // ],

  // Include configuration objects directly in the flat config array
  ...eslintConfig,

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['import', 'security', '@eslint/js'],
  rules: {
    // Rules from the provided configuration
    "no-console": "warn",
    "no-debugger": "warn",
    "eqeqeq": ["error", "always"],
    "curly": ["error", "all"],
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-return-assign": ["error", "always"],
    "no-undef": "error",
    "no-unused-vars": ["error", { "args": "none", "ignoreRestSiblings": true }],
    "indent": ["error", 2],
    "quotes": ["error", "single", { "avoidEscape": true }],
    "semi": ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    "space-before-blocks": ["error", "always"],
    "no-var": "error",
    "prefer-const": ["error", { "destructuring": "all", "ignoreReadBeforeAssign": true }],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "no-duplicate-imports": "error",
  },
  overrides: [
    {
      files: ['**/*.jsx', '**/*.js'],
      languageOptions: {
        globals: {
          // Define global variables here
          node: true, // Example: Node.js environment
          es2021: true, // Example: ECMAScript 2021 support
          // Add more global variables as needed
        },
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
  ],
});
