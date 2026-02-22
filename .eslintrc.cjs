module.exports = {
  extends: ['taro/react'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['src/**/*.{ts,tsx,js,jsx}'],
      excludedFiles: ['src/index.html'],
      rules: {
        // Enforce alias-only imports for cross-folder imports under src.
        'no-restricted-imports': [
          'error',
          {
            patterns: ['../*', '../../*', '../../../*', '../../../../*', '../../../../../*'],
          },
        ],
      },
    },
  ],
}
