module.exports = {
  root: true,
  extends: [
    require.resolve('eslint-config-airbnb'),
    require.resolve('eslint-config-airbnb/hooks'),
    require.resolve('eslint-config-airbnb-typescript')
  ],
  rules: {
    'react/function-component-definition': 0,
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 0,
    'react-hooks/exhaustive-deps': 1,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0
  },
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
     project: require.resolve('./tsconfig.json'),
  },
  settings: {
    react: {
      'version': 'detect'
    },
    'import/resolver': {
      'alias': {
        'map': [
          [
            '@', './src'
          ]
        ],
        'extensions': ['.ts', '.tsx']
      }
    }
  }
}