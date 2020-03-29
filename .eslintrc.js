module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react','prettier'
  ],
  rules: {
    "no-alert": 0,
    "no-console": 0,
    "no-restricted-global": 0,
    "no-restricted-syntax": 0,
    "react/no-array-index-key": 0,
    "react/jsx-filename-extension": 0,
    "react/require-default-props": 0,
    "no-plusplus": 0,
    "comma-dangle": 0,
    "no-param-reassign": [2, {
      "props": false
    }],
    "object-curly-newline": 0,
    "operator-linebreak": 0,
    "react/forbid-prop-types": 0,
    "prettier/prettier": [2, {
      "trailingComma": "es5",
      "singleQuote": true,
      "printWidth": 80
    }],
    "no-shadow": [
      2,
      {
        "hoist": "all",
        "allow": [
          "resolve",
          "reject",
          "done",
          "next",
          "err",
          "error"
        ]
      }
    ],
  },
};
