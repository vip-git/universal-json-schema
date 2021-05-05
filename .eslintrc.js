module.exports = {
  'extends': [
    'airbnb',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint', 'jest', 'import'],
  'rules': {
    'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-use-before-define': [0],
    '@typescript-eslint/no-use-before-define': [1],
    'no-tabs': 'off', // enable it later stage
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-trailing-spaces': 'off',
    'react/jsx-indent': 'off',
    'no-unused-vars': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/prefer-stateless-function': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
      },
    ],
    'class-methods-use-this': 'off',
    'function-paren-newline': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'quote-props': ['error', 'consistent'],
    'max-len': ['warn', { code: 120 }],
    'brace-style': ['error', 'stroustrup'],
    'no-plusplus': 'off',
    'object-curly-newline': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // enable this later stage
    '@typescript-eslint/ban-types': 'off', // enable this later stage
    '@typescript-eslint/no-unsafe-assignment': 'off', // enable this later stage
    '@typescript-eslint/no-unsafe-member-access': 'off', // enable this later stage
    '@typescript-eslint/explicit-module-boundary-types': 'off', // enable this later stage
    '@typescript-eslint/no-unsafe-return': 'off', // enable this later stage
    '@typescript-eslint/no-unsafe-call': 'off', // enable this later stage
    '@typescript-eslint/no-unused-vars': 'off' // enable this later stage
  },
  'settings': {
    react: {
			version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
		},
    'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				paths: ['./src', './src/types']
			}
		},
  },
  'parserOptions': {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true, // Allows for the parsing of JSX
			legacyDecorators: true
		},
		project: './tsconfig.json'
  },
  'env': {
    'jest/globals': true
  },
};
