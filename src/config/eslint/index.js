'use strict';
// @todo Enable default-props-match-prop-types rule when the intersection Flow Type error gets fixed in eslint-plugin-react

module.exports = {
  root: true,

  parser: 'babel-eslint',

  extends: [
    'airbnb',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'plugin:flowtype/recommended'
  ],

  plugins: [
    'babel',
    'prettier',
    'react',
    'jsx-a11y',
    'import',
    'jest',
    'flowtype'
  ],

  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true
    }
  },

  env: {
    jest: true,
    node: true,
    browser: true,
    commonjs: true,
    es6: true
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true
    }
  },

  rules: {
    'consistent-return': [0, { treatUndefinedAsUnspecified: true }],
    'class-methods-use-this': 0,

    // eslint-plugin-import rules
    'import/extensions': 0,
    'import/first': [2, { ignore: ['jest'] }],
    'import/no-unresolved': [
      1,
      {
        ignore: [
          '@abcaustralia/dls-components',
          '@storybook',
          'enzyme',
          'enzyme-to-json',
          'react'
        ]
      }
    ],
    'lines-between-class-members': 1,

    // prettier rules
    'prettier/prettier': [
      'error',
      { trailingComma: 'none', singleQuote: true }
    ],

    'prefer-destructuring': 0,
    'no-case-declarations': 0,
    'no-console': [messageType, { allow: ['warn', 'info', 'error'] }],
    'no-unused-vars': [
      messageType,
      {
        varsIgnorePattern: 'styles|AllowedHTMLAttrs',
        ignoreRestSiblings: true
      }
    ],
    'no-underscore-dangle': 0,
    'no-continue': 0,
    'no-plusplus': 0,

    // eslint-plugin-jsx-a11y Rules
    'jsx-a11y/img-has-alt': 0,
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/label-has-for': [1, { required: { every: ['id'] } }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to', 'hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton']
      }
    ],

    // flowtype rules
    'flowtype/define-flow-type': 1,
    'flowtype/use-flow-type': 1,
    'flowtype/boolean-style': [1, 'boolean'],
    'flowtype/delimiter-dangle': [1, 'never'],
    'flowtype/no-primitive-constructor-types': 1,
    'flowtype/no-types-missing-file-annotation': 2,
    'flowtype/no-weak-types': 0,
    'flowtype/object-type-delimiter': [1, 'comma'],
    'flowtype/require-parameter-type': 0,
    'flowtype/require-return-type': 0,
    'flowtype/require-valid-file-annotation': 1,
    'flowtype/semi': [1, 'always'],
    'flowtype/generic-spacing': 0,
    'flowtype/space-after-type-colon': 0,
    'flowtype/space-before-generic-bracket': 0,
    'flowtype/space-before-type-colon': 0,
    'flowtype/type-id-match': [0, '^([A-Z][a-z0-9]+)+Type$'],
    'flowtype/union-intersection-spacing': [1, 'always'],
    'flowtype/valid-syntax': 1,

    // eslint-plugin-react Rules
    'react/default-props-match-prop-types': 0, // due to the intersection and union Flow Type error
    'react/destructuring-assignment': 0, // if enabled then if will require to update many class based components
    'react/prefer-stateless-function': 1,
    'react/no-did-mount-set-state': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/sort-comp': [
      1,
      {
        order: [
          'type-annotations',
          'static-methods',
          'lifecycle',
          'everything-else',
          'render'
        ]
      }
    ]
  },

  // allow unescaped entities in markdown for .story.js files
  overrides: [
    {
      files: ['*.story.js'],
      rules: {
        'react/no-unescaped-entities': 0,
        'import/no-extraneous-dependencies': 0
      }
    }
  ]
};
