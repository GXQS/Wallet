// .eslintrc.shared.cjs
// Shared ESLint configuration for GXQS monorepo
// Imported by apps and packages via: extends: ['../../.eslintrc.shared.cjs']

module.exports = {
  root: false,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
  ],
  rules: {
    // TypeScript
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-types': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    
    // General
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-debugger': 'error',
    'eqeqeq': ['error', 'always'],
    'prefer-const': 'error',
    'no-var': 'error',
    
    // React (if present)
    'react/react-in-jsx-scope': 'off', // Not needed in React 18+
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['*.config.ts', '*.config.js'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ],
};
